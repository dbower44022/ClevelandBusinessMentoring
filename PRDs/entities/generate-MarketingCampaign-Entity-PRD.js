const ENTITY = {
  orgName: "Cleveland Business Mentors",
  entityName: "Marketing Campaign",
  version: "1.0",
  status: "Draft",
  lastUpdated: "04-17-26 12:00",
  sourceDocuments: "CR Domain PRD v1.0, CR-MARKETING-CAMPAIGNS v1.0, CR-REACTIVATE-OUTREACH v1.0, CR-REACTIVATE SDO v1.0, Entity Inventory v1.4, Segment Entity PRD v1.0, Campaign Group Entity PRD v1.0",
  outputFile: "/home/claude/cbm/PRDs/entities/MarketingCampaign-Entity-PRD.docx",
  overview: {
    crmEntityName: "Marketing Campaign",
    nativeOrCustom: "Custom",
    entityType: "Base",
    labelSingular: "Marketing Campaign",
    labelPlural: "Marketing Campaigns",
    activityStream: "No",
    primaryDomain: "Client Recruiting (CR)",
    contributingDomains: "Client Recruiting (CR)",
    discriminatorField: null,
    discriminatorValues: null,
  },
  overviewText: [
    "The Marketing Campaign entity represents a single outbound marketing or reactivation send. One record per send. It is a custom entity owned by the Client Recruiting (CR) domain, shared between two sub-domains: CR-MARKETING (campaign execution and tracking) and CR-REACTIVATE (reactivation outreach).",
    "Marketing Campaign uses the Base entity type because the primary purpose is metadata tracking and engagement aggregation, not calendar scheduling. The external marketing platform handles actual send scheduling; the CRM Campaign record is a metadata and reporting anchor. Named \u201CMarketing Campaign\u201D to disambiguate from the existing Fundraising Campaign entity.",
    "The entity uses a unified five-value status lifecycle for all channels: Draft, Scheduled, Sent, Complete, Cancelled (CR-RECON-DEC-001). No channel-dependent status restriction is enforced at the entity level. The channel field (Email, SMS, Reactivation) distinguishes campaign types, and the population field is applicable only when channel is Reactivation.",
    "Fields are consolidated from CR-MARKETING-CAMPAIGNS (15 fields) and CR-REACTIVATE-OUTREACH (2 additional fields: population and sendDate). Aggregate metrics (totalRecipients through totalUnsubscribed) are workflow-updated from Campaign Engagement records.",
  ],
  overviewNotes: [
    { label: "Dual-mode operation:", text: " Marketing Campaigns support dual-mode operation throughout: fully manual when marketing platform integration is limited, fully automatic when deeply connected, or any combination. Reactivation Campaigns use CRM-native email sends without an external marketing platform." },
  ],
  nativeFieldsIntro: "The following fields already exist on the Marketing Campaign entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML.",
  nativeFields: [
    ["name", "varchar", "Maps to campaignName (CR-MARKETING-CAMPAIGNS-DAT-023). Human-readable label. See Implementation Note 1.", "CR-MARKETING-CAMPAIGNS, CR-REACTIVATE-OUTREACH"],
    ["createdAt", "datetime", "System \u2014 record creation timestamp", "System"],
    ["modifiedAt", "datetime", "System \u2014 last modified timestamp", "System"],
    ["assignedUser", "link", "System \u2014 assigned CRM user", "System"],
  ],
  nativeFieldNotes: [],
  customFieldGroups: [
    {
      heading: "3.1 Campaign Identity",
      headingLevel: 2,
      intro: "The following fields identify the campaign and its delivery context.",
      fields: [
        ["campaignName", "varchar", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-023", [
          { text: "Human-readable label for the campaign (e.g., \u201CMarch Newsletter,\u201D \u201CSpring Open House Reminder\u201D). Set by the Client Recruiter at creation. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "may map to native name field. See Implementation Note 1." },
        ]],
        ["channel", "enum", "Yes", "Email, SMS, Reactivation", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-024", [
          { text: "The delivery channel for this send. Set by the Client Recruiter at creation for Email and SMS; system-set to Reactivation for all Campaigns created through the reactivation workflow. Three-value enum expanded from two values (Email, SMS) by CR-REACTIVATE SDO. " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING, CR-REACTIVATE)." },
        ]],
        ["population", "enum", "Conditional", "Former Client, Event Attendee, Inactive Prospect", "\u2014", "CR-REACTIVATE-OUTREACH-DAT-028", [
          { text: "Applicable when channel = Reactivation. System-set from the originating saved list when the Campaign is created through the reactivation workflow. Enables the Reactivation Campaign Performance report to group by population. Not used for Email or SMS channels. " },
          { bold: "Visibility: " }, { text: "channel = Reactivation. " },
          { bold: "Domains: " }, { text: "CR (CR-REACTIVATE). " },
          { bold: "Implementation: " }, { text: "system-set, readOnly." },
        ]],
      ],
    },
    {
      heading: "3.2 Planning and Scheduling",
      headingLevel: 2,
      intro: "The following fields support campaign planning and send timing.",
      fields: [
        ["targetSegment", "link (Segment)", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-025", [
          { text: "Link to the Segment record that defines the audience for this Campaign. Set by the Client Recruiter at creation. Consumes the forward-reference established in CR-MARKETING-CONTACTS-DAT-052. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Segment." },
        ]],
        ["plannedSendDate", "date", "Yes", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-026", [
          { text: "When the Client Recruiter plans to send this campaign. Set at creation. " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING)." },
        ]],
        ["actualSendDate", "datetime", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-027", [
          { text: "When the campaign was actually sent. Populated when the Campaign transitions to Sent \u2014 from the marketing platform\u2019s send confirmation in automatic mode, or entered by the Client Recruiter in manual mode. " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING)." },
        ]],
        ["sendDate", "datetime", "Conditional", "\u2014", "\u2014", "CR-REACTIVATE-OUTREACH-DAT-030", [
          { text: "Timestamp of Campaign dispatch for reactivation sends. System-populated at send time. Applicable when channel = Reactivation (single-action create-and-send workflow). " },
          { bold: "Visibility: " }, { text: "channel = Reactivation. " },
          { bold: "Domains: " }, { text: "CR (CR-REACTIVATE). " },
          { bold: "Implementation: " }, { text: "system-populated, readOnly." },
        ]],
      ],
    },
    {
      heading: "3.3 Status and Organization",
      headingLevel: 2,
      intro: "The following fields track campaign lifecycle state and organizational grouping.",
      fields: [
        ["status", "enum", "Yes", "Draft, Scheduled, Sent, Complete, Cancelled", "Draft", "CR-MARKETING-CAMPAIGNS-DAT-029", [
          { text: "Campaign lifecycle status. Unified five-value lifecycle for all channels (CR-RECON-DEC-001). Valid transitions: Draft \u2192 Scheduled, Scheduled \u2192 Sent, Sent \u2192 Complete, Draft \u2192 Cancelled, Scheduled \u2192 Cancelled. No backward transitions. Supports dual-mode operation (manual and/or automatic). " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING, CR-REACTIVATE). " },
          { bold: "Implementation: " }, { text: "transition enforcement via workflow." },
        ]],
        ["externalCampaignId", "varchar", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-030", [
          { text: "The marketing platform\u2019s campaign identifier. Links the CRM Campaign record to its platform counterpart for engagement data matching. Populated manually or automatically. Not applicable for Reactivation channel (CRM-native sends). " },
          { bold: "Domains: " }, { text: "CR (CR-MARKETING)." },
        ]],
        ["campaignGroup", "link (Campaign Group)", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-028", [
          { text: "Optional link to a Campaign Group for coordinated multi-touch efforts. May be set at creation or added retroactively. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "manyToOne relationship to Campaign Group." },
        ]],
        ["campaignNotes", "wysiwyg", "No", "\u2014", "\u2014", "CR-MARKETING-CAMPAIGNS-DAT-031", [
          { text: "Free-text commentary: campaign purpose, partner coordination context, lessons learned, or any other notes. Editable at any point in the Campaign lifecycle. " },
          { bold: "Domains: " }, { text: "CR." },
        ]],
      ],
    },
    {
      heading: "3.4 Aggregate Metrics",
      headingLevel: 2,
      intro: "The following fields store campaign-level aggregate metrics. These are workflow-updated from Campaign Engagement records or manually entered, depending on the integration mode.",
      fields: [
        ["totalRecipients", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-032", [
          { text: "Count of Campaign Engagement records for this Campaign. Workflow-updated or manually entered. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated from Campaign Engagement count." },
        ]],
        ["totalSent", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-033", [
          { text: "Count of Campaign Engagement records where sent = true. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated." },
        ]],
        ["totalOpened", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-034", [
          { text: "Count of Campaign Engagement records where opened = true. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated." },
        ]],
        ["totalClicked", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-035", [
          { text: "Count of Campaign Engagement records where clicked = true. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated." },
        ]],
        ["totalBounced", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-036", [
          { text: "Count of Campaign Engagement records where bounced = true. " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated." },
        ]],
        ["totalUnsubscribed", "int", "No", "\u2014", "0", "CR-MARKETING-CAMPAIGNS-DAT-037", [
          { text: "Count of Campaign Engagement records where unsubscribed = true. Reactivation Campaigns will typically show zero (Reactivation does not populate unsubscribed per CR-RECON-DEC-002). " },
          { bold: "Domains: " }, { text: "CR. " },
          { bold: "Implementation: " }, { text: "workflow-updated." },
        ]],
      ],
    },
  ],
  relationshipsIntro: "All relationships involving the Marketing Campaign entity, compiled from the CR domain.",
  relationships: [
    ["Campaign \u2192 Segment", "Segment", "manyToOne", "CR-MARKETING-CAMPAIGNS-DAT-025", "CR"],
    ["Campaign \u2192 Campaign Group", "Campaign Group", "manyToOne", "CR-MARKETING-CAMPAIGNS-DAT-028", "CR"],
    ["Campaign \u2192 Campaign Engagement", "Campaign Engagement", "oneToMany", "CR-MARKETING-CAMPAIGNS-DAT-043 (reverse)", "CR"],
  ],
  relationshipNotes: [
    { label: "Note on Segment link:", text: " Each Campaign targets one Segment. A Segment may be targeted by many Campaigns. The Segment\u2019s detail view shows all Campaigns that targeted it." },
    { label: "Note on Campaign Engagement:", text: " Campaign Engagement records are linked via Campaign Engagement.campaign (manyToOne). The Campaign\u2019s detail view shows all per-recipient engagement records. Aggregate metric fields on Campaign are workflow-updated from these records." },
  ],
  dynamicLogicIntro: "Marketing Campaign has no type discriminator. Dynamic logic rules are based on the channel field value.",
  dynamicLogicSections: [
    { heading: "5.1 Channel-Driven Field Visibility", paragraphs: [
      { text: "The channel field drives visibility of Reactivation-specific fields:" },
    ], bullets: [
      { label: "channel = Reactivation:", text: " Show population, sendDate." },
      { label: "channel = Email or SMS:", text: " Hide population, sendDate." },
    ]},
  ],
  layoutIntro: "The following panel grouping is a recommendation for the Marketing Campaign detail view. Final layout is determined during YAML generation.",
  layoutPanels: [
    { name: "Overview Panel", text: "campaignName, channel, status, population (visible when Reactivation), targetSegment, campaignGroup." },
    { name: "Schedule Panel", text: "plannedSendDate, actualSendDate, sendDate (visible when Reactivation), externalCampaignId." },
    { name: "Metrics Panel", text: "totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed." },
    { name: "Notes Panel", text: "campaignNotes." },
    { name: "Engagements Panel", text: "Campaign Engagement related records list (oneToMany reverse). Per-recipient engagement detail." },
  ],
  implementationNotes: [
    { label: "1. campaignName vs. native name:", text: " The process document defines campaignName as a varchar field. The native Base entity provides a name field. During YAML generation, determine whether campaignName should be implemented as the native name field (relabeled) or as a separate custom field." },
    { label: "2. Unified status lifecycle (CR-RECON-DEC-001):", text: " All five status values are available regardless of channel. The Reactivation channel operationally uses a subset (Draft, Sent, Cancelled) but the system does not enforce channel-specific status restrictions. This simplifies the entity definition while allowing the full lifecycle for all channels." },
    { label: "3. Status transition enforcement:", text: " Valid transitions: Draft \u2192 Scheduled, Scheduled \u2192 Sent, Sent \u2192 Complete, Draft \u2192 Cancelled, Scheduled \u2192 Cancelled. No backward transitions. Enforced via workflow. Dual-mode operation means transitions may be triggered manually by the Client Recruiter or automatically by platform integration events." },
    { label: "4. Aggregate metrics workflow:", text: " Six aggregate metric fields are workflow-updated from Campaign Engagement records. The workflow fires when a Campaign Engagement record is created or updated, recalculating the relevant count on the parent Campaign. In manual mode, the Client Recruiter may enter these values directly." },
    { label: "5. Reactivation Campaign creation:", text: " Reactivation Campaigns are created through a single-action create-and-send workflow from the reactivation saved lists. The system pre-sets channel = Reactivation, population from the originating saved list, and sendDate at dispatch time. plannedSendDate may be set but is not operationally significant for Reactivation\u2019s immediate-send pattern." },
    { label: "6. Product name restriction:", text: " This document is a Level 2 Entity PRD. No specific CRM product names appear in this document." },
  ],
  openIssues: [],
  decisions: [
    ["MC-DEC-001", "Base entity type chosen. The primary purpose is metadata tracking and engagement aggregation, not calendar scheduling. Named Marketing Campaign to disambiguate from Fundraising Campaign."],
    ["MC-DEC-002", "Unified five-value status lifecycle for all channels (CR-RECON-DEC-001): Draft, Scheduled, Sent, Complete, Cancelled. No channel-dependent status restriction enforced at the entity level."],
    ["MC-DEC-003", "Three-value channel enum: Email, SMS, Reactivation. The Reactivation value was added by the CR-REACTIVATE Sub-Domain Overview to distinguish reactivation Campaigns from marketing Campaigns on the shared entity."],
    ["MC-DEC-004", "population field applicable only when channel = Reactivation. System-set from the originating saved list. Enables Reactivation-specific reporting without affecting Email and SMS Campaigns."],
    ["MC-DEC-005", "sendDate (from CR-REACTIVATE-OUTREACH) is distinct from actualSendDate (from CR-MARKETING-CAMPAIGNS). sendDate captures the dispatch timestamp for CRM-native reactivation sends; actualSendDate captures the send timestamp from the external marketing platform. Both are datetime fields applicable to different channel contexts."],
    ["MC-DEC-006", "No activity stream. Marketing Campaign is a high-volume operational record where activity stream overhead is not justified."],
    ["MC-DEC-007", "Six aggregate metric fields stored on the Campaign entity (totalRecipients through totalUnsubscribed). Workflow-updated from Campaign Engagement records. Supports dual-mode entry: automatic via workflow or manual via direct edit."],
  ],
};

