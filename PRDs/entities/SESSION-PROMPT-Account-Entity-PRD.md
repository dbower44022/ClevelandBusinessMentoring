# Session Prompt: CBM Account Entity PRD (Phase 2b)

## Context

I'm working on the CBM CRM implementation. Entity Discovery (Phase 2a) is complete — the Entity Inventory v1.0 establishes that Account is a native EspoCRM entity (Company type) shared across three domains using a multiEnum accountType discriminator with three values: Client, Partner, Donor/Sponsor.

The Contact Entity PRD v1.0 is complete. It established that the Primary Contact designation is a bool on the Contact-to-Account relationship (CON-DEC-001), which must be defined in this document.

This session produces the Account Entity PRD — the implementation-ready specification for the Account entity.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Entity Definition guide at `PRDs/process/interviews/guide-entity-definition.md` in the crmbuilder repo (Phase 2b section)
3. Read the Entity PRD generator template at `PRDs/process/templates/generate-entity-prd-template.js` in the crmbuilder repo
4. Read all documents uploaded with this prompt

## What This Is

The Account Entity PRD consolidates everything needed for YAML generation for the Account entity:

* All fields from all domains that contribute to this entity
* Native vs. custom designation per field
* Shared fields vs. type-specific fields
* Dynamic logic visibility rules based on accountType
* Relationships to other entities (including the Contact-to-Account relationship with Primary Contact bool)
* Implementation notes

## Current State

Account is the second cross-domain shared entity. It spans three domains (MN, CR, FU) and serves three account types. Type-specific fields are controlled by dynamic logic visibility rules using "accountType has [value]" conditions.

**Key design decisions from Entity Discovery:**

* accountType is multiEnum — a single Account can hold multiple types simultaneously (e.g., a Partner that also provides funding would be both Partner and Donor/Sponsor)
* No account-level lifecycle fields are defined yet (EI-ISS-007 — to be resolved during this session or deferred)

**Available field-level data:**

* **Mentoring (MN) domain:** Complete field-level detail from the MN Domain PRD v1.0 — Client Organization fields (MN-INTAKE-DAT-001 through DAT-007)
* **Client Recruiting (CR) domain:** Summary-level from Master PRD and legacy CR Domain PRD. Partner Organization profile fields referenced at requirement level (CR-PARTNER-REQ-001 through REQ-012)
* **Fundraising (FU) domain:** Summary-level from Master PRD and legacy FU Domain PRD. Donor/Sponsor Organization profile fields referenced at requirement level

**From the Contact Entity PRD:**

* CON-DEC-001: Primary Contact is a bool on the Contact-to-Account relationship. This relationship must be defined in the Account Entity PRD.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
2. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
3. **CBM-Domain-PRD-Mentoring.docx** — the MN Domain PRD (from `PRDs/MN/` in CBM repo)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)

## Efficiency Improvements

This session uses two improvements from the Contact Entity PRD lessons learned:

### 1. Batched Decisions

Instead of asking about each field individually, compile the full field inventory from source documents and present it in three buckets:

* **Clearly shared** — fields that obviously apply to all account types (confirm as a group)
* **Clearly type-specific** — fields that obviously belong to one account type (confirm as a group)
* **Needs discussion** — fields where the scope is ambiguous or where design decisions are required

I'll confirm or adjust the first two buckets as groups. We spend our time on the third bucket.

### 2. Generator Template

Use the Entity PRD generator template at `PRDs/process/templates/generate-entity-prd-template.js` in the crmbuilder repo. The template has two parts:

* **ENTITY object** (top of file) — structured data for this specific entity. Replace with Account-specific content from our session.
* **Rendering engine** (bottom of file) — shared infrastructure that produces the Word document. Do not modify.

**Workflow:**
1. Copy the template to a working file
2. Replace the ENTITY object with Account-specific data based on our session decisions
3. Run with Node.js to generate the .docx
4. Validate with the docx validation script
5. Commit to `PRDs/entities/Account-Entity-PRD.docx` in the CBM repo

## Key Questions to Resolve

1. Which EspoCRM native fields exist on the Company entity type? Document all native fields so they are not duplicated as custom fields.
2. Account-level lifecycle fields: Client Account, Partner Account, and Donor/Sponsor Account may each need type-specific lifecycle fields (EI-ISS-007). Resolve or defer.
3. The Contact-to-Account relationship: define the Primary Contact bool and any other relationship-level attributes.
4. Partner-specific fields from CR domain: partner type, geographic service area, partner status, agreement tracking — which are Account fields vs. separate entity fields?
5. Donor/Sponsor-specific fields from FU domain: giving history, lifetime value — which are Account fields vs. Contribution entity fields?
6. Parent-child organizational hierarchy (CR-PARTNER-REQ-009) — is this a native Account capability or requires custom implementation?

## Output

Produce the Account Entity PRD as a Word document using the generator template and commit to: `PRDs/entities/Account-Entity-PRD.docx` in the CBM repo.

## After This Session

The next Entity PRD should be Engagement (single-domain custom entity with the heaviest field set), followed by Session.
