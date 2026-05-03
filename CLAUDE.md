# CLAUDE.md — Cleveland Business Mentors CRM Implementation

This file provides guidance for Claude when working on the Cleveland
Business Mentors CRM implementation.

**Note on this repo's local directory name.** The GitHub repo is
`dbower44022/ClevelandBusinessMentoring` (long form). Doug's local clone
is at `~/Dropbox/Projects/ClevelandBusinessMentors/` — the short form,
ending in `Mentors`. When a session prompt or instruction refers to a
local path on Doug's machine, use the short name. A previous two-
directory split was reconciled on 04-10-26; only the short-named clone
now exists locally.

## First — Read the Process Guide

Before doing any work in this repository, read the Document Production
Process section in the CRM Builder CLAUDE.md:

```
https://github.com/dbower44022/crmbuilder/blob/main/CLAUDE.md
```

The full process specification is:

```
https://github.com/dbower44022/crmbuilder/blob/main/PRDs/application/CRM-Builder-Document-Production-Process.docx
```

That document defines the required sequence for producing all CRM
implementation documents. Following it is mandatory. Do not skip steps
or produce documents out of sequence.

---

## This Repository

This is the **Cleveland Business Mentors (CBM)** client implementation
repository. It contains all PRD documents, YAML program files, and
generated documentation for the CBM CRM implementation.

CBM is a nonprofit organization providing free business mentoring and
education to entrepreneurs, small businesses, and nonprofits in
Northeast Ohio.

---

## Known State — Requirements Tab Intentionally Empty (decided 05-02-26)

The CRM Builder application's Requirements tab Dashboard reads work
items, domains, entities, and processes from a per-client SQLite
database, not from the Word documents in this repository. For the CBM
implementation, that client database is empty by design.

**Cause.** All CBM PRD work to date was produced before the CRM Builder
application migrated its document import flow from the legacy
`automation/cbm_import` CLI bootstrap to the current Path B / Import
Processor pipeline. Every concrete import method in the legacy bootstrap
is now a deprecated no-op, and Path B has no batch back-fill path that
can ingest a fully drafted client repository into a populated client
database. The result is that the CBM client database shows zero work
items even though the documents exist and are complete.

**Decision.** Do not back-fill the CBM client database. CBM will be
re-run end-to-end through the application once the application has been
updated to incorporate the lessons learned from this first
implementation. Until that re-run, the Requirements tab for CBM is
expected to be empty, and any in-app features that depend on it
(Dashboard, Documents view, Impact Review) will not be available for CBM.
Carry-forward management, staleness tracking, and cross-document impact
for the remaining CBM work continue to be handled manually in session,
as they have been throughout the implementation to date.

**What this means in practice.**

- Do not propose populating the CBM Requirements tab as a fix for any
  future request that touches it.
- Do not run the legacy `python -m automation.cbm_import` CLI. It would
  produce only an empty work item skeleton and offers no benefit.
- The Word documents in this repository remain the source of record for
  CBM, not the application's database.

---

## Current Implementation State

**Process status: All MR domain work complete. MR Phase 9 follow-up work fully closed out (04-20-26). CR Domain Reconciliation (Phase 5) complete (04-16-26). CR Domain PRD v1.2 at PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx — Phase 8 Stakeholder Review complete (05-01-26), Approved. FU domain Phase 4b process definition complete: FU Domain Overview v1.0 committed 04-22-26; FU-PROSPECT process document v1.0 committed 04-22-26; FU-RECORD process document v1.2 committed 04-30-26 (initial v1.0 04-29-26; v1.1 carry-forward executed 04-29-26 applying the hybrid acknowledgment ownership model surfaced by FU-STEWARD; v1.2 carry-forward executed 04-30-26 adding Fundraising Campaign.geographicServiceArea field surfaced during FU-REPORT process definition); FU-STEWARD process document v1.0 committed 04-29-26; FU-REPORT process document v1.1 committed 05-01-26 (initial v1.0 04-30-26; v1.1 carry-forward executed 05-01-26 aligning Section 7.3 FU-REPORT-DAT-027 giftType enum with the FU-RECORD-authoritative seven-value list per FU-RECON-DEC-001). Phase 7 FU Domain Reconciliation complete (05-01-26) producing FU Domain PRD v1.0 at PRDs/FU/CBM-Domain-PRD-Fundraising.docx. FU-RECON carry-forward bundle complete (05-01-26): FU-RECON-ISS-001 closed by FU-REPORT v1.0 → v1.1 carry-forward; FU-RECON-ISS-002 closed by Entity Inventory v1.5 → v1.6 carry-forward. FU-RECON-ISS-003 (Northeast Ohio zip code master list) remains as a Phase 9 deferral. FU Domain PRD v1.0 — Phase 8 Stakeholder Review complete (05-01-26), Approved. CR Domain PRD v1.2 — Phase 8 Stakeholder Review complete (05-01-26), Approved. Phase 9 YAML Generation complete for the FU domain (05-01-26): four YAML files (FU-Contact.yaml, FU-Account.yaml, FU-Contribution.yaml, FU-FundraisingCampaign.yaml) plus EXCEPTIONS.md and MANUAL-CONFIG.md committed to programs/FU/. Four exceptions surfaced and resolved: FU-Y9-EXC-001 (geographicServiceArea master list deferred — empty options, recorded as MANUAL-CONFIG FU-MC-OL-001), FU-Y9-EXC-002 (auto-Active transition not expressible as v1.1 cross-entity workflow — recorded as MANUAL-CONFIG FU-MC-AA-001), FU-Y9-EXC-003 (donorContact / donorAccount mutual exclusivity not expressible — recorded as MANUAL-CONFIG FU-MC-AA-002), FU-Y9-EXC-004 (Active Donors and Funders Sweep List spans two entities — recorded as MANUAL-CONFIG FU-MC-UV-001). Manual Configuration List has six Role-Based Field Visibility entries (FU-MC-RV-001 through FU-MC-RV-006), three Advanced Automation entries (FU-MC-AA-001 through FU-MC-AA-003), one cross-entity union view (FU-MC-UV-001), and one deferred-master-list option list (FU-MC-OL-001). The implementation-feasibility concern raised during Phase 8 review proved well-founded — four genuine v1.1 schema gaps surfaced during FU YAML generation; all four are recoverable via post-deployment Manual Configuration. Schema v1.2 candidates identified: cross-entity setField action, mutually-exclusive-field constraint construct, cross-entity union saved-view construct. CR and MR Phase 9 YAML Generation remain pending. Bundled end-of-FU-Phase-4b carry-forward executed 04-30-26 propagating six new fields into Contact Entity PRD v1.6 → v1.7 (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate; new Section 3.8 Donor-Specific Fields) and Account Entity PRD v1.7 → v1.8 (assignedSponsorCoordinator, lastContactDate added to Section 3.4 Donor/Sponsor-Specific Fields). EI-ISS-001 closed by FU-RECORD with field-level acknowledgment model (acknowledgmentSent, acknowledgmentDate on Contribution, shared across all contribution types) under hybrid ownership: FU-RECORD primary at Contribution creation, FU-STEWARD catch-up during the sweep. ACT-ISS-004 closed by FU-REPORT process definition session — geographicServiceArea on Account restructured from text to multiEnum (structured zip code list) with visibility expanded to both Partner and Donor/Sponsor account types; same field added to Fundraising Campaign entity (FU-RECORD-DAT-047). CON-ISS-003 closed by bundled carry-forward (donorStatus added). ACT-ISS-002 closed by bundled carry-forward (FU-domain Account fields integrated). All five completed carry-forward request files at PRDs/FU/carry-forward/ are retained as the source-of-record for their decisions. Current versions of upstream documents: Master PRD v2.5, Contact Entity PRD v1.7, Account Entity PRD v1.8, Engagement Entity PRD v1.2, Session Entity PRD v1.1, Dues Entity PRD v1.1, MN-INTAKE v2.4, CR Domain Overview v1.4, CR-PARTNER-MANAGE v1.1, Entity Inventory v1.6, CR Domain PRD v1.2 (Phase 8 Approved), FU Domain Overview v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.1, FU Domain PRD v1.0 (Phase 8 Approved). All seven CR Phase 2b Entity PRDs complete at v1.0: Event, Event Registration, Partnership Agreement, Segment, Campaign Group, Marketing Campaign, Campaign Engagement. Both FU-owned Phase 5 Entity PRDs complete at v1.0 (committed 04-30-26): Contribution Entity PRD v1.0 and Fundraising Campaign Entity PRD v1.0. All Phase 5 Entity PRDs across all four domains are now complete. Next: Phase 9 YAML Generation for CR (in a fresh session for clean context) or MR Phase 9 completion (which had partial earlier work).**

**Latest structural change (05-01-26 — late afternoon):** Phase 9 YAML Generation complete for the FU domain. Six files committed to `programs/FU/`: four YAML program files (FU-Contact.yaml, FU-Account.yaml, FU-Contribution.yaml, FU-FundraisingCampaign.yaml), one EXCEPTIONS.md, one MANUAL-CONFIG.md. Generated per crmbuilder/PRDs/process/interviews/guide-yaml-generation.md v1.1 against schema app-yaml-schema.md v1.1. All four YAML files validated as parseable with correct field counts: FU-Contact (4 Donor-specific custom fields on the native Contact entity — donorStatus, donorNotes, donorLifetimeGiving rolled-up via formula:aggregate, lastContactDate), FU-Account (7 fields: 6 Donor/Sponsor-specific plus geographicServiceArea shared with Partner accountType per ACT-DEC-014, plus 1 relationship for assignedSponsorCoordinator), FU-Contribution (18 fields including 14 shared + 3 Donation-specific + 1 Grant-specific per CONTR-DYN-001 through 005, 2 saved views for FU-STEWARD sweep lists, 3 manyToOne relationships), FU-FundraisingCampaign (9 fields including totalRaised rolled-up via formula:aggregate scoped to Contribution.status = Received). All v1.1 constructs exercised successfully: settings:, savedViews:, requiredWhen: (assignedSponsorCoordinator when funderStatus = Active), visibleWhen: (field-level and panel-level for type-conditional and discriminator-conditional visibility, including compound conditions for in-kind fields), formula:aggregate (three lifetime-giving rollups all status-gated to Received), no workflows: blocks emitted (the auto-Active transition cannot be expressed in v1.1 — see EXCEPTIONS.md). Cross-validation passed: all three formula via: paths (donorContact, donorAccount, campaign) reference correctly defined relationships on Contribution. Four exceptions surfaced and resolved per the Stop-and-Ask criteria: FU-Y9-EXC-001 (geographicServiceArea Northeast Ohio zip code master list deferred — empty options: [] in YAML, recorded as MANUAL-CONFIG FU-MC-OL-001 pending master-list authoring), FU-Y9-EXC-002 (auto-Active transition on first Contribution per FU-PROSPECT-REQ-006 / FU-RECORD-REQ-010 not expressible — v1.1 setField operates only on the trigger entity, not on related records via link, so the cross-entity transition becomes MANUAL-CONFIG FU-MC-AA-001), FU-Y9-EXC-003 (donorContact / donorAccount mutual exclusivity not expressible — v1.1 has no field-set mutual-exclusivity construct, becomes MANUAL-CONFIG FU-MC-AA-002), FU-Y9-EXC-004 (Active Donors and Funders Sweep List spans two entities — v1.1 saved views are per-entity, becomes MANUAL-CONFIG FU-MC-UV-001; the Coordinator opens two filtered list views during the sweep). Manual Configuration List has 11 entries: 6 Role-Based Field Visibility entries (FU-MC-RV-001 through FU-MC-RV-006) covering donorNotes / funderNotes / Contribution / FundraisingCampaign / lastContactDate / FU-REPORT carry-through, 3 Advanced Automation entries (FU-MC-AA-001 through FU-MC-AA-003) covering auto-Active / mutual exclusivity / no-system-fired-alerts, 1 cross-entity union view (FU-MC-UV-001), 1 deferred-master-list option list (FU-MC-OL-001). Phase 8 implementation-feasibility concern proved well-founded: four genuine schema gaps emerged during YAML generation, three of which are likely to recur in CR YAML generation (cross-entity setField is the most general). All gaps are recoverable via post-deployment Manual Configuration in the target CRM. Schema v1.2 candidates identified for the crmbuilder team: cross-entity setField action (likely the highest-value addition; would also serve patterns identified in MR Phase 9), mutually-exclusive-field constraint construct (`exactlyOneOf:` at entity level or `mutuallyExclusiveWith:` at field level), cross-entity union saved-view construct (`entityUnion:` with per-entity filters). FU domain Phase 9 commit will include all six output files. CR and MR Phase 9 YAML Generation remain pending; the recommended approach for CR Phase 9 is a fresh session for clean context (CR has four sub-domains and seven Phase 2b custom entities — substantially more output than FU). MR Phase 9 had earlier partial work (programs/MR/MR-Contact.yaml and MR-Dues.yaml exist) and may need only completion / extension rather than full generation.

**Prior structural change (05-01-26 — afternoon):** Phase 8 Stakeholder Review complete for both Domain PRDs. Doug Bower personally reviewed both the CR Domain PRD v1.2 and the FU Domain PRD v1.0 end-to-end. Outcome: no major concerns surfaced; no Domain PRD edits required from review. The only concern raised was implementation-feasibility doubt (whether the implementation tooling will be able to build all the features described into the CRM). This is a Phase 9 concern — to be addressed during YAML Generation by attempting the build and surfacing specific gaps as they arise — not a Domain PRD defect. Two documents updated to record the approval: CR Domain PRD v1.2 Status field changed from "Draft" to "Approved — Phase 8 Stakeholder Review complete (05-01-26)" with metadata Last Updated bumped to 05-01-26 14:56 and a new "1.2 P8" Change Log row added at the top of the data area; FU Domain PRD v1.0 Status field changed from "Draft — awaiting Phase 8 Stakeholder Review" to "Approved — Phase 8 Stakeholder Review complete (05-01-26)" with metadata Last Updated bumped to 05-01-26 14:56 and a new "1.0 P8" Change Log row added at the top of the data area. The "P8" suffix in the Change Log version field indicates an approval-status row separate from any content-revision row, so reviewers can distinguish at-a-glance between version bumps from content changes (1.0, 1.1, 1.2) and version annotations from approval-status changes. Document content unchanged; only metadata and Change Log additions. Both Domain PRDs validated post-edit (FU 1047 paragraphs +3, CR 1516 paragraphs +3). Phase 9 YAML Generation is the next phase. Implementation-feasibility concern is recorded in the Process status line above for visibility during Phase 9; resolution path is to attempt Phase 9 and surface specific gaps as they arise.

