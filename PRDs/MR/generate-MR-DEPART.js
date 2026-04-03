const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, PageNumber, TabStopType, TabStopPosition
} = require("docx");

// ─── helpers ──────────────────────────────────────────────
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };
const headerShading = { fill: "D5E8F0", type: ShadingType.CLEAR };

function p(text, opts = {}) {
  const runs = [];
  if (typeof text === "string") {
    runs.push(new TextRun({ text, bold: !!opts.bold, italics: !!opts.italics, font: "Arial", size: opts.size || 24 }));
  } else if (Array.isArray(text)) {
    text.forEach(t => runs.push(t));
  }
  const pOpts = { children: runs, spacing: { after: opts.after !== undefined ? opts.after : 200 } };
  if (opts.heading !== undefined) pOpts.heading = opts.heading;
  if (opts.alignment) pOpts.alignment = opts.alignment;
  if (opts.numbering) pOpts.numbering = opts.numbering;
  if (opts.indent) pOpts.indent = opts.indent;
  return new Paragraph(pOpts);
}

function bold(text) { return new TextRun({ text, bold: true, font: "Arial", size: 24 }); }
function normal(text) { return new TextRun({ text, font: "Arial", size: 24 }); }
function italic(text) { return new TextRun({ text, italics: true, font: "Arial", size: 24 }); }
function boldItalic(text) { return new TextRun({ text, bold: true, italics: true, font: "Arial", size: 24 }); }

function h1(text) { return p(text, { heading: HeadingLevel.HEADING_1 }); }
function h2(text) { return p(text, { heading: HeadingLevel.HEADING_2 }); }

function metaRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 2400, type: WidthType.DXA }, margins: cellMargins,
        shading: headerShading,
        children: [p([bold(label)], { after: 0 })]
      }),
      new TableCell({
        borders, width: { size: 6960, type: WidthType.DXA }, margins: cellMargins,
        children: [p(value, { after: 0 })]
      }),
    ]
  });
}

// 6 column data table helpers
const dataColWidths = [1300, 1700, 700, 800, 1200, 3560];
const dataTableWidth = dataColWidths.reduce((a, b) => a + b, 0);
const dataHeaders = ["ID", "Field Name", "Type", "Required", "Enum Values", "Description"];

function dataHeaderRow() {
  return new TableRow({
    children: dataHeaders.map((h, i) =>
      new TableCell({
        borders, width: { size: dataColWidths[i], type: WidthType.DXA },
        margins: cellMargins, shading: headerShading,
        children: [p([bold(h)], { after: 0 })]
      })
    )
  });
}

function dataRow(cells) {
  return new TableRow({
    children: cells.map((c, i) =>
      new TableCell({
        borders, width: { size: dataColWidths[i], type: WidthType.DXA },
        margins: cellMargins,
        children: [p(c, { after: 0 })]
      })
    )
  });
}

// Requirements table: 2 columns
const reqColWidths = [2000, 7360];

function reqRow(id, text) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: reqColWidths[0], type: WidthType.DXA },
        margins: cellMargins, shading: headerShading,
        children: [p([bold(id)], { after: 0 })]
      }),
      new TableCell({
        borders, width: { size: reqColWidths[1], type: WidthType.DXA },
        margins: cellMargins,
        children: [p(text, { after: 0 })]
      }),
    ]
  });
}

// ─── content ──────────────────────────────────────────────

const children = [];

// Title block
children.push(p([bold("Cleveland Business Mentors")], { alignment: AlignmentType.CENTER, after: 100 }));
children.push(p([bold("Mentor Departure and Reactivation (MR-DEPART)")], { alignment: AlignmentType.CENTER, after: 100 }));
children.push(p([italic("Process Document")], { alignment: AlignmentType.CENTER, after: 400 }));

// Metadata table
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    metaRow("Domain", "Mentor Recruitment (MR)"),
    metaRow("Process Code", "MR-DEPART"),
    metaRow("Version", "1.0"),
    metaRow("Status", "Draft"),
    metaRow("Last Updated", "04-03-26 21:00"),
    metaRow("Source", "Enriched from CBM-Domain-PRD-MentorRecruitment.md v1.0; restructured into 11-section process document standard."),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 1: Process Purpose ───
