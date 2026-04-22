// CBM Fundraising Domain — FU-PROSPECT Process Document Generator
// Produces: FU-PROSPECT.docx (v1.0)
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

function cellRich(runs, opts = {}) {
  const { fill = null, width = null } = opts;
  const cellDef = {
    borders: cellBorders,
    margins: cellMargins,
    children: [
      new Paragraph({
        children: runs.map((r) => new TextRun({ text: r.text, bold: !!r.bold, italic: !!r.italic })),
      }),
    ],
  };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function cellMulti(paragraphs, opts = {}) {
  const { fill = null, width = null } = opts;
  const cellDef = { borders: cellBorders, margins: cellMargins, children: paragraphs };
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
  const { heading = null, spacing = null, alignment = null, numbering = null } = opts;
  const paraDef = {
    children: runs.map((r) => new TextRun({ text: r.text, bold: !!r.bold, italic: !!r.italic })),
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
    children: runs.map((r) => new TextRun({ text: r.text, bold: !!r.bold, italic: !!r.italic })),
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
      new TextRun({ text: "FU-PROSPECT \u2014 Donor and Sponsor Prospecting", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("04-22-26 04:57", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU-PROSPECT", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Category", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Sequential lifecycle (entry point)", { width: 7020 })] }),
    new TableRow({ children: [cell("Implementation Tier", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Important (per Master PRD Section 3.6)", { width: 7020 })] }),
    new TableRow({
      children: [
        cell("Depends On", { bold: true, fill: "E7E6E6", width: 2340 }),
        cell("CBM-Master-PRD.docx v2.5, CBM-Entity-Inventory.docx v1.5, CBM-Domain-Overview-Fundraising.docx v1.0, Contact-Entity-PRD.docx v1.6, Account-Entity-PRD.docx v1.6", { width: 7020 }),
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
    "FU-PROSPECT is the entry point of the Fundraising domain. It identifies prospective donors, sponsors, and funding institutions and moves each one through the prospecting pipeline from initial identification to an active funding relationship. Every downstream Fundraising process \u2014 contribution recording, stewardship, reporting \u2014 operates on records that FU-PROSPECT creates and maintains. Nothing in Fundraising happens without a record in the system, and this process is what puts the record there."
  )
);
children.push(blank());
children.push(
  para(
    "The process is organized around a seven-stage lifecycle: Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed. A prospect enters at Prospect when the Donor / Sponsor Coordinator creates the record. The Coordinator advances the record through Contacted, In Discussion, and Committed as the relationship develops, by judgment rather than by system-enforced criteria. The record reaches Active when the first Contribution is recorded against it in FU-RECORD \u2014 this is the point at which FU-PROSPECT hands off to the rest of the Fundraising lifecycle. Two alternative terminal states, Lapsed and Closed, handle cold and permanent failures respectively."
  )
);
children.push(blank());
children.push(
  para(
    "Profile enrichment is a continuous concern that does not have a \u201cdone\u201d state. FU-PROSPECT creates the donor or funder record with whatever identifying information is available and begins capturing type, status, and relationship information on that record. Subsequent processes \u2014 FU-RECORD and FU-STEWARD \u2014 and subsequent passes through FU-PROSPECT itself continue to add to the profile over the life of the relationship. What FU-PROSPECT completes is the pipeline journey for each prospect; what it does not complete is the profile itself."
  )
);
children.push(blank());
children.push(
  para(
    "Individual donors (people who give personal contributions) and organizational funders (companies, foundations, government agencies, community foundations, corporate sponsors) follow the same pipeline through the same seven stages. The record type differs \u2014 individual donors are represented as Contact records with contactType including Donor, and organizational funders as Account records with accountType including Donor/Sponsor \u2014 but the workflow is unified. Organizational funders typically have multiple Contact records linked to the Funder Organization Account, one for each person at the organization whom the Coordinator interacts with; individual donors have a single Contact record representing the donor themselves."
  )
);
children.push(blank());
children.push(para("1.1 Frequency and Scale", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The process operates in two distinct volume regimes. During the Year 1 ramp-up, the Coordinator adds a large number of records daily as CBM establishes relationships with as many known organizational funding institutions and sponsors as possible (per the Fundraising Domain Overview v1.0, Section 1). In steady state, the rhythm drops off substantially \u2014 a new funding relationship may be added no more than once a month, or less. The system must support both regimes: bulk record creation during ramp-up and single-record creation on demand thereafter."
  )
);
children.push(blank());

// ==============================
// 2. Process Triggers
// ==============================
children.push(para("2. Process Triggers", { heading: HeadingLevel.HEADING_1 }));
children.push(para("2.1 Preconditions", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "There are no preconditions on the process. A Coordinator can add a prospect at any time, without any prior record existing, without any Fundraising Campaign existing, and without any prior process having run. FU-PROSPECT is the entry point of the Fundraising domain and is designed to accept prospects from any source at any time."
  )
);
children.push(blank());
children.push(para("2.2 Required Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The minimum data required to create a prospect record is the identifier only. For a Funder Organization Account, that is the organization name. For an individual donor Contact, that is the first name and the last name. All other information \u2014 contact details, type, status, address, giving context \u2014 is optional at creation and accrues over time as the Coordinator completes research and engagement."
  )
);
children.push(blank());
children.push(para("2.3 Initiation Mechanism", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The process is initiated manually by the Donor / Sponsor Coordinator. The Coordinator decides, on receiving a prospect lead from any source (board referral, research, event follow-up, inbound inquiry, peer organization suggestion, public foundation directory, any other origin), to create a record in the CRM. No system-generated trigger and no scheduled automation creates a prospect record."
  )
);
children.push(blank());
children.push(para("2.4 Initiating Persona", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator (MST-PER-010) initiates the process. The Coordinator has full authority to create prospect records independently \u2014 no approval from the Executive Member or any other party is required. Other personas may supply leads or suggest prospects informally, but the record-creation action is always taken by the Coordinator."
  )
);
children.push(blank());

// ==============================
// 3. Personas Involved
// ==============================
children.push(para("3. Personas Involved", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Two personas from the Master PRD participate in FU-PROSPECT. One operates the process end to end; the other is an oversight consumer with informal participation at the Coordinator\u2019s invitation."
  )
);
children.push(blank());
children.push(para("3.1 MST-PER-010 \u2014 Donor / Sponsor Coordinator (Primary operator)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Sole operator of FU-PROSPECT. Identifies prospective donors, sponsors, and funding institutions from any source. Creates the initial donor Contact or Funder Organization Account record with whatever information is available at the time of entry. Performs research outside the CRM and records findings on the record. Conducts outreach \u2014 letters, emails, calls, meetings, grant applications \u2014 and records activity as free-form notes on the record. Advances the lifecycle field (donorStatus on Contact, funderStatus on Account) through the seven stages by judgment. Moves records to Lapsed when a prospect goes cold but may be re-engaged later, and to Closed when a prospect is permanently out. Links additional Contact records to a Funder Organization Account as the Coordinator meets more people at that organization. Maintains the assignedSponsorCoordinator link on Funder Organization Accounts to identify the specific staff member leading each relationship."
  )
);
children.push(blank());
children.push(para("3.2 MST-PER-002 \u2014 Executive Member (Informal participant)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Informal participant only. The Executive Member may help with introductions to high-value prospects \u2014 board members often know foundation executives, senior corporate contacts, or major individual donors personally \u2014 and may attend cultivation meetings or sign solicitation letters at the Coordinator\u2019s request. The Executive Member does not create or advance records, does not make pipeline decisions, and is not accountable for pipeline outcomes. Any informal participation is recorded on the Coordinator\u2019s free-form notes on the affected record; no structured field tracks Executive Member involvement."
  )
);
children.push(blank());

// ==============================
// 4. Process Workflow
// ==============================
children.push(para("4. Process Workflow", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "The workflow for a single prospect is a seven-step narrative. Stage transitions are Coordinator judgment calls, documented by notes accumulated on the record throughout the process."
  )
);
children.push(blank());

const workflowSteps = [
  "Prospect identification and record creation. The Coordinator identifies a prospective donor, sponsor, or funding institution from any source \u2014 board referral, research, event follow-up, inbound inquiry, peer organization suggestion, a public foundation directory, or any other origin. The Coordinator creates the appropriate record type. For an organizational funder, that is an Account with accountType appended to include Donor/Sponsor, with the organization name and any other immediately available information. For an individual donor, that is a Contact with contactType appended to include Donor, with first name, last name, and any other immediately available information. If the prospect is already in the system in another role (an existing Mentor Contact who is now also donating, an existing Partner Account that is now also sponsoring), the Coordinator appends Donor or Donor/Sponsor to the existing record rather than creating a duplicate.",
  "Initial status set to Prospect. The lifecycle field \u2014 donorStatus on individual donor Contacts, funderStatus on Funder Organization Accounts \u2014 is set to Prospect by default when Donor or Donor/Sponsor is appended to the record type. The funderType field on Funder Organization Accounts is set at the Coordinator\u2019s discretion as soon as the funder category is known (Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other).",
  "Research and adequacy assessment. The Coordinator evaluates whether the information currently on the record is adequate to support outreach. If adequate, the Coordinator proceeds to outreach (step 4). If inadequate, the Coordinator performs research outside the CRM \u2014 public websites, the organization\u2019s own materials, news coverage, foundation directories, public filings \u2014 and adds findings to the record. A note on the record explains the Coordinator\u2019s reasoning for deferring outreach. Research and enrichment form a loop: the Coordinator may return to this step many times, at any time in the future, until the Coordinator judges the information sufficient to proceed.",
  "Outreach and transition to Contacted. The Coordinator makes first contact \u2014 sends a letter, email, or grant application; places a call; holds a meeting; or uses whatever first-touch channel fits the prospect. The Coordinator advances the lifecycle field from Prospect to Contacted and records the outreach as a note on the record.",
  "Relationship development and transition to In Discussion. As correspondence, meetings, application exchanges, or other cultivation activity accumulates, the Coordinator advances the lifecycle field from Contacted to In Discussion when the relationship has moved beyond initial contact into substantive back-and-forth. Notes accumulate on the record documenting the progress. For organizational funders, the Coordinator links additional Contact records to the Account as additional people at the organization enter the conversation \u2014 program officers, grants administrators, executive directors, marketing contacts, CSR managers. Each linked Contact carries contactType appended with Donor.",
  "Commitment and transition to Committed. When the prospect signals some form of future funding intent, the Coordinator advances the lifecycle field from In Discussion to Committed. The specific meaning of Committed varies by prospect \u2014 it may be a verbal pledge, a signed sponsorship agreement, a grant-award letter, an executed memorandum of understanding, or any other commitment the Coordinator judges to be firm. The variation is expected; the Coordinator records the specifics on the funderNotes field (for Funder Organization Accounts) or the donorNotes field (for individual donor Contacts).",
  "Activation and handoff to FU-RECORD. When the Coordinator creates the first Contribution record against the donor or funder in FU-RECORD, the lifecycle field advances from Committed to Active. This is the handoff point from FU-PROSPECT to the rest of the Fundraising lifecycle. The Contribution that triggers activation may be a Donation (cash received), a Grant (award recorded), a Pledge (commitment documented), or a Sponsorship (agreement executed) \u2014 the transition treats all four uniformly because the commitment is what marks the relationship as live, and any of the four contribution types embodies a commitment worth recording.",
];

workflowSteps.forEach((s, i) => {
  const first = `${i + 1}. `;
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: first, bold: true }),
        new TextRun({ text: s.substring(s.indexOf(" ") + 1) === s ? s : s, bold: false }),
      ],
    })
  );
  children.push(blank());
});

children.push(para("4.1 Alternative Paths \u2014 Lapsed and Closed", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "At any stage from Contacted through Committed, the Coordinator may advance the lifecycle field to Lapsed or Closed rather than continuing through the main pipeline. These alternative transitions are also judgment calls by the Coordinator and are documented by notes."
  )
);
children.push(blank());
children.push(
  richBullet([
    { text: "Lapsed", bold: true },
    { text: " means the prospect has gone cold but may be re-engaged later. Outreach has stalled, the prospect has stopped responding, the timing is not right, or other organizational priorities have taken precedence. The relationship is not over; it is dormant. Re-engagement at any later date is at the Coordinator\u2019s discretion." },
  ])
);
children.push(
  richBullet([
    { text: "Closed", bold: true },
    { text: " means the prospect is permanently out. The prospect has declined explicitly, the organization has been judged unsuitable (mission misalignment, legal or ethical concerns), the organization no longer exists, or CBM has decided not to pursue the relationship. Reopening a Closed record in the future is possible at the Coordinator\u2019s discretion if circumstances materially change \u2014 organizations change, leadership changes, mission alignment changes \u2014 and the distinction between reopening and creating a new record is likewise the Coordinator\u2019s call." },
  ])
);
children.push(blank());
children.push(para("4.2 Re-Engagement from Lapsed or Closed", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "When the Coordinator decides to re-engage a Lapsed or Closed prospect, two paths are available and the choice is at the Coordinator\u2019s discretion. The Coordinator may reopen the existing record by advancing the lifecycle field back to Contacted or In Discussion and resuming work on it, or the Coordinator may create a fresh record and leave the prior one in its terminal state. The reasoning for the chosen path is recorded on the record notes. No system rule governs the choice."
  )
);
children.push(blank());

// ==============================
// 5. Process Completion
// ==============================
children.push(para("5. Process Completion", { heading: HeadingLevel.HEADING_1 }));
children.push(para("5.1 Normal Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Normal successful completion is the transition of the lifecycle field to Active, which occurs when the first Contribution is recorded against the donor or funder in FU-RECORD. At this point the prospecting pipeline has delivered a live funding relationship and the FU-RECORD and FU-STEWARD processes take over for contribution tracking and ongoing stewardship. The FU-PROSPECT record \u2014 the donor Contact or the Funder Organization Account \u2014 remains in the system permanently and continues to accumulate profile information through later processes."
  )
);
children.push(blank());
children.push(para("5.2 Alternative End States", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Two alternative end states are available, both at the Coordinator\u2019s discretion:"
  )
);
children.push(
  richBullet([
    { text: "Lapsed", bold: true },
    { text: " \u2014 the prospect has gone cold. The record remains in the system and may be re-engaged in the future. The lifecycle field is Lapsed; other fields are not altered by the transition." },
  ])
);
children.push(
  richBullet([
    { text: "Closed", bold: true },
    { text: " \u2014 the prospect is permanently out. The record remains in the system for historical and reporting purposes. The lifecycle field is Closed; other fields are not altered by the transition." },
  ])
);
children.push(blank());
children.push(para("5.3 Completion Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator is responsible for declaring completion in all cases. For the normal Active transition, the declaration is implicit in the creation of the first Contribution record in FU-RECORD. For Lapsed and Closed transitions, the Coordinator explicitly sets the lifecycle field and records the reasoning on the record notes. No approval or sign-off is required from any other party."
  )
);
children.push(blank());
children.push(para("5.4 Post-Completion Handoffs", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Active transition is the handoff to FU-RECORD. Once the first Contribution is recorded, the relationship is the subject of FU-RECORD for contribution tracking and acknowledgment, and of FU-STEWARD for ongoing relationship maintenance, impact reporting, and lapse detection. FU-PROSPECT may still participate in the relationship \u2014 for example, appending additional Contact records to a Funder Organization Account as new staff members enter the conversation \u2014 but the pipeline work itself is complete."
  )
);
children.push(blank());
children.push(
  para(
    "For Lapsed and Closed transitions, there is no downstream process to hand off to. The record remains in the system. FU-REPORT may read Lapsed and Closed records for pipeline analytics, attrition reporting, and re-engagement opportunity identification, but FU-REPORT is an asynchronous consumer that operates on records in all lifecycle states."
  )
);
children.push(blank());
children.push(para("5.5 Early Termination", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "There is no distinct \u201cearly termination\u201d path beyond the two alternative end states already described. A prospect that cannot continue for any reason \u2014 stalled, declined, unsuitable, abandoned by CBM \u2014 is handled by the Coordinator moving the lifecycle field to Lapsed or Closed as appropriate. Neither transition requires any cleanup step beyond the note capturing the reasoning. The record is never deleted."
  )
);
children.push(blank());

// ==============================
// 6. System Requirements
// ==============================
children.push(para("6. System Requirements", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "The system requirements that must be supported by the CRM to enable FU-PROSPECT. Each requirement has a unique identifier of the form FU-PROSPECT-REQ-xxx."
  )
);
children.push(blank());

const requirements = [
  ["FU-PROSPECT-REQ-001", "The system must allow the Donor / Sponsor Coordinator to create a Funder Organization Account record with accountType including Donor/Sponsor, given a minimum of the organization name. All other fields on the Account may be blank at creation and added later."],
  ["FU-PROSPECT-REQ-002", "The system must allow the Donor / Sponsor Coordinator to create an individual donor Contact record with contactType including Donor, given a minimum of first name and last name. All other fields on the Contact may be blank at creation and added later."],
  ["FU-PROSPECT-REQ-003", "The system must support appending Donor to the contactType of an existing Contact \u2014 for example, when an existing Mentor, Member, or Client becomes a donor \u2014 rather than forcing creation of a duplicate Contact record. Appending Donor to contactType makes the Donor-specific fields visible and sets donorStatus to Prospect by default."],
  ["FU-PROSPECT-REQ-004", "The system must support appending Donor/Sponsor to the accountType of an existing Account \u2014 for example, when an existing Partner organization becomes a funder \u2014 rather than forcing creation of a duplicate Account record. Appending Donor/Sponsor to accountType makes the Donor/Sponsor-specific fields visible and sets funderStatus to Prospect by default."],
  ["FU-PROSPECT-REQ-005", "The system must present the donor lifecycle stages \u2014 Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed \u2014 as the values of donorStatus on Donor Contacts and funderStatus on Funder Organization Accounts. The system must allow the Coordinator to transition between any of these values at any time without system-enforced preconditions between stages, since all advancement is Coordinator judgment."],
  ["FU-PROSPECT-REQ-006", "The system must automatically transition the lifecycle field (donorStatus on Contact, funderStatus on Account) from Committed to Active when the first Contribution record is created and linked to that donor Contact or Funder Organization Account. The transition applies regardless of contributionType (Donation, Sponsorship, Grant, or Pledge) \u2014 any recorded contribution marks the relationship as live."],
  ["FU-PROSPECT-REQ-007", "The system must allow the Coordinator to link multiple Contact records to a single Funder Organization Account via the native Contact-to-Account relationship, representing the individuals at the funding organization whom CBM interacts with. Each linked Contact carries contactType including Donor."],
  ["FU-PROSPECT-REQ-008", "The system must provide a custom link field on Funder Organization Accounts named assignedSponsorCoordinator, pointing to a Contact record, identifying the specific staff member leading the relationship with that Funder Organization. The field must be visible only when accountType has Donor/Sponsor. The field must be optional in general but required when funderStatus is Active. Setting, changing, and clearing the value are available to the Coordinator at any time."],
  ["FU-PROSPECT-REQ-009", "The system must provide free-form timestamped and attributed notes on Donor Contacts and Funder Organization Accounts via the Notes Service (per PRDs/services/NOTES/NOTES-MANAGE.docx v1.0), accessible to the Donor / Sponsor Coordinator and above. General activity notes \u2014 outreach events, research findings, conversation logs \u2014 accumulate through this service throughout the process."],
  ["FU-PROSPECT-REQ-010", "The system must support bulk record creation for Donor Contacts and Funder Organization Accounts during ramp-up periods, so the Coordinator can add many prospects in a short window. The mechanism (list import, bulk create, spreadsheet paste, or other) is deferred to implementation; the requirement is that bulk entry is feasible and efficient."],
  ["FU-PROSPECT-REQ-011", "The system must present a pipeline view to the Coordinator showing all Donor Contacts and Funder Organization Accounts grouped by lifecycle stage (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed), with filters available by funderType, assignedSponsorCoordinator, and date of last status change. The exact implementation (dashboard, saved search, dedicated listing) is deferred to Phase 9 \u2014 see FU-PROSPECT-ISS-001."],
  ["FU-PROSPECT-REQ-012", "The system must enforce the Universal Contact-Creation Rules (per CR-MARKETING Sub-Domain Overview v1.3 and Account Entity PRD v1.6 Section 7) when a Donor Contact is created with a website value. Automatic linking to an existing Account is performed only by normalized website-domain match (lowercase, protocol stripped, leading www stripped). Name-based matching is not performed, to avoid linking a Contact to the wrong organization."],
  ["FU-PROSPECT-REQ-013", "The system must restrict visibility of Donor Contact records, Funder Organization Account records, and their sensitive notes fields (donorNotes, funderNotes) to the Donor / Sponsor Coordinator and above (Executive Member, System Administrator). The restriction is consistent with the existing funderNotes field-level security model (per Account Entity PRD v1.6 Section 3.4) and extends that model to the new donorNotes field defined by this process."],
];

const reqHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "E7E6E6", width: 1800 }),
    cell("Requirement", { bold: true, fill: "E7E6E6", width: 7560 }),
  ],
});
const reqRows = [reqHeader].concat(
  requirements.map(
    ([id, text]) =>
      new TableRow({
        children: [cell(id, { width: 1800 }), cell(text, { width: 7560 })],
      })
  )
);
children.push(new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1800, 7560], rows: reqRows }));
children.push(blank());

