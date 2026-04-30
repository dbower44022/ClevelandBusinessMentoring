# Session Prompt: CBM Contribution Entity PRD (Phase 5)

## Context

The Cleveland Business Mentors CRM implementation has completed FU domain Phase 4b process definition. All four FU process documents (FU-PROSPECT v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0) are committed in the `dbower44022/ClevelandBusinessMentoring` repository. The bundled end-of-FU-Phase-4b carry-forward executed 04-30-26 propagated all six new Contact and Account fields surfaced by those process documents into Contact Entity PRD v1.7 and Account Entity PRD v1.8.

This session produces the **Contribution Entity PRD** — the first of two FU-owned Entity PRDs required at Phase 5. Contribution is a custom Base entity owned exclusively by the Fundraising domain. FU-RECORD is the only process that creates Contribution records; FU-STEWARD writes to a subset of fields during the sweep; FU-REPORT consumes Contribution data read-only.

Per the Document Production Process Phase 5 ordering: Entity PRDs are produced **after** the Phase 4 process documents that use them. The fields, enum values, status lifecycle, and dynamic-logic patterns surfaced by the process documents are the input to this session.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with the administrator which CLAUDE.md to read first per the standard working-style preference.
3. Read the Entity PRD interview guide at `PRDs/process/interviews/interview-entity-prd.md` in the crmbuilder repo. Confirm the ten required sections of an Entity PRD are understood.
4. Read the source process documents in the CBM repo (in this order):
   - `PRDs/FU/FU-RECORD.docx` v1.2 — primary source. Section 8.3 (Contribution Fields Created) defines all 18 fields. Section 4.1 defines the Donation canonical happy path; Section 4.2 the Sponsorship variant; Section 4.3 the Grant variant. Section 6 (System Requirements) FU-RECORD-REQ-001 through REQ-024 contain the workflow rules, visibility, audit scope, and rollup calculations the Entity PRD must reflect.
   - `PRDs/FU/FU-STEWARD.docx` v1.0 — secondary source. Section 8.1 (Contribution updates) and FU-STEWARD-REQ-004 establish the FU-STEWARD-side write authorization on the two acknowledgment fields under the hybrid acknowledgment ownership model.
   - `PRDs/FU/FU-REPORT.docx` v1.0 — read-only consumer. Section 7.3 lists the 12 Contribution read references; informs which fields must be queryable, sortable, and aggregated.
   - `PRDs/FU/CBM-Domain-Overview-Fundraising.docx` v1.0 — Data Reference treatment of Contribution at the inventory level.
5. Read the upstream Entity PRDs that constrain or relate to Contribution:
   - `PRDs/entities/Contact-Entity-PRD.docx` v1.7 — donorLifetimeGiving (Section 3.8) is calculated from Contribution.amount across linked Contributions where status = Received via the donorContact link.
   - `PRDs/entities/Account-Entity-PRD.docx` v1.8 — funderLifetimeGiving (Section 3.4) is calculated from Contribution.amount across linked Contributions where status = Received via the donorAccount link.
6. Read the CBM Master PRD v2.5 and Entity Inventory v1.5 for any inventory-level constraints.

## Source Field Inventory (FU-RECORD v1.2 Section 8.3)

The Contribution entity has 18 fields divided into three buckets by visibility:

### Shared Fields (14) — visible regardless of contributionType

| ID | Field | Type | Notes |
|---|---|---|---|
| FU-RECORD-DAT-021 | `contributionType` | enum | Discriminator — Donation, Sponsorship, Grant. No Pledge value (Pledged is a status). No In-Kind value (in-kind handling is via giftType). Coordinator selects explicitly at creation; no default. |
| FU-RECORD-DAT-022 | `status` | enum | Six values: Applied, Pledged, Committed, Received, Unsuccessful, Cancelled. Free-form transitions per FU-RECORD-REQ-008. Coordinator selects explicitly at creation; no default. Audited. |
| FU-RECORD-DAT-023 | `donorContact` | link to Contact | Conditionally required — exactly one of donorContact / donorAccount is required at creation per FU-RECORD-REQ-002 (mutual exclusivity). |
| FU-RECORD-DAT-024 | `donorAccount` | link to Account | Conditionally required — exactly one of donorContact / donorAccount is required at creation. |
| FU-RECORD-DAT-025 | `amount` | currency | Optional; tracked at creation when known. Audited. |
| FU-RECORD-DAT-026 | `commitmentDate` | date | Date a firm commitment was made. Audited. |
| FU-RECORD-DAT-027 | `expectedPaymentDate` | date | Expected date for payment. |
| FU-RECORD-DAT-028 | `receivedDate` | date | Date funds were received (final payment date for multi-payment Grants). Audited. |
| FU-RECORD-DAT-029 | `applicationDate` | date | Date an application was submitted (relevant for Grants in Applied status; optional for other types). Audited. |
| FU-RECORD-DAT-030 | `designation` | text | Free-form designation or restricted-use note. |
| FU-RECORD-DAT-031 | `campaign` | link to Fundraising Campaign | One Campaign per Contribution. Settable, changeable, clearable at any time. No system gating against Completed/Cancelled Campaigns. |
| FU-RECORD-DAT-032 | `acknowledgmentSent` | bool | Hybrid ownership: FU-RECORD primary write at creation per FU-RECORD-REQ-015; FU-STEWARD catch-up write per FU-STEWARD-REQ-004 during the sweep. |
| FU-RECORD-DAT-033 | `acknowledgmentDate` | date | Hybrid ownership companion to acknowledgmentSent. |
| FU-RECORD-DAT-034 | `notes` | wysiwyg | Free-form rich-text notes. |