children.push(h1("1. Process Purpose"));
children.push(p("The Mentor Departure and Reactivation process manages the permanent exit of mentors from CBM and the reinstatement of previously departed mentors. It begins when a mentor resigns voluntarily, when the Mentor Administrator decides to administratively remove a mentor, or when a formerly departed mentor requests reinstatement. The process ends when the mentor\u2019s status has been changed, departure fields recorded (or cleared, in the case of reactivation), and external account deprovisioning completed."));
children.push(p("MR-DEPART contains three distinct paths within a single process:"));
children.push(p([bold("Voluntary Resignation"), normal(" \u2014 A mentor chooses to leave CBM. The mentor contacts the Mentor Administrator, the status is changed to Resigned, and departure cleanup is performed.")], { after: 100 }));
children.push(p([bold("Administrative Departure"), normal(" \u2014 The Mentor Administrator decides to remove a mentor from the program, typically after a pattern of inactivity but potentially for other reasons. The status is changed to Departed and departure cleanup is performed.")], { after: 100 }));
children.push(p([bold("Reactivation from Departed"), normal(" \u2014 A previously departed mentor requests reinstatement. The Mentor Administrator evaluates the request and, if approved, restores the mentor to Active or Provisional status.")], { after: 100 }));
children.push(p("This is a low-volume process \u2014 CBM has over 100 active mentors and loses a couple per year. Reactivation is rarer still. All mentor records are retained permanently after departure; no data is deleted or anonymized."));

// ─── Section 2: Process Triggers ───
children.push(h1("2. Process Triggers"));

children.push(p([bold("Path 1: Voluntary Resignation")], { after: 100 }));
children.push(p([bold("Preconditions: "), normal("A Contact record must exist with Contact Type = Mentor and Mentor Status in [Active, Paused, Inactive]. The mentor has decided to leave CBM.")], { after: 100 }));
children.push(p([bold("Required Data: "), normal("The Contact record with current mentor status.")], { after: 100 }));
children.push(p([bold("Initiation Mechanism: "), normal("Manual. The mentor contacts the Mentor Administrator by phone or email to communicate their intent to resign.")], { after: 100 }));
children.push(p([bold("Initiating Persona: "), normal("Mentor (MST-PER-011).")], { after: 100 }));

children.push(p([bold("Path 2: Administrative Departure")], { after: 100 }));
children.push(p([bold("Preconditions: "), normal("A Contact record must exist with Contact Type = Mentor and Mentor Status in [Active, Paused, Inactive]. The Mentor Administrator has determined that the mentor should be permanently removed from the program.")], { after: 100 }));
children.push(p([bold("Required Data: "), normal("The Contact record with current mentor status. The Mentor Administrator\u2019s assessment of the situation (typically based on accumulated inactivity evidence, but may be triggered by other circumstances).")], { after: 100 }));
children.push(p([bold("Initiation Mechanism: "), normal("Manual. The Mentor Administrator decides to depart the mentor based on their assessment.")], { after: 100 }));
children.push(p([bold("Initiating Persona: "), normal("Mentor Administrator (MST-PER-005).")], { after: 100 }));

children.push(p([bold("Path 3: Reactivation from Departed")], { after: 100 }));
children.push(p([bold("Preconditions: "), normal("A Contact record must exist with Contact Type = Mentor and Mentor Status = Departed. The former mentor has contacted the Mentor Administrator to request reinstatement.")], { after: 100 }));
children.push(p([bold("Required Data: "), normal("The Contact record with departure history. The mentor\u2019s compliance records (training, ethics agreement, background check) for currency assessment.")], { after: 100 }));
children.push(p([bold("Initiation Mechanism: "), normal("Manual. The former mentor contacts the Mentor Administrator by phone or email to request reinstatement.")], { after: 100 }));
children.push(p([bold("Initiating Persona: "), normal("Mentor (MST-PER-011), though approval is at the sole discretion of the Mentor Administrator.")], { after: 100 }));

