# CBM CRM — Contact: Mentor
**Version:** 1.0  
**Status:** In Progress  
**Last Updated:** March 2026  
**Source Documents:** CBM-PRD-CRM-Mentor.docx v0.2 + Phase 2 Entity Definition Sessions A+B  
**YAML File:** `cbm_contact_fields_merged.yaml` (v1.1)

---

## 1. Overview

The Mentor variant of the Contact entity represents vetted volunteers who provide free business mentoring to CBM clients. Mentors are not a separate CRM entity — they are Contact records with Contact Type = Mentor, built on EspoCRM's native Contact entity.

All mentor Contact records are linked to a single shared Company record representing Cleveland Business Mentors (Company Role = Mentoring Company). This anchor relationship distinguishes mentor contacts from client contacts, which are each linked to their own individual client company records.

A mentor may hold one or more roles simultaneously: primary Mentor, Co-Mentor, or Subject Matter Expert (SME). Role flags (Is Mentor, Is Co-Mentor, Is SME) enable this. Dynamic Logic panels show mentor-specific fields only when a mentor role flag is active.

**Entity Type:** Extension of native Contact (Person type)  
**Activity Stream:** Yes — significant events only (status changes, assignment changes, compliance renewals)

---

## 2. Data Fields

### Group 1 — Identity & Contact Information

| Field | Type | Required | Admin Only | Description |
|---|---|---|---|---|
| First Name | varchar | Yes | No | Legal first name |
| Last Name | varchar | Yes | No | Legal last name |
| Middle Name | varchar | No | No | Middle name |
| Preferred Name | varchar | No | No | Name the mentor prefers to be called. Used in all communications. |
| Personal Email | email | Yes | No | Mentor's personal email. Used for onboarding before CBM Gmail is activated. |
| CBM Gmail Address | email | No | Yes | CBM-assigned Google Workspace email (e.g., jsmith@clevelandbusinessmentors.org). Admin-populated during activation. |
| Phone | phone | No | No | Primary phone number |
| Personal Phone | phone | No | No | Personal phone number |
| Home Address | address | No | No | Home street address, city, state, zip |
| LinkedIn Profile | url | No | No | LinkedIn profile URL. Collected on application form. |
| Twitter / X | url | No | No | Twitter/X profile URL |
| YouTube | url | No | No | YouTube channel URL |
| Instagram | url | No | No | Instagram profile URL |
| Birthday | date | No | No | Used for recognition and personalized outreach |
| Spouse / Partner Name | varchar | No | No | Used for personalized relationship building |
| Photo | image | No | No | Profile headshot. Mentor-uploaded. |

### Group 2 — Biographical & Professional

| Field | Type | Required | Admin Only | Description |
|---|---|---|---|---|
| Professional Title | varchar | No | No | Current job title or role at their organization |
| Current Employer | varchar | No | No | Name of current employer or organization |
| Currently Employed | bool | No | No | Whether the mentor is currently employed. Collected on application form. |
| Work Status | enum | No | No | Employment status: Employed Full-Time, Employed Part-Time, Self-Employed, Retired, Unemployed |
| Military Status | enum | No | No | Military background: Civilian, Active Military, Reserves, Veteran |
| Years of Business Experience | int | No | No | Years of professional business experience. Used for mentor profile and matching. |
| Professional Bio / Work Experience | wysiwyg | No | No | Rich text biography. Collected on application form as "Describe Your Work Experience." Used for mentor profiles. |
| Area of Expertise | wysiwyg | No | No | Rich text description of business expertise. Mentor-maintained. |
| Industry Experience | wysiwyg | No | No | Rich text industry background. Mentor-maintained. |
| Education Details | wysiwyg | No | No | Rich text educational background. Mentor-maintained. |
| Interests | wysiwyg | No | No | Professional and personal interests. Mentor-maintained. |

### Group 3 — Skills & Expertise

| Field | Type | Required | Admin Only | Description |
|---|---|---|---|---|
| NAICS Sectors | multiEnum | Yes | No | Industry sectors of expertise. Aligned with Company NAICS Sector dropdown. Used for mentor-client matching. TBD: Values from NAICS taxonomy. |
| Mentoring Focus Areas | multiEnum | Yes | No | Business areas offered for mentoring. Aligned with Company Mentoring Focus Areas. Used for matching and funder reporting. TBD: Values defined by Leadership. |
| Skills & Expertise Tags | multiEnum | No | No | Finer-grained expertise tags for advanced matching. TBD: Values defined by Leadership. |
| Languages Spoken | multiEnum | No | No | Languages the mentor is fluent in. TBD: Language list to be defined. |
| Why Interested in Mentoring | wysiwyg | No | No | Mentor's stated motivation for joining CBM. Collected on application form. |
| How Did You Hear About CBM | enum | No | No | Referral source. TBD: Values to be defined. |

### Group 4 — Role & Capacity

