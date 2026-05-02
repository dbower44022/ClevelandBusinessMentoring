// CBM Test Instance Deployment Record Generator
// Produces: CBM-Test-Instance-Deployment-Record.docx (v1.0)
//
// A reference / record document capturing the as-deployed state of the
// CBM EspoCRM Test instance at crm-test.clevelandbusinessmentors.org.
// Supplements (does not replace) the live system as the source of truth;
// values here are accurate as of Last Updated and should be re-verified
// against the live system before relying on them for operational work.

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType,
} = require("docx");

// ---------- Style constants (per CBM PRD output standards) ----------

const HEADER_FILL = "1F3864";   // navy
const HEADER_TEXT = "FFFFFF";   // white
const ALT_ROW_FILL = "F2F7FB";  // light blue tint
const META_LABEL_FILL = "F2F7FB";
const BORDER_COLOR = "AAAAAA";

const border = { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR };
const cellBorders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// ---------- Helpers ----------

function cell(text, opts = {}) {
  const {
    bold = false, italic = false, fill = null, color = null,
    width = null, children = null, alignment = null,
  } = opts;
  const runOpts = { text: String(text), bold, italic, font: "Arial" };
  if (color) runOpts.color = color;
  const para = { children: [new TextRun(runOpts)] };
  if (alignment) para.alignment = alignment;
  const cellChildren = children ? children : [new Paragraph(para)];
  const cellDef = { borders: cellBorders, margins: cellMargins, children: cellChildren };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function headerCell(text, width) {
  return cell(text, {
    bold: true, fill: HEADER_FILL, color: HEADER_TEXT, width,
  });
}

function labelCell(text, width) {
  return cell(text, { bold: true, fill: META_LABEL_FILL, width });
}

function multiCell(textArr, opts = {}) {
  const { width = null, fill = null, bold = false } = opts;
  const childs = textArr.map((t) =>
    new Paragraph({ children: [new TextRun({ text: t, bold, font: "Arial" })] })
  );
  const cellDef = { borders: cellBorders, margins: cellMargins, children: childs };
  if (width) cellDef.width = { size: width, type: WidthType.DXA };
  if (fill) cellDef.shading = { fill, type: ShadingType.CLEAR };
  return new TableCell(cellDef);
}

function para(text, opts = {}) {
  const { bold = false, italic = false, heading = null, spacing = null } = opts;
  const paraDef = {
    children: [new TextRun({ text: String(text), bold, italic, font: "Arial" })],
  };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  return new Paragraph(paraDef);
}

function richPara(runs, opts = {}) {
  const { heading = null, spacing = null } = opts;
  const paraDef = {
    children: runs.map((r) => new TextRun({
      text: r.text,
      bold: r.bold || false,
      italic: r.italic || false,
      font: "Arial",
    })),
  };
  if (heading) paraDef.heading = heading;
  if (spacing) paraDef.spacing = spacing;
  return new Paragraph(paraDef);
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Arial" })],
  });
}

function blank() {
  return new Paragraph({ children: [new TextRun({ text: "", font: "Arial" })] });
}

// Striped table builder: header row + data rows with alternating shading.
function stripedTable({ columnWidths, headers, rows }) {
  const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    children: headers.map((h, i) => headerCell(h, columnWidths[i])),
    tableHeader: true,
  });
  const dataRows = rows.map((row, rowIdx) => {
    const fill = rowIdx % 2 === 0 ? null : ALT_ROW_FILL;
    return new TableRow({
      children: row.map((val, i) => cell(val, {
        width: columnWidths[i],
        fill,
      })),
    });
  });
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths,
    rows: [headerRow, ...dataRows],
  });
}

// ---------- Document content ----------

const children = [];

// ==============================
// Title block
// ==============================
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({
    text: "Cleveland Business Mentors", bold: true, size: 32,
    color: HEADER_FILL, font: "Arial",
  })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 240 },
  children: [new TextRun({
    text: "EspoCRM Test Instance \u2014 Deployment Record",
    bold: true, size: 28, color: HEADER_FILL, font: "Arial",
  })],
}));

