// Generator for the CR-RESOURCES Sub-Domain Overview.
// Run: NODE_PATH=/home/claude/.npm-global/lib/node_modules node generate-CBM-SubDomain-Overview-Resources.js

const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber } = require("docx");

const FONT = "Arial";
const SZ = { body: 22, small: 20, xs: 16, h1: 32, h2: 28, h3: 24, meta: 20 };
const COLORS = { headerBg: "1F3864", headerText: "FFFFFF", altRowBg: "F2F7FB", borderColor: "AAAAAA", titleColor: "1F3864", idColor: "888888" };
const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderColor };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const MC = [2800, 6560]; const TC = [1500, 7860]; const P3 = [2200, 2600, 4560]; const CLC = [1300, 1900, 6160];
const TABLE_WIDTH = 9360;
const DOC = { orgName: "Cleveland Business Mentors", docName: "CR-RESOURCES Sub-Domain Overview", version: "1.1", lastUpdated: "05-30-26" };

function r(t, o = {}) { return new TextRun({ text: t, font: FONT, size: o.size || SZ.body, bold: o.bold || false, italics: o.italics || false, color: o.color }); }
function p(t, o = {}) { return new Paragraph({ spacing: { after: o.after ?? 120 }, children: Array.isArray(t) ? t : [r(t, o)] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [r(t, { size: SZ.small })] }); }
function heading(t, l) { return new Paragraph({ heading: l, spacing: { before: l === HeadingLevel.HEADING_1 ? 360 : 240, after: 120 }, children: [r(t, { bold: true, size: l === HeadingLevel.HEADING_1 ? SZ.h1 : SZ.h2, color: COLORS.titleColor })] }); }
function hc(t, w) { return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(t, { bold: true, size: SZ.small, color: COLORS.headerText })] })] }); }
function dc(t, w, o = {}) { return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: o.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, children: [new Paragraph({ children: [r(t, { size: SZ.small, bold: o.bold, color: o.color })] })] }); }
function table(cols, header, rows, idCol = -1) {
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: cols,
    rows: [new TableRow({ children: header.map((h, j) => hc(h, cols[j])) }), ...rows.map((row, i) => new TableRow({ children: row.map((v, j) => dc(v, cols[j], { shaded: i % 2 === 1, bold: j === 0, color: j === idCol ? COLORS.idColor : undefined })) }))] });
}