// ==============================
// 7. Process Data (Supporting)
// ==============================
children.push(para("7. Process Data", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Supporting data read by FU-PROSPECT without being created or modified by the process. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of the field\u2019s role in this process. Required data (the minimum needed to start the process) is covered in Section 2.2 and is not repeated here."
  )
);
children.push(blank());

function dataTableRow(id, name, type, required, values, description) {
  return new TableRow({
    children: [
      cell(id, { width: 1440 }),
      cell(name, { width: 1620 }),
      cell(type, { width: 900 }),
      cell(required, { width: 1080 }),
      cell(values, { width: 1800 }),
      cell(description, { width: 2520 }),
    ],
  });
}

function dataTableHeader() {
  return new TableRow({
    tableHeader: true,
    children: [
      cell("ID", { bold: true, fill: "E7E6E6", width: 1440 }),
      cell("Field Name", { bold: true, fill: "E7E6E6", width: 1620 }),
      cell("Type", { bold: true, fill: "E7E6E6", width: 900 }),
      cell("Required", { bold: true, fill: "E7E6E6", width: 1080 }),
      cell("Values", { bold: true, fill: "E7E6E6", width: 1800 }),
      cell("Description", { bold: true, fill: "E7E6E6", width: 2520 }),
    ],
  });
}

