# Session Prompt: CBM Dues Entity PRD (Phase 2b)

## Context

I'm working on the CBM CRM implementation. Entity Discovery (Phase 2a) is complete. The Dues entity was defined inline during MR-MANAGE (Mentor Management) where the business need emerged. It is not yet in the Entity Inventory. Four Entity PRDs are complete (Contact, Account, Engagement, Session). All five MR domain process documents are complete, and the MR Domain PRD v1.0 has been reconciled.

This session produces the Dues Entity PRD — the implementation-ready specification for the Dues entity.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Entity Definition guide at `PRDs/process/interviews/guide-entity-definition.md` in the crmbuilder repo (Phase 2b section)
3. Read the Entity PRD generator template at `PRDs/process/templates/generate-entity-prd-template.js` in the crmbuilder repo
4. Read all documents uploaded with this prompt

## What This Is

The Dues Entity PRD consolidates everything needed for YAML generation for the Dues entity:

* All fields from the inline definition in MR-MANAGE
* Native vs. custom designation per field
* Relationship to the Contact entity
* Implementation notes for status transitions and conditional fields
* Resolution or carry-forward of open issues related to dues billing

## Current State

Dues is a single-domain custom entity owned exclusively by the Mentor Recruitment (MR) domain. It represents one annual dues obligation for a single mentor. One record is created per mentor per billing year. Dues records provide a complete payment history independent of the summary duesStatus and duesPaymentDate fields on the mentor Contact record.

**Key design decisions from prior work:**

* Contact Entity PRD: Defines duesStatus (enum: Unpaid, Paid, Waived) and duesPaymentDate (date) as summary fields on the Contact entity, maintained by the Mentor Administrator independently of individual Dues records. Both are admin-only fields.
* MR-MANAGE: Defines the Dues entity inline with 8 fields and the Contact → Dues (one-to-many) relationship. Dues records are created and managed by the Mentor Administrator.

**Available field-level data:**

All Dues fields come from **MR-MANAGE**, consolidated in the MR Domain PRD Section 4:

* **MR-MANAGE-DAT-028:** mentorContact (relationship — the mentor this dues record belongs to)
* **MR-MANAGE-DAT-029:** billingYear (int — calendar year; TBD whether billing cycle is calendar year or another cycle, see MR-MANAGE-ISS-001)
* **MR-MANAGE-DAT-030:** amount (currency — dues amount invoiced; TBD whether uniform or varies, see MR-MANAGE-ISS-002)
* **MR-MANAGE-DAT-031:** dueDate (date — date by which payment is expected)
* **MR-MANAGE-DAT-032:** paymentStatus (enum — Unpaid, Paid, Waived)
* **MR-MANAGE-DAT-033:** paymentDate (date — date payment was received; not applicable when Waived)
* **MR-MANAGE-DAT-034:** paymentMethod (enum — Online Payment, Check, Waived)
* **MR-MANAGE-DAT-035:** notes (text — additional notes, admin-only)

**Relationship:**

* Contact → Dues (one-to-many): A mentor has one Dues record per billing year.

## Open Issues Carrying Forward

Five open issues from MR-MANAGE relate to dues billing business rules. These should be addressed during the interview if the administrator has answers, or carried forward into the Entity PRD's open issues section if still unresolved:

* **MR-MANAGE-ISS-001:** Dues billing cycle — calendar year, fiscal year, or activation anniversary?
* **MR-MANAGE-ISS-002:** Dues amount — uniform or variable? How is it set each year?
* **MR-MANAGE-ISS-004:** Dues grace period — how many days past due date before alert?
* **MR-MANAGE-ISS-005:** Consequences of non-payment — does it affect Mentor Status or assignment eligibility?
* **MR-MANAGE-ISS-006:** Dues eligibility — are all Active mentors required to pay, or are there exemptions?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
2. **CBM-Domain-PRD-MentorRecruitment.docx** — the MR Domain PRD (from `PRDs/MR/` in CBM repo)
3. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)

The MR-MANAGE process document is not required as a separate upload — all Dues fields are consolidated in the MR Domain PRD.

## Efficiency Improvements

This session uses the same approach as prior Entity PRDs:

### 1. Batched Decisions

Dues is a single-domain entity with no type discriminator and all fields from a single process (MR-MANAGE). The entity is simple — 8 fields, one relationship, one persona (Mentor Administrator). Compile the full field inventory and present in two buckets:

* **Straightforward** — fields where the name, type, and requirements are clear from the source documents (confirm as a group)
* **Needs discussion** — fields where there are design questions (native field overlap, open issues, conditional requirements)

### 2. Generator Template

Use the Entity PRD generator template. Same workflow as prior Entity PRDs:
1. Copy the template to a working file
2. Replace the ENTITY object with Dues-specific data
3. Run with Node.js to generate the .docx
4. Validate with the docx validation script
5. Commit to `PRDs/entities/Dues-Entity-PRD.docx` in the CBM repo

## Key Questions to Resolve

1. **CRM entity type.** The Entity Inventory lists Dues as Native/Custom TBD. This is a simple child record — likely a custom Base entity. Confirm.
2. **The native `name` field.** What should the Dues record name contain? Auto-generated as {Mentor Name} — {Billing Year}?
3. **notes field vs. Notes Service.** MR-MANAGE defines a text `notes` field on Dues. The Notes Service (NOTES-MANAGE) explicitly excludes Dues from supported record types. Confirm the inline text field is the right approach for this entity.
4. **paymentMethod value "Waived."** When paymentStatus = Waived, should paymentMethod also be set to Waived, or should paymentMethod be hidden/not applicable when waived?
5. **Open issues resolution.** Attempt to resolve as many of the five carrying-forward open issues (ISS-001, ISS-002, ISS-004, ISS-005, ISS-006) as possible. Any that remain unresolved carry into the Dues Entity PRD's open issues section.

## Output

Produce the Dues Entity PRD as a Word document using the generator template and commit to: `PRDs/entities/Dues-Entity-PRD.docx` in the CBM repo.

Also update the Entity Inventory to include the Dues entity (add a row to the inventory table and update any summary counts).

## After This Session

With the Dues Entity PRD complete and the Entity Inventory updated:

* All MR domain entities are fully defined
* All pending updates from the MR domain reconciliation are applied
* The next major work items are: remaining Cross-Domain Services (Email, Calendar, Survey), CR Domain Overview and Sub-Domain Overviews (Phase 3), or the MN-SURVEY process document
