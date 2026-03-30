# Cleveland Business Mentors
# Domain PRD: Mentor Recruitment

**Version:** 1.0 **Status:** Draft **Last Updated:** 03-29-26 21:45 **Domain Code:** MR
**Depends On:** CBM-Master-PRD.md

---

## 1. Domain Overview

The Mentor Recruitment domain manages the full lifecycle of a volunteer mentor — from initial awareness of CBM's program through application, onboarding, active service, and eventual departure. Its purpose is to ensure CBM maintains a healthy, qualified, and engaged mentor population capable of serving the client base.

Without a reliable pipeline of skilled volunteer mentors, CBM cannot deliver on its core mission. The Mentor Recruitment domain exists to make sure that pipeline never runs dry — attracting the right professionals, onboarding them correctly, keeping them engaged, and managing their departure in a way that preserves institutional knowledge and historical records.

Mentors are not a separate entity in the data model — they are Contact records distinguished from Client Contacts by a Contact Type field. This design choice means that a single Contact record serves as the mentor's complete profile throughout their entire relationship with CBM, from initial application through permanent historical record after departure. The same Contact entity is shared with the Mentoring domain, which uses it for client contacts. Conflict resolution between the two domains' field requirements is managed in the Consolidated Design.

Mentors may serve in three distinct roles within an engagement — Primary Mentor, Co-Mentor, or Subject Matter Expert — and a single individual may hold multiple roles simultaneously across different engagements. Annual dues are collected from all Active mentors to support CBM's operating costs.

---

## 2. Personas

**MST-PER-005 — Mentor Administrator**
The primary administrator for this domain. Reviews and processes mentor applications, manages the onboarding and activation workflow, monitors mentor status and capacity, tracks training completion, manages dues billing, and handles offboarding. The Mentor Administrator is the mentor's primary point of contact within CBM administration.

**MST-PER-006 — Mentor Recruiter**
Responsible for raising awareness of CBM's volunteer program and attracting qualified applicants. Manages outreach campaigns, maintains prospect contact lists, tracks application volume trends, and coordinates with the Partner Coordinator on joint recruitment initiatives through partner organizations.

**MST-PER-008 — Partner Coordinator**
Supports mentor recruitment by leveraging partner organization relationships. Some partners contribute mentors from their professional networks or staff. The Partner Coordinator tracks partner-affiliated mentors and coordinates joint recruitment initiatives.

**MST-PER-011 — Mentor**
The volunteer professional applying to and participating in CBM's mentoring program. Submits their application, completes onboarding requirements, manages their own profile and availability, accepts or declines client assignments, logs session activity, and maintains their relationship with CBM throughout their tenure.

---

## 3. Business Processes

### MR-RECRUIT — Mentor Recruitment

**Process Purpose and Trigger**
The Mentor Recruitment process is ongoing — it runs continuously to maintain awareness of CBM's volunteer program within the professional and business community. It is triggered proactively when mentor capacity falls below program needs, or as a standing outreach effort to build and maintain a healthy prospect pipeline.

**Personas Involved**
- MST-PER-006 Mentor Recruiter — leads outreach and campaign activity
- MST-PER-008 Partner Coordinator — supports through partner channels

**Process Workflow**

1. The Mentor Recruiter identifies target audiences for outreach — professional associations, industry groups, civic organizations, and partner networks — based on current gaps in the mentor roster by industry, expertise, or geography.
2. The Mentor Recruiter manages outreach campaigns through the outbound marketing system, using contact lists maintained in the CRM as the source of truth.
3. Prospect contacts generated through outreach are created or updated in the CRM and tagged as mentor prospects.
4. The source of each mentor application is recorded to track which outreach channels are most effective.
5. Campaign engagement history — emails sent, opened, and clicked — is recorded back into the CRM against each prospect contact record.

**System Requirements**
- MR-RECRUIT-REQ-001: The system must maintain a prospect contact list of potential mentor candidates separate from active mentor records
- MR-RECRUIT-REQ-002: The system must record the source of each mentor application — how the applicant heard about CBM
- MR-RECRUIT-REQ-003: The system must track outreach activity and communication history with prospects
- MR-RECRUIT-REQ-004: The system must synchronize contact lists to the outbound marketing system and record campaign engagement history back against each contact record

