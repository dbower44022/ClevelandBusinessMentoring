// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Contribution Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js
// Entity: Contribution (Custom — Base Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-Contribution-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageBreak, TabStopType, TabStopPosition, LevelFormat,
} = require("docx");


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Contribution
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Contribution",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-30-26 16:30",
  sourceDocuments: "Master PRD v2.5, Entity Inventory v1.5, FU Domain Overview v1.0, FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0, Contact Entity PRD v1.7, Account Entity PRD v1.8",
  outputFile: "/home/claude/Contribution-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Contribution",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Contribution",
    labelPlural: "Contributions",
    activityStream: "Yes",
    contributingDomains: "Fundraising (FU) — FU-RECORD creates and primarily maintains; FU-STEWARD updates four fields under shared ownership during the sweep; FU-REPORT is a read-only consumer.",
    discriminatorField: "contributionType",
    discriminatorValues: "Donation, Sponsorship, Grant",
  },

  overviewText: [
    "The Contribution entity is the funding-record entity of the Fundraising domain. Each Contribution record represents a discrete funding event — a donation received, a sponsorship committed, or a grant applied for — and carries the full lifecycle of that event through status transitions from initial entry to a terminal state. The contributionType discriminator distinguishes the three funding-record categories and drives type-specific dynamic logic for fields that apply to only one category (giftType for Donations, applicationDate and nextGrantDeadline for Grants).",
    "Contribution is a custom Base entity owned exclusively by the Fundraising domain. FU-RECORD is the only process that creates Contribution records, formalizing the eighteen custom fields specified here. FU-STEWARD writes a subset of fields (the two acknowledgment fields under hybrid ownership, nextGrantDeadline, and the in-record notes field) during the sweep. FU-REPORT consumes Contribution data read-only across the ten defined Fundraising reports plus ad-hoc reporting.",
    "The Contribution lifecycle has six status values (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) with free-form transitions. Three rollup fields are calculated from Contribution data and live on other entities: Contact.donorLifetimeGiving (donorContact-scoped), Account.funderLifetimeGiving (donorAccount-scoped), and Fundraising Campaign.totalRaised (campaign-scoped). Only Contributions in status = Received contribute to all three rollups.",
  ],

  overviewNotes: [
    { label: "Discriminator value evolution:", text: " Entity Inventory v1.5 lists four discriminator values (Donation, Sponsorship, Grant, Pledge). FU-RECORD v1.2 — the authoritative source per the source-document hierarchy — has resolved this to three values. Pledged moved from a contribution type to a status value. The Entity PRD adopts the three-value model. The Entity Inventory will be updated in the Phase 7 reconciliation step that produces the FU Domain PRD; no separate carry-forward request is issued from this Entity PRD." },
    { label: "Record-level visibility:", text: " Per FU-RECORD-REQ-021, Contribution records — including the in-record notes field — are visible only to the Donor / Sponsor Coordinator, Executive Member, and System Administrator personas. All other personas (Mentors, Members, Clients, general staff) have no visibility to Contribution records. All field-level security inherits from this record-level rule." },
    { label: "Audit trail:", text: " Per FU-RECORD-REQ-014, the Contribution audit trail covers status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate. Other Contribution fields are not audited. The audit trail is surfaced through the platform's standard audit-stream mechanism, typically integrated with the Activity Stream." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on a Base entity type. These fields are not created by YAML. They are documented here so process documents and Entity PRDs can reference them correctly, and to prevent duplicate field creation during YAML generation.",
  nativeFields: [
    ["name", "varchar", "Auto-generated from donor, contributionType, and a status-driven key date. Format: \u201C{Donor Display Name} — {ContributionType} — {KeyDate}\u201D. See Implementation Note 1 and CONTR-DEC-005.", "FU-RECORD, FU-STEWARD, FU-REPORT"],
    ["createdAt", "datetime", "System — record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System — last modified timestamp", "System"],
    ["assignedUser", "link", "System — assigned CRM user. The Donor / Sponsor Coordinator who creates the record is the typical assigned user; reassignment is possible if a coverage change occurs.", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on name:", text: " The name field is auto-generated and read-only. The format is \u201C{Donor Display Name} — {ContributionType} — {KeyDate}\u201D where Donor Display Name is \u201C{lastName}, {firstName}\u201D from the linked donorContact when populated, or the linked donorAccount's name when populated (exactly one is populated per FU-RECORD-REQ-002); ContributionType is the value of the contributionType field; and KeyDate is selected by status — Received uses receivedDate, Committed uses commitmentDate, Applied uses applicationDate, Pledged uses expectedPaymentDate (falling back to commitmentDate), Unsuccessful uses applicationDate (falling back to commitmentDate), and Cancelled uses commitmentDate. If the selected date is not populated, the date segment and its preceding separator are omitted, producing \u201C{Donor Display Name} — {ContributionType}\u201D. Examples: \u201CSmith, Jane — Donation — 04-15-26\u201D for a Received Donation; \u201CAcme Corporation — Grant — 03-01-26\u201D for an Applied Grant; \u201CSmith, Jane — Donation\u201D for a newly created Pledged Donation with no date yet set." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldGroups: [
    {
      heading: "3.1 Shared Custom Fields",
      headingLevel: 2,
      intro: "These fourteen fields are visible on every Contribution record regardless of contributionType.",
      fields: [
        ["contributionType", "enum", "Yes", "Donation, Sponsorship, Grant", "—", "FU-RECORD-DAT-021", [
          { text: "Discriminator that drives type-specific dynamic logic per Section 5. Coordinator must explicitly select at creation; no default. No Pledge value (Pledged is a status, not a type). No In-Kind value (in-kind handling is via giftType — see CONTR-DEC-003 and FU-RECORD-REQ-016). " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["status", "enum", "Yes", "Applied, Pledged, Committed, Received, Unsuccessful, Cancelled", "—", "FU-RECORD-DAT-022", [
          { text: "The current lifecycle stage of the Contribution. Free-form transitions per FU-RECORD-REQ-007 — no system-enforced progression order. Coordinator must explicitly select at creation; no default. Only Received Contributions count toward the three rollup calculations (Contact.donorLifetimeGiving, Account.funderLifetimeGiving, Fundraising Campaign.totalRaised). " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["donorContact", "link (to Contact)", "Conditional", "—", "—", "FU-RECORD-DAT-023", [
          { text: "Link to the donor Contact when the donor is an individual. Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated — the two are mutually exclusive. Per FU-RECORD-REQ-003, the linked Contact must already have contactType including Donor before the Contribution can be created. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014. Mutual-exclusivity enforced at save per Implementation Note 4." },
        ]],
        ["donorAccount", "link (to Account)", "Conditional", "—", "—", "FU-RECORD-DAT-024", [
          { text: "Link to the donor Account when the donor is an organization. Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated — the two are mutually exclusive. Per FU-RECORD-REQ-003, the linked Account must already have accountType including Donor/Sponsor before the Contribution can be created. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014. Mutual-exclusivity enforced at save per Implementation Note 4." },
        ]],
        ["amount", "currency", "No", "—", "—", "FU-RECORD-DAT-025", [
          { text: "The dollar value of the Contribution. For Grant Contributions at status = Applied, the amount requested; updated to the actual award amount when status transitions to Committed. For multi-payment Grants, the value remains the total award amount through to Received. Drives the three rollup calculations when status = Received. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["commitmentDate", "date", "No", "—", "—", "FU-RECORD-DAT-026", [
          { text: "The date a firm commitment was established (for example, the date of an award letter or signed sponsorship agreement). Set when status transitions to Committed. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["expectedPaymentDate", "date", "No", "—", "—", "FU-RECORD-DAT-027", [
          { text: "The date payment is expected. For multi-payment Grants, the next pending payment date. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["receivedDate", "date", "No", "—", "—", "FU-RECORD-DAT-028", [
          { text: "The date funds were received. For multi-payment Grants, the date of the final payment per FU-RECORD-REQ-009 and Implementation Note 9. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["applicationDate", "date", "No", "—", "—", "FU-RECORD-DAT-029", [
          { text: "The date an application or request was submitted. Set when a Grant Contribution is created at status = Applied. Visibility controlled by dynamic-logic rule CONTR-DYN-001 (visible only when contributionType = Grant). Placed in the shared custom fields group rather than the Grant-specific group per CONTR-DEC-006. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "audited per FU-RECORD-REQ-014." },
        ]],
        ["designation", "text", "No", "—", "—", "FU-RECORD-DAT-030", [
          { text: "Free-form designation of the program, event, or purpose for the Contribution. Applies to any contributionType. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["campaign", "link (to Fundraising Campaign)", "No", "—", "—", "FU-RECORD-DAT-031", [
          { text: "Optional link to one Fundraising Campaign per FU-RECORD-REQ-005. Settable, changeable, and clearable at any time, regardless of Campaign status. One Campaign per Contribution; no system-enforced gating against linking to Completed or Cancelled Campaigns. Drives the Fundraising Campaign.totalRaised rollup calculation when status = Received. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["acknowledgmentSent", "bool", "No", "—", "false", "FU-RECORD-DAT-032", [
          { text: "Coordinator-set boolean indicating that an acknowledgment communication has been sent for this Contribution. Applies to all contribution types. Jointly written by FU-RECORD (primary path at Contribution creation per FU-RECORD-REQ-015) and FU-STEWARD (catch-up path during the sweep per FU-STEWARD-REQ-004) under the hybrid acknowledgment ownership model. Resolves EI-ISS-001. " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "hybrid ownership documented in Implementation Note 2." },
        ]],
        ["acknowledgmentDate", "date", "No", "—", "—", "FU-RECORD-DAT-033", [
          { text: "Date the acknowledgment communication was sent. Applies to all contribution types. Hybrid ownership companion to acknowledgmentSent — written by both FU-RECORD (primary path) and FU-STEWARD (catch-up path). " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "hybrid ownership documented in Implementation Note 2." },
        ]],
        ["notes", "wysiwyg", "No", "—", "—", "FU-RECORD-DAT-034", [
          { text: "Free-form rich-text Contribution-specific narrative — recognition obligations for Sponsorships, multi-payment disbursement detail for Grants, in-kind context, bounced-check explanations, and any other Contribution-specific narrative. The Notes Service is also available on Contribution per FU-RECORD-REQ-020 and is independent of this field — both coexist by design (see Implementation Note 3). " },
          { bold: "Domains: " }, { text: "FU. " },
          { bold: "Implementation: " }, { text: "Field-level security follows the record-level visibility rule per FU-RECORD-REQ-021 (Donor / Sponsor Coordinator, Executive Member, System Administrator only)." },
        ]],
      ],
    },
    {
      heading: "3.2 Donation-Specific Custom Fields",
      headingLevel: 2,
      intro: "These three fields are visible only when contributionType = Donation. The dynamic-logic visibility rules per Section 5 (CONTR-DYN-003 through CONTR-DYN-005) hide these fields from the Contribution record layout for Sponsorship and Grant Contributions.",
      fields: [
        ["giftType", "enum", "No", "Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other", "—", "FU-RECORD-DAT-035", [
          { text: "The form in which a Donation was given. Visibility controlled by dynamic-logic rule CONTR-DYN-003 (visible only when contributionType = Donation). The In-Kind value drives nested dynamic logic for inKindDescription and inKindValuationBasis (CONTR-DYN-004 and CONTR-DYN-005). Sponsorship and Grant Contributions do not use this field; in-kind Sponsorships are recorded narratively in notes per FU-RECORD v1.2 Section 4.2 and CONTR-DEC-003. Enum values per CONTR-DEC-007 follow FU-RECORD v1.2; FU-REPORT v1.0 divergence logged as CONTR-ISS-001. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["inKindDescription", "text", "No", "—", "—", "FU-RECORD-DAT-036", [
          { text: "Free-form description of what was given (services, equipment, goods, etc.). Visibility controlled by dynamic-logic rule CONTR-DYN-004 (visible only when contributionType = Donation AND giftType = In-Kind). " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
        ["inKindValuationBasis", "text", "No", "—", "—", "FU-RECORD-DAT-037", [
          { text: "Free-form note on how the dollar amount in the amount field was determined (donor-declared, market-rate equivalent, professional appraisal, etc.). Visibility controlled by dynamic-logic rule CONTR-DYN-005 (visible only when contributionType = Donation AND giftType = In-Kind). " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
      ],
    },
    {
      heading: "3.3 Grant-Specific Custom Field",
      headingLevel: 2,
      intro: "This single field is visible only when contributionType = Grant. The applicationDate field — although also Grant-relevant — is placed in Section 3.1 (Shared Custom Fields) per CONTR-DEC-006, with its visibility controlled by dynamic-logic rule CONTR-DYN-001.",
      fields: [
        ["nextGrantDeadline", "date", "No", "—", "—", "FU-RECORD-DAT-038", [
          { text: "The next pending grant-related obligation, typically a report deadline. The Coordinator may also use this field for any other grant-related deadline they want surfaced (renewal opportunity, follow-up submission, reapplication window, etc.). Visibility controlled by dynamic-logic rule CONTR-DYN-002 (visible only when contributionType = Grant). Used by the FU-STEWARD Grant Deadlines sweep list per FU-STEWARD-REQ-009. Updated by FU-RECORD at Grant creation and by FU-STEWARD during sweep per FU-STEWARD-REQ-005 and FU-STEWARD-DAT-025. " },
          { bold: "Domains: " }, { text: "FU." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "The Contribution entity has three relationships to other entities. All three are manyToOne from the Contribution side. Relationship implementation details (link names, labels) will be finalized during YAML generation.",
  relationships: [
    ["Contribution \u2192 Contact (donor)", "Contact", "manyToOne", "FU-RECORD-DAT-023", "FU"],
    ["Contribution \u2192 Account (donor organization)", "Account", "manyToOne", "FU-RECORD-DAT-024", "FU"],
    ["Contribution \u2192 Fundraising Campaign", "Fundraising Campaign", "manyToOne", "FU-RECORD-DAT-031", "FU"],
  ],
  relationshipNotes: [
    { label: "Note on donorContact:", text: " Every Contribution made by an individual donor links to one Contact via donorContact. The linked Contact must already have contactType including Donor before the Contribution can be created per FU-RECORD-REQ-003. Mutually exclusive with donorAccount per FU-RECORD-REQ-002. Drives the Contact.donorLifetimeGiving rollup calculation per FU-RECORD-REQ-012 (sum of amount across linked Contributions in Received status). The inverse oneToMany side is reflected on the Contact entity giving-history rollup per FU-RECORD-REQ-024." },
    { label: "Note on donorAccount:", text: " Every Contribution made by an organizational donor links to one Account via donorAccount. The linked Account must already have accountType including Donor/Sponsor before the Contribution can be created per FU-RECORD-REQ-003. Mutually exclusive with donorContact per FU-RECORD-REQ-002. Drives the Account.funderLifetimeGiving rollup calculation per FU-RECORD-REQ-013 (sum of amount across linked Contributions in Received status). The inverse oneToMany side is reflected on the Account entity giving-history rollup per FU-RECORD-REQ-024." },
    { label: "Note on campaign:", text: " Optional link from a Contribution to one Fundraising Campaign per FU-RECORD-REQ-005. Settable, changeable, and clearable at any time, regardless of Campaign status — no system gating against Completed or Cancelled Campaigns. Drives the Fundraising Campaign.totalRaised rollup calculation per FU-RECORD-REQ-011 (sum of amount across linked Contributions in Received status). The inverse oneToMany side is defined on the Fundraising Campaign Entity PRD (the next Phase 5 deliverable)." },
    { label: "Note on Contact \u2194 Account navigation:", text: " FU-RECORD reads the existing Contact \u2194 Account relationship per FU-RECORD-DAT-016 and FU-RECORD v1.2 Section 7.3 to navigate from a donor Account to its linked staff Contacts (for example, to identify the relationship contact for an acknowledgment letter). This is a read-only navigation across an existing relationship — Contribution does not own, create, or modify the Contact \u2194 Account relationship — so it is not listed as a Contribution relationship. The relationship is owned by the Contact and Account Entity PRDs." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "Dynamic logic visibility rules on the Contribution entity are driven by the contributionType discriminator and the giftType field. All five rules flow from FU-RECORD-REQ-006 (type-specific visibility) and the field definitions in FU-RECORD v1.2 Section 8.3.",
  dynamicLogicSections: [
    { heading: "5.1 CONTR-DYN-001 — applicationDate visibility", paragraphs: [
      { label: "Trigger: ", text: "contributionType = Grant" },
      { label: "Action: ", text: "Show applicationDate. Hide for all other contributionType values." },
      { label: "Source: ", text: "FU-RECORD-REQ-006, FU-RECORD-DAT-029" },
    ]},
    { heading: "5.2 CONTR-DYN-002 — nextGrantDeadline visibility", paragraphs: [
      { label: "Trigger: ", text: "contributionType = Grant" },
      { label: "Action: ", text: "Show nextGrantDeadline. Hide for all other contributionType values." },
      { label: "Source: ", text: "FU-RECORD-REQ-006, FU-RECORD-DAT-038" },
    ]},
    { heading: "5.3 CONTR-DYN-003 — giftType visibility", paragraphs: [
      { label: "Trigger: ", text: "contributionType = Donation" },
      { label: "Action: ", text: "Show giftType. Hide for all other contributionType values." },
      { label: "Source: ", text: "FU-RECORD-REQ-006, FU-RECORD-DAT-035" },
    ]},
    { heading: "5.4 CONTR-DYN-004 — inKindDescription visibility", paragraphs: [
      { label: "Trigger: ", text: "contributionType = Donation AND giftType = In-Kind" },
      { label: "Action: ", text: "Show inKindDescription. Hide otherwise." },
      { label: "Source: ", text: "FU-RECORD-REQ-006, FU-RECORD-DAT-036" },
    ]},
    { heading: "5.5 CONTR-DYN-005 — inKindValuationBasis visibility", paragraphs: [
      { label: "Trigger: ", text: "contributionType = Donation AND giftType = In-Kind" },
      { label: "Action: ", text: "Show inKindValuationBasis. Hide otherwise." },
      { label: "Source: ", text: "FU-RECORD-REQ-006, FU-RECORD-DAT-037" },
    ]},
    { heading: "5.6 Visibility versus existence", paragraphs: [
      { text: "Dynamic-logic visibility hides the field from the layout when the trigger is not satisfied; it does not delete the field's value. If a Coordinator records a Donation with giftType = In-Kind plus inKindDescription and inKindValuationBasis, then later changes contributionType to Sponsorship, the inKindDescription and inKindValuationBasis values persist in the database but are hidden from the layout. The same is true for changes to giftType. This is the standard platform behavior for dynamic-logic visibility rules and does not require special handling. The Coordinator can recover the values by reverting the trigger field to its prior value. See Implementation Note 5." },
    ]},
    { heading: "5.7 Automatic field updates", paragraphs: [
      { text: "No Contribution field is automatically populated or updated by dynamic logic on the Contribution record itself. The three rollup fields driven by Contribution data — Contact.donorLifetimeGiving, Account.funderLifetimeGiving, and Fundraising Campaign.totalRaised — live on other entities and are documented in those entities' Entity PRDs (see Implementation Note 10). The donor-lifecycle activation rule per FU-PROSPECT-REQ-006 and FU-RECORD-REQ-010 (transitioning donorStatus or funderStatus to Active on Contribution creation) updates fields on Contact or Account, not on Contribution, and is documented in the Contact and Account Entity PRDs." },
    ]},
    { heading: "5.8 Mutual exclusivity treated as save-time invariant", paragraphs: [
      { text: "Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated on every Contribution record. This is a creation-time and edit-time invariant rather than a dynamic-logic visibility rule — both fields are always visible on the layout and the system enforces the one-and-only-one constraint at save. This is documented in Implementation Note 4 rather than as a dynamic-logic rule because the validation pattern is different from visibility (the platform's dynamic-logic engine does not directly model \u201Cexactly one of these\u201D through visibility). See CONTR-DEC-008." },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following five-panel grouping is a recommendation for the Contribution detail view. Final layout is determined during YAML generation. The two type-specific panels (Donation Details and Grant Details) appear at positions 3 and 4 even though only one of them is ever visible at a time on any given record (because contributionType has only one value per record). Dynamic logic hides entire panels when the relevant contributionType condition is not met.",
  layoutPanels: [
    { name: "Panel 1 — Contribution Identification (always visible)", text: "contributionType, status, donorContact, donorAccount, amount, campaign, designation. The seven fields that establish the funding event's identity and primary attributes. Every Contribution record uses every field in this panel regardless of contributionType. donorContact and donorAccount are both always visible with mutual exclusivity enforced at save per Implementation Note 4 (not via dynamic-logic visibility)." },
    { name: "Panel 2 — Lifecycle Dates (always visible)", text: "applicationDate, commitmentDate, expectedPaymentDate, receivedDate. The four date fields that anchor the Contribution's lifecycle. applicationDate's visibility is driven by dynamic-logic rule CONTR-DYN-001 (visible only when contributionType = Grant); the other three are always visible. The panel ordering within the layout follows the typical lifecycle progression — application → commitment → expected payment → received." },
    { name: "Panel 3 — Donation Details (contributionType = Donation)", text: "giftType, inKindDescription, inKindValuationBasis. This panel is hidden in its entirety unless contributionType = Donation. When visible, the in-kind pair (inKindDescription, inKindValuationBasis) appears nested under giftType when giftType = In-Kind, controlled by dynamic-logic rules CONTR-DYN-004 and CONTR-DYN-005." },
    { name: "Panel 4 — Grant Details (contributionType = Grant)", text: "nextGrantDeadline. This panel is hidden in its entirety unless contributionType = Grant. The applicationDate field is intentionally not in this panel (it lives in Panel 2 Lifecycle Dates per CONTR-DEC-006)." },
    { name: "Panel 5 — Acknowledgment and Notes (always visible)", text: "acknowledgmentSent, acknowledgmentDate, notes. The three fields that the Coordinator routinely writes after the funding-event identity is established — the two acknowledgment fields under hybrid ownership (Implementation Note 2), plus the in-record notes field for Contribution-specific narrative. Field-level security on notes follows the record-level visibility rule." },
    { name: "Notes Service (platform-standard surface)", text: "Contribution participates in the Notes Service per FU-RECORD-REQ-020. The Notes Service is a separate cross-domain capability that operates alongside the in-record notes field — both coexist by design (Implementation Note 3). The Notes Service is surfaced through whatever standard mechanism the platform provides for Notes Service-enabled entities (typically a side panel or a tab) rather than as a custom Contribution panel." },
    { name: "Activity Stream (platform-standard surface)", text: "Contribution has Activity Stream enabled per Section 1 Entity Overview. The activity stream is surfaced through the platform's standard mechanism (typically a side panel or a tab) rather than as a custom Contribution panel. The audit trail per FU-RECORD-REQ-014 is typically integrated with the Activity Stream." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Auto-generated name field:", text: " The native name field on the Contribution Base entity is auto-generated and read-only. The format is \u201C{Donor Display Name} — {ContributionType} — {KeyDate}\u201D. Donor Display Name is \u201C{lastName}, {firstName}\u201D from the linked donorContact when populated, or the linked donorAccount's name when populated. KeyDate is selected by status: Received uses receivedDate; Committed uses commitmentDate; Applied uses applicationDate; Pledged uses expectedPaymentDate, falling back to commitmentDate; Unsuccessful uses applicationDate, falling back to commitmentDate; Cancelled uses commitmentDate. If the selected date is not populated, the date segment and its preceding separator are omitted, producing \u201C{Donor Display Name} — {ContributionType}\u201D. Auto-generation re-fires when any of the underlying fields change — for example, when status transitions from Pledged to Received, the KeyDate selector switches from expectedPaymentDate to receivedDate and the name updates accordingly. The exact implementation form (formula expression, before-save hook, scheduled recalculation) is deferred to Phase 9." },
    { label: "2. Hybrid acknowledgment ownership:", text: " The acknowledgmentSent and acknowledgmentDate fields are jointly written by FU-RECORD and FU-STEWARD under a hybrid ownership model documented in FU-RECORD-REQ-015 and FU-STEWARD-REQ-004. FU-RECORD primary path: when a Contribution is recorded, the Coordinator typically sends the acknowledgment communication in the same operational moment and writes acknowledgmentSent = true and acknowledgmentDate to the date the acknowledgment was sent. FU-STEWARD catch-up path: when the Coordinator does not send the acknowledgment at FU-RECORD time, the Contribution surfaces on the FU-STEWARD Acknowledgment-Pending Contributions sweep list (Received Contributions where acknowledgmentSent = false), and during the next sweep the Coordinator sends the missed acknowledgment outside the CRM and writes the same two fields. There is no system-enforced ownership boundary between the two paths — both processes write the same two fields with the same write semantics. The model is operational rather than technical: which process writes the field depends on whether the acknowledgment was sent at the moment of recording or later during a sweep." },
    { label: "3. Notes Service coexists with the in-record notes field:", text: " Per FU-RECORD-REQ-020, Contribution participates in the Notes Service. The Notes Service is a separate cross-domain capability — a free-form, timestamped, attributed, append-only stream available across Contact, Account, Engagement, Session, Event, Fundraising Campaign, and Contribution. The in-record notes field (FU-RECORD-DAT-034) is a wysiwyg field on the Contribution record itself, used for Contribution-specific narrative. The two coexist by design: the Notes Service stream captures event-style activity entries (acknowledgment communications, stewardship interactions, recognition obligation tracking) while the in-record notes field holds the Contribution's own narrative content (multi-payment disbursement detail for Grants, in-kind context, bounced-check explanations, recognition obligations for Sponsorships). Field-level security on both follows the record-level visibility rule per FU-RECORD-REQ-021." },
    { label: "4. Mutual exclusivity of donorContact and donorAccount:", text: " Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated on every Contribution record at creation and on every save thereafter. Both fields are always visible on the layout per Section 6 Panel 1; the system enforces the one-and-only-one constraint at save by rejecting any save where both fields are populated or neither is populated. The exact implementation form (validation expression, before-save hook, layout-level constraint) is deferred to Phase 9." },
    { label: "5. Dynamic-logic visibility hides but does not delete field values:", text: " When dynamic-logic visibility hides a field per Section 5 rules CONTR-DYN-001 through CONTR-DYN-005, the field's value persists in the database. Reverting the trigger field to a value that satisfies the dynamic-logic rule restores the hidden field's prior value to view. This applies to applicationDate, nextGrantDeadline, giftType, inKindDescription, and inKindValuationBasis. This is the standard platform behavior and does not require special handling." },
    { label: "6. Audit trail scope:", text: " Per FU-RECORD-REQ-014, the Contribution audit trail covers status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate. Other Contribution fields (contributionType, designation, campaign, acknowledgmentSent, acknowledgmentDate, giftType, inKindDescription, inKindValuationBasis, nextGrantDeadline, notes) are not audited. The audit trail is surfaced through the platform's standard audit-stream mechanism (typically integrated with the Activity Stream)." },
    { label: "7. Record-level visibility:", text: " Per FU-RECORD-REQ-021, Contribution records — including the in-record notes field — are visible only to the Donor / Sponsor Coordinator, Executive Member, and System Administrator personas. All other personas (including Mentors, Members, Clients, and general staff) have no visibility to Contribution records. The exact implementation form (role-based access control, scope filter, ownership-based filter) is deferred to Phase 9." },
    { label: "8. No deletion; cancellation via status:", text: " Per FU-RECORD-REQ-019, Contribution records are retained permanently regardless of terminal status. Bounced checks, refunded payments, withdrawn commitments, and rescinded awards are handled by editing the existing Contribution record's status (typically transitioning to Cancelled) and recording the reason in notes — not by deleting the record and not by creating an offsetting record. All edits are captured by the audit trail per FU-RECORD-REQ-014. See CONTR-DEC-010." },
    { label: "9. Multi-payment Grant tracking:", text: " Per FU-RECORD-REQ-009, Grants with multiple payments stay in Committed status until the final payment is received; receivedDate is set to the final payment date. Intermediate payment detail (individual tranche amounts, dates, payment references) is recorded in the in-record notes field rather than as separate records. This treatment accepts a fiscal-year reporting trade-off: the entire grant amount is captured as one Contribution in the year of final payment, which is acceptable to CBM's reporting requirements per FU-RECORD v1.2 Section 4.3 design decision. A future-state change to per-tranche record tracking would require a new Contribution Payment child entity and is deferred indefinitely. See CONTR-DEC-009." },
    { label: "10. Rollup calculation scope:", text: " Three rollup fields are calculated from Contribution data and live on other entities. Contact.donorLifetimeGiving — sum of amount across linked Contributions in Received status, scoped by donorContact. Defined in Contact Entity PRD v1.7 Section 3.8 per FU-RECORD-REQ-012. Account.funderLifetimeGiving — sum of amount across linked Contributions in Received status, scoped by donorAccount. Defined in Account Entity PRD v1.8 Section 3.4 per FU-RECORD-REQ-013. Fundraising Campaign.totalRaised — sum of amount across linked Contributions in Received status, scoped by campaign. Defined in Fundraising Campaign Entity PRD (next Phase 5 deliverable) per FU-RECORD-REQ-011. Only Contributions in status = Received count toward all three rollups; Contributions in any other status (Applied, Pledged, Committed, Unsuccessful, Cancelled) contribute zero. The exact implementation form (database-side rollup, formula field, scheduled recalculation) is deferred to Phase 9." },
    { label: "11. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["CONTR-ISS-001", "FU-REPORT v1.0 Section 7.3 lists giftType enum values (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other) that diverge from the FU-RECORD v1.2 Section 8.3 authoritative values (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other) adopted by this Entity PRD per Section 3.2. FU-REPORT only reads giftType as a display field on Annual Donor Giving Summary line items \u2014 it does not drive any defined-report logic \u2014 so the divergence is a documentation accuracy issue rather than a functional defect. Resolution path: carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 in the next FU domain update cycle."],
  ],

  openIssuesNote: { label: "Note on closed-by-design items: ", text: "The following items might appear to be open issues but are decided in this PRD and recorded in Section 9 Decisions Made rather than carried forward: contributionType three-value enum (CONTR-DEC-002, supersedes Entity Inventory v1.5's four-value list); Pledged status semantics (CONTR-DEC-002, Pledged is a status not a contributionType, no separate Pledge entity, no parentPledge link); In-Kind handling (CONTR-DEC-003, via giftType = In-Kind on Donations only, no separate In-Kind contributionType value, no in-kind fields on Sponsorships); acknowledgment hybrid ownership (CONTR-DEC-004, two fields under joint FU-RECORD and FU-STEWARD ownership, no separate Acknowledgment entity, EI-ISS-001 resolved). The Entity Inventory v1.5 will be updated in the Phase 7 reconciliation step that produces the FU Domain PRD; no separate carry-forward request is issued from this Entity PRD." },

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["CONTR-DEC-001", "Version 1.0 baseline. The Contribution Entity PRD is established at v1.0 as the first Entity PRD for the Contribution custom Base entity. Eighteen custom fields are defined, plus four native fields. Five dynamic-logic rules and eleven implementation notes are documented. First-pass production from FU-RECORD v1.2, FU-STEWARD v1.0, FU-REPORT v1.0, the FU Domain Overview v1.0, Contact Entity PRD v1.7, Account Entity PRD v1.8, the Entity Inventory v1.5, and the Master PRD v2.5."],
    ["CONTR-DEC-002", "contributionType has three values (Donation, Sponsorship, Grant), not four. Pledged is treated as a status value rather than a contributionType value. There is no separate Pledge entity, no parentPledge self-referential link, and no installment-tracking child entity. Rationale: FU-RECORD v1.2 supersedes Entity Inventory v1.5 on this point. Pledged-as-status is operationally simpler and matches the canonical Donation workflow path (a Pledged Donation that later transitions to Received). The FU Domain Overview's Pledge-specific working position (totalPledgeAmount, parentPledge for installment Donations) is not adopted. Source: FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-021), FU-RECORD v1.2 Section 4.1 workflow narrative, Entity Inventory v1.5 (superseded)."],
    ["CONTR-DEC-003", "In-kind handling is via giftType = In-Kind on Donations, with the inKindDescription and inKindValuationBasis pair surfaced via nested dynamic logic. There is no separate In-Kind contributionType value, no in-kind fields on Sponsorship Contributions, and no Sponsorship-specific in-kind capture. In-kind Sponsorships are recorded narratively in the in-record notes field per FU-RECORD v1.2 Section 4.2. Rationale: FU-RECORD v1.2 design decision. The narrative-only treatment for in-kind Sponsorships accepts a small reporting trade-off (Sponsorship in-kind values are not aggregated by structured fields) in exchange for substantially simpler entity structure. Source: FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-035 through DAT-037), FU-RECORD v1.2 Section 4.2, FU-RECORD-REQ-016."],
    ["CONTR-DEC-004", "Acknowledgment is captured via two fields (acknowledgmentSent, acknowledgmentDate) on every Contribution under a hybrid ownership model: FU-RECORD primary write at Contribution creation, FU-STEWARD catch-up write during the sweep. There is no separate Acknowledgment entity, no taxReceiptRequired field, and no acknowledgmentMethod enum. EI-ISS-001 (the original Entity Inventory open issue on tax-receipt and acknowledgment modeling) is resolved by this decision. Rationale: FU-RECORD v1.2 design decision, formalized in FU-RECORD-REQ-015 and FU-STEWARD-REQ-004. The model is leaner than the Fundraising Domain Overview's working position (which proposed three Donation-only fields including taxReceiptRequired) and matches the operational reality that most acknowledgments are sent in the same moment as Contribution recording. Source: FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-032, DAT-033), FU-RECORD-REQ-015, FU-STEWARD-REQ-004, EI-ISS-001 (now resolved)."],
    ["CONTR-DEC-005", "The native name field is auto-generated from \u201C{Donor Display Name} — {ContributionType} — {KeyDate}\u201D with status-driven KeyDate selection (Received uses receivedDate; Committed uses commitmentDate; Applied uses applicationDate; Pledged uses expectedPaymentDate, falling back to commitmentDate; Unsuccessful uses applicationDate, falling back to commitmentDate; Cancelled uses commitmentDate). If the selected date is not populated, the date segment and its preceding separator are omitted. Rationale: the FU-RECORD process documents do not specify a name format because the field is platform-native rather than domain-defined, but every Custom Base entity needs a populated name field. Auto-generation from existing fields gives a deterministic, audit-friendly value without operator effort and matches the Dues Entity PRD precedent for auto-generated name fields. Source: Dues Entity PRD precedent. Discussed and approved during the v1.0 authoring session."],
    ["CONTR-DEC-006", "applicationDate is placed in Section 3.1 (Shared Custom Fields) with visibility controlled by Section 5 dynamic-logic rule CONTR-DYN-001 (visible only when contributionType = Grant), rather than in Section 3.3 (Grant-Specific Custom Fields). Rationale: matches the FU-RECORD v1.2 Section 8.3 placement. The field's semantic shape (a date for an application or request) is conceptually generalizable beyond Grants, even though the dynamic-logic rule restricts current visibility to Grants. Source: FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-029), FU-RECORD-REQ-006."],
    ["CONTR-DEC-007", "giftType enum values are Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other (the FU-RECORD v1.2 Section 8.3 list). FU-REPORT v1.0 Section 7.3's divergent list (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other) is logged as CONTR-ISS-001 for carry-forward to FU-REPORT in the next FU update cycle. The session prompt's six-value list (Cash, Check, Credit Card, In-Kind, Stock, Other) is also superseded; no action required because the session prompt is a working document. Rationale: FU-RECORD owns the Contribution field definitions per the source-document hierarchy. FU-REPORT only reads giftType as a display field on Annual Donor Giving Summary line items (it does not drive any defined-report logic), so the divergence is a documentation accuracy issue rather than a functional defect. Source: FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-035), FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 (divergent — pending update)."],
    ["CONTR-DEC-008", "Mutual exclusivity of donorContact and donorAccount is documented as a save-time invariant in Section 7 Implementation Note 4 rather than as a Section 5 dynamic-logic visibility rule. Both fields are always visible on the layout per Section 6 Panel 1; the system rejects any save where both fields are populated or neither is populated. Rationale: the validation pattern is different from visibility (the platform's dynamic-logic engine does not directly model \u201Cexactly one of these\u201D through visibility rules). Implementation-mechanism choice is deferred to Phase 9. Source: FU-RECORD-REQ-002."],
    ["CONTR-DEC-009", "Multi-payment Grant treatment retains a single Contribution record across the entire disbursement period: status remains Committed until the final payment is received, receivedDate is set to the final payment date, and intermediate payment detail (individual tranche amounts, dates, payment references) is recorded in the in-record notes field rather than as separate records. The fiscal-year reporting trade-off (entire grant amount captured in the year of final payment) is accepted. Rationale: FU-RECORD v1.2 Section 4.3 design decision. Acceptable to CBM's reporting requirements. A future-state change to per-tranche record tracking would require a new Contribution Payment child entity and is deferred indefinitely. Source: FU-RECORD v1.2 Section 4.3, FU-RECORD-REQ-009."],
    ["CONTR-DEC-010", "Cancellation, bounced checks, refunds, and rescinded awards are handled by editing the existing Contribution record's status to Cancelled and recording the reason in notes — not by deletion and not by creating offsetting records. Contribution records are retained permanently regardless of terminal status. Rationale: edit-with-audit-trail is operationally simpler than offsetting records and gives a complete history of the funding event without ambiguity about which record represents the current state. Source: FU-RECORD-REQ-018, FU-RECORD-REQ-019, FU-RECORD v1.2 Section 4.1 (Donation workflow), Section 4.3 (Grant workflow), Section 5.5 (Amendments and Corrections)."],
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
  c.push(p("Custom fields must be created via YAML program files. Fields are organized into three groups by visibility: shared fields (visible regardless of contributionType), Donation-specific fields, and Grant-specific fields."));

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