**Prior structural change (05-01-26 — earlier in day):** FU-RECON carry-forward bundle complete. Two carry-forwards executed sequentially per crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md v1.1 two-gate pattern, propagating two of the three reconciliation decisions made during the Phase 7 FU Domain Reconciliation session. (1) FU-RECON-ISS-001 — FU-REPORT v1.0 → v1.1: Section 7.3 row FU-REPORT-DAT-027 enum value list rewritten from "Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other" to "Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other" to align with the FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-035) authoritative seven-value list adopted at the Domain PRD level by FU-RECON-DEC-001; source-field cross-reference on the same row corrected from FU-RECORD-DAT-032 (acknowledgmentSent) to FU-RECORD-DAT-035 (giftType). The divergence is documentation-accuracy in nature: FU-REPORT only reads giftType as a display field on Annual Donor Giving Summary line items and does not drive any defined-report logic, so no functional behavior changes. Mechanical edits applied: version bump v1.0 → v1.1; Last Updated 05-01-26 05:30; new Change Log row at top of data area citing CONTR-ISS-001 / FU-RECON-DEC-001 as sources. Carry-forward request file retained at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-report-gifttype-enum-alignment.md (drafted in a prior session). Closes FU-RECON-ISS-001 and CONTR-ISS-001. Committed as e9f0869. (2) FU-RECON-ISS-002 — CBM-Entity-Inventory v1.5 → v1.6: Section 3 Domain-to-Entity Mapping table loses the Pledge row; Section 3 Contribution discriminator detail rewrites the value list from four values (Donation, Sponsorship, Grant, Pledge) to three values (Donation, Sponsorship, Grant), drops the Pledge bullet from Business Concepts Mapped, drops the Pledge sentence from Type-Specific Fields, and adds a clarifying Note on Pledged Contributions paragraph explaining that Pledged is a Contribution.status value (one of six values: Applied, Pledged, Committed, Received, Unsuccessful, Cancelled per FU-RECORD v1.2 Section 8.3 FU-RECORD-DAT-022) rather than a contributionType discriminator value; Section 4.7 Contribution narrative drops "and pledges" from the consolidated funding record description and "and pledges have" from the Type Rationale. The Pledge concept is preserved in the data model — Pledged is now consistently modeled as a status of Contribution.status across all three FU-domain documents (Contribution Entity PRD v1.0, FU Domain PRD v1.0, Entity Inventory v1.6). Mechanical edits applied: version bump v1.5 → v1.6; Last Updated 05-01-26 06:00; new Section 8 Change Log added with v1.6 and v1.5 rows (the document previously lacked a Change Log section — addition follows the precedent set by CR-PARTNER-MANAGE v1.0 → v1.1, where the carry-forward added a Change Log section to a document that previously lacked one). Carry-forward request file committed at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-entity-inventory-contributiontype-three-value-alignment.md is retained as the source-of-record for the decision. Closes FU-RECON-ISS-002. Committed as a6a44e2. FU-RECON-ISS-003 (Northeast Ohio zip code master list consolidated deferral, cross-references FU-REPORT-ISS-001, FC-ISS-001, FU-REPORT-REQ-027) remains as a Phase 9 deferral, no carry-forward action required. The FU Domain PRD v1.0 Open Issues section still lists all three FU-RECON-ISS items as open; their disposition will be updated in a future Domain PRD revision (post-Phase 8 Stakeholder Review feedback would be a natural touch point). Pre-existing EspoCRM mentions in the Entity Inventory retained as appropriate for this Level 3 implementation-mapping document (the no-product-name standard applies to Level 1 and Level 2 PRD documents per user preferences). Next: Phase 8 Stakeholder Review for both Domain PRDs (CR v1.2 and FU v1.0).

