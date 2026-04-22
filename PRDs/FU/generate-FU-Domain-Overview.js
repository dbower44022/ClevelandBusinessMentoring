// CBM Fundraising Domain Overview — Generator
// Produces: CBM-Domain-Overview-Fundraising.docx (v1.0)
// Phase 4a output per crmbuilder/PRDs/process/interviews/guide-domain-overview.md v1.1

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageOrientation,
} = require("docx");

// ---------- Styling helpers ----------

const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const cellBorders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function cell(text, opts = {}) {
  const {
    bold = false,
    fill = null,
    width = null,
    children = null,
    italic = false,
  } = opts;

  const cellChildren = children
    ? children
    : [
        new Paragraph({
          children: [new TextRun({ text: String(text), bold, italic })],
        }),
      ];

  const cellDef = {
    borders: cellBorders,
    margins: cellMargins,
    children: cellChildren,
  };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function para(text, opts = {}) {
  const { bold = false, italic = false, heading = null, spacing = null } = opts;
  const paraDef = {
    children: [new TextRun({ text: String(text), bold, italic })],
  };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  return new Paragraph(paraDef);
}

function richPara(runs, opts = {}) {
  const { heading = null, spacing = null, alignment = null, numbering = null } =
    opts;
  const paraDef = {
    children: runs.map(
      (r) =>
        new TextRun({
          text: r.text,
          bold: !!r.bold,
          italic: !!r.italic,
        })
    ),
  };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  if (alignment) paraDef.alignment = alignment;
  if (numbering) paraDef.numbering = numbering;
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
    children: runs.map(
      (r) =>
        new TextRun({
          text: r.text,
          bold: !!r.bold,
          italic: !!r.italic,
        })
    ),
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
      new TextRun({ text: "Domain Overview: Fundraising (FU)", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("04-22-26 10:15", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({
      children: [
        cell("Depends On", { bold: true, fill: "E7E6E6", width: 2340 }),
        cell(null, {
          width: 7020,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text:
                    "CBM-Master-PRD.docx v2.5, CBM-Entity-Inventory.docx v1.5, Contact-Entity-PRD.docx v1.6, Account-Entity-PRD.docx v1.6",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
children.push(metaTable);
children.push(blank());

// ==============================
// 1. Domain Purpose
// ==============================
children.push(para("1. Domain Purpose", { heading: HeadingLevel.HEADING_1 }));

children.push(
  para(
    "The Fundraising domain manages Cleveland Business Mentors\u2019 relationships with the donors, sponsors, and funding institutions whose contributions provide the operational funding that allows the organization to deliver all mentoring services free of charge. It covers the full lifecycle of each funding relationship \u2014 from identifying a prospective donor or institutional funder, through cultivation and solicitation, to recording contributions, stewarding active relationships, and producing the analytics and compliance reporting that fundraising and board oversight require."
  )
);
children.push(blank());
children.push(
  para(
    "Year 1 priorities are to focus on establishing new relationships with as many of the known organizational funding institutions and sponsors as possible. The Fundraising domain supports this starting point while establishing a data model that remains coherent as the organization\u2019s fundraising program grows. Funders fall into two broad populations. Individual donors are people who give personal contributions, sometimes in a dual role as mentors or board members. Organizational funders are companies, foundations, government agencies, and other institutions providing grants, sponsorships, or corporate contributions. Both populations share the same underlying Contact and Account records used elsewhere in the system, distinguished by type and by their participation in fundraising-specific workflows."
  )
);
children.push(blank());

children.push(para("1.1 Mission Tie-In", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "CBM\u2019s mission is to provide free, confidential, impartial mentoring and practical business education to Northeast Ohio entrepreneurs, small businesses, and nonprofits. Services are free to clients \u2014 CBM takes no fees, commissions, equity, or referral arrangements of any kind. That free-to-client commitment is only possible because donors, sponsors, and grant-making institutions fund the organization\u2019s operations. The Fundraising domain is therefore the operational foundation for every other domain: without fundraising, there is no mentoring program to deliver, no mentor cohort to recruit, and no client services to provide. The CRM serves as the single source of truth for every funding relationship, so that any authorized staff member can pick up a donor relationship without losing context, contributions are acknowledged promptly and accurately for tax and stewardship purposes, and grant reporting obligations are met on time."
  )
);
children.push(blank());

children.push(para("1.2 Distinctions from Adjacent Domains", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Fundraising domain is distinct from the other three domains in its subject population and its purpose. The Mentoring and Mentor Recruitment domains work with people in their roles as clients or mentors \u2014 the people whose business outcomes CBM exists to support and the volunteers who deliver that support. The Client Recruiting domain works with people and organizations in their roles as prospective clients or referral partners \u2014 the inflow pipeline that populates Mentoring. The Fundraising domain, by contrast, works with people and organizations in their roles as financial supporters \u2014 the inflow that funds all of the above."
  )
);
children.push(blank());
children.push(
  para(
    "Two practical distinctions matter for process definition. First, an individual can legitimately hold multiple roles simultaneously \u2014 a mentor who also donates, a board member who makes personal contributions, a partner organization that also sponsors \u2014 and the system must track the donor role without displacing the other roles, which is why Contact and Account are shared cross-domain entities. Second, the Fundraising domain consumes program impact data from the Mentoring domain (engagement counts, session hours, client outcomes) for grant compliance and stewardship reporting, but it does not produce or modify that operational data \u2014 it reads it."
  )
);
children.push(blank());

// ==============================
// 2. Personas
// ==============================
children.push(para("2. Personas", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "The Fundraising domain is served by two personas. One owns the domain end-to-end; the other is a board-level oversight consumer with read access to fundraising records and reports."
  )
);
children.push(blank());

children.push(
  para("2.1 MST-PER-010 — Donor / Sponsor Coordinator (Primary operator)", {
    heading: HeadingLevel.HEADING_2,
  })
);
children.push(richPara([{ text: "Backing: ", bold: true }, { text: "External" }]));
children.push(blank());

children.push(richPara([{ text: "Domain-Specific Role. ", bold: true }, {
  text:
    "Owns the Fundraising domain end to end. Manages the full funding relationship lifecycle \u2014 from identifying prospective donors, sponsors, and funding institutions, through cultivation, solicitation, and commitment, to recording contributions, stewarding active relationships, and producing fundraising analytics. Maintains donor and funder profiles on Contact and Account records. Records contributions of all four types (donations, sponsorships, grants, pledges) on the Contribution entity and tracks campaign performance on Fundraising Campaign records. Generates donor acknowledgment records for tax receipt purposes. Tracks grant lifecycle \u2014 application status, award dates, reporting requirements, and renewals \u2014 and responds to reporting deadlines. Produces donor and funding analytics reports for board and management review.",
}]));
children.push(blank());

children.push(
  para(
    "In CBM\u2019s operating model, the Coordinator capability is held by a specific staff member \u2014 a Member Contact (and in some cases a Mentor Contact) who carries the Coordinator responsibilities in addition to their underlying Member or Mentor role. Per-funder relationship ownership is recorded as a custom link field on the Funder Organization Account record, pointing to the specific Contact leading that relationship (analogous to the assignedLiaison pattern used by the Client Recruiting \u2014 Partner Relationship Management sub-domain). This keeps the question \u201Cwho operates the CRM today?\u201D separate from \u201Cwho owns this specific funder relationship?\u201D \u2014 the former is a User permission and session matter, the latter is per-record data. Unusual coordination circumstances \u2014 co-leads, temporary handoffs, specific task ownership \u2014 are recorded as notes on the affected records rather than as additional structured fields."
  )
);
children.push(blank());

children.push(richPara([{ text: "What the CRM Provides in This Domain.", bold: true }]));
[
  "Donor and sponsor profiles on Contact and Account records, with fundraising-specific fields for status, giving history, and lifetime value",
  "Contribution records of all four types (donation, sponsorship, grant, pledge) with type-specific fields surfaced by the contributionType discriminator",
  "Fundraising Campaign records for goal tracking and contribution aggregation",
  "Grant management support \u2014 application status, award tracking, reporting requirements, and reporting deadline alerts",
  "Donor acknowledgment generation for tax receipt purposes",
  "Communication history with each donor and funder",
  "Fundraising analytics \u2014 giving history, campaign performance, pipeline status, and lifetime value trends",
  "Read access to program impact data from the Mentoring domain (engagement counts, session hours, client outcomes) for grant compliance and stewardship reporting",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(
  para("2.2 MST-PER-002 — Executive Member (Oversight consumer)", {
    heading: HeadingLevel.HEADING_2,
  })
);
children.push(richPara([{ text: "Backing: ", bold: true }, { text: "External" }]));
children.push(blank());
children.push(richPara([{ text: "Domain-Specific Role. ", bold: true }, {
  text:
    "Reviews fundraising dashboards, grant pipeline summaries, and donor analytics for board-level oversight. Does not manage day-to-day donor relationships, create or edit fundraising records, or operate the fundraising pipeline. May participate in high-value donor relationships and board-level funder communications as an individual contributor at the Coordinator\u2019s invitation, but is not accountable for pipeline outcomes.",
}]));
children.push(blank());

children.push(richPara([{ text: "What the CRM Provides in This Domain.", bold: true }]));
[
  "Full read access to all fundraising records and reports \u2014 donor and funder profiles, contributions, campaigns, grants",
  "Executive-level fundraising summaries for board oversight \u2014 campaign performance against goals, donor and funding analytics, grant pipeline status",
  "Financial and fundraising summaries at the organization level, integrated with program and operational metrics from other domains",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

// ==============================
// 3. Business Processes
// ==============================
children.push(para("3. Business Processes", { heading: HeadingLevel.HEADING_1 }));

children.push(
  para(
    "The Fundraising domain\u2019s four processes follow a clear sequential lifecycle for every funding relationship, plus a reporting process that reads from the lifecycle and produces analytics on demand. The lifecycle begins with FU-PROSPECT, where the Donor / Sponsor Coordinator identifies a prospective donor, sponsor, or funding institution and works the relationship through the prospecting pipeline \u2014 from initial identification through cultivation, discussion, and commitment. When a prospect commits and moves to Active status, FU-RECORD takes over as the contribution-capture process \u2014 recording donations, sponsorships, grants, and pledges on the Contribution entity, linking them to Fundraising Campaign records where applicable, and generating the acknowledgment records required for tax receipts. Active donors and funders then become the subject population for FU-STEWARD, the ongoing stewardship process that maintains the relationship through acknowledgment communications, impact reporting, periodic outreach, and lapse detection. The lifecycle is cyclical in practice \u2014 stewardship leads to renewed giving, which cycles a contribution back through FU-RECORD and keeps the relationship in Active status."
  )
);
children.push(blank());
children.push(
  para(
    "FU-REPORT operates asynchronously relative to the lifecycle. It reads donor and funder profiles, contributions, campaigns, and stewardship history and produces two classes of output: internal analytics for board and management review (campaign performance against goals, giving trends, lifetime value analysis, pipeline status), and external stakeholder reporting (grant compliance reports combining fundraising data with program impact data from the Mentoring domain, annual donor giving summaries for tax purposes, sponsor recognition reports). FU-REPORT does not create or modify any fundraising records; it is a read-only process that consumes what the lifecycle produces."
  )
);
children.push(blank());
children.push(
  para(
    "The handoff between FU-PROSPECT and FU-RECORD is a status transition on the donor or funder record (Committed \u2192 Active) triggered by the first received contribution, rather than a discrete handoff action. The handoff between FU-RECORD and FU-STEWARD is similarly implicit \u2014 every Active donor is a stewardship subject. Grant compliance obligations introduce one additional trigger pattern: when a grant is awarded through FU-RECORD, reporting deadlines are set on the Contribution record and FU-REPORT produces the required compliance reports at those deadlines, with the Coordinator receiving system alerts before each deadline."
  )
);
children.push(blank());

children.push(para("3.1 Process Inventory", { heading: HeadingLevel.HEADING_2 }));

const procHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("Process Code", { bold: true, fill: "D5E8F0", width: 1560 }),
    cell("Process Name", { bold: true, fill: "D5E8F0", width: 2340 }),
    cell("One-Line Description", { bold: true, fill: "D5E8F0", width: 3120 }),
    cell("Category", { bold: true, fill: "D5E8F0", width: 1400 }),
    cell("Depends On", { bold: true, fill: "D5E8F0", width: 940 }),
  ],
});

const procRow = (code, name, desc, cat, deps) =>
  new TableRow({
    children: [
      cell(code, { width: 1560 }),
      cell(name, { width: 2340 }),
      cell(desc, { width: 3120 }),
      cell(cat, { width: 1400 }),
      cell(deps, { width: 940 }),
    ],
  });

const procTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1560, 2340, 3120, 1400, 940],
  rows: [
    procHeader,
    procRow(
      "FU-PROSPECT",
      "Donor and Sponsor Prospecting",
      "Identifying and pursuing prospective donors, sponsors, and funding institutions through the prospecting pipeline.",
      "Sequential lifecycle",
      "None (entry point)"
    ),
    procRow(
      "FU-RECORD",
      "Contribution Recording",
      "Recording and maintaining accurate records of all incoming funding \u2014 donations, sponsorships, grants, and pledges \u2014 with acknowledgment generation and campaign linkage.",
      "Sequential lifecycle",
      "FU-PROSPECT"
    ),
    procRow(
      "FU-STEWARD",
      "Donor and Sponsor Stewardship",
      "Maintaining active relationships with committed donors and sponsors through communications, reporting, recognition, and lapse detection.",
      "Sequential lifecycle",
      "FU-RECORD"
    ),
    procRow(
      "FU-REPORT",
      "Fundraising Reporting",
      "Producing fundraising analytics, board-level summaries, grant compliance reports, and annual donor giving summaries for internal and external stakeholders.",
      "Asynchronous",
      "FU-PROSPECT, FU-RECORD, FU-STEWARD (reads all three); also reads Mentoring-domain program impact data"
    ),
  ],
});
children.push(procTable);
children.push(blank());

children.push(para("3.2 Implementation Tier Reference", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Per Master PRD Section 3.6, FU-RECORD is Core tier (essential for Year 1 go-live), FU-PROSPECT and FU-STEWARD are Important tier (planned for Year 1 but secondary to Core), and FU-REPORT is Enhancement tier (valuable but may be deferred or delivered in a reduced form at go-live)."
  )
);
children.push(blank());

children.push(para("3.3 Dependency Diagram", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Not embedded in this Domain Overview. A workflow diagram for each process will be drawn during Phase 4b process documentation and placed alongside the process document."
  )
);
children.push(blank());

// ==============================
// 4. Data Reference
// ==============================
children.push(para("4. Data Reference", { heading: HeadingLevel.HEADING_1 }));

children.push(
  para(
    "The Fundraising domain works with four entities. Two are cross-domain entities already defined by earlier Phase 5 work \u2014 Contact and Account \u2014 and participate in FU by virtue of the Donor contactType value and the Donor/Sponsor accountType value respectively. Two are FU-owned entities whose Entity PRDs have not yet been produced and are expected to be drafted in Phase 5 after the four FU process documents are complete \u2014 Contribution and Fundraising Campaign. In addition, FU consumes the Note cross-domain service entity for free-form record notes, and at report time reads program-impact data from Mentoring-domain entities (Engagement, Session) without modifying them."
  )
);
children.push(blank());
children.push(
  para(
    "The four primary FU entities relate as follows. A donor is either an individual (a Contact with contactType including Donor) or an organization (an Account with accountType including Donor/Sponsor). Every recorded gift is a Contribution, with the contributionType discriminator distinguishing the four types (Donation, Sponsorship, Grant, Pledge) and with a link to either the donor Contact or the donor Account as appropriate. A Contribution may optionally be linked to a Fundraising Campaign, which aggregates contributions under a named effort and tracks progress against a goal. Pledges have additional installment links \u2014 individual Donations can be linked back to a parent Pledge for fulfillment tracking."
  )
);
children.push(blank());

// 4.1 Entity Summary table
children.push(para("4.1 Entity Summary", { heading: HeadingLevel.HEADING_2 }));

const entitySummaryHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("Entity", { bold: true, fill: "D5E8F0", width: 1800 }),
    cell("Source", { bold: true, fill: "D5E8F0", width: 2700 }),
    cell("Role in This Domain", { bold: true, fill: "D5E8F0", width: 4860 }),
  ],
});

const entitySummaryRow = (name, source, role) =>
  new TableRow({
    children: [
      cell(name, { width: 1800, bold: true }),
      cell(source, { width: 2700 }),
      cell(role, { width: 4860 }),
    ],
  });

const entitySummaryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1800, 2700, 4860],
  rows: [
    entitySummaryHeader,
    entitySummaryRow(
      "Contact",
      "Cross-domain (Entity PRD v1.6)",
      "Individual donor record. FU reads and updates Contact records for people who give personal contributions, sometimes in dual roles as mentors, members, or board participants."
    ),
    entitySummaryRow(
      "Account",
      "Cross-domain (Entity PRD v1.6)",
      "Organizational donor and funder record. FU reads and updates Account records for companies, foundations, government agencies, corporate sponsors, and community foundations."
    ),
    entitySummaryRow(
      "Contribution",
      "FU-owned (Entity PRD pending Phase 5)",
      "Consolidated funding-transaction record. FU creates one Contribution record per received gift, awarded grant, pledged commitment, or sponsorship agreement. The contributionType discriminator (Donation, Sponsorship, Grant, Pledge) drives type-specific dynamic logic; shared fields and relationships cover every type."
    ),
    entitySummaryRow(
      "Fundraising Campaign",
      "FU-owned (Entity PRD pending Phase 5)",
      "Named fundraising effort that groups related Contributions for goal tracking and performance analysis. Examples: an annual fund drive, a specific program appeal, a capital campaign."
    ),
  ],
});
children.push(entitySummaryTable);
children.push(blank());