| Field | Type | Required | Admin Only | Description |
|---|---|---|---|---|
| Is Mentor | bool | Yes | No | Eligible for primary mentor assignments. Drives Mentor tab visibility. |
| Is Co-Mentor | bool | Yes | No | Eligible for co-mentor assignments. |
| Is SME | bool | Yes | No | Eligible for SME assignments. Never assigned as primary mentor. |
| Is Workshop Presenter | bool | No | No | Willing and available to present at CBM workshops. |
| Is Mentor Reviewer | bool | No | No | Available to conduct interviews of prospective mentor applicants. |
| Mentor Status | enum | Yes | No | Current lifecycle stage. Default: Submitted. See Section 3 for values. |
| Primary Chapter | enum | Yes | No | Single chapter assignment only. TBD: Chapter list to be defined. |
| Accepting New Clients | bool | Yes | No | Whether mentor is available for new client assignments. Relevant when Status = Active. Mentor-editable. |
| Maximum Client Capacity | int | Yes | No | Maximum simultaneous active client engagements. Mentor-editable. |
| Max Client Requests / Week | int | No | No | Maximum new client requests to review per week. Mentor-editable. |
| Current Active Clients | int | No | No | Read-only. Count of Active/Assigned engagements where mentor is Primary Mentor. System-calculated. |
| Available Capacity | int | No | No | Read-only. Maximum Client Capacity minus Current Active Clients. System-calculated. |
| Mentoring Information Complete | bool | No | Yes | Admin flag confirming all required profile fields verified during onboarding review. |
| Pause Mentor Assignments Until | date | No | No | Date when mentor auto-resumes accepting new assignments. Used for scheduled pauses. Mentor or admin set. |
| Date Paused | date | No | No | Date status changed to Paused. Auto-set on status change. |
| Mentor Self Schedule URL | url | No | No | Personal scheduling tool link (e.g., Calendly) for client and admin booking. |
| Profile Visible on Website | bool | No | Yes | Controls whether mentor profile appears on public CBM website. Admin-controlled. |

### Group 5 — Administrative & Compliance

| Field | Type | Required | Admin Only | Description |
|---|---|---|---|---|
| Ethics Agreement Accepted | bool | No | Yes | Current annual ethics agreement signed. Admin-set. Mentor: read-only. |
| Ethics Agreement Acceptance Date/Time | datetime | No | Yes | Date/time of most recent ethics agreement acceptance. Admin-set. Mentor: read-only. |
| Ethics Class Completed | bool | No | Yes | Mandatory ethics class completed. Required before Active promotion. Future: LMS auto-update. |
| Ethics Class Completion Date | date | No | Yes | Date ethics class was completed. |
| Intro to Mentoring Completed | bool | No | Yes | Mandatory Intro to Mentoring class completed. Required before Active promotion. |
| Intro to Mentoring Date | date | No | Yes | Date Intro to Mentoring class was completed. |
| CRM Training Complete | bool | No | Yes | CRM system training completed. |
| Mentoring Agreement Signed | bool | No | Yes | Mentoring Agreement signed. Required before Active promotion. |
| Mentoring Agreement Date | date | No | Yes | Date Mentoring Agreement was signed. |
| Background Check Completed | bool | No | Yes | Background check completed. Admin-only. Hidden from mentor. |
| Background Check Date | date | No | Yes | Date background check was completed. Admin-only. Hidden from mentor. |
| Terms & Conditions Accepted | bool | No | Yes | System-populated on application form submission. Mentor: read-only. |
| Terms & Conditions Acceptance Date/Time | datetime | No | Yes | Timestamp of T&C acceptance on application form. Mentor: read-only. |
| Felony Conviction | bool | No | Yes | Disclosed on application form. Admin-only. Hidden from mentor after submission. Restricted field. |
| Dues Status | enum | No | Yes | Current-year dues standing: Unpaid, Paid, Waived. Admin-set. Mentor: read-only. |
| Dues Payment Date | date | No | Yes | Date of most recent dues payment. Not applicable when Dues Status = Waived. Mentor: read-only. |
| Status Change Reason | text | No | Yes | Reason when mentor goes Inactive or Resigned. Cleared on reactivation. |
| Departure Reason | enum | No | Yes | Reason for departure. Values: Relocated, Career Change, Time Constraints, Personal, Other. Shown when Status = Departed/Resigned. |
| Departure Date | date | No | Yes | Date mentor formally departed. Admin-only. |
| Date Joined | date | No | No | Date first joined CBM. Used for Years of Service and tenure recognition. |

### Calculated Fields (Read-Only)

| Field | Type | Description |
|---|---|---|
| Years of Service | float | Calculated from Date Joined |
| Average NPS Score | float | Average NPS from clients across all engagements |
| Total Active Engagements | int | Current active engagement count |
| Assigned Engagements (7 Days) | int | Assignment offers in past 7 days |
| Accepted Engagements (7 Days) | int | Assignments accepted in past 7 days |
| Total Engagement History | int | Cumulative all-time engagement count |
| Total Hours Delivered | float | Cumulative mentoring hours from sessions |
| Badge Level | enum | Bronze/Silver/Gold. TBD: Thresholds to be defined. |
| Last Activity Date | date | Most recent CRM activity |
| Last Engagement Accepted | date | Date of most recently accepted engagement |

