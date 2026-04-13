# CBM Process Validation Pilot — Findings Log

**Pilot scope:** Run the Mentor Recruitment (MR) domain end-to-end through
Phases 9 → 11 → 12 → 13 (YAML Generation → Deployment → Configuration →
Verification) to validate that the document production methodology
produces a deployable CRM.

**Pilot target:** MR domain. Selected because it is the only domain that
has completed Phase 7 (Domain Reconciliation) with a reconciled Domain
PRD.

**Pilot started:** 04-13-26

**Status:** Authoring phase — producing Phase 9 Interview Guide before
first Phase 9 conversation is run.

---

## Purpose of This Log

The stated purpose of the MR pilot is *"to see if the process works."*
That purpose is only served if we capture what we learn — deviations
from the methodology, gaps in the methodology that the pilot forces us
to fill in, and any finding that should change the methodology before
the next domain is run through it.

Each finding records what was observed, when, under what circumstances,
and what action (if any) the finding implies for the methodology or for
subsequent pilot steps.

---

## Findings

### Finding 1 — Cross-Domain Service PRDs deliberately skipped for MR pilot

**Recorded:** 04-13-26
**Phase affected:** Phase 6 (Cross-Domain Service Definition)
**Status:** Open — outcome to be recorded after Phases 9, 11, 12, 13

**Observation.** The MR Domain PRD has requirements that depend on
system-sent transactional email (`MR-APPLY-REQ-003` applicant
confirmation email, and the duplicate-email conflict notification
email in the MR-APPLY conflict flow) and on notes on Contact records
(`MR-MANAGE-REQ-009` and others). Under the strict phase sequence,
Phase 6 Cross-Domain Service Definition should produce Service PRDs
for at least Email and Notes before Phase 9 YAML Generation begins
for any domain that uses them.

A partial Notes Service process document exists
(`PRDs/services/NOTES/NOTES-MANAGE.docx`); no Email Service artifacts
exist.

**Decision (04-13-26).** Proceed with Phase 9 for MR without first
producing formal Email or Notes Service PRDs. Document the deviation
and observe its downstream impact as part of the pilot's core purpose.

**Prediction to test.** If Service PRDs are genuinely load-bearing for
YAML generation, Phase 9 will stumble on unresolved questions about
email template content, email trigger conditions, notes entity schema,
or notes visibility rules. If Phase 9 produces usable YAML without
these, Phase 6 can be deferred or run in parallel without blocking
YAML authoring.

**Outcome to record:** What happened during Phase 9, Phase 12
(configuration), and Phase 13 (verification) as a direct result of
the absent Service PRDs.

---

### Finding 2 — Legacy YAML confirms Phase 9 output must include a Manual Configuration List

**Recorded:** 04-13-26
**Phase affected:** Phase 9 (YAML Generation), methodology change
**Status:** Confirmed (04-13-26) — Phase 9 Interview Guide authored and
exercised in the MR pilot conversation. Manual Configuration List
format shipped. Completeness still to be verified in Phase 12.

**Observation.** The legacy `programs/` directory (authored under the
pre-domain-methodology process) contains YAML files that open with
extensive `MANUAL CONFIG REQUIRED` comment blocks. Categories include:

- Workflows (e.g., application confirmation email, decline notification)
- Email templates
- Role-based field visibility and editing permissions
- Entity calculated-field formulas
- Duplicate-detection rules
- Stream / audit logging configuration
- Saved views and list filters
- Integrations (Google Workspace, LMS)

This is direct empirical evidence from prior work that the CRM Builder
YAML schema cannot express every configuration the target CRM requires
to function. Some configuration must be done manually by an
administrator in the CRM's native UI after YAML deployment.

**Implication for methodology.** Phase 9's deliverable is not YAML
alone — it is **YAML plus a Manual Configuration List** identifying
every required configuration step not expressed in YAML. The Phase 9
Interview Guide must specify this explicitly, including what form the
list takes, what categories it covers, and how it is handed off to
Phase 12 (CRM Configuration).

**Outcome to record:** Whether the Manual Configuration List produced
by Phase 9 for MR is complete — verified during Phase 12 (items
needed that weren't listed) and Phase 13 (items listed that weren't
actually needed).

---

### Finding 3 — Legacy `programs/` directory archived before pilot begins

