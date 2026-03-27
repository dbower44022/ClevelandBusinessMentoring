# CBM CRM — Account: Partner Organization
**Version:** 1.0  
**Status:** In Progress  
**Last Updated:** March 2026  
**Source Document:** CBM-PRD-CRM-Partners.docx v0.4  
**YAML File:** `cbm_account_fields_merged.yaml` (v1.1)

---

## 1. Overview

Partner Organizations are community organizations whose mission is to develop the community — or a specific community segment — by providing programs that help build or enrich businesses. Partners are organizations, not individuals. CBM tracks multiple individual contacts within each Partner organization.

Partners use the same Account entity as Client Companies. The Account Type multi-select field (value: "Partner") drives Dynamic Logic to show Partner-specific fields. A single organization can be both a Client Company and a Partner simultaneously.

**Entity Type:** Extension of native Account (Company type)  
**Activity Stream:** Yes — notes, emails, calls, tasks

---

## 2. Partner Types

A Partner may hold more than one type simultaneously. Type assignments should be reviewed annually or when the nature of the relationship changes.

| Type | Description |
|---|---|
| Referral Partner | Refers clients to CBM for mentoring services. Most Partners have a referral dimension. |
| Co-Delivery Partner | Collaborates with CBM to deliver programs or services. May provide general mentoring while relying on CBM for specialist expertise. |
| Funding / Sponsorship Partner | Provides financial support — grants, sponsorships, or other funding mechanisms. |
| Resource Partner | Provides services, expertise, or resources that CBM clients can be directed to for assistance outside of mentoring. |

---

## 3. Partner Lifecycle

Status changes should always be accompanied by a note explaining the reason. No automated workflow triggers status changes — fully manual.

| Status | Color | Description |
|---|---|---|
| Prospect | Blue | Known to CBM, not yet formally engaged. CBM may be planning or initiating outreach. |
| Active | Green | Current working partner. Established relationship with ongoing engagement, referrals, or joint activities. |
| Lapsed | Orange | Engagement has slowed or stopped but relationship not formally ended. May be re-activated. |
| Inactive | Gray | Former partner. Relationship formally ended. All historical data retained. |

---

## 4. Data Fields

### Core Profile

| Field | Type | Required | Description |
|---|---|---|---|
| Organization Name | varchar | Yes | Legal or operating name of the partner organization |
| Account Type | multiEnum | Yes | Includes "Partner". May also include "Client Company" or "Sponsor". |
| Organization Type | enum | Yes | Chamber of Commerce, SBDC, Economic Development Agency, University/Academic Institution, Bank/Financial Institution, Nonprofit/Community Organization, Government Agency, Corporate Sponsor, Other |
| Partner Type(s) | multiEnum | Yes | One or more of: Referral Partner, Co-Delivery Partner, Funding/Sponsorship Partner, Resource Partner |
| Partner Status | enum | Yes | Prospect, Active, Lapsed, Inactive |
| Partnership Start Date | date | No | Date partnership was formally established. Optional for Prospects; required when Status moves to Active. |
| Assigned Liaison | link | Yes (Active) | CBM member responsible for managing this Partner relationship. Required for Active partners. |
| Public Announcement Allowed | bool | No | Whether CBM may publicly announce or reference this partnership. Defaults to No. |
| Description | wysiwyg | No | Description of the organization, its mission, programs, and relationship context. |
| Website | url | No | Partner organization's public website |
| Phone | phone | No | Primary phone number |
| Address | address | No | Primary office address (street, city, state, zip) |
| Geographic Service Area | text | No | Geographic territory primarily served (e.g., City of Cleveland, Cuyahoga County, Greater Akron) |
| Target Population | text | No | Specific population or business segment the organization focuses on |
| Social Media | text | No | LinkedIn, Facebook, or other social profiles |
| Partner Notes | wysiwyg | No | General notes on the relationship, key milestones, status change explanations. Notes should always accompany status changes. |

### Parent Organization

A Partner may optionally designate another Partner record as its Parent Organization — for example, a local branch of a regional bank or a chapter of a national nonprofit. Both parent and child are independent records with their own profiles and analytics. The relationship is informational — analytics do not roll up automatically.

