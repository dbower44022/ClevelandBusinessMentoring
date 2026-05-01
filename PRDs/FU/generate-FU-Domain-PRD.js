// CBM Fundraising Domain PRD Generator
// Produces: CBM-Domain-PRD-Fundraising.docx (v1.0)
// Phase 7 output per crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md v1.5

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType,
} = require("docx");

// ---------- Styling helpers ----------

const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const cellBorders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function cell(text, opts = {}) {
  const { bold = false, fill = null, width = null, children = null, italic = false } = opts;
  const cellChildren = children
    ? children
    : [new Paragraph({ children: [new TextRun({ text: String(text), bold, italic })] })];
  const cellDef = { borders: cellBorders, margins: cellMargins, children: cellChildren };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function multiCell(textArr, opts = {}) {
  const { width = null, fill = null, bold = false } = opts;
  const childs = textArr.map((t) =>
    new Paragraph({ children: [new TextRun({ text: t, bold })] })
  );
  const cellDef = { borders: cellBorders, margins: cellMargins, children: childs };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function para(text, opts = {}) {
  const { bold = false, italic = false, heading = null, spacing = null } = opts;
  const paraDef = { children: [new TextRun({ text: String(text), bold, italic })] };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  return new Paragraph(paraDef);
}

function richPara(runs, opts = {}) {
  const { heading = null, spacing = null } = opts;
  const paraDef = {
    children: runs.map((r) => new TextRun({
      text: r.text,
      bold: r.bold || false,
      italic: r.italic || false,
    })),
  };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  return new Paragraph(paraDef);
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text })],
  });
}

function richBullet(runs) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: runs.map((r) => new TextRun({
      text: r.text,
      bold: r.bold || false,
      italic: r.italic || false,
    })),
  });
}

function numberedPara(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "ordered", level },
    children: [new TextRun({ text })],
  });
}

function blank() {
  return new Paragraph({ children: [new TextRun("")] });
}

// ---------- Document content ----------

const children = [];

// ==============================
// Header / metadata table
// ==============================
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Cleveland Business Mentors", bold: true, size: 32 })],
  })
);
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [
      new TextRun({ text: "Fundraising Domain PRD", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Document Type", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Domain PRD (Phase 7 Domain Reconciliation output)", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Fundraising (FU)", { width: 7020 })] }),
    new TableRow({ children: [cell("Implementation", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Cleveland Business Mentors", { width: 7020 })] }),
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft \u2014 awaiting Phase 8 Stakeholder Review", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("05-01-26 04:55", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Structure", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Flat (no sub-domains)", { width: 7020 })] }),
    new TableRow({ children: [cell("Source Documents", { bold: true, fill: "E7E6E6", width: 2340 }), multiCell([
      "Master PRD v2.5",
      "Entity Inventory v1.5",
      "FU Domain Overview v1.0 (04-22-26)",
      "FU-PROSPECT v1.0 (04-22-26)",
      "FU-RECORD v1.2 (04-30-26)",
      "FU-STEWARD v1.0 (04-29-26)",
      "FU-REPORT v1.0 (04-30-26)",
      "Contact Entity PRD v1.7",
      "Account Entity PRD v1.8",
      "Contribution Entity PRD v1.0",
      "Fundraising Campaign Entity PRD v1.0",
      "Engagement Entity PRD v1.2 (referenced)",
      "Session Entity PRD v1.1 (referenced)",
    ], { width: 7020 })] }),
    new TableRow({ children: [cell("Reconciliation Guide", { bold: true, fill: "E7E6E6", width: 2340 }), cell("crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md v1.5", { width: 7020 })] }),
  ],
});
children.push(metaTable);
children.push(blank());

// ==============================
// Section 1 - Domain Overview
// ==============================
children.push(para("1. Domain Overview", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "The Fundraising domain manages Cleveland Business Mentors' relationships with the donors, sponsors, and funding institutions whose contributions provide the operational funding that allows the organization to deliver all mentoring services free of charge. It covers the full lifecycle of each funding relationship \u2014 from identifying a prospective donor or institutional funder, through cultivation and solicitation, to recording contributions, stewarding active relationships, and producing the analytics and oversight reporting that fundraising and board governance require."
));
children.push(para(
  "Year 1 priorities focus on establishing new relationships with as many of the known organizational funding institutions and sponsors as possible. The Fundraising domain supports this starting point while establishing a data model that remains coherent as the organization's fundraising program grows. Funders fall into two broad populations. Individual donors are people who give personal contributions, sometimes in a dual role as mentors or board members. Organizational funders are companies, foundations, government agencies, and other institutions providing grants, sponsorships, or corporate contributions. Both populations share the same underlying Contact and Account records used elsewhere in the system, distinguished by type and by their participation in fundraising-specific workflows."
));

children.push(para("1.1 Mission Tie-In", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Cleveland Business Mentors' mission is to provide free, confidential, impartial mentoring and practical business education to Northeast Ohio entrepreneurs, small businesses, and nonprofits. Services are free to clients \u2014 the organization takes no fees, commissions, equity, or referral arrangements of any kind. That free-to-client commitment is only possible because donors, sponsors, and grant-making institutions fund the organization's operations. The Fundraising domain is therefore the operational foundation for every other domain: without fundraising, there is no mentoring program to deliver, no mentor cohort to recruit, and no client services to provide. The CRM serves as the single source of truth for every funding relationship, so that any authorized staff member can pick up a donor relationship without losing context, contributions are acknowledged promptly and accurately for tax and stewardship purposes, and grant reporting obligations are met on time."
));

children.push(para("1.2 Scope and Boundaries", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The Fundraising domain is distinct from the other three domains in its subject population and its purpose. The Mentoring and Mentor Recruitment domains work with people in their roles as clients or mentors \u2014 the people whose business outcomes the organization exists to support and the volunteers who deliver that support. The Client Recruiting domain works with people and organizations in their roles as prospective clients or referral partners \u2014 the inflow pipeline that populates Mentoring. The Fundraising domain, by contrast, works with people and organizations in their roles as financial supporters \u2014 the inflow that funds all of the above."
));
children.push(para(
  "Two practical distinctions matter for process boundaries. First, an individual can legitimately hold multiple roles simultaneously \u2014 a mentor who also donates, a board member who makes personal contributions, a partner organization that also sponsors \u2014 and the system tracks the donor role without displacing the other roles, which is why Contact and Account are shared cross-domain entities. Second, the Fundraising domain consumes program impact data from the Mentoring domain (engagement counts, session hours, client outcomes) for reporting and stewardship, but it does not produce or modify that operational data \u2014 it reads it."
));

children.push(para("1.3 Domain Structure", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The Fundraising domain is a flat domain. Unlike Client Recruiting, which is decomposed into four sub-domains (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE), Fundraising has no sub-domain decomposition. The four Fundraising processes share a single primary operator (the Donor / Sponsor Coordinator), a coherent funder-relationship lifecycle, and a unified set of FU-owned entities (Contribution and Fundraising Campaign), and so do not benefit from sub-domain organization."
));

children.push(para("1.4 Process Inventory and Lifecycle", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The four Fundraising processes follow a clear sequential lifecycle for every funding relationship, plus a reporting process that reads from the lifecycle and produces analytics on demand. The lifecycle begins with FU-PROSPECT, where the Donor / Sponsor Coordinator identifies a prospective donor, sponsor, or funding institution and works the relationship through the prospecting pipeline \u2014 from initial identification through cultivation, discussion, and commitment. When a prospect commits and the first Contribution is recorded, FU-RECORD takes over as the contribution-capture process \u2014 recording donations, sponsorships, and grants on the Contribution entity, linking them to Fundraising Campaign records where applicable, and capturing acknowledgment under a hybrid ownership model with FU-STEWARD. Active donors and funders then become the subject population for FU-STEWARD, the ongoing stewardship process that maintains the relationship through acknowledgment communications, impact reporting, periodic outreach, and lapse detection. The lifecycle is cyclical in practice \u2014 stewardship leads to renewed giving, which cycles a contribution back through FU-RECORD and keeps the relationship in Active status."
));
children.push(para(
  "FU-REPORT operates asynchronously relative to the lifecycle. It reads donor and funder profiles, contributions, campaigns, and stewardship history and produces four classes of output: defined-report consumption through live views, scheduled packet production, Annual Donor Giving Summary generation, and ad-hoc reporting. FU-REPORT does not create or modify any fundraising records; it is a read-only process that consumes what the lifecycle produces."
));

const procInventoryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1400, 2200, 3760, 1200, 800],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Code", { bold: true, fill: "E7E6E6", width: 1400 }),
      cell("Name", { bold: true, fill: "E7E6E6", width: 2200 }),
      cell("One-Line Description", { bold: true, fill: "E7E6E6", width: 3760 }),
      cell("Category", { bold: true, fill: "E7E6E6", width: 1200 }),
      cell("Tier", { bold: true, fill: "E7E6E6", width: 800 }),
    ]}),
    new TableRow({ children: [
      cell("FU-PROSPECT", { width: 1400 }),
      cell("Donor and Sponsor Prospecting", { width: 2200 }),
      cell("Identifying and pursuing prospective donors, sponsors, and funding institutions through the prospecting pipeline.", { width: 3760 }),
      cell("Sequential lifecycle (entry point)", { width: 1200 }),
      cell("Important", { width: 800 }),
    ]}),
    new TableRow({ children: [
      cell("FU-RECORD", { width: 1400 }),
      cell("Contribution Recording", { width: 2200 }),
      cell("Recording and maintaining accurate records of all incoming funding \u2014 Donations, Sponsorships, Grants \u2014 with hybrid acknowledgment ownership and Fundraising Campaign linkage.", { width: 3760 }),
      cell("Sequential lifecycle", { width: 1200 }),
      cell("Core", { width: 800 }),
    ]}),
    new TableRow({ children: [
      cell("FU-STEWARD", { width: 1400 }),
      cell("Donor and Sponsor Stewardship", { width: 2200 }),
      cell("Maintaining active relationships through periodic Coordinator-driven sweeps against three saved lists; catch-up acknowledgment writes; Active to Lapsed transitions.", { width: 3760 }),
      cell("Sequential lifecycle", { width: 1200 }),
      cell("Important", { width: 800 }),
    ]}),
    new TableRow({ children: [
      cell("FU-REPORT", { width: 1400 }),
      cell("Fundraising Reporting", { width: 2200 }),
      cell("Producing fundraising analytics, board-level packets, Annual Donor Giving Summaries, and ad-hoc reporting through four interleaved consumption patterns.", { width: 3760 }),
      cell("Asynchronous reporting (read-only)", { width: 1200 }),
      cell("Enhancement", { width: 800 }),
    ]}),
  ],
});
children.push(procInventoryTable);
children.push(blank());

children.push(para(
  "Dependency ordering: FU-PROSPECT \u2192 FU-RECORD \u2192 FU-STEWARD is the sequential lifecycle. FU-REPORT reads all three asynchronously. The handoff between FU-PROSPECT and FU-RECORD is a status transition (Committed to Active) triggered by the first received Contribution rather than a discrete handoff action. The handoff between FU-RECORD and FU-STEWARD is similarly implicit \u2014 every Active donor or funder is a stewardship subject."
));

children.push(para("1.5 Cross-Domain Dependencies", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The Fundraising domain shares Contact and Account with the Mentoring (MN), Mentor Recruitment (MR), and Client Recruiting (CR) domains. Donor identity flows through Contact records (with contactType including Donor) for individual donors and Account records (with accountType including Donor/Sponsor) for organizational funders. The shared-entity model lets a single individual or organization hold multiple roles simultaneously without record duplication."
));
children.push(para(
  "FU-REPORT additionally consumes Mentoring-domain entities (Engagement and Session) on a read-only basis for the Mentoring Service Delivery by Funding Territory report. The territory-based attribution model uses zip code lists on Account.geographicServiceArea (funder-level) and Fundraising Campaign.geographicServiceArea (campaign-level), independently maintained, matched against Contact.addressPostalCode (collected by Mentoring Client Intake at MN-INTAKE-DAT-014). FU-REPORT writes nothing to Mentoring-domain entities."
));
children.push(para(
  "The Notes Service is consumed for free-form record notes on Contact, Account, Contribution, and Fundraising Campaign records (per the cross-domain Notes Service specification). On Contact and Account, the Notes Service stream coexists with restricted-visibility wysiwyg fields (donorNotes, funderNotes) for sensitive narrative context. On Contribution, the Notes Service stream coexists with an in-record notes field for Contribution-specific narrative. On Fundraising Campaign, only the Notes Service stream is used \u2014 there is no in-record narrative-notes field."
));

children.push(para("1.6 Implementation Tier Summary", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Per Master PRD Section 3.6, FU-RECORD is Core tier (essential for Year 1 go-live), FU-PROSPECT and FU-STEWARD are Important tier (planned for Year 1 but secondary to Core), and FU-REPORT is Enhancement tier (valuable but may be deferred or delivered in a reduced form at go-live). Phase 9 implementation will determine which FU-REPORT capabilities deliver at Year 1 and which defer."
));

// ==============================
// Section 2 - Personas
// ==============================
children.push(para("2. Personas", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "Three personas participate in the Fundraising domain. One owns the domain end-to-end across all four processes; one is a board-level oversight consumer with read access and informal participation; one is implicit through visibility rules. The persona pattern is consistent across FU-PROSPECT, FU-RECORD, FU-STEWARD, and FU-REPORT \u2014 no other personas operate or have access to FU records and reports."
));

children.push(para("2.1 MST-PER-010 \u2014 Donor / Sponsor Coordinator (Primary Operator)", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Backing: ", bold: true },
  { text: "External (Member Contact, sometimes Mentor Contact, who carries Coordinator responsibilities in addition to their underlying Member or Mentor role)." },
]));
children.push(richPara([
  { text: "Domain-Specific Role. ", bold: true },
  { text: "Owns the Fundraising domain end to end across all four processes. Identifies prospective donors, sponsors, and funding institutions; advances them through the pipeline; records every Contribution and Fundraising Campaign; runs weekly or bi-weekly stewardship sweeps of the Active population; produces packet output and ad-hoc reporting. Has full authority across all four processes \u2014 no approvals required for any action." },
]));
children.push(para("Process-Level Roles:", { bold: true }));
children.push(richBullet([
  { text: "FU-PROSPECT: ", bold: true },
  { text: "Sole operator. Creates Donor Contact and Funder Organization Account records, advances the lifecycle field (donorStatus on Contact, funderStatus on Account) by judgment through the seven stages, performs research and outreach, accumulates narrative context in donorNotes and funderNotes." },
]));
children.push(richBullet([
  { text: "FU-RECORD: ", bold: true },
  { text: "Sole operator. Creates every Contribution and Fundraising Campaign record. Selects contributionType and status explicitly at creation. Captures acknowledgment under the hybrid ownership model as the primary write path at Contribution creation. Tracks grant lifecycles using applicationDate, commitmentDate, expectedPaymentDate, receivedDate, and nextGrantDeadline. Edits records to handle bounced checks, refunds, reversals, and corrections by adjusting status and notes." },
]));
children.push(richBullet([
  { text: "FU-STEWARD: ", bold: true },
  { text: "Sole operator. Runs the weekly or bi-weekly sweep against three saved lists (Active Donors and Funders Sweep List, Acknowledgment-Pending Contributions, Grant Deadlines). Initiates outreach and updates lastContactDate after each contact. Sends catch-up acknowledgments under the hybrid ownership model. Transitions records from Active to Lapsed by judgment when relationships go dormant." },
]));
children.push(richBullet([
  { text: "FU-REPORT: ", bold: true },
  { text: "Primary operator. Triggers monthly informational and quarterly formal packet production. Generates Annual Donor Giving Summaries in early January for the prior calendar year. Runs ad-hoc queries combining Fundraising-domain and Mentoring-domain data. Accesses defined-report live views as a working tool between sweeps." },
]));
children.push(richPara([
  { text: "Per-Funder Relationship Ownership. ", bold: true },
  { text: "Per-funder relationship ownership is recorded as a custom link field on the Funder Organization Account record (assignedSponsorCoordinator), pointing to the specific Contact leading that relationship. Optional in general, conditionally required when funderStatus = Active. Analogous to the assignedLiaison pattern used by Partner Accounts in CR-PARTNER. This separates the question of who operates the CRM today from who owns this specific funder relationship \u2014 the former is a User permission and session matter, the latter is per-record data." },
]));

children.push(para("2.2 MST-PER-002 \u2014 Executive Member (Read-Only Consumer and Informal Participant)", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Backing: ", bold: true },
  { text: "External (board member with elevated CRM access for board-level oversight)." },
]));
children.push(richPara([
  { text: "Domain-Specific Role. ", bold: true },
  { text: "Reviews fundraising dashboards, packet output, and donor analytics for board-level oversight. Does not create or edit fundraising records. May participate in high-value donor relationships and board-level funder communications as an individual contributor at the Coordinator's invitation. Not accountable for pipeline outcomes or stewardship outcomes." },
]));
children.push(para("Process-Level Roles:", { bold: true }));
children.push(richBullet([
  { text: "FU-PROSPECT: ", bold: true },
  { text: "Informal participant only. May help with introductions to high-value prospects \u2014 board members often know foundation executives, senior corporate contacts, or major individual donors personally \u2014 and may attend cultivation meetings or sign solicitation letters at the Coordinator's request. Does not create or advance records, does not make pipeline decisions. Any informal participation is recorded on the Coordinator's free-form notes." },
]));
children.push(richBullet([
  { text: "FU-RECORD: ", bold: true },
  { text: "Read-only consumer of FU-RECORD output via reports and dashboards. Does not create, edit, or advance any Contribution or Fundraising Campaign record. Reviews Contribution pipeline summaries, Campaign performance data, donor and funder giving history rollups, and grant pipeline status as part of board-level oversight. May ask the Coordinator to clarify a Contribution record or correct an apparent error, but the corrective action is always the Coordinator's." },
]));
children.push(richBullet([
  { text: "FU-STEWARD: ", bold: true },
  { text: "Read-only consumer plus informal participant. Reviews lapsed-relationship summaries, upcoming grant-deadline lists, stewardship-activity overviews, and at-risk-relationship indicators as part of board-level oversight. Does not initiate sweeps, does not transition records between lifecycle stages. May be invited by the Coordinator to participate in specific high-value stewardship actions \u2014 signing thank-you letters to major donors, attending donor meetings, making personal calls to top funders." },
]));
children.push(richBullet([
  { text: "FU-REPORT: ", bold: true },
  { text: "Primary audience for board-level packets and live-view consumer. Reviews the monthly informational packet for management oversight between board meetings and reviews the quarterly formal packet at board meetings. Accesses defined-report live views on demand between meetings when board oversight prompts a question that the most recent packet does not answer. Has access to ad-hoc reporting capability but typically does not run ad-hoc queries; the Coordinator runs ad-hoc queries at the Executive Member's request as needed." },
]));

