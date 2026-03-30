# Cleveland Business Mentors
# CRM Master PRD

**Version:** 1.0 **Status:** Draft
**Last Updated:** 03-29-26 21:45

---

## 1. Organization Overview

### 1.1 Mission and Context

Cleveland Business Mentors (CBM) is a nonprofit organization providing free, confidential, and impartial mentoring and practical business education to entrepreneurs, small businesses, and nonprofits exclusively in Northeast Ohio.

CBM's services are always free to clients — no fees, commissions, equity, or referral arrangements of any kind. Mentoring is delivered by volunteer professionals with experience in business and nonprofit management. The organization also delivers workshops, clinics, and curated referrals to trusted Northeast Ohio ecosystem partners.

CBM serves clients at every stage — from entrepreneurs exploring an idea to established organizations seeking to improve operations, planning, financial readiness, marketing, or governance.

### 1.2 Operating Model

CBM operates with a lean structure:

- Volunteer mentors deliver all mentoring services — experienced business and nonprofit professionals donating their time
- A small administrative team coordinates operations, manages relationships, and supports mentors and clients
- Workshop and clinic programming supplements one-to-one mentoring with practical, immediately usable skills
- Partner organizations extend CBM's reach into communities and provide referral channels in both directions

Year 1 operating targets are 25–30 volunteer mentors and 100–200 clients served, with a single technology-capable administrator managing the platform.

### 1.3 Why a CRM is Needed

CBM's core mission — connecting the right mentor with the right client and managing that relationship through to a successful outcome — requires reliable, structured data management. Without a CRM, the organization cannot:

- Track the full lifecycle of a mentoring engagement from intake through completion
- Match clients to mentors based on expertise, industry, and availability
- Monitor engagement health and intervene when relationships go inactive
- Report impact to funders and partners with accurate, consistent data
- Manage the mentor population through recruitment, onboarding, and ongoing participation
- Track partner relationships, referral activity, and joint programming

The CRM is the operational heart of CBM. All client, mentor, partner, and engagement data flows through it. External tools integrate with the CRM but feed all data back into it.

### 1.4 Solution Summary

This document defines the CRM requirements for Cleveland Business Mentors. The implementation covers four Key Business Domains:

- **Mentoring** — initiating, executing, and completing mentoring engagements for clients
- **Mentor Recruitment** — locating, recruiting, onboarding, and managing the mentor population
- **Client Recruiting** — attracting potential clients through events, partners, and outreach
- **Fundraising** — managing relationships with sponsors and funding institutions to secure operational funding

---

## 2. Personas

The following personas represent all individuals who interact with the CRM system. Each persona is defined once here and referenced throughout the Domain PRDs. A single individual may hold more than one persona role.

**MST-PER-001 — System Administrator**
Responsible for the technical setup, configuration, and ongoing maintenance of the CRM. Manages user accounts, integrations, system health, and data integrity. Has full access to all system configuration and data. Does not participate in day-to-day business operations. Primary domains: All (administrative access)

**MST-PER-002 — Executive Member**
Represents CBM's senior leadership and board principals. Has full read access to all organizational data for oversight, reporting, and strategic decision-making. Reviews dashboards, impact reports, and program outcome data but does not modify operational data or system configuration. Primary domains: All (read-only oversight)

**MST-PER-003 — Client Administrator**
Manages day-to-day administration of client records and the client application process. Serves as the primary point of contact for prospective and active clients, guiding them through intake, onboarding, and ongoing program participation. Monitors engagement health and follows up on inactive engagements. Primary domains: Mentoring, Client Recruiting

**MST-PER-004 — Client Assignment Coordinator**
Responsible for matching approved clients with the most appropriate available mentors. Reviews client needs, evaluates mentor expertise and availability, manages the assignment process, and facilitates the initial introduction between mentor and client. Primary domains: Mentoring

**MST-PER-005 — Mentor Administrator**
Manages day-to-day administration of mentor records and the mentor application and onboarding process. Guides prospective mentors from application through activation and manages ongoing mentor status, capacity, and engagement throughout their tenure with CBM. Primary domains: Mentor Recruitment, Mentoring

