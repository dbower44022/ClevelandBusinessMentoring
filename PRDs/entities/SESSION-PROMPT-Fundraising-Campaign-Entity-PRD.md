# Session Prompt: CBM Fundraising Campaign Entity PRD (Phase 5)

## Context

The Cleveland Business Mentors CRM implementation has completed the first of two FU-owned Phase 5 Entity PRDs. The Contribution Entity PRD v1.0 was committed on 04-30-26 to the `dbower44022/ClevelandBusinessMentoring` repository at `PRDs/entities/Contribution-Entity-PRD.docx`, alongside its generator script at `PRDs/entities/generate-Contribution-Entity-PRD.js`. The Contribution Entity PRD established the Contribution-side manyToOne relationship to Fundraising Campaign through the `campaign` field; this Entity PRD defines the inverse oneToMany side and the rest of the Fundraising Campaign entity structure.

This session produces the **Fundraising Campaign Entity PRD** — the second and final FU-owned Entity PRD required at Phase 5. Fundraising Campaign is a custom Base entity owned exclusively by the Fundraising domain. FU-RECORD is the only process that creates Fundraising Campaign records; FU-STEWARD does not write to Fundraising Campaign records (sweep-related campaign work is handled through Contribution-side updates); FU-REPORT consumes Fundraising Campaign data read-only across the ten defined Fundraising reports plus ad-hoc reporting.

Per the Document Production Process Phase 5 ordering: Entity PRDs are produced **after** the Phase 4 process documents that use them. The fields, enum values, status lifecycle, and dynamic-logic patterns surfaced by FU-RECORD v1.2 are the input to this session.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with the administrator which CLAUDE.md to read first per the standard working-style preference.
3. Read the Entity PRD interview guide at `PRDs/process/interviews/interview-entity-prd.md` in the crmbuilder repo. Confirm the section structure used by the established Entity PRD pattern in this implementation (nine sections, no Section 10 Change Log — version baseline recorded as the first Decisions Made entry per the precedent set by all twelve prior Entity PRDs and continued by Contribution Entity PRD v1.0).
4. Read the source process documents in the CBM repo (in this order):
   - `PRDs/FU/FU-RECORD.docx` v1.2 — primary source. Section 8.4 (Fundraising Campaign Fields Created) defines all nine fields including `geographicServiceArea` at FU-RECORD-DAT-047 (added by mid-interview carry-forward during FU-REPORT process definition). Section 4.4 (Fundraising Campaign Workflow) defines the canonical workflow. Section 6 (System Requirements) FU-RECORD-REQ-004, REQ-005, REQ-008, REQ-011, and REQ-022 contain the workflow rules, status lifecycle, totalRaised calculation, and visibility requirements specific to Fundraising Campaign.
   - `PRDs/FU/FU-STEWARD.docx` v1.0 — confirm that FU-STEWARD does not write to Fundraising Campaign records. Sweep-related campaign work flows through Contribution-side updates only. The Section 8 Data Collected items FU-STEWARD-DAT-017 through DAT-026 cover Contact, Account, and Contribution updates; no Fundraising Campaign update items exist.
   - `PRDs/FU/FU-REPORT.docx` v1.0 — read-only consumer. Section 7.4 lists the eight Fundraising Campaign read references at FU-REPORT-DAT-030 through DAT-037. Informs which fields must be queryable, sortable, and aggregated across the ten defined reports.
   - `PRDs/FU/CBM-Domain-Overview-Fundraising.docx` v1.0 — Data Reference treatment of Fundraising Campaign at the inventory level.
5. Read the upstream and adjacent Entity PRDs that constrain or relate to Fundraising Campaign:
   - `PRDs/entities/Contribution-Entity-PRD.docx` v1.0 — establishes the Contribution-side manyToOne relationship via the `campaign` field (Section 3.1) and the totalRaised rollup driver (Implementation Note 10). The Fundraising Campaign Entity PRD defines the inverse oneToMany side.
   - `PRDs/entities/Account-Entity-PRD.docx` v1.8 — Section 3.3 `geographicServiceArea` (multiEnum zip code list). Fundraising Campaign carries the same field structure per ACT-ISS-004 closure and FU-RECORD-DAT-047 description.
