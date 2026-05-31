// Generator for CR-RESOURCES-MANAGE (Resource Library Management) process document.
// Reuses the shared rendering engine/styles used across the CBM process documents.
// Run: NODE_PATH=/home/claude/.npm-global/lib/node_modules node generate-CR-RESOURCES-MANAGE.js

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = "Arial";
const SZ = { body: 22, small: 20, xs: 16, h1: 32, h2: 28, h3: 24, meta: 20 };
const COLORS = { headerBg: "1F3864", headerText: "FFFFFF", altRowBg: "F2F7FB", borderColor: "AAAAAA", titleColor: "1F3864", idColor: "888888" };
const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderColor };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const MC = [2800, 6560];
const REQC = [2700, 6660];
const DC = [1900, 1500, 950, 2450, 2560];
const TC = [1500, 7860];
const RELC = [3200, 6160];
const FTC = [2400, 2400, 4560];
const CLC = [1300, 1900, 6160];
const TABLE_WIDTH = 9360;
const DOC = { orgName: "Cleveland Business Mentors", docName: "CR-RESOURCES-MANAGE Process Document", version: "1.1", lastUpdated: "05-30-26" };

function r(text, opts = {}) { return new TextRun({ text, font: FONT, size: opts.size || SZ.body, bold: opts.bold || false, italics: opts.italics || false, color: opts.color }); }
function p(text, opts = {}) { return new Paragraph({ spacing: { after: opts.after ?? 120 }, alignment: opts.align, children: Array.isArray(text) ? text : [r(text, opts)] }); }
function bullet(text) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [r(text, { size: SZ.small })] }); }
function step(text) { return new Paragraph({ numbering: { reference: "steps", level: 0 }, spacing: { after: 100 }, children: [r(text, { size: SZ.body })] }); }
function heading(text, level) { return new Paragraph({ heading: level, spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 120 }, children: [r(text, { bold: true, size: level === HeadingLevel.HEADING_1 ? SZ.h1 : level === HeadingLevel.HEADING_2 ? SZ.h2 : SZ.h3, color: COLORS.titleColor })] }); }
function hdrCell(text, width) { return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })] }); }
function dataCell(text, width, opts = {}) { return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, columnSpan: opts.columnSpan, children: [new Paragraph({ children: [r(text, { size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics })] })] }); }
function genTable(cols, header, rows, idCol = -1) {
  const hdr = new TableRow({ children: header.map((h, j) => hdrCell(h, cols[j])) });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: cols,
    rows: [hdr, ...rows.map((row, i) => new TableRow({ children: row.map((v, j) => dataCell(v, cols[j], { shaded: i % 2 === 1, bold: j === 0, size: j === idCol ? SZ.xs : SZ.small, color: j === idCol ? COLORS.idColor : undefined })) }))] });
}