**MST-PER-006 — Mentor Recruiter**
Responsible for raising awareness of CBM's mentoring program within the professional and business community to attract qualified volunteer mentors. Manages outreach campaigns, messaging, and prospect contact lists. Coordinates with the Partner Coordinator on joint recruitment initiatives. Primary domains: Mentor Recruitment, Client Recruiting

**MST-PER-007 — Client Recruiter**
Responsible for raising awareness of CBM's mentoring program within the local business community to drive prospective client applications. Manages outreach campaigns, brand presence, and marketing contact lists. Coordinates with the Partner Coordinator on joint marketing initiatives. Primary domains: Client Recruiting

**MST-PER-008 — Partner Coordinator**
Manages CBM's relationships with partner organizations throughout the full partner lifecycle. Coordinates joint service delivery, tracks partner agreements, monitors partner-affiliated mentors and clients, and produces partner analytics reports. Primary domains: Client Recruiting

**MST-PER-009 — Content and Event Administrator**
Plans, organizes, and manages CBM's workshops, events, and related content. Manages event records, registration, attendance, and post-event reporting. Coordinates with partners and sponsors on co-sponsored events. Primary domains: Client Recruiting, Mentoring

**MST-PER-010 — Donor / Sponsor Coordinator**
Manages CBM's donor and sponsor relationships and all fundraising activities. Tracks donors and sponsors through their full lifecycle, manages campaigns and grants, records contributions, and produces fundraising analytics. Primary domains: Fundraising

**MST-PER-011 — Mentor**
A volunteer professional who provides guidance and expertise to CBM client businesses. May serve as a Primary Mentor, Co-Mentor, or Subject Matter Expert. Logs session notes, manages their own profile and availability, and accesses their personal dashboard. Primary domains: Mentoring, Mentor Recruitment

**MST-PER-012 — Member**
A general affiliate of CBM who supports the organization without holding a specific functional role. May assist with outreach, events, committees, or other activities on an as-needed basis. Primary domains: Client Recruiting

**MST-PER-013 — Client**
A business, nonprofit, or entrepreneurial venture seeking mentoring services from CBM, represented by one or more individual contacts. The Client encompasses both the organization being mentored and the people who participate in the mentoring relationship on its behalf. Primary domains: Mentoring, Client Recruiting

---

## 3. Key Business Domains

### 3.1 Mentoring

**Domain Purpose**
The Mentoring domain covers the complete lifecycle of a mentoring engagement — from a client's initial request through mentor assignment, active mentoring, and formal closure. It is CBM's core program delivery function and the primary reason the organization exists.

**Personas Involved**
MST-PER-003 Client Administrator, MST-PER-004 Client Assignment Coordinator, MST-PER-005 Mentor Administrator, MST-PER-009 Content and Event Administrator, MST-PER-011 Mentor, MST-PER-013 Client

**Key Processes**

*MN-INTAKE — Client Intake* The process by which a prospective client requests mentoring services and is reviewed, approved, and prepared for mentor assignment.
- The system must accept client mentoring requests submitted through the public website
- The system must create client organization and contact records automatically upon submission
- The system must present new applications to administrators for review
- The system must support approval, deferral, or rejection of applications with recorded rationale
- The system must notify the client of application status at each stage

*MN-MATCH — Mentor Matching* The process by which an approved client is matched with the most appropriate available mentor.
- The system must allow coordinators to search and filter the mentor roster by expertise, industry, availability, language, and capacity
- The system must support recording of candidate mentors considered and the rationale for the final selection
- The system must support assignment of a primary mentor and optional co-mentor or subject matter expert
- The system must notify the assigned mentor of the new engagement
- The system must track mentor acceptance or declination of assignments

