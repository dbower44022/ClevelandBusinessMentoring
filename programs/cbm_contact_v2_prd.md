# CBM CRM — Contact Entity Specification
# Version: 1.0
# Generated: March 2026
# Source: Phase 2 Entity Definition Session — Contact (combined variants)
# Session Date: March 2026

---

## Contact Entity

**Purpose:** The Contact entity represents any individual person CBM
works with — mentors, client contacts, partner contacts, and
administrators. A single person can hold multiple roles simultaneously.
Role-based fields and Dynamic Logic ensure each contact type sees only
relevant information, keeping the record clean and focused. Contact is
the foundation entity of CBM's CRM — every other entity connects to it.

**Entity Type:** Extension of native Contact (Person type)
**CRM Entity:** Contact (native)

---

## Data Fields

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| First Name | varchar | Yes | — | Legal first name |
| Middle Name | varchar | No | — | Middle name |
| Last Name | varchar | Yes | — | Legal last name |
| Preferred Name | varchar | No | — | Name the person goes by — e.g., Bob instead of Robert. Used in all communications for personalized experience. |
| Title | varchar | No | — | Professional title at their organization |
| Account | link | No | — | Primary organization the contact belongs to |
| Email (multiple) | email | No | — | Primary and additional email addresses |
| Phone (multiple) | phone | No | — | Primary and additional phone numbers |
| Address (multiple) | — | No | — | Primary and additional physical addresses |
| LinkedIn Profile | url | No | — | LinkedIn profile URL for professional research and networking |
| Social Media Profiles | text | No | — | Other social media profile URLs (Twitter, Facebook, Instagram, etc.) |
| Birthday | date | No | — | Used for personalized outreach and recognition |
| Wedding Anniversary | date | No | — | Used for personalized outreach |
| CBM Start Date | date | No | — | Date the person first joined CBM in any capacity. Used for tenure tracking and anniversary recognition. |
| Spouse / Partner Name | varchar | No | — | Used for personalized mentor-client relationship building |
| Personal Notes | wysiwyg | No | — | Free-form notes capturing personal relationship details — family members, pets, interests, hobbies. TBD: Structured template to be designed. |
| Chapter(s) | multiEnum | No | — | Chapter(s) associated with. Passed automatically from intake form. Mentors may have multiple chapters. TBD: Chapter list to be defined. |
| Notes | wysiwyg | No | — | General observations and miscellaneous information |
| Date of Last Activity | date | No | — | Read-only. Calculated from most recent session, workshop, or engagement activity. |
| Date Inactive | date | No | — | Date the contact was marked inactive or resigned. Set manually when status changes. |
| Is Mentor | bool | No | false | Person is approved as a primary mentor and eligible for direct client assignment. Drives Mentor tab visibility. |
| Is Co-Mentor | bool | No | false | Person participates as co-mentor alongside a primary mentor. |
| Is Subject Matter Expert | bool | No | false | Person provides specialist expertise to support other mentors. Never assigned as primary mentor. |
| Mentor Status | enum | No | Prospect | Current lifecycle stage. Default is Prospect when created from intake form. See dropdown values. |
| Areas of Expertise | multiEnum | No | — | Business disciplines offered for mentor-client matching. TBD: Taxonomy to be defined. |
| Technology Skills | text | No | — | Free-text description of technology knowledge and tools. |
| Certifications | text | No | — | Free-text list of professional certifications (CPA, CFPA, PMP, etc.) |
| Training Complete | bool | No | false | Mandatory onboarding training has been completed. Required before promotion to Active. |
| Training Completion Date | date | No | — | Date training was completed. |
| Ethics Agreement Signed | bool | No | false | Current annual ethics and confidentiality agreement is signed. Must be renewed annually. |
| Ethics Agreement Date | date | No | — | Date current ethics agreement was signed. Used to calculate annual renewal due date. |
| Badge Level | enum | No | — | Read-only. Calculated from total clients served and hours contributed. Triggers recognition letter on change. |
| Total Clients Served | int | No | — | Read-only. Calculated from engagement records. |
| Total Mentoring Hours | float | No | — | Read-only. Calculated from session records. |
| Total Sessions Delivered | int | No | — | Read-only. Calculated from session records. |
| Business Skills | multiEnum | No | — | Business disciplines relevant to client's background and needs. Same taxonomy as mentor expertise for matching. TBD: Taxonomy to be defined. |
| Client Technology Skills | text | No | — | Free-text description of client's technology background. |
| Role & Responsibilities | text | No | — | Client's role and responsibilities within their business. |

