# Session Prompt: CBM Contact Entity PRD (Phase 2b)

## Context

I'm working on the CBM CRM implementation. Entity Discovery (Phase 2a) is complete — the Entity Inventory v1.0 establishes that Contact is a native EspoCRM entity (Person type) shared across all four domains using a multiEnum contactType discriminator with seven values: Client, Mentor, Partner, Administrator, Presenter, Donor, Member.

This session produces the Contact Entity PRD — the implementation-ready specification for the Contact entity.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Entity Definition guide at `PRDs/process/interviews/guide-entity-definition.md` in the crmbuilder repo (Phase 2b section)
3. Read all documents uploaded with this prompt

## What This Is

The Contact Entity PRD consolidates everything needed for YAML generation for the Contact entity:

* All fields from all domains that contribute to this entity
* Native vs. custom designation per field
* Shared fields vs. type-specific fields
* Dynamic logic visibility rules based on contactType
* Relationships to other entities
* Implementation notes

## Current State

**Contact is the most complex entity in the CBM implementation.** It spans all four domains and serves seven contact types. Type-specific fields are controlled by dynamic logic visibility rules using "contactType has [value]" conditions.

**Key design decisions from Entity Discovery:**

* contactType is multiEnum — a single Contact can hold multiple types simultaneously (e.g., Mentor + Presenter + Administrator)
* Prospect is a lifecycle state, not a contactType value — mentor prospects are Contacts with contactType = Mentor at Mentor Status = Prospect
* Each contact type may have its own lifecycle field (Mentor Status is defined; Client, Partner, and Donor lifecycle fields are open issues EI-ISS-004, EI-ISS-005, EI-ISS-006)

**Available field-level data:**

* **Mentoring (MN) domain:** Complete field-level detail from the MN Domain PRD v1.0 — Client Contact fields (MN-INTAKE-DAT-008 through DAT-016) and Mentor Contact fields referenced from MR domain (MN-MATCH-DAT-011 through DAT-018)
* **Mentor Recruitment (MR) domain:** Summary-level from Master PRD only. The MN Domain PRD references MR-owned Mentor Contact fields (Industry Sectors, Mentoring Focus Areas, Skills/Expertise Tags, Fluent Languages, Mentor Status, Accepting New Clients, Maximum Client Capacity, Available Capacity)
* **Client Recruiting (CR) domain:** Summary-level from Master PRD only
* **Fundraising (FU) domain:** Summary-level from Master PRD only

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
2. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
3. **CBM-Domain-PRD-Mentoring.docx** — the MN Domain PRD (from `PRDs/MN/` in CBM repo)

## Output

Produce the Contact Entity PRD as a Word document and commit to:
`PRDs/entities/Contact-Entity-PRD.docx` in the CBM repo.

## Key Questions to Resolve

1. Which EspoCRM native fields exist on the Person entity type? Document all native fields so they are not duplicated as custom fields.
2. For each custom field: is it shared across all contact types, or type-specific? Type-specific fields need dynamic logic visibility rules.
3. Type-specific lifecycle fields: Mentor Status is partially defined (10 values). What about Client, Partner, Donor, and other type lifecycles?
4. Relationship inventory: all relationships involving Contact (to Account, Engagement, Session, Event, Contribution, etc.)
5. Dynamic logic rules: consolidated visibility rules grouped by contactType value.

## After This Session

The next Entity PRD should be Account (the second cross-domain shared entity), followed by Engagement and Session.
