# Update Prompt: CBM Mentoring Domain PRD v1.0 → v1.1 — Re-Reconciliation

## Context

I'm working on the CBM CRM implementation. A verification pass against the Mentoring (MN) Domain PRD on 05-05-26 confirmed that the Domain PRD v1.0 (dated 04-01-26) is now stale relative to the underlying process documents:

| Process | Domain PRD reconciled from | Current version |
|---|---|---|
| MN-INTAKE | v2.1 | **v2.5** (after Session 3 of this workpacket) |
| MN-MATCH | v2.1 | **v2.2** |
| MN-ENGAGE | v2.3 | v2.3 (in sync) |
| MN-INACTIVE | v1.2 | v1.2 (in sync) |
| MN-CLOSE | v1.1 | v1.1 (in sync) |

This is Session 4 of a four-session remediation workpacket. It is the final session and depends on Sessions 1, 2, and 3 having completed first. It addresses **Finding #2** (stale Domain PRD) and the **Bonus observation** (Domain PRD missing `clientNotes` from Section 4).

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)
3. Confirm Sessions 1, 2, and 3 of the workpacket have been merged. Specifically verify:
   - Engagement-Entity-PRD.docx is at v1.3 with the `requestedMentor` field present
   - MN-Engagement.yaml is at content_version 1.0.1 with `engagementRequestedMentor` declared and `meetingCadence` at `required: false`
   - MN-MANUAL-CONFIG.md contains `MN-MC-CR-006` and `MN-MC-AA-017` through `MN-MC-AA-020`
   - CR-MANUAL-CONFIG.md contains the new `sourceAttributionDetails` audit-trail entry and the cross-reference on CR-MC-AA-003
   - MN-INTAKE.docx is at v2.5 with `applicantSinceTimestamp` (not `applicantSince`)
   If any of those are missing, stop and ask before proceeding — do not attempt the reconciliation against partial inputs.

## The Change

Re-reconcile CBM-Domain-PRD-Mentoring.docx from the current versions of all five MN process documents and the relevant Entity PRDs, producing v1.1. Apply the reconciliation guide v1.1 from `dbower44022/crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md` (or its current version) — same methodology that produced v1.0.

The Domain PRD's role is to consolidate process docs + Entity PRDs into a single domain-level reference, so its content is authoritatively *derived* from those upstream documents. Where this v1.1 reconciliation differs from v1.0:

### Process docs to reconcile from (current versions, post-Session 3)

1. MN-INTAKE v2.5
2. MN-MATCH v2.2
3. MN-ENGAGE v2.3
4. MN-INACTIVE v1.2
5. MN-CLOSE v1.1

### Entity PRDs to reconcile from (current versions, post-Session 1)

1. Engagement-Entity-PRD v1.3
2. Session-Entity-PRD v1.1
3. Account-Entity-PRD v1.8 (Section 3.3 Mentoring-Domain Client Fields)
4. Contact-Entity-PRD v1.7

## Specific Carry-Forward Content

### From MN-INTAKE v2.2 → v2.5 (must appear in Domain PRD v1.1 where it didn't in v1.0)

- **Process Workflow (Section 3.1)** — reflect the v2.5 workflow including: optional preferred-mentor selection on intake form, automatic assignment of submitting Contact as Primary Engagement Contact AND as an Engagement Contact, the Pre-Startup derived Account name fallback, and the four CR-MARKETING integration touchpoints (deduplication, clientStatus → Applicant, prospectStatus → Converted, howDidYouHearAboutCbm layered authority).
- **System Requirements (Section 3.1)** — add MN-INTAKE-REQ-008 through MN-INTAKE-REQ-013 in summary form. Detailed implementation lives in MN-INTAKE itself; the Domain PRD's Section 3 captures the authoritative requirement IDs and one-line descriptions.
- **Data Collected (Section 3.1)** — extend the field IDs cited under each entity (Client Organization gains MN-INTAKE-DAT-027 = `applicantSinceTimestamp`; Engagement gains MN-INTAKE-DAT-026 = `Requested Mentor`).

### From MN-MATCH v2.1 → v2.2

- **Process Workflow (Section 3.2)** — add the new step 2 (Requested Mentor preference review before searching the general roster).
- **System Requirements (Section 3.2)** — add MN-MATCH-REQ-009 (Requested Mentor preference review).
- **Process Data (Section 3.2)** — add Requested Mentor (MN-MATCH-DAT-024) reading from Engagement.

### From Engagement Entity PRD v1.2 → v1.3

- **Section 4 Engagement entity table** — add `Requested Mentor` row (relationship, type, MN-INTAKE-DAT-026) per the v1.3 Entity PRD spec.
- **Section 4 Engagement entity table** — modify the `Meeting Cadence` row: Required column changes from `Yes` to `No`. Description should note: "Required at the workflow level when transitioning to Active per MN-MC-CR-006."

### From Account Entity PRD v1.8 (already true at Domain PRD v1.0 time but not captured)

- **Section 4 Client Organization entity table** — add `clientNotes` row (Bonus observation): Type `wysiwyg`, Required `No`, ID per Account Entity PRD v1.8 Section 3.3, Defined In `(Entity PRD-introduced; not referenced by any MN process)`. Description: "Rich-text notes specific to the client relationship. Field-level access control restricted to Client Administrator and above; hidden from mentors per Account Entity PRD v1.8 Implementation Note. Configured post-deployment."
- **Section 4 Client Organization entity table** — add `applicantSinceTimestamp` row: Type `datetime`, Required `No`, Default `(system-populated, first-transition only)`, ID `MN-INTAKE-DAT-027`, Defined In `INTAKE`. Description per MN-INTAKE v2.5 DAT-027 / Account Entity PRD v1.8.