// ==============================
// Metadata table
// ==============================
const metaTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2600, 6760],
  rows: [
    new TableRow({ children: [labelCell("Document Type", 2600),
      cell("Deployment Record (operational reference)", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Subject Instance", 2600),
      cell("CBM EspoCRM Test Instance (CBMTEST)", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Implementation", 2600),
      cell("Cleveland Business Mentors", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Version", 2600),
      cell("1.2", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Status", 2600),
      cell("Active \u2014 reflects live system as of Last Updated", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Last Updated", 2600),
      cell("05-02-26 05:45", { width: 6760 })] }),
    new TableRow({ children: [labelCell("Source of Truth", 2600), multiCell([
      "The running server is the authoritative source for current state.",
      "This document captures values verified at Last Updated and may drift over time.",
      "Re-verify against the live system before relying on these values for operational work.",
    ], { width: 6760 })] }),
  ],
});
children.push(metaTable);
children.push(blank());

// ==============================
// Revision History
// ==============================
children.push(para("Revision History", { heading: HeadingLevel.HEADING_1 }));
children.push(stripedTable({
  columnWidths: [800, 1500, 7060],
  headers: ["Version", "Date", "Notes"],
  rows: [
    ["1.2", "05-02-26 05:45",
      "Added the DigitalOcean Droplet ID, the Droplet detail page URL, "
      + "and the in-browser Console URL to Section 3.1 (Droplet "
      + "Identification). Both URLs derive from the numeric Droplet ID; "
      + "supplying the URLs directly removes the need for an operator to "
      + "browse the DO Droplets list to locate this server. No other "
      + "content changes."],
    ["1.1", "05-02-26 05:30",
      "Added MariaDB and nginx version numbers to Section 6 (EspoCRM "
      + "Application). Both retrieved from the running containers via SSH "
      + "for consistency with the EspoCRM version already captured. No "
      + "other content changes."],
    ["1.0", "05-02-26 04:45",
      "Initial release. Reconstructed from on-server inspection (SSH diagnostic), "
      + "live SSL certificate inspection, and DigitalOcean dashboard. The original "
      + "deploy on 2026-03-28 predates the InstanceDeployConfig schema in the local "
      + "CRM Builder database (migration _client_v9 applied 2026-05-02), so no "
      + "in-app deployment audit row exists; the live server was the authoritative "
      + "source for all values captured here."],
  ],
}));
children.push(blank());

// ==============================
// 1. Document Purpose & Scope
// ==============================
children.push(para("1. Document Purpose and Scope", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "This document captures the as-deployed state of the Cleveland Business "
  + "Mentors EspoCRM Test instance hosted at "
  + "crm-test.clevelandbusinessmentors.org. Its purpose is to provide a "
  + "single durable record of what was deployed, when, on what infrastructure, "
  + "with what configuration, and which credentials govern access \u2014 "
  + "without duplicating credential values that belong in the password "
  + "manager. The document supports day-to-day operations, future upgrades, "
  + "disaster recovery, and onboarding of any additional administrators."
));

children.push(para(
  "The document covers the Test instance only. A separate Deployment Record "
  + "will be created for the Production instance when it is deployed; both "
  + "records will live alongside one another in PRDs/deployment/."
));

children.push(para("Scope includes:"));
children.push(bullet("The deployed EspoCRM application instance \u2014 version, container set, install location, application URL"));
children.push(bullet("The DigitalOcean Droplet hosting the application \u2014 region, size, OS, hardware, swap, firewall"));
children.push(bullet("The domain and DNS configuration that routes traffic to the Droplet"));
children.push(bullet("The TLS certificate and its renewal arrangement"));
children.push(bullet("SSH access to the server, including authorized keys"));
children.push(bullet("The credentials inventory \u2014 by reference to Proton Pass entry names; never by value"));
children.push(bullet("Deployment and operational history \u2014 events that have occurred against this instance"));
children.push(bullet("Open items relating to this instance"));

children.push(para("Scope does not include:"));
children.push(bullet("The CRM Builder application itself \u2014 covered by the crmbuilder repository's product PRDs"));
children.push(bullet("YAML configuration that has been applied to this instance \u2014 covered by the YAML program files in programs/ and the ConfigurationRun audit in the per-client database"));
children.push(bullet("Generic deployment instructions for any new client \u2014 covered by the CRM Builder Deployment Runbook (see Section 11)"));
children.push(bullet("Credential values \u2014 stored exclusively in Proton Pass; this document references entries by name only"));

children.push(blank());

// ==============================
// 2. Deployment Summary
// ==============================
children.push(para("2. Deployment Summary", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "At-a-glance summary of the deployed instance. Each value is detailed in "
  + "subsequent sections."
));

children.push(stripedTable({
  columnWidths: [3000, 6360],
  headers: ["Field", "Value"],
  rows: [
    ["Instance name and code", "CBMTEST"],
    ["Environment", "Test"],
    ["Application URL", "https://crm-test.clevelandbusinessmentors.org/"],
    ["Public IPv4", "104.131.45.208"],
    ["Hostname", "CBM-TEST"],
    ["Hosting provider", "DigitalOcean"],
    ["Region", "NYC3"],
    ["Droplet size", "2 vCPU / 4 GB RAM / 80 GB SSD"],
    ["Operating system", "Ubuntu 22.04.5 LTS (jammy)"],
    ["EspoCRM version", "9.3.4"],
    ["TLS certificate", "Let's Encrypt; expires 2026-06-26; auto-renews nightly"],
    ["Initial deploy date", "2026-03-28"],
    ["Initial deploy completed", "2026-03-28 21:35:23 UTC"],
    ["Deploy method", "CRM Builder application (self-hosted scenario)"],
    ["Status", "Active and operational"],
  ],
}));
children.push(blank());

// ==============================
// 3. DigitalOcean Droplet
// ==============================
children.push(para("3. DigitalOcean Droplet", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "The instance runs on a single DigitalOcean Droplet provisioned manually "
  + "in the DigitalOcean control panel before the CRM Builder Setup Wizard "
  + "was run against it. The CRM Builder application does not provision "
  + "Droplets; it requires that the Droplet exist and be reachable by SSH "
  + "before deployment begins."
));

children.push(para("3.1 Droplet Identification", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Provider", "DigitalOcean"],
    ["Account", "Referenced in Proton Pass entry: DigitalOcean-CRM Hosting - Test Instance"],
    ["Region", "NYC3"],
    ["Hostname (server-side)", "CBM-TEST"],
    ["Public IPv4", "104.131.45.208"],
    ["Droplet ID", "561480073"],
    ["Droplet detail page", "https://cloud.digitalocean.com/droplets/561480073"],
    ["In-browser Console", "https://cloud.digitalocean.com/droplets/561480073/console"],
  ],
}));
children.push(blank());

children.push(para("3.2 Hardware and Image", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Image at provisioning", "Ubuntu 22.04 LTS x64 (clean image; no one-click app)"],
    ["Current OS", "Ubuntu 22.04.5 LTS (jammy)"],
    ["Kernel", "5.15.0-171-generic"],
    ["CPU", "2 vCPU"],
    ["Memory", "3.8 GiB"],
    ["Disk", "78 GB (root filesystem on /dev/vda1)"],
    ["Swap", "2 GB swapfile (/swapfile)"],
  ],
}));
children.push(blank());

