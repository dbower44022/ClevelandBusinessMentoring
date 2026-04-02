// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Session Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js
// Entity: Session (Custom — Event Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-Session-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Session
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Session",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-02-26 22:00",
  sourceDocuments: "Master PRD v2.0, Entity Inventory v1.0, MN Domain PRD v1.0, Engagement Entity PRD v1.0, Contact Entity PRD v1.0",
  outputFile: "/home/claude/ClevelandBusinessMentoring/PRDs/entities/Session-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Session",
    nativeOrCustom: "Custom",
    entityType: "Event",
    labelSingular: "Session",
    labelPlural: "Sessions",
    activityStream: "Yes",
    contributingDomains: "Mentoring (MN)",
    discriminatorField: null,
    discriminatorValues: null,
  },

  overviewText: [
    "The Session entity represents individual mentoring meetings within an engagement. It is a single-domain custom entity owned exclusively by the Mentoring (MN) domain. All Session fields are defined in a single process document (MN-ENGAGE), making this a straightforward entity with no cross-domain consolidation required.",
    "Session uses the Event entity type, which provides native dateStart, dateEnd, duration, and status fields. These native fields align directly with session scheduling and recording needs, eliminating the need for custom equivalents. The native status field is customized with seven session-specific status values.",
    "Sessions are never deleted. Rescheduling preserves the original Session record with a rescheduled status and creates a new Session linked back to the original via a self-referential relationship. Canceled and missed statuses indicate sessions that did not occur but remain in the record for reporting and audit purposes.",
  ],

  overviewNotes: [
    { label: "Relationship to Engagement:", text: " Session is the child entity to Engagement in the MN domain. The Engagement Entity PRD (ENG-DEC-003) establishes that session roll-up fields on Engagement (totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime) are workflow-updated stored fields. These workflows fire on Session status changes, meaning Session status transitions must trigger Engagement roll-up updates." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on the Session entity because of its Event entity type. These fields are not created by YAML. They are documented here so process documents and Entity PRDs can reference them correctly, and to prevent duplicate field creation during YAML generation.",
  nativeFields: [
    ["name", "varchar", "Auto-generated: {Engagement Name} \u2014 {Session Date} (SES-DEC-004)", "MN-ENGAGE"],
    ["dateStart", "datetime", "Session Date/Time (MN-ENGAGE-DAT-023)", "MN-ENGAGE"],
    ["dateEnd", "datetime", "Calculated: dateStart + duration (SES-DEC-002). Read-only.", "MN-ENGAGE"],
    ["duration", "int", "Duration in minutes (MN-ENGAGE-DAT-025). Required when status = Completed.", "MN-ENGAGE"],
    ["status", "enum", "Custom values: Scheduled, Completed, Canceled by Client, Canceled by Mentor, Missed by Client, Rescheduled by Client, Rescheduled by Mentor. Default: Scheduled. (MN-ENGAGE-DAT-024, SES-DEC-003)", "MN-ENGAGE"],
    ["parent", "link", "Engagement \u2192 Session (native Event parent). Links each Session to its parent Engagement. (SES-DEC-008)", "MN-ENGAGE"],
    ["description", "text", "General description/notes. Inherited from Base type.", "Not explicitly referenced in PRDs"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on status values:", text: " The native Event status field is customized with seven session-specific values. These replace the platform default values. The Scheduled default ensures new Session records are created in the correct initial state. Status transitions trigger workflow updates to Engagement roll-up fields (totalSessions, totalSessionHours, lastSessionDate, totalSessionsLast30Days, nextSessionDateTime) as defined in the Engagement Entity PRD (ENG-DEC-003)." },
    { label: "Note on dateEnd:", text: " The dateEnd field is calculated as dateStart + duration. It is read-only and not directly editable. The user enters dateStart and selects a duration; dateEnd is derived automatically. This simplifies the user interface while maintaining a complete time record for calendar integration." },
    { label: "Note on name:", text: " The name field is auto-generated as {Engagement Name} \u2014 {Session Date} and is read-only. This format provides immediate context when viewing Sessions in list views, showing both the related engagement and the session date without requiring the user to navigate to the detail view." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldGroups: [
    {
      heading: "3.1 Session Detail Fields",
      headingLevel: 2,
      intro: "The following custom fields capture session details recorded by the mentor after a meeting. Session is a single-domain entity with no type discriminator, so no dynamic logic visibility rules based on a discriminator are required. Conditional visibility rules based on field values are documented in Section 5.",
      fields: [
        ["sessionType", "enum", "No", "In-Person, Video Call, Phone Call", "\u2014", "MN-ENGAGE-DAT-026", [
          { text: "How the session was conducted. Required when status = Completed. Drives conditional display of location fields. " },
          { bold: "Domains: " }, { text: "MN. " },
          { bold: "Implementation: " }, { text: "conditionally required (Completed status)." },
        ]],
        ["meetingLocationType", "enum", "No", "Organization Office, Client\u2019s Place of Business, Other", "\u2014", "MN-ENGAGE-DAT-027", [
          { text: "Where an in-person session took place. Required when sessionType = In-Person. " },
          { bold: "Visibility: " }, { text: "sessionType = In-Person. " },
          { bold: "Domains: " }, { text: "MN. " },
          { bold: "Implementation: " }, { text: "conditionally required (In-Person sessions)." },
        ]],
        ["locationDetails", "varchar", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-028", [
          { text: "Free-text description of meeting location. Shown only when meetingLocationType = Other. " },
          { bold: "Visibility: " }, { text: "meetingLocationType = Other. " },
          { bold: "Domains: " }, { text: "MN." },
        ]],
        ["topicsCovered", "multiEnum", "No", "TBD \u2014 see SES-ISS-001", "\u2014", "MN-ENGAGE-DAT-029", [
          { text: "Topics discussed during the session. May be included in session summary email when populated. Values to be defined by CBM leadership. " },
          { bold: "Domains: " }, { text: "MN." },
        ]],
      ],
    },
    {
      heading: "3.2 Session Notes and Follow-Up",
      headingLevel: 2,
      intro: "The following fields capture the mentor\u2019s notes and agreed-upon next actions. When populated, these fields are automatically included in the session summary email (SES-DEC-006).",
      fields: [
        ["sessionNotes", "wysiwyg", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-030", [
          { text: "Notes entered by the mentor during or after the session. Included in the session summary email when populated. The mentor controls what is shared by choosing what to write in this field. " },
          { bold: "Domains: " }, { text: "MN." },
        ]],
        ["nextSteps", "wysiwyg", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-031", [
          { text: "Agreed-upon actions and follow-up items from the session. Included in the session summary email when populated. " },
          { bold: "Domains: " }, { text: "MN." },
        ]],
        ["nextSessionDateTime", "datetime", "No", "\u2014", "\u2014", "MN-ENGAGE-DAT-033", [
          { text: "The date and time for the next mentoring session. When set on a Completed session, triggers automatic calendar event creation, meeting request to attendees, and creation of the next Session record with status Scheduled. The value is also copied to the Engagement\u2019s nextSessionDateTime roll-up field (MN-ENGAGE-DAT-022) via workflow. " },
          { bold: "Domains: " }, { text: "MN. " },
          { bold: "Implementation: " }, { text: "workflow trigger for Session creation, calendar event, meeting request, and Engagement roll-up update (SES-DEC-005)." },
        ]],
      ],
    },
    {
      heading: "3.3 Rescheduling",
      headingLevel: 2,
      intro: "The following field supports the rescheduling audit trail. It is populated only on Session records created via the rescheduling workflow.",
      fields: [
        ["rescheduledFromSession", "link", "No", "\u2014", "\u2014", "SES-DEC-007", [
          { text: "Self-referential link to the original Session record that was rescheduled. Populated automatically by the rescheduling workflow. Empty on normally scheduled sessions. Enables tracing the full rescheduling chain for reporting and audit purposes. " },
          { bold: "Domains: " }, { text: "MN. " },
          { bold: "Implementation: " }, { text: "manyToOne self-referential (Session \u2192 Session). System-populated, readOnly." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "All relationships involving the Session entity, compiled from the MN domain. Session is a single-domain entity; all relationships are defined in MN-ENGAGE.",
  relationships: [
    ["Session \u2192 Engagement", "Engagement", "manyToOne (native parent)", "MN-ENGAGE, SES-DEC-008", "MN"],
    ["Mentor Attendees \u2192 Contact", "Contact", "manyToMany", "MN-ENGAGE-DAT-034", "MN"],
    ["Client Attendees \u2192 Contact", "Contact", "manyToMany", "MN-ENGAGE-DAT-035", "MN"],
    ["Rescheduled From \u2192 Session", "Session", "manyToOne (self-referential)", "SES-DEC-007", "MN"],
  ],
  relationshipNotes: [
    { label: "Note on Engagement link:", text: " The Session-to-Engagement relationship uses the native Event parent link rather than a custom relationship field. This provides the standard parent-child behavior built into the Event entity type. Each Session belongs to exactly one Engagement; an Engagement may have many Sessions." },
    { label: "Note on attendee relationships:", text: " Mentor Attendees and Client Attendees are two separate manyToMany relationships to the Contact entity (SES-DEC-009). This pattern matches the Engagement entity\u2019s approach of using distinct named relationships rather than a single relationship with a role field. At least one Mentor Attendee and at least one Client Attendee are required when status = Completed. This is enforced via workflow validation, not field-level required constraints." },
    { label: "Note on rescheduling link:", text: " The Rescheduled From relationship is a self-referential manyToOne link. A rescheduled Session points back to its predecessor. The original Session\u2019s detail view shows linked replacement Sessions in its related records panel, providing a complete rescheduling history." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "Session has no type discriminator. Dynamic logic rules are based on field values rather than a discriminator field. These rules control conditional visibility of session detail fields.",
  dynamicLogicSections: [
    { heading: "5.1 Session Type Conditional Fields", paragraphs: [
      { label: "Condition:", text: " sessionType = In-Person" },
      { label: "Show:", text: " meetingLocationType" },
      { text: "When the session was conducted in person, the meeting location type field becomes visible to capture where the meeting took place." },
    ]},
    { heading: "5.2 Meeting Location Conditional Fields", paragraphs: [
      { label: "Condition:", text: " meetingLocationType = Other" },
      { label: "Show:", text: " locationDetails" },
      { text: "When the meeting location type is Other, the free-text location details field becomes visible for the mentor to describe the meeting location." },
    ]},
    { heading: "5.3 Status-Driven Field Behavior", paragraphs: [
      { text: "The following fields have conditional requirements based on session status. These are enforced via workflow validation, not dynamic logic visibility. The fields remain visible regardless of status to support pre-population and editing, but are validated as required when the status transitions to Completed:" },
    ], bullets: [
      { label: "duration", text: " \u2014 required when status = Completed" },
      { label: "sessionType", text: " \u2014 required when status = Completed" },
      { label: "Mentor Attendees", text: " \u2014 at least one required when status = Completed" },
      { label: "Client Attendees", text: " \u2014 at least one required when status = Completed" },
      { label: "meetingLocationType", text: " \u2014 required when status = Completed AND sessionType = In-Person" },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following panel grouping is a recommendation for the Session detail view. Final layout is determined during YAML generation. Session is a straightforward entity with no type-based panel visibility \u2014 all panels are always visible.",
  layoutPanels: [
    { name: "Overview Panel", text: "name (read-only), status, dateStart (labeled Session Date/Time), duration, dateEnd (read-only, calculated). Parent link to Engagement." },
    { name: "Session Details Panel", text: "sessionType, meetingLocationType (visible when In-Person), locationDetails (visible when Other), topicsCovered." },
    { name: "Notes Panel", text: "sessionNotes, nextSteps." },
    { name: "Scheduling Panel", text: "nextSessionDateTime, rescheduledFromSession (read-only, visible when populated)." },
    { name: "Attendees Panel", text: "Mentor Attendees (manyToMany relationship), Client Attendees (manyToMany relationship)." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Auto-generated name:", text: " The name field is auto-generated as {Engagement Name} \u2014 {Session Date} and is read-only. The name updates if the session date changes (e.g., via rescheduling). This matches the Engagement entity pattern (ENG-DEC-001)." },
    { label: "2. Calculated dateEnd:", text: " dateEnd is calculated as dateStart + duration. It is read-only and not directly editable by users. The user enters dateStart and selects a duration; dateEnd is derived automatically to simplify the user interface." },
    { label: "3. Status transition workflows:", text: " When a Session\u2019s status changes, a workflow must update the parent Engagement\u2019s roll-up fields: totalSessions (count of Completed sessions), totalSessionsLast30Days (count of Completed sessions in the last 30 days), lastSessionDate (dateStart of most recent Completed session), totalSessionHours (sum of duration for all Completed sessions), and nextSessionDateTime (copied from the Session\u2019s nextSessionDateTime field). See Engagement Entity PRD (ENG-DEC-003)." },
    { label: "4. First session activates engagement:", text: " The first Session reaching Completed status automatically transitions the parent Engagement from Assigned to Active (MN-ENGAGE-REQ-001). This is a one-time transition triggered by the first Completed session." },
    { label: "5. Next Session Date/Time workflow:", text: " When nextSessionDateTime is set on a Completed session, the system must: (a) create a new Session record with status Scheduled and dateStart set to the nextSessionDateTime value, (b) create a calendar event and send meeting requests to all session attendees, and (c) copy the value to the parent Engagement\u2019s nextSessionDateTime roll-up field. See MN-ENGAGE-REQ-002." },
    { label: "6. Rescheduling workflow:", text: " When a Session\u2019s status is changed to Rescheduled by Client or Rescheduled by Mentor, a new Session record is created with the rescheduledFromSession link pointing to the original. The original Session retains its rescheduled status and is never deleted. See MN-ENGAGE-REQ-008." },
    { label: "7. Session summary email:", text: " A draft session summary email is generated when a Session is marked Completed (MN-ENGAGE-REQ-003). The summary includes session date, duration, type, attendees, and \u2014 when populated \u2014 Topics Covered, Session Notes, and Next Steps. No toggle field controls inclusion; content is included automatically when present (SES-DEC-006)." },
    { label: "8. Conditional field validation:", text: " duration, sessionType, Mentor Attendees (at least one), and Client Attendees (at least one) are required when status = Completed. meetingLocationType is additionally required when sessionType = In-Person. These are enforced via workflow validation, not field-level required constraints, because the fields must be editable before the session is completed." },
    { label: "9. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["SES-ISS-001", "Topics Covered values not yet defined. The complete list of allowed values for the topicsCovered multiEnum field must be defined by CBM leadership. Carried forward from MN-ENGAGE-ISS-002."],
  ],

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["SES-DEC-001", "Native dateStart maps to Session Date/Time (MN-ENGAGE-DAT-023). The native Event field is used directly with a layout label change. No custom field needed."],
    ["SES-DEC-002", "Native duration maps to Duration (MN-ENGAGE-DAT-025). Native dateEnd is calculated as dateStart + duration and is read-only. The user enters start time and selects duration; end time is derived."],
    ["SES-DEC-003", "Native status field with custom values: Scheduled, Completed, Canceled by Client, Canceled by Mentor, Missed by Client, Rescheduled by Client, Rescheduled by Mentor. Default: Scheduled. Platform default values are replaced."],
    ["SES-DEC-004", "Name auto-generated as {Engagement Name} \u2014 {Session Date}. Read-only. Includes Engagement name so Sessions are identifiable in list views without navigating to the detail view."],
    ["SES-DEC-005", "nextSessionDateTime on Session (MN-ENGAGE-DAT-033) is the user-editable input field. The Engagement\u2019s nextSessionDateTime (MN-ENGAGE-DAT-022) is the workflow-updated roll-up. Two separate fields serving different purposes."],
    ["SES-DEC-006", "Session Notes and Next Steps are always included in the session summary email when populated. No toggle field needed. The mentor controls inclusion by choosing what to write in the fields."],
    ["SES-DEC-007", "Self-referential rescheduledFromSession link (manyToOne, Session \u2192 Session) for rescheduling audit trail. Populated only on sessions created via the rescheduling workflow. Empty on normally scheduled sessions."],
    ["SES-DEC-008", "Native Event parent link used for the Engagement \u2192 Session relationship. Provides standard parent-child behavior without a custom relationship field."],
    ["SES-DEC-009", "Two separate manyToMany relationships to Contact: Mentor Attendees (MN-ENGAGE-DAT-034) and Client Attendees (MN-ENGAGE-DAT-035). Separate relationships enable clean filtering and reporting by attendee role."],
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// RENDERING ENGINE — Do not modify below this line
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, TabStopType, TabStopPosition
} = require("docx");

// ── Shared styles ──────────────────────────────────────────────────
const FONT = "Arial";
const SZ = { body: 22, small: 20, xs: 16, h1: 32, h2: 28, h3: 24, meta: 20 };
const COLORS = {
  headerBg: "1F3864",
  headerText: "FFFFFF",
  altRowBg: "F2F7FB",
  borderColor: "AAAAAA",
  titleColor: "1F3864",
  idColor: "888888",
};

const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderColor };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const descMargins = { top: 40, bottom: 80, left: 100, right: 100 };
const TABLE_WIDTH = 9360;

// ── Primitive helpers ──────────────────────────────────────────────

function r(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: opts.size || SZ.body, bold: opts.bold || false, italics: opts.italics || false, color: opts.color });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120 },
    alignment: opts.align,
    children: Array.isArray(text) ? text : [r(text, opts)],
  });
}

function heading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 120 },
    children: [r(text, { bold: true, size: level === HeadingLevel.HEADING_1 ? SZ.h1 : level === HeadingLevel.HEADING_2 ? SZ.h2 : SZ.h3, color: COLORS.titleColor })],
  });
}

function labeledParagraph(obj) {
  if (obj.label) {
    return p([r(obj.label, { bold: true }), r(obj.text)]);
  }
  return p(obj.text);
}

function labeledBullet(obj) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [r(obj.label, { bold: true }), r(obj.text)],
  });
}

// ── Table helpers ──────────────────────────────────────────────────

function hdrCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })] });
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
  c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group. Session is a single-domain entity with no type discriminator, so all fields are always visible (subject to value-based dynamic logic rules in Section 5)."));

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