---

## 3. Mentor Status Values

| Value | Color | Description |
|---|---|---|
| Submitted | Gray | Application received, awaiting admin review |
| In-Review | Gray | Admin actively reviewing the application |
| Provisional | Yellow | Accepted, completing onboarding requirements |
| Active | Green | Fully qualified, available for client assignments |
| Paused | Orange | Temporarily unavailable for new assignments |
| Inactive | Red | No longer mentoring, clients reassigned |
| Resigned | Red | Voluntarily departed, data retained |
| Declined | Red | Application rejected |

---

## 4. Layout

### Tab 1 — Overview *(always visible)*
Full Name, Preferred Name, Contact Type, Is Mentor, Is Co-Mentor, Is SME, Is Workshop Presenter, Is Mentor Reviewer, Mentor Status, Primary Chapter, Personal Email, CBM Gmail Address, Phone, Accepting New Clients, Profile Visible on Website, Mentor Self Schedule URL

### Tab 2 — Profile *(mentor-edited)*
Professional Title, Current Employer, Currently Employed, Work Status, Military Status, Professional Bio, Area of Expertise, Industry Experience, Education Details, Interests, NAICS Sectors, Mentoring Focus Areas, Skills & Expertise Tags, Languages Spoken, Why Interested in Mentoring, Years of Business Experience, LinkedIn, Twitter/X, YouTube, Instagram, Birthday, Spouse/Partner Name

### Tab 3 — Availability *(admin + intake coordinator)*
Maximum Client Capacity, Max Client Requests/Week, Current Active Clients, Available Capacity, Total Active Engagements, Assigned Engagements (7 Days), Accepted Engagements (7 Days), Pause Assignments Until, Date Paused

### Tab 4 — Analytics *(read-only)*
Average NPS Score, Total Engagement History, Total Hours Delivered, Badge Level, Years of Service, Last Activity Date, Last Engagement Accepted

### Tab 5 — Compliance *(admin-only edit)*
Background Check Completed, Background Check Date, Ethics Agreement Accepted, Ethics Agreement Acceptance Date/Time, Ethics Class Completed, Ethics Class Completion Date, Intro to Mentoring Completed, Intro to Mentoring Date, CRM Training Complete, Mentoring Agreement Signed, Mentoring Agreement Date, Terms & Conditions Accepted, Terms & Conditions Acceptance Date/Time, Felony Conviction, Mentoring Information Complete

### Tab 6 — Personal *(admin-only visibility)*
Home Address, Personal Phone, Date Joined, Departure Date, Departure Reason

### Tab 7 — Administrative *(admin-only)*
How Did You Hear About CBM, Status Change Reason, Dues Status, Dues Payment Date

### List View Columns
Name | Mentor Status | Is Mentor/Co-Mentor/SME | Primary Chapter | Total Active Clients | Available Capacity | Accepting New Clients | Email

---

## 5. Relationships

| Relationship | Type | Mentor Panel | Other Side |
|---|---|---|---|
| Mentor → Account (CBM) | many-to-one | Organization (CBM) | Mentors |
| Mentor → Engagement (Primary) | one-to-many | Primary Mentor Assignments | Primary Mentor |
| Mentor → Engagement (Co-Mentor) | many-to-many | Co-Mentor Assignments | Co-Mentors |
| Mentor → Engagement (SME) | many-to-many | SME Assignments | SMEs |
| Mentor → Session (Attendee) | many-to-many | Sessions Attended | Mentor Attendees |
| Mentor → Workshop (Presented) | many-to-many | Workshops Presented | Presenters |
| Mentor → Workshop (Attended) | many-to-many | Workshops Attended | Attendees |
| Mentor → Dues | one-to-many | Dues History | Mentor |
| Mentor → Account (Partner Liaison) | one-to-many | Partner Liaisons (active only) | Assigned Liaison |

**Notes:**
- Mentor → Client: No direct relationship. Mentors access client data exclusively through Engagements. This enforces access scoping at the data model level.
- Sessions panel shows all sessions across all engagements, sorted most recent first, to allow mentors to audit their own session entry.
- Partner Liaison panel shows active assignments only.
- NPS Survey Responses visible through Engagement records, not directly on Mentor.
- Emails and calendar events appear in the activity stream via Google Workspace integration.

---

## 6. Processes

### 6.1 Mentor Registration

The registration process begins when a prospective mentor submits an application via the CBM website. The WordPress form posts data to EspoCRM via the REST API.

**Application form collects:** Why Interested in Mentoring, First Name, Middle Name, Last Name, Preferred Name, Personal Email, Address, Phone, Professional Bio/Work Experience, LinkedIn Profile, Currently Employed, Industry Experience and Expertise (multi-select), Fluent Languages, How Did You Hear About CBM, Felony Conviction disclosure, Terms & Conditions acceptance.

