// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — MR Domain PRD Generator
// Mentor Recruitment Domain PRD — Reconciled from 5 process documents
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak
} = require("docx");

const OUTPUT_FILE = "CBM-Domain-PRD-MentorRecruitment.docx";

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

// ── Primitive helpers ──────────────────────────────────────────────

function r(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size || SZ.body,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color,
  });
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

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ── List helpers ──────────────────────────────────────────────────
let numberingRef = 0;
const numberingConfigs = [];

function makeNumbering() {
  const ref = `numbering_${++numberingRef}`;
  numberingConfigs.push({
    reference: ref,
    levels: [{
      level: 0,
      format: LevelFormat.DECIMAL,
      text: "%1.",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } },
    }],
  });
  return ref;
}

function numberedList(items) {
  const ref = makeNumbering();
  return items.map(text => new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [r(text)],
  }));
}

// ── Table helpers ──────────────────────────────────────────────────
const TABLE_WIDTH = 9360;

function hdrCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })],
  });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    columnSpan: opts.columnSpan,
    children: [new Paragraph({
      children: [r(text, {
        size: opts.size || SZ.small,
        bold: opts.bold,
        color: opts.color,
        italics: opts.italics,
      })],
    })],
  });
}

// ── Requirement table ─────────────────────────────────────────────
const REQ_COLS = [2000, 7360];

function reqTable(rows) {
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: REQ_COLS,
    rows: [
      new TableRow({ children: [hdrCell("ID", REQ_COLS[0]), hdrCell("Requirement", REQ_COLS[1])] }),
      ...rows.map(([id, req], i) => {
        const shaded = i % 2 === 1;
        return new TableRow({
          children: [
            dataCell(id, REQ_COLS[0], { bold: true, shaded }),
            dataCell(req, REQ_COLS[1], { shaded }),
          ],
        });
      }),
    ],
  });
}

// ── Data Reference field table (7-column with description row) ────
const DR_COLS = [1800, 900, 600, 1800, 700, 1700, 1860];

function drFieldTable(fields) {
  const rows = [
    new TableRow({
      children: [
        hdrCell("Field Name", DR_COLS[0]),
        hdrCell("Type", DR_COLS[1]),
        hdrCell("Req", DR_COLS[2]),
        hdrCell("Values", DR_COLS[3]),
        hdrCell("Default", DR_COLS[4]),
        hdrCell("ID", DR_COLS[5]),
        hdrCell("Defined In", DR_COLS[6]),
      ],
    }),
  ];

  fields.forEach((f, i) => {
    const shaded = i % 2 === 0;
    // Row 1: field data
    rows.push(new TableRow({
      children: [
        dataCell(f.name, DR_COLS[0], { bold: true, shaded }),
        dataCell(f.type, DR_COLS[1], { shaded }),
        dataCell(f.req, DR_COLS[2], { shaded }),
        dataCell(f.values || "\u2014", DR_COLS[3], { shaded }),
        dataCell(f.def || "\u2014", DR_COLS[4], { shaded }),
        dataCell(f.id, DR_COLS[5], { shaded, size: SZ.xs, color: COLORS.idColor }),
        dataCell(f.definedIn, DR_COLS[6], { shaded, size: SZ.xs }),
      ],
    }));
    // Row 2: description
    rows.push(new TableRow({
      children: [
        new TableCell({
          borders,
          width: { size: TABLE_WIDTH, type: WidthType.DXA },
          shading: shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined,
          margins: descMargins,
          columnSpan: 7,
          children: [new Paragraph({
            children: [r(f.desc, { size: SZ.xs, italics: true, color: COLORS.idColor })],
          })],
        }),
      ],
    }));
  });

  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: DR_COLS,
    rows,
  });
}

// ── Decision table ────────────────────────────────────────────────
const DEC_COLS = [1800, 3200, 2560, 1800];

function decisionTable(decisions) {
  const rows = [
    new TableRow({
      children: [
        hdrCell("ID", DEC_COLS[0]),
        hdrCell("Decision", DEC_COLS[1]),
        hdrCell("Rationale", DEC_COLS[2]),
        hdrCell("Made During", DEC_COLS[3]),
      ],
    }),
  ];
  decisions.forEach((d, i) => {
    const shaded = i % 2 === 1;
    rows.push(new TableRow({
      children: [
        dataCell(d.id, DEC_COLS[0], { bold: true, shaded }),
        dataCell(d.decision, DEC_COLS[1], { shaded }),
        dataCell(d.rationale, DEC_COLS[2], { shaded }),
        dataCell(d.madeIn, DEC_COLS[3], { shaded }),
      ],
    }));
  });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: DEC_COLS, rows });
}

// ── Open issue table ──────────────────────────────────────────────
const ISS_COLS = [1800, 2200, 2560, 1400, 1400];

function issueTable(issues) {
  const rows = [
    new TableRow({
      children: [
        hdrCell("ID", ISS_COLS[0]),
        hdrCell("Issue", ISS_COLS[1]),
        hdrCell("Question", ISS_COLS[2]),
        hdrCell("Needs Input From", ISS_COLS[3]),
        hdrCell("Source", ISS_COLS[4]),
      ],
    }),
  ];
  issues.forEach((iss, i) => {
    const shaded = i % 2 === 1;
    rows.push(new TableRow({
      children: [
        dataCell(iss.id, ISS_COLS[0], { bold: true, shaded }),
        dataCell(iss.issue, ISS_COLS[1], { shaded }),
        dataCell(iss.question, ISS_COLS[2], { shaded }),
        dataCell(iss.owner, ISS_COLS[3], { shaded }),
        dataCell(iss.source, ISS_COLS[4], { shaded }),
      ],
    }));
  });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: ISS_COLS, rows });
}

// ── Metadata table ────────────────────────────────────────────────
function metaRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        borders: { top: border, bottom: border, left: border, right: border },
        width: { size: 2400, type: WidthType.DXA },
        margins: cellMargins,
        children: [new Paragraph({ children: [r(label, { bold: true, size: SZ.meta })] })],
      }),
      new TableCell({
        borders: { top: border, bottom: border, left: border, right: border },
        width: { size: 6960, type: WidthType.DXA },
        margins: cellMargins,
        children: [new Paragraph({ children: [r(value, { size: SZ.meta })] })],
      }),
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════
// DOCUMENT CONTENT
// ═══════════════════════════════════════════════════════════════════════