6. Read the CBM Master PRD v2.5 and Entity Inventory v1.5 for any inventory-level constraints. Section 4.8 of the Entity Inventory establishes the inventory-level facts: Custom Base entity, Display Label "Fundraising Campaign" / "Fundraising Campaigns", Owning Domain Fundraising (FU), Activity Stream Yes.

## Source Field Inventory (FU-RECORD v1.2 Section 8.4)

The Fundraising Campaign entity has nine fields. Unlike Contribution, there is no discriminator and no type-specific visibility — all nine fields are visible on every Fundraising Campaign record. Status drives lifecycle but does not drive field visibility.

| ID | Field | Type | Notes |
|---|---|---|---|
| FU-RECORD-DAT-039 | `campaignName` | text | Required at creation. Coordinator-supplied. The Base entity's native `name` field. Confirm during the session whether `campaignName` is mapped to the native `name` field or is a separate custom field. The Marketing Campaign Entity PRD precedent maps `name` → `campaignName`; the same convention is the natural choice here. |
| FU-RECORD-DAT-040 | `campaignType` | enum | Annual Fund, Program Appeal, Event, Capital Campaign, Other. Captures the Campaign's purpose. Not a source-of-contributions field — source is captured by linked Contributions. |
| FU-RECORD-DAT-041 | `status` | enum | Four values: Planned, Active, Completed, Cancelled. Free-form transitions per FU-RECORD-REQ-008. Coordinator must explicitly select at creation; no default. Audited per FU-RECORD-REQ-014. |
| FU-RECORD-DAT-042 | `goalAmount` | currency | Optional. The Campaign's fundraising goal. Audited per FU-RECORD-REQ-014. |
| FU-RECORD-DAT-043 | `startDate` | date | Optional. The Campaign's start date. |
| FU-RECORD-DAT-044 | `endDate` | date | Optional. The Campaign's end date. |
| FU-RECORD-DAT-045 | `totalRaised` | currency | System-calculated, read-only per FU-RECORD-REQ-011. Sum of `amount` across all Contributions in Received status linked to this Campaign via the `campaign` field. Contributions in any other status do not contribute. |
| FU-RECORD-DAT-046 | `description` | text | Optional. Free-form description of the Campaign — purpose, narrative for stakeholders, internal notes. |
| FU-RECORD-DAT-047 | `geographicServiceArea` | multiEnum | Optional. Zip codes from the master list. Captures the geographic territory funded by this Campaign. Same field structure as Account.geographicServiceArea per ACT-ISS-004 closure. Used for territory-based attribution reporting (Mentoring Service Delivery by Funding Territory report) when a Funder organization scopes funding to a specific area through a Campaign rather than at the funder level. Independent of the funder Account's geographicServiceArea — the two are maintained separately by the Coordinator. |

## Constraints From Source Documents

The following constraints are not negotiable — they are decided by the upstream process documents and must flow through to the Entity PRD as written:

