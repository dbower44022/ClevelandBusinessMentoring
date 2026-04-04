# Session Prompt: Notes Service — Service Overview and Process Definition

## Context

I'm working on the CBM CRM implementation. The Notes Service is a Cross-Domain Service identified in the Master PRD (Section 4.1). It provides the ability to attach free-form, timestamped notes to any CRM record. It is consumed by all four domains (MN, MR, CR, FU) and owns a Note entity (currently TBD for Native/Custom in the Entity Inventory).

This service covers general-purpose notes only — structured session notes and engagement notes within the Mentoring domain remain domain-specific to MN.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo — specifically Phase 3 (Domain Overview) and Phase 4 (Cross-Domain Service Definition)
3. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
4. Read the CBM Master PRD uploaded with this prompt — specifically Section 4.1 (Notes Service) and the persona descriptions that reference notes
5. Read the CBM Entity Inventory uploaded with this prompt — specifically the Note entity entry

## What This Session Does

This session combines the Service Overview (Phase 3) and Service Process Definition (Phase 4) into a single conversation. The Notes Service is simple enough that a single process document covers the full scope of the service, making a separate overview and reconciliation unnecessary.

The output is a single process document that serves as both the service definition and the Service PRD for the Notes Service.

### Interview Approach

Conduct a focused interview to define the Notes Service process. The Master PRD provides the starting point — capabilities, consuming domains, and the Note entity. The interview should establish:

- **What records support notes** — which entity types can have notes attached (contacts, accounts, engagements, partners, events, etc.)
- **Note content and structure** — what a note contains (free-form text, category/type, subject, visibility)
- **Who can create and view notes** — access control and visibility rules by persona and role
- **Relationship to domain-specific notes** — how general-purpose notes coexist with MN's structured session notes and engagement notes. Are they the same mechanism with different usage patterns, or distinct features?
- **Note lifecycle** — can notes be edited or deleted after creation? By whom?
- **Workflow and automation** — are there any triggers, notifications, or workflows associated with notes?

### Discuss one topic at a time. Wait for confirmation before moving to the next.

### Signals from the Master PRD

The following references to notes appear in the current Master PRD and domain documents:

- **MR-MANAGE** (Mentor Management): "Administrator notes" listed as a key capability
- **CR-PARTNER** (Partner Relationship Management): "Administrator notes" listed as a key capability
- **FU-STEWARD** (Donor and Sponsor Stewardship): "Administrator notes" listed as a key capability
- **MN-ENGAGE** (Engagement Management): Has structured Engagement Notes and Session Notes that are domain-specific — these are NOT part of the Notes Service

The pattern suggests administrator-authored notes on contact and organization records, but the interview should confirm whether the scope is broader.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in the CBM repo)
2. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in the CBM repo)

## Output

Produce a Notes Service process document with all nine required sections as defined in the Document Production Process (Section 3.5). The document should follow the same standards as domain process documents, including field-level detail for the Note entity.

Since this is both the process document and the effective Service PRD for the Notes Service, the document should be comprehensive enough to serve as the authoritative reference for any domain process document that references the Notes Service.

Commit the document to `PRDs/services/NOTES/NOTES-MANAGE.docx` in the CBM repo.

### Process Code

Use **NOTES-MANAGE** as the process code for the Notes Service process. The identifier prefix for all items in this document is **NOTES-MANAGE** (e.g., NOTES-MANAGE-REQ-001, NOTES-MANAGE-DAT-001).

## After This Session

Once the Notes Service process document is complete:

1. **Entity PRD** — if the interview establishes enough detail about the Note entity, produce the Note Entity PRD. If requirements are still incomplete (e.g., pending CRM platform evaluation), flag it for later.
2. **Domain process documents** that reference notes (MR-MANAGE, CR-PARTNER, FU-STEWARD) can now reference the Notes Service by process code rather than generically.
3. **Next service** — proceed to the next Cross-Domain Service (Email, Calendar, or Survey) following the same pattern.