const content = [
  // ── Title block ──
  p("Cleveland Business Mentors", { bold: true, size: SZ.h1, align: AlignmentType.CENTER, after: 60 }),
  p("Mentor Recruitment (MR) Domain PRD", { bold: true, size: SZ.h2, align: AlignmentType.CENTER, after: 200 }),
  p("Domain PRD", { italics: true, align: AlignmentType.CENTER, after: 300 }),

  new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: [2400, 6960],
    rows: [
      metaRow("Domain", "Mentor Recruitment (MR)"),
      metaRow("Domain Code", "MR"),
      metaRow("Version", "1.0"),
      metaRow("Status", "Draft"),
      metaRow("Last Updated", "04-03-26 23:00"),
      metaRow("Source", "Reconciled from MR-RECRUIT v1.0, MR-APPLY v1.0, MR-ONBOARD v1.0, MR-MANAGE v1.0, MR-DEPART v1.0"),
      metaRow("Processes", "5 of 5"),
    ],
  }),

  pageBreak(),

  // ══════════════════════════════════════════════════════════════════
  // Section 1: Domain Overview
  // ══════════════════════════════════════════════════════════════════
  heading("1. Domain Overview", HeadingLevel.HEADING_1),

  p("The Mentor Recruitment domain covers the full lifecycle of a volunteer mentor \u2014 from initial awareness and prospect tracking through application, onboarding, activation, ongoing management, and eventual departure or reactivation. It ensures CBM maintains a healthy, qualified, and engaged mentor population capable of serving the client base."),

  p("The domain encompasses five business processes that together manage: the continuous recruitment of qualified mentor candidates from the professional community, the structured intake and review of mentor applications, the verification and activation of approved applicants through onboarding, the ongoing oversight of active mentors including profile management, capacity tracking, role eligibility, dues billing, and activity monitoring, and the orderly departure of mentors who leave the program along with the reinstatement of those who return."),

  p("The Mentor Recruitment domain interfaces with the Mentoring domain (MN), which consumes mentor data during client-mentor matching and engagement management. Active mentors with available capacity feed into MN-MATCH for client assignments. Session activity data from MN-ENGAGE and MN-INACTIVE feeds back into MR-MANAGE for mentor-level activity monitoring. When a mentor departs, MR-DEPART triggers MN-MATCH for engagement reassignment. The Client Recruiting domain (CR) intersects through partner organizations that support recruitment outreach."),

  p("The primary entity in this domain is the Mentor Contact \u2014 a Contact record distinguished by Contact Type = Mentor, shared with the Mentoring domain. The domain also defines the Dues entity for annual billing tracking. Both entities carry significant field sets defined across multiple processes."),

  p("The domain supports CBM\u2019s Year 1 operating target of 25\u201330 volunteer mentors, with a single Mentor Administrator managing the active mentor population and a Mentor Recruiter handling prospect pipeline development."),

  pageBreak(),

  // ══════════════════════════════════════════════════════════════════
  // Section 2: Personas
  // ══════════════════════════════════════════════════════════════════
  heading("2. Personas", HeadingLevel.HEADING_1),

  p("The following personas participate in one or more Mentor Recruitment domain processes. Each persona is defined in the Master PRD; this section describes their domain-specific roles."),

  p("Mentor Administrator (MST-PER-005)", { bold: true, after: 40 }),
  p("The primary persona across four of five MR processes. Reviews and approves or declines mentor applications (MR-APPLY). Manages and tracks all onboarding steps, sets initial capacity, and activates mentors (MR-ONBOARD). Monitors the active mentor population, manages status transitions (Active, Paused, Inactive), sets role eligibility flags, creates dues records, responds to inactivity alerts, overrides mentor settings, and maintains board position and administrator notes (MR-MANAGE). Reviews departing mentor engagements, changes status to Resigned or Departed, follows external deprovisioning checklists, evaluates reactivation requests, and restores departed mentors (MR-DEPART). Participates in: MR-APPLY, MR-ONBOARD, MR-MANAGE, MR-DEPART."),

  p("Mentor Recruiter (MST-PER-006)", { bold: true, after: 40 }),
  p("Plans and executes outreach campaigns to attract mentor candidates. Reviews the active mentor roster to identify gaps in coverage by industry sector, mentoring focus area, and geography. Creates and manages prospect contact records in the CRM. Exports prospect lists for use in the external marketing system. Records campaign engagement results as notes on prospect records. Monitors the prospect pipeline and follows up with promising candidates to encourage application submission. Participates in: MR-RECRUIT."),

  p("Partner Coordinator (MST-PER-008)", { bold: true, after: 40 }),
  p("Supports recruitment through partner organization channels. Coordinates joint recruitment initiatives with partner organizations. Identifies potential mentor candidates within partner professional networks and staff. Participates in: MR-RECRUIT."),

  p("Mentor (MST-PER-011)", { bold: true, after: 40 }),
  p("The volunteer professional at the center of the domain. Submits the mentor application through the public website and receives a confirmation email (MR-APPLY). Completes required training modules and accepts the ethics agreement during onboarding (MR-ONBOARD). Maintains their own profile directly in the CRM, adjusts capacity and availability, and accesses the searchable mentor directory (MR-MANAGE). Initiates voluntary resignation or requests reactivation by contacting the Mentor Administrator (MR-DEPART). Participates in: MR-APPLY, MR-ONBOARD, MR-MANAGE, MR-DEPART."),

  p("System Administrator (MST-PER-001)", { bold: true, after: 40 }),
  p("Configures the mentor-level inactivity alert threshold (default: 60 days). Does not participate in day-to-day mentor management activities. Participates in: MR-MANAGE (configuration only)."),

  pageBreak(),

  // ══════════════════════════════════════════════════════════════════
  // Section 3: Business Processes
  // ══════════════════════════════════════════════════════════════════
  heading("3. Business Processes", HeadingLevel.HEADING_1),

  p("This section presents the five Mentor Recruitment domain processes in dependency order. Each process includes its eight required sections. Open issues are compiled in Section 6; interview transcripts and updates to prior documents are not carried forward into the Domain PRD."),

  // ────────────────────────────────────────────────────────────────
  // 3.1 MR-RECRUIT
  // ────────────────────────────────────────────────────────────────
  heading("3.1 Mentor Recruitment (MR-RECRUIT)", HeadingLevel.HEADING_2),

  heading("Process Purpose", HeadingLevel.HEADING_3),
  p("The Mentor Recruitment process is an ongoing effort to attract qualified volunteer mentor candidates into CBM\u2019s prospect pipeline. It runs continuously to maintain awareness of CBM\u2019s volunteer program within the professional and business community. The process produces prospect contact records in the CRM that may eventually become mentor applications."),
  p("A healthy prospect pipeline ensures CBM can sustain its mentor population as existing mentors depart or as client demand grows. The Mentor Recruiter uses roster analysis data to identify gaps in mentor coverage by industry sector, mentoring focus area, or geography, and targets outreach accordingly."),
  p("This process has no formal completion \u2014 it is a continuous, recurring activity. Individual outreach campaigns conclude, but the recruitment process itself persists indefinitely."),

  heading("Process Triggers", HeadingLevel.HEADING_3),
  p("Preconditions: None strictly required. Mentor Recruitment is a continuous process that operates independently of any prior process completion. However, the Mentor Recruiter references the current mentor roster to identify gaps before planning targeted outreach campaigns.", { after: 80 }),
  p("Required Data: Active mentor roster data \u2014 industry sectors, mentoring focus areas, and geographic distribution \u2014 is needed to identify recruitment gaps and inform targeting. Partner organization profiles and affiliated contacts are needed for partner-channel recruitment coordination.", { after: 80 }),
  p("Initiation Mechanism: Manual. The Mentor Recruiter decides when to plan and execute outreach campaigns based on identified gaps in the mentor roster or as part of a standing outreach calendar. There is no automated trigger.", { after: 80 }),
  p("Initiating Persona: Mentor Recruiter (MST-PER-006)."),

  heading("Personas Involved", HeadingLevel.HEADING_3),
  p([r("Mentor Recruiter (MST-PER-006)", { bold: true })], { after: 40 }),
  p("Plans and executes outreach campaigns. Identifies target audiences based on mentor roster gap analysis. Creates and manages prospect contact records. Exports prospect lists for the external marketing system. Records campaign engagement results as notes on prospect records. Monitors the prospect pipeline and follows up with promising candidates."),
  p([r("Partner Coordinator (MST-PER-008)", { bold: true })], { after: 40 }),
  p("Supports recruitment through partner organization channels. Coordinates joint recruitment initiatives with partner organizations. Identifies potential mentor candidates within partner professional networks and staff."),

  heading("Process Workflow", HeadingLevel.HEADING_3),
  ...numberedList([
    "The Mentor Recruiter reviews the current mentor roster to identify gaps in coverage by industry sector, mentoring focus area, or geography. This analysis informs targeting for outreach campaigns.",
    "The Mentor Recruiter identifies target audiences for outreach \u2014 professional associations, industry groups, civic organizations, and partner networks \u2014 based on identified gaps.",
    "The Mentor Recruiter exports prospect contact lists from the CRM for use in outbound marketing campaigns. Campaigns are planned and executed in the external marketing system.",
    "Prospect contacts generated through outreach are created in the CRM with Contact Type set to Mentor and Mentor Status set to Prospect. The referral source is recorded on each prospect record (How Did You Hear About CBM field). Basic identity information \u2014 first name, last name, and email address \u2014 is captured at this stage.",
    "After campaigns are executed, the Mentor Recruiter manually records campaign engagement results (emails sent, opened, clicked) as notes on the relevant prospect contact records in the CRM. Automated bidirectional sync between the CRM and the marketing system is a planned future enhancement.",
    "The Partner Coordinator supports recruitment through partner organization channels, identifying potential mentor candidates within partner professional networks and coordinating joint recruitment initiatives.",
    "The Mentor Recruiter monitors the prospect pipeline and follows up with promising candidates to encourage them to submit a mentor application through the public website.",
    "When a prospect submits a mentor application, the Mentor Application process (MR-APPLY) takes over. If the applicant has an existing prospect record, MR-APPLY updates it (Mentor Status changes from Prospect to Submitted and application fields are populated). If no prospect record exists, MR-APPLY creates a new Contact record directly. Duplicate prospect records that are not caught by automated detection may need to be merged manually by the Mentor Administrator.",
  ]),

  heading("Process Completion", HeadingLevel.HEADING_3),
  p([r("Normal Completion: ", { bold: true }), r("This process has no formal completion. Mentor Recruitment is a continuous, ongoing activity. Individual outreach campaigns conclude when their execution is complete and engagement results are recorded, but the recruitment process itself persists indefinitely.")]),
  p([r("Handoff to MR-APPLY: ", { bold: true }), r("When a prospect submits a mentor application through the public website, the Mentor Application process (MR-APPLY) takes over. The prospect contact record transitions from Mentor Status = Prospect to Mentor Status = Submitted. This handoff is the successful per-prospect outcome of the recruitment process.")]),
  p([r("Early Termination: ", { bold: true }), r("Not applicable. The recruitment process does not terminate. Individual prospect records may become stale if the prospect never applies, but no formal termination or cleanup is required.")]),

  heading("System Requirements", HeadingLevel.HEADING_3),
  reqTable([
    ["MR-RECRUIT-REQ-001", "The system must maintain prospect contact records (Contact Type = Mentor, Mentor Status = Prospect) separate from active mentor records, supporting a dedicated pipeline view of prospects accessible to the Mentor Recruiter."],
    ["MR-RECRUIT-REQ-002", "The system must record the referral source for each prospect or applicant contact using the How Did You Hear About CBM field."],
    ["MR-RECRUIT-REQ-003", "The system must support recording outreach activity and communication history on prospect contact records as notes."],
    ["MR-RECRUIT-REQ-004", "The system must support exporting prospect contact lists for use in outbound marketing campaigns managed in an external marketing system. Campaign engagement results (emails sent, opened, clicked) are recorded manually on contact records as notes. A more automated bidirectional sync between the CRM and the marketing system is a planned future enhancement."],
    ["MR-RECRUIT-REQ-005", "The system must provide the Mentor Recruiter with roster analysis data \u2014 mentor coverage by industry sector, mentoring focus area, and geography \u2014 to identify recruitment gaps."],
  ]),

  heading("Process Data", HeadingLevel.HEADING_3),
  p("MR-RECRUIT reads the following fields to support roster gap analysis and partner-channel recruitment. It does not create or modify these fields."),
  p("From the Contact entity (active mentors): Industry Sectors (MR-RECRUIT-DAT-001) and Mentoring Focus Areas (MR-RECRUIT-DAT-002) are used to identify which industry sectors and expertise areas are underrepresented in the current mentor roster."),
  p("From the Account entity (partner organizations): Partner organization profiles and affiliated contacts (MR-RECRUIT-DAT-003) are referenced for partner-channel recruitment coordination."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  heading("Data Collected", HeadingLevel.HEADING_3),
  p("MR-RECRUIT creates prospect Contact records with the following fields: Contact Type set to Mentor (MR-RECRUIT-DAT-004), Mentor Status set to Prospect (MR-RECRUIT-DAT-005), How Did You Hear About CBM (MR-RECRUIT-DAT-006), first name (MR-RECRUIT-DAT-007), last name (MR-RECRUIT-DAT-008), email address (MR-RECRUIT-DAT-009), and campaign engagement notes (MR-RECRUIT-DAT-010)."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  pageBreak(),

  // ────────────────────────────────────────────────────────────────
  // 3.2 MR-APPLY
  // ────────────────────────────────────────────────────────────────
  heading("3.2 Mentor Application (MR-APPLY)", HeadingLevel.HEADING_2),

  heading("Process Purpose", HeadingLevel.HEADING_3),
  p("The Mentor Application process captures and processes applications from prospective mentors who submit through the public website. It creates or updates a Contact record in the CRM, performs duplicate detection, notifies the Mentor Administrator, and routes the application through an informal review leading to approval or decline."),
  p("Before this process runs, the prospective mentor exists either as a prospect contact (created by MR-RECRUIT with Mentor Status = Prospect) or not at all. After this process completes successfully, the Contact record exists with Mentor Status = Provisional (approved and ready for onboarding) or Declined (application rejected, record retained permanently)."),
  p("This is a one-time event per applicant. A declined applicant whose record remains in the system would trigger a conflict during any subsequent application attempt, requiring Mentor Administrator intervention."),

  heading("Process Triggers", HeadingLevel.HEADING_3),
  p("Preconditions: None strictly required. The applicant may or may not have an existing prospect Contact record from MR-RECRUIT. The process handles both paths.", { after: 80 }),
  p("Required Data: The applicant must provide all required application form fields at submission: first name, last name, personal email, phone number, industry sectors, mentoring focus areas, felony conviction disclosure, and terms and conditions acceptance.", { after: 80 }),
  p("Initiation Mechanism: External. The prospective mentor submits the mentor application form on the public website. The form submission triggers automated processing in the CRM.", { after: 80 }),
  p("Initiating Persona: Mentor (MST-PER-011)."),

  heading("Personas Involved", HeadingLevel.HEADING_3),
  p([r("Mentor (MST-PER-011)", { bold: true })], { after: 40 }),
  p("The prospective volunteer professional applying to CBM\u2019s mentoring program. Completes and submits the mentor application form through the public website. Receives a confirmation email upon successful submission. Has no further active role in MR-APPLY after submission."),
  p([r("Mentor Administrator (MST-PER-005)", { bold: true })], { after: 40 }),
  p("Reviews submitted applications, manages the review pipeline, and makes approval or decline decisions. Receives automatic notification of new applications and conflict alerts when duplicate detection finds a non-prospect match. Changes Mentor Status through the review lifecycle (Submitted \u2192 In Review \u2192 Provisional or Declined). Sends manual decline notifications to rejected applicants. Initiates contact merge when duplicate records are discovered during review."),

  heading("Process Workflow", HeadingLevel.HEADING_3),
  ...numberedList([
    "The prospective mentor completes and submits the mentor application form on the public website. The form collects identity, professional background, expertise, languages, motivation, referral source, felony disclosure, and terms and conditions acceptance.",
    "The system performs duplicate detection by checking for an existing Contact record with a matching email address. Three outcomes are possible: (a) No match found \u2014 the system creates a new Contact record with Contact Type = Mentor and Mentor Status = Submitted, with all application fields populated. (b) Match found, Mentor Status = Prospect \u2014 the system updates the existing prospect record, changing Mentor Status from Prospect to Submitted and populating all application fields. (c) Match found, any other Mentor Status \u2014 the submission is rejected, the website form displays an error to the submitter directing them to contact CBM, and the system sends a conflict notification email to the Mentor Administrator. No CRM record is created or updated.",
    "For successful submissions (outcomes a and b), the system records Terms and Conditions Accepted = Yes and the acceptance timestamp on the Contact record.",
    "The system sends a confirmation email to the applicant\u2019s personal email address acknowledging receipt and advising they will be contacted shortly.",
    "The Mentor Administrator receives an automatic notification of the new application.",
    "New applications appear in the applications review view, which shows all contacts with Mentor Status = Submitted or In Review, with filters to narrow by status.",
    "When the Mentor Administrator begins reviewing an application, they change Mentor Status from Submitted to In Review. This is a manual status change with no automated notifications or tasks.",
    "The Mentor Administrator reviews the application informally \u2014 no structured scoring or workflow is required. Notes may be recorded on the Contact record during review.",
    "If approved: the Mentor Administrator changes Mentor Status from In Review to Provisional. No automated notification is sent. The application is now complete and the contact proceeds to onboarding (MR-ONBOARD).",
    "If declined: the Mentor Administrator changes Mentor Status from In Review to Declined and selects an Application Decline Reason. The Mentor Administrator notifies the applicant directly via email \u2014 no automated notification is sent. The Contact record is retained permanently.",
  ]),

  heading("Process Completion", HeadingLevel.HEADING_3),
  p([r("Normal Completion \u2014 Approved: ", { bold: true }), r("The Mentor Administrator changes Mentor Status from In Review to Provisional. The Contact record is ready for onboarding. This is the successful end state of MR-APPLY and the trigger for MR-ONBOARD.")]),
  p([r("Alternative End State \u2014 Declined: ", { bold: true }), r("The Mentor Administrator changes Mentor Status from In Review to Declined and records the Application Decline Reason. The Contact record is retained permanently. A declined applicant who attempts to reapply would trigger the conflict path at step 2c.")]),
  p([r("Alternative End State \u2014 Conflict Rejection: ", { bold: true }), r("Duplicate detection finds an existing Contact with a matching email in a non-prospect status. The submission is rejected at the website, and the Mentor Administrator receives a conflict notification. No CRM record is created or updated.")]),
  p([r("Handoff to MR-ONBOARD: ", { bold: true }), r("When Mentor Status is changed to Provisional, the contact becomes eligible for MR-ONBOARD, which covers training, ethics agreement, background check, email provisioning, capacity setting, and activation.")]),
  p([r("Early Termination: ", { bold: true }), r("There is no formal withdrawal or early termination path. Applications remain in Submitted or In Review status until the Mentor Administrator makes a disposition decision.")]),

  heading("System Requirements", HeadingLevel.HEADING_3),
  reqTable([
    ["MR-APPLY-REQ-001", "The system must accept mentor applications submitted through the public website and either (a) update an existing prospect Contact record (Mentor Status from Prospect to Submitted) when a matching email is found on a prospect record, or (b) create a new Contact record with Contact Type = Mentor and Mentor Status = Submitted when no match is found."],
    ["MR-APPLY-REQ-002", "The system must record Terms and Conditions Accepted = Yes and the acceptance timestamp at time of submission."],
    ["MR-APPLY-REQ-003", "The system must send a confirmation email to the applicant\u2019s personal email address automatically upon successful submission."],
    ["MR-APPLY-REQ-004", "The system must notify the Mentor Administrator immediately upon receipt of a new application."],
    ["MR-APPLY-REQ-005", "The system must provide a single view of applications in Submitted and In Review status, accessible to the Mentor Administrator, with filters to narrow by status."],
    ["MR-APPLY-REQ-006", "The system must support recording of an application decline reason when Mentor Status is changed to Declined, using the applicationDeclineReason field. The field is required when Mentor Status = Declined and visible only in that status."],
    ["MR-APPLY-REQ-007", "Contact records must be retained permanently regardless of application outcome. No deletion or anonymization."],
    ["MR-APPLY-REQ-008", "The system must perform duplicate detection at application submission by checking for an existing Contact record with a matching email address. Three outcomes: (a) no match \u2014 create new record, (b) match with Prospect status \u2014 update existing record, (c) match with any other status \u2014 reject submission, display error, send conflict notification to Mentor Administrator."],
    ["MR-APPLY-REQ-009", "The system must provide a contact merge function accessible to the Mentor Administrator to consolidate duplicate Contact records when automated duplicate detection has failed. The merge is a fully manual process."],
  ]),

  heading("Process Data", HeadingLevel.HEADING_3),
  p("MR-APPLY reads existing Contact email addresses (MR-APPLY-DAT-001) to perform duplicate detection at application submission and determine whether the applicant has an existing record and what Mentor Status that record holds."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  heading("Data Collected", HeadingLevel.HEADING_3),
  p("MR-APPLY creates or updates Contact records with a comprehensive set of application fields. At submission, the system populates: Contact Type (MR-APPLY-DAT-002), Mentor Status = Submitted (MR-APPLY-DAT-003), first name (MR-APPLY-DAT-004), last name (MR-APPLY-DAT-005), preferred name (MR-APPLY-DAT-006), personal email (MR-APPLY-DAT-007), phone number (MR-APPLY-DAT-008), LinkedIn profile (MR-APPLY-DAT-009), current employer (MR-APPLY-DAT-010), currently employed (MR-APPLY-DAT-011), years of business experience (MR-APPLY-DAT-012), professional bio (MR-APPLY-DAT-013), industry sectors (MR-APPLY-DAT-014), mentoring focus areas (MR-APPLY-DAT-015), skills and expertise tags (MR-APPLY-DAT-016), fluent languages (MR-APPLY-DAT-017), why interested in mentoring (MR-APPLY-DAT-018), How Did You Hear About CBM (MR-APPLY-DAT-019), felony conviction disclosure (MR-APPLY-DAT-020), terms and conditions accepted (MR-APPLY-DAT-021), and terms and conditions acceptance date/time (MR-APPLY-DAT-022)."),
  p("During review, the Mentor Administrator updates: Mentor Status through the review lifecycle (MR-APPLY-DAT-023) and Application Decline Reason if declined (MR-APPLY-DAT-024, with reconciled 7-value enum including Unresponsive and Candidate Withdrew added during MR-ONBOARD)."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  pageBreak(),

  // ────────────────────────────────────────────────────────────────
  // 3.3 MR-ONBOARD
  // ────────────────────────────────────────────────────────────────
  heading("3.3 Mentor Onboarding (MR-ONBOARD)", HeadingLevel.HEADING_2),

  heading("Process Purpose", HeadingLevel.HEADING_3),
  p("The Mentor Onboarding process verifies that an approved mentor applicant meets all CBM requirements and formally activates them as a volunteer mentor. It begins when a mentor application is approved (Mentor Status = Provisional, set by MR-APPLY) and ends when the Mentor Administrator changes Mentor Status to Active after all onboarding steps are complete."),
  p("Before this process runs, the provisional mentor has a Contact record with all application data populated by MR-APPLY but has not yet completed training, accepted the ethics agreement, or been provisioned with organizational resources. After this process completes successfully, the mentor is Active, trained, compliant, equipped with a CBM email address, and available for client assignments."),
  p("This is a one-time event per mentor. Onboarding steps run in parallel except where noted, and the Mentor Administrator is responsible for tracking completion and making the activation decision. There are no system-enforced gates or deadlines."),

  heading("Process Triggers", HeadingLevel.HEADING_3),
  p("Preconditions: A Contact record must exist with Contact Type = Mentor and Mentor Status = Provisional. This status is set by MR-APPLY when the Mentor Administrator approves a mentor application (In Review \u2192 Provisional). All application data fields must be populated.", { after: 80 }),
  p("Required Data: The Contact record with all application data from MR-APPLY: identity, professional background, expertise, motivation, referral source, felony disclosure, and terms and conditions acceptance with timestamp.", { after: 80 }),
  p("Initiation Mechanism: Manual. The Mentor Administrator decides when to begin onboarding a provisional mentor. There is no automated trigger.", { after: 80 }),
  p("Initiating Persona: Mentor Administrator (MST-PER-005)."),

  heading("Personas Involved", HeadingLevel.HEADING_3),
  p([r("Mentor Administrator (MST-PER-005)", { bold: true })], { after: 40 }),
  p("Manages and tracks all onboarding steps. Communicates onboarding requirements to the provisional mentor. Records ethics agreement acceptance and timestamp. Determines whether a background check is required and records the result. Assigns the CBM email address. Sets initial capacity and availability. Sets isPrimaryMentor at activation. Changes Mentor Status from Provisional to Active or Declined. Communicates activation to the mentor directly."),
  p([r("Mentor (MST-PER-011)", { bold: true })], { after: 40 }),
  p("The provisional volunteer professional completing onboarding requirements. Completes required training modules via the learning management system. Accepts the CBM ethics agreement through an external process. Has no direct CRM interaction during onboarding \u2014 all CRM updates are performed by the Mentor Administrator or by system integration."),

  heading("Process Workflow", HeadingLevel.HEADING_3),
  ...numberedList([
    "The Mentor Administrator communicates onboarding requirements to the provisional mentor: required training modules, ethics agreement, and background check if applicable. This is the only step that must complete before other steps can begin.",
    "The mentor completes the required training modules via the learning management system. Upon completion, the system automatically sets Training Completed = Yes and records the Training Completion Date on the Contact record via the LMS integration. If the LMS integration fails or training is completed outside the LMS, the Mentor Administrator may manually set Training Completed and the completion date.",
    "The mentor accepts the CBM ethics agreement through an external process outside the CRM. The ethics agreement includes consent for a background check. The Mentor Administrator records Ethics Agreement Accepted = Yes and the acceptance date and time on the Contact record.",
    "If the Mentor Administrator determines a background check is required, they conduct the check and record Background Check Completed = Yes and the Background Check Date on the Contact record. Whether a background check is required is at the Mentor Administrator\u2019s discretion. If no background check is required, these fields remain empty and the mentor may still be activated. This step requires the ethics agreement (step 3) to be complete first.",
    "The Mentor Administrator assigns the mentor\u2019s organizational email address by populating the CBM Email Address field on the Contact record. The email account is provisioned separately outside the CRM.",
    "The Mentor Administrator sets the mentor\u2019s Maximum Client Capacity and sets Accepting New Clients = Yes on the Contact record.",
    "The Mentor Administrator changes Mentor Status from Provisional to Active. The system automatically sets Is Primary Mentor = Yes on the Contact record. No system validation gates prevent activation. No automated notification is sent; the Mentor Administrator communicates activation to the mentor directly.",
  ]),
  p("Steps 2 through 6 may proceed in parallel, with one dependency: the ethics agreement (step 3) must be accepted before the background check (step 4) can proceed, because the ethics agreement includes consent for the background check.", { italics: true }),

  heading("Process Completion", HeadingLevel.HEADING_3),
  p([r("Normal Completion \u2014 Activated: ", { bold: true }), r("The Mentor Administrator changes Mentor Status from Provisional to Active after verifying all required onboarding steps are complete. The mentor is now trained, compliant, equipped with organizational resources, and available for client assignments. Is Primary Mentor is set to Yes automatically.")]),
  p([r("Alternative End State \u2014 Declined: ", { bold: true }), r("The Mentor Administrator changes Mentor Status from Provisional to Declined and records an Application Decline Reason (Unresponsive, Candidate Withdrew, Failed Background Check, or other). The Contact record is retained permanently.")]),
  p([r("Handoff to MR-MANAGE: ", { bold: true }), r("When Mentor Status is changed to Active, the mentor enters ongoing management under MR-MANAGE.")]),
  p([r("Handoff to MN-MATCH: ", { bold: true }), r("Active mentors with Accepting New Clients = Yes become eligible for mentor-client matching in the Mentoring domain (MN-MATCH).")]),
  p([r("Early Termination: ", { bold: true }), r("There is no system-enforced onboarding deadline. Provisional mentors who stop responding or fail to complete requirements are handled at the Mentor Administrator\u2019s discretion, who may change Mentor Status to Declined at any time.")]),

  heading("System Requirements", HeadingLevel.HEADING_3),
  reqTable([
    ["MR-ONBOARD-REQ-001", "The system must support the Provisional \u2192 Active and Provisional \u2192 Declined status transitions on the Mentor Status field. No system validation gates prevent these transitions."],
    ["MR-ONBOARD-REQ-002", "The system must integrate with the learning management system to automatically record training completion status and date on the mentor Contact record. The system must also allow the Mentor Administrator to manually set training completion as a fallback."],
    ["MR-ONBOARD-REQ-003", "The system must support recording of ethics agreement acceptance with a date and time timestamp on the Contact record. This field is admin-only and read-only for mentors."],
    ["MR-ONBOARD-REQ-004", "The system must support recording of background check completion status and date on the Contact record. These fields are admin-only and hidden from mentors. Both fields are optional."],
    ["MR-ONBOARD-REQ-005", "The system must support assignment of a CBM organizational email address on the Contact record. The email account is provisioned externally outside the CRM."],
    ["MR-ONBOARD-REQ-006", "The system must support setting Maximum Client Capacity and Accepting New Clients on the Contact record before activation. Both fields are initially set by the Mentor Administrator and editable by the mentor after activation."],
    ["MR-ONBOARD-REQ-007", "The system must automatically set Is Primary Mentor = Yes on the Contact record when Mentor Status is changed to Active. The Mentor Administrator may adjust this value afterward."],
  ]),

  heading("Process Data", HeadingLevel.HEADING_3),
  p("MR-ONBOARD reads the following fields from the Contact record to confirm the mentor is in Provisional status and to reference application data during onboarding: Mentor Status (MR-ONBOARD-DAT-001), first name, last name, personal email, phone (populated by MR-APPLY), and felony conviction disclosure (MR-APPLY-DAT-020, which may inform the background check decision)."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  heading("Data Collected", HeadingLevel.HEADING_3),
  p("MR-ONBOARD creates or updates the following fields on the Contact record: Training Completed (MR-ONBOARD-DAT-002), Training Completion Date (MR-ONBOARD-DAT-003), Ethics Agreement Accepted (MR-ONBOARD-DAT-004), Ethics Agreement Acceptance Date/Time (MR-ONBOARD-DAT-005), Background Check Completed (MR-ONBOARD-DAT-006), Background Check Date (MR-ONBOARD-DAT-007), CBM Email Address (MR-ONBOARD-DAT-008), Maximum Client Capacity (MR-ONBOARD-DAT-009), Accepting New Clients (MR-ONBOARD-DAT-010), Mentor Status transitioning to Active or Declined (MR-ONBOARD-DAT-011), Application Decline Reason if declined (MR-ONBOARD-DAT-012), and Is Primary Mentor set to Yes at activation (MR-ONBOARD-DAT-013)."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  pageBreak(),

  // ────────────────────────────────────────────────────────────────
  // 3.4 MR-MANAGE
  // ────────────────────────────────────────────────────────────────
  heading("3.4 Mentor Management (MR-MANAGE)", HeadingLevel.HEADING_2),

  heading("Process Purpose", HeadingLevel.HEADING_3),
  p("The Mentor Management process provides ongoing oversight and support for active mentors throughout their tenure with CBM. It begins when a mentor is activated at the end of MR-ONBOARD (Mentor Status = Active) and continues without a defined end state until the mentor exits to MR-DEPART (Resigned or Departed)."),
  p("Unlike the prior MR processes, which are linear workflows with defined start and end states, MR-MANAGE is a continuous process comprising multiple concurrent activities: mentor profile and role eligibility management, capacity management, mentor activity monitoring and response, status management for temporary breaks and inactivity, dues billing and tracking, and the mentor directory and analytics."),
  p("The process is primarily reactive \u2014 the Mentor Administrator responds to alerts, mentor requests, and situational changes rather than following a prescribed sequence of steps."),

  heading("Process Triggers", HeadingLevel.HEADING_3),
  p("Preconditions: A Contact record must exist with Contact Type = Mentor and Mentor Status = Active. This status is set by MR-ONBOARD when the Mentor Administrator activates a mentor.", { after: 80 }),
  p("Required Data: The Contact record with all application and onboarding data from MR-APPLY and MR-ONBOARD: identity fields, professional background, role eligibility (isPrimaryMentor = Yes), capacity settings, compliance records, and CBM email address.", { after: 80 }),
  p("Initiation Mechanism: Automatic. MR-MANAGE begins implicitly when Mentor Status is changed to Active. There is no discrete initiation event.", { after: 80 }),
  p("Initiating Persona: Not applicable. MR-MANAGE is an ongoing responsibility of the Mentor Administrator (MST-PER-005) that begins automatically when a mentor is activated."),

  heading("Personas Involved", HeadingLevel.HEADING_3),
  p([r("Mentor Administrator (MST-PER-005)", { bold: true })], { after: 40 }),
  p("Primary persona. Monitors mentor activity, manages status transitions (Active \u2194 Paused, Active \u2194 Inactive), sets and adjusts role eligibility, creates and tracks annual dues records, responds to inactivity alerts, manages unexpected unavailability, records administrator notes, overrides mentor capacity settings, and maintains board position information."),
  p([r("Mentor (MST-PER-011)", { bold: true })], { after: 40 }),
  p("Maintains their own profile directly in the CRM \u2014 biography, expertise, industry sectors, mentoring focus areas, languages, and availability. Adjusts their own Maximum Client Capacity and Accepting New Clients flag. Accesses the searchable mentor directory. Changes take effect immediately with no approval gate."),
  p([r("System Administrator (MST-PER-001)", { bold: true })], { after: 40 }),
  p("Configures the mentor-level inactivity alert threshold (default: 60 days). Does not participate in day-to-day mentor management."),

  heading("Process Workflow", HeadingLevel.HEADING_3),
  p("MR-MANAGE comprises six concurrent activity groups. These are not sequential steps \u2014 they run simultaneously throughout a mentor\u2019s active tenure and may overlap.", { italics: true, after: 200 }),

  p([r("4.1 Mentor Profile and Role Eligibility Management", { bold: true })], { after: 40 }),
  p("Active mentors maintain their own profile directly in the CRM. Editable fields include professional title, current employer, years of business experience, professional bio, industry sectors, mentoring focus areas, skills and expertise tags, fluent languages, and why interested in mentoring. Changes take effect immediately with no review or approval process. The Mentor Administrator manages role eligibility for each mentor: isPrimaryMentor (set to Yes automatically at activation by MR-ONBOARD), isCoMentor, and isSubjectMatterExpert (set by administrative judgment). A mentor may have all three role eligibility flags set to Yes simultaneously. The Mentor Administrator maintains the boardPosition field for mentors serving on the CBM board. The Mentor Administrator can override any mentor-editable field at any time."),

  p([r("4.2 Capacity Management", { bold: true })], { after: 40 }),
  p("Mentors manage their own availability by adjusting Maximum Client Capacity and Accepting New Clients. The system continuously calculates Current Active Clients (count of engagements where this mentor is the Assigned Mentor and Engagement Status is Active or Assigned) and Available Capacity (Maximum Client Capacity minus Current Active Clients). Active mentors with Accepting New Clients = Yes and Available Capacity > 0 are eligible for new client assignments through MN-MATCH. The Mentor Administrator can override a mentor\u2019s capacity settings at any time."),

  p([r("4.3 Mentor Activity Monitoring and Response", { bold: true })], { after: 40 }),
  p("The system monitors all Active mentors for session activity. If an Active mentor has no completed session in the last 60 days (default, configurable by the System Administrator), the system generates an alert to the Mentor Administrator. This alert fires regardless of whether the mentor has active engagements \u2014 having active engagements with no session activity is a worse signal, not a reason to suppress the alert. This mentor-level monitoring is distinct from MN-INACTIVE, which monitors individual engagements for dormancy. MR-MANAGE detects structural disengagement from the program across all assignments, while MN-INACTIVE detects inactivity within a single mentor-client relationship. When the Mentor Administrator receives an inactivity alert, they assess the situation and take appropriate action based on judgment."),

  p([r("4.4 Status Management", { bold: true })], { after: 40 }),
  p("MR-MANAGE owns four status transitions on the Mentor Status field, all performed by the Mentor Administrator as manual actions: Active \u2192 Paused (temporary break due to health, personal, or other reasons; Accepting New Clients set to No; existing engagements continue unless the mentor requests otherwise), Paused \u2192 Active (return from break; capacity settings restored), Active \u2192 Inactive (mentor no longer functionally participating, based on accumulated evidence; Accepting New Clients set to No), and Inactive \u2192 Active (direct reactivation within MR-MANAGE without going through MR-DEPART). MR-MANAGE handles temporary and recoverable status changes. MR-DEPART handles permanent exits (Resigned, Departed)."),

  p([r("4.5 Dues Billing and Tracking", { bold: true })], { after: 40 }),
  p("Annual dues are collected from mentors to support CBM\u2019s operating costs. The full business rules for dues billing are not yet defined and are captured as open issues. At the start of each billing cycle, the Mentor Administrator creates individual Dues records for each eligible mentor. Each Dues record represents one annual dues obligation for one mentor in one billing year. The Mentor Administrator tracks payment and updates Payment Status (Unpaid \u2192 Paid). If a waiver is granted, Payment Status is set to Waived. The summary Dues Status field on the mentor Contact record reflects current-year standing (Unpaid, Paid, or Waived), maintained independently of individual Dues records."),

  p([r("4.6 Mentor Directory and Analytics", { bold: true })], { after: 40 }),
  p("The system provides a searchable mentor directory accessible to all active mentors, displaying professional profile information (name, title, employer, bio, sectors, focus areas, skills, languages, experience). Administrative and sensitive fields are excluded. Three mentor-level analytics fields are maintained on each Contact record, calculated across all engagements: Total Lifetime Sessions, Total Mentoring Hours, and Total Sessions Last 30 Days. The Mentor Administrator records notes on individual mentor records visible to administrators only."),

  heading("Process Completion", HeadingLevel.HEADING_3),
  p([r("Normal Completion: ", { bold: true }), r("MR-MANAGE has no defined end state. The process is continuous from the moment a mentor is activated until they exit to MR-DEPART.")]),
  p([r("Exit to MR-DEPART: ", { bold: true }), r("When a mentor resigns voluntarily or the Mentor Administrator decides to formally offboard a mentor, the mentor transitions from MR-MANAGE to MR-DEPART.")]),
  p([r("No Early Termination: ", { bold: true }), r("Because MR-MANAGE is a continuous process, early termination does not apply. Paused and Inactive are status transitions within the process, not terminations of it.")]),
  p([r("Post-Completion Handoffs: ", { bold: true }), r("MR-MANAGE feeds data continuously to other processes: active mentors with available capacity feed into MN-MATCH, session activity data feeds into MN-ENGAGE and MN-INACTIVE, and mentor-level inactivity patterns may trigger escalation to MR-DEPART.")]),

  heading("System Requirements", HeadingLevel.HEADING_3),
  reqTable([
    ["MR-MANAGE-REQ-001", "The system must store a complete mentor profile including professional title, current employer, years of business experience, professional bio, industry sectors, mentoring focus areas, skills and expertise tags, fluent languages, and availability. Mentors must be able to edit their own profile fields directly. Changes take effect immediately with no approval process."],
    ["MR-MANAGE-REQ-002", "The system must support three mentor role eligibility flags on the Contact record \u2014 Is Primary Mentor, Is Co-Mentor, and Is Subject Matter Expert \u2014 all settable by the Mentor Administrator. A mentor may have any combination of these flags set to Yes simultaneously."],
    ["MR-MANAGE-REQ-003", "The system must calculate Current Active Clients (count of engagements where the mentor is the Assigned Mentor and Engagement Status is Active or Assigned) and Available Capacity (Maximum Client Capacity minus Current Active Clients) automatically. Both fields must be system-calculated and read-only."],
    ["MR-MANAGE-REQ-004", "The system must provide a searchable mentor directory accessible to all active mentors, displaying professional profile information. Administrative and sensitive fields must not appear in the directory."],
    ["MR-MANAGE-REQ-005", "The system must support a board position text field on the mentor Contact record for tracking board membership, visible for CBM organizational member types and populated by the Mentor Administrator."],
    ["MR-MANAGE-REQ-006", "The system must support annual dues billing by maintaining individual Dues records per mentor per billing year. Each record must track billing year, amount, due date, payment status, payment date, payment method, and notes. The system must alert the Mentor Administrator when dues remain unpaid past the configured grace period."],
    ["MR-MANAGE-REQ-007", "The system must alert the Mentor Administrator when any Active mentor has no completed session in the last 60 days (default threshold, configurable by the System Administrator). This alert fires regardless of whether the mentor has active engagements."],
    ["MR-MANAGE-REQ-008", "The system must maintain three mentor-level analytics fields on the Contact record, calculated across all engagements: Total Lifetime Sessions, Total Mentoring Hours, and Total Sessions Last 30 Days. These fields must be system-calculated, read-only, and visible in list views and detail pages."],
    ["MR-MANAGE-REQ-009", "The system must support administrator notes on individual mentor records. Notes must be visible to administrators only and not accessible by mentors."],
    ["MR-MANAGE-REQ-010", "The system must support the following status transitions on the Mentor Status field, all performed manually by the Mentor Administrator: Active \u2192 Paused, Paused \u2192 Active, Active \u2192 Inactive, and Inactive \u2192 Active. When a mentor is set to Paused or Inactive, Accepting New Clients must be set to No."],
    ["MR-MANAGE-REQ-011", "The system must allow the Mentor Administrator to override any mentor-editable field, including Maximum Client Capacity and Accepting New Clients."],
  ]),

  heading("Process Data", HeadingLevel.HEADING_3),
  p("MR-MANAGE reads Contact fields populated by MR-APPLY (identity: first name, last name, preferred name, personal email, phone) and MR-ONBOARD (compliance: CBM email address, training completed, training completion date, ethics agreement accepted, ethics agreement acceptance date/time). It also reads Engagement entity fields from the MN domain: Engagement Status (for capacity calculations), total sessions, total session hours, and total sessions last 30 days (for mentor-level analytics)."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  heading("Data Collected", HeadingLevel.HEADING_3),
  p("MR-MANAGE creates or updates Contact fields across six functional groups: profile fields maintained by the mentor (title, currentEmployer, yearsOfBusinessExperience, professionalBio, industrySectors, mentoringFocusAreas, skillsAndExpertiseTags, fluentLanguages, whyInterestedInMentoring), role eligibility flags managed by the Mentor Administrator (isPrimaryMentor, isCoMentor, isSubjectMatterExpert), capacity and availability fields (maximumClientCapacity, acceptingNewClients, plus system-calculated currentActiveClients and availableCapacity), mentor analytics fields (totalLifetimeSessions, totalMentoringHours, totalSessionsLast30Days), status and lifecycle fields (mentorStatus for Active/Paused/Inactive transitions, boardPosition), and dues summary fields (duesStatus, duesPaymentDate)."),
  p("MR-MANAGE also defines and creates Dues entity records with fields: mentorContact, billingYear, amount, dueDate, paymentStatus, paymentDate, paymentMethod, and notes."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  pageBreak(),

  // ────────────────────────────────────────────────────────────────
  // 3.5 MR-DEPART
  // ────────────────────────────────────────────────────────────────
  heading("3.5 Mentor Departure and Reactivation (MR-DEPART)", HeadingLevel.HEADING_2),

  heading("Process Purpose", HeadingLevel.HEADING_3),
  p("The Mentor Departure and Reactivation process manages the permanent exit of mentors from CBM and the reinstatement of previously departed or resigned mentors. It begins when a mentor resigns voluntarily, when the Mentor Administrator decides to administratively remove a mentor, or when a formerly departed or resigned mentor requests reinstatement. The process ends when the mentor\u2019s status has been changed, departure fields recorded (or cleared, in the case of reactivation), and external account deprovisioning completed."),
  p("MR-DEPART contains three distinct paths within a single process: Voluntary Resignation (mentor chooses to leave, status changed to Resigned), Administrative Departure (Mentor Administrator removes a mentor, status changed to Departed), and Reactivation (formerly departed or resigned mentor requests reinstatement, status restored to Active or Provisional)."),
  p("This is a low-volume process \u2014 CBM has over 100 active mentors and loses a couple per year. Reactivation is rarer still. All mentor records are retained permanently after departure; no data is deleted or anonymized."),

  heading("Process Triggers", HeadingLevel.HEADING_3),
  p([r("Path 1 \u2014 Voluntary Resignation: ", { bold: true }), r("Preconditions: Contact with Mentor Status in [Active, Paused, Inactive]. Initiation: Manual, the mentor contacts the Mentor Administrator by phone or email. Initiating Persona: Mentor (MST-PER-011).")], { after: 80 }),
  p([r("Path 2 \u2014 Administrative Departure: ", { bold: true }), r("Preconditions: Contact with Mentor Status in [Active, Paused, Inactive]. Initiation: Manual, the Mentor Administrator decides to depart the mentor based on their assessment. Initiating Persona: Mentor Administrator (MST-PER-005).")], { after: 80 }),
  p([r("Path 3 \u2014 Reactivation: ", { bold: true }), r("Preconditions: Contact with Mentor Status in [Resigned, Departed]. Initiation: Manual, the former mentor contacts the Mentor Administrator to request reinstatement. Initiating Persona: Mentor (MST-PER-011), though approval is at the sole discretion of the Mentor Administrator.")]),

  heading("Personas Involved", HeadingLevel.HEADING_3),
  p([r("Mentor Administrator (MST-PER-005)", { bold: true })], { after: 40 }),
  p("Primary persona for all three paths. Reviews engagements for reassignment, contacts the Client Assignment Coordinator to initiate MN-MATCH, changes status, records departure fields, follows external deprovisioning checklist, and optionally sends thank-you communication. For reactivation, evaluates the request, verifies compliance record currency, restores status, clears departure fields, and coordinates external account restoration."),
  p([r("Mentor (MST-PER-011)", { bold: true })], { after: 40 }),
  p("Initiates voluntary resignation or requests reactivation by contacting the Mentor Administrator. Does not perform any CRM actions during this process."),

  heading("Process Workflow", HeadingLevel.HEADING_3),

  p([r("Path 1: Voluntary Resignation", { bold: true })], { after: 40 }),
  ...numberedList([
    "The mentor contacts the Mentor Administrator by phone or email to communicate their decision to leave CBM.",
    "The Mentor Administrator reviews the mentor\u2019s engagements in the CRM, checking for any where the departing mentor is the Assigned Mentor and the Engagement Status is Active, Assigned, or On-Hold. If any exist, the Mentor Administrator contacts the Client Assignment Coordinator to initiate MN-MATCH for reassignment.",
    "The Mentor Administrator changes Mentor Status to Resigned, records the Departure Reason and Departure Date on the Contact record. The status change is immediate \u2014 it does not wait for engagement reassignment to complete.",
    "The Mentor Administrator follows the external deprovisioning checklist to deactivate the mentor\u2019s system accounts. The cbmEmailAddress field on the Contact record is retained as historical data.",
    "At the Mentor Administrator\u2019s discretion, a thank-you email or other token of appreciation is sent to the departing mentor outside the CRM.",
  ]),

  p([r("Path 2: Administrative Departure", { bold: true })], { after: 40 }),
  p("The administrative departure workflow follows the same five steps as voluntary resignation. The only differences are: the Mentor Administrator initiates the process based on their own assessment (typically a pattern of inactivity), the target status is Departed rather than Resigned, and the communication to the departing mentor may be a notification rather than a thank-you."),

  p([r("Path 3: Reactivation from Resigned or Departed", { bold: true })], { after: 40 }),
  ...numberedList([
    "A formerly resigned or departed mentor contacts the Mentor Administrator by phone or email to request reinstatement.",
    "The Mentor Administrator evaluates the request. Approval is at the Mentor Administrator\u2019s sole discretion. If denied, the process ends with no changes to the Contact record.",
    "If approved, the Mentor Administrator reviews the mentor\u2019s compliance records \u2014 training completion, ethics agreement, and background check \u2014 to determine whether any need renewal. There are no defined expiration periods; currency assessment is at the Mentor Administrator\u2019s judgment.",
    "If all compliance records are current, the Mentor Administrator changes Mentor Status directly to Active. If compliance records need renewal, the Mentor Administrator changes Mentor Status to Provisional and routes the mentor through the relevant MR-ONBOARD steps before activation.",
    "The Mentor Administrator clears the Departure Reason and Departure Date fields on the Contact record.",
    "The Mentor Administrator coordinates restoration of the mentor\u2019s CBM email account and other system accounts outside the CRM, using the cbmEmailAddress already stored on the Contact record.",
    "The Mentor Administrator optionally adds a note on the mentor\u2019s Contact record documenting the reactivation and any relevant context.",
  ]),

  heading("Process Completion", HeadingLevel.HEADING_3),
  p([r("Departure (Paths 1 and 2): ", { bold: true }), r("Complete when Mentor Status has been changed to Resigned or Departed, departure fields recorded, and external deprovisioning checklist followed. Engagement reassignment through MN-MATCH proceeds independently.")]),
  p([r("Reactivation (Path 3): ", { bold: true }), r("Complete when Mentor Status has been changed to Active (or Provisional if onboarding steps are required), departure fields cleared, and external account restoration coordinated. If routed through Provisional, full reactivation completes when MR-ONBOARD finishes.")]),
  p([r("Reactivation Denied: ", { bold: true }), r("If denied, the process ends immediately with no changes. The mentor remains in Resigned or Departed status.")]),
  p([r("Post-Completion Handoffs: ", { bold: true }), r("Departure triggers MN-MATCH if any active engagements require mentor reassignment. Reactivation may trigger MR-ONBOARD if compliance records need renewal.")]),

  heading("System Requirements", HeadingLevel.HEADING_3),
  reqTable([
    ["MR-DEPART-REQ-001", "The system must support transition of a mentor to Resigned or Departed status with a recorded departure reason and departure date. The transition may originate from any current mentor status (Active, Paused, or Inactive)."],
    ["MR-DEPART-REQ-002", "The system must support reactivation of a mentor from Resigned or Departed status back to Active or Provisional, including clearing the departure reason and departure date fields."],
    ["MR-DEPART-REQ-003", "The system must provide the Mentor Administrator with a view of all engagements (Active, Assigned, or On-Hold) where a departing mentor is the Assigned Mentor, so the administrator can identify engagements requiring reassignment."],
    ["MR-DEPART-REQ-004", "All mentor records must be retained permanently after departure \u2014 no deletion or anonymization. Session history, engagement history, notes, and dues records remain intact."],
  ]),

  heading("Process Data", HeadingLevel.HEADING_3),
  p("MR-DEPART reads Contact fields from MR-ONBOARD (cbmEmailAddress for deprovisioning and reactivation; compliance records for reactivation currency assessment: trainingCompleted, trainingCompletionDate, ethicsAgreementAccepted, ethicsAgreementAcceptanceDateTime, backgroundCheckCompleted, backgroundCheckDate). It also reads Engagement fields from the MN domain (Engagement Status and Assigned Mentor relationship) to identify engagements requiring reassignment."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  heading("Data Collected", HeadingLevel.HEADING_3),
  p("MR-DEPART creates or updates three Contact fields: Mentor Status changed to Resigned or Departed at departure, or to Active or Provisional at reactivation (MR-DEPART-DAT-001); Departure Reason recorded at departure and cleared at reactivation (MR-DEPART-DAT-002); and Departure Date recorded at departure and cleared at reactivation (MR-DEPART-DAT-003). The departureReason and departureDate fields are visible when Mentor Status is in [Resigned, Departed]."),
  p("See Section 4 (Data Reference) for full field-level detail."),

  pageBreak(),
];

// ═══════════════════════════════════════════════════════════════════════
// SECTION 4: DATA REFERENCE — will be appended below
// ═══════════════════════════════════════════════════════════════════════

content.push(heading("4. Data Reference", HeadingLevel.HEADING_1));
content.push(p("This section provides a consolidated view of all data in the Mentor Recruitment domain, organized by entity. Each field is listed once with its authoritative definition and a reference to all processes that define or use it. The \u201cDefined In\u201d column traces each field to its originating process document(s)."));

// ── Entity: Contact ──────────────────────────────────────────────
content.push(heading("Entity: Contact (Mentor)", HeadingLevel.HEADING_2));
content.push(p("The primary entity in the MR domain. Contact records with Contact Type = Mentor represent all mentors from prospect through active and departed. This entity carries the heaviest field set in the domain and is shared with the Mentoring (MN) domain."));

// Identity and Contact Information
content.push(heading("Identity and Contact Information", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "contactType", type: "multiEnum", req: "Yes", values: "Mentor (for this domain)", def: "\u2014", id: "MR-RECRUIT-DAT-004", definedIn: "RECRUIT, APPLY", desc: "Set to Mentor when a prospect or applicant contact is created. Drives visibility of Mentor-specific fields and panels." },
  { name: "firstName", type: "varchar", req: "Yes", values: null, def: null, id: "MR-RECRUIT-DAT-007", definedIn: "RECRUIT, APPLY", desc: "The contact\u2019s first name. Minimum identity data captured during outreach (RECRUIT) or application (APPLY). Native Contact field." },
  { name: "lastName", type: "varchar", req: "Yes", values: null, def: null, id: "MR-RECRUIT-DAT-008", definedIn: "RECRUIT, APPLY", desc: "The contact\u2019s last name. Minimum identity data captured during outreach (RECRUIT) or application (APPLY). Native Contact field." },
  { name: "preferredName", type: "varchar", req: "No", values: null, def: null, id: "MR-APPLY-DAT-006", definedIn: "APPLY, MANAGE", desc: "The name the contact prefers to be called. Used in communications when provided. Collected at application, displayed in mentor directory." },
  { name: "email", type: "email", req: "Yes", values: null, def: null, id: "MR-RECRUIT-DAT-009", definedIn: "RECRUIT, APPLY", desc: "The contact\u2019s native email field. Used as the primary contact method during prospect follow-up (RECRUIT). Used for duplicate detection at application submission (APPLY)." },
  { name: "personalEmail", type: "email", req: "Yes", values: null, def: null, id: "MR-APPLY-DAT-007", definedIn: "APPLY, ONBOARD, MANAGE", desc: "The applicant\u2019s personal email address. Used for confirmation email and all pre-activation communications. Separate from the native email field and from cbmEmailAddress." },
  { name: "phone", type: "phone", req: "Yes", values: null, def: null, id: "MR-APPLY-DAT-008", definedIn: "APPLY, ONBOARD", desc: "The contact\u2019s primary phone number. Collected at application. Native Contact field." },
  { name: "cbmEmailAddress", type: "email", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-008", definedIn: "ONBOARD, MANAGE, DEPART", desc: "The mentor\u2019s assigned CBM organizational email address. Populated by the Mentor Administrator during onboarding. Email account provisioned externally. Retained on the Contact record after departure as historical data." },
  { name: "linkedInProfile", type: "url", req: "No", values: null, def: null, id: "MR-APPLY-DAT-009", definedIn: "APPLY", desc: "The applicant\u2019s LinkedIn profile URL. Used for profile and background context." },
]));

// Professional Background
content.push(heading("Professional Background", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "title", type: "varchar", req: "No", values: null, def: null, id: "MR-MANAGE-DAT-005", definedIn: "MANAGE", desc: "Mentor\u2019s current professional title. Mentor-editable. Displayed in the mentor directory and profile." },
  { name: "currentEmployer", type: "varchar", req: "No", values: null, def: null, id: "MR-APPLY-DAT-010", definedIn: "APPLY, MANAGE", desc: "Name of the contact\u2019s current employer or organization. Collected at application, mentor-editable after activation. Displayed in the mentor directory." },
  { name: "currentlyEmployed", type: "bool", req: "No", values: null, def: null, id: "MR-APPLY-DAT-011", definedIn: "APPLY", desc: "Whether the applicant is employed at the time of application. Point-in-time snapshot." },
  { name: "yearsOfBusinessExperience", type: "int", req: "No", values: null, def: null, id: "MR-APPLY-DAT-012", definedIn: "APPLY, MANAGE", desc: "Total years of professional business experience. Collected at application, mentor-editable after activation. Displayed in the mentor directory." },
  { name: "professionalBio", type: "wysiwyg", req: "No", values: null, def: null, id: "MR-APPLY-DAT-013", definedIn: "APPLY, MANAGE", desc: "Free-form description of professional background and work experience. Collected at application, mentor-editable after activation. Displayed in the mentor directory." },
]));

// Expertise and Matching
content.push(heading("Expertise and Matching", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "industrySectors", type: "multiEnum", req: "Yes", values: "20 NAICS sectors (aligned with Client Organization)", def: "\u2014", id: "MR-APPLY-DAT-014", definedIn: "RECRUIT (read), APPLY, MANAGE", desc: "Industry sectors where the mentor has experience. Primary matching criterion. Values must align with the Industry Sector field on Client Organization. Collected at application, mentor-editable after activation. Read by RECRUIT for roster gap analysis." },
  { name: "mentoringFocusAreas", type: "multiEnum", req: "Yes", values: "TBD \u2014 see CON-ISS-005", def: "\u2014", id: "MR-APPLY-DAT-015", definedIn: "RECRUIT (read), APPLY, MANAGE", desc: "Specific areas where the mentor provides guidance. Primary matching criterion. Values must align with the Engagement-level Mentoring Focus Areas field and the Client Organization Mentoring Focus Areas field. Collected at application, mentor-editable after activation. Read by RECRUIT for roster gap analysis." },
  { name: "skillsAndExpertiseTags", type: "multiEnum", req: "No", values: "TBD \u2014 see CON-ISS-006", def: "\u2014", id: "MR-APPLY-DAT-016", definedIn: "APPLY, MANAGE", desc: "Finer-grained expertise tags beyond industry sector and focus areas. Supports advanced mentor-client matching. Collected at application, mentor-editable after activation." },
  { name: "fluentLanguages", type: "multiEnum", req: "No", values: "TBD \u2014 see CON-ISS-007", def: "\u2014", id: "MR-APPLY-DAT-017", definedIn: "APPLY, MANAGE", desc: "Languages the mentor is fluent in. Used to match clients who prefer to work in a language other than English. Collected at application, mentor-editable after activation." },
]));

// Motivation and Referral
content.push(heading("Motivation and Referral", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "whyInterestedInMentoring", type: "wysiwyg", req: "No", values: null, def: null, id: "MR-APPLY-DAT-018", definedIn: "APPLY, MANAGE", desc: "The mentor\u2019s stated motivation for joining CBM as a volunteer mentor. Collected at application, mentor-editable after activation. Not displayed in the mentor directory." },
  { name: "howDidYouHearAboutCBM", type: "enum", req: "No", values: "TBD \u2014 see CON-ISS-008", def: "\u2014", id: "MR-RECRUIT-DAT-006", definedIn: "RECRUIT, APPLY", desc: "How the contact learned about CBM\u2019s mentoring program. Referral source recorded at point of first contact (RECRUIT) or at application (APPLY). Supports outreach channel effectiveness reporting." },
]));

// Application and Compliance
content.push(heading("Application and Compliance", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "felonyConvictionDisclosure", type: "bool", req: "Yes", values: null, def: null, id: "MR-APPLY-DAT-020", definedIn: "APPLY, ONBOARD (read)", desc: "Whether the applicant discloses a felony conviction. System-populated from the application form. Admin-only; hidden from the mentor after submission. May inform the Mentor Administrator\u2019s decision on whether to require a background check during onboarding." },
  { name: "termsAndConditionsAccepted", type: "bool", req: "Yes", values: null, def: "Yes", id: "MR-APPLY-DAT-021", definedIn: "APPLY", desc: "System-set to Yes at application submission. Admin-only; read-only for contacts." },
  { name: "termsAndConditionsAcceptanceDateTime", type: "datetime", req: "Yes", values: null, def: null, id: "MR-APPLY-DAT-022", definedIn: "APPLY", desc: "System-recorded timestamp of terms and conditions acceptance at submission. Admin-only; read-only for contacts." },
  { name: "applicationDeclineReason", type: "enum", req: "Conditional", values: "Insufficient Experience, Incomplete Application, Failed Background Check, Conflict of Interest, Unresponsive, Candidate Withdrew, Other", def: "\u2014", id: "MR-APPLY-DAT-024", definedIn: "APPLY, ONBOARD", desc: "Reason the mentor application was declined. Required when Mentor Status = Declined. Visible only when mentorStatus = Declined. Admin-only. Used during both MR-APPLY (application decline) and MR-ONBOARD (onboarding decline). Reconciled to 7 values (Unresponsive and Candidate Withdrew added by MR-ONBOARD)." },
  { name: "trainingCompleted", type: "bool", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-002", definedIn: "ONBOARD, MANAGE (read), DEPART (read)", desc: "Whether the mentor has completed required training modules. System-populated via LMS integration or manually set by the Mentor Administrator as a fallback. Referenced for compliance verification and reactivation assessment." },
  { name: "trainingCompletionDate", type: "date", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-003", definedIn: "ONBOARD, MANAGE (read), DEPART (read)", desc: "Date required training was completed. System-populated via LMS integration or manually set by the Mentor Administrator. Paired with trainingCompleted." },
  { name: "ethicsAgreementAccepted", type: "bool", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-004", definedIn: "ONBOARD, MANAGE (read), DEPART (read)", desc: "Whether the mentor has accepted the current CBM ethics agreement. Set by the Mentor Administrator after the mentor completes the external acceptance process. Admin-only, read-only for mentors." },
  { name: "ethicsAgreementAcceptanceDateTime", type: "datetime", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-005", definedIn: "ONBOARD, MANAGE (read), DEPART (read)", desc: "Date and time of the mentor\u2019s ethics agreement acceptance. Set by the Mentor Administrator. Admin-only." },
  { name: "backgroundCheckCompleted", type: "bool", req: "Conditional", values: null, def: null, id: "MR-ONBOARD-DAT-006", definedIn: "ONBOARD, DEPART (read)", desc: "Whether a background check has been completed. Conditional: only populated when the Mentor Administrator determines a background check is required. Admin-only, hidden from mentors. Requires ethics agreement acceptance first." },
  { name: "backgroundCheckDate", type: "date", req: "Conditional", values: null, def: null, id: "MR-ONBOARD-DAT-007", definedIn: "ONBOARD, DEPART (read)", desc: "Date the background check was completed. Conditional: only populated when a background check is conducted. Admin-only, hidden from mentors." },
]));

// Lifecycle and Status
content.push(heading("Lifecycle and Status", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "mentorStatus", type: "enum", req: "Yes", values: "Prospect, Submitted, In Review, Provisional, Active, Paused, Inactive, Resigned, Departed, Declined", def: "\u2014", id: "MR-RECRUIT-DAT-005", definedIn: "ALL processes", desc: "The current lifecycle stage of the mentor. Central field spanning all five MR processes. Transitions: RECRUIT creates Prospect; APPLY manages Submitted, In Review, Provisional, Declined; ONBOARD manages Provisional \u2192 Active or Declined; MANAGE manages Active \u2194 Paused, Active \u2194 Inactive; DEPART manages Active/Paused/Inactive \u2192 Resigned or Departed, and Resigned/Departed \u2192 Active or Provisional (reactivation)." },
  { name: "departureReason", type: "enum", req: "No", values: "Relocated, Career Change, Time Constraints, Personal, Other", def: "\u2014", id: "MR-DEPART-DAT-002", definedIn: "DEPART", desc: "Reason the mentor exited CBM. Set by the Mentor Administrator at departure. Cleared on reactivation. Visible when mentorStatus in [Resigned, Departed]." },
  { name: "departureDate", type: "date", req: "No", values: null, def: null, id: "MR-DEPART-DAT-003", definedIn: "DEPART", desc: "Date the mentor departed. Set by the Mentor Administrator at departure. Cleared on reactivation. Visible when mentorStatus in [Resigned, Departed]." },
]));

// Role Eligibility
content.push(heading("Role Eligibility", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "isPrimaryMentor", type: "bool", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-013", definedIn: "ONBOARD, MANAGE", desc: "Whether this mentor is eligible for primary mentor assignments. Automatically set to Yes when Mentor Status is changed to Active (MR-ONBOARD). Adjustable by the Mentor Administrator in MR-MANAGE." },
  { name: "isCoMentor", type: "bool", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-015", definedIn: "MANAGE", desc: "Whether this mentor is eligible for co-mentor assignments. Set by the Mentor Administrator based on discussion with the mentor. Not set during onboarding." },
  { name: "isSubjectMatterExpert", type: "bool", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-016", definedIn: "MANAGE", desc: "Whether this mentor is eligible for subject matter expert assignments. Set by the Mentor Administrator based on discussion with the mentor. Not set during onboarding." },
]));

// Capacity and Availability
content.push(heading("Capacity and Availability", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "maximumClientCapacity", type: "int", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-009", definedIn: "ONBOARD, MANAGE", desc: "Maximum number of simultaneous active client engagements. Initially set by Mentor Administrator during onboarding. Mentor-editable after activation. Admin-overridable." },
  { name: "acceptingNewClients", type: "bool", req: "Yes", values: null, def: null, id: "MR-ONBOARD-DAT-010", definedIn: "ONBOARD, MANAGE", desc: "Whether the mentor is available for new client assignments. Set to Yes during onboarding. Set to No automatically when status changes to Paused or Inactive. Mentor-editable when Active. Admin-overridable." },
  { name: "currentActiveClients", type: "int", req: "System", values: null, def: null, id: "MR-MANAGE-DAT-019", definedIn: "MANAGE", desc: "Count of engagements where this mentor is the Assigned Mentor and Engagement Status is Active or Assigned. System-calculated, read-only." },
  { name: "availableCapacity", type: "int", req: "System", values: null, def: null, id: "MR-MANAGE-DAT-020", definedIn: "MANAGE", desc: "Maximum Client Capacity minus Current Active Clients. System-calculated, read-only." },
]));

// Analytics
content.push(heading("Mentor Analytics", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "totalLifetimeSessions", type: "int", req: "System", values: null, def: null, id: "MR-MANAGE-DAT-021", definedIn: "MANAGE", desc: "Count of all completed sessions across all of this mentor\u2019s engagements. System-calculated, read-only. Visible in list views and detail pages." },
  { name: "totalMentoringHours", type: "float", req: "System", values: null, def: null, id: "MR-MANAGE-DAT-022", definedIn: "MANAGE", desc: "Sum of all session hours across all of this mentor\u2019s engagements. System-calculated, read-only. Visible in list views and detail pages." },
  { name: "totalSessionsLast30Days", type: "int", req: "System", values: null, def: null, id: "MR-MANAGE-DAT-023", definedIn: "MANAGE", desc: "Count of completed sessions in the last 30 days across all of this mentor\u2019s engagements. System-calculated, read-only. Used by the inactivity alert. Visible in list views and detail pages." },
]));

