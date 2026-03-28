# CBM Test Instance CRM Implementation Reference

## CRM Implementation Reference

Generated from YAML program files
  Version: 1.2
  Generated: 2026-03-28 16:34 UTC

This document defines the EspoCRM configuration required to support the requirements specified in the CBM PRD documents. It is generated automatically from the YAML program files and must not be edited manually.

---

# Introduction

This document is the authoritative implementation reference for the Cleveland Business Mentors CRM system built on EspoCRM. It defines every entity, field, layout, and configuration item required to support the requirements stated in the CBM PRD documents.

This document is generated automatically from the YAML program files used by CRM Builder. To update this document, update the YAML files and regenerate.

Sections marked 'Planned — Not Yet Implemented' describe future capability not yet supported by the deployment tool.

# Entities

## Company (Account)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | Account |
| Display Name (Singular) | Company |
| Display Name (Plural) | Companies |
| Entity Type | Native (Account) |
| Stream Enabled | No |
| Deployment Method | Field configuration only |

Represents all organizations CBM works with — Client Companies receiving mentoring services and Partner Organizations in CBM's community network. A single organization can be both simultaneously. The Account Type field drives Dynamic Logic to show the appropriate fields for each role. Client Company fields cover business profile, legal registration, and certifications. Partner fields cover relationship classification, liaison assignment, and geographic scope.

## Contact

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | Contact |
| Display Name (Singular) | Contact |
| Display Name (Plural) | Contacts |
| Entity Type | Native (Contact) |
| Stream Enabled | No |
| Deployment Method | Field configuration only |

Represents any individual person CBM works with — mentors, client contacts, partner contacts, and administrators. Contact Type field distinguishes the primary role. A person can hold multiple mentor roles simultaneously (Mentor, Co-Mentor, SME). Dynamic Logic shows mentor-specific fields only when a mentor role is active. Contact is the foundation entity of CBM's CRM — every other entity connects to it.

## Engagement

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CEngagement |
| Display Name (Singular) | Engagement |
| Display Name (Plural) | Engagements |
| Entity Type | Custom (Base) |
| Stream Enabled | Yes |
| Deployment Method | delete_and_create |

No description provided.

## Session

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CSession |
| Display Name (Singular) | Session |
| Display Name (Plural) | Sessions |
| Entity Type | Custom (Base) |
| Stream Enabled | Yes |
| Deployment Method | delete_and_create |

No description provided.

## NPS Survey Response (NpsSurveyResponse)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CNpsSurveyResponse |
| Display Name (Singular) | NPS Survey Response |
| Display Name (Plural) | NPS Survey Responses |
| Entity Type | Custom (Base) |
| Stream Enabled | No |
| Deployment Method | delete_and_create |

No description provided.

## Workshop

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CWorkshop |
| Display Name (Singular) | Workshop |
| Display Name (Plural) | Workshops |
| Entity Type | Custom (Base) |
| Stream Enabled | Yes |
| Deployment Method | delete_and_create |

No description provided.

## Workshop Attendance (WorkshopAttendance)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CWorkshopAttendance |
| Display Name (Singular) | Workshop Attendance |
| Display Name (Plural) | Workshop Attendance |
| Entity Type | Custom (Base) |
| Stream Enabled | No |
| Deployment Method | delete_and_create |

No description provided.

## Dues

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CDues |
| Display Name (Singular) | Dues |
| Display Name (Plural) | Dues |
| Entity Type | Custom (Base) |
| Stream Enabled | No |
| Deployment Method | delete_and_create |

No description provided.

## Partner Agreement (PartnerAgreement)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CPartnerAgreement |
| Display Name (Singular) | Partner Agreement |
| Display Name (Plural) | Partner Agreements |
| Entity Type | Custom (Base) |
| Stream Enabled | No |
| Deployment Method | delete_and_create |

Tracks formal written agreements between CBM and a Partner organization. A Partner may have more than one agreement on file over time (e.g., an original MOU and a subsequent renewal). All agreements are retained for historical reference even when superseded. Agreement documents are restricted to management-level access — liaisons and mentors without management access cannot view or download agreement attachments. Requirement: CBM-PRD-CRM-Partners.docx Section 7.

## Client-Partner Association (ClientPartnerAssociation)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CClientPartnerAssociation |
| Display Name (Singular) | Client-Partner Association |
| Display Name (Plural) | Client-Partner Associations |
| Entity Type | Custom (Base) |
| Stream Enabled | No |
| Deployment Method | delete_and_create |

Junction entity linking a Client Account to a Partner Account. Enables CBM to track which clients belong to each Partner's population, which is the foundation for all Partner-specific analytics reporting. A client may be associated with multiple Partners simultaneously — geographic overlap is common in Northeast Ohio. Associations are established at intake when the client indicates a referral source or partnership program, and persist unless explicitly removed. Detailed client-level data shared with Partners may require client consent; aggregate analytics may be provided without individual consent. Requirement: CBM-PRD-CRM-Partners.docx Section 8.

## Partner Activity (PartnerActivity)

| Property | Value |
| --- | --- |
| EspoCRM Entity Name | CPartnerActivity |
| Display Name (Singular) | Partner Activity |
| Display Name (Plural) | Partner Activities |
| Entity Type | Custom (Base) |
| Stream Enabled | Yes |
| Deployment Method | delete_and_create |

Records joint activities and events between CBM and a Partner organization. Covers the full spectrum of Partner engagement: CBM-hosted events where a Partner was invited, co-hosted events, joint workshops or programs, co-developed content, coordination meetings, and other activities. Used by the assigned liaison to maintain a complete activity log for each Partner, and to produce the portfolio-level reporting CBM leadership needs on partnership engagement frequency and depth. This is CBM's first structured event tracking capability — individual contact attendees are tracked to know which specific Partner contacts were present at each activity. Requirement: CBM-PRD-CRM-Partners.docx Section 10.

# Fields

