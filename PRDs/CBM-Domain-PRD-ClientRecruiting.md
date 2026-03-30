# Cleveland Business Mentors
# Domain PRD: Client Recruiting

**Version:** 1.0 **Status:** Draft **Last Updated:** 03-29-26 21:45 **Domain Code:** CR
**Depends On:** CBM-Master-PRD.md

---

## 1. Domain Overview

The Client Recruiting domain covers all activities that generate awareness of CBM's mentoring program and attract prospective clients. It is the top of the funnel that feeds the Mentoring domain — without a steady flow of qualified clients, the core program cannot fulfill its mission.

Client Recruiting operates through three complementary mechanisms. Direct outreach and marketing campaigns reach prospective clients through CBM's own channels. Partner organizations extend CBM's reach into communities and populations that CBM could not reach alone — providing referrals, co-delivering programs, and amplifying CBM's presence in their networks. Workshops and events create direct touchpoints with the business community, building awareness and generating applications.

These three mechanisms are not separate programs — they are coordinated channels within a single domain united by the goal of connecting the right clients to CBM's mentoring services. Partners co-sponsor events. Events generate workshop attendees who become clients. Outreach campaigns promote events. The domain is designed to support this coordination, not treat each mechanism in isolation.

A key data design principle carries over from the Mentor Recruitment domain: Partner Organizations are not a separate entity — they are Organization records distinguished by an Organization Type field, the same entity used for Client Organizations. This unified approach prevents duplicate records and allows a single organization to be tracked as both a client organization and a partner simultaneously where applicable. The Consolidated Design manages the conflict resolution between domain field requirements.

---

## 2. Personas

**MST-PER-007 — Client Recruiter**
Leads direct outreach and marketing campaigns targeting prospective clients. Manages prospect contact lists, coordinates with the Partner Coordinator on joint marketing initiatives, and tracks campaign effectiveness. Ensures the CRM is the single source of truth for all contact data flowing into and out of the outbound marketing system.

**MST-PER-008 — Partner Coordinator**
Manages CBM's relationships with partner organizations throughout their full lifecycle — from prospect identification through active partnership management. Coordinates joint programming, tracks referral activity, manages liaison assignments, and delivers partner analytics reports. The Partner Coordinator is the partner organization's primary point of contact within CBM.

**MST-PER-006 — Mentor Recruiter**
Supports partner-channel mentor recruitment by coordinating with the Partner Coordinator on initiatives where partner organizations contribute mentors from their professional networks.

**MST-PER-009 — Content and Event Administrator**
Plans, organizes, and manages CBM's workshops, events, and clinics. Manages event records, registration, attendance, and post-event reporting. Coordinates with partners and sponsors on co-sponsored events.

**MST-PER-012 — Member**
General CBM affiliates who may support outreach activities, participate in events, or assist with workshops on an as-needed basis.

**MST-PER-003 — Client Administrator**
Supports the Client Recruiting domain by processing incoming client applications generated through outreach, partner referrals, and events. The handoff point from Client Recruiting to the Mentoring domain.

---

## 3. Business Processes

### CR-OUTREACH — Client Outreach and Marketing

**Process Purpose and Trigger**
The Client Outreach process is ongoing — it runs continuously to maintain awareness of CBM's mentoring program within the local business community. It is triggered proactively when application volume falls below program targets or as a standing effort to maintain a healthy prospect pipeline.

**Personas Involved**
- MST-PER-007 Client Recruiter — leads campaign design and execution
- MST-PER-008 Partner Coordinator — supports through partner channels

**Process Workflow**