**On submission:**
1. CRM creates Contact record with Contact Type = Mentor, Mentor Status = Submitted
2. Terms & Conditions Accepted = Yes, Acceptance Date/Time = submission timestamp
3. System sends confirmation email to applicant's personal email
4. Record appears in "New Mentor Applicants" saved view monitored by admin team

**Admin review:**
- Admin reviews application informally — no structured workflow required
- If approved → Admin changes Status to In-Review, then Provisional
- If obviously fake/invalid → Admin changes Status to Declined (no automated notification)
- If declined after review → Admin sends email using decline template. Contact record retained permanently.

### 6.2 Provisional → Active Activation (7 Steps)

All seven steps must be completed before Mentor Status is changed to Active. All steps are manual and admin-driven except Step 2 (LMS-triggered).

1. Admin communicates onboarding requirements to provisional mentor — training modules and ethics agreement
2. Mentor completes required Mentor training → LMS integration sets Mentor Training Completed = Yes and populates Mentor Completion Date (future integration; currently manual)
3. Mentor completes Ethics Class → Admin sets Ethics Class Completed = Yes
4. Mentor completes Intro to Mentoring → Admin sets Intro to Mentoring Completed = Yes
5. Mentor signs Mentoring Agreement → Admin sets Mentoring Agreement Signed = Yes
6. Mentor accepts CBM ethics agreement → Admin sets Ethics Agreement Accepted = Yes and Ethics Agreement Acceptance Date/Time
7. Admin confirms background check complete → sets Background Check Completed = Yes and Background Check Date
8. Admin assigns CBM Gmail address → populates CBM Gmail Address field. Provisions Google Workspace account separately outside CRM.
9. Admin sets Maximum Client Capacity and sets Accepting New Clients = Yes
10. Admin changes Mentor Status from Provisional to Active. No automated notification — admin communicates directly.

### 6.3 Client Assignment (Mentor Touchpoints)

Full process documented in CBM-PRD-CRM-Client.docx Section 4.2. Mentor-side summary:

**Prerequisites checked by system before nomination:**
- Mentor Status = Active
- Accepting New Clients = Yes
- Available Capacity > 0

**On nomination:** System sends mentor notification email with client intake summary and accept/decline link. 48-hour acceptance window (configurable).

**If accepted:** Engagement Status → Assigned. Mentor introduces themselves to client, sets Meeting Cadence on Engagement, deploys Phase 2 intake form at their discretion.

**If declined:** Engagement Status → Mentor Declined. No explanation required. Admin nominates different mentor.

**If no response within 48 hours:** Engagement appears in "Mentor Unresponsive" view. Admin follows up or nominates different mentor. Status remains Pending Acceptance.

### 6.4 SME / Co-Mentor Request

Initiated by a Primary Mentor outside of the CRM (via email/call) after identifying the expertise needed by searching CRM Mentor/SME profiles. If SME/Co-Mentor agrees, the Mentor adds them to the Engagement record via the Co-Mentor/SME Relationship Panel, which grants scoped read/write access to client records for the duration of involvement. When the SME's involvement concludes, admin removes the SME link from the Engagement, revoking scoped access.

### 6.5 Active → Paused

**Two scenarios:**
1. **Scheduled pause** — Mentor sets Pause Assignments Until date. System automatically changes Status back to Active when the date passes. Pause Assignments Until date is cleared automatically.
2. **Open-ended pause** — Mentor or admin changes Status to Paused with no end date. Mentor manually resumes when ready.

In both cases: Date Paused is recorded. Existing client engagements continue — only new assignments are paused.

### 6.6 Active → Inactive

Triggered by mentor or admin. Typically involves prior discussion. If mentor is unresponsive, admin may act alone. Admin records Status Change Reason. Active engagements are reassigned to new mentors using the standard client assignment process.

No automatic notifications — admin manages communications at their discretion.

### 6.7 Mentor Offboarding (Resigned / Departed)

All steps are manual and admin-driven:

1. Admin changes Mentor Status to Resigned/Departed, sets Departure Date, selects Departure Reason
2. Admin sets Accepting New Clients = No
3. Admin reviews all Active and Assigned engagements where departing mentor is Primary Mentor — each must be reassigned or closed
4. Admin reviews and removes Co-Mentor and SME assignments as appropriate
5. Admin deprovisions CBM Google Workspace account outside of CRM and clears CBM Gmail Address field

Record is retained permanently. All historical sessions, engagement history, notes, and dues records remain intact. No data is deleted or anonymized.

Reactivation is at admin discretion — admin determines whether full re-onboarding is required.

### 6.8 Inactivity Monitoring

Operates at the mentor level, independently of per-engagement inactivity monitoring. An inactivity alert is triggered when all of the following are true for a configurable period (default: 60 days):

- No session logged on any engagement where mentor is a Mentor Attendee
- No new client engagement accepted by the mentor
- Mentor has no engagements in Active or Assigned status

