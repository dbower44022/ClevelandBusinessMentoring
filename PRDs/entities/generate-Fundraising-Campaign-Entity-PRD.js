// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Fundraising Campaign Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js (Contribution generator pattern)
// Entity: Fundraising Campaign (Custom — Base Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-Fundraising-Campaign-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageBreak, TabStopType, TabStopPosition, LevelFormat,
} = require("docx");


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Fundraising Campaign
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Fundraising Campaign",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-30-26 18:00",
  sourceDocuments: "Master PRD v2.5, Entity Inventory v1.5, FU Domain Overview v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0, Contribution Entity PRD v1.0, Account Entity PRD v1.8",
  outputFile: "/home/claude/Fundraising-Campaign-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Fundraising Campaign",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Fundraising Campaign",
    labelPlural: "Fundraising Campaigns",
    activityStream: "Yes",
    contributingDomains: "Fundraising (FU) only — FU-RECORD creates and exclusively maintains; FU-REPORT is a read-only consumer; FU-STEWARD does not write to Fundraising Campaign records.",
    // No discriminator on Fundraising Campaign — campaignType is a property field, not a discriminator
  },

  overviewText: [
    "The Fundraising Campaign entity represents a named fundraising effort under which Contributions are organized for goal tracking, period reporting, and territory-based attribution. Each Fundraising Campaign record carries the Campaign's identity (name, type, description), lifecycle (status, start and end dates), goal tracking (goalAmount, system-calculated totalRaised), and optional geographic targeting (geographicServiceArea). Contributions link to a Fundraising Campaign through the optional Contribution.campaign field; the relationship is one Campaign per Contribution and one-to-many on the Campaign side.",
    "Fundraising Campaign is a custom Base entity owned exclusively by the Fundraising domain. FU-RECORD is the only process that creates Fundraising Campaign records, formalizing the nine custom fields specified here. FU-STEWARD does not write to Fundraising Campaign records — sweep-related Campaign work flows through Contribution-side updates only. FU-REPORT consumes Fundraising Campaign data read-only across the ten defined Fundraising reports plus ad-hoc reporting, with the Mentoring Service Delivery by Funding Territory report being the principal report that reads campaign-level fields directly.",
    "The Fundraising Campaign lifecycle has four status values (Planned, Active, Completed, Cancelled) with free-form transitions per FU-RECORD-REQ-008 — the Coordinator can transition between any values at any time. Campaigns may be created in advance of solicitation or retroactively after Contributions have arrived per FU-RECORD-REQ-004. The single rollup field driven by Contribution data — totalRaised — is calculated solely from Contribution.status (not from Fundraising Campaign.status), so Received Contributions linked to Cancelled or Completed Campaigns continue to contribute to the historical record.",
  ],

  overviewNotes: [
    { label: "No discriminator:", text: " Fundraising Campaign has no discriminator field. The campaignType field (Annual Fund, Program Appeal, Event, Capital Campaign, Other) is a property field that captures the Campaign's purpose for reporting and grouping, not a discriminator that drives field visibility. All nine custom fields are visible on every Fundraising Campaign record regardless of campaignType or status. This contrasts with Contribution, which uses contributionType as a discriminator driving five dynamic-logic rules. See FC-DEC-002." },
    { label: "Record-level visibility:", text: " Per FU-RECORD-REQ-022, Fundraising Campaign records are visible only to the Donor / Sponsor Coordinator, Executive Member, and System Administrator personas. All other personas (Mentors, Members, Clients, general staff) have no visibility to Fundraising Campaign records. All field-level security inherits from this record-level rule. See Implementation Note 6." },
    { label: "Audit trail:", text: " Per FU-RECORD-REQ-014, the Fundraising Campaign audit trail covers status and goalAmount only. Other Fundraising Campaign fields (campaignName, campaignType, startDate, endDate, totalRaised, description, geographicServiceArea) are not audited. The audit trail is surfaced through the platform's standard audit-stream mechanism, typically integrated with the Activity Stream. See Implementation Note 5." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on a Base entity type. These fields are not created by YAML. They are documented here so process documents and Entity PRDs can reference them correctly, and to prevent duplicate field creation during YAML generation.",
  nativeFields: [
    ["name", "varchar", "Maps to campaignName (FU-RECORD-DAT-039). Coordinator-supplied human-readable label. See Implementation Note 1.", "FU-RECORD, FU-REPORT"],
    ["createdAt", "datetime", "System — record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System — last modified timestamp", "System"],
    ["assignedUser", "link", "System — assigned CRM user. The Donor / Sponsor Coordinator who creates the record is the typical assigned user; reassignment is possible if a coverage change occurs.", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on name:", text: " The native name field on the Base entity maps to the custom campaignName field per FU-RECORD-DAT-039. The Coordinator supplies campaignName at creation; the native name field surfaces the same value. Unlike the Contribution and Dues entities (where the native name field is auto-generated from related fields under a deterministic format), Fundraising Campaign has a Coordinator-supplied human-readable label, matching the Marketing Campaign Entity PRD precedent. The implementation choice — whether campaignName is implemented as the native name field (relabeled) or as a separate custom field with a synchronization rule — is deferred to Phase 9 YAML generation. Either approach satisfies the requirement; the choice is platform-dependent. See Implementation Note 1 and FC-DEC-003." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldsIntro: "Custom fields must be created via YAML program files. The nine custom fields are listed in a single group below — there are no discriminator-driven sub-groups since Fundraising Campaign has no discriminator field per Section 1 (FC-DEC-002). All nine fields are visible on every Fundraising Campaign record.",
  customFieldGroups: [
    {
      heading: "3.1 Custom Fields",
      headingLevel: 2,
      intro: "These nine fields are visible on every Fundraising Campaign record. campaignName and status are required at creation; the other seven are optional and may be populated at creation or any time thereafter.",
      fields: [
        ["campaignName", "text", "Yes", "—", "—", "FU-RECORD-DAT-039", [
          { text: "The name of the Fundraising Campaign — a Coordinator-supplied human-readable label set at creation. Examples: \u201C2026 Annual Fund\u201D, \u201CScholarship Sponsorship Drive Q1\u201D, \u201CCapital Campaign — New Building\u201D, \u201CGate Foundation Mentoring Grant\u201D. Maps to the native name field per Implementation Note 1; the implementation choice (native name relabel vs. separate custom field with synchronization) is deferred to Phase 9. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "may map to native name field. See Implementation Note 1 and FC-DEC-003." },
        ]],
        ["campaignType", "enum", "No", "Annual Fund, Program Appeal, Event, Capital Campaign, Other", "—", "FU-RECORD-DAT-040", [
          { text: "Captures the Campaign's purpose. Property field used for reporting grouping and ad-hoc filtering, not a discriminator that drives field visibility per FC-DEC-002. Source-of-contributions information is not captured on this field — source is captured by linked Contributions (donorContact / donorAccount). Read in ad-hoc FU-REPORT queries as a grouping dimension per FU-REPORT-DAT-031; not used in any defined report. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["status", "enum", "Yes (no default)", "Planned, Active, Completed, Cancelled", "— (no default; Coordinator must explicitly select)", "FU-RECORD-DAT-041", [
          { text: "The current lifecycle stage of the Fundraising Campaign. Coordinator must explicitly select at creation; no default. Planned means designed and in pre-approval review, not yet accepting Contributions. Active means approved to proceed and accepting Contributions. Completed means the period or goal has closed; the record stays for analytics. Cancelled means a Planned or Active Campaign was abandoned; the record stays for historical reference. Free-form transitions per FU-RECORD-REQ-008 — no system-enforced progression order. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["goalAmount", "currency", "No", "—", "—", "FU-RECORD-DAT-042", [
          { text: "The Campaign's fundraising goal — a Coordinator-set target dollar value. Optional; Campaigns may be tracked without a stated goal. Read in ad-hoc Campaign Performance Against Goals queries per FU-REPORT-DAT-033 (the report dropped from defined-report scope during FU-REPORT process definition). " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["startDate", "date", "No", "—", "—", "FU-RECORD-DAT-043", [
          { text: "The Campaign's start date — when the Campaign is intended to begin accepting Contributions. Optional; Campaigns may be tracked without explicit period bounds. Read as a campaign-period anchor for ad-hoc FU-REPORT queries per FU-REPORT-DAT-034. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["endDate", "date", "No", "—", "—", "FU-RECORD-DAT-044", [
          { text: "The Campaign's end date — when the Campaign is intended to close. Optional; Campaigns may be tracked without explicit period bounds. Read as a campaign-period anchor for ad-hoc FU-REPORT queries per FU-REPORT-DAT-034. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["totalRaised", "currency", "No (system-calculated, read-only)", "—", "—", "FU-RECORD-DAT-045", [
          { text: "System-calculated, read-only per FU-RECORD-REQ-011. Sum of amount across all Contributions in Received status linked to this Campaign via the Contribution.campaign field. Contributions in any other status (Applied, Pledged, Committed, Unsuccessful, Cancelled) do not contribute. The calculation rule is solely on Contribution.status, not on Fundraising Campaign.status — Received Contributions linked to a Cancelled or Completed Campaign continue to contribute to that Campaign's totalRaised, preserving historical accuracy per FC-DEC-005 and Implementation Note 3. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "system-calculated, readOnly. See Implementation Note 2 for rollup calculation detail." },
        ]],
        ["description", "text", "No", "—", "—", "FU-RECORD-DAT-046", [
          { text: "Free-form description of the Campaign — purpose, narrative for stakeholders, internal notes. Distinct from the Notes Service stream (which captures event-style activity entries on the Campaign record per Implementation Note 4); description is the Campaign's own narrative content, set primarily at creation and updated as the Campaign evolves. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["geographicServiceArea", "multiEnum", "No", "zip codes from master list", "—", "FU-RECORD-DAT-047", [
          { text: "The geographic territory funded by this Campaign, expressed as a list of zip codes from a master list. Used by the FU-REPORT Mentoring Service Delivery by Funding Territory report for territory-based attribution when a funder organization scopes funding to a specific area through a Campaign rather than at the funder level. Same field structure as Account.geographicServiceArea per Account Entity PRD v1.8 Section 3.3 — both fields are independently maintained by the Coordinator with no automatic rollup or inheritance from funder Account to Campaign. The Northeast Ohio zip code master list is defined during Phase 9 implementation per FC-ISS-001. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "zip code values are queryable for set-membership against Contact.addressPostalCode to support territory-based attribution. See Implementation Note 8." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "The Fundraising Campaign entity has one relationship to other entities — the inverse oneToMany side of the Contribution.campaign manyToOne link established in Contribution Entity PRD v1.0 Section 4. Relationship implementation details (link names, labels) will be finalized during YAML generation.",
  relationships: [
    ["Fundraising Campaign \u2192 Contributions", "Contribution", "oneToMany", "FU-RECORD-DAT-031 (Contribution side); inverse defined here", "FU"],
  ],
  relationshipNotes: [
    { label: "Note on Contributions:", text: " This is the inverse oneToMany side of the manyToOne campaign link defined on Contribution per FU-RECORD-DAT-031 and Contribution Entity PRD v1.0 Section 4. One Campaign per Contribution; the link is settable, changeable, and clearable at any time, regardless of Campaign status, per FU-RECORD-REQ-005 and FC-DEC-006 — there is no system-enforced gating against linking a Contribution to a Completed or Cancelled Campaign. Legitimate reasons to link a Contribution to a non-Active Campaign include correcting a misclassification after Campaign closure and attributing a late-arriving Contribution to the Campaign it belongs to. The relationship drives the totalRaised rollup calculation per FU-RECORD-REQ-011 (sum of amount across linked Contributions in Received status), documented in Implementation Note 2." },
    { label: "Note on what is NOT a Fundraising Campaign relationship:", text: " Fundraising Campaign does not link directly to Contact or Account — funder identity flows through the linked Contributions (which carry donorContact or donorAccount per FU-RECORD-DAT-023 and FU-RECORD-DAT-024), not through Fundraising Campaign itself. Fundraising Campaign also does not link to any other entity in the implementation; the Contribution oneToMany is the only Fundraising Campaign relationship." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "The Fundraising Campaign entity has no dynamic-logic visibility or required-when rules. All nine custom fields are visible on every Fundraising Campaign record. The campaignType field is a property field, not a discriminator — its value does not drive any field's visibility per FC-DEC-002. The status field tracks the lifecycle but does not drive field visibility either; all fields remain visible on Planned, Active, Completed, and Cancelled records alike. Required-status at creation (campaignName and status are required, the other seven fields are optional) is captured as the Required attribute in Section 3 Custom Fields, not as a dynamic-logic required-when rule.",
  dynamicLogicSections: [
    { heading: "5.1 No discriminator-driven visibility", paragraphs: [
      { text: "Unlike Contribution (which uses contributionType as a discriminator driving five dynamic-logic rules CONTR-DYN-001 through CONTR-DYN-005), Fundraising Campaign has no field-visibility variation across records. Every record carries the full nine-field set, and the Coordinator sees the same layout regardless of campaignType or status. This decision is recorded in FC-DEC-002 and reflects the FU-RECORD v1.2 Section 8.4 source authority — none of the nine fields is described in the source documents as type-specific or status-specific in its visibility." },
    ]},
    { heading: "5.2 No automatic field updates on Fundraising Campaign records", paragraphs: [
      { text: "No Fundraising Campaign field is automatically populated or updated by dynamic logic on the Fundraising Campaign record itself. The totalRaised field is system-calculated from linked Contribution data per FU-RECORD-REQ-011, but this is a rollup calculation rather than a dynamic-logic rule on the Fundraising Campaign record. The rollup is documented in Section 7 Implementation Note 2. No other Fundraising Campaign field is automatically populated or updated." },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following four-panel grouping is a recommendation for the Fundraising Campaign detail view. Final layout is determined during YAML generation. Since Fundraising Campaign has no discriminator and no type-specific visibility, every panel is visible on every record — there are no hidden panels driven by status or campaignType.",
  layoutPanels: [
    { name: "Panel 1 — Campaign Identification (always visible)", text: "campaignName, campaignType, status, description. The four fields that establish the Campaign's identity and purpose. campaignName is the Coordinator-supplied human-readable label; campaignType captures the Campaign's purpose category; status drives the lifecycle; description is the Campaign's own narrative content. description is placed in this panel alongside the other identity fields rather than in a dedicated panel because it is a single free-form field that contextualizes the Campaign at a glance and is typically read alongside campaignName and campaignType." },
    { name: "Panel 2 — Lifecycle and Goal (always visible)", text: "startDate, endDate, goalAmount, totalRaised. The four fields that track the Campaign's temporal scope and fundraising progress. The two date fields anchor the Campaign period; goalAmount is the Coordinator-set target; totalRaised is the system-calculated running total per Implementation Note 2. Placing all four together gives the Coordinator at-a-glance visibility into goal-vs-actual progress and period-bounds-vs-actual-receipts visibility." },
    { name: "Panel 3 — Geographic Targeting (always visible)", text: "geographicServiceArea. The single field that captures the Campaign's funded territory as a list of zip codes from the master list. Placed in its own panel because the field's purpose (territory-based attribution per FU-REPORT) is distinct from both identification and lifecycle, and the multiEnum zip-code-list display benefits from dedicated visual space rather than being squeezed in alongside other fields. The field is independent of Account.geographicServiceArea on the funder Account per FC-DEC-007 and Implementation Note 8." },
    { name: "Panel 4 — Contributions (always visible)", text: "Related-records list showing all Contributions linked to this Campaign via the Contribution.campaign field (the oneToMany inverse of the Contribution-side manyToOne). Surfaces the underlying records that drive the totalRaised calculation, so the Coordinator can navigate from a Campaign to any individual Contribution and audit the rollup composition. Display columns and filters will be finalized during Phase 9 YAML generation; useful columns include Contribution.name, contributionType, status, amount, donorContact / donorAccount, and the relevant lifecycle date fields." },
    { name: "Notes Service (platform-standard surface)", text: "Fundraising Campaign participates in the Notes Service per FU-RECORD-REQ-020 alongside Contact, Account, Engagement, Session, Event, and Contribution. The Notes Service is surfaced through the platform's standard mechanism for Notes Service-enabled entities (typically a side panel or a tab) rather than as a custom Fundraising Campaign panel. Unlike Contribution (which has both an in-record notes field and the Notes Service stream), Fundraising Campaign uses the Notes Service stream only — there is no separate in-record narrative-notes field on Fundraising Campaign. See Implementation Note 4." },
    { name: "Activity Stream (platform-standard surface)", text: "Fundraising Campaign has Activity Stream enabled per Section 1 Entity Overview. The activity stream is surfaced through the platform's standard mechanism (typically a side panel or a tab) rather than as a custom Fundraising Campaign panel. The audit trail per FU-RECORD-REQ-014 (status and goalAmount) is typically integrated with the Activity Stream." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Native name field mapping (campaignName \u2194 name):", text: " The native name field on the Base entity maps to the custom campaignName field per FU-RECORD-DAT-039. The Coordinator supplies campaignName at creation; the native name field surfaces the same value. During Phase 9 YAML generation, determine whether campaignName should be implemented as the native name field (relabeled) or as a separate custom field with a synchronization rule. Either approach satisfies the requirement; the choice is platform-dependent. Matches the Marketing Campaign Entity PRD v1.0 precedent (Implementation Note 1 in that document defers the same choice to YAML generation). Differs from the Contribution and Dues precedents (which use auto-generated name fields constructed from related fields) because Fundraising Campaign has a Coordinator-supplied human-readable label and no auto-generation source. See FC-DEC-003." },
    { label: "2. totalRaised rollup calculation:", text: " Per FU-RECORD-REQ-011, totalRaised is calculated as the sum of amount across all Contributions in Received status linked to this Fundraising Campaign via the Contribution.campaign field. Contributions in any other status (Applied, Pledged, Committed, Unsuccessful, Cancelled) contribute zero. The calculation is the inverse-side definition of the rollup driver established in Contribution Entity PRD v1.0 Implementation Note 10. Read-only on the Fundraising Campaign record per FU-RECORD-REQ-011; the Coordinator cannot override the calculated value. The exact implementation form (database-side rollup, formula field, scheduled recalculation) is deferred to Phase 9. The totalRaised value is read in ad-hoc FU-REPORT Campaign Performance Against Goals queries per FU-REPORT-DAT-035 but is not used in any defined report." },
    { label: "3. totalRaised behavior on Cancelled and Completed Campaigns:", text: " The totalRaised calculation rule is solely on Contribution.status, not on Fundraising Campaign.status. Received-status Contributions linked to a Cancelled or Completed Campaign continue to contribute to that Campaign's totalRaised. This preserves the historical accuracy of a Cancelled Campaign's actual receipts (the Campaign was abandoned, but the Contributions that arrived before abandonment are still real receipts that count toward Contact.donorLifetimeGiving and Account.funderLifetimeGiving) and a Completed Campaign's final total (the Campaign closed at a definite point in time, but the Coordinator may continue linking late-arriving Contributions to it per FC-DEC-006). Coordinators who need to exclude Cancelled-Campaign receipts from a report query do so via report-level filtering rather than by suppressing the Campaign-level totalRaised. See FC-DEC-005." },
    { label: "4. Notes Service availability:", text: " Per FU-RECORD-REQ-020, Fundraising Campaign participates in the Notes Service alongside Contact, Account, Engagement, Session, Event, and Contribution. The Notes Service is a separate cross-domain capability — a free-form, timestamped, attributed, append-only stream — accessible to the Donor / Sponsor Coordinator and above. Unlike Contribution (which has both an in-record notes field per FU-RECORD-DAT-034 and the Notes Service stream operating side by side), Fundraising Campaign uses the Notes Service stream only — there is no separate in-record narrative-notes field on Fundraising Campaign. The description field (FU-RECORD-DAT-046) is the Campaign's own narrative content set primarily at creation; the Notes Service stream captures event-style activity entries (planning meetings, approval decisions, mid-campaign adjustments, post-campaign retrospectives, donor-recognition obligations specific to the Campaign). Field-level security on the Notes Service stream follows the Fundraising Campaign record-level visibility rule per FU-RECORD-REQ-022." },
    { label: "5. Audit trail scope:", text: " Per FU-RECORD-REQ-014, the Fundraising Campaign audit trail covers status and goalAmount only. Other Fundraising Campaign fields (campaignName, campaignType, startDate, endDate, totalRaised, description, geographicServiceArea) are not audited. The audit trail is surfaced through the platform's standard audit-stream mechanism, typically integrated with the Activity Stream. The narrow audit scope reflects the FU-RECORD design decision that status and goalAmount are the two fields whose history matters most for accountability — status transitions document the Campaign's lifecycle, and goalAmount changes document any goal revisions. Other fields are either system-calculated (totalRaised), descriptive (campaignName, description), or non-controversial in change-history terms (campaignType, startDate, endDate, geographicServiceArea)." },
    { label: "6. Record-level visibility:", text: " Per FU-RECORD-REQ-022, Fundraising Campaign records are visible only to the Donor / Sponsor Coordinator, Executive Member, and System Administrator personas. All other personas (including Mentors, Members, Clients, and general staff) have no visibility to Fundraising Campaign records. All field-level security inherits from this record-level rule. The exact implementation form (role-based access control, scope filter, ownership-based filter) is deferred to Phase 9. Matches Contribution's record-level visibility per FU-RECORD-REQ-021." },
    { label: "7. No deletion; abandonment via status:", text: " Per FU-RECORD-REQ-019, Fundraising Campaign records are retained permanently regardless of terminal status (Completed or Cancelled). Abandonment of a Planned or Active Campaign is handled by transitioning status to Cancelled — not by deleting the record. Cancelled and Completed Campaigns remain queryable and reportable indefinitely. Edits to status and goalAmount are captured by the audit trail per FU-RECORD-REQ-014; edits to other fields are not audited but the record itself persists. Historical reporting (lifetime giving rollups, year-over-year trends, territory attribution) requires permanent retention of all Campaign records; deletion would leave linked Contributions orphaned and corrupt the historical record. See FC-DEC-008." },
    { label: "8. Geographic service area territory-based attribution model:", text: " The geographicServiceArea field is a multiEnum zip-code list per FU-RECORD-DAT-047 with the same field structure as Account.geographicServiceArea per Account Entity PRD v1.8 Section 3.3. The two fields are independently maintained by the Coordinator — there is no automatic rollup or inheritance from a funder Account to a Fundraising Campaign. The territory-based attribution model in the Mentoring Service Delivery by Funding Territory report (FU-REPORT v1.0) operationally consumes both fields: Account.geographicServiceArea provides the funder-level territory; Fundraising Campaign.geographicServiceArea provides the campaign-level territory when a funder scopes funding to a specific area through a Campaign rather than at the funder level. Some funders set territory only at the funder level, others set territory only at the campaign level, others set both. Territories may overlap; a single Mentoring session may count toward multiple funders or campaigns per zip code set-membership testing against Contact.addressPostalCode (collected at MN-INTAKE-DAT-014). The Northeast Ohio zip code master list itself is defined during Phase 9 implementation per FC-ISS-001 and FU-REPORT-ISS-001. See FC-DEC-007." },
    { label: "9. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["FC-ISS-001", "Northeast Ohio zip code master list deferred to Phase 9 implementation. The geographicServiceArea field on Fundraising Campaign references \u201Czip codes from master list\u201D per FU-RECORD-DAT-047 and Implementation Note 8. The master list itself \u2014 the authoritative set of Northeast Ohio zip code values populating the multiEnum \u2014 is to be defined during Phase 9 YAML generation per FU-REPORT-ISS-001 and the closure note on ACT-ISS-004. Blocks: nothing in this Entity PRD; the field structure is fully specified. The master-list authoring is a downstream implementation task that this Entity PRD does not need to resolve. Cross-references: Account Entity PRD v1.8 Section 3.3 (same field structure, same deferral); FU-REPORT-ISS-001 (parent issue at the FU domain level)."],
  ],

  openIssuesNote: { label: "Note on closed-by-design items: ", text: "The following items might appear to be open issues but are decided in this PRD and recorded in Section 9 Decisions Made rather than carried forward: display labels (FC-DEC-001 records the v1.0 baseline including Fundraising Campaign / Fundraising Campaigns labels); native name field mapping pattern (FC-DEC-003 records the Marketing Campaign precedent adoption with implementation choice deferred to Phase 9); lack of discriminator (FC-DEC-002, campaignType is a property field per FU-RECORD v1.2 source authority); status lifecycle and free-form transitions (FC-DEC-004); totalRaised behavior on Cancelled and Completed Campaigns (FC-DEC-005, calculation is solely on Contribution.status not Campaign.status); linkage to Contribution unrestricted by Campaign status (FC-DEC-006); geographicServiceArea independent maintenance from Account.geographicServiceArea (FC-DEC-007); no deletion of Fundraising Campaign records (FC-DEC-008); audit trail scope of status and goalAmount only (FC-DEC-009). The Entity Inventory v1.5 will be updated in the Phase 7 reconciliation step that produces the FU Domain PRD; no separate carry-forward request is issued from this Entity PRD." },

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["FC-DEC-001", "Version 1.0 baseline. The Fundraising Campaign Entity PRD is established at v1.0 as the first Entity PRD for the Fundraising Campaign custom Base entity. Nine custom fields are defined, plus four native fields. Zero dynamic-logic rules and nine implementation notes are documented. First-pass production from FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0, the FU Domain Overview v1.0, the Entity Inventory v1.5, the Contribution Entity PRD v1.0, and the Account Entity PRD v1.8. Second and final FU-owned Phase 5 Entity PRD; the Contribution Entity PRD v1.0 (committed 04-30-26) is the first. After this Entity PRD, Phase 7 Domain Reconciliation produces the FU Domain PRD, then Phase 8 Stakeholder Review."],
    ["FC-DEC-002", "No discriminator on Fundraising Campaign. Fundraising Campaign has no discriminator field. The campaignType field (Annual Fund, Program Appeal, Event, Capital Campaign, Other) is a property field that captures the Campaign's purpose for reporting and grouping, not a discriminator that drives field visibility. All nine custom fields are visible on every Fundraising Campaign record regardless of campaignType or status. Rationale: FU-RECORD v1.2 Section 8.4 defines all fields as universally applicable to every Campaign, and the source documents specify no type-specific or status-specific visibility rules. This contrasts with Contribution, which uses contributionType as a discriminator driving five dynamic-logic rules. Source: FU-RECORD v1.2 Section 8.4, FU-RECORD-REQ-008. Cross-references: none."],
    ["FC-DEC-003", "Native name field mapped to campaignName. The native name field on the Base entity maps to the custom campaignName field per the Marketing Campaign Entity PRD precedent. The Coordinator supplies campaignName at creation; the native name field surfaces the same value. The implementation choice (relabel native field vs. separate custom field with synchronization) is deferred to Phase 9 YAML generation. Rationale: Fundraising Campaign has a Coordinator-supplied human-readable label, matching the Marketing Campaign pattern, rather than an auto-generated identifier constructed from related fields (Contribution, Dues, Engagement, Session pattern). Source: FU-RECORD-DAT-039; Marketing Campaign Entity PRD v1.0 Implementation Note 1. Cross-references: none."],
    ["FC-DEC-004", "Status lifecycle and free-form transitions. The Fundraising Campaign status field has four values (Planned, Active, Completed, Cancelled) with no system-enforced progression order. The Coordinator can transition between any values at any time. There is no default value at creation \u2014 the Coordinator must explicitly select a status. Cancelled and Completed are not terminal in a deletion sense; the record persists for analytics and historical reference per FC-DEC-008. Rationale: FU-RECORD v1.2 design decision to keep the lifecycle Coordinator-judgment-driven rather than rule-driven. Source: FU-RECORD-REQ-008, FU-RECORD-DAT-041. Cross-references: none."],
    ["FC-DEC-005", "totalRaised calculation on Contribution.status only, not Campaign.status. The totalRaised rollup is calculated as the sum of amount across all Contributions in Received status linked to the Fundraising Campaign via the Contribution.campaign field. The rule is solely on Contribution.status, not on Fundraising Campaign.status. Received-status Contributions linked to a Cancelled or Completed Campaign continue to contribute to that Campaign's totalRaised, preserving historical accuracy. Rationale: a Cancelled Campaign's actual receipts before abandonment remain real receipts; suppressing them at the Campaign level would falsify the historical record. Coordinators who need to exclude Cancelled-Campaign receipts from a report query do so via report-level filtering. Source: FU-RECORD-REQ-011, Contribution Entity PRD v1.0 Implementation Note 10. Cross-references: none."],
    ["FC-DEC-006", "Linkage to Contribution unrestricted by Campaign status. Per FU-RECORD-REQ-005, the Coordinator may link any Contribution to one Fundraising Campaign at any time, regardless of Campaign status. There is no system-enforced gating against linking a Contribution to a Completed or Cancelled Campaign. The Contribution.campaign link is settable, changeable, and clearable at any time. Rationale: there are legitimate reasons to link a Contribution to a Completed or Cancelled Campaign (correcting a misclassification after closure, attributing a late-arriving Contribution to the Campaign it belongs to). Source: FU-RECORD-REQ-005, Contribution Entity PRD v1.0 Section 4 (Note on campaign). Cross-references: none."],
    ["FC-DEC-007", "geographicServiceArea uses the same field structure as Account.geographicServiceArea, independently maintained. The geographicServiceArea field on Fundraising Campaign is a multiEnum populated from the same Northeast Ohio zip code master list as Account.geographicServiceArea per Account Entity PRD v1.8 Section 3.3. The two fields are independently maintained by the Coordinator \u2014 there is no automatic rollup or inheritance from a funder Account to a Fundraising Campaign. The territory-based attribution model in the Mentoring Service Delivery by Funding Territory report (FU-REPORT v1.0) operationally consumes both fields: Account.geographicServiceArea for funder-level territory, Fundraising Campaign.geographicServiceArea for campaign-level territory when a funder scopes funding to a specific area through a Campaign rather than at the funder level. Rationale: territory scoping varies independently between the funder organization and any specific Campaign; some funders set territory at the funder level only, others set it at the campaign level only, others set both. Source: FU-RECORD-DAT-047, ACT-ISS-004 closure note, FU-REPORT v1.0 Section 7.4. Cross-references: Account Entity PRD v1.8 Section 3.3 (same field structure on the Account side)."],
    ["FC-DEC-008", "No deletion of Fundraising Campaign records; abandonment via status = Cancelled. Per FU-RECORD-REQ-019, Fundraising Campaign records are retained permanently regardless of terminal status. Abandonment of a Planned or Active Campaign is handled by transitioning status to Cancelled \u2014 not by deleting the record. Cancelled and Completed Campaigns remain queryable and reportable indefinitely. Rationale: historical reporting (lifetime giving rollups, year-over-year trends, territory attribution) requires permanent retention of all Campaign records; deletion would leave linked Contributions orphaned and corrupt the historical record. Source: FU-RECORD-REQ-019, FU-RECORD v1.2 Section 4.4. Cross-references: none."],
    ["FC-DEC-009", "Audit trail scoped to status and goalAmount. Per FU-RECORD-REQ-014, the Fundraising Campaign audit trail covers status and goalAmount only. Other Fundraising Campaign fields (campaignName, campaignType, startDate, endDate, totalRaised, description, geographicServiceArea) are not audited. Rationale: status and goalAmount are the two fields whose history matters most for accountability \u2014 status transitions document the Campaign's lifecycle, and goalAmount changes document any goal revisions. Other fields are either system-calculated (totalRaised), descriptive (campaignName, description), or non-controversial in change-history terms (campaignType, startDate, endDate, geographicServiceArea). Source: FU-RECORD-REQ-014. Cross-references: none."],
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// RENDERING ENGINE
// ═══════════════════════════════════════════════════════════════════════

const FONT = "Arial";
const SZ = { h1: 28, h2: 24, h3: 22, body: 20, small: 18, xs: 16, meta: 16 };
const COLORS = { headerBg: "1F3864", headerText: "FFFFFF", titleColor: "1F3864", altRowBg: "F2F7FB", borderColor: "AAAAAA", idColor: "888888" };
const TABLE_WIDTH = 9360;

const borders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.borderColor },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.borderColor },
  left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.borderColor },
  right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.borderColor },
};
const cellMargins = { top: 40, bottom: 40, left: 80, right: 80 };
const descMargins = { top: 20, bottom: 40, left: 80, right: 80 };

function r(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics });
}

function p(content, opts = {}) {
  if (typeof content === "string") {
    return new Paragraph({ children: [r(content, opts)], spacing: { after: opts.after || 120 }, alignment: opts.alignment });
  }
  return new Paragraph({ children: content, spacing: { after: opts.after || 120 }, alignment: opts.alignment });
}

function heading(text, level) {
  return new Paragraph({ text, heading: level, spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 120 } });
}

function labeledParagraph(note) {
  if (!note.label) return p(note.text || "");
  return p([r(note.label, { bold: true }), r(note.text || "")]);
}

function hdrCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(text, { bold: true, color: COLORS.headerText, size: SZ.small })] })] });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, columnSpan: opts.columnSpan, children: [new Paragraph({ children: [r(text, { size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics })] })] });
}

// ── Metadata table ─────────────────────────────────────────────────
const MC = [2800, 6560];
function metaTable(rows) {
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: MC, rows: rows.map((row, i) => new TableRow({ children: [dataCell(row[0], MC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(row[1], MC[1], { shaded: i % 2 === 1, size: SZ.small })] })) });
}

// ── Native field table ─────────────────────────────────────────────
const NFC = [2200, 1400, 3000, 2760];
function nativeFieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Native Field", NFC[0]), hdrCell("Type", NFC[1]), hdrCell("PRD Name(s) / Mapping", NFC[2]), hdrCell("Referenced By", NFC[3])] });
  const rows = fields.map((f, i) => new TableRow({ children: [dataCell(f[0], NFC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(f[1], NFC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[2], NFC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[3], NFC[3], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: NFC, rows: [hdr, ...rows] });
}

// ── Custom field table (two-row format with rich descriptions) ─────
const FC = [2200, 1100, 800, 2400, 1000, 1860];

function buildDescRuns(descParts) {
  return descParts.map(part => {
    if (part.bold) return r(part.bold, { size: SZ.small, color: COLORS.idColor, bold: true });
    return r(part.text, { size: SZ.small, color: COLORS.idColor });
  });
}

function fieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Field Name", FC[0]), hdrCell("Type", FC[1]), hdrCell("Required", FC[2]), hdrCell("Values", FC[3]), hdrCell("Default", FC[4]), hdrCell("ID", FC[5])] });
  const rows = [hdr];
  fields.forEach((f, i) => {
    const [name, type, required, values, defaultVal, id, descParts] = f;
    const shaded = i % 2 === 1;
    rows.push(new TableRow({ children: [dataCell(name, FC[0], { shaded, bold: true }), dataCell(type, FC[1], { shaded }), dataCell(required, FC[2], { shaded }), dataCell(values, FC[3], { shaded }), dataCell(defaultVal, FC[4], { shaded }), dataCell(id, FC[5], { shaded, size: SZ.xs, color: COLORS.idColor })] }));
    rows.push(new TableRow({ children: [new TableCell({ borders, width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnSpan: 6, shading: shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: descMargins, children: [new Paragraph({ children: buildDescRuns(descParts) })] })] }));
  });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: FC, rows });
}

// ── Relationship table ─────────────────────────────────────────────
const RLC = [2600, 1800, 1400, 1700, 1860];
function relTable(rels) {
  const hdr = new TableRow({ children: [hdrCell("Relationship", RLC[0]), hdrCell("Related Entity", RLC[1]), hdrCell("Link Type", RLC[2]), hdrCell("PRD Reference", RLC[3]), hdrCell("Domain(s)", RLC[4])] });
  const rows = rels.map((rel, i) => new TableRow({ children: [dataCell(rel[0], RLC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(rel[1], RLC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[2], RLC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[3], RLC[3], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[4], RLC[4], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: RLC, rows: [hdr, ...rows] });
}

// ── Two-column table (issues, decisions) ───────────────────────────
const TC = [1500, 7860];
function twoColTable(h1, h2, rows) {
  const hdr = new TableRow({ children: [hdrCell(h1, TC[0]), hdrCell(h2, TC[1])] });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: TC, rows: [hdr, ...rows.map((row, i) => new TableRow({ children: [dataCell(row[0], TC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(row[1], TC[1], { shaded: i % 2 === 1, size: SZ.small })] }))] });
}


// ═══════════════════════════════════════════════════════════════════════
// DOCUMENT ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════

function buildContent() {
  const c = [];
  const E = ENTITY;
  const O = E.overview;

  // ── Section 1: Entity Overview ───────────────────────────────────
  c.push(heading("1. Entity Overview", HeadingLevel.HEADING_1));
  const metaRows = [
    ["CRM Entity Name", O.crmEntityName],
    ["Native / Custom", O.nativeOrCustom],
    ["Entity Type", O.entityType],
    ["Display Label (Singular)", O.labelSingular],
    ["Display Label (Plural)", O.labelPlural],
    ["Activity Stream", O.activityStream],
    ["Contributing Domains", O.contributingDomains],
  ];
  if (O.discriminatorField) {
    metaRows.push(["Discriminator Field", O.discriminatorField]);
    metaRows.push(["Discriminator Values", O.discriminatorValues]);
  }
  c.push(metaTable(metaRows));
  c.push(p(""));
  E.overviewText.forEach(text => c.push(p(text)));
  if (E.overviewNotes) E.overviewNotes.forEach(n => c.push(labeledParagraph(n)));

  // ── Section 2: Native Fields ─────────────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("2. Native Fields", HeadingLevel.HEADING_1));
  c.push(p(E.nativeFieldsIntro));
  c.push(nativeFieldTable(E.nativeFields));
  c.push(p(""));
  if (E.nativeFieldNotes) E.nativeFieldNotes.forEach(n => c.push(labeledParagraph(n)));

  // ── Section 3: Custom Fields ─────────────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("3. Custom Fields", HeadingLevel.HEADING_1));
  c.push(p(E.customFieldsIntro));

  E.customFieldGroups.forEach(group => {
    if (group.heading) {
      const lvl = group.headingLevel === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2;
      c.push(heading(group.heading, lvl));
    }
    if (group.intro) c.push(p(group.intro));
    if (group.fields && group.fields.length > 0) {
      c.push(fieldTable(group.fields));
      c.push(p(""));
    }
  });

  // ── Section 4: Relationships ─────────────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("4. Relationships", HeadingLevel.HEADING_1));
  c.push(p(E.relationshipsIntro));
  c.push(relTable(E.relationships));
  c.push(p(""));
  if (E.relationshipNotes) E.relationshipNotes.forEach(n => c.push(labeledParagraph(n)));

  // ── Section 5: Dynamic Logic Rules ───────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("5. Dynamic Logic Rules", HeadingLevel.HEADING_1));
  c.push(p(E.dynamicLogicIntro));
  E.dynamicLogicSections.forEach(section => {
    c.push(heading(section.heading, HeadingLevel.HEADING_2));
    section.paragraphs.forEach(para => c.push(labeledParagraph(para)));
  });

  // ── Section 6: Layout Guidance ───────────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("6. Layout Guidance", HeadingLevel.HEADING_1));
  c.push(p(E.layoutIntro));
  E.layoutPanels.forEach(panel => {
    c.push(p([r(panel.name, { bold: true, color: COLORS.titleColor })]));
    c.push(p(panel.text));
  });

  // ── Section 7: Implementation Notes ──────────────────────────────
  c.push(heading("7. Implementation Notes", HeadingLevel.HEADING_1));
  E.implementationNotes.forEach(note => c.push(labeledParagraph(note)));

  // ── Section 8: Open Issues ───────────────────────────────────────
  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("8. Open Issues", HeadingLevel.HEADING_1));
  c.push(twoColTable("ID", "Issue", E.openIssues));
  if (E.openIssuesNote) {
    c.push(p(""));
    c.push(labeledParagraph(E.openIssuesNote));
  }

  // ── Section 9: Decisions Made ────────────────────────────────────
  c.push(heading("9. Decisions Made", HeadingLevel.HEADING_1));
  c.push(twoColTable("ID", "Decision", E.decisions));

  return c;
}

const content = buildContent();

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: SZ.body } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h1, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h2, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h3, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
    }],
  },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            r(ENTITY.orgName, { size: SZ.meta, bold: true, color: COLORS.titleColor }),
            new TextRun({ children: ["\t"], font: FONT }),
            r(`${ENTITY.entityName} Entity PRD`, { size: SZ.meta, color: COLORS.idColor }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 0 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.headerBg, space: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [r(`Entity PRD \u2014 ${ENTITY.entityName}`, { size: SZ.xs, color: COLORS.idColor })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0 },
        })],
      }),
    },
    children: [
      p(ENTITY.orgName, { bold: true, size: 20, color: COLORS.idColor, after: 40 }),
      p(`${ENTITY.entityName} Entity PRD`, { bold: true, size: 40, color: COLORS.titleColor, after: 200 }),
      metaTable([
        ["Document Type", "Entity PRD"],
        ["Entity", `${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],
        ["Implementation", ENTITY.orgName],
        ["Version", ENTITY.version],
        ["Status", ENTITY.status],
        ["Last Updated", ENTITY.lastUpdated],
        ["Source Documents", ENTITY.sourceDocuments],
      ]),
      new Paragraph({ children: [new PageBreak()] }),
      ...content,
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(ENTITY.outputFile, buffer);
  console.log(`Generated: ${ENTITY.outputFile}`);
});
