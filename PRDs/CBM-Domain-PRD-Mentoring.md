# Cleveland Business Mentors
# Domain PRD: Mentoring

**Version:** 1.0
**Status:** Draft
**Last Updated:** March 2026
**Domain Code:** MN
**Depends On:** CBM-Master-PRD.md

---

## 1. Domain Overview

The Mentoring domain is CBM's core program delivery function. It covers
the complete lifecycle of a mentoring engagement — from the moment a
prospective client submits a request for mentoring services through
mentor assignment, active engagement management, satisfaction tracking,
and formal closure.

Every other domain in CBM's operation ultimately exists to support this
one. Client Recruiting generates the clients. Mentor Recruitment
provides the mentors. Fundraising funds the organization that delivers
the service. Mentoring is where the mission is actually fulfilled.

The domain involves two primary external participants — the Client and
the Mentor — supported by three internal administrative roles. The
system must make it easy for mentors to do their job with minimal
administrative burden, while giving administrators the visibility they
need to monitor engagement health and intervene when relationships are
at risk.

A key design principle is that all client and mentor data created in
this domain is permanent. Records are never deleted. Clients who return
for a second engagement retain their full history. Mentors who depart
and return retain their full history. This permanence supports both
historical funder reporting and the organization's long-term
institutional memory.

---

## 2. Personas

The following personas from the Master PRD participate in the Mentoring
domain. Their roles specific to this domain are described below.

**MST-PER-003 — Client Administrator**
The primary operational administrator for the Mentoring domain. Reviews
and processes client applications, monitors engagement health, follows
up on inactive engagements, and coordinates with mentors and clients
throughout the engagement lifecycle. The Client Administrator is the
client's main point of contact within CBM.

**MST-PER-004 — Client Assignment Coordinator**
Responsible for matching approved clients with appropriate mentors.
Searches the mentor roster, nominates candidates, manages the acceptance
workflow, and activates new engagements. Works closely with the Client
Administrator on intake and with the Mentor Administrator on mentor
availability.

**MST-PER-005 — Mentor Administrator**
Supports the Mentoring domain by maintaining mentor records, monitoring
mentor capacity and availability, and assisting with the assignment
process. Ensures mentors have the information and access they need to
serve their clients effectively.

**MST-PER-009 — Content and Event Administrator**
Manages workshop and event records that clients may attend alongside
their mentoring engagement. Tracks registration and attendance linked
to client records so mentors have visibility into their clients'
learning activities.

**MST-PER-011 — Mentor**
The volunteer professional delivering mentoring services. Accepts or
declines assignment requests, introduces themselves to new clients,
logs session notes and next steps after each meeting, sets the next
session date, requests subject matter experts when needed, and manages
their own profile and availability.

**MST-PER-013 — Client**
The business, nonprofit, or entrepreneurial venture receiving mentoring
services. Submits the initial mentoring request, completes supplemental
intake information, participates in mentoring sessions, and responds to
satisfaction surveys. Represented by one or more individual contacts.

---

## 3. Business Processes

### MN-INTAKE — Client Intake

**Process Purpose and Trigger**
The Client Intake process begins when a prospective client submits a
mentoring request through the CBM public website. Its purpose is to
capture the information needed to assess eligibility and identify an
appropriate mentor, and to route the application to the Client
Administrator for review.

**Personas Involved**
- MST-PER-013 Client — submits the request
- MST-PER-003 Client Administrator — reviews and approves or declines

**Process Workflow**

1. The prospective client completes and submits the Phase 1 Mentoring
   Request form on the CBM public website.
2. The system automatically creates three linked records: a Client
   Organization record (the business), a Client Contact record (the
   submitting individual, flagged as Primary Contact), and an Engagement
   record with status Submitted.
3. The Client Administrator receives an automatic notification of the
   new submission.
4. The Client Administrator reviews the submission for completeness and
   basic eligibility against CBM's program criteria.
5. If eligible, the application proceeds to the Mentor Matching process
   (MN-MATCH).
6. If not eligible, the Client Administrator updates the Engagement
   status to Declined, records the reason, and notifies the applicant
   directly. No automated notification is sent. The Client Organization
   and Contact records are retained permanently.

A structured eligibility screening workflow may be defined by CBM
leadership in a future revision. The current process assumes a basic
administrative review.

