# CBM dev (test) vs production — relationship/link audit & root cause

**Date:** 2026-06-24 · **Session:** SES-008 (ENG-002) · **Governs:** PI-007 / REL-003 / PRJ-004
**Method:** live read-only API diff of `entityDefs.<Entity>.links` (isCustom only) across all
14 custom + extended-native entities. Both instances authenticated (HTTP 200). Read-only — no
prod writes.

## Bottom line
Production did **not** diverge randomly. Two systemic patterns explain almost everything,
both originating in the original audit→deploy build of prod:

| Pattern | Count | Cause | Engine status |
|---|---|---|---|
| **"cC" double-prefixed link names** | ~16 relationships | c-prefix bug, **on links** | **active engine defect — NOT fixed by PI-307** |
| **`hasOne`→`hasMany` type downgrade** | 6 relationships | `oneToOne` unsupported pre-schema-v1.3.1 | engine already fixed (v1.3.1 / PI-018); prod is residual pre-fix data |
| Genuinely missing link | 1 | isolated deploy miss | — |
| Extra on prod (benign) | 2 | EspoCRM auto activity links | — |

Raw totals from the diff: 16 "missing", 17 "extra", 23 "mismatch" — but de-duplicated by
pattern these collapse to the four rows above (the missing/extra/mismatch rows are mostly two
views of the same mangled relationship).

---

## Finding 1 — "cC" double-prefixed link names (the dominant issue)

Custom link names on the **native** entities (Account, Contact) were deployed to prod with an
**extra `c`+Capitalize prefix** — e.g. test `cChildAccounts` → prod `cCChildAccounts`,
test `cContributions` → prod `cCContributions`. The relationship is otherwise identical (same
type, foreign entity, relationName); only the **name** is doubled. Each shows up three ways in
the raw diff: as "missing" (the correct `cX` name), as "extra" (the `cCX` name), and as a
"mismatch" on the *other* entity's link whose `foreign` attribute points at the doubled name.

**Affected near-side link names (15):**
- **Account (5):** `cChildAccounts`, `cContributions`, `cEngagements`, `cInformationRequests`, `cPartnerProfile`
- **Contact (10):** `cContributions`, `cEngagementsAsContact`, `cEventRegistrations`, `cEvents`, `cInformationRequests`, `cLiaisonForPartnerAccounts`, `cPresenterEvents`, `cPrimaryEngagementsAsContact`, `cSessionsAttended`, `cSponsorProfiles`
- **+17 reciprocal `foreign` references** on the other side (CContribution.donorAccount/donorContact, CEngagement.*, CEvent.contacts/presenters, CEventRegistration.contact, CInformationRequest.contact/infoRequestCompany, CPartnerProfile.partnerEmails/account, CSession.sessionAttendees, CSponsorProfile.sponsorContact, Account.cParentAccount/cAssignedLiaison) all point at the `cCX` doubled names.

**Root cause.** This is the **same c-prefix defect** behind `cBMValueProvided`→`bMValueProvided`,
but for **link names** and in the **forward/double direction**: a link name that was already in
platform `cX` form got c-prefixed **again** on deploy (`f"c{Name}"` applied to `cChildAccounts`
→ `cCChildAccounts`). The fix shipped in **PI-307 only covered `strip_field_c_prefix` for
FIELDS** — link names travel a different audit/deploy path (relationship discovery + `createLink`),
which still mishandles the platform prefix. **This is a live engine defect.**

> Note these are on **Account/Contact (native)** entities — exactly where EspoCRM *does* apply
> the platform link prefix, so the engine over-applied it (mirror of PI-307, which fixed
> over-stripping). On custom entities the link names are clean.

## Finding 2 — `hasOne` → `hasMany` type downgrade (1:1 became 1:N)

Six relationships are **1:1 (`hasOne`/oneToOne) on test but `hasMany` on prod** — same names and
foreign entities, only the cardinality is wrong:

| Entity.link | test | prod |
|---|---|---|
| Account.cPrimaryContact (→Contact) | hasOne | hasMany |
| Account.cCompanyPartnerProfile (→CPartnerProfile) | hasOne | hasMany |
| Account.cSponsorProfile (→CSponsorProfile) | hasOne | hasMany |
| CClientProfile.linkedCompany (→Account) | hasOne | hasMany |
| Contact.cClientContact (→CClientProfile) | hasOne | hasMany |
| Contact.cMentorProfile (→CMentorProfile) | hasOne | hasMany |

**Root cause.** `oneToOne` was **rejected by the YAML validator before schema v1.3.1** — true 1:1
links were authored/deployed as `manyToOne`, which renders the "one" side as `hasMany`. **v1.3.1
(PI-018) added `oneToOne` support**, so the engine is already fixed; prod just carries residual
data from a pre-v1.3.1 deploy. Re-deploying these six as `oneToOne` corrects them. **Not an
active engine bug.**

## Finding 3 — genuinely missing on prod (1)

- **Contact.cAssignedUser** (`belongsTo` → User, foreign `cLinkedContact`) — present on test,
  absent on prod, with no mangled counterpart. An isolated deploy miss (likely a swallowed
  `createLink` failure or ordering issue during the original prod build).

## Finding 4 — extra on prod, benign (2)

- **CInformationRequest.calls** (hasMany → Call) and **CInformationRequest.meetings**
  (hasMany → Meeting) — EspoCRM's auto-generated activity parent links. Cosmetic; not a YAML
  divergence. Leave unless you want them suppressed.

---

## Why prod differs from test (the answer)
Production was built by an audit→deploy round-trip that ran through **two engine limitations
present at build time**: (1) the **link-name c-prefix mishandling** (the dominant cause — the
*link* sibling of the field bug fixed in PI-307, still live), and (2) the **pre-v1.3.1
oneToOne→manyToOne fallback** (since fixed). Plus one isolated missing link. The c-prefix fix you
just shipped (PI-307) stops the *field* version recurring but **does not cover links** — so a
re-audit/re-deploy today would still re-mangle these link names.

## Remediation plan (deferred — needs Doug's approval; do in a release-scoped PI under PRJ-004)
All target entities have low/zero records, so link recreation is data-safe. Per relationship:
`removeLink` the wrong prod link, then `createLink` with test's exact `(link, linkForeign, type,
relationName, labels)`. `Admin/rebuild` after each. (createLink payload =
`espo_impl/core/relationship_manager.py::_build_payload`; removeLink = `POST
EntityManager/action/removeLink {entity, link}`.)

1. **Fix the 6 type-downgrades** first (recreate as `oneToOne`) — they're independent and
   unambiguous.
2. **Fix the ~16 cC double-prefixed links** (recreate under the correct `cX` names; this also
   corrects the 17 reciprocal `foreign` refs since both sides are rebuilt together). Watch for
   foreign-name collisions → removeLink before createLink (the pattern used for
   `cBMSponsorManager`).
3. **Add the 1 missing link** Contact.cAssignedUser → User.
4. Decide on the 2 benign extras (leave or remove).

## Engine defects to govern (requirement-first, CRMBuilder/ENG-001)
- **Link-name c-prefix mishandling** — the active defect (Finding 1). Symmetric to PI-307 but for
  the relationship audit/deploy path. Should become a requirement + implementing PI before the
  fix is built, so a future CBM (or any) audit→deploy stops mangling link names.
- (Finding 2 needs no engine work — v1.3.1 already fixed it; only prod data remediation.)