// 4.2 Contact Entity
children.push(para("4.2 Contact Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Entity PRD: ", bold: true },
  { text: "PRDs/entities/Contact-Entity-PRD.docx v1.6" },
]));
children.push(blank());
children.push(richPara([{ text: "Most-Relevant Fields for FU", bold: true }]));
[
  "contactType (multiEnum — Donor value gates FU-specific fields)",
  "firstName, lastName, emailAddress, phoneNumber (native)",
  "boardPosition (flags board member giving for segmented stewardship reporting)",
  "Donor-specific custom fields — currently none defined (CON-ISS-003 tracks the donor lifecycle field that will be added during FU Phase 4b work, analogous to mentorStatus for mentors and funderStatus for funder organizations)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

// 4.3 Account Entity
children.push(para("4.3 Account Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Entity PRD: ", bold: true },
  { text: "PRDs/entities/Account-Entity-PRD.docx v1.6" },
]));
children.push(blank());
children.push(richPara([{ text: "Most-Relevant Fields for FU", bold: true }]));
[
  "accountType (multiEnum — Donor/Sponsor value gates FU-specific fields)",
  "name, website, emailAddress, phoneNumber, billingAddressCity, billingAddressState (native)",
  "funderType (enum — Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other)",
  "funderStatus (enum — Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed)",
  "funderLifetimeGiving (currency, system-calculated)",
  "funderNotes (wysiwyg, restricted visibility — Donor/Sponsor Coordinator and above)",
  "Future assignedSponsorCoordinator custom link field to Contact (flagged in Section 2; final name and semantics to be confirmed in Phase 4b; bundled into Account Entity PRD v1.6 → v1.7 carry-forward at end of FU Phase 4b)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

// 4.4 Contribution Entity
children.push(para("4.4 Contribution Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Entity PRD: ", bold: true },
  { text: "Pending Phase 5 (to be produced after FU process documents are complete)" },
]));
children.push(blank());
children.push(richPara([{ text: "Proposed Shared Fields (subject to Phase 5 confirmation)", bold: true }]));
[
  "contributionType (enum discriminator — Donation, Sponsorship, Grant, Pledge)",
  "amount (currency)",
  "date (date received or awarded)",
  "donorContact (link to Contact, conditional)",
  "donorAccount (link to Account, conditional)",
  "campaign (link to Fundraising Campaign, optional)",
  "designation (text — fund or purpose)",
  "paymentMethod (enum)",
  "notes (text)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(richPara([{ text: "Proposed Type-Specific Fields (Donation)", bold: true }]));
[
  "acknowledgmentSent (boolean)",
  "acknowledgmentDate (date)",
  "taxReceiptRequired (boolean)",
  "giftType (enum — Cash, Check, Online Payment, Credit Card, In-Kind, Other)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(richPara([{ text: "Proposed Type-Specific Fields (Pledge)", bold: true }]));
[
  "totalPledgeAmount (currency)",
  "paymentSchedule (enum)",
  "startDate, endDate (date)",
  "fulfillmentStatus (enum)",
  "amountFulfilled, amountRemaining (currency, system-calculated)",
  "parentPledge (self-referential link — for installment Donations)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(richPara([{ text: "Proposed Type-Specific Fields (Grant)", bold: true }]));
[
  "grantName (text)",
  "grantStatus (enum — Prospect, Applied, Awarded, Reporting Due, Closed)",
  "applicationDeadline, submissionDate, awardDate (date)",
  "amountRequested, amountAwarded (currency)",
  "grantPeriodStart, grantPeriodEnd (date)",
  "reportingDeadline, reportSubmissionDate (date)",
  "reportSubmitted (boolean)",
  "renewalDate (date)",
  "purposeDesignation (text)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(richPara([{ text: "Proposed Type-Specific Fields (Sponsorship)", bold: true }]));
[
  "sponsorshipTerms (text)",
  "associatedProgramOrEvent (text or relationship — to be finalized)",
  "recognitionObligations (text)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(
  para(
    "All field names, precise value lists, and final dynamic-logic visibility rules will be confirmed during Phase 4b process definition (FU-PROSPECT, FU-RECORD, FU-STEWARD) and formalized in the Phase 5 Contribution Entity PRD session.",
    { italic: true }
  )
);
children.push(blank());

// 4.5 Fundraising Campaign Entity
children.push(para("4.5 Fundraising Campaign Entity", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([
  { text: "Entity PRD: ", bold: true },
  { text: "Pending Phase 5 (to be produced after FU process documents are complete)" },
]));
children.push(blank());
children.push(richPara([{ text: "Proposed Fields (subject to Phase 5 confirmation)", bold: true }]));
[
  "campaignName (text)",
  "campaignType (enum — Annual Fund, Program Appeal, Event, Grant-Funded, Corporate Sponsorship, Other)",
  "goalAmount (currency)",
  "startDate, endDate (date)",
  "status (enum — Planned, Active, Completed, Cancelled)",
  "totalRaised (currency, system-calculated, sum of linked Contributions)",
  "description (text)",
].forEach((t) => children.push(bullet(t)));
children.push(blank());
children.push(
  para(
    "All field names and precise value lists will be finalized during Phase 4b process definition and the Phase 5 Fundraising Campaign Entity PRD session.",
    { italic: true }
  )
);
children.push(blank());

// 4.6 Cross-Domain Entities Flagged
children.push(para("4.6 Cross-Domain Entities Flagged", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Contact and Account are cross-domain. Both participate in Mentoring (MN), Mentor Recruitment (MR), Client Recruiting (CR), and Fundraising (FU). Contact is also the backing entity for MST-PER-011 Mentor, MST-PER-012 Member, and MST-PER-013 Client. Any field additions or visibility rule changes proposed during FU Phase 4b work must be evaluated for downstream impact on MN, MR, and CR processes, and carry-forward updates to the Contact and Account Entity PRDs will be produced as separate artifacts per the guide-carry-forward-updates.md procedure."
  )
);
children.push(blank());

// 4.7 Services Consumed
children.push(para("4.7 Services Consumed", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU consumes the Notes Service for free-form record notes on Contact, Account, Contribution, and Fundraising Campaign records (per Master PRD Section 4.1 and PRDs/services/NOTES/NOTES-MANAGE.docx v1.0). FU-REPORT consumes program-impact data from the Mentoring domain (Engagement and Session records) on a read-only basis for grant-compliance reports."
  )
);
children.push(blank());

// 4.8 Acknowledgment Note
children.push(para("4.8 Note on the Acknowledgment / Tax Receipt Model", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Entity Inventory open issue EI-ISS-001 asks whether donor acknowledgment is a standalone entity or a field-level capability within Contribution. The Section 3 process inventory treats acknowledgment generation as an FU-RECORD capability, which aligns with the field-level capability interpretation (acknowledgmentSent and acknowledgmentDate as type-specific fields on Donation-type Contribution records). EI-ISS-001 is carried forward to FU-RECORD Phase 4b for formal resolution."
  )
);
children.push(blank());

// ==============================
// 5. Updates to Prior Documents
// ==============================
children.push(para("5. Updates to Prior Documents", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "No updates to prior documents are applied in this Domain Overview. One field discovered during synthesis — assignedSponsorCoordinator on Account — is carried forward for a bundled update to the Account Entity PRD at the end of FU Phase 4b, as documented in Section 6 Open Issues."
  )
);
children.push(blank());

// ==============================
// 6. Open Issues
// ==============================
children.push(para("6. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Issues surfaced or carried forward by this Domain Overview. All four are deferred to FU Phase 4b process definition for resolution."
  )
);
children.push(blank());

const issueHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "D5E8F0", width: 1620 }),
    cell("Issue", { bold: true, fill: "D5E8F0", width: 5220 }),
    cell("Resolution Path", { bold: true, fill: "D5E8F0", width: 2520 }),
  ],
});