*MN-ENGAGE — Engagement Management* The ongoing management of an active mentoring relationship between a mentor and client.
- The system must track engagement status throughout its lifecycle — Submitted, Active, On Hold, Closed
- The system must track all sessions within an engagement including date, duration, and topics covered
- The system must detect and flag engagements with no session activity beyond a defined threshold
- The system must support administrator follow-up workflow for flagged inactive engagements
- The system must track engagement goals and progress against those goals
- The system must support multiple concurrent engagements per client and per mentor within capacity limits
- The system must support subject matter expert requests initiated by mentors within an engagement

*MN-SURVEY — Client Satisfaction Tracking* The process of collecting and recording client feedback throughout and at the conclusion of an engagement.
- The system must support delivery of satisfaction surveys to clients at defined intervals
- The system must record survey responses linked to the client and engagement record
- The system must make survey results available for reporting and trend analysis

*MN-CLOSE — Engagement Closure* The process of formally closing a completed or terminated mentoring engagement and recording outcomes.
- The system must support formal closure of an engagement with a recorded reason and outcome
- The system must record client business outcomes achieved during the engagement
- The system must retain complete engagement history permanently after closure
- The system must support a closed client re-applying and beginning a new engagement while retaining full history

**Key Data**
- Client organizations and their associated contacts
- Mentor profiles including expertise, availability, and capacity
- Engagement records linking mentors to clients
- Session records within each engagement
- Survey responses linked to clients and engagements
- Engagement outcomes and closure records

---

### 3.2 Mentor Recruitment

**Domain Purpose**
The Mentor Recruitment domain covers the full lifecycle of a volunteer mentor — from initial awareness and application through onboarding, activation, ongoing status management, and eventual departure. It ensures CBM maintains a healthy, qualified, and engaged mentor population capable of serving the client base.

**Personas Involved**
MST-PER-005 Mentor Administrator, MST-PER-006 Mentor Recruiter, MST-PER-008 Partner Coordinator, MST-PER-011 Mentor

**Key Processes**

*MR-RECRUIT — Mentor Recruitment* The process of raising awareness of CBM's volunteer mentoring program and attracting qualified applicants from the professional community.
- The system must maintain a prospect contact list of potential mentor candidates
- The system must track outreach activity and communication history with prospects
- The system must record the source of each mentor application — how the applicant heard about CBM
- The system must track recruitment campaign reach and mentor application volume trends

*MR-APPLY — Mentor Application* The process by which a prospective mentor submits an application and CBM reviews and makes an admission decision.
- The system must accept mentor applications submitted through the public website
- The system must create a mentor contact record automatically upon application submission
- The system must present new applications to administrators for review
- The system must support approval, deferral, or rejection of applications with recorded rationale
- The system must record background check status and date
- The system must notify the applicant of application status at each stage
- The system must record terms and conditions acceptance with timestamp at time of application

*MR-ONBOARD — Mentor Onboarding* The process of activating a provisionally approved mentor through training, supervised co-mentoring, and final activation.
- The system must track mentor status through the full lifecycle — Provisional, Active, Inactive, Departed
- The system must track training enrollment and completion via the learning management system integration
- The system must track provisional co-mentoring activity required before full activation
- The system must support transition from Provisional to Active status when all requirements are met
- The system must assign a CBM organizational email address to each activated mentor

*MR-MANAGE — Mentor Management* The ongoing management of active mentor profiles, capacity, and participation throughout their tenure with CBM.
- The system must store a complete mentor profile including name, contact information, biography, expertise, industry background, languages, and availability
- The system must track mentor capacity — maximum number of active concurrent engagements
- The system must support multiple mentor roles — Primary Mentor, Co-Mentor, Subject Matter Expert
- The system must provide a searchable mentor directory accessible to all active mentors
- The system must track board membership status for mentors serving on the CBM board
- The system must support administrator notes on individual mentor records
- The system must track mentor analytics across all engagements — session counts, hours, outcomes, and trends

*MR-DEPART — Mentor Departure and Reactivation* The process of managing a mentor's transition to inactive or departed status and supporting reactivation when applicable.
- The system must support transition of a mentor to Inactive status with recorded reason
- The system must support a reactivation workflow for mentors returning from Inactive to Active status
- The system must support transition to Departed status with recorded reason for departure
- The system must retain complete mentor history permanently after departure