1. The Client Recruiter identifies target audiences based on CBM's service area, current program capacity, and gaps in the client population by industry, geography, or business stage.
2. The Client Recruiter manages outreach campaigns through the outbound marketing system. Contact lists are maintained in the CRM as the single source of truth and synchronized to the outbound marketing system for campaign delivery.
3. Campaign engagement history — emails sent, opened, and clicked — is recorded back into the CRM against each prospect contact record, providing a complete picture of every interaction CBM has had with each individual.
4. Prospect contacts generated through outreach are created or updated in the CRM and tagged for follow-up as appropriate.
5. The source of each client application is recorded to track which outreach channels are most effective.
6. Application volume and pipeline trends are monitored to assess campaign effectiveness and guide future outreach priorities.

**System Requirements**
- CR-OUTREACH-REQ-001: The system must maintain prospect contact records separate from active client records
- CR-OUTREACH-REQ-002: The system must record the source of each client application — how the applicant heard about CBM
- CR-OUTREACH-REQ-003: The system must serve as the single source of truth for all contact data, synchronizing lists to the outbound marketing system
- CR-OUTREACH-REQ-004: Campaign engagement history must be recorded back into the CRM against each contact record
- CR-OUTREACH-REQ-005: The system must support geographic targeting of outreach by service area
- CR-OUTREACH-REQ-006: The system must track application volume and pipeline trends for reporting

**Process Data**
- CR-OUTREACH-DAT-001: Active client population — to identify gaps in industry, geography, and business stage for targeting
- CR-OUTREACH-DAT-002: Partner organization profiles — to coordinate partner-channel outreach

**Data Collected**
- CR-OUTREACH-DAT-003: Prospect contact records — name, email, organization, outreach source
- CR-OUTREACH-DAT-004: Campaign engagement history — emails sent, opened, clicked, linked to contact records
- CR-OUTREACH-DAT-005: Application source — how each applicant heard about CBM

---

### CR-PARTNER — Partner Relationship Management

**Process Purpose and Trigger**
The Partner Relationship Management process covers the full lifecycle of a partner organization — from initial identification through active partnership management, reporting, and eventual lapse or closure. It is triggered when a new prospective partner is identified or when an existing partner relationship requires attention.

**Personas Involved**
- MST-PER-008 Partner Coordinator — owns the process end to end
- MST-PER-009 Content and Event Administrator — coordinates on co-sponsored events
- MST-PER-007 Client Recruiter — coordinates on joint marketing

**Process Workflow**

*Partner Identification and Activation*
1. The Partner Coordinator identifies a prospective partner organization and creates a Partner Organization record with status Prospect.
2. The Partner Coordinator initiates outreach and logs communication history against the Partner Organization record.
3. When a partnership is agreed upon, the Partner Coordinator updates the status to Active, records the Partnership Start Date, and assigns a CBM liaison to the partner.
4. If a formal agreement is required, the Partner Coordinator creates a Partner Agreement record and attaches the signed document.

*Ongoing Relationship Management*
5. The assigned liaison maintains regular contact with the partner, logging communications, notes, and activities against the Partner Organization record.
6. The Partner Coordinator tracks clients referred by or associated with the partner and links them via Client-Partner Association records.
7. The Partner Coordinator tracks mentors affiliated with the partner organization and their geographic service areas.
8. The Partner Coordinator coordinates with the Content and Event Administrator on co-sponsored events, linking partner organizations to event records.
9. The Partner Coordinator generates and delivers analytics reports to active partners on a periodic or on-demand basis.

*Partner Status Management*
10. If a partner relationship becomes inactive, the Partner Coordinator updates status to Lapsed or Inactive with a recorded note explaining the change.
11. All historical data — referrals, activities, communications, agreements, and analytics — is retained permanently regardless of status change.
12. If a lapsed partner is reactivated, full historical context is available from the existing record.

