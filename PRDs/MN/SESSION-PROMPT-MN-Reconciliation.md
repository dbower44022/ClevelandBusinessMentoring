# Session Prompt: Mentoring Domain Reconciliation

## Context

I'm continuing work on the CBM CRM implementation — specifically, performing Domain Reconciliation for the Mentoring (MN) domain. All five Mentoring domain processes have been defined. This is a reconciliation/synthesis task, not an interview.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the domain reconciliation guide at `PRDs/process/interviews/guide-domain-reconciliation.md` in the crmbuilder repo — this defines the Domain PRD structure, reconciliation approach, and all formatting standards
3. Read the generator template at `PRDs/process/templates/generate-process-doc-template.js` in the crmbuilder repo — this defines the Word document formatting
4. Read all five Mentoring domain process documents uploaded with this prompt:
   - MN-INTAKE.docx (Client Intake, v2.0)
   - MN-MATCH.docx (Mentor Matching, v2.0)
   - MN-ENGAGE.docx (Engagement Management, v2.2)
   - MN-INACTIVE.docx (Activity Monitoring, v1.1)
   - MN-CLOSE.docx (Engagement Closure, v1.0)

## What This Is

Domain Reconciliation (Phase 4) synthesizes all process documents for a single domain into a consolidated Domain PRD. The AI reads all five process documents, assembles them into the Domain PRD structure, and surfaces any conflicts or inconsistencies for the administrator to resolve.

## Documents to Upload

Upload the following six documents with this prompt:

1. **CBM-Master-PRD.md** — the Master PRD (from `PRDs/` root in the CBM repo)
2. **MN-INTAKE.docx** — Client Intake process (from `PRDs/MN/`)
3. **MN-MATCH.docx** — Mentor Matching process (from `PRDs/MN/`)
4. **MN-ENGAGE.docx** — Engagement Management process (from `PRDs/MN/`)
5. **MN-INACTIVE.docx** — Activity Monitoring process (from `PRDs/MN/`)
6. **MN-CLOSE.docx** — Engagement Closure process (from `PRDs/MN/`)

## Known Items Requiring Attention

The following items were identified across the five process documents and should be addressed during reconciliation:

### Open Issues (Unresolved)

- **MN-INTAKE-ISS-001:** Mentoring Focus Areas — complete list of allowed values not defined. Referenced by MN-INTAKE, MN-MATCH, and MN-ENGAGE.
- **MN-ENGAGE-ISS-001:** Research how the system can automatically generate a video conferencing link when creating a meeting request from the Next Session Date/Time field.
- **MN-ENGAGE-ISS-002:** Topics Covered — complete list of allowed values not defined.
- **MN-CLOSE-ISS-001:** Close Reason — complete list of allowed values needs finalization. Current values: Goals Achieved, Client Withdrew, Inactive / No Response, Other.
- **MN-CLOSE-ISS-002:** Additional engagement outcome metrics may be needed beyond the six currently defined.
- **MN-CLOSE-ISS-003:** Closed Engagement Survey response tracking — TBD whether responses are captured in the CRM or handled by an external survey tool.

### Cross-Process Data to Reconcile

- **Engagement Status** is defined across all five processes. The full value set (Submitted, Declined, Pending Acceptance, Assigned, Active, On-Hold, Dormant, Inactive, Abandoned, Completed) and transition rules must be consolidated.
- **Close Date** and **Close Reason** are written by MN-INTAKE (Declined), MN-INACTIVE (Abandoned), and MN-CLOSE (Completed). The consolidated view should show all three processes' usage.
- **New Business Started** was moved from Session (MN-ENGAGE) to Engagement (MN-CLOSE) in v2.2 of MN-ENGAGE. Verify no residual references.
- **Engagement Contacts** auto-assignment at creation was added to MN-INTAKE (REQ-007) based on a finding during MN-ENGAGE. Verify consistency.
- **Hold End Date** was added to MN-ENGAGE (v2.1) based on a finding during MN-INACTIVE. Verify consistency.

### Entities Involved

The Mentoring domain spans these entities:

- **Client Organization** — the client business
- **Client Contact** — individuals at the client business
- **Engagement** — the mentoring relationship (heaviest field set)
- **Session** — individual mentoring meetings
- **Mentor Contact** — volunteer mentors (fields referenced from MR domain, not owned by MN)

## Output

Produce the Mentoring Domain PRD as a Word document and commit to:
`PRDs/MN/CBM-Domain-PRD-Mentoring.docx` in the CBM repo.