children.push(para("3.3 Firewall (ufw)", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "ufw is active and configured to allow inbound traffic on the three ports "
  + "required for the EspoCRM stack: 22 (SSH), 80 (HTTP, used for the "
  + "Let's Encrypt HTTP-01 challenge and HTTP-to-HTTPS redirect), and 443 "
  + "(HTTPS, the application's primary listener). Both IPv4 and IPv6 rules "
  + "are present for each port. All other inbound traffic is denied by default."
));

children.push(para("3.4 Backups", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "DigitalOcean automated backups are not currently enabled for this Droplet. "
  + "This is acceptable for a test instance but should be reviewed before "
  + "production-grade data accumulates. Enabling weekly DigitalOcean backups "
  + "adds approximately 20% to the Droplet's monthly cost. See Section 11 "
  + "Open Items."
));

children.push(blank());

// ==============================
// 4. Domain & DNS
// ==============================
children.push(para("4. Domain and DNS", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "The instance is reachable at the subdomain crm-test of the organization's "
  + "primary domain. The crm-test subdomain is reserved by convention for the "
  + "test environment; production will use the bare crm subdomain."
));

children.push(para("4.1 Domain and Registrar", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Primary domain", "clevelandbusinessmentors.org"],
    ["Domain registrar", "Porkbun"],
    ["DNS provider", "Porkbun (default \u2014 Porkbun nameservers)"],
    ["Subdomain for this instance", "crm-test"],
    ["Production subdomain (reserved)", "crm (will host the future Production instance)"],
  ],
}));
children.push(blank());

