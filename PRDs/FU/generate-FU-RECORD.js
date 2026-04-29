// CBM Fundraising Domain — FU-RECORD Process Document Generator
// Produces: FU-RECORD.docx (v1.0)
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
      new TextRun({ text: "FU-RECORD \u2014 Contribution Recording", bold: true, size: 28 }),
    ],
  })
);

const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 7020],
  rows: [
    new TableRow({ children: [cell("Version", { bold: true, fill: "E7E6E6", width: 2340 }), cell("1.0", { width: 7020 })] }),
    new TableRow({ children: [cell("Status", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Draft", { width: 7020 })] }),
    new TableRow({ children: [cell("Last Updated", { bold: true, fill: "E7E6E6", width: 2340 }), cell("04-29-26 04:16", { width: 7020 })] }),
    new TableRow({ children: [cell("Domain Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Code", { bold: true, fill: "E7E6E6", width: 2340 }), cell("FU-RECORD", { width: 7020 })] }),
    new TableRow({ children: [cell("Process Category", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Sequential lifecycle", { width: 7020 })] }),
    new TableRow({ children: [cell("Implementation Tier", { bold: true, fill: "E7E6E6", width: 2340 }), cell("Core (per Master PRD Section 3.6)", { width: 7020 })] }),
    new TableRow({
      children: [
        cell("Depends On", { bold: true, fill: "E7E6E6", width: 2340 }),
        cell("CBM-Master-PRD.docx v2.5, CBM-Entity-Inventory.docx v1.5, CBM-Domain-Overview-Fundraising.docx v1.0, FU-PROSPECT.docx v1.0, Contact-Entity-PRD.docx v1.6, Account-Entity-PRD.docx v1.6", { width: 7020 }),
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
    "FU-RECORD is the contribution-capture process of the Fundraising domain. It records each gift, sponsorship, and grant as a discrete Contribution event \u2014 a single received commitment, application, or payment \u2014 and updates donor and funder analytics on each record. FU-RECORD operates on the donor Contact and Funder Organization Account records that FU-PROSPECT establishes, and produces the Contribution and Fundraising Campaign records that FU-STEWARD and FU-REPORT subsequently consume. As the only Core-tier process in the Fundraising domain, FU-RECORD is essential for Year 1 go-live: until FU-RECORD is operational, no contribution can be captured in the system."
  )
);
children.push(blank());
children.push(
  para(
    "The cadence of FU-RECORD differs from FU-PROSPECT in an important way. FU-PROSPECT runs at a high rate during Year 1 ramp-up as new funder relationships are established, then tapers in steady state to a small number of new prospects per month or less. FU-RECORD does not taper. New donor and funder creation slows over time, but each existing donor and funder gives repeatedly \u2014 annual donations, recurring sponsorships, multi-year grants, individual pledges \u2014 so the volume of Contribution records stays high indefinitely. The system must support Contribution recording at a steady, sustained pace as a routine operational activity rather than a campaign-driven burst."
  )
);
children.push(blank());
children.push(
  para(
    "FU-RECORD has no fixed \u201cdone\u201d state at the relationship level. Individual Contribution records have terminal statuses \u2014 Received, Unsuccessful, Cancelled \u2014 and once a Contribution reaches one of those statuses, that specific event is closed. The funder relationship itself, however, continues for as long as the donor or funder is engaged. A donor in Active status will produce many Contributions over the life of the relationship, each cycling through the Contribution status lifecycle independently. The Active \u2192 Lapsed transition on the donor or funder record is FU-STEWARD\u2019s responsibility, not FU-RECORD\u2019s; FU-RECORD does not declare itself complete for a funder."
  )
);
children.push(blank());
children.push(
  para(
    "FU-RECORD also resolves the acknowledgment / tax-receipt model question that EI-ISS-001 carried forward from the Entity Inventory and the Fundraising Domain Overview. The resolution is field-level capability on Contribution rather than a separate Acknowledgment entity \u2014 two optional fields (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, with specifics of any given acknowledgment recorded in notes. The model is leaner than the Domain Overview\u2019s working position (which proposed three Donation-only fields including taxReceiptRequired) and reflects the recording-only operational scope of this process."
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
    "One precondition: the donor record must already exist. For an individual donor, that is a Contact record with contactType including Donor. For an organizational funder, that is an Account record with accountType including Donor/Sponsor. The Coordinator cannot record a Contribution against a donor that is not yet in the system; the Coordinator must first create or update the donor record (via FU-PROSPECT or directly) and then return to record the Contribution."
  )
);
children.push(blank());
children.push(
  para(
    "The lifecycle stage of the donor or funder record is not constrained. Applied and Pledged Contributions can legitimately exist against records in any FU-PROSPECT stage \u2014 a foundation Account in Contacted status may have a Grant Contribution at Applied while the relationship is still being cultivated; an individual Contact in Committed status may have a Pledged Donation against an upcoming campaign. The Contribution status is independent of the donor lifecycle stage. The first Contribution against any donor record automatically transitions that record\u2019s lifecycle field to Active per FU-PROSPECT-REQ-006, regardless of where the record was previously."
  )
);
children.push(blank());
children.push(
  para(
    "No other preconditions apply. A Fundraising Campaign is not required \u2014 Contributions can exist without Campaign linkage and Campaigns can be linked retroactively. No prior Contribution against the same donor is required. No external integration or system event is required."
  )
);
children.push(blank());

children.push(para("2.2 Required Data", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Three fields are required at Contribution creation:"
  )
);
children.push(richBullet([
  { text: "contributionType", bold: true },
  { text: " \u2014 the Coordinator must explicitly choose Donation, Sponsorship, or Grant. There is no default value; the field drives type-specific dynamic logic and must be set deliberately." },
]));
children.push(richBullet([
  { text: "status", bold: true },
  { text: " \u2014 the Coordinator must explicitly choose one of the six Contribution statuses (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled). There is no default value; the system does not assume a starting status because legitimate starting statuses vary by contributionType (a Grant typically starts at Applied, a Sponsorship typically starts at Committed, a Donation may start at Received)." },
]));
children.push(richBullet([
  { text: "Exactly one of donorContact or donorAccount", bold: true },
  { text: " \u2014 donorContact when the donor is an individual, donorAccount when the donor is an organization. The two are mutually exclusive; one and only one is populated per Contribution." },
]));
children.push(blank());
children.push(
  para(
    "All other fields are optional at creation and may be populated at the time the Contribution is recorded or updated as more information becomes available. The Coordinator typically populates additional fields immediately when the information is on hand at creation time \u2014 amount, the relevant date field for the chosen status, designation, campaign linkage, acknowledgment fields \u2014 but none of these are system-required."
  )
);
children.push(blank());
children.push(
  para(
    "Fundraising Campaign records have a parallel required-data pattern: campaignName (required at creation) and status (required at creation, no default). All other Campaign fields are optional."
  )
);
children.push(blank());

children.push(para("2.3 Initiation Mechanism", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Manual only. The Coordinator manually creates every Contribution record on receiving an indication of a contribution event. Common indications include receiving a check in the mail, an online giving notification or receipt, an ACH deposit confirmation, a credit card receipt, a delivery of in-kind goods or services, a signed sponsorship agreement, a grant decision letter (award, denial, request for additional information), or any other communication that documents a commitment, application, or payment."
  )
);
children.push(blank());
children.push(
  para(
    "There is no system-generated trigger and no scheduled automation that creates a Contribution record. The system does not poll a payment processor, an online giving platform, or a bank account; it does not import contributions from an external feed; it does not auto-create Contributions from Campaign records or from Pledge fulfillment schedules. Every Contribution exists because the Coordinator explicitly created it."
  )
);
children.push(blank());

children.push(para("2.4 Initiating Persona", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Donor / Sponsor Coordinator (MST-PER-010) initiates every instance of FU-RECORD. The Coordinator has full authority to create, edit, and advance Contribution and Fundraising Campaign records independently \u2014 no approval from the Executive Member, the System Administrator, or any other party is required. Other personas may inform the Coordinator that a contribution event has occurred (the Executive Member may forward a check that arrived for them; the Mentor Administrator may alert the Coordinator that a mentor wants to make a donation), but the record-creation action is always taken by the Coordinator."
  )
);
children.push(blank());

// ==============================
// 3. Personas Involved
// ==============================
children.push(para("3. Personas Involved", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Two personas from the Master PRD have roles in FU-RECORD. One operates the process; one is a read-only consumer of FU-RECORD output via reports and dashboards. No other personas participate."
  )
);
children.push(blank());

children.push(para("3.1 MST-PER-010 \u2014 Donor / Sponsor Coordinator (Sole operator)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Sole operator of FU-RECORD. Creates every Contribution record on receiving any indication of a contribution event. Selects contributionType and status explicitly at creation; populates amount, the relevant date fields, designation, Campaign linkage, and notes as information is available. Advances Contribution status by judgment as the contribution event progresses through its lifecycle \u2014 from Applied or Pledged through Committed to Received, or to Unsuccessful or Cancelled when appropriate. Generates and tracks acknowledgment communications using the acknowledgmentSent and acknowledgmentDate fields. Tracks grant lifecycles using applicationDate, commitmentDate, expectedPaymentDate, receivedDate, and nextGrantDeadline; records multi-payment grant disbursement detail in notes. Creates and maintains Fundraising Campaign records, setting Campaign status by judgment and linking Contributions to Campaigns at creation or retroactively. Edits Contribution records to handle bounced checks, refunds, reversals, and corrections by adjusting status (typically to Cancelled) and notes rather than by creating offsetting records. Has full authority \u2014 no approvals required for any FU-RECORD action."
  )
);
children.push(blank());

children.push(para("3.2 MST-PER-002 \u2014 Executive Member (Read-only consumer)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Read-only consumer of FU-RECORD output via reports and dashboards. Does not create, edit, or advance any Contribution or Fundraising Campaign record. Reviews Contribution pipeline summaries, Campaign performance data, donor and funder giving history rollups, and grant pipeline status as part of board-level oversight. May ask the Coordinator to clarify a Contribution record or to correct an apparent error, but the corrective action is always the Coordinator\u2019s. The Executive Member is not an FU-RECORD operator."
  )
);
children.push(blank());

children.push(
  para(
    "No other personas participate in FU-RECORD. Mentor Administrator, Client Recruiter, Partner Coordinator, Content and Event Administrator, and other coordinators do not operate FU-RECORD even when their work touches the same Contact or Account records used by FU-RECORD. Contribution and Fundraising Campaign records are not visible to these personas (per FU-RECORD-REQ-021 and REQ-022)."
  )
);
children.push(blank());

// ==============================
// 4. Process Workflow
// ==============================
children.push(para("4. Process Workflow", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "FU-RECORD operates as three workflow patterns sharing a common core. The core pattern \u2014 manual record creation, explicit contributionType and status selection, optional field population, judgment-driven status advancement, automatic donor or funder activation on first Contribution, acknowledgment generation, and analytics rollup \u2014 applies to every Contribution regardless of contributionType. The three patterns differ in their typical entry status, the date fields they populate, and the type-specific fields they expose. The Donation pattern is described first as the canonical happy path; the Sponsorship and Grant patterns are described as variants of that pattern."
  )
);
children.push(blank());

children.push(para("4.1 Donation Workflow (Canonical Happy Path)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "A Donation typically arrives as a check, online giving notification, ACH deposit confirmation, credit card receipt, or in-kind delivery. The Coordinator works through the following steps:"
  )
);
children.push(blank());

const donationSteps = [
  "Donor identification. The Coordinator identifies the donor and looks up the donor record. For an individual, that is a Contact with contactType including Donor; for an organization, an Account with accountType including Donor/Sponsor. If the donor record does not yet exist, the Coordinator creates it via FU-PROSPECT first \u2014 FU-RECORD requires the donor record to exist before a Contribution can be linked.",
  "Contribution record creation. The Coordinator creates a new Contribution record with contributionType = Donation and an explicit status. For most arriving Donations the status is Received (the funds are already in hand); for an unsolicited written pledge that has not yet been paid, the status is Pledged. The Coordinator populates donorContact (for an individual) or donorAccount (for an organization) \u2014 exactly one of these per Contribution.",
  "Optional field population. The Coordinator populates the remaining fields with whatever information is available: amount, the relevant date field for the chosen status (receivedDate for a Received Donation, expectedPaymentDate for a Pledged Donation), giftType (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other), designation if the gift is for a specific program or event, and Campaign linkage if the gift is part of a current Fundraising Campaign. For in-kind Donations, the Coordinator sets giftType = In-Kind, which exposes the inKindDescription and inKindValuationBasis fields for capturing what was given and how the dollar value was determined.",
  "Status advancement over time. If the Donation was created at Pledged and is later paid, the Coordinator advances status to Received and sets receivedDate. If the Donation was created at Received but a check subsequently bounces, the Coordinator transitions status to Cancelled and records the bounce reason in notes \u2014 no offsetting record is created. Status transitions are free-form per FU-RECORD-REQ-007: the Coordinator can move between any values at any time.",
  "Automatic donor or funder activation. On creation of any Contribution \u2014 regardless of contributionType or starting status \u2014 the system automatically transitions the linked donor\u2019s lifecycle field (donorStatus on Contact, funderStatus on Account) to Active per FU-PROSPECT-REQ-006 and FU-RECORD-REQ-010. This is the FU-PROSPECT \u2192 FU-RECORD handoff: a record that was previously in any earlier stage (Prospect, Contacted, In Discussion, Committed, Lapsed, Closed) becomes Active. The Coordinator does not need to advance the lifecycle field manually.",
  "Acknowledgment generation. When the Coordinator sends an acknowledgment communication (a thank-you letter, a tax receipt, an email of thanks), the Coordinator sets acknowledgmentSent to true on the Contribution and records acknowledgmentDate. Specifics of what was sent in any given case are recorded in notes if the Coordinator wants. These two fields are shared across all contribution types and do not require a structured acknowledgmentMethod or taxReceiptRequired field; the Coordinator\u2019s judgment governs what is sent and what is captured in notes.",
  "Analytics update. As the Donation progresses to Received, the system updates two rollup fields automatically: donorLifetimeGiving on the linked Donor Contact (per FU-RECORD-REQ-012, sum of amount across Received Contributions) and funderLifetimeGiving on the linked Funder Organization Account (per FU-RECORD-REQ-013, same calculation pattern, scoped to organizational donors). If the Donation is linked to a Fundraising Campaign, the Campaign\u2019s totalRaised is also updated automatically per FU-RECORD-REQ-011. Donations in any other status do not contribute to these rollups.",
];
donationSteps.forEach((s) => children.push(numberedPara(s)));
children.push(blank());

children.push(para("4.2 Sponsorship Workflow (Variant)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Sponsorships follow the same core workflow as Donations but typically originate at a different status and carry different recordkeeping conventions. A Sponsorship enters FU-RECORD when the Coordinator receives a signed sponsorship agreement (or other firm commitment to sponsor) from a corporate sponsor, foundation, or community partner."
  )
);
children.push(blank());
children.push(
  para(
    "Typical entry status is Committed: the agreement has been signed and the sponsor has firmly committed to a payment, but the funds have not yet arrived. The Coordinator sets contributionType = Sponsorship, status = Committed, donorAccount (most Sponsorships are organizational), amount, and commitmentDate (the date of the signed agreement). expectedPaymentDate is set if the agreement specifies a payment date. Designation and Campaign linkage are populated as appropriate \u2014 a Sponsorship is often tied to a specific event or program campaign."
  )
);
children.push(blank());
children.push(
  para(
    "Recognition obligations \u2014 logo placement on event materials, program advertisement, website listing, verbal recognition at events \u2014 are recorded in the Contribution\u2019s notes field rather than as structured data. There is no recognitionObligations enum, no separate Sponsorship-specific paymentForm field, and no structured tracking of obligation fulfillment. The Coordinator captures the recognition commitments at agreement signing and references them in notes during stewardship; obligation tracking, if needed, is FU-STEWARD scope."
  )
);
children.push(blank());
children.push(
  para(
    "When the Sponsorship payment arrives, the Coordinator advances status to Received and sets receivedDate. If the sponsor pulls out before payment, the Coordinator transitions status to Cancelled and records the reason in notes. In-kind Sponsorships (a corporate partner providing services or goods rather than cash) are recorded in notes; there is no Sponsorship-specific in-kind field. The giftType field is exposed only when contributionType = Donation, so an in-kind Sponsorship is captured by the Coordinator narratively rather than via giftType."
  )
);
children.push(blank());

children.push(para("4.3 Grant Workflow (Variant)", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Grants follow the longest of the three lifecycles, often spanning many months from application to final payment. Unlike Donations and Sponsorships, Grants enter FU-RECORD at application time, before any commitment exists. The Coordinator works through the following stages:"
  )
);
children.push(blank());
children.push(
  para(
    "Grant application. The Coordinator creates a Contribution record with contributionType = Grant, status = Applied, donorAccount (Grants are always organizational), and applicationDate (the date the application was submitted). The amount field at this stage carries the amount requested. The applicationDate field is visible only when contributionType = Grant per FU-RECORD-REQ-006. nextGrantDeadline may be populated if the Coordinator wants to track a follow-up submission deadline or other grant-related obligation. The Contribution is linked to a Fundraising Campaign at this point if the application is part of a current campaign."
  )
);
children.push(blank());
children.push(
  para(
    "Award decision. When the funder decides on the application, the Coordinator advances status. If the grant is awarded, status moves to Committed; the Coordinator sets commitmentDate (the award letter date), updates amount to the actual award amount (which may differ from the amount requested), and sets expectedPaymentDate if the award letter specifies one. If the grant is declined, status moves to Unsuccessful \u2014 a terminal state for the Contribution \u2014 and the Coordinator records the reason in notes. nextGrantDeadline is updated to track any follow-up obligation (a renewal opportunity, a thank-you communication deadline, a reapplication window)."
  )
);
children.push(blank());
children.push(
  para(
    "Payment(s). When the grant is fully paid, the Coordinator advances status to Received and sets receivedDate. For multi-payment grants \u2014 a common pattern for large foundation and government grants \u2014 status remains at Committed through the disbursement period and only advances to Received when the final payment arrives. receivedDate captures the date of the final payment. Multi-payment disbursement detail (individual tranche amounts, dates, payment references) is recorded in notes. This treatment accepts a fiscal-year reporting trade-off: the entire grant amount is captured as one Contribution in the year of final payment, which is the simplest possible model and is acceptable to CBM\u2019s reporting requirements."
  )
);
children.push(blank());
children.push(
  para(
    "Reporting and renewals. Grant Contributions in Received status often carry ongoing reporting obligations \u2014 quarterly progress reports, annual outcome reports, financial accounting. The Coordinator uses nextGrantDeadline to track the next pending obligation, updating the field as each deadline passes and the next one approaches. The field is intentionally simple (a single date) rather than a structured deadline list; the Coordinator records prior reporting obligations in notes if a historical record is needed. Grant renewals are handled by creating a new Grant Contribution at the renewal application time, not by re-opening the prior Contribution."
  )
);
children.push(blank());
children.push(
  para(
    "Cancellations. If a Committed grant is withdrawn before payment (the funder rescinds the award, CBM declines the funds, the program is terminated), the Coordinator transitions status to Cancelled and records the reason in notes. Cancelled Grants do not contribute to lifetime giving or Campaign totalRaised."
  )
);
children.push(blank());

children.push(para("4.4 Fundraising Campaign Workflow", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Fundraising Campaigns are created by the Coordinator on demand, in either of two timing patterns. The Coordinator may create a Campaign in advance of solicitation \u2014 setting campaignName, campaignType (Annual Fund, Program Appeal, Event, Capital Campaign, or Other), goalAmount, startDate, endDate, status = Planned, and a description of the Campaign\u2019s purpose. The Coordinator advances status to Active when the Campaign is approved to begin accepting Contributions. Alternatively, the Coordinator may create a Campaign retroactively \u2014 grouping Contributions that have already arrived under a named effort for analytics or reporting purposes. Both timing patterns are supported per FU-RECORD-REQ-004."
  )
);
children.push(blank());
children.push(
  para(
    "Linking Contributions to a Campaign is done via the campaign field on Contribution. One Campaign per Contribution. The link is settable, changeable, and clearable at any time, regardless of Campaign status. The Coordinator may link a Contribution to a Completed or Cancelled Campaign without system gating \u2014 there are legitimate reasons to do so (correcting a misclassification after Campaign closure, attributing a late-arriving Contribution to the Campaign it belongs to). The Campaign\u2019s totalRaised is the sum of amount across all Contributions in Received status linked to the Campaign per FU-RECORD-REQ-011; Contributions in any other status do not count."
  )
);
children.push(blank());
children.push(
  para(
    "Campaign status transitions are Coordinator judgment per FU-RECORD-REQ-008: Planned to Active when the Campaign is approved and accepting Contributions; Active to Completed when the goal is reached, the period closes, or the Coordinator decides to close it; Active or Planned to Cancelled when the Campaign is abandoned. Completed and Cancelled are not terminal in a deletion sense \u2014 the record stays for analytics and historical reference."
  )
);
children.push(blank());

// ==============================
// 5. Process Completion
// ==============================
children.push(para("5. Process Completion", { heading: HeadingLevel.HEADING_1 }));

children.push(para("5.1 Contribution Terminal States", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Each Contribution record reaches one of three terminal states: Received (the contribution event completed successfully and funds are in hand), Unsuccessful (an Applied or Pledged Contribution that did not convert), or Cancelled (a Committed Contribution that was withdrawn before payment). Once a Contribution reaches a terminal state, the contribution event itself is closed, but the record persists permanently in the system per FU-RECORD-REQ-019. The Coordinator may continue to edit notes, acknowledgment fields, or any other field on a terminal-status Contribution; only the contribution event is closed, not the record."
  )
);
children.push(blank());
children.push(
  para(
    "Records are not deleted. There is no Voided status distinct from Cancelled; the Coordinator uses Cancelled for any reason a Committed Contribution does not convert (sponsor pulls out, grant rescinded, donor changes mind, payment fails to arrive). There is no archival or anonymization process \u2014 every Contribution remains queryable and reportable indefinitely."
  )
);
children.push(blank());

children.push(para("5.2 Funder-Relationship-Level Completion", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-RECORD does not declare itself complete for a donor or funder. Each donor or funder may produce many Contributions over the life of the relationship, each cycling through the Contribution status lifecycle independently. The donor or funder remains in Active status as long as Contributions are being recorded; the Active \u2192 Lapsed transition is FU-STEWARD\u2019s responsibility and is based on the absence of recent Contributions, not on any signal from FU-RECORD itself. FU-RECORD continues to operate against the same donor or funder record indefinitely, recording each new Contribution as a discrete event."
  )
);
children.push(blank());

children.push(para("5.3 Completion Authority", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator has full authority to declare any Contribution complete by setting its status to Received, Unsuccessful, or Cancelled. No approval from the Executive Member or any other party is required. The Coordinator\u2019s judgment governs every status transition; the system enforces no completion criteria, no time-based automatic transitions, and no progression-order constraints (per FU-RECORD-REQ-007)."
  )
);
children.push(blank());

children.push(para("5.4 Post-Completion Handoffs", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "FU-RECORD has two implicit handoffs to other Fundraising processes. First, the FU-PROSPECT \u2192 FU-RECORD handoff is the Committed \u2192 Active transition on the donor\u2019s lifecycle field, triggered automatically by the creation of the first Contribution against that donor (per FU-PROSPECT-REQ-006 and FU-RECORD-REQ-010). FU-RECORD inherits the donor record at whatever lifecycle stage FU-PROSPECT had it in (often Committed, but legitimately any earlier stage), and the activation transition is invisible to the Coordinator \u2014 it just happens on Contribution creation."
  )
);
children.push(blank());
children.push(
  para(
    "Second, the FU-RECORD \u2192 FU-STEWARD handoff is implicit and continuous: any donor or funder in Active status with Received Contributions is a stewardship subject. FU-STEWARD reads from the same Contribution and Fundraising Campaign records FU-RECORD writes to, plus the donor and funder profile fields, and produces acknowledgment communications, impact reports, periodic outreach, and lapse detection. FU-RECORD does not produce a discrete handoff event; FU-STEWARD operates continuously against the active population."
  )
);
children.push(blank());
children.push(
  para(
    "FU-RECORD also feeds FU-REPORT, which reads Contributions and Fundraising Campaigns to produce internal analytics and external compliance reports. Like FU-STEWARD, FU-REPORT does not require a discrete handoff event \u2014 it queries the populated data on demand."
  )
);
children.push(blank());

children.push(para("5.5 Amendments and Corrections", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Coordinator can edit any field on any Contribution record at any time per FU-RECORD-REQ-018. There is no point at which a Contribution becomes locked or read-only \u2014 not after acknowledgment is sent, not after the fiscal year closes, not after the record reaches a terminal status. All edits are captured by the audit trail per FU-RECORD-REQ-014, which audits status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate at minimum. Other field changes may also be audited; this is the minimum guaranteed scope."
  )
);
children.push(blank());
children.push(
  para(
    "Bounced checks, refunds, and reversals are handled by editing the original Contribution record \u2014 typically by transitioning status to Cancelled and recording the reason in notes \u2014 not by creating offsetting records. This pattern (Level A authority + Pattern X same-record correction) keeps the audit trail compact and avoids the need for a separate reversal-record entity. The downstream effect on rollup analytics is automatic: a Contribution moved from Received to Cancelled is removed from donorLifetimeGiving, funderLifetimeGiving, and Campaign totalRaised on the next recalculation."
  )
);
children.push(blank());
children.push(
  para(
    "Corrections to non-status fields (a misentered amount, a wrong donor link, a misclassified contributionType) are made by editing the field directly. The audit trail captures the change. The Coordinator records the reason for the correction in notes if the correction is non-trivial."
  )
);
children.push(blank());

// ==============================
// 6. System Requirements
// ==============================
children.push(para("6. System Requirements", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "The system requirements that must be supported by the CRM to enable FU-RECORD. Each requirement has a unique identifier of the form FU-RECORD-REQ-xxx. Requirements are grouped by category (record creation, dynamic logic, status, calculated fields, audit, acknowledgment, type-specific handling, amendments, services, access control, reporting) for readability; identifiers are sequential within the document."
  )
);
children.push(blank());

const reqRows = [
  ["FU-RECORD-REQ-001", "The system must allow the Donor / Sponsor Coordinator to create a Contribution record. contributionType (required, no default) and status (required, no default) must be explicitly chosen by the Coordinator at creation. All other Contribution fields may be blank at creation and added later."],
  ["FU-RECORD-REQ-002", "The system must require exactly one of donorContact or donorAccount to be populated on every Contribution record. donorContact links to the donor when the donor is an individual; donorAccount links when the donor is an organization. The two are mutually exclusive \u2014 one and only one is populated."],
  ["FU-RECORD-REQ-003", "The system must require that the linked donor Contact (with contactType including Donor) or donor Account (with accountType including Donor/Sponsor) already exists before a Contribution record can be created. The lifecycle stage of the donor or funder is not constrained \u2014 Applied and Pledged Contributions can be created against records in any FU-PROSPECT stage."],
  ["FU-RECORD-REQ-004", "The system must allow the Coordinator to create a Fundraising Campaign record. campaignName (required) and status (required, no default) must be populated at creation. All other Campaign fields may be blank at creation. Campaigns may be created in advance of solicitation or retroactively after Contributions have arrived."],
  ["FU-RECORD-REQ-005", "The system must allow the Coordinator to link any Contribution to one Fundraising Campaign via the optional campaign field. The linkage is settable, changeable, and clearable at any time, regardless of Campaign status. One Campaign per Contribution; no system-enforced gating against linking to Completed or Cancelled Campaigns."],
  ["FU-RECORD-REQ-006", "The system must provide three values for contributionType (Donation, Sponsorship, Grant) and apply type-specific dynamic logic on Contribution: applicationDate visible only when contributionType = Grant; nextGrantDeadline visible only when contributionType = Grant; giftType visible only when contributionType = Donation; inKindDescription and inKindValuationBasis visible only when contributionType = Donation AND giftType = In-Kind."],
  ["FU-RECORD-REQ-007", "The system must provide six values for the Contribution status field \u2014 Applied, Pledged, Committed, Received, Unsuccessful, Cancelled \u2014 with no system-enforced progression order. The Coordinator can transition between any values at any time."],
  ["FU-RECORD-REQ-008", "The system must provide four values for the Fundraising Campaign status field \u2014 Planned, Active, Completed, Cancelled \u2014 with no system-enforced progression order. The Coordinator can transition between any values at any time."],
  ["FU-RECORD-REQ-009", "For multi-payment grants, the system must allow the Coordinator to advance Contribution status from Committed to Received only when the grant is fully paid; receivedDate represents the date of the final payment. Multi-payment disbursement detail is recorded in notes rather than as separate records."],
  ["FU-RECORD-REQ-010", "The system must automatically transition the linked donor\u2019s lifecycle field (donorStatus on Contact, funderStatus on Account) to Active on the creation of any Contribution record, regardless of contributionType or status. This applies to any prior lifecycle state (Prospect, Contacted, In Discussion, Committed, Lapsed, or Closed). This requirement is the FU-RECORD-side companion to FU-PROSPECT-REQ-006."],
  ["FU-RECORD-REQ-011", "The system must calculate totalRaised on each Fundraising Campaign as the sum of amount across all Contributions in Received status linked to that Campaign. Contributions in any other status do not contribute to totalRaised."],
  ["FU-RECORD-REQ-012", "The system must calculate donorLifetimeGiving on Contact as the sum of amount across all Contributions in Received status linked to the Contact via donorContact. The field is visible only when contactType has Donor. This is a new field surfaced by FU-RECORD and joins the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7."],
  ["FU-RECORD-REQ-013", "The system must update funderLifetimeGiving on Account (defined in Account Entity PRD v1.6 Section 3.4) as the sum of amount across all Contributions in Received status linked to the Account via donorAccount. Contributions in any other status do not contribute to funderLifetimeGiving."],
  ["FU-RECORD-REQ-014", "The system must maintain an audit trail of changes to status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, and receivedDate on Contribution records. The system must also maintain an audit trail of changes to status and goalAmount on Fundraising Campaign records."],
  ["FU-RECORD-REQ-015", "The system must provide acknowledgmentSent (boolean) and acknowledgmentDate (date) fields on every Contribution record, regardless of contributionType. Both fields are optional and Coordinator-set. Specifics of what was sent in any given case are recorded in notes. This resolves EI-ISS-001 with field-level capability rather than a separate Acknowledgment entity."],
  ["FU-RECORD-REQ-016", "The system must support recording in-kind Donations via giftType = In-Kind, with optional inKindDescription (text) and inKindValuationBasis (text) fields visible only when contributionType = Donation AND giftType = In-Kind. There is no separate In-Kind value of contributionType."],
  ["FU-RECORD-REQ-017", "The system must provide nextGrantDeadline (date, optional) on Grant Contributions to track the next pending grant-related obligation, typically a report deadline. The Coordinator may use the field for any grant-related deadline."],
  ["FU-RECORD-REQ-018", "The system must allow the Coordinator to edit any field on any Contribution record at any time. Bounced checks, refunds, and reversals are handled by editing the original record\u2019s status (typically transitioning to Cancelled) and notes \u2014 not by creating offsetting records. All edits are captured by the audit trail per FU-RECORD-REQ-014."],
  ["FU-RECORD-REQ-019", "The system must retain all Contribution and Fundraising Campaign records permanently, including those in terminal status (Received, Unsuccessful, Cancelled for Contribution; Completed, Cancelled for Campaign). No deletion of Contribution or Fundraising Campaign records."],
  ["FU-RECORD-REQ-020", "The system must provide free-form timestamped and attributed notes on Contribution and Fundraising Campaign records via the Notes Service (per PRDs/services/NOTES/NOTES-MANAGE.docx v1.0), accessible to the Donor / Sponsor Coordinator and above."],
  ["FU-RECORD-REQ-021", "The system must restrict record-level visibility of Contribution records, including the notes field, to the Donor / Sponsor Coordinator, Executive Member, and System Administrator. Other personas have no visibility to Contribution records."],
  ["FU-RECORD-REQ-022", "The system must restrict record-level visibility of Fundraising Campaign records to the Donor / Sponsor Coordinator, Executive Member, and System Administrator. Other personas have no visibility to Fundraising Campaign records."],
  ["FU-RECORD-REQ-023", "The system must present a Contribution pipeline view to the Coordinator showing all Contributions grouped by status (the six values), with filters available by contributionType, donor type (individual via donorContact, organizational via donorAccount), and date ranges over applicationDate, commitmentDate, expectedPaymentDate, and receivedDate. The exact implementation form (dashboard widget, saved list or search, dedicated entity listing) is deferred to Phase 9."],
  ["FU-RECORD-REQ-024", "The system must present a giving history rollup on each Donor Contact and each Funder Organization Account, listing all Contributions linked to that donor or funder via donorContact or donorAccount respectively, with running totals. The exact implementation form is deferred to Phase 9."],
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
    "Supporting data read by FU-RECORD without being created or modified by the process. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of the field\u2019s role in this process. Required data (the minimum needed to start the process) is covered in Section 2.2 and is not repeated here. Fields that FU-RECORD updates \u2014 even if also read \u2014 are listed in Section 8."
  )
);
children.push(blank());

// 7.1 Contact - Supporting Fields
children.push(para("7.1 Contact \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Contact fields read by FU-RECORD to identify the donor and personalize Contribution-related communications without being created or modified by the process during normal operation."
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

const contactSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-RECORD-DAT-001",
      "contactType (read)",
      "multiEnum",
      "Yes (existing)",
      "Client, Mentor, Partner, Donor, Administrator, Presenter, Member",
      "Read to verify Donor is present on the linked donor Contact. Per FU-RECORD-REQ-003, Donor must already be on contactType for the Contact to be the target of donorContact. Type appending is FU-PROSPECT\u2019s responsibility; not modified by FU-RECORD."
    ),
    dataRow(
      "FU-RECORD-DAT-002",
      "firstName",
      "varchar",
      "Yes",
      "\u2014",
      "Native field. Used to identify the donor and personalize acknowledgment communications."
    ),
    dataRow(
      "FU-RECORD-DAT-003",
      "lastName",
      "varchar",
      "Yes",
      "\u2014",
      "Native field. Used to identify the donor and personalize acknowledgment communications."
    ),
    dataRow(
      "FU-RECORD-DAT-004",
      "emailAddress",
      "email",
      "No",
      "\u2014",
      "Native field. Used for emailed acknowledgment communications."
    ),
    dataRow(
      "FU-RECORD-DAT-005",
      "phoneNumber",
      "phone",
      "No",
      "\u2014",
      "Native field. Used for phone outreach related to a Contribution (for example, confirming receipt of a check or following up on a pledge)."
    ),
    dataRow(
      "FU-RECORD-DAT-006",
      "donorNotes",
      "wysiwyg",
      "No",
      "\u2014",
      "Surfaced by FU-PROSPECT (FU-PROSPECT-DAT-021); pending bundled carry-forward to Contact Entity PRD v1.6 \u2192 v1.7. Field-level security restricted to Donor / Sponsor Coordinator and above. Read as relationship context when recording a Contribution. Not modified by FU-RECORD; ongoing recording-related notes accumulate via the Notes Service."
    ),
  ],
});
children.push(contactSupportingTable);
children.push(blank());

// 7.2 Account - Supporting Fields
children.push(para("7.2 Account \u2014 Supporting Fields", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Account fields read by FU-RECORD to identify the funder organization and contextualize Contribution recording without being created or modified by the process during normal operation."
  )
);
children.push(blank());

const accountSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-RECORD-DAT-007",
      "accountType (read)",
      "multiEnum",
      "Yes (existing)",
      "Client, Partner, Donor/Sponsor",
      "Read to verify Donor/Sponsor is present on the linked donor Account. Per FU-RECORD-REQ-003, Donor/Sponsor must already be on accountType for the Account to be the target of donorAccount. Type appending is FU-PROSPECT\u2019s responsibility; not modified by FU-RECORD."
    ),
    dataRow(
      "FU-RECORD-DAT-008",
      "name",
      "varchar",
      "Yes",
      "\u2014",
      "Native field. Organization name \u2014 used to identify the funder when recording a Contribution."
    ),
    dataRow(
      "FU-RECORD-DAT-009",
      "website",
      "url",
      "No",
      "\u2014",
      "Native field. Read as organizational context."
    ),
    dataRow(
      "FU-RECORD-DAT-010",
      "emailAddress",
      "email",
      "No",
      "\u2014",
      "Native field. Used for emailed acknowledgment communications to the funder organization."
    ),
    dataRow(
      "FU-RECORD-DAT-011",
      "phoneNumber",
      "phone",
      "No",
      "\u2014",
      "Native field. Used for organizational outreach related to a Contribution."
    ),
    dataRow(
      "FU-RECORD-DAT-012",
      "billingAddressCity, billingAddressState",
      "address",
      "No",
      "\u2014",
      "Native address fields. Used for mailed acknowledgment letters and tax receipts."
    ),
    dataRow(
      "FU-RECORD-DAT-013",
      "funderType",
      "enum",
      "No",
      "Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other",
      "Defined in Account Entity PRD v1.6 Section 3.4. Read-only reference for reporting context \u2014 different funder types may receive different acknowledgment formats and feature in different reports."
    ),
    dataRow(
      "FU-RECORD-DAT-014",
      "funderNotes",
      "wysiwyg",
      "No",
      "\u2014",
      "Defined in Account Entity PRD v1.6 Section 3.4. Field-level security restricted to Donor / Sponsor Coordinator and above. Read as relationship context when recording a Contribution. Not modified by FU-RECORD; ongoing recording-related notes accumulate via the Notes Service."
    ),
    dataRow(
      "FU-RECORD-DAT-015",
      "assignedSponsorCoordinator",
      "link (to Contact)",
      "Conditional (required when funderStatus = Active)",
      "\u2014",
      "Surfaced by FU-PROSPECT (FU-PROSPECT-DAT-027); pending bundled carry-forward to Account Entity PRD v1.6 \u2192 v1.7. Read to identify the staff member leading the relationship with this Funder Organization. Informs the Coordinator\u2019s recording context (for example, who signs the acknowledgment letter) but does not gate Contribution recording. Not modified by FU-RECORD."
    ),
  ],
});
children.push(accountSupportingTable);
children.push(blank());

// 7.3 Relationships - Supporting
children.push(para("7.3 Relationships \u2014 Supporting", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "Relationships read by FU-RECORD to navigate the record graph without being created or modified during normal operation."
  )
);
children.push(blank());

const relSupportingTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-RECORD-DAT-016",
      "Contact \u2194 Account (existing)",
      "relationship",
      "No",
      "\u2014",
      "Native Contact-to-Account link. Read by FU-RECORD to identify which donor Contacts are linked to a given Funder Organization Account when the Coordinator is recording an organizational Contribution \u2014 for example, to know which staff member at the funder is the relationship contact for an acknowledgment letter. Not created or modified by FU-RECORD; FU-PROSPECT owns Contact-to-Account linkage."
    ),
  ],
});
children.push(relSupportingTable);
children.push(blank());