**System Requirements**
- MN-INTAKE-REQ-001: The system must accept client mentoring requests
  submitted through the public website and create linked Client
  Organization, Client Contact, and Engagement records automatically
- MN-INTAKE-REQ-002: The submitting individual must be automatically
  flagged as the Primary Contact on the new Client Organization record
- MN-INTAKE-REQ-003: The system must notify the Client Administrator
  immediately upon receipt of a new submission
- MN-INTAKE-REQ-004: New submissions must appear in a dedicated
  Submitted Applications view accessible to the Client Administrator
- MN-INTAKE-REQ-005: The system must support recording of a decline
  reason when an application is rejected
- MN-INTAKE-REQ-006: Client Organization and Contact records must be
  retained permanently regardless of Engagement outcome

**Process Data**
- MN-INTAKE-DAT-001: Mentor roster — expertise, industry, availability,
  and capacity — to inform eligibility assessment and readiness for
  matching

**Data Collected**
- MN-INTAKE-DAT-002: Client Organization — business name, website,
  address, organization type, business stage, industry classification,
  mentoring focus areas, mentoring needs description
- MN-INTAKE-DAT-003: Client Contact — first name, last name, email,
  phone, zip code, primary contact flag
- MN-INTAKE-DAT-004: Engagement — status, submission date, decline
  reason if applicable

---

### MN-MATCH — Mentor Matching

**Process Purpose and Trigger**
The Mentor Matching process begins after the Client Administrator has
approved a client intake submission. Its purpose is to identify the
most appropriate available mentor for the client and obtain the mentor's
acceptance of the assignment.

**Personas Involved**
- MST-PER-004 Client Assignment Coordinator — searches, nominates, and
  activates the assignment
- MST-PER-005 Mentor Administrator — provides mentor availability and
  capacity information
- MST-PER-011 Mentor — accepts or declines the assignment

**Process Workflow**

1. The Client Assignment Coordinator reviews the approved client
   application — business description, industry, business stage,
   mentoring focus areas, and mentoring needs.
2. The Client Assignment Coordinator searches the active mentor roster,
   filtering by industry expertise, mentoring focus areas, skills and
   expertise tags, availability, capacity, and language where relevant.
3. The Client Assignment Coordinator selects a primary mentor and
   optionally one or more co-mentors or subject matter experts.
4. The system verifies each nominated mentor is Active, currently
   accepting new clients, and has available capacity before the
   nomination is confirmed.
5. The Engagement status changes to Pending Acceptance.
6. The system sends an automatic notification to the nominated primary
   mentor with a summary of the client's intake information and a
   request to accept or decline the assignment. A configurable
   acceptance window applies (default: 48 hours).
7. If the mentor accepts: the Engagement status changes to Assigned and
   the Client Assignment Coordinator is notified.
8. If the mentor declines: the Engagement status reverts to Submitted
   and the Client Assignment Coordinator is notified to nominate a
   different mentor. No explanation is required from the declining
   mentor.
9. If no response is received within the acceptance window: the Client
   Assignment Coordinator is alerted to follow up or nominate a
   different mentor.
10. Upon acceptance, the mentor sets the Meeting Cadence on the
    Engagement record.
11. The mentor personally introduces themselves to the client via email.
    The system provides email templates as a starting point. The
    introduction is sent by the mentor — not auto-generated by the
    system.
12. The delivery of the Phase 2 supplemental intake form is at the
    mentor's discretion. The mentor may include the form link in the
    introduction email or deploy it after the first session.

**System Requirements**
- MN-MATCH-REQ-001: The system must support searching and filtering
  the mentor roster by industry expertise, mentoring focus areas,
  skills and expertise tags, availability, capacity, and language
- MN-MATCH-REQ-002: The system must prevent nomination of a mentor
  who is not Active, not accepting new clients, or has no available
  capacity
- MN-MATCH-REQ-003: The system must support assignment of a primary
  mentor and optionally one or more co-mentors and subject matter
  experts per engagement
- MN-MATCH-REQ-004: The system must notify the nominated mentor
  automatically with client intake summary and accept/decline options
- MN-MATCH-REQ-005: The system must enforce a configurable acceptance
  window and alert the Client Assignment Coordinator when it expires
