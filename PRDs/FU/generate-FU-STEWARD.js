// CBM Fundraising Domain — FU-STEWARD Process Document Generator
// Produces: FU-STEWARD.docx (v1.0)
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
      new TextRun({ text: "FU-STEWARD \u2014 Donor and Sponsor Stewardship", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("04-29-26 19:11", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU-STEWARD", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Category", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Sequential lifecycle", { width: 7020 })] }),
    new TableRow({ children: [cell("Implementation Tier", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Important (per Master PRD Section 3.6)", { width: 7020 })] }),
    new TableRow({
      children: [
        cell("Depends On", { bold: true, fill: "E7E6E6", width: 2340 }),
        cell("CBM-Master-PRD.docx v2.5, CBM-Entity-Inventory.docx v1.5, CBM-Domain-Overview-Fundraising.docx v1.0, FU-PROSPECT.docx v1.0, FU-RECORD.docx v1.0, Contact-Entity-PRD.docx v1.6, Account-Entity-PRD.docx v1.6", { width: 7020 }),
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
    "FU-STEWARD is the periodic-review process for the Fundraising domain. The Donor / Sponsor Coordinator runs a weekly or bi-weekly sweep of all Active donor Contacts and Funder Organization Accounts to identify stewardship gaps \u2014 relationships that have gone too long without contact, Received Contributions that have not been acknowledged, grant-reporting deadlines coming due, recognition obligations pending, and signs that an Active relationship is going cold. The review produces a working list of records needing attention; the Coordinator then takes action against that list \u2014 sending acknowledgments, sending outreach communications, preparing donor-specific impact reports, and transitioning records from Active to Lapsed when warranted. The review-and-act cycle repeats on the next sweep."
  )
);
children.push(blank());
children.push(
  para(
    "The deliverable of FU-STEWARD is funder satisfaction. Every Active funding relationship \u2014 individual donor or organizational funder \u2014 is nurtured to preserve and deepen the relationship over its life. The process operates exclusively on Active records; pre-Active cultivation (Prospect, Contacted, In Discussion, Committed) is owned by FU-PROSPECT, and re-engagement of Lapsed and Closed records is also owned by FU-PROSPECT. The only lifecycle transition FU-STEWARD owns is Active \u2192 Lapsed, the inverse of the Committed \u2192 Active activation that FU-PROSPECT and FU-RECORD jointly produce on first Contribution creation."
  )
);
children.push(blank());
children.push(
  para(
    "FU-STEWARD has no relationship-level \u201cdone\u201d state. Each Active donor or funder remains a stewardship subject for as long as the relationship is Active. The only exit is the Active \u2192 Lapsed transition, performed by the Coordinator when the relationship is judged to have gone dormant. Each individual sweep does have a beginning and an end (the working list is fully addressed or carried to the next sweep), but the process operates against the Active population indefinitely."
  )
);
children.push(blank());

// 1.1 Cadence and Operating Philosophy
children.push(para("1.1 Cadence and Operating Philosophy", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator runs FU-STEWARD on a weekly or bi-weekly cadence \u2014 a periodic portfolio sweep across the Active population to catch any relationship that has been ignored. The cadence is deliberately not reactive. Inbox-driven work \u2014 acknowledgment of a newly arrived Contribution at the moment of recording, response to a funder inquiry \u2014 belongs to FU-RECORD or to general staff communications, not to FU-STEWARD. FU-STEWARD is always a review process that leads to action; the review identifies what needs attention, and the action is what the Coordinator does in response."
  )
);
children.push(blank());
children.push(
  para(
    "The Active population grows over time as more relationships activate (FU-PROSPECT \u2192 FU-RECORD activations) and few exit (Active \u2192 Lapsed is the only exit and is Coordinator-driven). The stewardship workload therefore grows steadily as the Year 1 funder portfolio matures, but each sweep cycle remains finite \u2014 the Coordinator works through three saved lists in one or more sittings on the chosen cadence and the cycle ends when the lists have been fully reviewed."
  )
);
children.push(blank());

// ==============================
// 2. Process Triggers
// ==============================
children.push(para("2. Process Triggers", { heading: HeadingLevel.HEADING_1 }));
children.push(blank());

// 2.1 Preconditions
children.push(para("2.1 Preconditions", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "One precondition: the donor or funder record must be in Active status. For an individual donor, that is a Contact record with donorStatus = Active. For an organizational funder, that is an Account record with funderStatus = Active. Per FU-RECORD-REQ-010 and FU-PROSPECT-REQ-006, the Active status is established automatically when the first Contribution is recorded against the donor or funder, so the precondition flows naturally from the FU-PROSPECT \u2192 FU-RECORD activation."
  )
);
children.push(blank());
children.push(
  para(
    "Records in any other status are not in scope for FU-STEWARD. Prospect, Contacted, In Discussion, and Committed records are owned by FU-PROSPECT for cultivation. Lapsed and Closed records are owned by FU-PROSPECT for re-engagement. No other gating conditions apply \u2014 no minimum number of Contributions, no minimum lifetime giving amount, no required field on the donor or funder profile, no minimum time since activation."
  )
);
children.push(blank());

// 2.2 Required Data
children.push(para("2.2 Required Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "No required data beyond the Active status itself. The Coordinator can review and act on any Active record regardless of how completely the profile is populated. A sparse record \u2014 missing email, missing phone, missing assignedSponsorCoordinator, missing notes \u2014 is still in scope; one possible action during a sweep is enriching such a sparse record (filling in contact details, assigning a coordinator, capturing missing context). Whether the record warrants outreach versus enrichment versus a Lapsed transition is purely Coordinator judgment."
  )
);
children.push(blank());

// 2.3 Initiation Mechanism
children.push(para("2.3 Initiation Mechanism", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Manual only. The Donor / Sponsor Coordinator decides, on their own weekly or bi-weekly cadence, to open the Active list and run a sweep. The system maintains the three saved lists at all times, with stewardship-relevant indicators (last contact date, pending acknowledgments, upcoming grant deadlines) always current, but does not prompt or schedule the sweep. The Coordinator\u2019s discipline drives the cadence."
  )
);
children.push(blank());
children.push(
  para(
    "There is no system-generated trigger, no scheduled automation, and no system-fired reminder that initiates a sweep. The system does not record when the last sweep was completed and does not measure interval since the last sweep. The Coordinator can run a sweep at any time, including more frequently than weekly when circumstances warrant or less frequently if the cadence drifts."
  )
);
children.push(blank());

// 2.4 Initiating Persona
children.push(para("2.4 Initiating Persona", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator (MST-PER-010) is the sole initiator of FU-STEWARD. The Coordinator has full authority to run a sweep at any time; no approval from the Executive Member or any other party is required. No other persona initiates FU-STEWARD work. The Executive Member may consume FU-STEWARD output via reports (lapsed-relationship summaries, stewardship-activity dashboards) and may participate in specific stewardship actions at the Coordinator\u2019s invitation, but neither is initiation."
  )
);
children.push(blank());

// ==============================
// 3. Personas Involved
// ==============================
children.push(para("3. Personas Involved", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Two personas from the Master PRD have roles in FU-STEWARD. One operates the process end to end; one is a read-only consumer of FU-STEWARD output via reports and an informal participant in specific stewardship actions at the operator\u2019s invitation. No other personas participate."
  )
);
children.push(blank());

// 3.1 MST-PER-010 — Donor / Sponsor Coordinator
children.push(para("3.1 MST-PER-010 \u2014 Donor / Sponsor Coordinator (Sole operator)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Sole operator of FU-STEWARD. Runs every weekly or bi-weekly sweep of the Active donor and funder list. Reviews each Active donor Contact and each Active Funder Organization Account on the sweep cadence, working from the three saved lists \u2014 the Active Donors and Funders Sweep List, the Acknowledgment-Pending Contributions list, and the Grant Deadlines list. For each record on the sweep list, reads donorNotes (Contact) or funderNotes (Account) to determine whether there is a valid reason the record has not been contacted recently and, if not, initiates outreach via email, text message, or phone. Updates lastContactDate after every outreach. Sends catch-up acknowledgments for any Received Contributions where acknowledgmentSent = false, then writes acknowledgmentSent and acknowledgmentDate. Reviews Grant Contributions with upcoming or past-due deadlines, prepares the required reports outside the CRM (drawing on Mentoring-domain program-impact data as needed), submits them to the funder, and updates nextGrantDeadline. Reads Sponsorship Contribution notes during per-record review for pending recognition obligations and follows up where needed. Composes donor-specific impact reports outside the CRM when the relationship warrants and records the fact in donorNotes or funderNotes. Transitions donorStatus or funderStatus from Active to Lapsed when the Coordinator judges the relationship has gone dormant; reasoning is recorded narratively in donorNotes or funderNotes. Has full authority \u2014 no approvals required for any FU-STEWARD action."
  )
);
children.push(blank());

// 3.2 MST-PER-002 — Executive Member
children.push(para("3.2 MST-PER-002 \u2014 Executive Member (Read-only consumer + informal participant)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Read-only consumer of FU-STEWARD output via reports and dashboards. Reviews lapsed-relationship summaries, upcoming grant-deadline lists, stewardship-activity overviews, and at-risk-relationship indicators as part of board-level oversight. Does not initiate FU-STEWARD, does not run sweeps, does not transition any record between lifecycle stages, and is not accountable for stewardship outcomes. May be invited by the Coordinator to participate in specific high-value stewardship actions \u2014 signing thank-you letters to major donors, attending donor meetings, making personal calls to top funders. Such participation is an individual contribution at the Coordinator\u2019s discretion, not an Executive Member role. Any informal participation is recorded on the Coordinator\u2019s free-form notes on the affected record (donorNotes, funderNotes, or Contribution notes); no structured field tracks Executive Member involvement, consistent with the FU-PROSPECT informal-participation pattern."
  )
);
children.push(blank());
children.push(
  para(
    "No other personas participate in FU-STEWARD. The Mentor Administrator, Client Recruiter, Partner Coordinator, Content and Event Administrator, and other coordinators do not operate FU-STEWARD even when their work touches the same Contact or Account records used by FU-STEWARD. Donor-specific narrative on donorNotes and funderNotes is restricted to Donor / Sponsor Coordinator and above per FU-PROSPECT-REQ-013, and Contribution and Fundraising Campaign records are not visible to these personas at all per FU-RECORD-REQ-021 and REQ-022."
  )
);
children.push(blank());

// ==============================
// 4. Process Workflow
// ==============================
children.push(para("4. Process Workflow", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-STEWARD operates as a single workflow pattern: a periodic sweep across the Active population, executed against three saved lists. The narrative below describes one complete sweep cycle. Steps 9 and 10 \u2014 donor-specific impact reporting and Sponsorship recognition obligation review \u2014 are activities woven into the per-record review at step 3 rather than separate sweep activities; they are listed as numbered steps to make them visible in the workflow narrative, not because they are executed sequentially after the saved-list reviews."
  )
);
children.push(blank());

children.push(numberedPara(
  "Sweep initiation. The Donor / Sponsor Coordinator decides, on their own weekly or bi-weekly cadence, to run a stewardship sweep. The sweep is manually initiated; the system does not prompt or schedule it."
));
children.push(numberedPara(
  "Review the Active Donors and Funders Sweep List. The Coordinator opens the saved list of all Contact records with donorStatus = Active and all Account records with funderStatus = Active, sorted by lastContactDate ascending \u2014 records with no lastContactDate first (never contacted), followed by records sorted oldest-contact first."
));
children.push(numberedPara(
  "Per-record review on the sweep list. For each record on the list, the Coordinator opens the record and reads donorNotes (for individual donors) or funderNotes (for Funder Organization Accounts) to determine whether there is a valid reason the record has not been contacted recently \u2014 a deliberate cooling-off period, a known scheduling conflict, a strategic pause, or any other context the prior Coordinator narrative captures."
));
children.push(numberedPara(
  "Decision: contact, lapse, or skip. Based on the per-record review, the Coordinator does one of three things. If a valid reason exists in the notes, the Coordinator skips the record and moves to the next one. If no valid reason exists and the relationship still warrants attention, the Coordinator initiates outreach \u2014 email, text message, or phone call \u2014 to the donor or to the Funder Organization\u2019s key contact, then updates lastContactDate to today\u2019s date and records the outreach in donorNotes or funderNotes. If the record has been Active without contact for a long time and the Coordinator judges the relationship has gone dormant, the Coordinator transitions donorStatus or funderStatus to Lapsed; the reasoning is recorded narratively in donorNotes or funderNotes, and the record exits FU-STEWARD scope (any future re-engagement is FU-PROSPECT\u2019s)."
));
children.push(numberedPara(
  "Review the Acknowledgment-Pending Contributions list. The Coordinator opens the saved list of all Contributions with status = Received and acknowledgmentSent = false, sorted by receivedDate ascending. This is the catch-up workload from the hybrid acknowledgment ownership model: most acknowledgments are sent and recorded at the moment of FU-RECORD Contribution creation; this sweep list catches anything that was missed."
));
children.push(numberedPara(
  "Per-Contribution acknowledgment action. For each pending Contribution, the Coordinator sends the acknowledgment communication outside the CRM (a thank-you letter, tax receipt, email of thanks, or other channel as appropriate to the contribution and the donor), then sets acknowledgmentSent = true and acknowledgmentDate to the date the acknowledgment was sent. Specifics of what was sent, if worth preserving, are recorded in the Contribution\u2019s notes field."
));
children.push(numberedPara(
  "Review the Grant Deadlines list. The Coordinator opens the saved list of all Contributions with contributionType = Grant, nextGrantDeadline populated, and status in (Committed, Received), sorted by nextGrantDeadline ascending. Past-due deadlines (where nextGrantDeadline is earlier than today\u2019s date) appear at the top of the list."
));
children.push(numberedPara(
  "Per-Grant deadline action. For each Grant on the list, the Coordinator takes appropriate action. For past-due rows, the Coordinator investigates whether the deadline was missed (corrective action needed), the report was submitted but nextGrantDeadline was not advanced (Coordinator updates the field), or the deadline is genuinely overdue (Coordinator initiates recovery action with the funder). For upcoming rows, the Coordinator prepares the required report or other obligation outside the CRM, drawing on Mentoring-domain program-impact data as needed for grant-compliance content. After submitting the report, the Coordinator updates nextGrantDeadline to the next pending obligation, or clears the field if no further obligations remain."
));
children.push(numberedPara(
  "Donor-specific impact reporting (judgment-driven, woven into per-record review). When the Coordinator judges that a specific Active donor or funder would benefit from a donor-specific impact report \u2014 for example, a major individual donor or a major foundation between formal grant-reporting cycles \u2014 the Coordinator composes the report fully outside the CRM, drawing on Mentoring-domain program-impact data, and sends it. The fact that the report was sent and any context worth preserving is recorded in donorNotes or funderNotes. lastContactDate is updated. Donor-specific impact reports are FU-STEWARD scope; broad impact reports for board oversight or external publication are FU-REPORT scope and are out of scope for this process."
));
children.push(numberedPara(
  "Sponsorship recognition obligation review (woven into per-record review). When reviewing a Funder Organization Account during step 3, if the Account has Sponsorship Contributions with recognition obligations recorded in Contribution notes (logo placement, program advertisement, website listing, verbal recognition at events), the Coordinator reads those notes to determine whether any pending obligations need attention. Action, if needed, is taken outside the CRM (coordinating with the Content and Event Administrator, the marketing function, or the relevant program lead) and recorded narratively in funderNotes or in the Contribution\u2019s notes. No structured tracking field on Sponsorship Contributions; obligation tracking remains note-based per the FU-RECORD design."
));
children.push(numberedPara(
  "Sweep ends. When all three saved lists have been worked through \u2014 Active sweep list, acknowledgment-pending list, grant-deadline list \u2014 the sweep is complete. The Coordinator returns on the next weekly or bi-weekly cadence to repeat. There is no system-recorded \u201csweep completion\u201d event; the sweep is purely an operating practice. A sweep that the Coordinator cannot finish in one sitting is simply paused \u2014 the Coordinator returns to the saved lists later and continues from where they left off."
));
children.push(blank());

// ==============================
// 5. Process Completion
// ==============================
children.push(para("5. Process Completion", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-STEWARD\u2019s completion model is unusual because the process operates indefinitely against the Active population. There is no relationship-level \u201cdone\u201d state; an Active donor or funder remains a stewardship subject for as long as the relationship is Active. Completion exists at two levels: each individual sweep completes when the saved lists have been worked through, and the only relationship-level exit is the Active \u2192 Lapsed transition."
  )
);
children.push(blank());

// 5.1 Sweep-Level Completion
children.push(para("5.1 Sweep-Level Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Each FU-STEWARD sweep completes when the Coordinator has worked through all three saved lists for the cycle \u2014 the Active Donors and Funders Sweep List, the Acknowledgment-Pending Contributions list, and the Grant Deadlines list. The sweep is an operating practice; the system does not record a \u201csweep complete\u201d event, does not lock the sweep, and does not require the Coordinator to declare the sweep finished. The sweep simply ends when the work is done; the next sweep begins on the next weekly or bi-weekly cadence."
  )
);
children.push(blank());

// 5.2 Relationship-Level Completion
children.push(para("5.2 Relationship-Level Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-STEWARD does not declare itself complete at the relationship level. Each Active donor or funder remains a stewardship subject for as long as the relationship is Active. The Coordinator continues to operate against the same record indefinitely, including through new Contributions (which return through FU-RECORD without altering FU-STEWARD\u2019s scope) and through periods of dormancy and re-engagement. The only exit from FU-STEWARD scope is the Active \u2192 Lapsed transition described in Section 5.3."
  )
);
children.push(blank());

// 5.3 Active to Lapsed as the Process Exit
children.push(para("5.3 Active \u2192 Lapsed as the Process Exit", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "When the Coordinator transitions an Active record to Lapsed during the sweep, that record exits FU-STEWARD scope. The transition is purely Coordinator judgment per FU-STEWARD-REQ-003 \u2014 there are no system-enforced thresholds, no time-based automatic transitions, and no system-suggested candidates. The reasoning is recorded narratively in donorNotes (Contact) or funderNotes (Account); no structured lapse-reason field. Once a record is Lapsed, it is out of FU-STEWARD scope and any subsequent re-engagement is FU-PROSPECT\u2019s domain (per FU-PROSPECT Section 4.2 re-engagement scope). FU-STEWARD takes no further interest in the record until and unless it returns to Active via the standard activation pattern \u2014 a new Contribution recorded against the record under FU-RECORD-REQ-010 after FU-PROSPECT has re-engaged the relationship and worked it back through the cultivation stages."
  )
);
children.push(blank());

// 5.4 Completion Authority
children.push(para("5.4 Completion Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator has full authority \u2014 sole authority \u2014 for both sweep-level and relationship-level completion. The sweep ends when the Coordinator says it does. The Active \u2192 Lapsed transition is performed by the Coordinator alone. No approvals from the Executive Member or any other party are required at any point in the process."
  )
);
children.push(blank());

// 5.5 Post-Completion Handoffs
children.push(para("5.5 Post-Completion Handoffs", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-STEWARD has no discrete post-completion handoff event. The two implicit handoffs in the Fundraising domain \u2014 FU-PROSPECT \u2192 FU-RECORD on first Contribution creation, and FU-RECORD \u2192 FU-STEWARD when records reach Active \u2014 operate via the lifecycle field\u2019s automatic and manual transitions; FU-STEWARD does not produce any additional handoff. The Active \u2192 Lapsed transition is the only handoff out of FU-STEWARD, and it is implicit (the field change itself; no event, no notification, no scheduled task)."
  )
);
children.push(blank());
children.push(
  para(
    "FU-STEWARD also feeds FU-REPORT, the asynchronous reporting process to be defined next in Phase 4b. FU-REPORT will read FU-STEWARD\u2019s outputs \u2014 lastContactDate values, lifecycle transitions to Lapsed, the acknowledgment fields, and the stewardship narrative on donorNotes and funderNotes \u2014 to produce stewardship analytics, but FU-STEWARD does not produce a discrete handoff event for FU-REPORT either."
  )
);
children.push(blank());

// 5.6 Early Termination
children.push(para("5.6 Early Termination", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "There is no distinct \u201cearly termination\u201d path for an FU-STEWARD sweep. A sweep that the Coordinator cannot finish in one sitting is simply paused \u2014 the Coordinator returns to the saved lists later and continues from where they left off. There is no concept of an abandoned sweep, no cleanup step, no notification, and no record of a partial sweep. The next time the Coordinator opens the saved lists, they pick up where they left off and continue."
  )
);
children.push(blank());

// 5.7 Amendments and Corrections
children.push(para("5.7 Amendments and Corrections", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Per the FU-RECORD precedent (FU-RECORD-REQ-018), the Coordinator can edit any field on any record at any time. Stewardship narrative on donorNotes and funderNotes, the lastContactDate value on Contact and Account, the acknowledgmentSent and acknowledgmentDate fields on Contribution, the nextGrantDeadline field on Grant Contributions, and the Contribution notes field are all editable at the Coordinator\u2019s discretion. A Lapsed transition can be reversed by the Coordinator (a record can return directly to Active via field edit) if the transition was made in error. After such a reversal, the record is back in FU-STEWARD scope and will appear in the next sweep view."
  )
);
children.push(blank());

// ==============================
// 6. System Requirements
// ==============================
children.push(para("6. System Requirements", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "The system requirements that must be supported by the CRM to enable FU-STEWARD. Each requirement has a unique identifier of the form FU-STEWARD-REQ-xxx. The requirements cover two new fields (lastContactDate on Contact and Account), one new transition pathway (Active \u2192 Lapsed by Coordinator judgment), shared write authorization on three existing field families written by FU-RECORD or by FU-PROSPECT (acknowledgment fields, nextGrantDeadline, the lifecycle and notes fields), three saved lists for the sweep, the no-system-fired-alerts position, read access to Mentoring-domain program-impact data, and audit-and-visibility extensions on the existing audit and security models."
  )
);
children.push(blank());

const reqRows = [
  ["FU-STEWARD-REQ-001", "The system must provide a lastContactDate field (date, optional) on Contact records, visible only when contactType has Donor. The field is manually set by the Donor / Sponsor Coordinator after stewardship outreach to an individual donor. The system does not auto-populate or auto-update this field from any source \u2014 including FU-RECORD Contribution creation, acknowledgment events, or any other system activity."],
  ["FU-STEWARD-REQ-002", "The system must provide a lastContactDate field (date, optional) on Account records, visible only when accountType has Donor/Sponsor. The field is manually set by the Donor / Sponsor Coordinator after stewardship outreach to a Funder Organization Account. The system does not auto-populate or auto-update this field from any source."],
  ["FU-STEWARD-REQ-003", "The system must allow the Coordinator to transition donorStatus (Contact) and funderStatus (Account) from Active to Lapsed at any time. The transition is purely Coordinator judgment; no system-enforced thresholds, no time-based automatic transition, and no system-suggested candidates. The reasoning for the transition is recorded narratively in donorNotes (Contact) or funderNotes (Account); no structured lapse-reason field."],
  ["FU-STEWARD-REQ-004", "The system must allow the Coordinator to set acknowledgmentSent (boolean) and acknowledgmentDate (date) on any Contribution at any time, in addition to the FU-RECORD primary acknowledgment write path. These fields are shared between FU-RECORD and FU-STEWARD: FU-RECORD captures most acknowledgments at the moment of Contribution creation; FU-STEWARD provides catch-up coverage during the sweep for Received Contributions where acknowledgmentSent = false."],
  ["FU-STEWARD-REQ-005", "The system must allow the Coordinator to update nextGrantDeadline on any Grant Contribution at any time \u2014 advancing it to the next pending obligation when one is met, clearing it when no further obligations remain, or correcting it. Per FU-RECORD-REQ-017, the field is already provided; this requirement establishes that FU-STEWARD writes to it during the sweep."],
  ["FU-STEWARD-REQ-006", "The system must present a saved list \u2014 the Active Donors and Funders Sweep List \u2014 showing all Contact records with donorStatus = Active and all Account records with funderStatus = Active, sorted by lastContactDate ascending with null values first (records that have never had a Coordinator outreach appear at the top, followed by oldest-contact records). The exact implementation form (saved search, dynamic list, dedicated view) is deferred to Phase 9."],
  ["FU-STEWARD-REQ-007", "The system must present a saved list \u2014 the Acknowledgment-Pending Contributions list \u2014 showing all Contribution records with status = Received and acknowledgmentSent = false, sorted by receivedDate ascending. The exact implementation form is deferred to Phase 9."],
  ["FU-STEWARD-REQ-008", "The system must present a saved list \u2014 the Grant Deadlines list \u2014 showing all Contribution records with contributionType = Grant, nextGrantDeadline populated, and status in (Committed, Received), sorted by nextGrantDeadline ascending. Past-due deadlines (where nextGrantDeadline is earlier than today\u2019s date) appear at the top of the list. The exact implementation form is deferred to Phase 9."],
  ["FU-STEWARD-REQ-009", "The system must not fire any automated notifications, alerts, reminders, or scheduled prompts in support of FU-STEWARD. The three saved lists are the sole stewardship surface. Sweep cadence is purely Coordinator-driven; the Coordinator opens the lists when they choose."],
  ["FU-STEWARD-REQ-010", "The system must allow the Coordinator to read program-impact data from Mentoring-domain entities (Engagement, Session) on a read-only basis to support donor-specific impact reporting and grant-compliance reporting. Specific report content is composed by the Coordinator outside the CRM; the system provides read access to source data only. The exact form of read access (existing Mentoring-domain reports, dashboards, ad-hoc queries) is deferred to Phase 9."],
  ["FU-STEWARD-REQ-011", "The system must capture changes to donorStatus (Contact) and funderStatus (Account) in the audit trail, including transitions to Lapsed performed by FU-STEWARD. This requirement extends the audit treatment already established for these fields by FU-PROSPECT-DAT-020 and the Account Entity PRD v1.6 Section 3.4, and requires no new audit infrastructure."],
  ["FU-STEWARD-REQ-012", "The system must restrict visibility of all fields written by FU-STEWARD \u2014 lastContactDate on Contact and Account, transitions to Lapsed on donorStatus and funderStatus, and writes to donorNotes and funderNotes \u2014 under the existing field-level and record-level visibility rules established by FU-PROSPECT-REQ-013 (Donor / Sponsor Coordinator and above). FU-STEWARD adds no new visibility requirements. Acknowledgment-field writes per FU-STEWARD-REQ-004 inherit the existing Contribution record-level visibility per FU-RECORD-REQ-021."],
];

const reqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2160, 7200],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell("ID", { bold: true, fill: "D5E8F0", width: 2160 }),
        cell("Requirement", { bold: true, fill: "D5E8F0", width: 7200 }),
      ],
    }),
    ...reqRows.map(([id, text]) => new TableRow({
      children: [cell(id, { width: 2160 }), cell(text, { width: 7200 })],
    })),
  ],
});
children.push(reqTable);
children.push(blank());

// ==============================
// 7. Process Data (Supporting)
// ==============================
children.push(para("7. Process Data", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Supporting data read by FU-STEWARD without being created or modified by the process. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of the field\u2019s role in this process. Required data (the precondition that the donor or funder be Active) is covered in Section 2.2 and is not repeated here. Fields that FU-STEWARD writes \u2014 even if also read \u2014 are listed in Section 8 (Data Collected), not here."
  )
);
children.push(blank());

const dataTableHeader = () =>
  new TableRow({
    tableHeader: true,
    children: [
      cell("ID", { bold: true, fill: "D5E8F0", width: 1500 }),
      cell("Field Name", { bold: true, fill: "D5E8F0", width: 1700 }),
      cell("Type", { bold: true, fill: "D5E8F0", width: 1000 }),
      cell("Required", { bold: true, fill: "D5E8F0", width: 1100 }),
      cell("Values", { bold: true, fill: "D5E8F0", width: 1700 }),
      cell("Description", { bold: true, fill: "D5E8F0", width: 2360 }),
    ],
  });

const dataRow = (id, name, type, required, values, description) =>
  new TableRow({
    children: [
      cell(id, { width: 1500 }),
      cell(name, { width: 1700 }),
      cell(type, { width: 1000 }),
      cell(required, { width: 1100 }),
      cell(values, { width: 1700 }),
      cell(description, { width: 2360 }),
    ],
  });

// 7.1 Contact - Supporting Fields
children.push(para("7.1 Contact \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Contact fields read by FU-STEWARD during per-record review on the Active Donors and Funders Sweep List for individual donor Contacts (contactType has Donor and donorStatus = Active). These fields support the Coordinator\u2019s judgment about how to engage each Active donor; they are not created or modified by FU-STEWARD."
  )
);
children.push(blank());

const contactSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-001",
      "contactType",
      "multiEnum",
      "Yes",
      "Client, Mentor, Partner, Donor, Administrator, Presenter, Member",
      "Read by the sweep filter to identify Donor Contacts. Per Contact Entity PRD v1.6."
    ),
    dataRow(
      "FU-STEWARD-DAT-002",
      "firstName, lastName, emailAddress, phoneNumber",
      "varchar / email / phone",
      "Conditional",
      "\u2014",
      "Read by the Coordinator to identify the donor and to initiate outreach via email or phone. Per Contact Entity PRD v1.6 (native fields)."
    ),
    dataRow(
      "FU-STEWARD-DAT-003",
      "boardPosition",
      "enum",
      "No",
      "Per Contact Entity PRD v1.6 Section 3.2",
      "Read during per-record review to identify board-member donors who may warrant Executive Member participation in stewardship outreach. Per Contact Entity PRD v1.6."
    ),
    dataRow(
      "FU-STEWARD-DAT-004",
      "donorLifetimeGiving",
      "currency",
      "No (system-calculated)",
      "\u2014",
      "Read during per-record review to inform stewardship judgment \u2014 major-gift history may warrant heightened stewardship attention or Executive Member participation. Defined by FU-RECORD-DAT-018; pending bundled carry-forward to Contact Entity PRD v1.6 \u2192 v1.7."
    ),
  ],
});
children.push(contactSupportingTable);
children.push(blank());