System generates admin alert. No automated status change. Admin determines appropriate action (outreach, update Accepting New Clients flag, or initiate offboarding).

### 6.9 Dues Billing & Collection

1. Admin creates Dues record for each Active mentor at start of billing cycle; sets Dues Status = Unpaid
2. Admin sends dues invoice to mentor's CBM Gmail with Stripe payment link
3. Mentor pays via Stripe; Stripe webhook confirms payment
4. Admin updates Dues Payment Date on Dues record; sets Dues Status = Paid on Contact record
5. If waiver granted: Admin sets Dues Status = Waived. No payment required.
6. If unpaid after grace period: Admin receives alert and follows up directly. No automated status change.

---

## 7. Security

### 7.1 Role-Based Access Control

**Mentor Contact:**

| Role | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Admin | All | All | All | All | Full access including restricted fields |
| Mentor | No | Own | Own | No | Own record only. Administrative fields read-only or hidden per Section 7.2. |
| Board Member | No | List only | No | No | List view access only. Cannot open individual records. |

**Engagement:**

| Role | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Admin | All | All | All | All | Full access |
| Primary Mentor | No | Own | Own | No | Own engagements. Cannot change status to Completed/Abandoned. |
| Co-Mentor | No | Own | Own | No | Scoped to assigned engagements |
| SME | No | Own | No | No | Read only on assigned engagements |
| Board Member | No | No | No | No | No access |

**Session:**

| Role | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Admin | All | All | All | All | Full access |
| Primary Mentor | Own | Own | Own | No | Own engagements. Must be listed in Mentor Attendees on sessions attended. |
| Co-Mentor | Own | Own | Own | No | Assigned engagements |
| SME | Own | Own | Own | No | Assigned engagements |
| Board Member | No | No | No | No | No access |

**Dues:**

| Role | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Admin | All | All | All | All | Full access |
| Mentor | No | Own | No | No | Read only on own dues records |
| Board Member | No | No | No | No | No access |

### 7.2 Field-Level Security

| Field | Mentor Access | Rationale |
|---|---|---|
| Ethics Agreement Accepted | Read only | Admin-controlled |
| Ethics Agreement Acceptance Date/Time | Read only | Admin-controlled |
| Terms & Conditions Accepted | Read only | System-populated on form submission |
| Terms & Conditions Acceptance Date/Time | Read only | System-populated |
| Mentor Training Completed | Read only | System-populated via LMS |
| Mentor Training Completion Date | Read only | System-populated |
| Dues Status | Read only | Admin-controlled |
| Dues Payment Date | Read only | Admin-controlled |
| CBM Gmail Address | Read only | Admin-populated |
| Background Check Completed | Hidden | Admin-only |
| Background Check Date | Hidden | Admin-only |
| Felony Conviction | Hidden | Admin-only. Restricted field. |
| Departure Reason | Hidden | Admin-only. Not applicable while active. |
| Departure Date | Hidden | Admin-only. Not applicable while active. |

### 7.3 Data Visibility Rules

- **Admin** — Full visibility across all mentor Contact, Engagement, Session, and Dues records
- **Mentor** — Sees only their own Contact record. Sees only Engagements where assigned (any role). Sees only Sessions linked to their assigned Engagements. Sees only their own Dues records.
- **Board Member** — List view only on mentor Contact records. Cannot open individual records. No access to Engagement, Session, or Dues records.
- **Clients** — No CRM access. All client-facing communication via email.

Mentors serving multiple roles across different Engagements see all records where assigned in any capacity.

---

## 8. Open Items — TBD

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Activity stream filtering | Which field changes should appear vs. be suppressed? Recommend: status changes, assignment changes, compliance renewals | Admin team |
| 2 | Mentor categorization | Are there tiers, regional groupings, or specializations beyond status and role flags? | Leadership |
| 3 | Primary Chapter list | Define complete chapter list | Leadership |
| 4 | Calculated field formulas | Define exact formulas for all read-only calculated fields | Technology |
| 5 | Structured skill taxonomy | Predefined skill fields for automated matching? Define taxonomy. | Leadership/Program staff |
| 6 | Language list | Define language list for Languages Spoken field | Leadership/Program staff |
| 7 | How Did You Hear About CBM values | Define referral source values | Leadership |
| 8 | Badge thresholds | Define Bronze/Silver/Gold thresholds by role type | Leadership |
| 9 | Skills & Expertise Tags values | Define fine-grained expertise tags | Leadership |
| 10 | Inactivity threshold | Confirm 60-day default or adjust | Leadership |
| 11 | Revenue ranges | Define specific revenue range values | Leadership |

---

## 9. Manual Configuration Required