**Recorded:** 04-13-26
**Phase affected:** Repository housekeeping
**Status:** Resolved (04-13-26) — archive performed at the start of
the MR Phase 9 pilot conversation rather than as a dedicated session

**Observation.** The CBM repo's `programs/` directory contains 22 files
authored under the pre-domain-methodology process. These are organized
by entity (e.g., `cbm_contact_fields_merged.yaml`,
`cbm_account_fields_merged.yaml`), not by domain. The new process
produces YAML per domain.

**Decision (04-13-26).** Treat all existing `programs/*` content as
legacy. Move to `programs/Archive/` parallel to the
`PRDs/Archive/` convention already established in this repo. MR pilot
Phase 9 writes to a clean `programs/` tree using domain-organized
paths (exact layout to be specified in the Phase 9 Interview Guide).

**Resolution (04-13-26).** All 22 legacy files moved to
`programs/Archive/` as the first action of the MR Phase 9 pilot
conversation. Commit reference is on `main`. The `programs/` directory
now contains only `Archive/`, providing the clean tree the Phase 9
guide requires.

**Outcome to record:** None — this is a housekeeping decision recorded
here for traceability.

---

## Template for Future Findings

```
### Finding N — [short title]

**Recorded:** MM-DD-YY
**Phase affected:** [Phase # and name]
**Status:** Open | Confirmed | Resolved | Closed (no action)

**Observation.** [What happened and the evidence for it.]

**Decision / Implication.** [What we decided to do about it, or what
it implies for the methodology.]

**Outcome to record.** [If Open: what to watch for in later phases.
If Confirmed: where the methodology change is being made.]
```

---

### Finding 4 — YAML schema v1.0 cannot express several commonly-required CRM constructs

**Recorded:** 04-13-26
**Phase affected:** Phase 9 (YAML Generation); may drive schema
revisions in CRM Builder itself
**Status:** Open — outcome to be recorded after Phase 12

**Observation.** During the MR Phase 9 conversation, five classes of
configuration came up as required by the Mentor Recruitment Domain
Product Requirements Document but unrepresentable in the YAML schema
v1.0 as it currently stands:

1. Field-level dynamic logic visibility. The schema supports
   `dynamicLogicVisible` on panels but not on individual fields. Four
   field-level visibility rules from the Mentor Recruitment domain
   were shifted to Manual Configuration as a result (`paymentDate`,
   `paymentMethod`, `applicationDeclineReason`, `departureReason` and
   `departureDate`).

2. Field-level access control. The schema has no construct for
   role-based or type-based field-level visibility or edit
   permissions. Ten Contact fields are marked Admin-only in the
   Product Requirements Documents and another ten are
   mentor-editable only when `mentorStatus = Active`. All twenty
   ended up in Manual Configuration.

3. Conditional-required. The schema supports only static
   `required: true | false`. Four fields in the Mentor Recruitment
   domain are conditionally required (required only when another
   field holds a specific value). All four ended up in Manual
   Configuration.

4. Calculated-field formulas. The schema allows `readOnly: true` but
   does not define the formula that populates a calculated field.
   Six formulas (five on Contact, one on Dues) ended up in Manual
   Configuration.

5. Duplicate-detection rules. The schema has no construct for
   duplicate-detection rules. One rule (Contact on `personalEmail`)
   ended up in Manual Configuration.

**Decision / Implication.** Phase 9 continues to produce the YAML
plus Manual Configuration List as the Phase 9 output. If the volume
of Manual Configuration items is sustainably high across the pilot
domains, it points toward extending the YAML schema to express some
of these constructs natively. The schema extensions most likely to
pay off are field-level dynamic logic and conditional-required —
both are syntactically close to what already exists in the schema.
Field-level access control is more ambitious (would require a Roles
construct in YAML) and may be better left as Manual Configuration.

**Outcome to record.** After Phase 12 (MR configuration complete),
count how many Manual Configuration items landed in each of the
five classes above. If one or two classes dominate the volume, that
is the candidate for schema extension ahead of the next domain's
Phase 9 run.

---

### Finding 5 — Unresolved open issues on required fields blocked clean Phase 9 execution