**Process Data**
- MR-RECRUIT-DAT-001: Current mentor roster — expertise, industry, geography — to identify recruitment gaps
- MR-RECRUIT-DAT-002: Partner organization profiles and affiliated contacts — to support targeted partner-channel recruitment

**Data Collected**
- MR-RECRUIT-DAT-003: Prospect contact records — name, email, professional background, outreach source
- MR-RECRUIT-DAT-004: Campaign engagement history — emails sent, opened, clicked, linked to prospect contact records

---

### MR-APPLY — Mentor Application

**Process Purpose and Trigger**
The Mentor Application process begins when a prospective mentor submits an application through the CBM public website. Its purpose is to capture the applicant's professional background and credentials, notify the Mentor Administrator, and route the application for review.

**Personas Involved**
- MST-PER-011 Mentor — submits the application
- MST-PER-005 Mentor Administrator — reviews and approves or declines

**Process Workflow**

1. The prospective mentor completes and submits the mentor application form on the CBM public website.
2. The system automatically creates a Contact record with Contact Type set to Mentor and Mentor Status set to Submitted. All submitted field values are populated. Terms and Conditions Accepted is set to Yes and the acceptance timestamp is recorded.
3. The system sends a confirmation email to the applicant's personal email address acknowledging receipt and advising they will be contacted shortly.
4. The Mentor Administrator receives an automatic notification of the new application.
5. New applications appear in a dedicated Submitted Applications view for the Mentor Administrator to review.
6. The Mentor Administrator reviews the application informally — no structured scoring or workflow is required. Notes may be recorded on the Contact record during review.
7. If approved: the Mentor Administrator changes Mentor Status to Provisional and proceeds to the onboarding workflow (MR-ONBOARD).
8. If declined: the Mentor Administrator changes Mentor Status to Declined and notifies the applicant directly via email. No automated notification is sent. The Contact record is retained permanently.

**System Requirements**
- MR-APPLY-REQ-001: The system must accept mentor applications submitted through the public website and create a Contact record automatically with Contact Type = Mentor and Mentor Status = Submitted
- MR-APPLY-REQ-002: The system must record Terms and Conditions Accepted = Yes and the acceptance timestamp at time of submission
- MR-APPLY-REQ-003: The system must send a confirmation email to the applicant's personal email address automatically upon submission
- MR-APPLY-REQ-004: The system must notify the Mentor Administrator immediately upon receipt of a new application
- MR-APPLY-REQ-005: New applications must appear in a dedicated Submitted Applications view accessible to the Mentor Administrator
- MR-APPLY-REQ-006: The system must support recording of a decline reason when an application is rejected
- MR-APPLY-REQ-007: Contact records must be retained permanently regardless of application outcome

**Process Data**
- MR-APPLY-DAT-001: Existing Contact records — to check for duplicate applications from the same individual

**Data Collected**
- MR-APPLY-DAT-002: Mentor Contact record — full application fields including identity, professional background, expertise, languages, why interested in mentoring, how heard about CBM, felony disclosure, and terms acceptance timestamp

---

### MR-ONBOARD — Mentor Onboarding

**Process Purpose and Trigger**
The Mentor Onboarding process begins when the Mentor Administrator approves a mentor application and sets Mentor Status to Provisional. Its purpose is to verify the mentor meets all CBM requirements and formally activate them as a volunteer mentor.

**Personas Involved**
- MST-PER-005 Mentor Administrator — manages and tracks all onboarding steps
- MST-PER-011 Mentor — completes training, accepts ethics agreement, and fulfills onboarding requirements

**Process Workflow**

1. The Mentor Administrator communicates onboarding requirements to the provisional mentor — required training, ethics agreement, and background check if applicable.
2. The mentor completes the required training modules via the learning management system. Upon completion, the system automatically sets Training Completed = Yes and records the completion date on the mentor Contact record via the LMS integration.
3. The mentor accepts the CBM ethics agreement. The Mentor Administrator sets Ethics Agreement Accepted = Yes and records the acceptance date and time on the Contact record.
4. The Mentor Administrator conducts a background check if required and sets Background Check Completed = Yes and the Background Check Date on the Contact record.
5. The Mentor Administrator assigns the mentor's organizational email address and populates the CBM Email Address field on the Contact record. The email account is provisioned separately outside the CRM.
6. The Mentor Administrator sets the mentor's Maximum Client Capacity and sets Accepting New Clients = Yes.
7. The Mentor Administrator changes Mentor Status from Provisional to Active. No automated notification is sent — the Mentor Administrator communicates activation to the mentor directly.

