// ═══════════════════════════════════════════════════════════════════════
// CRM Builder — Partnership Agreement Entity PRD Generator
// ═══════════════════════════════════════════════════════════════════════
//
// Entity: Partnership Agreement (Custom — Base Type)
// Implementation: Cleveland Business Mentors
//
// Usage:
//   node generate-PartnershipAgreement-Entity-PRD.js
//
// ═══════════════════════════════════════════════════════════════════════

const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Partnership Agreement",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 11:00",
  sourceDocuments: "CR Domain PRD v1.0, CR-PARTNER SDO v1.1, CR-PARTNER-PROSPECT v1.0, CR-PARTNER-MANAGE v1.0, Entity Inventory v1.4, Account Entity PRD v1.5",
  outputFile: "/home/claude/cbm/PRDs/entities/PartnershipAgreement-Entity-PRD.docx",

  overview: {
    crmEntityName: "Partnership Agreement",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Partnership Agreement",
    labelPlural: "Partnership Agreements",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },

  overviewText: [
    "The Partnership Agreement entity tracks the terms, dates, and documents for formal agreements between the organization and its partner organizations. It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain within the CR-PARTNER sub-domain.",
    "Not all partnerships require a formal agreement. The Partner Coordinator determines on a case-by-case basis whether a formal written agreement is needed during the partner prospecting and activation process (CR-PARTNER-PROSPECT). When one is needed, a Partnership Agreement record is created and linked to the partner Account.",
    "Partnership Agreement uses the Base entity type because it is a document and agreement record, not a person, company, or calendar event. The entity has six custom fields defined by CR-PARTNER-PROSPECT and reused identically by CR-PARTNER-MANAGE for renewal records.",
    "Renewal creates a new Partnership Agreement record linked to the same partner Account, preserving the prior record as historical data. Partnership Agreement records are never deleted or modified after creation (except for corrections). This append-only pattern supports a complete audit trail of all agreements over the life of the partnership.",
  ],

  overviewNotes: [
    { label: "Access restriction:", text: " The Agreement Document file field is restricted to Partner Coordinator and Executive Member access. Other roles can see the Partnership Agreement record metadata (type, dates, notes) but cannot view or download the attached document." },
  ],

  nativeFieldsIntro: "The following fields already exist on the Partnership Agreement entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Auto-generated or system-set. Not explicitly specified in process documents. May be composed from partner Account name and agreement type for list view readability.", "System"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [
    { label: "Note on name:", text: " The process documents do not specify a name format for Partnership Agreement records. During YAML generation, consider auto-generating the name as {Partner Account Name} \u2014 {Agreement Type} \u2014 {Creation Date} for readability in list views, particularly when a partner has multiple agreements over time." },
  ],

  customFieldGroups: [
    {
      heading: "3.1 Agreement Fields",
      headingLevel: 2,
      intro: "The following custom fields define the agreement record. Partnership Agreement is a single-domain entity with no type discriminator and no dynamic logic visibility rules. All six fields are always visible.",
      fields: [
        ["partnerOrganization", "link (Account)", "Yes", "\u2014", "\u2014", "CR-PARTNER-PROSPECT-DAT-018", [
          { text: "The partner organization this agreement belongs to. Links to the Account record whose accountType includes Partner. Set at creation. For renewal records, links to the same partner Account as the prior agreement. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Account." },
        ]],
        ["agreementType", "enum", "Yes", "MOU, Partnership Agreement, Letter of Intent, Other", "\u2014", "CR-PARTNER-PROSPECT-DAT-019", [
          { text: "Type of formal agreement. May differ on a renewal record if the partnership terms have evolved (PA-DEC-003). " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["creationDate", "date", "Yes", "\u2014", "\u2014", "CR-PARTNER-PROSPECT-DAT-020", [
          { text: "Date the agreement was created or signed. For renewal records, this is the date the renewed agreement was signed, not the date of the original agreement. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["expirationRenewalDate", "date", "No", "\u2014", "\u2014", "CR-PARTNER-PROSPECT-DAT-021", [
          { text: "Date the agreement expires or is due for renewal. Set when applicable. Drives the email notification mechanism in CR-PARTNER-MANAGE: notifications are sent to the Partner Coordinator at 60 days and 30 days before this date (PA-DEC-004). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "drives scheduled email notifications at 60-day and 30-day intervals." },
        ]],
        ["agreementDocument", "file", "Yes", "\u2014", "\u2014", "CR-PARTNER-PROSPECT-DAT-022", [
          { text: "Signed agreement document. Restricted to Partner Coordinator and Executive Member access (PA-DEC-002). Other roles can see the Partnership Agreement record metadata but cannot view or download the attached file. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "field-level access restriction to Partner Coordinator and Executive Member roles." },
        ]],
        ["notes", "wysiwyg", "No", "\u2014", "\u2014", "CR-PARTNER-PROSPECT-DAT-023", [
          { text: "Relevant notes about the agreement. For renewal records, may include reference to the prior agreement record. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
  ],

  relationshipsIntro: "All relationships involving the Partnership Agreement entity, compiled from the CR domain. Partnership Agreement is a single-domain entity; all relationships are defined in CR-PARTNER process documents.",
  relationships: [
    ["Partnership Agreement \u2192 Account", "Account", "manyToOne", "CR-PARTNER-PROSPECT-DAT-018", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Account link:", text: " Each Partnership Agreement belongs to exactly one Account (the partner organization). An Account may have many Partnership Agreement records \u2014 the initial agreement plus any renewals. The Account\u2019s detail view shows all linked Partnership Agreements in a related records panel, providing a complete agreement history for the partnership. The Account must have accountType that includes Partner, but no system enforcement prevents linking to a non-Partner Account at the entity level; this is an operational discipline matter." },
  ],

  dynamicLogicIntro: "Partnership Agreement has no type discriminator and no conditional field visibility rules. All six custom fields are always visible. The entity has no status lifecycle and no field-value-driven dynamic logic.",
  dynamicLogicSections: [],

  layoutIntro: "The following panel grouping is a recommendation for the Partnership Agreement detail view. Final layout is determined during YAML generation. Partnership Agreement is a compact entity; a single panel may suffice. All fields are always visible.",
  layoutPanels: [
    { name: "Agreement Details Panel", text: "partnerOrganization (link to Account), agreementType, creationDate, expirationRenewalDate, agreementDocument (restricted access), notes." },
  ],

  implementationNotes: [
    { label: "1. Auto-generated name:", text: " The process documents do not specify a name format. Consider auto-generating as {Partner Account Name} \u2014 {Agreement Type} \u2014 {Creation Date} for readability in list views, particularly when a partner has multiple agreements across renewals." },
    { label: "2. Access restriction on Agreement Document:", text: " The agreementDocument field must be restricted to Partner Coordinator and Executive Member roles. This is a field-level access restriction, not a record-level restriction. Other roles can view the Partnership Agreement record (agreement type, dates, notes) but cannot view or download the attached file. The target platform\u2019s field-level security mechanism determines the implementation approach." },
    { label: "3. Renewal notification mechanism:", text: " When an expirationRenewalDate is set, the system sends email notifications to the Partner Coordinator at 60 days before and 30 days before the date. These are the only system-driven prompts in the CR-PARTNER-MANAGE process. If the agreement is not renewed, no automatic action is taken \u2014 the Partner Coordinator decides what to do with the partnership and records the decision in notes. Agreement expiration does not trigger any automatic change to Account.partnerStatus." },
    { label: "4. Append-only pattern:", text: " Partnership Agreement records are never modified after creation except for corrections. Renewals always create a new record linked to the same partner Account, preserving the prior record as historical data. This supports a complete audit trail and allows the Partner Coordinator to review the full agreement history for any partnership." },
    { label: "5. No status lifecycle:", text: " Partnership Agreement has no status field. The agreement\u2019s temporal validity is determined by creationDate and expirationRenewalDate. The partnership\u2019s overall status is tracked at the Account level via partnerStatus, not on the agreement record." },
    { label: "6. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  openIssues: [],

  decisions: [
    ["PA-DEC-001", "Base entity type chosen. Partnership Agreement is a document and agreement record, not a person, company, or calendar event. While agreements have date-related fields, the primary identity is a formal document record."],
    ["PA-DEC-002", "Agreement Document field restricted to Partner Coordinator and Executive Member access. Field-level security prevents other roles from viewing or downloading the attached file while allowing access to agreement metadata (type, dates, notes)."],
    ["PA-DEC-003", "Renewal creates a new record rather than modifying the existing one. The new record links to the same partner Account and has its own creation date, expiration date, document, and notes. Agreement type may differ on renewal if partnership terms have evolved. Prior records are retained as historical data."],
    ["PA-DEC-004", "Renewal notifications at 60-day and 30-day intervals before expirationRenewalDate. Email-only, sent to the Partner Coordinator. No automatic action on expiration \u2014 the Partner Coordinator decides whether to renew, continue without an agreement, or change the partnership status. Agreement expiration does not trigger partnerStatus changes."],
    ["PA-DEC-005", "No activity stream. Partnership Agreement is a compact document record with infrequent changes. Activity stream overhead is not justified for an entity that follows an append-only pattern."],
    ["PA-DEC-006", "No status lifecycle on the entity. Temporal validity is derived from creationDate and expirationRenewalDate. The partnership\u2019s relationship status is tracked at the Account level via partnerStatus, which is managed by the CR-PARTNER-MANAGE process independently of individual agreement records."],
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// RENDERING ENGINE — Do not modify below this line
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, TabStopType, TabStopPosition
} = require("docx");

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
const TABLE_WIDTH = 9360;

function r(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: opts.size || SZ.body, bold: opts.bold || false, italics: opts.italics || false, color: opts.color });
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

function labeledParagraph(obj) {
  if (obj.label) {
    return p([r(obj.label, { bold: true }), r(obj.text)]);
  }
  return p(obj.text);
}

function labeledBullet(obj) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [r(obj.label, { bold: true }), r(obj.text)],
  });
}

function hdrCell(text, width) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: { fill: COLORS.headerBg, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [r(text, { bold: true, size: SZ.small, color: COLORS.headerText })] })] });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({ borders, width: { size: width, type: WidthType.DXA }, shading: opts.shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: cellMargins, columnSpan: opts.columnSpan, children: [new Paragraph({ children: [r(text, { size: opts.size || SZ.small, bold: opts.bold, color: opts.color, italics: opts.italics })] })] });
}

const MC = [2800, 6560];
function metaTable(rows) {
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: MC, rows: rows.map((row, i) => new TableRow({ children: [dataCell(row[0], MC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(row[1], MC[1], { shaded: i % 2 === 1, size: SZ.small })] })) });
}

const NFC = [2200, 1400, 3000, 2760];
function nativeFieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Native Field", NFC[0]), hdrCell("Type", NFC[1]), hdrCell("PRD Name(s) / Mapping", NFC[2]), hdrCell("Referenced By", NFC[3])] });
  const rows = fields.map((f, i) => new TableRow({ children: [dataCell(f[0], NFC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(f[1], NFC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[2], NFC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(f[3], NFC[3], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: NFC, rows: [hdr, ...rows] });
}

const FC = [2200, 1100, 800, 2400, 1000, 1860];

function buildDescRuns(descParts) {
  return descParts.map(part => {
    if (part.bold) return r(part.bold, { size: SZ.small, color: COLORS.idColor, bold: true });
    return r(part.text, { size: SZ.small, color: COLORS.idColor });
  });
}

function fieldTable(fields) {
  const hdr = new TableRow({ children: [hdrCell("Field Name", FC[0]), hdrCell("Type", FC[1]), hdrCell("Required", FC[2]), hdrCell("Values", FC[3]), hdrCell("Default", FC[4]), hdrCell("ID", FC[5])] });
  const rows = [hdr];
  fields.forEach((f, i) => {
    const [name, type, required, values, defaultVal, id, descParts] = f;
    const shaded = i % 2 === 1;
    rows.push(new TableRow({ children: [dataCell(name, FC[0], { shaded, bold: true }), dataCell(type, FC[1], { shaded }), dataCell(required, FC[2], { shaded }), dataCell(values, FC[3], { shaded }), dataCell(defaultVal, FC[4], { shaded }), dataCell(id, FC[5], { shaded, size: SZ.xs, color: COLORS.idColor })] }));
    rows.push(new TableRow({ children: [new TableCell({ borders, width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnSpan: 6, shading: shaded ? { fill: COLORS.altRowBg, type: ShadingType.CLEAR } : undefined, margins: descMargins, children: [new Paragraph({ children: buildDescRuns(descParts) })] })] }));
  });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: FC, rows });
}

const RLC = [2600, 1800, 1400, 1700, 1860];
function relTable(rels) {
  const hdr = new TableRow({ children: [hdrCell("Relationship", RLC[0]), hdrCell("Related Entity", RLC[1]), hdrCell("Link Type", RLC[2]), hdrCell("PRD Reference", RLC[3]), hdrCell("Domain(s)", RLC[4])] });
  const rows = rels.map((rel, i) => new TableRow({ children: [dataCell(rel[0], RLC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(rel[1], RLC[1], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[2], RLC[2], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[3], RLC[3], { shaded: i % 2 === 1, size: SZ.small }), dataCell(rel[4], RLC[4], { shaded: i % 2 === 1, size: SZ.small })] }));
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: RLC, rows: [hdr, ...rows] });
}

const TC = [1500, 7860];
function twoColTable(h1, h2, rows) {
  const hdr = new TableRow({ children: [hdrCell(h1, TC[0]), hdrCell(h2, TC[1])] });
  return new Table({ width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: TC, rows: [hdr, ...rows.map((row, i) => new TableRow({ children: [dataCell(row[0], TC[0], { shaded: i % 2 === 1, bold: true, size: SZ.small }), dataCell(row[1], TC[1], { shaded: i % 2 === 1, size: SZ.small })] }))] });
}

function buildContent() {
  const c = [];
  const E = ENTITY;
  const O = E.overview;

  c.push(heading("1. Entity Overview", HeadingLevel.HEADING_1));
  const metaRows = [
    ["CRM Entity Name", O.crmEntityName],
    ["Native / Custom", O.nativeOrCustom],
    ["Entity Type", O.entityType],
    ["Display Label (Singular)", O.labelSingular],
    ["Display Label (Plural)", O.labelPlural],
    ["Activity Stream", O.activityStream],
    ["Primary Domain", O.primaryDomain],
    ["Contributing Domains", O.contributingDomains],
  ];
  c.push(metaTable(metaRows));
  c.push(p(""));
  E.overviewText.forEach(text => c.push(p(text)));
  if (E.overviewNotes) E.overviewNotes.forEach(n => c.push(labeledParagraph(n)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("2. Native Fields", HeadingLevel.HEADING_1));
  c.push(p(E.nativeFieldsIntro));
  c.push(nativeFieldTable(E.nativeFields));
  c.push(p(""));
  if (E.nativeFieldNotes) E.nativeFieldNotes.forEach(n => c.push(labeledParagraph(n)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("3. Custom Fields", HeadingLevel.HEADING_1));
  c.push(p("Custom fields must be created via YAML program files. Partnership Agreement is a single-domain entity with no type discriminator and no dynamic logic visibility rules. All fields are always visible."));

  E.customFieldGroups.forEach(group => {
    if (group.heading) {
      const lvl = group.headingLevel === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2;
      c.push(heading(group.heading, lvl));
    }
    if (group.intro) c.push(p(group.intro));
    if (group.fields && group.fields.length > 0) {
      c.push(fieldTable(group.fields));
      c.push(p(""));
    }
  });

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("4. Relationships", HeadingLevel.HEADING_1));
  c.push(p(E.relationshipsIntro));
  c.push(relTable(E.relationships));
  c.push(p(""));
  if (E.relationshipNotes) E.relationshipNotes.forEach(n => c.push(labeledParagraph(n)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("5. Dynamic Logic Rules", HeadingLevel.HEADING_1));
  c.push(p(E.dynamicLogicIntro));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("6. Layout Guidance", HeadingLevel.HEADING_1));
  c.push(p(E.layoutIntro));
  E.layoutPanels.forEach(panel => {
    c.push(p([r(panel.name, { bold: true, color: COLORS.titleColor })]));
    c.push(p(panel.text));
  });

  c.push(heading("7. Implementation Notes", HeadingLevel.HEADING_1));
  E.implementationNotes.forEach(note => c.push(labeledParagraph(note)));

  c.push(new Paragraph({ children: [new PageBreak()] }));
  c.push(heading("8. Open Issues", HeadingLevel.HEADING_1));
  if (E.openIssues.length > 0) {
    c.push(twoColTable("ID", "Issue", E.openIssues));
  } else {
    c.push(p("No open issues.", { italics: true }));
  }

  c.push(heading("9. Decisions Made", HeadingLevel.HEADING_1));
  c.push(twoColTable("ID", "Decision", E.decisions));

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
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
    }],
  },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            r(ENTITY.orgName, { size: SZ.meta, bold: true, color: COLORS.titleColor }),
            new TextRun({ children: ["\t"], font: FONT }),
            r(`${ENTITY.entityName} Entity PRD`, { size: SZ.meta, color: COLORS.idColor }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 0 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.headerBg, space: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [r(`Entity PRD \u2014 ${ENTITY.entityName}`, { size: SZ.xs, color: COLORS.idColor })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0 },
        })],
      }),
    },
    children: [
      p(ENTITY.orgName, { bold: true, size: 20, color: COLORS.idColor, after: 40 }),
      p(`${ENTITY.entityName} Entity PRD`, { bold: true, size: 40, color: COLORS.titleColor, after: 200 }),
      metaTable([
        ["Document Type", "Entity PRD"],
        ["Entity", `${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],
        ["Implementation", ENTITY.orgName],
        ["Version", ENTITY.version],
        ["Status", ENTITY.status],
        ["Last Updated", ENTITY.lastUpdated],
        ["Source Documents", ENTITY.sourceDocuments],
      ]),
      new Paragraph({ children: [new PageBreak()] }),
      ...content,
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(ENTITY.outputFile, buffer);
  console.log(`Generated: ${ENTITY.outputFile}`);
});