children.push(para("2.3 MST-PER-001 \u2014 System Administrator (Implicit Through Visibility Rules)", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Backing: ", bold: true },
  { text: "External (platform administrator role with full system access for technical operations and emergency intervention)." },
]));
children.push(richPara([
  { text: "Domain-Specific Role. ", bold: true },
  { text: "Implicit through record-level visibility rules. Has access to Contribution and Fundraising Campaign records and to restricted-visibility fields (donorNotes, funderNotes) per FU-PROSPECT-REQ-013, FU-RECORD-REQ-021, FU-RECORD-REQ-022, and FU-STEWARD-REQ-012. Not enumerated as an operator in any FU process Section 3, consistent with the Fundraising Domain pattern: System Administrator is a platform-level role, not a domain operator. Engaged for technical configuration, emergency record correction, and audit queries; does not run FU processes." },
]));

children.push(para("2.4 Other Personas", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "All other personas (Mentor Administrator, Client Recruiter, Partner Coordinator, Content and Event Administrator, Mentor, Member, Client) have no operating role and no record-level visibility within the Fundraising domain. Restricted-visibility fields and restricted record-level visibility on Contribution and Fundraising Campaign per FU-PROSPECT-REQ-013, FU-RECORD-REQ-021, FU-RECORD-REQ-022, and FU-STEWARD-REQ-012 prevent these personas from seeing FU records even when their work touches the same Contact or Account records used by FU. Visibility restrictions carry through to FU-REPORT outputs per FU-REPORT-REQ-021 \u2014 a user who cannot see a field or record in the source entities cannot see it in a report either."
));

// ==============================
// Section 3 - Business Processes
// ==============================
children.push(para("3. Business Processes", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "The Fundraising domain comprises four processes presented in dependency order: FU-PROSPECT, FU-RECORD, FU-STEWARD, and FU-REPORT. The first three form a sequential lifecycle; the fourth operates asynchronously, reading from all three. Each subsection includes the eight required sections from the source process document: Process Purpose, Process Triggers, Personas Involved, Process Workflow, Process Completion, System Requirements, Process Data, and Data Collected. Open Issues are compiled into Domain PRD Section 6, and process-level Interview Transcripts remain in the source process documents \u2014 Domain PRD Section 7 captures only the reconciliation conversation."
));
children.push(para(
  "Conflict resolutions from this reconciliation session are applied where they affect process content: Contribution.giftType uses the FU-RECORD-authoritative seven-value enum (FU-RECON-DEC-001), Contribution.contributionType uses the three-value enum (FU-RECON-DEC-002), and the Active to Closed transition framing follows FU-RECON-DEC-003."
));

// ------------------------------
// 3.1 FU-PROSPECT
// ------------------------------
children.push(para("3.1 FU-PROSPECT \u2014 Donor and Sponsor Prospecting", { heading: HeadingLevel.HEADING_2 }));

children.push(para("3.1.1 Process Purpose", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-PROSPECT is the entry point of the Fundraising domain. It identifies prospective donors, sponsors, and funding institutions and moves each one through the prospecting pipeline from initial identification to an active funding relationship. Every downstream Fundraising process \u2014 contribution recording, stewardship, reporting \u2014 operates on records that FU-PROSPECT creates and maintains. Nothing in Fundraising happens without a record in the system, and this process is what puts the record there."
));
children.push(para(
  "The process is organized around a seven-stage lifecycle: Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed. A prospect enters at Prospect when the Donor / Sponsor Coordinator creates the record. The Coordinator advances the record through Contacted, In Discussion, and Committed as the relationship develops, by judgment rather than by system-enforced criteria. The record reaches Active when the first Contribution is recorded against it in FU-RECORD. Two alternative terminal states, Lapsed and Closed, handle cold and permanent failures respectively."
));
children.push(para(
  "Profile enrichment is a continuous concern that does not have a done state. FU-PROSPECT creates the donor or funder record with whatever identifying information is available and begins capturing type, status, and relationship information on that record. Subsequent processes \u2014 FU-RECORD and FU-STEWARD \u2014 and subsequent passes through FU-PROSPECT itself continue to add to the profile over the life of the relationship. What FU-PROSPECT completes is the pipeline journey for each prospect; what it does not complete is the profile itself."
));
children.push(para(
  "Individual donors and organizational funders follow the same pipeline through the same seven stages. The record type differs \u2014 individual donors are represented as Contact records with contactType including Donor, and organizational funders as Account records with accountType including Donor/Sponsor \u2014 but the workflow is unified. Organizational funders typically have multiple Contact records linked to the Funder Organization Account, one for each person at the organization whom the Coordinator interacts with; individual donors have a single Contact record."
));
children.push(richPara([
  { text: "Frequency and Scale. ", bold: true },
  { text: "The process operates in two distinct volume regimes. During the Year 1 ramp-up, the Coordinator adds a large number of records daily as the organization establishes relationships with as many known organizational funding institutions and sponsors as possible. In steady state, the rhythm drops off substantially \u2014 a new funding relationship may be added no more than once a month, or less. The system supports both regimes: bulk record creation during ramp-up and single-record creation on demand thereafter." },
]));

children.push(para("3.1.2 Process Triggers", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Preconditions. ", bold: true },
  { text: "There are no preconditions on the process. A Coordinator can add a prospect at any time, without any prior record existing, without any Fundraising Campaign existing, and without any prior process having run." },
]));
children.push(richPara([
  { text: "Required Data. ", bold: true },
  { text: "The minimum data required to create a prospect record is the identifier only. For a Funder Organization Account, that is the organization name. For an individual donor Contact, that is the first name and the last name. All other information \u2014 contact details, type, status, address, giving context \u2014 is optional at creation and accrues over time as the Coordinator completes research and engagement." },
]));
children.push(richPara([
  { text: "Initiation Mechanism. ", bold: true },
  { text: "The process is initiated manually by the Donor / Sponsor Coordinator. The Coordinator decides, on receiving a prospect lead from any source (board referral, research, event follow-up, inbound inquiry, peer organization suggestion, public foundation directory, any other origin), to create a record in the CRM. No system-generated trigger and no scheduled automation creates a prospect record." },
]));
children.push(richPara([
  { text: "Initiating Persona. ", bold: true },
  { text: "The Donor / Sponsor Coordinator (MST-PER-010) initiates the process. The Coordinator has full authority to create prospect records independently \u2014 no approval from any other party is required. Other personas may supply leads or suggest prospects informally, but the record-creation action is always taken by the Coordinator." },
]));

children.push(para("3.1.3 Personas Involved", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "MST-PER-010 \u2014 Donor / Sponsor Coordinator (Sole Operator). ", bold: true },
  { text: "Identifies prospective donors, sponsors, and funding institutions from any source. Creates the initial donor Contact or Funder Organization Account record. Performs research outside the CRM and records findings on the record. Conducts outreach \u2014 letters, emails, calls, meetings, grant applications \u2014 and records activity as free-form notes. Advances the lifecycle field through the seven stages by judgment. Moves records to Lapsed when a prospect goes cold but may be re-engaged later, and to Closed when a prospect is permanently out. Links additional Contact records to a Funder Organization Account as the Coordinator meets more people at that organization. Maintains the assignedSponsorCoordinator link on Funder Organization Accounts." },
]));
children.push(richPara([
  { text: "MST-PER-002 \u2014 Executive Member (Informal Participant). ", bold: true },
  { text: "May help with introductions to high-value prospects and may attend cultivation meetings or sign solicitation letters at the Coordinator's request. Does not create or advance records, does not make pipeline decisions, and is not accountable for pipeline outcomes. Any informal participation is recorded on the Coordinator's free-form notes; no structured field tracks Executive Member involvement." },
]));

children.push(para("3.1.4 Process Workflow", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "The workflow for a single prospect is a seven-step narrative. Stage transitions are Coordinator judgment calls, documented by notes accumulated on the record throughout the process."
));
children.push(numberedPara("Prospect identification and record creation. The Coordinator identifies a prospective donor, sponsor, or funding institution from any source. For an organizational funder, the Coordinator creates an Account with accountType appended to include Donor/Sponsor. For an individual donor, a Contact with contactType appended to include Donor. If the prospect is already in the system in another role, the Coordinator appends Donor or Donor/Sponsor to the existing record rather than creating a duplicate."));
children.push(numberedPara("Initial status set to Prospect. The lifecycle field \u2014 donorStatus on individual donor Contacts, funderStatus on Funder Organization Accounts \u2014 is set to Prospect by default when Donor or Donor/Sponsor is appended. The funderType field on Funder Organization Accounts is set at the Coordinator's discretion as soon as the funder category is known (Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other)."));
children.push(numberedPara("Research and adequacy assessment. The Coordinator evaluates whether information on the record is adequate to support outreach. If adequate, proceed to outreach. If inadequate, the Coordinator performs research outside the CRM and adds findings to the record. A note explains the reasoning for deferring outreach. Research and enrichment form a loop: the Coordinator may return to this step many times until the information is judged sufficient."));
children.push(numberedPara("Outreach and transition to Contacted. The Coordinator makes first contact \u2014 letter, email, grant application, call, meeting, or any other first-touch channel. The Coordinator advances the lifecycle field from Prospect to Contacted and records the outreach as a note."));
children.push(numberedPara("Relationship development and transition to In Discussion. As correspondence, meetings, application exchanges, or other cultivation activity accumulates, the Coordinator advances the lifecycle field from Contacted to In Discussion when the relationship has moved beyond initial contact into substantive back-and-forth. For organizational funders, the Coordinator links additional Contact records as additional people at the organization enter the conversation."));
children.push(numberedPara("Commitment and transition to Committed. When the prospect signals some form of future funding intent, the Coordinator advances the lifecycle field from In Discussion to Committed. The specific meaning of Committed varies by prospect \u2014 verbal pledge, signed sponsorship agreement, grant-award letter, executed memorandum of understanding, or any other commitment the Coordinator judges to be firm. The Coordinator records the specifics on funderNotes (Account) or donorNotes (Contact)."));
children.push(numberedPara("Activation and handoff to FU-RECORD. When the Coordinator creates the first Contribution record against the donor or funder in FU-RECORD, the lifecycle field advances from Committed to Active automatically. The transition treats all three contributionType values uniformly because the commitment is what marks the relationship as live, and any Contribution embodies a commitment worth recording."));

children.push(richPara([
  { text: "Alternative Paths \u2014 Lapsed and Closed. ", bold: true },
  { text: "At any stage from Contacted through Committed, the Coordinator may advance the lifecycle field to Lapsed or Closed rather than continuing through the main pipeline. Lapsed means the prospect has gone cold but may be re-engaged later. Closed means the prospect is permanently out (declined explicitly, judged unsuitable, organization no longer exists, or the organization has decided not to pursue). Per FU-RECON-DEC-003, the Coordinator may also transition an Active record directly to Closed in exceptional cases (a discovered ethics violation, a permanent loss of funding alignment) under FU-PROSPECT-REQ-005's free-form transition rule, with the Coordinator's reasoning recorded narratively." },
]));
children.push(richPara([
  { text: "Re-Engagement from Lapsed or Closed. ", bold: true },
  { text: "When the Coordinator decides to re-engage a Lapsed or Closed prospect, two paths are available at the Coordinator's discretion: reopen the existing record by advancing the lifecycle field back to Contacted or In Discussion, or create a fresh record and leave the prior one in its terminal state. The reasoning for the chosen path is recorded on the record notes." },
]));

children.push(para("3.1.5 Process Completion", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Normal Completion. ", bold: true },
  { text: "Normal successful completion is the transition of the lifecycle field to Active, which occurs when the first Contribution is recorded in FU-RECORD. At this point the prospecting pipeline has delivered a live funding relationship and FU-RECORD and FU-STEWARD take over for contribution tracking and ongoing stewardship. The donor Contact or Funder Organization Account remains in the system permanently and continues to accumulate profile information through later processes." },
]));
children.push(richPara([
  { text: "Alternative End States. ", bold: true },
  { text: "Two alternative end states are available at the Coordinator's discretion. Lapsed means the prospect has gone cold; the record remains in the system and may be re-engaged in the future. Closed means the prospect is permanently out; the record remains for historical and reporting purposes." },
]));
children.push(richPara([
  { text: "Completion Authority. ", bold: true },
  { text: "The Donor / Sponsor Coordinator declares completion in all cases. For the normal Active transition, declaration is implicit in the creation of the first Contribution record. For Lapsed and Closed transitions, the Coordinator explicitly sets the lifecycle field and records the reasoning. No approval or sign-off is required from any other party." },
]));
children.push(richPara([
  { text: "Post-Completion Handoffs. ", bold: true },
  { text: "The Active transition is the handoff to FU-RECORD. Once the first Contribution is recorded, the relationship is the subject of FU-RECORD for contribution tracking and acknowledgment, and of FU-STEWARD for ongoing relationship maintenance, impact reporting, and lapse detection. FU-PROSPECT may still participate \u2014 appending additional Contact records to a Funder Organization Account as new staff members enter the conversation \u2014 but the pipeline work itself is complete. For Lapsed and Closed transitions, there is no downstream process to hand off to. FU-REPORT may read Lapsed and Closed records for pipeline analytics and re-engagement opportunity identification." },
]));
children.push(richPara([
  { text: "Early Termination. ", bold: true },
  { text: "There is no distinct early-termination path beyond the two alternative end states. A prospect that cannot continue for any reason is handled by moving the lifecycle field to Lapsed or Closed. Neither transition requires any cleanup step beyond the note capturing the reasoning. The record is never deleted." },
]));

// FU-PROSPECT requirements section
children.push(para("3.1.6 System Requirements", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Thirteen system requirements support FU-PROSPECT operation."));

const fuProspectReqs = [
  ["FU-PROSPECT-REQ-001", "The system must allow the Donor / Sponsor Coordinator to create a Funder Organization Account record with accountType including Donor/Sponsor, given a minimum of the organization name. All other fields on the Account may be blank at creation and added later."],
  ["FU-PROSPECT-REQ-002", "The system must allow the Donor / Sponsor Coordinator to create an individual donor Contact record with contactType including Donor, given a minimum of first name and last name. All other fields on the Contact may be blank at creation and added later."],
  ["FU-PROSPECT-REQ-003", "The system must support appending Donor to the contactType of an existing Contact \u2014 for example, when an existing Mentor, Member, or Client becomes a donor \u2014 rather than forcing creation of a duplicate Contact record. Appending Donor to contactType makes the Donor-specific fields visible and sets donorStatus to Prospect by default."],
  ["FU-PROSPECT-REQ-004", "The system must support appending Donor/Sponsor to the accountType of an existing Account \u2014 for example, when an existing Partner organization becomes a funder \u2014 rather than forcing creation of a duplicate Account record. Appending Donor/Sponsor makes the Donor/Sponsor-specific fields visible and sets funderStatus to Prospect by default."],
  ["FU-PROSPECT-REQ-005", "The system must present the donor lifecycle stages \u2014 Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed \u2014 as the values of donorStatus on Donor Contacts and funderStatus on Funder Organization Accounts. The system must allow the Coordinator to transition between any of these values at any time without system-enforced preconditions between stages, since all advancement is Coordinator judgment."],
  ["FU-PROSPECT-REQ-006", "The system must automatically transition the lifecycle field (donorStatus on Contact, funderStatus on Account) from Committed to Active when the first Contribution record is created and linked to that donor Contact or Funder Organization Account. The transition applies regardless of contributionType (Donation, Sponsorship, or Grant) \u2014 any recorded contribution marks the relationship as live."],
  ["FU-PROSPECT-REQ-007", "The system must allow the Coordinator to link multiple Contact records to a single Funder Organization Account via the native Contact-to-Account relationship, representing the individuals at the funding organization whom the Coordinator interacts with. Each linked Contact carries contactType including Donor."],
  ["FU-PROSPECT-REQ-008", "The system must provide a custom link field on Funder Organization Accounts named assignedSponsorCoordinator, pointing to a Contact record, identifying the specific staff member leading the relationship with that Funder Organization. The field must be visible only when accountType has Donor/Sponsor. The field must be optional in general but required when funderStatus is Active. Setting, changing, and clearing the value are available to the Coordinator at any time."],
  ["FU-PROSPECT-REQ-009", "The system must provide free-form timestamped and attributed notes on Donor Contacts and Funder Organization Accounts via the Notes Service, accessible to the Donor / Sponsor Coordinator and above. General activity notes \u2014 outreach events, research findings, conversation logs \u2014 accumulate through this service throughout the process."],
  ["FU-PROSPECT-REQ-010", "The system must support bulk record creation for Donor Contacts and Funder Organization Accounts during ramp-up periods, so the Coordinator can add many prospects in a short window. The mechanism (list import, bulk create, spreadsheet paste, or other) is deferred to implementation; the requirement is that bulk entry is feasible and efficient."],
  ["FU-PROSPECT-REQ-011", "The system must present a pipeline view to the Coordinator showing all Donor Contacts and Funder Organization Accounts grouped by lifecycle stage, with filters available by funderType, assignedSponsorCoordinator, and date of last status change. The exact implementation form is deferred to Phase 9 \u2014 see FU-PROSPECT-ISS-001."],
  ["FU-PROSPECT-REQ-012", "The system must enforce the Universal Contact-Creation Rules when a Donor Contact is created with a website value. Automatic linking to an existing Account is performed only by normalized website-domain match (lowercase, protocol stripped, leading www stripped). Name-based matching is not performed, to avoid linking a Contact to the wrong organization."],
  ["FU-PROSPECT-REQ-013", "The system must restrict visibility of Donor Contact records, Funder Organization Account records, and their sensitive notes fields (donorNotes, funderNotes) to the Donor / Sponsor Coordinator and above (Executive Member, System Administrator). The restriction is consistent with the existing funderNotes field-level security model and extends it to the new donorNotes field."],
];

const fuProspectReqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 7360],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 2000 }),
      cell("Requirement", { bold: true, fill: "E7E6E6", width: 7360 }),
    ]}),
    ...fuProspectReqs.map(([id, req]) => new TableRow({ children: [
      cell(id, { width: 2000 }),
      cell(req, { width: 7360 }),
    ]})),
  ],
});
children.push(fuProspectReqTable);
children.push(blank());

children.push(para("3.1.7 Process Data", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "Supporting data read by FU-PROSPECT without being created or modified during normal operation. Full field-level detail (type, required status, enum values, descriptions) for every entity field referenced is consolidated in Section 4 Data Reference. This subsection identifies which fields each process reads."
));
children.push(richPara([
  { text: "Contact (read): ", bold: true },
  { text: "contactType, firstName, lastName, emailAddress, phoneNumber, website, boardPosition. Identifiers FU-PROSPECT-DAT-001 through FU-PROSPECT-DAT-007. See Section 4.1 Contact Entity for full field detail." },
]));
children.push(richPara([
  { text: "Account (read): ", bold: true },
  { text: "accountType, name, website, emailAddress, phoneNumber, billingAddressCity, billingAddressState, funderLifetimeGiving, clientStatus, partnerStatus. Identifiers FU-PROSPECT-DAT-008 through FU-PROSPECT-DAT-016. See Section 4.2 Account Entity for full field detail." },
]));
children.push(richPara([
  { text: "Relationships (read): ", bold: true },
  { text: "Contact-to-Account native relationship (FU-PROSPECT-DAT-017). See Section 4.2 Account Entity for full relationship detail." },
]));

