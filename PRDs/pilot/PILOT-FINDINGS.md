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
**Status:** Confirmed — must be formalized in Phase 9 Interview Guide

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

**Last Updated:** 04-13-26 14:30