### CR-MARKETING-owned Contact fields touched by MN-INTAKE

Add a **new sub-section to Section 4** (after the existing "Entity: Mentor Contact (Referenced from Mentor Recruitment Domain)" sub-section), titled:

**Entity: Client Contact (CR-MARKETING fields touched by MN-INTAKE)**

This is structurally parallel to the existing Mentor Contact reference table — read/touch references to fields owned by another domain. List the three fields:
- `prospectStatus` (CR-domain owned; transitioned to "Converted" by MN-INTAKE-REQ-012)
- `howDidYouHearAboutCbm` (CR-domain owned; layered-authority write by MN-INTAKE-REQ-013)
- `sourceAttributionDetails` (CR-domain owned; always written by MN-INTAKE-REQ-013 regardless of howDidYouHearAboutCbm guard)

Each row should cite the relevant MN-INTAKE-REQ that drives the touch. Defined In column should read `INTAKE (touch only — owned by CR-MARKETING)`.

### Decisions Made (Section 5)

- Add an entry summarizing the v1.0 → v1.1 reconciliation (one paragraph).
- Add entries for the v2.3/v2.4 MN-INTAKE carry-forwards: the CR-MARKETING integration adoption (REQ-010 through REQ-013), the v2.4 applicantSinceTimestamp addition.
- Add an entry for the v2.2 MN-MATCH Requested Mentor preference adoption.
- Add an entry for the meetingCadence requiredness change from Yes to No (Finding #3 / Option C).

### Open Issues (Section 6)

- Close MN-INTAKE-ISS-002 (resolved by CR-MARKETING integration; the Domain PRD should note the closure).
- Re-review every other Open Issue in v1.0 against the current process doc versions and update statuses as appropriate.

### Header / Revision Control

- Version: `1.0` → `1.1`
- Status: keep at `Draft` unless you have direction otherwise — Domain PRDs are typically `Draft` until stakeholder review (Phase 8 in the methodology).
- Last Updated: current session timestamp in `MM-DD-YY HH:MM` format
- Source: update the reconciliation source line to "Reconciled from MN-INTAKE v2.5, MN-MATCH v2.2, MN-ENGAGE v2.3, MN-INACTIVE v1.2, MN-CLOSE v1.1"
- Processes count line: keep at "5 of 6" — MN-SURVEY remains deferred.

### Change Log

Append a v1.1 entry summarizing every category of change (process workflow updates, requirement additions, data table extensions, entity field additions, decisions appended, open issues closed). Reference the verification pass on 05-05-26 as the source.

## Field ID Drift (Finding #5) — Decision Pending

A separate finding from the verification pass (Finding #5) noted that MN-INTAKE field IDs were renumbered between v2.1 and v2.4 (e.g., Status was MN-INTAKE-DAT-017 in v2.1, is now MN-INTAKE-DAT-021 in v2.4). The Domain PRD v1.0 and the YAML files cite the v2.1 IDs.

The remediation direction for Finding #5 is **deferred** — three options exist (renumber everything to v2.4 IDs in lockstep; adopt append-only convention going forward and revert MN-INTAKE numbering; defer entirely). When this Session 4 prompt is run, ask which Finding #5 option has been chosen:

- If **append-only** has been adopted: cite the v2.1 IDs in the Domain PRD v1.1 (matching the YAMLs and Entity PRD), and add a note in the Change Log that ID consistency follows the append-only convention.
- If **lockstep renumber** has been adopted: cite the v2.4 IDs throughout the Domain PRD v1.1, and flag that the YAMLs and Engagement Entity PRD v1.3 will need a separate ID-citation update session.
- If **defer** has been adopted: cite the v2.1 IDs (matching the YAMLs and Entity PRD) and add a note in the Change Log that ID drift is documented technical debt.

Stop and ask the user which option applies before drafting Section 4 of the Domain PRD.

## What NOT to Change

- Do not modify any process document (MN-INTAKE, MN-MATCH, MN-ENGAGE, MN-INACTIVE, MN-CLOSE).
- Do not modify any Entity PRD.
- Do not modify any YAML file or MANUAL-CONFIG.md file.
- Do not invent new requirements, fields, or decisions — every addition must trace to an existing upstream document.
- Do not mention specific product names (EspoCRM, etc.) anywhere in this Level 2 Domain PRD.

## Documents to Upload

Upload the following with this prompt:
1. `PRDs/MN/CBM-Domain-PRD-Mentoring.docx` (current v1.0)
2. `PRDs/MN/MN-INTAKE.docx` (current v2.5 after Session 3)
3. `PRDs/MN/MN-MATCH.docx` (current v2.2)
4. `PRDs/MN/MN-ENGAGE.docx` (v2.3)
5. `PRDs/MN/MN-INACTIVE.docx` (v1.2)
6. `PRDs/MN/MN-CLOSE.docx` (v1.1)
7. `PRDs/entities/Engagement-Entity-PRD.docx` (v1.3 after Session 1)
8. `PRDs/entities/Session-Entity-PRD.docx` (v1.1)
9. `PRDs/entities/Account-Entity-PRD.docx` (v1.8)
10. `PRDs/entities/Contact-Entity-PRD.docx` (v1.7)

## Output

Produce an updated CBM-Domain-PRD-Mentoring.docx v1.1 and commit it to `PRDs/MN/` in the CBM repo, replacing the existing v1.0 file. Use a single commit titled `docs(MN): Domain PRD v1.1 — re-reconcile from current process doc + Entity PRD versions` and write a descriptive commit body listing every category of change (process workflow updates, requirement additions, data table extensions, entity field additions, decisions appended, open issues closed).

After the work is committed, state that the four-session verification-pass remediation workpacket is complete and provide a brief summary of what changed for full-workpacket review.