// ─── Section 3: Personas Involved ───
children.push(h1("3. Personas Involved"));
children.push(p([bold("Mentor Administrator (MST-PER-005)")], { after: 100 }));
children.push(p("Primary persona for all three paths. Reviews the departing mentor\u2019s engagements, contacts the Client Assignment Coordinator to initiate reassignment through MN-MATCH, changes the mentor\u2019s status, records the departure reason and date, follows the external deprovisioning checklist, and optionally sends a thank-you communication. For reactivation, evaluates the request, verifies compliance record currency, restores the mentor\u2019s status, clears departure fields, and coordinates external account restoration."));
children.push(p([bold("Mentor (MST-PER-011)")], { after: 100 }));
children.push(p("Initiates voluntary resignation by contacting the Mentor Administrator. May initiate a reactivation request by contacting the Mentor Administrator. Does not perform any CRM actions during this process."));

// ─── Section 4: Process Workflow ───
children.push(h1("4. Process Workflow"));
children.push(p("MR-DEPART contains three distinct paths. Paths 1 and 2 (departure) share the same workflow steps; they differ only in the initiating event and the target status value. Path 3 (reactivation) is a separate workflow."));

children.push(h2("4.1 Voluntary Resignation"));
children.push(p("1. The mentor contacts the Mentor Administrator by phone or email to communicate their decision to leave CBM."));
children.push(p("2. The Mentor Administrator reviews the mentor\u2019s engagements in the CRM, checking for any where the departing mentor is the Assigned Mentor and the Engagement Status is Active, Assigned, or On-Hold. If any such engagements exist, the Mentor Administrator contacts the Client Assignment Coordinator to initiate MN-MATCH for reassignment."));
children.push(p("3. The Mentor Administrator changes Mentor Status to Resigned, records the Departure Reason and Departure Date on the Contact record. The status change is immediate \u2014 it does not wait for engagement reassignment to complete."));
children.push(p("4. The Mentor Administrator follows the external deprovisioning checklist to deactivate the mentor\u2019s system accounts (email, learning management system, CRM login, and any other provisioned accounts). Account deprovisioning is managed outside the CRM. The cbmEmailAddress field on the Contact record is retained as historical data."));
children.push(p("5. At the Mentor Administrator\u2019s discretion, a thank-you email or other token of appreciation is sent to the departing mentor. This communication is handled outside the CRM."));

children.push(h2("4.2 Administrative Departure"));
children.push(p("1. The Mentor Administrator determines that a mentor should be permanently removed from the program. This is typically triggered by a pattern of inactivity (accumulated evidence from MR-MANAGE\u2019s mentor-level monitoring and MN-INACTIVE\u2019s engagement-level monitoring) but may be triggered by other circumstances."));
children.push(p("2. The Mentor Administrator reviews the mentor\u2019s engagements in the CRM, checking for any where the mentor is the Assigned Mentor and the Engagement Status is Active, Assigned, or On-Hold. If any such engagements exist, the Mentor Administrator contacts the Client Assignment Coordinator to initiate MN-MATCH for reassignment."));
children.push(p("3. The Mentor Administrator changes Mentor Status to Departed, records the Departure Reason and Departure Date on the Contact record. The status change is immediate \u2014 it does not wait for engagement reassignment to complete."));
children.push(p("4. The Mentor Administrator follows the external deprovisioning checklist to deactivate the mentor\u2019s system accounts outside the CRM. The cbmEmailAddress field on the Contact record is retained as historical data."));
children.push(p("5. At the Mentor Administrator\u2019s discretion, a thank-you or notification communication may be sent to the departing mentor. This communication is handled outside the CRM."));

children.push(h2("4.3 Reactivation from Departed"));
children.push(p("1. A formerly departed mentor contacts the Mentor Administrator by phone or email to request reinstatement."));
children.push(p("2. The Mentor Administrator evaluates the request. Approval is at the Mentor Administrator\u2019s sole discretion. If the request is denied, the process ends with no changes to the Contact record."));
children.push(p("3. If approved, the Mentor Administrator reviews the mentor\u2019s compliance records \u2014 training completion, ethics agreement, and background check \u2014 to determine whether any have expired or need renewal. There are no defined expiration periods; currency assessment is at the Mentor Administrator\u2019s judgment."));
children.push(p("4. If the Mentor Administrator determines all compliance records are current, they change Mentor Status directly to Active. If compliance records need renewal, they change Mentor Status to Provisional and route the mentor through the relevant MR-ONBOARD steps before activation."));
children.push(p("5. The Mentor Administrator clears the Departure Reason and Departure Date fields on the Contact record."));
children.push(p("6. The Mentor Administrator coordinates restoration of the mentor\u2019s CBM email account and other system accounts outside the CRM, using the cbmEmailAddress already stored on the Contact record."));
children.push(p("7. The Mentor Administrator optionally adds a note on the mentor\u2019s Contact record documenting the reactivation and any relevant context."));