- MN-MATCH-REQ-006: The system must revert the Engagement to Submitted
  status automatically if a mentor declines
- MN-MATCH-REQ-007: The system must record the candidate mentors
  considered and the rationale for the final selection
- MN-MATCH-REQ-008: The system must provide email templates for mentor
  introduction communications

**Process Data**
- MN-MATCH-DAT-001: Client application — business description,
  industry, business stage, mentoring focus areas, mentoring needs
- MN-MATCH-DAT-002: Mentor roster — expertise, industry background,
  mentoring focus areas, skills and expertise tags, availability,
  capacity, language, current engagement load

**Data Collected**
- MN-MATCH-DAT-003: Assignment record — assigned primary mentor,
  co-mentors, subject matter experts, assignment date, acceptance date
- MN-MATCH-DAT-004: Meeting cadence — expected frequency of
  mentor-client meetings
- MN-MATCH-DAT-005: Matching notes — candidate mentors considered,
  rationale for selection

---

### MN-ENGAGE — Engagement Management

**Process Purpose and Trigger**
The Engagement Management process begins when the first session is
logged against an Assigned engagement, automatically transitioning it
to Active status. Its purpose is to support the ongoing delivery of
mentoring services and give administrators the visibility to monitor
engagement health.

**Personas Involved**
- MST-PER-011 Mentor — logs sessions, sets next session dates, manages
  engagement activity
- MST-PER-003 Client Administrator — monitors engagement health,
  coordinates communication
- MST-PER-004 Client Assignment Coordinator — manages mentor role
  changes if needed
- MST-PER-013 Client — participates in sessions, receives meeting
  requests and session summaries

**Process Workflow**

1. The mentor logs the first session against the Assigned engagement.
   The Engagement status changes to Active automatically.
2. After each subsequent session, the mentor creates a Session record
   capturing the date, duration, session type, topics covered, mentor
   notes, next steps, and the next session date.
3. The system calculates and updates roll-up analytics on the Engagement
   record — total sessions, total session hours, sessions in last 30
   days, and last session date.
4. When the mentor sets the Next Session Date on the Engagement or
   Session record, the system automatically sends a calendar meeting
   request to all engagement participants.
5. After logging a session the mentor may review and send a system-
   drafted session summary email to the client, populated from topics
   covered, next steps, and next session date.
6. The mentor may request a subject matter expert at any time during an
   active engagement by creating an SME Request record.
7. The Client Administrator monitors engagement activity and follows up
   with inactive engagements as alerted by the inactivity monitoring
   process (see MN-INACTIVE).
8. The mentor or Client Administrator may place an engagement On Hold
   at any time when a deliberate temporary pause is needed.

**System Requirements**
- MN-ENGAGE-REQ-001: The system must transition Engagement status from
  Assigned to Active automatically when the first session is logged
- MN-ENGAGE-REQ-002: The system must calculate and display roll-up
  analytics on the Engagement record — total sessions, total session
  hours, sessions in last 30 days, and last session date
- MN-ENGAGE-REQ-003: The system must send an automatic calendar
  meeting request to all engagement participants when a Next Session
  Date is set or updated
- MN-ENGAGE-REQ-004: The system must generate a draft session summary
  email from session data for mentor review and approval before sending
- MN-ENGAGE-REQ-005: The system must support subject matter expert
  requests initiated by mentors within an active engagement
- MN-ENGAGE-REQ-006: The system must support On Hold status with
  a recorded reason
- MN-ENGAGE-REQ-007: The system must support multiple concurrent
  engagements per client and per mentor within configured capacity limits
- MN-ENGAGE-REQ-008: The system must support multiple contacts from
  the client organization participating in a single engagement

**Process Data**
- MN-ENGAGE-DAT-001: Engagement record — status, assigned mentors,
  meeting cadence, engagement contacts, roll-up analytics
- MN-ENGAGE-DAT-002: Client Organization and Contact records
- MN-ENGAGE-DAT-003: Mentor profile — contact information, expertise

**Data Collected**
- MN-ENGAGE-DAT-004: Session records — date, duration, session type,
  meeting location, topics covered, mentor notes, next steps, new
  business started flag, next session date, mentor attendees
- MN-ENGAGE-DAT-005: SME Request records — subject matter needed,
  requesting mentor, SME assigned, status