// 7.2 Account - Supporting Fields
children.push(para("7.2 Account \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Account fields read by FU-STEWARD during per-record review on the Active Donors and Funders Sweep List for Funder Organization Accounts (accountType has Donor/Sponsor and funderStatus = Active)."
  )
);
children.push(blank());

const accountSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-005",
      "accountType",
      "multiEnum",
      "Yes",
      "Client, Partner, Donor/Sponsor",
      "Read by the sweep filter to identify Funder Organization Accounts. Per Account Entity PRD v1.6."
    ),
    dataRow(
      "FU-STEWARD-DAT-006",
      "name, website, emailAddress, phoneNumber",
      "varchar / url / email / phone",
      "Conditional",
      "\u2014",
      "Read by the Coordinator to identify the Funder Organization and to initiate outreach. Per Account Entity PRD v1.6 (native fields)."
    ),
    dataRow(
      "FU-STEWARD-DAT-007",
      "funderType",
      "enum",
      "No",
      "Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other",
      "Read during per-record review to inform stewardship judgment \u2014 different funder categories typically warrant different stewardship approaches (a Foundation receives compliance-focused stewardship; a Corporation receives recognition-focused stewardship). Per Account Entity PRD v1.6 Section 3.4."
    ),
    dataRow(
      "FU-STEWARD-DAT-008",
      "funderLifetimeGiving",
      "currency",
      "No (system-calculated)",
      "\u2014",
      "Read during per-record review to inform stewardship judgment \u2014 major-funder history warrants heightened attention. Per Account Entity PRD v1.6 Section 3.4 (existing field; calculation specified by FU-RECORD-REQ-013)."
    ),
    dataRow(
      "FU-STEWARD-DAT-009",
      "assignedSponsorCoordinator",
      "link (to Contact)",
      "Conditional (per FU-PROSPECT-REQ-008)",
      "\u2014",
      "Read during per-record review to identify the staff Contact leading the relationship. The Coordinator may consult or coordinate with the assigned Coordinator before initiating outreach for relationships not personally led. Defined by FU-PROSPECT-DAT-027; pending bundled carry-forward to Account Entity PRD v1.6 \u2192 v1.7."
    ),
  ],
});
children.push(accountSupportingTable);
children.push(blank());