children.push(para("4.2 A Record", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Record type", "A"],
    ["Host", "crm-test"],
    ["Target", "104.131.45.208 (Droplet public IPv4)"],
    ["TTL", "Default for Porkbun (verify in registrar dashboard if precision needed)"],
    ["Proxy / CDN", "None \u2014 direct A record"],
  ],
}));
children.push(blank());

children.push(para(
  "DNS resolution was confirmed at Last Updated. The A record must remain "
  + "in place for the application to be reachable and for Let's Encrypt "
  + "certificate renewals to succeed."
));

children.push(blank());

// ==============================
// 5. TLS Certificate
// ==============================
children.push(para("5. TLS Certificate", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "All traffic to the application is served over HTTPS. The certificate is "
  + "issued by Let's Encrypt and renewed automatically by a cron job inside "
  + "the EspoCRM stack. There is no manual certificate management."
));

children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value (verified at Last Updated)"],
  rows: [
    ["Issuer", "Let's Encrypt (CN=E7, O=Let's Encrypt, C=US)"],
    ["Subject", "CN=crm-test.clevelandbusinessmentors.org"],
    ["Issued", "2026-03-28 20:35:38 UTC"],
    ["Expires", "2026-06-26 20:35:37 UTC"],
    ["SHA-256 fingerprint", "27:DB:E6:01:1B:37:83:FC:1F:4D:BB:B5:B3:BD:BE:FF:7A:0A:52:83:98:74:6E:E6:02:CA:22:F0:9E:85:77:72"],
    ["Renewal mechanism", "Crontab on the host runs /var/www/espocrm/command.sh cert-renew daily at 01:00 UTC; output appended to /var/www/espocrm/data/letsencrypt/renew.log"],
    ["Renewal frequency check", "Daily; Let's Encrypt issues a fresh certificate when the existing one is within 30 days of expiry"],
  ],
}));
children.push(blank());

children.push(para("5.1 Renewal Failure Handling", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "If certificate renewal fails the application will continue to serve the "
  + "existing certificate until expiry. To diagnose, SSH to the server and "
  + "inspect /var/www/espocrm/data/letsencrypt/renew.log for the most recent "
  + "renewal attempt. Common causes are: an A-record change pointing the "
  + "domain elsewhere (Let's Encrypt cannot complete the HTTP-01 challenge), "
  + "ufw blocking port 80 inbound, or a Cloudflare-style proxy intercepting "
  + "the challenge. Manual renewal can be triggered by running the command "
  + "in the crontab line directly."
));

children.push(blank());

// ==============================
// 6. EspoCRM Application
// ==============================
children.push(para("6. EspoCRM Application", { heading: HeadingLevel.HEADING_1 }));

children.push(para("6.1 Application Identification", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Application name", "EspoCRM"],
    ["Version", "9.3.4"],
    ["Application URL", "https://crm-test.clevelandbusinessmentors.org/"],
    ["Admin user (default)", "admin"],
    ["Admin password", "Referenced in Proton Pass entry: CBM-ESPOCRM-Test Instance Admin"],
  ],
}));
children.push(blank());

children.push(para("6.2 Install Method", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The application was installed via the official EspoCRM installer "
  + "(install.sh from github.com/espocrm/espocrm-installer/releases/latest), "
  + "invoked with the SSL and Let's Encrypt flags. The installer file remains "
  + "at /root/install.sh on the server (size 27,289 bytes; modification time "
  + "Feb 6 \u2014 the date of that installer release). The installer set up "
  + "the full Docker-based stack and obtained the initial Let's Encrypt "
  + "certificate in a single run."
));

children.push(para("6.3 Container Stack", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The application runs as a five-container Docker Compose stack defined in "
  + "/var/www/espocrm/docker-compose.yml. All containers were created on "
  + "2026-03-28 between 21:34:21 and 21:35:23 UTC and have been running "
  + "continuously since."
));

