// CBM Fundraising Domain — FU-REPORT Process Document Generator
// Produces: FU-REPORT.docx (v1.0)
// Phase 4b output per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6

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

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text })],
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
      new TextRun({ text: "FU-REPORT \u2014 Fundraising Reporting", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("04-30-26 04:58", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU-REPORT", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Category", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Asynchronous reporting (read-only across upstream entities)", { width: 7020 })] }),
    new TableRow({ children: [cell("Implementation Tier", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Enhancement (per Master PRD Section 3.6)", { width: 7020 })] }),
    new TableRow({
      children: [
        cell("Depends On", { bold: true, fill: "E7E6E6", width: 2340 }),
        cell("CBM-Master-PRD.docx v2.5, CBM-Entity-Inventory.docx v1.5, CBM-Domain-Overview-Fundraising.docx v1.0, FU-PROSPECT.docx v1.0, FU-RECORD.docx v1.2, FU-STEWARD.docx v1.0, Contact-Entity-PRD.docx v1.6, Account-Entity-PRD.docx v1.7, Engagement-Entity-PRD.docx v1.2, Session-Entity-PRD.docx v1.1", { width: 7020 }),
      ],
    }),
  ],
});
children.push(metaTable);
children.push(blank());

// ==============================
// 1. Process Purpose
// ==============================
children.push(para("1. Process Purpose", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-REPORT is the reporting process for the Fundraising domain. It produces analytics and outputs that support board oversight of fundraising performance, working visibility for the Donor / Sponsor Coordinator between sweep cycles, year-end giving summaries for individual donors, and ad-hoc data access combining fundraising data with program-impact data from the Mentoring domain. FU-REPORT consumes the records produced by FU-PROSPECT, FU-RECORD, and FU-STEWARD, plus the Engagement and Session records produced by the Mentoring domain, and presents that data in defined reports, on-demand live views, scheduled packets, and ad-hoc queries."
  )
);
children.push(blank());
children.push(
  para(
    "FU-REPORT is read-only across every entity it consumes. It creates no records, transitions no statuses, and writes nothing back to Contact, Account, Contribution, Fundraising Campaign, Engagement, or Session. Its outputs are presentations of data \u2014 reports, packets, formatted document files \u2014 not changes to data."
  )
);
children.push(blank());
children.push(
  para(
    "FU-REPORT has no completion state. It is a perpetual reporting capability that operates indefinitely over the life of the Fundraising domain. Each individual report run, packet generation, live-view session, and Annual Donor Giving Summary generation is an operational unit, not a process completion. The capability is exercised whenever a consumer needs information; it is not finished."
  )
);
children.push(blank());

children.push(para("1.1 Implementation Tier and Scope Constraints", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-REPORT is the only Enhancement-tier process in the Fundraising domain. The Master PRD Section 3.6 defines Enhancement-tier processes as valuable but deferrable \u2014 the Fundraising domain can operate without FU-REPORT for some period after Year 1 go-live, with a reduced reporting capability or with manual data extraction. This document defines the full FU-REPORT scope; Phase 9 implementation will determine which capabilities deliver at Year 1 and which defer."
  )
);
children.push(blank());
children.push(
  para(
    "Two scope constraints surfaced during this interview that narrow the document from the original Fundraising Domain Overview description. First, standardized grant-compliance report generation is out of scope as a defined deliverable. Funder-template-formatted, scheduled compliance reports are not produced by FU-REPORT. Grant data \u2014 contributions, deadlines, payments, program-impact metrics \u2014 remains accessible through ad-hoc reporting, so a Coordinator can still pull grant data manually to assemble compliance submissions. Second, sponsor recognition reports are out of scope as a defined deliverable for the same reason: recognition obligations are captured narratively in Contribution notes per FU-RECORD, with no structured field to query against, so a defined sponsor-recognition report would have to be a free-text notes display. Recognition data is accessible through ad-hoc reporting when needed."
  )
);
children.push(blank());

// ==============================
// 2. Process Triggers
// ==============================
children.push(para("2. Process Triggers", { heading: HeadingLevel.HEADING_1 }));
children.push(blank());

children.push(para("2.1 Preconditions", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "No record-level preconditions. FU-REPORT operates against whatever records exist in the system at the moment a report is run. An empty database produces empty reports; a populated database produces populated reports. The process does not require any specific record to be in any specific state."
  )
);
children.push(blank());
children.push(
  para(
    "One persona-level precondition: the requesting user must hold a persona with FU-REPORT access. The Donor / Sponsor Coordinator and the Executive Member have access; other personas do not. The System Administrator has implicit access through the platform-administrator role and is not enumerated separately, consistent with the Fundraising Domain pattern established by FU-PROSPECT, FU-RECORD, and FU-STEWARD."
  )
);
children.push(blank());

children.push(para("2.2 Required Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "No required data inputs from the requesting user beyond the parameters of the requested report \u2014 typically a reporting period, a filter selection, or both. Each defined report specifies its parameters in Section 4. Annual Donor Giving Summaries require only a calendar year. Pipeline Status and Lifetime Value Distribution are point-in-time and require no period parameter. Other defined reports accept a configurable reporting period."
  )
);
children.push(blank());

children.push(para("2.3 Initiation Mechanism", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Manual only. The Donor / Sponsor Coordinator and the Executive Member initiate FU-REPORT operations on demand. The Coordinator triggers packet production, runs ad-hoc queries, and produces Annual Donor Giving Summaries. Both personas access live views of defined reports between meetings. The system maintains the underlying data continuously but does not produce any FU-REPORT output without manual initiation."
  )
);
children.push(blank());
children.push(
  para(
    "There is no system-fired automation in FU-REPORT. No reports run on schedule; no packets are produced automatically; no Annual Donor Giving Summaries generate on a system-fired event; no notifications fire when data crosses a threshold; no emails go out without Coordinator action. This continues the no-system-fired-output position established by FU-STEWARD-REQ-009 and extends it across the entire reporting capability."
  )
);
children.push(blank());

children.push(para("2.4 Initiating Persona", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Two personas initiate FU-REPORT operations. The Donor / Sponsor Coordinator (MST-PER-010) is the primary operator: triggers packet production on demand, runs ad-hoc queries, generates Annual Donor Giving Summaries, and accesses live views between meetings. The Executive Member (MST-PER-002) accesses live views on demand for board-level review between board meetings; the Executive Member typically does not initiate packet production, run ad-hoc queries, or trigger Annual Donor Giving Summary generation, but is not technically prevented from doing so. No other personas initiate FU-REPORT work."
  )
);
children.push(blank());

// ==============================
// 3. Personas Involved
// ==============================
children.push(para("3. Personas Involved", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Two personas from the Master PRD have roles in FU-REPORT, matching the persona pattern established by FU-PROSPECT, FU-RECORD, and FU-STEWARD. One is the primary operator across all FU-REPORT activities. One is the primary audience for board-level packets and a consumer of live views between meetings. No other personas participate."
  )
);
children.push(blank());

children.push(para("3.1 MST-PER-010 \u2014 Donor / Sponsor Coordinator (Primary operator)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Primary operator of FU-REPORT. Triggers packet production on the cadence the board uses (monthly informational packet for management review, quarterly formal packet ahead of board meetings). Runs ad-hoc queries against fundraising data and Mentoring-domain program-impact data when staff or board members request information that is not produced by any of the ten defined reports. Generates Annual Donor Giving Summaries at the start of each January for the prior calendar year and distributes the per-donor formatted document files to donors outside the system. Accesses defined-report live views as a working tool between sweeps. Has full authority \u2014 no approvals required for any FU-REPORT operation."
  )
);
children.push(blank());

children.push(para("3.2 MST-PER-002 \u2014 Executive Member (Primary audience and live-view consumer)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Primary audience for FU-REPORT outputs at the board level. Reviews the monthly informational packet for management oversight between board meetings and reviews the quarterly formal packet at board meetings. Accesses defined-report live views on demand between meetings when board oversight prompts a question that the most recent packet does not answer. Has access to ad-hoc reporting capability but typically does not run ad-hoc queries; the Coordinator runs ad-hoc queries at the Executive Member\u2019s request as needed. Does not initiate packet production or Annual Donor Giving Summary generation. Does not transition any record between lifecycle stages \u2014 FU-REPORT writes nothing to entities, so no transitions are possible."
  )
);
children.push(blank());
children.push(
  para(
    "No other personas participate in FU-REPORT. The Mentor Administrator, Client Recruiter, Partner Coordinator, Content and Event Administrator, and other coordinators do not have FU-REPORT access even when their work touches Contact, Account, or Mentoring-domain records. Restricted-visibility fields (donorNotes, funderNotes) and restricted record-level visibility on Contribution and Fundraising Campaign per FU-PROSPECT-REQ-013, FU-RECORD-REQ-021, and FU-RECORD-REQ-022 carry through to FU-REPORT outputs \u2014 a user who cannot see a field or record in the source entities cannot see it in a report either."
  )
);
children.push(blank());

// ==============================
// 4. Process Workflow
// ==============================
children.push(para("4. Process Workflow", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-REPORT operates as four interleaved consumption patterns rather than a single sequential workflow. Each pattern is initiated independently as the consumer\u2019s needs arise, and the patterns operate against the same underlying data set. The four patterns are: defined-report consumption through live views, packet production, Annual Donor Giving Summary generation, and ad-hoc reporting. The full set of ten defined reports is the substantive content of the process; the patterns describe the four ways those reports and their outputs are consumed."
  )
);
children.push(blank());

children.push(para("4.1 Defined-Report Consumption \u2014 Live Views", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator and the Executive Member access defined reports as live, interactive views on demand. Each defined report has its own live view, accessible from a list. The user selects the report they want to see; the system renders the current data for the user-selected reporting period. There is no top-level dashboard summarizing the ten reports. The Coordinator uses the live views as a working tool throughout the month to monitor the population of donors and funders and the state of contributions and campaigns. The Executive Member uses the live views between board meetings to answer specific oversight questions that arise after the most recent packet was produced."
  )
);
children.push(blank());

children.push(para("4.2 Packet Production", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator triggers packet production on demand. Two packet types are supported: the monthly informational packet for management review (typically produced at the start of each month for the prior calendar month) and the quarterly formal packet for board meetings (typically produced ahead of each board meeting for the prior calendar quarter). The system assembles all ten defined reports for the specified reporting period into a single formatted document file. The two packet types contain identical content sets and differ only in cadence and audience formality. The Coordinator distributes the produced file to consumers outside the system through whatever channel the board uses \u2014 printed and mailed, emailed, posted to a board portal, or other."
  )
);
children.push(blank());
children.push(
  para(
    "Packet production is never automatic. The Coordinator initiates every packet, even when the cadence is regular. There are no scheduled packets, no system-fired generation events, and no automatic distribution. This is consistent with the no-system-fired-output position established by FU-STEWARD."
  )
);
children.push(blank());

children.push(para("4.3 Annual Donor Giving Summary Generation", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator triggers Annual Donor Giving Summary generation on demand, typically in early January for the prior calendar year. The system identifies every individual donor (Contact records with contactType including Donor) who has at least one Received contribution with receivedDate falling in the calendar year, and produces one formatted document file per qualifying donor. Each summary lists the donor\u2019s Received contributions for the year (date, amount, designation, gift type, and Fundraising Campaign when linked) along with the donor\u2019s total Received giving for the year and the donor\u2019s name and mailing address. The summary is produced for every qualifying donor regardless of giving amount; no minimum threshold is applied. The Coordinator distributes the per-donor files to donors outside the system."
  )
);
children.push(blank());
children.push(
  para(
    "The Annual Donor Giving Summary process operates only against individual donors (Contact records). Organizational funders (Account records) are not in scope for this process \u2014 organizational funders typically receive grant-acknowledgment letters at the time of award, which are managed separately as part of FU-RECORD or FU-STEWARD work and are not produced by FU-REPORT."
  )
);
children.push(blank());

children.push(para("4.4 Ad-Hoc Reporting", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator runs ad-hoc queries against fundraising data and Mentoring-domain program-impact data for one-off reporting needs not covered by the ten defined reports. Examples include: assembling grant-compliance submissions to specific funders by pulling Contribution data, payment history, and program-impact metrics; producing sponsor-recognition lists for review; producing campaign performance against goals on demand; producing reports on specific funder portfolios for individual board members; producing one-off requests from staff or external auditors. The ad-hoc capability supports filtering, grouping, and export of records and aggregate metrics across Contact, Account, Contribution, Fundraising Campaign, Engagement, and Session entities."
  )
);
children.push(blank());
children.push(
  para(
    "Ad-hoc reports respect the same field-level and record-level visibility rules as defined reports. A user who cannot see donorNotes in the Contact entity cannot retrieve donorNotes through ad-hoc reporting. A user who cannot see a Contribution record cannot include it in an ad-hoc query result. The Executive Member has ad-hoc reporting access but typically does not run ad-hoc queries directly; the Coordinator runs ad-hoc queries at the Executive Member\u2019s request as needed."
  )
);
children.push(blank());

children.push(para("4.5 The Ten Defined Reports", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The ten defined reports below are the substantive content of FU-REPORT. Each is available as a live view (Section 4.1) and is included in the packet output (Section 4.2). One of the ten \u2014 Annual Donor Giving Summaries \u2014 is the per-donor formatted-document-file output described in Section 4.3 rather than a single organizational summary view; it is included in the live-view list and the packet for completeness, but its primary form is per-donor output."
  )
);
children.push(blank());

// 4.5.1 Year-Over-Year Giving Trends
children.push(para("4.5.1 Year-Over-Year Giving Trends", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Shows the trajectory of total giving over multiple years to support board oversight of organizational fundraising trajectory. Displays a summary by fiscal or calendar year: total Received contribution amount, count of Received contributions, count of unique donors (distinct Contact records plus distinct Account records that gave that year), and average gift size. Typically shown for the trailing three to five years plus the current year-to-date. Filters: optionally split by contributionType (Donation, Sponsorship, Grant), by funderType for the Account population, or by Fundraising Campaign. Reads Contribution (primary), Contact and Account (for unique-donor counts), and Fundraising Campaign (when filtered by campaign)."
  )
);
children.push(blank());

// 4.5.2 Pipeline Status
children.push(para("4.5.2 Pipeline Status", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Shows the distribution of donor and funder relationships across the seven lifecycle stages so the Executive Member can see how the funding pipeline is shaped. Counts records by lifecycle stage, separated for individual donors (Contact records with donorStatus broken out by Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed) and organizational funders (Account records with funderStatus broken out by the same seven stages). Often shown as a side-by-side comparison or as a single combined view. Filters: optionally by funderType for the Account population, and by assignedSponsorCoordinator for organizational funders. Reads Contact and Account."
  )
);
children.push(blank());

// 4.5.3 Lifetime Value Distribution
children.push(para("4.5.3 Lifetime Value Distribution", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Shows the distribution of donors and funders by total lifetime giving so the Executive Member can see how revenue is concentrated across the donor and funder population. Records are grouped into giving tiers; for each tier, the report shows count of records, total lifetime giving in that tier, and percentage of total organizational lifetime giving. Often shown for individual donors (using donorLifetimeGiving on Contact) and organizational funders (using funderLifetimeGiving on Account) either side by side or combined. Filters: optionally by funderType for the Account population, by donorStatus or funderStatus (for example, Active only versus all-time including Lapsed), and by boardPosition on Contact (to call out board-member giving separately). Reads Contact and Account."
  )
);
children.push(blank());

// 4.5.4 At-Risk Active Relationships
children.push(para("4.5.4 At-Risk Active Relationships", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Surfaces Active donors and funders whose lastContactDate is overdue relative to a stewardship-cadence expectation, framed as a board-oversight metric. Operationally similar to FU-STEWARD\u2019s Active Donors and Funders Sweep List (FU-STEWARD-REQ-006) but presented at the board-oversight level rather than as the Coordinator\u2019s working sweep list. Counts Active records (Contact records with donorStatus = Active and Account records with funderStatus = Active) into bands by how long it has been since the last Coordinator outreach: never contacted, contacted within thirty days, thirty to ninety days, ninety to one-hundred-eighty days, over one-hundred-eighty days. The over-one-hundred-eighty-days band is the at-risk indicator. Filters: optionally by funderType for the Account population and by assignedSponsorCoordinator for organizational funders. Reads Contact and Account."
  )
);
children.push(blank());

// 4.5.5 Lapsed Donor and Funder Analysis
children.push(para("4.5.5 Lapsed Donor and Funder Analysis", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Surfaces records that have transitioned to Lapsed so the Executive Member can see the relationships going dormant and at what rate. FU-PROSPECT owns the operational re-engagement of Lapsed records; this report is the analytical view of the population available for that work. Lapsed records are listed with name, lifetime giving (donorLifetimeGiving for Contact, funderLifetimeGiving for Account), date of most recent Received contribution, and date of last Coordinator contact (lastContactDate). Sorted by lifetime giving descending so the highest-value lapsed relationships surface at the top. Filters: optionally by funderType for the Account population, by lifetime-giving threshold (for example, only show Lapsed records that gave at least one thousand dollars lifetime), and by date range (for example, only show records that lapsed in the last twelve months). Reads Contact, Account, and Contribution (to derive date of most recent Received contribution)."
  )
);
children.push(blank());

// 4.5.6 Acknowledgment Coverage
children.push(para("4.5.6 Acknowledgment Coverage", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Surfaces Received contributions that have not yet been acknowledged so the Executive Member can see whether the Coordinator\u2019s acknowledgment coverage is keeping up. Operationally similar to FU-STEWARD\u2019s Acknowledgment-Pending Contributions list (FU-STEWARD-REQ-007) but framed as a coverage metric rather than as the Coordinator\u2019s working catch-up list. Summarizes Received contributions: total count, count where acknowledgmentSent = true, count where acknowledgmentSent = false, percentage acknowledged, and median days between receivedDate and acknowledgmentDate (for the acknowledged subset). Often shown for the trailing twelve months plus the current year-to-date, with a comparison to the prior year. Filters: optionally by contributionType, by donor type (individual via donorContact, organizational via donorAccount), and by date range over receivedDate. Reads Contribution."
  )
);
children.push(blank());

// 4.5.7 Annual Donor Giving Summaries
children.push(para("4.5.7 Annual Donor Giving Summaries", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Produces year-end giving summaries sent to individual donors for tax purposes, as described in Section 4.3. Generated as one formatted document file per qualifying donor (individual donors only, Contact records with contactType including Donor, who had at least one Received contribution during the calendar year). Each summary lists the donor\u2019s Received contributions for the year (date, amount, designation, gift type, Fundraising Campaign when linked) along with total Received giving for the year and the donor\u2019s name and mailing address. Generated on Coordinator demand, typically at the start of each January for the prior calendar year. Reads Contact (donor identity and address), Contribution (Received contributions linked via donorContact in the calendar year), and Fundraising Campaign (when linked)."
  )
);
children.push(blank());

// 4.5.8 Open Pipeline Value
children.push(para("4.5.8 Open Pipeline Value", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Surfaces contributions that are not yet Received but represent expected future revenue so the Executive Member can see what is in flight and what the organization can reasonably expect over the next quarter, year, or other forward window. Distinct from giving trends (which look backward at Received contributions) and Pipeline Status (which looks at relationship-stage counts, not dollar amounts). Lists contributions in non-terminal status (Applied, Pledged, Committed) with contribution type, donor name, amount, status, and the most-relevant date field (applicationDate for Applied Grants, commitmentDate for Committed contributions, expectedPaymentDate when populated). Summarized at the top into total dollar amounts by status, with separate totals for each contribution type. Statuses are shown separately without probability weighting; no probability field is added to Contribution. Filters: optionally by contributionType, by donor type (individual or organizational), and by date range. Reads Contribution (primary), Contact and Account (for donor identity), and Fundraising Campaign (when linked)."
  )
);
children.push(blank());

// 4.5.9 Board Member Giving Summary
children.push(para("4.5.9 Board Member Giving Summary", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Surfaces Contact records that hold a board position with their giving record so the Executive Member can see board-level giving participation. Board giving is a metric that funders and grant-makers often ask about \u2014 full board participation in giving is a common funder expectation \u2014 and it is also a board-self-governance metric. Lists Contact records where boardPosition is populated, with name, board position, donor status (donorStatus value if contactType includes Donor; otherwise blank), Received giving for the current calendar year, lifetime giving (donorLifetimeGiving), and date of most recent Received contribution. Summary metrics at the top: count of board members, count of board members who gave during the current calendar year, percentage of board members who gave during the current calendar year (the board-participation metric). Filters: optionally by board position and by date range. Reads Contact (primary) and Contribution (for current-year giving and most-recent-contribution date)."
  )
);
children.push(blank());

// 4.5.10 Mentoring Service Delivery by Funding Territory
children.push(para("4.5.10 Mentoring Service Delivery by Funding Territory", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Reports the volume of mentor sessions and total mentoring hours delivered to clients within each funder\u2019s geographic territory so each funding organization can see the program-delivery footprint within the area they fund. Funders with overlapping territories share clients, so a single session may be counted toward multiple funders. Two views are produced. The funder-level view: for each Funder Organization Account, the territory zip code list, the count of clients in that territory who had at least one session during the report period, the count of sessions delivered to those clients during the period, and the total mentoring hours delivered to those clients during the period. The campaign-level view: for each Fundraising Campaign that has a territory, the campaign name, the territory zip code list, the count of clients, the count of sessions, and the total mentoring hours \u2014 using the Campaign territory rather than the Account territory. Filters: period (defaults to current quarter, configurable to other windows), and a single funder or campaign filter to scope the report to one funding organization or one campaign at a time. Match rule: a client\u2019s Contact.addressPostalCode is checked against the territory zip code list \u2014 if the client\u2019s zip code is in the list, the client and all their sessions during the period count toward that funder or campaign. Reads Account (territory and funder identity per Account.geographicServiceArea), Fundraising Campaign (territory and campaign identity per Fundraising Campaign.geographicServiceArea), Contact (client zip code via addressPostalCode), and the Mentoring-domain Engagement and Session entities (sessions delivered to clients)."
  )
);
children.push(blank());

children.push(para("4.6 Process Workflow Diagram", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-REPORT does not have a single sequential workflow that lends itself to a process diagram in the same form as FU-PROSPECT, FU-RECORD, and FU-STEWARD. The four consumption patterns described in Sections 4.1 through 4.4 are independent and concurrent. A diagram representing FU-REPORT would show the four patterns as concurrent paths from a central data layer (Contact, Account, Contribution, Fundraising Campaign, Engagement, Session) through report definitions to four output forms (live view, packet, per-donor giving summary, ad-hoc query result). Phase 9 implementation may produce such a diagram as part of system design."
  )
);
children.push(blank());

// ==============================
// 5. Process Completion
// ==============================
children.push(para("5. Process Completion", { heading: HeadingLevel.HEADING_1 }));
children.push(blank());

children.push(para("5.1 Normal Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-REPORT has no completion state. It is a perpetual reporting capability that operates indefinitely over the life of the Fundraising domain. Each individual report run, packet generation, live-view session, and Annual Donor Giving Summary generation is an operational unit, not a process completion. The capability is exercised whenever a consumer needs information; it is not finished. This framing matches the no-relationship-level-done-state pattern that FU-STEWARD established for the stewardship process."
  )
);
children.push(blank());

children.push(para("5.2 Multiple End States", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Not applicable. FU-REPORT has no end states because it has no completion state."
  )
);
children.push(blank());

children.push(para("5.3 Completion Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Not applicable. No completion event occurs that would require an authority to mark it complete."
  )
);
children.push(blank());

children.push(para("5.4 Post-Completion Handoffs", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-REPORT produces no discrete handoff events to any other process. Outputs are consumed on demand by personas who run reports or who receive scheduled packets. The Executive Member consumes packets and live views as part of board oversight; the Coordinator consumes live views and ad-hoc queries as a working tool informing FU-STEWARD stewardship decisions and FU-PROSPECT cultivation work; donors receive Annual Donor Giving Summaries for tax purposes. None of these are system-tracked handoffs \u2014 they are downstream consumption patterns occurring outside the process boundary."
  )
);
children.push(blank());

children.push(para("5.5 Early Termination", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Not applicable. FU-REPORT operations are short-lived (a report run, a packet generation, a live-view session, an Annual Donor Giving Summary generation) and produce output documents or interactive views, not entity records. A run either produces output or it does not; there is no in-progress state that can be \u201cearly terminated\u201d in any meaningful sense. Generic system capabilities for cancelling an in-progress operation may exist in the platform but are not a FU-REPORT-specific concern."
  )
);
children.push(blank());

// Section 6 follows in the next append

// ==============================
// 6. System Requirements
// ==============================
children.push(para("6. System Requirements", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Twenty-seven system requirements derived from the four consumption patterns and the ten defined reports. Requirements are presented in six topical batches: defined reports and live views (REQ-001 through REQ-005), packet production (REQ-006 through REQ-009), Annual Donor Giving Summaries (REQ-010 through REQ-015), Mentoring-domain access and territory-based attribution (REQ-016 through REQ-019), ad-hoc reporting (REQ-020 through REQ-023), and implementation deferrals plus no-op statements (REQ-024 through REQ-027). All requirements are read-only across upstream entities; FU-REPORT writes nothing."
  )
);
children.push(blank());

const reqHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "E7E6E6", width: 2200 }),
    cell("Requirement", { bold: true, fill: "E7E6E6", width: 7160 }),
  ],
});