**Key Data**
- Mentor prospect contacts and outreach history
- Mentor applications and admission decisions
- Mentor profiles including expertise, availability, capacity, and status
- Training enrollment and completion records
- Co-mentoring activity during provisional period
- Background check records
- Mentor engagement and session history
- Departure records and reasons

---

### 3.3 Client Recruiting

**Domain Purpose**
The Client Recruiting domain covers all activities that generate awareness of CBM's mentoring program and attract prospective clients. This includes direct outreach and marketing, management of partner organization relationships, and the planning and delivery of workshops and events. Partners and events are not separate domains — they are mechanisms within the single goal of connecting the right clients to CBM's mentoring services.

**Personas Involved**
MST-PER-003 Client Administrator, MST-PER-006 Mentor Recruiter, MST-PER-007 Client Recruiter, MST-PER-008 Partner Coordinator, MST-PER-009 Content and Event Administrator, MST-PER-012 Member

**Key Processes**

*CR-OUTREACH — Client Outreach and Marketing* The process of raising awareness of CBM's mentoring program within the local business community through direct outreach and marketing campaigns.
- The system must maintain a prospect contact list of potential client candidates separate from active client records
- The system must track outreach activity and communication history with prospects
- The system must record the source of each client application — how the applicant heard about CBM
- The system must track campaign reach and client application volume trends
- The system must support geographic targeting of outreach by service area

*CR-PARTNER — Partner Relationship Management* The process of identifying, recruiting, and managing relationships with community organizations that extend CBM's reach and refer clients into the program.
- The system must store partner organization profiles including name, contact information, service area, type, and status
- The system must track partner status through the full lifecycle — Prospect, Contacted, In Discussion, Agreement Pending, Active, Inactive, Closed
- The system must track multiple contacts associated with each partner organization with one designated as primary
- The system must assign one or more CBM coordinators to each partner with one designated as lead
- The system must track partnership agreement dates, terms, and renewal schedule
- The system must track all communications with a partner organization across all CBM personnel
- The system must track clients referred to CBM by each partner organization
- The system must track mentors affiliated with each partner organization and their geographic service areas
- The system must produce partner analytics reports — mentors contributed, clients served, events co-sponsored, and CBM service delivery within partner geography
- The system must support administrator notes on individual partner records

*CR-EVENTS — Workshop and Event Management* The process of planning, delivering, and reporting on workshops, events, and clinics that build awareness and attract prospective clients.
- The system must support creation and management of event records including name, date, location, type, capacity, and status
- The system must manage event registration including confirmations, reminders, waitlists, and attendance tracking
- The system must track no-show rates and attendance trends by event type and geography
- The system must support linking of partner organizations to co-sponsored events
- The system must support linking of donor and sponsor organizations to sponsored events
- The system must track presenters associated with events linked to existing contact records where applicable
- The system must store event documents including agendas, presentations, and supporting materials
- The system must produce event analytics reports — registrations, attendance, no-shows, and trends

**Key Data**
- Prospect contact lists for outreach tracking
- Partner organization profiles, contacts, and agreements
- Partner referral records linking clients to referring partners
- Partner affiliation records linking mentors to partner organizations
- Event records including registration and attendance
- Campaign reach and application source tracking
- Communication history with prospects and partners

---

### 3.4 Fundraising

**Domain Purpose**
The Fundraising domain covers the management of relationships with sponsors, donors, and funding institutions that provide operational funding for CBM. It tracks the full lifecycle of each funding relationship — from prospect identification through active stewardship — and maintains accurate records of all contributions, grants, sponsorships, and pledges.

**Personas Involved**
MST-PER-002 Executive Member, MST-PER-010 Donor / Sponsor Coordinator

**Key Processes**

*FU-PROSPECT — Donor and Sponsor Prospecting* The process of identifying and pursuing prospective donors, sponsors, and funding institutions.
- The system must maintain a prospect pipeline of potential donors and sponsors
- The system must track prospect status through the full lifecycle — Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed
- The system must track outreach activity and communication history with prospects
- The system must support recording of prospecting rationale and next steps for each prospect

