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
  if (opts.pageBreak) runs.push(new TextRun({ break: undefined, children: [] }));
  // Handle bold prefix
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

// Issues table: 3 columns
const issColWidths = [1500, 5860, 2000];

function issHeaderRow() {
  return new TableRow({
    children: ["ID", "Issue", "Owner"].map((h, i) =>
      new TableCell({
        borders, width: { size: issColWidths[i], type: WidthType.DXA },
        margins: cellMargins, shading: headerShading,
        children: [p([bold(h)], { after: 0 })]
      })
    )
  });
}

function issRow(id, issue, owner) {
  return new TableRow({
    children: [
      new TableCell({ borders, width: { size: issColWidths[0], type: WidthType.DXA }, margins: cellMargins,
        children: [p([bold(id)], { after: 0 })] }),
      new TableCell({ borders, width: { size: issColWidths[1], type: WidthType.DXA }, margins: cellMargins,
        children: [p(issue, { after: 0 })] }),
      new TableCell({ borders, width: { size: issColWidths[2], type: WidthType.DXA }, margins: cellMargins,
        children: [p(owner, { after: 0 })] }),
    ]
  });
}

// Dues entity data table - 6 columns same as contact
function duesDataRow(cells) { return dataRow(cells); }

// ─── content ──────────────────────────────────────────────

const children = [];

// Title block
children.push(p([bold("Cleveland Business Mentors")], { alignment: AlignmentType.CENTER, after: 100 }));
children.push(p([bold("Mentor Management (MR-MANAGE)")], { alignment: AlignmentType.CENTER, after: 100 }));
children.push(p([italic("Process Document")], { alignment: AlignmentType.CENTER, after: 400 }));

// Metadata table
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    metaRow("Domain", "Mentor Recruitment (MR)"),
    metaRow("Process Code", "MR-MANAGE"),
    metaRow("Version", "1.0"),
    metaRow("Status", "Draft"),
    metaRow("Last Updated", "04-02-26 22:30"),
    metaRow("Source", "Enriched from CBM-Domain-PRD-MentorRecruitment.md v1.0; restructured into 11-section process document standard."),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 1: Process Purpose ───
children.push(h1("1. Process Purpose"));
children.push(p("The Mentor Management process provides ongoing oversight and support for active mentors throughout their tenure with CBM. It begins when a mentor is activated at the end of MR-ONBOARD (Mentor Status = Active) and continues without a defined end state until the mentor exits to MR-DEPART (Resigned or Departed)."));
children.push(p("Unlike the prior MR processes, which are linear workflows with defined start and end states, MR-MANAGE is a continuous process comprising multiple concurrent activities. These activities include: mentor profile and role eligibility management, capacity management, mentor activity monitoring and response, status management for temporary breaks and inactivity, dues billing and tracking, and the mentor directory and analytics."));
children.push(p("The Mentor Administrator is the primary persona, responsible for monitoring the active mentor population, responding to situations as they arise, and maintaining accurate records. Mentors participate by maintaining their own profiles, managing their capacity and availability, and accessing the mentor directory. The process is primarily reactive \u2014 the Mentor Administrator responds to alerts, mentor requests, and situational changes rather than following a prescribed sequence of steps."));

// ─── Section 2: Process Triggers ───
children.push(h1("2. Process Triggers"));
children.push(p([bold("Preconditions")], { after: 100 }));
children.push(p("A Contact record must exist with Contact Type = Mentor and Mentor Status = Active. This status is set by MR-ONBOARD when the Mentor Administrator activates a mentor after all onboarding steps are complete. At the point of activation, isPrimaryMentor = Yes (set automatically), maximumClientCapacity and acceptingNewClients are set by the Mentor Administrator, and the mentor has a CBM organizational email address."));
children.push(p([bold("Required Data")], { after: 100 }));
children.push(p("The Contact record with all application and onboarding data from MR-APPLY and MR-ONBOARD: identity fields, professional background, role eligibility (isPrimaryMentor = Yes), capacity settings, compliance records (training, ethics agreement, background check if applicable), and CBM email address."));
children.push(p([bold("Initiation Mechanism")], { after: 100 }));
children.push(p("Automatic. MR-MANAGE begins implicitly when Mentor Status is changed to Active. There is no discrete initiation event \u2014 the process is continuous from activation onward."));
children.push(p([bold("Initiating Persona")], { after: 100 }));
children.push(p("Not applicable. MR-MANAGE is not initiated by a specific persona. It is an ongoing responsibility of the Mentor Administrator (MST-PER-005) that begins automatically when a mentor is activated."));

// ─── Section 3: Personas Involved ───
children.push(h1("3. Personas Involved"));
children.push(p([bold("Mentor Administrator (MST-PER-005)")], { after: 100 }));
children.push(p("Primary persona for this process. Monitors mentor activity across all engagements, manages status transitions (Active \u2194 Paused, Active \u2194 Inactive), sets and adjusts role eligibility (isPrimaryMentor, isCoMentor, isSubjectMatterExpert), creates and tracks annual dues records, responds to inactivity alerts, manages situations where mentors become unexpectedly unavailable, records administrator notes, overrides mentor capacity settings when necessary, and maintains board position information."));
children.push(p([bold("Mentor (MST-PER-011)")], { after: 100 }));
children.push(p("Maintains their own profile directly in the CRM \u2014 biography, expertise, industry sectors, mentoring focus areas, languages, and availability. Adjusts their own Maximum Client Capacity and Accepting New Clients flag. Accesses the searchable mentor directory to find other active mentors for collaboration. Changes made by mentors to their own profile take effect immediately with no approval gate."));
children.push(p([bold("System Administrator (MST-PER-001)")], { after: 100 }));
children.push(p("Configures the mentor-level inactivity alert threshold (default: 60 days). Does not participate in day-to-day mentor management activities."));

