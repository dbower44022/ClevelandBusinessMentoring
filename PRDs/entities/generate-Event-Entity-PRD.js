// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Event Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Generated from: generate-entity-prd-template.js
// Entity: Event (Custom — Event Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-Event-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
// ENTITY DATA — Event
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {

  // ── Document metadata ────────────────────────────────────────────
  orgName: "Cleveland Business Mentors",
  entityName: "Event",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 10:00",
  sourceDocuments: "CR Domain PRD v1.0, CR-EVENTS SDO v1.0, CR-EVENTS-MANAGE v1.0, CR-EVENTS-CONVERT v1.0, Entity Inventory v1.4, Contact Entity PRD v1.5, Account Entity PRD v1.5",
  outputFile: "/home/claude/cbm/PRDs/entities/Event-Entity-PRD.docx",

  // ── Entity overview (Section 1) ──────────────────────────────────
  overview: {
    crmEntityName: "Event",
    nativeOrCustom: "Custom",
    entityType: "Event",
    labelSingular: "Event",
    labelPlural: "Events",
    activityStream: "Yes",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },

  overviewText: [
    "The Event entity represents workshops, clinics, and educational events that build awareness and attract prospective clients. It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain within the CR-EVENTS sub-domain. All Event fields are defined across two process documents: CR-EVENTS-MANAGE (creates and manages Event records) and CR-EVENTS-CONVERT (reads Event records for post-event follow-up and conversion reporting).",
    "Event uses the Event entity type, which provides native dateStart, dateEnd, and status fields. Unlike the Session entity (which also uses the Event type), Event\u2019s dateEnd is directly entered by the operator rather than calculated from duration, and Event\u2019s status field uses a six-value lifecycle reflecting the full event delivery pipeline from planning through completion.",
    "All Event status transitions are fully manual. The Content and Event Administrator controls the lifecycle through explicit status changes; no system-driven transitions occur at dateStart or dateEnd. This design reflects the reality that event delivery milestones (setup complete, registration closed, attendance recorded) are administrative judgments, not clock-driven events.",
    "Events are never deleted. Cancelled and Postponed statuses preserve the record and its associated Event Registrations for reporting and audit purposes.",
  ],

  overviewNotes: [
    { label: "Relationship to Event Registration:", text: " Event is the parent entity to Event Registration in the CR-EVENTS sub-domain. Each Event may have many Event Registrations; each Event Registration belongs to exactly one Event. Attendance, communication tracking, and post-event follow-up all operate at the Event Registration level." },
    { label: "Naming note:", text: " The entity name \u201CEvent\u201D is also the name of the entity type it uses. If naming conflicts arise during implementation, the display label may need adjustment (e.g., \u201CCBM Event\u201D). This is an implementation concern that does not affect the requirements defined in this document." },
  ],

  // ── Native fields (Section 2) ────────────────────────────────────
  nativeFieldsIntro: "The following fields already exist on the Event entity because of its Event entity type. These fields are not created by YAML. They are documented here so process documents and Entity PRDs can reference them correctly, and to prevent duplicate field creation during YAML generation.",
  nativeFields: [
    ["name", "varchar", "Event title (CR-EVENTS-MANAGE-DAT-019). Required at Draft creation. Directly entered by the Content and Event Administrator.", "CR-EVENTS-MANAGE, CR-EVENTS-CONVERT"],
    ["dateStart", "datetime", "Event start date and time (CR-EVENTS-MANAGE-DAT-020). Required at Draft creation. Revisable until status is Completed or Cancelled.", "CR-EVENTS-MANAGE, CR-EVENTS-CONVERT"],
    ["dateEnd", "datetime", "Event end date and time (CR-EVENTS-MANAGE-DAT-021). Directly entered, not calculated. Required to transition Draft to Scheduled.", "CR-EVENTS-MANAGE, CR-EVENTS-CONVERT"],
    ["duration", "int", "Not explicitly used by this entity. Available from the Event entity type but Event uses dateStart and dateEnd directly rather than dateStart plus duration.", "Not referenced"],
    ["status", "enum", "Custom values: Draft, Scheduled, In Progress, Completed, Cancelled, Postponed. Default: Draft. All transitions manual. (CR-EVENTS-MANAGE-DAT-022, EVT-DEC-002)", "CR-EVENTS-MANAGE, CR-EVENTS-CONVERT"],
    ["parent", "link", "Not used. The Event entity type provides a native parent link, but Event records are not children of another entity.", "Not referenced"],
    ["description", "text", "Native text field. The process requires wysiwyg capability for rich-text event descriptions used in registration pages and emails (CR-EVENTS-MANAGE-DAT-023). See Implementation Note 1.", "CR-EVENTS-MANAGE"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on status values:", text: " The native Event status field is customized with six event-specific values replacing the platform defaults. Draft is the default for new records. All six transitions are manual (EVT-DEC-002): Draft \u2192 Scheduled (requires full field set), Draft \u2192 Cancelled, Scheduled \u2192 In Progress, Scheduled \u2192 Cancelled, Scheduled \u2192 Postponed, In Progress \u2192 Completed, Postponed \u2192 Scheduled, Postponed \u2192 Cancelled. All other transitions are blocked." },
    { label: "Note on dateEnd:", text: " Unlike the Session entity, Event\u2019s dateEnd is directly entered by the operator, not calculated from duration. The Content and Event Administrator specifies both dateStart and dateEnd explicitly. The native duration field is not used." },
    { label: "Note on description:", text: " The native description field is text type. The process document specifies wysiwyg type for rich-text formatting in registration pages and email content. If the platform supports configuring the native description as wysiwyg, use the native field. Otherwise, a custom wysiwyg field may be needed. See Implementation Note 1." },
  ],

  // ── Custom fields (Section 3) ────────────────────────────────────
  customFieldGroups: [
    {
      heading: "3.1 Event Classification",
      headingLevel: 2,
      intro: "The following custom fields classify the event by format and topic. Event is a single-domain entity with no type discriminator, so no dynamic logic visibility rules based on a discriminator are required. Conditional visibility rules based on field values are documented in Section 5.",
      fields: [
        ["format", "enum", "Yes", "In-Person, Virtual, Hybrid", "\u2014", "CR-EVENTS-MANAGE-DAT-024", [
          { text: "The event delivery format. Required at Draft creation. Drives dynamic logic visibility on location, virtualMeetingUrl, and recordingUrl. Hybrid is a permitted value but aspirational in v1.0. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "dynamic logic driver (EVT-DEC-004)." },
        ]],
        ["topic", "enum", "Yes for Scheduled", "Business Fundamentals, Marketing & Sales, Finance & Accounting, Legal & Compliance, Operations, Technology & Digital, Leadership & People, Industry-Specific, Networking, Other", "\u2014", "CR-EVENTS-MANAGE-DAT-025", [
          { text: "The event topic. Used for effectiveness reporting by topic and as a secondary filter on the Event presenters picker (matched against Contact.presenterTopics). Required to transition Draft to Scheduled. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "10-value enum aligned with Contact.presenterTopics multiEnum." },
        ]],
      ],
    },
    {
      heading: "3.2 Venue and Access",
      headingLevel: 2,
      intro: "The following fields capture location and access details. Visibility of these fields is driven by the format field via dynamic logic (Section 5).",
      fields: [
        ["venueCapacity", "int", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-026", [
          { text: "Planning and reporting value. Informational only (EVT-DEC-009). Not enforced as a registration limit; the system does not block registrations when venueCapacity is reached. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["location", "text", "Conditional", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-027", [
          { text: "Venue name and address. Visible via dynamic logic when format is In-Person or Hybrid. Required when format is In-Person or Hybrid and the Event is transitioning to Scheduled. " },
          { bold: "Visibility: " }, { text: "format = In-Person or Hybrid. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["virtualMeetingUrl", "url", "Conditional", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-028", [
          { text: "Meeting platform URL. Visible via dynamic logic when format is Virtual or Hybrid. Required when format is Virtual or Hybrid and the Event is transitioning to Scheduled. " },
          { bold: "Visibility: " }, { text: "format = Virtual or Hybrid. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["registrationUrl", "url", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-029", [
          { text: "Public-facing URL for the registration form. System-populated when the Event transitions from Draft to Scheduled (EVT-DEC-008). Visible via dynamic logic when Event status is not Draft. " },
          { bold: "Visibility: " }, { text: "status \u2260 Draft. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly." },
        ]],
        ["recordingUrl", "url", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-030", [
          { text: "Optional link to an externally hosted event recording. Visible via dynamic logic when format is Virtual or Hybrid. Recording and publishing are out of scope; the field is a reference only. " },
          { bold: "Visibility: " }, { text: "format = Virtual or Hybrid. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
    {
      heading: "3.3 Linked Records",
      headingLevel: 2,
      intro: "The following fields link the Event to related Contact and Account records. These are implemented as relationships (Section 4) but documented here as fields because they appear in the Event field table and carry data item identifiers from the process documents.",
      fields: [
        ["presenters", "link-multiple (Contact)", "Yes for Scheduled", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-031", [
          { text: "Link to one or more Contacts whose contactType includes Presenter. At least one presenter is required to transition Draft to Scheduled. Adding a Contact as a presenter for the first time auto-appends Presenter to that Contact\u2019s contactType (EVT-DEC-005). Unlinking does not remove the Presenter value. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToMany relationship to Contact. contactType write-through on first link." },
        ]],
        ["coSponsoringPartners", "link-multiple (Account)", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-032", [
          { text: "Link to one or more Accounts whose accountType includes Partner. Optional throughout the Event lifecycle. Picker displays all Partner Accounts regardless of partnerStatus (EVT-DEC-006). No automated notification on link; all coordination is out-of-band. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToMany relationship to Account. No partnerStatus filter on picker." },
        ]],
      ],
    },
    {
      heading: "3.4 Attachments",
      headingLevel: 2,
      intro: "The following field stores event-related documents. Access is restricted to staff.",
      fields: [
        ["documents", "attachment-multiple", "No", "\u2014", "\u2014", "CR-EVENTS-MANAGE-DAT-033", [
          { text: "Staff-only storage of event-related files (run-of-show, logistics notes, agendas, slide decks). Not a public distribution channel (EVT-DEC-007). Participant-facing materials are distributed via email attachments on event communications. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "staff-only access." },
        ]],
      ],
    },
  ],

  // ── Relationships (Section 4) ────────────────────────────────────
  relationshipsIntro: "All relationships involving the Event entity, compiled from the CR domain. Event is a single-domain entity; all relationships are defined in CR-EVENTS process documents.",
  relationships: [
    ["Event \u2192 Event Registration", "Event Registration", "oneToMany", "CR-EVENTS-MANAGE-DAT-031 (reverse)", "CR"],
    ["Presenters \u2192 Contact", "Contact", "manyToMany", "CR-EVENTS-MANAGE-DAT-031", "CR"],
    ["Co-Sponsoring Partners \u2192 Account", "Account", "manyToMany", "CR-EVENTS-MANAGE-DAT-032", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Event Registration link:", text: " Event Registration records are linked to the Event via a manyToOne relationship on the Event Registration entity (Event Registration.event). The reverse relationship provides a list of all registrations on the Event detail view. This is not a native parent link; Event Registration is a Custom Base entity, not a Custom Event entity." },
    { label: "Note on Presenters:", text: " The Presenters relationship is a manyToMany link to Contact. The picker filters by contactType includes Presenter. When a Contact is linked as a presenter for the first time, the system auto-appends Presenter to that Contact\u2019s contactType multiEnum. Unlinking does not remove the Presenter value, as the Contact may present at other events (EVT-DEC-005). The presenterTopics multiEnum on Contact (aligned with Event.topic) supports a secondary filter on the picker." },
    { label: "Note on Co-Sponsoring Partners:", text: " The Co-Sponsoring Partners relationship is a manyToMany link to Account. The picker filters by accountType includes Partner but does not filter by partnerStatus (EVT-DEC-006). All four partnerStatus values (Prospect, Active, Lapsed, Inactive) are selectable, with partnerStatus displayed to inform the Administrator\u2019s judgment. The two independent Account-to-Event pathways (direct co-sponsorship link and indirect through a presenter\u2019s employer) are not deduplicated." },
  ],

  // ── Dynamic logic rules (Section 5) ──────────────────────────────
  dynamicLogicIntro: "Event has no type discriminator. Dynamic logic rules are based on field values rather than a discriminator field. These rules control conditional visibility and conditional requiredness of event detail fields.",
  dynamicLogicSections: [
    { heading: "5.1 Format-Driven Field Visibility", paragraphs: [
      { text: "The format field drives visibility of location, access, and recording fields:" },
    ], bullets: [
      { label: "format = In-Person:", text: " Show location. Hide virtualMeetingUrl, recordingUrl." },
      { label: "format = Virtual:", text: " Show virtualMeetingUrl, recordingUrl. Hide location." },
      { label: "format = Hybrid:", text: " Show location, virtualMeetingUrl, recordingUrl." },
    ]},
    { heading: "5.2 Status-Driven Field Visibility", paragraphs: [
      { label: "Condition:", text: " status \u2260 Draft" },
      { label: "Show:", text: " registrationUrl" },
      { text: "The registrationUrl field is system-populated on the Draft \u2192 Scheduled transition and is visible in all non-Draft statuses." },
    ]},
    { heading: "5.3 Draft-to-Scheduled Transition Requirements", paragraphs: [
      { text: "The following fields are required to transition an Event from Draft to Scheduled status. They remain visible and editable at all statuses; the requirement is enforced via transition validation, not dynamic logic visibility:" },
    ], bullets: [
      { label: "name", text: " \u2014 required at Draft creation" },
      { label: "format", text: " \u2014 required at Draft creation" },
      { label: "dateStart", text: " \u2014 required at Draft creation" },
      { label: "dateEnd", text: " \u2014 required at Scheduled" },
      { label: "topic", text: " \u2014 required at Scheduled" },
      { label: "description", text: " \u2014 required at Scheduled" },
      { label: "location", text: " \u2014 required at Scheduled when format = In-Person or Hybrid" },
      { label: "virtualMeetingUrl", text: " \u2014 required at Scheduled when format = Virtual or Hybrid" },
      { label: "presenters", text: " \u2014 at least one required at Scheduled" },
    ]},
  ],

  // ── Layout guidance (Section 6) ──────────────────────────────────
  layoutIntro: "The following panel grouping is a recommendation for the Event detail view. Final layout is determined during YAML generation. Event is a single-domain entity with no type-based panel visibility \u2014 all panels are always visible (subject to format-based dynamic logic on individual fields).",
  layoutPanels: [
    { name: "Overview Panel", text: "name, status, format, topic, description. Core event identification and classification fields." },
    { name: "Schedule Panel", text: "dateStart, dateEnd, venueCapacity. Time and capacity planning fields." },
    { name: "Venue and Access Panel", text: "location (visible when In-Person or Hybrid), virtualMeetingUrl (visible when Virtual or Hybrid), registrationUrl (visible when status \u2260 Draft), recordingUrl (visible when Virtual or Hybrid). Format-driven visibility." },
    { name: "Presenters Panel", text: "presenters (manyToMany relationship to Contact). Filtered by contactType includes Presenter with presenterTopics as secondary filter." },
    { name: "Partners Panel", text: "coSponsoringPartners (manyToMany relationship to Account). Filtered by accountType includes Partner; no partnerStatus filter." },
    { name: "Documents Panel", text: "documents (attachment-multiple). Staff-only event file storage." },
    { name: "Registrations Panel", text: "Event Registration related records list (oneToMany reverse). Displays all registrations linked to this Event." },
  ],

  // ── Implementation notes (Section 7) ─────────────────────────────
  implementationNotes: [
    { label: "1. Description field type:", text: " The process document specifies wysiwyg type for the description field (CR-EVENTS-MANAGE-DAT-023). The native description field on the Event entity type is text. If the target platform supports configuring the native description as wysiwyg, use the native field with the reconfigured type. Otherwise, create a custom wysiwyg description field and hide the native text description." },
    { label: "2. Status transition enforcement:", text: " All six status transitions are manual (EVT-DEC-002). The system must enforce the permitted transition set: Draft \u2192 Scheduled, Draft \u2192 Cancelled, Scheduled \u2192 In Progress, Scheduled \u2192 Cancelled, Scheduled \u2192 Postponed, In Progress \u2192 Completed, Postponed \u2192 Scheduled, Postponed \u2192 Cancelled. All other transitions must be blocked. Confirmation dialog required on Cancel or Postpone when Event Registrations exist." },
    { label: "3. Draft-to-Scheduled validation:", text: " Transition from Draft to Scheduled requires: name, format, dateStart, dateEnd, topic, description, at least one presenter, plus format-conditional fields (location for In-Person or Hybrid; virtualMeetingUrl for Virtual or Hybrid). If any required field is missing, the transition is blocked with an explanatory message listing the missing fields." },
    { label: "4. Registration URL population:", text: " On successful transition to Scheduled, the system populates the registrationUrl field with the public registration form URL for this Event. This is a system-generated value; the field is read-only after population." },
    { label: "5. Presenter contactType write-through:", text: " When a Contact is linked to the Event presenters field for the first time across any Event, the system auto-appends Presenter to that Contact\u2019s contactType multiEnum (EVT-DEC-005). Unlinking does not remove the Presenter value because the Contact may present at other events. The Presenter value persists indefinitely once set." },
    { label: "6. Registration blocking:", text: " Registration is blocked for Events at Draft, Cancelled, or Postponed status. Registration is also blocked once dateEnd has passed, regardless of Event status. Registration is allowed during In Progress if dateEnd has not yet passed. venueCapacity does not block registration (EVT-DEC-009)." },
    { label: "7. Event communications:", text: " Transactional event communications (confirmation emails, reminders) ignore Contact.emailOptOut. This is a deliberate design distinction: event communications are transactional (the registrant requested them by registering), not marketing. The emailOptOut flag applies only to marketing sends via CR-MARKETING-CAMPAIGNS and CR-REACTIVATE-OUTREACH." },
    { label: "8. Reminder schedule:", text: " Format-specific reminder timing: In-Person events send reminders at seven days and one day before dateStart; Virtual events at one day and one hour before; Hybrid events at seven days, one day, and one hour before. Daily evaluation loop with per-reminder-type idempotency via Event Registration.remindersSent." },
    { label: "9. Attendance recording:", text: " In-person primary mechanism is post-event bulk update (Mark Selected as Attended, Mark Remaining as No-Show). Virtual primary mechanism is manual transcription from the meeting platform attendance report. No automated import tooling in v1.0 (CR-EVENTS-MANAGE-ISS-001)." },
    { label: "10. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  // ── Open issues (Section 8) ──────────────────────────────────────
  openIssues: [
    ["CR-EVENTS-MANAGE-ISS-001", "Virtual attendance import tooling deferred. v1.0 relies on manual transcription from meeting platform attendance reports. A platform-agnostic import utility is not included because the organization has not standardized on a virtual meeting platform and current event volume does not justify the development effort. Revisit when a platform is standardized or when manual transcription becomes operationally burdensome."],
    ["EVT-ISS-001", "Display label naming conflict. The entity name \u201CEvent\u201D matches the entity type name. If the target platform creates a naming conflict between the custom entity and the built-in entity type, the display label may need adjustment (e.g., \u201CCBM Event\u201D). Assess during YAML generation."],
  ],

  // ── Decisions made (Section 9) ───────────────────────────────────
  decisions: [
    ["EVT-DEC-001", "Event type chosen for natural alignment with calendar scheduling. The built-in dateStart, dateEnd, and status fields match event planning needs directly. Duration is available but not used; Event specifies dateStart and dateEnd explicitly rather than deriving dateEnd from duration."],
    ["EVT-DEC-002", "Six-value status lifecycle with all manual transitions. Draft, Scheduled, In Progress, Completed, Cancelled, Postponed. No system-driven transitions at dateStart or dateEnd. In Progress and Completed reflect administrative discipline, not system-enforced reality. Reports that ask time-window questions use date fields; reports that ask lifecycle-intent questions use status values."],
    ["EVT-DEC-003", "Lightweight Draft gating. Draft requires only name, format, and dateStart. Full field set (including dateEnd, topic, description, format-conditional venue or meeting URL, and at least one presenter) required only at the Draft-to-Scheduled transition."],
    ["EVT-DEC-004", "Format-specific dynamic logic. format field drives visibility of location (In-Person/Hybrid), virtualMeetingUrl (Virtual/Hybrid), and recordingUrl (Virtual/Hybrid). Hybrid shows all three location and access fields."],
    ["EVT-DEC-005", "Presenter contactType write-through at link time. System auto-appends Presenter to a Contact\u2019s contactType multiEnum on first linkage to any Event\u2019s presenters field. Unlinking does not remove the value. Presenter persists indefinitely once set."],
    ["EVT-DEC-006", "Co-sponsoring partners picker does not filter by partnerStatus. All four values (Prospect, Active, Lapsed, Inactive) are selectable. partnerStatus reflects the ongoing relationship state, not a gate on a single transactional event link. partnerStatus is displayed in the picker to inform the Administrator\u2019s judgment."],
    ["EVT-DEC-007", "Event documents field is uniformly staff-only. Participant-facing materials (agendas, welcome packets, slide decks, handouts) are distributed through email attachments on event communications, not through the documents field. This eliminates accidental-exposure risk."],
    ["EVT-DEC-008", "registrationUrl is system-populated on the Draft-to-Scheduled transition. The field is read-only after population and visible via dynamic logic only when status is not Draft."],
    ["EVT-DEC-009", "venueCapacity is informational only. The system does not block registrations when venueCapacity is reached. No waitlist functionality in v1.0. Capacity is a planning and reporting aid, not an enforcement mechanism."],
    ["EVT-DEC-010", "Self-cancellation removed entirely. All registration cancellations are staff-initiated through the Content and Event Administrator. Confirmation email directs recipients to contact a dedicated events address to cancel. Likelihood that the target CRM can support self-cancellation without significant customization is low, and the effort is not justified by the value."],
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
  c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group. Event is a single-domain entity with no type discriminator, so all fields are always visible (subject to value-based dynamic logic rules in Section 5)."));

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