const issueRow = (id, issue, path) =>
  new TableRow({
    children: [
      cell(id, { width: 1620 }),
      cell(issue, { width: 5220 }),
      cell(path, { width: 2520 }),
    ],
  });

const issuesTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1620, 5220, 2520],
  rows: [
    issueHeader,
    issueRow(
      "CON-ISS-003",
      "Donor lifecycle field not yet defined on Contact. The Master PRD describes donor/sponsor pipeline stages; the concrete field (name, type, enum values, visibility rule) needs to be defined during FU domain process work.",
      "Resolve in FU-PROSPECT Phase 4b. Carry-forward to Contact Entity PRD."
    ),
    issueRow(
      "FU-DO-ISS-001",
      "Funder Organization Account needs a custom link field to Contact identifying the assigned Coordinator for each Funder Organization relationship (working name: assignedSponsorCoordinator). Analogous to the assignedLiaison pattern on Partner Organization Accounts. Final name, type, required status, and visibility rule to be confirmed during FU-PROSPECT Phase 4b.",
      "Resolve in FU-PROSPECT Phase 4b. Carry-forward to Account Entity PRD v1.6 → v1.7, bundled with any other FU-surfaced Account field additions."
    ),
    issueRow(
      "EI-ISS-001",
      "Acknowledgment / Tax Receipt model: separate entity or field-level capability within Contribution? Working position in this Domain Overview is field-level (acknowledgmentSent, acknowledgmentDate, taxReceiptRequired on Donation-type Contribution records).",
      "Resolve in FU-RECORD Phase 4b. Contribution Entity PRD (Phase 5) reflects the confirmed model."
    ),
    issueRow(
      "FU-DO-ISS-002",
      "Contribution entity consolidates the legacy four-entity model (Donation, Pledge, Grant, Sponsorship) into a single entity with a contributionType discriminator per Entity Inventory v1.5. This Domain Overview adopts the consolidated model. Legacy FU Domain PRD v1.0\u2019s four-separate-entities structure is deprecated for all FU Phase 4b work. No action required \u2014 recorded for provenance.",
      "Informational. No further action."
    ),
  ],
});
children.push(issuesTable);
children.push(blank());