## Company (Account)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| — Overview — |  |  |  |  |  |  |
| Account Type | `cAccountType` | Multi-select | Yes | Overview | The role(s) this organization plays in CBM. Multi-select to support organizations that are both a Client Company and a Partner simultaneously. Drives Dynamic Logic panels. PRD Reference: CBM-PRD-CRM-P... | Values: Client Company \| Partner |
| Website | `cWebsite` | URL | No | Overview | Organization's public website URL. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2, CBM-PRD-CRM-Partners.docx Section 5.1. | — |
| — Client Profile — |  |  |  |  |  |  |
| Organization Type | `cClientOrganizationType` | Enum | Yes | Client Profile | Whether the client business is a for-profit or non-profit entity. Required for client companies. Used for analytics and grant reporting. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | Values: For-Profit \| Non-Profit |
| Business Stage | `cBusinessStage` | Enum | Yes | Client Profile | Current stage of business development. Required. Used for mentor matching and program analytics. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | Values: Pre-Startup \| Startup \| Early Stage \| Growth Stage \| Established |
| NAICS Sector | `cNaicsSector` | Enum | Yes | Client Profile | Top-level industry classification (NAICS). 20 sectors. Required. Used for mentor matching and reporting. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | See Appendix A |
| NAICS Subsector | `cNaicsSubsector` | Enum | Yes | Client Profile | Second-level industry classification, filtered by NAICS Sector. Required. TBD: Full subsector list (~100 values) to be loaded. MANUAL CONFIG: Configure Dynamic Logic cascade filter by sector. PRD Refe... | Values: TBD - Full NAICS subsector list to be loaded |
| Mentoring Focus Areas | `cMentoringFocusAreas` | Multi-select | Yes | Client Profile | Business areas where the client seeks mentoring support. Multi-select. Used for mentor matching and funder reporting. TBD: Values to be defined by CBM Leadership. PRD Reference: CBM-PRD-CRM-Client.doc... | Values: TBD - Values to be defined by Leadership |
| Mentoring Needs Description | `cMentoringNeedsDescription` | Rich Text | Yes | Client Profile | Free-form description of what the client seeks in a mentoring engagement. Rich text. Required. Collected on intake form. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| — Business Detail — |  |  |  |  |  |  |
| Business Description | `cBusinessDescription` | Rich Text | No | Business Detail | Detailed description of what the business does, its history, and founding story. Rich text. Optional. Mentor-populated. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Time in Operation | `cTimeInOperation` | Enum | No | Business Detail | How long the business has been operating. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | Values: Less than 1 year \| 1-2 years \| 2-5 years \| 5-10 years \| More than 10 years |
| Current Team Size | `cCurrentTeamSize` | Integer | No | Business Detail | Number of current employees or team members. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | Min: 0 |
| Revenue Range | `cRevenueRange` | Enum | No | Business Detail | Approximate annual revenue range. Optional. TBD: Specific ranges to be defined by Leadership. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | Values: Pre-Revenue \| TBD - Revenue ranges to be defined |
| Funding Situation | `cFundingSituation` | Rich Text | No | Business Detail | Current funding sources or needs. Rich text. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Current Challenges | `cCurrentChallenges` | Rich Text | No | Business Detail | Primary obstacles the business faces. Rich text. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Goals and Objectives | `cGoalsAndObjectives` | Rich Text | No | Business Detail | What the client wants to achieve through mentoring. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Desired Outcomes (6-12 Months) | `cDesiredOutcomes` | Rich Text | No | Business Detail | Specific near-term outcomes the client hopes to achieve. Rich text. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Previous Mentoring / Advisory Experience | `cPreviousMentoringExperience` | Rich Text | No | Business Detail | Prior mentor or advisor experience and context. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Current Professional Advisors | `cCurrentProfessionalAdvisors` | Multi-select | No | Business Detail | Types of professional advisors currently engaged. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | See Appendix A |
| — Legal & Registration — |  |  |  |  |  |  |
| Registered with State | `cRegisteredWithState` | Boolean | No | Legal & Registration | Whether the business has filed with the state as a legal entity. Drives visibility of registration fields via Dynamic Logic. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| State of Registration | `cStateOfRegistration` | Enum | No | Legal & Registration | State where the business is registered. Shown when Registered with State = Yes. Optional. MANUAL CONFIG: Dynamic Logic show when registeredWithState = true. PRD Reference: CBM-PRD-CRM-Client.docx Sect... | See Appendix A |
| Legal Business Structure | `cLegalBusinessStructure` | Enum | No | Legal & Registration | Legal structure of the registered business. Shown when Registered with State = Yes. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | See Appendix A |
| EIN on File | `cEinOnFile` | Boolean | No | Legal & Registration | Whether the business has an Employer Identification Number. Shown when Registered with State = Yes. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Date of Formation | `cDateOfFormation` | Date | No | Legal & Registration | Date the business entity was formally established. Shown when Registered with State = Yes. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| Registered Agent | `cRegisteredAgent` | Boolean | No | Legal & Registration | Whether the business has a designated registered agent. Shown when Registered with State = Yes. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2. | — |
| EIN Number | `cEinNumber` | Text | No | Legal & Registration | The actual EIN number. RESTRICTED: Admin and assigned Primary Mentor only. Mentor-populated — not on intake form. MANUAL CONFIG: Field-level security in Administration → Roles. PRD Reference: CBM-PRD-... | Max length: 20 |
| — Certifications — |  |  |  |  |  |  |
| Veteran-Owned Business | `cVeteranOwnedBusiness` | Enum | No | Certifications | Majority-owned by one or more veterans. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Service-Disabled Veteran-Owned (SDVOSB) | `cSdvosb` | Enum | No | Certifications | SBA/VA certification for service-disabled veteran-owned businesses. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Woman-Owned Small Business (WOSB) | `cWosb` | Enum | No | Certifications | SBA certification for women-majority-owned businesses. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Minority-Owned Business Enterprise (MBE) | `cMbe` | Enum | No | Certifications | Certification for racial/ethnic minority-owned businesses. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Disadvantaged Business Enterprise (DBE) | `cDbe` | Enum | No | Certifications | Federal DOT certification for disadvantaged business owners. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| SBA Small Business | `cSbaSmallBusiness` | Enum | No | Certifications | Meets SBA size standards, registered in SAM.gov. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| HUBZone Certified | `cHubzoneCertified` | Enum | No | Certifications | SBA certification for Historically Underutilized Business Zones. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| 8(a) Program Participant | `cEightA` | Enum | No | Certifications | SBA 8(a) Business Development Program. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| LGBTQ+-Owned Business | `cLgbtqOwnedBusiness` | Enum | No | Certifications | Certification through NGLCC for LGBTQ+-owned businesses. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Disability-Owned Business Enterprise (DOBE) | `cDobe` | Enum | No | Certifications | Certification through Disability:IN. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Native American / Tribal Owned | `cNativeAmericanOwned` | Enum | No | Certifications | Majority-owned by Native American, Alaska Native, or Native Hawaiian individuals or a tribal entity. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Certified B Corporation | `cCertifiedBCorp` | Enum | No | Certifications | B Lab certification for social/environmental/governance standards. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | Values: Ineligible \| Eligible \| Certified \| In Progress |
| Union Shop | `cUnionShop` | Boolean | No | Certifications | Operates under a union agreement. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | — |
| Family-Owned Business | `cFamilyOwnedBusiness` | Boolean | No | Certifications | Owned and operated by members of the same family. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | — |
| Franchise | `cFranchise` | Boolean | No | Certifications | Operates as a franchise of a larger brand or system. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | — |
| Social Enterprise | `cSocialEnterprise` | Boolean | No | Certifications | Has a primary social, environmental, or community mission alongside commercial activity. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | — |
| Other Certifications / Designations | `cOtherCertifications` | Text (multi-line) | No | Certifications | Additional certifications or ownership classifications not covered by structured fields. Optional. PRD Reference: CBM-PRD-CRM-Client.docx Section 2.2.3. | — |
| — Partner Profile — |  |  |  |  |  |  |
| Organization Type | `cOrganizationType` | Enum | No | Partner Profile | The category of organization the partner represents. Required for partner organizations. PRD Reference: CBM-PRD-CRM-Partners.docx Section 5.1. | See Appendix A |
| Partner Type(s) | `cPartnerTypes` | Multi-select | No | Partner Profile | The nature of CBM's relationship with this partner. Multi-select. A partner may hold more than one type simultaneously. Review annually or when the relationship nature changes. PRD Reference: CBM-PRD-... | Values: Referral Partner \| Co-Delivery Partner \| Funding / Sponsorship Partner \| Resource Partner |
| Partner Status | `cPartnerStatus` | Enum | Yes | Partner Profile | Current state of the partner relationship. Status changes should always be accompanied by a note. No automated workflows trigger status changes — manual process only. PRD Reference: CBM-PRD-CRM-Partne... | Values: Prospect \| Active \| Lapsed \| Inactive; Default: Prospect |
| Partnership Start Date | `cPartnershipStartDate` | Date | No | Partner Profile | Date the partnership was formally established. Optional for Prospects; required when status moves to Active. PRD Reference: CBM-PRD-CRM-Partners.docx Section 5.1. | — |
| Public Announcement Allowed | `cPublicAnnouncementAllowed` | Boolean | No | Partner Profile | Whether CBM may publicly announce or reference this partnership. Defaults to No. Confirm with partner before any public mention. PRD Reference: CBM-PRD-CRM-Partners.docx Section 5.1. | Default: False |
| Geographic Service Area | `cGeographicServiceArea` | Text (multi-line) | No | Partner Profile | The geographic territory the organization primarily serves (e.g., City of Cleveland, Cuyahoga County, Greater Akron). Optional. Used for filtering and partner-client matching. PRD Reference: CBM-PRD-C... | — |
| Target Population | `cTargetPopulation` | Text (multi-line) | No | Partner Profile | The specific population or business segment the organization focuses on (e.g., minority-owned businesses, women entrepreneurs). Optional. PRD Reference: CBM-PRD-CRM-Partners.docx Section 5.1. | — |
| Social Media | `cSocialMedia` | Text (multi-line) | No | Partner Profile | Links to LinkedIn, Facebook, or other social profiles. Optional. PRD Reference: CBM-PRD-CRM-Partners.docx Section 5.1. | — |
| Partner Notes | `cPartnerNotes` | Rich Text | No | Partner Profile | General notes on the partner relationship, key milestones, and status change explanations. Notes should always accompany status changes to explain the reason. PRD Reference: CBM-PRD-CRM-Partners.docx ... | — |