// ─── Section 5: Process Completion ───
children.push(h1("5. Process Completion"));

children.push(p([bold("Departure (Paths 1 and 2)")], { after: 100 }));
children.push(p("The departure process is complete when Mentor Status has been changed to Resigned or Departed, the Departure Reason and Departure Date have been recorded, and the external deprovisioning checklist has been followed. If the departing mentor had active engagements, the Client Assignment Coordinator will complete reassignment through MN-MATCH independently \u2014 departure completion does not depend on reassignment completion."));

children.push(p([bold("Reactivation (Path 3)")], { after: 100 }));
children.push(p("The reactivation process is complete when Mentor Status has been changed to Active (or Provisional, if onboarding steps are required), the Departure Reason and Departure Date have been cleared, and external account restoration has been coordinated. If the mentor was routed through Provisional status, full reactivation completes when MR-ONBOARD finishes and the mentor reaches Active status."));

children.push(p([bold("Reactivation Denied")], { after: 100 }));
children.push(p("If the Mentor Administrator denies a reactivation request, the process ends immediately with no changes to the Contact record. The mentor remains in Departed status."));

children.push(p([bold("Post-Completion Handoffs")], { after: 100 }));
children.push(p("Departure triggers MN-MATCH if any active engagements (Active, Assigned, or On-Hold) require mentor reassignment. Reactivation may trigger MR-ONBOARD if the Mentor Administrator determines compliance records need renewal and sets status to Provisional."));

// ─── Section 6: System Requirements ───
children.push(h1("6. System Requirements"));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: reqColWidths,
  rows: [
    reqRow("MR-DEPART-REQ-001", "The system must support transition of a mentor to Resigned or Departed status with a recorded departure reason and departure date. The transition may originate from any current mentor status (Active, Paused, or Inactive)."),
    reqRow("MR-DEPART-REQ-002", "The system must support reactivation of a mentor from Departed status back to Active or Provisional, including clearing the departure reason and departure date fields."),
    reqRow("MR-DEPART-REQ-003", "The system must provide the Mentor Administrator with a view of all engagements (Active, Assigned, or On-Hold) where a departing mentor is the Assigned Mentor, so the administrator can identify engagements requiring reassignment."),
    reqRow("MR-DEPART-REQ-004", "All mentor records must be retained permanently after departure \u2014 no deletion or anonymization. Session history, engagement history, notes, and dues records remain intact."),
  ]
}));

// ─── Section 7: Process Data ───
children.push(h1("7. Process Data"));
children.push(p("This section lists fields that MR-DEPART references or uses to support its work. These fields are populated by prior processes and are read-only within MR-DEPART."));

children.push(p([bold("Entity: Contact")], { after: 100 }));
children.push(p([bold("Mentor Status and Email (populated by MR-ONBOARD and MR-MANAGE)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-ONBOARD-DAT-005", "cbmEmailAddress", "email", "No", "\u2014", "Mentor\u2019s CBM organizational email address. Referenced when following the external deprovisioning checklist at departure and when coordinating account restoration at reactivation."]),
  ]
}));

children.push(p([bold("Compliance Records (populated by MR-ONBOARD)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-ONBOARD-DAT-002", "trainingCompleted", "bool", "Yes", "\u2014", "Whether the mentor has completed required training. Referenced during reactivation to assess whether onboarding steps need to be repeated."]),
    dataRow(["MR-ONBOARD-DAT-003", "trainingCompletionDate", "date", "No", "\u2014", "Date training was completed. Referenced during reactivation for currency assessment."]),
    dataRow(["MR-ONBOARD-DAT-004", "ethicsAgreementAccepted", "bool", "No", "\u2014", "Whether the mentor has accepted the CBM ethics agreement. Referenced during reactivation to determine if re-signing is needed."]),
    dataRow(["MR-ONBOARD-DAT-004", "ethicsAgreementAcceptanceDateTime", "datetime", "No", "\u2014", "Date and time of the ethics agreement acceptance. Referenced during reactivation for currency assessment."]),
    dataRow(["MR-ONBOARD-DAT-005", "backgroundCheckCompleted", "bool", "No", "\u2014", "Whether a background check was completed. Referenced during reactivation."]),
    dataRow(["MR-ONBOARD-DAT-005", "backgroundCheckDate", "date", "No", "\u2014", "Date the background check was completed. Referenced during reactivation for currency assessment."]),
  ]
}));