---

### MN-INACTIVE — Inactivity Monitoring

**Process Purpose and Trigger**
The Inactivity Monitoring process runs continuously in the background
against all Active engagements. Its purpose is to detect engagements
where the mentoring relationship has gone quiet and alert administrators
before the relationship is lost entirely.

**Personas Involved**
- MST-PER-003 Client Administrator — receives alerts and follows up
  with mentors and clients
- MST-PER-011 Mentor — resumes activity or communicates a hold request

**Process Workflow**

1. The system monitors qualifying activity events daily against each
   Active engagement's configured meeting cadence. Qualifying events
   are: a session logged, an email sent or received linked to the
   engagement, a call logged, or a future session scheduled.
2. When no qualifying activity is detected within the cadence-aware
   threshold, the Engagement status changes to Dormant and the Client
   Administrator receives an alert notification.
   - Weekly cadence: Dormant after 14 days of inactivity
   - Bi-Weekly cadence: Dormant after 21 days of inactivity
   - Monthly cadence: Dormant after 45 days of inactivity
   - As Needed cadence: Dormant after 60 days of inactivity
3. The Client Administrator reviews the Dormant engagement and follows
   up with the mentor as appropriate.
4. If activity resumes, the Engagement status reverts to Active
   automatically.
5. If no activity for a further 60 days after becoming Dormant, the
   Engagement status changes to Inactive and the Client Administrator
   receives an alert.
6. If no activity for a further 90 days after becoming Inactive, the
   Engagement status changes to Abandoned. The engagement is treated
   as permanently closed and the Client Administrator receives a final
   notification.
7. On Hold engagements are excluded from inactivity monitoring. The
   clock does not run while an Engagement is On Hold.

All thresholds are configurable system settings.

**System Requirements**
- MN-INACTIVE-REQ-001: The system must monitor qualifying activity
  events daily against all Active engagements
- MN-INACTIVE-REQ-002: The system must apply cadence-aware Dormant
  thresholds based on the Meeting Cadence set on each Engagement
- MN-INACTIVE-REQ-003: The system must automatically transition
  Engagement status through Dormant → Inactive → Abandoned at
  configured thresholds
- MN-INACTIVE-REQ-004: The system must alert the Client Administrator
  at each status transition
- MN-INACTIVE-REQ-005: The system must revert Engagement status to
  Active automatically when qualifying activity resumes
- MN-INACTIVE-REQ-006: All inactivity thresholds must be configurable
  system settings
- MN-INACTIVE-REQ-007: On Hold engagements must be excluded from
  inactivity monitoring

**Process Data**
- MN-INACTIVE-DAT-001: Engagement record — status, meeting cadence,
  last activity date, session history
- MN-INACTIVE-DAT-002: Activity events — sessions, emails, calls,
  scheduled future sessions

**Data Collected**
- MN-INACTIVE-DAT-003: Status transition timestamps — date each
  status change occurred
- MN-INACTIVE-DAT-004: Administrator follow-up notes on Dormant and
  Inactive engagements

---

### MN-SURVEY — Client Satisfaction Tracking

**Process Purpose and Trigger**
The Client Satisfaction Tracking process is triggered automatically at
defined points in the engagement lifecycle. Its purpose is to collect
consistent client feedback on the mentoring relationship and make that
feedback visible to administrators and mentors.

**Personas Involved**
- MST-PER-013 Client — receives and completes surveys
- MST-PER-003 Client Administrator — monitors survey results
- MST-PER-011 Mentor — views survey results linked to their engagements

**Process Workflow**

1. The system monitors session count and engagement status to detect
   survey trigger conditions:
   - After the 2nd session — first survey triggered
   - Every 5 sessions thereafter (sessions 7, 12, 17, etc.)
   - At Engagement Close — final survey triggered regardless of
     session count
2. When a trigger condition is detected, the system generates a
   personalized survey link for the client and sends the survey to the
   client's primary email address via the integrated survey tool. No
   client login is required.
3. The client completes the survey — NPS score, satisfaction ratings,
   and optional open-ended feedback.
4. The completed survey response is posted back to the CRM by the
   survey tool and stored as a Survey Response record linked to the
   Engagement and, where applicable, the triggering session.
