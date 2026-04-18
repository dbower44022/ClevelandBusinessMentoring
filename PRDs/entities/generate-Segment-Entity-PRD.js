const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Segment",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 11:30",
  sourceDocuments: "CR Domain PRD v1.0, CR-MARKETING SDO v1.2, CR-MARKETING-CONTACTS v1.0, CR-MARKETING-CAMPAIGNS v1.0, Entity Inventory v1.4, Contact Entity PRD v1.5",
  outputFile: "/home/claude/cbm/PRDs/entities/Segment-Entity-PRD.docx",

  overview: {
    crmEntityName: "Segment",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Segment",
    labelPlural: "Segments",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: "segmentType",
    discriminatorValues: "Dynamic, Static",
  },

  overviewText: [
    "The Segment entity is a contact list management entity used for building and maintaining audience segments for marketing campaigns and reactivation outreach. It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain within the CR-MARKETING sub-domain.",
    "Segment uses the Base entity type because it is a metadata container for audience selection, not a person, company, or calendar event. The entity supports two first-class segment types distinguished by the segmentType enum field: Dynamic segments define membership via stored filter criteria evaluated at view or use time; Static segments maintain an explicit many-to-many relationship to Contact records.",
    "The segmentType field is immutable after creation \u2014 a segment cannot change type. Converting a Dynamic segment to Static (or vice versa) requires deleting the segment and creating a new one. This constraint simplifies the data model and prevents ambiguity between filter-based and list-based membership.",
    "Segments are consumed by CR-MARKETING-CAMPAIGNS as campaign send lists (via the Campaign.targetSegment link) and indirectly by CR-REACTIVATE-OUTREACH through Campaign records.",
  ],

  overviewNotes: [
    { label: "Ownership:", text: " Each Segment has an owner (link to User) system-set at creation. Ownership transfer is not in scope for v1.0. The owner is the Client Recruiter who created the segment." },
  ],

  nativeFieldsIntro: "The following fields already exist on the Segment entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Segment name (CR-MARKETING-CONTACTS-DAT-044). Required. Human-readable label (e.g., \u201CQuarterly Newsletter Audience,\u201D \u201CMarch 2026 Open House Invite List\u201D).", "CR-MARKETING-CONTACTS, CR-MARKETING-CAMPAIGNS"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp (CR-MARKETING-CONTACTS-DAT-050)", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp (CR-MARKETING-CONTACTS-DAT-051). Updated when segment fields are edited.", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [],

  customFieldGroups: [
    {
      heading: "3.1 Segment Definition",
      headingLevel: 2,
      intro: "The following custom fields define the segment\u2019s type and membership criteria. The segmentType field acts as a discriminator, determining which of the two membership fields (filterCriteria or memberContactIds) is required.",
      fields: [
        ["description", "text", "No", "\u2014", "\u2014", "CR-MARKETING-CONTACTS-DAT-045", [
          { text: "Free-text description of the segment\u2019s intent for the benefit of the Client Recruiter and other operators who view it later. Editable after creation. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["segmentType", "enum", "Yes", "Dynamic, Static", "\u2014", "CR-MARKETING-CONTACTS-DAT-046", [
          { text: "Distinguishes the two first-class segment types. Set at creation and immutable thereafter (SEG-DEC-001). A segment cannot change type after creation; that requires deletion and recreation. Drives conditional requiredness of filterCriteria and memberContactIds. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "immutable after creation. Discriminator for conditional field requirements." },
        ]],
        ["filterCriteria", "text", "Conditional", "\u2014", "\u2014", "CR-MARKETING-CONTACTS-DAT-047", [
          { text: "Required when segmentType = Dynamic. Stores the filter criteria expression that defines membership across three categories: lifecycle and pipeline, source and attribution, and geographic and demographic. Membership is computed at view or use time, not stored. Editable after creation. The exact storage format is an implementation concern. " },
          { bold: "Visibility: " }, { text: "segmentType = Dynamic. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["memberContactIds", "linkMultiple (Contact)", "Conditional", "\u2014", "\u2014", "CR-MARKETING-CONTACTS-DAT-048", [
          { text: "Required when segmentType = Static. Many-to-many relationship from Segment to Contact. Populated via three operations: manual search-and-add, import-and-add, and manual remove. Empty for Dynamic segments (dynamic membership is computed from filterCriteria, not stored). " },
          { bold: "Visibility: " }, { text: "segmentType = Static. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToMany relationship to Contact." },
        ]],
        ["owner", "link (User)", "System", "\u2014", "\u2014", "CR-MARKETING-CONTACTS-DAT-049", [
          { text: "Set automatically at segment creation to the Client Recruiter who created the segment. Read-only after creation; ownership transfer is not in scope for v1.0. Links to the User entity (the CRM operator account, not a Contact). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated at creation, readOnly. Link to User, not Contact." },
        ]],
      ],
    },
  ],

  relationshipsIntro: "All relationships involving the Segment entity, compiled from the CR domain.",
  relationships: [
    ["Segment \u2192 Contact (Static members)", "Contact", "manyToMany", "CR-MARKETING-CONTACTS-DAT-048", "CR"],
    ["Segment \u2192 User (owner)", "User", "manyToOne", "CR-MARKETING-CONTACTS-DAT-049", "CR"],
    ["Campaign \u2192 Segment (reverse)", "Marketing Campaign", "oneToMany (reverse)", "CR-MARKETING-CAMPAIGNS-DAT-025", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Contact members:", text: " The Segment-to-Contact relationship is used only for Static segments. Dynamic segments compute membership from filterCriteria at view or use time and have no stored Contact links. The Contact\u2019s detail view does not display Segment membership; segment membership is consumed through the Segment detail view and campaign targeting workflows." },
    { label: "Note on Campaign link:", text: " The Campaign-to-Segment relationship is defined on the Marketing Campaign entity (Campaign.targetSegment, manyToOne from Campaign to Segment). The Segment\u2019s detail view shows all Campaigns that targeted this Segment in a related records panel. This is the forward-reference established in CR-MARKETING-CONTACTS-DAT-052 and consumed by CR-MARKETING-CAMPAIGNS-DAT-025." },
  ],

  dynamicLogicIntro: "Segment uses the segmentType field as a discriminator that drives conditional requiredness of the two membership fields.",
  dynamicLogicSections: [
    { heading: "5.1 Segment Type Conditional Fields", paragraphs: [
      { text: "The segmentType field determines which membership field is required and visible:" },
    ], bullets: [
      { label: "segmentType = Dynamic:", text: " Show filterCriteria (required). Hide memberContactIds." },
      { label: "segmentType = Static:", text: " Show memberContactIds (required). Hide filterCriteria." },
    ]},
  ],

  layoutIntro: "The following panel grouping is a recommendation for the Segment detail view. Final layout is determined during YAML generation.",
  layoutPanels: [
    { name: "Overview Panel", text: "name, description, segmentType (read-only after creation), owner (read-only)." },
    { name: "Membership Panel", text: "filterCriteria (visible when Dynamic), memberContactIds (visible when Static). Panel content varies by segmentType." },
    { name: "Campaigns Panel", text: "Marketing Campaign related records list (oneToMany reverse from Campaign.targetSegment). Shows all Campaigns that targeted this Segment." },
  ],

  implementationNotes: [
    { label: "1. Immutable segmentType:", text: " The segmentType field must be locked after creation. The target platform\u2019s field-level readOnly mechanism or a before-save validation hook can enforce this. If the platform does not support field-level immutability, a workflow that reverts segmentType changes is an acceptable alternative." },
    { label: "2. Dynamic membership computation:", text: " Dynamic segment membership is computed at view or use time from filterCriteria. No stored member list exists for Dynamic segments. The implementation must translate the stored filter criteria into a Contact query at runtime. The exact storage format (structured JSON, query DSL, or platform-native filter syntax) is determined during YAML generation based on the target platform\u2019s capabilities." },
    { label: "3. Static membership operations:", text: " Static segments support three population operations: manual search-and-add (search for Contacts and add to the segment), import-and-add (import a list of email addresses and match to existing Contacts), and manual remove (remove individual Contacts from the segment). These are standard relationship management operations on the manyToMany link." },
    { label: "4. Owner vs. assignedUser:", text: " The owner field is a custom link to User, distinct from the native assignedUser. The owner represents the Client Recruiter who created the segment and is system-set at creation. The native assignedUser may serve a different operational purpose (e.g., record access control). Both link to User." },
    { label: "5. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology. Product-specific implementation details belong in YAML program files and implementation documentation only." },
  ],

  openIssues: [],

  decisions: [
    ["SEG-DEC-001", "segmentType is immutable after creation. A segment cannot change type because Dynamic and Static segments have fundamentally different membership mechanisms (computed vs. stored). Converting requires deletion and recreation."],
    ["SEG-DEC-002", "Two first-class segment types: Dynamic (filter-based, computed on read) and Static (explicit Contact list, manually curated). Both types are full entities, not views or saved searches. This decision was made in CR-MARKETING-CONTACTS REQ-041."],
    ["SEG-DEC-003", "Base entity type chosen. Segments are metadata containers for audience selection with no calendar scheduling or event semantics needed."],
    ["SEG-DEC-004", "No activity stream. Segment is a utility entity for campaign targeting. Activity stream overhead is not justified."],
    ["SEG-DEC-005", "Owner is a custom link to User (not the native assignedUser). System-set at creation, read-only, no ownership transfer in v1.0."],
    ["SEG-DEC-006", "filterCriteria storage format deferred to implementation. The exact format depends on the target platform\u2019s query capabilities. The Entity PRD specifies the field type as text to accommodate any structured format."],
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RENDERING ENGINE — Do not modify below this line
// ═══════════════════════════════════════════════════════════════════════
const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,Header,Footer,AlignmentType,LevelFormat,HeadingLevel,BorderStyle,WidthType,ShadingType,PageBreak,TabStopType,TabStopPosition}=require("docx");const FONT="Arial";const SZ={body:22,small:20,xs:16,h1:32,h2:28,h3:24,meta:20};const COLORS={headerBg:"1F3864",headerText:"FFFFFF",altRowBg:"F2F7FB",borderColor:"AAAAAA",titleColor:"1F3864",idColor:"888888"};const border={style:BorderStyle.SINGLE,size:1,color:COLORS.borderColor};const borders={top:border,bottom:border,left:border,right:border};const cellMargins={top:60,bottom:60,left:100,right:100};const descMargins={top:40,bottom:80,left:100,right:100};const TABLE_WIDTH=9360;function r(t,o={}){return new TextRun({text:t,font:FONT,size:o.size||SZ.body,bold:o.bold||false,italics:o.italics||false,color:o.color})}function p(t,o={}){return new Paragraph({spacing:{after:o.after??120},alignment:o.align,children:Array.isArray(t)?t:[r(t,o)]})}function heading(t,l){return new Paragraph({heading:l,spacing:{before:l===HeadingLevel.HEADING_1?360:240,after:120},children:[r(t,{bold:true,size:l===HeadingLevel.HEADING_1?SZ.h1:l===HeadingLevel.HEADING_2?SZ.h2:SZ.h3,color:COLORS.titleColor})]})}function labeledParagraph(o){if(o.label)return p([r(o.label,{bold:true}),r(o.text)]);return p(o.text)}function labeledBullet(o){return new Paragraph({numbering:{reference:"bullets",level:0},spacing:{after:60},children:[r(o.label,{bold:true}),r(o.text)]})}function hdrCell(t,w){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:{fill:COLORS.headerBg,type:ShadingType.CLEAR},margins:cellMargins,children:[new Paragraph({children:[r(t,{bold:true,size:SZ.small,color:COLORS.headerText})]})]})}function dataCell(t,w,o={}){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:o.shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:cellMargins,columnSpan:o.columnSpan,children:[new Paragraph({children:[r(t,{size:o.size||SZ.small,bold:o.bold,color:o.color,italics:o.italics})]})]})}const MC=[2800,6560];function metaTable(rows){return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:MC,rows:rows.map((row,i)=>new TableRow({children:[dataCell(row[0],MC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],MC[1],{shaded:i%2===1,size:SZ.small})]}))})}const NFC=[2200,1400,3000,2760];function nativeFieldTable(fields){const hdr=new TableRow({children:[hdrCell("Native Field",NFC[0]),hdrCell("Type",NFC[1]),hdrCell("PRD Name(s) / Mapping",NFC[2]),hdrCell("Referenced By",NFC[3])]});const rows=fields.map((f,i)=>new TableRow({children:[dataCell(f[0],NFC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(f[1],NFC[1],{shaded:i%2===1,size:SZ.small}),dataCell(f[2],NFC[2],{shaded:i%2===1,size:SZ.small}),dataCell(f[3],NFC[3],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:NFC,rows:[hdr,...rows]})}const FC=[2200,1100,800,2400,1000,1860];function buildDescRuns(d){return d.map(part=>{if(part.bold)return r(part.bold,{size:SZ.small,color:COLORS.idColor,bold:true});return r(part.text,{size:SZ.small,color:COLORS.idColor})})}function fieldTable(fields){const hdr=new TableRow({children:[hdrCell("Field Name",FC[0]),hdrCell("Type",FC[1]),hdrCell("Required",FC[2]),hdrCell("Values",FC[3]),hdrCell("Default",FC[4]),hdrCell("ID",FC[5])]});const rows=[hdr];fields.forEach((f,i)=>{const[name,type,required,values,defaultVal,id,descParts]=f;const shaded=i%2===1;rows.push(new TableRow({children:[dataCell(name,FC[0],{shaded,bold:true}),dataCell(type,FC[1],{shaded}),dataCell(required,FC[2],{shaded}),dataCell(values,FC[3],{shaded}),dataCell(defaultVal,FC[4],{shaded}),dataCell(id,FC[5],{shaded,size:SZ.xs,color:COLORS.idColor})]}));rows.push(new TableRow({children:[new TableCell({borders,width:{size:TABLE_WIDTH,type:WidthType.DXA},columnSpan:6,shading:shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:descMargins,children:[new Paragraph({children:buildDescRuns(descParts)})]})]}))});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:FC,rows})}const RLC=[2600,1800,1400,1700,1860];function relTable(rels){const hdr=new TableRow({children:[hdrCell("Relationship",RLC[0]),hdrCell("Related Entity",RLC[1]),hdrCell("Link Type",RLC[2]),hdrCell("PRD Reference",RLC[3]),hdrCell("Domain(s)",RLC[4])]});const rows=rels.map((rel,i)=>new TableRow({children:[dataCell(rel[0],RLC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(rel[1],RLC[1],{shaded:i%2===1,size:SZ.small}),dataCell(rel[2],RLC[2],{shaded:i%2===1,size:SZ.small}),dataCell(rel[3],RLC[3],{shaded:i%2===1,size:SZ.small}),dataCell(rel[4],RLC[4],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:RLC,rows:[hdr,...rows]})}const TC=[1500,7860];function twoColTable(h1,h2,rows){const hdr=new TableRow({children:[hdrCell(h1,TC[0]),hdrCell(h2,TC[1])]});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:TC,rows:[hdr,...rows.map((row,i)=>new TableRow({children:[dataCell(row[0],TC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],TC[1],{shaded:i%2===1,size:SZ.small})]}))]})}
function buildContent(){const c=[];const E=ENTITY;const O=E.overview;c.push(heading("1. Entity Overview",HeadingLevel.HEADING_1));const metaRows=[["CRM Entity Name",O.crmEntityName],["Native / Custom",O.nativeOrCustom],["Entity Type",O.entityType],["Display Label (Singular)",O.labelSingular],["Display Label (Plural)",O.labelPlural],["Activity Stream",O.activityStream],["Primary Domain",O.primaryDomain],["Contributing Domains",O.contributingDomains]];if(O.discriminatorField){metaRows.push(["Discriminator Field",O.discriminatorField]);metaRows.push(["Discriminator Values",O.discriminatorValues])}c.push(metaTable(metaRows));c.push(p(""));E.overviewText.forEach(t=>c.push(p(t)));if(E.overviewNotes)E.overviewNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("2. Native Fields",HeadingLevel.HEADING_1));c.push(p(E.nativeFieldsIntro));c.push(nativeFieldTable(E.nativeFields));c.push(p(""));if(E.nativeFieldNotes)E.nativeFieldNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("3. Custom Fields",HeadingLevel.HEADING_1));c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group."));E.customFieldGroups.forEach(group=>{if(group.heading){const lvl=group.headingLevel===3?HeadingLevel.HEADING_3:HeadingLevel.HEADING_2;c.push(heading(group.heading,lvl))}if(group.intro)c.push(p(group.intro));if(group.fields&&group.fields.length>0){c.push(fieldTable(group.fields));c.push(p(""))}});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("4. Relationships",HeadingLevel.HEADING_1));c.push(p(E.relationshipsIntro));c.push(relTable(E.relationships));c.push(p(""));if(E.relationshipNotes)E.relationshipNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("5. Dynamic Logic Rules",HeadingLevel.HEADING_1));c.push(p(E.dynamicLogicIntro));if(E.dynamicLogicSections)E.dynamicLogicSections.forEach(s=>{c.push(heading(s.heading,HeadingLevel.HEADING_2));s.paragraphs.forEach(para=>c.push(labeledParagraph(para)));if(s.bullets)s.bullets.forEach(b=>c.push(labeledBullet(b)))});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("6. Layout Guidance",HeadingLevel.HEADING_1));c.push(p(E.layoutIntro));E.layoutPanels.forEach(panel=>{c.push(p([r(panel.name,{bold:true,color:COLORS.titleColor})]));c.push(p(panel.text))});c.push(heading("7. Implementation Notes",HeadingLevel.HEADING_1));E.implementationNotes.forEach(note=>c.push(labeledParagraph(note)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("8. Open Issues",HeadingLevel.HEADING_1));if(E.openIssues.length>0){c.push(twoColTable("ID","Issue",E.openIssues))}else{c.push(p("No open issues.",{italics:true}))}c.push(heading("9. Decisions Made",HeadingLevel.HEADING_1));c.push(twoColTable("ID","Decision",E.decisions));return c}
const content=buildContent();const doc=new Document({styles:{default:{document:{run:{font:FONT,size:SZ.body}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h1,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:360,after:120},outlineLevel:0}},{id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h2,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:1}},{id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h3,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:2}}]},numbering:{config:[{reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},headers:{default:new Header({children:[new Paragraph({children:[r(ENTITY.orgName,{size:SZ.meta,bold:true,color:COLORS.titleColor}),new TextRun({children:["\t"],font:FONT}),r(`${ENTITY.entityName} Entity PRD`,{size:SZ.meta,color:COLORS.idColor})],tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],spacing:{after:0},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:COLORS.headerBg,space:4}}})]})},footers:{default:new Footer({children:[new Paragraph({children:[r(`Entity PRD \u2014 ${ENTITY.entityName}`,{size:SZ.xs,color:COLORS.idColor})],alignment:AlignmentType.CENTER,spacing:{before:0}})]})},children:[p(ENTITY.orgName,{bold:true,size:20,color:COLORS.idColor,after:40}),p(`${ENTITY.entityName} Entity PRD`,{bold:true,size:40,color:COLORS.titleColor,after:200}),metaTable([["Document Type","Entity PRD"],["Entity",`${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],["Implementation",ENTITY.orgName],["Version",ENTITY.version],["Status",ENTITY.status],["Last Updated",ENTITY.lastUpdated],["Source Documents",ENTITY.sourceDocuments]]),new Paragraph({children:[new PageBreak()]}),...content]}]});Packer.toBuffer(doc).then(buffer=>{fs.writeFileSync(ENTITY.outputFile,buffer);console.log(`Generated: ${ENTITY.outputFile}`)});