| # | Item | Where to Configure |
|---|---|---|
| 1 | Activity stream filtering | Entity Manager → Contact → Stream |
| 2 | "New Mentor Applicants" saved view | List View → Save Filter |
| 3 | "Mentor Unresponsive" saved view | List View → Save Filter |
| 4 | "Mentor Declined" saved view | List View → Save Filter |
| 5 | "Provisional Completion" review view | List View → Save Filter |
| 6 | Application confirmation email workflow | Administration → Workflows |
| 7 | Decline notification email template | Administration → Email Templates |
| 8 | Provisional acceptance email template | Administration → Email Templates |
| 9 | Active promotion congratulations template | Administration → Email Templates |
| 10 | Mentor nomination notification email | Administration → Email Templates |
| 11 | Automated pause expiry workflow | Administration → Workflows |
| 12 | Mentor inactivity alert workflow | Administration → Workflows |
| 13 | Annual ethics renewal alert workflow | Administration → Workflows |
| 14 | Dues unpaid alert workflow | Administration → Workflows |
| 15 | Engagement panel sort/filter | Entity Manager → Contact → Relationships |
| 16 | Sessions panel sort/filter | Entity Manager → Contact → Relationships |
| 17 | Partner Liaison panel active-only filter | Entity Manager → Contact → Relationships |
| 18 | Google Workspace integration | Administration → Integrations → Google |
| 19 | Role-based field visibility | Administration → Roles |
| 20 | Field-level editing and hidden fields | Administration → Roles |
| 21 | Status change audit logging | Entity Manager → Contact → Stream |
| 22 | All calculated field formulas | Entity Manager → Contact → Formula |
| 23 | Badge level calculation formula | Entity Manager → Contact → Formula |
| 24 | Mentor nomination prerequisite validation | Administration → Workflows |
| 25 | LMS integration (future) | Administration → Integrations |

---

## 10. Session Transcript

### Session A — Data Definition (March 2026)

**Q:** From our discovery session, I described a Mentor as a vetted volunteer who provides free business mentoring to CBM clients, going through a structured onboarding process from Prospect through Active status, and potentially holding one or more roles — primary Mentor, Co-Mentor, or Subject Matter Expert. Does that still feel right?
**A:** Yes.

**Q:** When you see a list of mentors in the CRM, what's the single most important piece of information that identifies each one at a glance?
**A:** Name, status (Are they Active), Type (SME, Co-Mentor, Mentor), # active engagements, Available for client assignments, # of available client assignments.

**Q:** Should each mentor record have an activity stream?
**A:** Yes. It would be good to quickly see any recent changes that should be reviewed, as long as it is not too chatty so that the important changes don't get lost in the noise.

**Q:** Tell me everything you'd want to know about a mentor record.
**A:** The most important information will be how to get in touch with the mentor - Phone, emails. Next I will want to see their areas of experience and expertise and the profile that they publish that gives their history. Finally, I would want to see any joint meetings we have in past and future, and the same with emails. Finally, I would want to see any engagements that we have in common. This description will differ if my role is an Admin or another mentor/co-mentor/SME.

**Q:** Beyond name, phone, and email, what else do you need to identify a mentor?
**A:** Personal email, Home Address, birthday, Number of assigned engagements past 7 days, Number of accepted engagements past 7 days, total active engagements, Photo of contact profile, spouse first name, Work Status, Military Status.

**Q:** What values would Work Status have?
**A:** Employed Full-Time, Employed Part-Time, Self-Employed, Retired, Unemployed — that seems correct.

**Q:** What values would Military Status have?
**A:** Civilian, Active Military, Veteran, Reserves. No military spouse.

**Q:** Are the engagement count fields calculated automatically from engagement records?
**A:** Correct.

**Q:** Is the profile photo uploaded by the mentor themselves or managed by an admin?
**A:** Mentor uploads.

**Q:** What stages does a mentor go through?
**A:** Submitted, In-Review, Provisional, Declined, Active, Paused, Inactive, Resigned.

**Q:** Should the mentor status values be color-coded?
**A:** Submitted, In-Review — gray. Provisional — yellow. Paused — orange (almost red). Inactive, Resigned, Declined — red. Otherwise green (Active).

**Q:** What dates matter for a mentor record?
**A:** Date joined, Code of ethics completion date, Code of ethics renewal date, Birthdate, Resign date, Last Activity Date, Last engagement accepted.

**Q:** Are Last Activity Date and Last Engagement Accepted calculated automatically?
**A:** Yes.

**Q:** Do you categorize or classify mentors in any way beyond status and roles?
**A:** I am unfamiliar.

**Q:** Should chapter be on the mentor record, and how?
**A:** Yes. It should show their primary chapter.

**Q:** Should mentors be able to be associated with multiple chapters beyond their primary?
**A:** No — change that. Only one primary chapter. Multiple chapters would make analytics and assignments extremely difficult. One chapter only.

**Q:** What quantitative data do you track for a mentor?
**A:** Years of Service, Average NPS Score, Number of assigned engagements past 7 days, Number of accepted engagements past 7 days, total active engagements, Total Engagement history, Number of hours delivered history.

**Q:** Are the quantitative fields calculated from engagement records or manually entered?
**A:** Yes. Engagement records drive most analytics.

**Q:** Is Years of Service calculated from the Date Joined field?
**A:** Calculated from join date.