// 7.3 Contribution - Supporting Fields
children.push(para("7.3 Contribution \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Contribution fields read by FU-STEWARD during per-record review on the Active sweep list (giving history context), on the Acknowledgment-Pending Contributions list (the records being processed), and on the Grant Deadlines list (the records being processed)."
  )
);
children.push(blank());

const contributionSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-010",
      "contributionType",
      "enum",
      "Yes",
      "Donation, Sponsorship, Grant",
      "Read by the Grant Deadlines list filter (contributionType = Grant) and by the Coordinator during per-record review to understand the type-mix of giving for each donor. Per FU-RECORD-DAT-021."
    ),
    dataRow(
      "FU-STEWARD-DAT-011",
      "status",
      "enum",
      "Yes",
      "Applied, Pledged, Committed, Received, Unsuccessful, Cancelled",
      "Read by the Acknowledgment-Pending list filter (status = Received) and by the Grant Deadlines list filter (status in (Committed, Received)) and by the Coordinator during per-record review. Per FU-RECORD-DAT-022."
    ),
    dataRow(
      "FU-STEWARD-DAT-012",
      "donorContact, donorAccount",
      "link (to Contact / Account)",
      "Conditional",
      "\u2014",
      "Read by the saved-list joins to associate Contributions with their donors. Per FU-RECORD-DAT-023 and DAT-024."
    ),
    dataRow(
      "FU-STEWARD-DAT-013",
      "amount",
      "currency",
      "No",
      "\u2014",
      "Read during per-record review to understand the size of each Contribution and to inform stewardship judgment. Per FU-RECORD-DAT-025."
    ),
    dataRow(
      "FU-STEWARD-DAT-014",
      "receivedDate",
      "date",
      "No",
      "\u2014",
      "Read by the Acknowledgment-Pending list as the secondary sort field and by the Coordinator during per-record review. Per FU-RECORD-DAT-028."
    ),
    dataRow(
      "FU-STEWARD-DAT-015",
      "notes (Contribution)",
      "wysiwyg",
      "No",
      "\u2014",
      "Read during per-record review of Sponsorship Contributions to identify pending recognition obligations recorded narratively at FU-RECORD time. Per FU-RECORD-DAT-034."
    ),
  ],
});
children.push(contributionSupportingTable);
children.push(blank());

