# Reconciliation — Dev → Production Parity (forms, fields, relationships)

**Date:** 2026-06-24
**Source of truth:** the **test/dev** instance `crm-test.clevelandbusinessmentors.org`
**Target reconciled:** **production** `crm.clevelandbusinessmentors.org`
**Purpose:** Operational record of the work that brought CBM production into structural
parity with the canonical test instance — create/edit forms, fields, and relationships —
plus the root causes and the CRMBuilder engine fixes that prevent recurrence. All changes
were applied directly to the live production instance via the EspoCRM REST API (records are
low/zero, so the work was data-safe).

**Final state:** production now matches test for all custom entities — fields, links, and
create/edit forms. Verified by live diff: **0 missing, 0 mismatched** custom links; **0
dangling references** on any detail/detailSmall form. (Two benign EspoCRM auto-activity
links — `CInformationRequest.calls`/`meetings` — were intentionally left.)

---

## 1. What was reconciled

| Area | Production before | Now |
|---|---|---|
| **Create forms** | Contact form had 6 of 16 fields; Mentor Profile form had only `name` | Both match test (Contact 16, CMentorProfile 41) |
| **Entity settings** | default sort / text-filter / full-text-search not transferred | Capability added to the engine (orderBy/textFilterFields/fullTextSearch round-trip) |
| **Mis-named fields/links** | `bMValueProvided`, `bMSponsorManager` (c stripped) | `cBMValueProvided` (multiEnum), `cBMSponsorManager` (link) |
| **Relationships** | 24 diverged (doubled link names, 1:1 → 1:N, 1 missing) | All 24 reconciled to test |
| **Foreign (mirror) fields** | 4 dropped when their links were rebuilt | Recreated (Contact City/Phone/Personal Email, Client Contact Email) |

## 2. Root causes (why prod differed)

Two systemic, build-time engine issues — **not** random drift:

1. **The `c`-prefix bug, on both fields and links.** EspoCRM applies a platform `c`-prefix to
   custom fields/links **only on native entities** (Account, Contact). The engine's reverse
   map mishandled this:
   - *Fields:* over-**stripped** — a custom-entity field whose real name began `c`+Uppercase
     (`cBMValueProvided`) was wrongly stripped to `bMValueProvided`.
   - *Links:* under-stripped — a native-entity link name was emitted already-prefixed
     (`cChildAccounts`), so the next deploy **double-prefixed** it to `cCChildAccounts`.
2. **`oneToOne` deployed as `manyToOne`.** Before YAML schema v1.3.1, true 1:1 links were
   authored as `manyToOne`, so six relationships landed on prod as 1:N (`hasMany`) instead of
   1:1.

## 3. Engine fixes (so it cannot recur)

| Fix | What | Status |
|---|---|---|
| **PI-307 / REQ-342** | `strip_field_c_prefix` made native-entity-only (field names) | Merged to `main` |
| **PI-309 / REQ-344** | native-only strip for **link** names (relationship audit, V1 + V2) | Merged to `main` (`312a5247`) |
| **v1.3.1 / PI-018** | `oneToOne` support in the schema/validator | Already shipped |
| **PI-300 / REQ-340** | entity collection-settings (orderBy/textFilter/fullText) round-trip | Merged to `main` |

A future audit→deploy of CBM (or any client) will now carry field and link names faithfully.

## 4. Operational gotchas (for any future production relationship surgery)

These were learned doing this reconciliation and are worth keeping:

- **Strip native-side link names before `createLink`.** EspoCRM re-applies the `c`-prefix on
  native entities, so send the *natural* name (`childAccounts`) — sending the prefixed form
  re-creates the doubling bug.
- **`oneToOne` needs `oneToOneRight`, not `oneToOne`.** `EntityManager/action/createLink`
  rejects a plain `oneToOne` linkType (HTTP 400). Use `oneToOneRight` with `entity` = the
  `belongsTo` (foreign-key-holding) side.
- **`removeLink` drops foreign (mirror) fields.** Removing a link deletes any `type: foreign`
  fields that mirror values through it. After recreating the link, recreate those fields too,
  or the form shows dangling/blank cells.
- **EspoCRM can't rename a field/link in place** — recreate under the correct name then delete
  the old; when the foreign-side name collides, `removeLink` before `createLink`.

## 5. Governance trail (ENG-002)

- **PI-007** — dev↔prod audit + root cause (audit report: `audit-dev-vs-prod-links.md`).
- **PI-008** — production relationship remediation (24 links); DEC-010.
- Form fixes / field reconciliation / foreign-field recreate — DEC-007, DEC-008, DEC-011.
- Engine fixes governed in ENG-001 (CRMBuilder): REQ-340/342/344, PI-300/307/309.

All under release **REL-003** "CBM dev→prod parity reconciliation" → project **PRJ-004**.