5. Survey responses are visible to the Client Administrator, Mentor
   Administrator, and assigned mentors. No automatic notification is
   sent to the mentor — they see responses on next login.

**System Requirements**
- MN-SURVEY-REQ-001: The system must automatically detect survey
  trigger conditions based on session count and engagement status
- MN-SURVEY-REQ-002: The system must integrate with an external
  survey tool to deliver surveys and receive completed responses
- MN-SURVEY-REQ-003: Survey delivery must not require a client login
- MN-SURVEY-REQ-004: Completed survey responses must be stored as
  records linked to the Engagement and triggering Session
- MN-SURVEY-REQ-005: Survey results must be visible to Client
  Administrator, Mentor Administrator, and assigned mentors
- MN-SURVEY-REQ-006: Survey results must be available for aggregate
  reporting and trend analysis

**Process Data**
- MN-SURVEY-DAT-001: Engagement record — session count, status,
  client contact information

**Data Collected**
- MN-SURVEY-DAT-002: Survey Response record — NPS score (0-10),
  did CBM help (yes/no), would return to see this mentor (1-5),
  mentor listened and understood needs (1-5), open feedback text,
  survey trigger type, survey date

---

### MN-CLOSE — Engagement Closure

**Process Purpose and Trigger**
The Engagement Closure process is triggered either by a Client
Administrator or mentor formally closing a completed engagement, or
automatically by the system when an engagement reaches Abandoned status.
Its purpose is to record the outcome of the engagement and preserve a
complete historical record.

**Personas Involved**
- MST-PER-003 Client Administrator — initiates formal closure and
  records outcomes
- MST-PER-011 Mentor — may initiate closure and records business
  outcomes
- MST-PER-013 Client — receives a final satisfaction survey

**Process Workflow**

Administrator or Mentor-initiated closure (Completed):
1. The Client Administrator or assigned Mentor navigates to the
   Engagement record and changes status to Completed.
2. A Close Reason is recorded: Goals Achieved | Client Withdrew | Other.
3. Client business outcomes achieved during the engagement are recorded.
4. The Close Date is system-populated with the current date.
5. A final satisfaction survey is triggered automatically.
6. The Engagement record becomes read-only for core fields. Notes,
   comments, and documents may still be added post-close by the Client
   Administrator or assigned Mentor.

System-initiated closure (Abandoned):
1. The system automatically changes Engagement status to Abandoned
   after the configured Inactive threshold is exceeded.
2. Close Reason is set automatically to Inactive / No Response.
3. The Close Date is system-populated.
4. A final satisfaction survey is triggered automatically.
5. The Client Administrator receives a notification.
6. The Engagement record becomes read-only for core fields.

In both cases, all records — Engagement, Sessions, Survey Responses —
are retained permanently. Closed Engagements are never reopened. If a
former client returns for mentoring, a new Engagement is created linked
to their existing records. Full history is preserved.

**System Requirements**
- MN-CLOSE-REQ-001: The system must support formal closure of an
  engagement by the Client Administrator or assigned Mentor with a
  recorded close reason
- MN-CLOSE-REQ-002: The system must automatically close an engagement
  with Abandoned status after the configured Inactive threshold
- MN-CLOSE-REQ-003: The system must trigger a final satisfaction
  survey at engagement close regardless of closure method
- MN-CLOSE-REQ-004: The system must record client business outcomes
  at engagement close
- MN-CLOSE-REQ-005: Closed Engagement records must become read-only
  for core fields while allowing post-close notes and documents
- MN-CLOSE-REQ-006: All engagement records must be retained
  permanently — no deletion or archival
- MN-CLOSE-REQ-007: The system must support a former client returning
  for a new engagement while retaining all prior engagement history

**Process Data**
- MN-CLOSE-DAT-001: Engagement record — status, assigned mentors,
  session history, survey history

**Data Collected**
- MN-CLOSE-DAT-002: Close reason — Goals Achieved | Client Withdrew |
  Inactive / No Response | Other
- MN-CLOSE-DAT-003: Close date — system-populated
- MN-CLOSE-DAT-004: Business outcomes — description of what the client
  achieved during the engagement

---

## 4. Data Reference

### Client Organization