// ==============================
// 8. Data Collected
// ==============================
children.push(para("8. Data Collected", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Data created or updated by FU-RECORD. Grouped by entity. Each field includes type, required status, enum values where applicable, and a description of how the process creates or updates the field."
  )
);
children.push(blank());
children.push(
  para(
    "One field is new to the CRM data model and is surfaced by FU-RECORD: donorLifetimeGiving on Contact. Per the Fundraising Domain Overview v1.0 Section 5, this addition is bundled into the planned carry-forward update to the Contact Entity PRD (v1.6 \u2192 v1.7) at the end of FU Phase 4b, alongside donorStatus and donorNotes from FU-PROSPECT. No carry-forward request is issued by this process document in isolation."
  )
);
children.push(blank());
children.push(
  para(
    "The Contribution and Fundraising Campaign entities are entirely created and maintained by FU-RECORD. All eighteen Contribution fields and all eight Fundraising Campaign fields specified in Sections 8.3 and 8.4 are formalized in the Contribution Entity PRD and Fundraising Campaign Entity PRD respectively, both of which are pending Phase 5."
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
      "FU-RECORD-DAT-017",
      "donorStatus (update)",
      "enum",
      "No",
      "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed",
      "Defined by FU-PROSPECT-DAT-020. FU-RECORD updates the value automatically per FU-RECORD-REQ-010 \u2014 on creation of the first Contribution linked to this Contact via donorContact, the value transitions to Active regardless of prior state or contributionType. The Coordinator does not edit the field manually as part of FU-RECORD; manual transitions are FU-PROSPECT\u2019s responsibility. Audited (per FU-PROSPECT)."
    ),
    dataRow(
      "FU-RECORD-DAT-018",
      "donorLifetimeGiving",
      "currency",
      "No",
      "\u2014",
      "New field introduced by FU-RECORD. Visible only when contactType has Donor. System-calculated, read-only \u2014 sum of amount across all Contributions in Received status linked to this Contact via donorContact. Contributions in any other status do not contribute. Joins the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7, alongside donorStatus and donorNotes (from FU-PROSPECT)."
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
      "FU-RECORD-DAT-019",
      "funderStatus (update)",
      "enum",
      "No",
      "Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed",
      "Defined in Account Entity PRD v1.6 Section 3.4. FU-RECORD updates the value automatically per FU-RECORD-REQ-010 \u2014 on creation of the first Contribution linked to this Account via donorAccount, the value transitions to Active regardless of prior state or contributionType. Manual transitions are FU-PROSPECT\u2019s responsibility. Audited (per Account Entity PRD v1.6)."
    ),
    dataRow(
      "FU-RECORD-DAT-020",
      "funderLifetimeGiving (update)",
      "currency",
      "No",
      "\u2014",
      "Defined in Account Entity PRD v1.6 Section 3.4 as system-calculated and read-only. FU-RECORD-REQ-013 specifies the calculation: sum of amount across all Contributions in Received status linked to this Account via donorAccount. Contributions in any other status do not contribute."
    ),
  ],
});
children.push(accountCreatedTable);
children.push(blank());