### Donation-Specific Fields (3) — visible only when contributionType = Donation

| ID | Field | Type | Notes |
|---|---|---|---|
| FU-RECORD-DAT-035 | `giftType` | enum | Cash, Check, Credit Card, In-Kind, Stock, Other. The In-Kind value triggers visibility of the next two fields. |
| FU-RECORD-DAT-036 | `inKindDescription` | text | Visible only when giftType = In-Kind. |
| FU-RECORD-DAT-037 | `inKindValuationBasis` | text | Visible only when giftType = In-Kind. |

### Grant-Specific Field (1) — visible only when contributionType = Grant

| ID | Field | Type | Notes |
|---|---|---|---|
| FU-RECORD-DAT-038 | `nextGrantDeadline` | date | Used by the Grant Deadlines saved list referenced in FU-STEWARD-REQ-009. |

## Constraints From Source Documents

The following constraints are not negotiable — they are decided by the upstream process documents and must flow through to the Entity PRD as written:

* **Native or Custom designation.** Contribution is a custom Base entity per Entity Inventory v1.5. Activity stream is on. Owning domain is FU.
* **Status lifecycle.** Six values — Applied, Pledged, Committed, Received, Unsuccessful, Cancelled — with free-form transitions. No system-driven transitions except the automatic FU-PROSPECT-REQ-006 funderStatus / donorStatus → Active transition when the first Contribution is created (that affects the linked Contact or Account, not the Contribution itself).
* **Type-specific visibility.** contributionType drives dynamic-logic visibility for giftType (Donation only) and nextGrantDeadline (Grant only). giftType drives nested visibility for inKindDescription and inKindValuationBasis (giftType = In-Kind only).
* **Mutual exclusivity at creation.** Exactly one of donorContact / donorAccount must be set at record creation per FU-RECORD-REQ-002. This is creation-time enforcement; later edits are governed by the same one-or-the-other rule.
* **Hybrid acknowledgment ownership.** acknowledgmentSent and acknowledgmentDate are jointly written by FU-RECORD (primary at Contribution creation) and FU-STEWARD (catch-up during sweep). This is documented as a Section 7 Implementation Note plus an entry in Section 9 Decisions Made.
* **Audit scope.** Per FU-RECORD-REQ-016, the audit trail covers status, amount, donor link (donorContact and donorAccount), and four date fields (commitmentDate, expectedPaymentDate, receivedDate, applicationDate). Other fields are not audited.
* **Record-level visibility.** Per FU-RECORD-REQ-019, Contribution records are restricted to Donor / Sponsor Coordinator + Executive Member + System Administrator. Hidden from all other roles including Mentors.
* **Rollup calculations.** Only Contributions in `status = Received` count toward all three rollups: Contact.donorLifetimeGiving (sum across donorContact-linked Contributions), Account.funderLifetimeGiving (sum across donorAccount-linked Contributions), Fundraising Campaign.totalRaised (sum across campaign-linked Contributions). Contributions in any other status (Applied, Pledged, Committed, Unsuccessful, Cancelled) contribute zero to the rollups.
* **Notes Service availability.** Contribution participates in the Notes Service per FU-RECORD-REQ-020 alongside Contact, Account, Engagement, Session, Event, and Fundraising Campaign. The Notes Service is independent of the in-record `notes` field (FU-RECORD-DAT-034). Both coexist by design.
* **Multi-payment Grants.** Grants with multiple payments stay in Committed status until the final payment is received; receivedDate is set to the final payment date; intermediate payments are tracked outside the Contribution record (deferred to Phase 9 implementation).
* **No deletion.** Contribution records persist permanently. Cancellation is via `status = Cancelled`, not deletion. Amendments edit the existing record; offsetting records are not used for bounced / refunded / reversed Contributions.