// 7.4 Mentoring-Domain Supporting Data
children.push(para("7.4 Mentoring-Domain Supporting Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Read by FU-STEWARD on a read-only basis to support donor-specific impact reporting and grant-compliance reporting per FU-STEWARD-REQ-010. The exact form of read access is deferred to Phase 9."
  )
);
children.push(blank());

const mentoringSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-016",
      "Mentoring-domain program-impact data",
      "aggregate read",
      "No",
      "\u2014",
      "Aggregate read access to Engagement and Session entity data \u2014 engagement counts, session hours, client outcomes, demographic breakdowns \u2014 sufficient to compose grant-compliance reports and donor-specific impact reports outside the CRM. No FU-STEWARD writes to Mentoring-domain entities."
    ),
  ],
});
children.push(mentoringSupportingTable);
children.push(blank());

// ==============================
// 8. Data Collected
// ==============================
children.push(para("8. Data Collected", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Data created or updated by FU-STEWARD. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of how the process creates or updates the field."
  )
);
children.push(blank());
children.push(
  para(
    "Two fields are new to the CRM data model and are surfaced by FU-STEWARD: lastContactDate on Contact and lastContactDate on Account. Per the Fundraising Domain Overview v1.0 Section 5, these additions are bundled into the planned carry-forward update to the Contact Entity PRD (v1.6 \u2192 v1.7) and the Account Entity PRD (v1.6 \u2192 v1.7) at the end of FU Phase 4b, joining the staged additions already there \u2014 donorStatus, donorNotes, donorLifetimeGiving on Contact (from FU-PROSPECT and FU-RECORD), and assignedSponsorCoordinator on Account (from FU-PROSPECT). No carry-forward request for these field additions is issued by this process document in isolation."
  )
);
children.push(blank());
children.push(
  para(
    "Eight existing fields are written by FU-STEWARD as updates: donorStatus, donorNotes, funderStatus, funderNotes, acknowledgmentSent, acknowledgmentDate, nextGrantDeadline, and Contribution notes. The acknowledgment-fields write authorization establishes the FU-STEWARD side of the hybrid acknowledgment ownership model (see Section 9 carry-forward note for the FU-RECORD-side adjustment to v1.0)."
  )
);
children.push(blank());