const reqs = [
  ["FU-REPORT-REQ-001",
    "The system must provide ten defined reports as listed in Section 4.5, each accessible to the Donor / Sponsor Coordinator and the Executive Member: Year-Over-Year Giving Trends, Pipeline Status, Lifetime Value Distribution, At-Risk Active Relationships, Lapsed Donor and Funder Analysis, Acknowledgment Coverage, Annual Donor Giving Summaries, Open Pipeline Value, Board Member Giving Summary, and Mentoring Service Delivery by Funding Territory."],
  ["FU-REPORT-REQ-002",
    "The system must allow each defined report to be run for a configurable reporting period \u2014 calendar month, calendar quarter, calendar year, year-to-date, prior year, or custom date range \u2014 except where the report\u2019s nature constrains the period. Annual Donor Giving Summaries always cover a calendar year. Pipeline Status and Lifetime Value Distribution are point-in-time and do not use a period."],
  ["FU-REPORT-REQ-003",
    "The system must present each defined report as a live, interactive view accessible on demand to the Donor / Sponsor Coordinator and the Executive Member. The live view shows the same content as the packet output for the same period."],
  ["FU-REPORT-REQ-004",
    "The system must not provide a top-level dashboard summarizing the ten defined reports. Each defined report has its own live view, accessible from a list. The Executive Member selects the report they want to see."],
  ["FU-REPORT-REQ-005",
    "The system must restrict access to all defined reports and the live view to the Donor / Sponsor Coordinator and the Executive Member. Other personas have no access. The System Administrator\u2019s access is by virtue of the platform-administrator role and is not enumerated separately."],
  ["FU-REPORT-REQ-006",
    "The system must allow the Donor / Sponsor Coordinator to trigger packet production on demand. Packet production assembles all ten defined reports for a specified reporting period into a single formatted document file. The Coordinator selects the period at the time of triggering."],
  ["FU-REPORT-REQ-007",
    "The system must support two standard packet types \u2014 monthly and quarterly \u2014 that differ only in cadence and audience formality. The content set is identical: all ten defined reports for the period. The monthly packet covers the prior calendar month and is produced for management review. The quarterly packet covers the prior calendar quarter and is produced for board meetings."],
  ["FU-REPORT-REQ-008",
    "The system must not produce packets automatically on a schedule. All packet production is initiated manually by the Coordinator. This continues the no-system-fired-output position established by FU-STEWARD-REQ-009."],
  ["FU-REPORT-REQ-009",
    "The system must produce packet output as a single formatted document file. The exact file format defers to Phase 9. Distribution of the produced file to consumers (Executive Member, board members) is performed by the Coordinator outside the system."],
  ["FU-REPORT-REQ-010",
    "The system must allow the Donor / Sponsor Coordinator to trigger Annual Donor Giving Summary generation on demand. Generation produces one formatted document file per individual donor (Contact records with contactType including Donor) who has at least one Received contribution during the calendar year covered by the run."],
  ["FU-REPORT-REQ-011",
    "The Annual Donor Giving Summary covers the calendar year (January 1 through December 31) regardless of CBM\u2019s fiscal year, on the standard United States tax-purpose convention. The Coordinator typically triggers generation in early January for the prior calendar year."],
  ["FU-REPORT-REQ-012",
    "The system must include in each donor\u2019s summary all Received contributions linked to the donor via donorContact with receivedDate falling within the calendar year covered by the run. Each contribution shown displays date, amount, designation, gift type, and Fundraising Campaign (when linked). The summary also includes the donor\u2019s total Received giving for the year."],
  ["FU-REPORT-REQ-013",
    "The system must not apply a minimum giving threshold to Annual Donor Giving Summary generation. Every individual donor with at least one Received contribution during the calendar year receives a summary, regardless of total giving amount."],
  ["FU-REPORT-REQ-014",
    "The system must not produce Annual Donor Giving Summaries for organizational funders (Account records). Organizational funders receive grant-acknowledgment letters at the time of award and do not receive year-end giving summaries through this process."],
  ["FU-REPORT-REQ-015",
    "The system must not automatically distribute Annual Donor Giving Summary files to donors. The Coordinator handles distribution outside the system, consistent with the no-system-fired-output position."],
  ["FU-REPORT-REQ-016",
    "The system must provide read-only access from FU-REPORT to Mentoring-domain entities \u2014 Engagement and Session \u2014 for use in defined reports and ad-hoc queries. This access supports both the Mentoring Service Delivery by Funding Territory defined report and ad-hoc reporting that combines fundraising data with program-impact data. FU-REPORT writes nothing to Mentoring-domain entities."],
  ["FU-REPORT-REQ-017",
    "The system must support territory-based attribution by matching client zip codes against the zip code lists stored in Account.geographicServiceArea (for funder-level attribution) and Fundraising Campaign.geographicServiceArea (for campaign-level attribution). The match is set-membership: a client\u2019s Contact.addressPostalCode is included in a territory if the value appears in that territory\u2019s zip code list."],
  ["FU-REPORT-REQ-018",
    "The system must support territory overlap. A single client and the sessions delivered to that client may be counted toward multiple funders or multiple campaigns when their territories overlap. The Mentoring Service Delivery by Funding Territory report shows each funder\u2019s or campaign\u2019s attribution independently; aggregate totals across funders are not derivable by summing per-funder figures because of overlap."],
  ["FU-REPORT-REQ-019",
    "The system must source mentor session counts and total mentoring hours for the Mentoring Service Delivery by Funding Territory report from the Mentoring-domain Session entity, scoped to sessions that have a session-date field within the report period and that are linked through Engagement to a client Contact whose addressPostalCode falls within the funder\u2019s or campaign\u2019s territory zip code list. Exact computation of \u201csession count\u201d and \u201ctotal mentoring hours\u201d defers to Mentoring-domain Engagement Entity PRD v1.2 and Session Entity PRD v1.1 field definitions."],
  ["FU-REPORT-REQ-020",
    "The system must provide ad-hoc reporting capability over Fundraising-domain entities (Contact, Account, Contribution, Fundraising Campaign) and Mentoring-domain entities (Engagement, Session) to the Donor / Sponsor Coordinator. Ad-hoc reports support filtering, grouping, and export of records and aggregate metrics that are not produced by any of the ten defined reports."],
  ["FU-REPORT-REQ-021",
    "The system must apply the same field-level and record-level visibility rules to ad-hoc reports as it applies to defined reports. Restricted fields (donorNotes, funderNotes) and restricted record-level visibility on Contribution and Fundraising Campaign per FU-RECORD-REQ-021 and REQ-022 carry through to ad-hoc reports \u2014 a user who lacks access to a field or record cannot retrieve it through ad-hoc reporting."],
  ["FU-REPORT-REQ-022",
    "The system must allow ad-hoc reports to be exported to a portable file format for distribution outside the system or further analysis. Exact export formats defer to Phase 9."],
  ["FU-REPORT-REQ-023",
    "The system must restrict ad-hoc reporting access to the Donor / Sponsor Coordinator and the Executive Member. Other personas have no ad-hoc reporting access to Fundraising-domain or Mentoring-domain entities through this process."],
  ["FU-REPORT-REQ-024",
    "The system must not write to any Fundraising-domain or Mentoring-domain entity from FU-REPORT. FU-REPORT is read-only across all entities it consumes. No fields are created or updated by this process. Section 8 (Data Collected) is empty."],
  ["FU-REPORT-REQ-025",
    "The system must not produce any system-fired alerts, notifications, scheduled emails, or automated messages from FU-REPORT. All output is generated on Coordinator demand. This continues the no-system-fired-alerts position established by FU-STEWARD-REQ-009 and extended by FU-REPORT-REQ-008 and REQ-015."],
  ["FU-REPORT-REQ-026",
    "The exact visual layout, formatting, charting library, file format, and interactive controls for the live view, packets, defined reports, and Annual Donor Giving Summaries defer to Phase 9 implementation. Business-language descriptions of report content in Section 4 are authoritative for what each report contains; presentation form is settled at implementation time."],
  ["FU-REPORT-REQ-027",
    "The Northeast Ohio zip code master list referenced by Account.geographicServiceArea and Fundraising Campaign.geographicServiceArea (per the carry-forward executed at the start of the FU-REPORT process definition session) is not specified within FU-REPORT. The master list and its maintenance ownership are Phase 9 implementation matters, and may also be addressed when CR-MARKETING-ISS-001 is taken up."],
];

