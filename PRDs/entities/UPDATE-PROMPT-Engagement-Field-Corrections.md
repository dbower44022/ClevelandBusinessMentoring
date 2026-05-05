# Update Prompt: Engagement Field Corrections (requestedMentor, meetingCadence)

## Context

I'm working on the CBM CRM implementation. A verification pass against the Mentoring (MN) Domain PRD on 05-05-26 surfaced two field-level issues on the Engagement entity that need coordinated fixes across the Engagement Entity PRD, the MN-Engagement.yaml program file, and the MN domain MANUAL-CONFIG.md.

This is Session 1 of a four-session remediation workpacket. It addresses:
- **Finding #1 (HIGH):** missing `requestedMentor` field on Engagement
- **Finding #3 (MEDIUM):** `meetingCadence` requiredness conflicts with the intake flow (Option C remediation selected: remove the requiredness)
- **Finding #4 partial:** the `MN-MC-CR-006` MANUAL-CONFIG entry that pairs with the meetingCadence change (the other Finding #4 entries are addressed in Session 2)

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)

## The Changes

### Change 1 — Add `requestedMentor` field to Engagement

The MN-INTAKE process document v2.2+ added a `Requested Mentor` field on the Engagement entity (MN-INTAKE-DAT-026) that allows clients to optionally indicate a preferred mentor on the intake form. MN-MATCH v2.2 added MN-MATCH-REQ-009 requiring the Client Assignment Coordinator to review this preference before searching the general roster.

The field is missing from:
- Engagement Entity PRD v1.2 (Section 4 Relationships and the custom-fields sections)
- MN-Engagement.yaml (no field, no relationship)

**Field shape:**
- Name: `requestedMentor`
- Type: relationship (manyToOne from Engagement → Contact)
- Required: No
- Source: Set from the intake form during MN-INTAKE
- Use: Reviewed by the Client Assignment Coordinator during MN-MATCH per MN-MATCH-REQ-009
- Semantic note: This is a preference, not a guarantee. The coordinator is not obligated to honor the request.

**Structurally parallel to** the existing `engagementAssignedMentor` relationship (manyToOne, Engagement → Contact, audited:false).

### Change 2 — Change `meetingCadence` requiredness from Yes to No

Domain PRD v1.0, Engagement Entity PRD v1.2, and MN-Engagement.yaml all currently mark `meetingCadence` as `Required = Yes` / `required: true`. But the field's own description states it is "set by the mentor after the first session" — and the intake flow (MN-INTAKE v2.4 Section 8) does not populate this field at Engagement creation time.

With `required: true` and no default, EspoCRM rejects the initial Engagement creation at MN-INTAKE. This is a deployment-blocking conflict not yet surfaced because the 05-04-26 deployment validation pass tested schema deployment, not record creation through the intake flow.

**Remediation (Option C — selected):**
- Set `meetingCadence` to `required: false` at the field level (no `requiredWhen` clause)
- Defer enforcement to a workflow validation at the Assigned → Active transition (i.e., when the first Session reaches Completed status)
- Capture the workflow validation in MN-MANUAL-CONFIG.md as a new MN-MC-CR-006 entry

This matches how Session entity already handles fields like `sessionType`, `meetingLocationType`, and the attendee minimums — all `required: false` at field level, workflow-validated at status transition.

## Specific Edits Required

### Engagement Entity PRD v1.2 → v1.3

File: `PRDs/entities/Engagement-Entity-PRD.docx`

1. **Section 4 (Relationships):** add a new row to the relationships table:
   - Relationship: `Requested Mentor → Engagement`
   - Related Entity: `Contact`
   - Link Type: `manyToOne`
   - PRD Reference: `MN-INTAKE-DAT-026`
   - Domain(s): `MN`

2. **Section 4 — add a new note paragraph** after the existing notes, titled "Note on Requested Mentor": describe that this is an optional client preference set during MN-INTAKE, reviewed by the Client Assignment Coordinator during MN-MATCH per MN-MATCH-REQ-009, and that it does not bind the coordinator to the requested mentor.

3. **Section 3 (Custom Fields) — extend Section 3.2 Mentoring Context table** by adding a new row for `requestedMentor`:
   - Field Name: `requestedMentor`
   - Type: `link` (this matches how `referringPartner` is documented in Section 3.7 — a link field appearing in custom-fields tables for completeness even though it is implemented via the relationships block in YAML)
   - Required: `No`
   - Values: `Link to Contact (Mentor)`
   - Default: `—`
   - ID: `MN-INTAKE-DAT-026`
   - Description: "The mentor selected by the client during MN-INTAKE as a preferred mentor. Optional; the Client Assignment Coordinator reviews this preference during MN-MATCH per MN-MATCH-REQ-009 but is not obligated to honor it. Set from the intake form. Domains: MN (INTAKE, MATCH)."

4. **Section 3.1 (Lifecycle and Status) — modify the meetingCadence row:**
   - Required column: change from `Yes` to `No`
   - Description: append "Required when the engagement transitions from Assigned to Active (first Session reaches Completed). Workflow-enforced post-deployment per MN-MC-CR-006 — see MANUAL-CONFIG.md."