// 8.3 Contribution - Fields Created
children.push(para("8.3 Contribution \u2014 Fields Created", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Contribution entity is created and maintained by FU-RECORD. Eighteen fields are defined \u2014 fourteen shared across all contribution types, three Donation-specific, and one Grant-specific. Type-specific fields are visible only when the dynamic-logic visibility rule (per FU-RECORD-REQ-006) is satisfied."
  )
);
children.push(blank());

const contributionTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-RECORD-DAT-021",
      "contributionType",
      "enum",
      "Yes (no default)",
      "Donation, Sponsorship, Grant",
      "Discriminator that drives type-specific dynamic logic per FU-RECORD-REQ-006. Coordinator must explicitly select at creation. No Pledge value (Pledged is a status, not a type). No In-Kind value (in-kind handling is via giftType \u2014 see FU-RECORD-REQ-016)."
    ),
    dataRow(
      "FU-RECORD-DAT-022",
      "status",
      "enum",
      "Yes (no default)",
      "Applied, Pledged, Committed, Received, Unsuccessful, Cancelled",
      "Coordinator must explicitly select at creation. Applied means an application or request has been submitted with no signal from the funder about likelihood (typically a grant application). Pledged is a soft commitment, not high-probability for forecasting. Committed is a firm, high-probability commitment with payment expected. Received means funds have arrived (for multi-payment grants, all payments are in). Unsuccessful is a terminal state for Applied or Pledged Contributions that did not convert. Cancelled is a terminal state for Committed Contributions withdrawn before payment. Free-form transitions per FU-RECORD-REQ-007. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-023",
      "donorContact",
      "link (to Contact)",
      "Conditional (required when donor is an individual; mutually exclusive with donorAccount)",
      "\u2014",
      "Link to the donor Contact when the donor is an individual. Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated. Per FU-RECORD-REQ-003, the linked Contact must already have contactType including Donor. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-024",
      "donorAccount",
      "link (to Account)",
      "Conditional (required when donor is an organization; mutually exclusive with donorContact)",
      "\u2014",
      "Link to the donor Account when the donor is an organization. Per FU-RECORD-REQ-002, exactly one of donorContact or donorAccount must be populated. Per FU-RECORD-REQ-003, the linked Account must already have accountType including Donor/Sponsor. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-025",
      "amount",
      "currency",
      "No",
      "\u2014",
      "The dollar value of the Contribution. For Grant Contributions, the value at status = Applied is the amount requested; the value is updated to the actual award amount when status transitions to Committed. For multi-payment Grants, the value remains the total award amount through to Received. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-026",
      "commitmentDate",
      "date",
      "No",
      "\u2014",
      "The date a firm commitment was established (for example, the date of an award letter or signed sponsorship agreement). Set when status transitions to Committed. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-027",
      "expectedPaymentDate",
      "date",
      "No",
      "\u2014",
      "The date payment is expected. For multi-payment Grants, the next pending payment date. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-028",
      "receivedDate",
      "date",
      "No",
      "\u2014",
      "The date funds were received. For multi-payment Grants, the date of the final payment (per FU-RECORD-REQ-009). Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-029",
      "applicationDate",
      "date",
      "No",
      "\u2014",
      "The date an application or request was submitted. Visible only when contributionType = Grant per FU-RECORD-REQ-006. Set when a Grant Contribution is created at status = Applied. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-030",
      "designation",
      "text",
      "No",
      "\u2014",
      "Free-form designation of the program, event, or purpose for the Contribution. Applies to any contribution type."
    ),
    dataRow(
      "FU-RECORD-DAT-031",
      "campaign",
      "link (to Fundraising Campaign)",
      "No",
      "\u2014",
      "Optional link to one Fundraising Campaign per FU-RECORD-REQ-005. Settable, changeable, and clearable at any time, regardless of Campaign status."
    ),
    dataRow(
      "FU-RECORD-DAT-032",
      "acknowledgmentSent",
      "bool",
      "No",
      "\u2014",
      "Coordinator-set boolean indicating that an acknowledgment communication has been sent for this Contribution. Applies to all contribution types. Resolves EI-ISS-001 in conjunction with acknowledgmentDate (per FU-RECORD-REQ-015)."
    ),
    dataRow(
      "FU-RECORD-DAT-033",
      "acknowledgmentDate",
      "date",
      "No",
      "\u2014",
      "Date the acknowledgment communication was sent. Applies to all contribution types."
    ),
    dataRow(
      "FU-RECORD-DAT-034",
      "notes",
      "wysiwyg",
      "No",
      "\u2014",
      "Free-form rich-text notes on this Contribution \u2014 recognition obligations for Sponsorships, multi-payment disbursement detail for Grants, in-kind context, bounced-check explanations, and any other Contribution-specific narrative. Field-level security follows the record-level visibility rule per FU-RECORD-REQ-021 (Donor / Sponsor Coordinator, Executive Member, System Administrator only)."
    ),
    dataRow(
      "FU-RECORD-DAT-035",
      "giftType",
      "enum",
      "No",
      "Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other",
      "Visible only when contributionType = Donation per FU-RECORD-REQ-006. The form in which a Donation was given. Sponsorship and Grant Contributions do not use this field."
    ),
    dataRow(
      "FU-RECORD-DAT-036",
      "inKindDescription",
      "text",
      "No",
      "\u2014",
      "Visible only when contributionType = Donation AND giftType = In-Kind per FU-RECORD-REQ-006. Describes what was given (services, equipment, goods, etc.)."
    ),
    dataRow(
      "FU-RECORD-DAT-037",
      "inKindValuationBasis",
      "text",
      "No",
      "\u2014",
      "Visible only when contributionType = Donation AND giftType = In-Kind per FU-RECORD-REQ-006. Notes how the dollar amount in the amount field was determined (donor-declared, market-rate equivalent, professional appraisal, etc.)."
    ),
    dataRow(
      "FU-RECORD-DAT-038",
      "nextGrantDeadline",
      "date",
      "No",
      "\u2014",
      "Visible only when contributionType = Grant per FU-RECORD-REQ-006. The next pending grant-related obligation, typically a report deadline. The Coordinator may also use this field for any other grant-related deadline they want surfaced (renewal, follow-up submission, etc.)."
    ),
  ],
});
children.push(contributionTable);
children.push(blank());

