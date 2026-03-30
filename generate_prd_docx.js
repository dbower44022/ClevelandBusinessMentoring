const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageNumber, Header, Footer, TableOfContents, PageBreak, BorderStyle,
  ShadingType, WidthType, Table, TableRow, TableCell, LevelFormat
} = require('docx');
const fs = require('fs');

const NAVY  = '1a237e';
const BLUE  = '1565C0';
const LGREY = 'F5F5F5';
const DGREY = '424242';
const MGREY = '9E9E9E';
const WHITE = 'FFFFFF';

function blankLine() {
  return new Paragraph({ children: [new TextRun('')], spacing: { after: 0 } });
}

function rule() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 1 } },
    spacing: { after: 120 }
  });
}

function placeholderBox(label) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: 'E8EAF6', type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 300, right: 300 },
        borders: {
          top:    { style: BorderStyle.SINGLE, size: 2, color: NAVY },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: NAVY },
          left:   { style: BorderStyle.SINGLE, size: 2, color: NAVY },
          right:  { style: BorderStyle.SINGLE, size: 2, color: NAVY },
        },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '[ PROCESS FLOW DIAGRAM ]', bold: true, font: 'Arial', size: 22, color: NAVY })
          ]}),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: label, font: 'Arial', size: 20, color: DGREY, italics: true })
          ]}),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'See accompanying draw.io file for full process diagram.', font: 'Arial', size: 18, color: MGREY })
          ]}),
        ]
      })]
    })]
  });
}

function buildStyles() {
  return {
    default: { document: { run: { font: 'Arial', size: 22, color: DGREY } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: NAVY },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 4 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: NAVY },
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: BLUE },
        paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, font: 'Arial', color: DGREY },
        paragraph: { spacing: { before: 160, after: 40 }, outlineLevel: 3 } },
      { id: 'FieldHeader', name: 'Field Header', basedOn: 'Normal', next: 'Normal',
        run: { size: 22, bold: true, font: 'Arial', color: '000000' },
        paragraph: { spacing: { before: 160, after: 0 } } },
      { id: 'FieldDesc', name: 'Field Desc', basedOn: 'Normal', next: 'Normal',
        run: { size: 20, font: 'Arial', color: DGREY },
        paragraph: { spacing: { before: 0, after: 100 }, indent: { left: 440 } } },
    ]
  };
}

function parseInline(text, baseOpts = {}) {
  const runs = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0, match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last)
      runs.push(new TextRun({ text: text.slice(last, match.index), font: 'Arial', size: 22, color: DGREY, ...baseOpts }));
    if (match[2]) runs.push(new TextRun({ text: match[2], bold: true, font: 'Arial', size: 22, color: DGREY, ...baseOpts }));
    else if (match[3]) runs.push(new TextRun({ text: match[3], italics: true, font: 'Arial', size: 22, color: DGREY, ...baseOpts }));
    else if (match[4]) runs.push(new TextRun({ text: match[4], font: 'Courier New', size: 20, color: '7B1FA2', ...baseOpts }));
    last = match.index + match[0].length;
  }
  if (last < text.length)
    runs.push(new TextRun({ text: text.slice(last), font: 'Arial', size: 22, color: DGREY, ...baseOpts }));
  if (runs.length === 0)
    runs.push(new TextRun({ text, font: 'Arial', size: 22, color: DGREY, ...baseOpts }));
  return runs;
}

function buildTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (line.match(/^\|[-| ]+\|$/)) continue;
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    const isHdr = rows.length === 0;
    const colW = Math.floor(9360 / Math.max(cells.length, 1));
    rows.push(new TableRow({
      tableHeader: isHdr,
      children: cells.map(cellText => new TableCell({
        width: { size: colW, type: WidthType.DXA },
        shading: { fill: isHdr ? NAVY : (rows.length % 2 === 0 ? LGREY : WHITE), type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        borders: {
          top:    { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          left:   { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          right:  { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
        },
        children: [new Paragraph({ children: [new TextRun({
          text: cellText, bold: isHdr, font: 'Arial', size: 20,
          color: isHdr ? WHITE : DGREY,
        })] })]
      }))
    }));
  }
  const colCount = rows[0]?.children?.length || 1;
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: Array(colCount).fill(Math.floor(9360 / colCount)),
    rows
  });
}

// Is this line the start of a "special" block (heading, list, table, blockquote, rule, code, field)?
function isSpecialLine(line) {
  if (!line || line.trim() === '') return true;
  if (line.match(/^---+$/)) return true;
  if (line.startsWith('#')) return true;
  if (line.startsWith('|')) return true;
  if (line.startsWith('> ')) return true;
  if (line.startsWith('> ')) return true;
  if (line.startsWith('```')) return true;
  if (line.match(/^[-*] /)) return true;
  if (line.match(/^\d+\. /)) return true;
  if (line.startsWith('**') && line.includes(' | ')) return true;
  if (line.trim().match(/^\*\*[^*]+\*\*$/) ) return true; // bold-only line = section label
  return false;
}