children.push(para("3.1.8 Data Collected", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "Data created or updated by FU-PROSPECT. Three fields are new to the CRM data model and were surfaced by FU-PROSPECT: donorStatus on Contact, donorNotes on Contact, and assignedSponsorCoordinator on Account. All three were propagated to the Contact Entity PRD v1.7 and Account Entity PRD v1.8 via the bundled end-of-FU-Phase-4b carry-forward executed 04-30-26."
));
children.push(richPara([
  { text: "Contact (created or updated): ", bold: true },
  { text: "contactType (append Donor); firstName, lastName, emailAddress, phoneNumber, website (populated and updated); donorStatus (new field, FU-PROSPECT-DAT-020, closes CON-ISS-003); donorNotes (new field, FU-PROSPECT-DAT-021). Identifiers FU-PROSPECT-DAT-018 through FU-PROSPECT-DAT-021. See Section 4.1 Contact Entity for full field detail." },
]));
children.push(richPara([
  { text: "Account (created or updated): ", bold: true },
  { text: "accountType (append Donor/Sponsor); name, website, emailAddress, phoneNumber, billingAddressCity, billingAddressState (populated and updated); funderType; funderStatus; funderNotes; assignedSponsorCoordinator (new field, FU-PROSPECT-DAT-027). Identifiers FU-PROSPECT-DAT-022 through FU-PROSPECT-DAT-027. See Section 4.2 Account Entity for full field detail." },
]));
children.push(richPara([
  { text: "Relationships (created): ", bold: true },
  { text: "Contact-to-Account link created when an individual Contact representing a staff member at a Funder Organization is linked to that Organization's Account (FU-PROSPECT-DAT-028)." },
]));

// ------------------------------
// 3.2 FU-RECORD
// ------------------------------
children.push(para("3.2 FU-RECORD \u2014 Contribution Recording", { heading: HeadingLevel.HEADING_2 }));

children.push(para("3.2.1 Process Purpose", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-RECORD is the contribution-capture process of the Fundraising domain. It records each gift, sponsorship, and grant as a discrete Contribution event \u2014 a single received commitment, application, or payment \u2014 and updates donor and funder analytics on each record. FU-RECORD operates on the donor Contact and Funder Organization Account records that FU-PROSPECT establishes, and produces the Contribution and Fundraising Campaign records that FU-STEWARD and FU-REPORT subsequently consume. As the only Core-tier process in the Fundraising domain, FU-RECORD is essential for Year 1 go-live: until FU-RECORD is operational, no contribution can be captured in the system."
));
children.push(para(
  "The cadence of FU-RECORD differs from FU-PROSPECT in an important way. FU-PROSPECT runs at a high rate during Year 1 ramp-up as new funder relationships are established, then tapers in steady state to a small number of new prospects per month or less. FU-RECORD does not taper. New donor and funder creation slows over time, but each existing donor and funder gives repeatedly \u2014 annual donations, recurring sponsorships, multi-year grants, individual pledges \u2014 so the volume of Contribution records stays high indefinitely. The system supports Contribution recording at a steady, sustained pace as a routine operational activity rather than a campaign-driven burst."
));
children.push(para(
  "FU-RECORD has no fixed done state at the relationship level. Individual Contribution records have terminal statuses \u2014 Received, Unsuccessful, Cancelled \u2014 and once a Contribution reaches one of those statuses, that specific event is closed. The funder relationship itself, however, continues for as long as the donor or funder is engaged. A donor in Active status will produce many Contributions over the life of the relationship, each cycling through the Contribution status lifecycle independently. The Active to Lapsed transition on the donor or funder record is FU-STEWARD's responsibility, not FU-RECORD's; FU-RECORD does not declare itself complete for a funder."
));
children.push(richPara([
  { text: "Acknowledgment Hybrid Ownership Model. ", bold: true },
  { text: "FU-RECORD also resolves the acknowledgment / tax-receipt model question that EI-ISS-001 carried forward from the Entity Inventory and the Fundraising Domain Overview. The resolution is field-level capability on Contribution rather than a separate Acknowledgment entity \u2014 two optional fields (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, with specifics of any given acknowledgment recorded in notes. The two acknowledgment fields are jointly owned by FU-RECORD and FU-STEWARD under a hybrid ownership model. FU-RECORD is the primary write path: when a Contribution is recorded, the Coordinator typically sends the acknowledgment communication in the same operational moment and writes acknowledgmentSent and acknowledgmentDate at Contribution creation. FU-STEWARD is the catch-up write path: any Received Contribution where acknowledgmentSent = false is surfaced on the FU-STEWARD Acknowledgment-Pending Contributions sweep list, and the Coordinator sends the missed acknowledgment and writes the fields during the next sweep." },
]));

children.push(para("3.2.2 Process Triggers", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Preconditions. ", bold: true },
  { text: "One precondition: the donor record must already exist. For an individual donor, that is a Contact record with contactType including Donor. For an organizational funder, that is an Account record with accountType including Donor/Sponsor. The Coordinator cannot record a Contribution against a donor that is not yet in the system; the Coordinator must first create or update the donor record (via FU-PROSPECT or directly) and then return to record the Contribution. The lifecycle stage of the donor or funder record is not constrained \u2014 Applied and Pledged Contributions can legitimately exist against records in any FU-PROSPECT stage. The first Contribution against any donor record automatically transitions that record's lifecycle field to Active per FU-PROSPECT-REQ-006. No other preconditions apply." },
]));
children.push(richPara([
  { text: "Required Data. ", bold: true },
  { text: "Three fields are required at Contribution creation: contributionType (Donation, Sponsorship, or Grant \u2014 no default), status (one of the six values \u2014 no default), and exactly one of donorContact or donorAccount (mutually exclusive). All other fields are optional at creation and may be populated when recorded or updated as more information becomes available. Fundraising Campaign records have a parallel required-data pattern: campaignName (required at creation) and status (required at creation, no default)." },
]));
children.push(richPara([
  { text: "Initiation Mechanism. ", bold: true },
  { text: "Manual only. The Coordinator manually creates every Contribution record on receiving an indication of a contribution event. Common indications include receiving a check in the mail, an online giving notification, an ACH deposit confirmation, a credit card receipt, a delivery of in-kind goods or services, a signed sponsorship agreement, a grant decision letter, or any other communication that documents a commitment, application, or payment. There is no system-generated trigger and no scheduled automation that creates a Contribution record." },
]));
children.push(richPara([
  { text: "Initiating Persona. ", bold: true },
  { text: "The Donor / Sponsor Coordinator (MST-PER-010) initiates every instance of FU-RECORD. The Coordinator has full authority to create, edit, and advance Contribution and Fundraising Campaign records independently \u2014 no approval required. Other personas may inform the Coordinator that a contribution event has occurred, but the record-creation action is always the Coordinator's." },
]));

children.push(para("3.2.3 Personas Involved", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "MST-PER-010 \u2014 Donor / Sponsor Coordinator (Sole Operator). ", bold: true },
  { text: "Creates every Contribution record on receiving any indication of a contribution event. Selects contributionType and status explicitly at creation; populates amount, the relevant date fields, designation, Campaign linkage, and notes as information is available. Advances Contribution status by judgment as the contribution event progresses. Generates and tracks acknowledgment communications using acknowledgmentSent and acknowledgmentDate. Tracks grant lifecycles using applicationDate, commitmentDate, expectedPaymentDate, receivedDate, and nextGrantDeadline; records multi-payment grant disbursement detail in notes. Creates and maintains Fundraising Campaign records, setting Campaign status by judgment and linking Contributions at creation or retroactively. Edits records to handle bounced checks, refunds, reversals, and corrections by adjusting status (typically to Cancelled) and notes rather than by creating offsetting records. Has full authority \u2014 no approvals required." },
]));
children.push(richPara([
  { text: "MST-PER-002 \u2014 Executive Member (Read-Only Consumer). ", bold: true },
  { text: "Read-only consumer of FU-RECORD output via reports and dashboards. Does not create, edit, or advance any Contribution or Fundraising Campaign record. Reviews Contribution pipeline summaries, Campaign performance data, donor and funder giving history rollups, and grant pipeline status as part of board-level oversight. May ask the Coordinator to clarify a Contribution record or correct an apparent error, but the corrective action is always the Coordinator's." },
]));

children.push(para("3.2.4 Process Workflow", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-RECORD operates as three workflow patterns sharing a common core. The core pattern \u2014 manual record creation, explicit contributionType and status selection, optional field population, judgment-driven status advancement, automatic donor or funder activation on first Contribution, acknowledgment generation, and analytics rollup \u2014 applies to every Contribution regardless of contributionType. The three patterns differ in their typical entry status, the date fields they populate, and the type-specific fields they expose."
));
children.push(richPara([
  { text: "Donation Workflow (Canonical Happy Path). ", bold: true },
  { text: "A Donation typically arrives as a check, online giving notification, ACH deposit confirmation, credit card receipt, or in-kind delivery. The Coordinator identifies the donor and looks up the donor record (or creates it via FU-PROSPECT if absent). Creates a new Contribution record with contributionType = Donation and an explicit status \u2014 typically Received for arriving Donations, Pledged for written pledges with no funds yet, Committed for major-donor commitments. Populates amount, receivedDate (for Received), giftType (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other per FU-RECON-DEC-001), and designation. Links to a Fundraising Campaign if applicable. For in-kind Donations (giftType = In-Kind), the inKindDescription and inKindValuationBasis fields become visible per dynamic logic. Sends acknowledgment and writes acknowledgmentSent = true and acknowledgmentDate at this point (primary write path under hybrid ownership). The first Donation against a donor in pre-Active status auto-transitions the donor's donorStatus or funderStatus to Active per FU-PROSPECT-REQ-006." },
]));
children.push(richPara([
  { text: "Sponsorship Workflow. ", bold: true },
  { text: "Variant of the Donation pattern with three differences. Typical entry status is Committed (signed sponsorship agreement establishes commitment before payment). The giftType field is hidden \u2014 sponsorships are not categorized by gift form. Recognition obligations (logo placement, named events, complimentary tickets, public announcements) are recorded narratively in the in-record notes field; no structured recognition-obligation tracking. Sponsorship Contributions typically transition Committed to Received when payment arrives, with receivedDate set on transition. In-kind Sponsorships are recorded narratively rather than via giftType = In-Kind (which is Donation-only)." },
]));
children.push(richPara([
  { text: "Grant Workflow. ", bold: true },
  { text: "Variant of the Donation pattern with five differences. Typical entry status is Applied (grant application submitted). applicationDate is required logically and is visible only when contributionType = Grant per dynamic logic. Status progression is Applied \u2192 Committed (award letter received, commitmentDate set) \u2192 Received (final payment, receivedDate set). Multi-payment grants retain a single Contribution record across the entire disbursement period: status remains Committed until the final payment, receivedDate is set to the final payment date, and intermediate payment detail is recorded in notes. nextGrantDeadline tracks pending grant-related obligations (typically reporting deadlines) and is updated by FU-RECORD initially and by FU-STEWARD during the sweep when deadlines are met." },
]));
children.push(richPara([
  { text: "Fundraising Campaign Lifecycle. ", bold: true },
  { text: "The Coordinator creates Fundraising Campaign records to group related Contributions for goal tracking and territory-based attribution. Campaigns are created in advance of solicitation (Planned status) or retroactively after Contributions have arrived. The Coordinator sets campaignName, campaignType, status, goalAmount (optional), startDate and endDate (optional), description, and geographicServiceArea (optional, for territory-based attribution). totalRaised is system-calculated from linked Received Contributions per FU-RECORD-REQ-011. Campaigns transition through Planned \u2192 Active \u2192 Completed (period or goal closed) or Cancelled (abandoned) by Coordinator judgment. Per FC-DEC-005, totalRaised is calculated solely on Contribution.status \u2014 Received Contributions linked to Cancelled or Completed Campaigns continue to contribute to totalRaised, preserving historical accuracy." },
]));
children.push(richPara([
  { text: "Amendments and Corrections. ", bold: true },
  { text: "Per FU-RECORD-REQ-018, the Coordinator can edit any field on any Contribution record at any time. Bounced checks, refunds, and reversals are handled by editing the original record's status (typically to Cancelled) and recording the reason in notes \u2014 not by creating offsetting records. Corrections to non-status fields (misentered amount, wrong donor link, misclassified contributionType) are made by editing the field directly. The audit trail per FU-RECORD-REQ-014 captures changes to status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate." },
]));

children.push(para("3.2.5 Process Completion", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Normal Completion. ", bold: true },
  { text: "FU-RECORD has no relationship-level done state \u2014 the funder relationship continues indefinitely. Individual Contribution records reach a terminal state when their status transitions to Received, Unsuccessful, or Cancelled. Individual Fundraising Campaign records reach a terminal state when their status transitions to Completed or Cancelled. Records are retained permanently in all terminal states per FU-RECORD-REQ-019." },
]));
children.push(richPara([
  { text: "Alternative End States and Completion Authority. ", bold: true },
  { text: "Contribution terminal states: Received (funds in hand), Unsuccessful (Applied or Pledged Contribution that did not convert), Cancelled (Committed Contribution withdrawn before payment, or any Contribution corrected by status edit). Fundraising Campaign terminal states: Completed (period or goal closed), Cancelled (abandoned). The Coordinator declares all completion transitions; no approvals required." },
]));
children.push(richPara([
  { text: "Post-Completion Handoffs. ", bold: true },
  { text: "Each Received Contribution against a pre-Active donor or funder transitions that record's lifecycle field to Active and hands the relationship off to FU-STEWARD for ongoing stewardship. Acknowledgment is owned jointly with FU-STEWARD per the hybrid ownership model: FU-RECORD is the primary write path, FU-STEWARD is the catch-up. Records continue to be readable by FU-REPORT for analytics and reporting indefinitely." },
]));
children.push(richPara([
  { text: "Early Termination. ", bold: true },
  { text: "Cancelled status is the early-termination path for Contribution and Fundraising Campaign records. The Coordinator transitions a Contribution to Cancelled when a Committed Contribution is withdrawn before payment, when a Donation bounces, or when any Contribution is corrected. Cancelled records are retained permanently for audit and reporting integrity." },
]));

children.push(para("3.2.6 System Requirements", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Twenty-three system requirements support FU-RECORD operation, grouped by category in the source document for readability."));

const fuRecordReqs = [
  ["FU-RECORD-REQ-001", "The system must allow the Donor / Sponsor Coordinator to create a Contribution record. contributionType (required, no default) and status (required, no default) must be explicitly chosen by the Coordinator at creation. All other Contribution fields may be blank at creation and added later."],
  ["FU-RECORD-REQ-002", "The system must require exactly one of donorContact or donorAccount to be populated on every Contribution record. donorContact links to the donor when the donor is an individual; donorAccount links when the donor is an organization. The two are mutually exclusive."],
  ["FU-RECORD-REQ-003", "The system must require that the linked donor Contact (with contactType including Donor) or donor Account (with accountType including Donor/Sponsor) already exists before a Contribution record can be created. The lifecycle stage of the donor or funder is not constrained."],
  ["FU-RECORD-REQ-004", "The system must allow the Coordinator to create a Fundraising Campaign record. campaignName (required) and status (required, no default) must be populated at creation. Campaigns may be created in advance of solicitation or retroactively after Contributions have arrived."],
  ["FU-RECORD-REQ-005", "The system must allow the Coordinator to link any Contribution to one Fundraising Campaign via the optional campaign field. The linkage is settable, changeable, and clearable at any time, regardless of Campaign status."],
  ["FU-RECORD-REQ-006", "The system must provide three values for contributionType (Donation, Sponsorship, Grant) and apply type-specific dynamic logic on Contribution: applicationDate visible only when contributionType = Grant; nextGrantDeadline visible only when contributionType = Grant; giftType visible only when contributionType = Donation; inKindDescription and inKindValuationBasis visible only when contributionType = Donation AND giftType = In-Kind."],
  ["FU-RECORD-REQ-007", "The system must provide six values for the Contribution status field \u2014 Applied, Pledged, Committed, Received, Unsuccessful, Cancelled \u2014 with no system-enforced progression order. The Coordinator can transition between any values at any time."],
  ["FU-RECORD-REQ-008", "The system must provide four values for the Fundraising Campaign status field \u2014 Planned, Active, Completed, Cancelled \u2014 with no system-enforced progression order. The Coordinator can transition between any values at any time."],
  ["FU-RECORD-REQ-009", "For multi-payment grants, the system must allow the Coordinator to advance Contribution status from Committed to Received only when the grant is fully paid; receivedDate represents the date of the final payment. Multi-payment disbursement detail is recorded in notes rather than as separate records."],
  ["FU-RECORD-REQ-010", "The system must automatically transition the linked donor's lifecycle field (donorStatus on Contact, funderStatus on Account) to Active on the creation of any Contribution record, regardless of contributionType or status. This applies to any prior lifecycle state. Companion to FU-PROSPECT-REQ-006."],
  ["FU-RECORD-REQ-011", "The system must calculate totalRaised on each Fundraising Campaign as the sum of amount across all Contributions in Received status linked to that Campaign. Contributions in any other status do not contribute to totalRaised."],
  ["FU-RECORD-REQ-012", "The system must calculate donorLifetimeGiving on Contact as the sum of amount across all Contributions in Received status linked to the Contact via donorContact. The field is visible only when contactType has Donor."],
  ["FU-RECORD-REQ-013", "The system must update funderLifetimeGiving on Account as the sum of amount across all Contributions in Received status linked to the Account via donorAccount. Contributions in any other status do not contribute."],
  ["FU-RECORD-REQ-014", "The system must maintain an audit trail of changes to status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate on Contribution records. The system must also maintain an audit trail of changes to status and goalAmount on Fundraising Campaign records."],
  ["FU-RECORD-REQ-015", "The system must provide acknowledgmentSent (boolean) and acknowledgmentDate (date) fields on every Contribution record, regardless of contributionType. Both fields are optional and Coordinator-set. The fields are jointly owned by FU-RECORD and FU-STEWARD under a hybrid ownership model: FU-RECORD is the primary write path (acknowledgment sent and recorded at the moment of Contribution creation); FU-STEWARD is the catch-up write path (acknowledgment sent and recorded during the FU-STEWARD sweep when missed at FU-RECORD time). See FU-STEWARD-REQ-004. Specifics of what was sent in any given case are recorded in notes. Resolves EI-ISS-001."],
  ["FU-RECORD-REQ-016", "The system must support recording in-kind Donations via giftType = In-Kind, with optional inKindDescription (text) and inKindValuationBasis (text) fields visible only when contributionType = Donation AND giftType = In-Kind. There is no separate In-Kind value of contributionType."],
  ["FU-RECORD-REQ-017", "The system must provide nextGrantDeadline (date, optional) on Grant Contributions to track the next pending grant-related obligation, typically a report deadline. The Coordinator may use the field for any grant-related deadline."],
  ["FU-RECORD-REQ-018", "The system must allow the Coordinator to edit any field on any Contribution record at any time. Bounced checks, refunds, and reversals are handled by editing the original record's status (typically transitioning to Cancelled) and notes \u2014 not by creating offsetting records. All edits are captured by the audit trail per FU-RECORD-REQ-014."],
  ["FU-RECORD-REQ-019", "The system must retain all Contribution and Fundraising Campaign records permanently, including those in terminal status. No deletion of Contribution or Fundraising Campaign records."],
  ["FU-RECORD-REQ-020", "The system must provide free-form timestamped and attributed notes on Contribution and Fundraising Campaign records via the Notes Service, accessible to the Donor / Sponsor Coordinator and above."],
  ["FU-RECORD-REQ-021", "The system must restrict record-level visibility of Contribution records, including the notes field, to the Donor / Sponsor Coordinator, Executive Member, and System Administrator. Other personas have no visibility to Contribution records."],
  ["FU-RECORD-REQ-022", "The system must restrict record-level visibility of Fundraising Campaign records, including the in-record fields and the Notes Service stream, to the Donor / Sponsor Coordinator, Executive Member, and System Administrator."],
  ["FU-RECORD-REQ-023", "The system must present a Contribution pipeline view to the Coordinator showing Contribution records grouped by status, with filters available by contributionType, donor type, and date range. The exact implementation form is deferred to Phase 9."],
];

const fuRecordReqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 7360],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 2000 }),
      cell("Requirement", { bold: true, fill: "E7E6E6", width: 7360 }),
    ]}),
    ...fuRecordReqs.map(([id, req]) => new TableRow({ children: [
      cell(id, { width: 2000 }),
      cell(req, { width: 7360 }),
    ]})),
  ],
});
children.push(fuRecordReqTable);
children.push(blank());