**System Requirements**
- CR-PARTNER-REQ-001: The system must store partner organization profiles including name, address, contact information, organization type, partner type, geographic service area, and target population
- CR-PARTNER-REQ-002: The system must track partner status through the full lifecycle — Prospect, Active, Lapsed, Inactive
- CR-PARTNER-REQ-003: The system must support multiple partner types per organization — Referral, Co-Delivery, Funding/Sponsorship, Resource — as a multi-select
- CR-PARTNER-REQ-004: The system must track multiple contacts per partner organization with role and primary contact designation by function
- CR-PARTNER-REQ-005: The system must assign a CBM liaison to each active partner with one designated as primary
- CR-PARTNER-REQ-006: The system must track partnership agreements with type, dates, and attached document
- CR-PARTNER-REQ-007: Agreement documents must be restricted to Partner Coordinator and Executive Member access only
- CR-PARTNER-REQ-008: The system must track client-partner associations and use them as the basis for partner analytics
- CR-PARTNER-REQ-009: The system must support a parent-child organizational hierarchy linking partner records
- CR-PARTNER-REQ-010: The system must log communication history, notes, and tasks at both the Partner Organization and individual Partner Contact level
- CR-PARTNER-REQ-011: The system must generate per-partner analytics — referral count, active clients, total sessions, total hours, NPS scores, and impact metrics
- CR-PARTNER-REQ-012: All partner records must be retained permanently regardless of status

**Process Data**
- CR-PARTNER-DAT-001: Client records — to identify and link partner referrals and associated clients
- CR-PARTNER-DAT-002: Mentor records — to track mentors affiliated with partner organizations
- CR-PARTNER-DAT-003: Engagement and session records — to calculate per-partner analytics

**Data Collected**
- CR-PARTNER-DAT-004: Partner Organization record — full profile including classification, status, liaison, service area, and target population
- CR-PARTNER-DAT-005: Partner Contact records — individual contacts at the partner organization with role and primary contact designation
- CR-PARTNER-DAT-006: Partner Agreement records — type, dates, attached document
- CR-PARTNER-DAT-007: Client-Partner Association records — linking clients to partner organizations with association type
- CR-PARTNER-DAT-008: Partner Activity records — joint events, co-developed programs, and relationship management activities

---

### CR-EVENTS — Workshop and Event Management

**Process Purpose and Trigger**
The Workshop and Event Management process covers the planning, delivery, and follow-up of CBM's workshops, clinics, and events. It is triggered when a new workshop or event is planned. Events serve both as a direct client recruiting mechanism — attracting prospective clients from the business community — and as an ongoing engagement tool for existing clients and the broader CBM network.

**Personas Involved**
- MST-PER-009 Content and Event Administrator — owns the process
- MST-PER-008 Partner Coordinator — coordinates co-sponsored events
- MST-PER-003 Client Administrator — processes client applications generated through event attendance
- MST-PER-013 Client — registers and attends events

**Process Workflow**

1. The Content and Event Administrator creates a Workshop record in the CRM with the event name, date, format (virtual or in-person), capacity, topic, and status.
2. A registration form is published on the CBM website linked to the Workshop record. Registrations submitted through the form automatically create Workshop Registration records in the CRM linked to the registrant's Contact record.
3. If the event is not in the contact database, a new Contact record is created at registration. If the contact already exists, the registration is linked to their existing record.
4. Confirmation emails are sent automatically to registrants upon registration with event details and connection information.
5. Reminder communications are sent to registrants before the event.
6. For virtual events, the event is delivered via the video platform. The recording is processed and published to the learning management system where applicable.
7. For in-person events, the Content and Event Administrator exports the attendee list for check-in. Attendance is marked in the CRM post-event.
8. Post-event follow-up communications are triggered automatically after the event closes.
9. The Content and Event Administrator marks final attendance status for all registrants — attended, no-show, or cancelled.
10. If a partner organization co-sponsored or co-hosted the event, the partner is linked to the Workshop record.
11. The Content and Event Administrator produces post-event analytics — registrations, attendance, no-show rates, and trends.