const dataColWidths = [1440, 1620, 900, 1080, 1800, 2520];

// 7.1 Contact (supporting)
children.push(para("7.1 Contact \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Contact fields read by FU-PROSPECT to identify, contact, segment, or match prospects without being created or modified by the process during normal operation."
  )
);
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-001", "contactType (read)", "multiEnum", "Yes (existing)", "Client, Mentor, Partner, Donor, Administrator, Presenter, Member", "Read to determine whether Donor is already present. If absent, appended (see Section 8). If present, no change."),
      dataTableRow("FU-PROSPECT-DAT-002", "firstName", "varchar", "Yes", "\u2014", "Native field. Used to identify and address the individual donor during outreach."),
      dataTableRow("FU-PROSPECT-DAT-003", "lastName", "varchar", "Yes", "\u2014", "Native field. Used to identify and address the individual donor during outreach."),
      dataTableRow("FU-PROSPECT-DAT-004", "emailAddress", "email", "No", "\u2014", "Native field. Used for email outreach during the pipeline."),
      dataTableRow("FU-PROSPECT-DAT-005", "phoneNumber", "phone", "No", "\u2014", "Native field. Used for phone outreach during the pipeline."),
      dataTableRow("FU-PROSPECT-DAT-006", "website", "url", "No", "\u2014", "Native field. Used to trigger Universal Contact-Creation Rules for automatic Account matching when a new Donor Contact is created with a website value (see FU-PROSPECT-REQ-012)."),
      dataTableRow("FU-PROSPECT-DAT-007", "boardPosition", "varchar", "No", "\u2014", "Defined in Contact Entity PRD v1.6 Section 3.2. Read-only reference. Flags board members who are also donating; relevant for stewardship segmentation but not modified by FU-PROSPECT."),
    ],
  })
);
children.push(blank());