children.push(para("3.2.7 Process Data", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "Supporting data read by FU-RECORD without being created or modified during normal operation. Full field-level detail is consolidated in Section 4 Data Reference."
));
children.push(richPara([
  { text: "Contact (read): ", bold: true },
  { text: "contactType, firstName, lastName, emailAddress, phoneNumber, addressStreet, addressCity, addressState, addressPostalCode (for mailed acknowledgments). Identifiers FU-RECORD-DAT-001 through FU-RECORD-DAT-008. See Section 4.1 Contact Entity." },
]));
children.push(richPara([
  { text: "Account (read): ", bold: true },
  { text: "accountType, name, website, emailAddress, phoneNumber, billingAddressCity, billingAddressState, funderType, funderNotes, assignedSponsorCoordinator. Identifiers FU-RECORD-DAT-009 through FU-RECORD-DAT-015. See Section 4.2 Account Entity." },
]));
children.push(richPara([
  { text: "Relationships (read): ", bold: true },
  { text: "Contact-to-Account native relationship for navigating between donor Contacts and their Funder Organization Accounts (FU-RECORD-DAT-016)." },
]));

children.push(para("3.2.8 Data Collected", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "Data created or updated by FU-RECORD. The Contribution and Fundraising Campaign entities are entirely created and maintained by FU-RECORD. One Contact field (donorLifetimeGiving) is new and was propagated to Contact Entity PRD v1.7 via the bundled end-of-FU-Phase-4b carry-forward."
));
children.push(richPara([
  { text: "Contact (updated): ", bold: true },
  { text: "donorStatus (auto-updated to Active on first Contribution per FU-RECORD-REQ-010); donorLifetimeGiving (new field, FU-RECORD-DAT-018, system-calculated). Identifiers FU-RECORD-DAT-017, FU-RECORD-DAT-018." },
]));
children.push(richPara([
  { text: "Account (updated): ", bold: true },
  { text: "funderStatus (auto-updated to Active on first Contribution per FU-RECORD-REQ-010); funderLifetimeGiving (system-calculated). Identifiers FU-RECORD-DAT-019, FU-RECORD-DAT-020." },
]));
children.push(richPara([
  { text: "Contribution (created): ", bold: true },
  { text: "Eighteen fields total \u2014 fourteen shared, three Donation-specific (giftType, inKindDescription, inKindValuationBasis), one Grant-specific (nextGrantDeadline). Shared fields: contributionType, status, donorContact, donorAccount, amount, commitmentDate, expectedPaymentDate, receivedDate, applicationDate, designation, campaign, acknowledgmentSent, acknowledgmentDate, notes. giftType uses the seven-value enum per FU-RECON-DEC-001 (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other). Identifiers FU-RECORD-DAT-021 through FU-RECORD-DAT-038. See Section 4.3 Contribution Entity for full field detail." },
]));
children.push(richPara([
  { text: "Fundraising Campaign (created): ", bold: true },
  { text: "Nine fields: campaignName, campaignType, status, goalAmount, startDate, endDate, totalRaised, description, geographicServiceArea. Identifiers FU-RECORD-DAT-039 through FU-RECORD-DAT-047. See Section 4.4 Fundraising Campaign Entity for full field detail." },
]));

// ------------------------------
// 3.3 FU-STEWARD
// ------------------------------
children.push(para("3.3 FU-STEWARD \u2014 Donor and Sponsor Stewardship", { heading: HeadingLevel.HEADING_2 }));

children.push(para("3.3.1 Process Purpose", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-STEWARD is the periodic-review process for the Fundraising domain. The Donor / Sponsor Coordinator runs a weekly or bi-weekly sweep of all Active donor Contacts and Funder Organization Accounts to identify stewardship gaps \u2014 relationships that have gone too long without contact, Received Contributions that have not been acknowledged, grant-reporting deadlines coming due, recognition obligations pending, and signs that an Active relationship is going cold. The review produces a working list of records needing attention; the Coordinator then takes action against that list \u2014 sending acknowledgments, sending outreach communications, preparing donor-specific impact reports, and transitioning records from Active to Lapsed when warranted. The review-and-act cycle repeats on the next sweep."
));
children.push(para(
  "The deliverable of FU-STEWARD is funder satisfaction. Every Active funding relationship \u2014 individual donor or organizational funder \u2014 is nurtured to preserve and deepen the relationship over its life. The process operates exclusively on Active records; pre-Active cultivation (Prospect, Contacted, In Discussion, Committed) is owned by FU-PROSPECT, and re-engagement of Lapsed and Closed records is also owned by FU-PROSPECT. The only lifecycle transition FU-STEWARD owns is Active to Lapsed, the inverse of the Committed to Active activation that FU-PROSPECT and FU-RECORD jointly produce on first Contribution creation."
));
children.push(richPara([
  { text: "Cadence and Operating Philosophy. ", bold: true },
  { text: "The Coordinator runs FU-STEWARD on a weekly or bi-weekly cadence \u2014 a periodic portfolio sweep across the Active population to catch any relationship that has been ignored. The cadence is deliberately not reactive. Inbox-driven work \u2014 acknowledgment of a newly arrived Contribution at the moment of recording, response to a funder inquiry \u2014 belongs to FU-RECORD or to general staff communications, not to FU-STEWARD. FU-STEWARD is always a review process that leads to action; the review identifies what needs attention, and the action is what the Coordinator does in response." },
]));
children.push(richPara([
  { text: "Hybrid Acknowledgment Ownership. ", bold: true },
  { text: "FU-STEWARD is the catch-up write path for the acknowledgment fields on Contribution under the hybrid ownership model established jointly with FU-RECORD. Per FU-STEWARD-REQ-004, the Coordinator may set acknowledgmentSent and acknowledgmentDate on any Contribution at any time, in addition to the FU-RECORD primary write path at Contribution creation. The Acknowledgment-Pending Contributions saved list surfaces every Received Contribution where acknowledgmentSent = false; the Coordinator sends the missed acknowledgment outside the system and writes the fields during the sweep." },
]));

children.push(para("3.3.2 Process Triggers", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Preconditions. ", bold: true },
  { text: "One precondition: the donor or funder record must be in Active status. For an individual donor, that is a Contact record with donorStatus = Active. For an organizational funder, that is an Account record with funderStatus = Active. Records in any other status are not in scope for FU-STEWARD. Prospect, Contacted, In Discussion, and Committed records are owned by FU-PROSPECT for cultivation. Lapsed and Closed records are owned by FU-PROSPECT for re-engagement. No other gating conditions apply." },
]));
children.push(richPara([
  { text: "Required Data. ", bold: true },
  { text: "No required data beyond the Active status itself. The Coordinator can review and act on any Active record regardless of how completely the profile is populated. A sparse record \u2014 missing email, missing phone, missing assignedSponsorCoordinator, missing notes \u2014 is still in scope; one possible action during a sweep is enriching such a sparse record." },
]));
children.push(richPara([
  { text: "Initiation Mechanism. ", bold: true },
  { text: "Manual only. The Donor / Sponsor Coordinator decides, on their own weekly or bi-weekly cadence, to open the Active list and run a sweep. The system maintains the three saved lists at all times, with stewardship-relevant indicators always current, but does not prompt or schedule the sweep. There is no system-generated trigger, no scheduled automation, and no system-fired reminder. The Coordinator's discipline drives the cadence." },
]));
children.push(richPara([
  { text: "Initiating Persona. ", bold: true },
  { text: "The Donor / Sponsor Coordinator (MST-PER-010) is the sole initiator. The Coordinator has full authority to run a sweep at any time; no approval required. The Executive Member may consume FU-STEWARD output via reports and may participate in specific stewardship actions at the Coordinator's invitation, but neither is initiation." },
]));

children.push(para("3.3.3 Personas Involved", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "MST-PER-010 \u2014 Donor / Sponsor Coordinator (Sole Operator). ", bold: true },
  { text: "Runs every weekly or bi-weekly sweep. Reviews each Active donor Contact and each Active Funder Organization Account on the sweep cadence, working from the three saved lists. For each record on the sweep list, reads donorNotes (Contact) or funderNotes (Account) to determine whether there is a valid reason the record has not been contacted recently and, if not, initiates outreach via email, text message, or phone. Updates lastContactDate after every outreach. Sends catch-up acknowledgments for any Received Contributions where acknowledgmentSent = false. Reviews Grant Contributions with upcoming or past-due deadlines, prepares the required reports outside the CRM, submits them to the funder, and updates nextGrantDeadline. Reads Sponsorship Contribution notes during per-record review for pending recognition obligations. Composes donor-specific impact reports outside the CRM when the relationship warrants and records the fact in donorNotes or funderNotes. Transitions donorStatus or funderStatus from Active to Lapsed when the Coordinator judges the relationship has gone dormant; reasoning is recorded narratively. Has full authority \u2014 no approvals required." },
]));
children.push(richPara([
  { text: "MST-PER-002 \u2014 Executive Member (Read-Only Consumer and Informal Participant). ", bold: true },
  { text: "Read-only consumer of FU-STEWARD output via reports and dashboards. Reviews lapsed-relationship summaries, upcoming grant-deadline lists, stewardship-activity overviews, and at-risk-relationship indicators as part of board-level oversight. Does not initiate sweeps, does not transition records between lifecycle stages. May be invited by the Coordinator to participate in specific high-value stewardship actions \u2014 signing thank-you letters to major donors, attending donor meetings, making personal calls to top funders. Such participation is an individual contribution at the Coordinator's discretion." },
]));

children.push(para("3.3.4 Process Workflow", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-STEWARD operates as a single sweep workflow against three independent saved lists. The sweep is initiated manually by the Coordinator on the chosen cadence. Each list is reviewed independently; the Coordinator may work all three in a single sitting or spread the work across multiple sittings on the same cadence."
));
children.push(richPara([
  { text: "1. Active Donors and Funders Sweep List. ", bold: true },
  { text: "Per FU-STEWARD-REQ-006, this list shows all Contact records with donorStatus = Active and all Account records with funderStatus = Active, sorted by lastContactDate ascending with null values first. Records that have never had a Coordinator outreach appear at the top, followed by oldest-contact records. For each record, the Coordinator reads donorNotes or funderNotes to determine whether outreach is warranted, initiates outreach if so (email, text, phone), updates lastContactDate, and decides whether to transition the record to Lapsed if the Coordinator judges the relationship has gone dormant." },
]));
children.push(richPara([
  { text: "2. Acknowledgment-Pending Contributions List. ", bold: true },
  { text: "Per FU-STEWARD-REQ-007, this list shows all Contribution records with status = Received and acknowledgmentSent = false, sorted by receivedDate ascending. The Coordinator sends the missed acknowledgment outside the system and writes acknowledgmentSent = true and acknowledgmentDate. This is the catch-up half of the hybrid acknowledgment ownership model established with FU-RECORD." },
]));
children.push(richPara([
  { text: "3. Grant Deadlines List. ", bold: true },
  { text: "Per FU-STEWARD-REQ-008, this list shows all Contribution records with contributionType = Grant, nextGrantDeadline populated, and status in (Committed, Received), sorted by nextGrantDeadline ascending. Past-due deadlines appear at the top. For each grant on the list, the Coordinator prepares the required reports outside the CRM (drawing on Mentoring-domain program-impact data via FU-STEWARD-REQ-010 read access), submits to the funder, and updates nextGrantDeadline to the next pending obligation or clears the field when no further obligations remain." },
]));
children.push(richPara([
  { text: "Active to Lapsed Transition. ", bold: true },
  { text: "Per FU-STEWARD-REQ-003, the Coordinator transitions donorStatus or funderStatus from Active to Lapsed at any time when the Coordinator judges the relationship has gone dormant. The transition is purely Coordinator judgment \u2014 no system-enforced thresholds, no time-based automatic transition, no system-suggested candidates. Reasoning is recorded narratively in donorNotes or funderNotes. A Lapsed transition can be reversed by the Coordinator if the transition was made in error \u2014 the record returns to Active via field edit and reappears in the next sweep." },
]));
children.push(richPara([
  { text: "Donor-Specific Impact Reports. ", bold: true },
  { text: "When the Coordinator judges that a relationship warrants a custom impact report, the Coordinator composes it outside the CRM (using Mentoring-domain Engagement and Session data via FU-STEWARD-REQ-010 read access) and records the fact in donorNotes or funderNotes. The CRM does not store the impact reports themselves \u2014 only the narrative record that one was prepared and sent." },
]));
children.push(richPara([
  { text: "No System-Fired Alerts. ", bold: true },
  { text: "Per FU-STEWARD-REQ-009, the system does not fire any automated notifications, alerts, reminders, or scheduled prompts in support of FU-STEWARD. The three saved lists are the sole stewardship surface. Sweep cadence is purely Coordinator-driven." },
]));

children.push(para("3.3.5 Process Completion", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Normal Completion. ", bold: true },
  { text: "FU-STEWARD has no relationship-level done state. Each Active donor or funder remains a stewardship subject for as long as the relationship is Active. Each individual sweep cycle has a beginning and an end (the working list is fully addressed or carried to the next sweep), but the process operates against the Active population indefinitely." },
]));
children.push(richPara([
  { text: "Multiple End States and Completion Authority. ", bold: true },
  { text: "The only relationship-level exit FU-STEWARD performs is Active to Lapsed (per FU-STEWARD-REQ-003). The Coordinator declares this transition by judgment, with reasoning recorded narratively. No approval required. (Per FU-RECON-DEC-003, an Active to Closed transition is permitted as a free-form Coordinator transition under FU-PROSPECT-REQ-005 in exceptional cases, handled within FU-PROSPECT's Closed-record framework.)" },
]));
children.push(richPara([
  { text: "Post-Completion Handoffs. ", bold: true },
  { text: "When a record transitions to Lapsed, the relationship leaves FU-STEWARD scope and re-enters FU-PROSPECT scope for potential re-engagement. No system-tracked handoff event \u2014 the lifecycle field change is the handoff. Catch-up acknowledgment writes hand back to the source Contribution record (no separate handoff). Updated nextGrantDeadline values remain on the same Grant Contribution record (no separate handoff)." },
]));
children.push(richPara([
  { text: "Early Termination. ", bold: true },
  { text: "Not applicable. A sweep cycle that is interrupted is simply resumed on the next sitting; the saved lists remain current at all times. There is no in-progress state to terminate." },
]));

children.push(para("3.3.6 System Requirements", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Twelve system requirements support FU-STEWARD operation."));

const fuStewardReqs = [
  ["FU-STEWARD-REQ-001", "The system must provide a lastContactDate field (date, optional) on Contact records, visible only when contactType has Donor. Manually set by the Coordinator after stewardship outreach. The system does not auto-populate or auto-update from any source."],
  ["FU-STEWARD-REQ-002", "The system must provide a lastContactDate field (date, optional) on Account records, visible only when accountType has Donor/Sponsor. Manually set by the Coordinator after stewardship outreach. The system does not auto-populate or auto-update from any source."],
  ["FU-STEWARD-REQ-003", "The system must allow the Coordinator to transition donorStatus (Contact) and funderStatus (Account) from Active to Lapsed at any time. The transition is purely Coordinator judgment; no system-enforced thresholds, no time-based automatic transition, and no system-suggested candidates. Reasoning is recorded narratively in donorNotes or funderNotes; no structured lapse-reason field."],
  ["FU-STEWARD-REQ-004", "The system must allow the Coordinator to set acknowledgmentSent (boolean) and acknowledgmentDate (date) on any Contribution at any time, in addition to the FU-RECORD primary acknowledgment write path. These fields are shared between FU-RECORD and FU-STEWARD: FU-RECORD captures most acknowledgments at the moment of Contribution creation; FU-STEWARD provides catch-up coverage during the sweep for Received Contributions where acknowledgmentSent = false."],
  ["FU-STEWARD-REQ-005", "The system must allow the Coordinator to update nextGrantDeadline on any Grant Contribution at any time \u2014 advancing it to the next pending obligation when one is met, clearing it when no further obligations remain, or correcting it."],
  ["FU-STEWARD-REQ-006", "The system must present a saved list \u2014 the Active Donors and Funders Sweep List \u2014 showing all Contact records with donorStatus = Active and all Account records with funderStatus = Active, sorted by lastContactDate ascending with null values first. The exact implementation form is deferred to Phase 9."],
  ["FU-STEWARD-REQ-007", "The system must present a saved list \u2014 the Acknowledgment-Pending Contributions list \u2014 showing all Contribution records with status = Received and acknowledgmentSent = false, sorted by receivedDate ascending. The exact implementation form is deferred to Phase 9."],
  ["FU-STEWARD-REQ-008", "The system must present a saved list \u2014 the Grant Deadlines list \u2014 showing all Contribution records with contributionType = Grant, nextGrantDeadline populated, and status in (Committed, Received), sorted by nextGrantDeadline ascending. Past-due deadlines (where nextGrantDeadline is earlier than today's date) appear at the top. The exact implementation form is deferred to Phase 9."],
  ["FU-STEWARD-REQ-009", "The system must not fire any automated notifications, alerts, reminders, or scheduled prompts in support of FU-STEWARD. The three saved lists are the sole stewardship surface. Sweep cadence is purely Coordinator-driven."],
  ["FU-STEWARD-REQ-010", "The system must allow the Coordinator to read program-impact data from Mentoring-domain entities (Engagement, Session) on a read-only basis to support donor-specific impact reporting and grant-compliance reporting. Specific report content is composed by the Coordinator outside the CRM; the system provides read access to source data only."],
  ["FU-STEWARD-REQ-011", "The system must capture changes to donorStatus (Contact) and funderStatus (Account) in the audit trail, including transitions to Lapsed performed by FU-STEWARD."],
  ["FU-STEWARD-REQ-012", "The system must restrict visibility of all fields written by FU-STEWARD \u2014 lastContactDate on Contact and Account, transitions to Lapsed on donorStatus and funderStatus, and writes to donorNotes and funderNotes \u2014 under the existing field-level and record-level visibility rules established by FU-PROSPECT-REQ-013. Acknowledgment-field writes per FU-STEWARD-REQ-004 inherit the existing Contribution record-level visibility per FU-RECORD-REQ-021."],
];

const fuStewardReqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 7360],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 2000 }),
      cell("Requirement", { bold: true, fill: "E7E6E6", width: 7360 }),
    ]}),
    ...fuStewardReqs.map(([id, req]) => new TableRow({ children: [
      cell(id, { width: 2000 }),
      cell(req, { width: 7360 }),
    ]})),
  ],
});
children.push(fuStewardReqTable);
children.push(blank());