**Prior structural change (05-01-26 earlier in day):** FU Domain PRD v1.0 complete. Phase 7 Domain Reconciliation output for the Fundraising domain, produced per crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md v1.5. Single-session reconciliation conducted 05-01-26. Seven sections: Domain Overview (mission tie-in, scope and boundaries against MN/MR/CR domains, flat-domain structure with no sub-domain decomposition rationale, four-process inventory and lifecycle in dependency order with FU-PROSPECT → FU-RECORD → FU-STEWARD as sequential lifecycle and FU-REPORT as asynchronous reader, cross-domain dependencies including read-only consumption of Mentoring-domain Engagement and Session entities for territory-attribution, implementation-tier summary FU-RECORD Core / FU-PROSPECT FU-STEWARD Important / FU-REPORT Enhancement); Personas (three: MST-PER-010 Donor / Sponsor Coordinator as sole or primary operator across all four processes, MST-PER-002 Executive Member as read-only consumer plus informal participant for high-value relationships, MST-PER-001 System Administrator implicit through visibility rules consistent with FU-domain pattern); Business Processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT — each with eight subsections covering Process Purpose, Process Triggers, Personas Involved, Process Workflow, Process Completion, System Requirements, Process Data, Data Collected; conflict resolutions applied: Contribution.giftType seven-value enum per FU-RECON-DEC-001, Contribution.contributionType three-value enum per FU-RECON-DEC-002, Active-to-Closed transition framing per FU-RECON-DEC-003); Data Reference (consolidated by entity — Contact 16 fields, Account 14 fields, Contribution 18 fields, Fundraising Campaign 9 fields, plus Engagement and Session role descriptions for the Mentoring Service Delivery by Funding Territory report with field-name binding deferred to Phase 9); Decisions Made (compiled from all four process documents and the four Entity PRDs — 9 FU-PROSPECT-DEC, 12 FU-RECORD-DEC, 8 FU-STEWARD-DEC, 11 FU-REPORT-DEC, plus 23 entity-level decisions CONTR-DEC-001 through 010, FC-DEC-001 through 009, CON-DEC-017, CON-DEC-018, ACT-DEC-013, ACT-DEC-014, plus the three FU-RECON-DEC reconciliation decisions; EI-ISS-001 noted as resolved by CONTR-DEC-004); Open Issues (eight entries: FU-PROSPECT-ISS-001, FU-REPORT-ISS-002, FU-REPORT-ISS-003, FU-REPORT-ISS-004, CON-ISS-004, FU-RECON-ISS-001, FU-RECON-ISS-002, FU-RECON-ISS-003); Interview Transcript (eleven topic-organized Q/A entries covering the conflict-detection sweep — giftType enum value list, donorStatus and funderStatus seven-value verification, Contribution.status six-value verification, hybrid acknowledgment ownership verification, Fundraising Campaign.status four-value verification, Notes Service entity coverage three-pattern verification, contributionType discriminator evolution, geographicServiceArea independence, lifetime giving rollup pattern, Active-to-Closed transition gap, persona role verification — plus required-field completeness check Step 1.6 and master-list deferral consolidation Step 1.7 — with inline Decision callouts cross-referencing FU-RECON-DEC-001 / 002 / 003). Three reconciliation decisions recorded: FU-RECON-DEC-001 (Contribution.giftType adopts FU-RECORD-authoritative seven-value list at Domain PRD level — Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other — superseding FU-REPORT v1.0 Section 7.3 divergent eight-value list); FU-RECON-DEC-002 (Contribution.contributionType three-value enum Donation/Sponsorship/Grant adopted at Domain PRD level, superseding Entity Inventory v1.5 four-value list including Pledge — Pledged is a status not a type); FU-RECON-DEC-003 (Active-to-Closed transition permitted as free-form Coordinator transition under FU-PROSPECT-REQ-005 in exceptional cases, handled within FU-PROSPECT's Closed-record framework; FU-STEWARD-REQ-003's Active-to-Lapsed framing reads descriptively, not prohibitively). Three carry-forward issues logged: FU-RECON-ISS-001 (carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 to align giftType per FU-RECON-DEC-001); FU-RECON-ISS-002 (Entity Inventory v1.5 → v1.6 carry-forward for contributionType three-value alignment per FU-RECON-DEC-002); FU-RECON-ISS-003 (Northeast Ohio zip code master list consolidated deferral, cross-references FU-REPORT-ISS-001, FC-ISS-001, FU-REPORT-REQ-027). Document size 60 KB, 1,044 paragraphs validated. No product names per Level 2 PRD output standard. Generator script committed alongside the document at PRDs/FU/generate-FU-Domain-PRD.js for future reference and re-execution. Status: Draft — awaiting Phase 8 Stakeholder Review (paralleling CR Domain PRD v1.2's pending review). All four CRM domains have now reached Phase 7 completion: MN domain methodology validation in progress, MR Domain PRD reviewed, CR Domain PRD v1.2 awaiting Phase 8, FU Domain PRD v1.0 awaiting Phase 8.

**Prior structural change (04-30-26):** Fundraising Campaign Entity PRD v1.0 complete. Second and final FU-owned Phase 5 Entity PRD, produced per crmbuilder/PRDs/process/interviews/interview-entity-prd.md v1.1. Single-session interview conducted 04-30-26. Nine sections matching the established Entity PRD pattern in this implementation (no Section 10 Change Log per the established convention; version baseline recorded as the first Decisions Made entry). Section 1 Entity Overview (custom Base entity, FU-owned, Activity Stream on, no discriminator — campaignType is a property field per FC-DEC-002, not a discriminator that drives field visibility). Section 2 Native Fields (four: name maps to campaignName per Marketing Campaign Entity PRD precedent with the implementation choice — native name relabel vs. separate custom field — deferred to Phase 9; plus createdAt, modifiedAt, assignedUser). Section 3 Custom Fields (9 total in a single group, no sub-grouping since no discriminator — all sourced from FU-RECORD v1.2 Section 8.4 FU-RECORD-DAT-039 through DAT-047: campaignName, campaignType, status, goalAmount, startDate, endDate, totalRaised, description, geographicServiceArea). Section 4 Relationships (one oneToMany to Contribution — inverse side of the Contribution.campaign manyToOne established in Contribution Entity PRD v1.0 Section 4; Fundraising Campaign does not link directly to Contact or Account, funder identity flows through linked Contributions). Section 5 Dynamic Logic Rules (none — no field-visibility variation across records, all nine fields visible on every record regardless of campaignType or status; two clarifying subsections explain the absence of discriminator-driven visibility and the absence of automatic field updates). Section 6 Layout Guidance (four panels: Campaign Identification, Lifecycle and Goal, Geographic Targeting, Contributions; description placed in Identification panel rather than as a dedicated panel; Notes Service stream-only with no in-record narrative-notes field unlike Contribution's hybrid in-record-plus-Notes-Service treatment). Section 7 Implementation Notes (nine notes covering native name field mapping, totalRaised rollup calculation, totalRaised behavior on Cancelled and Completed Campaigns, Notes Service stream-only treatment, audit trail scope, record-level visibility, no-deletion rule, geographic service area territory-based attribution model, product-name restriction). Section 8 Open Issues (one issue FC-ISS-001 — Northeast Ohio zip code master list deferred to Phase 9 implementation; closed-by-design note documents disposition of nine items decided in this PRD). Section 9 Decisions Made (nine decisions FC-DEC-001 through FC-DEC-009 covering v1.0 baseline, no-discriminator choice, native name field mapping, status lifecycle and free-form transitions, totalRaised on Contribution.status only, linkage to Contribution unrestricted by Campaign status, geographicServiceArea independent maintenance from Account.geographicServiceArea, no-deletion rule, audit trail scope of status and goalAmount only). Key structural facts: Fundraising Campaign is the inverse oneToMany side of the totalRaised rollup driver (sum of amount across linked Contributions in Received status); the rule is solely on Contribution.status, not on Fundraising Campaign.status, so Received Contributions linked to Cancelled or Completed Campaigns continue to count toward historical totals. Audit trail per FU-RECORD-REQ-014 covers status and goalAmount only — narrower than Contribution's eight-field audit scope. Record-level visibility per FU-RECORD-REQ-022 restricted to Donor / Sponsor Coordinator, Executive Member, System Administrator. FC-ISS-001 (Northeast Ohio zip code master list) is the single new open issue surfaced — same deferral structure as the matching Account.geographicServiceArea master-list deferral; the master list itself is a Phase 9 implementation matter. No new cross-entity carry-forward requests issued — the Entity PRD adopts the FU-RECORD v1.2 source authority on every field-level decision and surfaces no upstream document inconsistencies. Generator script committed alongside the document at PRDs/entities/generate-Fundraising-Campaign-Entity-PRD.js for future reference and re-execution. With Contribution and Fundraising Campaign Entity PRDs both at v1.0, all FU-owned Entity PRDs are complete and Phase 7 FU Domain Reconciliation is now eligible. Next: Phase 7 FU Domain Reconciliation producing the FU Domain PRD by reconciling all four FU process documents (FU-PROSPECT v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0), the FU Domain Overview v1.0, and the four FU-touched Entity PRDs (Contact v1.7, Account v1.8, Contribution v1.0, Fundraising Campaign v1.0); then Phase 8 Stakeholder Review.

**Prior structural change (04-30-26 earlier in day):** Contribution Entity PRD v1.0 complete. First of two FU-owned Phase 5 Entity PRDs, produced per crmbuilder/PRDs/process/interviews/interview-entity-prd.md v1.1. Single-session interview conducted 04-30-26. Nine sections matching the established Entity PRD pattern in this implementation (no Section 10 Change Log per the established convention; version baseline recorded as the first Decisions Made entry). Section 1 Entity Overview (custom Base entity, FU-owned, Activity Stream on, contributionType discriminator with three values: Donation, Sponsorship, Grant — supersedes the Entity Inventory v1.5 four-value list including Pledge). Section 2 Native Fields (four: name auto-generated as "{Donor Display Name} — {ContributionType} — {KeyDate}" with status-driven KeyDate selection, plus createdAt, modifiedAt, assignedUser). Section 3 Custom Fields (18 total in three groups: 14 shared, 3 Donation-specific, 1 Grant-specific — all sourced from FU-RECORD v1.2 Section 8.3 FU-RECORD-DAT-021 through DAT-038). Section 4 Relationships (three manyToOne: donorContact to Contact, donorAccount to Account, campaign to Fundraising Campaign — Contact ↔ Account navigation noted as read-only and not a Contribution-owned relationship). Section 5 Dynamic Logic Rules (five rules CONTR-DYN-001 through CONTR-DYN-005 driven by contributionType for applicationDate, nextGrantDeadline, and giftType; nested giftType = In-Kind drives inKindDescription and inKindValuationBasis visibility). Section 6 Layout Guidance (five panels: Identification, Lifecycle Dates, Donation Details, Grant Details, Acknowledgment and Notes; donorContact and donorAccount both always visible with mutual exclusivity enforced at save). Section 7 Implementation Notes (eleven notes covering auto-generated name, hybrid acknowledgment ownership, Notes Service coexistence with in-record notes field, mutual exclusivity, dynamic-logic-visibility persistence, audit trail scope, record-level visibility, no-deletion rule, multi-payment Grant tracking, rollup calculation scope, product-name restriction). Section 8 Open Issues (one issue CONTR-ISS-001 — FU-REPORT v1.0 Section 7.3 giftType enum divergence logged for carry-forward; closed-by-design note documents disposition of contributionType three-value enum, Pledged-as-status, in-kind handling, and acknowledgment hybrid ownership). Section 9 Decisions Made (ten decisions CONTR-DEC-001 through CONTR-DEC-010 covering v1.0 baseline, contributionType three-value enum, in-kind handling, acknowledgment hybrid ownership resolving EI-ISS-001, auto-generated name format, applicationDate placement in shared fields with dynamic-logic visibility, giftType enum value choice, mutual exclusivity treatment, multi-payment Grant treatment, no-deletion rule). Key structural facts: rollup fields driven by Contribution data live on other entities — Contact.donorLifetimeGiving (donorContact-scoped), Account.funderLifetimeGiving (donorAccount-scoped), Fundraising Campaign.totalRaised (campaign-scoped) — with only Received-status Contributions counting toward all three. Audit trail per FU-RECORD-REQ-014 covers status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, receivedDate. Record-level visibility per FU-RECORD-REQ-021 restricted to Donor / Sponsor Coordinator, Executive Member, System Administrator. CONTR-ISS-001 (FU-REPORT giftType divergence) is the single new open issue surfaced — FU-REPORT-DAT-027 lists Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other while FU-RECORD v1.2 (authoritative) and this Entity PRD use Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other; logged for carry-forward to FU-REPORT in the next FU domain update cycle. EI-ISS-001 closed by CONTR-DEC-004 documenting the hybrid acknowledgment ownership model. Generator script committed alongside the document at PRDs/entities/generate-Contribution-Entity-PRD.js for future reference and re-execution.

**Prior structural change (04-30-26):** Bundled end-of-FU-Phase-4b carry-forward executed propagating six new fields surfaced by the four FU process documents (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT) into the cross-domain Contact and Account Entity PRDs as one coordinated update per crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md v1.1 two-gate pattern. Source: FU-domain convention of holding cross-entity field additions for a single bundled propagation at the end of Phase 4b rather than executing four separate carry-forwards. Decision: four new Donor-specific fields added to Contact (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate) and two new Donor/Sponsor-specific fields added to Account (assignedSponsorCoordinator, lastContactDate). Two document edits applied per the propagation table: (1) Contact Entity PRD v1.6 → v1.7 — Donor bullet in Section 3.4 (Incomplete Domain Fields) replaced with a forward reference to a new Section 3.8; new Section 3.8 "Donor-Specific Fields" added at the end of Section 3 with four field rows (donorStatus is enum with 7 values matching the Master PRD pipeline stages, audited; donorNotes is wysiwyg with field-level security restricted to Donor/Sponsor Coordinator, Executive Member, and System Administrator; donorLifetimeGiving is currency, system-calculated read-only summing amount across linked Contributions where status = Received; lastContactDate is date, manually-set only with no auto-population, read by the Active Donors and Funders Sweep List as the primary sort field); Section 5.6 Donor body rewritten as Condition + Show-all-fields paragraphs matching the Section 5.2 Mentor formatting pattern; Section 6 Layout Guidance gains a new Donor Profile Panel grouping inserted before the Marketing and Source Attribution Panel; CON-ISS-003 closed in Section 8 with reference to FU-PROSPECT-DAT-020; CON-DEC-017 entry appended to Section 9 Decisions Made documenting the v1.7 changes. (2) Account Entity PRD v1.7 → v1.8 — two new field rows appended to the Section 3.4 Donor/Sponsor-Specific Fields table after funderNotes (assignedSponsorCoordinator is link to Contact, conditionally required when funderStatus = Active, analogous to assignedLiaison on Partner Accounts; lastContactDate is date, manually-set only); Section 5.3 Donor/Sponsor show-all-fields list extended; Section 6 Donor/Sponsor Profile Panel field list extended; ACT-ISS-002 closed in Section 8 with reference to the FU-domain field integration; ACT-DEC-014 entry appended to Section 9 Decisions Made documenting the v1.8 changes. Mechanical edits applied: version bumps and Last Updated timestamps on both documents (Contact 04-30-26 14:00, Account 04-30-26 14:15). No requirement IDs renumbered, no existing field IDs changed, no workflow content changed, no structural changes to existing fields, no other documents touched. Carry-forward request file committed at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-end-of-fu-phase-4b-bundled-entity-prd-updates.md is retained as the source-of-record for the decision. CON-ISS-004 (Contact-side equivalent of ACT-ISS-002) not closed in this carry-forward — out of scope per the originating session prompt and remains open. Next: Phase 5 Entity PRDs for the FU-owned entities (Contribution sourced from FU-RECORD v1.2 Section 8.3 with 18 fields including the acknowledgment-shared-ownership model jointly written by FU-RECORD and FU-STEWARD; Fundraising Campaign sourced from FU-RECORD v1.2 Section 8.4 with 9 fields including the FU-REPORT-surfaced geographicServiceArea), then Phase 7 Domain Reconciliation producing the FU Domain PRD, then Phase 8 Stakeholder Review paralleling the CR Domain PRD's pending review.

**Prior structural change (04-30-26):** FU-REPORT process document v1.0 complete. Fourth and final process document in the Fundraising domain, produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Single-session interview conducted 04-30-26. Eleven sections: Process Purpose (Enhancement-tier reporting capability with grant-compliance and sponsor-recognition scope narrowing), Process Triggers (no record-level preconditions, no system-fired initiation, manual only by Coordinator and Executive Member), Personas Involved (MST-PER-010 Donor / Sponsor Coordinator primary operator with full authority; MST-PER-002 Executive Member primary audience for board-level packets and live-view consumer with read-only access to ad-hoc reporting), Process Workflow (four interleaved consumption patterns: live views of defined reports, packet production on demand, Annual Donor Giving Summary generation in early January for prior calendar year, ad-hoc reporting; ten defined reports detailed in Section 4.5), Process Completion (no completion state — perpetual reporting capability, no discrete handoffs, no early-termination concept), System Requirements (27 requirements FU-REPORT-REQ-001 through REQ-027 across six topical batches covering defined reports and live views, packet production, Annual Donor Giving Summaries, Mentoring-domain access and territory-based attribution, ad-hoc reporting, and implementation deferrals plus no-op statements), Process Data (39 supporting data items FU-REPORT-DAT-001 through DAT-039 across six entities — Contact 8 items, Account 9 items, Contribution 12 items, Fundraising Campaign 8 items, Engagement 1 item, Session 1 item — all read-only), Data Collected (empty — FU-REPORT writes nothing), Open Issues (4 issues FU-REPORT-ISS-001 through ISS-004 covering Northeast Ohio zip code master list, Mentoring-domain field-name binding deferral, tangential CR-domain references, CR-MARKETING-ISS-001 retention), Interview Transcript (eleven topic areas with inline Decision callouts), Change Log. Key decisions: standardized grant-compliance reporting dropped from defined-report scope but retained through ad-hoc reporting; sponsor recognition reports also dropped from defined-report scope in favor of ad-hoc capability; FU-REPORT has both standardized and ad-hoc Mentoring-domain read access; combined consumption pattern with monthly informational packet plus quarterly formal board packet (identical content) plus live view between meetings; live view structured as separate per-report views, not a top-level dashboard; Coordinator-triggered packet production only with no system-fired automation; packet output is a single formatted document file distributed by Coordinator outside the system; Annual Donor Giving Summaries cover calendar year on US tax-purpose convention with no minimum threshold and one separate formatted document file per donor; Open Pipeline Value shows Applied/Pledged/Committed totals separately without probability weighting; ten defined reports approved (Year-Over-Year Giving Trends, Pipeline Status, Lifetime Value Distribution, At-Risk Active Relationships, Lapsed Donor and Funder Analysis, Acknowledgment Coverage, Annual Donor Giving Summaries, Open Pipeline Value, Board Member Giving Summary, Mentoring Service Delivery by Funding Territory); System Administrator implicit through visibility rules consistent with FU-domain pattern; Section 8 Data Collected explicitly empty per read-only nature. One mid-interview carry-forward executed before the report walk-through completed: geographicServiceArea on Account restructured from text to multiEnum (zip code list) with visibility expanded to both Partner and Donor/Sponsor; same field added to Fundraising Campaign as FU-RECORD-DAT-047; ACT-ISS-004 closed; five documents updated (Account Entity PRD v1.6 → v1.7, CR-PARTNER-MANAGE v1.0 → v1.1, CR Domain PRD v1.1 → v1.2, CR Domain Overview v1.3 → v1.4, FU-RECORD v1.1 → v1.2). The territory-based attribution model on the Mentoring Service Delivery by Funding Territory report uses zip code lists on Account.geographicServiceArea (funder-level) and Fundraising Campaign.geographicServiceArea (campaign-level), independently maintained, matched against Contact.addressPostalCode (collected at MN-INTAKE-DAT-014); territories may overlap so a single session may count toward multiple funders. Generator script committed alongside the document at PRDs/FU/generate-FU-REPORT.js for future reference and re-execution. No new Entity PRD field additions surfaced beyond those already staged for the bundled end-of-FU-Phase-4b carry-forward.

**Prior structural change (04-30-26):** Carry-forward executed propagating the geographicServiceArea restructure decision across five documents per crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md v1.1 two-gate pattern. Source: FU-REPORT process definition interview, 04-30-26 (interview paused mid-walk-through to execute this carry-forward before continuing the report walk-through). Decision: the Account.geographicServiceArea field is restructured from free text to a structured multi-value zip code list, with visibility expanded from accountType has Partner only to accountType has Partner OR accountType has Donor/Sponsor; the same field is added to Fundraising Campaign as FU-RECORD-DAT-047. The field is the structural foundation for territory-based attribution: a Funder organization's territory and a Fundraising Campaign's funded territory are both expressed as zip code lists, queryable for set-membership against Contact.addressPostalCode (the client zip code collected by Client Intake at MN-INTAKE-DAT-014). Independently maintained on Account and on Fundraising Campaign — the Coordinator sets both as appropriate; no automatic rollup. Cross-domain implications: ACT-ISS-004 (Geographic Service Area field format, free text vs. controlled list) closed; CR-MARKETING-ISS-001 remains open in CR-MARKETING scope to the extent it covers questions beyond field format (campaign targeting model, master list maintenance ownership). Five document edits applied per the propagation table: (1) Account Entity PRD v1.6 → v1.7 — Section 3.3 geographicServiceArea field row type updated text → multiEnum, values column updated to "zip codes from master list", description rewritten to reflect dual-domain scope and zip-code-list-membership semantics; Section 5.3 Donor/Sponsor dynamic logic adds geographicServiceArea (cross-referenced from Section 3.3); Section 6 Donor/Sponsor Profile Panel layout adds geographicServiceArea; Section 8 ACT-ISS-004 closed; Section 9 Decisions Made gains ACT-DEC-013 documenting v1.7 changes (matching the existing pattern of using Decisions Made entries for version tracking). (2) CR-PARTNER-MANAGE v1.0 → v1.1 — Section 8 CR-PARTNER-MANAGE-DAT-032 geographicServiceArea field row updated (type text → multiEnum, values, description); Section 9 ACT-ISS-004 closed; Change Log section added (document previously lacked one) with v1.0 and v1.1 rows. (3) CR Domain PRD v1.1 → v1.2 — Partner field summary paragraph in Section 4.2 updated to describe geographicServiceArea as multiEnum (structured Northeast Ohio zip code list); Section 6 Open Issues ACT-ISS-004 closed; Section 8 Change Log v1.2 row added. (4) CR Domain Overview v1.3 → v1.4 — Section 4 narrative paragraph "Geographic Service Area format (ACT-ISS-004)" rewritten to reflect closure; Section 6 Open Issues ACT-ISS-004 row updated to CLOSED; Section 8 Change Log v1.4 row added. (5) FU-RECORD v1.1 → v1.2 — Section 8.4 Fundraising Campaign Fields Created gains new field FU-RECORD-DAT-047 geographicServiceArea (multiEnum, optional, zip codes from master list); introductory sentence updated from "Eight fields are defined" to "Nine fields are defined"; Section 11 Change Log v1.2 row added. Mechanical edits applied: version bumps and Last Updated timestamps on all five documents. No requirement IDs renumbered, no existing field IDs changed, no workflow content changed. Open issues recorded: master list of Northeast Ohio zip codes to be defined during implementation; migration of existing free-text Partner Account values is a Phase 9 implementation matter; CR-MARKETING and CR-EVENTS process documents not read during execution and may contain narrative references to geographic targeting that are tangentially affected — none surfaced during the edits applied. The carry-forward request draft committed at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-account-territory-zipcode-list.md is retained as the source-of-record for the decision. FU-REPORT interview to resume immediately after this change is committed.

**Prior structural change (04-29-26):** FU-RECORD process document v1.1 carry-forward executed. Single carry-forward decision propagated per crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md v1.1 two-gate pattern. Source: FU-STEWARD process definition interview, 04-29-26, documented in FU-STEWARD.docx v1.0 Section 10.7 (Interview Transcript: Acknowledgment Communications and the Hybrid Ownership Model) and Section 9 (Open Issues, EI-ISS-001 disposition note). Decision: the two acknowledgment fields on Contribution (acknowledgmentSent, acknowledgmentDate) are jointly owned by FU-RECORD and FU-STEWARD under a hybrid ownership model — FU-RECORD is the primary write path executed at the moment of Contribution recording, FU-STEWARD is the catch-up write path executed during the sweep for any Received Contribution where acknowledgmentSent = false. Four content edits applied to FU-RECORD: Section 1 last paragraph rewritten to introduce the hybrid acknowledgment ownership model; Section 4.1 step 6 (Acknowledgment generation) rewritten to identify it as the primary write path and to reference the FU-STEWARD catch-up write path for missed acknowledgments; Section 6 FU-RECORD-REQ-015 rewritten to describe the joint ownership of the acknowledgment fields and to reference FU-STEWARD-REQ-004 as the FU-STEWARD-side write authorization; Section 9 EI-ISS-001 disposition closing sentences rewritten to replace the original "out of scope" framing with the hybrid ownership pattern and a forward reference to FU-STEWARD-REQ-004. Mechanical edits applied: version bump v1.0 → v1.1; Last Updated timestamp refreshed to 04-29-26 23:00; new Change Log row inserted at the top of the data area citing FU-STEWARD v1.0 as the source. No requirement IDs, data item IDs, or field definitions changed. No other documents touched: the Fundraising Domain Overview v1.0 already places acknowledgment within FU-RECORD scope at the inventory level and does not require an update; the Contact Entity PRD and Account Entity PRD are not affected (no Contact or Account fields change); the Contribution Entity PRD is pending Phase 5 and will reflect the hybrid ownership model when written. The carry-forward request draft committed earlier today at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md is retained as the source-of-record for the decision.

**Prior structural change (04-29-26):** FU-STEWARD process document v1.0 complete. Third process document in the Fundraising domain, produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Single-session interview conducted 04-29-26. Ten sections: Process Purpose (weekly or bi-weekly review-and-act sweep, no relationship-level done state, Active → Lapsed as the only relationship exit, deliverable is funder satisfaction), Process Triggers (Active status only, no other gating, no required data beyond Active status, manual sweep initiation with no system prompt, Coordinator sole initiator), Personas Involved (MST-PER-010 Donor / Sponsor Coordinator sole operator with full authority; MST-PER-002 Executive Member read-only consumer + informal participant at Coordinator's invitation), Process Workflow (eleven-step narrative across three saved lists with donor-specific impact reporting and recognition obligation review woven into per-record review at step 3), Process Completion (sweep-level vs. relationship-level distinction; sweep ends when three saved lists are worked through; Active → Lapsed as the only relationship exit; Coordinator sole completion authority; no discrete handoff events; no early-termination path; explicit reversal-of-erroneous-Lapsed amendment authority), System Requirements (12 requirements FU-STEWARD-REQ-001 through REQ-012 covering two new fields, the Active → Lapsed transition pathway, three shared-write authorizations on existing fields, three saved lists with Phase 9 implementation deferral, no-system-fired-alerts position, Mentoring-domain read access, audit and visibility extensions), Process Data (16 supporting fields FU-STEWARD-DAT-001 through DAT-016 across Contact, Account, Contribution, and Mentoring-domain data), Data Collected (10 created or updated items FU-STEWARD-DAT-017 through DAT-026 — two new fields lastContactDate on Contact and Account, three Contact updates, three Account updates, four Contribution updates), Open Issues (no new issues; six inherited dispositioned with CON-ISS-004 and ACT-ISS-002 advanced by FU-STEWARD field additions), Interview Transcript (seventeen topic areas with inline Decision callouts). Key decisions: review-and-act operating philosophy explicitly not reactive (FU-STEWARD is always a review process that leads to action); manual sweep initiation with no system prompt; hybrid acknowledgment ownership model surfaced (FU-RECORD primary at Contribution creation, FU-STEWARD catch-up during sweep) — produces one carry-forward request draft to update FU-RECORD v1.0 → v1.1; three independent saved lists with no unified dashboard (Active Donors and Funders Sweep List sorted by lastContactDate ascending with null first; Acknowledgment-Pending Contributions list filtered to status = Received and acknowledgmentSent = false; Grant Deadlines list filtered to contributionType = Grant and status in (Committed, Received) sorted ascending with past-due at top); no system-fired alerts of any kind; pure Coordinator judgment for Active → Lapsed transition with no thresholds, no auto-transitions, no candidate flagging, reasoning narratively in donorNotes/funderNotes; no structured lapseReason, stewardshipTier, stewardshipPlan, or preferredStewardshipChannel fields; no structured tracking of recognition obligations (notes only per FU-RECORD design); donor-specific impact reports composed entirely outside the CRM with the fact recorded narratively. Two Entity PRD field additions surfaced: Contact.lastContactDate (date, optional, manually-set only, visible when contactType has Donor — joins bundled carry-forward) and Account.lastContactDate (date, optional, manually-set only, visible when accountType has Donor/Sponsor — joins bundled carry-forward). Staged additions for end-of-FU-Phase-4b propagation are now: Contact Entity PRD v1.6 → v1.7 (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate) and Account Entity PRD v1.6 → v1.7 (assignedSponsorCoordinator, lastContactDate). One carry-forward request draft committed at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md to update FU-RECORD v1.0 → v1.1 reflecting the hybrid acknowledgment ownership model. Session prompt for FU-REPORT committed at PRDs/FU/SESSION-PROMPT-FU-REPORT.md.

**Prior structural change (04-29-26):** FU-RECORD process document v1.0 complete. Second process document in the Fundraising domain, produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Substantive interview conducted 04-28-26; continuation session on 04-29-26 assembled Sections 6 through 10 from prior structural decisions. Ten sections: Process Purpose (steady high-volume cadence, no fixed relationship-level "done" state), Process Triggers (donor record must exist, lifecycle stage unconstrained, contributionType + status + exactly one of donorContact/donorAccount required at creation, manual-only initiation), Personas Involved (MST-PER-010 Donor / Sponsor Coordinator sole operator with full authority; MST-PER-002 Executive Member read-only via reports), Process Workflow (Donation canonical happy path plus Sponsorship and Grant variants plus Fundraising Campaign workflow — multi-payment Grants reach Received only on final payment, receivedDate = final payment date, Option 1 fiscal-year trade-off accepted), Process Completion (Contribution terminal states Received/Unsuccessful/Cancelled; records persist permanently, no deletion; funder relationship continues indefinitely with Active → Lapsed owned by FU-STEWARD; Level A + Pattern X amendments — edit any field on any Contribution at any time, audit trail captures changes, no offsetting records for bounced/refunded/reversed Contributions), System Requirements (24 requirements FU-RECORD-REQ-001 through REQ-024 covering record creation, mutual exclusivity of donor link, contributionType dynamic logic, status lifecycle and free-form transitions, multi-payment Grant handling, automatic activation companion to FU-PROSPECT-REQ-006, Campaign totalRaised calculation, donorLifetimeGiving and funderLifetimeGiving rollups, audit trail scope, acknowledgment field-level capability, in-kind handling, nextGrantDeadline, amendments, retention, Notes Service, restricted Contribution and Fundraising Campaign visibility, pipeline view and giving history rollup with implementation deferred to Phase 9), Process Data (16 supporting data items FU-RECORD-DAT-001 through DAT-016 across Contact, Account, and one relationship), Data Collected (30 created-or-updated items FU-RECORD-DAT-017 through DAT-046 across Contact (donorStatus update + new donorLifetimeGiving), Account (funderStatus and funderLifetimeGiving updates), Contribution (18 fields including 14 shared, 3 Donation-specific, 1 Grant-specific), and Fundraising Campaign (8 fields)), Open Issues (no new issues; 4 inherited dispositioned — EI-ISS-001 CLOSED with field-level acknowledgment model, FU-DO-ISS-002 informational/no action, CON-ISS-004 ADVANCED, ACT-ISS-002 ADVANCED), Interview Transcript (16 topic areas with inline Decision callouts). Key decisions: contributionType has three values (Donation, Sponsorship, Grant) — Pledged is a status not a type, In-Kind is a giftType value not a contributionType; six-value Contribution status (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) free-form transitions; four-value Fundraising Campaign status (Planned, Active, Completed, Cancelled) free-form transitions; Pattern C Campaign creation (in advance or retroactively); one Campaign per Contribution, settable/changeable/clearable at any time with no system-enforced gating against Completed/Cancelled Campaigns; only Received Contributions count toward all rollups (donorLifetimeGiving, funderLifetimeGiving, totalRaised); record-level visibility on Contribution and Fundraising Campaign restricted to Donor / Sponsor Coordinator + Executive Member + System Administrator; audit trail covers status, amount, donor link, and four date fields on Contribution plus status and goalAmount on Fundraising Campaign. EI-ISS-001 resolution deviates from FU Domain Overview's working position (three Donation-only fields including taxReceiptRequired) — leaner two-field model (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, taxReceiptRequired declined as a structured field, specifics in notes. One Entity PRD field addition surfaced: Contact.donorLifetimeGiving (currency, system-calculated, visible when contactType has Donor — sum of amount across Received Contributions linked via donorContact). Joins bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 → v1.7 alongside donorStatus and donorNotes (from FU-PROSPECT). No new Account fields surfaced; Account.funderLifetimeGiving already exists in v1.6 — FU-RECORD-REQ-013 specifies the calculation only. Note: FU-STEWARD subsequently surfaced the hybrid acknowledgment ownership model and produced a carry-forward request draft to update this document v1.0 → v1.1 accordingly. Session prompt for FU-STEWARD committed at PRDs/FU/SESSION-PROMPT-FU-STEWARD.md.

**Prior structural change (04-22-26):** FU-PROSPECT process document v1.0 complete. First process document in the Fundraising domain, produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Ten sections: Process Purpose, Process Triggers (no preconditions, name-only required data, Coordinator-initiated, full Coordinator authority), Personas Involved (MST-PER-010 Donor / Sponsor Coordinator as sole operator; MST-PER-002 Executive Member as informal participant at Coordinator's invitation), Process Workflow (seven-step narrative from prospect identification through Active handoff, with Lapsed/Closed alternative paths and Coordinator-discretion re-engagement), Process Completion (Active is normal; Lapsed and Closed are alternative terminal states; all transitions Coordinator judgment), System Requirements (13 requirements FU-PROSPECT-REQ-001 through REQ-013 covering record creation, contactType/accountType appending, lifecycle field behavior, automatic Committed → Active transition on first Contribution, multi-Contact linkage to Funder Organization Accounts, assignedSponsorCoordinator field, Notes Service integration, bulk creation, pipeline view, Universal Contact-Creation Rules, field-level visibility), Process Data (17 supporting data items FU-PROSPECT-DAT-001 through DAT-017 across Contact and Account), Data Collected (11 created-or-updated items FU-PROSPECT-DAT-018 through DAT-028 across Contact and Account), Open Issues (1 new FU-PROSPECT-ISS-001 deferring pipeline view implementation to Phase 9, plus 4 inherited dispositioned), Interview Transcript (15 topic areas with inline Decision callouts). Three Entity PRD field additions surfaced: Contact.donorStatus (enum, 7-value parallel to funderStatus, visible when contactType has Donor, defaults to Prospect — closes CON-ISS-003); Contact.donorNotes (wysiwyg, restricted visibility, analogous to funderNotes on Account); Account.assignedSponsorCoordinator (link to Contact, visible when accountType has Donor/Sponsor, optional in general but required when funderStatus = Active — advances FU-DO-ISS-001). Per FU Domain Overview v1.0 Section 5, these are bundled into end-of-FU-Phase-4b Contact Entity PRD v1.6 → v1.7 and Account Entity PRD v1.6 → v1.7 carry-forwards after FU-STEWARD completes. CON-ISS-003 is CLOSED by this process; FU-DO-ISS-001 is ADVANCED; EI-ISS-001 carries forward to FU-RECORD unchanged; FU-DO-ISS-002 is informational (no action). No carry-forward request drafts issued this session per the Domain Overview's bundling decision. Session prompt for FU-RECORD committed at PRDs/FU/SESSION-PROMPT-FU-RECORD.md.

**Prior structural change (04-22-26):** FU Domain Overview v1.0 complete. Phase 4a output for the Fundraising domain per crmbuilder/PRDs/process/interviews/guide-domain-overview.md v1.1. Flat domain structure (no sub-domains), four processes in confirmed dependency order (FU-PROSPECT → FU-RECORD → FU-STEWARD sequential lifecycle; FU-REPORT asynchronous), two personas (MST-PER-010 primary, MST-PER-002 oversight consumer). Data Reference covers four entities: Contact v1.6 and Account v1.6 (cross-domain, Entity PRDs exist) and Contribution and Fundraising Campaign (FU-owned, Entity PRDs pending Phase 5). Contribution adopted as a single consolidated entity with contributionType discriminator per Entity Inventory v1.5, superseding the legacy four-separate-entities model. Four open issues surfaced: CON-ISS-003 (donor lifecycle field — since closed by FU-PROSPECT), FU-DO-ISS-001 (assignedSponsorCoordinator on Account — since advanced by FU-PROSPECT), EI-ISS-001 (acknowledgment / tax-receipt model — carries to FU-RECORD), FU-DO-ISS-002 (Contribution consolidation — informational).

**Prior structural change (04-20-26):** MR Phase 9 follow-up work fully closed out. CR Domain PRD v1.0 → v1.1: Section 4.1.1 Shared Fields paragraph rewritten to the 8-value `howDidYouHearAboutCbm` list (Partner Referral, Social Media, CBM Email, Workshop or Event, Search Engine, News or Media, Personal Referral, Other) with revised channel rollup (Partner Referral → CR-PARTNER; Workshop or Event → CR-EVENTS; CBM Email, Social Media, Search Engine, News or Media → CR-MARKETING; Personal Referral and Other → organic/unattributed), reactivation-via-Campaign-tracking note, and MR-Y9-EXC-005 supersession reference; Section 4.7 Conversion Attribution rewritten to measure attribution through Campaign Engagement records where Campaign.channel = Reactivation rather than through a Returning Client enum value; Section 4.8 Report 3 and CR-REACTIVATE-OUTREACH-REQ-024 rewritten to identify converting Contacts via Campaign Engagement within a configurable look-back joined to Account.applicantSince (the howDidYouHearAboutCbm column is removed); Section 4.10 narrative and CR-MARKETING-CAMPAIGNS-REQ-013 updated from "= Email Marketing" to "= CBM Email"; five 10-value → 8-value language updates applied across narrative and requirements; Handoff to CR Domain Reconciliation narrative updated to Campaign-based attribution; CR-DEC-024 added to Section 5 Decisions Made recording the v1.1 supersession per MR-Y9-EXC-005; Section 8 Change Log added with v1.0 baseline and v1.1 rows; upstream version references bumped to Entity Inventory v1.5, Contact Entity PRD v1.6, Account Entity PRD v1.6, CR Domain Overview v1.3, CR-MARKETING SDO v1.3. CR Domain Overview v1.2 → v1.3: Section 4.7 CON-ISS-008 closure description rewritten to reflect the 8-value list with MR-Y9-EXC-005 supersession reference citing Contact Entity PRD v1.6; Section 4.2 and Section 4.3 narrative updated to reference Contact Entity PRD v1.6 and Account Entity PRD v1.6 with durable language replacing drift-prone field counts; three new rows appended to Section 5 Updates to Prior Documents capturing Contact Entity PRD v1.5 → v1.6, Account Entity PRD v1.5 → v1.6, and CR-MARKETING SDO v1.2 → v1.3 updates; Section 8 Change Log added with v1.0 through v1.3 history. All upstream and downstream documents are now aligned with the 8-value `howDidYouHearAboutCbm` enum; the MR Phase 9 follow-up round is complete.

**Prior structural change (04-18-26):** CR Phase 2b Entity PRDs complete. Seven Entity PRDs produced at v1.0 for all deferred CR-domain entities: Event (Custom Event, 10 native + 10 custom fields, 3 relationships, format-driven dynamic logic), Event Registration (Custom Base, 4 native + 12 custom fields, 2 relationships), Partnership Agreement (Custom Base, 4 native + 6 custom fields, 1 relationship, append-only renewal pattern), Segment (Custom Base, 4 native + 5 custom fields, 3 relationships, segmentType discriminator driving conditional field requirements), Campaign Group (Custom Base, 4 native + 4 custom fields, 1 relationship, no independent status), Marketing Campaign (Custom Base, 4 native + 17 custom fields, 3 relationships, unified five-value status lifecycle per CR-RECON-DEC-001, channel-driven dynamic logic for Reactivation-specific fields), Campaign Engagement (Custom Base, 4 native + 12 custom fields, 2 relationships, unified five-event-type field set per CR-RECON-DEC-002). Entity Inventory bumped to v1.5. Generator JS files committed alongside each .docx. Synthesis task with no interview questions required — all field definitions compiled from CR Domain PRD v1.0 Section 4 and source process documents. Contact Entity PRD v1.5 and Account Entity PRD v1.5 referenced at the time (subsequently bumped to v1.6 during MR Phase 9 follow-up). All MN, MR, and CR domain entities now have Entity PRDs. Remaining Entity PRDs are FU-domain only (Contribution, Fundraising Campaign).

**Prior structural change (04-16-26):** CR Domain PRD v1.0 complete. Domain Reconciliation (Phase 5) for the Client Recruiting domain. Seven processes across four sub-domains (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE) reconciled into a single Domain PRD. Three reconciliation decisions made: CR-RECON-DEC-001 (Campaign.status unified five-value lifecycle for all channels — no channel-dependent status restriction), CR-RECON-DEC-002 (Campaign Engagement unified five-event-type field set for all channels — Reactivation campaigns simply do not populate unsubscribed/unsubscribedAt), CR-RECON-DEC-003 (Reactivation Candidates saved-list query uses three factual criteria owned by CR-EVENTS-CONVERT; emailOptOut filtering is CR-REACTIVATE-OUTREACH responsibility at consumption time). 257 system requirements compiled. Data Reference covers 9 entities: Contact, Account, Partnership Agreement, Event, Event Registration, Marketing Campaign, Campaign Group, Campaign Engagement, Segment. 20 decisions compiled (3 reconciliation + 17 process-level). 17 open issues consolidated (4 domain-level, 10 process-level, 3 entity-level). Survey Service dependency consolidated across CR-PARTNER-MANAGE-ISS-001, CR-PARTNER-MANAGE-ISS-003, and CR-EVENTS-ISS-001. CON-ISS-004 and ACT-ISS-002 assessed: CR domain coverage now complete, remain open pending FU domain. Next: Stakeholder Review (Phase 8) for the CR Domain PRD.

**Process validation pilot (04-13-26):** The MR domain is the
subject of a methodology pilot running Phases 9 → 11 → 12 → 13
(YAML Generation → Deployment → Configuration → Verification) to
validate that the document production methodology actually produces a
deployable CRM. Pilot scope, decisions, and findings are logged in
`PRDs/pilot/PILOT-FINDINGS.md`.

**Phase 9 complete (04-13-26).** Four artifacts produced and
committed to `programs/MR/`: `MR-Dues.yaml` (Dues entity, 7 custom
fields, one Contact-Dues relationship), `MR-Contact.yaml` (42
Contact custom fields across 12 panels), `EXCEPTIONS.md` (5
exceptions — all on Contact enum value lists and two field-name
reconciliations between the Mentor Recruitment Domain PRD v1.0 and
the Contact Entity PRD v1.3), and `MANUAL-CONFIG.md` (38 items
across 10 categories for post-deployment hand-off to Phase 12).
Three methodology findings added to `PILOT-FINDINGS.md`: Finding 4
(YAML schema v1.0 cannot express several commonly-required CRM
constructs), Finding 5 (unresolved open issues on required fields
blocked clean Phase 9 execution), and Finding 6
(`howDidYouHearAboutCbm` scope change has downstream impact outside
the MR domain). Finding 2 status updated from "Confirmed — must be
formalized" to "Confirmed — Phase 9 Interview Guide authored and
exercised." Finding 3 (legacy programs archive) marked Resolved.

**Follow-up documents from MR Phase 9 complete (04-18-26).** Contact Entity PRD
v1.5 → v1.6 (8-value `howDidYouHearAboutCbm` list adopted per MR-Y9-EXC-005;
`mentoringFocusAreas` 42 values, `skillsExpertiseTags` 33 values,
`fluentLanguages` 36 values enumerated; CON-ISS-005 through CON-ISS-007 closed;
CON-ISS-008 updated). Account Entity PRD v1.5 → v1.6 (20 NAICS sectors
explicitly enumerated per MR-Y9-EXC-001). CR-MARKETING Sub-Domain Overview
v1.2 → v1.3 (channel rollup table revised for 8-value list; CBM Website and
Returning Client rows removed; Email Marketing renamed to CBM Email). Mentor
Recruitment Domain PRD v1.0 → v1.1 (`skillsAndExpertiseTags` renamed to
`skillsExpertiseTags`; `howDidYouHearAboutCBM` renamed to
`howDidYouHearAboutCbm`; five TBD markers replaced with cross-references to
Contact Entity PRD v1.6; MR-RECRUIT-ISS-001 and CON-ISS-005 through CON-ISS-008
closed). The two remaining carry-forward items — CR Domain PRD v1.0 → v1.1 and
CR Domain Overview v1.2 → v1.3 — were completed 04-20-26 (see Latest
structural change above). MR Phase 9 follow-up round is fully closed.

**Next step in the pilot:** Phase 11 (CRM Deployment) — provision an
instance of the target CRM. Outside Claude.ai. After Phase 11, Phase
12 applies the YAML and works through `MANUAL-CONFIG.md`.

Three earlier methodology decisions recorded during the Phase 9
Interview Guide authoring session on 04-13-26: (1) Cross-Domain
Service PRDs deliberately skipped for MR (Finding 1); (2) Manual
Configuration List formalized as a Phase 9 output (Finding 2); (3)
legacy `programs/` directory archived before Phase 9 conversation
(Finding 3, Resolved). The Phase 9 Interview Guide
(`crmbuilder/PRDs/process/interviews/guide-yaml-generation.md`, v1.0)
was authored during the same session that ran Phase 9 for MR.

The Mentoring (MN) domain has five completed process documents and a
reconciled Domain PRD produced under the new document production
process. Entity Discovery has been completed retroactively, producing
the Entity Inventory. Five Entity PRDs (Contact, Account, Engagement,
Session, Dues) are complete — all MN-domain and MR-domain entities
are now fully defined.

**Primary Domain backfill (04-15-26).** All five Entity PRDs had a
`Primary Domain` row added to their Entity Overview tables. Previously,
the Path B entity PRD adapter fell back to the first Contributing
Domain entry (Bug 6 fallback path) and emitted a
`primary_domain_fallback` warning for every import. With the explicit
row, all five entities now parse without fallback warnings. Dues uses
`Mentor Recruitment (MR)` as its primary domain (matching its Entity
Inventory detail card); the other four use `Mentoring (MN)`.
Consistency check confirmed: Entity PRD Primary Domain values match
Entity Inventory Owning Domain values for all entities with detail
cards. Contributing Domains are supersets of the Cross-Domain Matrix
entries. Format variations noted during adapter verification: some
Entity PRDs use annotated link_types (e.g. `"manyToOne (self-ref)"`)
and conditional/system required values — the adapter handles these
gracefully with soft warnings.

The Mentor Recruitment (MR) domain has completed Phase 5 domain
reconciliation. All five process documents and the reconciled MR Domain
PRD are finished. Two reconciliation decisions were made: reactivation
is available from both Resigned and Departed status (MR-RECON-DEC-001),
and applicationDeclineReason uses a reconciled 7-value enum
(MR-RECON-DEC-002). SME Request entity was removed from process scope.

### Mentoring Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Client Intake | `PRDs/MN/MN-INTAKE.docx` | v2.4 |
| Mentor Matching | `PRDs/MN/MN-MATCH.docx` | v2.2 |
| Engagement Management | `PRDs/MN/MN-ENGAGE.docx` | v2.3 |
| Activity Monitoring | `PRDs/MN/MN-INACTIVE.docx` | v1.2 |
| Engagement Closure | `PRDs/MN/MN-CLOSE.docx` | v1.1 |

**Latest structural change (04-15-26):** CR-REACTIVATE-OUTREACH v1.0 complete. Seventh and final CR process document. Defines the reactivation outreach workflow for three populations (former clients, unconverted event attendees, inactive marketing prospects). Key operational decisions: CRM-native email sends (no external marketing platform); three-status Campaign lifecycle (Draft, Sent, Cancelled) for channel = Reactivation; single-action create-and-send workflow from saved lists; nine starter email templates (three per population); emailOptOut hard block at dispatch (compliance enforcement); 90-day informational gap warning (visual flag plus confirmation prompt); population field on Campaign (enum: Former Client, Event Attendee, Inactive Prospect) system-set from originating saved list; dedicated reactivation sending address; five Campaign Engagement event types (sent, opened, clicked, bounced; no unsubscribed); Campaign Engagement records update Contact marketing roll-up fields same as marketing Campaigns. 26 system requirements (REQ-001 through REQ-026). 42 data items (DAT-001 through DAT-042). No new open issues. Five carried forward from SDO. No updates to existing documents beyond SDO carry-forward. Additional requirements for future Campaign Entity PRD: population field and three-status lifecycle for Reactivation channel. All CR Phase 4 process definition is now complete. CR Domain Reconciliation (Phase 5) is eligible.

**Prior structural change (04-15-26):** CR-REACTIVATE Sub-Domain Overview v1.0 complete. Fourth and final CR Sub-Domain Overview. Establishes the Client Reactivation and Recovery sub-domain (Important tier) containing one process: CR-REACTIVATE-OUTREACH (Reactivation Outreach). Client Recruiter (MST-PER-007) is the primary operator; Client Administrator (MST-PER-003) is supporting (configuration and oversight); Client (MST-PER-013) is the subject persona. Three in-scope populations for v1.0: former clients (Completed or Abandoned Engagements), unconverted event attendees (inherited from CR-EVENTS-CONVERT Reactivation Candidates saved list), inactive marketing prospects (lapsed marketing engagement via Contact roll-up fields). Two populations deferred: incomplete applications (MN-INTAKE lacks partial-state capture) and referral requests to former clients (different operational pattern). Key decisions: hybrid segmentation model (saved-list queries computed on read for identification, ad-hoc Contact selection at send time); outreach uses Campaign records with channel = Reactivation (Campaign.channel enum expanded from {Email, SMS} to {Email, SMS, Reactivation}); Campaign entity shared with CR-MARKETING-CAMPAIGNS; 90-day minimum gap between reactivation sends (informational warning, not blocking); no maximum attempt count; no cross-sub-domain cooling-off enforcement (best-practice 30-day gap recommended); response tracking via Campaign Engagement for passive engagement, organic exit through saved-list query criteria for active re-engagement, manual opt-out by Client Recruiter; no explicit terminal state; conversion attribution via howDidYouHearAboutCbm = Returning Client. One new Contact field: lastReactivationSentAt (datetime). No new entities. Seven existing entities consumed: Contact, Account, Engagement, Event Registration, Event, Campaign, Campaign Engagement. Three owned reports: Reactivation Campaign Performance, Reactivation Population Summary, Reactivation Conversion Attribution. No new open issues. Five carry-forward open issues referenced: CR-MARKETING-ISS-001, CR-MARKETING-ISS-003, CR-MARKETING-ISS-004, CON-ISS-004, ACT-ISS-002. One update to prior documents: Contact Entity PRD v1.3 → v1.4 (add lastReactivationSentAt, consolidated with pending presenterBio/presenterTopics/lastConversionPushSentAt carry-forward). Campaign Entity PRD (Phase 2b, not yet written) must include three-value channel enum. Session prompt for CR-REACTIVATE-OUTREACH committed alongside the SDO.

**Prior structural change (04-13-26):** CR-EVENTS-CONVERT process document v1.0 complete. Second and final process document in the CR-EVENTS sub-domain; CR-EVENTS sub-domain process definition is now complete. Defines post-event follow-up, conversion-push outreach, conversion detection and reporting, and the Reactivation handoff. Content and Event Administrator (MST-PER-009) is the primary operator; Client Recruiter (MST-PER-007) is a downstream consumer (takes ownership at the Reactivation handoff). 35 system requirements (REQ-001 through REQ-035). 27 data items (DAT-001 through DAT-027): 22 read-only references across Contact (8), Event (9), Event Registration (4), Account (1); 3 new fields and 2 activity-stream update pathways. Three new fields introduced: Event Registration.postEventFollowUpSentAt (datetime, idempotency for the Send Post-Event Emails action); Contact.lastConversionPushSentAt (datetime, supports conversion-push effectiveness comparison); Account.applicantSince (datetime, populated by MN-INTAKE workflow, the application-side anchor for the conversion window). Key decisions: manual Send Post-Event Emails action on Event detail view replaces any scheduled-automation approach (rationale: Event.status = Completed is fully manual per MANAGE, so no reliable system-visible event-end signal exists; action is mechanically analogous to existing MANAGE bulk-update actions); action always visible with explanatory message if dateEnd not yet passed, skips Registered and Cancelled registrations, idempotent via postEventFollowUpSentAt; opt-out split — thank-you and we-missed-you are transactional (ignore emailOptOut), conversion-push is marketing (honors emailOptOut via default filter in the Unconverted Event Attendees list); no new Event fields for templating (reuse existing recordingUrl, no structured nextEventSuggestion); conversion-push uses saved Contact list with adjustable filters, three starter templates (Ready to Apply, Next Event Invitation, General Reconnect) with template-with-override workflow; conversion-push sends create no Campaign records, no new entity — only activity-stream entries plus lastConversionPushSentAt; conversion detection is computed-on-read (no stored flag, no workflow trigger, no scheduled materialization); Contact detail view shows read-only Conversion Status indicator with three states (Converted / Not Converted / Not An Event Attendee); window anchors Event.dateEnd to Account.applicantSince with 180-day hardcoded default and per-report override; trailing-12-months default time range on conversion reports; five effectiveness reports (Per-Event, Topic, Format, Partner Co-Sponsorship with binary and per-partner groupings, Geography with pending-taxonomy note) exposing six uniform metrics each (Registrations, Attendance, No-Show Rate, Conversion Count, Conversion Rate, Median Days Event-to-Application); reports placed in combined Event Reports section with Operational and Effectiveness subgroups; no dedicated side-by-side comparison view in v1.0; Reactivation handoff is a saved-list query (Reactivation Candidates — Event Attendees) computed on read with three-criterion threshold (attended, not applicant, most recent attended event 180+ days ago) — no Contact flag, no Segment, no scheduled job, no manual handoff action; cross-sub-domain channel effectiveness report remains Phase 5 CR Domain Reconciliation concern, no pre-aggregation in CR-EVENTS-CONVERT (explicit REQ-035 lists the queryable fields exposed for Phase 5). One new open issue: CR-EVENTS-CONVERT-ISS-001 (conversion-push per-send engagement tracking deferred; revisit 6+ months post-deployment). Three carry-forward open issues referenced: CR-MARKETING-ISS-001 (geographic taxonomy — affects Geography report), CR-MARKETING-ISS-004 (hard-bounce threshold), CR-EVENTS-ISS-001 (event feedback surveys). Three updates to prior documents triggered by this session: Contact Entity PRD v1.3 → v1.4 (add lastConversionPushSentAt; consolidated with the pending presenterBio/presenterTopics carry-forward from SDO), Account Entity PRD v1.3 → v1.4 (add applicantSince), MN-INTAKE v2.3 → v2.4 (extend REQ-011 to populate Account.applicantSince at clientStatus = Applicant transition). Six Phase 2b Entity PRDs remain eligible: Marketing Campaign, Campaign Group, Campaign Engagement, Segment, Event, Event Registration.

**Prior structural change (04-13-26):** CR-EVENTS-MANAGE process document v1.0 complete. First of two CR-EVENTS process documents. Defines the full event lifecycle from Event creation at Draft status through attendance recording at Completed status. Content and Event Administrator (MST-PER-009) is the sole operator; Partner Coordinator (MST-PER-008) participates only through out-of-band coordination. 54 system requirements (REQ-001 through REQ-054). 48 data items (DAT-001 through DAT-048): 18 read-only references across Contact (13) and Account (5); 30 created or updated items across Event (15 fields), Event Registration (11 fields — including six new ones), and Contact (update pathways for contactType append, howDidYouHearAboutCbm, sourceAttributionDetails, and standard form fields under update-only-if-blank). Six new Event Registration fields introduced by this process: specialRequests, confirmationSentAt, remindersSent, lastCommunicationBouncedAt, cancellationDate, cancellationReason. Key decisions: all Event status transitions are fully manual (no system-driven transitions at dateStart or dateEnd); online self-cancellation removed entirely (all cancellations are staff-initiated); Draft requires only name, format, dateStart, while Scheduled requires the full field set including at least one presenter; format-specific reminder schedule (In-Person seven-day and one-day, Virtual one-day and one-hour, Hybrid all three); transactional event communications ignore Contact.emailOptOut (the transactional-versus-marketing distinction is intentional); registration blocked when dateEnd has passed regardless of Event status; dedicated Add Walk-In action on Event detail view with email optional; presenter contactType auto-appended on first linkage and preserved on unlink; coSponsoringPartners picker does not filter by partnerStatus (all values selectable); Event.documents is staff-only with participant-facing materials distributed via email attachments; seven operational reports fully defined. One new open issue: CR-EVENTS-MANAGE-ISS-001 (virtual attendance import tooling deferred). One carry-forward open issue referenced: CR-MARKETING-ISS-004 (hard-bounce threshold). No updates to prior documents triggered by this session. Session prompt for CR-EVENTS-CONVERT updated with carry-forward context reflecting the manual-transitions decision and the emailOptOut framing question.

**Prior structural change (04-13-26):** CR-EVENTS Sub-Domain Overview v1.0 complete. Third of four CR Sub-Domain Overviews. Establishes the Workshops and Event Management sub-domain (Important tier) containing two processes in dependency order: CR-EVENTS-MANAGE (Event Lifecycle Management) and CR-EVENTS-CONVERT (Post-Event Follow-Up and Conversion). Content and Event Administrator (MST-PER-009) is the primary operator across both processes; Partner Coordinator (MST-PER-008) supports through out-of-band coordination only (no system notification on co-sponsorship linkage); Client Administrator (MST-PER-003) is the MN-INTAKE handoff persona; Client (MST-PER-013) is the target. Client Recruiter (MST-PER-007) takes ownership after the CR-REACTIVATE handoff. Key decisions: single-record Event model for all three formats (In-Person, Virtual, Hybrid — Hybrid aspirational); 6-value Event status lifecycle (Draft / Scheduled / In Progress / Completed / Cancelled / Postponed); 10-value Event topic enum; no capacity enforcement and no waitlist (venueCapacity is informational only); CRM-hosted registration forms with hardcoded contactType = Client and update-only-if-blank on email match; Point 1 source attribution (howDidYouHearAboutCbm = Workshop or Event) at new-Contact creation; walk-in registration path for in-person events; self-cancellation via link in confirmation email; binary attendance (Attended / No-Show) with judgment on partial attendance; all presenters are Contact records (no free-text external presenter field, no role distinction, no compensation tracking); Event.coSponsoringPartners link-multiple only with no co-sponsorship-specific fields; recording and LMS publishing out of scope; event feedback surveys deferred to future Survey Service (new open issue CR-EVENTS-ISS-001); conversion detection via Contact → Event Registration → application chain with configurable window (default 180 days); seven operational metrics; five effectiveness reporting dimensions (per event, by topic, by format, by partner co-sponsorship, by geography — geography dependent on CR-MARKETING-ISS-001); cross-sub-domain channel effectiveness comparison governed at CR Domain Reconciliation, not in CR-EVENTS. Two Contact entity field additions: presenterBio (wysiwyg) and presenterTopics (multiEnum aligned with Event.topic). No new entities (Event and Event Registration already present in Entity Inventory v1.4 with type and owning domain resolved). Two carry-forward updates pending: Contact Entity PRD v1.3 → v1.4 (add two presenter fields; update Section 5.7 narrative) and CR Domain Overview v1.1 → v1.2 (add CR-EVENTS-ISS-001 to open issues table). Session prompts for both CR-EVENTS process documents committed alongside the SDO.

**Prior structural change (04-10-26):** CR-MARKETING-CAMPAIGNS process document v1.0 complete. Second and final process document in the CR-MARKETING sub-domain. Defines campaign execution and tracking covering the full campaign lifecycle from placeholder creation through engagement tracking and channel effectiveness reporting. Client Recruiter (MST-PER-007) sole operator; Partner Coordinator (MST-PER-008) supporting out-of-band only. 21 system requirements (REQ-001 through REQ-021). 59 data items (DAT-001 through DAT-059): 22 read-only references across Contact (13), Account (3), Segment (5), and one reference value list; 37 created/updated items across Campaign (15 fields), Campaign Group (4 fields), Campaign Engagement (12 fields), and Contact (6 fields). Three new custom entities fully specified for the first time: Campaign (one record per outbound send, 15 fields, five-value status lifecycle: Draft, Scheduled, Sent, Complete, Cancelled), Campaign Group (lightweight organizational container, 4 fields, no independent status), Campaign Engagement (per-Contact-per-Campaign engagement tracking, 12 fields including sent/opened/clicked/bounced/unsubscribed with timestamps). Dual-mode operation throughout: fully manual when marketing platform integration is limited, fully automatic when deeply connected, or any combination. externalCampaignId links CRM Campaign to marketing platform counterpart. Six Campaign aggregate metrics (totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed) workflow-updated from Campaign Engagement records. Four Contact roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) always system-calculated. Campaign tracking parameters enable Point 1 source attribution (howDidYouHearAboutCbm = Email Marketing) at web inquiry form submission. Compliance is Client Recruiter discipline (no automatic sync gate). Three campaign-specific reports: Campaign Performance Report, Campaign Group Rollup Report, Channel Effectiveness Report. Recipient-level view from Campaign record. No new open issues. No updates to prior documents. CR-MARKETING sub-domain process definition is now complete.

**Prior structural change (04-09-26):** CR-MARKETING-CONTACTS process document v1.0 complete. First process document in the CR-MARKETING sub-domain. Defines marketing contact management as a continuous activity composed of nine activity areas: web inquiry form handling, marketing list import, single-record manual entry, multi-contact-per-company detection, prospect contact lifecycle management, data hygiene, segmentation, sync preparation, and reporting and pipeline visibility. Client Recruiter (MST-PER-007) sole operator. 60 system requirements (REQ-001 through REQ-060). 52 data items (DAT-001 through DAT-052): 22 read-only references across Contact, Account, and three reference enum value lists; 30 created/updated items across Contact (13 fields), Account (8 items), and the new Segment custom entity (9 items). Segment is a new custom entity owned by CR with two types (Dynamic and Static) per REQ-041; it will be added to the Entity Inventory (v1.3 → v1.4) and will receive a deferred Phase 2b Entity PRD alongside Marketing Campaign, Campaign Group, and Campaign Engagement. 4 open issues: ISS-001 (prospectStatus values, inherited from CR-MARKETING-ISS-003), ISS-002 (clientStatus values, inherited from CR-MARKETING-ISS-004), ISS-003 (geographic segmentation, inherited from CR-MARKETING-ISS-001), ISS-004 (hard-bounce threshold, newly surfaced, depends on marketing platform selection). Two carry-forward updates applied (04-09-26): Entity Inventory v1.3 → v1.4 (Segment added) and CR-MARKETING SDO v1.1 → v1.2 (Segment in deferred Entity PRDs list, Depends On updated). Key design decisions: silent web-inquiry creation (Option D); update-only-if-blank on email-match (Option C); four-stage import wizard; informational-not-blocking multi-contact-per-company detection; relaxed email requirement for manual entry only; manual prospectStatus transitions with no time-based auto-transitions; two first-class segment types (Dynamic and Static); four-step pre-flight sync preparation.

**Prior structural change (04-09-26):** Account precedence ladder simplified from three steps to two across the document set. The exact-company-name-match step has been removed from the ladder everywhere it appears. The new ladder is: (1) website domain match — automatic linking when the normalized website domain matches an existing Account's native website field; (2) manual or new — if no website match, the system creates a new Account with no name-based or fuzzy-match suggestions during creation. The Client Recruiter handles any resulting duplicate Accounts via routine data hygiene using the CRM's native search and list tools. Reasoning: automatically linking a Contact to the wrong company is a confidentiality and data-integrity risk that outweighs the cleanup cost of occasional duplicate Accounts — two unrelated firms can legitimately share a name, and the system cannot distinguish them without the website signal. Three documents bumped: (1) CR-MARKETING Sub-Domain Overview v1.0 → v1.1: Section 4.3 intro and ladder table restructured, Section 4.4 Rule 5 ladder phrase shortened with Mentor example clarified, Section 8 Interview Transcript editor's note appended after the original Decision callout (callout itself preserved verbatim), Depends On list refreshed to current versions (Master PRD v2.5, Entity Inventory v1.3, Contact Entity PRD v1.3, Account Entity PRD v1.3). (2) Master PRD v2.4 → v2.5: Universal Contact-Creation Rules summary Rule 5 bullet ladder phrase shortened with clarifying sentence noting the website is the only signal trusted for automatic linking. (3) Account Entity PRD v1.2 → v1.3: Section 7 Implementation Notes ladder narrative replaced; ACT-DEC-011 decision record rewritten to describe the two-step ladder explicitly; both reference upstream CR-MARKETING Sub-Domain Overview v1.1.

**Prior structural change (04-08-26):** CR-MARKETING Sub-Domain Overview v1.0
complete plus all six carry-forward updates applied. (1) Sub-Domain Overview
establishes the prospect contact lifecycle model (prospects ARE Contact records;
two-field lifecycle: Contact.prospectStatus for marketing-funnel state and
Account.clientStatus for client-relationship state); the Universal Contact-
Creation Rules (5 rules applying CRM-wide to every Contact-creation pathway);
marketing platform integration (strict one-way CRM → platform sync with three
narrow exceptions: opt-outs, per-recipient engagement history, Campaign
aggregate metrics); SMS in scope as a delivery channel alongside email, with
per-channel opt-out flags (emailOptOut, smsOptOut); Campaign tracking model
(Campaign = single send, optional Campaign Group for coordinated efforts,
Pattern D hybrid origination where CRM owns metadata and planning while
marketing platform owns content); 10-value howDidYouHearAboutCbm enum finalized
with sub-domain rollup mapping for channel effectiveness reporting; layered
authority policy for source attribution writes. (2) Master PRD v2.3 → v2.4:
Section 5.4 added referencing the Universal Contact-Creation Rules as a
CRM-wide principle. (3) Contact Entity PRD v1.2 → v1.3: Section 3.5 Marketing
and Source Attribution Fields added with 8 new fields (prospectStatus,
sourceAttributionDetails, emailOptOut, smsOptOut, lastMarketingEngagement,
totalCampaignsSent, totalOpens, totalClicks); howDidYouHearAboutCbm enum
finalized as 10 values; CON-ISS-001 (client lifecycle field) and CON-ISS-008
(howDidYouHearAboutCbm values) closed; 5 new decisions CON-DEC-010 through
CON-DEC-014. (4) Account Entity PRD v1.1 → v1.2: clientStatus field added to
Section 3.2 Client-Specific Fields with TBD value list pending CBM leadership;
native website field documented as primary matching signal in Section 7
Implementation Notes; ACT-ISS-001 closed; ACT-ISS-004 marked as superseded in
scope by CR-MARKETING-ISS-001; 3 new decisions ACT-DEC-009 through ACT-DEC-011.
(5) MN-INTAKE v2.2 → v2.3: four new requirements REQ-010 through REQ-013
specify the prospect-to-applicant handoff (prospect Contact lookup by email,
Account.clientStatus transition, Contact.prospectStatus transition, layered
authority policy for howDidYouHearAboutCbm writes); MN-INTAKE-ISS-002 closed;
Section 10 Updates to Prior Documents gains carry-forward subsection. (6) CR
Domain Overview v1.0 → v1.1: Depends On list updated to reference new upstream
versions; Section 4.7 Open Issues Carried Forward updated with CON-ISS-001,
CON-ISS-008, ACT-ISS-001 closures and ACT-ISS-004 supersession note; Section 5
Updates to Prior Documents expanded with 5 new carry-forward entries. (7)
Entity Inventory v1.2 → v1.3: 3 new entities added (Marketing Campaign,
Campaign Group, Campaign Engagement — all custom Base, CR-owned); Section 4
Custom Entity Summary gains sub-sections 4.9, 4.10, 4.11; Section 5 Cross-
Domain Entity Matrix gains 3 new rows; entity counts updated from 13 (2
native, 8 custom, 3 TBD) to 16 (2 native, 11 custom, 3 TBD); EI-ISS-004 and
EI-ISS-007 closed. 4 new open issues created by the Sub-Domain Overview:
CR-MARKETING-ISS-001 (geographic targeting model, deferred to stakeholder
input); CR-MARKETING-ISS-002 (media and PR tracking model, deferred to
stakeholder input); CR-MARKETING-ISS-003 (prospectStatus value list, TBD
CBM leadership); CR-MARKETING-ISS-004 (clientStatus value list, TBD CBM
leadership). Session prompts committed for both CR-MARKETING process
definitions.

**Prior structural change (04-07-26):** Four pending document updates from CR-PARTNER
work all completed. (1) CR-PARTNER Sub-Domain Overview v1.0 → v1.1: analytics metric
list expanded from 7 to 8 categories adding mentor count (total + new) in Sections 3.3,
4.5, 4.6; transcript Decision callout retains v1.0 wording with editor note flagging
the v1.1 supersession. (2) Account Entity PRD v1.0 → v1.1: partnerStatus description
softened from "should always be accompanied by a note" to "may be accompanied by a
note at the Partner Coordinator's discretion" per CR-PARTNER-MANAGE-REQ-013;
funderStatus has no parallel language and required no change. (3) Contact Entity
PRD v1.1 → v1.2: CON-ISS-002 closed in three locations (Section 3.x Partner contact
type, Section 5.5 Partner dynamic logic note, Section 9 Open Issues table marked
CLOSED in place); partner lifecycle is tracked at Account level via partnerStatus,
no Partner-specific lifecycle field needed on Contact; hedge retained for non-
lifecycle Partner fields that may emerge during remaining CR domain process work.
(4) Engagement Entity PRD v1.0 → v1.1: referringPartner link field added in new
Section 3.7 Referral Attribution functional group; Contributing Domains expanded to
include CR; entity overview prose softened from "single-domain custom entity owned
exclusively by Mentoring (MN)" to "primarily owned"; Section 4 relationships table
gains Referring Partner → Engagement row; Section 6 Layout Guidance gains Referral
Attribution Panel; Section 7 Implementation Note 9 documents the dual write path
(mentor primary, Partner Coordinator exception). Engagement entity now has 20 custom
fields across 7 functional groups (was 19 across 6).

**Prior structural change (04-07-26):** CR-PARTNER-MANAGE process document v1.0
complete. 18 system requirements (REQ-001 through REQ-018). 49 data items across
7 entities: Engagement (8 fields including referringPartner read), Session (4
fields), Contact (4 fields for mentor affiliation reads + 7 fields for partner
contact creates/updates), Event (TBD pending CR-EVENTS), Marketing (TBD pending
CR-MARKETING), Partnership Agreement (6 fields read + 6 fields for renewals),
Account (3 read + 8 update fields including PDF report attachment). Partner
Coordinator is sole operator; three supporting personas (Content and Event
Administrator, Client Recruiter, Mentor Recruiter) coordinate externally only,
not listed as participating personas. Process structured as 10 ongoing activity
areas (4.1–4.10), not a sequential workflow — no fixed cadence, all timing
exercised by Partner Coordinator judgment. All status transitions purely
judgment-based (no system rules, no stale-partner notifications). Notes on
status changes at Partner Coordinator discretion (REQ-013 negative requirement).
Quarterly analytics report production is hybrid (system aggregations + manual
PDF composition); attached to partner Account on delivery. Renewal notifications
email-only at 60 and 30 days before Expiration / Renewal Date. Inactive →
Active direct reactivation supported alongside Inactive → Prospect (latter
owned by CR-PARTNER-PROSPECT). 3 new open issues: ISS-001 NPS scores depend
on Survey Service / ENG-ISS-004; ISS-002 impact metrics depend on ENG-ISS-003;
ISS-003 marketing entity structure pending CR-MARKETING. 2 new updates to
prior documents: CR-PARTNER Sub-Domain Overview metric list expansion to
8 categories adding mentor count (total + new); Account Entity PRD partnerStatus
description softening to make notes-on-transitions explicitly discretionary.

**Prior structural change (04-06-26):** CR-PARTNER-PROSPECT process document v1.0
complete. 9 system requirements (REQ-001 through REQ-009). 23 data items across 3
entities: Account (11 fields), Contact (6 fields), Partnership Agreement (6 fields).
Partner Coordinator is sole operator. No open issues. No new updates to prior
documents. Workflow: 9 steps from prospect identification through activation. Three
end states: Active (normal), Inactive (not pursued), Waiting (remain Prospect).
All Account Partner fields matched Entity PRD exactly. Partnership Agreement fields
matched Sub-Domain Overview anticipated fields.

### CR-PARTNER Process Documents (Phase 5)

| Document | File | Version |
|---|---|---|
| Partner Prospecting and Activation | `PRDs/CR/PARTNER/CR-PARTNER-PROSPECT.docx` | v1.0 |
| Partner Relationship Management | `PRDs/CR/PARTNER/CR-PARTNER-MANAGE.docx` | v1.0 |

**Remaining CR-PARTNER work:** None. Both processes complete. Sub-domain
process definition is finished. Sub-Domain PRD reconciliation deferred until
all CR sub-domains complete process definition.

**Remaining MN work:** Client Satisfaction Tracking (MN-SURVEY) process
document, workflow diagrams for all processes.

### Mentor Recruitment Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Mentor Recruitment | `PRDs/MR/MR-RECRUIT.docx` | v1.0 |
| Mentor Application | `PRDs/MR/MR-APPLY.docx` | v1.1 |
| Mentor Onboarding | `PRDs/MR/MR-ONBOARD.docx` | v1.0 |
| Mentor Management | `PRDs/MR/MR-MANAGE.docx` | v1.0 |
| Mentor Departure | `PRDs/MR/MR-DEPART.docx` | v1.0 |

**Remaining MR work:** None. All MR domain deliverables complete.

### Entity Inventory (Phase 2a)

| Document | File | Version |
|---|---|---|
| Entity Inventory | `PRDs/CBM-Entity-Inventory.docx` | v1.5 |

Maps 28 business entity concepts to 17 CRM entities (2 native, 12 custom, 3 TBD).
Key design decisions: Contact uses multiEnum contactType (Client, Mentor,
Partner, Administrator, Presenter, Donor, Member); Account uses multiEnum
accountType (Client, Partner, Donor/Sponsor); Contribution consolidates
Donation, Sponsorship, Grant, and Pledge with an enum contributionType
discriminator; Dues is a single-domain Custom Base entity for MR. Prospect
is tracked as a lifecycle state on Contact (not as a contactType value) —
client prospects use Contact.prospectStatus (added v1.3 by CR-MARKETING
SDO), mentor prospects use the existing mentorStatus. CR-MARKETING SDO v1.0
added three new custom entities owned by CR: Marketing Campaign, Campaign
Group, and Campaign Engagement (all Custom Base, deferred to Phase 2b
Entity PRDs). 8 open issues documented (6 currently open; EI-ISS-004 and
EI-ISS-007 closed by CR-MARKETING SDO).

### Entity PRDs (Phase 2b)

| Document | File | Version |
|---|---|---|
| Contact Entity PRD | `PRDs/entities/Contact-Entity-PRD.docx` | v1.7 |
| Account Entity PRD | `PRDs/entities/Account-Entity-PRD.docx` | v1.8 |
| Engagement Entity PRD | `PRDs/entities/Engagement-Entity-PRD.docx` | v1.2 |
| Session Entity PRD | `PRDs/entities/Session-Entity-PRD.docx` | v1.1 |
| Dues Entity PRD | `PRDs/entities/Dues-Entity-PRD.docx` | v1.1 |
| Event Entity PRD | `PRDs/entities/Event-Entity-PRD.docx` | v1.0 |
| Event Registration Entity PRD | `PRDs/entities/EventRegistration-Entity-PRD.docx` | v1.0 |
| Partnership Agreement Entity PRD | `PRDs/entities/PartnershipAgreement-Entity-PRD.docx` | v1.0 |
| Segment Entity PRD | `PRDs/entities/Segment-Entity-PRD.docx` | v1.0 |
| Campaign Group Entity PRD | `PRDs/entities/CampaignGroup-Entity-PRD.docx` | v1.0 |
| Marketing Campaign Entity PRD | `PRDs/entities/MarketingCampaign-Entity-PRD.docx` | v1.0 |
| Campaign Engagement Entity PRD | `PRDs/entities/CampaignEngagement-Entity-PRD.docx` | v1.0 |
| Contribution Entity PRD | `PRDs/entities/Contribution-Entity-PRD.docx` | v1.0 |
| Fundraising Campaign Entity PRD | `PRDs/entities/Fundraising-Campaign-Entity-PRD.docx` | v1.0 |

Contact is the most complex entity — native Person type, spans all four
domains, 7 contactType values (multiEnum). 16 native fields documented,
47 custom fields (6 shared, 1 CBM internal, 32 Mentor-specific, 8
Marketing and Source Attribution fields added by CR-MARKETING SDO v1.0).
10 relationships. Dynamic logic visibility rules by contactType. 6 open
issues (2 donor/FU lifecycle deferrals, 3 TBD value lists, 1 incomplete
domain coverage) — CON-ISS-001 closed by prospectStatus; CON-ISS-008
closed by the 10-value howDidYouHearAboutCbm enum finalization. Key
decisions: Primary Contact moved to Account-Contact relationship;
personalEmail/cbmEmailAddress as separate custom fields;
termsAndConditionsAccepted shared for portal readiness; boardPosition
visible for CBM internal types only; prospectStatus tracks marketing-
funnel state on Contact paired with Account.clientStatus; per-channel
opt-out flags (emailOptOut, smsOptOut); marketing engagement roll-up
fields workflow-updated from Campaign Engagement records.

Account is the second cross-domain shared entity — native Company type,
spans MN, CR, FU domains, 3 accountType values (multiEnum). 19 native
fields documented, 22 custom fields (3 shared, 6 Client-specific
including clientStatus added by CR-MARKETING SDO v1.0, 9 Partner-
specific, 4 Donor/Sponsor-specific). 8 relationships including
Primary Contact bool on Contact-Account middle table. 3 open issues
(incomplete domain coverage, NAICS subsector values TBD, geographic
service area format TBD — the latter superseded in scope by
CR-MARKETING-ISS-001). ACT-ISS-001 closed by the clientStatus field.
Key decisions: assignedLiaison as separate Contact link;
parentOrganization shared across all types; type-specific wysiwyg
notes fields with role-based security; primaryFunderContact dropped
in favor of relationship-level Primary Contact; clientStatus tracks
client-relationship state at the Account level (paired with
Contact.prospectStatus for marketing-funnel state); native website
field is the primary signal for prospect-Contact-to-Account matching
under the Universal Contact-Creation Rules.

Engagement is primarily a Mentoring (MN) domain entity — Custom Base
type — with one field contributed by Client Recruiting (CR). 2 native
fields (name auto-generated, description hidden), 20 custom fields
across 7 functional groups (lifecycle, mentoring context, notes, session
roll-up analytics, closure, outcomes, referral attribution). 7
relationships (4 to Contact, 1 to Account for client organization, 1
to Session, 1 to Account for referring partner). Status-driven dynamic
logic (no discriminator). 4 open issues (Mentoring Focus Areas values
TBD, Close Reason values TBD, additional outcome metrics TBD, survey
response tracking deferred). Key decisions: name auto-generated as
{Client}-{Mentor}-{Year}; session roll-ups are workflow-updated stored
fields; no Client Satisfaction Rating; On-Hold is a status value.
referringPartner field (added v1.1) records partner referral
attribution for partner-level analytics; primary write path is the
assigned mentor after the first session, with an exception write path
for the Partner Coordinator (correction, missed attribution).

Session is a single-domain custom entity — Custom Event type, owned
exclusively by the Mentoring (MN) domain. 10 native fields (name
auto-generated as {Engagement Name} — {Session Date}, dateStart,
dateEnd calculated, duration, status with 7 custom values, parent
link to Engagement, description, createdAt, modifiedAt, assignedUser).
8 custom fields across 3 functional groups (session details, notes
and follow-up, rescheduling). 4 relationships (Engagement via native
parent, 2 manyToMany to Contact for attendees, self-referential
rescheduling link). Value-based dynamic logic (no discriminator). 1
open issue (Topics Covered values TBD). Key decisions: native Event
fields used for dateStart/duration/status; dateEnd calculated;
session summary includes notes when populated with no toggle; two
separate attendee relationships; native parent for Engagement link.

Dues is a single-domain custom entity — Custom Base type, owned
exclusively by the Mentor Recruitment (MR) domain. 4 native fields
(name auto-generated as {Mentor Name} — {Billing Year}, createdAt,
modifiedAt, assignedUser). 7 custom fields across 3 functional
groups (billing, payment, notes). 1 relationship (Contact via
manyToOne). Value-based dynamic logic (paymentStatus drives
paymentDate and paymentMethod visibility). No open issues — all 5
carrying-forward issues from MR-MANAGE resolved. Key decisions:
Custom Base type; anniversary-based billing cycle with
duesRenewalDate on Contact; uniform dues amount; 30-day grace
period; no consequences for non-payment; all Active mentors pay;
paymentMethod "Waived" removed (dynamic logic hides instead).

Event is a single-domain custom entity — Custom Event type, owned
exclusively by the Client Recruiting (CR) domain within the CR-EVENTS
sub-domain. 10 native fields (name, dateStart, dateEnd directly entered,
duration unused, status with 6 custom values, parent unused, description,
createdAt, modifiedAt, assignedUser). 10 custom fields across 4 functional
groups (classification, venue and access, linked records, attachments). 3
relationships (Event Registration oneToMany, Presenters manyToMany to
Contact, Co-Sponsoring Partners manyToMany to Account). Format-driven
dynamic logic (location, virtualMeetingUrl, recordingUrl visibility).
2 open issues (virtual import tooling deferred, display label naming
conflict). Key decisions: all manual status transitions; lightweight Draft
gating; format-specific dynamic logic; presenter contactType write-through
on first link; venueCapacity informational only; self-cancellation removed.

Event Registration is a single-domain custom entity — Custom Base type,
owned exclusively by CR within the CR-EVENTS sub-domain. Junction record
linking Contact to Event. 4 native fields, 12 custom fields across 4
functional groups (core registration, registrant details, communication
tracking, cancellation). 2 relationships (manyToOne to Event, manyToOne
to Contact). No dynamic logic visibility rules. 1 open issue
(CR-MARKETING-ISS-004 hard-bounce threshold carried forward). Key
decisions: four-value attendanceStatus; two creation pathways (Online
and Walk-In) with different defaults; communication idempotency via
three tracking fields; cancellation fields always visible.

Partnership Agreement is a single-domain custom entity — Custom Base
type, owned exclusively by CR within the CR-PARTNER sub-domain. 4 native
fields, 6 custom fields in a single functional group. 1 relationship
(manyToOne to Account). No dynamic logic. No open issues. Key decisions:
append-only renewal pattern; agreementDocument restricted to Partner
Coordinator and Executive Member; renewal notifications at 60-day and
30-day intervals; no status lifecycle (temporal validity from dates).

Segment is a single-domain custom entity — Custom Base type, owned
exclusively by CR within the CR-MARKETING sub-domain. 4 native fields,
5 custom fields. segmentType discriminator (Dynamic, Static) drives
conditional field requirements. 3 relationships (manyToMany to Contact
for Static members, manyToOne to User for owner, oneToMany reverse from
Campaign.targetSegment). No open issues. Key decisions: segmentType
immutable after creation; filterCriteria storage format deferred to
implementation; owner is a custom link to User, not native assignedUser.

Campaign Group is a single-domain custom entity — Custom Base type,
owned exclusively by CR within the CR-MARKETING sub-domain. 4 native
fields, 4 custom fields. 1 relationship (oneToMany to Marketing
Campaign). No dynamic logic. No open issues. Key decisions: no
independent status (derived from child Campaigns); optional entity
(standalone Campaigns do not require a group link); aggregate metrics
computed at report time, not stored.

Marketing Campaign is a custom entity — Custom Base type, owned by CR,
shared between CR-MARKETING and CR-REACTIVATE sub-domains. 4 native
fields, 17 custom fields across 4 functional groups (identity, planning
and scheduling, status and organization, aggregate metrics). 3
relationships (manyToOne to Segment, manyToOne to Campaign Group,
oneToMany to Campaign Engagement). Channel-driven dynamic logic for
Reactivation-specific fields (population, sendDate). No open issues.
Key decisions: unified five-value status lifecycle for all channels
(CR-RECON-DEC-001); three-value channel enum; population field for
Reactivation only; dual-mode operation; six aggregate metric fields
workflow-updated from Campaign Engagement.

Campaign Engagement is a custom entity — Custom Base type, owned by CR,
shared between CR-MARKETING and CR-REACTIVATE sub-domains. 4 native
fields, 12 custom fields across 2 functional groups (core links,
engagement event fields). 2 relationships (manyToOne to Marketing
Campaign, manyToOne to Contact). No dynamic logic. No open issues. Key
decisions: unified five-event-type field set for all channels
(CR-RECON-DEC-002); first occurrence only for each event type; unmatched
emails do not create new Contacts; updates both Campaign aggregate
metrics and Contact marketing roll-up fields via workflow.

Contribution is a single-domain custom entity — Custom Base type, owned
exclusively by the Fundraising (FU) domain. 4 native fields (name
auto-generated as "{Donor Display Name} — {ContributionType} —
{KeyDate}" with status-driven KeyDate selection, plus createdAt,
modifiedAt, assignedUser). 18 custom fields across 3 groups: 14 shared
fields (contributionType, status, donorContact, donorAccount, amount,
commitmentDate, expectedPaymentDate, receivedDate, applicationDate,
designation, campaign, acknowledgmentSent, acknowledgmentDate, notes), 3
Donation-specific fields (giftType, inKindDescription,
inKindValuationBasis), and 1 Grant-specific field (nextGrantDeadline). 3
manyToOne relationships (donorContact, donorAccount, campaign).
contributionType discriminator with 3 values (Donation, Sponsorship,
Grant) drives 5 dynamic-logic rules (CONTR-DYN-001 through
CONTR-DYN-005). 1 open issue (CONTR-ISS-001 — FU-REPORT giftType enum
divergence). Key decisions: contributionType three-value enum supersedes
Entity Inventory four-value list (Pledged is a status not a type);
in-kind handling via giftType = In-Kind on Donations only with no
separate In-Kind contributionType value; hybrid acknowledgment ownership
between FU-RECORD (primary at creation) and FU-STEWARD (catch-up during
sweep) resolves EI-ISS-001; auto-generated name field; mutual
exclusivity of donorContact and donorAccount enforced as save-time
invariant; multi-payment Grants tracked as a single record with
intermediate detail in notes. Three rollup fields driven by Contribution
data live on other entities: Contact.donorLifetimeGiving,
Account.funderLifetimeGiving, Fundraising Campaign.totalRaised — all
scoped to Received-status Contributions only. Record-level visibility
restricted to Donor/Sponsor Coordinator, Executive Member, System
Administrator.

Fundraising Campaign is a single-domain custom entity — Custom Base
type, owned exclusively by the Fundraising (FU) domain. 4 native fields
(name maps to campaignName per Marketing Campaign Entity PRD precedent,
plus createdAt, modifiedAt, assignedUser). 9 custom fields in a single
group with no sub-grouping (campaignName, campaignType, status,
goalAmount, startDate, endDate, totalRaised, description,
geographicServiceArea). 1 oneToMany relationship to Contribution
(inverse side of Contribution.campaign). No discriminator — campaignType
is a property field that does not drive field visibility per FC-DEC-002.
No dynamic-logic rules. 1 open issue (FC-ISS-001 — Northeast Ohio zip
code master list deferred to Phase 9 implementation). Key decisions:
no-discriminator design with all nine fields visible on every record;
native name field maps to campaignName with implementation choice
deferred to Phase 9; status lifecycle has four values (Planned, Active,
Completed, Cancelled) with free-form transitions per FU-RECORD-REQ-008;
totalRaised calculation is solely on Contribution.status not
Campaign.status, so Received Contributions linked to Cancelled or
Completed Campaigns continue to count toward historical totals; linkage
to Contribution unrestricted by Campaign status;
geographicServiceArea uses the same field structure as
Account.geographicServiceArea with both fields independently maintained
by the Coordinator. Audit trail scoped narrowly to status and goalAmount
only — narrower than Contribution's eight-field audit scope.
Record-level visibility restricted to Donor/Sponsor Coordinator,
Executive Member, System Administrator. Notes Service stream-only with
no in-record narrative-notes field (unlike Contribution's hybrid
treatment).

**Next Entity PRDs:** All Phase 5 Entity PRDs across all four domains
(MN, MR, CR, FU) are now complete. The two FU-owned Entity PRDs —
Contribution v1.0 and Fundraising Campaign v1.0 — were both committed
04-30-26. Phase 7 FU Domain Reconciliation is now eligible.

### Mentoring Domain PRD (Phase 5)

| Document | File | Version |
|---|---|---|
| Mentoring Domain PRD | `PRDs/MN/CBM-Domain-PRD-Mentoring.docx` | v1.0 |

### Mentor Recruitment Domain PRD (Phase 5)

| Document | File | Version |
|---|---|---|
| Mentor Recruitment Domain PRD | `PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx` | v1.1 |

Reconciled from 5 process documents. 2 reconciliation decisions
(Resigned reactivation, 7-value applicationDeclineReason). 31 total
decisions, 13 open issues. ~45 Contact fields, 8 Dues fields, 3
referenced entities from other domains. SME Request entity excluded.

### Cross-Domain Services (Phase 4)

| Document | File | Version |
|---|---|---|
| Notes Service | `PRDs/services/NOTES/NOTES-MANAGE.docx` | v1.0 |

Notes Service defines a general-purpose note stream for all domains.
7 requirements, 6 supported entity types (Contact, Account, Engagement,
Session, Event, Fundraising Campaign). Notes are timestamped, attributed,
editable with edit history, and permanent (no deletion). Access follows
parent record — no per-note visibility restrictions. Internal
administrator notes remain as dedicated fields in domain process
documents. MN-ENGAGE Session Notes and Engagement Notes remain as inline
wysiwyg fields unchanged. Closes MR-MANAGE-ISS-003.

**Remaining services:** Email Service, Calendar Service, Survey Service.

### Client Recruiting Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR Domain Overview | `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx` | v1.3 |

Defines 7 processes across 4 sub-domains: CR-PARTNER (CR-PARTNER-PROSPECT,
CR-PARTNER-MANAGE), CR-MARKETING (CR-MARKETING-CONTACTS,
CR-MARKETING-CAMPAIGNS), CR-EVENTS (CR-EVENTS-MANAGE, CR-EVENTS-CONVERT),
CR-REACTIVATE (CR-REACTIVATE-OUTREACH). 7 personas including MST-PER-013
(Client) — added to Master PRD v2.3 CR persona list.
Production order: CR-PARTNER first (Core tier), then CR-MARKETING, then
CR-EVENTS, then CR-REACTIVATE last (receives from all other sub-domains).
Cross-sub-domain handoffs mapped. Shared audience strategy defined (channel
effectiveness comparison, outreach coordination, gap targeting). No new
open issues — all relevant issues carried forward from upstream documents
(CON-ISS-001, CON-ISS-002, CON-ISS-004, CON-ISS-008, ACT-ISS-001,
ACT-ISS-002, ACT-ISS-004).

Session prompts committed for all 4 Sub-Domain Overview sessions:
- `PRDs/CR/PARTNER/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-PARTNER.md`
- `PRDs/CR/MARKETING/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-MARKETING.md`
- `PRDs/CR/EVENTS/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-EVENTS.md`
- `PRDs/CR/REACTIVATE/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-REACTIVATE.md`

### CR-PARTNER Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR-PARTNER Sub-Domain Overview | `PRDs/CR/PARTNER/CBM-SubDomain-Overview-Partner.docx` | v1.1 |

Scopes the CR-PARTNER sub-domain for process definition. 2 processes
(CR-PARTNER-PROSPECT, CR-PARTNER-MANAGE) in dependency order. 4 personas
with process participation mapped. 10 Account Partner-specific fields
validated (no changes). No Partner-specific Contact fields needed —
CON-ISS-002 resolved (partner lifecycle tracked at Account level).
Partnership Agreement anticipated fields confirmed (6 fields). New
referringPartner link field identified for Engagement entity (set by
mentor after first session, basis for partner analytics). Quarterly
formal partner analytics reports with 8 metrics (per v1.1 update):
referral count, active clients, new clients in last 30 days, total
sessions, total hours, NPS scores, impact metrics, and mentor count
(total affiliated and new this period). Two referral tracking
mechanisms: client self-reported howDidYouHearAboutCbm on Contact,
mentor-set referringPartner on Engagement.

Updates applied (v1.1, 04-07-26): mentor count metric added per
CR-PARTNER-MANAGE session. Carry-forward updates also complete:
Contact Entity PRD CON-ISS-002 closed (v1.2); Engagement Entity PRD
referringPartner field added (v1.1).

Session prompts committed for both CR-PARTNER process definitions:
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-PROSPECT.md`
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-MANAGE.md`

### CR-MARKETING Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR-MARKETING Sub-Domain Overview | `PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx` | v1.3 |

Scopes the CR-MARKETING sub-domain for process definition. 2 processes
(CR-MARKETING-CONTACTS, CR-MARKETING-CAMPAIGNS) in dependency order.
3 personas (Client Recruiter primary; Partner Coordinator supporting;
Client as audience). Major architectural decisions locked:

- **Prospect contact lifecycle model.** Prospects ARE Contact records
  in the CRM. Two-field model: Contact.prospectStatus tracks the
  marketing-funnel state of an individual person; Account.clientStatus
  tracks the client-relationship state of a company. The two fields
  answer different questions and cannot drift. Handoff at MN-INTAKE:
  when a prospect applies, Account.clientStatus moves Prospect →
  Applicant and Contact.prospectStatus moves to Converted.
- **Universal Contact-Creation Rules.** Five rules apply CRM-wide
  to every Contact-creation pathway across all domains. Optional
  company fields on every form; hardcoded contactType per form;
  CSV import contactType assignment; type-specific creation logic;
  contactType-agnostic Account matching via website → manual/new
  precedence ladder (exact-name-match step removed in 04-09-26 scope
  change; see latest structural change entry above).
- **Marketing platform integration.** Strict one-way CRM → marketing
  platform sync with three narrow exceptions: opt-out signals, per-
  recipient engagement history, and Campaign aggregate metrics. SMS
  is in scope as a delivery channel (brings TCPA compliance alongside
  CAN-SPAM). Per-channel opt-out flags (emailOptOut, smsOptOut).
  Hybrid sync triggers: scheduled + manual on-demand outbound,
  near-real-time inbound for opt-outs.
- **Campaign tracking model.** A Campaign is a single outbound send;
  optional Campaign Group entity supports coordinated multi-touch
  efforts. Hybrid Pattern D origination: CRM owns metadata and
  planning; marketing platform owns content. Per-Contact-per-Campaign
  Campaign Engagement records + aggregate roll-up fields on Contact.
- **Application source attribution.** 10-value howDidYouHearAboutCbm
  enum finalized (closes CON-ISS-008), mapped to CR sub-domains for
  channel effectiveness rollup. Two-field design: structured enum
  for reporting plus free-text sourceAttributionDetails for
  supplementary detail. Layered authority policy for writes.

4 deferred Phase 2b Entity PRDs: Marketing Campaign, Campaign Group,
Campaign Engagement (all surfaced by SDO v1.0), and Segment (surfaced
by CR-MARKETING-CONTACTS v1.0). All custom Base, owned by CR. Session
prompts committed for both process definitions at
`PRDs/CR/MARKETING/SESSION-PROMPT-CR-MARKETING-CONTACTS.md`
and `PRDs/CR/MARKETING/SESSION-PROMPT-CR-MARKETING-CAMPAIGNS.md`.

4 new open issues: CR-MARKETING-ISS-001 (geographic targeting model,
stakeholder input needed); CR-MARKETING-ISS-002 (media and PR tracking
model, stakeholder input needed); CR-MARKETING-ISS-003 (prospectStatus
value list, CBM leadership input needed); CR-MARKETING-ISS-004
(clientStatus value list, CBM leadership input needed). ACT-ISS-004
(geographic service area format) superseded in scope by
CR-MARKETING-ISS-001.

All six carry-forward updates to upstream documents are complete:
Master PRD v2.4 (Section 5.4 Universal Contact-Creation Rules);
Contact Entity PRD v1.3 (Section 3.5 Marketing and Source Attribution
Fields, finalized howDidYouHearAboutCbm enum, closes CON-ISS-001 and
CON-ISS-008); Account Entity PRD v1.2 (clientStatus field, website
implementation note, closes ACT-ISS-001); MN-INTAKE v2.3 (four new
requirements REQ-010 through REQ-013 for prospect-to-applicant
handoff, closes MN-INTAKE-ISS-002); CR Domain Overview v1.1 (open
issues table updates and carry-forward tracking); Entity Inventory
v1.3 (three new CR-MARKETING entities added, closes EI-ISS-004 and
EI-ISS-007).

### CR-MARKETING Process Documents (Phase 5)

| Document | File | Version |
|---|---|---|
| Marketing Contact Management | `PRDs/CR/MARKETING/CR-MARKETING-CONTACTS.docx` | v1.0 |
| Campaign Execution and Tracking | `PRDs/CR/MARKETING/CR-MARKETING-CAMPAIGNS.docx` | v1.0 |

CR-MARKETING-CONTACTS v1.0 complete. 60 system requirements, 52 data
items across Contact, Account, and Segment entities. Continuous
activity-area structure with nine activity areas. Client Recruiter
sole operator. Segment entity introduced as a new custom entity
(Dynamic and Static types per REQ-041). Carry-forward updates applied
(04-09-26): Entity Inventory v1.4 (Segment added) and CR-MARKETING
SDO v1.2 (Segment in deferred Entity PRDs list, Depends On updated).

CR-MARKETING-CAMPAIGNS v1.0 complete. 21 system requirements, 59 data
items across Campaign, Campaign Group, Campaign Engagement, Contact,
Account, and Segment entities. Three new custom entities fully specified:
Campaign (15 fields), Campaign Group (4 fields), Campaign Engagement
(12 fields). Five-value Campaign status lifecycle with dual-mode
operation. No new open issues. No updates to prior documents.

**Remaining CR-MARKETING work:** None. Both processes complete. Sub-domain
process definition is finished. Sub-Domain PRD reconciliation deferred
until all CR sub-domains complete process definition.

### CR-EVENTS Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| Sub-Domain Overview | `PRDs/CR/EVENTS/CBM-SubDomain-Overview-Events.docx` | v1.0 |

### CR-EVENTS Process Documents (Phase 5)

| Document | File | Version |
|---|---|---|
| Event Lifecycle Management | `PRDs/CR/EVENTS/CR-EVENTS-MANAGE.docx` | v1.0 |
| Post-Event Follow-Up and Conversion | `PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx` | v1.0 |

**Remaining CR-EVENTS work:** None. Both processes complete. Sub-domain
process definition is finished. Sub-Domain PRD reconciliation deferred
until all CR sub-domains complete process definition.

### CR-REACTIVATE Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| Sub-Domain Overview | `PRDs/CR/REACTIVATE/CBM-SubDomain-Overview-Reactivate.docx` | v1.0 |

**Remaining CR-REACTIVATE work:** Complete. CR-REACTIVATE-OUTREACH v1.0 committed.
All CR sub-domains have completed Phase 4 process definition. CR Domain
Reconciliation (Phase 5) is complete.

### Client Recruiting Domain PRD (Phase 5)

| Document | File | Version |
|---|---|---|
| Client Recruiting Domain PRD | `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx` | v1.1 |

Reconciled from 7 process documents across 4 sub-domains. 3 reconciliation
decisions (CR-RECON-DEC-001 through 003). 21 total decisions (20 original plus
CR-DEC-024 added in v1.1), 17 open issues. 9 entities in Data Reference.
257 system requirements compiled. v1.1 adopts the 8-value howDidYouHearAboutCbm
list and measures reactivation attribution through Campaign.channel =
Reactivation per MR-Y9-EXC-005.

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.docx` | Word, v2.5 |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — superseded by Word version at PRDs/MN/CBM-Domain-PRD-Mentoring.docx |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — superseded by Word version at PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — legacy source material, superseded by Word version at PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Steps

- Phase 7 Domain Reconciliation producing the FU Domain PRD (newly eligible — both FU-owned Entity PRDs now complete)
- Phase 8 Stakeholder Review for the CR Domain PRD v1.2
- Phase 8 Stakeholder Review for the FU Domain PRD (after Phase 7 completes)
- Stakeholder input needed to resolve CR-MARKETING-ISS-001 (geographic targeting model) and CR-MARKETING-ISS-002 (media and PR tracking model) before those aspects of CR-MARKETING-CONTACTS and CR-MARKETING-CAMPAIGNS can be fully specified
- CBM leadership input needed for CR-MARKETING-ISS-003 (prospectStatus value list) and CR-MARKETING-ISS-004 (clientStatus value list)
- Carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 to align giftType enum values with FU-RECORD v1.2 (CONTR-ISS-001)
- Northeast Ohio zip code master list to be defined during Phase 9 YAML generation (FC-ISS-001, FU-REPORT-ISS-001)
- Remaining Cross-Domain Services (Phase 4): Email Service, Calendar Service, Survey Service
- Define Client Satisfaction Tracking (MN-SURVEY) process document
- Create workflow diagrams for all MN and MR processes

---

## Key Business Domains

| Code | Domain |
|---|---|
| MN | Mentoring |
| MR | Mentor Recruitment |
| CR | Client Recruiting |
| CR-PARTNER | Client Recruiting — Partner Relationship Management (sub-domain) |
| CR-MARKETING | Client Recruiting — Outreach and Marketing (sub-domain) |
| CR-EVENTS | Client Recruiting — Workshops and Event Management (sub-domain) |
| CR-REACTIVATE | Client Recruiting — Client Reactivation and Recovery (sub-domain) |
| FU | Fundraising |

---

## Target Repository Structure (new process)

```
PRDs/
├── CBM-Master-PRD.docx            ← Master PRD (Word)
├── CBM-Entity-Inventory.docx      ← Entity Inventory (Phase 2a)
├── entities/                      ← Entity PRDs (Phase 2b, one per CRM entity)
│   └── ...
├── MN/
│   ├── MN-INTAKE.docx             ← Process document
│   ├── MN-MATCH.docx
│   ├── MN-ENGAGE.docx
│   ├── MN-INACTIVE.docx
│   ├── MN-CLOSE.docx
│   ├── MN-SURVEY.docx
│   └── CBM-Domain-PRD-Mentoring.docx  ← Reconciled Domain PRD
├── MR/
│   └── ...
├── CR/
│   ├── CBM-Domain-Overview-ClientRecruiting.docx
│   ├── CBM-Domain-PRD-ClientRecruiting.docx
│   ├── PARTNER/
│   │   ├── CBM-SubDomain-Overview-Partner.docx
│   │   ├── CR-PARTNER-*.docx          ← Process documents
│   │   └── CBM-SubDomain-PRD-Partner.docx
│   ├── MARKETING/
│   │   ├── CBM-SubDomain-Overview-Marketing.docx
│   │   ├── CR-MARKETING-*.docx        ← Process documents
│   │   └── CBM-SubDomain-PRD-Marketing.docx
│   ├── EVENTS/
│   │   ├── CBM-SubDomain-Overview-Events.docx
│   │   ├── CR-EVENTS-*.docx           ← Process documents
│   │   └── CBM-SubDomain-PRD-Events.docx
│   └── REACTIVATE/
│       ├── CBM-SubDomain-Overview-Reactivate.docx
│       ├── CR-REACTIVATE-*.docx       ← Process documents
│       └── CBM-SubDomain-PRD-Reactivate.docx
├── FU/
│   └── ...
├── services/
│   ├── NOTES/
│   │   └── NOTES-MANAGE.docx         ← Notes Service process document
│   ├── EMAIL/                         ← Email Service (future)
│   ├── CALENDAR/                      ← Calendar Service (future)
│   └── SURVEY/                        ← Survey Service (future)
└── Archive/                       ← Legacy documents (do not use)

programs/                          ← YAML program files
Implementation Docs/               ← Verification Spec
```

---

## Personas (defined in Master PRD)

| ID | Persona |
|---|---|
| MST-PER-001 | System Administrator |
| MST-PER-002 | Executive Member |
| MST-PER-003 | Client Administrator |
| MST-PER-004 | Client Assignment Coordinator |
| MST-PER-005 | Mentor Administrator |
| MST-PER-006 | Mentor Recruiter |
| MST-PER-007 | Client Recruiter |
| MST-PER-008 | Partner Coordinator |
| MST-PER-009 | Content and Event Administrator |
| MST-PER-010 | Donor / Sponsor Coordinator |
| MST-PER-011 | Mentor |
| MST-PER-012 | Member |
| MST-PER-013 | Client |

---

## Important Rules for This Implementation

- Never mention specific product names (EspoCRM, WordPress, Moodle,
  Constant Contact, DigitalOcean, etc.) in Master PRDs, Entity PRDs,
  process documents, or Domain PRDs. These are implementation details
  only. Exception: the Entity Inventory is an implementation bridging
  document where product names are permitted.
- All documents are produced as Word (.docx) files. No Markdown
  source files under the new process.
- All legacy documents are in `PRDs/Archive/` — never reference them
  as current requirements. They are source material only.
- Update this CLAUDE.md file to reflect current implementation state
  at the end of every work session.