children.push(stripedTable({
  columnWidths: [2200, 2400, 4760],
  headers: ["Container", "Image", "Role"],
  rows: [
    ["espocrm", "espocrm/espocrm:fpm", "PHP-FPM application server (port 9000)"],
    ["espocrm-daemon", "espocrm/espocrm:fpm", "Background daemon for EspoCRM scheduled jobs"],
    ["espocrm-db", "mariadb:latest (12.2.2)", "MariaDB database (port 3306, healthy)"],
    ["espocrm-nginx", "nginx (1.29.7)", "Public-facing web server, listening on 80/443 (IPv4 and IPv6)"],
    ["espocrm-websocket", "espocrm/espocrm:fpm", "WebSocket server (port 8080, IPv4 and IPv6)"],
  ],
}));
children.push(blank());

children.push(para("6.4 Install Location", { heading: HeadingLevel.HEADING_2 }));
children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Base path", "/var/www/espocrm"],
    ["Docker Compose file", "/var/www/espocrm/docker-compose.yml"],
    ["Application data", "/var/www/espocrm/data/"],
    ["Let's Encrypt artifacts", "/var/www/espocrm/data/letsencrypt/ (managed inside the stack)"],
    ["Installer command file", "/var/www/espocrm/command.sh (used by the renewal cron job)"],
    ["Install completed", "2026-03-28 21:35:23 UTC"],
  ],
}));
children.push(blank());

children.push(para("6.5 Database", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The application database is MariaDB, running in the espocrm-db container "
  + "and reporting healthy at Last Updated. The MariaDB root password lives "
  + "only in the running container's environment variables; it has been "
  + "extracted and stored in Proton Pass as a recovery measure. The database "
  + "is not exposed outside the Docker network."
));

children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Engine", "MariaDB"],
    ["Version", "12.2.2"],
    ["Image", "mariadb:latest"],
    ["Container", "espocrm-db"],
    ["Network exposure", "Internal Docker network only; not bound to host port"],
    ["MariaDB root password", "Referenced in Proton Pass entry: ESPOCRM Root DB Password - Test Instance"],
  ],
}));

children.push(blank());

// ==============================
// 7. SSH Access
// ==============================
children.push(para("7. SSH Access", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "Server administration is performed via SSH. Access is restricted to "
  + "key-based authentication for the root user only; password SSH is not "
  + "supported by the deployment toolchain."
));

children.push(stripedTable({
  columnWidths: [2600, 6760],
  headers: ["Field", "Value"],
  rows: [
    ["Allowed user", "root"],
    ["Authentication", "Key-based only (ED25519)"],
    ["Authorized key comment", "crm-deploy"],
    ["Public key fingerprint", "SHA256:v1HwnquAQ40MRhGJSyMsgUxFnyCar6ddO+0Sg+KDgf0"],
    ["Key location", "Repository root: ssh (private), ssh.pub (public) in dbower44022/ClevelandBusinessMentoring"],
    ["Connection example", "ssh -i /path/to/ssh root@crm-test.clevelandbusinessmentors.org"],
  ],
}));
children.push(blank());

children.push(para("7.1 Adding an Additional Authorized Key", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "To grant SSH access to an additional administrator without sharing the "
  + "existing private key, append their public key to the server's authorized "
  + "keys file:"
));
children.push(bullet("SSH to the server using the existing crm-deploy key"));
children.push(bullet("Edit /root/.ssh/authorized_keys and append the new public key on its own line"));
children.push(bullet("Verify by having the new administrator connect with their key from a separate session before closing the original session"));

children.push(blank());

// ==============================
// 8. Credentials Inventory
// ==============================
children.push(para("8. Credentials Inventory", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "All credential values for this instance are stored exclusively in CBM's "
  + "Proton Pass vault. This document references each entry by its exact "
  + "name; no credential value appears in this document and none should ever "
  + "be added to this document or to the repository in any form."
));

children.push(stripedTable({
  columnWidths: [3000, 3500, 2860],
  headers: ["Credential", "Proton Pass Entry Name", "Used For"],
  rows: [
    ["EspoCRM admin password", "CBM-ESPOCRM-Test Instance Admin", "Web UI and REST API access as admin user"],
    ["MariaDB root password", "ESPOCRM Root DB Password - Test Instance", "Database administrative access; recovery and direct SQL operations"],
    ["DigitalOcean account login", "DigitalOcean-CRM Hosting - Test Instance", "Droplet management, billing, DNS (if delegated to DO), Console access"],
  ],
}));
children.push(blank());

