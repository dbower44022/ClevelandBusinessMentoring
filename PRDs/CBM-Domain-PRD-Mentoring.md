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

This section defines all data collected and managed in the Mentoring
domain. Each entity is described with its purpose, fields, business
rules, and enum values. Descriptions are included for stakeholder
review and serve as the direct source for implementation documentation.

Relationships between entities are described in plain business language
in Section 4.6.

---

### 4.1 Client Organization

The Client Organization represents the business, nonprofit, or
entrepreneurial venture being mentored. It is the anchor record to
which all contacts, engagements, and related activity are linked.
Client Organization records are retained permanently and are never
deleted, regardless of engagement outcome.

Client Organization data is collected in two phases. Phase 1 fields
are captured on the public intake form and must be sufficient to
identify an appropriate mentor. Phase 2 fields are collected via a
supplemental form deployed by the mentor at their discretion after
assignment.

---

**Business Name** | Text | Optional | Phase 1
> The legal or operating name of the client business. Optional because
> applicants at the pre-startup stage may not yet have a business name.

**Website** | URL | Optional | Phase 1
> The client business website address, if one exists.

**Address** | Address | Optional | Phase 1 — street, city, state, zip
> The primary business address. Used for geographic reporting and
> service area tracking.

**Organization Type** | Enum | Required | Phase 1
> Values: For-Profit, Non-Profit
>
> Whether the organization operates as a for-profit business or a
> nonprofit. Drives funder reporting categories.

**Business Stage** | Enum | Required | Phase 1
> Values: Pre-Startup, Startup, Early Stage, Growth Stage, Established
>
> The stage of business development the client organization is currently
> in. Used for mentor matching and funder reporting.

**NAICS Sector** | Enum | Required | Phase 1
> Values: 20 top-level NAICS industry sectors. Drives NAICS Subsector
> filter.
>
> The primary industry sector of the client business based on the North
> American Industry Classification System. Used for mentor matching and
> impact reporting.

**NAICS Subsector** | Enum | Required | Phase 1
> Values: Approximately 100 subsectors, filtered by selected NAICS
> Sector.
>
> The specific industry subsector within the selected NAICS Sector.
> Provides more precise industry classification for matching and
> reporting.

**Mentoring Focus Areas** | Multi-select | Required | Phase 1
> Values: To be defined by CBM leadership — see Open Issue MN-ISS-001
>
> The specific areas where the client is seeking mentoring assistance.
> Used as a primary matching criterion between clients and mentors.
> Values must be aligned with the corresponding field on the Mentor
> profile.

**Mentoring Needs Description** | Rich Text | Required | Phase 1
> Free-form description of what the client is looking for in a
> mentoring engagement. Reviewed by the Client Assignment Coordinator
> during mentor matching.

**Business Description** | Rich Text | Optional | Phase 2
> A detailed description of what the business does, its history, and
> founding story. Collected after mentor assignment to give the mentor
> deeper context about the client.

**Time in Operation** | Text | Optional | Phase 2
> How long the business has been operating. Provides context for the
> mentor about the client's experience level.

**Current Team Size** | Integer | Optional | Phase 2
> The number of current employees or team members. Helps the mentor
> understand the scale and complexity of the business.

**Revenue Range** | Enum | Optional | Phase 2
> Values: To be defined by CBM leadership — see Open Issue MN-ISS-003
>
> Approximate annual revenue range. Provides financial context without
> requiring disclosure of exact figures.

**Funding Situation** | Rich Text | Optional | Phase 2
> Description of the client's current funding sources, funding needs,
> or funding challenges.

**Current Challenges** | Rich Text | Optional | Phase 2
> The primary obstacles the business is currently facing. Helps the
> mentor focus the engagement on the most pressing needs.

**Goals and Objectives** | Rich Text | Optional | Phase 2
> What the client wants to achieve through the mentoring engagement
> overall.

**Desired Outcomes (6–12 Months)** | Rich Text | Optional | Phase 2
> Specific outcomes the client hopes to achieve within the near term.
> Used to track progress and assess engagement success.

**Previous Mentoring Experience** | Rich Text | Optional | Phase 2
> Whether the client has worked with a mentor or advisor before, and
> any relevant context about prior experiences.