**System Requirements**
- CR-EVENTS-REQ-001: The system must support creation and management of workshop and event records including name, date, format, topic, capacity, presenter, and status
- CR-EVENTS-REQ-002: The system must manage event registration — creating registration records linked to contact records and sending automatic confirmation emails
- CR-EVENTS-REQ-003: The system must create new Contact records for registrants not already in the CRM, or link registrations to existing Contact records
- CR-EVENTS-REQ-004: The system must track attendance status for each registrant — registered, attended, no-show, cancelled
- CR-EVENTS-REQ-005: The system must support linking of partner organizations to co-sponsored events
- CR-EVENTS-REQ-006: The system must trigger automated post-event follow-up communications
- CR-EVENTS-REQ-007: The system must produce event analytics — registrations, attendance, no-show rates, and trends by event type and geography
- CR-EVENTS-REQ-008: The system must support storing event documents including agendas, presentations, and supporting materials
- CR-EVENTS-REQ-009: The system must track presenters associated with events linked to existing Contact records where applicable

**Process Data**
- CR-EVENTS-DAT-001: Contact records — to link registrations to existing contacts and avoid duplicates

**Data Collected**
- CR-EVENTS-DAT-002: Workshop records — name, date, format, topic, capacity, presenter, status
- CR-EVENTS-DAT-003: Workshop Registration records — registrant, registration date, attendance status
- CR-EVENTS-DAT-004: Post-event attendance data — attended, no-show, cancelled per registrant

---

## 4. Data Reference

This section defines all data collected and managed in the Client Recruiting domain. The Partner Organization entity shares the same underlying Organization entity as the Client Organization defined in the Mentoring Domain PRD. The Consolidated Design manages the unified field definition and conflict resolution between domains.

Relationships between entities are described in Section 4.6.

---

### 4.1 Partner Organization

A Partner Organization is a community organization whose mission is to develop the community or a segment of the community by providing programs that help build or enrich businesses. Partner Organizations are tracked on the same underlying entity as Client Organizations and distinguished by an Organization Type field.

A Partner Organization may be of more than one partner type simultaneously — for example, an organization that both refers clients and co-delivers programs with CBM.

All partner records are retained permanently regardless of status.

---

**Organization Name** | Text | Required
> The legal or operating name of the partner organization.

**Organization Type (Account Type)** | Multi-select | Required
> Values: Client Organization, Partner Organization
>
> Classifies the record as a Client Organization, Partner Organization,
> or both. Drives conditional visibility of client-specific and
> partner-specific fields. An organization that is both a client
> company and a partner will have both values selected.

**Partner Organization Type** | Enum | Required for Partners
> Values: Chamber of Commerce, Small Business Development Center (SBDC),
> Economic Development Agency, University / Academic Institution,
> Bank / Financial Institution, Nonprofit / Community Organization,
> Government Agency, Corporate Sponsor, Other
>
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The category of organization the partner represents.

**Partner Type** | Multi-select | Required for Partners
> Values: Referral Partner, Co-Delivery Partner,
> Funding / Sponsorship Partner, Resource Partner
>
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The nature of the partnership with CBM. A partner may hold more than
> one type simultaneously.

**Partner Status** | Enum | Required for Partners
> Values: Prospect, Active, Lapsed, Inactive
>
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The current stage of the partner relationship. Status changes should
> always be accompanied by a note explaining the change.

**Partnership Start Date** | Date | Optional for Prospects, Required when Active
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The date the partnership was formally established.

**Assigned Liaison** | Relationship | Required for Active partners
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The CBM member responsible for managing this partner relationship.
> Only the current liaison is recorded — liaison history is not tracked.

**Public Announcement Allowed** | Boolean | Required for Partners
> Default: No
>
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> Whether CBM may publicly reference this partnership in its marketing
> and communications.

**Geographic Service Area** | Text | Optional
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The geographic territory or community the partner primarily serves —
> for example, City of Cleveland, Cuyahoga County, Greater Akron.

**Target Population** | Text | Optional
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> The specific population or business segment the partner focuses on —
> for example, minority-owned businesses, women entrepreneurs, or
> underserved communities.