children.push(para(
  "The SSH private key for the crm-deploy account is currently held in the "
  + "ClevelandBusinessMentoring repository alongside its public counterpart. "
  + "It is not stored in Proton Pass at this time. See Section 11 Open Items."
));

children.push(blank());

// ==============================
// 9. Deployment History
// ==============================
children.push(para("9. Deployment History", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "Chronological log of deployment-relevant events against this instance. "
  + "Future re-deploys, version upgrades, recovery operations, and other "
  + "significant lifecycle events should be appended here."
));

children.push(stripedTable({
  columnWidths: [1700, 2200, 5460],
  headers: ["Date (UTC)", "Event", "Notes"],
  rows: [
    ["2026-03-28 17:51:44", "Droplet provisioned and booted", "DigitalOcean NYC3 region; Ubuntu 22.04 LTS x64 base image; manual provisioning by Doug Bower in the DigitalOcean control panel"],
    ["2026-03-28 20:35:38", "TLS certificate issued", "Let's Encrypt issued the initial certificate as part of the EspoCRM installer's --letsencrypt step"],
    ["2026-03-28 21:33:52", "EspoCRM stack created", "Installer-driven creation of /var/www/espocrm/ directory structure"],
    ["2026-03-28 21:35:23", "EspoCRM stack online", "All five Docker containers running; deploy considered complete"],
    ["2026-04-13 17:48:08", "Instance row created in CRM Builder DB", "Manual addition via the CRM Builder application's instance management UI; not associated with a re-deploy"],
    ["2026-05-02 04:45", "Deployment Record v1.0 produced", "This document; values reconstructed from on-server inspection because the InstanceDeployConfig schema (migration _client_v9) had not yet been applied at the time of the original deploy"],
    ["2026-05-02 (same day)", "MariaDB root password captured", "Extracted from the running espocrm-db container's environment and stored in Proton Pass"],
  ],
}));

children.push(blank());

// ==============================
// 10. Operational Notes
// ==============================
children.push(para("10. Operational Notes", { heading: HeadingLevel.HEADING_1 }));

children.push(para("10.1 Reaching the Server", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "SSH using the crm-deploy private key is the primary access path. The "
  + "DigitalOcean in-browser Console (linked in Section 3.1) is the "
  + "documented fallback when SSH is unreachable for any reason \u2014 "
  + "for example after a firewall misconfiguration that blocks port 22, "
  + "or while diagnosing a network-layer issue from outside the server."
));

children.push(para("10.2 Inspecting the Stack", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "The following commands, run as root on the server, give a quick view of "
  + "stack health. They are read-only:"
));
children.push(bullet("docker compose -f /var/www/espocrm/docker-compose.yml ps \u2014 list all containers and their status"));
children.push(bullet("docker logs espocrm --tail 100 \u2014 recent application server log lines"));
children.push(bullet("docker logs espocrm-nginx --tail 100 \u2014 recent web server log lines"));
children.push(bullet("docker logs espocrm-db --tail 100 \u2014 recent database log lines"));
children.push(bullet("crontab -l \u2014 confirm the certificate renewal job is configured"));
children.push(bullet("tail /var/www/espocrm/data/letsencrypt/renew.log \u2014 most recent renewal attempts"));

children.push(para("10.3 Application Configuration", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "YAML configuration applied to this instance is tracked in the "
  + "ConfigurationRun table in the per-client CRM Builder database "
  + "(.crmbuilder/CBM.db inside the local CBM project folder). At Last "
  + "Updated, eleven ConfigurationRun rows are present \u2014 representing "
  + "the FU domain Phase 9 work performed against this instance on 2026-05-01. "
  + "This document does not enumerate the YAML configuration; consult the "
  + "ConfigurationRun rows or programs/ in the CBM repository for that detail."
));

children.push(para("10.4 Decommissioning", { heading: HeadingLevel.HEADING_2 }));
children.push(para(
  "When this test instance is no longer needed, decommissioning involves: "
  + "destroying the DigitalOcean Droplet (which deletes the application, "
  + "database, certificates, and all data); removing the crm-test A record "
  + "from Porkbun; deleting the Instance row from the CRM Builder per-client "
  + "database; and archiving the relevant Proton Pass entries. This Deployment "
  + "Record should be retained as a historical record and updated with a "
  + "decommissioning entry in Section 9."
));