---

## 5. Layout

### Tab 1 — Overview *(always visible)*
Organization Name, Account Type, Partner Status, Organization Type, Website, Phone, City

### Tab 2 — Partner Profile
Partner Type(s), Partnership Start Date, Assigned Liaison, Public Announcement Allowed, Geographic Service Area, Target Population, Social Media, Description, Partner Notes

### Tab 3 — Activity *(available)*
Activity stream — notes, emails, calls, tasks

### List View Columns
Organization Name | Account Type | Partner Status | Organization Type | Assigned Liaison | City | Website

---

## 6. Relationships

| Relationship | Type | Partner Panel | Other Side |
|---|---|---|---|
| Account → Contact | one-to-many | Partner Contacts | Company |
| Account → Account (Parent) | many-to-one | Parent Organization | Child Organizations |
| Account → Contact (Liaison) | many-to-one | Assigned Liaison | Partner Liaisons |
| Account → Partner Agreement | one-to-many | Agreements | Partner |
| Account → Partner Activity | one-to-many | Activities | Partner |
| Account → Client-Partner Association | one-to-many | Associated Clients | Partner |

---

## 7. Partner Contacts

CBM tracks multiple individual contacts per Partner organization. A contact may serve different primary functions (referrals, billing, events). A Partner Contact may also be a CBM Mentor — tracked as a single person record with the Is CBM Mentor flag linking to their Mentor record.

Full Contact: Partner Contact specification is in `cbm_contact_partner_prd.md`.

---

## 8. Partner Agreements

Agreements are tracked as structured records linked to the Partner, with signed documents stored as attachments. All agreements are retained permanently. Agreement documents are restricted to management-level access only.

| Field | Type | Required | Description |
|---|---|---|---|
| Agreement Type | enum | Yes | MOU, Partnership Agreement, Letter of Intent, Other |
| Creation Date | date | Yes | Date agreement was created or signed |
| Expiration / Renewal Date | date | No | Date agreement expires or is due for renewal |
| Agreement Document | attachment | Yes | Signed agreement document |
| Partner | link | Yes | Linked Partner record |
| Notes | wysiwyg | No | Notes about the agreement |

---

## 9. Client-Partner Association

A client may be associated with one or more Partner organizations. This is the foundation for Partner-specific analytics — it filters client activity by partner population.

- A client may be associated with multiple Partners simultaneously (geographic overlap is common in Northeast Ohio)
- Associations are not time-bounded — they persist for the life of the client's engagement with CBM
- Typically established at intake when the client indicates referral source

| Field | Type | Required | Description |
|---|---|---|---|
| Client | link | Yes | Link to the Client Company (Account) record |
| Partner | link | Yes | Link to the Partner organization |
| Association Type | enum | No | Referred By, Serves Same Population, Program Participant, Other |
| Notes | text | No | Context about why this association exists |

---

## 10. Liaison Assignment

Each Active Partner has a single Assigned Liaison — a CBM member (mentor, staff, or board) responsible for managing the day-to-day relationship. A primary and secondary liaison may exist in rare cases. Only the current assignment is stored — liaison history is not tracked.

**Liaison responsibilities:**
- Serve as primary point of contact between CBM and the Partner
- Log notes, tasks, activities, and communications
- Coordinate and invite Partner to CBM events
- Drive joint activities and collaborative programs
- Generate and deliver Partner analytics reports

---

## 11. Partner Activities

CBM tracks activities and events associated with Partners.

| Activity Type | Description |
|---|---|
| CBM-Hosted Event | CBM event to which Partner was invited or attended |
| Co-Hosted Event | Event jointly organized and/or funded by CBM and Partner |
| Joint Workshop / Program | Structured program developed collaboratively |
| Co-Developed Content | Mentoring module, workshop curriculum, or resource jointly created |
| Meeting / Coordination Call | Scheduled meeting for relationship management |
| Other | Any other Partner-related activity |

