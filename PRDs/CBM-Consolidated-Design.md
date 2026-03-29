# Cleveland Business Mentors
# Consolidated Design

**Version:** 1.0
**Status:** In Progress — Mentoring Domain Complete
**Last Updated:** March 2026

---

## Important Notes

This document is maintained by the implementation team. It is not a
stakeholder document. Do not distribute to stakeholders — they receive
the Master PRD and Domain PRDs.

This document is the single authoritative source for YAML generation.
Every entity and field definition here must trace back to a Domain PRD.
Nothing is added to this document that is not required by at least one
Domain PRD.

Conflicts between domains are resolved here and recorded in the
Conflict Notes column. All conflict resolutions must be approved before
the affected YAML is generated.

---

## 1. Entity Index

| ID | Entity | Type | Domains | Status |
|---|---|---|---|---|
| CD-ENT-001 | Client Organization | Native (Account) | MN, CR | Defined — MN complete |
| CD-ENT-002 | Client Contact | Native (Contact) | MN, MR, CR | Defined — MN complete |
| CD-ENT-003 | Engagement | Custom (Base) | MN | Defined — MN complete |
| CD-ENT-004 | Session | Custom (Base) | MN | Defined — MN complete |
| CD-ENT-005 | Survey Response | Custom (Base) | MN | Defined — MN complete |

**Entity Type Key:**
- **Native (Account)** — extends the CRM platform's built-in Account
  entity. Native fields already exist; only custom fields require
  deployment.
- **Native (Contact)** — extends the CRM platform's built-in Contact
  entity. Native fields already exist; only custom fields require
  deployment.
- **Custom (Base)** — a new custom entity created from scratch.
  All fields require deployment.

---

## 2. Entity Definitions

---

### CD-ENT-001 — Client Organization

**Entity Type:** Native (Account) — extends the built-in Account entity
**Display Name (singular):** Client Organization
**Display Name (plural):** Client Organizations
**Source Domain:** MN (Mentoring), CR (Client Recruiting — pending)
**Description:** The business, nonprofit, or entrepreneurial venture
being mentored. The anchor record to which all contacts, engagements,
and related activity are linked. Records are retained permanently.

#### Fields

Fields marked **[NATIVE]** already exist on the built-in Account entity
and do not require deployment. Fields marked **[CUSTOM]** are additions
that must be deployed.

---

**Business Name** | `name` | varchar | Optional | **[NATIVE]**
> Source: MN-INTAKE-DAT-002
>
> The legal or operating name of the client business. Uses the native
> Account name field. Optional because pre-startup applicants may not
> yet have a business name.

**Website** | `website` | url | Optional | **[NATIVE]**
> Source: MN-INTAKE-DAT-002
>
> The client business website address. Uses the native Account website
> field.

**Address** | `billingAddress` | address | Optional | **[NATIVE]**
> Source: MN-INTAKE-DAT-002
>
> The primary business address. Uses the native Account billing address
> field. Captured as street, city, state, zip.

**Organization Type** | `cOrganizationType` | enum | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Values: For-Profit, Non-Profit
>
> Whether the organization operates as a for-profit business or a
> nonprofit. Drives funder reporting categories.

**Business Stage** | `cBusinessStage` | enum | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Values: Pre-Startup, Startup, Early Stage, Growth Stage, Established
>
> The stage of business development the client organization is in.
> Used for mentor matching and funder reporting.

**Industry Sector** | `cNaicsSector` | enum | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Values: 20 top-level NAICS industry sectors (full list in Appendix A)
>
> The primary industry sector of the client business. Used for mentor
> matching and impact reporting. Drives the NAICS Subsector filter.

**Industry Subsector** | `cNaicsSubsector` | enum | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Values: Approximately 100 subsectors filtered by Industry Sector
> (full list in Appendix A)
>
> The specific industry subsector. Conditional visibility: filtered
> by selected NAICS Sector value.