children.push(para("3.3.7 Process Data", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Supporting data read by FU-STEWARD without being created or modified during normal operation. Full field-level detail is consolidated in Section 4 Data Reference."));
children.push(richPara([
  { text: "Contact (read): ", bold: true },
  { text: "contactType, firstName, lastName, emailAddress, phoneNumber, boardPosition, donorLifetimeGiving (FU-STEWARD-DAT-001 through FU-STEWARD-DAT-004). See Section 4.1 Contact Entity." },
]));
children.push(richPara([
  { text: "Account (read): ", bold: true },
  { text: "accountType, name, website, emailAddress, phoneNumber, funderType, funderLifetimeGiving, assignedSponsorCoordinator (FU-STEWARD-DAT-005 through FU-STEWARD-DAT-009). See Section 4.2 Account Entity." },
]));
children.push(richPara([
  { text: "Contribution (read): ", bold: true },
  { text: "contributionType, status, amount, donorContact, donorAccount, campaign, receivedDate, acknowledgmentSent, acknowledgmentDate, nextGrantDeadline, designation, notes (FU-STEWARD-DAT-010 through FU-STEWARD-DAT-016). See Section 4.3 Contribution Entity." },
]));

children.push(para("3.3.8 Data Collected", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Data created or updated by FU-STEWARD. Two new fields surfaced (lastContactDate on Contact, lastContactDate on Account) propagated to Contact Entity PRD v1.7 and Account Entity PRD v1.8 via the bundled end-of-FU-Phase-4b carry-forward."));
children.push(richPara([
  { text: "Contact (created or updated): ", bold: true },
  { text: "lastContactDate (new field, FU-STEWARD-DAT-017, manually set after each outreach); donorStatus (update \u2014 Active to Lapsed only, FU-STEWARD-DAT-018); donorNotes (update, FU-STEWARD-DAT-019, appending stewardship outreach context, lapse reasoning, donor-specific impact-reporting context)." },
]));
children.push(richPara([
  { text: "Account (created or updated): ", bold: true },
  { text: "lastContactDate (new field, FU-STEWARD-DAT-020, manually set after each outreach); funderStatus (update \u2014 Active to Lapsed only, FU-STEWARD-DAT-021); funderNotes (update, FU-STEWARD-DAT-022)." },
]));
children.push(richPara([
  { text: "Contribution (updated): ", bold: true },
  { text: "acknowledgmentSent (catch-up write under hybrid ownership, FU-STEWARD-DAT-023); acknowledgmentDate (catch-up write, FU-STEWARD-DAT-024); nextGrantDeadline (update, FU-STEWARD-DAT-025); notes (update, FU-STEWARD-DAT-026)." },
]));

// ------------------------------
// 3.4 FU-REPORT
// ------------------------------
children.push(para("3.4 FU-REPORT \u2014 Fundraising Reporting", { heading: HeadingLevel.HEADING_2 }));

children.push(para("3.4.1 Process Purpose", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-REPORT is the reporting process for the Fundraising domain. It produces analytics and outputs that support board oversight of fundraising performance, working visibility for the Donor / Sponsor Coordinator between sweep cycles, year-end giving summaries for individual donors, and ad-hoc data access combining fundraising data with program-impact data from the Mentoring domain. FU-REPORT consumes the records produced by FU-PROSPECT, FU-RECORD, and FU-STEWARD, plus the Engagement and Session records produced by the Mentoring domain, and presents that data in defined reports, on-demand live views, scheduled packets, and ad-hoc queries."
));
children.push(para(
  "FU-REPORT is read-only across every entity it consumes. It creates no records, transitions no statuses, and writes nothing back to Contact, Account, Contribution, Fundraising Campaign, Engagement, or Session. Its outputs are presentations of data \u2014 reports, packets, formatted document files \u2014 not changes to data."
));
children.push(para(
  "FU-REPORT has no completion state. It is a perpetual reporting capability that operates indefinitely over the life of the Fundraising domain. Each individual report run, packet generation, live-view session, and Annual Donor Giving Summary generation is an operational unit, not a process completion."
));
children.push(richPara([
  { text: "Implementation Tier and Scope Constraints. ", bold: true },
  { text: "FU-REPORT is the only Enhancement-tier process in the Fundraising domain \u2014 valuable but deferrable. Two scope constraints surfaced during process definition that narrow the document from the original Fundraising Domain Overview description. First, standardized grant-compliance report generation is out of scope as a defined deliverable; grant data remains accessible through ad-hoc reporting. Second, sponsor recognition reports are out of scope as a defined deliverable; recognition obligations are captured narratively in Contribution notes and accessible through ad-hoc reporting." },
]));

children.push(para("3.4.2 Process Triggers", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Preconditions. ", bold: true },
  { text: "No record-level preconditions. FU-REPORT operates against whatever records exist in the system at the moment a report is run. One persona-level precondition: the requesting user must hold a persona with FU-REPORT access \u2014 the Donor / Sponsor Coordinator and the Executive Member have access; other personas do not. The System Administrator has implicit access through the platform-administrator role." },
]));
children.push(richPara([
  { text: "Required Data. ", bold: true },
  { text: "No required data inputs from the requesting user beyond the parameters of the requested report \u2014 typically a reporting period, a filter selection, or both. Annual Donor Giving Summaries require only a calendar year. Pipeline Status and Lifetime Value Distribution are point-in-time and require no period parameter." },
]));
children.push(richPara([
  { text: "Initiation Mechanism. ", bold: true },
  { text: "Manual only. The Donor / Sponsor Coordinator and the Executive Member initiate FU-REPORT operations on demand. No system-fired automation. No reports run on schedule; no packets are produced automatically; no Annual Donor Giving Summaries generate on a system-fired event; no notifications fire when data crosses a threshold; no emails go out without Coordinator action. This continues the no-system-fired-output position established by FU-STEWARD-REQ-009." },
]));
children.push(richPara([
  { text: "Initiating Persona. ", bold: true },
  { text: "The Donor / Sponsor Coordinator (MST-PER-010) is the primary operator: triggers packet production, runs ad-hoc queries, generates Annual Donor Giving Summaries, accesses live views. The Executive Member (MST-PER-002) accesses live views on demand for board-level review between board meetings; typically does not initiate packet production, run ad-hoc queries, or trigger Annual Donor Giving Summary generation, but is not technically prevented from doing so." },
]));

children.push(para("3.4.3 Personas Involved", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "MST-PER-010 \u2014 Donor / Sponsor Coordinator (Primary Operator). ", bold: true },
  { text: "Triggers packet production on the cadence the board uses (monthly informational packet for management review, quarterly formal packet ahead of board meetings). Runs ad-hoc queries against fundraising data and Mentoring-domain program-impact data when staff or board members request information that is not produced by any of the ten defined reports. Generates Annual Donor Giving Summaries at the start of each January for the prior calendar year. Accesses defined-report live views as a working tool between sweeps. Has full authority \u2014 no approvals required." },
]));
children.push(richPara([
  { text: "MST-PER-002 \u2014 Executive Member (Primary Audience and Live-View Consumer). ", bold: true },
  { text: "Primary audience for FU-REPORT outputs at the board level. Reviews the monthly informational packet for management oversight between board meetings and reviews the quarterly formal packet at board meetings. Accesses defined-report live views on demand between meetings. Has access to ad-hoc reporting capability but typically does not run ad-hoc queries; the Coordinator runs ad-hoc queries at the Executive Member's request as needed. Does not initiate packet production or Annual Donor Giving Summary generation. Does not transition any record between lifecycle stages \u2014 FU-REPORT writes nothing." },
]));
children.push(para("Restricted-visibility fields (donorNotes, funderNotes) and restricted record-level visibility on Contribution and Fundraising Campaign per FU-PROSPECT-REQ-013, FU-RECORD-REQ-021, and FU-RECORD-REQ-022 carry through to FU-REPORT outputs \u2014 a user who cannot see a field or record in the source entities cannot see it in a report either."));

children.push(para("3.4.4 Process Workflow", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-REPORT operates as four interleaved consumption patterns rather than a single sequential workflow. Each pattern is initiated independently as the consumer's needs arise, and the patterns operate against the same underlying data set."
));
children.push(richPara([
  { text: "1. Defined-Report Consumption \u2014 Live Views. ", bold: true },
  { text: "The Donor / Sponsor Coordinator and the Executive Member access defined reports as live, interactive views on demand. Each defined report has its own live view, accessible from a list. The user selects the report they want to see; the system renders the current data for the user-selected reporting period. There is no top-level dashboard summarizing the ten reports." },
]));
children.push(richPara([
  { text: "2. Packet Production. ", bold: true },
  { text: "The Coordinator triggers packet production on demand. Two packet types are supported: the monthly informational packet for management review and the quarterly formal packet for board meetings. The system assembles all ten defined reports for the specified reporting period into a single formatted document file. The two packet types contain identical content sets and differ only in cadence and audience formality. The Coordinator distributes the produced file to consumers outside the system. Packet production is never automatic." },
]));
children.push(richPara([
  { text: "3. Annual Donor Giving Summary Generation. ", bold: true },
  { text: "The Coordinator triggers Annual Donor Giving Summary generation on demand, typically in early January for the prior calendar year. The system identifies every individual donor (Contact records with contactType including Donor) who has at least one Received contribution with receivedDate falling in the calendar year, and produces one formatted document file per qualifying donor. Each summary lists the donor's Received contributions for the year (date, amount, designation, gift type, and Fundraising Campaign when linked) along with the donor's total Received giving for the year and the donor's name and mailing address. Generated for every qualifying donor regardless of giving amount; no minimum threshold is applied. Operates only against individual donors (Contact records); organizational funders are not in scope." },
]));
children.push(richPara([
  { text: "4. Ad-Hoc Reporting. ", bold: true },
  { text: "The Coordinator runs ad-hoc queries against fundraising data and Mentoring-domain program-impact data for one-off reporting needs not covered by the ten defined reports. Examples: assembling grant-compliance submissions, producing sponsor-recognition lists, producing campaign performance against goals, producing reports on specific funder portfolios, producing one-off requests from staff or external auditors. Ad-hoc reports respect the same field-level and record-level visibility rules as defined reports." },
]));

children.push(para("The Ten Defined Reports", { bold: true }));
children.push(numberedPara("Year-Over-Year Giving Trends. Total giving over multiple years for board oversight of organizational fundraising trajectory. Displays summary by fiscal or calendar year: total Received contribution amount, count of Received contributions, count of unique donors, and average gift size. Trailing three to five years plus current year-to-date. Filters: contributionType, funderType, Fundraising Campaign."));
children.push(numberedPara("Pipeline Status. Distribution of donor and funder relationships across the seven lifecycle stages. Counts records by lifecycle stage, separated for individual donors (donorStatus) and organizational funders (funderStatus). Filters: funderType, assignedSponsorCoordinator."));
children.push(numberedPara("Lifetime Value Distribution. Distribution of donors and funders by total lifetime giving. Records grouped into giving tiers; for each tier, count of records, total lifetime giving in that tier, percentage of total organizational lifetime giving. Often shown for individual donors (donorLifetimeGiving) and organizational funders (funderLifetimeGiving)."));
children.push(numberedPara("At-Risk Active Relationships. Active donors and funders whose lastContactDate is overdue relative to a stewardship-cadence expectation. Counts Active records into bands by time since last Coordinator outreach: never contacted, contacted within thirty days, thirty to ninety days, ninety to one-hundred-eighty days, over one-hundred-eighty days. Operationally similar to FU-STEWARD's Active Donors and Funders Sweep List but framed at the board-oversight level."));
children.push(numberedPara("Lapsed Donor and Funder Analysis. Records that have transitioned to Lapsed. Lists Lapsed records with name, lifetime giving, date of most recent Received contribution, and date of last Coordinator contact. Sorted by lifetime giving descending."));
children.push(numberedPara("Acknowledgment Coverage. Received contributions that have not yet been acknowledged. Summarizes total count, count where acknowledgmentSent = true, count where acknowledgmentSent = false, percentage acknowledged, and median days between receivedDate and acknowledgmentDate. Operationally similar to FU-STEWARD's Acknowledgment-Pending Contributions list but framed as a coverage metric."));
children.push(numberedPara("Annual Donor Giving Summaries. Year-end giving summaries sent to individual donors for tax purposes. Generated as one formatted document file per qualifying donor. Calendar year, no minimum threshold."));
children.push(numberedPara("Open Pipeline Value. Contributions in non-terminal status (Applied, Pledged, Committed) representing expected future revenue. Lists with contribution type, donor name, amount, status, and the most-relevant date field. Statuses shown separately without probability weighting; no probability field added to Contribution."));
children.push(numberedPara("Board Member Giving Summary. Contact records with boardPosition populated and their giving record. Name, board position, donor status, current calendar year Received giving, lifetime giving, date of most recent Received contribution. Summary metrics: count of board members, count who gave during the current calendar year, percentage who gave (board-participation metric)."));
children.push(numberedPara("Mentoring Service Delivery by Funding Territory. Volume of mentor sessions and total mentoring hours delivered to clients within each funder's geographic territory. Two views: funder-level (using Account.geographicServiceArea) and campaign-level (using Fundraising Campaign.geographicServiceArea). Match rule: client's Contact.addressPostalCode is checked against the territory zip code list. Territory overlap supported; a single session may count toward multiple funders."));

children.push(para("3.4.5 Process Completion", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Normal Completion. ", bold: true },
  { text: "FU-REPORT has no completion state. It is a perpetual reporting capability that operates indefinitely. Each individual report run, packet generation, live-view session, and Annual Donor Giving Summary generation is an operational unit, not a process completion." },
]));
children.push(richPara([
  { text: "Multiple End States. ", bold: true },
  { text: "Not applicable. FU-REPORT has no end states because it has no completion state." },
]));
children.push(richPara([
  { text: "Completion Authority. ", bold: true },
  { text: "Not applicable. No completion event occurs that would require an authority to mark it complete." },
]));
children.push(richPara([
  { text: "Post-Completion Handoffs. ", bold: true },
  { text: "FU-REPORT produces no discrete handoff events to any other process. Outputs are consumed on demand by personas who run reports or who receive scheduled packets." },
]));
children.push(richPara([
  { text: "Early Termination. ", bold: true },
  { text: "Not applicable. FU-REPORT operations are short-lived (a report run, a packet generation, a live-view session, an Annual Donor Giving Summary generation) and produce output documents or interactive views, not entity records." },
]));

children.push(para("3.4.6 System Requirements", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Twenty-seven system requirements support FU-REPORT operation, derived from the four consumption patterns and the ten defined reports."));

const fuReportReqs = [
  ["FU-REPORT-REQ-001", "The system must provide ten defined reports as listed in Section 3.4.4, each accessible to the Donor / Sponsor Coordinator and the Executive Member."],
  ["FU-REPORT-REQ-002", "The system must present each defined report as a live, interactive view that renders current data for a user-selected reporting period at the time the view is opened."],
  ["FU-REPORT-REQ-003", "The system must support per-report live views accessible from a list rather than a top-level dashboard summarizing the ten reports."],
  ["FU-REPORT-REQ-004", "The system must apply field-level and record-level visibility rules consistently across all defined-report live views \u2014 restricted fields and records hidden from users without access."],
  ["FU-REPORT-REQ-005", "The system must allow each defined report to specify its own report parameters (reporting period, filters) consistent with the report-content descriptions in Section 3.4.4."],
  ["FU-REPORT-REQ-006", "The system must allow the Donor / Sponsor Coordinator to trigger packet production on demand. Packet production assembles all ten defined reports for the specified reporting period into a single formatted document file."],
  ["FU-REPORT-REQ-007", "The system must support two packet types \u2014 the monthly informational packet for management review and the quarterly formal packet for board meetings \u2014 with identical content and differing only in cadence and audience."],
  ["FU-REPORT-REQ-008", "The system must not produce packets automatically on schedule. All packet production is Coordinator-triggered."],
  ["FU-REPORT-REQ-009", "The system must produce packets as a single formatted document file distributed by the Coordinator outside the system."],
  ["FU-REPORT-REQ-010", "The system must allow the Coordinator to trigger Annual Donor Giving Summary generation on demand."],
  ["FU-REPORT-REQ-011", "The system must produce one separate formatted document file per qualifying individual donor as the Annual Donor Giving Summary output."],
  ["FU-REPORT-REQ-012", "The system must list each qualifying donor's Received contributions for the calendar year on their Annual Donor Giving Summary, with date, amount, designation, gift type, and Fundraising Campaign (when linked) per contribution shown. The summary also includes the donor's total Received giving for the year."],
  ["FU-REPORT-REQ-013", "The system must not apply a minimum giving threshold to Annual Donor Giving Summary generation. Every individual donor with at least one Received contribution during the calendar year receives a summary."],
  ["FU-REPORT-REQ-014", "The system must not produce Annual Donor Giving Summaries for organizational funders. Organizational funders receive grant-acknowledgment letters at the time of award and do not receive year-end giving summaries through this process."],
  ["FU-REPORT-REQ-015", "The system must not automatically distribute Annual Donor Giving Summary files to donors. The Coordinator handles distribution outside the system."],
  ["FU-REPORT-REQ-016", "The system must provide read-only access from FU-REPORT to Mentoring-domain entities (Engagement, Session) for use in defined reports and ad-hoc queries. FU-REPORT writes nothing to Mentoring-domain entities."],
  ["FU-REPORT-REQ-017", "The system must support territory-based attribution by matching client zip codes against the zip code lists stored in Account.geographicServiceArea (for funder-level attribution) and Fundraising Campaign.geographicServiceArea (for campaign-level attribution). The match is set-membership: a client's Contact.addressPostalCode is included in a territory if the value appears in that territory's zip code list."],
  ["FU-REPORT-REQ-018", "The system must support territory overlap. A single client and the sessions delivered to that client may be counted toward multiple funders or multiple campaigns when their territories overlap."],
  ["FU-REPORT-REQ-019", "The system must source mentor session counts and total mentoring hours for the Mentoring Service Delivery by Funding Territory report from the Mentoring-domain Session entity, scoped to sessions that have a session-date field within the report period and that are linked through Engagement to a client Contact whose addressPostalCode falls within the funder's or campaign's territory zip code list. Exact field-name binding deferred to Phase 9."],
  ["FU-REPORT-REQ-020", "The system must provide ad-hoc reporting capability over Fundraising-domain entities (Contact, Account, Contribution, Fundraising Campaign) and Mentoring-domain entities (Engagement, Session) to the Donor / Sponsor Coordinator. Ad-hoc reports support filtering, grouping, and export."],
  ["FU-REPORT-REQ-021", "The system must apply the same field-level and record-level visibility rules to ad-hoc reports as it applies to defined reports."],
  ["FU-REPORT-REQ-022", "The system must allow ad-hoc reports to be exported to a portable file format for distribution outside the system or further analysis. Exact export formats defer to Phase 9."],
  ["FU-REPORT-REQ-023", "The system must restrict ad-hoc reporting access to the Donor / Sponsor Coordinator and the Executive Member. Other personas have no ad-hoc reporting access through this process."],
  ["FU-REPORT-REQ-024", "The system must not write to any Fundraising-domain or Mentoring-domain entity from FU-REPORT. FU-REPORT is read-only across all entities it consumes. No fields are created or updated by this process."],
  ["FU-REPORT-REQ-025", "The system must not produce any system-fired alerts, notifications, scheduled emails, or automated messages from FU-REPORT. All output is generated on Coordinator demand."],
  ["FU-REPORT-REQ-026", "The exact visual layout, formatting, charting library, file format, and interactive controls for the live view, packets, defined reports, and Annual Donor Giving Summaries defer to Phase 9 implementation. Business-language descriptions of report content in Section 3.4.4 are authoritative for what each report contains."],
  ["FU-REPORT-REQ-027", "The Northeast Ohio zip code master list referenced by Account.geographicServiceArea and Fundraising Campaign.geographicServiceArea is not specified within FU-REPORT. The master list and its maintenance ownership are Phase 9 implementation matters."],
];

const fuReportReqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 7360],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 2000 }),
      cell("Requirement", { bold: true, fill: "E7E6E6", width: 7360 }),
    ]}),
    ...fuReportReqs.map(([id, req]) => new TableRow({ children: [
      cell(id, { width: 2000 }),
      cell(req, { width: 7360 }),
    ]})),
  ],
});
children.push(fuReportReqTable);
children.push(blank());