| Field | Type | Required | Description |
|---|---|---|---|
| Activity Name | text | Yes | Name or title of the activity |
| Activity Type | enum | Yes | See types above |
| Partner | link | Yes | Linked Partner organization |
| Date | date | Yes | Date activity occurred or is scheduled |
| Description | wysiwyg | No | Description, purpose, and outcomes |
| Attendees | relationship | No | Contacts who attended |
| Notes | wysiwyg | No | Follow-up items |

---

## 12. Analytics & Reporting

The following metrics must be calculable per Partner based on their associated client population:

| Metric | Description |
|---|---|
| Referral Count | Total clients referred by or associated with this Partner |
| Active Client Count | Associated clients with an active mentoring engagement |
| Total Mentoring Sessions | Sessions conducted for Partner's client population |
| Total Mentoring Hours | Hours of mentoring delivered to Partner's client population |
| Average Sessions per Client | Average sessions per associated client |
| Average Hours per Client | Average hours per associated client |
| NPS / Satisfaction Scores | Aggregate NPS for Partner's client population |
| Clients Who Started a Business | Associated clients who started a new business through CBM |
| Clients with Significant Employment Growth | Associated clients who achieved significant employment growth |
| Co-Hosted Events | Count of events jointly hosted or funded with this Partner |

**Reporting cadence:** Both periodic (e.g., quarterly) and on-demand. Reports delivered as documents by the assigned liaison. A Partner Portal providing self-service access is a desired future capability.

---

## 13. Security

### Role-Based Access

| Role | Access | Notes |
|---|---|---|
| Admin / Management | Full access to all Partner records, contacts, agreements, and analytics | |
| Assigned Liaison | Full access to assigned Partner records; can log notes, tasks, activities | |
| Other Mentors | Read-only Partner Directory access | |
| Board Members | Summary-level portfolio visibility | |

**Agreement documents** — restricted to management-level access only. Liaisons and mentors without management access cannot view or download agreements.

**Partner Portal (future)** — Partners may only view analytics filtered for their own associated client population. Partners may not see individual client names, mentor identities, CBM financials, or other Partners' data.

### Internal Views Required

| View | Description |
|---|---|
| Partner Directory | All authorized users. Name, status, type, liaison, primary contact, address, website. |
| Partners by Status | Leadership view. All Partners grouped/filterable by status. |
| Agreements Expiring Soon | Partners with agreements expiring within a defined upcoming window. |
| Partners with No Recent Activity | Partners where liaison has logged no recent activity. |
| Portfolio Summary | Per-partner referral count and average sessions/hours per client. |
| Partners by Client Engagement Volume | Ranked by client activity. |

---

## 14. Open Items — TBD

| # | Item | Needs Input From |
|---|---|---|
| 1 | Geographic service area — structured or free text? | Leadership |
| 2 | Target population — structured list or free text? | Leadership |
| 3 | Partner Portal timeline and requirements | Leadership/Technology |
| 4 | Reporting cadence per partner | Leadership |
| 5 | Analytics formulas for calculated per-partner metrics | Technology |

---

## 15. Manual Configuration Required

| # | Item | Where to Configure |
|---|---|---|
| 1 | Partner Dynamic Logic panels | Entity Manager → Account → Dynamic Logic |
| 2 | "Partners" filtered list view | List View → Save Filter |
| 3 | "Partner Directory" view | List View → Save Filter |
| 4 | "Agreements Expiring Soon" view | List View → Save Filter |
| 5 | "Partners with No Recent Activity" view | List View → Save Filter |
| 6 | Partner agreement document access restriction | Administration → Roles |
| 7 | Liaison role-based access | Administration → Roles |
| 8 | Partner analytics reports | Administration → Reports |
| 9 | Google Workspace email sync for partner contacts | Administration → Integrations → Google |

---

## 16. Document Control

| Field | Value |
|---|---|
| Version | 1.0 |
| Status | In Progress |
| Last Updated | March 2026 |
| Source | CBM-PRD-CRM-Partners.docx v0.4 |
| YAML File | cbm_account_fields_merged.yaml v1.1 |
| Related Documents | CBM-PRD-CRM-Client.docx, CBM-PRD-CRM.docx |