## Contact

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| — Overview — |  |  |  |  |  |  |
| Contact Type | `cContactType` | Enum | Yes | Overview | Primary role of this contact in CBM. Used in list views and searches to distinguish between contact types. A mentor contact uses the Mentor role flags (isMentor, isCoMentor, isSME) for more granular r... | Values: Client \| Mentor \| Partner Contact \| Administrator; Default: Client |
| Notes | `cNotes` | Rich Text | No | Overview | General notes and observations. For client contacts: visible to all mentors and admins. For partner contacts: supplement to the activity stream for quick context. | — |
| Preferred Name | `cPreferredName` | Text | No | Overview | The name the mentor prefers to go by. Used in all communications for a personalized experience. | Max length: 100 |
| CBM Gmail Address | `cCbmGmailAddress` | Email | No | Overview | CBM-assigned Google Workspace email address (e.g., jsmith@clevelandbusinessmentors.org). Admin-populated during mentor activation. Used for all ongoing mentoring communications. Mentor: read-only. PRD... | — |
| — Profile — |  |  |  |  |  |  |
| LinkedIn | `cLinkedInProfile` | URL | No | Profile | LinkedIn profile URL. For mentors: displayed on public website profile when Profile Visible on Website is true. For partner contacts: used for professional context and background research. | — |
| Professional Title | `cProfessionalTitle` | Text | No | Profile | Current job title or role at their organization. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 2. | Max length: 150 |
| Current Employer | `cCurrentEmployer` | Text | No | Profile | Name of current employer or organization. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 2. | Max length: 150 |
| Currently Employed | `cCurrentlyEmployed` | Boolean | No | Profile | Whether the mentor is currently employed. Collected on the mentor application form. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 2. | — |
| Years of Business Experience | `cYearsOfBusinessExperience` | Integer | No | Profile | Years of professional business experience. Used for mentor profile and matching. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 2. | Min: 0 |
| Professional Bio / Work Experience | `cProfessionalBio` | Rich Text | No | Profile | Rich text biography. Collected on application form as "Describe Your Work Experience." Used for mentor profiles and matching communications. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 2. | — |
| NAICS Sectors | `cNaicsSectors` | Multi-select | Yes | Profile | Industry sectors of expertise. Multi-select, aligned with the Company NAICS Sector dropdown values. Used for mentor-client matching. TBD: Values from full NAICS taxonomy. PRD Reference: CBM-PRD-CRM-Me... | See Appendix A |
| Skills & Expertise Tags | `cSkillsAndExpertiseTags` | Multi-select | No | Profile | Finer-grained expertise tags for advanced mentor matching. TBD: Values to be defined by CBM Leadership. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 3. | Values: TBD - Values to be defined by Leadership |
| Why Interested in Mentoring | `cWhyInterestedInMentoring` | Rich Text | No | Profile | Mentor's stated motivation for joining CBM as a mentor. Collected on the mentor application form. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 3. | — |
| Area of Expertise | `cAreaOfExpertise` | Rich Text | No | Profile | Rich text description of business expertise and specializations. Mentor-maintained. Used for client matching context. | — |
| Industry Experience | `cIndustryExperience` | Rich Text | No | Profile | Rich text description of industry background and work history. Mentor-maintained. | — |
| Education Details | `cEducationDetails` | Rich Text | No | Profile | Rich text description of educational background and qualifications. Mentor-maintained. | — |
| Interests | `cInterests` | Rich Text | No | Profile | Professional and personal interests. Helps match mentors to clients with aligned backgrounds. Mentor-maintained. | — |
| Languages Spoken | `cLanguagesSpoken` | Multi-select | No | Profile | Languages the mentor is fluent in. Used for mentor-client matching. TBD: Language list to be defined. | Values: TBD - Language list to be defined |
| Twitter / X | `cTwitterProfile` | URL | No | Profile | Twitter/X profile URL. Displayed on public website profile when Profile Visible on Website is true. | — |
| YouTube | `cYoutubeProfile` | URL | No | Profile | YouTube channel URL. Displayed on public website profile when Profile Visible on Website is true. | — |
| Instagram | `cInstagramProfile` | URL | No | Profile | Instagram profile URL. Displayed on public website profile when Profile Visible on Website is true. | — |
| — Analytics — |  |  |  |  |  |  |
| Last Activity Date | `cLastActivityDate` | Date | No | Analytics | Most recent CRM activity — email, call, note, session, or engagement activity. Calculated automatically. Read-only. MANUAL CONFIG: Configure formula in Entity Manager → Contact → Formula. | Read-only. |
| Current Active Clients | `cCurrentActiveClients` | Integer | No | Analytics | Count of Engagements where this mentor is Primary Mentor and status is Active or Assigned. System-calculated. Read-only. MANUAL CONFIG: Configure formula in Entity Manager → Contact → Formula. PRD Ref... | Read-only. |
| Available Capacity | `cAvailableCapacity` | Integer | No | Analytics | Maximum Client Capacity minus Current Active Clients. Used by admin during mentor nomination to verify capacity before assignment. System-calculated. Read-only. MANUAL CONFIG: Configure formula in Ent... | Read-only. |
| Total Active Engagements | `cTotalActiveEngagements` | Integer | No | Analytics | Current active client engagements. Calculated from engagement records. Read-only. | Read-only. |
| Assigned Engagements (7 Days) | `cAssignedEngagements7Days` | Integer | No | Analytics | Client assignments offered in past 7 days. Calculated. Read-only. | Read-only. |
| Accepted Engagements (7 Days) | `cAcceptedEngagements7Days` | Integer | No | Analytics | Client assignments accepted in past 7 days. Calculated. Read-only. | Read-only. |
| Total Engagement History | `cTotalEngagementHistory` | Integer | No | Analytics | Cumulative count of all engagements across full tenure. Calculated. Read-only. | Read-only. |
| Total Hours Delivered | `cTotalHoursDelivered` | Decimal | No | Analytics | Cumulative mentoring hours across all sessions. Calculated. Read-only. Used in badge level calculation. | Read-only. |
| Average NPS Score | `cAverageNpsScore` | Decimal | No | Analytics | Average NPS score from clients across all engagements. Calculated. Read-only. | Read-only. |
| Years of Service | `cYearsOfService` | Decimal | No | Analytics | Years since Date Joined. Calculated from Date Joined field. Read-only. | Read-only. |
| Badge Level | `cBadgeLevel` | Enum | No | Analytics | Recognition badge earned. Calculated automatically. Triggers recognition letter on level change. Read-only. TBD: Thresholds to be defined by Leadership. | Values:  \| Bronze \| Silver \| Gold; Read-only. |
| Last Engagement Accepted | `cLastEngagementAccepted` | Date | No | Analytics | Date of most recently accepted client engagement. Calculated. Read-only. | Read-only. |
| — Personal — |  |  |  |  |  |  |
| Spouse / Partner Name | `cSpouseName` | Text | No | Personal | Name of the mentor's spouse or partner for personalized relationship building. | Max length: 100 |
| Work Status | `cWorkStatus` | Enum | No | Personal | Current employment status. Provides context for availability and professional background. | Values: Employed Full-Time \| Employed Part-Time \| Self-Employed \| Retired \| Unemployed |
| Military Status | `cMilitaryStatus` | Enum | No | Personal | Military background for recognition and availability context. | Values: Civilian \| Active Military \| Reserves \| Veteran |
| Departure Reason | `cDepartureReason` | Enum | No | Personal | Reason for departure. Admin-only. Shown when Mentor Status is Resigned or Inactive. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | Values: Relocated \| Career Change \| Time Constraints \| Personal \| Other |
| Departure Date | `cDepartureDate` | Date | No | Personal | Date the mentor formally departed. Admin-only. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Date Joined | `cDateJoined` | Date | No | Personal | Date mentor first joined CBM. Used for Years of Service calculation and tenure recognition. | — |
| Resign Date | `cResignDate` | Date | No | Personal | Date mentor resigned. Set when status changes to Resigned. | — |
| — Availability — |  |  |  |  |  |  |
| Accepting New Clients | `cAcceptingNewClients` | Boolean | Yes | Availability | Whether the mentor is currently available for new client assignments. Relevant when Mentor Status = Active. Mentor-editable. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 4. | Default: False |
| Maximum Client Capacity | `cMaximumClientCapacity` | Integer | Yes | Availability | Maximum number of simultaneous active client engagements this mentor will accept. Mentor-editable. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 4. | Min: 0 |
| Max Client Requests / Week | `cMaxClientRequestsPerWeek` | Integer | No | Availability | Maximum new client requests the mentor will review per week. Mentor-set. Controls intake coordinator assignment volume. | Min: 0 |
| Max Active Clients | `cMaxActiveClients` | Integer | No | Availability | Maximum simultaneous active client engagements. Mentor-set. Used to determine availability for new assignments. | Min: 0 |
| Pause Assignments Until | `cPauseMentorAssignmentsUntil` | Date | No | Availability | Date when mentor auto-resumes accepting new client assignments. Used for scheduled pauses. Leave blank for open-ended pauses. | — |
| Date Paused | `cDatePaused` | Date | No | Availability | Date the mentor's status was changed to Paused. Set automatically on status change. | — |
| Self-Schedule URL | `cMentorSelfScheduleUrl` | URL | No | Availability | Link to mentor's personal scheduling tool (e.g., Calendly) for client and admin booking. | — |
| Profile Visible on Website | `cProfileVisibleOnWebsite` | Boolean | No | Availability | Controls whether mentor's profile appears on the public CBM website. Admin-controlled. | — |
| — Compliance — |  |  |  |  |  |  |
| Terms & Conditions Accepted | `cTermsAndConditionsAccepted` | Boolean | No | Compliance | System-populated from the mentor application form. Whether the mentor has accepted current CBM terms and conditions. Admin-only. Mentor: read-only. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Terms & Conditions Acceptance Date/Time | `cTermsAndConditionsAcceptanceDateTime` | Date/Time | No | Compliance | Timestamp of most recent terms and conditions acceptance. System-populated from application form. Mentor: read-only. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Felony Conviction | `cFelonyConviction` | Boolean | No | Compliance | Disclosed on the mentor application form. Admin-only. Hidden from mentor after form submission. Restricted field. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Background Check Date | `cBackgroundCheckDate` | Date | No | Compliance | Date the background check was completed. Admin-only. Hidden from mentor. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Mentoring Information Complete | `cMentoringInformationComplete` | Boolean | No | Compliance | Admin-set flag confirming all required profile information has been reviewed and verified. Must be set before Active promotion. Admin-set only. | — |
| Background Check Completed | `cBackgroundCheckCompleted` | Boolean | No | Compliance | Background check completed. Required for onboarding. Admin-set only. | — |
| Ethics Class Completed | `cEthicsClassCompleted` | Boolean | No | Compliance | Mandatory ethics class completed. Required before Active promotion. Admin-set; future LMS integration will auto-update. | — |
| Ethics Class Completion Date | `cEthicsClassCompletionDate` | Date | No | Compliance | Date ethics class was completed. | — |
| Intro to Mentoring Completed | `cIntroToMentoringCompleted` | Boolean | No | Compliance | Mandatory Introduction to Mentoring class completed. Required before Active promotion. Admin-set; future LMS auto-update. | — |
| Intro to Mentoring Date | `cIntroToMentoringDate` | Date | No | Compliance | Date Introduction to Mentoring class was completed. | — |
| CRM Training Complete | `cCrmTrainingComplete` | Boolean | No | Compliance | CRM system training completed. Admin-set only. | — |
| Code of Ethics Signed | `cCodeOfEthicsSigned` | Boolean | No | Compliance | Current annual Code of Ethics signed. Renewed annually. Admin-set only. Annual renewal alert workflow configured. | — |
| Code of Ethics Date | `cCodeOfEthicsDate` | Date | No | Compliance | Date current Code of Ethics was signed. Used for renewal calculation. | — |
| Code of Ethics Renewal Date | `cCodeOfEthicsRenewalDate` | Date | No | Compliance | Due date for next Code of Ethics renewal. | — |
| Mentoring Agreement Signed | `cMentoringAgreementSigned` | Boolean | No | Compliance | Mentoring Agreement signed. Required before Active promotion. Admin-set only. | — |
| Mentoring Agreement Date | `cMentoringAgreementDate` | Date | No | Compliance | Date Mentoring Agreement was signed. | — |
| — Administrative — |  |  |  |  |  |  |
| Dues Status | `cDuesStatus` | Enum | No | Administrative | Current-year dues standing. Admin-only. Mentor: read-only. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | Values: Unpaid \| Paid \| Waived |
| Dues Payment Date | `cDuesPaymentDate` | Date | No | Administrative | Date of most recent dues payment. Not applicable when Dues Status = Waived. Admin-only. Mentor: read-only. PRD Reference: CBM-PRD-CRM-Mentor.docx Group 5. | — |
| Status Change Reason | `cStatusChangeReason` | Text (multi-line) | No | Administrative | Reason captured when mentor goes Inactive or Resigned. Cleared when mentor is reactivated. | — |
| How Did You Hear About CBM | `cHowDidYouHearAboutCbm` | Enum | No | Administrative | Referral source when mentor first learned about CBM. TBD: Values to be defined by Leadership. | Values: TBD - Values to be defined |
| — Mentor — |  |  |  |  |  |  |
| Is Mentor | `cIsMentor` | Boolean | No | Mentor | Approved as primary mentor, eligible for direct client assignment. Drives Mentor tab visibility via Dynamic Logic. | — |
| Is Co-Mentor | `cIsCoMentor` | Boolean | No | Mentor | Participates as co-mentor alongside a primary mentor. Can hold simultaneously with Is Mentor or Is SME. | — |
| Is Subject Matter Expert | `cIsSME` | Boolean | No | Mentor | Provides specialist expertise to support other mentors. Never assigned as primary mentor to a client. | — |
| Is Workshop Presenter | `cIsWorkshopPresenter` | Boolean | No | Mentor | Willing and available to present at CBM workshops and seminars. | — |
| Is Mentor Reviewer | `cIsMentorReviewer` | Boolean | No | Mentor | Available to conduct interviews of prospective mentor applicants. Used to filter the list of available reviewers. | — |
| Mentor Status | `cMentorStatus` | Enum | Yes | Mentor | Current lifecycle stage of the mentor. Set to Submitted when application is received. Status changes are logged in the activity stream. | See Appendix A; Default: Submitted |
| Primary Chapter | `cPrimaryChapter` | Enum | No | Mentor | The single chapter the mentor is assigned to. One chapter only to ensure accurate analytics and assignment calculations. TBD: Chapter list to be defined by Leadership. | Values: TBD - Chapter list to be defined |
| — Client Profile — |  |  |  |  |  |  |
| Business Skills | `cBusinessSkills` | Multi-select | No | Client Profile | Business disciplines relevant to the client's background and needs. Same taxonomy as mentor Areas of Expertise for matching. TBD: Taxonomy to be defined. | Values: TBD - Taxonomy to be defined |
| Technology Skills | `cTechnologySkills` | Text (multi-line) | No | Client Profile | Free-text description of client's technology background and tools. Helps mentors understand client's technical context. | — |
| Role & Responsibilities | `cRoleAndResponsibilities` | Text (multi-line) | No | Client Profile | Client's role and decision-making authority within their business. Helps mentors understand who they are working with. | — |
| — Client Analytics — |  |  |  |  |  |  |
| Sessions Attended | `cSessionsAttended` | Integer | No | Client Analytics | Total sessions attended across all engagements. Calculated from session records. Read-only. | Read-only. |
| Workshops Attended | `cWorkshopsAttended` | Integer | No | Client Analytics | Total workshops attended. Calculated from workshop attendance records. Read-only. | Read-only. |
| Last Contact Date | `cLastContactDate` | Date | No | Client Analytics | Most recent communication — email, session, or engagement activity. Calculated automatically. Read-only. | Read-only. |