All seven steps must be completed before Mentor Status is changed to Active. The Mentor Administrator is responsible for verifying completion of each step before proceeding.

**System Requirements**
- MR-ONBOARD-REQ-001: The system must track mentor status through the full lifecycle — Submitted, In Review, Provisional, Active, Paused, Inactive, Resigned, Departed, Declined
- MR-ONBOARD-REQ-002: The system must integrate with the learning management system to automatically record training completion status and date on the mentor Contact record
- MR-ONBOARD-REQ-003: The system must support recording of ethics agreement acceptance with timestamp
- MR-ONBOARD-REQ-004: The system must support recording of background check status and date
- MR-ONBOARD-REQ-005: The system must support assignment of a CBM organizational email address to each activated mentor
- MR-ONBOARD-REQ-006: The system must support setting mentor capacity and accepting new clients flag before activation

**Process Data**
- MR-ONBOARD-DAT-001: LMS training completion data — received via integration from the learning management system

**Data Collected**
- MR-ONBOARD-DAT-002: Training completion status and date
- MR-ONBOARD-DAT-003: Ethics agreement acceptance and timestamp
- MR-ONBOARD-DAT-004: Background check status and date
- MR-ONBOARD-DAT-005: CBM organizational email address
- MR-ONBOARD-DAT-006: Maximum client capacity and accepting new clients flag

---

### MR-MANAGE — Mentor Management

**Process Purpose and Trigger**
The Mentor Management process is ongoing throughout an active mentor's tenure with CBM. It covers profile maintenance, capacity management, dues billing, and the monitoring of mentor activity across all assigned engagements.

**Personas Involved**
- MST-PER-005 Mentor Administrator — manages records, monitors activity, handles dues billing
- MST-PER-011 Mentor — maintains their own profile, manages availability, accesses their dashboard

**Process Workflow**

1. Active mentors maintain their own profile — biography, expertise, industry sectors, languages, and availability — directly in the CRM.
2. Mentors set their Maximum Client Capacity and Accepting New Clients flag to manage their availability for new assignments.
3. The system continuously calculates each mentor's Current Active Clients and Available Capacity from their active engagement records.
4. The Mentor Administrator monitors the mentor roster for activity levels, capacity, and upcoming dues obligations.
5. At the start of each billing cycle, the Mentor Administrator creates annual dues records for all Active mentors and initiates the billing process.
6. Mentor dues payments are recorded and Dues Status is updated on the mentor Contact record.
7. If a dues waiver is granted, the Mentor Administrator sets Dues Status to Waived. No payment is required.
8. If dues remain unpaid after a configurable grace period, the Mentor Administrator receives an alert and follows up directly.
9. The Mentor Administrator monitors mentor-level activity. If an Active mentor has had no session activity and no active engagements for a configurable period, the Mentor Administrator receives an alert to follow up. No automated status change occurs.

**System Requirements**
- MR-MANAGE-REQ-001: The system must store a complete mentor profile including biography, expertise, industry sectors, languages, and availability
- MR-MANAGE-REQ-002: The system must support multiple mentor roles — Primary Mentor, Co-Mentor, Subject Matter Expert — on the same Contact record
- MR-MANAGE-REQ-003: The system must calculate Current Active Clients and Available Capacity automatically from active engagement records
- MR-MANAGE-REQ-004: The system must provide a searchable mentor directory accessible to all active mentors
- MR-MANAGE-REQ-005: The system must track board membership status for mentors serving on the CBM board
- MR-MANAGE-REQ-006: The system must support annual dues billing — creating dues records, tracking payment status, and alerting the Mentor Administrator when dues remain unpaid past the grace period
- MR-MANAGE-REQ-007: The system must alert the Mentor Administrator when an active mentor has had no session activity and no active engagements beyond a configurable threshold
- MR-MANAGE-REQ-008: The system must track mentor analytics across all engagements — session counts, hours, outcomes, and trends
- MR-MANAGE-REQ-009: The system must support administrator notes on individual mentor records