**Mentoring Focus Areas** | `cMentoringFocusAreas` | multiEnum | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Values: To be defined by CBM leadership — see Open Issue MN-ISS-001
>
> The specific areas where the client seeks mentoring assistance.
> Primary matching criterion between clients and mentors. Values must
> align with the corresponding field on the Mentor Contact record.

**Mentoring Needs Description** | `cMentoringNeedsDescription` | text | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002
>
> Free-form description of what the client is looking for in a
> mentoring engagement. Reviewed during mentor matching.

**Business Description** | `cBusinessDescription` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Detailed description of what the business does, its history, and
> founding story. Collected via Phase 2 supplemental form.

**Time in Operation** | `cTimeInOperation` | varchar | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> How long the business has been operating.

**Current Team Size** | `cCurrentTeamSize` | int | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Number of current employees or team members.

**Revenue Range** | `cRevenueRange` | enum | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Values: To be defined by CBM leadership — see Open Issue MN-ISS-003
>
> Approximate annual revenue range.

**Funding Situation** | `cFundingSituation` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Description of the client's current funding sources or needs.

**Current Challenges** | `cCurrentChallenges` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> The primary obstacles the business is currently facing.

**Goals and Objectives** | `cGoalsAndObjectives` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> What the client wants to achieve through the mentoring engagement.

**Desired Outcomes (6–12 Months)** | `cDesiredOutcomes` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Specific outcomes the client hopes to achieve in the near term.

**Previous Mentoring Experience** | `cPreviousMentoringExperience` | text | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Whether the client has worked with a mentor or advisor before.

**Current Professional Advisors** | `cCurrentProfessionalAdvisors` | multiEnum | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Values: Banker / Financial Institution, Attorney / Legal Counsel,
> Accountant / CPA, IT Consultant, Insurance Agent,
> Marketing / PR Consultant, Business Coach
>
> Types of professional advisors the client currently works with.

**Registered with State** | `cRegisteredWithState` | bool | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Whether the business has filed with the state as a legal entity.

**State of Registration** | `cStateOfRegistration` | enum | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Values: All US states
>
> Conditional visibility: shown only when Registered with State = Yes.

**Legal Business Structure** | `cLegalBusinessStructure` | enum | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Values: Sole Proprietor, Partnership, LLC, S-Corp, C-Corp,
> Non-Profit 501(c)(3), Other
>
> Conditional visibility: shown only when Registered with State = Yes.

**EIN on File** | `cEinOnFile` | bool | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Conditional visibility: shown only when Registered with State = Yes.
>
> Whether the business has obtained a federal EIN.

**Date of Formation** | `cDateOfFormation` | date | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Conditional visibility: shown only when Registered with State = Yes.
>
> The date the business entity was formally established.

**Registered Agent** | `cRegisteredAgent` | bool | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-002 (Phase 2)
>
> Conditional visibility: shown only when Registered with State = Yes.
>
> Whether the business has a designated registered agent.

**EIN Number** | `cEinNumber` | varchar | Optional | **[CUSTOM]** | Restricted
> Source: MN-INTAKE-DAT-002
>
> Access restricted to Client Administrator, Client Assignment
> Coordinator, and assigned mentors. Never collected on public forms.
>
> The actual federal Employer Identification Number.

---

### CD-ENT-002 — Client Contact

**Entity Type:** Native (Contact) — extends the built-in Contact entity
**Display Name (singular):** Contact
**Display Name (plural):** Contacts
**Source Domain:** MN (Mentoring), MR (Mentor Recruitment — pending),
CR (Client Recruiting — pending)
**Description:** An individual person associated with a client
organization or serving as a volunteer mentor. The Contact entity is
shared across multiple domains. This definition covers the Client
Contact fields defined by the Mentoring domain. Mentor-specific fields
will be added when the Mentor Recruitment Domain PRD is processed.

**Conflict Note:** The Contact entity is used by both the Mentoring
domain (Client Contacts) and the Mentor Recruitment domain (Mentor
Contacts). A Contact Type field distinguishes between them. Full
conflict resolution will be completed when the Mentor Recruitment
Domain PRD is processed.