5. **Section 7 (Implementation Notes):** add a new note (renumber as needed):
   "Conditional requiredness for meetingCadence: meetingCadence is `Required = No` at the field level so that Engagement records can be created at MN-INTAKE before any session has occurred. The mentor sets meetingCadence after the first session per MN-ENGAGE workflow. Validation that meetingCadence is populated before the engagement transitions to Active is enforced via a post-deployment workflow per MN-MC-CR-006."

6. **Header:** version 1.2 → 1.3, Last Updated to current session timestamp (MM-DD-YY HH:MM).

7. **Change Log:** append a v1.3 entry summarizing the two changes (requestedMentor added, meetingCadence requiredness relaxed) and pointing to the verification pass that surfaced both.

### MN-Engagement.yaml content_version 1.0.0 → 1.0.1

File: `programs/MN/MN-Engagement.yaml`

1. **Add new relationship to the `relationships:` block** (after `engagementReferringPartner` to keep the parallel structure with `engagementAssignedMentor`):

```yaml
  - name: engagementRequestedMentor
    description: >
      Optional client-selected preferred mentor recorded at MN-INTAKE
      via the intake form's preferred-mentor selector. Reviewed by the
      Client Assignment Coordinator during MN-MATCH per MN-MATCH-REQ-009;
      a preference, not a guarantee. manyToOne — many engagements may
      request the same mentor. See PRD MN-INTAKE-DAT-026 / MN-MATCH-DAT-024.
    entity: Engagement
    entityForeign: Contact
    linkType: manyToOne
    link: requestedMentor
    linkForeign: requestedEngagements
    label: "Requested Mentor"
    labelForeign: "Requested Engagements (as Mentor)"
    audited: false
```

2. **Modify the `meetingCadence` field block:**
   - Change `required: true` to `required: false`
   - Update the description to note the workflow-validation deferral, e.g., append: "Required at the workflow level when the engagement transitions from Assigned to Active per MN-MC-CR-006 — not enforced as a field-level constraint so that intake-stage records can be created before a meeting cadence has been agreed on."

3. **content_version:** bump from `"1.0.0"` to `"1.0.1"`.

4. **File-level description block (top of file):** add a brief sentence noting the v1.0.1 changes — addition of engagementRequestedMentor relationship and meetingCadence requiredness change — and reference the source verification pass.

### MN-MANUAL-CONFIG.md additions

File: `programs/MN/MANUAL-CONFIG.md`

1. **Under "Conditional-Required (Workflow-Validated)" section, add a new entry:**

```markdown
### MN-MC-CR-006 — Engagement.meetingCadence required at first-Session-Completed transition

- **Source.** Engagement Entity PRD v1.3 Implementation Note (new),
  MN-ENGAGE workflow, Domain PRD v1.0+ Section 4.
- **Description.** When the first Session on an Engagement reaches
  Completed status and the system transitions Engagement.engagementStatus
  from Assigned to Active (per MN-MC-AA-008), validate that
  Engagement.meetingCadence is populated. Block the transition with a
  user-facing message if meetingCadence is empty. Pairs with MN-MC-AA-008
  (the first-completed-Session activates Engagement workflow).
- **Dependencies.** Engagement entity, engagementStatus, meetingCadence,
  Session entity, parent link.
```

2. **Update the Summary table at the bottom of the file:**
   - "Conditional-Required (Workflow-Validated)" count: 5 → 6
   - "Total" count: 45 → 46

3. **Header:** Last Updated to current session timestamp.

## What NOT to Change

- Do not modify any other field on Engagement, any field on Session, or any field on Account/Contact.
- Do not modify the Domain PRD in this session — that is Session 4 of the workpacket and reconciles all sessions' changes together.
- Do not modify any other process documents (MN-INTAKE, MN-MATCH, etc.) in this session — this session focuses on the entity-level and YAML-level corrections only.
- Do not add a `requestedMentor` field declaration in the `fields:` block of MN-Engagement.yaml. Per the YAML schema rule, link relationships go exclusively in the `relationships:` block; `type: link` is rejected at validation time.

## Documents to Upload

Upload the following with this prompt:
1. `PRDs/entities/Engagement-Entity-PRD.docx` (current v1.2)
2. `programs/MN/MN-Engagement.yaml` (current v1.0.0)
3. `programs/MN/MANUAL-CONFIG.md`

## Output

Produce updated versions of all three files and commit them to the CBM repo:
- `PRDs/entities/Engagement-Entity-PRD.docx` v1.3 (replacing v1.2)
- `programs/MN/MN-Engagement.yaml` content_version 1.0.1 (replacing 1.0.0)
- `programs/MN/MANUAL-CONFIG.md` (with the new MN-MC-CR-006 entry and Summary table updated)

Use a single commit titled `feat(MN): add requestedMentor + relax meetingCadence requiredness (Engagement v1.3, YAML 1.0.1)` and write a descriptive commit body summarizing the three artifact changes.

After the work is committed, state the next required step (Session 2 of the workpacket) and provide a brief summary of what changed for review.