function build() {
  const c = [];
  c.push(heading("CR-RESOURCES Sub-Domain Overview", HeadingLevel.HEADING_1));
  c.push(table(MC, ["Attribute", "Value"], [
    ["Sub-Domain Code", "CR-RESOURCES"],
    ["Sub-Domain Name", "Resource Library"],
    ["Owning Domain", "Client Recruiting"],
    ["Version", DOC.version], ["Last Updated", DOC.lastUpdated], ["Status", "Draft"],
  ]));

  c.push(heading("1. Sub-Domain Purpose", HeadingLevel.HEADING_1));
  c.push(p("The CR-RESOURCES sub-domain manages the organization's public Resources page \u2014 a library of recordings of past events and standalone assets offered to the business community. It exists to turn finished content into published, publicly accessible resources and to keep that library current and well organized."));
  c.push(p("It is the fifth sub-domain of Client Recruiting, alongside the four established sub-domains: Partner Relationship Management (CR-PARTNER), Marketing (CR-MARKETING), Events (CR-EVENTS), and Reactivation (CR-REACTIVATE). It is a distinct, autonomous process area \u2014 publishing and curating a public content library \u2014 that shares the recruiting purpose of attracting and engaging the business community and benefits from unified oversight, which is why it is modeled as its own sub-domain rather than folded into Events or Marketing."));

  c.push(heading("2. Scope and Boundaries", HeadingLevel.HEADING_1));
  c.push(p("In scope:"));
  ["Publishing recordings of completed events as public resources.",
   "Publishing standalone assets created for the business community.",
   "Organizing, featuring, updating, and unlisting resources.",
   "Serving the public Resources page, which requires no sign-in."].forEach((t) => c.push(bullet(t)));
  c.push(p("Out of scope:"));
  ["The event lifecycle and the capture of the raw recording, which belong to the Events sub-domain (CR-EVENTS).",
   "Marketing campaigns and communications, which belong to the Marketing sub-domain (CR-MARKETING).",
   "The raw recording link itself (Event.recordingUrl), which is a back-office reference owned by Events and is read, never written, by this sub-domain."].forEach((t) => c.push(bullet(t)));
  c.push(p("The recording-migration step that brings a recording into this sub-domain is a continuation off the end of the Event Management process (CR-EVENTS-MANAGE)."));

  c.push(heading("3. Processes", HeadingLevel.HEADING_1));
  c.push(table(P3, ["Process Code", "Name", "Summary"], [
    ["CR-RESOURCES-MANAGE", "Resource Library Management", "Migrates recordings from completed events into published resources, publishes standalone assets, and maintains the public page (categorize, feature, unlist). The single process in this sub-domain."],
  ]));

  c.push(heading("4. Personas", HeadingLevel.HEADING_1));
  c.push(table(TC, ["Persona", "Role"], [
    ["Content and Event Administrator", "Primary operator \u2014 publishes and maintains resources. The same administrator persona that runs Events."],
    ["Public visitor (anonymous)", "Audience for the public Resources page; browses published resources without signing in."],
    ["Executive Member", "Optional read-only audience for the published library."],
  ]));

  c.push(heading("5. Data Reference", HeadingLevel.HEADING_1));
  c.push(table(P3, ["Entity", "Ownership", "Notes"], [
    ["Resource", "Owned (custom Base)", "The published content record. Uniform field set across recordings and standalone assets; visibility gated solely by listedPublicly. Optional sourceEvent link to Event. Defined in the Resource Entity PRD."],
    ["Event", "Read (CR-EVENTS)", "recordingUrl (CR-EVENTS-MANAGE-DAT-030) is read as the entry point to the raw recording; dateStart and name are read for default values. Never written by this sub-domain."],
  ]));

  c.push(heading("6. Cross-Sub-Domain Dependencies", HeadingLevel.HEADING_1));
  c.push(p("CR-RESOURCES depends on CR-EVENTS for the origin of recordings. A recording resource links back to its source event through Resource.sourceEvent, and the recording-migration step extends CR-EVENTS-MANAGE. The dependency is read-only on the Events side: this sub-domain follows the event's raw recording link to retrieve content but never modifies event data. Standalone assets have no cross-sub-domain dependency."));

  c.push(heading("7. Open Issues", HeadingLevel.HEADING_1));
  c.push(p("None. Both version 1.0 open issues (CR-RESOURCES-ISS-001 and ISS-002) were resolved in version 1.1 following stakeholder confirmation — the resourceType and category value lists are confirmed, and the public Resources page is ordered by category then resourceDate descending. The authoritative resolutions are recorded as RES-DEC-007 through RES-DEC-010 in the Resource Entity PRD v1.1 and in the CR-RESOURCES-MANAGE v1.1 Interview Transcript."));

  c.push(heading("8. Change Log", HeadingLevel.HEADING_1));
  c.push(table(CLC, ["Version", "Date", "Summary"], [
    ["1.0", "05-29-26 16:30", "Initial CR-RESOURCES Sub-Domain Overview establishing the Resource Library as the fifth Client Recruiting sub-domain: purpose, scope and boundaries against CR-EVENTS and CR-MARKETING, the single CR-RESOURCES-MANAGE process, personas, the owned Resource entity and read-only Event dependency."],
    ["1.1", "05-30-26", "Resolved both version 1.0 open issues (CR-RESOURCES-ISS-001 and ISS-002) following stakeholder confirmation; Open Issues section now empty, pointing to the authoritative decisions in Resource Entity PRD v1.1 and CR-RESOURCES-MANAGE v1.1."],
  ]));
  return c;
}

const content = build();
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ.body } } }, paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h1, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h2, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
  ] },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [r(DOC.orgName, { size: SZ.meta, bold: true, color: COLORS.titleColor }), new TextRun({ children: ["\t"], font: FONT }), r(DOC.docName, { size: SZ.meta, color: COLORS.idColor })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Page ", PageNumber.CURRENT], font: FONT, size: SZ.xs, color: COLORS.idColor })] })] }) },
    children: content,
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync("/tmp/CBM-SubDomain-Overview-Resources.docx", buf); console.log("Wrote (" + buf.length + " bytes)"); });