function buildContent() {
  const c = [];
  c.push(heading("CR-RESOURCES-MANAGE \u2014 Resource Library Management", HeadingLevel.HEADING_1));
  c.push(genTable(MC, ["Attribute", "Value"], [
    ["Process Code", "CR-RESOURCES-MANAGE"],
    ["Owning Domain", "Client Recruiting"],
    ["Owning Sub-Domain", "CR-RESOURCES (Resource Library)"],
    ["Version", DOC.version],
    ["Last Updated", DOC.lastUpdated],
    ["Status", "Draft"],
  ]));

  c.push(heading("1. Process Purpose", HeadingLevel.HEADING_1));
  c.push(p("The Resource Library Management process maintains the organization's public Resources page \u2014 the collection of recordings of past events and standalone assets made available to the business community. Its purpose is to turn finished content into published, publicly accessible resources and to keep that collection current and well organized."));
  c.push(p("The process has two entry points. The first is migrating a recording from a completed event into a published resource, which is a continuation of the Event Management process: the event holds a back-office link to its raw recording, and this process produces the edited, public copy. The second is publishing a standalone asset that did not originate from an event. Both paths produce the same kind of artifact \u2014 a published Resource record \u2014 and both feed the same public page."));

  c.push(heading("2. Process Triggers", HeadingLevel.HEADING_1));
  [
    "A completed event has a recording the administrator wishes to publish (the event is at Completed status and a recording is available).",
    "A standalone asset has been prepared and is ready to publish.",
    "An existing resource needs to be updated, recategorized, featured, or unlisted.",
  ].forEach((t) => c.push(bullet(t)));
  c.push(p("There is no system-fired initiation. The administrator initiates all activity manually."));

  c.push(heading("3. Personas Involved", HeadingLevel.HEADING_1));
  c.push(genTable(TC, ["Persona", "Role in this process"], [
    ["Content and Event Administrator", "Primary operator. Migrates recordings into resources, publishes standalone assets, and maintains the public page (categorize, feature, unlist). Same administrator persona that runs Event Management."],
    ["Executive Member", "Optional read-only audience for the published library; no operational role."],
    ["Public visitor (anonymous)", "Audience for the Resources page. Browses published resources without signing in; never sees unlisted resources or raw recording links."],
  ]));

  c.push(heading("4. Process Workflow", HeadingLevel.HEADING_1));
  c.push(p("The workflow has a recording-migration path (steps 1\u20134), a standalone-asset path (steps 5\u20136), and ongoing maintenance (steps 7\u20139).", { italics: true }));
  [
    "After an event reaches Completed and a recording exists, the Content and Event Administrator opens the event and follows its recording link to reach the raw, unedited recording in the system that captured it. That link is a back-office reference and is never shown to the public.",
    "The Administrator downloads the raw recording, edits it as needed, and re-hosts the finished version in a reliable location that the Resources page can read.",
    "The Administrator creates a new Resource record, sets resourceType to Recorded Event, links sourceEvent to the originating event, sets url (or file) to the re-hosted copy, and sets category, description, and resourceDate (typically the event date).",
    "The Administrator publishes the Resource by setting listedPublicly true. The system records publishedAt, and the Resource appears on the public Resources page.",
    "For a standalone asset, the Administrator creates a Resource record, sets resourceType to the appropriate value, leaves sourceEvent empty, sets url or file to the hosted asset, and sets category, description, and resourceDate.",
    "The Administrator publishes the standalone Resource the same way, setting listedPublicly true.",
    "The Administrator may edit, recategorize, or feature any Resource at any time.",
    "The Administrator may unlist a Resource by setting listedPublicly false. The Resource is removed from the public page but retained; publishedAt is preserved. Resources are unlisted rather than deleted.",
    "Public visitors browse the Resources page, which shows only Resources where listedPublicly is true, grouped and sorted per the page's organization. No sign-in is required.",
  ].forEach((t) => c.push(step(t)));

  c.push(heading("5. Process Completion", HeadingLevel.HEADING_1));
  c.push(p("There is no terminal completion state. Resource library management is an ongoing capability: each migration or publication completes when the Resource is listed, but the library as a whole has no done state and is maintained continuously."));

  c.push(heading("6. System Requirements", HeadingLevel.HEADING_1));
  c.push(genTable(REQC, ["Identifier", "Requirement"], [
    ["CR-RESOURCES-MANAGE-REQ-001", "The system must provide a Resource entity with the fields defined in the Resource Entity PRD."],
    ["CR-RESOURCES-MANAGE-REQ-002", "The system must allow creating a Resource from a completed event, linking sourceEvent and carrying the event date into resourceDate."],
    ["CR-RESOURCES-MANAGE-REQ-003", "The system must allow creating a standalone Resource with no event link."],
    ["CR-RESOURCES-MANAGE-REQ-004", "The system must require at least one of url or file before a Resource can be listed."],
    ["CR-RESOURCES-MANAGE-REQ-005", "Setting listedPublicly true for the first time must record publishedAt; unlisting must retain publishedAt."],
    ["CR-RESOURCES-MANAGE-REQ-006", "The public Resources page must display only Resources where listedPublicly is true, with no authentication required."],
    ["CR-RESOURCES-MANAGE-REQ-007", "The public page must never expose the source event's raw recording link; only the Resource's published url or file is public."],
    ["CR-RESOURCES-MANAGE-REQ-008", "The administrator must be able to unlist a Resource rather than delete it, removing it from the page while retaining the record."],
    ["CR-RESOURCES-MANAGE-REQ-009", "The page must support organizing resources by category and resourceDate. Proposed default: grouped by category, then resourceDate descending."],
  ], 0));

  c.push(heading("7. Process Data", HeadingLevel.HEADING_1));
  c.push(p("Supporting data read during the process (not created by it):"));
  c.push(genTable(DC, ["Field", "Entity", "Type", "Source Identifier", "Notes"], [
    ["recordingUrl", "Event", "url", "CR-EVENTS-MANAGE-DAT-030", "Read as the entry point to the raw recording; never written or republished by this process."],
    ["dateStart", "Event", "datetime", "CR-EVENTS-MANAGE-DAT-019", "Read to populate resourceDate for a migrated recording."],
    ["name", "Event", "varchar", "\u2014", "Read for default naming of a migrated recording resource."],
  ], 3));

  c.push(heading("8. Data Collected", HeadingLevel.HEADING_1));
  c.push(heading("8.1 Entity Relationships Established", HeadingLevel.HEADING_2));
  c.push(genTable(FTC, ["Relationship", "Related Entity", "Established At"], [
    ["sourceEvent (manyToOne, optional)", "Event", "When a recording Resource is created from a completed event (workflow step 3). Empty for standalone assets."],
  ]));
  c.push(heading("8.2 Fields Touched From Other Process Documents", HeadingLevel.HEADING_2));
  c.push(genTable(FTC, ["Field", "Owning Entity / Reference", "Populated By"], [
    ["recordingUrl", "Event (CR-EVENTS-MANAGE-DAT-030)", "Read only; this process follows the link to retrieve the raw recording and does not write it."],
  ]));
  c.push(heading("8.3 Fields Created or Updated", HeadingLevel.HEADING_2));
  c.push(genTable(DC, ["Field", "Entity", "Type", "Identifier", "Notes"], [
    ["resourceType", "Resource", "enum", "CR-RESOURCES-MANAGE-DAT-001", "Kind of resource; property field, not a discriminator."],
    ["category", "Resource", "enum", "CR-RESOURCES-MANAGE-DAT-002", "Topical category for the public page; value list confirmed (see Interview Transcript)."],
    ["description", "Resource", "wysiwyg", "CR-RESOURCES-MANAGE-DAT-003", "Public-facing description."],
    ["url", "Resource", "url", "CR-RESOURCES-MANAGE-DAT-004", "Published, externally-hosted link to the resource."],
    ["file", "Resource", "attachment", "CR-RESOURCES-MANAGE-DAT-005", "Uploaded file alternative to url."],
    ["resourceDate", "Resource", "date", "CR-RESOURCES-MANAGE-DAT-006", "Public-facing date; event date for a recording."],
    ["listedPublicly", "Resource", "boolean", "CR-RESOURCES-MANAGE-DAT-007", "Publish flag; the only gate on public visibility; reversible."],
    ["publishedAt", "Resource", "datetime", "CR-RESOURCES-MANAGE-DAT-008", "System-set on first listing; read-only; retained after unlisting."],
    ["featured", "Resource", "boolean", "CR-RESOURCES-MANAGE-DAT-009", "Optional highlight on the page."],
    ["sourceEvent", "Resource", "link (Event)", "CR-RESOURCES-MANAGE-DAT-010", "Optional link to the source event for a recording."],
  ], 3));

  c.push(heading("9. Open Issues", HeadingLevel.HEADING_1));
  c.push(p("None. The three version 1.0 open issues (CR-RESOURCES-MANAGE-ISS-001 through ISS-003) were resolved in version 1.1 following stakeholder confirmation; the resolutions are recorded in the Interview Transcript and mirror RES-DEC-007 through RES-DEC-010 in the Resource Entity PRD."));

  c.push(heading("10. Interview Transcript", HeadingLevel.HEADING_1));
  c.push(p("This process was defined through design discussion rather than a separate stakeholder interview; the decisions below are recorded for traceability.", { italics: true }));
  [
    ["Should recordings and standalone assets be one entity or two?", "One unified Resource entity. The optional sourceEvent link distinguishes a recording (linked) from a standalone asset (unlinked); the field set is otherwise identical."],
    ["Is the Resources page public or gated?", "Fully public. The publish flag (listedPublicly) is the only gate; no authentication. The Resource entity therefore carries no access attributes."],
    ["How does a recording reach the page?", "The event's recording link is a back-office pointer to the raw, unedited recording. The administrator retrieves it, edits and re-hosts the finished copy, and publishes that copy as a separate Resource. The raw link is never published."],
    ["Where does this process live?", "In the new CR-RESOURCES sub-domain of Client Recruiting. The recording-migration step is a continuation off the end of the Event Management process (CR-EVENTS-MANAGE)."],
    ["What are the resourceType and category value lists? (resolves ISS-001)", "Confirmed for version 1.1. resourceType: Recorded Event; Document; Video; Audio; Template; Link; Other. category: Starting a Business; Financing; Marketing and Sales; Operations; Leadership and Strategy; Legal and Compliance; Other."],
    ["May a Resource carry both a url and a file? (resolves ISS-001)", "At least one of url or file must be present before a Resource can be listed publicly; both are permitted simultaneously."],
    ["How is the public Resources page ordered? (resolves ISS-002)", "Grouped by category, then by resourceDate descending within each category."],
    ["What happens to an unlisted Resource? (resolves ISS-003)", "It is retained and never hard-deleted. Unlisting sets listedPublicly to false only, preserving the record, its publishedAt timestamp, and history."],
  ].forEach(([q, a]) => { c.push(p([r("Q: ", { bold: true }), r(q)])); c.push(p([r("Decision: ", { bold: true }), r(a)], { after: 160 })); });

  c.push(heading("11. Change Log", HeadingLevel.HEADING_1));
  c.push(genTable(CLC, ["Version", "Date", "Summary"], [
    ["1.0", "05-29-26 16:30", "Initial Resource Library Management process document for the CR-RESOURCES sub-domain: recording-migration and standalone-asset publishing paths, maintenance and unlisting, the public-visibility model, requirements REQ-001 through REQ-009, and data items DAT-001 through DAT-010 (matching the Resource Entity PRD)."],
    ["1.1", "05-30-26", "Resolved the three version 1.0 open issues following stakeholder confirmation: confirmed the resourceType and category value lists and the at-least-one-of-url-or-file rule (ISS-001), the by-category then resourceDate-descending page ordering (ISS-002), and the retain-never-hard-delete rule for unlisted Resources (ISS-003). Resolutions recorded in the Interview Transcript; Open Issues section now empty. Mirrors Resource Entity PRD v1.1."],
  ]));
  return c;
}

const content = buildContent();
const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: SZ.body } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h1, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h2, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 360 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [r(DOC.orgName, { size: SZ.meta, bold: true, color: COLORS.titleColor }), new TextRun({ children: ["\t"], font: FONT }), r(DOC.docName, { size: SZ.meta, color: COLORS.idColor })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Page ", PageNumber.CURRENT], font: FONT, size: SZ.xs, color: COLORS.idColor })] })] }) },
    children: content,
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync("/tmp/CR-RESOURCES-MANAGE.docx", buf); console.log("Wrote /tmp/CR-RESOURCES-MANAGE.docx (" + buf.length + " bytes)"); });