**Current Professional Advisors** | Multi-select | Optional | Phase 2
> Values: Banker / Financial Institution, Attorney / Legal Counsel,
> Accountant / CPA, IT Consultant, Insurance Agent,
> Marketing / PR Consultant, Business Coach
>
> The types of professional advisors the client is currently working
> with. Helps the mentor avoid duplicating advice the client is already
> receiving and identify gaps.

**Registered with State** | Boolean | Optional | Phase 2
> Whether the business has filed with the state as an official legal
> entity.

**State of Registration** | Enum | Optional | Phase 2
> Values: All US states. Shown only when Registered with State = Yes.
>
> The state where the business entity is registered.

**Legal Business Structure** | Enum | Optional | Phase 2
> Values: Sole Proprietor, Partnership, LLC, S-Corp, C-Corp,
> Non-Profit 501(c)(3), Other. Shown only when Registered with
> State = Yes.
>
> The legal structure of the registered business entity.

**EIN on File** | Boolean | Optional | Phase 2
> Shown only when Registered with State = Yes.
>
> Whether the business has obtained a federal Employer Identification
> Number.

**Date of Formation** | Date | Optional | Phase 2
> Shown only when Registered with State = Yes.
>
> The date the business entity was formally established with the state.

**Registered Agent** | Boolean | Optional | Phase 2
> Shown only when Registered with State = Yes.
>
> Whether the business has a designated registered agent on file with
> the state.

**EIN Number** | Text | Optional | Restricted
> Restricted field — visible to Client Administrator, Client Assignment
> Coordinator, and assigned mentors only. Populated by mentor or admin,
> never collected on the public intake form.
>
> The actual federal Employer Identification Number. Entered by the
> mentor if needed during the engagement.

---

### 4.2 Client Contact

A Client Contact represents an individual person associated with a
client organization. Multiple contacts may be linked to a single
organization. The person who submits the Phase 1 intake form
automatically becomes the first contact and is flagged as the Primary
Contact. Additional contacts may be added by the Client Administrator
or assigned mentor as the engagement progresses.

---

**First Name** | Text | Required
> The contact's first name.

**Last Name** | Text | Required
> The contact's last name.

**Middle Name** | Text | Optional
> The contact's middle name.

**Preferred Name** | Text | Optional
> The name the contact prefers to be called. Used in communications
> and engagement materials when provided.

**Email** | Email | Required
> The contact's primary email address. Used for all CBM communications
> including mentor introduction, meeting requests, and satisfaction
> surveys.

**Phone** | Phone | Optional
> The contact's primary phone number.

**Zip Code** | Text | Required | Phase 1
> The contact's zip code. Used for geographic service area reporting
> and outreach targeting.

**Role at Business** | Text | Optional
> The contact's title or position within the client business — for
> example, Owner, Co-Founder, CEO, or Manager.

**Primary Contact** | Boolean | Required
> Defaults to Yes for the first contact created on an organization.
>
> Identifies this contact as the primary point of contact for the
> client organization. Automated communications default to the primary
> contact when no specific engagement contacts are designated.

---

### 4.3 Engagement

The Engagement represents the active mentoring relationship between
CBM and a client organization. It is linked to a Client Organization
and tracks the lifecycle, mentor assignments, session activity, and
satisfaction survey history for the relationship.

An organization may have more than one Engagement over time. Only one
Engagement per organization should be in an active status at any given
time. Closed Engagements are never deleted or reopened.

---

**Client Organization** | Relationship | Required
> The client organization this engagement is associated with.

**Status** | Enum | Required
> Values: Submitted, Declined, Pending Acceptance, Assigned, Active,
> On-Hold, Dormant, Inactive, Abandoned, Completed
>
> The current lifecycle stage of the mentoring engagement. Drives all
> workflow automation including inactivity monitoring, survey triggers,
> and notifications. See processes MN-INTAKE, MN-MATCH, MN-ENGAGE, and
> MN-INACTIVE for status transition rules.

**Assigned Mentor** | Relationship | Required when Assigned or later
> The primary volunteer mentor assigned to this engagement. Set by the
> Client Assignment Coordinator during the matching process.