children.push(p([bold("Entity: Engagement")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MN-INTAKE-DAT-017", "engagementStatus", "enum", "Yes", "Submitted, Declined, Pending Acceptance, Assigned, Active, On-Hold, Dormant, Inactive, Abandoned, Completed", "The current lifecycle stage of the engagement. MR-DEPART checks for engagements in Active, Assigned, or On-Hold status linked to the departing mentor."]),
    dataRow(["MN-MATCH-DAT-019", "Assigned Mentor", "relationship", "Yes", "\u2014", "The primary mentor assigned to this engagement (manyToOne to Contact). MR-DEPART uses this relationship to identify which engagements belong to the departing mentor."]),
  ]
}));

// ─── Section 8: Data Collected ───
children.push(h1("8. Data Collected"));
children.push(p("This section lists fields that MR-DEPART creates or updates."));

children.push(p([bold("Entity: Contact")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-DEPART-DAT-001", "mentorStatus", "enum", "Yes", "Resigned, Departed (values used by this process)", "Changed to Resigned (voluntary departure) or Departed (administrative departure). Changed to Active or Provisional on reactivation. Full enum: Prospect, Submitted, In Review, Provisional, Active, Paused, Inactive, Resigned, Departed, Declined."]),
    dataRow(["MR-DEPART-DAT-002", "departureReason", "enum", "No", "Relocated, Career Change, Time Constraints, Personal, Other", "Reason the mentor exited CBM. Set by the Mentor Administrator at departure. Cleared on reactivation. Visible when mentorStatus in [Resigned, Departed]."]),
    dataRow(["MR-DEPART-DAT-003", "departureDate", "date", "No", "\u2014", "Date the mentor departed. Set by the Mentor Administrator at departure. Cleared on reactivation. Visible when mentorStatus in [Resigned, Departed]."]),
  ]
}));

// ─── Section 9: Open Issues ───
children.push(h1("9. Open Issues"));
children.push(p("No open issues were identified during this interview. All questions from the session prompt were resolved during the conversation."));

// ─── Section 10: Updates to Prior Documents ───
children.push(h1("10. Updates to Prior Documents"));

children.push(p([bold("Update 1: Contact Entity PRD \u2014 Departure field visibility rule")], { after: 100 }));
children.push(p("The Contact Entity PRD (PRDs/entities/Contact-Entity-PRD.docx) currently defines departureReason and departureDate with dynamic logic visibility of \u201Cvisible when mentorStatus = Departed.\u201D This must be updated to \u201Cvisible when mentorStatus in [Resigned, Departed]\u201D so that both fields are accessible for voluntary resignations as well as administrative departures."));

children.push(p([bold("Update 2: MN-MATCH \u2014 New trigger for engagement reassignment")], { after: 100 }));
children.push(p("The MN-MATCH process document (PRDs/MN/MN-MATCH.docx) currently defines a single trigger: when a new client engagement needs a mentor assigned. MR-DEPART introduces a second trigger: when the Mentor Administrator contacts the Client Assignment Coordinator to initiate reassignment of active engagements from a departing mentor. MN-MATCH should be updated to document this additional entry point."));

// ─── Section 11: Interview Transcript ───
children.push(h1("11. Interview Transcript"));

children.push(p([bold("Process Scope and Structure")], { after: 100 }));
children.push(p([bold("Q: "), normal("MR-DEPART covers three outcomes: voluntary resignation, administrative departure, and reactivation. Is this one process with three paths, or should these be separate process documents?")]));
children.push(p([bold("A: "), normal("They are separate paths but the processes are so simple it makes no sense to split them up. One process document with different options.")]));
children.push(p([boldItalic("Decision: MR-DEPART is one process document containing three distinct paths: voluntary resignation, administrative departure, and reactivation from Departed.")]));