**Recorded:** 04-13-26
**Phase affected:** Phase 7 (Domain Reconciliation) criteria for
"complete"; Phase 9 (YAML Generation)
**Status:** Open — methodology observation, recommended rule change
pending further pilot data

**Observation.** The Mentor Recruitment Domain Product Requirements
Document v1.0 was marked complete at the end of Phase 7 domain
reconciliation on 04-03-26. Section 4 of that document marks four
enum or multiEnum fields as having values "TBD — see CON-ISS-XXX"
(CON-ISS-005, CON-ISS-006, CON-ISS-007, CON-ISS-008) where three of
those fields are required. A fifth field — `industrySectors`,
required — had values described as "20 NAICS sectors (aligned with
Client Organization)" without enumeration.

When the MR Phase 9 conversation ran, all five of these missing
value lists became Stop-and-Ask exceptions. The exceptions were
resolved in-session by a combination of user-supplied values,
reference to the archived legacy YAML, and a value-list scope change
superseding the Contact Entity PRD v1.3. Five exceptions were logged
in `programs/MR/EXCEPTIONS.md`.

**Decision / Implication.** The methodology currently allows a
domain to pass Phase 7 reconciliation with unresolved open issues
affecting required-field option lists. This pushes the resolution
work into Phase 9, where it appears as Stop-and-Ask exceptions and
slows the conversation. A recommended rule change: Phase 7
reconciliation is not complete until every required field on every
entity in the domain has either its option list enumerated or an
explicit note that the field is deferred out of the domain's scope.

**Outcome to record.** After more domains run Phase 9, check whether
this rule change would have prevented the Stop-and-Ask exceptions on
those domains too. If a consistent pattern shows up, propose the
rule change to the process document as a Phase 7 completion
criterion.

---

### Finding 6 — `howDidYouHearAboutCbm` scope change has downstream impact outside the MR domain

**Recorded:** 04-13-26
**Phase affected:** Phase 9 exception handling; Contact Entity PRD
v1.3; CR-MARKETING Sub-Domain Overview v1.2
**Status:** Open — upstream PRD updates and CR-MARKETING
channel-effectiveness design revisions required before those
domains run Phase 9

**Observation.** During MR Phase 9, the user supplied an 8-value
list for `howDidYouHearAboutCbm` (Partner Referral, Social Media,
CBM Email, Workshop or Event, Search Engine, News or Media, Personal
Referral, Other). This superseded:

- The Mentor Recruitment Domain PRD v1.0's TBD marker (expected);
- The 10-value list in the Contact Entity Product Requirements
  Document v1.3 (unexpected — this was previously finalized);
- The CR-MARKETING Sub-Domain Overview v1.2's documented channel-
  rollup logic that depended on the old 10-value list (Partner
  Referral → CR-PARTNER; Workshop or Event → CR-EVENTS; Email
  Marketing / Social Media / Search Engine / CBM Website / News or
  Media → CR-MARKETING; Returning Client → CR-REACTIVATE; Personal
  Referral and Other → organic).

The new 8-value list removes "CBM Website" and "Returning Client"
entirely, renames "Email Marketing" to "CBM Email," and collapses
channel distinctions.

**Decision / Implication.** This is not an enum value change. It is
a scope change to a cross-domain reporting design. The following
documents require updates before their own Phase 9 runs:

- Contact Entity Product Requirements Document v1.3 → v1.4: replace
  the 10-value list with the new 8-value list in Section 3.1.
- CR-MARKETING Sub-Domain Overview v1.2 → v1.3: revise the
  channel-rollup design that keys off this field's values, including
  the mapping to CR sub-domains for effectiveness reporting.
- Any CR-MARKETING process document (CAMPAIGNS, CONTACTS) that
  references the 10-value list.
- MR Domain PRD v1.0 → v1.1 (or addendum): resolve CON-ISS-008 with
  the new 8-value list.

The Phase 9 YAML for MR uses the new 8-value list and does not wait
for these upstream updates. The exception is logged in
`programs/MR/EXCEPTIONS.md` as MR-Y9-EXC-005 for traceability.

**Outcome to record.** Whether the upstream PRD updates are made
before CR Phase 9 begins, and whether the channel-effectiveness
reporting design in CR-MARKETING absorbs the collapsed value set
cleanly or requires further scope work.

---

**Last Updated:** 04-13-26 17:10
