// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Event Registration Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js
// Entity: Event Registration (Custom — Base Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-EventRegistration-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Event Registration
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Event Registration",
  version: "1.1",
  status: "Draft",
  lastUpdated: "05-05-26 23:45",
  sourceDocuments: "CR Domain PRD v1.0, CR-EVENTS SDO v1.0, CR-EVENTS-MANAGE v1.0, CR-EVENTS-CONVERT v1.0, Entity Inventory v1.4, Event Entity PRD v1.0, Contact Entity PRD v1.5, Zoom Integration Architecture v1.0",
  outputFile: "/home/claude/cbm/PRDs/entities/EventRegistration-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Event Registration",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Event Registration",
    labelPlural: "Event Registrations",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },

  overviewText: [
    "The Event Registration entity is a junction record that links a Contact to an Event with registration status, attendance tracking, and communication history. It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain within the CR-EVENTS sub-domain.",
    "Event Registration uses the Base entity type because it is a relational record between two parties (Contact and Event) with metadata fields \u2014 not a person, company, or calendar event itself. The standard many-to-many relationship type does not support fields on the junction, requiring a dedicated entity.",
    "Fields are defined across two process documents: CR-EVENTS-MANAGE (creates and manages registrations, 11 fields) and CR-EVENTS-CONVERT (adds the postEventFollowUpSentAt idempotency field, 1 field). Total: 12 custom fields.",
    "Event Registrations are never deleted. Cancellations are recorded by setting attendanceStatus to Cancelled with a system-populated cancellationDate. The original registration record is preserved for reporting and audit purposes.",
  ],

  overviewNotes: [
    { label: "Creation pathways:", text: " Event Registrations are created through three pathways: (1) the public online registration form (registrationSource = Online, attendanceStatus defaults to Registered), (2) the Add Walk-In action on the Event detail view (registrationSource = Walk-In, attendanceStatus defaults to Attended), and (3) for Events with format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service auto-creating Walk-In registrations from post-Webinar attendance reports for Zoom participants whose email matches an existing Contact but who had no pre-existing Event Registration (registrationSource = Walk-In, attendanceStatus = Attended). All three pathways create or match a Contact record and link it to the Event." },
    { label: "Zoom integration writes:", text: " For Event Registrations whose parent Event has format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service writes to three fields automatically: zoomRegistrantId is populated when the registration is pushed to the Zoom Webinar (Section 3.5); attendanceStatus is set to Attended or No-Show after the Webinar ends, write-once and only on Event Registrations not already in a terminal status (Cancelled, Attended, or No-Show); and the integration cancels the Zoom-side registrant when attendanceStatus is set to Cancelled by staff (Zoom sends the cancellation email)." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on the Event Registration entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Auto-generated or system-set. Not explicitly referenced in process documents. May be composed from Event name and Contact name for list view readability.", "System"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on name:", text: " The process documents do not specify a name format for Event Registration records. During YAML generation, consider auto-generating the name as {Contact Name} \u2014 {Event Name} for readability in list views, following the pattern established by the Engagement and Session entities." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldGroups: [
    {
      heading: "3.1 Core Registration Fields",
      headingLevel: 2,
      intro: "The following fields establish the registration record\u2019s identity and state. Event Registration is a single-domain entity with no type discriminator, so all fields are always visible.",
      fields: [
        ["event", "link (Event)", "Yes", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-034", [
          { text: "The Event this registration is for. Set at creation and not changed thereafter. Traversed by CR-EVENTS-CONVERT for template substitution, report grouping, and conversion window evaluation. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Event. Set at creation, readOnly thereafter." },
        ]],
        ["contact", "link (Contact)", "Yes", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-035", [
          { text: "The registrant. May be a newly created Contact (from the registration form or walk-in action) or an existing Contact matched by email. Traversed by CR-EVENTS-CONVERT for post-event email dispatch and conversion detection. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Contact." },
        ]],
        ["registrationDate", "datetime", "Yes", "\u2014", "now", "CR-EVENTS-MANAGE-DAT-036", [
          { text: "Date and time the registration was created. System-populated at creation. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly." },
        ]],
        ["registrationSource", "enum", "Yes", "Online, Walk-In", "Online", "CR-EVENTS-MANAGE-DAT-037", [
          { text: "The pathway through which the registration was created. Online is set by the public registration form; Walk-In is set by the Add Walk-In action on the Event detail view. For Events with format = Virtual or Hybrid and Zoom integration enabled, Walk-In is also set by the Zoom integration bridge service when the post-Webinar attendance reconciliation finds a Zoom participant whose email matches an existing Contact but who has no corresponding Event Registration \u2014 the bridge service creates the Event Registration with registrationSource = Walk-In and attendanceStatus = Attended. Walk-In registrations (regardless of source) do not trigger a confirmation email and have no zoomRegistrantId (they are created after the Webinar has already ended). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-set at creation based on creation pathway, readOnly thereafter." },
        ]],
        ["attendanceStatus", "enum", "Yes", "Registered, Attended, No-Show, Cancelled", "Registered", "CR-EVENTS-MANAGE-DAT-038", [
          { text: "The attendance state of this registration. Defaults to Registered for Online registrations and to Attended for Walk-In registrations. Updated by one of three pathways: (1) the Content and Event Administrator via bulk-update actions during or after the event (Mark Selected as Attended, Mark Remaining as No-Show); (2) staff-initiated cancellations setting this to Cancelled (EVREG-DEC-001); or (3) for parent Events with format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service writing Attended or No-Show automatically after the Webinar ends (write-once: the bridge service does not overwrite a value already set by staff). Setting attendanceStatus to Cancelled on a registration that has been pushed to Zoom additionally triggers the bridge service to cancel the registrant in Zoom (Zoom sends the cancellation email automatically). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "default varies by creation pathway. Bulk-action and Zoom-driven writes are write-once \u2014 neither overwrites a value already set by the other or by staff." },
        ]],
      ],
    },
    {
      heading: "3.2 Registrant Details",
      headingLevel: 2,
      intro: "The following field captures per-event information submitted by the registrant.",
      fields: [
        ["specialRequests", "text", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-039", [
          { text: "Free-text field capturing dietary restrictions, accessibility needs, or other per-event requests submitted by the registrant. Populated from the registration form. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
    {
      heading: "3.3 Communication Tracking",
      headingLevel: 2,
      intro: "The following fields track transactional event communications (confirmations, reminders, and post-event follow-ups) sent to this registrant. These are system-populated fields that support idempotency and bounce tracking.",
      fields: [
        ["confirmationSentAt", "datetime", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-040", [
          { text: "Timestamp the confirmation email was sent. System-populated when the confirmation is dispatched. Remains blank for Walk-In registrations (no confirmation email sent for walk-ins). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly." },
        ]],
        ["remindersSent", "multiEnum", "No", "7-day, 1-day, 1-hour", "\u2014", "CR-EVENTS-MANAGE-DAT-041", [
          { text: "Records which reminder types have been sent for this registration. System-populated as each reminder fires. Enforces idempotency: a reminder type already present is not sent again. Available reminder types vary by Event format (In-Person: 7-day and 1-day; Virtual: 1-day and 1-hour; Hybrid: all three). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly. Idempotency check before each reminder dispatch." },
        ]],
        ["lastCommunicationBouncedAt", "datetime", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-042", [
          { text: "Timestamp of the most recent hard bounce of any event communication (confirmation, reminder, or post-event follow-up) to this registration. System-populated by the bounce-handling pathway. Does not suppress future sends automatically (pending CR-MARKETING-ISS-004 resolution). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated. No automatic suppression in v1.0." },
        ]],
        ["postEventFollowUpSentAt", "datetime", "No", "\u2014", "\u2014", "CR-EVENTS-CONVERT-DAT-023", [
          { text: "System-populated timestamp indicating that a post-event follow-up email (Post-Event Thank-You or Post-Event We-Missed-You) has been dispatched. Written by the Send Post-Event Emails action on the Event detail view. Enforces idempotency: subsequent invocations skip registrations where this field is already populated. Remains blank for Cancelled registrations and registrations that were still at Registered status (never attended and never no-showed). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly. Idempotency check before dispatch." },
        ]],
      ],
    },
    {
      heading: "3.4 Cancellation",
      headingLevel: 2,
      intro: "The following fields capture cancellation details. All cancellations are staff-initiated through the Content and Event Administrator.",
      fields: [
        ["cancellationDate", "datetime", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-043", [
          { text: "Date and time the registration was cancelled. System-populated when attendanceStatus is set to Cancelled. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated on status transition to Cancelled, readOnly." },
        ]],
        ["cancellationReason", "text", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-044", [
          { text: "Optional free-text reason for cancellation. Captured by the Content and Event Administrator when handling the cancellation. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
    {
      heading: "3.5 Zoom Integration",
      headingLevel: 2,
      intro: "The following field supports automated Zoom Webinar integration for Event Registrations whose parent Event has format = Virtual or Hybrid. The field is system-populated by the Zoom integration bridge service and is read-only in the CRM UI.",
      fields: [
        ["zoomRegistrantId", "varchar", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-045", [
          { text: "The Zoom-side registrant ID, system-populated by the Zoom integration bridge service after the registration is successfully pushed to the Zoom Webinar. Empty for Event Registrations whose parent Event has format = In-Person, for Event Registrations created against an Event whose Webinar has not yet been provisioned (queued in the bridge backlog and populated when the Webinar is created), and for Walk-In registrations created from the post-Webinar attendance reconciliation flow (those registrations have no corresponding Zoom registrant). Read-only after population. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly. See Zoom Integration Architecture v1.0 \u00a75.3 (registrant push) and \u00a75.5 (registration cancellation)." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "All relationships involving the Event Registration entity, compiled from the CR domain. Event Registration is a single-domain entity; all relationships are defined in CR-EVENTS process documents.",
  relationships: [
    ["Event Registration \u2192 Event", "Event", "manyToOne", "CR-EVENTS-MANAGE-DAT-034", "CR"],
    ["Event Registration \u2192 Contact", "Contact", "manyToOne", "CR-EVENTS-MANAGE-DAT-035", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Event link:", text: " Each Event Registration belongs to exactly one Event. The Event\u2019s detail view shows all linked Event Registrations in a related records panel. Duplicate detection is by email address plus Event: the system prevents a Contact from registering twice for the same Event." },
    { label: "Note on Contact link:", text: " Each Event Registration links to exactly one Contact. A Contact may have many Event Registrations across different Events. The Contact\u2019s detail view shows all Event Registrations in a related records panel. The Contact link is traversed by CR-EVENTS-CONVERT for post-event email dispatch, conversion detection, and Reactivation list membership." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "Event Registration has no type discriminator and no format-driven conditional fields. All 12 custom fields are always visible. Dynamic behavior is limited to default value variation and system-population rules, which are enforced via workflow logic rather than dynamic logic visibility rules.",
  dynamicLogicSections: [
    { heading: "5.1 Creation Pathway Defaults", paragraphs: [
      { text: "The attendanceStatus field defaults vary by creation pathway. These are not dynamic logic rules but workflow-set defaults:" },
    ], bullets: [
      { label: "Online registration:", text: " attendanceStatus = Registered, registrationSource = Online, confirmation email dispatched" },
      { label: "Walk-In registration:", text: " attendanceStatus = Attended, registrationSource = Walk-In, no confirmation email" },
    ]},
    { heading: "5.2 Cancellation Field Visibility", paragraphs: [
      { text: "The cancellationDate and cancellationReason fields are always visible on the detail view but are meaningful only when attendanceStatus = Cancelled. No visibility rule hides them at other statuses; they remain blank and inert. This avoids the complexity of status-conditional visibility for fields that have no negative impact when displayed empty." },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following panel grouping is a recommendation for the Event Registration detail view. Final layout is determined during YAML generation. All panels are always visible.",
  layoutPanels: [
    { name: "Overview Panel", text: "name (read-only, auto-generated), event (link to Event), contact (link to Contact), registrationDate (read-only), registrationSource (read-only), attendanceStatus." },
    { name: "Registrant Details Panel", text: "specialRequests." },
    { name: "Communication Tracking Panel", text: "confirmationSentAt (read-only), remindersSent (read-only), postEventFollowUpSentAt (read-only), lastCommunicationBouncedAt (read-only)." },
    { name: "Cancellation Panel", text: "cancellationDate (read-only), cancellationReason." },
    { name: "Zoom Integration Panel", text: "zoomRegistrantId (read-only). Visible only when the parent Event has format = Virtual or Hybrid. Field is empty until the registration is pushed to the Zoom Webinar by the bridge service." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Auto-generated name:", text: " The process documents do not specify a name format. Consider auto-generating as {Contact Name} \u2014 {Event Name} for readability in list views and search results, following the pattern established by the Engagement entity (ENG-DEC-001)." },
    { label: "2. Duplicate registration detection:", text: " The system detects duplicate registrations by email address plus Event. When a registrant submits the online form for an Event they are already registered for, the system shows an already-registered message with a resend-confirmation option rather than creating a second Event Registration record." },
    { label: "3. Walk-In action:", text: " The Add Walk-In action is a dedicated modal on the Event detail view. It collects the same fields as the online registration form but with email optional. Available when Event status is Scheduled or In Progress. Creates a Contact (matching by email if provided, creating new otherwise) and an Event Registration with registrationSource = Walk-In and attendanceStatus = Attended. No confirmation email is sent." },
    { label: "4. Bulk attendance update:", text: " Two bulk actions on the Event detail view support efficient attendance recording: Mark Selected as Attended (sets attendanceStatus = Attended for selected Event Registrations) and Mark Remaining as No-Show (sets attendanceStatus = No-Show for all Event Registrations still at Registered). These are the primary attendance capture mechanism for in-person events." },
    { label: "5. Communication idempotency:", text: " Three fields enforce idempotency for different communication types: confirmationSentAt (confirmation email), remindersSent (per-reminder-type idempotency), and postEventFollowUpSentAt (post-event follow-up email). Each field is checked before dispatch; if already populated (or, for remindersSent, if the specific reminder type is already present), the send is skipped." },
    { label: "6. Cancellation workflow:", text: " When attendanceStatus transitions to Cancelled, the system auto-populates cancellationDate with the current timestamp. cancellationReason is optional and entered by the Content and Event Administrator. All cancellations are staff-initiated; there is no self-cancellation pathway (EVT-DEC-010)." },
    { label: "7. Post-event follow-up dispatch:", text: " The Send Post-Event Emails action on the Event detail view dispatches post-event follow-up emails to all eligible Event Registrations. Eligible means: attendanceStatus = Attended (receives Thank-You) or attendanceStatus = No-Show (receives We-Missed-You); postEventFollowUpSentAt is blank (idempotency); and dateEnd has passed (gate condition). Cancelled and Registered registrations are skipped." },
    { label: "8. Transactional communication and emailOptOut:", text: " All event communications (confirmation, reminders, post-event follow-ups for thank-you and we-missed-you) are transactional and ignore Contact.emailOptOut. Only conversion-push sends from CR-EVENTS-CONVERT honor the emailOptOut flag, as those are marketing communications." },
    { label: "9. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
    { label: "10. Zoom integration field provisioning:", text: " The zoomRegistrantId field is provisioned by CRM Builder when the deployment YAML includes a zoomConfig block. For deployments without Zoom integration, this field is not provisioned. The integration logic governing when the field is populated, when attendanceStatus is written by the bridge, and when Walk-In registrations are auto-created is documented in PRDs/product/zoom-integration-architecture.md v1.0 in the crmbuilder repo, sections 5.3, 5.5, and 5.7 respectively." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["CR-MARKETING-ISS-004", "Hard-bounce threshold for automatic Contact state change is unresolved. Event communications are affected because a registrant whose confirmation email hard-bounces will still receive reminder attempts under current rules. Until resolved, event bounces are logged on the Event Registration via lastCommunicationBouncedAt without side effects on Contact state. Resolution belongs to CR-MARKETING and depends on the selected marketing platform\u2019s bounce-tracking capability."],
  ],

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["EVREG-DEC-001", "Four-value attendanceStatus lifecycle: Registered, Attended, No-Show, Cancelled. Registered is the default for Online registrations; Attended is the default for Walk-In registrations. No-Show is set via bulk-update action post-event. Cancelled is set by staff-initiated cancellation."],
    ["EVREG-DEC-002", "Two-value registrationSource: Online and Walk-In. System-set at creation based on the creation pathway. Read-only after creation. Drives downstream behavior differences (confirmation email for Online only; default attendanceStatus varies)."],
    ["EVREG-DEC-003", "Base entity type chosen. Event Registration is a junction record between Contact and Event with metadata fields. It is not a person, company, or calendar event. The standard many-to-many relationship type does not support fields on the junction, requiring a dedicated entity."],
    ["EVREG-DEC-004", "No activity stream. Event Registration is a transactional record with system-populated tracking fields. Activity stream adds overhead without proportional value for this entity type."],
    ["EVREG-DEC-005", "postEventFollowUpSentAt added by CR-EVENTS-CONVERT for idempotency on the Send Post-Event Emails action. Ensures post-event follow-up emails are sent at most once per registration regardless of how many times the action is invoked."],
    ["EVREG-DEC-006", "Cancellation fields (cancellationDate, cancellationReason) are always visible, not conditionally hidden when attendanceStatus \u2260 Cancelled. The empty-field cost is lower than the dynamic logic complexity cost."],
    ["EVREG-DEC-007", "Zoom integration writes are write-once for attendanceStatus. The Zoom integration bridge service writes Attended or No-Show only when attendanceStatus is not already in a terminal state (Cancelled, Attended, or No-Show set by staff). This protects staff judgment from being overwritten by automated reconciliation. Conversely, staff cancellations set Cancelled regardless of any prior bridge-driven write."],
    ["EVREG-DEC-008", "Zoom-driven Walk-In creation is restricted to existing Contacts. The Zoom integration bridge service creates Walk-In registrations only for post-Webinar attendees whose email matches an existing Contact record. Attendees with no matching Contact are ignored \u2014 no placeholder Contact records are created. This avoids polluting the Contact database with one-off attendees, typos, or shared email addresses (per Issue 10 of the Zoom Integration Architecture design)."],
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

function hdrCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })] });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, columnSpan: opts.columnSpan, children: [new Paragraph({ children: [r(text, { size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics })] })] });
}

const MC = [2800, 6560];
function metaTable(rows) {
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: MC, rows: rows.map((row, i) => new TableRow({ children: [dataCell(row[0], MC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(row[1], MC[1], { shaded: i % 2 === 1, size: SZ.small })] })) });
}

const NFC = [2200, 1400, 3000, 2760];
function nativeFieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Native Field", NFC[0]), hdrCell("Type", NFC[1]), hdrCell("PRD Name(s) / Mapping", NFC[2]), hdrCell("Referenced By", NFC[3])] });
  const rows = fields.map((f, i) => new TableRow({ children: [dataCell(f[0], NFC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(f[1], NFC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[2], NFC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[3], NFC[3], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: NFC, rows: [hdr, ...rows] });
}

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

const RLC = [2600, 1800, 1400, 1700, 1860];
function relTable(rels) {
  const hdr = new TableRow({ children: [hdrCell("Relationship", RLC[0]), hdrCell("Related Entity", RLC[1]), hdrCell("Link Type", RLC[2]), hdrCell("PRD Reference", RLC[3]), hdrCell("Domain(s)", RLC[4])] });
  const rows = rels.map((rel, i) => new TableRow({ children: [dataCell(rel[0], RLC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(rel[1], RLC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[2], RLC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[3], RLC[3], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[4], RLC[4], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: RLC, rows: [hdr, ...rows] });
}

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

  c.push(heading("1. Entity Overview", HeadingLevel.HEADING_1));
  const metaRows = [
    ["CRM Entity Name", O.crmEntityName],
    ["Native / Custom", O.nativeOrCustom],
    ["Entity Type", O.entityType],
    ["Display Label (Singular)", O.labelSingular],
    ["Display Label (Plural)", O.labelPlural],
    ["Activity Stream", O.activityStream],
    ["Primary Domain", O.primaryDomain],
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

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("2. Native Fields", HeadingLevel.HEADING_1));
  c.push(p(E.nativeFieldsIntro));
  c.push(nativeFieldTable(E.nativeFields));
  c.push(p(""));
  if (E.nativeFieldNotes) E.nativeFieldNotes.forEach(n => c.push(labeledParagraph(n)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("3. Custom Fields", HeadingLevel.HEADING_1));
  c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group. Event Registration is a single-domain entity with no type discriminator, so all fields are always visible."));

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

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("4. Relationships", HeadingLevel.HEADING_1));
  c.push(p(E.relationshipsIntro));
  c.push(relTable(E.relationships));
  c.push(p(""));
  if (E.relationshipNotes) E.relationshipNotes.forEach(n => c.push(labeledParagraph(n)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("5. Dynamic Logic Rules", HeadingLevel.HEADING_1));
  c.push(p(E.dynamicLogicIntro));
  E.dynamicLogicSections.forEach(section => {
    c.push(heading(section.heading, HeadingLevel.HEADING_2));
    section.paragraphs.forEach(para => c.push(labeledParagraph(para)));
    if (section.bullets) section.bullets.forEach(b => c.push(labeledBullet(b)));
  });

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("6. Layout Guidance", HeadingLevel.HEADING_1));
  c.push(p(E.layoutIntro));
  E.layoutPanels.forEach(panel => {
    c.push(p([r(panel.name, { bold: true, color: COLORS.titleColor })]));
    c.push(p(panel.text));
  });

  c.push(heading("7. Implementation Notes", HeadingLevel.HEADING_1));
  E.implementationNotes.forEach(note => c.push(labeledParagraph(note)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("8. Open Issues", HeadingLevel.HEADING_1));
  c.push(twoColTable("ID", "Issue", E.openIssues));

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