## Engagement

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Status | `cStatus` | Enum | Yes | — | — | See Appendix A; Default: Submitted |
| Start Date | `cStartDate` | Date | No | — | — | Read-only. |
| Close Date | `cCloseDate` | Date | No | — | — | Read-only. |
| Mentor Assigned Date | `cMentorAssignedDate` | Date | No | — | — | Read-only. |
| Meeting Cadence | `cMeetingCadence` | Enum | Yes | — | — | Values: Weekly \| Bi-Weekly \| Monthly \| As Needed |
| Engagement Close Reason | `cEngagementCloseReason` | Enum | No | — | — | Values: Goals Achieved \| Client Withdrew \| Inactive / No Response \| Other |
| Total Sessions | `cTotalSessions` | Integer | No | — | — | Read-only.; Min: 0 |
| Total Sessions (Last 30 Days) | `cTotalSessionsLast30Days` | Integer | No | — | — | Read-only.; Min: 0 |
| Last Session Date | `cLastSessionDate` | Date | No | — | — | Read-only. |
| Total Session Hours | `cTotalSessionHours` | Decimal | No | — | — | Read-only.; Min: 0 |
| Next Session Date/Time | `cNextSessionDateTime` | Date/Time | No | — | — | — |

## Session

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Session Date/Time | `cSessionDateTime` | Date/Time | Yes | — | — | — |
| Duration (minutes) | `cDuration` | Integer | Yes | — | — | Min: 1 |
| Session Type | `cSessionType` | Enum | Yes | — | — | Values: In-Person \| Video Call \| Phone Call |
| Meeting Location Type | `cMeetingLocationType` | Enum | No | — | — | Values: CBM Office \| Client's Place of Business \| Other |
| Location Details | `cLocationDetails` | Text | No | — | — | Max length: 255 |
| Topics Covered | `cTopicsCovered` | Multi-select | No | — | — | See Appendix A |
| Topics Covered Notes | `cTopicsCoveredNotes` | Rich Text | No | — | — | — |
| Mentor Notes | `cMentorNotes` | Rich Text | No | — | — | — |
| Next Steps | `cNextSteps` | Rich Text | No | — | — | — |
| New Business Started | `cNewBusinessStarted` | Boolean | No | — | — | Default: False |
| Next Session Date/Time | `cNextSessionDateTime` | Date/Time | No | — | — | — |