// RENDERING ENGINE
const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,Header,Footer,AlignmentType,LevelFormat,HeadingLevel,BorderStyle,WidthType,ShadingType,PageBreak,TabStopType,TabStopPosition}=require("docx");const FONT="Arial";const SZ={body:22,small:20,xs:16,h1:32,h2:28,h3:24,meta:20};const COLORS={headerBg:"1F3864",headerText:"FFFFFF",altRowBg:"F2F7FB",borderColor:"AAAAAA",titleColor:"1F3864",idColor:"888888"};const border={style:BorderStyle.SINGLE,size:1,color:COLORS.borderColor};const borders={top:border,bottom:border,left:border,right:border};const cellMargins={top:60,bottom:60,left:100,right:100};const descMargins={top:40,bottom:80,left:100,right:100};const TABLE_WIDTH=9360;function r(t,o={}){return new TextRun({text:t,font:FONT,size:o.size||SZ.body,bold:o.bold||false,italics:o.italics||false,color:o.color})}function p(t,o={}){return new Paragraph({spacing:{after:o.after??120},alignment:o.align,children:Array.isArray(t)?t:[r(t,o)]})}function heading(t,l){return new Paragraph({heading:l,spacing:{before:l===HeadingLevel.HEADING_1?360:240,after:120},children:[r(t,{bold:true,size:l===HeadingLevel.HEADING_1?SZ.h1:l===HeadingLevel.HEADING_2?SZ.h2:SZ.h3,color:COLORS.titleColor})]})}function labeledParagraph(o){if(o.label)return p([r(o.label,{bold:true}),r(o.text)]);return p(o.text)}function labeledBullet(o){return new Paragraph({numbering:{reference:"bullets",level:0},spacing:{after:60},children:[r(o.label,{bold:true}),r(o.text)]})}function hdrCell(t,w){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:{fill:COLORS.headerBg,type:ShadingType.CLEAR},margins:cellMargins,children:[new Paragraph({children:[r(t,{bold:true,size:SZ.small,color:COLORS.headerText})]})]})}function dataCell(t,w,o={}){return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:o.shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:cellMargins,columnSpan:o.columnSpan,children:[new Paragraph({children:[r(t,{size:o.size||SZ.small,bold:o.bold,color:o.color,italics:o.italics})]})]})}const MC=[2800,6560];function metaTable(rows){return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:MC,rows:rows.map((row,i)=>new TableRow({children:[dataCell(row[0],MC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],MC[1],{shaded:i%2===1,size:SZ.small})]}))})}const NFC=[2200,1400,3000,2760];function nativeFieldTable(fields){const hdr=new TableRow({children:[hdrCell("Native Field",NFC[0]),hdrCell("Type",NFC[1]),hdrCell("PRD Name(s) / Mapping",NFC[2]),hdrCell("Referenced By",NFC[3])]});const rows=fields.map((f,i)=>new TableRow({children:[dataCell(f[0],NFC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(f[1],NFC[1],{shaded:i%2===1,size:SZ.small}),dataCell(f[2],NFC[2],{shaded:i%2===1,size:SZ.small}),dataCell(f[3],NFC[3],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:NFC,rows:[hdr,...rows]})}const FC=[2200,1100,800,2400,1000,1860];function buildDescRuns(d){return d.map(part=>{if(part.bold)return r(part.bold,{size:SZ.small,color:COLORS.idColor,bold:true});return r(part.text,{size:SZ.small,color:COLORS.idColor})})}function fieldTable(fields){const hdr=new TableRow({children:[hdrCell("Field Name",FC[0]),hdrCell("Type",FC[1]),hdrCell("Required",FC[2]),hdrCell("Values",FC[3]),hdrCell("Default",FC[4]),hdrCell("ID",FC[5])]});const rows=[hdr];fields.forEach((f,i)=>{const[name,type,required,values,defaultVal,id,descParts]=f;const shaded=i%2===1;rows.push(new TableRow({children:[dataCell(name,FC[0],{shaded,bold:true}),dataCell(type,FC[1],{shaded}),dataCell(required,FC[2],{shaded}),dataCell(values,FC[3],{shaded}),dataCell(defaultVal,FC[4],{shaded}),dataCell(id,FC[5],{shaded,size:SZ.xs,color:COLORS.idColor})]}));rows.push(new TableRow({children:[new TableCell({borders,width:{size:TABLE_WIDTH,type:WidthType.DXA},columnSpan:6,shading:shaded?{fill:COLORS.altRowBg,type:ShadingType.CLEAR}:undefined,margins:descMargins,children:[new Paragraph({children:buildDescRuns(descParts)})]})]}))});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:FC,rows})}const RLC=[2600,1800,1400,1700,1860];function relTable(rels){const hdr=new TableRow({children:[hdrCell("Relationship",RLC[0]),hdrCell("Related Entity",RLC[1]),hdrCell("Link Type",RLC[2]),hdrCell("PRD Reference",RLC[3]),hdrCell("Domain(s)",RLC[4])]});const rows=rels.map((rel,i)=>new TableRow({children:[dataCell(rel[0],RLC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(rel[1],RLC[1],{shaded:i%2===1,size:SZ.small}),dataCell(rel[2],RLC[2],{shaded:i%2===1,size:SZ.small}),dataCell(rel[3],RLC[3],{shaded:i%2===1,size:SZ.small}),dataCell(rel[4],RLC[4],{shaded:i%2===1,size:SZ.small})]}));return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:RLC,rows:[hdr,...rows]})}const TC=[1500,7860];function twoColTable(h1,h2,rows){const hdr=new TableRow({children:[hdrCell(h1,TC[0]),hdrCell(h2,TC[1])]});return new Table({width:{size:TABLE_WIDTH,type:WidthType.DXA},columnWidths:TC,rows:[hdr,...rows.map((row,i)=>new TableRow({children:[dataCell(row[0],TC[0],{shaded:i%2===1,bold:true,size:SZ.small}),dataCell(row[1],TC[1],{shaded:i%2===1,size:SZ.small})]}))]})}
function buildContent(){const c=[];const E=ENTITY;const O=E.overview;c.push(heading("1. Entity Overview",HeadingLevel.HEADING_1));const metaRows=[["CRM Entity Name",O.crmEntityName],["Native / Custom",O.nativeOrCustom],["Entity Type",O.entityType],["Display Label (Singular)",O.labelSingular],["Display Label (Plural)",O.labelPlural],["Activity Stream",O.activityStream],["Primary Domain",O.primaryDomain],["Contributing Domains",O.contributingDomains]];if(O.discriminatorField){metaRows.push(["Discriminator Field",O.discriminatorField]);metaRows.push(["Discriminator Values",O.discriminatorValues])}c.push(metaTable(metaRows));c.push(p(""));E.overviewText.forEach(t=>c.push(p(t)));if(E.overviewNotes&&E.overviewNotes.length>0)E.overviewNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("2. Native Fields",HeadingLevel.HEADING_1));c.push(p(E.nativeFieldsIntro));c.push(nativeFieldTable(E.nativeFields));c.push(p(""));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("3. Custom Fields",HeadingLevel.HEADING_1));c.push(p("Custom fields must be created via YAML program files. Fields are organized by functional group."));E.customFieldGroups.forEach(group=>{if(group.heading){const lvl=group.headingLevel===3?HeadingLevel.HEADING_3:HeadingLevel.HEADING_2;c.push(heading(group.heading,lvl))}if(group.intro)c.push(p(group.intro));if(group.fields&&group.fields.length>0){c.push(fieldTable(group.fields));c.push(p(""))}});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("4. Relationships",HeadingLevel.HEADING_1));c.push(p(E.relationshipsIntro));c.push(relTable(E.relationships));c.push(p(""));if(E.relationshipNotes)E.relationshipNotes.forEach(n=>c.push(labeledParagraph(n)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("5. Dynamic Logic Rules",HeadingLevel.HEADING_1));c.push(p(E.dynamicLogicIntro));if(E.dynamicLogicSections&&E.dynamicLogicSections.length>0)E.dynamicLogicSections.forEach(s=>{c.push(heading(s.heading,HeadingLevel.HEADING_2));s.paragraphs.forEach(para=>c.push(labeledParagraph(para)));if(s.bullets)s.bullets.forEach(b=>c.push(labeledBullet(b)))});c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("6. Layout Guidance",HeadingLevel.HEADING_1));c.push(p(E.layoutIntro));E.layoutPanels.forEach(panel=>{c.push(p([r(panel.name,{bold:true,color:COLORS.titleColor})]));c.push(p(panel.text))});c.push(heading("7. Implementation Notes",HeadingLevel.HEADING_1));E.implementationNotes.forEach(note=>c.push(labeledParagraph(note)));c.push(new Paragraph({children:[new PageBreak()]}));c.push(heading("8. Open Issues",HeadingLevel.HEADING_1));if(E.openIssues.length>0){c.push(twoColTable("ID","Issue",E.openIssues))}else{c.push(p("No open issues.",{italics:true}))}c.push(heading("9. Decisions Made",HeadingLevel.HEADING_1));c.push(twoColTable("ID","Decision",E.decisions));return c}
const content=buildContent();const doc=new Document({styles:{default:{document:{run:{font:FONT,size:SZ.body}}},paragraphStyles:[{id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h1,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:360,after:120},outlineLevel:0}},{id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h2,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:1}},{id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:SZ.h3,bold:true,font:FONT,color:COLORS.titleColor},paragraph:{spacing:{before:240,after:120},outlineLevel:2}}]},numbering:{config:[{reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},headers:{default:new Header({children:[new Paragraph({children:[r(ENTITY.orgName,{size:SZ.meta,bold:true,color:COLORS.titleColor}),new TextRun({children:["\t"],font:FONT}),r(`${ENTITY.entityName} Entity PRD`,{size:SZ.meta,color:COLORS.idColor})],tabStops:[{type:TabStopType.RIGHT,position:TabStopPosition.MAX}],spacing:{after:0},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:COLORS.headerBg,space:4}}})]})},footers:{default:new Footer({children:[new Paragraph({children:[r(`Entity PRD \u2014 ${ENTITY.entityName}`,{size:SZ.xs,color:COLORS.idColor})],alignment:AlignmentType.CENTER,spacing:{before:0}})]})},children:[p(ENTITY.orgName,{bold:true,size:20,color:COLORS.idColor,after:40}),p(`${ENTITY.entityName} Entity PRD`,{bold:true,size:40,color:COLORS.titleColor,after:200}),metaTable([["Document Type","Entity PRD"],["Entity",`${ENTITY.overview.crmEntityName} (${ENTITY.overview.nativeOrCustom} \u2014 ${ENTITY.overview.entityType} Type)`],["Implementation",ENTITY.orgName],["Version",ENTITY.version],["Status",ENTITY.status],["Last Updated",ENTITY.lastUpdated],["Source Documents",ENTITY.sourceDocuments]]),new Paragraph({children:[new PageBreak()]}),...content]}]});Packer.toBuffer(doc).then(buffer=>{fs.writeFileSync(ENTITY.outputFile,buffer);console.log(`Generated: ${ENTITY.outputFile}`)});