**Parent Organization** | Relationship | Optional
> Conditional visibility: shown when Organization Type includes Partner
> Organization.
>
> Link to another Partner Organization record that is the parent
> organization. Used for branches, chapters, or subsidiaries. Both
> parent and child are independent records with their own profiles
> and analytics.

**Description** | Rich Text | Optional
> General description of the organization, its mission, programs, and
> relevant context about the relationship with CBM.

**Website** | URL | Optional
> Partner organization's public website. Uses the native Organization
> website field.

**Phone** | Phone | Optional
> Primary phone number for the organization.

**Address** | Address | Optional
> Street address, city, state, zip of the organization's primary office.

**Social Media** | Text | Optional
> Links to LinkedIn, Facebook, or other relevant social profiles.

**Notes** | Rich Text | Optional
> General notes on the partner relationship, key milestones, and
> relevant context.

---

### 4.2 Partner Contact

A Partner Contact is an individual associated with a partner organization. Partner Contacts are built on the same underlying Contact entity shared across all domains. They are distinguished from Mentor and Client Contacts by their association with a Partner Organization record rather than a Client Organization record.

A Partner Contact may also be a CBM Mentor. In this case a single Contact record serves both roles — the record is linked to the Partner Organization and also carries Mentor Contact fields.

---

**First Name** | Text | Required
> The contact's first name. Shared native Contact field.

**Last Name** | Text | Required
> The contact's last name. Shared native Contact field.

**Preferred Name** | Text | Optional
> The name the contact prefers to be called. Used in personal
> communications and relationship management.

**Birthdate** | Date | Optional
> The contact's date of birth. Used to recognize birthdays and
> strengthen the partner relationship.

**Title / Role** | Text | Optional
> The contact's title or role at the partner organization — for example,
> Executive Director or Program Manager.

**Partner Organization** | Relationship | Required
> Link to the Partner Organization record this contact is associated
> with.

**Primary Contact For** | Multi-select | Optional
> Values: Referrals, Events, Billing, General
>
> Designates the function(s) for which this contact is the primary
> point of contact at the partner organization.

**Email** | Email | Optional
> The contact's email address. Shared native Contact field.

**Phone** | Phone | Optional
> The contact's direct phone number.

**Is CBM Mentor** | Boolean | Required
> Default: No
>
> Indicates whether this individual is also a CBM Mentor. When Yes,
> the contact record serves dual roles — it is linked to the Partner
> Organization and also carries Mentor Contact fields. No duplicate
> record is created.

---

### 4.3 Partner Agreement

A Partner Agreement records a formal written agreement between CBM and a partner organization. A partner may have more than one agreement on file over time — all are retained for historical reference.

Agreement documents are restricted to Partner Coordinator and Executive Member access only. Mentors cannot view or download agreement attachments.

---

**Partner Organization** | Relationship | Required
> Link to the Partner Organization this agreement belongs to.

**Agreement Type** | Enum | Required
> Values: Memorandum of Understanding (MOU), Partnership Agreement,
> Letter of Intent, Other
>
> The type of formal agreement.

**Creation Date** | Date | Required
> The date the agreement was created or signed.

**Expiration / Renewal Date** | Date | Optional
> The date the agreement expires or is due for renewal.

**Agreement Document** | File Attachment | Required
> The signed agreement document. Restricted to Partner Coordinator
> and Executive Member access.

**Notes** | Rich Text | Optional
> Any relevant notes about the agreement.

---

### 4.4 Client-Partner Association

A Client-Partner Association links a client organization to one or more partner organizations. It is the foundation for partner analytics — enabling CBM to filter and report on its impact within each partner's client population.

A client may be associated with multiple partners simultaneously. Geographic overlap among partner organizations is common in Northeast Ohio. Associations are not time-bounded — they persist for the life of the client's engagement with CBM unless explicitly removed.

---

**Client Organization** | Relationship | Required
> Link to the Client Organization record.

**Partner Organization** | Relationship | Required
> Link to the Partner Organization record.