// 7.2 Account (supporting)
children.push(para("7.2 Account \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Account fields read by FU-PROSPECT to identify, contact, or reference Funder Organizations without being created or modified by the process during normal operation."
  )
);
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-008", "accountType (read)", "multiEnum", "Yes (existing)", "Client, Partner, Donor/Sponsor", "Read to determine whether Donor/Sponsor is already present. If absent, appended (see Section 8). If present, no change."),
      dataTableRow("FU-PROSPECT-DAT-009", "name", "varchar", "Yes", "\u2014", "Native field. Organization name \u2014 the minimum identifier for a Funder Organization Account."),
      dataTableRow("FU-PROSPECT-DAT-010", "website", "url", "No", "\u2014", "Native field. Used for Account matching under the Universal Contact-Creation Rules. Normalized (lowercase, protocol stripped, leading www stripped) during matching."),
      dataTableRow("FU-PROSPECT-DAT-011", "emailAddress", "email", "No", "\u2014", "Native field. Used for general organizational outreach."),
      dataTableRow("FU-PROSPECT-DAT-012", "phoneNumber", "phone", "No", "\u2014", "Native field. Used for general organizational outreach."),
      dataTableRow("FU-PROSPECT-DAT-013", "billingAddressCity, billingAddressState", "address", "No", "\u2014", "Native address fields. Used for geographic segmentation and mailed-letter outreach."),
      dataTableRow("FU-PROSPECT-DAT-014", "funderLifetimeGiving", "currency", "No", "\u2014", "Defined in Account Entity PRD v1.6 Section 3.4. System-calculated, read-only by FU-PROSPECT. Populated and maintained by FU-STEWARD."),
      dataTableRow("FU-PROSPECT-DAT-015", "clientStatus", "enum", "No", "Prospect, Applicant, Active Client, Inactive Client, Lost (TBD, per CR-MARKETING-ISS-004)", "Defined in Account Entity PRD v1.6 Section 3.2. Read-only reference by FU-PROSPECT. If the Account is also a Client, the Coordinator can see the client-relationship state without modifying it."),
      dataTableRow("FU-PROSPECT-DAT-016", "partnerStatus", "enum", "No", "Active, Inactive, Prospect, Lapsed (per Account Entity PRD v1.6)", "Defined in Account Entity PRD v1.6 Section 3.3. Read-only reference by FU-PROSPECT. If the Account is also a Partner, the Coordinator can see the partner state without modifying it."),
    ],
  })
);
children.push(blank());

