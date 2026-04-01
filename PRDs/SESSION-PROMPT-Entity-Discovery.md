# Session Prompt: CBM Entity Discovery (Phase 2a — Retroactive)

## Context

I'm working on the CBM CRM implementation. Entity Definition (Phase 2) was not completed before Process Definition (Phase 3). During a Phase 6 readiness test, we discovered that the Domain PRDs and process documents lack entity mapping information needed for YAML generation — specifically, the mapping from PRD entity names (e.g., "Client Contact", "Mentor Contact") to actual CRM entities (e.g., the shared Contact entity with a contactType discriminator), and the distinction between native and custom fields.

This session performs Entity Discovery retroactively using the Master PRD and all completed domain documents as input.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the Entity Definition guide at `PRDs/process/interviews/guide-entity-definition.md` in the crmbuilder repo
3. Read the Master PRD uploaded with this prompt
4. Read the Mentoring Domain PRD uploaded with this prompt

## What This Is

Entity Discovery (Phase 2a) extracts all entity concepts from the source documents and maps them to CRM entities. The output is an Entity Inventory document that establishes:

- Every distinct entity concept across all domains
- How each concept maps to a CRM entity
- Native vs. custom designation per CRM entity
- Entity type (Base, Person, Company, Event) for custom entities
- Discriminator fields and values for shared entities
- A cross-domain entity matrix

## Current State

**Mentoring (MN) domain:** Five process documents complete (MN-INTAKE v2.1, MN-MATCH v2.1, MN-ENGAGE v2.3, MN-INACTIVE v1.2, MN-CLOSE v1.1). Domain PRD complete (v1.0).

**Mentor Recruitment (MR), Client Recruiting (CR), Fundraising (FU) domains:** Process documents not yet started. Entity concepts for these domains come from the Master PRD's domain descriptions only.

## Known Entity Concepts

The following entity concepts have been identified from work to date. This is a starting point, not a complete list:

**From the Mentoring domain (process-level detail available):**
- Client Organization — the client business
- Client Contact — individuals at the client business
- Engagement — the mentoring relationship
- Session — individual mentoring meetings
- Mentor Contact — volunteer mentors (fields referenced from MR domain)

**From the Master PRD (summary-level only):**
- Partner Organization — community partner businesses
- Partner Contact — individuals at partner organizations
- Donor/Sponsor Organization — funding entities
- Donor/Sponsor Contact — individuals at funding entities
- Partnership Agreement — terms and dates for partner relationships
- Donation/Sponsorship/Grant/Pledge records — funding records
- Fundraising Campaign — campaign tracking
- Event/Workshop — programming records
- Event Registration/Attendance — event participation
- Prospect Contact — outreach targets (mentor and client recruitment)
- Member — general organizational members

## Known Implementation Facts

The following facts are known from the existing CBM implementation:

- The CRM platform uses a native **Contact** entity (Person type) with a **contactType** field that distinguishes Client, Mentor, Partner Contact, and Administrator
- The CRM platform uses a native **Account** entity (Company type) for organizations
- **Engagement** is a custom entity (Base type)
- **Session** is a custom entity (Event type)
- The existing YAML files in the `programs/` directory show the current field implementation (these predate the current PRD process and may not match the PRDs)

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in the CBM repo)
2. **CBM-Domain-PRD-Mentoring.docx** — the Mentoring Domain PRD (from `PRDs/MN/`)

## Output

Produce the Entity Inventory as a Word document and commit to:
`PRDs/CBM-Entity-Inventory.docx` in the CBM repo.

## After This Session

Once the Entity Inventory is complete, the next step is Phase 2b — Entity PRDs, one conversation per CRM entity. Priority order should be:

1. **Contact** — the most complex shared entity, spans MN, MR, CR domains
2. **Account** — shared entity, spans MN, CR, FU domains
3. **Engagement** — custom entity, heaviest field set, MN domain only
4. **Session** — custom entity, MN domain only
5. Remaining entities from MR, CR, FU domains as those domains are defined

For entities that span domains where process documents don't exist yet (MR, CR, FU), the Entity PRD should document what is known from the Master PRD and flag incomplete domains for future updates.