// ─── Section 4: Process Workflow ───
children.push(h1("4. Process Workflow"));
children.push(p("MR-MANAGE comprises six concurrent activity groups. These are not sequential steps \u2014 they run simultaneously throughout a mentor\u2019s active tenure and may overlap. Each activity group describes what happens, who does it, and what triggers the activity."));

children.push(h2("4.1 Mentor Profile and Role Eligibility Management"));
children.push(p("1. Active mentors maintain their own profile directly in the CRM. Editable fields include professional title, current employer, years of business experience, professional bio, industry sectors, mentoring focus areas, skills and expertise tags, fluent languages, and why interested in mentoring. Changes take effect immediately with no review or approval process."));
children.push(p("2. The Mentor Administrator manages role eligibility for each mentor. isPrimaryMentor is set to Yes automatically at activation by MR-ONBOARD. The Mentor Administrator sets isCoMentor and isSubjectMatterExpert based on administrative judgment after discussion with the mentor. A mentor may have all three role eligibility flags set to Yes simultaneously, making them eligible for Primary Mentor, Co-Mentor, and Subject Matter Expert assignments concurrently."));
children.push(p("3. The Mentor Administrator maintains the boardPosition field for mentors serving on the CBM board. This is a text field populated by the administrator with the mentor\u2019s board title (e.g., Board Chair, Treasurer, Secretary)."));
children.push(p("4. The Mentor Administrator can override any mentor-editable field at any time."));

children.push(h2("4.2 Capacity Management"));
children.push(p("1. Mentors manage their own availability by adjusting Maximum Client Capacity and Accepting New Clients. These fields are mentor-editable after activation (initial values set by the Mentor Administrator during MR-ONBOARD)."));
children.push(p("2. The system continuously calculates Current Active Clients (count of engagements where this mentor is the Assigned Mentor and Engagement Status is Active or Assigned) and Available Capacity (Maximum Client Capacity minus Current Active Clients). Both fields are system-calculated and read-only."));
children.push(p("3. Active mentors with Accepting New Clients = Yes and Available Capacity > 0 are eligible for new client assignments through the MN-MATCH process. MN-MATCH reads the mentor\u2019s profile fields (industry sectors, mentoring focus areas, languages, skills) maintained by MR-MANAGE."));
children.push(p("4. The Mentor Administrator can override a mentor\u2019s capacity settings at any time. For example, if a mentor sets their maximum too high, the administrator can reduce it."));

children.push(h2("4.3 Mentor Activity Monitoring and Response"));
children.push(p("1. The system monitors all Active mentors for session activity. If an Active mentor has no completed session in the last 60 days (default, configurable by the System Administrator), the system generates an alert to the Mentor Administrator. This alert fires regardless of whether the mentor has active engagements \u2014 having active engagements with no session activity is a worse signal, not a reason to suppress the alert."));
children.push(p("2. This mentor-level monitoring is distinct from MN-INACTIVE, which monitors individual engagements for dormancy. MR-MANAGE detects structural disengagement from the program across all assignments, while MN-INACTIVE detects inactivity within a single mentor-client relationship."));
children.push(p("3. When the Mentor Administrator receives an inactivity alert, they assess the situation and take appropriate action. This is a judgment call \u2014 the administrator may follow up directly with the mentor, review the mentor\u2019s engagement-level activity through MN-INACTIVE notifications, or initiate a status change if warranted. No automated status change occurs."));
children.push(p("4. The Mentor Administrator also monitors for mentors not responding to client assignments and mentors with overdue sessions that have not been dispositioned (completed, cancelled, or rescheduled). These signals may emerge from MN-INACTIVE engagement-level notifications or from direct observation of the mentor roster."));

children.push(h2("4.4 Status Management"));
children.push(p("MR-MANAGE owns four status transitions on the Mentor Status field. All are performed by the Mentor Administrator as manual actions based on situational judgment."));
children.push(p([bold("Active \u2192 Paused")], { after: 100 }));
children.push(p("When a mentor needs a temporary break due to health issues, personal situations, or other reasons, the Mentor Administrator changes Mentor Status to Paused and sets Accepting New Clients = No. Existing active engagements continue unless the mentor requests otherwise. The Mentor Administrator decides case by case whether to reassign specific clients to another mentor, notify clients of a temporary delay, or take other action based on the circumstances."));
children.push(p([bold("Paused \u2192 Active")], { after: 100 }));
children.push(p("When a paused mentor is ready to return, the Mentor Administrator changes Mentor Status back to Active and adjusts Accepting New Clients and Maximum Client Capacity as appropriate."));
children.push(p([bold("Active \u2192 Inactive")], { after: 100 }));
children.push(p("When the Mentor Administrator determines that an active mentor is no longer functionally participating in the program \u2014 based on accumulated evidence from inactivity alerts, unresponsive behavior across multiple engagements, and failure to disposition sessions \u2014 the Mentor Administrator changes Mentor Status to Inactive. This is always a manual judgment call, never an automated transition. The Mentor Administrator also sets Accepting New Clients = No."));
children.push(p([bold("Inactive \u2192 Active")], { after: 100 }));
children.push(p("The Mentor Administrator may reactivate an inactive mentor by changing Mentor Status back to Active and restoring capacity settings. This is a direct reactivation within MR-MANAGE \u2014 it does not require going through MR-DEPART\u2019s reactivation workflow."));
children.push(p([bold("Boundary with MR-DEPART")], { after: 100 }));
children.push(p("MR-MANAGE handles temporary and recoverable status changes (Paused, Inactive). MR-DEPART handles permanent exits from the program (Resigned, Departed). When a mentor is leaving CBM, the Mentor Administrator initiates MR-DEPART rather than using MR-MANAGE status transitions."));