// 7.3 Relationships (supporting)
children.push(para("7.3 Relationships \u2014 Supporting", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Relationships read by FU-PROSPECT to navigate the record graph without being created or modified during normal operation."
  )
);
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-017", "Contact \u2194 Account (existing)", "relationship", "No", "\u2014", "Native Contact-to-Account link. Read to navigate between a donor Contact and the Funder Organization they belong to. New links are created by FU-PROSPECT (see Section 8); existing links are read but not modified during operation."),
    ],
  })
);
children.push(blank());

// ==============================
// 8. Data Collected
// ==============================
children.push(para("8. Data Collected", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Data created or updated by FU-PROSPECT. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of how the process creates or updates the field."
  )
);
children.push(blank());
children.push(
  para(
    "Three fields are new to the CRM data model and are surfaced by FU-PROSPECT: donorStatus on Contact, donorNotes on Contact, and assignedSponsorCoordinator on Account. Per the Fundraising Domain Overview v1.0 Section 5, these additions are bundled into the planned carry-forward update to the Contact Entity PRD (v1.6 \u2192 v1.7) and Account Entity PRD (v1.6 \u2192 v1.7) at the end of FU Phase 4b, after FU-STEWARD completes. No carry-forward request is issued by this process document in isolation."
  )
);
children.push(blank());

// 8.1 Contact (created/updated)
children.push(para("8.1 Contact \u2014 Fields Created or Updated", { heading: HeadingLevel.HEADING_2 }));
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-018", "contactType (append Donor)", "multiEnum", "Yes", "Client, Mentor, Partner, Donor, Administrator, Presenter, Member", "Appended with value Donor when a new individual donor is created or an existing Contact is reclassified as a donor. Other values already present on the multi-select are preserved."),
      dataTableRow("FU-PROSPECT-DAT-019", "firstName, lastName, emailAddress, phoneNumber, website", "varchar / email / phone / url", "Conditional", "\u2014", "Native identifying and contact fields. Populated at creation (first name and last name required at minimum) and updated throughout the pipeline as more information becomes available through research and correspondence."),
      dataTableRow("FU-PROSPECT-DAT-020", "donorStatus", "enum", "No (not required)", "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed", "New field introduced by FU-PROSPECT. Closes CON-ISS-003. Visible only when contactType has Donor. Defaults to Prospect when Donor is appended to contactType. Advanced through the pipeline stages by Coordinator judgment. Value set to Active automatically when the first Contribution record linked to this Contact is created in FU-RECORD (see FU-PROSPECT-REQ-006). Audited \u2014 status transitions carry an audit trail matching the pattern used for funderStatus."),
      dataTableRow("FU-PROSPECT-DAT-021", "donorNotes", "wysiwyg", "No", "\u2014", "New field introduced by FU-PROSPECT. Visible only when contactType has Donor. Field-level security restricted to Donor / Sponsor Coordinator and above (Executive Member, System Administrator); hidden from Mentors and general staff. Accumulates sensitive prospecting and stewardship context for individual donors \u2014 the reasons for deferring outreach, relationship strategy, cultivation approach, giving history context \u2014 analogous to funderNotes on Account."),
    ],
  })
);
children.push(blank());

// 8.2 Account (created/updated)
children.push(para("8.2 Account \u2014 Fields Created or Updated", { heading: HeadingLevel.HEADING_2 }));
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-022", "accountType (append Donor/Sponsor)", "multiEnum", "Yes", "Client, Partner, Donor/Sponsor", "Appended with value Donor/Sponsor when a new Funder Organization is created or an existing Account is reclassified as a funder. Other values already present on the multi-select are preserved."),
      dataTableRow("FU-PROSPECT-DAT-023", "name, website, emailAddress, phoneNumber, billingAddressCity, billingAddressState", "varchar / url / email / phone / address", "Conditional", "\u2014", "Native identifying, contact, and address fields. Populated at creation (name required at minimum) and updated throughout the pipeline as more information becomes available."),
      dataTableRow("FU-PROSPECT-DAT-024", "funderType", "enum", "No (not required)", "Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other", "Defined in Account Entity PRD v1.6 Section 3.4. Set by the Coordinator at or shortly after Account creation as soon as the funder category is known. Visible only when accountType has Donor/Sponsor."),
      dataTableRow("FU-PROSPECT-DAT-025", "funderStatus", "enum", "No (not required)", "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed", "Defined in Account Entity PRD v1.6 Section 3.4. Visible only when accountType has Donor/Sponsor. Defaults to Prospect when Donor/Sponsor is appended to accountType. Advanced through the pipeline by Coordinator judgment. Value set to Active automatically when the first Contribution record linked to this Account is created in FU-RECORD (see FU-PROSPECT-REQ-006). Audited."),
      dataTableRow("FU-PROSPECT-DAT-026", "funderNotes", "wysiwyg", "No", "\u2014", "Defined in Account Entity PRD v1.6 Section 3.4. Visible only when accountType has Donor/Sponsor. Field-level security restricted to Donor / Sponsor Coordinator and above. Accumulates sensitive prospecting and stewardship context \u2014 deferral reasoning, relationship strategy, stewardship approach \u2014 throughout the pipeline. Distinct from the Notes Service (FU-PROSPECT-REQ-009), which provides general timestamped and attributed activity notes. The two coexist by design: funderNotes for restricted narrative context, Notes Service for routine activity logging."),
      dataTableRow("FU-PROSPECT-DAT-027", "assignedSponsorCoordinator", "link (to Contact)", "Conditional (required when funderStatus = Active)", "\u2014", "New field introduced by FU-PROSPECT. Advances FU-DO-ISS-001. Visible only when accountType has Donor/Sponsor. Points to the specific Contact (Member or Mentor) leading the relationship with this Funder Organization. Analogous to assignedLiaison on Partner Accounts. Optional in general; required by the time funderStatus reaches Active. Set, changed, and cleared by the Coordinator at any time. Only the current value is stored; assignment history lives in the activity stream."),
    ],
  })
);
children.push(blank());