* **Native or Custom designation.** Fundraising Campaign is a custom Base entity per Entity Inventory v1.5 Section 4.8. Activity Stream is on. Owning domain is FU.
* **Status lifecycle.** Four values — Planned, Active, Completed, Cancelled — with free-form transitions. No system-driven transitions. Per FU-RECORD-REQ-008, the Coordinator can transition between any values at any time.
* **No discriminator, no type-specific visibility.** Unlike Contribution, Fundraising Campaign has no discriminator field. All nine fields are visible on every Fundraising Campaign record. campaignType is a property field, not a discriminator — it does not drive dynamic-logic visibility.
* **Pattern C creation timing.** Per FU-RECORD-REQ-004, Campaigns may be created in advance of solicitation or retroactively after Contributions have arrived. campaignName and status must be populated at creation; all other fields may be blank.
* **Linkage to Contribution is unrestricted by Campaign status.** Per FU-RECORD-REQ-005, the Coordinator may link any Contribution to one Fundraising Campaign at any time, regardless of Campaign status — no system-enforced gating against linking to Completed or Cancelled Campaigns. The relationship is settable, changeable, and clearable at any time.
* **totalRaised calculation.** Per FU-RECORD-REQ-011, totalRaised is calculated as the sum of `amount` across all Contributions in Received status linked to the Campaign via the Contribution.campaign field. Contributions in any other status (Applied, Pledged, Committed, Unsuccessful, Cancelled) contribute zero. This is the inverse-side definition of the Contribution → Fundraising Campaign relationship established in Contribution Entity PRD v1.0 (Section 4 and Implementation Note 10).
* **Audit scope.** Per FU-RECORD-REQ-014, the Fundraising Campaign audit trail covers status and goalAmount. Other fields (campaignName, campaignType, startDate, endDate, totalRaised, description, geographicServiceArea) are not audited.
* **Record-level visibility.** Per FU-RECORD-REQ-022, Fundraising Campaign records are restricted to Donor / Sponsor Coordinator + Executive Member + System Administrator. Hidden from all other roles including Mentors. This matches Contribution's record-level visibility per FU-RECORD-REQ-021.
* **Notes Service availability.** Fundraising Campaign participates in the Notes Service per FU-RECORD-REQ-020 alongside Contact, Account, Engagement, Session, Event, and Contribution.
* **No deletion.** Fundraising Campaign records persist permanently. Cancellation is via `status = Cancelled`, not deletion. Per FU-RECORD-REQ-019, there is no deletion of Fundraising Campaign records.
* **Independence from Account.geographicServiceArea.** Fundraising Campaign.geographicServiceArea and Account.geographicServiceArea are independently maintained by the Coordinator — there is no automatic rollup or inheritance from funder Account to Campaign. This is the territory-based attribution model decided during FU-REPORT process definition.

## Relationships

| Relationship | Related Entity | Link Type | PRD Reference |
|---|---|---|---|
| Fundraising Campaign → Contributions (inverse of Contribution.campaign) | Contribution | oneToMany | FU-RECORD-DAT-031 (defined on Contribution side); inverse defined here |

This is the only Fundraising Campaign-owned relationship. Fundraising Campaign does not link to Contact, Account, or any other entity directly — funder identity flows through the linked Contributions, not through Fundraising Campaign.

## Open Issues to Resolve or Defer During the Session

The administrator may surface design questions during the session; below are the ones already known. Resolve or defer as appropriate per the working-style preference of one issue at a time.

* **Display labels.** Singular: "Fundraising Campaign"? Plural: "Fundraising Campaigns"? Confirm with administrator (matches Entity Inventory v1.5 Section 4.8).
* **Native `name` field mapping.** The Marketing Campaign Entity PRD precedent maps the Base entity's native `name` field to the custom `campaignName` field defined by the source process documents. The same mapping is the natural choice here. Confirm: native `name` → `campaignName` (FU-RECORD-DAT-039), with `name` populated from `campaignName` either at save (workflow) or as the same logical field exposed under both names. This is the cleaner approach than auto-generating `name` from other fields the way Contribution and Dues do, because Fundraising Campaign already has a Coordinator-supplied human-readable label.
* **geographicServiceArea master list.** The "zip codes from master list" value source is the same Northeast Ohio zip code master list referenced by Account.geographicServiceArea per ACT-ISS-004 closure. The master list is itself a Phase 9 implementation matter (logged as FU-REPORT-ISS-001 and ACT-ISS-004). The Entity PRD describes the field structure but defers master-list authoring to Phase 9. Confirm.
* **Layout grouping.** Section 6 layout guidance — recommended panel/tab structure. Possible groupings: Campaign Identification (campaignName, campaignType, status, description), Lifecycle and Goal (startDate, endDate, goalAmount, totalRaised), Geographic Targeting (geographicServiceArea), and the Contributions oneToMany relationship panel. Confirm panel structure with administrator.
* **Implementation Notes scope.** The territory-based attribution model on the Mentoring Service Delivery by Funding Territory report is operationally driven by Fundraising Campaign.geographicServiceArea (and independently by Account.geographicServiceArea); the Entity PRD should document the field's structural purpose and reference FU-REPORT for the consumption model. Confirm.
* **totalRaised on a Cancelled or Completed Campaign.** When a Fundraising Campaign is Cancelled, do Received-status Contributions linked to that Campaign continue to contribute to totalRaised? FU-RECORD-REQ-011 says yes — the rule is solely on Contribution.status, not on Campaign.status — so totalRaised remains accurate as a historical record. Confirm and document this in Implementation Notes.

