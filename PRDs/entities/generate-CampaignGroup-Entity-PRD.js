const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Campaign Group",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 11:45",
  sourceDocuments: "CR Domain PRD v1.0, CR-MARKETING-CAMPAIGNS v1.0, Entity Inventory v1.4",
  outputFile: "/home/claude/cbm/PRDs/entities/CampaignGroup-Entity-PRD.docx",
  overview: {
    crmEntityName: "Campaign Group",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Campaign Group",
    labelPlural: "Campaign Groups",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },
  overviewText: [
    "The Campaign Group entity is a lightweight organizational container that groups related Marketing Campaigns into a coordinated multi-touch effort (e.g., a \u201CSpring 2026 Awareness Push\u201D spanning several emails and an SMS reminder). It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain within the CR-MARKETING sub-domain.",
    "Campaign Group uses the Base entity type because it is a grouping and aggregation container, not a person, company, or calendar event. No calendar scheduling semantics are needed at the group level.",
    "Campaign Group has no independent status. Its state is derived from the statuses of its child Campaign records. The entity has four custom fields \u2014 the smallest entity in the CR domain.",
    "Campaign Group is optional. Standalone Campaigns that do not belong to a coordinated effort have no Campaign Group link.",
  ],
  overviewNotes: [],
  nativeFieldsIntro: "The following fields already exist on the Campaign Group entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Maps to groupName (CR-MARKETING-CAMPAIGNS-DAT-038). The native name field may be used directly or a custom groupName field created alongside it. See Implementation Note 1.", "CR-MARKETING-CAMPAIGNS"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [],
  customFieldGroups: [
    {
      heading: "3.1 Group Definition",
      headingLevel: 2,
      intro: "The following custom fields define the Campaign Group. All four fields are always visible with no dynamic logic.",
      fields: [
        ["groupName", "varchar", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-038", [
          { text: "Human-readable label for the coordinated effort (e.g., \u201CSpring 2026 Awareness Push\u201D). Set by the Client Recruiter at creation. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "may map to native name field. See Implementation Note 1." },
        ]],
        ["description", "text", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-039", [
          { text: "Free-text explanation of the coordinated effort\u2019s goal. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["startDate", "date", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-040", [
          { text: "When the coordinated effort begins. Informational only \u2014 no system behavior is driven by this date. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["endDate", "date", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-041", [
          { text: "When the coordinated effort wraps up. Informational only \u2014 no system behavior is driven by this date. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
  ],
  relationshipsIntro: "All relationships involving the Campaign Group entity.",
  relationships: [
    ["Campaign Group \u2192 Marketing Campaign", "Marketing Campaign", "oneToMany", "CR-MARKETING-CAMPAIGNS-DAT-028", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Campaign link:", text: " The Campaign Group-to-Campaign relationship is the reverse of Campaign.campaignGroup (manyToOne from Campaign to Campaign Group). The Campaign Group\u2019s detail view shows all child Campaigns in a related records panel. Aggregate metrics for the Campaign Group are derived from the child Campaigns at report time \u2014 they are not stored on the Campaign Group entity." },
  ],
  dynamicLogicIntro: "Campaign Group has no type discriminator, no status lifecycle, and no conditional field visibility rules. All four custom fields are always visible.",
  dynamicLogicSections: [],
  layoutIntro: "The following panel grouping is a recommendation for the Campaign Group detail view. Final layout is determined during YAML generation. Campaign Group is a compact entity; a single panel may suffice.",
  layoutPanels: [
    { name: "Group Details Panel", text: "groupName, description, startDate, endDate." },
    { name: "Campaigns Panel", text: "Marketing Campaign related records list (oneToMany reverse from Campaign.campaignGroup). Shows all Campaigns in this group." },
  ],
  implementationNotes: [
    { label: "1. groupName vs. native name:", text: " The process document defines groupName as a varchar field. The native Base entity provides a name field. During YAML generation, determine whether groupName should be implemented as the native name field (relabeled) or as a separate custom field alongside the native name. Using the native name is preferred if it supports the desired display behavior." },
    { label: "2. No independent status:", text: " Campaign Group has no status field. Its operational state is derived from the statuses of its child Campaign records. A Campaign Group is \u201Cactive\u201D when it has Campaigns in Draft or Scheduled status, and \u201Ccomplete\u201D when all child Campaigns are at Complete or Cancelled. This derivation is for reporting purposes only \u2014 it is computed at query time, not stored." },
    { label: "3. Aggregate metrics:", text: " The Campaign Group Rollup Report (defined in CR-MARKETING-CAMPAIGNS) computes aggregate metrics across all child Campaigns. These metrics are not stored on the Campaign Group entity; they are computed at report generation time by summing the aggregate fields from child Campaign records." },
    { label: "4. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document. All references to platform capabilities use generic terminology." },
  ],
  openIssues: [],
  decisions: [
    ["CG-DEC-001", "Base entity type chosen. Campaign Group is a grouping and aggregation container. No calendar scheduling semantics needed at the group level."],
    ["CG-DEC-002", "No activity stream. Campaign Group is a lightweight organizational container with minimal fields and infrequent direct edits."],
    ["CG-DEC-003", "No independent status field. State is derived from child Campaign statuses at report time. Storing a derived status would require synchronization workflows without proportional value."],
    ["CG-DEC-004", "Campaign Group is optional. Standalone Campaigns do not require a Campaign Group link. The campaignGroup field on Campaign is not required."],
  ],
};

// RENDERING ENGINE (identical to Segment generator)
const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,Header,Footer,AlignmentType,LevelFormat,HeadingLevel,BorderStyle,WidthType,ShadingType,PageBreak,TabStopType,TabStopPosition}=require("docx");const FONT="Arial";const SZ={body:22,small:20,xs:16,h1:32,h2:28,h3:24,meta:20};const COLORS={headerBg:"1F3864",headerText:"FFFFFF",altRowBg:"F2F7FB",borderColor:"AAAAAA",titleColor:"1F3864",idColor:"888888"};const border={style:BorderStyle.SINGLE,size:1,color:COLORS.borderColor};const borders={top:border,bottom:border,left:border,right:border};const cellMargins={top:60,bottom:60,left:100,right:100};const descMargins={top:40,bottom:80,left:100,right:100};const TABLE_WIDTH=9360;function r(t,o={}){return new TextRun({text:t,font:FONT,size:o.size||SZ.body,bold:o.bold||false,italics:o.italics||false,color:o.color})}function p(t,o={}){return new Paragraph({spacing:{after:o.after??120},alignment:o.align,children:Array.isArray(t)?t:[r(t,o)]})}function heading(t,l){return new Paragraph({heading:l,spacing:{before:l===HeadingLevel.HEADING_1?360:240,after:120},children:[r(t,{bold:true,size:l===HeadingLevel.HEADING_1?SZ.h1:l===HeadingLevel.HEADING_2?SZ.h2:SZ.h3,color:COLORS.titleColor})]})}function labeledParagraph(o){if(o.label)return p([r(o.label,{bold:true}),r(o.text)]);return p(o.text)}function labeledBullet(o){return new Paragraph({numbering:{reference:"bullets",level:0},spacing:{after:60},children:[r(o.label,{bold:true}),r(o.text)]})}function hdrCell(t,w){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:{fill:COLORS.headerBg,type:ShadingType.CLEAR},margins:cellMargins,children:[new Paragraph({children:[r(t,{bold:true,size:SZ.small,color:COLORS.headerText})]})]})}function dataCell(t,w,o={}){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:o.shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:cellMargins,columnSpan:o.columnSpan,children:[new Paragraph({children:[r(t,{size:o.size||SZ.small,bold:o.bold,color:o.color,italics:o.italics})]})]})}const MC=[2800,6560];function metaTable(rows){return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:MC,rows:rows.map((row,i)=>new TableRow({children:[dataCell(row[0],MC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],MC[1],{shaded:i%2===1,size:SZ.small})]}))})}const NFC=[2200,1400,3000,2760];function nativeFieldTable(fields){const hdr=new TableRow({children:[hdrCell("Native Field",NFC[0]),hdrCell("Type",NFC[1]),hdrCell("PRD Name(s) / Mapping",NFC[2]),hdrCell("Referenced By",NFC[3])]});const rows=fields.map((f,i)=>new TableRow({children:[dataCell(f[0],NFC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(f[1],NFC[1],{shaded:i%2===1,size:SZ.small}),dataCell(f[2],NFC[2],{shaded:i%2===1,size:SZ.small}),dataCell(f[3],NFC[3],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:NFC,rows:[hdr,...rows]})}const FC=[2200,1100,800,2400,1000,1860];function buildDescRuns(d){return d.map(part=>{if(part.bold)return r(part.bold,{size:SZ.small,color:COLORS.idColor,bold:true});return r(part.text,{size:SZ.small,color:COLORS.idColor})})}function fieldTable(fields){const hdr=new TableRow({children:[hdrCell("Field Name",FC[0]),hdrCell("Type",FC[1]),hdrCell("Required",FC[2]),hdrCell("Values",FC[3]),hdrCell("Default",FC[4]),hdrCell("ID",FC[5])]});const rows=[hdr];fields.forEach((f,i)=>{const[name,type,required,values,defaultVal,id,descParts]=f;const shaded=i%2===1;rows.push(new TableRow({children:[dataCell(name,FC[0],{shaded,bold:true}),dataCell(type,FC[1],{shaded}),dataCell(required,FC[2],{shaded}),dataCell(values,FC[3],{shaded}),dataCell(defaultVal,FC[4],{shaded}),dataCell(id,FC[5],{shaded,size:SZ.xs,color:COLORS.idColor})]}));rows.push(new TableRow({children:[new TableCell({borders,width:{size:TABLE_WIDTH,type:WidthType.DXA},columnSpan:6,shading:shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:descMargins,children:[new Paragraph({children:buildDescRuns(descParts)})]})]}))});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:FC,rows})}const RLC=[2600,1800,1400,1700,1860];function relTable(rels){const hdr=new TableRow({children:[hdrCell("Relationship",RLC[0]),hdrCell("Related Entity",RLC[1]),hdrCell("Link Type",RLC[2]),hdrCell("PRD Reference",RLC[3]),hdrCell("Domain(s)",RLC[4])]});const rows=rels.map((rel,i)=>new TableRow({children:[dataCell(rel[0],RLC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(rel[1],RLC[1],{shaded:i%2===1,size:SZ.small}),dataCell(rel[2],RLC[2],{shaded:i%2===1,size:SZ.small}),dataCell(rel[3],RLC[3],{shaded:i%2===1,size:SZ.small}),dataCell(rel[4],RLC[4],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:RLC,rows:[hdr,...rows]})}const TC=[1500,7860];function twoColTable(h1,h2,rows){const hdr=new TableRow({children:[hdrCell(h1,TC[0]),hdrCell(h2,TC[1])]});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:TC,rows:[hdr,...rows.map((row,i)=>new TableRow({children:[dataCell(row[0],TC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],TC[1],{shaded:i%2===1,size:SZ.small})]}))]})}
function buildContent(){const c=[];const E=ENTITY;const O=E.overview;c.push(heading("1. Entity Overview",HeadingLevel.HEADING_1));const metaRows=[["CRM Entity Name",O.crmEntityName],["Native / Custom",O.nativeOrCustom],["Entity Type",O.entityType],["Display Label (Singular)",O.labelSingular],["Display Label (Plural)",O.labelPlural],["Activity Stream",O.activityStream],["Primary Domain",O.primaryDomain],["Contributing Domains",O.contributingDomains]];if(O.discriminatorField){metaRows.push(["Discriminator Field",O.discriminatorField]);metaRows.push(["Discriminator Values",O.discriminatorValues])}c.push(metaTable(metaRows));c.push(p(""));E.overviewText.forEach(t=>c.push(p(t)));if(E.overviewNotes&&E.overviewNotes.length>0)E.overviewNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("2. Native Fields",HeadingLevel.HEADING_1));c.push(p(E.nativeFieldsIntro));c.push(nativeFieldTable(E.nativeFields));c.push(p(""));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("3. Custom Fields",HeadingLevel.HEADING_1));c.push(p("Custom fields must be created via YAML program files."));E.customFieldGroups.forEach(group=>{if(group.heading){const lvl=group.headingLevel===3?HeadingLevel.HEADING_3:HeadingLevel.HEADING_2;c.push(heading(group.heading,lvl))}if(group.intro)c.push(p(group.intro));if(group.fields&&group.fields.length>0){c.push(fieldTable(group.fields));c.push(p(""))}});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("4. Relationships",HeadingLevel.HEADING_1));c.push(p(E.relationshipsIntro));c.push(relTable(E.relationships));c.push(p(""));if(E.relationshipNotes)E.relationshipNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("5. Dynamic Logic Rules",HeadingLevel.HEADING_1));c.push(p(E.dynamicLogicIntro));if(E.dynamicLogicSections&&E.dynamicLogicSections.length>0)E.dynamicLogicSections.forEach(s=>{c.push(heading(s.heading,HeadingLevel.HEADING_2));s.paragraphs.forEach(para=>c.push(labeledParagraph(para)));if(s.bullets)s.bullets.forEach(b=>c.push(labeledBullet(b)))});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("6. Layout Guidance",HeadingLevel.HEADING_1));c.push(p(E.layoutIntro));E.layoutPanels.forEach(panel=>{c.push(p([r(panel.name,{bold:true,color:COLORS.titleColor})]));c.push(p(panel.text))});c.push(heading("7. Implementation Notes",HeadingLevel.HEADING_1));E.implementationNotes.forEach(note=>c.push(labeledParagraph(note)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("8. Open Issues",HeadingLevel.HEADING_1));if(E.openIssues.length>0){c.push(twoColTable("ID","Issue",E.openIssues))}else{c.push(p("No open issues.",{italics:true}))}c.push(heading("9. Decisions Made",HeadingLevel.HEADING_1));c.push(twoColTable("ID","Decision",E.decisions));return c}
const content=buildContent();const doc=new Document({styles:{default:{document:{run:{font:FONT,size:SZ.body}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h1,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:360,after:120},outlineLevel:0}},{id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h2,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:1}},{id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h3,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:2}}]},numbering:{config:[{reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},headers:{default:new Header({children:[new Paragraph({children:[r(ENTITY.orgName,{size:SZ.meta,bold:true,color:COLORS.titleColor}),new TextRun({children:["\t"],font:FONT}),r(`${ENTITY.entityName} Entity PRD`,{size:SZ.meta,color:COLORS.idColor})],tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],spacing:{after:0},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:COLORS.headerBg,space:4}}})]})},footers:{default:new Footer({children:[new Paragraph({children:[r(`Entity PRD \u2014 ${ENTITY.entityName}`,{size:SZ.xs,color:COLORS.idColor})],alignment:AlignmentType.CENTER,spacing:{before:0}})]})},children:[p(ENTITY.orgName,{bold:true,size:20,color:COLORS.idColor,after:40}),p(`${ENTITY.entityName} Entity PRD`,{bold:true,size:40,color:COLORS.titleColor,after:200}),metaTable([["Document Type","Entity PRD"],["Entity",`${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],["Implementation",ENTITY.orgName],["Version",ENTITY.version],["Status",ENTITY.status],["Last Updated",ENTITY.lastUpdated],["Source Documents",ENTITY.sourceDocuments]]),new Paragraph({children:[new PageBreak()]}),...content]}]});Packer.toBuffer(doc).then(buffer=>{fs.writeFileSync(ENTITY.outputFile,buffer);console.log(`Generated: ${ENTITY.outputFile}`)});