function convertPRD(mdPath, outPath, diagramMap = {}) {
  const md = fs.readFileSync(mdPath, 'utf8');
  const lines = md.split('\n');

  // Extract metadata
  const titleLines = [];
  let version = '', status = '', updated = '', domainCode = '';
  for (const line of lines.slice(0, 15)) {
    if (line.startsWith('# ') && !line.startsWith('## ')) titleLines.push(line.slice(2).trim());
    if (line.includes('**Version:**')) version = line.replace(/\*\*Version:\*\*/, '').trim();
    if (line.includes('**Status:**')) status = line.replace(/\*\*Status:\*\*/, '').trim();
    if (line.includes('**Last Updated:**')) updated = line.replace(/\*\*Last Updated:\*\*/, '').trim();
    if (line.includes('**Domain Code:**')) domainCode = line.replace(/\*\*Domain Code:\*\*/, '').trim();
  }

  const allParas = [];
  let i = 0;
  let lastProcessCode = '';
  let numRef = 0; // increments each time a new numbered list context starts

  while (i < lines.length) {
    const line = lines[i];

    // Track process codes from ### headings like "### MN-INTAKE — ..."
    const processMatch = line.match(/^### ([A-Z]{2}-[A-Z]+)/);
    if (processMatch) lastProcessCode = processMatch[1];

    // Blank line
    if (line.trim() === '') { allParas.push(blankLine()); i++; continue; }

    // Horizontal rule
    if (line.match(/^---+$/)) { allParas.push(rule()); i++; continue; }

    // Code block — skip entirely
    if (line.startsWith('```')) {
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) i++;
      i++; continue;
    }

    // Heading 1
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      allParas.push(new Paragraph({ heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.slice(2).trim(), font: 'Arial', size: 36, bold: true, color: NAVY })]
      })); i++; continue;
    }
    // Heading 2
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      allParas.push(new Paragraph({ heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: line.slice(3).trim(), font: 'Arial', size: 28, bold: true, color: NAVY })]
      })); i++; continue;
    }
    // Heading 3
    if (line.startsWith('### ') && !line.startsWith('#### ')) {
      const h3text = line.slice(4).trim();
      // Process section headings (e.g. "MN-INTAKE — Client Intake") get a page break before them
      const isProcessHeading = /^[A-Z]{2,4}-[A-Z]+/.test(h3text);
      if (isProcessHeading && allParas.length > 0) {
        allParas.push(new Paragraph({ children: [new PageBreak()] }));
      }
      allParas.push(new Paragraph({ heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text: h3text, font: 'Arial', size: 24, bold: true, color: BLUE })]
      })); i++; continue;
    }
    // Heading 4
    if (line.startsWith('#### ')) {
      allParas.push(new Paragraph({ heading: HeadingLevel.HEADING_4,
        children: [new TextRun({ text: line.slice(5).trim(), font: 'Arial', size: 22, bold: true, color: DGREY })]
      })); i++; continue;
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) { tableLines.push(lines[i]); i++; }
      try { allParas.push(buildTable(tableLines)); } catch(e) { console.error('Table error:', e.message); }
      allParas.push(blankLine()); continue;
    }

    // Blockquote — join all consecutive blockquote lines into one paragraph
    if (line.startsWith('> ')) {
      const descLines = [];
      while (i < lines.length && (lines[i].startsWith('> ') || lines[i] === '>')) {
        descLines.push(lines[i].replace(/^> ?/, '')); i++;
      }
      const combined = descLines.join(' ').replace(/\s+/g, ' ').trim();
      if (combined) allParas.push(new Paragraph({ style: 'FieldDesc', children: parseInline(combined) }));
      continue;
    }

    // Field definition: **Name** | Type | ...
    if (line.startsWith('**') && line.includes('**') && line.includes(' | ')) {
      const parts = line.split(' | ');
      const fieldName = parts[0].replace(/\*\*/g, '').trim();
      const meta = parts.slice(1).join(' | ').trim();
      allParas.push(new Paragraph({ style: 'FieldHeader', children: [
        new TextRun({ text: fieldName, bold: true, font: 'Arial', size: 22, color: '000000' }),
        new TextRun({ text: meta ? '  |  ' + meta : '', font: 'Arial', size: 20, color: MGREY }),
      ]})); i++; continue;
    }

    // Bold-only line = section label within a process (e.g. **Process Workflow**)
    if (line.trim().match(/^\*\*[^*]+\*\*$/) ) {
      const label = line.trim().replace(/\*\*/g, '');
      const isWorkflow = label === 'Process Workflow';

      allParas.push(new Paragraph({ children: [
        new TextRun({ text: label, bold: true, font: 'Arial', size: 22, color: DGREY })
      ], spacing: { before: 120, after: 60 }}));
      i++;

      if (isWorkflow) {
        const workflowNumRef = ++numRef; // unique ref for this workflow — restarts at 1
        // Collect all workflow content until next bold section label or heading
        const workflowParas = [];
        while (i < lines.length) {
          const wl = lines[i];
          if (wl.trim() === '') { workflowParas.push(blankLine()); i++; continue; }
          if (wl.trim().match(/^\*\*[^*]+\*\*$/) ) break; // next section label
          if (wl.startsWith('#')) break;
          if (wl.match(/^\d+\. /)) {
            workflowParas.push(new Paragraph({
              numbering: { reference: 'numbers_' + workflowNumRef, level: 0 },
              children: parseInline(wl.replace(/^\d+\. /, '').trim()),
              spacing: { before: 40, after: 40 }
            })); i++; continue;
          }
          if (wl.match(/^[-*] /)) {
            workflowParas.push(new Paragraph({
              bullet: { level: 0 },
              children: parseInline(wl.replace(/^[-*] /, '').trim()),
              spacing: { before: 40, after: 40 }
            })); i++; continue;
          }
          // Plain continuation line — join with next plain lines
          const plainLines = [];
          while (i < lines.length && !isSpecialLine(lines[i])) {
            plainLines.push(lines[i].trim()); i++;
          }
          const joined = plainLines.join(' ').replace(/\s+/g, ' ').trim();
          if (joined) workflowParas.push(new Paragraph({
            children: parseInline(joined),
            spacing: { before: 40, after: 80 }
          }));
        }
        allParas.push(...workflowParas);

        // Diagram placeholder
        const diagramLabel = diagramMap[lastProcessCode] ||
          (lastProcessCode ? lastProcessCode + ' Process Flow' : 'Process Flow Diagram');
        allParas.push(blankLine());
        allParas.push(placeholderBox(diagramLabel));
        allParas.push(blankLine());
      }
      continue;
    }

    // Bullet
    if (line.match(/^[-*] /)) {
      allParas.push(new Paragraph({
        bullet: { level: 0 },
        children: parseInline(line.replace(/^[-*] /, '').trim()),
        spacing: { before: 40, after: 40 }
      })); i++; continue;
    }

    // Numbered list
    if (line.match(/^\d+\. /)) {
      allParas.push(new Paragraph({
        numbering: { reference: 'numbers_' + (++numRef), level: 0 },
        children: parseInline(line.replace(/^\d+\. /, '').trim()),
        spacing: { before: 40, after: 40 }
      })); i++; continue;
    }

    // Plain paragraph — KEY FIX: join all consecutive plain lines into one paragraph
    const plainLines = [];
    while (i < lines.length && !isSpecialLine(lines[i])) {
      plainLines.push(lines[i].trim());
      i++;
    }
    const joined = plainLines.join(' ').replace(/\s+/g, ' ').trim();
    if (joined) allParas.push(new Paragraph({
      children: parseInline(joined),
      spacing: { before: 40, after: 80 }
    }));
  }

  // ── Title page ──────────────────────────────────────────────────────────────
  const titlePage = [
    new Paragraph({ children: [new TextRun('')], spacing: { before: 1440 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: 'Cleveland Business Mentors', font: 'Arial', size: 52, bold: true, color: NAVY })
    ]}),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: NAVY, space: 8 } },
      children: [new TextRun({ text: '' })]
    }),
    new Paragraph({ children: [new TextRun('')], spacing: { before: 240 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: titleLines[1] || titleLines[0] || 'PRD', font: 'Arial', size: 40, bold: true, color: DGREY })
    ]}),
    new Paragraph({ children: [new TextRun('')], spacing: { before: 720 } }),
    ...[
      ['Version', version],
      ['Status', status],
      ['Last Updated', updated],
      domainCode ? ['Domain Code', domainCode] : null,
    ].filter(Boolean).map(([label, val]) => new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60 },
      children: [
        new TextRun({ text: label + ':  ', bold: true, font: 'Arial', size: 22, color: DGREY }),
        new TextRun({ text: val, font: 'Arial', size: 22, color: DGREY }),
      ]
    })),
    new Paragraph({ children: [new TextRun('')], spacing: { before: 720 } }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: 'Generated from source files in the CBM CRM implementation repository.',
        font: 'Arial', size: 18, color: MGREY, italics: true })
    ]}),
    new Paragraph({ children: [new PageBreak()] }),
  ];

  const tocPage = [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [
      new TextRun({ text: 'Table of Contents', font: 'Arial', size: 36, bold: true, color: NAVY })
    ]}),
    new TableOfContents('Table of Contents', {
      hyperlink: true, headingStyleRange: '1-4',
      stylesWithLevels: [
        { styleName: 'Heading 1', level: 1 },
        { styleName: 'Heading 2', level: 2 },
        { styleName: 'Heading 3', level: 3 },
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];

  const docSubtitle = titleLines[1] || titleLines[0] || 'PRD';

  const doc = new Document({
    styles: buildStyles(),
    numbering: { config: Array.from({length: 50}, (_, idx) => ({
      reference: 'numbers_' + idx,
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 440, hanging: 220 } } } }]
    }))},
    sections: [{
      properties: { page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }},
      headers: { default: new Header({ children: [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY, space: 4 } },
          children: [
            new TextRun({ text: 'Cleveland Business Mentors  —  ', font: 'Arial', size: 18, color: MGREY }),
            new TextRun({ text: docSubtitle, font: 'Arial', size: 18, bold: true, color: NAVY }),
          ]
        })
      ]})},
      footers: { default: new Footer({ children: [
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: NAVY, space: 4 } },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: 'Page ', font: 'Arial', size: 18, color: MGREY }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: MGREY }),
            new TextRun({ text: ' of ', font: 'Arial', size: 18, color: MGREY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 18, color: MGREY }),
          ]
        })
      ]})},
      children: [...titlePage, ...tocPage, ...allParas]
    }]
  });

  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    console.log('Written: ' + path.basename(outPath));
  }).catch(e => console.error('Error writing ' + outPath + ':', e.message));
}