**Co-Mentors** | Relationship (many) | Optional
> One or more volunteer mentors assigned in a supporting co-mentor
> role. Multiple co-mentors may be active simultaneously.

**Subject Matter Experts** | Relationship (many) | Optional
> One or more volunteer mentors providing specialist expertise on
> request. Distinct from co-mentors in that SMEs are engaged for
> specific topics rather than ongoing support.

**Engagement Contacts** | Relationship (many) | Optional
> Defaults to Primary Contact if empty.
>
> The specific individuals from the client organization actively
> participating in this engagement. Determines who receives meeting
> requests and session summary emails.

**Meeting Cadence** | Enum | Required
> Values: Weekly, Bi-Weekly, Monthly, As Needed
>
> The expected frequency of mentor-client meetings. Drives the
> cadence-aware inactivity monitoring thresholds for this engagement.

**Next Session Date/Time** | Date/Time | Optional
> Saving this field triggers an automatic calendar meeting request to
> all engagement participants and resets the inactivity monitoring
> clock.
>
> The scheduled date and time of the next mentor-client meeting.

**Start Date** | Date | System-populated
> Populated automatically when status transitions to Active.
>
> The date the engagement became active — when the first session was
> logged.

**Close Date** | Date | System-populated
> Populated automatically on closure.
>
> The date the engagement was formally closed.

**Close Reason** | Enum | Required on closure
> Values: Goals Achieved, Client Withdrew, Inactive / No Response,
> Other. Automatically set to Inactive / No Response for
> system-initiated Abandoned closures.
>
> The reason the engagement was closed.

**Total Sessions** | Integer | System-calculated | Read-only
> The total number of sessions logged against this engagement.

**Total Sessions (Last 30 Days)** | Integer | System-calculated | Read-only
> The number of sessions logged in the last 30 days. Used alongside
> Last Session Date to assess recent engagement activity.

**Last Session Date** | Date | System-calculated | Read-only
> The date of the most recently logged session.

**Total Session Hours** | Decimal | System-calculated | Read-only
> The total hours of mentoring delivered in this engagement. Calculated
> from the Duration field across all linked Session records.

**Business Outcomes** | Rich Text | Optional
> Recorded at closure by the Client Administrator or mentor.
>
> A description of the business outcomes and results the client
> achieved during the engagement. Used for funder impact reporting.

---

### 4.4 Session

A Session records each individual meeting between a mentor and client.
Sessions are linked to an Engagement and drive the roll-up analytics
on the Engagement record, the satisfaction survey trigger logic, and
the inactivity monitoring clock.

At least one mentor contact must be listed as an attendee before a
session record can be saved. Mentors are encouraged to complete the
session record while on the call with the client so the next session
date can be set in real time.

---

**Engagement** | Relationship | Required
> The engagement this session belongs to.

**Session Date/Time** | Date/Time | Required
> The date and time the session occurred.

**Duration** | Integer | Required | Recorded in minutes
> The length of the session in minutes. Used to calculate Total Session
> Hours on the Engagement record.

**Session Type** | Enum | Required
> Values: In-Person, Video Call, Phone Call
>
> How the session was conducted. Drives conditional display of meeting
> location fields.

**Meeting Location Type** | Enum | Conditional
> Values: CBM Office, Client's Place of Business, Other.
> Required when Session Type = In-Person. Shown only when In-Person.
>
> Where an in-person session took place.

**Location Details** | Text | Optional
> Shown only when Meeting Location Type = Other.
>
> Free-text description of the meeting location.

**Topics Covered** | Multi-select + Rich Text | Optional
> Multi-select values to be defined by CBM leadership — see Open Issue
> MN-ISS-002. Includes a free-text field for additional detail.
>
> The topics discussed during the session.

**Mentor Notes** | Rich Text | Optional | Restricted
> Visible to Client Administrator, Mentor Administrator, and assigned
> mentors only. Never visible to clients.
>
> Private notes from the mentor about session content, observations,
> and context.

**Next Steps** | Rich Text | Optional
> The agreed-upon actions and follow-up items coming out of the
> session. May be included in the session summary email sent to the
> client.

