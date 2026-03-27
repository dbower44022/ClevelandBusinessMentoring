# CBM CRM — Account: Client Company
**Version:** 1.0  
**Status:** In Progress  
**Last Updated:** March 2026  
**Source Document:** CBM-PRD-CRM-Client.docx v1.6 — Section 2.2  
**YAML File:** `cbm_account_fields_merged.yaml` (v1.1)

---

## 1. Overview

The Client Company variant of the Account entity represents businesses receiving CBM mentoring services. Companies are the anchor record for all Contacts, Engagements, and related activity in the client domain. When a prospective client submits a Mentoring Request, the system automatically creates three linked records simultaneously: a Company, a Contact (the individual submitting the form), and an Engagement (initially in Submitted status).

A single company record can hold multiple roles (Client, Partner, Sponsor) via the Account Type multi-select field. Dynamic Logic panels show or hide role-specific fields accordingly.

**Entity Type:** Extension of native Account (Company type)  
**Activity Stream:** Yes

---

## 2. Data Fields

### Core Identity

| Field | Type | Required | Description |
|---|---|---|---|
| Business Name | varchar | No | Full legal or operating name. May be blank for pre-startup applicants who have not yet named their business. |
| Website | url | No | Business website URL |
| Address | address | No | Business mailing or physical address (street, city, state, zip) |
| Phone | phone | No | Primary business phone number |
| Account Type | multiEnum | Yes | Client Company, Partner, Sponsor — drives Dynamic Logic panels |
| Organization Type | enum | Yes | For-Profit or Non-Profit. Used for analytics and grant reporting. |
| Company Role | multiEnum | Yes | TBD: Values to be defined by Leadership. Differentiates between types of companies. |

### Business Profile *(required for intake)*

| Field | Type | Required | Description |
|---|---|---|---|
| Business Stage | enum | Yes | Pre-Startup, Startup, Early Stage, Growth Stage, Established. Note: Revenue thresholds to differentiate Startup from Early Stage are a planned future enhancement. |
| NAICS Sector | enum | Yes | Top-level industry classification. 20 NAICS sectors. Used for mentor matching and reporting. |
| NAICS Subsector | enum | Yes | Second-level classification, filtered by Sector. ~100 values. Dynamic Logic cascade filter required. |
| Mentoring Focus Areas | multiEnum | Yes | Business areas where client seeks mentoring. Used for mentor matching and funder reporting. TBD: Values defined by Leadership. |
| Mentoring Needs Description | wysiwyg | Yes | Free-form description of what client seeks in a mentoring engagement. Collected on intake form. |

### Business Detail *(typically mentor-populated after assignment)*

| Field | Type | Required | Description |
|---|---|---|---|
| Business Description | wysiwyg | No | Detailed description of what the business does, its history, and founding story |
| Time in Operation | enum | No | Less than 1 year, 1-2 years, 2-5 years, 5-10 years, More than 10 years |
| Current Team Size | int | No | Number of current employees or team members |
| Revenue Range | enum | No | Approximate annual revenue range. TBD: Specific ranges to be defined. |
| Funding Situation | wysiwyg | No | Current funding sources or needs |
| Current Challenges | wysiwyg | No | Primary obstacles the business faces |
| Goals and Objectives | wysiwyg | No | What the client wants to achieve through mentoring |
| Desired Outcomes (6-12 Months) | wysiwyg | No | Specific near-term outcomes the client hopes to achieve |
| Previous Mentoring / Advisory Experience | wysiwyg | No | Prior mentor or advisor experience and context |
| Current Professional Advisors | multiEnum | No | Banker/Financial Institution, Attorney/Legal Counsel, Accountant/CPA, IT Consultant, Insurance Agent, Marketing/PR Consultant, Business Coach |

### Legal & Registration *(shown when Registered with State = Yes)*

| Field | Type | Required | Description |
|---|---|---|---|
| Registered with State | bool | No | Whether the business has filed with the state as a legal entity. Drives visibility of registration fields via Dynamic Logic. |
| State of Registration | enum | No | US state where registered. Shown when Registered with State = Yes. |
| Legal Business Structure | enum | No | Sole Proprietor, Partnership, LLC, S-Corp, C-Corp, Non-Profit 501(c)(3), Other. Shown when Registered with State = Yes. |
| EIN on File | bool | No | Whether the business has obtained an EIN. Shown when Registered with State = Yes. |
| Date of Formation | date | No | Date the business entity was formally established. Shown when Registered with State = Yes. |
| Registered Agent | bool | No | Whether the business has a designated registered agent. Shown when Registered with State = Yes. |
| EIN Number | varchar | No | RESTRICTED: Admin and assigned Primary Mentor only. Mentor-populated — not collected on intake form. |

### Business Classifications & Certifications

All certification fields use four-value status scale: Ineligible, Eligible, Certified, In Progress. All optional.