#### Fields

---

**First Name** | `firstName` | varchar | Required | **[NATIVE]**
> Source: MN-INTAKE-DAT-003
>
> The contact's first name. Native Contact field.

**Last Name** | `lastName` | varchar | Required | **[NATIVE]**
> Source: MN-INTAKE-DAT-003
>
> The contact's last name. Native Contact field.

**Middle Name** | `cMiddleName` | varchar | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-003
>
> The contact's middle name.

**Preferred Name** | `cPreferredName` | varchar | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-003
>
> The name the contact prefers to be called. Used in communications
> and engagement materials.

**Email** | `emailAddress` | email | Required | **[NATIVE]**
> Source: MN-INTAKE-DAT-003
>
> The contact's primary email address. Used for all CBM communications.
> Native Contact field.

**Phone** | `phoneNumber` | phone | Optional | **[NATIVE]**
> Source: MN-INTAKE-DAT-003
>
> The contact's primary phone number. Native Contact field.

**Zip Code** | `cZipCode` | varchar | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-003
>
> The contact's zip code. Used for geographic service area reporting.

**Role at Business** | `cRoleAtBusiness` | varchar | Optional | **[CUSTOM]**
> Source: MN-INTAKE-DAT-003
>
> The contact's title or position within the client business.

**Primary Contact** | `cPrimaryContact` | bool | Required | **[CUSTOM]**
> Source: MN-INTAKE-DAT-003
>
> Default: Yes for first contact created on an organization.
>
> Identifies this contact as the primary point of contact for the
> client organization. Drives default communication routing.

---

### CD-ENT-003 — Engagement

**Entity Type:** Custom (Base)
**Display Name (singular):** Engagement
**Display Name (plural):** Engagements
**Source Domain:** MN (Mentoring)
**Description:** The active mentoring relationship between CBM and a
client organization. Tracks lifecycle, mentor assignments, session
activity, and satisfaction survey history. Records are retained
permanently and never deleted or reopened after closure.

#### Fields

---

**Client Organization** | `accountId` | belongsTo | Required | **[NATIVE relationship]**
> Source: MN-ENGAGE-DAT-001
>
> Link to the parent Client Organization record.

**Status** | `cStatus` | enum | Required | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Values: Submitted, Declined, Pending Acceptance, Assigned, Active,
> On-Hold, Dormant, Inactive, Abandoned, Completed
>
> Default: Submitted (set on record creation via intake form)
>
> The current lifecycle stage of the engagement. Drives all workflow
> automation.

**Assigned Mentor** | `cAssignedMentorId` | belongsTo | Required when Assigned+ | **[CUSTOM]**
> Source: MN-MATCH-DAT-003
>
> Link to the primary mentor Contact record.

**Co-Mentors** | `cCoMentors` | hasMany | Optional | **[CUSTOM relationship]**
> Source: MN-MATCH-DAT-003
>
> Many-to-many relationship to Co-Mentor Contact records.

**Subject Matter Experts** | `cSubjectMatterExperts` | hasMany | Optional | **[CUSTOM relationship]**
> Source: MN-ENGAGE-DAT-005
>
> Many-to-many relationship to SME Contact records.

**Engagement Contacts** | `cEngagementContacts` | hasMany | Optional | **[CUSTOM relationship]**
> Source: MN-ENGAGE-DAT-001
>
> Many-to-many relationship to participating Client Contact records.
> Defaults to Primary Contact if empty.

**Meeting Cadence** | `cMeetingCadence` | enum | Required | **[CUSTOM]**
> Source: MN-MATCH-DAT-004
>
> Values: Weekly, Bi-Weekly, Monthly, As Needed
>
> Drives cadence-aware inactivity monitoring thresholds.

**Next Session Date/Time** | `cNextSessionDateTime` | datetime | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Triggers calendar meeting request and resets inactivity clock
> when saved.