children.push(h2("4.5 Dues Billing and Tracking"));
children.push(p("Annual dues are collected from mentors to support CBM\u2019s operating costs. The full business rules for dues billing \u2014 including the billing cycle, dues amount, grace period, and consequences of non-payment \u2014 are not yet defined and are captured as open issues. The following describes the known workflow structure."));
children.push(p("1. At the start of each billing cycle, the Mentor Administrator creates individual Dues records for each eligible mentor. Each Dues record represents one annual dues obligation for one mentor in one billing year."));
children.push(p("2. The Mentor Administrator tracks payment as it is received and updates the Payment Status on each Dues record (Unpaid \u2192 Paid). The Payment Date and Payment Method are recorded."));
children.push(p("3. If a dues waiver is granted, the Mentor Administrator sets Payment Status to Waived on the Dues record. No payment is required."));
children.push(p("4. The Mentor Administrator updates the summary Dues Status field on the mentor Contact record to reflect current-year standing (Unpaid, Paid, or Waived). This is a convenience field maintained independently of the individual Dues records."));
children.push(p("5. If dues remain unpaid past the grace period, the Mentor Administrator receives an alert and follows up directly with the mentor."));

children.push(h2("4.6 Mentor Directory and Analytics"));
children.push(p("1. The system provides a searchable mentor directory accessible to all active mentors. The directory displays professional profile information: name, professional title, current employer, professional bio, industry sectors, mentoring focus areas, skills and expertise tags, fluent languages, and years of business experience. Administrative fields (dues status, background check, ethics agreement, capacity settings, felony disclosure) are not visible in the mentor directory."));
children.push(p("2. The system maintains three mentor-level analytics fields on each Contact record, calculated across all of the mentor\u2019s engagements: Total Lifetime Sessions (count of all completed sessions), Total Mentoring Hours (sum of all session hours), and Total Sessions Last 30 Days (count of completed sessions in a rolling 30-day window). These fields are system-calculated, read-only, and visible in list views and on the mentor detail page."));
children.push(p("3. The Mentor Administrator records notes on individual mentor records to document conversations, decisions, and situational context. Notes are visible to administrators only \u2014 not visible to mentors. The mechanism for administrator notes is described functionally here; the underlying entity structure is deferred to a cross-domain platform services definition (see Section 9, MR-MANAGE-ISS-003)."));

// ─── Section 5: Process Completion ───
children.push(h1("5. Process Completion"));
children.push(p("MR-MANAGE has no defined end state. The process is continuous from the moment a mentor is activated until they exit to MR-DEPART. There is no normal completion event, no final action, and no persona who declares the process complete."));
children.push(p([bold("Exit to MR-DEPART")], { after: 100 }));
children.push(p("When a mentor resigns voluntarily or the Mentor Administrator decides to formally offboard a mentor, the mentor transitions from MR-MANAGE to MR-DEPART. MR-DEPART handles the Resigned and Departed status values, engagement reassignment, email deprovisioning, and permanent record retention."));
children.push(p([bold("No Early Termination")], { after: 100 }));
children.push(p("Because MR-MANAGE is a continuous process, the concept of early termination does not apply. A mentor can be Paused or set to Inactive within MR-MANAGE, but these are status transitions within the process, not terminations of it."));
children.push(p([bold("Post-Completion Handoffs")], { after: 100 }));
children.push(p("MR-MANAGE feeds data continuously to other processes during its operation. Active mentors with available capacity feed into MN-MATCH for client assignments. Session activity data feeds into MN-ENGAGE and MN-INACTIVE. Mentor-level inactivity patterns identified in MR-MANAGE may trigger follow-up through MN-INACTIVE at the engagement level, or escalation to MR-DEPART if the situation warrants departure."));