---

## Dropdown Values

### Mentor Status

| Value | Color | Description |
|---|---|---|
| Prospect | Blue (info) | Has submitted application, under review by intake coordinator |
| Provisional | Yellow (warning) | Passed interview, in training and co-mentoring phase |
| Active | Green (success) | Fully independent mentor, available for new client assignments |
| Paused | Orange (warning) | Temporarily unavailable for new clients, continues existing engagements |
| Inactive | Gray (default) | No longer mentoring, existing clients reassigned, data retained |
| Resigned | Red (danger) | Voluntarily left the program, data retained, eligible to rejoin |
| Rejected | Red (danger) | Did not pass the interview process |

### Badge Level

| Value | Color | Description |
|---|---|---|
| (none) | — | No badge earned yet |
| Bronze | Orange (warning) | First milestone achieved. TBD: threshold to be defined by Leadership. |
| Silver | Gray (default) | Second milestone achieved. TBD: threshold to be defined by Leadership. |
| Gold | Blue (primary) | Highest milestone achieved. TBD: threshold to be defined by Leadership. |

---

## Layout

### Tab 1 — Overview *(always visible)*
- Preferred Name, Full Name
- Primary Email, Primary Phone
- Account (organization), Title
- Chapter(s)
- Notes

### Tab 2 — Mentor *(Dynamic Logic: visible when Is Mentor, Is Co-Mentor, or Is SME is checked)*
**Roles & Status sub-tab:**
- Is Mentor, Is Co-Mentor, Is Subject Matter Expert
- Mentor Status
- CBM Start Date, Date Inactive

**Expertise sub-tab:**
- Areas of Expertise
- Technology Skills
- Certifications

**Recognition sub-tab:**
- Badge Level
- Total Clients Served, Total Mentoring Hours, Total Sessions Delivered

**Compliance sub-tab:**
- Training Complete, Training Completion Date
- Ethics Agreement Signed, Ethics Agreement Date

### Tab 3 — Client
- Business Skills
- Client Technology Skills
- Role & Responsibilities

### Tab 4 — Personal
- Birthday, Wedding Anniversary
- Spouse / Partner Name
- Personal Notes

### Tab 5 — Social & Professional
- LinkedIn Profile
- Social Media Profiles
- Additional email addresses, phones, addresses

### Tab 6 — Administrative
- Date of Last Activity
- Date Inactive
- System fields (created by, modified by)

### List View Columns
Last Name | First Name | Account | Is Mentor | Phone | Email

---

## Relationships

| Relationship | Type | Panel (Contact side) | Panel (Other side) |
|---|---|---|---|
| Contact → Account (primary) | many-to-one | Organization | Contacts |
| Contact → Account (partner associations) | many-to-many | Also Associated With | Associated Contacts |
| Contact → Engagement | one-to-many | Engagements | Mentor / Client Contacts |
| Contact → Workshop Attendance | one-to-many | Workshops Attended | Attendees |

**Notes:**
- Engagement panel visible for mentor and client contacts only (Dynamic Logic)
- Sessions are visible through the Engagement record, not directly on Contact
- NPS Survey Responses are visible through the Engagement record, not on Contact
- Referral tracking is at the organization (Account) level, not the Contact level

---

## Open Items — TBD (Required Before Go-Live)

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Personal Notes Template | Design structured template for capturing relationship details (family, pets, interests). Should it live on Contact, Engagement, or both? | Program staff |
| 2 | Business Discipline Taxonomy | Define the complete list of business areas for mentor-client matching. Applies to both Contact (mentor expertise) and Account (client needs). | Leadership / Program staff |
| 3 | Areas of Interest | Is this a separate field from Areas of Expertise? How used in matching? | Leadership / Program staff |
| 4 | Badge Thresholds | Define Bronze/Silver/Gold thresholds for primary mentors, co-mentors, and SMEs. What metrics and weighting? | Leadership |
| 5 | Chapter List | Define complete chapter list as chapters are established. | Leadership |