// 8.1 Contact - Fields Created or Updated
children.push(para("8.1 Contact \u2014 Fields Created or Updated", { heading: HeadingLevel.HEADING_2 }));
children.push(blank());

const contactCreatedTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-017",
      "lastContactDate",
      "date",
      "No",
      "\u2014",
      "New field introduced by FU-STEWARD. Visible only when contactType has Donor. Manually set by the Donor / Sponsor Coordinator during the FU-STEWARD sweep after each stewardship outreach to an individual donor. The system does not auto-populate or auto-update this field from any source \u2014 including FU-RECORD Contribution creation, acknowledgment events, or any other system activity. Read by the Active Donors and Funders Sweep List as the primary sort field. Joins the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7, alongside donorStatus and donorNotes (from FU-PROSPECT) and donorLifetimeGiving (from FU-RECORD)."
    ),
    dataRow(
      "FU-STEWARD-DAT-018",
      "donorStatus (update \u2014 Active to Lapsed)",
      "enum",
      "No",
      "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed",
      "Defined by FU-PROSPECT-DAT-020. FU-STEWARD writes the value Lapsed during the sweep when the Coordinator judges an Active relationship has gone dormant. The transition is purely Coordinator judgment per FU-STEWARD-REQ-003. Reasoning is recorded narratively in donorNotes; no structured lapse-reason field. Audited per FU-PROSPECT-DAT-020 and FU-STEWARD-REQ-011."
    ),
    dataRow(
      "FU-STEWARD-DAT-019",
      "donorNotes (update)",
      "wysiwyg",
      "No",
      "\u2014",
      "Defined by FU-PROSPECT-DAT-021. FU-STEWARD writes during the sweep \u2014 appending stewardship outreach context, the reasoning behind each Active \u2192 Lapsed transition, donor-specific impact-reporting context, and any other narrative content the Coordinator wants to preserve. Field-level security restricts visibility to Donor / Sponsor Coordinator and above per FU-PROSPECT-REQ-013."
    ),
  ],
});
children.push(contactCreatedTable);
children.push(blank());

// 8.2 Account - Fields Created or Updated
children.push(para("8.2 Account \u2014 Fields Created or Updated", { heading: HeadingLevel.HEADING_2 }));
children.push(blank());

const accountCreatedTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-020",
      "lastContactDate",
      "date",
      "No",
      "\u2014",
      "New field introduced by FU-STEWARD. Visible only when accountType has Donor/Sponsor. Manually set by the Donor / Sponsor Coordinator during the FU-STEWARD sweep after each stewardship outreach to a Funder Organization Account. The system does not auto-populate or auto-update this field. Read by the Active Donors and Funders Sweep List as the primary sort field. Joins the bundled end-of-FU-Phase-4b carry-forward to Account Entity PRD v1.6 \u2192 v1.7, alongside assignedSponsorCoordinator (from FU-PROSPECT)."
    ),
    dataRow(
      "FU-STEWARD-DAT-021",
      "funderStatus (update \u2014 Active to Lapsed)",
      "enum",
      "No",
      "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed",
      "Defined in Account Entity PRD v1.6 Section 3.4. FU-STEWARD writes the value Lapsed during the sweep when the Coordinator judges an Active relationship has gone dormant. The transition is purely Coordinator judgment per FU-STEWARD-REQ-003. Reasoning is recorded narratively in funderNotes; no structured lapse-reason field. Audited per Account Entity PRD v1.6 Section 7 and FU-STEWARD-REQ-011."
    ),
    dataRow(
      "FU-STEWARD-DAT-022",
      "funderNotes (update)",
      "wysiwyg",
      "No",
      "\u2014",
      "Defined in Account Entity PRD v1.6 Section 3.4. FU-STEWARD writes during the sweep \u2014 appending stewardship outreach context, the reasoning behind each Active \u2192 Lapsed transition, the fact that a donor-specific impact report was sent and any preserved context, and any other narrative content the Coordinator wants. Field-level security restricts visibility to Donor / Sponsor Coordinator and above."
    ),
  ],
});
children.push(accountCreatedTable);
children.push(blank());

// 8.3 Contribution - Fields Updated
children.push(para("8.3 Contribution \u2014 Fields Updated", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-STEWARD does not create Contribution records (FU-RECORD owns Contribution creation per FU-RECORD-REQ-001 and following). FU-STEWARD updates four Contribution fields during the sweep: the two acknowledgment fields under the hybrid ownership model, the nextGrantDeadline field, and the Contribution notes field."
  )
);
children.push(blank());

const contributionUpdatedTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-STEWARD-DAT-023",
      "acknowledgmentSent (update)",
      "bool",
      "No",
      "\u2014",
      "Defined by FU-RECORD-DAT-032. FU-STEWARD writes the value true during the Acknowledgment-Pending Contributions sweep, after the Coordinator sends the missed acknowledgment communication outside the CRM. Shared with FU-RECORD per the hybrid acknowledgment model: most acknowledgments are written at FU-RECORD Contribution creation; FU-STEWARD provides catch-up coverage."
    ),
    dataRow(
      "FU-STEWARD-DAT-024",
      "acknowledgmentDate (update)",
      "date",
      "No",
      "\u2014",
      "Defined by FU-RECORD-DAT-033. FU-STEWARD sets the date when the catch-up acknowledgment is sent. Shared with FU-RECORD per the hybrid acknowledgment model."
    ),
    dataRow(
      "FU-STEWARD-DAT-025",
      "nextGrantDeadline (update)",
      "date",
      "No",
      "\u2014",
      "Defined by FU-RECORD-DAT-038. FU-STEWARD writes during the Grant Deadlines sweep \u2014 advancing the field to the next pending obligation when one is met, clearing the field when no further obligations remain, or correcting the value. Per FU-STEWARD-REQ-005."
    ),
    dataRow(
      "FU-STEWARD-DAT-026",
      "notes (Contribution, update)",
      "wysiwyg",
      "No",
      "\u2014",
      "Defined by FU-RECORD-DAT-034. FU-STEWARD writes during the sweep \u2014 appending acknowledgment specifics for catch-up acknowledgments, recording stewardship interactions tied to specific Contributions (for example, an acknowledgment-call note on a major Donation), or any other Contribution-specific narrative context the Coordinator wants to preserve. Field-level security follows the Contribution record-level visibility rule per FU-RECORD-REQ-021."
    ),
  ],
});
children.push(contributionUpdatedTable);
children.push(blank());