children.push(p([bold("Process Volume and Frequency")], { after: 100 }));
children.push(p([bold("Q: "), normal("How often does this process occur?")]));
children.push(p([bold("A: "), normal("We have over 100 mentors, so we lose a couple every year. Reactivation almost never happens.")]));
children.push(p([boldItalic("Decision: Low-volume process. Design for correctness when it occurs, not high throughput.")]));

children.push(p([bold("Voluntary Resignation Trigger")], { after: 100 }));
children.push(p([bold("Q: "), normal("When a mentor decides to leave, how does that typically happen?")]));
children.push(p([bold("A: "), normal("Almost always the Mentor Administrator gets a call or email from the mentor.")]));
children.push(p([boldItalic("Decision: No formal resignation form or system submission. The mentor contacts the Mentor Administrator directly.")]));

children.push(p([bold("Administrative Departure Trigger")], { after: 100 }));
children.push(p([bold("Q: "), normal("What triggers an administrative departure? Is it always the end of an escalation path from Inactive status?")]));
children.push(p([bold("A: "), normal("Almost always the admin becomes aware of inactivity through some mechanism and decides to depart the mentor.")]));
children.push(p([bold("Q: "), normal("Can the Mentor Administrator depart a mentor directly from Active or Paused status without going through Inactive first?")]));
children.push(p([bold("A: "), normal("Yes, there can be unusual circumstances that cause the admin to start the depart process.")]));
children.push(p([boldItalic("Decision: Administrative departure is typically triggered by inactivity patterns but the Mentor Administrator has authority to initiate departure from any status (Active, Paused, or Inactive) when circumstances warrant.")]));

children.push(p([bold("Reactivation Trigger")], { after: 100 }));
children.push(p([bold("Q: "), normal("How does reactivation get triggered?")]));
children.push(p([bold("A: "), normal("A former mentor would have to call the Mentor Administrator and make a case to be reinstated.")]));
children.push(p([boldItalic("Decision: Reactivation is mentor-initiated but admin-decided. The departed mentor requests it; the Mentor Administrator makes a judgment call on approval. No automatic right to return.")]));