**Process Data**
- MR-MANAGE-DAT-001: Engagement records — to calculate Current Active Clients and Available Capacity
- MR-MANAGE-DAT-002: Session records — to monitor mentor activity levels

**Data Collected**
- MR-MANAGE-DAT-003: Updated mentor profile — biography, expertise, industry sectors, languages, availability
- MR-MANAGE-DAT-004: Dues records — billing year, amount, payment status, payment date
- MR-MANAGE-DAT-005: Dues Status on mentor Contact — Unpaid, Paid, Waived

---

### MR-DEPART — Mentor Departure and Reactivation

**Process Purpose and Trigger**
The Mentor Departure process is initiated by the Mentor Administrator when a mentor exits CBM voluntarily or is removed. The Reactivation process is the reverse — bringing a previously inactive or departed mentor back to active status. Both are triggered by a change in the mentor's relationship with CBM.

**Personas Involved**
- MST-PER-005 Mentor Administrator — manages all departure and reactivation steps
- MST-PER-011 Mentor — may initiate a departure or reactivation request

**Process Workflow**

Departure:
1. The Mentor Administrator changes Mentor Status to Departed, records the Departure Date, and selects the Departure Reason.
2. The Mentor Administrator sets Accepting New Clients = No.
3. The Mentor Administrator reviews all Active and Assigned engagements where the departing mentor is the Primary Mentor. Each must be reassigned to a new Primary Mentor or formally closed before offboarding is complete.
4. Co-Mentor and SME assignments are reviewed and removed as appropriate.
5. The Mentor Administrator clears the CBM Email Address field and deprovisions the email account outside the CRM.
6. The mentor Contact record is retained permanently. All session history, engagement history, notes, and dues records remain intact. No data is deleted or anonymized.

Pausing (temporary):
1. If a mentor needs a temporary break, the Mentor Administrator changes Mentor Status to Paused and sets Accepting New Clients = No.
2. Existing active engagements continue unless the mentor requests otherwise.
3. When the mentor is ready to return, the Mentor Administrator changes Mentor Status back to Active.

Reactivation from Inactive or Departed:
1. The Mentor Administrator changes Mentor Status to Active.
2. The Mentor Administrator verifies that training, ethics agreement, and background check records are current. If any have expired or require renewal, the Mentor Administrator initiates the relevant onboarding steps before reactivation.
3. The Mentor Administrator sets Accepting New Clients and Maximum Client Capacity appropriately.

**System Requirements**
- MR-DEPART-REQ-001: The system must support transition of a mentor to Paused, Inactive, Resigned, or Departed status with a recorded reason and date
- MR-DEPART-REQ-002: The system must support reactivation of a mentor from Inactive or Departed status back to Active
- MR-DEPART-REQ-003: The system must alert the Mentor Administrator if a departing mentor has active engagements that require reassignment before offboarding is complete
- MR-DEPART-REQ-004: All mentor records must be retained permanently after departure — no deletion or anonymization

**Process Data**
- MR-DEPART-DAT-001: Active and Assigned engagement records linked to the departing mentor — to identify reassignment requirements

**Data Collected**
- MR-DEPART-DAT-002: Departure reason — Relocated, Career Change, Time Constraints, Personal, Other
- MR-DEPART-DAT-003: Departure date
- MR-DEPART-DAT-004: Reactivation date when applicable

---

## 4. Data Reference

This section defines all data collected and managed in the Mentor Recruitment domain. The Mentor Contact entity is shared with the Mentoring domain. Fields already defined in the Mentoring Domain PRD are not repeated here — this section covers the mentor-specific fields added by this domain. The Consolidated Design contains the complete unified field list for the Contact entity.

Relationships between entities are described in Section 4.4.

---

### 4.1 Mentor Contact (Mentor-Specific Fields)

The Mentor Contact is built on the same Contact entity as the Client Contact defined in the Mentoring Domain PRD. Mentors are distinguished from Client Contacts by a Contact Type field. All identity fields (First Name, Last Name, Email, Phone, etc.) are shared with the Client Contact definition.

The following fields are specific to the Mentor Contact and are added by this domain.

**Contact Type** | Enum | Required
> Values: Mentor, Client
>
> Distinguishes mentor contacts from client contacts on the shared
> Contact entity. Set to Mentor automatically when a mentor application
> is submitted. Drives conditional visibility of mentor-specific and
> client-specific field panels throughout the system.