// Board and Organizational
content.push(heading("Board and Organizational", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "boardPosition", type: "varchar", req: "No", values: null, def: null, id: "MR-MANAGE-DAT-025", definedIn: "MANAGE", desc: "The mentor\u2019s title or role on the CBM board (e.g., Board Chair, Treasurer). Visible for CBM organizational member types. Populated by the Mentor Administrator." },
]));

// Dues Summary on Contact
content.push(heading("Dues Summary", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "duesStatus", type: "enum", req: "No", values: "Unpaid, Paid, Waived", def: "\u2014", id: "MR-MANAGE-DAT-026", definedIn: "MANAGE", desc: "Summary field on the Contact record reflecting the mentor\u2019s current-year dues standing. Set by the Mentor Administrator. Maintained independently of individual Dues records. Admin-only, read-only for mentors." },
  { name: "duesPaymentDate", type: "date", req: "No", values: null, def: null, id: "MR-MANAGE-DAT-027", definedIn: "MANAGE", desc: "Date of most recent dues payment. Not applicable when duesStatus = Waived. Admin-only." },
]));

// Campaign Tracking
content.push(heading("Campaign Tracking", HeadingLevel.HEADING_3));
content.push(drFieldTable([
  { name: "campaignEngagementNotes", type: "text (notes)", req: "No", values: null, def: null, id: "MR-RECRUIT-DAT-010", definedIn: "RECRUIT", desc: "Campaign engagement history recorded manually as notes on the prospect contact record. Includes emails sent, opened, clicked, and follow-up activity. Recorded after each campaign execution. Automated sync is a planned future enhancement (see MR-RECRUIT-ISS-002)." },
]));

