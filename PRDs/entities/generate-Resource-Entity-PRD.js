// Generator for the Resource Entity PRD (CR-RESOURCES sub-domain).
// Reuses the shared rendering engine/styles used across the CBM Entity PRDs.
// Run: NODE_PATH=/home/claude/.npm-global/lib/node_modules node generate-Resource-Entity-PRD.js

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

// ── Shared styles ──────────────────────
const FONT = "Arial";
const SZ = { body: 22, small: 20, xs: 16, h1: 32, h2: 28, h3: 24, meta: 20 };
const COLORS = {
  headerBg: "1F3864", headerText: "FFFFFF", altRowBg: "F2F7FB",
  borderColor: "AAAAAA", titleColor: "1F3864", idColor: "888888",
};
const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderColor };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const FC = [2000, 1050, 1000, 2350, 900, 2060]; // field table cols (sum 9360)
const NFC = [2200, 1400, 5760];                  // native field cols
const TC = [1500, 7860];                         // two-col cols
const CLC = [1300, 1900, 6160];                  // change log cols
const MC = [2800, 6560];                         // meta cols
const TABLE_WIDTH = 9360;

const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Resource",
  version: "1.0",
  lastUpdated: "05-29-26 16:30",
};

// ── Helpers ────────────────────────────
function r(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: opts.size || SZ.body, bold: opts.bold || false, italics: opts.italics || false, color: opts.color });
}
function p(text, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after ?? 120 }, alignment: opts.align, children: Array.isArray(text) ? text : [r(text, opts)] });
}
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [r(text, { size: SZ.small })] });
}
function heading(text, level) {
  return new Paragraph({ heading: level, spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 120 },
    children: [r(text, { bold: true, size: level === HeadingLevel.HEADING_1 ? SZ.h1 : level === HeadingLevel.HEADING_2 ? SZ.h2 : SZ.h3, color: COLORS.titleColor })] });
}
function hdrCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins,
    children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })] });
}
function dataCell(text, width, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, columnSpan: opts.columnSpan,
    children: [new Paragraph({ children: [r(text, { size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics })] })] });
}
function metaTable(rows) {
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: MC,
    rows: rows.map((row, i) => new TableRow({ children: [dataCell(row[0], MC[0], { shaded: i % 2 === 1, bold: true }), dataCell(row[1], MC[1], { shaded: i % 2 === 1 })] })) });
}
function nativeFieldTable(rows) {
  const hdr = new TableRow({ children: [hdrCell("Field", NFC[0]), hdrCell("Type", NFC[1]), hdrCell("Notes", NFC[2])] });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: NFC,
    rows: [hdr, ...rows.map((row, i) => new TableRow({ children: [dataCell(row[0], NFC[0], { shaded: i % 2 === 1, bold: true }), dataCell(row[1], NFC[1], { shaded: i % 2 === 1 }), dataCell(row[2], NFC[2], { shaded: i % 2 === 1 })] }))] });
}
function fieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Field Name", FC[0]), hdrCell("Type", FC[1]), hdrCell("Required", FC[2]), hdrCell("Values", FC[3]), hdrCell("Default", FC[4]), hdrCell("Identifier", FC[5])] });
  const rows = [hdr];
  fields.forEach((f, i) => {
    const [name, type, required, values, defaultVal, id, desc] = f;
    const shaded = i % 2 === 1;
    rows.push(new TableRow({ children: [
      dataCell(name, FC[0], { shaded, bold: true }), dataCell(type, FC[1], { shaded }), dataCell(required, FC[2], { shaded }),
      dataCell(values, FC[3], { shaded }), dataCell(defaultVal, FC[4], { shaded }), dataCell(id, FC[5], { shaded, size: SZ.xs, color: COLORS.idColor }) ] }));
    rows.push(new TableRow({ children: [ new TableCell({ borders, columnSpan: 6, shading: shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins,
      children: [new Paragraph({ children: [r(desc, { size: SZ.small })] })] }) ] }));
  });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: FC, rows });
}
function twoColTable(h1, h2, rows) {
  const hdr = new TableRow({ children: [hdrCell(h1, TC[0]), hdrCell(h2, TC[1])] });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: TC,
    rows: [hdr, ...rows.map((row, i) => new TableRow({ children: [dataCell(row[0], TC[0], { shaded: i % 2 === 1, bold: true }), dataCell(row[1], TC[1], { shaded: i % 2 === 1 })] }))] });
}
function changeLogTable(rows) {
  const hdr = new TableRow({ children: [hdrCell("Version", CLC[0]), hdrCell("Date", CLC[1]), hdrCell("Summary", CLC[2])] });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: CLC,
    rows: [hdr, ...rows.map((row, i) => new TableRow({ children: [dataCell(row[0], CLC[0], { shaded: i % 2 === 1, bold: true }), dataCell(row[1], CLC[1], { shaded: i % 2 === 1 }), dataCell(row[2], CLC[2], { shaded: i % 2 === 1 })] }))] });
}