**Personal Email** | Email | Required
> The mentor's personal email address — not their CBM organizational
> email. Used for all onboarding communications prior to CBM email
> activation and as a permanent contact address independent of their
> CBM account.

**CBM Email Address** | Email | Optional | Admin-populated
> The mentor's assigned CBM organizational email address. Populated
> by the Mentor Administrator during activation. Used for all ongoing
> mentoring communications after activation. Cleared on departure.

**LinkedIn Profile URL** | URL | Optional
> Collected on the mentor application form. Used for mentor profile
> and background verification.

**Professional Title** | Text | Optional
> The mentor's current job title or professional role.

**Current Employer** | Text | Optional
> The name of the mentor's current employer or organization.

**Currently Employed** | Boolean | Optional
> Collected on the mentor application form. Whether the mentor was
> employed at the time of application.

**Years of Business Experience** | Integer | Optional
> The mentor's total years of professional business experience. Used
> for mentor profile and matching.

**Professional Bio / Work Experience** | Rich Text | Optional
> Collected on the mentor application form. Free-form description of
> the mentor's professional background and work experience. Used for
> mentor profiles and matching communications.

**Industry Sectors** | Multi-select | Required
> Values: Aligned with the Industry Sector values on the Client
> Organization record. One or more sectors may be selected.
>
> The industry sectors in which the mentor has experience. Used as a
> primary matching criterion between mentors and clients. Values must
> align with the Industry Sector field on the Client Organization.

**Mentoring Focus Areas** | Multi-select | Required
> Values: Aligned with the Mentoring Focus Areas values on the Client
> Organization record — see Open Issue MN-ISS-001.
>
> The specific areas where the mentor is able to provide guidance.
> Used as a primary matching criterion between mentors and clients.
> Values must align with the Mentoring Focus Areas field on the Client
> Organization.

**Skills and Expertise Tags** | Multi-select | Optional
> Values: To be defined by CBM leadership.
>
> Finer-grained expertise tags beyond industry sector and focus areas.
> Supports advanced mentor-client matching. Values TBD.

**Fluent Languages** | Multi-select | Optional
> Values: To be defined by CBM leadership.
>
> Languages the mentor is fluent in. Used to match clients who prefer
> to work in a language other than English.

**Why Interested in Mentoring** | Rich Text | Optional
> Collected on the mentor application form. The mentor's stated
> motivation for joining CBM as a volunteer mentor.

**How Did You Hear About CBM** | Enum | Optional
> Values: To be defined by CBM leadership.
>
> How the applicant learned about CBM's mentoring program. Used for
> outreach and referral tracking to measure recruitment channel
> effectiveness.

**Is Primary Mentor** | Boolean | Required
> Whether this mentor is eligible for primary mentor assignments.
> Set by the Mentor Administrator. Defaults to Yes on activation.

**Is Co-Mentor** | Boolean | Required
> Whether this mentor is eligible for co-mentor assignments.
> Set by the Mentor Administrator.

**Is Subject Matter Expert** | Boolean | Required
> Whether this mentor is eligible for subject matter expert
> assignments. Set by the Mentor Administrator.

**Mentor Status** | Enum | Required
> Values: Submitted, In Review, Provisional, Active, Paused,
> Inactive, Resigned, Departed, Declined
>
> The current lifecycle stage of the mentor's relationship with CBM.
> Drives role-based access control, assignment eligibility, and
> inactivity monitoring.

**Accepting New Clients** | Boolean | Required
> Whether the mentor is currently available for new client assignments.
> Relevant only when Mentor Status = Active. Mentor-editable.
> Set by the Mentor Administrator at activation and updated by the
> mentor as their availability changes.

**Maximum Client Capacity** | Integer | Required
> The maximum number of simultaneous active client engagements this
> mentor will accept. Set by the Mentor Administrator at activation.
> Mentor-editable.

**Current Active Clients** | Integer | System-calculated | Read-only
> Count of Engagements where this mentor is assigned as Primary Mentor
> and Engagement Status is Active or Assigned. System-calculated.

**Available Capacity** | Integer | System-calculated | Read-only
> Maximum Client Capacity minus Current Active Clients.
> System-calculated. Used by the Client Assignment Coordinator during
> mentor nomination to verify capacity before assignment.