**Q:** Are there any free-text fields on the Mentor record?
**A:** Yes, there will be a number of free text WYSIWYG fields — Area of Expertise, Industry Experience, Education Details, Interests.

**Q:** Are the profile text fields mentor-edited or admin-managed?
**A:** Mentor edited.

**Q:** What boolean/checkbox fields do you need for a mentor?
**A:** Workshop Presenter, Co-Mentor, Mentor, Subject Matter Expert, Mentoring Information Complete.

**Q:** Is Mentoring Information Complete set manually by an admin during the review process, or calculated automatically?
**A:** Yes, it is part of the process to review a mentor before they are accepted — so manually set by admin.

**Q:** Is Workshop Presenter simply a flag indicating the mentor is willing and able to present at workshops?
**A:** Yes.

**Q:** What compliance requirements need to be tracked for a mentor?
**A:** Code of conduct/ethics signed and date, Mentor Training completed and date, CRM Training Complete.

**Q:** Is CRM Training Complete tracked with a date or just a checkbox?
**A:** Just a checkbox.

**Q:** Is there a background check requirement for mentors?
**A:** Yes. Just a yes/no checkbox.

**Q:** Should the background check have a completion date?
**A:** No.

**Q:** What fields do you need to track a mentor's capacity?
**A:** Max Client Requests per week, Max Active Clients, and a status change to indicate they are paused from taking new clients.

**Q:** Is Max Client Requests per week set by the mentor or an admin?
**A:** Mentor set.

**Q:** Is Max Active Clients also set by the mentor?
**A:** Yes.

**Q:** Are there structured/predefined skill fields for mentor-client matching beyond the WYSIWYG profile fields?
**A:** I am not sure. Add to TBD.

**Q:** Should languages spoken be tracked for a mentor?
**A:** Yes, that would be helpful.

**Q:** Should languages be a predefined list or free text?
**A:** List of main languages.

**Q:** Are there communication preferences or notification settings to track for a mentor?
**A:** I don't think that is necessary.

**Q:** Are there administrative fields the admin team needs to track?
**A:** Yes.

**Q:** What administrative fields does the admin team need to track?
**A:** Profile visible on website — boolean. Pause Mentor Assignments Until — date. Mentor Self Schedule URL — text.

**Q:** Is Mentor Self Schedule URL a link to the mentor's personal scheduling tool like Calendly?
**A:** Yes.

**Q:** Is Pause Mentor Assignments Until set by the mentor, admin, or both?
**A:** Both.

**Q:** Any other administrative fields?
**A:** That's it.

**Q:** Should social media accounts be tracked for a mentor?
**A:** Yes.

**Q:** Which social media platforms should be tracked?
**A:** LinkedIn, Twitter/X, YouTube, Instagram.

**Q:** Should social media be individual URL fields per platform or a single free-text field?
**A:** One for each, so we could display links on a website if desired.

**Q:** Should personal email and phone be under Personal rather than Overview?
**A:** Yes. We may want to hide some of that information in the future, so it would be good to have it all isolated.

**Q:** Do the list view columns still feel right — Name, Status, Type, # active engagements, Available for client assignments, # of available client assignments?
**A:** Yes.

**Q:** Should engagements show as one combined panel or separate panels by role?
**A:** One list of all active engagements.

**Q:** Should the engagement panel show active only or all engagements including historical?
**A:** If the list contains the engagement status it could be all engagements. What would the sort order be? Can we apply filters to a list of relations?

**Q:** All engagements with status visible, sorted most recent first, filterable — does that work?
**A:** Yep.

**Q:** Should sessions appear directly on the mentor record or through the engagement?
**A:** It would be nice to see all sessions on the mentor record so a mentor can quickly audit if they have entered all session information.

**Q:** Should workshops appear on the mentor record?
**A:** Yes.

**Q:** One combined workshop panel or separate panels for presented vs. attended?
**A:** Both — separate panels.

**Q:** Should partner organizations the mentor is liaison for appear on their record?
**A:** Yes.

**Q:** Should the partner organization panel show all or only active/current?
**A:** Only active/current.

**Q:** Any other relationships on the mentor record?
**A:** Surveys received, email received, calendar events.

**Q:** NPS Surveys — linked through engagements or a direct panel on the mentor record?
**A:** Good — through the activity stream for emails and calendar events, surveys through engagements.

**Q:** Does the data summary feel complete for now?
**A:** I am sure we will find something after a full review. But for now that looks good.

---

### Session B — Process Definition (March 2026)

**Q:** Ready to start Session B?
**A:** Yep.

**Q:** How does a new mentor record get created?
**A:** In all cases, the prospective mentor will fill in a form on the website to apply to be a mentor.

**Q:** When a mentor application is submitted, what happens automatically?
**A:** The new record will appear in a view "New Mentor Applicants" that is monitored by the Admin Team. We could do email notifications, but they would simply login and look at this view.

**Q:** Does the applicant receive an automatic confirmation email after submitting?
**A:** Yes. The admin gets a "thank you for submitting your application, someone will contact you shortly" email sent to the applicant.