// ==============================
// 9. Open Issues
// ==============================
children.push(para("9. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "No new open issues are surfaced by FU-STEWARD. Every structural decision was settled in the 04-29-26 interview. Implementation form for the three saved lists (FU-STEWARD-REQ-006, REQ-007, REQ-008) and for the Mentoring-domain read access (FU-STEWARD-REQ-010) is deferred to Phase 9 within the requirement language itself, rather than as separate open issues."
  )
);
children.push(blank());
children.push(
  para(
    "One carry-forward request draft is produced as a separate session-output artifact (not an open issue): the hybrid acknowledgment ownership model surfaced during this interview requires updating FU-RECORD v1.0 \u2192 v1.1 to clarify that FU-RECORD owns primary acknowledgment writes at Contribution creation and that FU-STEWARD owns catch-up acknowledgment writes during the sweep. The carry-forward request is saved at PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md and will be executed in a separate carry-forward session per guide-carry-forward-updates.md v1.1."
  )
);
children.push(blank());
children.push(
  para(
    "Inherited issues from the Fundraising Domain Overview v1.0 with their disposition by FU-STEWARD:"
  )
);
children.push(blank());

const issuesTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1700, 3200, 4460],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell("ID", { bold: true, fill: "D5E8F0", width: 1700 }),
        cell("Issue", { bold: true, fill: "D5E8F0", width: 3200 }),
        cell("Disposition", { bold: true, fill: "D5E8F0", width: 4460 }),
      ],
    }),
    new TableRow({ children: [
      cell("CON-ISS-003", { width: 1700 }),
      cell("Donor lifecycle field not yet defined on Contact.", { width: 3200 }),
      cell("Already CLOSED by FU-PROSPECT v1.0 with the donorStatus field. No action by FU-STEWARD.", { width: 4460 }),
    ] }),
    new TableRow({ children: [
      cell("FU-DO-ISS-001", { width: 1700 }),
      cell("assignedSponsorCoordinator on Account \u2014 custom link field identifying the staff Contact leading each Funder Organization relationship.", { width: 3200 }),
      cell("Already ADVANCED by FU-PROSPECT v1.0; the field is defined as FU-PROSPECT-DAT-027 and staged for the bundled end-of-FU-Phase-4b carry-forward to Account Entity PRD v1.6 \u2192 v1.7. No further action by FU-STEWARD.", { width: 4460 }),
    ] }),
    new TableRow({ children: [
      cell("EI-ISS-001", { width: 1700 }),
      cell("Acknowledgment / Tax Receipt model: separate entity or field-level capability within Contribution?", { width: 3200 }),
      cell("Already CLOSED by FU-RECORD v1.0 with the field-level model (acknowledgmentSent, acknowledgmentDate). FU-STEWARD honors the model under the hybrid ownership pattern: FU-RECORD owns primary acknowledgment writes at Contribution creation; FU-STEWARD owns catch-up acknowledgment writes during the sweep. The hybrid pattern requires a carry-forward update to FU-RECORD v1.0, drafted as a separate artifact at the close of this session.", { width: 4460 }),
    ] }),
    new TableRow({ children: [
      cell("FU-DO-ISS-002", { width: 1700 }),
      cell("Contribution entity consolidates the legacy four-entity model into a single entity with a contributionType discriminator.", { width: 3200 }),
      cell("Informational. No action.", { width: 4460 }),
    ] }),
    new TableRow({ children: [
      cell("CON-ISS-004", { width: 1700 }),
      cell("Contact Entity PRD has incomplete domain coverage \u2014 fields contributed by domains other than the one that originally defined the entity may still be missing.", { width: 3200 }),
      cell("ADVANCED, not closed. FU-STEWARD adds lastContactDate (FU-STEWARD-DAT-017) to the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7, joining donorStatus, donorNotes (from FU-PROSPECT) and donorLifetimeGiving (from FU-RECORD). CON-ISS-004 cannot be closed by FU-STEWARD because FU-REPORT remains to be defined; final closure depends on FU-REPORT also completing its Contact contributions.", { width: 4460 }),
    ] }),
    new TableRow({ children: [
      cell("ACT-ISS-002", { width: 1700 }),
      cell("Account Entity PRD has incomplete domain coverage \u2014 fields contributed by domains other than the one that originally defined the entity may still be missing.", { width: 3200 }),
      cell("ADVANCED, not closed. FU-STEWARD adds lastContactDate (FU-STEWARD-DAT-020) to the bundled end-of-FU-Phase-4b carry-forward to Account Entity PRD v1.6 \u2192 v1.7, joining assignedSponsorCoordinator (from FU-PROSPECT). ACT-ISS-002 cannot be closed by FU-STEWARD because FU-REPORT remains to be defined.", { width: 4460 }),
    ] }),
  ],
});
children.push(issuesTable);
children.push(blank());

// ==============================
// 10. Interview Transcript
// ==============================
children.push(para("10. Interview Transcript", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Condensed record of the interview conducted on 04-29-26 between the Donor / Sponsor Coordinator (administrator) and the interviewer. Organized by topic area with inline Decision callouts. Conversational filler has been condensed into clean question-and-answer pairs; substantive exchanges and decisions are preserved."
  )
);
children.push(blank());