**Board Position** | Text | Optional
> The mentor's title or role if they serve on the CBM board — for
> example, Board Chair, Treasurer, Secretary. Used for board member
> reporting and communications.

**Ethics Agreement Accepted** | Boolean | Optional | Admin-only
> Whether the mentor has accepted the current CBM ethics agreement.
> Set by the Mentor Administrator. Read-only for mentors.

**Ethics Agreement Acceptance Date/Time** | Date/Time | Optional | Admin-only
> The date and time of the mentor's most recent ethics agreement
> acceptance. Set by the Mentor Administrator.

**Background Check Completed** | Boolean | Optional | Admin-only | Hidden from mentor
> Whether a background check has been completed for this mentor.
> Visible to Mentor Administrator only.

**Background Check Date** | Date | Optional | Admin-only | Hidden from mentor
> The date the background check was completed.
> Visible to Mentor Administrator only.

**Terms and Conditions Accepted** | Boolean | System-populated | Admin-only
> System-populated from the mentor application form submission. Whether
> the mentor accepted CBM's terms and conditions. Read-only for mentors.

**Terms and Conditions Acceptance Date/Time** | Date/Time | System-populated | Admin-only
> System-populated timestamp of terms and conditions acceptance.
> Read-only for mentors.

**Felony Conviction Disclosure** | Boolean | System-populated | Admin-only | Hidden from mentor
> System-populated from the mentor application form. Whether the
> applicant disclosed a felony conviction. Restricted — visible to
> Mentor Administrator only. Hidden from the mentor after submission.

**Training Completed** | Boolean | System-populated | Read-only
> System-populated via learning management system integration when
> required training is completed. Mentor can see their own status.

**Training Completion Date** | Date | System-populated | Read-only
> System-populated via LMS integration. Date required training was
> completed.

**Dues Status** | Enum | Admin-only
> Values: Unpaid, Paid, Waived
>
> The mentor's current-year dues standing. Set by the Mentor
> Administrator. Read-only for mentors.

**Dues Payment Date** | Date | Optional | Admin-only
> Date of most recent dues payment. Not applicable when Dues Status
> = Waived.

**Departure Reason** | Enum | Optional | Admin-only
> Values: Relocated, Career Change, Time Constraints, Personal, Other
>
> Shown only when Mentor Status = Departed. The reason the mentor
> exited CBM. Set by the Mentor Administrator at offboarding.

**Departure Date** | Date | Optional | Admin-only
> Shown only when Mentor Status = Departed. The date the mentor
> formally departed.

---

### 4.2 Dues

A Dues record represents one annual dues obligation for a single mentor. One record is created per mentor per billing year. Dues records provide a complete payment history independent of the summary Dues Status field on the mentor Contact record.

---

**Mentor Contact** | Relationship | Required
> The mentor this dues record belongs to.

**Billing Year** | Integer | Required
> The calendar year this dues record applies to — for example, 2026.

**Amount** | Currency | Required
> The dues amount invoiced for this billing year.

**Due Date** | Date | Required
> The date by which payment is expected.

**Payment Status** | Enum | Required
> Values: Unpaid, Paid, Waived
>
> The current payment status for this dues record. Updated by the
> Mentor Administrator when payment is received or a waiver is granted.

**Payment Date** | Date | Optional
> The date payment was received. Not applicable when Payment Status
> = Waived.

**Payment Method** | Enum | Optional
> Values: Online Payment, Check, Waived
>
> How the dues were paid or waived.

**Notes** | Text | Optional
> Any additional notes about this dues record — for example, waiver
> rationale or payment arrangement details.

---

### 4.3 SME Request

An SME Request record tracks a request by a Primary Mentor for subject matter expert involvement in an active engagement. It is initiated from the Engagement record and managed by the Client Assignment Coordinator.

---

**Engagement** | Relationship | Required
> The engagement this SME request is associated with.

**Requesting Mentor** | Relationship | Required
> The Primary Mentor who initiated the request.

**Expertise Needed** | Rich Text | Required
> Description of the subject matter expertise being requested. Used
> by the Client Assignment Coordinator to identify an appropriate SME.

**Status** | Enum | Required
> Values: Requested, SME Identified, Pending Acceptance, Active,
> Completed, Declined
>
> The current status of the SME request.