// 8.4 Fundraising Campaign - Fields Created
children.push(para("8.4 Fundraising Campaign \u2014 Fields Created", { heading: HeadingLevel.HEADING_2 }));
children.push(
  para(
    "The Fundraising Campaign entity is created and maintained by FU-RECORD. Eight fields are defined."
  )
);
children.push(blank());

const campaignTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1500, 1700, 1000, 1100, 1700, 2360],
  rows: [
    dataTableHeader(),
    dataRow(
      "FU-RECORD-DAT-039",
      "campaignName",
      "text",
      "Yes",
      "\u2014",
      "The name of the Campaign. Coordinator-supplied at creation."
    ),
    dataRow(
      "FU-RECORD-DAT-040",
      "campaignType",
      "enum",
      "No",
      "Annual Fund, Program Appeal, Event, Capital Campaign, Other",
      "Captures the Campaign\u2019s purpose. Not a source-of-contributions field \u2014 source is captured by linked Contributions (donorContact / donorAccount)."
    ),
    dataRow(
      "FU-RECORD-DAT-041",
      "status",
      "enum",
      "Yes (no default)",
      "Planned, Active, Completed, Cancelled",
      "Coordinator must explicitly select at creation. Planned means designed and in pre-approval review, not yet accepting Contributions. Active means approved to proceed and accepting Contributions. Completed means the period or goal has closed; the record stays for analytics. Cancelled means a Planned or Active Campaign was abandoned; the record stays for historical reference. Free-form transitions per FU-RECORD-REQ-008. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-042",
      "goalAmount",
      "currency",
      "No",
      "\u2014",
      "The Campaign\u2019s fundraising goal. Audited per FU-RECORD-REQ-014."
    ),
    dataRow(
      "FU-RECORD-DAT-043",
      "startDate",
      "date",
      "No",
      "\u2014",
      "The Campaign\u2019s start date."
    ),
    dataRow(
      "FU-RECORD-DAT-044",
      "endDate",
      "date",
      "No",
      "\u2014",
      "The Campaign\u2019s end date."
    ),
    dataRow(
      "FU-RECORD-DAT-045",
      "totalRaised",
      "currency",
      "No",
      "\u2014",
      "System-calculated, read-only per FU-RECORD-REQ-011. Sum of amount across all Contributions in Received status linked to this Campaign. Contributions in any other status do not contribute."
    ),
    dataRow(
      "FU-RECORD-DAT-046",
      "description",
      "text",
      "No",
      "\u2014",
      "Free-form description of the Campaign \u2014 purpose, narrative for stakeholders, internal notes."
    ),
  ],
});
children.push(campaignTable);
children.push(blank());