const reqRows = [reqHeader].concat(reqs.map(([id, text]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2200 }),
      cell(text, { width: 7160 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2200, 7160],
  rows: reqRows,
}));
children.push(blank());


// ==============================
// 7. Process Data (Supporting Fields Read by FU-REPORT)
// ==============================
children.push(para("7. Process Data", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Thirty-nine supporting data items read by FU-REPORT across six entities: Contact (8 items), Account (9 items), Contribution (12 items), Fundraising Campaign (8 items), Engagement (1 item), and Session (1 item). All items are read-only; FU-REPORT writes none of them. Items are sourced from the predecessor processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, MN-INTAKE, MN-DELIVER) and the Entity PRDs that own each field. Field-level and record-level visibility rules established by upstream processes carry through to FU-REPORT outputs per FU-REPORT-REQ-021."
  )
);
children.push(blank());

// 7.1 Contact
children.push(para("7.1 Contact \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));

const dataHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "E7E6E6", width: 2000 }),
    cell("Field / Reference", { bold: true, fill: "E7E6E6", width: 2400 }),
    cell("Role in FU-REPORT and Source", { bold: true, fill: "E7E6E6", width: 4960 }),
  ],
});

const contactDats = [
  ["FU-REPORT-DAT-001", "firstName, lastName", "Contact identity. Read for donor identification on Annual Donor Giving Summaries and on per-donor list views in Lapsed Donor and Funder Analysis. Source: Contact Entity PRD v1.6."],
  ["FU-REPORT-DAT-002", "addressStreet, addressCity, addressState, addressPostalCode, addressCountry", "Contact address fields. Read for Annual Donor Giving Summary mailing-address rendering and for the Mentoring Service Delivery by Funding Territory report\u2019s client-zip-code lookup (addressPostalCode specifically). Source: Contact Entity PRD v1.6 (native fields)."],
  ["FU-REPORT-DAT-003", "contactType", "multiEnum identifying Contact roles including Donor. Read as the filter for the donor population across all donor-facing reports. Source: Contact Entity PRD v1.6."],
  ["FU-REPORT-DAT-004", "donorStatus", "Enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed). Read for Pipeline Status and for filtering donor-facing reports by lifecycle stage. Source: FU-PROSPECT-DAT-020 (will be promoted to Contact Entity PRD v1.7 in the bundled end-of-FU-Phase-4b carry-forward)."],
  ["FU-REPORT-DAT-005", "donorLifetimeGiving", "Currency, system-calculated. Read as the lifetime-giving metric on Lifetime Value Distribution, Lapsed Donor and Funder Analysis, and Board Member Giving Summary. Source: FU-RECORD-DAT-018 (will be promoted to Contact Entity PRD v1.7 in the bundled carry-forward)."],
  ["FU-REPORT-DAT-006", "lastContactDate", "Date, manually-set. Read for the At-Risk Active Relationships banding (last-contact-date age) and for Lapsed Donor and Funder Analysis. Source: FU-STEWARD-DAT-017 (will be promoted to Contact Entity PRD v1.7 in the bundled carry-forward)."],
  ["FU-REPORT-DAT-007", "boardPosition", "Contact field identifying Board members. Read as the filter for the Board Member Giving Summary population. Source: Contact Entity PRD v1.6."],
  ["FU-REPORT-DAT-008", "donorNotes", "wysiwyg, restricted-visibility (Donor / Sponsor Coordinator + Executive Member + System Administrator). Not displayed in any defined report. Available in ad-hoc reporting subject to FU-REPORT-REQ-021\u2019s visibility-rule carry-through. Source: FU-PROSPECT-DAT-021 (will be promoted to Contact Entity PRD v1.7 in the bundled carry-forward)."],
];