children.push(para("3.4.7 Process Data", { heading: HeadingLevel.HEADING_3 }));
children.push(para("Thirty-nine supporting data items read by FU-REPORT across six entities: Contact (8 items), Account (9 items), Contribution (12 items), Fundraising Campaign (8 items), Engagement (1 item), Session (1 item). All items are read-only; FU-REPORT writes none of them. Full field-level detail is consolidated in Section 4 Data Reference."));
children.push(richPara([
  { text: "Contact (read): ", bold: true },
  { text: "firstName, lastName, addressStreet, addressCity, addressState, addressPostalCode, addressCountry, contactType, donorStatus, donorLifetimeGiving, lastContactDate, boardPosition, donorNotes (FU-REPORT-DAT-001 through FU-REPORT-DAT-008). See Section 4.1 Contact Entity." },
]));
children.push(richPara([
  { text: "Account (read): ", bold: true },
  { text: "name, accountType, funderType, funderStatus, funderLifetimeGiving, lastContactDate, assignedSponsorCoordinator, geographicServiceArea, funderNotes (FU-REPORT-DAT-009 through FU-REPORT-DAT-017). See Section 4.2 Account Entity." },
]));
children.push(richPara([
  { text: "Contribution (read): ", bold: true },
  { text: "contributionType, donorContact, donorAccount, fundraisingCampaign, applicationDate, commitmentDate, receivedDate, expectedPaymentDate, acknowledgmentSent, acknowledgmentDate, designation, giftType, nextGrantDeadline, notes (FU-REPORT-DAT-018 through FU-REPORT-DAT-029). Note: giftType uses the seven-value enum per FU-RECON-DEC-001. See Section 4.3 Contribution Entity." },
]));
children.push(richPara([
  { text: "Fundraising Campaign (read): ", bold: true },
  { text: "campaignName, campaignType, status, goalAmount, startDate, endDate, totalRaised, geographicServiceArea (FU-REPORT-DAT-030 through FU-REPORT-DAT-037). See Section 4.4 Fundraising Campaign Entity." },
]));
children.push(richPara([
  { text: "Engagement (read): ", bold: true },
  { text: "Fields supporting territory attribution \u2014 link to client Contact (for territory zip code matching). Specific Engagement field names defer to Engagement Entity PRD v1.2 (FU-REPORT-DAT-038). See Section 4.5 Mentoring-Domain Entities." },
]));
children.push(richPara([
  { text: "Session (read): ", bold: true },
  { text: "Fields supporting session-count and session-hour metrics \u2014 a session-date field, a session-duration or session-hours field, and the link to Engagement. Specific Session field names defer to Session Entity PRD v1.1 (FU-REPORT-DAT-039). See Section 4.5 Mentoring-Domain Entities." },
]));

children.push(para("3.4.8 Data Collected", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "FU-REPORT writes nothing to any entity. No Contact, Account, Contribution, Fundraising Campaign, Engagement, or Session field is created or updated by this process. Per FU-REPORT-REQ-024, FU-REPORT is read-only across all entities it consumes; its outputs are presentations of data \u2014 reports, packets, formatted document files \u2014 not changes to data. This subsection is intentionally empty; the upstream processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, MN-INTAKE, MN-DELIVER) own all writes to the entities FU-REPORT consumes."
));

// ==============================
// Section 4 - Data Reference
// ==============================
children.push(para("4. Data Reference", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "This section is the consolidated, entity-organized reference for every field defined or referenced by the four Fundraising processes. It is the primary input to Phase 9 YAML generation. Where a field originates outside this domain, the originating domain's Entity PRD remains the source of truth; this section captures the FU-domain view of those fields. Where a field is FU-owned, the field-level detail here matches the corresponding Entity PRD."
));
children.push(para(
  "Five entity sections follow: Contact, Account, Contribution, Fundraising Campaign, and Mentoring-Domain Entities (Engagement, Session) read by FU-REPORT. The Notes Service is consumed across multiple entities and does not have its own section here \u2014 see the cross-domain Notes Service specification."
));

// ------------------------------
// 4.1 Contact Entity
// ------------------------------
children.push(para("4.1 Contact Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Contact is a shared cross-domain entity. The fields below are those defined or referenced by FU-domain processes. Full Contact-Entity coverage including non-FU fields is in Contact Entity PRD v1.7. Donor-specific fields appear when contactType has Donor; before that, they are hidden by dynamic logic per CON-DEC-018."
));

const contactFields = [
  ["contactType", "multiEnum", "yes", "Mentor, Member, Client, Donor (others may apply per Contact Entity PRD)", "FU-PROSPECT (append Donor); read by all FU"],
  ["firstName", "varchar", "yes", "\u2014", "FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT (read)"],
  ["lastName", "varchar", "yes", "\u2014", "FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT (read)"],
  ["emailAddress", "varchar (email)", "no", "\u2014", "FU-PROSPECT (write); FU-RECORD, FU-STEWARD (read)"],
  ["phoneNumber", "varchar", "no", "\u2014", "FU-PROSPECT (write); FU-RECORD, FU-STEWARD (read)"],
  ["website", "varchar (URL)", "no", "Used in Universal Contact-Creation Rules for normalized website-domain matching to existing Account", "FU-PROSPECT (write)"],
  ["addressStreet", "varchar", "no", "\u2014", "FU-RECORD, FU-REPORT (read for mailed acknowledgments and giving summaries)"],
  ["addressCity", "varchar", "no", "\u2014", "FU-RECORD, FU-REPORT (read)"],
  ["addressState", "varchar", "no", "\u2014", "FU-RECORD, FU-REPORT (read)"],
  ["addressPostalCode", "varchar", "no", "Source field for territory-based attribution match in FU-REPORT (Mentoring Service Delivery by Funding Territory)", "FU-RECORD, FU-REPORT (read; collected by Mentoring Client Intake)"],
  ["addressCountry", "varchar", "no", "\u2014", "FU-REPORT (read)"],
  ["boardPosition", "varchar", "no", "Free-form text; populated when the Contact is a board member", "FU-PROSPECT (read), FU-STEWARD (read), FU-REPORT (read; used in Board Member Giving Summary)"],
  ["donorStatus", "enum", "conditional (when contactType has Donor)", "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed (seven values)", "FU-PROSPECT (set, advance); FU-RECORD (auto-Active on first Contribution); FU-STEWARD (Active to Lapsed transitions); FU-REPORT (read). New field. Closes CON-ISS-003."],
  ["donorNotes", "wysiwyg", "no", "Sensitive narrative donor context; restricted to Donor / Sponsor Coordinator and above per FU-PROSPECT-REQ-013", "FU-PROSPECT (write); FU-STEWARD (write); FU-REPORT (read). New field."],
  ["donorLifetimeGiving", "currency (calculated)", "system-calculated", "Sum of amount across all Received Contributions linked to the Contact via donorContact; visible only when contactType has Donor", "FU-RECORD (calculated); FU-STEWARD, FU-REPORT (read). New field."],
  ["lastContactDate", "date", "no", "Most recent Coordinator outreach date for stewardship tracking; manually set after each outreach; visible only when contactType has Donor", "FU-STEWARD (write); FU-REPORT (read; used in At-Risk Active Relationships report). New field."],
];

const contactTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1700, 1100, 900, 2660, 3000],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Field", { bold: true, fill: "E7E6E6", width: 1700 }),
      cell("Type", { bold: true, fill: "E7E6E6", width: 1100 }),
      cell("Required", { bold: true, fill: "E7E6E6", width: 900 }),
      cell("Values / Notes", { bold: true, fill: "E7E6E6", width: 2660 }),
      cell("Defined / Used By", { bold: true, fill: "E7E6E6", width: 3000 }),
    ]}),
    ...contactFields.map(([f, t, r, v, u]) => new TableRow({ children: [
      cell(f, { width: 1700 }),
      cell(t, { width: 1100 }),
      cell(r, { width: 900 }),
      cell(v, { width: 2660 }),
      cell(u, { width: 3000 }),
    ]})),
  ],
});
children.push(contactTable);
children.push(blank());

children.push(para("Notes Service consumed on Contact for free-form timestamped and attributed activity notes per FU-PROSPECT-REQ-009 and FU-RECORD-REQ-020. The Notes Service stream coexists with the donorNotes wysiwyg field \u2014 the former for general activity logging, the latter for sensitive narrative context."));

// ------------------------------
// 4.2 Account Entity
// ------------------------------
children.push(para("4.2 Account Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Account is a shared cross-domain entity. The fields below are those defined or referenced by FU-domain processes. Full Account-Entity coverage including non-FU fields is in Account Entity PRD v1.8. Donor/Sponsor-specific fields appear when accountType has Donor/Sponsor; before that, they are hidden by dynamic logic per ACT-DEC-013."
));

const accountFields = [
  ["accountType", "multiEnum", "yes", "Partner, Donor/Sponsor (others may apply per Account Entity PRD)", "FU-PROSPECT (append Donor/Sponsor); read by all FU"],
  ["name", "varchar", "yes", "Organization name", "FU-PROSPECT (write); read by all FU"],
  ["website", "varchar (URL)", "no", "Used in Universal Contact-Creation Rules for normalized website-domain matching", "FU-PROSPECT (write); FU-RECORD, FU-STEWARD (read)"],
  ["emailAddress", "varchar (email)", "no", "\u2014", "FU-PROSPECT (write); FU-RECORD, FU-STEWARD (read)"],
  ["phoneNumber", "varchar", "no", "\u2014", "FU-PROSPECT (write); FU-RECORD, FU-STEWARD (read)"],
  ["billingAddressCity", "varchar", "no", "\u2014", "FU-PROSPECT, FU-RECORD (read)"],
  ["billingAddressState", "varchar", "no", "\u2014", "FU-PROSPECT, FU-RECORD (read)"],
  ["funderType", "enum", "conditional (when accountType has Donor/Sponsor)", "Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other", "FU-PROSPECT (set); FU-RECORD, FU-STEWARD, FU-REPORT (read)"],
  ["funderStatus", "enum", "conditional (when accountType has Donor/Sponsor)", "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed (seven values)", "FU-PROSPECT (set, advance); FU-RECORD (auto-Active on first Contribution); FU-STEWARD (Active to Lapsed transitions); FU-REPORT (read)"],
  ["funderNotes", "wysiwyg", "no", "Sensitive narrative funder context; restricted to Donor / Sponsor Coordinator and above per FU-PROSPECT-REQ-013", "FU-PROSPECT (write); FU-RECORD (read); FU-STEWARD (write); FU-REPORT (read)"],
  ["funderLifetimeGiving", "currency (calculated)", "system-calculated", "Sum of amount across all Received Contributions linked to the Account via donorAccount", "FU-RECORD (calculated); FU-STEWARD, FU-REPORT (read)"],
  ["assignedSponsorCoordinator", "link to Contact", "conditional (when funderStatus = Active)", "Identifies the specific staff member leading the funder relationship; analogous to Partner Account assignedLiaison pattern", "FU-PROSPECT (set); FU-RECORD, FU-STEWARD (read); FU-REPORT (read; used in Pipeline Status). New field."],
  ["lastContactDate", "date", "no", "Most recent Coordinator outreach date for stewardship tracking; manually set after each outreach; visible only when accountType has Donor/Sponsor", "FU-STEWARD (write); FU-REPORT (read). New field."],
  ["geographicServiceArea", "multiEnum (zip code list)", "no", "Northeast Ohio zip code master list (deferred per FU-RECON-ISS-003); independent of any Fundraising Campaign territory; used in Mentoring Service Delivery by Funding Territory report; visibility expanded to Partner and Donor/Sponsor accountType per geographicServiceArea v1.2 carry-forward (commit 73f3050)", "FU-RECORD (set); FU-REPORT (read; used in territory match per FU-REPORT-REQ-017)"],
];

const accountTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1900, 1100, 900, 2460, 3000],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Field", { bold: true, fill: "E7E6E6", width: 1900 }),
      cell("Type", { bold: true, fill: "E7E6E6", width: 1100 }),
      cell("Required", { bold: true, fill: "E7E6E6", width: 900 }),
      cell("Values / Notes", { bold: true, fill: "E7E6E6", width: 2460 }),
      cell("Defined / Used By", { bold: true, fill: "E7E6E6", width: 3000 }),
    ]}),
    ...accountFields.map(([f, t, r, v, u]) => new TableRow({ children: [
      cell(f, { width: 1900 }),
      cell(t, { width: 1100 }),
      cell(r, { width: 900 }),
      cell(v, { width: 2460 }),
      cell(u, { width: 3000 }),
    ]})),
  ],
});
children.push(accountTable);
children.push(blank());

children.push(para("Notes Service consumed on Account for free-form timestamped and attributed activity notes per FU-PROSPECT-REQ-009 and FU-RECORD-REQ-020. The Notes Service stream coexists with the funderNotes wysiwyg field."));

children.push(para("Relationships:", { bold: true }));
children.push(richBullet([
  { text: "Contact-to-Account (native): ", bold: true },
  { text: "An individual Contact (typically a staff member at a funding organization, with contactType including Donor) may be linked to one or more Accounts (with accountType including Donor/Sponsor). FU-PROSPECT-REQ-007 supports multiple Contacts linked to a single Funder Organization Account." },
]));

// ------------------------------
// 4.3 Contribution Entity
// ------------------------------
children.push(para("4.3 Contribution Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Contribution is FU-owned; created and maintained by FU-RECORD. Eighteen fields total: fourteen shared, three Donation-specific (visible when contributionType = Donation), one Grant-specific (visible when contributionType = Grant). Full Contribution-Entity coverage is in Contribution Entity PRD v1.0. Visibility restricted to Donor / Sponsor Coordinator, Executive Member, and System Administrator per FU-RECORD-REQ-021."
));

const contributionFields = [
  ["contributionType", "enum", "yes (no default)", "Donation, Sponsorship, Grant (three values per FU-RECON-DEC-002, supersedes Entity Inventory v1.5 four-value list)", "FU-RECORD (set at creation)"],
  ["status", "enum", "yes (no default)", "Applied, Pledged, Committed, Received, Unsuccessful, Cancelled (six values; no system-enforced progression order)", "FU-RECORD (set, advance); FU-STEWARD (read)"],
  ["donorContact", "link to Contact", "conditional (mutually exclusive with donorAccount; exactly one required)", "Used when donor is an individual; linked Contact must have contactType including Donor", "FU-RECORD (set)"],
  ["donorAccount", "link to Account", "conditional (mutually exclusive with donorContact; exactly one required)", "Used when donor is an organization; linked Account must have accountType including Donor/Sponsor", "FU-RECORD (set)"],
  ["amount", "currency", "no (logically required for status = Received and most other statuses)", "Contribution monetary value", "FU-RECORD (set); FU-STEWARD, FU-REPORT (read)"],
  ["applicationDate", "date", "conditional (visible only when contributionType = Grant; logically required for Grant status = Applied)", "Date grant application was submitted", "FU-RECORD (set on Grant creation)"],
  ["commitmentDate", "date", "no", "Date pledge or commitment was made; for Grants, the date of the award letter", "FU-RECORD (set on Pledged or Committed transitions)"],
  ["expectedPaymentDate", "date", "no", "Anticipated payment date for Pledged or Committed Contributions", "FU-RECORD (set)"],
  ["receivedDate", "date", "conditional (logically required for status = Received)", "Date funds were received; for multi-payment grants, the date of the final payment", "FU-RECORD (set on Received transition)"],
  ["designation", "varchar", "no", "Free-form purpose / restriction text (e.g., \"unrestricted operating support,\" \"scholarship fund,\" specific program designation)", "FU-RECORD (set); FU-STEWARD, FU-REPORT (read)"],
  ["campaign", "link to Fundraising Campaign", "no", "Optional link grouping the Contribution with related Contributions for goal tracking and territory attribution", "FU-RECORD (set, change, clear)"],
  ["acknowledgmentSent", "boolean", "no", "Whether acknowledgment / tax receipt has been sent; jointly owned by FU-RECORD (primary write) and FU-STEWARD (catch-up write) per the hybrid ownership model", "FU-RECORD (write); FU-STEWARD (catch-up write); FU-REPORT (read)"],
  ["acknowledgmentDate", "date", "no", "Date acknowledgment / tax receipt was sent; jointly owned per the hybrid ownership model", "FU-RECORD (write); FU-STEWARD (catch-up write); FU-REPORT (read)"],
  ["notes", "wysiwyg", "no", "Free-form Contribution-specific narrative (multi-payment grant disbursement detail, sponsorship recognition obligations, bounce / refund / reversal context). Coexists with the cross-domain Notes Service stream", "FU-RECORD (write); FU-STEWARD (write); FU-REPORT (read)"],
  ["giftType", "enum", "no (visible only when contributionType = Donation)", "Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other (seven values per FU-RECON-DEC-001, FU-RECORD-authoritative)", "FU-RECORD (set on Donation)"],
  ["inKindDescription", "varchar", "no (visible only when contributionType = Donation AND giftType = In-Kind)", "Free-form description of the in-kind contribution", "FU-RECORD (set on in-kind Donation)"],
  ["inKindValuationBasis", "varchar", "no (visible only when contributionType = Donation AND giftType = In-Kind)", "Free-form description of how the in-kind value was determined", "FU-RECORD (set on in-kind Donation)"],
  ["nextGrantDeadline", "date", "no (visible only when contributionType = Grant)", "Date of next pending grant-related obligation (typically a reporting deadline). Updated by FU-RECORD initially and by FU-STEWARD as deadlines are met", "FU-RECORD (set); FU-STEWARD (update, clear)"],
];

const contribTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1700, 1500, 1300, 2460, 2400],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Field", { bold: true, fill: "E7E6E6", width: 1700 }),
      cell("Type", { bold: true, fill: "E7E6E6", width: 1500 }),
      cell("Required", { bold: true, fill: "E7E6E6", width: 1300 }),
      cell("Values / Notes", { bold: true, fill: "E7E6E6", width: 2460 }),
      cell("Defined / Used By", { bold: true, fill: "E7E6E6", width: 2400 }),
    ]}),
    ...contributionFields.map(([f, t, r, v, u]) => new TableRow({ children: [
      cell(f, { width: 1700 }),
      cell(t, { width: 1500 }),
      cell(r, { width: 1300 }),
      cell(v, { width: 2460 }),
      cell(u, { width: 2400 }),
    ]})),
  ],
});
children.push(contribTable);
children.push(blank());