// ==============================
// 9. Open Issues
// ==============================
children.push(para("9. Open Issues", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Issues inherited by this process and their disposition. No new open issues are surfaced by FU-RECORD \u2014 every structural decision was settled in the 04-28-26 interview. Implementation form for the pipeline view (FU-RECORD-REQ-023) and the giving history rollup (FU-RECORD-REQ-024) is deferred to Phase 9 within the requirement language itself, rather than as a separate open issue."
  )
);
children.push(blank());

const issueTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1800, 3500, 4060],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell("ID", { bold: true, fill: "D5E8F0", width: 1800 }),
        cell("Issue", { bold: true, fill: "D5E8F0", width: 3500 }),
        cell("Disposition", { bold: true, fill: "D5E8F0", width: 4060 }),
      ],
    }),
    new TableRow({
      children: [
        cell("EI-ISS-001", { width: 1800 }),
        cell(
          "Acknowledgment / Tax Receipt model: separate entity or field-level capability within Contribution? Working position from the FU Domain Overview was field-level (acknowledgmentSent, acknowledgmentDate, taxReceiptRequired on Donation-type Contribution records).",
          { width: 3500 }
        ),
        cell(
          "CLOSED by FU-RECORD. The resolution is field-level capability, but with a leaner and broader scope than the Domain Overview\u2019s working position: two fields on Contribution \u2014 acknowledgmentSent (boolean) and acknowledgmentDate (date) per FU-RECORD-DAT-032 and DAT-033 \u2014 both optional, both Coordinator-set, both shared across all contribution types (Donation, Sponsorship, Grant) rather than Donation-only. Specified in full by FU-RECORD-REQ-015. No standalone Acknowledgment entity. No taxReceiptRequired field. No acknowledgmentMethod enum. Specifics of what was sent in any given case are recorded in notes. The deviation from the Domain Overview\u2019s working position (which proposed three Donation-only fields including taxReceiptRequired) is intentional and reflects the recording-only operational model \u2014 generation, sending, and tax-receipt content are out of FU-RECORD scope and will be addressed by FU-STEWARD where relevant.",
          { width: 4060 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("FU-DO-ISS-002", { width: 1800 }),
        cell(
          "Contribution entity consolidates the legacy four-entity model (Donation, Pledge, Grant, Sponsorship) into a single entity with a contributionType discriminator per Entity Inventory v1.5. Informational.",
          { width: 3500 }
        ),
        cell(
          "No action. FU-RECORD adopts the consolidated model and writes against it throughout. The contributionType discriminator (FU-RECORD-DAT-021) carries three values \u2014 Donation, Sponsorship, Grant \u2014 rather than four; Pledged is a status value (FU-RECORD-DAT-022), not a contributionType. Recorded for provenance.",
          { width: 4060 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("CON-ISS-004", { width: 1800 }),
        cell(
          "Contact Entity PRD has incomplete domain coverage \u2014 fields contributed by domains other than the one that originally defined the entity may still be missing.",
          { width: 3500 }
        ),
        cell(
          "ADVANCED, not closed. FU-RECORD surfaces one new Contact field (donorLifetimeGiving per FU-RECORD-DAT-018) for the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7, joining donorStatus and donorNotes from FU-PROSPECT. CON-ISS-004 cannot be closed by FU-RECORD because FU-STEWARD and FU-REPORT remain to be defined; final closure depends on those processes also completing their Contact contributions.",
          { width: 4060 }
        ),
      ],
    }),
    new TableRow({
      children: [
        cell("ACT-ISS-002", { width: 1800 }),
        cell(
          "Account Entity PRD has incomplete domain coverage \u2014 fields contributed by domains other than the one that originally defined the entity may still be missing.",
          { width: 3500 }
        ),
        cell(
          "ADVANCED, not closed. FU-RECORD surfaces no new Account fields. funderLifetimeGiving already exists on Account v1.6 (Section 3.4); FU-RECORD-REQ-013 specifies how the existing field is updated but does not redefine it. The bundled Account Entity PRD v1.6 \u2192 v1.7 carry-forward at the end of FU Phase 4b currently carries only assignedSponsorCoordinator from FU-PROSPECT. ACT-ISS-002 cannot be closed by FU-RECORD because FU-STEWARD and FU-REPORT remain to be defined.",
          { width: 4060 }
        ),
      ],
    }),
  ],
});
children.push(issueTable);
children.push(blank());

// ==============================
// 10. Interview Transcript
// ==============================
children.push(para("10. Interview Transcript", { heading: HeadingLevel.HEADING_1 }));
children.push(
  para(
    "Condensed record of the interview, organized by topic area with inline Decision callouts. The substantive interview was conducted 04-28-26 between the Donor / Sponsor Coordinator (administrator) and the interviewer; a continuation session on 04-29-26 assembled Sections 6 through 10 from the structural decisions captured in the prior session. The transcript captures the substantive exchanges and decisions that shaped the process document; conversational filler has been condensed into clean question-and-answer pairs."
  )
);
children.push(blank());

// Helper to add a transcript topic
function addTranscriptTopic(heading, exchanges) {
  children.push(para(heading, { heading: HeadingLevel.HEADING_2 }));
  exchanges.forEach((exch) => {
    if (exch.q) {
      children.push(richPara([
        { text: "Q: ", bold: true },
        { text: exch.q },
      ]));
      children.push(blank());
    }
    if (exch.a) {
      children.push(richPara([
        { text: "A: ", bold: true },
        { text: exch.a },
      ]));
      children.push(blank());
    }
    if (exch.decision) {
      children.push(richPara([
        { text: "Decision: ", bold: true },
        { text: exch.decision },
      ]));
      children.push(blank());
    }
  });
}

addTranscriptTopic("10.1 Process Purpose and Cadence", [
  {
    q: "What is different in the world after FU-RECORD runs for a single contribution event compared to before?",
    a: "A Contribution record exists in the system that documents the event \u2014 the donation, the sponsorship agreement, the grant application, the pledge. Donor and funder analytics are updated to include that Contribution. The donor or funder lifecycle field is moved to Active if it was not already there.",
  },
  {
    q: "Does the cadence of FU-RECORD differ from FU-PROSPECT? FU-PROSPECT runs at high volume during ramp-up and tapers in steady state. Is FU-RECORD the same?",
    a: "No. New donor and funder creation tapers in steady state but each existing donor and funder gives repeatedly, so the volume of Contribution records stays high indefinitely.",
    decision: "FU-RECORD volume does not taper. The system must support Contribution recording at a steady, sustained pace as a routine operational activity rather than a campaign-driven burst.",
  },
  {
    q: "Is there a relationship-level \u201cdone\u201d state for FU-RECORD, analogous to FU-PROSPECT\u2019s Lapsed and Closed?",
    a: "No. Each Contribution has a terminal state but the funder relationship continues indefinitely.",
    decision: "No fixed \u201cdone\u201d state at the relationship level. Contribution records have terminal statuses; the funder relationship continues for the life of the relationship. The Active \u2192 Lapsed transition is FU-STEWARD\u2019s responsibility, not FU-RECORD\u2019s.",
  },
]);

addTranscriptTopic("10.2 Process Triggers \u2014 Manual-Only Model", [
  {
    q: "Are any Contribution creations system-generated, scheduled, or integration-driven? For example, automatic creation from a payment-processor feed, or scheduled creation against a Pledge fulfillment schedule?",
    a: "No. The Coordinator manually creates every Contribution.",
    decision: "Trigger model is manual only. No system-generated, scheduled, or integration-driven Contribution creation. The Coordinator manually creates every Contribution on receiving a check, online giving notification, ACH deposit confirmation, credit card receipt, in-kind delivery, signed sponsorship agreement, grant decision letter, or any other indication of a contribution event.",
  },
]);

addTranscriptTopic("10.3 Preconditions and Required Data at Creation", [
  {
    q: "What must exist before a Contribution can be recorded? What fields are required at creation? Does status default to anything?",
    a: "The donor record must exist. contributionType, status, and the donor link are required at creation. status does not default \u2014 the Coordinator must choose explicitly because legitimate starting statuses vary by contributionType.",
    decision: "Precondition (Option A): the donor Contact (with contactType including Donor) or Funder Organization Account (with accountType including Donor/Sponsor) must exist. The lifecycle stage is unconstrained \u2014 Applied and Pledged Contributions are valid against records in any FU-PROSPECT stage. Required at creation: contributionType (no default), status (no default), exactly one of donorContact or donorAccount. Optional at creation: amount, all four date fields, designation, campaign, notes, giftType, and all other fields.",
  },
]);

addTranscriptTopic("10.4 Personas and Authority", [
  {
    q: "Who operates FU-RECORD? Is the Executive Member a co-operator or a read-only consumer? Do other coordinators (Mentor Administrator, Client Recruiter, Partner Coordinator) participate when their work touches the same Contact or Account records?",
    a: "Only the Donor / Sponsor Coordinator operates the process. The Executive Member is read-only via reports. No other personas participate.",
    decision: "MST-PER-010 Donor / Sponsor Coordinator is sole operator with full authority \u2014 no approvals required. MST-PER-002 Executive Member is read-only consumer of FU-RECORD output via reports and dashboards. No other personas (Mentor Administrator, Client Recruiter, Partner Coordinator, Content and Event Administrator) operate FU-RECORD even when their work touches the same Contact or Account records.",
  },
]);

addTranscriptTopic("10.5 Donation Workflow (Happy Path)", [
  {
    q: "Walk through the end-to-end Donation flow from check arriving in the mail to acknowledgment sent.",
    a: "Identify the donor and look up the Contact or Account. Create a Contribution record with contributionType = Donation and status (typically Received for a paid donation). Populate amount, receivedDate, giftType, designation, and Campaign linkage as known. The system automatically activates the donor record. Send an acknowledgment letter and set acknowledgmentSent and acknowledgmentDate. The donorLifetimeGiving and funderLifetimeGiving rollups update automatically.",
    decision: "Donation happy path proceeds as described. Automatic activation per FU-PROSPECT-REQ-006 fires on first Contribution creation regardless of status or contributionType. donorLifetimeGiving (new on Contact) and funderLifetimeGiving (existing on Account) are calculated as the sum of amount across Contributions in Received status linked via donorContact or donorAccount respectively.",
  },
]);

addTranscriptTopic("10.6 Sponsorship Specifics", [
  {
    q: "Where do Sponsorships typically originate in the lifecycle \u2014 at agreement signing or at payment?",
    a: "At the agreement \u2014 status = Committed.",
  },
  {
    q: "Do recognition obligations need a structured field, or are they handled in notes?",
    a: "In notes.",
    decision: "Sponsorships typically originate at agreement (status = Committed). Recognition obligations are recorded in notes \u2014 no recognitionObligations enum, no structured obligation tracking. The Coordinator captures recognition commitments at signing and references them during stewardship; obligation tracking, if needed, is FU-STEWARD scope.",
  },
  {
    q: "Do Sponsorships need a paymentForm field analogous to giftType for Donations?",
    a: "No.",
    decision: "No Sponsorship-specific paymentForm field. giftType is Donation-only.",
  },
  {
    q: "How are in-kind Sponsorships (services, goods provided in lieu of cash) handled? giftType = In-Kind only surfaces for Donations.",
    a: "Captured in notes.",
    decision: "In-kind Sponsorships are handled in notes. No Sponsorship-specific in-kind field.",
  },
]);

addTranscriptTopic("10.7 Grant Specifics \u2014 Lifecycle and Multi-Payment Treatment", [
  {
    q: "Where do Grants enter the lifecycle?",
    a: "At application submission \u2014 status = Applied, applicationDate set, amount = amount requested.",
  },
  {
    q: "How does a Grant advance from Applied to Committed and to Received?",
    a: "Award letter triggers Committed \u2014 commitmentDate set, amount updated to actual award. Final payment triggers Received \u2014 receivedDate set. If declined, status becomes Unsuccessful.",
  },
  {
    q: "For multi-payment Grants spread across years, how is the final Contribution status determined? When is amount the requested amount vs. the awarded amount? When does the Grant reach Received?",
    a: "Received when fully paid. receivedDate is the date of the final payment. Multi-payment detail in notes.",
    decision: "Grants begin at status = Applied with applicationDate set and amount = amount requested. Advance to Committed on award (commitmentDate set, amount updated to actual award). Advance to Received only when fully paid (Option 1 \u2014 receivedDate is the date of the final payment for multi-payment Grants). Multi-payment disbursement detail in notes. The fiscal-year reporting trade-off (single Contribution amount in the year of final payment) is accepted as the simplest model. nextGrantDeadline tracks the next pending obligation.",
  },
  {
    q: "How are grant renewals handled \u2014 reopening the prior Contribution or creating a new one?",
    a: "New Contribution at the renewal application time.",
    decision: "Grant renewals are handled by creating a new Grant Contribution at the renewal application time, not by re-opening the prior Contribution.",
  },
]);

addTranscriptTopic("10.8 Contribution Type Discriminator and Status Field", [
  {
    q: "What values does contributionType carry? Is Pledge a separate type or a status? Is In-Kind a contributionType or a giftType value?",
    a: "Donation, Sponsorship, Grant. Pledged is a status. In-Kind is a giftType value on Donations.",
    decision: "contributionType has three values (Donation, Sponsorship, Grant) \u2014 not four. Pledged is a status, not a type. In-Kind is a giftType value on Donations, not a contributionType.",
  },
  {
    q: "What values does the Contribution status field carry? Are transitions free-form or system-enforced?",
    a: "Applied, Pledged, Committed, Received, Unsuccessful, Cancelled. Free-form transitions \u2014 the Coordinator can move between any values at any time.",
    decision: "Six status values: Applied (application/request submitted, no funder signal), Pledged (soft commitment, not high-probability), Committed (firm commitment with payment expected), Received (funds in hand; for multi-payment Grants, all payments in), Unsuccessful (terminal for Applied or Pledged that did not convert), Cancelled (terminal for Committed withdrawn before payment). status is audited.",
  },
]);

addTranscriptTopic("10.9 Donation-Specific Fields and In-Kind Handling", [
  {
    q: "What fields surface only for Donations? What giftType values are needed?",
    a: "giftType with values Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other. When giftType = In-Kind, expose inKindDescription and inKindValuationBasis.",
    decision: "giftType is Donation-only with values Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other. inKindDescription and inKindValuationBasis are visible only when contributionType = Donation AND giftType = In-Kind. Sponsorship and Grant Contributions do not use giftType.",
  },
]);

addTranscriptTopic("10.10 Acknowledgment Model (EI-ISS-001 Resolution)", [
  {
    q: "How should the acknowledgment / tax-receipt model be resolved? The Domain Overview proposed three Donation-only fields including taxReceiptRequired. Is that right, or is something else appropriate?",
    a: "Two fields are enough: acknowledgmentSent and acknowledgmentDate. Make them apply across all types, not just Donations. taxReceiptRequired is not needed as a structured field \u2014 specifics go in notes.",
    decision: "EI-ISS-001 is closed with field-level capability. Two fields \u2014 acknowledgmentSent (boolean) and acknowledgmentDate (date) \u2014 on Contribution, both optional, both Coordinator-set, both shared across all contribution types (Donation, Sponsorship, Grant). No standalone Acknowledgment entity. No taxReceiptRequired field. No acknowledgmentMethod enum. Specifics of what was sent in any given case are recorded in notes. The resolution deviates from the FU Domain Overview\u2019s working position (three Donation-only fields including taxReceiptRequired) \u2014 leaner and broader-scoped.",
  },
]);

addTranscriptTopic("10.11 Fundraising Campaign Entity", [
  {
    q: "What fields does the Fundraising Campaign carry? What does campaignType represent \u2014 source of contributions or purpose?",
    a: "campaignName, campaignType (purpose, not source), goalAmount, startDate, endDate, status, totalRaised (system-calculated), description.",
    decision: "Campaign has campaignName (required), campaignType (five values \u2014 Annual Fund, Program Appeal, Event, Capital Campaign, Other), status (four values \u2014 Planned, Active, Completed, Cancelled \u2014 free-form transitions), goalAmount, startDate, endDate, totalRaised (system-calculated, only Received Contributions counted), description. campaignType captures purpose, not source of contributions.",
  },
  {
    q: "How and when is a Fundraising Campaign created \u2014 in advance of solicitation, after Contributions arrive, or both?",
    a: "Both. Sometimes a Campaign is set up in advance with a goal and date range; sometimes Contributions are grouped after the fact under a named effort.",
    decision: "Pattern C creation timing \u2014 Campaigns may be created in advance or retroactively; Coordinator decides per case.",
  },
  {
    q: "How does Contribution-to-Campaign linkage work? Is linkage to Completed or Cancelled Campaigns gated by the system?",
    a: "One Campaign per Contribution. Set, change, or clear at any time. No system gating against Completed or Cancelled.",
    decision: "One Campaign per Contribution; campaign field is settable, changeable, and clearable at any time, with no system-enforced gating against linking to Completed or Cancelled Campaigns. Coordinator authority is full.",
  },
]);

addTranscriptTopic("10.12 Calculated Fields \u2014 Lifetime Giving on Contact and Account", [
  {
    q: "What rollup fields are needed on the donor Contact and Funder Organization Account? funderLifetimeGiving already exists on Account; is the Contact-side equivalent needed too?",
    a: "Yes \u2014 add donorLifetimeGiving on Contact, parallel to funderLifetimeGiving on Account.",
  },
  {
    q: "What status counts toward the rollup? Should pledges count, or only paid Contributions?",
    a: "Only Received status counts.",
    decision: "funderLifetimeGiving on Account already exists in v1.6 \u2014 FU-RECORD specifies the calculation but does not define the field. donorLifetimeGiving on Contact is NEW. Both calculate as the sum of amount across all Contributions in Received status linked to the record. Contributions in any other status do not contribute. donorLifetimeGiving joins the bundled end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 \u2192 v1.7, alongside donorStatus and donorNotes from FU-PROSPECT.",
  },
]);

addTranscriptTopic("10.13 Access Control on Contribution and Fundraising Campaign", [
  {
    q: "Who can see Contribution records? Mentors? General staff?",
    a: "Donor / Sponsor Coordinator, Executive Member, and System Administrator only. Mentors and other staff have no visibility.",
  },
  {
    q: "Same for Fundraising Campaign records?",
    a: "Same.",
  },
  {
    q: "Does the notes field on Contribution follow the same restriction, or is it more restricted than the parent record?",
    a: "Same restriction \u2014 if you can see the record, you can see the notes.",
    decision: "Record-level visibility on both Contribution and Fundraising Campaign restricted to Donor / Sponsor Coordinator, Executive Member, and System Administrator. Other personas have no visibility to either entity. Contribution notes follow the same restriction as the parent record.",
  },
]);

addTranscriptTopic("10.14 Audit Trail Scope", [
  {
    q: "Which Contribution fields warrant audit?",
    a: "status, amount, the donor link, and the four date fields at minimum.",
  },
  {
    q: "Which Fundraising Campaign fields warrant audit? status is the obvious candidate \u2014 anything else?",
    a: "status and goalAmount.",
    decision: "On Contribution: status, amount, donorContact, donorAccount, applicationDate, commitmentDate, expectedPaymentDate, receivedDate are audited at minimum. Other fields may be audited additionally; this is the minimum requirement. On Fundraising Campaign: status and goalAmount are audited. startDate and endDate are typically established once at creation and rarely changed, so they are not in the audit scope. totalRaised is system-calculated and does not need field-level audit because its value follows from Contribution changes, which are themselves audited.",
  },
]);

addTranscriptTopic("10.15 Process Completion \u2014 Terminal States, Amendments, Retention", [
  {
    q: "What terminal states do Contributions reach? Can records be deleted?",
    a: "Received, Unsuccessful, Cancelled. Records persist permanently \u2014 no deletion.",
  },
  {
    q: "How are bounced checks, refunds, and reversals handled? Editing the original record, or creating offsetting records?",
    a: "Edit the original \u2014 status to Cancelled, reason in notes. No offsetting records.",
  },
  {
    q: "Is there any point at which a Contribution becomes locked or read-only \u2014 after acknowledgment is sent, after the fiscal year closes, after the record reaches a terminal status?",
    a: "No. The Coordinator can edit any field at any time.",
    decision: "Contribution-level terminal states are Received, Unsuccessful, and Cancelled. Records persist permanently \u2014 no deletion, no voiding distinct from Cancelled. Funder-relationship-level: FU-RECORD does not declare itself complete for a funder; the Active \u2192 Lapsed transition is FU-STEWARD\u2019s responsibility. Amendments follow Level A + Pattern X \u2014 Coordinator can edit any field on any Contribution at any time, with the audit trail capturing changes. Bounced checks, refunds, and reversals are handled by editing the original record\u2019s status (typically transitioning to Cancelled) and notes \u2014 not by creating offsetting records.",
  },
]);

addTranscriptTopic("10.16 Reporting and Pipeline Visibility", [
  {
    q: "What views does the Coordinator need? A Contribution pipeline view by status? A Grant tracker? A Campaign progress view? A Recent Contributions view? A donor and funder giving history rollup?",
    a: "The pipeline view by status and the per-donor giving history rollup are the two essential views. The other three are either covered by those two with filters or by standard record listing.",
  },
  {
    q: "Should implementation form be decided now or deferred to Phase 9, like FU-PROSPECT-REQ-011?",
    a: "Defer to Phase 9.",
    decision: "Two views in scope as system requirements: (1) Contribution pipeline view grouped by status with filters by contributionType, donor type, and date ranges over the four date fields; (2) donor and funder giving history rollup on each Donor Contact and each Funder Organization Account, listing all linked Contributions with running totals. Three views considered and dropped: Grant tracker view (covered by View 1 with contributionType = Grant filter), Fundraising Campaign progress view (Campaign records already carry the data), Recent Contributions view (covered by standard record listing). Implementation form for the two in-scope views is deferred to Phase 9 within the requirement language itself \u2014 not surfaced as a separate FU-RECORD-ISS-001 because the deferral is explicit in the requirements.",
  },
]);

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
  columnWidths: [1500, 1500, 6360],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell("Version", { bold: true, fill: "D5E8F0", width: 1500 }),
        cell("Date", { bold: true, fill: "D5E8F0", width: 1500 }),
        cell("Changes", { bold: true, fill: "D5E8F0", width: 6360 }),
      ],
    }),
    new TableRow({
      children: [
        cell("1.0", { width: 1500 }),
        cell("04-29-26 04:16", { width: 1500 }),
        cell(
          "Initial release. Phase 4b process document for FU-RECORD (Contribution Recording) produced per crmbuilder/PRDs/process/interviews/interview-process-definition.md v2.6. Second process document in the Fundraising domain. Substantive interview conducted 04-28-26; continuation session on 04-29-26 assembled Sections 6 through 10 from the structural decisions captured in the prior session. Ten sections produced: Process Purpose, Process Triggers, Personas Involved, Process Workflow (Donation happy path plus Sponsorship and Grant variants plus Fundraising Campaign workflow), Process Completion (Contribution terminal states, funder-relationship-level continuation, amendments and corrections via Level A + Pattern X), System Requirements (FU-RECORD-REQ-001 through FU-RECORD-REQ-024), Process Data (16 supporting data items FU-RECORD-DAT-001 through FU-RECORD-DAT-016 across Contact, Account, and one relationship), Data Collected (30 created-or-updated data items FU-RECORD-DAT-017 through FU-RECORD-DAT-046 across Contact, Account, Contribution, and Fundraising Campaign), Open Issues (no new issues; 4 inherited dispositioned \u2014 EI-ISS-001 CLOSED, FU-DO-ISS-002 informational no action, CON-ISS-004 advanced, ACT-ISS-002 advanced), Interview Transcript (16 topic areas with inline Decision callouts). One Entity PRD field addition surfaced and recorded for the bundled end-of-FU-Phase-4b carry-forward: donorLifetimeGiving on Contact (currency, system-calculated, visible when contactType has Donor). EI-ISS-001 resolved with field-level capability (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, deviating from the Domain Overview\u2019s Donation-only working position. No carry-forward request drafts issued at session close per the Fundraising Domain Overview v1.0 Section 5 bundling decision. Depends on Master PRD v2.5, Entity Inventory v1.5, Fundraising Domain Overview v1.0, FU-PROSPECT v1.0, Contact Entity PRD v1.6, Account Entity PRD v1.6.",
          { width: 6360 }
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

const outPath = path.join(__dirname, "FU-RECORD.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath);
});