**Start Date** | `cStartDate` | date | System-populated | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Auto-populated when status transitions to Active.

**Close Date** | `cCloseDate` | date | System-populated | **[CUSTOM]**
> Source: MN-CLOSE-DAT-003
>
> Auto-populated on closure.

**Close Reason** | `cCloseReason` | enum | Required on closure | **[CUSTOM]**
> Source: MN-CLOSE-DAT-002
>
> Values: Goals Achieved, Client Withdrew, Inactive / No Response,
> Other
>
> Auto-set to Inactive / No Response for system-initiated Abandoned
> closures.

**Total Sessions** | `cTotalSessions` | int | System-calculated | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Read-only. Calculated from count of linked Session records.

**Total Sessions (Last 30 Days)** | `cTotalSessionsLast30` | int | System-calculated | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Read-only. Count of Session records dated within last 30 days.
> Used by inactivity monitoring.

**Last Session Date** | `cLastSessionDate` | date | System-calculated | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Read-only. Date of most recently linked Session record.

**Total Session Hours** | `cTotalSessionHours` | float | System-calculated | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-001
>
> Read-only. Sum of Duration across all linked Session records,
> expressed in hours.

**Business Outcomes** | `cBusinessOutcomes` | text | Optional | **[CUSTOM]**
> Source: MN-CLOSE-DAT-004
>
> Recorded at closure. Used for funder impact reporting.

---

### CD-ENT-004 — Session

**Entity Type:** Custom (Base)
**Display Name (singular):** Session
**Display Name (plural):** Sessions
**Source Domain:** MN (Mentoring)
**Description:** Records each individual meeting between a mentor and
client. Linked to an Engagement. Drives roll-up analytics, satisfaction
survey triggers, and inactivity monitoring. At least one mentor
attendee required before record can be saved.

#### Fields

---

**Engagement** | `engagementId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: MN-ENGAGE-DAT-004
>
> Link to the parent Engagement record.

**Session Date/Time** | `cSessionDateTime` | datetime | Required | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> The date and time the session occurred.

**Duration** | `cDuration` | int | Required | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Session length in minutes. Used to calculate Total Session Hours
> on the Engagement record.

**Session Type** | `cSessionType` | enum | Required | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Values: In-Person, Video Call, Phone Call
>
> Drives conditional display of Meeting Location Type field.

**Meeting Location Type** | `cMeetingLocationType` | enum | Conditional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Values: CBM Office, Client's Place of Business, Other
>
> Conditional visibility: shown and required only when Session
> Type = In-Person.

**Location Details** | `cLocationDetails` | varchar | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Conditional visibility: shown only when Meeting Location Type = Other.

**Topics Covered** | `cTopicsCovered` | multiEnum | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Values: To be defined by CBM leadership — see Open Issue MN-ISS-002

**Topics Covered Notes** | `cTopicsCoveredNotes` | text | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Free-text supplement to the Topics Covered multi-select. Allows
> additional detail beyond the predefined topic categories.

**Mentor Notes** | `cMentorNotes` | text | Optional | **[CUSTOM]** | Restricted
> Source: MN-ENGAGE-DAT-004
>
> Access restricted to Client Administrator, Mentor Administrator,
> and assigned mentors. Never visible to clients.

**Next Steps** | `cNextSteps` | text | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Agreed-upon actions from the session. May be included in the
> session summary email.

**New Business Started** | `cNewBusinessStarted` | bool | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> Whether this session resulted in the client starting a new business.
> Tracked for funder impact reporting.

**Next Session Date/Time** | `cNextSessionDateTime` | datetime | Optional | **[CUSTOM]**
> Source: MN-ENGAGE-DAT-004
>
> When saved, updates the Next Session Date/Time on the linked
> Engagement record and triggers a meeting request.

**Mentor Attendees** | `cMentorAttendees` | hasMany | Required | **[CUSTOM relationship]**
> Source: MN-ENGAGE-DAT-004
>
> Many-to-many relationship to mentor Contact records. At least one
> required — enforced as a save validation rule.

---

### CD-ENT-005 — Survey Response

**Entity Type:** Custom (Base)
**Display Name (singular):** Survey Response
**Display Name (plural):** Survey Responses
**Source Domain:** MN (Mentoring)
**Description:** Captures client satisfaction feedback at defined
points in the engagement lifecycle. Triggered automatically after
the 2nd session, every 5 sessions thereafter, and at engagement
close. Delivered via integrated survey tool. Responses stored in
the CRM linked to both the Engagement and triggering Session.

#### Fields

---

**Engagement** | `engagementId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: MN-SURVEY-DAT-002
>
> Link to the parent Engagement record.