children.push(para("Implementation Notes (from Contribution Entity PRD v1.0, summary):", { bold: true }));
children.push(bullet("contributionType has no default \u2014 the Coordinator must select explicitly at creation per CONTR-DEC-001."));
children.push(bullet("status has no default \u2014 the Coordinator must select explicitly at creation per CONTR-DEC-002."));
children.push(bullet("Multi-payment grants retain a single Contribution record across the entire disbursement period; status remains Committed until the final payment, receivedDate is set to the final payment date, and intermediate payment detail is captured in notes per CONTR-DEC-003."));
children.push(bullet("Acknowledgment is field-level on Contribution rather than a separate Acknowledgment entity per CONTR-DEC-004 (resolves EI-ISS-001). Hybrid ownership between FU-RECORD and FU-STEWARD per FU-RECORD-REQ-015 and FU-STEWARD-REQ-004."));
children.push(bullet("Bounced checks, refunds, and reversals are handled by status edit (typically Cancelled) and notes \u2014 not by offsetting records \u2014 per FU-RECORD-REQ-018."));
children.push(bullet("donorLifetimeGiving and funderLifetimeGiving rollups depend on Contribution.status = Received only; non-Received Contributions do not contribute to lifetime giving per FU-RECORD-REQ-012 and FU-RECORD-REQ-013."));

children.push(para("Relationships:", { bold: true }));
children.push(richBullet([
  { text: "Contribution-to-Contact (donorContact link): ", bold: true },
  { text: "When the donor is an individual." },
]));
children.push(richBullet([
  { text: "Contribution-to-Account (donorAccount link): ", bold: true },
  { text: "When the donor is an organization." },
]));
children.push(richBullet([
  { text: "Contribution-to-Fundraising Campaign (campaign link): ", bold: true },
  { text: "Optional, settable / changeable / clearable at any time per FU-RECORD-REQ-005." },
]));

// ------------------------------
// 4.4 Fundraising Campaign Entity
// ------------------------------
children.push(para("4.4 Fundraising Campaign Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Fundraising Campaign is FU-owned; created and maintained by FU-RECORD. Nine fields total. Full Fundraising-Campaign-Entity coverage is in Fundraising Campaign Entity PRD v1.0. Visibility restricted to Donor / Sponsor Coordinator, Executive Member, and System Administrator per FU-RECORD-REQ-022."
));

const fcFields = [
  ["campaignName", "varchar", "yes", "Free-form campaign name", "FU-RECORD (set)"],
  ["campaignType", "enum", "no", "Annual Appeal, Capital Campaign, Sponsorship, Event, Grant Cycle, Other (per FC-DEC-002)", "FU-RECORD (set); FU-REPORT (read)"],
  ["status", "enum", "yes (no default)", "Planned, Active, Completed, Cancelled (four values; no system-enforced progression order per FC-DEC-003)", "FU-RECORD (set, advance); FU-REPORT (read)"],
  ["goalAmount", "currency", "no", "Optional fundraising target", "FU-RECORD (set); FU-REPORT (read)"],
  ["startDate", "date", "no", "Campaign period start", "FU-RECORD (set); FU-REPORT (read)"],
  ["endDate", "date", "no", "Campaign period end", "FU-RECORD (set); FU-REPORT (read)"],
  ["totalRaised", "currency (calculated)", "system-calculated", "Sum of amount across all Received Contributions linked to this Campaign per FU-RECORD-REQ-011 and FC-DEC-005. Received Contributions linked to Cancelled or Completed Campaigns continue to contribute (preserves historical accuracy)", "FU-RECORD (calculated); FU-REPORT (read)"],
  ["description", "wysiwyg", "no", "Free-form campaign description", "FU-RECORD (set); FU-REPORT (read)"],
  ["geographicServiceArea", "multiEnum (zip code list)", "no", "Campaign-level territory; independent of any Funder Organization Account territory; used in Mentoring Service Delivery by Funding Territory report (campaign view) per FU-REPORT-REQ-017. New field per geographicServiceArea v1.2 carry-forward (FU-RECORD-DAT-047)", "FU-RECORD (set); FU-REPORT (read)"],
];

const fcTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1900, 1500, 1100, 2460, 2400],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Field", { bold: true, fill: "E7E6E6", width: 1900 }),
      cell("Type", { bold: true, fill: "E7E6E6", width: 1500 }),
      cell("Required", { bold: true, fill: "E7E6E6", width: 1100 }),
      cell("Values / Notes", { bold: true, fill: "E7E6E6", width: 2460 }),
      cell("Defined / Used By", { bold: true, fill: "E7E6E6", width: 2400 }),
    ]}),
    ...fcFields.map(([f, t, r, v, u]) => new TableRow({ children: [
      cell(f, { width: 1900 }),
      cell(t, { width: 1500 }),
      cell(r, { width: 1100 }),
      cell(v, { width: 2460 }),
      cell(u, { width: 2400 }),
    ]})),
  ],
});
children.push(fcTable);
children.push(blank());

children.push(para("Notes Service consumed on Fundraising Campaign for narrative context per FU-RECORD-REQ-020. Unlike Contribution, Fundraising Campaign has no in-record notes field \u2014 only the Notes Service stream is used per FC-DEC-008."));

children.push(para("Relationships:", { bold: true }));
children.push(richBullet([
  { text: "Fundraising-Campaign-to-Contribution (inverse of Contribution.campaign link): ", bold: true },
  { text: "Optional one-to-many relationship; a Campaign aggregates zero or more Contributions; a Contribution belongs to zero or one Campaign." },
]));

// ------------------------------
// 4.5 Mentoring-Domain Entities (read-only by FU-REPORT)
// ------------------------------
children.push(para("4.5 Mentoring-Domain Entities (Read-Only by FU-REPORT)", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "Engagement and Session are MN-owned entities consumed read-only by FU-REPORT for the Mentoring Service Delivery by Funding Territory report and other ad-hoc cross-domain queries. Per FU-REPORT-REQ-016, FU-REPORT writes nothing to these entities. Exact field-name binding for the territory-attribution and session-metric queries defers to Phase 9 implementation per FU-REPORT-REQ-019. The fields below identify the categorical roles played in FU-REPORT consumption; precise field names remain owned by the Mentoring-domain Entity PRDs (Engagement Entity PRD v1.2, Session Entity PRD v1.1)."
));

children.push(para("Engagement (read-only, FU-REPORT-DAT-038):", { bold: true }));
children.push(bullet("Link from Engagement to its client Contact \u2014 the Mentoring entity that connects each session to a specific client whose addressPostalCode determines territory match."));
children.push(bullet("Engagement period bounds (start / end) \u2014 used in ad-hoc queries that scope to engagement-active populations."));
children.push(bullet("Engagement status \u2014 used in ad-hoc queries that filter for active engagements."));

children.push(para("Session (read-only, FU-REPORT-DAT-039):", { bold: true }));
children.push(bullet("Session date \u2014 anchors the report period for the Mentoring Service Delivery by Funding Territory report."));
children.push(bullet("Session duration / hours \u2014 source for the total mentoring hours metric in the territory report."));
children.push(bullet("Link from Session to its parent Engagement \u2014 the join path from session to client used for territory attribution."));

children.push(para(
  "Field-name binding for these reads is deferred to Phase 9. The defined-report business descriptions in Section 3.4.4 are authoritative for what the territory report contains; the implementation layer maps that to the actual Mentoring Entity PRD field names."
));

// ==============================
// Section 5 - Decisions Made
// ==============================
children.push(para("5. Decisions Made", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "This section consolidates every decision recorded across the four FU process documents and the four FU-touched Entity PRDs, plus the three new reconciliation decisions made during this session (Phase 7 Domain Reconciliation, 05-01-26). Source-document identifiers are preserved. EI-ISS-001 (acknowledgment / tax-receipt model) is noted as resolved by CONTR-DEC-004."
));

children.push(para("5.1 FU-PROSPECT Decisions", { heading: HeadingLevel.HEADING_2 }));
const fuProspectDecs = [
  ["FU-PROSPECT-DEC-001", "Donor lifecycle uses seven values: Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed. Same enum applied to donorStatus on Contact and funderStatus on Account."],
  ["FU-PROSPECT-DEC-002", "Stage advancement is Coordinator judgment; no system-enforced criteria for transitions between stages."],
  ["FU-PROSPECT-DEC-003", "Active transition is auto-fired by FU-RECORD on first Contribution creation, regardless of contributionType."],
  ["FU-PROSPECT-DEC-004", "Two terminal states beyond Active: Lapsed (cold but re-engageable) and Closed (permanently out)."],
  ["FU-PROSPECT-DEC-005", "Re-engagement of Lapsed or Closed records is at Coordinator discretion: reopen the existing record or create a fresh one."],
  ["FU-PROSPECT-DEC-006", "Restricted-visibility donorNotes (Contact) and funderNotes (Account) for sensitive narrative; field-level security restricts to Donor / Sponsor Coordinator and above."],
  ["FU-PROSPECT-DEC-007", "Per-funder relationship ownership tracked as assignedSponsorCoordinator link field on Account, optional in general but required when funderStatus = Active. Analogous to Partner Account assignedLiaison pattern."],
  ["FU-PROSPECT-DEC-008", "Bulk record creation supported during ramp-up; specific mechanism deferred to Phase 9."],
  ["FU-PROSPECT-DEC-009", "Pipeline view groups records by lifecycle stage with filters (funderType, assignedSponsorCoordinator, date of last status change); exact form deferred to Phase 9."],
];
const fuProspectDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...fuProspectDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(fuProspectDecTable);
children.push(blank());

children.push(para("5.2 FU-RECORD Decisions", { heading: HeadingLevel.HEADING_2 }));
const fuRecordDecs = [
  ["FU-RECORD-DEC-001", "Contribution.contributionType has three values: Donation, Sponsorship, Grant. No default; Coordinator must select explicitly."],
  ["FU-RECORD-DEC-002", "Contribution.status has six values: Applied, Pledged, Committed, Received, Unsuccessful, Cancelled. No default; no system-enforced progression order."],
  ["FU-RECORD-DEC-003", "Multi-payment grants retain a single Contribution record; status remains Committed until final payment; receivedDate is final-payment date; intermediate detail in notes."],
  ["FU-RECORD-DEC-004", "Acknowledgment captured as field-level on Contribution (acknowledgmentSent, acknowledgmentDate); no separate Acknowledgment entity. Resolves EI-ISS-001."],
  ["FU-RECORD-DEC-005", "Acknowledgment fields jointly owned by FU-RECORD (primary write at Contribution creation) and FU-STEWARD (catch-up write during sweep) under hybrid ownership model."],
  ["FU-RECORD-DEC-006", "Bounced checks, refunds, and reversals handled by editing the original record's status (typically to Cancelled) and recording reason in notes; not by offsetting records."],
  ["FU-RECORD-DEC-007", "All Contribution and Fundraising Campaign records retained permanently. No deletion."],
  ["FU-RECORD-DEC-008", "Donor lifetime giving rollups (donorLifetimeGiving on Contact, funderLifetimeGiving on Account, totalRaised on Fundraising Campaign) use Contribution.status = Received only."],
  ["FU-RECORD-DEC-009", "In-kind Donations recorded via giftType = In-Kind plus optional inKindDescription and inKindValuationBasis. No separate In-Kind value of contributionType."],
  ["FU-RECORD-DEC-010", "Recognition obligations for Sponsorships recorded narratively in notes; no structured recognition-obligation tracking."],
  ["FU-RECORD-DEC-011", "Visibility of Contribution and Fundraising Campaign records and the in-record notes fields restricted to Donor / Sponsor Coordinator, Executive Member, and System Administrator."],
  ["FU-RECORD-DEC-012", "Audit trail captures changes to Contribution status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, receivedDate; and to Fundraising Campaign status, goalAmount."],
];
const fuRecordDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...fuRecordDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(fuRecordDecTable);
children.push(blank());

children.push(para("5.3 FU-STEWARD Decisions", { heading: HeadingLevel.HEADING_2 }));
const fuStewardDecs = [
  ["FU-STEWARD-DEC-001", "Stewardship cadence is weekly or bi-weekly Coordinator-driven sweep; no system-fired schedule."],
  ["FU-STEWARD-DEC-002", "Three saved lists drive the sweep: Active Donors and Funders Sweep List (sorted by lastContactDate ascending, nulls first); Acknowledgment-Pending Contributions; Grant Deadlines (sorted by nextGrantDeadline ascending, past-due at top)."],
  ["FU-STEWARD-DEC-003", "Active to Lapsed transition is purely Coordinator judgment; no system-enforced thresholds, no automatic transitions, no system-suggested candidates. Reasoning recorded narratively; no structured lapse-reason field."],
  ["FU-STEWARD-DEC-004", "lastContactDate manually set after each outreach; no auto-population from any source."],
  ["FU-STEWARD-DEC-005", "FU-STEWARD is the catch-up write path for acknowledgment fields under hybrid ownership with FU-RECORD."],
  ["FU-STEWARD-DEC-006", "Donor-specific impact reports composed outside the CRM; system records the fact in donorNotes or funderNotes; reports themselves are not stored in the CRM."],
  ["FU-STEWARD-DEC-007", "No system-fired alerts, notifications, reminders, or scheduled prompts in support of FU-STEWARD."],
  ["FU-STEWARD-DEC-008", "Read-only access to Mentoring-domain entities (Engagement, Session) for donor-specific impact reporting and grant-compliance reporting."],
];
const fuStewardDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...fuStewardDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(fuStewardDecTable);
children.push(blank());

children.push(para("5.4 FU-REPORT Decisions", { heading: HeadingLevel.HEADING_2 }));
const fuReportDecs = [
  ["FU-REPORT-DEC-001", "Ten defined reports as listed in Section 3.4.4."],
  ["FU-REPORT-DEC-002", "Defined reports presented as live, interactive views; per-report views accessible from a list, not via a top-level dashboard."],
  ["FU-REPORT-DEC-003", "Two packet types: monthly informational (management review) and quarterly formal (board meetings); identical content, differ only by cadence and audience."],
  ["FU-REPORT-DEC-004", "Packets produced as a single formatted document file; distribution by Coordinator outside the system; no automatic scheduled production."],
  ["FU-REPORT-DEC-005", "Annual Donor Giving Summaries: one formatted document file per qualifying donor; no minimum threshold; individual donors only (Contacts), not organizational funders; Coordinator-triggered, typically early January for prior calendar year."],
  ["FU-REPORT-DEC-006", "FU-REPORT is read-only across all consumed entities; writes nothing."],
  ["FU-REPORT-DEC-007", "Ad-hoc reporting capability provided to the Donor / Sponsor Coordinator and the Executive Member; supports filtering, grouping, export."],
  ["FU-REPORT-DEC-008", "Field-level and record-level visibility rules apply consistently across defined reports, packets, ad-hoc reports, and Annual Donor Giving Summaries."],
  ["FU-REPORT-DEC-009", "Territory-based attribution uses zip code lists on Account.geographicServiceArea (funder-level) and Fundraising Campaign.geographicServiceArea (campaign-level); independently maintained; territory overlap supported."],
  ["FU-REPORT-DEC-010", "Standardized grant-compliance report generation out of scope as a defined deliverable; available through ad-hoc reporting."],
  ["FU-REPORT-DEC-011", "Standardized sponsor-recognition reports out of scope as a defined deliverable; recognition obligations captured narratively in Contribution notes; available through ad-hoc reporting."],
];
const fuReportDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...fuReportDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(fuReportDecTable);
children.push(blank());

children.push(para("5.5 Entity-Level Decisions Affecting FU", { heading: HeadingLevel.HEADING_2 }));
const entityDecs = [
  ["CONTR-DEC-001", "Contribution.contributionType three-value enum (Donation, Sponsorship, Grant). No default."],
  ["CONTR-DEC-002", "Contribution.status six-value enum. No default."],
  ["CONTR-DEC-003", "Multi-payment grants: single record, intermediate detail in notes."],
  ["CONTR-DEC-004", "Acknowledgment is field-level on Contribution (acknowledgmentSent, acknowledgmentDate); resolves EI-ISS-001."],
  ["CONTR-DEC-005", "Bounce / refund / reversal handled by status edit and notes."],
  ["CONTR-DEC-006", "Permanent retention; no deletion."],
  ["CONTR-DEC-007", "Lifetime-giving rollups depend on status = Received only."],
  ["CONTR-DEC-008", "In-kind via giftType = In-Kind; no separate contributionType."],
  ["CONTR-DEC-009", "Recognition obligations narrative-only."],
  ["CONTR-DEC-010", "Restricted visibility per FU-RECORD-REQ-021."],
  ["FC-DEC-001", "Fundraising Campaign campaignName required at creation."],
  ["FC-DEC-002", "campaignType six-value enum (Annual Appeal, Capital Campaign, Sponsorship, Event, Grant Cycle, Other)."],
  ["FC-DEC-003", "Campaign status four-value enum (Planned, Active, Completed, Cancelled). No system-enforced progression order."],
  ["FC-DEC-004", "Optional one-to-many Contribution-to-Campaign linkage."],
  ["FC-DEC-005", "totalRaised based solely on Contribution.status = Received; Cancelled / Completed Campaigns continue to show historical totalRaised."],
  ["FC-DEC-006", "Optional goalAmount, startDate, endDate fields."],
  ["FC-DEC-007", "geographicServiceArea on Fundraising Campaign for territory-based attribution; campaign-level, independent of Account-level territory."],
  ["FC-DEC-008", "Notes Service stream only on Fundraising Campaign; no in-record notes field."],
  ["FC-DEC-009", "Restricted visibility per FU-RECORD-REQ-022."],
  ["CON-DEC-017", "Contact donor-specific fields (donorStatus, donorNotes, donorLifetimeGiving, lastContactDate) visible only when contactType has Donor."],
  ["CON-DEC-018", "donorStatus default = Prospect when Donor appended to contactType; closes CON-ISS-003."],
  ["ACT-DEC-013", "Account donor / sponsor-specific fields (funderStatus, funderType, funderNotes, funderLifetimeGiving, lastContactDate, assignedSponsorCoordinator) visible only when accountType has Donor/Sponsor."],
  ["ACT-DEC-014", "geographicServiceArea on Account: multiEnum zip code list, visibility expanded to Partner and Donor/Sponsor accountType per geographicServiceArea v1.2 carry-forward."],
];
const entityDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...entityDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(entityDecTable);
children.push(blank());