**New Business Started** | Boolean | Optional
> Whether this session resulted in the client starting a new business.
> Tracked for funder impact reporting.

**Next Session Date/Time** | Date/Time | Optional
> When saved, automatically updates the Next Session Date/Time on the
> linked Engagement record, triggering a meeting request to all
> participants.
>
> The scheduled date and time of the next meeting. Intended to be set
> while the mentor has the client on the call.

**Mentor Attendees** | Relationship (many) | Required
> At least one mentor contact must be listed before the record can
> be saved. The mentor who logs the session and the attendees listed
> are independent — the logger need not be listed as an attendee.
>
> The mentors who were physically present at the session.

---

### 4.5 Survey Response

A Survey Response captures client satisfaction feedback at defined
points in the engagement lifecycle. Surveys are triggered automatically
— after the 2nd session, every 5 sessions thereafter, and at
engagement close. Responses are linked to both the Engagement and
the triggering Session where applicable.

Survey responses are visible to the Client Administrator, Mentor
Administrator, and assigned mentors. No automatic notification is
sent to the mentor — they see responses on next login.

---

**Engagement** | Relationship | Required
> The engagement this survey response is associated with.

**Session** | Relationship | Optional
> The session that triggered this survey, if applicable. Not set for
> engagement close surveys.

**Survey Trigger** | Enum | System-populated | Read-only
> Values: 2nd Session, Every 5 Sessions, Engagement Close
>
> The event that triggered this survey. Provides context when reviewing
> satisfaction trends over time.

**Survey Date/Time** | Date/Time | System-populated | Read-only
> The date and time the client submitted their survey response.

**NPS Score** | Integer | Required | Scale 0–10
> Standard Net Promoter Score question: How likely are you to recommend
> CBM to a friend or colleague? Used to calculate CBM's overall NPS
> and track satisfaction trends over time.

**Did CBM Help You** | Boolean | Required | Yes / No
> Whether the client felt CBM helped them. A simple binary measure of
> program effectiveness.

**Would Return to See This Mentor** | Integer | Required | Scale 1–5
> The client's rating of whether they would want to work with the same
> mentor again. Used to assess mentor effectiveness.

**Mentor Listened and Understood** | Integer | Required | Scale 1–5
> The client's rating of whether the mentor listened to and understood
> their needs. A key indicator of mentoring relationship quality.

**How Could CBM Better Meet Needs** | Rich Text | Optional
> Free-form feedback from the client on how CBM could improve its
> services. Reviewed by administrators for program improvement insights.

---

### 4.6 Entity Relationships

The following describes how the entities in the Mentoring domain
relate to each other in business terms.

**Client Organization → Client Contact**
A Client Organization has one or more Client Contacts. Each Contact
belongs to one Organization. The person who submits the intake form
automatically becomes the first Contact. Additional contacts may be
added as the engagement progresses. One Contact is designated as the
Primary Contact.

**Client Organization → Engagement**
A Client Organization may have one or more Engagements over its
lifetime. Each Engagement belongs to one Organization. Only one
Engagement should be in an active status at any given time.

**Engagement → Mentor / Co-Mentor / Subject Matter Expert**
An Engagement has exactly one Assigned Mentor. It may also have one
or more Co-Mentors and one or more Subject Matter Experts. All are
volunteer mentors linked from the Mentor population.

**Engagement → Engagement Contacts**
An Engagement may have one or more Client Contacts designated as
active participants. These contacts receive meeting requests and
session summary emails. If no contacts are designated, communications
go to the Primary Contact on the linked Organization.

**Engagement → Session**
An Engagement has zero or more Sessions. Each Session belongs to
exactly one Engagement. Sessions drive the engagement's roll-up
analytics, satisfaction survey triggers, and inactivity monitoring
clock.

**Engagement → Survey Response**
An Engagement has zero or more Survey Responses. Each Survey Response
belongs to exactly one Engagement. Responses are linked to the
triggering Session where applicable.

**Session → Survey Response**
A Session may trigger one Survey Response. The Survey Response links
back to the triggering Session to provide traceability between the
session milestone and the feedback received.


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