Represents the business, nonprofit, or entrepreneurial venture being
mentored. The anchor record to which all contacts, engagements, and
related activity are linked.

| Data Item | Type | Required | Notes |
|---|---|---|---|
| Business Name | Text | No | May be blank for pre-startup applicants |
| Website | URL | No | |
| Address | Address | No | Street, city, state, zip |
| Organization Type | Enum | Yes | For-Profit, Non-Profit |
| Business Stage | Enum | Yes | Pre-Startup, Startup, Early Stage, Growth Stage, Established |
| NAICS Sector | Enum | Yes | Top-level industry classification (20 sectors) |
| NAICS Subsector | Enum | Yes | Second-level classification, filtered by Sector |
| Mentoring Focus Areas | Multi-select | Yes | Values defined by CBM leadership |
| Mentoring Needs Description | Rich Text | Yes | Free-form description of what the client seeks |
| Business Description | Rich Text | No | Phase 2 — detailed business description |
| Time in Operation | Text | No | Phase 2 |
| Current Team Size | Integer | No | Phase 2 |
| Revenue Range | Enum | No | Phase 2 — approximate annual revenue ranges TBD |
| Funding Situation | Rich Text | No | Phase 2 |
| Current Challenges | Rich Text | No | Phase 2 |
| Goals and Objectives | Rich Text | No | Phase 2 |
| Desired Outcomes (6-12 months) | Rich Text | No | Phase 2 |
| Previous Mentoring Experience | Rich Text | No | Phase 2 |
| Current Professional Advisors | Multi-select | No | Phase 2 — Banker, Attorney, Accountant, etc. |
| Registered with State | Boolean | No | Phase 2 |
| State of Registration | Enum | No | Phase 2 — shown when Registered = Yes |
| Legal Business Structure | Enum | No | Phase 2 — Sole Proprietor, LLC, S-Corp, etc. |
| EIN on File | Boolean | No | Phase 2 — shown when Registered = Yes |
| Date of Formation | Date | No | Phase 2 — shown when Registered = Yes |
| Registered Agent | Boolean | No | Phase 2 — shown when Registered = Yes |
| EIN Number | Text | No | Restricted — mentor/admin populated only |

### Client Contact

Represents an individual person associated with a client organization.
Multiple contacts may be linked to a single organization.

| Data Item | Type | Required | Notes |
|---|---|---|---|
| First Name | Text | Yes | |
| Last Name | Text | Yes | |
| Middle Name | Text | No | |
| Preferred Name | Text | No | Used in communications |
| Email | Email | Yes | |
| Phone | Phone | No | |
| Role at Business | Text | No | Title or position within the business |
| Primary Contact | Boolean | Yes | Defaults to Yes for first contact |
| Zip Code | Text | Yes | For geographic reporting |

### Engagement

Represents the active mentoring relationship between CBM and a client
organization.

| Data Item | Type | Required | Notes |
|---|---|---|---|
| Client Organization | Relationship | Yes | Link to Client Organization record |
| Status | Enum | Yes | Submitted, Declined, Pending Acceptance, Assigned, Active, On-Hold, Dormant, Inactive, Abandoned, Completed |
| Assigned Mentor | Relationship | Yes (when Assigned+) | Link to primary mentor Contact |
| Co-Mentors | Relationship (many) | No | Links to Co-Mentor Contact records |
| Subject Matter Experts | Relationship (many) | No | Links to SME Contact records |
| Engagement Contacts | Relationship (many) | No | Client contacts participating in this engagement |
| Meeting Cadence | Enum | Yes | Weekly, Bi-Weekly, Monthly, As Needed |
| Next Session Date/Time | Date/Time | No | Triggers meeting request when saved |
| Start Date | Date | System | Populated on transition to Active |
| Close Date | Date | System | Populated on closure |
| Close Reason | Enum | Yes (on close) | Goals Achieved, Client Withdrew, Inactive / No Response, Other |
| Total Sessions | Integer | System | Calculated from linked Session records |
| Total Sessions (Last 30 Days) | Integer | System | Calculated |
| Last Session Date | Date | System | Calculated |
| Total Session Hours | Decimal | System | Calculated |
| Business Outcomes | Rich Text | No | Recorded at closure |

### Session

Records each individual meeting between a mentor and client.