// 8.3 Relationships (created)
children.push(para("8.3 Relationships \u2014 Created", { heading: HeadingLevel.HEADING_2 }));
children.push(blank());
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: dataColWidths,
    rows: [
      dataTableHeader(),
      dataTableRow("FU-PROSPECT-DAT-028", "Contact \u2194 Account (created)", "relationship", "No", "\u2014", "Native Contact-to-Account link. Created by FU-PROSPECT when an individual Contact representing a staff member at a Funder Organization is linked to that Organization\u2019s Account. A Funder Organization Account may have many linked Donor Contacts \u2014 one per person at the organization whom CBM interacts with. An individual donor (not representing an organization) has no Account link."),
    ],
  })
);
children.push(blank());

// ==============================
// 9. Open Issues
// ==============================
children.push(para("9. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Issues surfaced by this process, and issues inherited from the Fundraising Domain Overview v1.0 with their disposition by FU-PROSPECT."
  )
);
children.push(blank());

const issueHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("ID", { bold: true, fill: "E7E6E6", width: 1620 }),
    cell("Issue", { bold: true, fill: "E7E6E6", width: 4140 }),
    cell("Disposition", { bold: true, fill: "E7E6E6", width: 3600 }),
  ],
});

const issueRows = [
  issueHeader,
  new TableRow({
    children: [
      cell("FU-PROSPECT-ISS-001", { width: 1620 }),
      cell("Pipeline view scope. FU-PROSPECT-REQ-011 specifies a pipeline view grouping Donor Contacts and Funder Organization Accounts by lifecycle stage, with filters by funderType, assignedSponsorCoordinator, and date of last status change. The exact implementation form (dashboard widget, saved list or search, dedicated entity listing, or a combination) is not specified in this process document. The implementation choice is not a blocker for FU-PROSPECT conceptually.", { width: 4140 }),
      cell("Deferred to Phase 9 (YAML Generation) for the Fundraising domain. The pipeline view will be designed when the surrounding Coordinator UI is worked out in implementation.", { width: 3600 }),
    ],
  }),
  new TableRow({
    children: [
      cell("CON-ISS-003", { width: 1620 }),
      cell("Donor lifecycle field not yet defined on Contact. The Master PRD describes donor/sponsor pipeline stages (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed). The concrete field name, type, enum values, and visibility rule needed to be defined during FU domain process work. Carried forward from EI-ISS-006.", { width: 4140 }),
      cell("CLOSED by FU-PROSPECT. The donorStatus field is defined in Section 8.1 (FU-PROSPECT-DAT-020) with the same seven-value enum as funderStatus, visible when contactType has Donor, defaulting to Prospect when Donor is appended. Carry-forward to Contact Entity PRD v1.6 \u2192 v1.7 will be bundled with other FU-surfaced Contact field additions at the end of FU Phase 4b.", { width: 3600 }),
    ],
  }),
  new TableRow({
    children: [
      cell("FU-DO-ISS-001", { width: 1620 }),
      cell("Funder Organization Account needs a custom link field to Contact identifying the assigned Coordinator for each Funder Organization relationship (working name: assignedSponsorCoordinator). Final name, type, required status, and visibility rule to be confirmed during FU-PROSPECT Phase 4b.", { width: 4140 }),
      cell("ADVANCED by FU-PROSPECT. The assignedSponsorCoordinator field is specified in full in Section 8.2 (FU-PROSPECT-DAT-027): link to Contact, visible when accountType has Donor/Sponsor, optional in general but required when funderStatus = Active, Coordinator can set/change/clear at any time. Remains open pending the consolidated carry-forward to Account Entity PRD v1.6 \u2192 v1.7 at the end of FU Phase 4b.", { width: 3600 }),
    ],
  }),
  new TableRow({
    children: [
      cell("EI-ISS-001", { width: 1620 }),
      cell("Acknowledgment / Tax Receipt model: separate entity or field-level capability within Contribution? The Fundraising Domain Overview\u2019s working position is field-level (acknowledgmentSent, acknowledgmentDate, taxReceiptRequired on Donation-type Contribution records).", { width: 4140 }),
      cell("Out of scope for FU-PROSPECT. FU-PROSPECT does not create or modify Contribution records. Issue carries forward to FU-RECORD Phase 4b unchanged.", { width: 3600 }),
    ],
  }),
  new TableRow({
    children: [
      cell("FU-DO-ISS-002", { width: 1620 }),
      cell("Contribution entity consolidates the legacy four-entity model (Donation, Pledge, Grant, Sponsorship) into a single entity with a contributionType discriminator per Entity Inventory v1.5. Informational.", { width: 4140 }),
      cell("No action. FU-PROSPECT does not create or modify Contribution records, so the consolidated-entity model has no direct effect on this process. FU-PROSPECT-REQ-006 (automatic activation on first Contribution) is written against the consolidated model and is consistent with it \u2014 any Contribution of any contributionType triggers activation.", { width: 3600 }),
    ],
  }),
];