// 10.1 Process Purpose and Scope
children.push(para("10.1 Process Purpose and Scope", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Does the Master PRD\u2019s description \u2014 \u201cMaintaining active relationships with committed donors and sponsors through communications, reporting, recognition, and lapse detection\u201d \u2014 still capture FU-STEWARD?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());
children.push(para("Q: Your initial framing said \u201cnurturing potential and existing funding relationships.\u201d The FU-PROSPECT process scopes pre-Active cultivation (Prospect, Contacted, In Discussion, Committed) to FU-PROSPECT, and FU-STEWARD is scoped to the Active population. Does FU-STEWARD touch the pre-Active population in some way, or is the steward phase only for active funding organizations and contacts?", { italic: true }));
children.push(para("A: I misspoke. The steward phase is only for active funding organizations and contacts."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "FU-STEWARD operates exclusively on Active donor Contacts (donorStatus = Active) and Active Funder Organization Accounts (funderStatus = Active). The Active \u2192 Lapsed transition is FU-STEWARD\u2019s; pre-Active cultivation and re-engagement of Lapsed/Closed records are FU-PROSPECT\u2019s. Confirms the scope already established by the FU Domain Overview, FU-PROSPECT v1.0, and FU-RECORD v1.0." }
]));
children.push(blank());
children.push(para("Q: The deliverable of FU-STEWARD is funder satisfaction, achieved through nurturing Active relationships to preserve and deepen them. Lapse detection (Active \u2192 Lapsed) is the only relationship-level exit. Does this restated purpose match?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());

// 10.2 Cadence and Operating Philosophy
children.push(para("10.2 Cadence and Operating Philosophy", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Is FU-STEWARD a continuous daily activity, a periodic batch activity, or some specific mix?", { italic: true }));
children.push(para("A: I would think this is a weekly or bi-weekly activity to sweep the list to make sure no contacts have been ignored."));
children.push(blank());
children.push(para("Q: Beyond the proactive sweep, is there reactive day-to-day work happening between sweeps \u2014 acknowledging Contributions as they arrive, responding to donor inquiries, handling grant deadlines as they hit?", { italic: true }));
children.push(para("A: Steward is not reactive. It is always a review process that will lead to action."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "FU-STEWARD is a periodic-review process operating on a weekly or bi-weekly cadence. It is not reactive \u2014 inbox-driven work belongs to FU-RECORD or to general staff communications. The review identifies what needs attention; the action is what the Coordinator does in response. Both halves (review and act) are inside FU-STEWARD scope." }
]));
children.push(blank());
children.push(para("Q: There is no relationship-level \u201cdone\u201d state \u2014 the process operates against the Active population indefinitely. Each sweep has a beginning and an end (saved-list completion); the relationship-level exit is Active \u2192 Lapsed. Correct?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());

// 10.3 Preconditions and Required Data
children.push(para("10.3 Preconditions and Required Data", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: The single precondition is that the donor or funder be in Active status. Are records in any other lifecycle status (Prospect, Contacted, In Discussion, Committed, Lapsed, Closed) ever in scope for FU-STEWARD? And does the precondition need anything else \u2014 minimum number of Contributions, minimum lifetime giving, an assigned Coordinator on the Account, or a minimum time since activation?", { italic: true }));
children.push(para("A: 1 \u2014 no, 2 \u2014 no. Just active."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Single precondition is Active status. No other gating conditions on number of Contributions, lifetime giving, assigned Coordinator, or time since activation." }
]));
children.push(blank());
children.push(para("Q: Is there required data the record must have populated before FU-STEWARD can do meaningful work \u2014 for example, an emailAddress on the donor, or assignedSponsorCoordinator on the Funder Account?", { italic: true }));
children.push(para("A: Yes \u2014 [confirming no required data beyond Active status itself]."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "No required data beyond Active status. Sparse records remain in scope and may trigger enrichment actions during the sweep." }
]));
children.push(blank());

// 10.4 Initiation Mechanism and Initiating Persona
children.push(para("10.4 Initiation Mechanism and Initiating Persona", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Does the sweep begin manually (Coordinator decides on their own cadence, no system prompt) or system-prompted (the system surfaces a reminder when the next sweep is due)?", { italic: true }));
children.push(para("A: A. [Manual initiation, no system prompt.]"));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Manual initiation only. The system maintains the saved lists with stewardship indicators always current, but does not prompt the cadence. The Coordinator\u2019s discipline drives sweep frequency." }
]));
children.push(blank());
children.push(para("Q: Donor / Sponsor Coordinator is the sole initiator with full authority, no approvals required. Executive Member is read-only consumer + informal participant at Coordinator\u2019s invitation. Correct?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());

// 10.5 Personas and Roles
children.push(para("10.5 Personas and Roles", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: MST-PER-010 Donor / Sponsor Coordinator runs every sweep, takes all stewardship actions, transitions records to Lapsed when warranted; MST-PER-002 Executive Member consumes reports and may participate in high-value stewardship at the Coordinator\u2019s invitation. No other personas participate. Correct?", { italic: true }));
children.push(para("A: Looks good."));
children.push(blank());

// 10.6 Workflow Brain Dump
children.push(para("10.6 Workflow Brain Dump", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Walk me through a typical sweep from start to finish.", { italic: true }));
children.push(para("A: The sweep begins with the coordinator reviewing a list of active funding organizations or contacts. It would be ideal if there was a field that shows the last activity date so the coordinator can quickly identify any organizations that have not been contacted recently. They would then open the record for the funding organization and review the notes to determine if there is a valid reason for the lack of contact, and if none exists would initiate an email, text, phone contact with the organization\u2019s key contact. They would then update the last contact date, and move on to the next organization or contact in their active list."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "The seven-step happy-path walkthrough establishes the core sweep: open the Active list sorted by recency of contact, open each record, read notes, decide between contact / lapse / skip, take action, update the last-contact-date field, move on. This walkthrough became the foundation for the workflow narrative in Section 4 and surfaced the lastContactDate field as a load-bearing requirement." }
]));
children.push(blank());

// 10.7 Acknowledgment Communications
children.push(para("10.7 Acknowledgment Communications and the Hybrid Ownership Model", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: FU-RECORD established acknowledgmentSent and acknowledgmentDate fields on every Contribution and explicitly relegated acknowledgment generation, sending, and tax-receipt content to FU-STEWARD scope. How does FU-STEWARD handle acknowledgments? Three possibilities: acknowledgment is part of the same sweep; acknowledgment is a different sweep; or acknowledgment is not really FU-STEWARD work in CBM\u2019s actual operating model.", { italic: true }));
children.push(para("A: 3 \u2014 Really the acknowledgment action is part of the record function. When the check is received, the coordinator should respond immediately as part of the Record process."));
children.push(blank());
children.push(para("Q: That contradicts FU-RECORD v1.0\u2019s closing position. Two ways to reconcile: option 1 \u2014 FU-RECORD owns acknowledgment fully, FU-STEWARD has no role; or there is a hybrid \u2014 FU-RECORD primary, FU-STEWARD catch-up safety net. Which?", { italic: true }));
children.push(para("A: There is a third possibility \u2014 it seems more efficient and practical to send the acknowledgment when recording the payment, and the coordinator could take the action at that point. However, if they do not, the sweep could be a process that assures it gets sent."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "The hybrid acknowledgment ownership model is adopted. FU-RECORD owns primary acknowledgment writes at the moment of Contribution creation \u2014 the efficient, practical, expected path. FU-STEWARD owns catch-up coverage during the sweep for any Received Contributions where acknowledgmentSent = false. The acknowledgmentSent and acknowledgmentDate fields are shared write fields between the two processes. This requires a carry-forward update to FU-RECORD v1.0 (drafted as a separate artifact at session close) to clarify the shared ownership." }
]));
children.push(blank());

// 10.8 Grant-Reporting Deadline Tracking
children.push(para("10.8 Grant-Reporting Deadline Tracking", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Is grant-deadline review part of the sweep, or is it handled separately (calendar reminder, external task list)?", { italic: true }));
children.push(para("A: Yes [part of the sweep]."));
children.push(blank());
children.push(para("Q: Should the system filter to a specific lead time \u2014 \u201cshow all grants with deadlines within 30 days\u201d \u2014 or do you want a different filter?", { italic: true }));
children.push(para("A: Let\u2019s create a filter \u2018Show all grants with a deadline sorted declining.\u2019"));
children.push(blank());
children.push(para("Q: \u201cDescending\u201d on dates can mean either most distant first (literal descending sort) or most urgent first (closest deadline first, which is technically ascending). For stewardship review, most urgent first is almost always what is wanted. Which?", { italic: true }));
children.push(para("A: 1 \u2014 most urgent first."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "The Grant Deadlines list shows all Grant Contributions with nextGrantDeadline populated, sorted by nextGrantDeadline ascending \u2014 closest deadline at top, most distant at bottom. The Coordinator works the list top-down, addressing the most urgent deadlines first." }
]));
children.push(blank());
children.push(para("Q: Should the view filter out terminal-status Grants (Received, Unsuccessful, Cancelled) or include all Grants with a populated deadline regardless of status?", { italic: true }));
children.push(para("A: Committed and received only."));
children.push(blank());
children.push(para("Q: Past-due deadlines (where nextGrantDeadline is earlier than today) \u2014 shown or hidden?", { italic: true }));
children.push(para("A: Passed should be shown because it may be overdue."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Grant Deadlines list filter: contributionType = Grant AND nextGrantDeadline populated AND status in (Committed, Received). Sort: nextGrantDeadline ascending, with past-due deadlines naturally at the top. The Coordinator investigates past-due rows (deadline missed, field needs updating, or recovery action needed) and prepares reports for upcoming deadlines outside the CRM." }
]));
children.push(blank());

// 10.9 Recognition Obligations on Sponsorships
children.push(para("10.9 Recognition Obligations on Sponsorships", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Sponsorship recognition obligations are recorded in Contribution notes per FU-RECORD\u2019s design. FU-RECORD Section 4.2 noted that obligation tracking is FU-STEWARD scope. Three options: no structured tracking (Coordinator reads notes during sweep); a recognitionObligationsPending boolean on Sponsorships (sweep view surfaces flagged Sponsorships); or defer structured support to a future iteration.", { italic: true }));
children.push(para("A: 1."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "No structured tracking for recognition obligations. The Coordinator reads Sponsorship Contribution notes during the sweep as part of reviewing each Active funder\u2019s records and follows up through Coordinator discipline. No dedicated field, no dedicated sweep view, no system support beyond the notes field FU-RECORD already provides on Sponsorship Contributions." }
]));
children.push(blank());

// 10.10 Donor-Specific Impact Reporting
children.push(para("10.10 Donor-Specific Impact Reporting", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Are donor-specific impact reports (sent to individual major donors or major foundations) FU-STEWARD work, while broad impact reports for board oversight are FU-REPORT work?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());
children.push(para("Q: For donor-specific impact reports under FU-STEWARD, three options: fully manual outside the CRM (Coordinator composes letter or email externally, fact recorded in donor notes); CRM-assisted composition (system provides donor-specific impact data view, report still composed externally); or templated impact report generation (system has templates with merge fields and produces a draft).", { italic: true }));
children.push(para("A: 1."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Donor-specific impact reports are composed entirely outside the CRM. The fact that a report was sent and any context worth preserving is recorded by the Coordinator in donorNotes or funderNotes during the sweep. lastContactDate is updated. Broad board-level and externally-published impact reports are FU-REPORT scope and are out of scope for FU-STEWARD." }
]));
children.push(blank());

// 10.11 Active to Lapsed Transition
children.push(para("10.11 Active \u2192 Lapsed Transition", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: When does a record cross from \u201cstale, needs outreach\u201d (still Active) to \u201cLapsed\u201d (relationship judged dormant)? Three triggering models: pure Coordinator judgment with no system support; system surfaces lapsed-candidates by configurable threshold but Coordinator decides; or time-based automatic transition.", { italic: true }));
children.push(para("A: 1."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Pure Coordinator judgment, no system support for the Active \u2192 Lapsed transition. The sweep surfaces stale records via the lastContactDate sort, but the system does not propose, flag, or auto-apply a Lapsed transition. The Coordinator weighs elapsed time, notes, giving history, and prior outreach attempts and decides whether to attempt another outreach (stays Active) or transition to Lapsed. Consistent with the Coordinator-judgment philosophy FU-PROSPECT and FU-RECORD established for every non-activation transition." }
]));
children.push(blank());
children.push(para("Q: When the Coordinator does transition Active \u2192 Lapsed, reasoning goes in donorNotes or funderNotes. No structured lapseReason enum or similar?", { italic: true }));
children.push(para("A: Yes."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "No structured lapseReason field. Reasoning is recorded narratively in donorNotes or funderNotes, consistent with FU-PROSPECT\u2019s pattern for all judgment-driven transitions." }
]));
children.push(blank());

// 10.12 The lastContactDate Field
children.push(para("10.12 The lastContactDate Field", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: The field is load-bearing for the entire FU-STEWARD process. Candidates for the field name: lastContactDate, lastStewardshipContact, lastOutreachDate, or something else?", { italic: true }));
children.push(para("A: 1."));
children.push(blank());
children.push(para("Q: What writes the field? Manual only; manual plus auto-write from FU-RECORD Contribution creation; or manual plus auto-write from any FU-domain activity?", { italic: true }));
children.push(para("A: 1."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "lastContactDate is a date field on Contact (visible when contactType has Donor) and on Account (visible when accountType has Donor/Sponsor). Manually-set only. The system does not auto-write from FU-RECORD, acknowledgment events, or any other source. The semantic is unambiguous: lastContactDate means \u201cthe last date the Coordinator reached out to this donor.\u201d Both fields are new \u2014 they join the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7 and Account Entity PRD v1.6 \u2192 v1.7." }
]));
children.push(blank());

// 10.13 Sweep View Structure
children.push(para("10.13 Sweep View Structure", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: How should the sweep view be structured? Three options: one unified dashboard with three sections; three separate views navigable from a common landing page; or three independent saved searches with no collected entry point.", { italic: true }));
children.push(para("A: 3."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "Three independent saved searches/lists with no collected entry point. The Coordinator knows to run all three during the weekly or bi-weekly sweep but the system does not bundle them under a single \u201cFU-STEWARD\u201d landing page. Lightest-touch design, consistent with the deferral pattern FU-PROSPECT-REQ-011 and FU-RECORD-REQ-023 established. Implementation form deferred to Phase 9. The three lists are: Active Donors and Funders Sweep List, Acknowledgment-Pending Contributions, and Grant Deadlines." }
]));
children.push(blank());

// 10.14 System-Fired Alerts
children.push(para("10.14 System-Fired Alerts", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Do any system-fired alerts exist in FU-STEWARD \u2014 grant-deadline alerts, new-Contribution prompts, stale-Active alerts \u2014 or none at all?", { italic: true }));
children.push(para("A: 1. [No system-fired alerts.]"));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "No system-fired alerts in FU-STEWARD. The sweep is the sole mechanism. The three saved lists are the sole surface. No email notifications, no in-system alerts, no scheduled reminders. The Coordinator relies entirely on running the sweep on the weekly or bi-weekly cadence. Fully consistent with the discipline-based, manually-initiated philosophy established for the process." }
]));
children.push(blank());

// 10.15 Out-of-Scope Confirmation
children.push(para("10.15 Out-of-Scope Confirmation", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Items the prior FU work mentioned as candidate FU-STEWARD scope but not yet discussed: stewardshipTier segmentation, stewardshipPlan narrative, preferredStewardshipChannel, special handling for re-Activation from Lapsed, anything else in your operating picture. Any of these to address?", { italic: true }));
children.push(para("A: It\u2019s complete."));
children.push(richPara([
  { text: "Decision: ", bold: true },
  { text: "FU-STEWARD scope is complete with the eleven activity areas covered. No stewardshipTier, no stewardshipPlan, no preferredStewardshipChannel. No special handling for re-Activation from Lapsed (the standard FU-PROSPECT-REQ-006 / FU-RECORD-REQ-010 activation pattern handles it cleanly: a new Contribution after re-engagement transitions the record back to Active and FU-STEWARD picks it up in the next sweep with lastContactDate carried over from the prior Active period)." }
]));
children.push(blank());

// 10.16 Section 5 Process Completion
children.push(para("10.16 Section 5 Process Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Section 5 proposed in full \u2014 sweep-level vs. relationship-level distinction (5.1 and 5.2), Active \u2192 Lapsed as the process exit (5.3), Coordinator-only completion authority (5.4), no-handoff-event framing (5.5), no early-termination path (5.6), explicit reversal-of-erroneous-Lapsed amendment authority (5.7). Does this capture the completion model?", { italic: true }));
children.push(para("A: Yes."));
children.push(blank());

// 10.17 Block Approvals
children.push(para("10.17 System Requirements, Process Data, Data Collected, and Open Issues (block approvals)", { heading: HeadingLevel.HEADING_2 }));
children.push(para("Q: Section 6 (System Requirements): twelve requirements FU-STEWARD-REQ-001 through REQ-012 covering two new fields, the Active \u2192 Lapsed transition, three shared-write authorizations, three saved lists, the no-alerts position, Mentoring-domain read access, and audit-and-visibility extensions. Approve all?", { italic: true }));
children.push(para("A: Approve all."));
children.push(blank());
children.push(para("Q: Section 7 (Process Data): sixteen supporting fields FU-STEWARD-DAT-001 through DAT-016 across Contact, Account, Contribution, and Mentoring-domain data. Approve?", { italic: true }));
children.push(para("A: Approve."));
children.push(blank());
children.push(para("Q: Section 8 (Data Collected): ten created or updated items FU-STEWARD-DAT-017 through DAT-026, including two new fields (lastContactDate on Contact and Account) and updates to eight existing fields. Approve?", { italic: true }));
children.push(para("A: Approved."));
children.push(blank());
children.push(para("Q: Section 9 (Open Issues): no new issues; six inherited with dispositions; one carry-forward request draft for FU-RECORD v1.0 \u2192 v1.1 to be produced as a separate artifact. Approve?", { italic: true }));
children.push(para("A: Approve."));
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

const changeLogTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1200, 1500, 6660],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell("Version", { bold: true, fill: "D5E8F0", width: 1200 }),
        cell("Date", { bold: true, fill: "D5E8F0", width: 1500 }),
        cell("Changes", { bold: true, fill: "D5E8F0", width: 6660 }),
      ],
    }),
    new TableRow({ children: [
      cell("1.0", { width: 1200 }),
      cell("04-29-26 19:11", { width: 1500 }),
      cell("Initial release. Phase 4b process document for FU-STEWARD \u2014 Donor and Sponsor Stewardship, the third process in the Fundraising domain. Produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6 from a 04-29-26 interview. Ten sections: Process Purpose (weekly or bi-weekly review-and-act sweep, no relationship-level done state, Active \u2192 Lapsed as the only exit), Process Triggers (Active status only, manual sweep initiation, Coordinator sole initiator), Personas Involved (MST-PER-010 sole operator, MST-PER-002 read-only consumer + informal participant), Process Workflow (eleven-step narrative across three saved lists with donor-specific impact reporting and recognition obligation review woven into per-record review), Process Completion (sweep-level vs. relationship-level distinction; Active \u2192 Lapsed as the process exit), System Requirements (twelve requirements FU-STEWARD-REQ-001 through REQ-012), Process Data (sixteen supporting fields FU-STEWARD-DAT-001 through DAT-016 across Contact, Account, Contribution, and Mentoring-domain data), Data Collected (ten created or updated items FU-STEWARD-DAT-017 through DAT-026 including two new fields lastContactDate on Contact and Account and eight existing-field updates), Open Issues (no new issues; six inherited dispositioned), Interview Transcript (seventeen topic areas with inline Decision callouts). Key decisions: review-and-act operating philosophy (not reactive); manual sweep initiation with no system prompt; hybrid acknowledgment ownership (FU-RECORD primary at Contribution creation, FU-STEWARD catch-up during sweep); three independent saved lists with no unified dashboard (implementation form deferred to Phase 9); no system-fired alerts; pure Coordinator judgment for Active \u2192 Lapsed (no thresholds, no auto-transitions, no candidate flagging); no structured lapseReason, stewardshipTier, stewardshipPlan, or preferredStewardshipChannel fields; no structured tracking of recognition obligations (notes only); donor-specific impact reports composed entirely outside the CRM. Two new fields surfaced: lastContactDate on Contact and lastContactDate on Account. Both join the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7 and Account Entity PRD v1.6 \u2192 v1.7. One carry-forward request draft produced as a separate session-output artifact: FU-RECORD v1.0 \u2192 v1.1 to clarify hybrid acknowledgment ownership.", { width: 6660 }),
    ] }),
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

const outPath = path.join(__dirname, "FU-STEWARD.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath);
});