// ==============================
// 7. Synthesis Record
// ==============================
children.push(para("7. Synthesis Record", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "This Domain Overview was produced via the synthesis-with-one-gate archetype defined in crmbuilder/PRDs/process/interviews/guide-domain-overview.md v1.1. Because the archetype is synthesis rather than interview, the record below captures the confirmations and decisions made during the session rather than a verbatim transcript."
  )
);
children.push(blank());

children.push(para("7.1 Source Documents Read", { heading: HeadingLevel.HEADING_2 }));
[
  "CBM-Master-PRD.docx v2.5 \u2014 Section 1.1 Mission, Section 3.6 MST-DOM-004 Fundraising, Section 3 Personas (MST-PER-002, MST-PER-010)",
  "CBM-Entity-Inventory.docx v1.5 \u2014 Section 3.3 Contribution, Section 4.7 Contribution detail card, Section 4.8 Fundraising Campaign detail card, Cross-Domain Participation Matrix",
  "Contact-Entity-PRD.docx v1.6 \u2014 Section 3 fields, Section 5.6 Donor dynamic logic, CON-ISS-003",
  "Account-Entity-PRD.docx v1.6 \u2014 Section 3.4 Donor/Sponsor-Specific Fields, Section 3.5 Incomplete Domain Fields",
  "CBM CLAUDE.md \u2014 current implementation state, persona and backing information",
  "CBM-Domain-PRD-Fundraising.md (legacy, archived) \u2014 consulted as source material only; treated as non-authoritative per CBM implementation rules",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

children.push(para("7.2 Decisions Confirmed During Session", { heading: HeadingLevel.HEADING_2 }));
[
  "Section 1 Domain Purpose confirmed, including Year 1 priority language (\u201CYear 1 priorities are to focus on establishing new relationships with as many of the known organizational funding institutions and sponsors as possible\u201D)",
  "Section 2 Personas confirmed \u2014 two personas only (MST-PER-010 Donor / Sponsor Coordinator; MST-PER-002 Executive Member), both External at the persona level. Coordinator capability is held by a specific Member or Mentor Contact; per-Funder-Organization relationship ownership is tracked via a custom link field on Account (working name: assignedSponsorCoordinator).",
  "Coordinator tracked at the Funder Organization Account level only; Contribution and Fundraising Campaign use notes for unusual coordination circumstances.",
  "Process inventory confirmed at four processes: FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT. No additions, renames, or removals.",
  "Dependency ordering confirmed: sequential lifecycle FU-PROSPECT \u2192 FU-RECORD \u2192 FU-STEWARD; FU-REPORT asynchronous reading all three.",
  "Flat domain structure confirmed \u2014 no sub-domains for FU.",
  "Section 4 Data Reference confirmed \u2014 Contact and Account referenced to existing Entity PRDs; Contribution and Fundraising Campaign annotated \u201CEntity PRD pending Phase 5.\u201D Contribution consolidation model (single entity with contributionType discriminator) adopted per Entity Inventory v1.5.",
  "All four Step 7 gaps (Gap 1 CON-ISS-003, Gap 2 assignedSponsorCoordinator, Gap 3 Contribution consolidation, Gap 4 EI-ISS-001) confirmed with recommended dispositions.",
].forEach((t) => children.push(bullet(t)));
children.push(blank());

// ==============================
// 8. Change Log
// ==============================
children.push(para("8. Change Log", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Revision history for this document. The Last Updated value in the metadata table at the top reflects the date and time of the most recent revision."
  )
);
children.push(blank());

const changeLogHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("Version", { bold: true, fill: "D5E8F0", width: 1260 }),
    cell("Date", { bold: true, fill: "D5E8F0", width: 1800 }),
    cell("Changes", { bold: true, fill: "D5E8F0", width: 6300 }),
  ],
});

const changeLogTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1260, 1800, 6300],
  rows: [
    changeLogHeader,
    new TableRow({
      children: [
        cell("1.0", { width: 1260 }),
        cell("04-22-26 10:15", { width: 1800 }),
        cell(
          "Initial release. Phase 4a Domain Overview for the Fundraising (FU) domain produced per crmbuilder/PRDs/process/interviews/guide-domain-overview.md v1.1. Flat domain, four processes (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT), two personas (MST-PER-010, MST-PER-002). Data Reference covers four entities: Contact v1.6 and Account v1.6 (cross-domain, Entity PRDs exist), Contribution and Fundraising Campaign (FU-owned, Entity PRDs pending Phase 5). Consolidated Contribution entity model adopted per Entity Inventory v1.5; legacy FU Domain PRD\u2019s four-separate-entities structure deprecated. Four open issues: CON-ISS-003 (donor lifecycle field, carry forward to FU-PROSPECT), FU-DO-ISS-001 (assignedSponsorCoordinator on Account, carry forward and bundle into Account Entity PRD v1.6 \u2192 v1.7 at end of FU Phase 4b), EI-ISS-001 (acknowledgment / tax-receipt model, carry forward to FU-RECORD), FU-DO-ISS-002 (Contribution consolidation, informational).",
          { width: 6300 }
        ),
      ],
    }),
  ],
});
children.push(changeLogTable);

// ---------- Document build ----------

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 30, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
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
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
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

const outPath = path.join(__dirname, "CBM-Domain-Overview-Fundraising.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath);
});