children.push(para("5.6 Reconciliation Decisions (New, this session)", { heading: HeadingLevel.HEADING_2 }));
const reconDecs = [
  ["FU-RECON-DEC-001", "Contribution.giftType enum at the Domain PRD level adopts the FU-RECORD-authoritative seven-value list: Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other. Resolves the divergence with FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 (which listed Cash, Check, Credit Card, ACH, Wire Transfer, Stock, In-Kind, Other). Carry-forward to FU-REPORT recorded as FU-RECON-ISS-001."],
  ["FU-RECON-DEC-002", "Contribution.contributionType three-value enum (Donation, Sponsorship, Grant) adopted at the Domain PRD level, superseding the Entity Inventory v1.5 four-value list (which included Pledge) and the FU Domain Overview v1.0 working position. Pledged is a status, not a type. Carry-forward to Entity Inventory recorded as FU-RECON-ISS-002."],
  ["FU-RECON-DEC-003", "An Active to Closed transition on donorStatus or funderStatus is permitted as a free-form Coordinator transition under FU-PROSPECT-REQ-005, handled within FU-PROSPECT's Closed-record framework. FU-STEWARD-REQ-003's Active-to-Lapsed framing reads descriptively (the only routine exit FU-STEWARD performs), not prohibitively. Reasoning recorded narratively in donorNotes or funderNotes."],
];
const reconDecTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }), cell("Decision", { bold: true, fill: "E7E6E6", width: 6960 })]}),
    ...reconDecs.map(([id, d]) => new TableRow({ children: [cell(id, { width: 2400 }), cell(d, { width: 6960 })]})),
  ],
});
children.push(reconDecTable);
children.push(blank());

// ==============================
// Section 6 - Open Issues
// ==============================
children.push(para("6. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "Eight open issues across the Fundraising domain after Phase 7 reconciliation. Source process documents have been reviewed and the issues consolidated here. Three reconciliation issues are new (FU-RECON-ISS-001, FU-RECON-ISS-002, FU-RECON-ISS-003) and document carry-forward work to be performed outside this Domain PRD."
));

const openIssues = [
  ["FU-PROSPECT-ISS-001", "FU-PROSPECT v1.0 Section 6", "Pipeline-view exact implementation form (per-status views, Kanban-style board, list with status filter, or other) deferred to Phase 9.", "Open \u2014 Phase 9"],
  ["FU-REPORT-ISS-002", "FU-REPORT v1.0 Section 8", "Mentoring Service Delivery by Funding Territory report \u2014 exact field-name binding to Engagement and Session entities deferred to Phase 9.", "Open \u2014 Phase 9"],
  ["FU-REPORT-ISS-003", "FU-REPORT v1.0 Section 8", "Visual layout, formatting, charting library, file format, and interactive controls for live views, packets, defined reports, and Annual Donor Giving Summaries deferred to Phase 9.", "Open \u2014 Phase 9"],
  ["FU-REPORT-ISS-004", "FU-REPORT v1.0 Section 8", "Ad-hoc reporting export formats (PDF, CSV, Excel, other) deferred to Phase 9.", "Open \u2014 Phase 9"],
  ["CON-ISS-004", "Contact Entity PRD v1.7", "Contact donorNotes wysiwyg field-level security implementation; specific role-permission matrix deferred to Phase 9.", "Open \u2014 Phase 9"],
  ["FU-RECON-ISS-001", "Phase 7 reconciliation 05-01-26", "Carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 to align giftType with the FU-RECORD-authoritative seven-value list (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other) per FU-RECON-DEC-001. Bundle with end-of-Phase-7 carry-forward sweep.", "Open \u2014 carry-forward"],
  ["FU-RECON-ISS-002", "Phase 7 reconciliation 05-01-26", "Carry-forward to Entity Inventory v1.5 \u2192 v1.6 to align contributionType with the three-value enum (Donation, Sponsorship, Grant) per FU-RECON-DEC-002, removing Pledge as a contributionType value. Bundle with end-of-Phase-7 carry-forward sweep.", "Open \u2014 carry-forward"],
  ["FU-RECON-ISS-003", "Phase 7 reconciliation 05-01-26", "Northeast Ohio zip code master list consolidated deferral. Cross-references FU-REPORT-ISS-001, FC-ISS-001, FU-REPORT-REQ-027. Master list and its maintenance ownership are Phase 9 implementation matters.", "Open \u2014 Phase 9"],
];

const openIssTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2200, 2200, 3960, 1000],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 2200 }),
      cell("Source", { bold: true, fill: "E7E6E6", width: 2200 }),
      cell("Description", { bold: true, fill: "E7E6E6", width: 3960 }),
      cell("Status", { bold: true, fill: "E7E6E6", width: 1000 }),
    ]}),
    ...openIssues.map(([id, src, desc, st]) => new TableRow({ children: [
      cell(id, { width: 2200 }),
      cell(src, { width: 2200 }),
      cell(desc, { width: 3960 }),
      cell(st, { width: 1000 }),
    ]})),
  ],
});
children.push(openIssTable);
children.push(blank());

children.push(para(
  "Note: EI-ISS-001 (acknowledgment / tax-receipt model) was resolved by CONTR-DEC-004 during FU-RECORD development and is not carried as an open issue. The resolution was field-level capability on Contribution (acknowledgmentSent, acknowledgmentDate) under hybrid FU-RECORD / FU-STEWARD ownership rather than a separate Acknowledgment entity."
));

// ==============================
// Section 7 - Interview Transcript
// ==============================
children.push(para("7. Interview Transcript", { heading: HeadingLevel.HEADING_1 }));
children.push(para(
  "This section captures the reconciliation conversation conducted on 05-01-26 between Doug Bower (Donor / Sponsor Coordinator and project lead) and Claude. Process-level interview transcripts remain in the source process documents (FU-PROSPECT v1.0 Section 9, FU-RECORD v1.2 Section 10, FU-STEWARD v1.0 Section 9, FU-REPORT v1.0 Section 9). What follows is the eleven-topic conflict-detection sweep performed against \u00a71.1 of the Domain Reconciliation Guide v1.5, with inline Decision callouts cross-referencing FU-RECON-DEC-001, FU-RECON-DEC-002, and FU-RECON-DEC-003."
));

children.push(para("Topic 1 \u2014 Contribution.giftType enum value list", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Conflict detected. FU-RECORD v1.2 (Contribution Entity PRD v1.0) defines giftType as a seven-value enum: Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other. FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 lists eight values with overlap but with differences: Cash, Check, Credit Card, ACH, Wire Transfer, Stock, In-Kind, Other. Wire Transfer and Stock appear only in FU-REPORT; Online Payment appears only in FU-RECORD. Which list is authoritative?" },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "FU-RECORD wins. The seven-value list is what we agreed during FU-RECORD development; FU-REPORT was sloppily transcribed. Online Payment is a real distinct mechanism for us; Wire Transfer and Stock have never come up in actual giving and we shouldn't pre-specify them. Carry forward to FU-REPORT." },
]));
children.push(richPara([
  { text: "[FU-RECON-DEC-001] ", bold: true, italic: true },
  { text: "Contribution.giftType enum at the Domain PRD level adopts the FU-RECORD-authoritative seven-value list. Carry-forward to FU-REPORT v1.0 Section 7.3 FU-REPORT-DAT-027 logged as FU-RECON-ISS-001.", italic: true },
]));

children.push(para("Topic 2 \u2014 donorStatus and funderStatus seven-value enum verification", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying donorStatus on Contact and funderStatus on Account. FU-PROSPECT defines a seven-value enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed). Contact Entity PRD v1.7 Section 3.8 lists the same seven values. Account Entity PRD v1.8 Section 3.4 lists the same seven values. FU-RECORD references the enum without redefinition. FU-STEWARD references it. FU-REPORT references it. No conflict; consistent across all sources." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed." },
]));

children.push(para("Topic 3 \u2014 Contribution.status six-value enum verification", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying Contribution.status. FU-RECORD defines six values: Applied, Pledged, Committed, Received, Unsuccessful, Cancelled. Contribution Entity PRD v1.0 lists the same six. FU-STEWARD references status = Received in saved-list filters and acknowledgment field gating. FU-REPORT references status = Received for rollup eligibility, status in (Committed, Received) for grant deadlines, and the non-terminal statuses (Applied, Pledged, Committed) for Open Pipeline Value. No conflict; consistent." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed." },
]));

children.push(para("Topic 4 \u2014 Hybrid acknowledgment ownership verification", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying hybrid acknowledgment ownership across FU-RECORD-REQ-015, FU-STEWARD-REQ-004, and CONTR-DEC-004. FU-RECORD-REQ-015 frames the model: FU-RECORD owns the primary write path at Contribution creation; FU-STEWARD owns the catch-up write path during the sweep. FU-STEWARD-REQ-004 mirrors this and adds the Acknowledgment-Pending Contributions saved list for catch-up triggering. CONTR-DEC-004 documents that this resolves EI-ISS-001 and that acknowledgment is field-level on Contribution rather than a separate Acknowledgment entity. No conflict." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed. The hybrid pattern is clean." },
]));

children.push(para("Topic 5 \u2014 Fundraising Campaign.status four-value enum verification", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying Fundraising Campaign.status. FU-RECORD defines four values: Planned, Active, Completed, Cancelled. Fundraising Campaign Entity PRD v1.0 confirms. FU-REPORT references these in Open Pipeline Value and Mentoring Service Delivery by Funding Territory. FC-DEC-005 explicitly preserves Received Contribution rollup into totalRaised even when the linked Campaign is Cancelled or Completed (historical accuracy). No conflict." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed." },
]));

children.push(para("Topic 6 \u2014 Notes Service entity coverage", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying Notes Service usage. Three patterns appear across FU entities. Pattern A (Contact and Account): Notes Service stream coexists with restricted-visibility wysiwyg fields (donorNotes, funderNotes) for sensitive narrative \u2014 the stream for general activity, the wysiwyg for sensitive context. Pattern B (Contribution): Notes Service stream coexists with an in-record notes field for Contribution-specific narrative (multi-payment grant disbursement detail, sponsorship recognition obligations, bounce / refund / reversal context). Pattern C (Fundraising Campaign): Notes Service stream only; no in-record narrative field per FC-DEC-008. Three different patterns, but each is internally consistent and explicitly documented. No conflict." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed. Three patterns by entity type, each appropriate to its use case." },
]));

children.push(para("Topic 7 \u2014 contributionType discriminator evolution", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Conflict detected. Entity Inventory v1.5 lists Contribution.contributionType as a four-value enum: Donation, Sponsorship, Grant, Pledge. FU-RECORD v1.2 and Contribution Entity PRD v1.0 use a three-value enum: Donation, Sponsorship, Grant. The FU Domain Overview v1.0 working position appears closer to the four-value list but is not explicit. The three-value enum was the explicit decision in FU-RECORD development \u2014 Pledge is a status, not a type \u2014 and the Pledged value of Contribution.status captures pledged commitments. Which is authoritative?" },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Three values is correct. Pledge as a contributionType doesn't model anything we don't already model with the Pledged status. Carry forward to Entity Inventory." },
]));
children.push(richPara([
  { text: "[FU-RECON-DEC-002] ", bold: true, italic: true },
  { text: "Contribution.contributionType three-value enum (Donation, Sponsorship, Grant) adopted at the Domain PRD level. Entity Inventory v1.5 \u2192 v1.6 carry-forward logged as FU-RECON-ISS-002.", italic: true },
]));

children.push(para("Topic 8 \u2014 geographicServiceArea independence", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying geographicServiceArea on Account vs Fundraising Campaign. Account.geographicServiceArea is funder-level territory; Fundraising Campaign.geographicServiceArea is campaign-level territory. They are independently maintained \u2014 a Contribution can be linked to a Campaign with one territory and to a donor Account with a different territory. FU-REPORT-REQ-017 confirms separate match logic for the funder-level view and the campaign-level view of the Mentoring Service Delivery by Funding Territory report. No conflict; the independence is intentional." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed." },
]));

children.push(para("Topic 9 \u2014 Lifetime giving rollup pattern", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying lifetime-giving rollups. Contribution Entity PRD v1.0 Implementation Note 10 is the source of truth: rollups depend on Contribution.status = Received only. donorLifetimeGiving on Contact is the sum across donorContact-linked Received Contributions per FU-RECORD-REQ-012; funderLifetimeGiving on Account is the sum across donorAccount-linked Received Contributions per FU-RECORD-REQ-013; totalRaised on Fundraising Campaign is the sum across campaign-linked Received Contributions per FU-RECORD-REQ-011. All three rollups are status-gated to Received only; non-Received Contributions do not contribute. Three entities, one rule, consistently applied. No conflict." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed. Implementation Note 10 is authoritative." },
]));

children.push(para("Topic 10 \u2014 Active to Closed transition gap", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Possible cross-process gap. FU-PROSPECT-REQ-005 establishes free-form Coordinator transitions across the seven-value lifecycle field. FU-STEWARD-REQ-003 says: \"Active to Lapsed is the only relationship exit FU-STEWARD performs.\" Read literally, this could be construed to forbid Active to Closed. In practice the Coordinator may discover an Active relationship that needs immediate Closed status \u2014 ethics issue, organization shut down, permanent loss of alignment \u2014 rather than a Lapsed wait. Should we forbid the direct Active-to-Closed transition or permit it under FU-PROSPECT-REQ-005?" },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Permit it. FU-STEWARD-REQ-003's framing is descriptive of the routine sweep behavior, not a system prohibition. Read it as: the only routine exit FU-STEWARD performs. Exceptional cases use the FU-PROSPECT free-form rule, with Coordinator reasoning recorded narratively. Don't add new requirement language; clarify the framing in the Domain PRD." },
]));
children.push(richPara([
  { text: "[FU-RECON-DEC-003] ", bold: true, italic: true },
  { text: "An Active to Closed transition is permitted as a free-form Coordinator transition under FU-PROSPECT-REQ-005 in exceptional cases, handled within FU-PROSPECT's Closed-record framework. FU-STEWARD-REQ-003's Active-to-Lapsed framing reads descriptively, not prohibitively.", italic: true },
]));

children.push(para("Topic 11 \u2014 Persona role verification", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Verifying personas across all four FU processes. Three personas: MST-PER-010 Donor / Sponsor Coordinator (sole or primary operator across all four), MST-PER-002 Executive Member (read-only consumer plus informal participant), MST-PER-001 System Administrator (implicit through visibility rules, not enumerated as a process operator in any FU process Section 3). Roles consistent across FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT. No conflict." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed. Three-persona pattern is the right scope for Fundraising." },
]));

children.push(para("Step 1.6 \u2014 Required-Field Completeness", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "Required-field completeness check. Required fields with enum types: contactType (multiEnum, full value list defined in Contact Entity PRD); accountType (multiEnum, full value list defined in Account Entity PRD); donorStatus (seven values, fully enumerated); funderStatus (seven values, fully enumerated); funderType (six values, fully enumerated); contributionType (three values, fully enumerated post-FU-RECON-DEC-002); Contribution.status (six values, fully enumerated); Fundraising Campaign.status (four values, fully enumerated); Fundraising Campaign.campaignType (six values, fully enumerated). All required enum-type fields have complete value lists. The optional Account.geographicServiceArea and Fundraising Campaign.geographicServiceArea reference a Northeast Ohio zip code master list that is deferred to Phase 9 \u2014 but they are optional fields, so the deferral does not block Section 1.6. PASS." },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Confirmed. Move to Section 1.7." },
]));

children.push(para("Step 1.7 \u2014 Master-list deferral consolidation", { heading: HeadingLevel.HEADING_3 }));
children.push(richPara([
  { text: "Claude: ", bold: true },
  { text: "The Northeast Ohio zip code master list deferral appears in three places: FU-REPORT-ISS-001, FC-ISS-001, and FU-REPORT-REQ-027. Consolidating into a single reconciliation issue for clarity in the Domain PRD?" },
]));
children.push(richPara([
  { text: "Doug: ", bold: true },
  { text: "Yes. One issue, cross-referencing the three sources." },
]));
children.push(richPara([
  { text: "[FU-RECON-ISS-003] ", bold: true, italic: true },
  { text: "Northeast Ohio zip code master list consolidated deferral. Cross-references FU-REPORT-ISS-001, FC-ISS-001, FU-REPORT-REQ-027.", italic: true },
]));

children.push(para("Reconciliation Summary", { heading: HeadingLevel.HEADING_3 }));
children.push(para(
  "Eleven conflict-detection topics, three reconciliation decisions (FU-RECON-DEC-001, FU-RECON-DEC-002, FU-RECON-DEC-003), three reconciliation issues (FU-RECON-ISS-001, FU-RECON-ISS-002, FU-RECON-ISS-003). All conflicts resolved or recorded as carry-forward. All required-field enum value lists are complete. All personas verified consistent. The four FU processes are coherent at the Domain PRD level. Phase 8 Stakeholder Review is the next phase for this document."
));

// ==============================
// Change Log
// ==============================
children.push(para("Change Log", { heading: HeadingLevel.HEADING_1 }));

const changeLogEntries = [
  ["1.0", "05-01-26 04:55", "Initial release. Phase 7 Domain Reconciliation output, produced from a single-session reconciliation conducted 05-01-26 per crmbuilder/PRDs/process/interviews/guide-domain-reconciliation.md v1.5. Seven sections: Domain Overview (mission tie-in, scope and boundaries, flat-domain structure, four-process inventory and lifecycle, cross-domain dependencies including Mentoring-domain read-only consumption, implementation-tier summary); Personas (three: MST-PER-010 Donor / Sponsor Coordinator as sole or primary operator, MST-PER-002 Executive Member as read-only consumer and informal participant, MST-PER-001 System Administrator as implicit through visibility rules); Business Processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT \u2014 each with eight subsections covering purpose, triggers, personas, workflow, completion, requirements, process data, data collected; conflict resolutions applied: giftType seven-value list per FU-RECON-DEC-001, contributionType three-value enum per FU-RECON-DEC-002, Active-to-Closed transition framing per FU-RECON-DEC-003); Data Reference (consolidated by entity \u2014 Contact, Account, Contribution, Fundraising Campaign, plus Engagement and Session for the Mentoring Service Delivery by Funding Territory report); Decisions Made (compiled from all four process documents and the four Entity PRDs, plus the three FU-RECON-DEC reconciliation decisions; EI-ISS-001 noted as resolved by CONTR-DEC-004); Open Issues (eight entries: FU-PROSPECT-ISS-001, FU-REPORT-ISS-002, FU-REPORT-ISS-003, FU-REPORT-ISS-004, CON-ISS-004, FU-RECON-ISS-001, FU-RECON-ISS-002, FU-RECON-ISS-003); Interview Transcript (eleven topic-organized Q/A entries covering the conflict-detection sweep, with inline Decision callouts cross-referencing FU-RECON-DEC-001 / 002 / 003). Three reconciliation decisions recorded; three carry-forward items logged. Status: Draft \u2014 awaiting Phase 8 Stakeholder Review."],
];

const changeLogTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [800, 1500, 7060],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell("Version", { bold: true, fill: "E7E6E6", width: 800 }),
      cell("Date", { bold: true, fill: "E7E6E6", width: 1500 }),
      cell("Changes", { bold: true, fill: "E7E6E6", width: 7060 }),
    ]}),
    ...changeLogEntries.map(([v, d, c]) => new TableRow({ children: [
      cell(v, { width: 800 }),
      cell(d, { width: 1500 }),
      cell(c, { width: 7060 }),
    ]})),
  ],
});
children.push(changeLogTable);
children.push(blank());

// ==============================
// Document construction
// ==============================
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0, format: LevelFormat.BULLET, text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "ordered",
        levels: [
          {
            level: 0, format: LevelFormat.DECIMAL, text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children,
    },
  ],
});

const outPath = path.join(__dirname, "CBM-Domain-PRD-Fundraising.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
}).catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