**Association Type** | Enum | Optional
> Values: Referred By, Serves Same Population, Program Participant,
> Other
>
> How the client is connected to the partner organization.

**Notes** | Text | Optional
> Context about why this association exists.

---

### 4.5 Workshop

A Workshop represents a structured event — clinic, workshop, office hours, or other programming — offered by CBM to the business community. Workshops serve both as a client recruiting mechanism and as an ongoing engagement tool for existing clients.

Workshops may be virtual or in-person. They may be co-sponsored by partner organizations. All registrations and attendance are tracked against Contact records.

---

**Title** | Text | Required
> The name of the workshop or event.

**Date/Time** | Date/Time | Required
> The scheduled date and time of the event.

**Format** | Enum | Required
> Values: Virtual, In-Person, Hybrid
>
> How the event is delivered. Drives workflow differences — virtual
> events use the video platform; in-person events require manual
> attendance entry.

**Topic / Category** | Enum | Required
> Values: To be defined by CBM leadership
>
> The primary topic area of the event. Used for analytics and
> reporting on program mix and participant interests.

**Presenter** | Relationship | Optional
> Link to the presenter's Contact record where the presenter is in the
> CRM. A text field is also available for external presenters.

**Presenter Name (External)** | Text | Optional
> Free-text name for presenters who are not in the CRM.

**Description** | Rich Text | Optional
> Description of the event content and objectives.

**Maximum Capacity** | Integer | Optional
> Maximum number of registrants. Used to manage waitlists.

**Status** | Enum | Required
> Values: Scheduled, In Progress, Completed, Cancelled

**Co-Sponsoring Partners** | Relationship (many) | Optional
> Links to Partner Organization records that co-sponsored or co-hosted
> this event.

**Documents** | File Attachments | Optional
> Event documents — agendas, presentations, supporting materials.

---

### 4.6 Workshop Registration

A Workshop Registration links a Contact to a Workshop they registered for or attended. It tracks registration and attendance status for each individual participant.

---

**Workshop** | Relationship | Required
> Link to the Workshop record.

**Contact** | Relationship | Required
> Link to the registrant's Contact record. A new Contact record is
> created if the registrant is not already in the CRM.

**Registration Date** | Date/Time | System-populated
> The date and time the registration was submitted.

**Attendance Status** | Enum | Required
> Values: Registered, Attended, No-Show, Cancelled
>
> Default: Registered on creation. Updated post-event.

**Source** | Enum | Optional
> Values: Website Form, Manual Entry, Partner Referral, Other
>
> How the registrant came to register for this event.

---

### 4.7 Partner Activity

A Partner Activity records a joint event, collaborative program, co-developed content, or relationship management activity involving a partner organization. This is a broader category than workshops — it includes any organized activity between CBM and a partner.

---

**Activity Name** | Text | Required
> Name or title of the activity or event.

**Activity Type** | Enum | Required
> Values: CBM-Hosted Event, Co-Hosted Event, Joint Workshop / Program,
> Co-Developed Content, Meeting / Coordination Call, Other
>
> The nature of the activity.

**Partner Organization** | Relationship | Required
> The partner organization associated with this activity.

**Date** | Date | Required
> Date the activity occurred or is scheduled.

**Description** | Rich Text | Optional
> Description of the activity, its purpose, and any outcomes.

**Attendees** | Relationship (many) | Optional
> Contact records of individuals who attended or participated.

**Notes** | Rich Text | Optional
> Additional notes or follow-up items.

---

### 4.8 Entity Relationships

**Partner Organization → Partner Contact**
A Partner Organization has one or more Partner Contacts. Each contact belongs to one primary partner organization. One or more contacts may be designated as primary for specific functions.

**Partner Organization → Partner Agreement**
A Partner Organization may have one or more Agreements over time. Each Agreement belongs to one Partner Organization.