const contactRows = [dataHeader].concat(contactDats.map(([id, fld, desc]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2000 }),
      cell(fld, { width: 2400 }),
      cell(desc, { width: 4960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 2400, 4960],
  rows: contactRows,
}));
children.push(blank());

// 7.2 Account
children.push(para("7.2 Account \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));

const accountDats = [
  ["FU-REPORT-DAT-009", "name", "Account identity. Read for funder identification on funder-list views, Lapsed analysis, and the Mentoring Service Delivery by Funding Territory report\u2019s funder column. Source: Account Entity PRD v1.7 (native field)."],
  ["FU-REPORT-DAT-010", "accountType", "multiEnum identifying Account roles including Donor/Sponsor. Read as the filter for the funder population across all funder-facing reports. Source: Account Entity PRD v1.7."],
  ["FU-REPORT-DAT-011", "funderType", "Enum (Corporation, Foundation, Government Agency, Community Foundation, Individual Organization, Other). Read as a grouping and filtering dimension on Year-Over-Year Giving Trends, Lifetime Value Distribution, At-Risk Active Relationships, and Lapsed Donor and Funder Analysis. Source: Account Entity PRD v1.7."],
  ["FU-REPORT-DAT-012", "funderStatus", "Enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed). Read for Pipeline Status and for filtering funder-facing reports by lifecycle stage. Source: FU-PROSPECT-DAT-026 (Account Entity PRD v1.6 already includes this field)."],
  ["FU-REPORT-DAT-013", "funderLifetimeGiving", "Currency, system-calculated. Read as the lifetime-giving metric on Lifetime Value Distribution and Lapsed Donor and Funder Analysis for the funder population. Source: Account Entity PRD v1.6 (the field exists in v1.6; FU-RECORD-REQ-013 specifies the calculation)."],
  ["FU-REPORT-DAT-014", "lastContactDate", "Date, manually-set. Read for the At-Risk Active Relationships banding and for Lapsed Donor and Funder Analysis on the funder population. Source: FU-STEWARD-DAT-020 (will be promoted to Account Entity PRD v1.8 in the bundled end-of-FU-Phase-4b carry-forward)."],
  ["FU-REPORT-DAT-015", "assignedSponsorCoordinator", "Link to Contact (User). Read as a grouping and filtering dimension on funder-facing reports \u2014 for example, scoping reports to a single Coordinator\u2019s portfolio. Source: FU-PROSPECT-DAT-027 (will be promoted to Account Entity PRD v1.8 in the bundled carry-forward)."],
  ["FU-REPORT-DAT-016", "geographicServiceArea", "multiEnum (zip codes from master list), restructured by the carry-forward executed at the start of the FU-REPORT process definition session. Read as the funder-territory zip code list for the Mentoring Service Delivery by Funding Territory report\u2019s funder-level view. Source: Account Entity PRD v1.7 per the geographicServiceArea-restructure carry-forward."],
  ["FU-REPORT-DAT-017", "funderNotes", "wysiwyg, restricted-visibility (Donor / Sponsor Coordinator + Executive Member + System Administrator). Not displayed in any defined report. Available in ad-hoc reporting subject to FU-REPORT-REQ-021\u2019s visibility-rule carry-through. Source: Account Entity PRD v1.6."],
];

const accountRows = [dataHeader].concat(accountDats.map(([id, fld, desc]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2000 }),
      cell(fld, { width: 2400 }),
      cell(desc, { width: 4960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 2400, 4960],
  rows: accountRows,
}));
children.push(blank());

// 7.3 Contribution
children.push(para("7.3 Contribution \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));

const contribDats = [
  ["FU-REPORT-DAT-018", "contributionType", "Enum (Donation, Sponsorship, Grant). Read as a grouping and filtering dimension on Year-Over-Year Giving Trends, Acknowledgment Coverage, and Open Pipeline Value. Drives structure of Annual Donor Giving Summary line items. Source: FU-RECORD-DAT-019."],
  ["FU-REPORT-DAT-019", "status", "Enum (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled). Read as the primary state filter across all contribution-based metrics. Received contributions count toward all giving-trend and lifetime-giving figures; Applied, Pledged, and Committed feed Open Pipeline Value. Source: FU-RECORD-DAT-020."],
  ["FU-REPORT-DAT-020", "amount", "Currency. Read as the dollar-value field across all contribution-based metrics \u2014 sum-of-Received-amount in giving trends, acknowledgment-coverage display fields, Open Pipeline Value totals by status, Annual Donor Giving Summary line items. Source: FU-RECORD-DAT-021."],
  ["FU-REPORT-DAT-021", "donorContact", "Link to Contact. Read as the link to the individual donor for all donor-facing reports and Annual Donor Giving Summary generation. Source: FU-RECORD-DAT-022."],
  ["FU-REPORT-DAT-022", "donorAccount", "Link to Account. Read as the link to the organizational funder for all funder-facing reports. Source: FU-RECORD-DAT-023."],
  ["FU-REPORT-DAT-023", "fundraisingCampaign", "Link to Fundraising Campaign. Read for Campaign-attribution display in Annual Donor Giving Summaries and for ad-hoc reports filtering by Campaign. Source: FU-RECORD-DAT-024."],
  ["FU-REPORT-DAT-024", "applicationDate, commitmentDate, receivedDate, expectedPaymentDate", "Contribution date fields. receivedDate anchors giving-trend metrics, Acknowledgment Coverage age calculations, and Annual Donor Giving Summary inclusion. applicationDate and commitmentDate anchor Open Pipeline Value display. expectedPaymentDate (when populated) supports Open Pipeline Value forecasting. Source: FU-RECORD-DAT-025 through DAT-028."],
  ["FU-REPORT-DAT-025", "acknowledgmentSent, acknowledgmentDate", "Bool and date, jointly written by FU-RECORD (primary) and FU-STEWARD (catch-up). Read for Acknowledgment Coverage metrics \u2014 total Received count, acknowledged count, percentage acknowledged, median days from receivedDate to acknowledgmentDate. Source: FU-RECORD-DAT-029 and DAT-030."],
  ["FU-REPORT-DAT-026", "designation", "Text, free-form. Read as a display field on Annual Donor Giving Summary line items. Read in ad-hoc reports for narrative grouping; not used as a structured grouping field anywhere in defined reports. Source: FU-RECORD-DAT-031."],
  ["FU-REPORT-DAT-027", "giftType", "Enum (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other). Read as a display field on Annual Donor Giving Summary line items. In-Kind value drives whether in-kind-specific fields apply. Source: FU-RECORD-DAT-032."],
  ["FU-REPORT-DAT-028", "nextGrantDeadline", "Date, optional. Read in ad-hoc grant queries (per the scoping decision that grant-compliance reporting is ad-hoc, not a defined deliverable). Not used by any of the ten defined reports. Source: FU-RECORD-DAT-033."],
  ["FU-REPORT-DAT-029", "notes", "Text or wysiwyg. Read in ad-hoc reports only \u2014 for narrative review of recognition obligations or contribution-specific context. Not displayed in defined reports. Source: FU-RECORD-DAT-034."],
];

const contribRows = [dataHeader].concat(contribDats.map(([id, fld, desc]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2000 }),
      cell(fld, { width: 2400 }),
      cell(desc, { width: 4960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 2400, 4960],
  rows: contribRows,
}));
children.push(blank());

// 7.4 Fundraising Campaign
children.push(para("7.4 Fundraising Campaign \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));

const fcDats = [
  ["FU-REPORT-DAT-030", "campaignName", "Text. Read as the campaign-identity label on Annual Donor Giving Summary line items and on the Mentoring Service Delivery by Funding Territory report\u2019s campaign-level view. Source: FU-RECORD-DAT-039."],
  ["FU-REPORT-DAT-031", "campaignType", "Enum. Read in ad-hoc reports as a grouping dimension. Not used in defined reports. Source: FU-RECORD-DAT-040."],
  ["FU-REPORT-DAT-032", "status", "Enum (Planned, Active, Completed, Cancelled). Read in ad-hoc reports as a state filter and on the Mentoring Service Delivery by Funding Territory report to scope campaign-level views to non-Cancelled campaigns where appropriate. Source: FU-RECORD-DAT-041."],
  ["FU-REPORT-DAT-033", "goalAmount", "Currency. Read in ad-hoc Campaign Performance Against Goals queries (the report dropped from defined-report scope earlier in the session). Not used in defined reports. Source: FU-RECORD-DAT-042."],
  ["FU-REPORT-DAT-034", "startDate, endDate", "Date fields. Read as the campaign-period anchors for ad-hoc campaign queries. Not used in defined reports. Source: FU-RECORD-DAT-043 and DAT-044."],
  ["FU-REPORT-DAT-035", "totalRaised", "Currency, system-calculated. Read in ad-hoc Campaign Performance Against Goals queries. Not used in defined reports. Source: FU-RECORD-DAT-045."],
  ["FU-REPORT-DAT-036", "description", "Text. Read in ad-hoc reports for narrative review. Not used in defined reports. Source: FU-RECORD-DAT-046."],
  ["FU-REPORT-DAT-037", "geographicServiceArea", "multiEnum (zip codes from master list), added to Fundraising Campaign by the carry-forward executed at the start of the FU-REPORT process definition session. Read as the campaign-territory zip code list for the Mentoring Service Delivery by Funding Territory report\u2019s campaign-level view. Source: FU-RECORD-DAT-047 per the geographicServiceArea-restructure carry-forward."],
];

const fcRows = [dataHeader].concat(fcDats.map(([id, fld, desc]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2000 }),
      cell(fld, { width: 2400 }),
      cell(desc, { width: 4960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 2400, 4960],
  rows: fcRows,
}));
children.push(blank());

// 7.5 Mentoring-Domain Entities
children.push(para("7.5 Mentoring-Domain Entities \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Engagement and Session entities are read by FU-REPORT for the Mentoring Service Delivery by Funding Territory report and for ad-hoc queries that combine fundraising data with program-impact data. Specific field-name binding defers to Phase 9 implementation per FU-REPORT-ISS-002."
  )
);
children.push(blank());

const mnDats = [
  ["FU-REPORT-DAT-038", "Engagement entity \u2014 fields supporting territory attribution", "Read to identify the client Contact for sessions delivered. The Engagement establishes the link between Session and the client Contact whose addressPostalCode is matched against the territory zip code list. Specific Engagement field names defer to Engagement Entity PRD v1.2. Source: Engagement Entity PRD v1.2."],
  ["FU-REPORT-DAT-039", "Session entity \u2014 fields supporting session-count and session-hour metrics", "Read for the count of sessions and total mentoring hours delivered during the report period. Specific fields used: a session-date field (to scope sessions to the report period), a session-duration or session-hours field (for total-mentoring-hours summation), and the link to Engagement (to traverse to client Contact for territory-zip-code matching). Specific Session field names defer to Session Entity PRD v1.1. Source: Session Entity PRD v1.1."],
];

const mnRows = [dataHeader].concat(mnDats.map(([id, fld, desc]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2000 }),
      cell(fld, { width: 2400 }),
      cell(desc, { width: 4960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 2400, 4960],
  rows: mnRows,
}));
children.push(blank());


// ==============================
// 8. Data Collected
// ==============================
children.push(para("8. Data Collected", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-REPORT writes nothing to any entity. No Contact, Account, Contribution, Fundraising Campaign, Engagement, or Session field is created or updated by this process. Per FU-REPORT-REQ-024, FU-REPORT is read-only across all entities it consumes; its outputs are presentations of data \u2014 reports, packets, formatted document files \u2014 not changes to data. This section is intentionally empty; the upstream processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, MN-INTAKE, MN-DELIVER) own all writes to the entities FU-REPORT consumes."
  )
);
children.push(blank());

// ==============================
// 9. Open Issues
// ==============================
children.push(para("9. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Four open issues surfaced during the FU-REPORT process definition session. None block the production of this document; each is recorded for resolution at a later phase or in a separate session."
  )
);
children.push(blank());

const issHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "E7E6E6", width: 2400 }),
    cell("Issue", { bold: true, fill: "E7E6E6", width: 6960 }),
  ],
});