// ─── Section 6: System Requirements ───
children.push(h1("6. System Requirements"));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: reqColWidths,
  rows: [
    reqRow("MR-MANAGE-REQ-001", "The system must store a complete mentor profile including professional title, current employer, years of business experience, professional bio, industry sectors, mentoring focus areas, skills and expertise tags, fluent languages, and availability. Mentors must be able to edit their own profile fields directly. Changes take effect immediately with no approval process."),
    reqRow("MR-MANAGE-REQ-002", "The system must support three mentor role eligibility flags on the Contact record \u2014 Is Primary Mentor, Is Co-Mentor, and Is Subject Matter Expert \u2014 all settable by the Mentor Administrator. A mentor may have any combination of these flags set to Yes simultaneously."),
    reqRow("MR-MANAGE-REQ-003", "The system must calculate Current Active Clients (count of engagements where the mentor is the Assigned Mentor and Engagement Status is Active or Assigned) and Available Capacity (Maximum Client Capacity minus Current Active Clients) automatically. Both fields must be system-calculated and read-only."),
    reqRow("MR-MANAGE-REQ-004", "The system must provide a searchable mentor directory accessible to all active mentors, displaying professional profile information (name, title, employer, bio, industry sectors, focus areas, skills, languages, experience). Administrative and sensitive fields must not appear in the directory."),
    reqRow("MR-MANAGE-REQ-005", "The system must support a board position text field on the mentor Contact record for tracking board membership. This field is visible for CBM organizational member types and populated by the Mentor Administrator."),
    reqRow("MR-MANAGE-REQ-006", "The system must support annual dues billing by maintaining individual Dues records per mentor per billing year. Each record must track billing year, amount, due date, payment status, payment date, payment method, and notes. The system must alert the Mentor Administrator when dues remain unpaid past the configured grace period."),
    reqRow("MR-MANAGE-REQ-007", "The system must alert the Mentor Administrator when any Active mentor has no completed session in the last 60 days (default threshold, configurable by the System Administrator). This alert fires regardless of whether the mentor has active engagements."),
    reqRow("MR-MANAGE-REQ-008", "The system must maintain three mentor-level analytics fields on the Contact record, calculated across all engagements: Total Lifetime Sessions (count of completed sessions), Total Mentoring Hours (sum of session hours), and Total Sessions Last 30 Days (rolling 30-day window). These fields must be system-calculated, read-only, and visible in list views and detail pages."),
    reqRow("MR-MANAGE-REQ-009", "The system must support administrator notes on individual mentor records. Notes must be visible to administrators only and not accessible by mentors. The notes mechanism is defined as a cross-domain platform service (see MR-MANAGE-ISS-003)."),
    reqRow("MR-MANAGE-REQ-010", "The system must support the following status transitions on the Mentor Status field, all performed manually by the Mentor Administrator: Active \u2192 Paused, Paused \u2192 Active, Active \u2192 Inactive, and Inactive \u2192 Active. When a mentor is set to Paused or Inactive, Accepting New Clients must be set to No."),
    reqRow("MR-MANAGE-REQ-011", "The system must allow the Mentor Administrator to override any mentor-editable field, including Maximum Client Capacity and Accepting New Clients."),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 7: Process Data ───
children.push(h1("7. Process Data"));
children.push(p("This section lists fields that MR-MANAGE references or uses to support its work. These fields are populated by prior processes and are read-only within MR-MANAGE."));

children.push(p([bold("Entity: Contact")], { after: 100 }));
children.push(p([bold("Identity and Application Data (populated by MR-APPLY)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-APPLY-DAT-001", "firstName", "varchar", "Yes", "\u2014", "Mentor\u2019s first name. Populated by MR-APPLY. Referenced for identification and directory display."]),
    dataRow(["MR-APPLY-DAT-002", "lastName", "varchar", "Yes", "\u2014", "Mentor\u2019s last name. Populated by MR-APPLY. Referenced for identification and directory display."]),
    dataRow(["MR-APPLY-DAT-003", "preferredName", "varchar", "No", "\u2014", "Mentor\u2019s preferred name. Populated by MR-APPLY. Used in the mentor directory if populated."]),
    dataRow(["MR-APPLY-DAT-004", "personalEmail", "email", "Yes", "\u2014", "Mentor\u2019s personal email address. Populated by MR-APPLY. Available as a secondary contact method."]),
    dataRow(["MR-APPLY-DAT-005", "phone", "phone", "Yes", "\u2014", "Mentor\u2019s phone number. Populated by MR-APPLY. Available for follow-up communications."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Onboarding and Compliance Data (populated by MR-ONBOARD)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-ONBOARD-DAT-005", "cbmEmailAddress", "email", "No", "\u2014", "Mentor\u2019s CBM organizational email address. Assigned during MR-ONBOARD. Used for all ongoing mentoring communications."]),
    dataRow(["MR-ONBOARD-DAT-003", "trainingCompleted", "bool", "No", "\u2014", "Whether the mentor completed required training. Set by MR-ONBOARD via LMS integration or manual override. Referenced when evaluating mentor compliance."]),
    dataRow(["MR-ONBOARD-DAT-004", "trainingCompletionDate", "date", "No", "\u2014", "Date training was completed. Set by MR-ONBOARD. Referenced for compliance verification."]),
    dataRow(["MR-ONBOARD-DAT-001", "ethicsAgreementAccepted", "bool", "No", "\u2014", "Whether the mentor accepted the CBM ethics agreement. Set by MR-ONBOARD. Referenced for compliance verification."]),
    dataRow(["MR-ONBOARD-DAT-002", "ethicsAgreementAcceptanceDateTime", "datetime", "No", "\u2014", "Date and time of ethics agreement acceptance. Set by MR-ONBOARD. Referenced for compliance verification."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Entity: Engagement")], { after: 100 }));
children.push(p([bold("Engagement and Session Data (populated by MN domain processes)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-001", "engagementStatus", "enum", "Yes", "Submitted, Matched, Assigned, Active, On-Hold, Closed, Abandoned", "Status of each engagement linked to this mentor. Used to calculate Current Active Clients (count where status is Active or Assigned)."]),
    dataRow(["MR-MANAGE-DAT-002", "totalSessions", "int", "No", "\u2014", "Count of completed sessions per engagement. Defined in Engagement Entity PRD (MN-ENGAGE-DAT-018). Feeds mentor-level Total Lifetime Sessions calculation."]),
    dataRow(["MR-MANAGE-DAT-003", "totalSessionHours", "float", "No", "\u2014", "Sum of session hours per engagement. Defined in Engagement Entity PRD (MN-ENGAGE-DAT-021). Feeds mentor-level Total Mentoring Hours calculation."]),
    dataRow(["MR-MANAGE-DAT-004", "totalSessionsLast30Days", "int", "No", "\u2014", "Count of completed sessions in last 30 days per engagement. Defined in Engagement Entity PRD (MN-ENGAGE-DAT-019). Feeds mentor-level Total Sessions Last 30 Days calculation."]),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 8: Data Collected ───
children.push(h1("8. Data Collected"));
children.push(p("This section lists fields that MR-MANAGE creates or updates. Grouped by entity with full field-level detail."));

children.push(p([bold("Entity: Contact")], { after: 100 }));
children.push(p([bold("Profile Fields (mentor-editable)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-005", "title", "varchar", "No", "\u2014", "Mentor\u2019s current professional title. Mentor-editable. Displayed in the mentor directory and profile."]),
    dataRow(["MR-MANAGE-DAT-006", "currentEmployer", "varchar", "No", "\u2014", "Name of the mentor\u2019s current employer. Mentor-editable. Displayed in the mentor directory."]),
    dataRow(["MR-MANAGE-DAT-007", "yearsOfBusinessExperience", "int", "No", "\u2014", "Total years of professional business experience. Mentor-editable. Displayed in the mentor directory and used for profile context."]),
    dataRow(["MR-MANAGE-DAT-008", "professionalBio", "wysiwyg", "No", "\u2014", "Free-form description of professional background and work experience. Mentor-editable. Displayed in the mentor directory."]),
    dataRow(["MR-MANAGE-DAT-009", "industrySectors", "multiEnum", "Yes", "TBD \u2014 aligned with Client Organization values", "Industry sectors in which the mentor has experience. Mentor-editable. Primary matching criterion. Values must align with Client Organization Industry Sector field."]),
    dataRow(["MR-MANAGE-DAT-010", "mentoringFocusAreas", "multiEnum", "Yes", "TBD \u2014 see MN-ISS-001", "Specific areas where the mentor provides guidance. Mentor-editable. Primary matching criterion. Values must align with Client Organization Mentoring Focus Areas field."]),
    dataRow(["MR-MANAGE-DAT-011", "skillsAndExpertiseTags", "multiEnum", "No", "TBD \u2014 see MR-ISS-001", "Finer-grained expertise tags beyond industry and focus areas. Mentor-editable. Supports advanced matching."]),
    dataRow(["MR-MANAGE-DAT-012", "fluentLanguages", "multiEnum", "No", "TBD \u2014 see MR-ISS-002", "Languages the mentor is fluent in. Mentor-editable. Used to match clients who prefer a language other than English."]),
    dataRow(["MR-MANAGE-DAT-013", "whyInterestedInMentoring", "wysiwyg", "No", "\u2014", "Mentor\u2019s stated motivation for volunteering. Mentor-editable. Not displayed in the mentor directory."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Role Eligibility (admin-managed)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-014", "isPrimaryMentor", "bool", "Yes", "\u2014", "Whether this mentor is eligible for primary mentor assignments. Defaults to Yes at activation (set by MR-ONBOARD). Adjusted by the Mentor Administrator as needed."]),
    dataRow(["MR-MANAGE-DAT-015", "isCoMentor", "bool", "Yes", "\u2014", "Whether this mentor is eligible for co-mentor assignments. Set by the Mentor Administrator based on discussion with the mentor. Not set during onboarding."]),
    dataRow(["MR-MANAGE-DAT-016", "isSubjectMatterExpert", "bool", "Yes", "\u2014", "Whether this mentor is eligible for subject matter expert assignments. Set by the Mentor Administrator based on discussion with the mentor. Not set during onboarding."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Capacity and Availability (mentor-editable, admin-overridable)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-017", "maximumClientCapacity", "int", "Yes", "\u2014", "Maximum number of simultaneous active client engagements. Initially set by Mentor Administrator during MR-ONBOARD. Mentor-editable after activation. Admin-overridable."]),
    dataRow(["MR-MANAGE-DAT-018", "acceptingNewClients", "bool", "Yes", "\u2014", "Whether the mentor is available for new client assignments. Set to No automatically when status changes to Paused or Inactive. Mentor-editable when Active. Admin-overridable."]),
    dataRow(["MR-MANAGE-DAT-019", "currentActiveClients", "int", "System-calculated", "\u2014", "Count of engagements where this mentor is the Assigned Mentor and Engagement Status is Active or Assigned. System-calculated, read-only."]),
    dataRow(["MR-MANAGE-DAT-020", "availableCapacity", "int", "System-calculated", "\u2014", "Maximum Client Capacity minus Current Active Clients. System-calculated, read-only."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Mentor Analytics (system-calculated)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-021", "totalLifetimeSessions", "int", "System-calculated", "\u2014", "Count of all completed sessions across all of this mentor\u2019s engagements. System-calculated, read-only. Visible in list views and detail pages."]),
    dataRow(["MR-MANAGE-DAT-022", "totalMentoringHours", "float", "System-calculated", "\u2014", "Sum of all session hours across all of this mentor\u2019s engagements. System-calculated, read-only. Visible in list views and detail pages."]),
    dataRow(["MR-MANAGE-DAT-023", "totalSessionsLast30Days", "int", "System-calculated", "\u2014", "Count of completed sessions in the last 30 days across all of this mentor\u2019s engagements. System-calculated, read-only. Used by the inactivity alert (compared against the 60-day threshold). Visible in list views and detail pages."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Status and Lifecycle (admin-managed)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-024", "mentorStatus", "enum", "Yes", "Active, Paused, Inactive (transitions owned by MR-MANAGE)", "The current lifecycle stage of the mentor. MR-MANAGE owns Active \u2192 Paused, Paused \u2192 Active, Active \u2192 Inactive, and Inactive \u2192 Active transitions. Set by the Mentor Administrator."]),
    dataRow(["MR-MANAGE-DAT-025", "boardPosition", "varchar", "No", "\u2014", "The mentor\u2019s title or role on the CBM board (e.g., Board Chair, Treasurer). Visible for CBM organizational member types. Populated by the Mentor Administrator."]),
  ]
}));
children.push(p("", { after: 200 }));

children.push(p([bold("Dues and Financial (admin-managed)")], { after: 100 }));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-026", "duesStatus", "enum", "No", "Unpaid, Paid, Waived", "Summary field on the Contact record reflecting the mentor\u2019s current-year dues standing. Set by the Mentor Administrator. Admin-only, read-only for mentors."]),
    dataRow(["MR-MANAGE-DAT-027", "duesPaymentDate", "date", "No", "\u2014", "Date of most recent dues payment. Not applicable when duesStatus = Waived. Admin-only."]),
  ]
}));
children.push(p("", { after: 200 }));

// Dues Entity
children.push(p([bold("Entity: Dues (inline definition)")], { after: 100 }));
children.push(p("The Dues entity is not yet in the Entity Inventory. It is defined inline here where the business need emerges. A Dues record represents one annual dues obligation for a single mentor. One record is created per mentor per billing year. Dues records provide a complete payment history independent of the summary Dues Status field on the mentor Contact record. The Dues entity will be added to the Entity Inventory after all MR process documents are complete, and a full Dues Entity PRD will be produced at that time."));
children.push(p([bold("Relationship: Contact \u2192 Dues (one-to-many)")], { after: 100 }));
children.push(p("A mentor has one Dues record per billing year. Dues records are created by the Mentor Administrator and provide a complete annual payment history."));
children.push(new Table({
  width: { size: dataTableWidth, type: WidthType.DXA },
  columnWidths: dataColWidths,
  rows: [
    dataHeaderRow(),
    dataRow(["MR-MANAGE-DAT-028", "mentorContact", "relationship", "Yes", "\u2014", "The mentor this dues record belongs to. Links to the Contact entity."]),
    dataRow(["MR-MANAGE-DAT-029", "billingYear", "int", "Yes", "\u2014", "The calendar year this dues record applies to (e.g., 2026). TBD whether the billing cycle is calendar year or another cycle (see MR-MANAGE-ISS-001)."]),
    dataRow(["MR-MANAGE-DAT-030", "amount", "currency", "Yes", "\u2014", "The dues amount invoiced for this billing year. TBD whether the amount is uniform or varies (see MR-MANAGE-ISS-002)."]),
    dataRow(["MR-MANAGE-DAT-031", "dueDate", "date", "Yes", "\u2014", "The date by which payment is expected."]),
    dataRow(["MR-MANAGE-DAT-032", "paymentStatus", "enum", "Yes", "Unpaid, Paid, Waived", "The current payment status for this dues record. Updated by the Mentor Administrator when payment is received or a waiver is granted."]),
    dataRow(["MR-MANAGE-DAT-033", "paymentDate", "date", "No", "\u2014", "The date payment was received. Not applicable when Payment Status = Waived."]),
    dataRow(["MR-MANAGE-DAT-034", "paymentMethod", "enum", "No", "Online Payment, Check, Waived", "How the dues were paid or waived."]),
    dataRow(["MR-MANAGE-DAT-035", "notes", "text", "No", "\u2014", "Additional notes about this dues record (e.g., waiver rationale, payment arrangement details). Admin-only."]),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 9: Open Issues ───
children.push(h1("9. Open Issues"));
children.push(p("Six open issues were identified during this session. Five relate to dues billing business rules that are not yet defined. One relates to a structural gap in the Master PRD."));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: issColWidths,
  rows: [
    issHeaderRow(),
    issRow("MR-MANAGE-ISS-001", "Dues billing cycle has not been defined. Is it calendar year, fiscal year, or tied to the mentor\u2019s activation anniversary? This affects the billingYear field definition and the timing of Dues record creation.", "CBM Leadership"),
    issRow("MR-MANAGE-ISS-002", "Dues amount has not been determined. Is the amount uniform for all mentors, or does it vary? How is the amount set each year? (Carries forward from MR-ISS-004.)", "CBM Leadership"),
    issRow("MR-MANAGE-ISS-003", "The Master PRD does not define cross-domain platform services (Notes, Email, Calendaring, Discussion Threads) that span all domains. Administrator notes on mentor records are functionally required by MR-MANAGE, but the underlying entity structure should be defined as a shared platform capability, not within a single process document. The Master PRD needs a new section establishing these cross-domain services.", "CBM Leadership / System Administrator"),
    issRow("MR-MANAGE-ISS-004", "Dues grace period has not been defined. How many days past the due date before the system alerts the Mentor Administrator about overdue dues?", "CBM Leadership"),
    issRow("MR-MANAGE-ISS-005", "Consequences of non-payment of dues have not been defined. Does non-payment affect Mentor Status, assignment eligibility, or have other consequences?", "CBM Leadership"),
    issRow("MR-MANAGE-ISS-006", "Which mentors are eligible for dues billing has not been confirmed. Are all Active mentors required to pay dues, or are there exemptions (e.g., board members, first-year mentors)?", "CBM Leadership"),
  ]
}));
children.push(p("", { after: 200 }));

// ─── Section 10: Updates to Prior Documents ───
children.push(h1("10. Updates to Prior Documents"));
children.push(p("One update to a prior document was identified during this session."));
children.push(p([bold("Master PRD \u2014 Add Cross-Domain Platform Services Section")], { after: 100 }));
children.push(p("The Master PRD needs a new section defining cross-domain platform services that are shared across all domains. These include at minimum: Notes (structured administrator and user notes attachable to any record), Email (integration with email systems for communication tracking), Calendaring (scheduling and calendar integration), and Discussion Threads (threaded conversations on records). This was identified when defining the administrator notes requirement for MR-MANAGE \u2014 the notes capability serves all domains, not just Mentor Recruitment, and should be defined as a shared platform service rather than within individual process documents. See MR-MANAGE-ISS-003."));
children.push(p([bold("Contact Entity PRD \u2014 Add Mentor-Level Analytics Fields")], { after: 100 }));
children.push(p("The Contact Entity PRD needs three new system-calculated fields added to the Mentor-specific field group: totalLifetimeSessions (int, system-calculated, read-only), totalMentoringHours (float, system-calculated, read-only), and totalSessionsLast30Days (int, system-calculated, read-only). These aggregate session data across all of a mentor\u2019s engagements and are required for mentor list views and detail pages. Source process: MR-MANAGE (MR-MANAGE-DAT-021, DAT-022, DAT-023)."));

// ─── Section 11: Interview Transcript ───
children.push(h1("11. Interview Transcript"));
children.push(p("This section captures the condensed record of all questions, answers, and decisions from the process definition session conducted on April 2, 2026. The session was an enrichment and conversion of existing content from the legacy MR Domain PRD (CBM-Domain-PRD-MentorRecruitment.md v1.0) into the 11-section process document standard."));

children.push(p([bold("Process Shape and Purpose")], { after: 100 }));
children.push(p([bold("Q: "), normal("When a mentor is activated, what does ongoing management actually look like day to day for the Mentor Administrator? Is it primarily reactive or proactive?")]));
children.push(p([bold("A: "), normal("The biggest issue is monitoring that mentors are properly responding to client assignments and scheduling sessions. There are situations where mentors become unexpectedly unavailable and the Mentor Administrator must manage those.")]));
children.push(p([boldItalic("Decision: MR-MANAGE is primarily reactive \u2014 the Mentor Administrator responds to alerts, mentor requests, and situational changes rather than following a prescribed sequence.")]));

children.push(p([bold("Mentor Activity Monitoring")], { after: 100 }));
children.push(p([bold("Q: "), normal("When mentors aren\u2019t properly responding to client assignments, what does that look like?")]));
children.push(p([bold("A: "), normal("A mentor who has been assigned a client but isn\u2019t following through on scheduling, or a mentor who has sessions on the books that are overdue and not dispositioned.")]));
children.push(p([bold("Q: "), normal("How does this relate to MN-INACTIVE? Is MR-MANAGE looking across all of a mentor\u2019s engagements to see a pattern?")]));
children.push(p([bold("A: "), normal("The MN-INACTIVE process manages one engagement at a time. The MR-MANAGE function tries to determine if there is a more structural failure where a mentor is not responding to anything.")]));
children.push(p([boldItalic("Decision: MN-INACTIVE handles individual engagement dormancy. MR-MANAGE detects structural disengagement from the program across all assignments. Both are needed and operate independently.")]));

children.push(p([bold("Inactivity Alert Condition")], { after: 100 }));
children.push(p([bold("Q: "), normal("The legacy document says the alert condition is \u2018no session activity AND no active engagements.\u2019 Would a mentor with active engagements but no sessions also warrant an alert?")]));
children.push(p([bold("A: "), normal("If they have active engagements, they must have an active session in the last 60 days.")]));
children.push(p([boldItalic("Decision: The alert condition is simpler than the legacy document stated. Any Active mentor with no completed session in the last 60 days triggers an alert, regardless of engagement status. Having active engagements with no session activity is a worse signal, not a reason to suppress the alert.")]));
children.push(p([bold("Q: "), normal("Is 60 days the right default threshold?")]));
children.push(p([bold("A: "), normal("Yes, 60 days is the default.")]));
children.push(p([bold("Q: "), normal("Who configures the threshold?")]));
children.push(p([bold("A: "), normal("System Administrator.")]));
children.push(p([boldItalic("Decision: System Administrator configures the inactivity threshold. Mentor Administrator receives the alerts. Default is 60 days.")]));

children.push(p([bold("Unexpected Unavailability")], { after: 100 }));
children.push(p([bold("Q: "), normal("Can you walk through what unexpected unavailability looks like?")]));
children.push(p([bold("A: "), normal("Health issues and personal situations are the big ones.")]));
children.push(p([bold("Q: "), normal("What does the Mentor Administrator do in those situations?")]));
children.push(p([bold("A: "), normal("They make a decision based on the situation \u2014 could reassign clients, notify clients of a delay, put the mentor on pause. It depends on the case.")]));
children.push(p([boldItalic("Decision: Handling unexpected unavailability is situational judgment by the Mentor Administrator, not a rigid workflow. Options include pausing the mentor, reassigning specific clients, notifying clients of delays, or a combination.")]));

children.push(p([bold("Status Transitions and MR-DEPART Boundary")], { after: 100 }));
children.push(p([bold("Q: "), normal("Does it make sense for MR-MANAGE to own Paused (temporary break) while MR-DEPART owns Resigned and Departed (permanent exits)?")]));
children.push(p([bold("A: "), normal("Yes.")]));
children.push(p([bold("Q: "), normal("What about Inactive \u2014 does that transition happen in MR-MANAGE or MR-DEPART?")]));
children.push(p([bold("A: "), normal("Inactive is a level of inactivity. The admin could make that change manually. There is also an automated notification process that is part of MN-INACTIVE.")]));
children.push(p([bold("Q: "), normal("Does MN-INACTIVE automatically change the mentor status, or does the admin make the call?")]));
children.push(p([bold("A: "), normal("The admin makes the change after reviewing the MN-INACTIVE settings for a number of engagements.")]));
children.push(p([boldItalic("Decision: MR-MANAGE owns Active \u2192 Paused, Paused \u2192 Active, Active \u2192 Inactive, and Inactive \u2192 Active. All are manual transitions by the Mentor Administrator. MR-DEPART handles Resigned and Departed only.")]));
children.push(p([bold("Q: "), normal("Can an Inactive mentor be reactivated directly back to Active within MR-MANAGE?")]));
children.push(p([bold("A: "), normal("Yes. MR-DEPART is only if it is going to be moved to Departed.")]));
children.push(p([boldItalic("Decision: Inactive \u2192 Active reactivation happens within MR-MANAGE. MR-DEPART is only for permanent departures.")]));

children.push(p([bold("Dues Billing")], { after: 100 }));
children.push(p([bold("Q: "), normal("When does the dues year start \u2014 calendar year, activation date, or something else?")]));
children.push(p([bold("A: "), normal("TBD. The dues process is not fully defined.")]));
children.push(p([bold("Q: "), normal("Is it confirmed that all Active mentors pay annual dues?")]));
children.push(p([bold("A: "), normal("TBD.")]));
children.push(p([boldItalic("Decision: Dues billing workflow and business rules are TBD. The Dues entity field structure is defined inline to establish the entity shape, but billing cycle, amount, eligibility, grace period, and consequences of non-payment are all captured as open issues for CBM Leadership.")]));

children.push(p([bold("Profile Maintenance")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is there a review or approval process when mentors update their own profile?")]));
children.push(p([bold("A: "), normal("Changes take effect immediately.")]));
children.push(p([boldItalic("Decision: No approval gate on mentor self-service profile edits. Changes take effect immediately.")]));

children.push(p([bold("Role Eligibility")], { after: 100 }));
children.push(p([bold("Q: "), normal("When does the Mentor Administrator set isCoMentor and isSubjectMatterExpert?")]));
children.push(p([bold("A: "), normal("Administrative decision after discussion with the mentor.")]));
children.push(p([bold("Q: "), normal("Can a mentor have all three role flags set to Yes simultaneously?")]));
children.push(p([bold("A: "), normal("Yes.")]));
children.push(p([boldItalic("Decision: Role eligibility is set by administrative judgment after discussion with the mentor. All three flags can be Yes simultaneously.")]));

children.push(p([bold("Capacity Management")], { after: 100 }));
children.push(p([bold("Q: "), normal("Can the Mentor Administrator override a mentor\u2019s capacity settings?")]));
children.push(p([bold("A: "), normal("The admin can change anything.")]));
children.push(p([boldItalic("Decision: Mentor Administrator can override any mentor-editable field, including capacity settings.")]));

children.push(p([bold("Mentor Directory")], { after: 100 }));
children.push(p([bold("Q: "), normal("What is the purpose of the mentor directory?")]));
children.push(p([bold("A: "), normal("Both \u2014 so mentors can find each other for collaboration and as a community feature.")]));
children.push(p([bold("Q: "), normal("What information is visible in the directory?")]));
children.push(p([bold("A: "), normal("Typical fields that describe the mentor and their skills/experiences. Not sensitive admin fields.")]));
children.push(p([boldItalic("Decision: Directory shows professional profile fields (name, title, employer, bio, sectors, focus areas, skills, languages, experience). Excludes administrative and sensitive fields. Accessible to all active mentors. Administrators have access to all data through their normal admin views.")]));

children.push(p([bold("Board Membership")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is boardPosition just a text field, or is there more to it?")]));
children.push(p([bold("A: "), normal("Just the name of their position in varchar.")]));
children.push(p([boldItalic("Decision: boardPosition is a simple varchar field populated by the Mentor Administrator. No workflow around board membership tracking.")]));

children.push(p([bold("Mentor Analytics")], { after: 100 }));
children.push(p([bold("Q: "), normal("Do the mentor-level analytics need to be stored fields on the Contact record, or can they be reports?")]));
children.push(p([bold("A: "), normal("They need to appear in lists and on detail pages.")]));
children.push(p([boldItalic("Decision: Three stored, system-calculated fields on the Contact record: Total Lifetime Sessions, Total Mentoring Hours, and Total Sessions Last 30 Days. All aggregate across all of the mentor\u2019s engagements.")]));

children.push(p([bold("Administrator Notes")], { after: 100 }));
children.push(p([bold("Q: "), normal("Is the notes requirement just native CRM notes, or something more structured?")]));
children.push(p([bold("A: "), normal("Considering a more sophisticated notes entity that attaches to mentor records. But no Domain PRD currently defines a Notes entity.")]));
children.push(p([bold("Q: "), normal("This highlights a gap \u2014 Notes, Email, Calendaring, and Discussion Threads are cross-domain services that don\u2019t belong in any single process document.")]));
children.push(p([bold("A: "), normal("Correct. The Master PRD needs a section for cross-domain services.")]));
children.push(p([boldItalic("Decision: Administrator notes requirement is captured functionally in MR-MANAGE. The notes entity structure is deferred to a new cross-domain platform services section in the Master PRD. This is flagged as both an open issue (MR-MANAGE-ISS-003) and an update to the Master PRD.")]));

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
              new TextRun({ text: "MR-MANAGE \u2014 Mentor Management", font: "Arial", size: 18, color: "888888" }),
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
  fs.writeFileSync("/home/claude/MR-MANAGE.docx", buffer);
  console.log("MR-MANAGE.docx created successfully");
});