// ── Content ────────────────────────────
function buildContent() {
  const c = [];
  c.push(heading("Resource Entity PRD", HeadingLevel.HEADING_1));
  c.push(metaTable([
    ["Entity Name", "Resource"],
    ["Entity Type", "Custom (Base)"],
    ["Owning Domain", "Client Recruiting"],
    ["Owning Sub-Domain", "CR-RESOURCES (Resource Library)"],
    ["Version", ENTITY.version],
    ["Last Updated", ENTITY.lastUpdated],
    ["Status", "Draft"],
    ["Activity Stream", "Enabled"],
  ]));

  c.push(heading("1. Entity Overview", HeadingLevel.HEADING_1));
  c.push(p("Resource represents a single item published on the organization's public Resources page \u2014 either a recording of a past event or a standalone asset created for the business community. It is a fully public content record: whether it appears on the Resources page is governed solely by a publish flag, with no access restrictions, because the page requires no sign-in."));
  c.push(p("A Resource may optionally link to the event it was recorded from; standalone assets carry no such link. For a recording, the publicly accessible copy is the edited, re-hosted version held on this Resource. That is a distinct artifact from the raw recording referenced by the recording link on the source event (see the Event Entity PRD and the Event Management process document): the event's recording link is a back-office pointer to the unedited source, while the Resource carries the finished, public copy. The CR-RESOURCES sub-domain owns this entity and the process that maintains it."));

  c.push(heading("2. Native Fields", HeadingLevel.HEADING_1));
  c.push(nativeFieldTable([
    ["name", "varchar", "The public title of the resource as shown on the Resources page."],
    ["createdAt", "datetime", "System-managed creation timestamp."],
    ["modifiedAt", "datetime", "System-managed last-modified timestamp."],
    ["createdBy", "link (User)", "System-managed creator reference."],
    ["assignedUser", "link (User)", "The administrator responsible for the resource."],
  ]));

  c.push(heading("3. Custom Fields", HeadingLevel.HEADING_1));
  c.push(p("The field set is uniform across all kinds of resource. resourceType and category describe and organize the resource but do not drive field visibility.", { italics: true }));
  c.push(fieldTable([
    ["resourceType", "enum", "Yes", "Recorded Event; Document; Video; Audio; Template; Link; Other", "\u2014", "CR-RESOURCES-MANAGE-DAT-001",
      "The kind of resource. A descriptive property field; it does not drive field visibility. Recorded Event is used for recordings migrated from a completed event; the remaining values cover standalone assets."],
    ["category", "enum", "Yes", "Starting a Business; Financing; Marketing and Sales; Operations; Leadership and Strategy; Legal and Compliance; Other", "\u2014", "CR-RESOURCES-MANAGE-DAT-002",
      "Topical category used to group and filter resources on the public page. Value list is a first-draft proposal pending confirmation (see Open Issues)."],
    ["description", "wysiwyg", "No", "\u2014", "\u2014", "CR-RESOURCES-MANAGE-DAT-003",
      "Public-facing description of the resource shown on the Resources page."],
    ["url", "url", "Conditional", "\u2014", "\u2014", "CR-RESOURCES-MANAGE-DAT-004",
      "Link to the published, externally-hosted resource \u2014 the edited recording or the asset, held in a reliable location the Resources page can read. Distinct from the source event's raw recording link. At least one of url or file must be present before the resource can be listed."],
    ["file", "attachment", "Conditional", "\u2014", "\u2014", "CR-RESOURCES-MANAGE-DAT-005",
      "Uploaded file as an alternative to url for resources hosted directly. At least one of url or file must be present before the resource can be listed."],
    ["resourceDate", "date", "No", "\u2014", "\u2014", "CR-RESOURCES-MANAGE-DAT-006",
      "Public-facing date of the resource. For a recording this is typically the date of the source event. Used for display and default sorting on the page."],
    ["listedPublicly", "boolean", "No", "\u2014", "false", "CR-RESOURCES-MANAGE-DAT-007",
      "Whether the resource is shown on the public Resources page. This is the only gate on public visibility, and it is reversible. Setting it true the first time records publishedAt."],
    ["publishedAt", "datetime", "No", "\u2014", "\u2014", "CR-RESOURCES-MANAGE-DAT-008",
      "Timestamp set automatically the first time the resource is listed publicly. Read-only and system-maintained. Retained if the resource is later unlisted, so it records the first-publication time rather than the current listing state."],
    ["featured", "boolean", "No", "\u2014", "false", "CR-RESOURCES-MANAGE-DAT-009",
      "Optional flag used to highlight a resource on the page."],
  ]));

  c.push(heading("4. Relationships", HeadingLevel.HEADING_1));
  c.push(twoColTable("Relationship", "Detail", [
    ["sourceEvent \u2192 Event (manyToOne, optional)", "Links a recording resource back to the event it came from (identifier CR-RESOURCES-MANAGE-DAT-010). The inverse appears as a Resources panel on the Event record. Standalone assets leave this empty."],
  ]));

  c.push(heading("5. Dynamic Logic Rules", HeadingLevel.HEADING_1));
  c.push(heading("5.1 No Discriminator-Driven Visibility", HeadingLevel.HEADING_2));
  c.push(p("There is no discriminator. resourceType and category are property fields, and the same field set is present on every Resource regardless of type."));
  c.push(heading("5.2 Public Visibility", HeadingLevel.HEADING_2));
  c.push(p("A Resource appears on the public Resources page if and only if listedPublicly is true. There is no other gate \u2014 no authentication, role, or status condition applies, because the page is fully public."));
  c.push(heading("5.3 Content Presence", HeadingLevel.HEADING_2));
  c.push(p("Before a Resource can be listed (listedPublicly set true), at least one of url or file must be present, so that a listed resource always resolves to something the public can open."));

  c.push(heading("6. Layout Guidance", HeadingLevel.HEADING_1));
  c.push(twoColTable("Panel", "Fields", [
    ["Resource Identification", "name, resourceType, category"],
    ["Content", "description, url, file, resourceDate"],
    ["Publishing", "listedPublicly, publishedAt, featured"],
    ["Source", "sourceEvent"],
  ]));

  c.push(heading("7. Implementation Notes", HeadingLevel.HEADING_1));
  [
    "The public Resources page reads only Resources where listedPublicly is true.",
    "url holds the published, externally-hosted link \u2014 the edited recording or the asset. It is deliberately distinct from the source event's raw recording link, which points to the unedited source and stays back-office.",
    "publishedAt is system-set on first listing and retained after unlisting, recording first-publication time rather than current state.",
    "resourceType and category are property fields, not discriminators; the field set does not vary by type.",
    "featured is an optional highlight used by the page; it has no effect on visibility, which depends solely on listedPublicly.",
    "Resources are unlisted rather than deleted, so public links and history are preserved (proposed; see Open Issues).",
    "No product names appear in this document, per the output standard for this document level.",
  ].forEach((t) => c.push(bullet(t)));

  c.push(heading("8. Open Issues", HeadingLevel.HEADING_1));
  c.push(twoColTable("Identifier", "Open Issue", [
    ["RES-ISS-001", "The resourceType and category value lists are a first-draft proposal and are pending confirmation."],
    ["RES-ISS-002", "Whether url and file may both be present or are mutually exclusive. Proposed: at least one is required before listing, and both are permitted."],
    ["RES-ISS-003", "Default sort and grouping of the public Resources page. Proposed: grouped by category, then resourceDate descending."],
    ["RES-ISS-004", "Whether a retention or no-deletion rule should be formalized for unlisted Resources."],
  ]));

  c.push(heading("9. Decisions Made", HeadingLevel.HEADING_1));
  c.push(twoColTable("Identifier", "Decision", [
    ["RES-DEC-001", "Version 1.0 baseline established 05-29-26."],
    ["RES-DEC-002", "A single unified Resource entity represents both event recordings and standalone assets; the optional Event link distinguishes a recording from a standalone asset."],
    ["RES-DEC-003", "The Resources page is fully public; the publish flag (listedPublicly) is the only gate, and the entity carries no access attributes."],
    ["RES-DEC-004", "The published copy of a recording is a separate artifact held on the Resource (its own url or file), distinct from the raw recording link on the source event."],
    ["RES-DEC-005", "resourceType and category are property fields, not discriminators; the field set is uniform across all resource types."],
    ["RES-DEC-006", "The entity is owned by the new CR-RESOURCES sub-domain of Client Recruiting."],
  ]));

  c.push(heading("10. Change Log", HeadingLevel.HEADING_1));
  c.push(changeLogTable([
    ["1.0", "05-29-26 16:30", "Initial Resource Entity PRD defining the public Resources page content entity for the CR-RESOURCES sub-domain: the uniform field set, the public-visibility model gated only by listedPublicly, the optional Event link, and the relationship between the published copy and the source event's raw recording link."],
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
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ.h3, bold: true, font: FONT, color: COLORS.titleColor }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [
      r(ENTITY.orgName, { size: SZ.meta, bold: true, color: COLORS.titleColor }),
      new TextRun({ children: ["\t"], font: FONT }),
      r(`${ENTITY.entityName} Entity PRD`, { size: SZ.meta, color: COLORS.idColor }),
    ] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ children: ["Page ", PageNumber.CURRENT], font: FONT, size: SZ.xs, color: COLORS.idColor }),
    ] })] }) },
    children: content,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/tmp/Resource-Entity-PRD.docx", buf);
  console.log("Wrote /tmp/Resource-Entity-PRD.docx (" + buf.length + " bytes)");
});