const isses = [
  ["FU-REPORT-ISS-001", "Northeast Ohio zip code master list. The geographicServiceArea fields on Account and Fundraising Campaign reference a master list of zip codes that has not yet been defined. Defining the master list (which zip codes are valid choices) is a Phase 9 implementation matter. May also be addressed when CR-MARKETING-ISS-001 is taken up. Carried forward from the geographicServiceArea-restructure carry-forward executed at the start of the FU-REPORT process definition session."],
  ["FU-REPORT-ISS-002", "Mentoring-domain field-name binding for the Mentoring Service Delivery by Funding Territory report. The session prompt scoped reading to FU-relevant Contact and Account fields only, so precise Engagement and Session field names used by FU-REPORT-DAT-038 and DAT-039 were not bound during this interview. Phase 9 will confirm field names against Engagement Entity PRD v1.2 and Session Entity PRD v1.1 at implementation time."],
  ["FU-REPORT-ISS-003", "Tangential CR-domain references to geographic targeting. CR-MARKETING and CR-EVENTS process documents were not read during the geographicServiceArea-restructure carry-forward execution. They may contain narrative references to geographic targeting that are tangentially affected by ACT-ISS-004\u2019s closure. If found in future review, those references will be addressed in a separate carry-forward at that time."],
  ["FU-REPORT-ISS-004", "CR-MARKETING-ISS-001 remains open. The geographicServiceArea-restructure carry-forward closed ACT-ISS-004 (field format) but CR-MARKETING-ISS-001\u2019s broader concerns \u2014 geographic targeting model, master-list maintenance ownership \u2014 survive the closure. CR-MARKETING-ISS-001 will be addressed when CR-MARKETING returns to it during stakeholder review or sub-domain reconciliation."],
];