## NPS Survey Response (NpsSurveyResponse)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Survey Trigger | `cSurveyTrigger` | Enum | No | — | — | Values: 2nd Session \| Every 5 Sessions \| Engagement Close; Read-only. |
| Survey Date/Time | `cSurveyDateTime` | Date/Time | No | — | — | Read-only. |
| NPS Score | `cNpsScore` | Integer | Yes | — | — | Range: 0–10 |
| Did CBM Help You? | `cDidCbmHelpYou` | Boolean | Yes | — | — | Default: False |
| I Would Return to See This Mentor Again | `cWouldReturnToMentor` | Integer | Yes | — | — | Range: 1–5 |
| Mentor Listened and Understood My Needs | `cMentorListenedAndUnderstood` | Integer | Yes | — | — | Range: 1–5 |
| How Could CBM Better Meet Your Needs? | `cImprovementFeedback` | Rich Text | No | — | — | — |

## Workshop

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Title | `cTitle` | Text | Yes | — | — | Max length: 255 |
| Date/Time | `cWorkshopDateTime` | Date/Time | Yes | — | — | — |
| Topic/Category | `cTopicCategory` | Enum | Yes | — | — | See Appendix A |
| Presenter | `cPresenter` | Text | No | — | — | Max length: 255 |
| Location | `cLocation` | Text | No | — | — | Max length: 255 |
| Description | `cWorkshopDescription` | Rich Text | No | — | — | — |
| Maximum Capacity | `cMaximumCapacity` | Integer | No | — | — | Min: 0 |
| Status | `cStatus` | Enum | Yes | — | — | Values: Scheduled \| Completed \| Cancelled; Default: Scheduled |