## Output

Produce the **Fundraising Campaign Entity PRD** as a Word document with the standard nine sections matching the established Entity PRD pattern in this implementation (no Section 10 Change Log per the precedent set by all thirteen prior Entity PRDs including Contribution Entity PRD v1.0):

1. Entity Overview
2. Native Fields (the Base entity's name, createdAt, modifiedAt, assignedUser — with name mapped to campaignName per Marketing Campaign precedent)
3. Custom Fields (the nine fields above; consider whether campaignName lives in Section 3 as a custom field or whether the native-mapping approach removes it from Section 3 — see Marketing Campaign Entity PRD for precedent)
4. Relationships (the single Fundraising Campaign → Contributions oneToMany — inverse side of Contribution.campaign)
5. Dynamic Logic Rules (likely empty or minimal — Fundraising Campaign has no type-specific visibility)
6. Layout Guidance
7. Implementation Notes
8. Open Issues
9. Decisions Made (Version 1.0 baseline as the first entry, plus design decisions reached during the session)

Commit to `PRDs/entities/Fundraising-Campaign-Entity-PRD.docx` in the CBM repo. Commit the generator script alongside at `PRDs/entities/generate-Fundraising-Campaign-Entity-PRD.js`. Update CLAUDE.md to reflect the new Entity PRD.

## Output Standards Reminder

* Standard metadata table at the top with Document Type, Entity, Implementation, Version, Status, Last Updated (MM-DD-YY HH:MM format), and Source Documents rows.
* Decisions Made entries in Section 9 documenting key design decisions made during the session, with version-tagged baseline entry as the first row.
* No product names anywhere in the document — Level 2 Entity PRD per the standard.
* Discuss design issues one at a time and wait for explicit approval before moving to the next item per the standard working-style preference. Once the design is fully approved, generate the document without further confirmation per the same preference.

## After This Session

After the Fundraising Campaign Entity PRD is committed, both FU-owned Entity PRDs are complete and **Phase 7 Domain Reconciliation** for the Fundraising domain becomes eligible. Phase 7 produces the FU Domain PRD by reconciling:

- All four FU process documents (FU-PROSPECT v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0)
- The FU Domain Overview v1.0
- The four FU-touched Entity PRDs (Contact v1.7, Account v1.8, Contribution v1.0, Fundraising Campaign v1.0)

After the FU Domain PRD is committed, **Phase 8 Stakeholder Review** for the FU Domain PRD becomes eligible, paralleling the CR Domain PRD's pending Phase 8 review.

## Documents to Upload

The administrator does not need to upload any documents for this session — all required source documents are accessible from the repository clones. If the administrator chooses to upload anything for convenience, the most useful uploads are FU-RECORD v1.2 (the primary source for all nine fields), the Contribution Entity PRD v1.0 (which establishes the inverse relationship side), and the Account Entity PRD v1.8 (for the geographicServiceArea field-structure precedent).