children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1620, 4140, 3600],
    rows: issueRows,
  })
);
children.push(blank());

// ==============================
// 10. Interview Transcript
// ==============================
children.push(para("10. Interview Transcript", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Condensed record of the interview, organized by topic area with inline Decision callouts. Conducted 04-22-26 between the Donor / Sponsor Coordinator (administrator) and the interviewer. The transcript captures the substantive exchanges and decisions that shaped the process document; conversational filler has been condensed into clean question-and-answer pairs."
  )
);
children.push(blank());

children.push(para("10.1 Process Purpose and End State", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "What is different in the world after FU-PROSPECT runs for a single prospect compared to before?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "A full profile of a funding entity or person. For organizations, the profile includes as much information as possible about the organization and all the Contacts at that organization, and the type of funding they provide." }]));
children.push(blank());
children.push(richPara([{ text: "Q: ", bold: true }, { text: "\u201cAll contacts\u201d for an organizational funder means multiple individual Contact records linked to a single Funder Organization Account, each representing a real staff member at the donor organization. For an individual donor there is a single Contact. Is that right?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Yes. Organizational funders will likely have more than one Contact; individual donors will be a single Contact." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "The end-state profile for an organizational funder is a Funder Organization Account plus a set of linked Donor Contacts (one per relevant staff member). For an individual donor the profile is a single Donor Contact." }]));
children.push(blank());
children.push(richPara([{ text: "Q: ", bold: true }, { text: "What minimum information must be captured for FU-PROSPECT to be considered successfully complete?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "There is no done state. Information collection is continuous. The minimum is the organization name for a Funder Organization and the first and last name for an individual donor. Everything else can be added asynchronously." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Profile completeness has no terminal state. FU-PROSPECT\u2019s end-state is defined by pipeline stage transitions (reaching Active, Lapsed, or Closed), not by profile completeness. Required data at creation is the name only." }]));
children.push(blank());

children.push(para("10.2 Frequency and Scale", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "How often do new prospects get identified and added, and how many prospects will be in motion at a given time?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "In the early stages (Year 1 ramp-up) a large number of records will be added daily. Then it will drop off \u2014 a new funder may not be added for months." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Two distinct volume regimes are in scope: bulk record creation during ramp-up and single-record creation on demand in steady state. FU-PROSPECT-REQ-010 reflects the bulk-creation requirement." }]));
children.push(blank());

children.push(para("10.3 Preconditions, Required Data, and Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Are there any preconditions \u2014 a prior process that must have completed, a Fundraising Campaign that must exist, minimum information, approval from another party \u2014 before the Coordinator can create a prospect record?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Nothing is required to start." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "No preconditions. The Coordinator can create a prospect record at any time with no system-level, identification-level, or authority-level gating. Required data is the record name only, as established in Section 10.1. The Coordinator has full authority \u2014 no approval from Executive Member or other party." }]));
children.push(blank());

children.push(para("10.4 Personas \u2014 Executive Member Participation", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "When the Executive Member participates informally in a prospect \u2014 for example, making an introduction to a foundation executive \u2014 does the CRM need to record that participation in a structured field, or does it live in free-form notes?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "No structured field." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Executive Member involvement is recorded in free-form notes on the affected record (via funderNotes or donorNotes, or via the Notes Service), not in a structured field. The personas carry over from the Fundraising Domain Overview v1.0 unchanged: Donor / Sponsor Coordinator as sole operator, Executive Member as informal participant at the Coordinator\u2019s invitation." }]));
children.push(blank());

children.push(para("10.5 Workflow \u2014 From Identification to Contacted", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Walk through what the Coordinator does from identifying a new prospect to moving the prospect to Contacted." }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "The Coordinator enters whatever contact information they have and sets the status to Prospect. If the information is adequate they may contact the organization immediately. If not, they do online research, add what they find, and contact when ready. If they are not comfortable that they have enough, they add a note explaining why they have not contacted the source, and at their discretion they continue research later." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Steps 1\u20134 of the workflow are captured: record creation, lifecycle field defaults to Prospect, research and enrichment loop outside the CRM, and Contacted transition on first actual outreach. Notes document the reasoning for any deferral." }]));
children.push(blank());

children.push(para("10.6 Workflow \u2014 Mid-Pipeline Advancement", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "After first contact, how does a Contacted prospect progress to In Discussion, and from In Discussion to Committed? Do foundations, corporate sponsors, and individual donors diverge here?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "The Coordinator continues to log notes about progress until the source moves to the next level." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Mid-pipeline stage advancement is entirely Coordinator judgment, documented by accumulating notes. No system-enforced criteria distinguish Contacted from In Discussion or In Discussion from Committed. No population-specific divergence \u2014 foundations, corporate sponsors, and individual donors follow the same workflow." }]));
children.push(blank());

children.push(para("10.7 Committed \u2014 Definition and Committed-to-Active Transition", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "What specifically defines Committed? Consider three edge cases: a foundation grant-award letter without funds received, a signed sponsorship agreement with payment due in 60 days, and a verbal individual pledge to be paid in installments. Are these Committed or Active?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "It is up to the Coordinator to determine what Committed means. Overall it means there is some funding planned in the future. Specifics vary and go in the notes." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Committed is Coordinator judgment meaning \u201csome funding is planned for the future.\u201d The Committed \u2192 Active transition is triggered by the creation of the first Contribution record in FU-RECORD, regardless of contributionType (Donation, Grant, Pledge, Sponsorship). Any contributionType embodies a commitment worth recording and therefore marks the relationship as live. FU-PROSPECT-REQ-006 encodes this." }]));
children.push(blank());