## Workshop Attendance (WorkshopAttendance)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Attendance Date | `cAttendanceDate` | Date | No | — | — | Read-only. |
| Attended | `cAttended` | Boolean | Yes | — | — | Default: True |

## Dues

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Billing Year | `cBillingYear` | Integer | Yes | — | — | Min: 2000 |
| Amount Due | `cAmountDue` | Currency | Yes | — | — | — |
| Invoice Date | `cInvoiceDate` | Date | No | — | — | — |
| Payment Date | `cPaymentDate` | Date | No | — | — | — |
| Payment Method | `cPaymentMethod` | Enum | No | — | — | Values: Stripe \| Waived \| Other |
| Notes | `cNotes` | Rich Text | No | — | — | — |

## Partner Agreement (PartnerAgreement)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| — Agreement Details — |  |  |  |  |  |  |
| Agreement Type | `cAgreementType` | Enum | Yes | Agreement Details | Categorizes the type of formal agreement in place. MOU: Memorandum of Understanding — a non-binding statement of intent and shared goals. Partnership Agreement: a binding agreement defining terms, res... | Values: Memorandum of Understanding (MOU) \| Partnership Agreement \| Letter of Intent \| Other |
| Creation Date | `cCreationDate` | Date | Yes | Agreement Details | The date the agreement was created or signed. Required. Used as the primary sort field on the Partner Agreements list view and for tracking agreement history over time. Requirement: CBM-PRD-CRM-Partne... | — |
| Expiration / Renewal Date | `cExpirationRenewalDate` | Date | No | Agreement Details | The date the agreement expires or is due for renewal. Optional — some agreements (e.g., MOUs) may not have a formal expiration. Used in the CBM internal portfolio dashboard to surface agreements expir... | — |
| — Agreement Document — |  |  |  |  |  |  |
| Agreement Document URL | `cAgreementDocumentUrl` | URL | No | Agreement Document | URL to the signed agreement document stored in Google Drive or another document management system. Used as an alternative to a native EspoCRM file attachment when direct file upload is not available o... | — |
| — Notes — |  |  |  |  |  |  |
| Notes | `cNotes` | Rich Text | No | Notes | Any relevant notes about the agreement — context for the agreement's creation, key provisions or commitments referenced in the document, renewal history, or any exceptions to standard terms. Admin and... | — |

## Client-Partner Association (ClientPartnerAssociation)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Association Type | `cAssociationType` | Enum | No | Association Details | How the client is connected to the Partner organization. Referred By: the Partner referred this client to CBM. Serves Same Population: the Partner serves the same community segment as this client, eve... | Values: Referred By \| Serves Same Population \| Program Participant \| Other |
| Notes | `cNotes` | Text | No | Association Details | Brief context about why this association exists — e.g., the name of the program the client participates in, how the referral was made, or any other relevant background. Optional. Requirement: CBM-PRD-... | Max length: 500 |

## Partner Activity (PartnerActivity)