**Assigned SME** | Relationship | Optional
> The mentor assigned as SME in response to this request. Populated
> by the Client Assignment Coordinator when an SME accepts.

**Request Date** | Date | System-populated
> The date the SME request was created.

**Completion Date** | Date | Optional
> The date the SME's involvement concluded.

**Notes** | Text | Optional
> Additional context about the request or its resolution.

---

### 4.4 Entity Relationships

**Mentor Contact → Engagement (as Primary Mentor)**
A mentor may be assigned as Primary Mentor on one or more Engagements over time. The number of current Primary Mentor assignments where Engagement Status is Active or Assigned drives the Current Active Clients calculation.

**Mentor Contact → Engagement (as Co-Mentor)**
A mentor may be assigned as Co-Mentor on one or more Engagements simultaneously. Co-Mentor assignments are optional and do not count toward the Maximum Client Capacity calculation.

**Mentor Contact → Engagement (as Subject Matter Expert)**
A mentor may be assigned as SME on one or more Engagements. SME assignments are scoped — the SME gains read access to the relevant engagement records only for the duration of their involvement.

**Mentor Contact → Dues**
A mentor has one Dues record per billing year. Dues records are created annually by the Mentor Administrator and provide a complete payment history.

**Engagement → SME Request**
An Engagement may have one or more SME Requests over its lifetime. Each SME Request belongs to one Engagement.

**SME Request → Mentor Contact (as Assigned SME)**
An SME Request may result in one assigned SME Contact. The assignment links the SME to the Engagement for the duration of their involvement.

---

## 5. Decisions Made

| ID | Decision | Rationale | Date |
|---|---|---|---|
| MR-DEC-001 | Mentors are Contact records distinguished by Contact Type = Mentor, not a separate entity | Leverages the CRM platform's native contact management, email integration, and activity tracking without requiring a custom entity. Simplifies the data model and avoids duplication. | March 2026 |
| MR-DEC-002 | Mentor Contact records are retained permanently after departure — no deletion or anonymization | Preserves historical engagement and session records for funder reporting. Allows departed mentors to return without losing their history. | March 2026 |
| MR-DEC-003 | Dues Status on the mentor Contact record is a summary field maintained by the Mentor Administrator, independent of individual Dues records | Provides a quick at-a-glance dues standing without requiring calculation across multiple records. Individual Dues records provide the detailed payment history. | March 2026 |
| MR-DEC-004 | Felony Conviction Disclosure field is hidden from mentors after submission | Protects the integrity of the review process. Mentors cannot see or modify their disclosure after submitting. | March 2026 |
| MR-DEC-005 | Mentor inactivity monitoring operates at the mentor level independently of per-engagement inactivity monitoring | Per-engagement monitoring detects dormant relationships. Mentor-level monitoring detects mentors who have fallen out of engagement with the program entirely. Both are needed. | March 2026 |
| MR-DEC-006 | Industry Sectors and Mentoring Focus Areas on the Mentor Contact must use the same values as on the Client Organization | Matching requires that both sides of the match use the same vocabulary. Misaligned values would make matching impossible. | March 2026 |

---

## 6. Open Issues

| ID | Issue | Owner | Target |
|---|---|---|---|
| MR-ISS-001 | Skills and Expertise Tags values have not yet been defined by CBM leadership | CBM Leadership | Before go-live |
| MR-ISS-002 | Fluent Languages values have not yet been defined | CBM Leadership | Before go-live |
| MR-ISS-003 | How Did You Hear About CBM dropdown values have not yet been defined | CBM Leadership | Before go-live |
| MR-ISS-004 | Annual dues amount has not been defined | CBM Leadership | Before go-live |
| MR-ISS-005 | Whether background checks are required for all mentors or only in specific circumstances has not been defined | CBM Leadership | Before go-live |
| MR-ISS-006 | The Mentor inactivity threshold (default 60 days) should be confirmed or adjusted by CBM leadership before go-live | CBM Leadership | Before go-live |

---

## 7. Interview Transcript

*This section will be populated with the verbatim Q&A record from requirements interview sessions conducted to produce this Domain PRD. The content of this version was derived from existing archived specification documents (CBM-PRD-CRM-Mentor.docx v0.2 and CBM-PRD-Forms.docx) rather than a live interview session. A formal interview session should be conducted with CBM stakeholders to validate and augment the requirements captured here.*
