// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Engagement Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js
// Entity: Engagement (Custom — Base Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-Engagement-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageBreak, TabStopType, TabStopPosition, LevelFormat,
} = require("docx");


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Engagement
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Engagement",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-02-26 22:30",
  sourceDocuments: "Master PRD v2.0, Entity Inventory v1.0, MN Domain PRD v1.0, Contact Entity PRD v1.0, Account Entity PRD v1.0",
  outputFile: "/home/claude/Engagement-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Engagement",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Engagement",
    labelPlural: "Engagements",
    activityStream: "Yes",
    contributingDomains: "Mentoring (MN)",
    discriminatorField: null,
    discriminatorValues: null,
  },

  overviewText: [
    "The Engagement entity represents the mentoring relationship linking a client organization to a volunteer mentor. It is a single-domain custom entity owned exclusively by the Mentoring (MN) domain and carries the heaviest field set in the domain, with fields defined across all five MN process documents.",
    "Engagement tracks the full lifecycle from client intake through formal closure or system-initiated abandonment. Status transitions are governed by all five processes: Client Intake (MN-INTAKE), Mentor Matching (MN-MATCH), Engagement Management (MN-ENGAGE), Activity Monitoring (MN-INACTIVE), and Engagement Closure (MN-CLOSE).",
    "Engagement has no type discriminator \u2014 all records follow the same field structure and lifecycle. The entity is identified by an auto-generated name field in the format \u201C{Client Name}-{Mentor Name}-{Start Year}\u201D (e.g., \u201CAcme Corp-Smith-2026\u201D).",
  ],

  overviewNotes: [
    { label: "Domain coverage:", text: " This entity is fully defined by the Mentoring (MN) domain. All five MN process documents and the reconciled MN Domain PRD v1.0 provide field-level detail. No other domains contribute fields to this entity." },
    { label: "Deferred process:", text: " Client Satisfaction Tracking (MN-SURVEY) is defined in the Master PRD as an Enhancement-tier process and is not yet specified. If MN-SURVEY adds fields to Engagement (e.g., Client Satisfaction Rating), this Entity PRD will require an update." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on the Engagement entity because of its Base entity type. These fields are not created by YAML. They are documented here so process documents and Entity PRDs can reference them correctly, and to prevent duplicate field creation during YAML generation.",
  nativeFields: [
    ["name", "varchar", "Auto-generated: \u201C{Client Name}-{Mentor Name}-{Start Year}\u201D. Provides a human-readable label for list views. System-populated, read-only. See ENG-DEC-001.", "System"],
    ["description", "text", "Hidden from layouts. Redundant with the custom mentoringNeedsDescription and engagementNotes fields. See ENG-DEC-002.", "Not used"],
  ],
  nativeFieldNotes: [
    { label: "Note on name:", text: " The auto-generated name format provides a scannable label for list views and search results without burdening users. The name is system-populated when the Engagement is created and updated if the Assigned Mentor changes. The format is \u201C{Client Organization Business Name}-{Assigned Mentor Last Name}-{Year of Engagement Creation}\u201D." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldGroups: [
    {
      heading: "3.1 Lifecycle and Status",
      headingLevel: 2,
      intro: "Fields governing the engagement lifecycle, scheduling, and temporary pause state.",
      fields: [
        ["engagementStatus", "enum", "Yes", "Submitted, Declined, Pending Acceptance, Assigned, Active, On-Hold, Dormant, Inactive, Abandoned, Completed", "Submitted", "MN-INTAKE-DAT-017", [
          { text: "The current lifecycle stage of the engagement. Created at Submitted; transitions governed by all five MN processes. Full transition rules documented in each process. " },
          { bold: "Domains: " }, { text: "MN (all processes). " },
          { bold: "Implementation: " }, { text: "audited." },
        ]],
        ["meetingCadence", "enum", "Yes", "Weekly, Bi-Weekly, Monthly, As Needed", "\u2014", "MN-ENGAGE-DAT-014", [
          { text: "Expected meeting frequency. Set by the mentor after the first session. Drives inactivity monitoring thresholds in MN-INACTIVE. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE)." },
        ]],
        ["holdEndDate", "date", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-036", [
          { text: "Expected end date for the On-Hold period. Required when engagementStatus = On-Hold. Used by Activity Monitoring as the comparison date for On-Hold engagements instead of Last Session Date. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = On-Hold." },
        ]],
      ],
    },
    {
      heading: "3.2 Mentoring Context",
      headingLevel: 2,
      intro: "Fields describing what the client seeks from the engagement. Set during Client Intake and referenced during Mentor Matching.",
      fields: [
        ["mentoringFocusAreas", "multiEnum", "No", "TBD \u2014 see ENG-ISS-001", "\u2014", "MN-INTAKE-DAT-018", [
          { text: "Areas where the client seeks mentoring assistance. Primary matching criterion \u2014 compared against the Mentor\u2019s Mentoring Focus Areas profile field. Values must align with the corresponding field on the Contact entity (Mentor-specific). " },
          { bold: "Domains: " }, { text: "MN (INTAKE, MATCH, ENGAGE)." },
        ]],
        ["mentoringNeedsDescription", "wysiwyg", "Yes", "\u2014", "\u2014", "MN-INTAKE-DAT-019", [
          { text: "The client\u2019s own description of what they are looking for in this engagement. Entered during intake; referenced during mentor matching and throughout the engagement. " },
          { bold: "Domains: " }, { text: "MN (INTAKE, MATCH, ENGAGE)." },
        ]],
      ],
    },
    {
      heading: "3.3 Notes",
      headingLevel: 2,
      intro: null,
      fields: [
        ["engagementNotes", "wysiwyg", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-016", [
          { text: "Private notes by the mentor. Restricted to administrators and assigned mentors. Never visible to clients. Also used to document On-Hold reasons and any closure narrative at the mentor\u2019s discretion. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE). " },
          { bold: "Implementation: " }, { text: "Field-level access control: visible only to assigned mentors and administrators." },
        ]],
      ],
    },
    {
      heading: "3.4 Session Roll-Up Analytics",
      headingLevel: 2,
      intro: "These fields are stored on the Engagement record and updated by a workflow that fires when a Session record is created, completed, or modified. All five fields are read-only and not user-editable. See ENG-DEC-003.",
      fields: [
        ["totalSessions", "int", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-018", [
          { text: "Total count of completed sessions for this engagement. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE). " },
          { bold: "Implementation: " }, { text: "workflow-updated, readOnly." },
        ]],
        ["totalSessionsLast30Days", "int", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-019", [
          { text: "Count of completed sessions in the last 30 days. Used by Activity Monitoring for engagement health assessment. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE). " },
          { bold: "Implementation: " }, { text: "workflow-updated, readOnly." },
        ]],
        ["lastSessionDate", "date", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-020", [
          { text: "Date of the most recently completed session. Primary comparison date for inactivity monitoring on Active engagements. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE). " },
          { bold: "Implementation: " }, { text: "workflow-updated, readOnly." },
        ]],
        ["totalSessionHours", "float", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-021", [
          { text: "Total hours of mentoring delivered. Calculated from the Duration field across all completed Session records. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE). " },
          { bold: "Implementation: " }, { text: "workflow-updated, readOnly." },
        ]],
        ["nextSessionDateTime", "datetime", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-022", [
          { text: "Scheduled date and time of the next meeting. Updated automatically when set on a completed Session. Resets the inactivity monitoring clock. " },
          { bold: "Domains: " }, { text: "MN (ENGAGE, INACTIVE). " },
          { bold: "Implementation: " }, { text: "workflow-updated, readOnly." },
        ]],
      ],
    },
    {
      heading: "3.5 Closure",
      headingLevel: 2,
      intro: "Fields populated during or at the point of engagement closure.",
      fields: [
        ["closeDate", "date", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-011", [
          { text: "Date the engagement was formally closed. System-populated on transition to Declined, Abandoned, or Completed. Retained on the record if the engagement is later reopened. " },
          { bold: "Domains: " }, { text: "MN (INTAKE, INACTIVE, CLOSE). " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly. Dynamic logic: visible when engagementStatus in [Declined, Abandoned, Completed]." },
        ]],
        ["closeReason", "enum", "No", "Goals Achieved, Client Withdrew, Inactive / No Response, Other, TBD (see ENG-ISS-002)", "\u2014", "MN-CLOSE-DAT-012", [
          { text: "Reason for closure. Required when transitioning to Completed. \u201CInactive / No Response\u201D is set automatically for Abandoned engagements by the Activity Monitoring process. Retained on the record if the engagement is later reopened. " },
          { bold: "Domains: " }, { text: "MN (INACTIVE, CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus in [Declined, Abandoned, Completed]." },
        ]],
      ],
    },
    {
      heading: "3.6 Engagement Outcomes",
      headingLevel: 2,
      intro: "Outcome metrics captured during the engagement lifecycle. These fields are accessible throughout the engagement and are prompted for review at closure, but completion is encouraged rather than enforced.",
      fields: [
        ["newBusinessStarted", "bool", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-013", [
          { text: "Whether the engagement helped the client start a new business. Accessible throughout the engagement lifecycle; closure is the final prompt for review. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
        ["newLocationOpened", "bool", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-014", [
          { text: "Whether the engagement resulted in a new business location. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
        ["significantRevenueIncrease", "bool", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-015", [
          { text: "Whether the engagement resulted in a significant revenue increase. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
        ["revenueIncreasePercentage", "float", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-016", [
          { text: "Percentage increase in revenue. Independent of the significantRevenueIncrease yes/no field \u2014 both may be populated. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
        ["significantEmploymentIncrease", "bool", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-017", [
          { text: "Whether the engagement resulted in a significant employment increase. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
        ["employmentIncreasePercentage", "float", "No", "\u2014", "\u2014", "MN-CLOSE-DAT-018", [
          { text: "Percentage increase in employees. Independent of the significantEmploymentIncrease yes/no field \u2014 both may be populated. " },
          { bold: "Domains: " }, { text: "MN (CLOSE). " },
          { bold: "Implementation: " }, { text: "Dynamic logic: visible when engagementStatus = Completed." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "All relationships involving the Engagement entity. Engagement is the central entity in the Mentoring domain, linking client organizations, mentors, client contacts, and session records. Relationship implementation details (link names, labels) will be finalized during YAML generation.",
  relationships: [
    ["Client Organization \u2192 Engagement", "Account", "manyToOne", "MN-INTAKE", "MN"],
    ["Assigned Mentor \u2192 Engagement", "Contact", "manyToOne", "MN-MATCH-DAT-019", "MN"],
    ["Primary Engagement Contact \u2192 Engagement", "Contact", "manyToOne", "MN-INTAKE-DAT-020", "MN"],
    ["Engagement Contacts \u2192 Engagement", "Contact", "manyToMany", "MN-MATCH-DAT-021", "MN"],
    ["Additional Mentors \u2192 Engagement", "Contact", "manyToMany", "MN-ENGAGE-DAT-015", "MN"],
    ["Engagement \u2192 Sessions", "Session", "oneToMany", "MN-ENGAGE", "MN"],
  ],
  relationshipNotes: [
    { label: "Note on Client Organization:", text: " The Account \u2192 Engagement relationship is defined as oneToMany from the Account side (per Account Entity PRD). A single Client Organization may have multiple Engagements over time (serial or concurrent). Each Engagement belongs to exactly one Client Organization." },
    { label: "Note on Assigned Mentor:", text: " Each Engagement has exactly one Assigned Mentor (the primary volunteer mentor). Set during Mentor Matching (MN-MATCH). The Contact Entity PRD defines the inverse relationship: a single Mentor may be the Assigned Mentor on multiple Engagements." },
    { label: "Note on Primary Engagement Contact:", text: " The single client contact who is the primary point of contact for this engagement. Auto-set to the submitting contact at creation. All system-generated communications are addressed TO this contact; other Engagement Contacts (if any) are CC\u2019d. Changeable by the mentor or Client Administrator. Distinct from the Account-level Primary Contact (which is a bool on the Contact-to-Account relationship per CON-DEC-001)." },
    { label: "Note on multiple Contact relationships:", text: " Engagement has four separate relationships to the Contact entity: Assigned Mentor, Primary Engagement Contact, Engagement Contacts, and Additional Mentors. These are distinct relationships with different cardinalities and purposes. A single Contact may appear in multiple roles (e.g., a Contact could be both a Primary Engagement Contact on one Engagement and an Engagement Contact on another)." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "Dynamic logic visibility rules on the Engagement entity are status-driven rather than type-driven (Engagement has no discriminator). Fields and panels are shown or hidden based on the engagementStatus value.",
  dynamicLogicSections: [
    { heading: "5.1 On-Hold Fields", paragraphs: [
      { label: "Condition:", text: " engagementStatus = On-Hold" },
      { label: "Show:", text: " holdEndDate" },
    ]},
    { heading: "5.2 Closure Fields", paragraphs: [
      { label: "Condition:", text: " engagementStatus in [Declined, Abandoned, Completed]" },
      { label: "Show:", text: " closeDate, closeReason" },
    ]},
    { heading: "5.3 Outcome Fields", paragraphs: [
      { label: "Condition:", text: " engagementStatus = Completed" },
      { label: "Show:", text: " newBusinessStarted, newLocationOpened, significantRevenueIncrease, revenueIncreasePercentage, significantEmploymentIncrease, employmentIncreasePercentage" },
      { text: "The Domain PRD states outcome fields are \u201Caccessible throughout the lifecycle\u201D with closure as \u201Cthe final prompt.\u201D Showing them only at Completed simplifies the UI. If CBM wants them visible earlier (e.g., at Active), the dynamic logic rule can be broadened during YAML generation." },
    ]},
    { heading: "5.4 Always Visible", paragraphs: [
      { text: "The following fields have no dynamic logic conditions and are always visible: engagementStatus, meetingCadence, mentoringFocusAreas, mentoringNeedsDescription, engagementNotes, totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime. All relationship links (Client Organization, Assigned Mentor, Primary Engagement Contact, Engagement Contacts, Additional Mentors, Sessions) are also always visible." },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following panel/tab grouping is a recommendation for the Engagement detail view. Final layout is determined during YAML generation. Dynamic logic hides entire panels when the relevant engagementStatus condition is not met.",
  layoutPanels: [
    { name: "Overview Panel (always visible)", text: "engagementStatus, Client Organization link, Assigned Mentor link, Primary Engagement Contact link, mentoringFocusAreas, mentoringNeedsDescription, meetingCadence." },
    { name: "Session Analytics Panel (always visible)", text: "totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime. All fields are read-only." },
    { name: "People Panel (always visible)", text: "Engagement Contacts (manyToMany), Additional Mentors (manyToMany). Relationship panels showing linked Contact records." },
    { name: "Sessions Panel (always visible)", text: "Sessions (oneToMany). Relationship panel showing linked Session records." },
    { name: "Notes Panel (always visible, access-controlled)", text: "engagementNotes. Visible only to assigned mentors and administrators. Hidden from clients." },
    { name: "On-Hold Panel (engagementStatus = On-Hold)", text: "holdEndDate. Hidden when not On-Hold." },
    { name: "Closure Panel (engagementStatus in [Declined, Abandoned, Completed])", text: "closeDate, closeReason." },
    { name: "Outcomes Panel (engagementStatus = Completed)", text: "newBusinessStarted, newLocationOpened, significantRevenueIncrease, revenueIncreasePercentage, significantEmploymentIncrease, employmentIncreasePercentage." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Auto-generated name:", text: " The native name field is system-populated in the format \u201C{Client Organization Business Name}-{Assigned Mentor Last Name}-{Year of Engagement Creation}\u201D (e.g., \u201CAcme Corp-Smith-2026\u201D). Updated if the Assigned Mentor changes. Read-only \u2014 not user-editable." },
    { label: "2. Status transition rules:", text: " The engagementStatus field has 10 values with defined transitions across five processes. Key transitions: Submitted \u2192 Declined (INTAKE denial), Submitted \u2192 Pending Acceptance (MATCH nomination), Pending Acceptance \u2192 Assigned (mentor accepts) or Pending Acceptance \u2192 Submitted (mentor declines), Assigned \u2192 Active (first Session completed, automatic), Active \u2192 On-Hold (manual pause), On-Hold \u2192 Active (manual resume), Active/On-Hold \u2192 Dormant \u2192 Inactive \u2192 Abandoned (INACTIVE escalation, automatic), Active/On-Hold/Dormant/Inactive \u2192 Completed (manual closure via CLOSE), Completed \u2192 Active (reopening, rare). The engagementStatus field should be audited to maintain a complete transition history." },
    { label: "3. Workflow-updated roll-up fields:", text: " Five fields (totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime) are stored on the Engagement record and updated by a workflow that fires on Session status changes. totalSessionsLast30Days requires periodic recalculation (e.g., nightly scheduled job) since its value changes with calendar time, not just session events. All five fields are read-only." },
    { label: "4. Close Date auto-population:", text: " closeDate is system-populated with today\u2019s date when engagementStatus transitions to Declined, Abandoned, or Completed. For Abandoned, this is set automatically by the Activity Monitoring process. Retained on the record if the engagement is later reopened." },
    { label: "5. Close Reason auto-population:", text: " When the Activity Monitoring process transitions an engagement to Abandoned, closeReason is automatically set to \u201CInactive / No Response.\u201D For manual closure (Completed), the user must select a Close Reason before the status change is accepted." },
    { label: "6. Field-level access control:", text: " engagementNotes is restricted to administrators and assigned mentors (including Additional Mentors). Never visible to clients. If client portal access is implemented in the future, this field must be excluded from client-facing views." },
    { label: "7. Outcome field accessibility:", text: " The Domain PRD states outcome fields are \u201Caccessible throughout the lifecycle\u201D with closure as \u201Cthe final prompt.\u201D This Entity PRD recommends showing them only at Completed status via dynamic logic for a cleaner UI. If CBM prefers earlier access (e.g., during Active status), the dynamic logic rule can be adjusted during YAML generation without changing the field definitions." },
    { label: "8. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["ENG-ISS-001", "Mentoring Focus Areas: complete list of allowed values not defined. Must align between the Engagement-level mentoringFocusAreas field and the Mentor Contact-level mentoringFocusAreas field. Carried forward from MN-INTAKE-ISS-001 and CON-ISS-005."],
    ["ENG-ISS-002", "Close Reason: complete list of allowed values needs finalization. Current values are Goals Achieved, Client Withdrew, Inactive / No Response, and Other. Additional values may be needed per organizational requirements. Carried forward from MN-CLOSE-ISS-001."],
    ["ENG-ISS-003", "Additional engagement outcome metrics may be needed beyond the six defined outcome fields. CBM program leadership to determine if additional metrics are required for analytics and funder reporting. Carried forward from MN-CLOSE-ISS-002."],
    ["ENG-ISS-004", "Survey response tracking: Closed Engagement Survey responses may need to be captured as a CRM field on the Engagement entity or handled by an external survey tool. Decision deferred to MN-SURVEY process definition. Carried forward from MN-CLOSE-ISS-003."],
  ],

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["ENG-DEC-001", "Native name field auto-generated as \u201C{Client Name}-{Mentor Name}-{Start Year}\u201D. System-populated and read-only. Provides a human-readable label for list views without burdening users. Updated if the Assigned Mentor changes."],
    ["ENG-DEC-002", "Native description field hidden from layouts. The custom mentoringNeedsDescription and engagementNotes fields cover the relevant use cases. Hiding description avoids user confusion about where to put notes."],
    ["ENG-DEC-003", "Session roll-up fields (totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime) are workflow-updated stored fields, not formula fields. Values are stored on the Engagement record and updated by a workflow that fires on Session status changes. This approach is more portable across CRM platforms than cross-entity roll-up formulas."],
    ["ENG-DEC-004", "No Client Satisfaction Rating field on the Engagement entity. Client Satisfaction Tracking (MN-SURVEY) is an Enhancement-tier process not yet specified. If MN-SURVEY adds fields to Engagement, this Entity PRD will be updated. The Closed Engagement Survey (MN-CLOSE) is a separate mechanism handled outside the Engagement entity. See ENG-ISS-004."],
    ["ENG-DEC-005", "Single notes field (engagementNotes) for all engagement narrative. No separate Closure Notes field. The mentor may add closure narrative to engagementNotes at their discretion. If CBM later requires a dedicated closure notes field, it becomes a scope addition."],
    ["ENG-DEC-006", "On-Hold is one of the 10 engagementStatus enum values, not a separate boolean flag. holdEndDate uses dynamic logic visibility (visible when engagementStatus = On-Hold) and is conditionally required when On-Hold."],
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// RENDERING ENGINE — Do not modify below this line
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

function labeledBullet(item) {
  return new Paragraph({
    children: [r(item.label, { bold: true }), r(item.text || "")],
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
  });
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
  c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group."));

  E.customFieldGroups.forEach(group => {
    if (group.heading) {
      const lvl = group.headingLevel === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2;
      c.push(heading(group.heading, lvl));
    }
    if (group.intro) c.push(p(group.intro));
    if (group.subheading) {
      c.push(p([r(group.subheading, { bold: true, color: COLORS.titleColor })]));
    }
    if (group.fields && group.fields.length > 0) {
      c.push(fieldTable(group.fields));
      c.push(p(""));
    }
    if (group.bulletItems) {
      group.bulletItems.forEach(item => c.push(labeledBullet(item)));
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
    if (section.bullets) section.bullets.forEach(b => c.push(labeledBullet(b)));
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