| Field | Type | Certification Body | Description |
|---|---|---|---|
| Veteran-Owned Business | enum | VA/SBA | Business majority-owned by one or more veterans |
| Service-Disabled Veteran-Owned (SDVOSB) | enum | SBA/VA | Majority-owned by service-disabled veterans |
| Woman-Owned Small Business (WOSB) | enum | SBA | Majority-owned and controlled by women |
| Minority-Owned Business Enterprise (MBE) | enum | NMSDC or state | Majority-owned by racial or ethnic minorities |
| Disadvantaged Business Enterprise (DBE) | enum | Federal DOT | Socially and economically disadvantaged business owners |
| SBA Small Business | enum | SBA / SAM.gov | Meets SBA size standards, registered in SAM.gov |
| HUBZone Certified | enum | SBA | Business in Historically Underutilized Business Zone |
| 8(a) Program Participant | enum | SBA | SBA 8(a) Business Development Program |
| LGBTQ+-Owned Business | enum | NGLCC | Majority-owned by LGBTQ+ individuals |
| Disability-Owned Business Enterprise (DOBE) | enum | Disability:IN | Majority-owned by people with disabilities |
| Native American / Tribal Owned | enum | — | Majority-owned by Native American, Alaska Native, or Native Hawaiian individuals or tribal entity |
| Certified B Corporation | enum | B Lab | Meets verified social, environmental, and governance standards |
| Union Shop | bool | — | Operates under a union agreement |
| Family-Owned Business | bool | — | Owned and operated by members of the same family |
| Franchise | bool | — | Operates as a franchise of a larger brand |
| Social Enterprise | bool | — | Primary social, environmental, or community mission alongside commercial activity |
| Other Certifications / Designations | text | — | Free-text for additional certifications not covered above |

---

## 3. Layout

### Tab 1 — Overview *(always visible)*
Business Name, Account Type, Organization Type, Website, Phone, City, Business Stage

### Tab 2 — Profile *(intake form fields)*
NAICS Sector, NAICS Subsector, Mentoring Focus Areas, Mentoring Needs Description

### Tab 3 — Detail *(mentor-populated)*
Business Description, Time in Operation, Current Team Size, Revenue Range, Funding Situation, Current Challenges, Goals and Objectives, Desired Outcomes, Previous Mentoring Experience, Current Professional Advisors

### Tab 4 — Legal & Registration
Registered with State → [Dynamic Logic reveals] State of Registration, Legal Business Structure, EIN on File, Date of Formation, Registered Agent, EIN Number (restricted)

### Tab 5 — Certifications
All certification fields organized by federal program, then boolean classifications

### List View Columns
Business Name | Account Type | Business Stage | City | Website | Phone

---

## 4. Relationships

| Relationship | Type | Account Panel | Other Side |
|---|---|---|---|
| Account → Contact | one-to-many | Contacts | Company |
| Account → Engagement | one-to-many | Engagements | Company |
| Account → Partner (Parent Org) | many-to-one | Parent Organization | Child Organizations |

---

## 5. Security

### Role-Based Access

| Role | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Admin | All | All | All | All | Full access |
| Primary Mentor | No | Own | Own | No | Own assigned clients only |
| Co-Mentor | No | Own | Own | No | Scoped to assigned engagements |
| SME | No | Own | No | No | Read only on assigned engagements |
| Board Member | No | No | No | No | No access to individual records |

### Field-Level Security

| Field | Restriction | Rationale |
|---|---|---|
| EIN Number | Admin + assigned Primary Mentor only | Sensitive government-issued tax ID. Mentor-populated only — not on intake form. |

---

## 6. Open Items — TBD

| # | Item | Needs Input From |
|---|---|---|
| 1 | Company Role values | Leadership |
| 2 | Mentoring Focus Areas values | Leadership |
| 3 | Revenue Range values | Leadership |
| 4 | NAICS Subsector full list | Technology |
| 5 | Skills & Expertise Tags taxonomy | Leadership/Program staff |

---

## 7. Manual Configuration Required

| # | Item | Where to Configure |
|---|---|---|
| 1 | Client Company Dynamic Logic panels | Entity Manager → Account → Dynamic Logic |
| 2 | NAICS Subsector cascade filter | Entity Manager → Account → Dynamic Logic |
| 3 | Registration fields Dynamic Logic | Entity Manager → Account → Dynamic Logic |
| 4 | EIN Number field-level security | Administration → Roles |
| 5 | Role-based access control | Administration → Roles |
| 6 | "Client Companies" filtered list view | List View → Save Filter |

---

## 8. Document Control

| Field | Value |
|---|---|
| Version | 1.0 |
| Status | In Progress |
| Last Updated | March 2026 |
| Source | CBM-PRD-CRM-Client.docx v1.6 Section 2.2 |
| YAML File | cbm_account_fields_merged.yaml v1.1 |