**Partner Organization → Client-Partner Association**
A Partner Organization may be linked to one or more Client Organizations via Client-Partner Associations. These associations are the basis for all partner analytics and reporting.

**Partner Organization → Partner Activity**
A Partner Organization may have one or more Partner Activities recorded against it over the life of the relationship.

**Partner Organization → Workshop (Co-Sponsor)**
A Partner Organization may be linked as a co-sponsor to one or more Workshop records.

**Client Organization → Client-Partner Association**
A Client Organization may be associated with one or more Partner Organizations simultaneously.

**Workshop → Workshop Registration**
A Workshop has zero or more Workshop Registrations. Each Registration belongs to exactly one Workshop.

**Contact → Workshop Registration**
A Contact may have one or more Workshop Registrations across multiple events. Each Registration links one Contact to one Workshop.

**Partner Contact → Mentor Contact**
A Partner Contact who is also a CBM Mentor uses a single Contact record for both roles. The Is CBM Mentor flag links the partner role to the mentor role without duplication.

---

## 5. Decisions Made

| ID | Decision | Rationale | Date |
|---|---|---|---|
| CR-DEC-001 | Partner Organizations are modeled on the same Organization entity as Client Organizations, distinguished by an Organization Type field | Prevents two disconnected pools of organization records and eliminates the risk of duplicate records being created. An organization can be both a Client Organization and a Partner simultaneously without duplication. | March 2026 |
| CR-DEC-002 | Partner Contacts are built on the same Contact entity shared across all domains | Consistent with the pattern established by the Mentoring and Mentor Recruitment domains. A person who is both a Partner Contact and a CBM Mentor has a single Contact record serving both roles. | March 2026 |
| CR-DEC-003 | Partner analytics are driven by Client-Partner Association records rather than referral events | A client may be associated with a partner for reasons beyond a single referral event — geography, program participation, ongoing co-delivery. Associations capture this broader relationship more accurately than referral event tracking. | March 2026 |
| CR-DEC-004 | Liaison history is not tracked — only the current liaison assignment is recorded | The primary value of liaison assignment is knowing who to contact now. Historical reassignment tracking adds complexity without proportionate operational value at CBM's scale. | March 2026 |
| CR-DEC-005 | Workshop registration creates Contact records for new registrants not already in the CRM | Ensures all event participants are captured in the CRM as contacts, building the prospect pipeline even when attendees do not immediately apply for mentoring. | March 2026 |
| CR-DEC-006 | Partner agreement documents are restricted to Partner Coordinator and Executive Member access | Partnership agreements may contain sensitive financial or legal terms not appropriate for general mentor access. | March 2026 |

---

## 6. Open Issues

| ID | Issue | Owner | Target |
|---|---|---|---|
| CR-ISS-001 | Workshop Topic / Category dropdown values have not been defined | CBM Leadership | Before go-live |
| CR-ISS-002 | Geographic Service Area field format — free text vs controlled list of Northeast Ohio geographies — has not been decided | CBM Leadership | Before go-live |
| CR-ISS-003 | Target Population field format — free text vs controlled multi-select — has not been decided | CBM Leadership | Before go-live |
| CR-ISS-004 | Outbound marketing system integration — the specific synchronization mechanism between CRM contact lists and the outbound marketing system needs to be defined at implementation time | Tech Admin | Implementation planning |
| CR-ISS-005 | Whether a Partner Portal for self-service analytics is in scope for the initial implementation has not been decided | CBM Leadership | Before go-live |

---

## 7. Interview Transcript

*This section will be populated with the verbatim Q&A record from requirements interview sessions conducted to produce this Domain PRD. The content of this version was derived from existing archived specification documents (CBM-PRD-CRM-Partners.docx v0.4 and CBM-PRD-Communication-Workshops-Learning.docx) rather than a live interview session. The Partners PRD appendix contains a detailed requirements discovery Q&A which has been used as primary source material and should be reviewed by stakeholders in lieu of a formal interview transcript until a live session can be conducted.*
