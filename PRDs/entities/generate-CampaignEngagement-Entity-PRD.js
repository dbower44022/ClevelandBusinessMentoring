const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Campaign Engagement",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 12:15",
  sourceDocuments: "CR Domain PRD v1.0, CR-MARKETING-CAMPAIGNS v1.0, CR-REACTIVATE-OUTREACH v1.0, Entity Inventory v1.4, Marketing Campaign Entity PRD v1.0, Contact Entity PRD v1.5",
  outputFile: "/home/claude/cbm/PRDs/entities/CampaignEngagement-Entity-PRD.docx",
  overview: {
    crmEntityName: "Campaign Engagement",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Campaign Engagement",
    labelPlural: "Campaign Engagements",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },
  overviewText: [
    "The Campaign Engagement entity is a per-recipient engagement record that links a Contact to a Marketing Campaign. One record per Contact per Campaign. It is a custom entity owned by the Client Recruiting (CR) domain, shared between CR-MARKETING (campaign execution and tracking) and CR-REACTIVATE (reactivation outreach).",
    "Campaign Engagement uses the Base entity type because it is a relational record linking two parties (Contact and Campaign) with per-recipient engagement state. No calendar scheduling semantics are needed.",
    "The entity tracks five event types with paired boolean and datetime fields for all channels (CR-RECON-DEC-002): sent, opened, clicked, bounced, and unsubscribed. Each event type records first occurrence only. Reactivation Campaigns use the same field set but simply do not populate the unsubscribed and unsubscribedAt fields.",
    "Campaign Engagement records feed two downstream update mechanisms: aggregate metric fields on the parent Campaign (totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed) and marketing roll-up fields on the Contact (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks). Both are workflow-updated.",
  ],
  overviewNotes: [
    { label: "Matching:", text: " Campaign Engagement records are matched to existing Contacts by email address during engagement event ingestion. Unmatched emails (addresses not found in the CRM) are logged but do not create new Contact records." },
  ],
  nativeFieldsIntro: "The following fields already exist on the Campaign Engagement entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Auto-generated or system-set. Not explicitly specified in process documents. May be composed from Contact name and Campaign name.", "System"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [],
  customFieldGroups: [
    {
      heading: "3.1 Core Links",
      headingLevel: 2,
      intro: "The following fields link the Campaign Engagement record to its parent Contact and Campaign.",
      fields: [
        ["contact", "link (Contact)", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-042", [
          { text: "Link to the Contact record this engagement tracks. Matched by email address during engagement event ingestion. One Campaign Engagement per Contact per Campaign. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Contact." },
        ]],
        ["campaign", "link (Marketing Campaign)", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-043", [
          { text: "Link to the Marketing Campaign record this engagement tracks. Set at creation. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Marketing Campaign." },
        ]],
      ],
    },
    {
      heading: "3.2 Engagement Event Fields",
      headingLevel: 2,
      intro: "Five event types with paired boolean and datetime fields for all channels (CR-RECON-DEC-002). Each event type records first occurrence only. The boolean flag indicates whether the event occurred; the datetime records when. Reactivation Campaigns use the full field set but do not populate unsubscribed or unsubscribedAt.",
      fields: [
        ["sent", "bool", "Yes", "\u2014", "false", "CR-MARKETING-CAMPAIGNS-DAT-044", [
          { text: "Whether the message was delivered to this recipient. Set to true at dispatch. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["sentAt", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-045", [
          { text: "Timestamp of send. Set when the sent flag is set to true. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated." },
        ]],
        ["opened", "bool", "No", "\u2014", "false", "CR-MARKETING-CAMPAIGNS-DAT-046", [
          { text: "Whether the recipient opened the message. First open only. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["openedAt", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-047", [
          { text: "Timestamp of first open. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated on first tracking pixel load." },
        ]],
        ["clicked", "bool", "No", "\u2014", "false", "CR-MARKETING-CAMPAIGNS-DAT-048", [
          { text: "Whether the recipient clicked a tracked link. First click only. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["clickedAt", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-049", [
          { text: "Timestamp of first click. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated on first tracked link click." },
        ]],
        ["bounced", "bool", "No", "\u2014", "false", "CR-MARKETING-CAMPAIGNS-DAT-050", [
          { text: "Whether delivery bounced. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
        ["bouncedAt", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-051", [
          { text: "Timestamp of bounce. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "system-populated." },
        ]],
        ["unsubscribed", "bool", "No", "\u2014", "false", "CR-MARKETING-CAMPAIGNS-DAT-052", [
          { text: "Whether the recipient unsubscribed as a result of this campaign. Reactivation Campaigns do not populate this field (CR-RECON-DEC-002). " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING)." },
        ]],
        ["unsubscribedAt", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-053", [
          { text: "Timestamp of unsubscribe. Reactivation Campaigns do not populate this field. " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING). " },
          { bold: "Implementation: " }, { text: "system-populated." },
        ]],
      ],
    },
  ],
  relationshipsIntro: "All relationships involving the Campaign Engagement entity.",
  relationships: [
    ["Campaign Engagement \u2192 Marketing Campaign", "Marketing Campaign", "manyToOne", "CR-MARKETING-CAMPAIGNS-DAT-043", "CR"],
    ["Campaign Engagement \u2192 Contact", "Contact", "manyToOne", "CR-MARKETING-CAMPAIGNS-DAT-042", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Campaign link:", text: " Each Campaign Engagement belongs to exactly one Marketing Campaign. The Campaign\u2019s detail view shows all Campaign Engagement records. Aggregate metrics on the Campaign are workflow-updated from these records." },
    { label: "Note on Contact link:", text: " Each Campaign Engagement links to exactly one Contact. A Contact may have many Campaign Engagement records across different Campaigns. Campaign Engagement records update the Contact\u2019s marketing roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) via workflow. This applies to both marketing and reactivation Campaign Engagement records." },
  ],
  dynamicLogicIntro: "Campaign Engagement has no type discriminator, no status lifecycle, and no conditional field visibility rules. All 12 custom fields are always visible. The paired boolean/datetime pattern is structurally uniform across all five event types.",
  dynamicLogicSections: [],
  layoutIntro: "The following panel grouping is a recommendation for the Campaign Engagement detail view. Final layout is determined during YAML generation.",
  layoutPanels: [
    { name: "Overview Panel", text: "name (read-only, auto-generated), contact (link to Contact), campaign (link to Marketing Campaign)." },
    { name: "Engagement Events Panel", text: "sent, sentAt, opened, openedAt, clicked, clickedAt, bounced, bouncedAt, unsubscribed, unsubscribedAt. Paired boolean/datetime fields for each event type." },
  ],
  implementationNotes: [
    { label: "1. Auto-generated name:", text: " Consider auto-generating as {Contact Name} \u2014 {Campaign Name} for readability in list views." },
    { label: "2. First occurrence only:", text: " Each event type records the first occurrence only. Subsequent opens, clicks, and bounces do not update the existing Campaign Engagement record. The boolean flag and timestamp are set once and then left unchanged." },
    { label: "3. Contact matching:", text: " Campaign Engagement records are matched to Contacts by email address during engagement event ingestion (from the external marketing platform\u2019s per-recipient engagement data). Unmatched emails are logged but do not create new Contact records." },
    { label: "4. Contact roll-up updates:", text: " When a Campaign Engagement record is created or updated, workflows update four Contact marketing roll-up fields: lastMarketingEngagement (most recent sent, open, or click timestamp), totalCampaignsSent (count of Campaigns sent to this Contact), totalOpens (count of opens across all Campaigns), totalClicks (count of clicks across all Campaigns). These updates apply to both marketing and reactivation Campaign Engagement records." },
    { label: "5. Campaign aggregate updates:", text: " When a Campaign Engagement record is created or updated, workflows update six aggregate fields on the parent Campaign: totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed." },
    { label: "6. Unified five-event-type field set (CR-RECON-DEC-002):", text: " All five event types (sent, opened, clicked, bounced, unsubscribed) with paired timestamps are present for all channels. Reactivation Campaigns simply do not populate the unsubscribed and unsubscribedAt fields. No channel-specific field visibility rules are needed; the fields remain blank and inert." },
    { label: "7. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document." },
  ],
  openIssues: [],
  decisions: [
    ["CE-DEC-001", "Base entity type chosen. Campaign Engagement is a relational record linking a Contact to a Campaign with per-recipient engagement state. No calendar scheduling semantics needed."],
    ["CE-DEC-002", "Unified five-event-type field set for all channels (CR-RECON-DEC-002): sent, opened, clicked, bounced, unsubscribed with paired timestamps. Reactivation Campaigns do not populate unsubscribed/unsubscribedAt but the fields exist on all records for structural uniformity."],
    ["CE-DEC-003", "First occurrence only for each event type. Subsequent events do not update the record. This simplifies the data model and avoids the complexity of tracking multiple opens or clicks per recipient."],
    ["CE-DEC-004", "No activity stream. Campaign Engagement is a high-volume system-populated record. Activity stream overhead is not justified."],
    ["CE-DEC-005", "Unmatched emails do not create new Contacts. Campaign Engagement records are matched by email address; unmatched addresses are logged for investigation but do not trigger Contact creation."],
    ["CE-DEC-006", "Campaign Engagement records from both marketing and reactivation sends update the same Contact marketing roll-up fields. No distinction is made at the roll-up level between channel types."],
  ],
};

// RENDERING ENGINE
const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,Header,Footer,AlignmentType,LevelFormat,HeadingLevel,BorderStyle,WidthType,ShadingType,PageBreak,TabStopType,TabStopPosition}=require("docx");const FONT="Arial";const SZ={body:22,small:20,xs:16,h1:32,h2:28,h3:24,meta:20};const COLORS={headerBg:"1F3864",headerText:"FFFFFF",altRowBg:"F2F7FB",borderColor:"AAAAAA",titleColor:"1F3864",idColor:"888888"};const border={style:BorderStyle.SINGLE,size:1,color:COLORS.borderColor};const borders={top:border,bottom:border,left:border,right:border};const cellMargins={top:60,bottom:60,left:100,right:100};const descMargins={top:40,bottom:80,left:100,right:100};const TABLE_WIDTH=9360;function r(t,o={}){return new TextRun({text:t,font:FONT,size:o.size||SZ.body,bold:o.bold||false,italics:o.italics||false,color:o.color})}function p(t,o={}){return new Paragraph({spacing:{after:o.after??120},alignment:o.align,children:Array.isArray(t)?t:[r(t,o)]})}function heading(t,l){return new Paragraph({heading:l,spacing:{before:l===HeadingLevel.HEADING_1?360:240,after:120},children:[r(t,{bold:true,size:l===HeadingLevel.HEADING_1?SZ.h1:l===HeadingLevel.HEADING_2?SZ.h2:SZ.h3,color:COLORS.titleColor})]})}function labeledParagraph(o){if(o.label)return p([r(o.label,{bold:true}),r(o.text)]);return p(o.text)}function labeledBullet(o){return new Paragraph({numbering:{reference:"bullets",level:0},spacing:{after:60},children:[r(o.label,{bold:true}),r(o.text)]})}function hdrCell(t,w){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:{fill:COLORS.headerBg,type:ShadingType.CLEAR},margins:cellMargins,children:[new Paragraph({children:[r(t,{bold:true,size:SZ.small,color:COLORS.headerText})]})]})}function dataCell(t,w,o={}){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:o.shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:cellMargins,columnSpan:o.columnSpan,children:[new Paragraph({children:[r(t,{size:o.size||SZ.small,bold:o.bold,color:o.color,italics:o.italics})]})]})}const MC=[2800,6560];function metaTable(rows){return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:MC,rows:rows.map((row,i)=>new TableRow({children:[dataCell(row[0],MC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],MC[1],{shaded:i%2===1,size:SZ.small})]}))})}const NFC=[2200,1400,3000,2760];function nativeFieldTable(fields){const hdr=new TableRow({children:[hdrCell("Native Field",NFC[0]),hdrCell("Type",NFC[1]),hdrCell("PRD Name(s) / Mapping",NFC[2]),hdrCell("Referenced By",NFC[3])]});const rows=fields.map((f,i)=>new TableRow({children:[dataCell(f[0],NFC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(f[1],NFC[1],{shaded:i%2===1,size:SZ.small}),dataCell(f[2],NFC[2],{shaded:i%2===1,size:SZ.small}),dataCell(f[3],NFC[3],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:NFC,rows:[hdr,...rows]})}const FC=[2200,1100,800,2400,1000,1860];function buildDescRuns(d){return d.map(part=>{if(part.bold)return r(part.bold,{size:SZ.small,color:COLORS.idColor,bold:true});return r(part.text,{size:SZ.small,color:COLORS.idColor})})}function fieldTable(fields){const hdr=new TableRow({children:[hdrCell("Field Name",FC[0]),hdrCell("Type",FC[1]),hdrCell("Required",FC[2]),hdrCell("Values",FC[3]),hdrCell("Default",FC[4]),hdrCell("ID",FC[5])]});const rows=[hdr];fields.forEach((f,i)=>{const[name,type,required,values,defaultVal,id,descParts]=f;const shaded=i%2===1;rows.push(new TableRow({children:[dataCell(name,FC[0],{shaded,bold:true}),dataCell(type,FC[1],{shaded}),dataCell(required,FC[2],{shaded}),dataCell(values,FC[3],{shaded}),dataCell(defaultVal,FC[4],{shaded}),dataCell(id,FC[5],{shaded,size:SZ.xs,color:COLORS.idColor})]}));rows.push(new TableRow({children:[new TableCell({borders,width:{size:TABLE_WIDTH,type:WidthType.DXA},columnSpan:6,shading:shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:descMargins,children:[new Paragraph({children:buildDescRuns(descParts)})]})]}))});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:FC,rows})}const RLC=[2600,1800,1400,1700,1860];function relTable(rels){const hdr=new TableRow({children:[hdrCell("Relationship",RLC[0]),hdrCell("Related Entity",RLC[1]),hdrCell("Link Type",RLC[2]),hdrCell("PRD Reference",RLC[3]),hdrCell("Domain(s)",RLC[4])]});const rows=rels.map((rel,i)=>new TableRow({children:[dataCell(rel[0],RLC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(rel[1],RLC[1],{shaded:i%2===1,size:SZ.small}),dataCell(rel[2],RLC[2],{shaded:i%2===1,size:SZ.small}),dataCell(rel[3],RLC[3],{shaded:i%2===1,size:SZ.small}),dataCell(rel[4],RLC[4],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:RLC,rows:[hdr,...rows]})}const TC=[1500,7860];function twoColTable(h1,h2,rows){const hdr=new TableRow({children:[hdrCell(h1,TC[0]),hdrCell(h2,TC[1])]});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:TC,rows:[hdr,...rows.map((row,i)=>new TableRow({children:[dataCell(row[0],TC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],TC[1],{shaded:i%2===1,size:SZ.small})]}))]})}
function buildContent(){const c=[];const E=ENTITY;const O=E.overview;c.push(heading("1. Entity Overview",HeadingLevel.HEADING_1));const metaRows=[["CRM Entity Name",O.crmEntityName],["Native / Custom",O.nativeOrCustom],["Entity Type",O.entityType],["Display Label (Singular)",O.labelSingular],["Display Label (Plural)",O.labelPlural],["Activity Stream",O.activityStream],["Primary Domain",O.primaryDomain],["Contributing Domains",O.contributingDomains]];c.push(metaTable(metaRows));c.push(p(""));E.overviewText.forEach(t=>c.push(p(t)));if(E.overviewNotes&&E.overviewNotes.length>0)E.overviewNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("2. Native Fields",HeadingLevel.HEADING_1));c.push(p(E.nativeFieldsIntro));c.push(nativeFieldTable(E.nativeFields));c.push(p(""));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("3. Custom Fields",HeadingLevel.HEADING_1));c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group."));E.customFieldGroups.forEach(group=>{if(group.heading){const lvl=group.headingLevel===3?HeadingLevel.HEADING_3:HeadingLevel.HEADING_2;c.push(heading(group.heading,lvl))}if(group.intro)c.push(p(group.intro));if(group.fields&&group.fields.length>0){c.push(fieldTable(group.fields));c.push(p(""))}});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("4. Relationships",HeadingLevel.HEADING_1));c.push(p(E.relationshipsIntro));c.push(relTable(E.relationships));c.push(p(""));if(E.relationshipNotes)E.relationshipNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("5. Dynamic Logic Rules",HeadingLevel.HEADING_1));c.push(p(E.dynamicLogicIntro));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("6. Layout Guidance",HeadingLevel.HEADING_1));c.push(p(E.layoutIntro));E.layoutPanels.forEach(panel=>{c.push(p([r(panel.name,{bold:true,color:COLORS.titleColor})]));c.push(p(panel.text))});c.push(heading("7. Implementation Notes",HeadingLevel.HEADING_1));E.implementationNotes.forEach(note=>c.push(labeledParagraph(note)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("8. Open Issues",HeadingLevel.HEADING_1));if(E.openIssues.length>0){c.push(twoColTable("ID","Issue",E.openIssues))}else{c.push(p("No open issues.",{italics:true}))}c.push(heading("9. Decisions Made",HeadingLevel.HEADING_1));c.push(twoColTable("ID","Decision",E.decisions));return c}
const content=buildContent();const doc=new Document({styles:{default:{document:{run:{font:FONT,size:SZ.body}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h1,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:360,after:120},outlineLevel:0}},{id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h2,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:1}},{id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h3,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:2}}]},numbering:{config:[{reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},headers:{default:new Header({children:[new Paragraph({children:[r(ENTITY.orgName,{size:SZ.meta,bold:true,color:COLORS.titleColor}),new TextRun({children:["\t"],font:FONT}),r(`${ENTITY.entityName} Entity PRD`,{size:SZ.meta,color:COLORS.idColor})],tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],spacing:{after:0},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:COLORS.headerBg,space:4}}})]})},footers:{default:new Footer({children:[new Paragraph({children:[r(`Entity PRD \u2014 ${ENTITY.entityName}`,{size:SZ.xs,color:COLORS.idColor})],alignment:AlignmentType.CENTER,spacing:{before:0}})]})},children:[p(ENTITY.orgName,{bold:true,size:20,color:COLORS.idColor,after:40}),p(`${ENTITY.entityName} Entity PRD`,{bold:true,size:40,color:COLORS.titleColor,after:200}),metaTable([["Document Type","Entity PRD"],["Entity",`${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],["Implementation",ENTITY.orgName],["Version",ENTITY.version],["Status",ENTITY.status],["Last Updated",ENTITY.lastUpdated],["Source Documents",ENTITY.sourceDocuments]]),new Paragraph({children:[new PageBreak()]}),...content]}]});Packer.toBuffer(doc).then(buffer=>{fs.writeFileSync(ENTITY.outputFile,buffer);console.log(`Generated: ${ENTITY.outputFile}`)});