**Q:** How does a record move from Submitted to In-Review?
**A:** Once an admin reviews the form submitted, they will change the status to In-Review or mark it as Declined if it is obviously fictitious (Donald Duck).

**Q:** When an application is Declined at the review stage, does the applicant get notified?
**A:** That is up to the Admin. If it is an obvious fake application, probably not.

**Q:** When a record moves to In-Review, is the applicant notified?
**A:** Silent.

**Q:** How does the review and interview process work in the In-Review stage?
**A:** The admin will contact at least two senior mentors who have agreed to act as reviewers. They will email the candidate and set up a meeting. Once the meeting is over they will give their opinion to the admin group and they will together make a final decision.

**Q:** Should reviewer mentors be tracked in the CRM?
**A:** It would be a good idea to add a "Mentor Reviewer" boolean so the list can be sorted to see who is available for interviews.

**Q:** Should the reviewers assigned to a specific applicant be tracked on the applicant's record?
**A:** No.

**Q:** When a prospect is Declined after the interview, does the applicant get notified?
**A:** Yes. The admin would send an email to the declined prospect. It would not be automatic, although they may want to create an email template.

**Q:** When a prospect is moved to Provisional, does the applicant get notified?
**A:** Yes. They will be sent an email by the admin with next steps.

**Q:** What has to happen before a provisional mentor can become Active?
**A:** They must complete an Ethics class and an Introduction to Mentoring class. They must sign two documents — a Mentoring Agreement and an Ethics Agreement.

**Q:** Are the training completion fields manually checked or automatically updated from a training system?
**A:** Initially all manual. Eventually we will integrate an LMS that will report classes have been completed.

**Q:** Who promotes a mentor from Provisional to Active, and how?
**A:** The admin team will review the status on a regular basis and send a congratulations email and give them a phone call.

**Q:** When promoted to Active, are mentors immediately available for client assignments?
**A:** They are immediately available.

**Q:** When a mentor goes Paused, what information needs to be captured?
**A:** Just that they are paused and the date that they went paused.

**Q:** Should there be a Date Paused field in addition to the Pause Until date?
**A:** Yes.

**Q:** When a mentor goes Paused, are existing clients notified or does it only affect new assignments?
**A:** It only pauses new assignments.

**Q:** How does a paused mentor transition back to Active?
**A:** They change it themselves.

**Q:** How should the Pause Until date work — are there different pause scenarios?
**A:** It should get cleared automatically. There are two possible workflows: 1 — The person pauses because they'll be on vacation or busy for a period of time, so they set a Pause Until date. 2 — The person has too many active clients and wants to stop getting new clients until they have more time, with no specific end date.

**Q:** Should there be a field to capture the reason for the pause?
**A:** No.

**Q:** How does a mentor go from Active to Inactive, and what happens to their clients?
**A:** The user or admin can change the status to Inactive. Usually the admin will discuss this with the mentor, however if the mentor is not responsive, the admin would take action themselves. Based on the situation, the admin would probably re-assign all clients to new mentors using the same process as used for new clients.

**Q:** Should a reason be captured when a mentor goes Inactive?
**A:** That would be a good idea, so everyone remembers why they went inactive.

**Q:** Should the same reason field be used for Resigned status?
**A:** That would be good.

**Q:** Are there automatic notifications when a mentor goes Inactive?
**A:** This is up to the admin, so no automatic notifications.

**Q:** How does a mentor resign?
**A:** Same as Inactive. Usually a discussion with admin. However, if unresponsive the admin may make the change for the mentor.

**Q:** Can a resigned mentor return to CBM?
**A:** Yes. It would be a manual process where the admin decides if they will be reactivated and what must be done. They may have to go through the onboarding process again, or not.

**Q:** Is a resigned mentor's record ever fully deleted?
**A:** Never deleted.

**Q:** Who can edit mentor record fields?
**A:** The admin and the mentor can edit all fields. Other mentors can view but not edit.

**Q:** Are there fields the mentor themselves cannot edit?
**A:** The calculated fields obviously. Compliance checkboxes and the badge level would be another good one.

**Q:** Should status changes be logged in the activity stream?
**A:** Yes.

**Q:** Are there any other automated emails or reminders beyond what we've covered?
**A:** No.

**Q:** Are there any other external systems involved in the mentor lifecycle?
**A:** The Google Workspace for email, calendar and docs.

**Q:** Does the process summary feel complete?
**A:** Looks great.

---

## 11. Document Control

| Field | Value |
|---|---|
| Version | 1.0 |
| Status | In Progress |
| Last Updated | March 2026 |
| Source: Session Interview | Phase 2 Entity Definition Sessions A + B |
| Source: Word PRD | CBM-PRD-CRM-Mentor.docx v0.2 |
| YAML File | cbm_contact_fields_merged.yaml v1.1 |
| Related Documents | CBM-PRD-CRM-Client.docx, CBM-PRD-CRM.docx |
