# Session Prompt: FU Domain Reconciliation (Phase 7)

## Context

The Cleveland Business Mentors CRM implementation has completed Phase 4b process definition and Phase 5 Entity PRDs for the Fundraising (FU) domain. Phase 7 Domain Reconciliation is now eligible.

This session reconciles all four FU process documents, the FU Domain Overview, and the four FU-touched Entity PRDs into a single **Fundraising Domain PRD**. Per `crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md` v1.5, this is a **synthesis task, not an interview** — the AI reads all source documents, assembles them into the Domain PRD structure, and surfaces conflicts for the administrator to resolve.

Fundraising is the third FU-style domain reconciliation in this implementation:

- **MN Domain PRD v1.0** — committed; flat-structured (no sub-domains)
- **MR Domain PRD v1.1** — committed; flat-structured (no sub-domains)
- **CR Domain PRD v1.2** — committed; sub-domain-structured (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE); awaits Phase 8 stakeholder review
- **FU Domain PRD** — pending; flat-structured (no sub-domains)

After this Phase 7 session is complete, **Phase 8 Stakeholder Review** for the FU Domain PRD becomes eligible, paralleling the CR Domain PRD's pending Phase 8 review.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with the administrator which CLAUDE.md to read first per the standard working-style preference.
3. Read the domain reconciliation guide at `PRDs/process/interviews/guide-domain-reconciliation.md` v1.5 in the crmbuilder repo. The guide defines the seven-section Domain PRD structure, the Step 1 conflict-detection categories (1.1 through 1.6 plus 1.7 Present Conflict Summary), and Step 2 Domain PRD Assembly. Required-field completeness is a reconciliation exit criterion per Critical Rule and Step 1.6.
4. Read the four FU process documents in the CBM repo (in dependency order):
   - `PRDs/FU/FU-PROSPECT.docx` v1.0
   - `PRDs/FU/FU-RECORD.docx` v1.2 (initial v1.0 04-29-26; v1.1 carry-forward 04-29-26 hybrid acknowledgment ownership; v1.2 carry-forward 04-30-26 Fundraising Campaign.geographicServiceArea)
   - `PRDs/FU/FU-STEWARD.docx` v1.0
   - `PRDs/FU/FU-REPORT.docx` v1.0