| Field Name | Internal Name | Type | Required | Category | Description | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| — Activity Details — |  |  |  |  |  |  |
| Activity Name | `cActivityName` | Text | Yes | Activity Details | Name or title of the activity or event. Required. Should be descriptive enough to distinguish similar activities (e.g., "Q1 2026 Liaison Check-In with SBDC" vs. "Q2 2026 Co-Hosted Workshop — Marketing... | Max length: 255 |
| Activity Type | `cActivityType` | Enum | Yes | Activity Details | Classifies the nature of the activity. CBM-Hosted Event: a CBM event to which the Partner was invited or attended. Co-Hosted Event: jointly organized and/or funded by both CBM and the Partner. Joint W... | Values: CBM-Hosted Event \| Co-Hosted Event \| Joint Workshop / Program \| Co-Developed Content \| Meeting / Coordination Call \| Other |
| Date | `cActivityDate` | Date | Yes | Activity Details | Date the activity occurred or is scheduled to occur. Required. Primary sort field on the Partner Activities list view (descending — most recent first). Used by CBM leadership to identify Partners with... | — |
| — Activity Content — |  |  |  |  |  |  |
| Description | `cDescription` | Rich Text | No | Activity Content | Description of the activity — its purpose, agenda, and any outcomes or decisions. Used by the liaison to document what occurred and to provide context for future reference when reviewing the Partner's... | — |
| Notes | `cActivityNotes` | Rich Text | No | Activity Content | Additional notes or follow-up items arising from the activity. Used for action items, next steps, and any context not captured in the Description field. Requirement: CBM-PRD-CRM-Partners.docx Section ... | — |

# Layouts

## Company (Account)

### Detail View

**Panel 1: Overview (Tab: Overview)**

  Fields: name, accountType, website, phoneNumber, billingAddressCity, billingAddressState

**Panel 2: Client Profile (Tab: Client)**

Client Company fields. Visible when Account Type includes Client Company. MANUAL CONFIG: Configure Dynamic Logic.

  Business Profile: Organization Type, Business Stage, NAICS Sector, NAICS Subsector, Mentoring Focus Areas, Mentoring Needs Description

**Panel 3: Business Detail (Tab: Detail)**

Additional business context. Typically mentor-populated after assignment.

  Operations: Business Description, Time in Operation, Current Team Size, Revenue Range, Funding Situation, Current Challenges, Goals and Objectives, Desired Outcomes (6-12 Months), Previous Mentoring / Advisory Experience, Current Professional Advisors

**Panel 4: Legal & Registration (Tab: Legal)**

Legal entity and registration fields. Registration details shown when Registered with State is checked.

  Fields: registeredWithState, stateOfRegistration, legalBusinessStructure, dateOfFormation, einOnFile, registeredAgent, einNumber

**Panel 5: Certifications (Tab: Certifications)**

Business ownership designations and certifications. Used for grant compliance and program eligibility tracking.

  Classifications: Veteran-Owned Business, Service-Disabled Veteran-Owned (SDVOSB), Woman-Owned Small Business (WOSB), Minority-Owned Business Enterprise (MBE), Disadvantaged Business Enterprise (DBE), SBA Small Business, HUBZone Certified, 8(a) Program Participant, LGBTQ+-Owned Business, Disability-Owned Business Enterprise (DOBE), Native American / Tribal Owned, Certified B Corporation, Union Shop, Family-Owned Business, Franchise, Social Enterprise, Other Certifications / Designations

**Panel 6: Partner Profile (Tab: Partner)**

Partner Organization fields. Visible when Account Type includes Partner. MANUAL CONFIG: Configure Dynamic Logic.

  Partner Details: Organization Type, Partner Type(s), Partner Status, Partnership Start Date, Public Announcement Allowed, Geographic Service Area, Target Population, Social Media, Partner Notes

### List View

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 22% |
| 2 | accountType | 12% |
| 3 | partnerStatus | 10% |
| 4 | businessStage | 12% |
| 5 | billingAddressCity | 14% |
| 6 | website | 18% |
| 7 | phoneNumber | 12% |

## Contact

### Detail View

**Panel 1: Overview (Tab: Overview)**

  Fields: name, contactType, account, title, emailAddress, phoneNumber, cbmGmailAddress, notes

**Panel 2: Mentor (Tab: Mentor) — visible when isMentor = True**

Mentor-specific fields. Visible when Is Mentor, Is Co-Mentor, or Is SME is checked.

  Roles & Status: Is Mentor, Is Co-Mentor, Is Subject Matter Expert, Is Workshop Presenter, Is Mentor Reviewer, Mentor Status, Primary Chapter

  Availability: Accepting New Clients, Maximum Client Capacity, Max Client Requests / Week, Max Active Clients, Pause Assignments Until, Date Paused, Self-Schedule URL, Profile Visible on Website

  Analytics: Last Activity Date, Current Active Clients, Available Capacity, Total Active Engagements, Assigned Engagements (7 Days), Accepted Engagements (7 Days), Total Engagement History, Total Hours Delivered, Average NPS Score, Years of Service, Badge Level, Last Engagement Accepted

**Panel 3: Profile (Tab: Profile)**

Professional profile. Mentor-maintained. Visible to other mentors and on public website when enabled.

  Expertise: LinkedIn, Professional Title, Current Employer, Currently Employed, Years of Business Experience, Professional Bio / Work Experience, NAICS Sectors, Skills & Expertise Tags, Why Interested in Mentoring, Area of Expertise, Industry Experience, Education Details, Interests, Languages Spoken, Twitter / X, YouTube, Instagram

**Panel 4: Client (Tab: Client)**

Client background and skills for mentor matching.

  Background: Business Skills, Technology Skills, Role & Responsibilities

**Panel 5: Compliance (Tab: Compliance) — visible when isMentor = True**

Admin-only compliance and onboarding requirements.

  Requirements: Terms & Conditions Accepted, Terms & Conditions Acceptance Date/Time, Felony Conviction, Background Check Date, Mentoring Information Complete, Background Check Completed, Ethics Class Completed, Ethics Class Completion Date, Intro to Mentoring Completed, Intro to Mentoring Date, CRM Training Complete, Code of Ethics Signed, Code of Ethics Date, Code of Ethics Renewal Date, Mentoring Agreement Signed, Mentoring Agreement Date

**Panel 6: Personal (Tab: Personal)**

Personal information. Less prominent — admin and mentor access only.

  Fields: birthday, spouseName, workStatus, militaryStatus, dateJoined, resignDate, departureDate, departureReason

**Panel 7: Administrative (Tab: Admin)**

Administrative fields. Admin-only.

  Fields: howDidYouHearAboutCbm, duesStatus, duesPaymentDate, statusChangeReason

### List View

| # | Field | Width |
| --- | --- | --- |
| 1 | lastName | 12% |
| 2 | firstName | 12% |
| 3 | account | 18% |
| 4 | title | 13% |
| 5 | contactType | 10% |
| 6 | emailAddress | 18% |
| 7 | phoneNumber | 10% |
| 8 | mentorStatus | 7% |

## Partner Agreement (PartnerAgreement)

### Detail View

**Panel 1: Agreement Details (Tab: Details)**

Core agreement fields. Access restricted to management-level users — liaisons and mentors without management access cannot view or download agreement records.

  Fields: agreementType, creationDate, expirationRenewalDate

**Panel 2: Agreement Document (Tab: Document)**

Link to or attachment of the signed agreement document.

  Document: Agreement Document URL

**Panel 3: Notes (Tab: Notes)**

Admin notes on the agreement context and history.

  Notes: Notes

### List View

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 25% |
| 2 | agreementType | 25% |
| 3 | creationDate | 18% |
| 4 | expirationRenewalDate | 18% |
| 5 | agreementDocumentUrl | 14% |

## Client-Partner Association (ClientPartnerAssociation)

### Detail View

**Panel 1: Association Details (Tab: Details)**

Association classification and context. The Client and Partner links are managed as relationship fields.

  Fields: associationType, notes

### List View

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 30% |
| 2 | associationType | 25% |
| 3 | notes | 45% |

## Partner Activity (PartnerActivity)

### Detail View

**Panel 1: Activity Details (Tab: Details)**

Core activity logistics — what, what type, and when.

  Fields: activityName, activityType, activityDate

**Panel 2: Activity Content (Tab: Content)**

Description of the activity and follow-up notes.

  Content: Description, Notes

### List View

| # | Field | Width |
| --- | --- | --- |
| 1 | activityDate | 12% |
| 2 | activityName | 30% |
| 3 | activityType | 25% |
| 4 | name | 33% |

# Views (List Views)

> ⚠️ **Status: Defined in YAML — Implemented**

## Company (Account)

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 22% |
| 2 | accountType | 12% |
| 3 | partnerStatus | 10% |
| 4 | businessStage | 12% |
| 5 | billingAddressCity | 14% |
| 6 | website | 18% |
| 7 | phoneNumber | 12% |

## Contact

| # | Field | Width |
| --- | --- | --- |
| 1 | lastName | 12% |
| 2 | firstName | 12% |
| 3 | account | 18% |
| 4 | title | 13% |
| 5 | contactType | 10% |
| 6 | emailAddress | 18% |
| 7 | phoneNumber | 10% |
| 8 | mentorStatus | 7% |

## Partner Agreement (PartnerAgreement)

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 25% |
| 2 | agreementType | 25% |
| 3 | creationDate | 18% |
| 4 | expirationRenewalDate | 18% |
| 5 | agreementDocumentUrl | 14% |

## Client-Partner Association (ClientPartnerAssociation)

| # | Field | Width |
| --- | --- | --- |
| 1 | name | 30% |
| 2 | associationType | 25% |
| 3 | notes | 45% |

## Partner Activity (PartnerActivity)

| # | Field | Width |
| --- | --- | --- |
| 1 | activityDate | 12% |
| 2 | activityName | 30% |
| 3 | activityType | 25% |
| 4 | name | 33% |

# Filters (Search Presets)

> ⚠️ **Planned — Not Yet Implemented**

This section will define the named search presets (saved views) configured in EspoCRM for each entity. Search presets allow administrators and mentors to quickly access commonly-used filtered views of CRM data.

Search preset definitions will be added to the YAML program files in a future release of the implementation tool.

# Relationships

> ⚠️ **Planned — Not Yet Implemented**

This section will define the relationships between entities — the links that allow EspoCRM to connect related records across entity types.

Planned relationships include:
  • Account (Company) → Contact (one-to-many)
  • Account (Company) → Engagement (one-to-many)
  • Engagement → Contact / Assigned Mentor (many-to-one)
  • Engagement → Session (one-to-many)
  • Engagement → NPS Survey Response (one-to-many)
  • Workshop → Workshop Attendance (one-to-many)
  • Contact → Workshop Attendance (one-to-many)
  • Contact → Dues (one-to-many)

# Processes (Dynamic Logic & Automation)

> ⚠️ **Partially Defined — Not Yet Implemented by Tool**

This section defines conditional field behavior (Dynamic Logic) and automated field-setting rules (Entity Formula Scripts) configured in EspoCRM.

| Entity | Trigger | Condition | Action |
| --- | --- | --- | --- |
| Contact | Display | Contact Type = Mentor | Show Mentor panels |
| Contact | Display | Contact Type = Client | Show Client Details panel |
| Contact | Display | Mentor Status = Departed | Show Departure Reason, Departure Date |
| Session | Display | Session Type = In-Person | Show Meeting Location Type |
| Session | Display | Meeting Location Type = Other | Show Location Details |
| Account | Display | Registered with State = Yes | Show registration fields |
| Engagement | On Save | Status changed to Assigned AND Mentor Assigned Date is empty | Set Mentor Assigned Date = today |

# Appendix A — Enum Value Reference

## Company (Account)

### NAICS Sector

• Agriculture, Forestry, Fishing and Hunting

• Mining, Quarrying, and Oil and Gas Extraction

• Utilities

• Construction

• Manufacturing

• Wholesale Trade

• Retail Trade

• Transportation and Warehousing

• Information

• Finance and Insurance

• Real Estate and Rental and Leasing

• Professional, Scientific, and Technical Services

• Management of Companies and Enterprises

• Administrative and Support and Waste Management

• Educational Services

• Health Care and Social Assistance

• Arts, Entertainment, and Recreation

• Accommodation and Food Services

• Other Services (except Public Administration)

• Public Administration

### Current Professional Advisors

• Banker / Financial Institution

• Attorney / Legal Counsel

• Accountant / CPA

• IT Consultant

• Insurance Agent

• Marketing / PR Consultant

• Business Coach

### State of Registration

• Alabama

• Alaska

• Arizona

• Arkansas

• California

• Colorado

• Connecticut

• Delaware

• Florida

• Georgia

• Hawaii

• Idaho

• Illinois

• Indiana

• Iowa

• Kansas

• Kentucky

• Louisiana

• Maine

• Maryland

• Massachusetts

• Michigan

• Minnesota

• Mississippi

• Missouri

• Montana

• Nebraska

• Nevada

• New Hampshire

• New Jersey

• New Mexico

• New York

• North Carolina

• North Dakota

• Ohio

• Oklahoma

• Oregon

• Pennsylvania

• Rhode Island

• South Carolina

• South Dakota

• Tennessee

• Texas

• Utah

• Vermont

• Virginia

• Washington

• West Virginia

• Wisconsin

• Wyoming

• Washington D.C.

### Legal Business Structure

• Sole Proprietor

• Partnership

• LLC

• S-Corp

• C-Corp

• Non-Profit 501(c)(3)

• Other

### Organization Type

• Chamber of Commerce

• Small Business Development Center (SBDC)

• Economic Development Agency

• University / Academic Institution

• Bank / Financial Institution

• Nonprofit / Community Organization

• Government Agency

• Corporate Sponsor

• Other

## Contact

### NAICS Sectors

• Agriculture, Forestry, Fishing and Hunting

• Mining, Quarrying, and Oil and Gas Extraction

• Utilities

• Construction

• Manufacturing

• Wholesale Trade

• Retail Trade

• Transportation and Warehousing

• Information

• Finance and Insurance

• Real Estate and Rental and Leasing

• Professional, Scientific, and Technical Services

• Management of Companies and Enterprises

• Administrative and Support and Waste Management

• Educational Services

• Health Care and Social Assistance

• Arts, Entertainment, and Recreation

• Accommodation and Food Services

• Other Services (except Public Administration)

• Public Administration

### Mentor Status

• Submitted

• In-Review

• Provisional

• Active

• Paused

• Inactive

• Resigned

• Departed

• Declined

## Engagement

### Status

• Submitted

• Declined

• Pending Acceptance

• Assigned

• Mentor Declined

• Active

• On-Hold

• Dormant

• Inactive

• Abandoned

• Completed

## Session

### Topics Covered

• Business Planning

• Marketing Strategy

• Financial Review

• Sales & Revenue Growth

• Operations & Processes

• HR & Staffing

• Legal & Compliance

• Technology & Systems

• Funding & Capital

• Customer Discovery

• Product / Service Development

• Partnerships & Networking

• Goal Setting & Accountability

• Crisis & Problem Solving

• Other

## Workshop

### Topic/Category

• Business Planning & Strategy

• Marketing & Sales

• Financial Management & Accounting

• Operations & Process Improvement

• Human Resources & Team Building

• Legal & Compliance

• Technology & Digital Transformation

• Access to Capital & Funding

• E-Commerce & Online Business

• Export & International Trade

• Nonprofit Management

• Social Entrepreneurship

• Real Estate & Property Management

• Retail & Consumer Goods

• Food & Beverage

• Healthcare & Wellness

• Manufacturing & Supply Chain

• Construction & Trades

# Appendix B — Deployment Status

| Entity | Fields | Layout | Relationships | Status |
| --- | --- | --- | --- | --- |
| Company | ✓ Defined (51) | ✓ Defined | Planned | Ready to deploy |
| Contact | ✓ Defined (81) | ✓ Defined | Planned | Ready to deploy |
| Engagement | ✓ Defined (11) | Planned | Planned | Partially defined |
| Session | ✓ Defined (11) | Planned | Planned | Partially defined |
| NPS Survey Response | ✓ Defined (7) | Planned | Planned | Partially defined |
| Workshop | ✓ Defined (8) | Planned | Planned | Partially defined |
| Workshop Attendance | ✓ Defined (2) | Planned | Planned | Partially defined |
| Dues | ✓ Defined (6) | Planned | Planned | Partially defined |
| Partner Agreement | ✓ Defined (5) | ✓ Defined | Planned | Ready to deploy |
| Client-Partner Association | ✓ Defined (2) | ✓ Defined | Planned | Ready to deploy |
| Partner Activity | ✓ Defined (5) | ✓ Defined | Planned | Ready to deploy |