*FU-RECORD — Contribution Recording* The process of recording and maintaining accurate records of all incoming funding — donations, sponsorships, grants, and pledges.
- The system must record individual donations with donor, date, amount, payment method, and designation
- The system must record sponsorship commitments with sponsor, amount, terms, and associated program or event
- The system must record grants with funding institution, award amount, application status, reporting requirements, and renewal dates
- The system must record pledges and track fulfillment against pledge commitments
- The system must generate donor acknowledgment records for tax receipt purposes
- The system must link contributions to fundraising campaigns where applicable

*FU-STEWARD — Donor and Sponsor Stewardship* The process of maintaining active relationships with committed donors and sponsors through communications, reporting, and recognition.
- The system must store complete donor and sponsor profiles including contact information, giving history, and lifetime value
- The system must track multiple contacts associated with organizational donors with one designated as primary
- The system must track all communications with donors and sponsors across all CBM personnel
- The system must support administrator notes on individual donor and sponsor records
- The system must track board member and mentor giving separately for internal reporting purposes

*FU-REPORT — Fundraising Reporting* The process of producing accurate fundraising analytics for internal management and external stakeholder reporting.
- The system must produce donor and funding analytics reports — giving history, campaign performance, and trends
- The system must track fundraising campaign progress against goals
- The system must support filtering and reporting by donor type, campaign, date range, and designation
- The system must provide executive-level fundraising summaries for board oversight

**Key Data**
- Donor and sponsor profiles and contact records
- Donation, sponsorship, grant, and pledge records
- Fundraising campaign records and performance data
- Grant management records including reporting requirements and renewal dates
- Communication history with all donors and sponsors
- Acknowledgment and tax receipt records

---

## 4. System Scope

### 4.1 In Scope

The following are within the scope of this CRM implementation:

- Client organization and contact record management throughout the full client lifecycle
- Mentor contact record management throughout the full mentor lifecycle
- Mentor-client engagement management from assignment through closure
- Session tracking within engagements
- Client satisfaction survey tracking
- Mentor matching and assignment workflow
- Inactivity monitoring and administrator follow-up workflow
- Partner organization and contact record management
- Partnership agreement tracking
- Workshop and event management including registration and attendance
- Prospect contact management for client and mentor recruitment outreach
- Donor, sponsor, and grant record management
- Fundraising campaign tracking
- Organizational reporting and analytics across all four domains
- Role-based access control ensuring each persona sees only the data appropriate to their role
- Integration with the public website for client and mentor application intake
- Integration with the organizational email system for all CRM communications
- Integration with the learning management system for mentor training tracking

### 4.2 Out of Scope

The following are explicitly not handled by the CRM:

- Delivery of online learning content — managed by the learning management system
- Email marketing campaign creation and delivery — managed by an external campaign platform; the CRM maintains contact lists as the source of truth
- Website content management — managed by the website platform
- Financial accounting and bookkeeping — the CRM tracks contributions but is not an accounting system
- Document storage beyond attachments directly relevant to CRM records
- Video conferencing and session delivery — mentors and clients use their preferred tools

### 4.3 Key Integrations

The CRM connects to the following external systems. Integration details are defined in implementation documentation — this section describes the business purpose of each integration only.

- **Website** — the public website submits client mentoring requests and mentor applications directly into the CRM, automatically creating the appropriate records
- **Email System** — the CRM sends and receives email through the organizational email system, maintaining a complete communication history within each contact and engagement record
- **Learning Management System** — the CRM tracks mentor training enrollment and completion status, with the learning management system as the system of record for course delivery and progress
- **Outbound Marketing System** — the CRM serves as the single source of truth for all contacts known to CBM. Contact lists are maintained in the CRM and synchronized to the outbound marketing system for campaign delivery. Campaign engagement history — emails sent, opened, and clicked — is recorded back into the CRM against each contact record, ensuring a complete picture of every interaction CBM has had with each individual regardless of channel