content.push(pageBreak());

// ── Entity: Dues ─────────────────────────────────────────────────
content.push(heading("Entity: Dues", HeadingLevel.HEADING_2));
content.push(p("The Dues entity represents one annual dues obligation for a single mentor. One record is created per mentor per billing year. Dues records provide a complete payment history independent of the summary Dues Status field on the mentor Contact record. This entity is defined inline in MR-MANAGE; a full Dues Entity PRD will be produced after domain reconciliation. Relationship: Contact \u2192 Dues (one-to-many)."));

content.push(drFieldTable([
  { name: "mentorContact", type: "relationship", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-028", definedIn: "MANAGE", desc: "The mentor this dues record belongs to. Links to the Contact entity." },
  { name: "billingYear", type: "int", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-029", definedIn: "MANAGE", desc: "The calendar year this dues record applies to (e.g., 2026). TBD whether the billing cycle is calendar year or another cycle (see MR-MANAGE-ISS-001)." },
  { name: "amount", type: "currency", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-030", definedIn: "MANAGE", desc: "The dues amount invoiced for this billing year. TBD whether the amount is uniform or varies (see MR-MANAGE-ISS-002)." },
  { name: "dueDate", type: "date", req: "Yes", values: null, def: null, id: "MR-MANAGE-DAT-031", definedIn: "MANAGE", desc: "The date by which payment is expected." },
  { name: "paymentStatus", type: "enum", req: "Yes", values: "Unpaid, Paid, Waived", def: "Unpaid", id: "MR-MANAGE-DAT-032", definedIn: "MANAGE", desc: "The current payment status for this dues record. Updated by the Mentor Administrator when payment is received or a waiver is granted." },
  { name: "paymentDate", type: "date", req: "No", values: null, def: null, id: "MR-MANAGE-DAT-033", definedIn: "MANAGE", desc: "The date payment was received. Not applicable when Payment Status = Waived." },
  { name: "paymentMethod", type: "enum", req: "No", values: "Online Payment, Check, Waived", def: "\u2014", id: "MR-MANAGE-DAT-034", definedIn: "MANAGE", desc: "How the dues were paid or waived." },
  { name: "notes", type: "text", req: "No", values: null, def: null, id: "MR-MANAGE-DAT-035", definedIn: "MANAGE", desc: "Additional notes about this dues record (e.g., waiver rationale, payment arrangement details). Admin-only." },
]));

content.push(pageBreak());

// ── Referenced Entities (owned by other domains) ─────────────────
content.push(heading("Referenced Entities (Owned by Other Domains)", HeadingLevel.HEADING_2));
content.push(p("The following entities are referenced by MR domain processes but owned by other domains. They are included here for cross-reference completeness. Full field definitions reside in their respective domain or entity PRDs."));

content.push(heading("Entity: Engagement (Mentoring Domain)", HeadingLevel.HEADING_3));
content.push(p("Referenced by MR-MANAGE (for capacity calculations and analytics) and MR-DEPART (for reassignment checks). Owned by the Mentoring (MN) domain. Key fields referenced: engagementStatus (enum, 10 values: Submitted, Declined, Pending Acceptance, Assigned, Active, On-Hold, Dormant, Inactive, Abandoned, Completed), Assigned Mentor relationship, totalSessions, totalSessionHours, totalSessionsLast30Days."));

content.push(heading("Entity: Session (Mentoring Domain)", HeadingLevel.HEADING_3));
content.push(p("Referenced by MR-MANAGE for mentor-level activity monitoring (inactivity alert based on completed sessions in last 60 days). Owned by the Mentoring (MN) domain. Session data feeds into the mentor-level analytics fields on the Contact record."));

content.push(heading("Entity: Account (Partner Organizations)", HeadingLevel.HEADING_3));
content.push(p("Referenced by MR-RECRUIT for partner-channel recruitment coordination. Partner organization profiles and affiliated contacts are used to identify potential mentor candidates. Owned by the Client Recruiting (CR) domain."));

content.push(pageBreak());

// ═══════════════════════════════════════════════════════════════════════
// SECTION 5: DECISIONS MADE
// ═══════════════════════════════════════════════════════════════════════

content.push(heading("5. Decisions Made", HeadingLevel.HEADING_1));
content.push(p("The following decisions were made during the process definition conversations and reconciliation session."));

content.push(decisionTable([
  { id: "MR-RECON-DEC-001", decision: "Reactivation is available from both Resigned and Departed status, not only Departed.", rationale: "Voluntarily resigned mentors should have the same reactivation path as administratively departed mentors.", madeIn: "Reconciliation" },
  { id: "MR-RECON-DEC-002", decision: "applicationDeclineReason uses the reconciled 7-value enum: Insufficient Experience, Incomplete Application, Failed Background Check, Conflict of Interest, Unresponsive, Candidate Withdrew, Other.", rationale: "MR-ONBOARD added Unresponsive and Candidate Withdrew for onboarding-specific decline scenarios. The same field is used by both MR-APPLY and MR-ONBOARD.", madeIn: "Reconciliation" },
  { id: "MR-RECRUIT-DEC-001", decision: "Prospect is the initial Mentor Status for outreach-generated contacts. MR-RECRUIT creates prospect records; MR-APPLY transitions Prospect to Submitted.", rationale: "Prospect is a lifecycle state managed through the marketing system, not a separate Contact Type value.", madeIn: "MR-RECRUIT" },
  { id: "MR-RECRUIT-DEC-002", decision: "v1.0 uses manual export/import between CRM and marketing system. Automated sync captured as future enhancement.", rationale: "Automated integration is desirable but not required for initial deployment.", madeIn: "MR-RECRUIT" },
  { id: "MR-RECRUIT-DEC-003", decision: "Dues and SME Request entities defined inline in process documents, with Entity Inventory and Entity PRDs produced afterward.", rationale: "Matches how the MN domain handled the Session entity. Allows process definition to proceed without blocking on entity inventory updates.", madeIn: "MR-RECRUIT" },
  { id: "MR-APPLY-DEC-001", decision: "Duplicate detection uses email address only, not name.", rationale: "First and last name is very rarely a reliable duplicate field.", madeIn: "MR-APPLY" },
  { id: "MR-APPLY-DEC-002", decision: "In Review added as an intermediate status between Submitted and disposition.", rationale: "Distinguishes applications under active evaluation from those not yet started.", madeIn: "MR-APPLY" },
  { id: "MR-APPLY-DEC-003", decision: "Decline notification is a manual email by the Mentor Administrator. No system-generated decline notification.", rationale: "Personal communication preferred for sensitive decisions.", madeIn: "MR-APPLY" },
  { id: "MR-APPLY-DEC-004", decision: "No withdrawal path in MR-APPLY. Applications remain until the Mentor Administrator makes a disposition decision.", rationale: "Simplicity. Low volume does not justify a self-service withdrawal mechanism.", madeIn: "MR-APPLY" },
  { id: "MR-APPLY-DEC-005", decision: "Same confirmation email regardless of whether the contact was new or an updated prospect.", rationale: "The applicant experience should be the same regardless of prior prospect status.", madeIn: "MR-APPLY" },
  { id: "MR-ONBOARD-DEC-001", decision: "Background check is at the Mentor Administrator\u2019s discretion. No formal criteria.", rationale: "Low volume and varied circumstances make rigid criteria impractical. Resolves MR-ISS-005.", madeIn: "MR-ONBOARD" },
  { id: "MR-ONBOARD-DEC-002", decision: "Ethics agreement is handled entirely outside the CRM. Mentor Administrator records acceptance.", rationale: "External process; CRM tracks the fact of acceptance, not the mechanism.", madeIn: "MR-ONBOARD" },
  { id: "MR-ONBOARD-DEC-003", decision: "isPrimaryMentor defaults to Yes at activation. isCoMentor and isSubjectMatterExpert are not set during onboarding.", rationale: "98% of candidates will be primary mentors. Exceptions configured in MR-MANAGE.", madeIn: "MR-ONBOARD" },
  { id: "MR-ONBOARD-DEC-004", decision: "No system-enforced validation gates for activation. Mentor Administrator has full authority.", rationale: "Trust the administrator to verify completion; system gates add complexity without proportional value.", madeIn: "MR-ONBOARD" },
  { id: "MR-ONBOARD-DEC-005", decision: "trainingCompleted can be set either automatically via LMS integration or manually by the Mentor Administrator.", rationale: "Manual fallback needed when LMS integration fails or training is completed outside the LMS.", madeIn: "MR-ONBOARD" },
  { id: "MR-MANAGE-DEC-001", decision: "No approval gate on mentor self-service profile edits. Changes take effect immediately.", rationale: "Simplicity and trust. Low risk of problematic self-service edits.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-002", decision: "All three role eligibility flags can be Yes simultaneously.", rationale: "A mentor may serve as primary, co-mentor, and SME concurrently.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-003", decision: "MR-MANAGE owns Active \u2194 Paused and Active \u2194 Inactive. MR-DEPART owns Resigned and Departed only.", rationale: "Paused and Inactive are temporary/recoverable; Resigned and Departed are permanent exits.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-004", decision: "Mentor-level inactivity monitoring operates independently of per-engagement monitoring (MN-INACTIVE).", rationale: "MR-MANAGE detects structural disengagement across all assignments; MN-INACTIVE detects inactivity within a single relationship.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-005", decision: "Industry Sectors and Mentoring Focus Areas must use same values as Client Organization.", rationale: "Values must align for matching to work correctly.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-006", decision: "Dues Status on Contact is a summary field maintained independently of individual Dues records.", rationale: "Convenience field for quick reference without querying Dues records.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-007", decision: "Mentor directory shows professional profile fields only. Administrative and sensitive fields are excluded.", rationale: "Directory is a community feature; sensitive data has no place in it.", madeIn: "MR-MANAGE" },
  { id: "MR-MANAGE-DEC-008", decision: "Three mentor-level analytics fields are stored on the Contact record, not derived at query time.", rationale: "Must appear in list views and detail pages; stored fields required for this.", madeIn: "MR-MANAGE" },
  { id: "MR-DEPART-DEC-001", decision: "MR-DEPART is one process with three distinct paths (voluntary resignation, administrative departure, reactivation).", rationale: "Processes are simple enough that splitting into separate documents would add overhead without value.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-002", decision: "Departure is immediate \u2014 does not wait for engagement reassignment.", rationale: "Reassignment through MN-MATCH proceeds independently in parallel.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-003", decision: "cbmEmailAddress retained on Contact record after departure.", rationale: "Historical data. Changed from legacy document which specified clearing the field.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-004", decision: "departureReason and departureDate apply to both Resigned and Departed.", rationale: "Both departure types warrant recording the reason and date.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-005", decision: "No reactivation date field.", rationale: "Admin note captures context if needed. Low volume does not justify a dedicated field.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-006", decision: "Compliance record currency at admin judgment \u2014 no defined expiration periods.", rationale: "Low volume and varied circumstances make rigid expiration periods impractical.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-007", decision: "Permanent record retention after departure. No deletion or anonymization.", rationale: "Historical data integrity. Session history, engagement history, notes, and dues records remain intact.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-008", decision: "Only Assigned Mentor (primary) engagements require reassignment. Co-Mentor and SME assignments remain as historical data.", rationale: "Co-mentor and SME roles are supplementary; their historical assignment is informational.", madeIn: "MR-DEPART" },
  { id: "MR-DEPART-DEC-009", decision: "Felony Conviction Disclosure hidden from mentors after submission.", rationale: "Sensitive disclosure should be admin-only after initial collection.", madeIn: "MR-APPLY" },
]));

content.push(pageBreak());

// ═══════════════════════════════════════════════════════════════════════
// SECTION 6: OPEN ISSUES
// ═══════════════════════════════════════════════════════════════════════

content.push(heading("6. Open Issues", HeadingLevel.HEADING_1));
content.push(p("The following unresolved issues were identified across the process definition conversations. All must be resolved before implementation."));

content.push(issueTable([
  { id: "MR-RECRUIT-ISS-001", issue: "How Did You Hear About CBM dropdown values not defined.", question: "What are the allowed values for the referral source field? Carried forward from CON-ISS-008.", owner: "CBM Leadership", source: "MR-RECRUIT" },
  { id: "MR-RECRUIT-ISS-002", issue: "Automated bidirectional sync between CRM and outbound marketing system.", question: "What integration approach, data exchanged, and sync triggers should be used? v1.0 uses manual export/import.", owner: "CBM Technology", source: "MR-RECRUIT" },
  { id: "MR-RECRUIT-ISS-003", issue: "Geographic distribution data for roster gap analysis.", question: "Is zip code sufficient for regional gap analysis, or is a separate service area or region field needed on Mentor Contact?", owner: "CBM Leadership", source: "MR-RECRUIT" },
  { id: "CON-ISS-005", issue: "Mentoring Focus Areas complete list of values not defined.", question: "What are the allowed values? Must align between Engagement, Mentor Contact, and Client Organization fields.", owner: "CBM Leadership", source: "Contact Entity PRD" },
  { id: "CON-ISS-006", issue: "Skills and Expertise Tags values not defined.", question: "What tags should be available for advanced mentor-client matching?", owner: "CBM Leadership", source: "Contact Entity PRD" },
  { id: "CON-ISS-007", issue: "Fluent Languages values not defined.", question: "What languages should be available for selection?", owner: "CBM Leadership", source: "Contact Entity PRD" },
  { id: "CON-ISS-008", issue: "How Did You Hear About CBM dropdown values not defined.", question: "Same as MR-RECRUIT-ISS-001. Single resolution needed.", owner: "CBM Leadership", source: "Contact Entity PRD" },
  { id: "MR-MANAGE-ISS-001", issue: "Dues billing cycle not defined.", question: "Is it calendar year, fiscal year, or tied to the mentor\u2019s activation anniversary?", owner: "CBM Leadership", source: "MR-MANAGE" },
  { id: "MR-MANAGE-ISS-002", issue: "Dues amount not determined.", question: "Is the amount uniform for all mentors, or does it vary? How is the amount set each year? Carries forward from MR-ISS-004.", owner: "CBM Leadership", source: "MR-MANAGE" },
  { id: "MR-MANAGE-ISS-003", issue: "Master PRD needs cross-domain platform services section.", question: "How should Notes, Email, Calendaring, and Discussion Threads be defined as shared platform capabilities?", owner: "CBM Leadership / System Administrator", source: "MR-MANAGE" },
  { id: "MR-MANAGE-ISS-004", issue: "Dues grace period not defined.", question: "How many days past the due date before the system alerts the Mentor Administrator?", owner: "CBM Leadership", source: "MR-MANAGE" },
  { id: "MR-MANAGE-ISS-005", issue: "Consequences of non-payment of dues not defined.", question: "Does non-payment affect Mentor Status, assignment eligibility, or have other consequences?", owner: "CBM Leadership", source: "MR-MANAGE" },
  { id: "MR-MANAGE-ISS-006", issue: "Dues billing eligibility not confirmed.", question: "Are all Active mentors required to pay dues, or are there exemptions (e.g., board members, first-year mentors)?", owner: "CBM Leadership", source: "MR-MANAGE" },
]));

// ═══════════════════════════════════════════════════════════════════════
// DOCUMENT ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════

const doc = new Document({
  numbering: { config: numberingConfigs },
  styles: {
    default: { document: { run: { font: FONT, size: SZ.body } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: SZ.h1, bold: true, font: FONT, color: COLORS.titleColor },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: SZ.h2, bold: true, font: FONT, color: COLORS.titleColor },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: SZ.h3, bold: true, font: FONT, color: COLORS.titleColor },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            r("Cleveland Business Mentors", { size: SZ.xs, color: COLORS.idColor }),
            r("    \u2014    ", { size: SZ.xs, color: COLORS.idColor }),
            r("Mentor Recruitment Domain PRD", { size: SZ.xs, color: COLORS.idColor }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            r("Domain PRD \u2014 Mentor Recruitment (MR)", { size: SZ.xs, color: COLORS.idColor }),
          ],
        })],
      }),
    },
    children: content,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT_FILE, buffer);
  console.log(`${OUTPUT_FILE} created successfully (${(buffer.length / 1024).toFixed(0)} KB)`);
});