## Relationships

| Relationship | Related Entity | Link Type | PRD Reference |
|---|---|---|---|
| Contribution → Contact (donor) | Contact | manyToOne | FU-RECORD-DAT-023 |
| Contribution → Account (donor organization) | Account | manyToOne | FU-RECORD-DAT-024 |
| Contribution → Fundraising Campaign | Fundraising Campaign | manyToOne | FU-RECORD-DAT-031 |

The Fundraising Campaign Entity PRD (the next Phase 5 entity) will define the inverse oneToMany side of the Contribution → Fundraising Campaign relationship.

## Open Issues to Resolve or Defer During the Session

The administrator may surface design questions during the session; below are the ones already known. Resolve or defer as appropriate per the working-style preference of one issue at a time.

* **Display labels.** Singular: "Contribution"? Plural: "Contributions"? Confirm with administrator.
* **Discriminator field naming convention.** Custom field naming follows the `cContributionType` (with c-prefix) internal pattern per crmbuilder CLAUDE.md, but the PRD uses the business-language `contributionType`. Confirm the Entity PRD uses business-language names without the c-prefix (per the established Contact and Account PRDs).
* **Layout grouping.** Section 6 layout guidance — recommended panel/tab structure. The Donation-specific fields (giftType + inKind pair) and the Grant-specific field (nextGrantDeadline) are natural panel groupings. Confirm panel structure with administrator.
* **Implementation Notes scope.** Should the multi-payment Grant tracking note appear here or be deferred to the Fundraising Campaign Entity PRD? Default is to include it here as a Section 7 note since the Contribution.status lifecycle is what holds at Committed until final payment.
* **Field-level access control beyond record-level.** All Contribution fields inherit the record-level restriction. No further field-level security is anticipated, but confirm.

## Output

Produce the **Contribution Entity PRD** as a Word document with the standard ten required sections per `interview-entity-prd.md` v1.1:

1. Entity Overview
2. Native Fields (none — Contribution is a custom Base entity)
3. Custom Fields (the 18 fields above, organized by visibility bucket: shared, Donation-specific, Grant-specific)
4. Relationships
5. Dynamic Logic Rules
6. Layout Guidance
7. Implementation Notes
8. Open Issues
9. Decisions Made
10. Change Log (Version 1.0 baseline row)

Commit to `PRDs/entities/Contribution-Entity-PRD.docx` in the CBM repo. Commit the generator script alongside at `PRDs/entities/generate-Contribution-Entity-PRD.js`. Update CLAUDE.md to reflect the new Entity PRD.

## Output Standards Reminder

* Standard metadata table at the top with Document Type, Entity, Implementation, Version, Status, Last Updated (MM-DD-YY HH:MM format), and Source Documents rows.
* Change Log section in Section 10 with v1.0 baseline row.
* Decisions Made entries in Section 9 documenting key design decisions made during the session, with version-tagged entries.
* No product names anywhere in the document — Level 2 Entity PRD per the standard.
* Discuss design issues one at a time and wait for explicit approval before moving to the next item per the standard working-style preference. Once the design is fully approved, generate the document without further confirmation per the same preference.

## After This Session

After the Contribution Entity PRD is committed, the next required step is the **Fundraising Campaign Entity PRD** — the second and final FU-owned Entity PRD. Source: FU-RECORD v1.2 Section 8.4 (Fundraising Campaign Fields Created), 9 fields including the FU-REPORT-surfaced `geographicServiceArea` (FU-RECORD-DAT-047). Once both FU-owned Entity PRDs are complete, **Phase 7 Domain Reconciliation** for FU produces the FU Domain PRD by reconciling all four FU process documents, the FU Domain Overview, and the four FU-touched Entity PRDs (Contact v1.7, Account v1.8, Contribution v1.0, Fundraising Campaign v1.0).

## Documents to Upload

The administrator does not need to upload any documents for this session — all required source documents are accessible from the repository clones. If the administrator chooses to upload anything for convenience, the most useful uploads are the four FU process documents (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT) and the two updated cross-domain Entity PRDs (Contact v1.7, Account v1.8).