// ── Generate all documents ────────────────────────────────────────────────────

const BASE = '/home/claude/CBM/PRDs';
const OUT  = '/home/claude/docx_output';
fs.mkdirSync(OUT, { recursive: true });
const path = require('path');

// Master PRD
convertPRD(BASE + '/CBM-Master-PRD.md', OUT + '/CBM-Master-PRD.docx', {});

// Mentoring Domain PRD — diagram map by process code
convertPRD(BASE + '/CBM-Domain-PRD-Mentoring.md', OUT + '/CBM-Domain-PRD-Mentoring.docx', {
  'MN-INTAKE':   'Client Intake (MN-INTAKE) — Sections 4.1',
  'MN-MATCH':    'Mentor Matching (MN-MATCH) — Section 4.2',
  'MN-ENGAGE':   'Engagement Management (MN-ENGAGE) — Section 4.3',
  'MN-INACTIVE': 'Inactivity Monitoring (MN-INACTIVE) — Section 4.5',
  'MN-SURVEY':   'Client Satisfaction Tracking (MN-SURVEY) — Section 4.4',
  'MN-CLOSE':    'Engagement Closure (MN-CLOSE) — Section 4.6',
});

// Mentor Recruitment Domain PRD
convertPRD(BASE + '/CBM-Domain-PRD-MentorRecruitment.md', OUT + '/CBM-Domain-PRD-MentorRecruitment.docx', {
  'MR-RECRUIT': 'Mentor Recruitment (MR-RECRUIT)',
  'MR-APPLY':   'Mentor Application (MR-APPLY)',
  'MR-ONBOARD': 'Mentor Onboarding (MR-ONBOARD)',
  'MR-MANAGE':  'Mentor Management (MR-MANAGE)',
  'MR-DEPART':  'Mentor Departure and Reactivation (MR-DEPART)',
});

// Client Recruiting Domain PRD
convertPRD(BASE + '/CBM-Domain-PRD-ClientRecruiting.md', OUT + '/CBM-Domain-PRD-ClientRecruiting.docx', {
  'CR-OUTREACH': 'Client Outreach and Marketing (CR-OUTREACH)',
  'CR-PARTNER':  'Partner Relationship Management (CR-PARTNER)',
  'CR-EVENTS':   'Workshop and Event Management (CR-EVENTS)',
});

// Fundraising Domain PRD
convertPRD(BASE + '/CBM-Domain-PRD-Fundraising.md', OUT + '/CBM-Domain-PRD-Fundraising.docx', {
  'FU-PROSPECT': 'Donor and Sponsor Prospecting (FU-PROSPECT)',
  'FU-RECORD':   'Contribution Recording (FU-RECORD)',
  'FU-STEWARD':  'Donor and Sponsor Stewardship (FU-STEWARD)',
  'FU-REPORT':   'Fundraising Reporting (FU-REPORT)',
});

// Consolidated Design
convertPRD(BASE + '/CBM-Consolidated-Design.md', OUT + '/CBM-Consolidated-Design.docx', {});