const issRows = [issHeader].concat(isses.map(([id, text]) =>
  new TableRow({
    children: [
      cell(id, { bold: true, width: 2400 }),
      cell(text, { width: 6960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: issRows,
}));
children.push(blank());

// ==============================
// 10. Interview Transcript
// ==============================
children.push(para("10. Interview Transcript", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Topic-organized record of the FU-REPORT process definition interview, conducted 04-30-26. Decisions are captured as inline italicized callouts within each topic area. The mid-interview pause to execute the geographicServiceArea-restructure carry-forward is reflected in topic 10.6."
  )
);
children.push(blank());

children.push(para("10.1 Process Scope and Grant-Compliance Boundary", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The interview opened by confirming the Fundraising Domain Overview\u2019s description of FU-REPORT as producing analytics, board-level summaries, grant compliance reports, and annual donor giving summaries. The administrator immediately narrowed scope: standardized grant-compliance report generation is dropped because of the complexity of supporting different funder reporting templates."
  )
);
children.push(blank());
children.push(
  para(
    "A clarification followed: the change in grant-compliance scope applies to standardized reporting only. Grant data \u2014 contributions, deadlines, payments, program-impact metrics \u2014 continues to be collected by upstream processes and remains accessible through ad-hoc reporting. The Coordinator can still pull grant data manually to assemble compliance submissions; FU-REPORT just does not produce structured, repeatable, template-formatted compliance outputs as defined deliverables."
  )
);
children.push(para(
  "Decision: Standardized grant-compliance report generation is out of scope for FU-REPORT as a defined deliverable. Grant data flows through FU-REPORT\u2019s ad-hoc reporting capability when needed. The Domain Overview\u2019s grant-deadline-trigger pattern in Section 3 \u2014 FU-REPORT producing scheduled compliance reports at grant deadlines \u2014 drops with this scoping.",
  { italic: true }
));
children.push(blank());

children.push(para("10.2 Sponsor Recognition Reports", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-RECORD\u2019s design captures sponsor-recognition obligations narratively in Contribution notes; no structured field tracks recognition obligations. The interview considered three options for sponsor recognition reports: keep as a defined report, drop entirely, or drop as defined and rely on ad-hoc capability. The administrator chose the third option."
  )
);
children.push(para(
  "Decision: Sponsor recognition reports are out of scope as a defined FU-REPORT deliverable. Recognition obligation tracking remains within FU-STEWARD\u2019s per-record sweep work; report-style outputs are produced ad-hoc when needed.",
  { italic: true }
));
children.push(blank());

children.push(para("10.3 Mentoring-Domain Read Access", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "With grant-compliance reporting and sponsor recognition reports removed as defined deliverables, the rationale for FU-REPORT-side Mentoring-domain read access narrowed. The interview considered three options: no Mentoring-domain access, ad-hoc only, or both standardized and ad-hoc. The administrator confirmed both \u2014 FU-REPORT needs standardized reporting and ad-hoc capability to report on Mentoring analytic data."
  )
);
children.push(para(
  "Decision: FU-REPORT has read-only access to Mentoring-domain entities (Engagement, Session) for both defined reports and ad-hoc queries. FU-REPORT writes nothing to Mentoring-domain entities.",
  { italic: true }
));
children.push(blank());

children.push(para("10.4 Reporting Cadence and Audience", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Executive Member needs both a formal fundraising packet produced on a schedule for board meetings and a live view available on demand between meetings. Cadence: monthly informational packet for management review, quarterly formal packet for board meetings. The two packets contain the same set of defined reports \u2014 only the cadence and audience formality differ. Live-view access is restricted to the Coordinator and the Executive Member, not to other staff or board members. The live view consists of separate live reports accessible from a list, not a top-level dashboard."
  )
);
children.push(para(
  "Decision: Combined consumption pattern. Monthly informational packet plus quarterly formal packet, both with identical content (the ten defined reports for the period). Live view available between meetings to the Coordinator and the Executive Member, structured as separate live reports rather than a top-level dashboard.",
  { italic: true }
));
children.push(blank());

children.push(para("10.5 Defined Reports \u2014 Walk-Through", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Eleven candidate reports were walked through one at a time. Each candidate was scoped to defined-report status, ad-hoc-only status, or out of scope. The walk-through resolved as follows."
  )
);
children.push(blank());
children.push(bullet("Campaign Performance Against Goals \u2014 ad-hoc only. The Domain Overview cited campaign performance against goals as a primary internal analytic; the administrator narrowed it to ad-hoc capability rather than defined-report status."));
children.push(bullet("Year-Over-Year Giving Trends \u2014 defined."));
children.push(bullet("Pipeline Status \u2014 defined."));
children.push(bullet("Lifetime Value Distribution \u2014 defined."));
children.push(bullet("At-Risk Active Relationships \u2014 defined."));
children.push(bullet("Lapsed Donor and Funder Analysis \u2014 defined."));
children.push(bullet("Acknowledgment Coverage \u2014 defined."));
children.push(bullet("Annual Donor Giving Summaries \u2014 defined. Calendar year (United States tax-purpose convention). No minimum giving threshold. Output format: one separate formatted document file per donor. Distribution outside the system."));
children.push(bullet("Open Pipeline Value \u2014 defined. Statuses (Applied, Pledged, Committed) shown separately without probability weighting; no probability field is added to Contribution."));
children.push(bullet("Board Member Giving Summary \u2014 defined."));
children.push(bullet("Combined Fundraising and Program Impact Summary \u2014 out of scope as a defined report."));
children.push(blank());
children.push(
  para(
    "After the Combined Fundraising and Program Impact Summary was scoped out, the standardized side of Mentoring-domain access (decision 10.3) had no defined report exercising it. The administrator addressed this by adding a new defined report: Mentoring Service Delivery by Funding Territory."
  )
);
children.push(para(
  "Decision: Ten defined reports approved. The eleventh candidate (Combined Fundraising and Program Impact Summary) is out of scope. Mentoring Service Delivery by Funding Territory is added as the tenth defined report and is the report that exercises FU-REPORT\u2019s standardized Mentoring-domain access.",
  { italic: true }
));
children.push(blank());

children.push(para("10.6 Territory-Based Attribution and the geographicServiceArea Restructure", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Mentoring Service Delivery by Funding Territory report needed a rule for which sessions count toward which funder. The administrator described the model: a funding organization services a geographic territory, all clients in that territory who receive mentoring have their session count and duration aggregated and reported to that funder, territories may overlap so a single session may count toward multiple funders. Territories are defined by lists of zip codes; clients carry zip codes through their Contact.addressPostalCode (collected at MN-INTAKE-DAT-014); sessions traverse to clients through Engagement."
  )
);
children.push(blank());
children.push(
  para(
    "The territory definition lives on both Account (the funder organization\u2019s overall service territory) and Fundraising Campaign (Campaign-specific funded territories). Independently maintained: the Coordinator manages the zip code list on each Account and on each Campaign separately, with no automatic rollup of Campaign territories to the Account level (such rollups would require non-standard CRM aggregation logic and would conflate distinct logical concepts)."
  )
);
children.push(blank());
children.push(
  para(
    "The structural foundation for this report \u2014 a structured zip code list on Account and on Fundraising Campaign \u2014 did not exist at the start of the interview. Account had a free-text geographicServiceArea field scoped to Partner organizations only; Fundraising Campaign had no territory field. The administrator chose to restructure the existing Account.geographicServiceArea field rather than add a parallel field, and to apply the restructured field consistently across Partner, Donor/Sponsor, and Fundraising Campaign uses. ACT-ISS-004 (Geographic Service Area field format, free text vs. controlled list) closed by adopting the structured zip code list."
  )
);
children.push(blank());
children.push(
  para(
    "The interview paused mid-walk-through after this decision to execute the carry-forward across the five affected documents (Account Entity PRD v1.6 \u2192 v1.7, CR-PARTNER-MANAGE v1.0 \u2192 v1.1, CR Domain PRD v1.1 \u2192 v1.2, CR Domain Overview v1.3 \u2192 v1.4, FU-RECORD v1.1 \u2192 v1.2). Carry-forward request file at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-account-territory-zipcode-list.md. The interview resumed after the carry-forward executed."
  )
);
children.push(para(
  "Decision: Account.geographicServiceArea restructured from text to multiEnum (zip code list) with visibility expanded to both Partner and Donor/Sponsor account types. Same field added to Fundraising Campaign as FU-RECORD-DAT-047. ACT-ISS-004 closed. Five-document carry-forward executed mid-interview before continuing the report walk-through.",
  { italic: true }
));
children.push(blank());

children.push(para("10.7 Personas Involved", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The session prompt identified MST-PER-002 Executive Member and MST-PER-010 Donor / Sponsor Coordinator as the personas. The interview confirmed System Administrator should not be enumerated separately \u2014 platform-administrator visibility is implicit through visibility rules, matching the FU-PROSPECT, FU-RECORD, and FU-STEWARD persona patterns."
  )
);
children.push(para(
  "Decision: FU-REPORT lists MST-PER-010 (primary operator) and MST-PER-002 (primary audience for board-level packet and live view). System Administrator is implicit through visibility rules and is not enumerated.",
  { italic: true }
));
children.push(blank());

children.push(para("10.8 Process Workflow", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Two workflow questions resolved. First, packet production is on Coordinator demand, not on a system schedule \u2014 the Coordinator triggers \u201cproduce monthly packet\u201d or \u201cproduce quarterly packet\u201d when needed. The system handles assembly. This continues the no-system-fired-output position from FU-STEWARD-REQ-009. Second, the packet output is a single formatted document file paired with the live-view capability already established \u2014 the same defined reports are accessible interactively as well as through the formatted-file packet output."
  )
);
children.push(para(
  "Decision: Coordinator-triggered packet production produces a single formatted document file. The live view accesses the same defined reports interactively. Distribution of the produced file is performed by the Coordinator outside the system.",
  { italic: true }
));
children.push(blank());

children.push(para("10.9 Process Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-REPORT has no completion state \u2014 it is a perpetual reporting capability. No discrete handoff events are produced. Early termination is not a meaningful concept. All three Section 5 sub-questions resolved consistently."
  )
);
children.push(para(
  "Decision: Section 5 narrative confirms no completion state, no end states, no completion authority, no discrete handoffs, no meaningful early-termination concept. FU-REPORT is a perpetual reporting capability with individual report runs and packet generations as operational units.",
  { italic: true }
));
children.push(blank());

children.push(para("10.10 System Requirements", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Twenty-seven requirements approved across six batches: defined reports and live views (REQ-001 through REQ-005), packet production (REQ-006 through REQ-009), Annual Donor Giving Summaries (REQ-010 through REQ-015), Mentoring-domain access and territory attribution (REQ-016 through REQ-019), ad-hoc reporting (REQ-020 through REQ-023), implementation deferrals plus no-op statements (REQ-024 through REQ-027). Requirements emphasize read-only access, no system-fired automation, and visibility-rule carry-through from upstream entities."
  )
);
children.push(blank());

children.push(para("10.11 Process Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Thirty-nine supporting data items approved across six entities: Contact (8), Account (9), Contribution (12), Fundraising Campaign (8), Engagement (1), Session (1). All items are read-only inputs sourced from upstream processes and Entity PRDs. No data is created or updated by FU-REPORT \u2014 Section 8 (Data Collected) is empty, consistent with FU-REPORT-REQ-024."
  )
);
children.push(blank());

// ==============================
// 11. Change Log
// ==============================
children.push(para("11. Change Log", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Revision history for this document. The Last Updated value in the metadata table reflects the most recent entry below."
  )
);
children.push(blank());

const clHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("Version", { bold: true, fill: "E7E6E6", width: 1400 }),
    cell("Date", { bold: true, fill: "E7E6E6", width: 2000 }),
    cell("Changes", { bold: true, fill: "E7E6E6", width: 5960 }),
  ],
});

const clRows = [
  ["1.0", "04-30-26 04:58", "Initial release. Phase 4b process document for FU-REPORT \u2014 the fourth and final process document in the Fundraising domain. Produced from a single-session interview conducted 04-30-26 per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Eleven sections: Process Purpose (Enhancement-tier reporting capability with grant-compliance and sponsor-recognition scope narrowing), Process Triggers (no record-level preconditions, no system-fired initiation, manual only by Coordinator and Executive Member), Personas Involved (MST-PER-010 primary operator, MST-PER-002 primary audience and live-view consumer), Process Workflow (four interleaved consumption patterns: live views, packet production, Annual Donor Giving Summary generation, ad-hoc reporting), Process Completion (no completion state, no discrete handoffs, no early termination), System Requirements (27 requirements across 6 batches), Process Data (39 supporting data items across 6 entities), Data Collected (empty \u2014 FU-REPORT writes nothing), Open Issues (4 issues), Interview Transcript (11 topic areas), and Change Log. Ten defined reports approved during the interview: Year-Over-Year Giving Trends; Pipeline Status; Lifetime Value Distribution; At-Risk Active Relationships; Lapsed Donor and Funder Analysis; Acknowledgment Coverage; Annual Donor Giving Summaries; Open Pipeline Value; Board Member Giving Summary; Mentoring Service Delivery by Funding Territory. One mid-interview carry-forward executed: geographicServiceArea restructured from free text to multiEnum (zip code list) on Account, with visibility expanded to Partner and Donor/Sponsor; same field added to Fundraising Campaign as FU-RECORD-DAT-047. Carry-forward request retained at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-account-territory-zipcode-list.md. ACT-ISS-004 closed by the carry-forward."],
];

const clRowsAll = [clHeader].concat(clRows.map(([v, d, c]) =>
  new TableRow({
    children: [
      cell(v, { bold: true, width: 1400 }),
      cell(d, { width: 2000 }),
      cell(c, { width: 5960 }),
    ],
  })
));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1400, 2000, 5960],
  rows: clRowsAll,
}));
children.push(blank());

// ==============================
// Document instantiation
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

const outPath = path.join(__dirname, "FU-REPORT.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath);
});