children.push(para("10.8 Lapsed and Closed \u2014 Distinction and Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Lapsed is a prospect who went cold but could be re-engaged; Closed is permanent. Is that right? Who decides, and is there a time-based automatic transition?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Correct. It is the Coordinator\u2019s call; they will add notes." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Lapsed and Closed are both Coordinator judgment, documented by notes. No time-based automatic transitions. No system-enforced criteria." }]));
children.push(blank());

children.push(para("10.9 Re-Engagement from Lapsed or Closed and Retention", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "For Lapsed, does re-engagement mean moving the existing record back to Contacted or In Discussion (keeping continuity), or starting a new record? For Closed, does the record stay in the system permanently, and if a Closed prospect becomes re-engageable, does the Coordinator reopen or create new?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Up to the Coordinator in both circumstances." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Re-engagement path is Coordinator discretion. Records persist in terminal state; no archival or deletion practice is imposed by the process. The reasoning for reopening versus creating new is recorded in notes." }]));
children.push(blank());

children.push(para("10.10 System Requirements \u2014 Scope Check", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Here are thirteen proposed system requirements covering record creation, type appending, lifecycle field behavior, automatic activation, multi-Contact linkage, the assignedSponsorCoordinator field, Notes Service, bulk creation, pipeline view, Universal Contact-Creation Rules, and field-level visibility. Anything to add, drop, or change?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Looks good." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "FU-PROSPECT-REQ-001 through FU-PROSPECT-REQ-013 are accepted as proposed." }]));
children.push(blank());

children.push(para("10.11 Donor Lifecycle Field (CON-ISS-003)", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Proposal: the donor lifecycle field on Contact is named donorStatus, uses the same seven-value enum as funderStatus, is visible when contactType has Donor, defaults to Prospect when Donor is appended, and is audited. Correct?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Looks good." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "CON-ISS-003 is closed. donorStatus is specified in Section 8.1 as above. Carry-forward to Contact Entity PRD v1.6 \u2192 v1.7 is deferred to the end of FU Phase 4b per the Domain Overview\u2019s Section 5." }]));
children.push(blank());

children.push(para("10.12 assignedSponsorCoordinator Field (FU-DO-ISS-001)", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Proposal: assignedSponsorCoordinator is a link to Contact on the Account, visible when accountType has Donor/Sponsor, optional in general but required when funderStatus = Active, Coordinator can change at any time, no individual-donor equivalent (native assignedUser handles that on Contact). Correct?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Yes." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "FU-DO-ISS-001 is advanced with the full specification above. The issue remains open pending the consolidated carry-forward to Account Entity PRD v1.6 \u2192 v1.7 at the end of FU Phase 4b." }]));
children.push(blank());

children.push(para("10.13 donorNotes Field", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "funderNotes exists on Account and is sensitive, restricted-visibility wysiwyg. The Notes Service covers general activity notes. Should both coexist, or should the Notes Service replace funderNotes?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Use both." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "funderNotes and the Notes Service coexist on Funder Organization Accounts and serve different purposes. funderNotes is restricted-visibility sensitive context; the Notes Service is general timestamped attributed activity logging." }]));
children.push(blank());
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Is a donorNotes field needed on individual donor Contacts, analogous to funderNotes on Account?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Add a donorNotes field that only shows if the type is Donor." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "donorNotes is added to Contact as a wysiwyg restricted-visibility field (Donor / Sponsor Coordinator and above), visible when contactType has Donor. Direct analog to funderNotes on Account. Captured in Section 8.1 (FU-PROSPECT-DAT-021). Added to the bundled end-of-Phase-4b carry-forward to Contact Entity PRD." }]));
children.push(blank());

children.push(para("10.14 Open Issue Disposition and New Issues", { heading: HeadingLevel.HEADING_2 }));
children.push(richPara([{ text: "Q: ", bold: true }, { text: "Proposed dispositions: CON-ISS-003 closed; FU-DO-ISS-001 advanced; EI-ISS-001 carried forward to FU-RECORD unchanged; FU-DO-ISS-002 informational, no action. One new issue FU-PROSPECT-ISS-001 deferring pipeline view implementation to Phase 9. Anything to add or change?" }]));
children.push(richPara([{ text: "A: ", bold: true }, { text: "Looks good." }]));
children.push(richPara([{ text: "Decision: ", bold: true }, { text: "Open Issues section as proposed. No additional issues identified." }]));
children.push(blank());

children.push(para("10.15 Carry-Forward Request Drafts", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Three Entity PRD field additions were surfaced by this interview: donorStatus on Contact (closes CON-ISS-003), donorNotes on Contact (new), and assignedSponsorCoordinator on Account (advances FU-DO-ISS-001). Per the Fundraising Domain Overview v1.0 Section 5 and the session prompt, these are not carried forward as separate requests at the end of this session \u2014 they are bundled into the consolidated Account Entity PRD v1.6 \u2192 v1.7 and Contact Entity PRD v1.6 \u2192 v1.7 carry-forwards that will be drafted after FU-STEWARD completes. No other updates to prior documents were identified during this interview. Therefore no carry-forward request drafts are produced at the close of this session."
  )
);
children.push(blank());

// ==============================
// Change Log
// ==============================
children.push(para("Change Log", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Revision history for this document. The Last Updated value in the metadata table at the top reflects the date and time of the most recent revision."
  )
);
children.push(blank());

const changeLogHeader = new TableRow({
  tableHeader: true,
  children: [
    cell("Version", { bold: true, fill: "E7E6E6", width: 1260 }),
    cell("Date", { bold: true, fill: "E7E6E6", width: 1800 }),
    cell("Changes", { bold: true, fill: "E7E6E6", width: 6300 }),
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
        cell("04-22-26 04:57", { width: 1800 }),
        cell(
          "Initial release. Phase 4b process document for FU-PROSPECT (Donor and Sponsor Prospecting) produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. First process document in the Fundraising domain. Ten sections produced: Process Purpose, Process Triggers, Personas Involved, Process Workflow (7-step narrative plus Lapsed/Closed alternative paths and re-engagement), Process Completion, System Requirements (FU-PROSPECT-REQ-001 through FU-PROSPECT-REQ-013), Process Data (17 supporting data items FU-PROSPECT-DAT-001 through FU-PROSPECT-DAT-017 across Contact and Account), Data Collected (11 created-or-updated data items FU-PROSPECT-DAT-018 through FU-PROSPECT-DAT-028 across Contact and Account), Open Issues (1 new FU-PROSPECT-ISS-001, 4 inherited dispositioned), Interview Transcript (15 topic areas with inline Decision callouts). Three Entity PRD field additions surfaced and recorded for the bundled end-of-FU-Phase-4b carry-forward: donorStatus on Contact (closes CON-ISS-003), donorNotes on Contact (new), and assignedSponsorCoordinator on Account (advances FU-DO-ISS-001). No carry-forward request drafts issued at session close per the Fundraising Domain Overview v1.0 Section 5 bundling decision. Depends on Master PRD v2.5, Entity Inventory v1.5, Fundraising Domain Overview v1.0, Contact Entity PRD v1.6, Account Entity PRD v1.6.",
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

const outPath = path.join(__dirname, "FU-PROSPECT.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath);
});