| Data Item | Type | Required | Notes |
|---|---|---|---|
| Engagement | Relationship | Yes | Link to parent Engagement |
| Session Date/Time | Date/Time | Yes | |
| Duration | Integer | Yes | Minutes |
| Session Type | Enum | Yes | In-Person, Video Call, Phone Call |
| Meeting Location Type | Enum | Conditional | Required when In-Person |
| Location Details | Text | No | Shown when Location Type = Other |
| Topics Covered | Multi-select + Rich Text | No | |
| Mentor Notes | Rich Text | No | Restricted to admin and assigned mentors |
| Next Steps | Rich Text | No | |
| New Business Started | Boolean | No | |
| Next Session Date/Time | Date/Time | No | Populates Engagement field when saved |
| Mentor Attendees | Relationship (many) | Yes | At least one mentor contact required |

### Survey Response

Captures client satisfaction feedback at defined points in the
engagement lifecycle.

| Data Item | Type | Required | Notes |
|---|---|---|---|
| Engagement | Relationship | Yes | Link to parent Engagement |
| Session | Relationship | No | Link to triggering Session |
| Survey Trigger | Enum | System | 2nd Session, Every 5 Sessions, Engagement Close |
| Survey Date/Time | Date/Time | System | |
| NPS Score | Integer | Yes | 0–10 |
| Did CBM Help You | Boolean | Yes | |
| Would Return to See This Mentor | Integer | Yes | Scale 1–5 |
| Mentor Listened and Understood | Integer | Yes | Scale 1–5 |
| How Could CBM Better Meet Needs | Rich Text | No | Open-ended feedback |

---

## 5. Decisions Made

| ID | Decision | Rationale | Date |
|---|---|---|---|
| MN-DEC-001 | Client Organization and Contact records are retained permanently regardless of Engagement outcome | Supports historical funder reporting and the possibility of clients returning for future engagements | March 2026 |
| MN-DEC-002 | Engagement data model uses a two-phase intake approach — Phase 1 collected at submission, Phase 2 deployed by mentor at their discretion | Phase 1 captures enough to identify a mentor; Phase 2 collects deeper business context that is more meaningful after the mentor relationship is established | March 2026 |
| MN-DEC-003 | Inactivity monitoring uses cadence-aware thresholds based on the Meeting Cadence field rather than fixed thresholds | A weekly-cadence engagement going quiet for 45 days is very different from a monthly-cadence engagement doing the same — fixed thresholds would generate false positives for less frequent cadences | March 2026 |
| MN-DEC-004 | Closed engagements are never reopened — returning clients receive a new Engagement linked to existing records | Preserves the integrity of historical engagement records and provides a clean separation between engagement cycles | March 2026 |
| MN-DEC-005 | Satisfaction surveys are triggered automatically at the 2nd session, every 5 sessions thereafter, and at engagement close | Provides consistent feedback at meaningful milestones without survey fatigue | March 2026 |
| MN-DEC-006 | The mentor introduction to the client is personal and mentor-authored — not auto-generated by the system | Establishes the human relationship from the first interaction; templates are provided as a starting point only | March 2026 |

---

## 6. Open Issues

| ID | Issue | Owner | Target |
|---|---|---|---|
| MN-ISS-001 | Mentoring Focus Areas dropdown values have not yet been defined by CBM leadership | CBM Leadership | Before go-live |
| MN-ISS-002 | Session Topics Covered multi-select values have not yet been defined | CBM Leadership | Before go-live |
| MN-ISS-003 | Revenue Range dropdown values for Phase 2 intake have not been defined | CBM Leadership | Before go-live |
| MN-ISS-004 | Formal eligibility screening criteria for client intake review (Step 4 of MN-INTAKE) have not been defined — current process assumes basic administrative review only | CBM Leadership | Before go-live |
| MN-ISS-005 | The specific survey tool to be integrated for satisfaction survey delivery has not been selected | Tech Admin | Before go-live |

---

## 7. Interview Transcript

*This section will be populated with the verbatim Q&A record from
requirements interview sessions conducted to produce this Domain PRD.
The content of this version was derived from existing archived
specification documents (CBM-PRD-CRM-Client.docx v1.8) rather than
a live interview session. A formal interview session should be
conducted with CBM stakeholders to validate and augment the
requirements captured here.*