children.push(blank());

// ==============================
// 11. Open Items
// ==============================
children.push(para("11. Open Items", { heading: HeadingLevel.HEADING_1 }));

children.push(para(
  "Items relating to this instance that are tracked here for visibility "
  + "rather than buried in a project tracker."
));

children.push(stripedTable({
  columnWidths: [800, 3000, 5560],
  headers: ["ID", "Item", "Status / Plan"],
  rows: [
    ["DR-OI-001", "DigitalOcean automated backups not enabled",
      "Acceptable for a test instance. Review before any production-grade "
      + "data accumulates. Decision: defer until production deploy at minimum."],
    ["DR-OI-002", "SSH private key stored in Git repository alongside public counterpart",
      "Flagged for security review. Set aside per current direction. When "
      + "addressed, the recommended path is: move the private key to Proton "
      + "Pass as a secure attachment, scrub the key from git history, "
      + "rotate the keypair on the server, and update authorized_keys."],
    ["DR-OI-003", "No InstanceDeployConfig row in local CRM Builder database",
      "The original deploy on 2026-03-28 predated migration _client_v9, "
      + "so the table was unavailable to receive the persistence write. "
      + "The on-server state is fully captured in this document; no operational "
      + "impact. If desired, an InstanceDeployConfig row can be backfilled "
      + "via the application's connection_config_dialog backfill flow."],
    ["DR-OI-004", "Deployment Runbook (generic) not yet authored",
      "Companion document to this one. Will live at "
      + "crmbuilder/PRDs/product/crmbuilder-automation-PRD/deployment-runbook.docx. "
      + "Authoring is the second deliverable in the deployment-record work track."],
  ],
}));

children.push(blank());

// ==============================
// Change Log
// ==============================
children.push(para("Change Log", { heading: HeadingLevel.HEADING_1 }));
children.push(stripedTable({
  columnWidths: [800, 1500, 7060],
  headers: ["Version", "Date", "Changes"],
  rows: [
    ["1.2", "05-02-26 05:45",
      "Added three rows to Section 3.1 (Droplet Identification): Droplet "
      + "ID (561480073), Droplet detail page URL, and in-browser Console "
      + "URL. The two URLs are derivable from the Droplet ID but supplying "
      + "them directly removes the need for an operator to browse the DO "
      + "Droplets list. Section 10.1 (Reaching the Server) updated to "
      + "reference the new Console URL by Section 3.1 link rather than "
      + "describing the Console abstractly. Metadata Last Updated bumped "
      + "to 05-02-26 05:45."],
    ["1.1", "05-02-26 05:30",
      "Added MariaDB version (12.2.2) and nginx version (1.29.7) to "
      + "Section 6.3 (Container Stack) and Section 6.5 (Database). "
      + "Both versions retrieved via SSH from the running containers, "
      + "for consistency with the EspoCRM version (9.3.4) already "
      + "captured. Section 6.5 split the previous combined Engine entry "
      + "into separate Engine, Version, and Image rows. No other content "
      + "changes; metadata Last Updated bumped to 05-02-26 05:30."],
    ["1.0", "05-02-26 04:45",
      "Initial release. Eleven sections covering: document purpose and scope; "
      + "deployment summary; DigitalOcean Droplet (identification, hardware, "
      + "firewall, backups); domain and DNS (Porkbun registrar, A record); "
      + "TLS certificate (Let's Encrypt; renewal arrangement); EspoCRM "
      + "application (version 9.3.4; install method; five-container stack; "
      + "install location; database); SSH access (key-based; crm-deploy key); "
      + "credentials inventory (three Proton Pass entries by exact name); "
      + "deployment history (seven events from Droplet boot to this document); "
      + "operational notes; open items (four entries). All values verified "
      + "against the live system at 2026-05-02 04:45 UTC."],
  ],
}));
children.push(blank());

// ==============================
// Document construction
// ==============================
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal",
        next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: HEADER_FILL },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal",
        next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: HEADER_FILL },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal",
        next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: HEADER_FILL },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
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

const outPath = path.join(__dirname, "CBM-Test-Instance-Deployment-Record.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
}).catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