---

## Manual Configuration Required (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Annual Ethics Agreement Renewal Alert | Administration → Workflows | Notify administrator when ethics agreement date approaches 12 months |
| 2 | Badge Level Calculation Formula | Entity Manager → Contact → Formula | Calculate Bronze/Silver/Gold from Total Clients Served and Total Hours. Trigger recognition letter on level change. |
| 3 | Mentor Analytics Dashboard | Reports → Dashboards | Mentor performance metrics by chapter and organization-wide |
| 4 | Role-Based Access Control | Administration → Roles | Define roles: Administrator, Intake Coordinator, Mentor, Chapter Administrator |
| 5 | Date of Last Activity Formula | Entity Manager → Contact → Formula | Calculate from most recent session, workshop, or engagement activity |
| 6 | Mentor Tab Dynamic Logic | Entity Manager → Contact → Dynamic Logic | Show Mentor tab when Is Mentor, Is Co-Mentor, or Is SME is checked |
| 7 | Engagement Panel Dynamic Logic | Entity Manager → Contact → Dynamic Logic | Show Engagement panel for mentor and client contacts only |

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | Contact extends native Person entity | Individuals tracked as Contacts; organizations as Accounts. Native entity reuse avoids duplication. |
| 2 | Three role checkboxes (Is Mentor, Is Co-Mentor, Is SME) | Checkboxes allow a person to hold multiple roles simultaneously. Easier to filter than multi-select. |
| 3 | Mentor tab uses Dynamic Logic | Mentor fields are irrelevant for client and partner contacts. Dynamic Logic keeps the record clean. |
| 4 | Referral tracking at organization level only | Referrals tracked on Engagement from partner organization. Individual-level referral tracking not required. |
| 5 | Sessions visible through Engagement | Sessions not shown directly on Contact — accessible through related Engagement. Keeps Contact focused. |
| 6 | Conflict of interest not a dedicated field | Too rare to warrant a field. Handled via general Notes if needed. |
| 7 | Technology skills as free text | Technology changes too fast for a fixed list. Free-form for both mentors and clients. |
| 8 | Chapter as multi-select | Mentors can serve multiple chapters; client contacts typically one. Multi-select accommodates both. |

---

## Known Gaps vs. Prior Implementation

The following fields exist in the previously deployed Contact
configuration but were not captured in this session. Review before
finalizing:

| Field | Notes |
|---|---|
| acceptingNewClients | Should be added — mentor availability flag |
| availableCapacity / maximumClientCapacity | Should be added — capacity management |
| backgroundCheckCompleted / backgroundCheckDate | Should be added — screening compliance |
| cbmGmailAddress | Should be added — CBM-assigned email |
| contactType | Review — covered by role booleans? Or still needed for primary type display? |
| currentActiveClients | Should be added — calculated count |
| departureReason | Should be added — reason for inactive/resigned status |
| duesStatus / duesPaymentDate | Should be added — membership dues tracking |
| felonyConviction | Should be added — screening compliance (sensitive field) |
| fluentLanguages | Should be added — mentor-client matching |
| howDidYouHearAboutCbm | Should be added — on Contact or Engagement? |
| isPrimaryContact | Should be added — for partner organizations |
| moodleTrainingCompleted / moodleCompletionDate | Superseded by trainingComplete / trainingCompletionDate |
| naicsSectors | Should be added — industry expertise taxonomy |
| professionalBio | Should be added — mentor profile |
| termsAndConditionsAccepted / termsAndConditionsAcceptanceDateTime | Should be added — legal compliance |
| whyInterestedInMentoring | Should be added — mentor motivation |
| yearsOfBusinessExperience | Should be added — mentor profile |
| zipCode | Should be added — geographic data |

These gaps will be addressed in subsequent entity definition sessions
using the revised three-session format (data / process / synthesis).