5. Read the FU Domain Overview at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx` v1.0.
6. Read the four FU-touched Entity PRDs:
   - `PRDs/entities/Contact-Entity-PRD.docx` v1.7 — Donor-specific fields in Section 3.8 (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate) added by the bundled end-of-FU-Phase-4b carry-forward
   - `PRDs/entities/Account-Entity-PRD.docx` v1.8 — Donor/Sponsor-specific fields including assignedSponsorCoordinator and lastContactDate added; geographicServiceArea restructured to multiEnum
   - `PRDs/entities/Contribution-Entity-PRD.docx` v1.0 — eighteen custom fields, three-value contributionType discriminator (Donation, Sponsorship, Grant), five dynamic-logic rules, hybrid acknowledgment ownership
   - `PRDs/entities/Fundraising-Campaign-Entity-PRD.docx` v1.0 — nine custom fields, no discriminator, four-value status lifecycle, geographicServiceArea independent of Account.geographicServiceArea
7. Read the Master PRD v2.5 and the Entity Inventory v1.5 for cross-domain context. The Entity Inventory's four-value contributionType list (which includes Pledge) is superseded by Contribution Entity PRD v1.0 CONTR-DEC-002 (three-value list); the reconciliation may want to record this as a structural note.

## Source Document Summary

The Fundraising domain comprises four process documents covering the funder lifecycle from initial prospecting through ongoing stewardship and reporting:

| Process | Code | Version | Operator | Purpose |
|---|---|---|---|---|
| Funder Prospecting | FU-PROSPECT | v1.0 | Donor / Sponsor Coordinator (MST-PER-010) | Identify and develop relationships with prospective donors and funders through the lifecycle stages: Prospect → Contacted → In Discussion → Committed |
| Contribution Recording | FU-RECORD | v1.2 | Donor / Sponsor Coordinator | Record discrete funding events (Donations, Sponsorships, Grants) and create / maintain Fundraising Campaigns; primary write authority for Contribution and Fundraising Campaign records |
| Funder Stewardship | FU-STEWARD | v1.0 | Donor / Sponsor Coordinator | Weekly or bi-weekly review-and-act sweep against three saved lists; Active → Lapsed transition is the only relationship exit; catch-up write path for missed acknowledgments under hybrid ownership |
| Fundraising Reporting | FU-REPORT | v1.0 | Donor / Sponsor Coordinator (primary operator); Executive Member (audience and live-view consumer) | Ten defined reports plus ad-hoc reporting; packet production, Annual Donor Giving Summaries, Mentoring-domain access for territory-based attribution |

The FU Domain Overview v1.0 establishes the inventory-level treatment of the four processes, the four contributing entities (Contact, Account, Contribution, Fundraising Campaign), and the cross-domain dependencies (Mentoring-domain reads from FU-REPORT for territory-based attribution).

## Personas in the FU Domain

| ID | Persona | Participating Processes | Role |
|---|---|---|---|
| MST-PER-010 | Donor / Sponsor Coordinator | FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT | Primary operator with full authority across all four processes |
| MST-PER-002 | Executive Member | FU-REPORT | Primary audience for board-level packets, live-view consumer, read-only access to ad-hoc reporting; informal participant in FU-STEWARD at Coordinator's invitation; read-only consumer in FU-PROSPECT and FU-RECORD |
| MST-PER-001 | System Administrator | All four processes | Implicit through visibility rules; no explicit operator role |

## Known Items Requiring Attention During Reconciliation

### Open Issues Carried Forward From Process Documents and Entity PRDs

**From FU-PROSPECT v1.0:**
- No new open issues. FU-PROSPECT closed several issues during process definition.

**From FU-RECORD v1.2:**
- No new open issues at the FU-RECORD level. EI-ISS-001 (Acknowledgment entity / tax-receipt modeling) was closed by FU-RECORD-REQ-015 with the field-level acknowledgment model under hybrid ownership.

**From FU-STEWARD v1.0:**
- No new open issues. FU-STEWARD surfaced two new fields (Contact.lastContactDate, Account.lastContactDate) which have already been propagated via the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.7 and Account Entity PRD v1.8.

**From FU-REPORT v1.0:**
- **FU-REPORT-ISS-001** — Northeast Ohio zip code master list to be defined during Phase 9 implementation. Same parent issue as FC-ISS-001 (Fundraising Campaign side) and the Account.geographicServiceArea master-list deferral.
- **FU-REPORT-ISS-002** — Mentoring-domain field-name binding deferred until specific report queries are implemented in Phase 9. The territory-based attribution model on the Mentoring Service Delivery by Funding Territory report references Engagement and Session fields by entity and conceptual purpose; the exact field-name binding (which Engagement field equates to "engagement closure date", which Session field equates to "session date" for date-windowing) is a Phase 9 implementation matter.
- **FU-REPORT-ISS-003** — Tangential CR-domain references in FU-REPORT may need clarification; the report set principally reads from FU-domain entities but reaches into Mentoring-domain entities for the territory-based attribution report and references CR-domain marketing-engagement data only obliquely through ad-hoc reporting.
- **FU-REPORT-ISS-004** — CR-MARKETING-ISS-001 retention. The CR-MARKETING-ISS-001 (geographic targeting model) parent issue remains open in CR scope; FU-REPORT inherits residual scope to the extent of the campaign-targeting model questions beyond field format. Should be tracked at the FU domain level.

**From Contribution Entity PRD v1.0:**
- **CONTR-ISS-001** — FU-REPORT v1.0 Section 7.3 lists giftType enum values (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other) that diverge from the FU-RECORD v1.2 Section 8.3 authoritative values (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other) adopted by Contribution Entity PRD v1.0 Section 3.2. Resolution path: carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 in the next FU domain update cycle. **The reconciliation session should resolve this by adopting the FU-RECORD-authoritative list at the Domain PRD level and noting the FU-REPORT divergence as a documentation correction, with the carry-forward to be executed before or after Phase 7 commits.**

**From Fundraising Campaign Entity PRD v1.0:**
- **FC-ISS-001** — Northeast Ohio zip code master list deferred to Phase 9 implementation. Same parent as FU-REPORT-ISS-001.

**From Contact Entity PRD v1.7 (FU-relevant only):**
- **CON-ISS-004** — Contact-side equivalent of ACT-ISS-002 (Account-side, now closed). Tracking of additional Contact-level fields needed for full FU-domain integration; some have already been added (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate). Out of scope for this Phase 7 reconciliation per the same scoping note from the bundled carry-forward.

**Cross-domain open issues that touch FU but are owned by CR:**
- CR-MARKETING-ISS-001 (geographic targeting model — superseded in scope by ACT-ISS-004 closure for the field-format question; remaining campaign-targeting-model and master-list-maintenance-ownership questions remain open in CR)
- CR-MARKETING-ISS-002 (media and PR tracking model — CR scope, no FU implications)

These cross-domain CR issues are not FU-domain issues and should not be carried into the FU Domain PRD's Open Issues section. Mention them only in cross-domain context if relevant.

### Known Cross-Process Conflicts to Reconcile

The following are likely-or-known conflicts and consistency concerns surfaced during process definition and Entity PRD authoring. The reconciliation session should systematically work through each per the guide's Step 1 conflict-detection methodology.

**1. giftType enum value list divergence (HIGH PRIORITY).** FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-035) and Contribution Entity PRD v1.0 Section 3.2 (authoritative) define giftType as `Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other`. FU-REPORT v1.0 Section 7.3 (FU-REPORT-DAT-027) lists `Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other`. The Domain PRD must adopt one list. Recommendation: adopt the FU-RECORD-authoritative list per the source-document hierarchy (FU-RECORD owns Contribution field definitions; FU-REPORT only reads giftType as a display field on Annual Donor Giving Summary line items and does not drive any defined-report logic). Log as a reconciliation decision (FU-RECON-DEC-NNN) and either (a) execute a carry-forward to FU-REPORT v1.0 before Phase 8, or (b) defer the FU-REPORT carry-forward to a post-Phase-8 cleanup pass.

**2. donorStatus value list — verify cross-process consistency.** The seven-value donorStatus enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed) is written by FU-PROSPECT (Prospect through Committed plus Active activation) and FU-RECORD (Active activation per FU-RECORD-REQ-010) and FU-STEWARD (Active → Lapsed). The Master PRD pipeline-stage list and the Contact Entity PRD v1.7 Section 3.8 should be consistent with this seven-value list. Verify all four documents agree.

**3. funderStatus on Account — same lifecycle structure as donorStatus on Contact.** Verify funderStatus on Account Entity PRD v1.8 Section 3.4 matches the same seven-value lifecycle and the same write-authority pattern (FU-PROSPECT writes pipeline stages; FU-RECORD activates on first Contribution; FU-STEWARD lapses).

**4. Acknowledgment hybrid ownership cross-write authorization.** FU-RECORD-REQ-015 establishes the primary-write authorization for acknowledgmentSent and acknowledgmentDate; FU-STEWARD-REQ-004 establishes the catch-up-write authorization. The Domain PRD should consolidate these into a single coherent shared-write description rather than duplicating the same model in two requirements.

**5. Contribution.status lifecycle and downstream consumption.** FU-RECORD defines six values (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) with free-form transitions per FU-RECORD-REQ-007. FU-STEWARD reads status to filter the Acknowledgment-Pending Contributions sweep list (Received with acknowledgmentSent = false) and the Grant Deadlines list (Committed or Received). FU-REPORT reads status across multiple reports (Pipeline Status, Open Pipeline Value, Acknowledgment Coverage). Verify all references are consistent with the six-value list and the rollup-eligibility rule (only Received contributes to lifetime giving, totalRaised, etc.).

**6. Fundraising Campaign.status lifecycle and downstream consumption.** FU-RECORD defines four values (Planned, Active, Completed, Cancelled) with free-form transitions per FU-RECORD-REQ-008. FC-DEC-005 documents that totalRaised is calculated solely on Contribution.status, not on Fundraising Campaign.status — Received Contributions linked to Cancelled or Completed Campaigns continue to contribute to totalRaised. Verify FU-REPORT's Mentoring Service Delivery by Funding Territory report and Pipeline Status report respect this rule.

**7. Contribution discriminator value evolution.** Entity Inventory v1.5 Section 4.7 lists four contributionType values (Donation, Sponsorship, Grant, Pledge). Contribution Entity PRD v1.0 CONTR-DEC-002 supersedes this with three values (Donation, Sponsorship, Grant) — Pledged is treated as a status, not a contribution type. The Domain PRD should adopt the three-value model and note the Entity Inventory supersession; the Entity Inventory v1.5 update is a Phase 7 reconciliation outcome.

**8. Notes Service participation across FU entities.** FU-RECORD-REQ-020 places the Notes Service on Contribution and Fundraising Campaign records. The Notes Service spec (NOTES-MANAGE.docx v1.0) lists six entity types: Contact, Account, Engagement, Session, Event, Fundraising Campaign — and Contribution per FU-RECORD-REQ-020. Verify cross-document consistency. Note that the Contribution Entity PRD treats the in-record `notes` field and the Notes Service stream as coexisting (Implementation Note 3), while the Fundraising Campaign Entity PRD uses the Notes Service stream only (no in-record narrative-notes field). The Domain PRD should preserve this distinction.

**9. geographicServiceArea independence model across Account and Fundraising Campaign.** FC-DEC-007 and Account Entity PRD v1.8 Section 3.3 establish that Account.geographicServiceArea and Fundraising Campaign.geographicServiceArea are independently maintained by the Coordinator with no automatic rollup. The territory-based attribution model on FU-REPORT's Mentoring Service Delivery by Funding Territory report consumes both fields as zip code list set-membership against Contact.addressPostalCode (collected at MN-INTAKE-DAT-014). Verify this is consistently described across all four FU process documents and the two Entity PRDs.

**10. Lifetime-giving rollup definitions across three rollup fields.** Contact.donorLifetimeGiving (Contact Entity PRD v1.7 Section 3.8), Account.funderLifetimeGiving (Account Entity PRD v1.8 Section 3.4), and Fundraising Campaign.totalRaised (Fundraising Campaign Entity PRD v1.0 Section 3.1) all share the same calculation pattern: sum of `amount` across linked Contributions in Received status, scoped by the relevant link field (donorContact, donorAccount, campaign). Verify all three rollups are consistently described and that the source-of-truth rollup-driver definition lives in Contribution Entity PRD v1.0 Implementation Note 10.

### Required-Field Completeness Sweep (per guide Step 1.6)

The reconciliation session must verify that every required enum-type field across the four FU process documents has an enumerated value list. Known status as of session start:

- **contributionType** (required, enum) — three values enumerated per CONTR-DEC-002. ✓
- **Contribution.status** (required, enum) — six values enumerated per FU-RECORD-REQ-007. ✓
- **Fundraising Campaign.status** (required, no default, enum) — four values enumerated per FU-RECORD-REQ-008. ✓
- **giftType** (optional, enum) — seven values enumerated per Contribution Entity PRD CONTR-DEC-007 (FU-REPORT-DAT-027 divergence is CONTR-ISS-001). Optional, so not a required-field completeness blocker, but the divergence still must be reconciled per item 1 above.
- **donorStatus** (optional, enum) — seven values enumerated per Contact Entity PRD v1.7 Section 3.8.
- **funderStatus** (optional, enum) — seven values enumerated per Account Entity PRD v1.8 Section 3.4.
- **campaignType** (optional, enum) — five values enumerated per FU-RECORD-DAT-040 / Fundraising Campaign Entity PRD Section 3.1.
- **geographicServiceArea** (optional, multiEnum) — values come from "zip codes from master list" deferred to Phase 9 per FC-ISS-001 / FU-REPORT-ISS-001 / Account Entity PRD ACT-ISS-004 closure note. Optional field, so not a required-field completeness blocker; but the deferral path is explicit and must be documented in the Domain PRD's Open Issues section.

The reconciliation session should not encounter a required-field completeness blocker if the inventory above holds.

### Decisions to Compile From Process Documents and Entity PRDs

The Domain PRD's Section 5 Decisions Made consolidates all decisions from the source documents plus any decisions made during the reconciliation session. Source decisions to compile (this is not exhaustive — the reconciliation session should sweep all four process documents and four Entity PRDs):

**FU-PROSPECT decisions** include: lifecycle stage definitions (Prospect, Contacted, In Discussion, Committed); FU-PROSPECT-REQ-006 lifecycle activation rule (Active on first Contribution); narrative-only relationship cultivation tracking with no structured cultivation-step records; donor and funder pipeline visibility through donorStatus on Contact and funderStatus on Account.

**FU-RECORD decisions** include: contributionType three-value enum; Contribution.status six-value lifecycle with free-form transitions; Fundraising Campaign.status four-value lifecycle with free-form transitions; donorContact / donorAccount mutual exclusivity at save; hybrid acknowledgment ownership with FU-STEWARD; multi-payment Grant treatment as a single Contribution record; in-kind handling via giftType = In-Kind on Donations only; no deletion of Contribution or Fundraising Campaign records; record-level visibility restricted to Donor / Sponsor Coordinator, Executive Member, System Administrator.

**FU-STEWARD decisions** include: review-and-act operating philosophy (always a review process leading to action, not reactive); manual sweep initiation with no system prompt; three independent saved lists (Active Donors and Funders Sweep List, Acknowledgment-Pending Contributions, Grant Deadlines) with no unified dashboard; pure Coordinator judgment for Active → Lapsed transition with no thresholds or auto-transitions; donor-specific impact reports composed entirely outside the CRM with the fact recorded narratively; no structured tracking of recognition obligations; no system-fired alerts of any kind; hybrid acknowledgment ownership surfaced and codified.

**FU-REPORT decisions** include: ten defined reports approved (Year-Over-Year Giving Trends, Pipeline Status, Lifetime Value Distribution, At-Risk Active Relationships, Lapsed Donor and Funder Analysis, Acknowledgment Coverage, Annual Donor Giving Summaries, Open Pipeline Value, Board Member Giving Summary, Mentoring Service Delivery by Funding Territory); standardized grant-compliance reporting and standardized sponsor-recognition reports both dropped from defined-report scope but retained through ad-hoc reporting; combined consumption pattern with monthly informational packet, quarterly formal board packet (identical content), and live view between meetings; live view structured as separate per-report views rather than a top-level dashboard; Coordinator-triggered packet production only with no system-fired automation; Annual Donor Giving Summaries cover calendar year on US tax-purpose convention with no minimum threshold; Open Pipeline Value shows Applied / Pledged / Committed totals separately without probability weighting; territory-based attribution model uses zip code lists on Account.geographicServiceArea (funder-level) and Fundraising Campaign.geographicServiceArea (campaign-level), independently maintained, matched against Contact.addressPostalCode.

**Entity-level decisions to compile** include: Contribution Entity PRD CONTR-DEC-001 through CONTR-DEC-010 (ten decisions); Fundraising Campaign Entity PRD FC-DEC-001 through FC-DEC-009 (nine decisions); the Donor-specific field additions on Contact Entity PRD v1.7 (CON-DEC-017) and Account Entity PRD v1.8 (ACT-DEC-013 covering geographicServiceArea restructure, ACT-DEC-014 covering Donor/Sponsor field additions).

### Reconciliation-Specific Decisions Anticipated

The reconciliation session is likely to surface and record these reconciliation-level decisions:

- **FU-RECON-DEC-001** likely candidate: giftType enum value list adoption (FU-RECORD-authoritative list adopted at the Domain PRD level; FU-REPORT divergence noted with carry-forward path).
- **FU-RECON-DEC-002** likely candidate: contributionType three-value enum confirmation at the Domain PRD level (supersedes Entity Inventory v1.5 four-value list with Pledge; Entity Inventory v1.5 update is a Phase 7 outcome).
- Other reconciliation decisions may emerge during the session as conflicts are resolved.

## Output

Produce the **FU Domain PRD** as a Word document with the seven sections defined in `guide-domain-reconciliation.md` v1.5:

1. Domain Overview
2. Personas
3. Business Processes (one subsection per process — the four FU processes in dependency order: FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT — each with eight required sections from the source process documents)
4. Data Reference (consolidated view organized by entity: Contact, Account, Contribution, Fundraising Campaign, plus any Mentoring-domain entity fields read by FU-REPORT)
5. Decisions Made (compiled from all four process documents and the four Entity PRDs, plus any FU-RECON-DEC-NNN decisions made during this session)
6. Open Issues (compiled from all four process documents and the two FU-owned Entity PRDs, plus any FU-RECON-ISS-NNN issues surfaced during this session)
7. Interview Transcript (condensed Q/A record of the reconciliation conversation organized by topic area with inline Decision callouts)

Commit to `PRDs/FU/CBM-Domain-PRD-Fundraising.docx` in the CBM repo. Commit the generator script alongside at `PRDs/FU/generate-FU-Domain-PRD.js` for future re-execution. Update CLAUDE.md to reflect the new Domain PRD and Phase 7 completion.

## Output Standards Reminder

- Standard metadata table at the top with Document Type, Implementation, Version, Status, Last Updated (MM-DD-YY HH:MM format), and Source Documents rows.
- No product names anywhere in the document — Level 2 Domain PRD per the standard.
- Identifiers preserved from process documents and Entity PRDs; new identifiers only for Section 5 reconciliation decisions (FU-RECON-DEC-NNN) and Section 6 reconciliation issues (FU-RECON-ISS-NNN).
- Discuss conflicts one at a time per the guide's Step 1 methodology and the standard working-style preference; do not present a list of conflicts and ask the administrator to resolve them all at once.
- Once all conflicts are resolved and the assembly plan is approved, generate the document without further per-section confirmation per the working-style preference of efficient end-to-end execution after plan approval.

## After This Session

After the FU Domain PRD is committed, **Phase 8 Stakeholder Review** for the FU Domain PRD becomes eligible. The CBM implementation will then have two Domain PRDs awaiting Phase 8 stakeholder review (CR Domain PRD v1.2 and FU Domain PRD v1.0), plus the two already-Phase-8-reviewed Domain PRDs (MN Domain PRD v1.0 and MR Domain PRD v1.1). All four Domain PRDs will be in place after Phase 8 completion.

After all four Domain PRDs are stakeholder-reviewed, the implementation moves toward **Phase 9 YAML Generation** for the remaining domains beyond the MR pilot (MN, CR, FU). The MR pilot has already executed Phases 9 → 11 → 12 → 13 (YAML Generation through Verification) per the CLAUDE.md pilot-status note.

## Documents to Upload

The administrator does not need to upload any documents for this session — all required source documents are accessible from the repository clones. If the administrator chooses to upload anything for convenience, the most useful uploads are the four FU process documents (FU-PROSPECT v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0), the FU Domain Overview v1.0, and the two FU-owned Entity PRDs (Contribution v1.0 and Fundraising Campaign v1.0). The Contact v1.7 and Account v1.8 Entity PRDs are useful for cross-domain field references but are not strictly required uploads since they are accessible from the repository clone.