**Session** | `sessionId` | belongsTo | Optional | **[CUSTOM relationship]**
> Source: MN-SURVEY-DAT-002
>
> Link to the Session that triggered this survey. Not set for
> engagement close surveys.

**Survey Trigger** | `cSurveyTrigger` | enum | System-populated | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Values: 2nd Session, Every 5 Sessions, Engagement Close
>
> Read-only. System-populated on record creation.

**Survey Date/Time** | `cSurveyDateTime` | datetime | System-populated | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Read-only. Populated when survey response is received.

**NPS Score** | `cNpsScore` | int | Required | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Scale 0–10. Standard Net Promoter Score rating.

**Did CBM Help You** | `cDidCbmHelpYou` | bool | Required | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Yes / No. Simple binary measure of program effectiveness.

**Would Return to See This Mentor** | `cWouldReturnToMentor` | int | Required | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Scale 1–5.

**Mentor Listened and Understood** | `cMentorListened` | int | Required | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Scale 1–5.

**How Could CBM Better Meet Needs** | `cHowCouldCbmImprove` | text | Optional | **[CUSTOM]**
> Source: MN-SURVEY-DAT-002
>
> Open-ended feedback. Reviewed by administrators for program
> improvement insights.

---

## 3. Relationships

| ID | From Entity | To Entity | Type | Source |
|---|---|---|---|---|
| CD-REL-001 | Client Organization | Client Contact | One-to-Many | MN-INTAKE |
| CD-REL-002 | Client Organization | Engagement | One-to-Many | MN-INTAKE |
| CD-REL-003 | Engagement | Contact (Assigned Mentor) | Many-to-One | MN-MATCH |
| CD-REL-004 | Engagement | Contact (Co-Mentors) | Many-to-Many | MN-MATCH |
| CD-REL-005 | Engagement | Contact (SMEs) | Many-to-Many | MN-ENGAGE |
| CD-REL-006 | Engagement | Contact (Engagement Contacts) | Many-to-Many | MN-ENGAGE |
| CD-REL-007 | Engagement | Session | One-to-Many | MN-ENGAGE |
| CD-REL-008 | Engagement | Survey Response | One-to-Many | MN-SURVEY |
| CD-REL-009 | Session | Contact (Mentor Attendees) | Many-to-Many | MN-ENGAGE |
| CD-REL-010 | Session | Survey Response | One-to-One | MN-SURVEY |

---

## 4. Change History

| Change | Proposal | Date | Status |
|---|---|---|---|
| Initial Consolidated Design created from Mentoring Domain PRD v1.0 | N/A — initial creation | March 2026 | Applied |

---

## Appendix A — Enum Values Pending Definition

The following enum fields have values that must be defined by CBM
leadership before YAML can be generated for the affected entities.
These are tracked as Open Issues in the Mentoring Domain PRD.

| Field | Entity | Issue ID |
|---|---|---|
| Mentoring Focus Areas | Client Organization | MN-ISS-001 |
| Revenue Range | Client Organization | MN-ISS-003 |
| Topics Covered | Session | MN-ISS-002 |

NAICS Sector and Subsector values are defined by the federal NAICS
classification system and do not require CBM input. Full value lists
will be included in the YAML program files.