children.push(p([bold("Personas Involved")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does the Client Assignment Coordinator get involved when engagements need to be reassigned?")]));
children.push(p([bold("A: "), normal("Just the Mentor Administrator handles everything, including contacting the Client Assignment Coordinator for reassignment.")]));
children.push(p([boldItalic("Decision: Only two personas: Mentor Administrator (all steps) and Mentor (initiates resignation or reactivation request). The Client Assignment Coordinator is contacted by the Mentor Administrator but acts through the MN-MATCH process, not as a participant in MR-DEPART.")]));

children.push(p([bold("Departure Workflow")], { after: 100 }));
children.push(p([bold("Q: "), normal("Walk me through what happens when a mentor departs.")]));
children.push(p([bold("A: "), normal("Review the mentor\u2019s engagements to make sure they are all closed. If not, call the Client Assignment Coordinator to reassign new mentors. Then set the status of the mentor to the appropriate status, enter a reason why they left, and then deactivate all of their system accounts. Finally send them a thank-you email or other token of appreciation at the admin\u2019s discretion.")]));
children.push(p([boldItalic("Decision: Five-step departure workflow: (1) review engagements, (2) contact Client Assignment Coordinator for reassignment via MN-MATCH, (3) change status and record reason/date, (4) follow external deprovisioning checklist, (5) optional thank-you communication.")]));

children.push(p([bold("MN-MATCH Trigger")], { after: 100 }));
children.push(p([bold("Q: "), normal("When engagements need reassignment, does the Client Assignment Coordinator go through the full MN-MATCH process?")]));
children.push(p([bold("A: "), normal("They should follow the MN-MATCH process.")]));
children.push(p([bold("A (continued): "), normal("We need to add a new trigger for the MN-MATCH process.")]));
children.push(p([boldItalic("Decision: Engagement reassignment follows the full MN-MATCH process. MN-MATCH needs a new trigger added for departure-driven reassignment. Captured as Update 2 in Section 10.")]));

children.push(p([bold("Departure Timing")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does the departure have to wait until all engagements are reassigned?")]));
children.push(p([bold("A: "), normal("No, the departure is usually immediate.")]));
children.push(p([boldItalic("Decision: The status change to Resigned or Departed is immediate. Engagement reassignment through MN-MATCH proceeds in parallel, not as a prerequisite.")]));

children.push(p([bold("Engagement Review Scope")], { after: 100 }));
children.push(p([bold("Q: "), normal("When checking engagements, which statuses require attention?")]));
children.push(p([bold("A: "), normal("Active, Assigned, and On-Hold. That\u2019s it.")]));
children.push(p([boldItalic("Decision: Only engagements in Active, Assigned, or On-Hold status where the departing mentor is the Assigned Mentor require reassignment. Other engagement statuses (Dormant, Inactive, Completed, etc.) do not require action.")]));

children.push(p([bold("Co-Mentor and SME Assignments")], { after: 100 }));
children.push(p([bold("Q: "), normal("When a mentor departs, does the admin also need to remove them from Co-Mentor or SME assignments?")]));
children.push(p([bold("A: "), normal("Stay as history.")]));
children.push(p([boldItalic("Decision: Only the Assigned Mentor (primary) engagements require reassignment. Co-Mentor and SME assignments (via Additional Mentors relationship) remain on the record as historical data.")]));

children.push(p([bold("Departure Reason Values")], { after: 100 }));
children.push(p([bold("Q: "), normal("The current departureReason values are Relocated, Career Change, Time Constraints, Personal, Other. Should there be additional values for administrative departures like Prolonged Inactivity or Conduct Issue?")]));
children.push(p([bold("A: "), normal("Other covers those issues along with a note.")]));
children.push(p([boldItalic("Decision: The existing departureReason enum values are sufficient for both resignation and administrative departure. The \u201COther\u201D value combined with an administrator note handles unusual cases.")]));

children.push(p([bold("Departure Field Applicability")], { after: 100 }));
children.push(p([bold("Q: "), normal("The Contact Entity PRD currently shows departureReason and departureDate as visible only when mentorStatus = Departed. Should these also apply to Resigned mentors?")]));
children.push(p([bold("A: "), normal("Yes.")]));
children.push(p([boldItalic("Decision: departureReason and departureDate apply to both Resigned and Departed mentors. The visibility rule in the Contact Entity PRD must be updated from \u201CmentorStatus = Departed\u201D to \u201CmentorStatus in [Resigned, Departed].\u201D Captured as Update 1 in Section 10.")]));

children.push(p([bold("CBM Email Address at Departure")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does the Mentor Administrator clear the cbmEmailAddress field at departure?")]));
children.push(p([bold("A: "), normal("I would not clear the cbmEmailAddress. That is historical data.")]));
children.push(p([boldItalic("Decision: cbmEmailAddress is retained on the Contact record after departure. This changes the legacy document which specified clearing the field. Account deprovisioning is handled entirely outside the CRM via a separate checklist.")]));

children.push(p([bold("System Account Deprovisioning")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is clearing the cbmEmailAddress field and deprovisioning the email account the main deactivation step, or are there other accounts?")]));
children.push(p([bold("A: "), normal("There will be a separate checklist defined outside of the CRM for deactivating accounts.")]));
children.push(p([boldItalic("Decision: From the CRM\u2019s perspective, no fields are cleared for account deprovisioning. All system account deactivation (email, LMS, CRM login, etc.) is managed outside the CRM via an external checklist.")]));

children.push(p([bold("Accepting New Clients at Departure")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does the Mentor Administrator need to set Accepting New Clients = No when a mentor departs?")]));
children.push(p([bold("A: "), normal("Not necessary since they are not active mentors.")]));
children.push(p([boldItalic("Decision: No need to explicitly set Accepting New Clients = No at departure. MN-MATCH only considers Active mentors, so the status change alone removes them from the assignment pool.")]));

children.push(p([bold("Departure Notifications")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is anyone notified automatically by the system when a mentor departs?")]));
children.push(p([bold("A: "), normal("All admin discretion for communications.")]));
children.push(p([boldItalic("Decision: No automated notifications on departure. All communication (to clients, other administrators, or the departing mentor) is handled personally by the Mentor Administrator and Client Assignment Coordinator at their discretion.")]));

children.push(p([bold("Thank-You Communication")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is the thank-you communication tracked in the CRM?")]));
children.push(p([bold("A: "), normal("Outside CRM.")]));
children.push(p([boldItalic("Decision: Thank-you communication is a personal gesture handled outside the CRM. Not tracked.")]));

children.push(p([bold("Administrative Departure Workflow")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does the administrative departure workflow differ from voluntary resignation?")]));
children.push(p([bold("A: "), normal("Same workflow, just with Departed instead of Resigned.")]));
children.push(p([boldItalic("Decision: Same five-step workflow for both paths. Only the status value (Resigned vs. Departed) and the initiating event differ.")]));

children.push(p([bold("Reactivation Workflow")], { after: 100 }));
children.push(p([bold("Q: "), normal("Walk me through reactivation from Departed.")]));
children.push(p([bold("A: "), normal("The admin would manually verify if the ethics need to be re-signed and any other steps. They would then go into CRM and change status back to Active, and clear the reason. They might add a note in the mentor notes field for admins.")]));
children.push(p([boldItalic("Decision: Reactivation involves: (1) evaluate request, (2) verify compliance record currency, (3) change status to Active (or Provisional if onboarding needed), (4) clear departure fields, (5) restore external accounts, (6) optionally add admin note.")]));

children.push(p([bold("Compliance Record Expiration")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is there a defined expiration period for training, ethics agreement, or background check?")]));
children.push(p([bold("A: "), normal("Admin judgment.")]));
children.push(p([boldItalic("Decision: No defined expiration periods for compliance records. Currency assessment during reactivation is entirely at the Mentor Administrator\u2019s judgment.")]));

children.push(p([bold("Reactivation Target Status")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does a reactivated mentor go directly to Active, or through Provisional and MR-ONBOARD?")]));
children.push(p([bold("A: "), normal("Up to admin.")]));
children.push(p([boldItalic("Decision: The Mentor Administrator decides whether to reactivate directly to Active or route through Provisional/MR-ONBOARD. Fully at their discretion based on the situation.")]));

children.push(p([bold("CBM Email at Reactivation")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does a reactivated mentor get a new email or restore the old one?")]));
children.push(p([bold("A: "), normal("Restore old one.")]));
children.push(p([boldItalic("Decision: The mentor\u2019s original CBM email address is restored. Since cbmEmailAddress is retained on the Contact record, the admin knows which address to restore.")]));

children.push(p([bold("Clearing Departure Fields")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is departureDate also cleared on reactivation, or retained as history?")]));
children.push(p([bold("A: "), normal("Clear it.")]));
children.push(p([boldItalic("Decision: Both departureReason and departureDate are cleared on reactivation.")]));

children.push(p([bold("Reactivation Date Field")], { after: 100 }));
children.push(p([bold("Q: "), normal("The legacy document defined a reactivation date field (MR-DEPART-DAT-004). Do you want to track reactivation dates?")]));
children.push(p([bold("A: "), normal("No.")]));
children.push(p([boldItalic("Decision: No reactivation date field. The admin note captures the context if needed. Legacy MR-DEPART-DAT-004 is not carried forward.")]));

children.push(p([bold("Departure Reason Required")], { after: 100 }));
children.push(p([bold("Q: "), normal("Should the system require departureReason and departureDate when the status is changed to Resigned or Departed?")]));
children.push(p([bold("A: "), normal("Admin discretion.")]));
children.push(p([boldItalic("Decision: departureReason and departureDate are optional fields, not required by validation. The Mentor Administrator decides whether to populate them.")]));

// ─── Build document ──────────────────────────────────────

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "MR-DEPART \u2014 Mentor Departure and Reactivation", font: "Arial", size: 18, color: "888888" }),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: "Cleveland Business Mentors", font: "Arial", size: 18, color: "888888" }),
              new TextRun({ text: "\t", font: "Arial", size: 18 }),
              new TextRun({ text: "Page ", font: "Arial", size: 18, color: "888888" }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "888888" }),
            ],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
          })
        ]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/MR-DEPART.docx", buffer);
  console.log("MR-DEPART.docx created successfully");
});
