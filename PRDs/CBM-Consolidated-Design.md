# Cleveland Business Mentors
# Consolidated Design

**Version:** 2.0 **Status:** Complete — All Four Domains Defined
**Last Updated:** 03-29-26 21:45

---

## Important Notes

This document is maintained by the implementation team. It is not a stakeholder document. Do not distribute to stakeholders — they receive the Master PRD and Domain PRDs.

This document is the single authoritative source for YAML generation. Every entity and field definition here must trace back to a Domain PRD. Nothing is added to this document that is not required by at least one Domain PRD.

Conflicts between domains are resolved here and recorded in the Conflict Notes column. All conflict resolutions must be approved before the affected YAML is generated.

---

## 1. Entity Index

| ID | Entity | Type | Domains | Status |
|---|---|---|---|---|
| CD-ENT-001 | Organization | Native (Account) | MN, MR, CR, FU | Defined — All domains complete. Conflicts resolved. |
| CD-ENT-002 | Contact | Native (Contact) | MN, MR, CR, FU | Defined — All domains complete. Conflicts resolved. |
| CD-ENT-003 | Engagement | Custom (Base) | MN | Defined — MN complete |
| CD-ENT-004 | Session | Custom (Base) | MN | Defined — MN complete |
| CD-ENT-005 | Survey Response | Custom (Base) | MN | Defined — MN complete |
| CD-ENT-006 | Dues | Custom (Base) | MR | Defined — MR complete |
| CD-ENT-007 | SME Request | Custom (Base) | MN, MR | Defined — MR complete |
| CD-ENT-008 | Partner Agreement | Custom (Base) | CR | Defined — CR complete |
| CD-ENT-009 | Client-Partner Association | Custom (Base) | CR | Defined — CR complete |
| CD-ENT-010 | Workshop | Custom (Event) | MN, CR | Defined — CR complete |
| CD-ENT-011 | Workshop Registration | Custom (Base) | CR | Defined — CR complete |
| CD-ENT-012 | Partner Activity | Custom (Base) | CR | Defined — CR complete |
| CD-ENT-013 | Donation | Custom (Base) | FU | Defined — FU complete |
| CD-ENT-014 | Pledge | Custom (Base) | FU | Defined — FU complete |
| CD-ENT-015 | Grant | Custom (Base) | FU | Defined — FU complete |
| CD-ENT-016 | Fundraising Campaign | Custom (Base) | FU | Defined — FU complete |

**Entity Type Key:**
- **Native (Account)** — extends the CRM platform's built-in Account entity. Native fields already exist; only custom fields require deployment.
- **Native (Contact)** — extends the CRM platform's built-in Contact entity. Native fields already exist; only custom fields require deployment.
- **Custom (Base)** — a new custom entity created from scratch. All fields require deployment.

---

## 2. Entity Definitions

---

### CD-ENT-001 — Organization

**Entity Type:** Native (Account) — extends the built-in Account entity **Display Name (singular):** Organization **Display Name (plural):** Organizations **Source Domain:** MN (Mentoring), MR (Mentor Recruitment), CR (Client Recruiting) **Description:** All organizations in the CBM system — client businesses, partner organizations, and any organization that may be both simultaneously. The anchor record for contacts, engagements, partner relationships, and related activity. Records are retained permanently.

**Conflict Resolution — MN vs CR:** The Mentoring domain defines the Organization entity as a Client Organization. The Client Recruiting domain extends it to also represent Partner Organizations. Resolution: a single Organization entity carries all fields for both use cases. An Organization Type field (multi-select: Client Organization, Partner Organization) drives conditional visibility of client-specific and partner-specific field panels. An organization can be both types simultaneously. No field naming conflicts exist between the two domains. Resolution approved March 2026.

#### Fields

Fields marked **[NATIVE]** already exist on the built-in Account entity and do not require deployment. Fields marked **[CUSTOM]** are additions that must be deployed.

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

**Organization Type (Account Type)** | `cOrganizationAccountType` | multiEnum | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Values: Client Organization, Partner Organization, Funder Organization
>
> Classifies the record and drives conditional visibility of domain-
> specific field panels. An organization may hold multiple values
> simultaneously — e.g. a funder that is also a partner.

**Partner Organization Type** | `cPartnerOrgType` | enum | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Values: Chamber of Commerce, Small Business Development Center (SBDC),
> Economic Development Agency, University / Academic Institution,
> Bank / Financial Institution, Nonprofit / Community Organization,
> Government Agency, Corporate Sponsor, Other
>
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Partner Type** | `cPartnerType` | multiEnum | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Values: Referral Partner, Co-Delivery Partner,
> Funding / Sponsorship Partner, Resource Partner
>
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Partner Status** | `cPartnerStatus` | enum | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Values: Prospect, Active, Lapsed, Inactive
>
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Partnership Start Date** | `cPartnershipStartDate` | date | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Required when Partner Status = Active.
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Assigned Liaison** | `cAssignedLiaisonId` | belongsTo | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Link to the CBM member Contact record responsible for this
> partnership. Required for Active partners.
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Public Announcement Allowed** | `cPublicAnnouncementAllowed` | bool | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Default: No.
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Geographic Service Area** | `cGeographicServiceArea` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Conditional visibility: shown when Organization Type includes
> Partner Organization.
> See Open Issue CR-ISS-002 for format decision (free text vs list).

**Target Population** | `cTargetPopulation` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Conditional visibility: shown when Organization Type includes
> Partner Organization.
> See Open Issue CR-ISS-003 for format decision.

**Parent Organization** | `cParentOrganizationId` | belongsTo | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Link to another Organization record that is the parent. Used for
> branches, chapters, or subsidiaries.
> Conditional visibility: shown when Organization Type includes
> Partner Organization.

**Social Media** | `cSocialMedia` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-004
>
> Links to LinkedIn, Facebook, or other relevant social profiles.

**Funder Type** | `cFunderType` | enum | Optional | **[CUSTOM]**
> Source: FU-PROSPECT-DAT-002
>
> Values: Corporation, Foundation, Government Agency,
> Community Foundation, Individual (Organization), Other
>
> Conditional visibility: shown when Organization Type includes
> Funder Organization.

**Funder Status** | `cFunderStatus` | enum | Optional | **[CUSTOM]**
> Source: FU-PROSPECT-DAT-002
>
> Values: Prospect, Contacted, In Discussion, Committed, Active,
> Lapsed, Closed
>
> Conditional visibility: shown when Organization Type includes
> Funder Organization.

**Primary Funder Contact** | `cPrimaryFunderContactId` | belongsTo | Optional | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Link to the primary Contact at this funder for grant and donation
> communications. Conditional visibility: Funder Organization only.

**Funder Lifetime Giving** | `cFunderLifetimeGiving` | currency | System-calculated | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Read-only. Total of all linked Donation and Grant Award records.

**Funder Notes** | `cFunderNotes` | text | Optional | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Conditional visibility: Funder Organization only. Admin-only.

---

### CD-ENT-002 — Contact

**Entity Type:** Native (Contact) — extends the built-in Contact entity **Display Name (singular):** Contact **Display Name (plural):** Contacts **Source Domain:** MN (Mentoring), MR (Mentor Recruitment), CR (Client Recruiting — pending) **Description:** An individual person associated with a client organization or serving as a volunteer mentor. The Contact entity is shared across multiple domains. A Contact Type field distinguishes Client Contacts from Mentor Contacts. All identity fields are shared; role-specific fields are conditionally displayed based on Contact Type.

**Conflict Resolution — MN vs MR:** Both the Mentoring domain and the Mentor Recruitment domain use the Contact entity. MN requires Client Contact fields (Primary Contact, Role at Business, Zip Code). MR requires Mentor Contact fields (Mentor Status, expertise, capacity, onboarding fields, etc.). Resolution: both sets of fields are defined on the single Contact entity. A Contact Type field (Mentor / Client) drives conditional panel visibility so each contact type sees only their relevant fields. No field naming conflicts exist between the two domains. Resolution approved March 2026.

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
> Conditional visibility: shown only when Contact Type = Client.

**Contact Type** | `cContactType` | enum | Required | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: Mentor, Client
>
> Distinguishes mentor contacts from client contacts. Set automatically
> on record creation. Drives conditional visibility of mentor-specific
> and client-specific field panels throughout the system.

**Personal Email** | `cPersonalEmail` | email | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> The mentor's personal email address — not their CBM organizational
> email. Used for onboarding communications and as a permanent address.

**CBM Email Address** | `cCbmEmailAddress` | email | Optional | **[CUSTOM]** | Admin-populated
> Source: MR-ONBOARD-DAT-005
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> The mentor's assigned CBM organizational email address.

**LinkedIn Profile URL** | `cLinkedInUrl` | url | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Professional Title** | `cProfessionalTitle` | varchar | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> The mentor's current job title or professional role.

**Current Employer** | `cCurrentEmployer` | varchar | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Currently Employed** | `cCurrentlyEmployed` | bool | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> Whether the mentor was employed at the time of application.

**Years of Business Experience** | `cYearsOfExperience` | int | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Professional Bio / Work Experience** | `cProfessionalBio` | text | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> Used for mentor profiles and matching.

**Industry Sectors** | `cIndustrySectors` | multiEnum | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: Same 20 top-level NAICS sectors as Industry Sector on
> Client Organization. Must use identical values to enable matching.
>
> Conditional visibility: shown when Contact Type = Mentor.

**Mentoring Focus Areas** | `cMentoringFocusAreasMentor` | multiEnum | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: Same values as Mentoring Focus Areas on Client Organization
> — see Open Issue MN-ISS-001.
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> Must use identical values to Client Organization field to enable
> matching.

**Skills and Expertise Tags** | `cSkillsTags` | multiEnum | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: To be defined — see Open Issue MR-ISS-001.
>
> Conditional visibility: shown when Contact Type = Mentor.

**Fluent Languages** | `cFluentLanguages` | multiEnum | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: To be defined — see Open Issue MR-ISS-002.
>
> Conditional visibility: shown when Contact Type = Mentor.

**Why Interested in Mentoring** | `cWhyInterestedInMentoring` | text | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**How Did You Hear About CBM** | `cHowHeardAboutCbm` | enum | Optional | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: To be defined — see Open Issue MR-ISS-003.
>
> Conditional visibility: shown when Contact Type = Mentor.

**Is Primary Mentor** | `cIsPrimaryMentor` | bool | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Is Co-Mentor** | `cIsCoMentor` | bool | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Is Subject Matter Expert** | `cIsSubjectMatterExpert` | bool | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Conditional visibility: shown when Contact Type = Mentor.

**Mentor Status** | `cMentorStatus` | enum | Required for Mentors | **[CUSTOM]**
> Source: MR-APPLY-DAT-002
>
> Values: Submitted, In Review, Provisional, Active, Paused, Inactive,
> Resigned, Departed, Declined
>
> Conditional visibility: shown when Contact Type = Mentor.

**Accepting New Clients** | `cAcceptingNewClients` | bool | Required for Mentors | **[CUSTOM]**
> Source: MR-ONBOARD-DAT-006
>
> Conditional visibility: shown when Contact Type = Mentor.
> Mentor-editable.

**Maximum Client Capacity** | `cMaxClientCapacity` | int | Required for Mentors | **[CUSTOM]**
> Source: MR-ONBOARD-DAT-006
>
> Conditional visibility: shown when Contact Type = Mentor.
> Mentor-editable.

**Current Active Clients** | `cCurrentActiveClients` | int | System-calculated | **[CUSTOM]**
> Source: MR-MANAGE-DAT-001
>
> Read-only. Count of Engagements where this mentor is Assigned Mentor
> and Status is Active or Assigned.

**Available Capacity** | `cAvailableCapacity` | int | System-calculated | **[CUSTOM]**
> Source: MR-MANAGE-DAT-001
>
> Read-only. Maximum Client Capacity minus Current Active Clients.

**Board Position** | `cBoardPosition` | varchar | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-003
>
> Conditional visibility: shown when Contact Type = Mentor.
>
> Board title if the mentor serves on the CBM board.

**Ethics Agreement Accepted** | `cEthicsAgreementAccepted` | bool | Optional | **[CUSTOM]** | Admin-only
> Source: MR-ONBOARD-DAT-003
>
> Conditional visibility: Admin only.

**Ethics Agreement Acceptance Date/Time** | `cEthicsAgreementDate` | datetime | Optional | **[CUSTOM]** | Admin-only
> Source: MR-ONBOARD-DAT-003
>
> Conditional visibility: Admin only.

**Background Check Completed** | `cBackgroundCheckCompleted` | bool | Optional | **[CUSTOM]** | Admin-only | Hidden from mentor
> Source: MR-ONBOARD-DAT-004
>
> Hidden from mentor. Admin only.

**Background Check Date** | `cBackgroundCheckDate` | date | Optional | **[CUSTOM]** | Admin-only | Hidden from mentor
> Source: MR-ONBOARD-DAT-004
>
> Hidden from mentor. Admin only.

**Terms and Conditions Accepted** | `cTermsAccepted` | bool | System-populated | **[CUSTOM]** | Admin-only
> Source: MR-APPLY-DAT-002
>
> System-populated from application form. Read-only.

**Terms and Conditions Acceptance Date/Time** | `cTermsAcceptedDate` | datetime | System-populated | **[CUSTOM]** | Admin-only
> Source: MR-APPLY-DAT-002
>
> System-populated timestamp. Read-only.

**Felony Conviction Disclosure** | `cFelonyDisclosure` | bool | System-populated | **[CUSTOM]** | Admin-only | Hidden from mentor
> Source: MR-APPLY-DAT-002
>
> System-populated from application form. Hidden from mentor.

**Training Completed** | `cTrainingCompleted` | bool | System-populated | **[CUSTOM]**
> Source: MR-ONBOARD-DAT-002
>
> System-populated via LMS integration. Read-only. Mentor can view.

**Training Completion Date** | `cTrainingCompletionDate` | date | System-populated | **[CUSTOM]**
> Source: MR-ONBOARD-DAT-002
>
> System-populated via LMS integration. Read-only.

**Dues Status** | `cDuesStatus` | enum | Optional | **[CUSTOM]** | Admin-only
> Source: MR-MANAGE-DAT-005
>
> Values: Unpaid, Paid, Waived
>
> Conditional visibility: Admin only. Summary dues standing.

**Dues Payment Date** | `cDuesPaymentDate` | date | Optional | **[CUSTOM]** | Admin-only
> Source: MR-MANAGE-DAT-005
>
> Conditional visibility: Admin only.

**Departure Reason** | `cDepartureReason` | enum | Optional | **[CUSTOM]** | Admin-only
> Source: MR-DEPART-DAT-002
>
> Values: Relocated, Career Change, Time Constraints, Personal, Other
>
> Conditional visibility: shown only when Mentor Status = Departed.

**Departure Date** | `cDepartureDate` | date | Optional | **[CUSTOM]** | Admin-only
> Source: MR-DEPART-DAT-003
>
> Conditional visibility: shown only when Mentor Status = Departed.

**Preferred Name** | `cPreferredName` | varchar | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> Already defined for Client Contact (MN) and Mentor Contact (MR).
> No conflict — same field serves all contact types.

**Birthdate** | `cBirthdate` | date | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> The contact's date of birth. Used for relationship-building
> outreach with partner contacts.

**Partner Organization** | `cPartnerOrganizationId` | belongsTo | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> Link to the Partner Organization record this contact is associated
> with. Populated for Partner Contacts.

**Title / Role at Partner** | `cTitleAtPartner` | varchar | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> The contact's title or role at the partner organization.
> Distinct from Role at Business (cRoleAtBusiness) used for
> Client Contacts.

**Primary Contact For** | `cPrimaryContactFor` | multiEnum | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> Values: Referrals, Events, Billing, General
>
> Designates functions for which this contact is the primary
> point of contact at the partner organization.

**Is CBM Mentor** | `cIsCbmMentor` | bool | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-005
>
> Default: No. When Yes, this contact record serves dual roles —
> Partner Contact and Mentor Contact. No duplicate record is created.

**Is Donor** | `cIsDonor` | bool | Optional | **[CUSTOM]**
> Source: FU-PROSPECT-DAT-002
>
> Default: No. Flags this contact as an individual donor. Drives
> conditional visibility of donor-specific fields.

**Donor Status** | `cDonorStatus` | enum | Optional | **[CUSTOM]**
> Source: FU-PROSPECT-DAT-002
>
> Values: Prospect, Contacted, In Discussion, Committed, Active,
> Lapsed, Closed
>
> Conditional visibility: shown when Is Donor = Yes.

**Is Board Member** | `cIsBoardMember` | bool | Optional | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Default: No. Flags this contact as a current CBM board member.
> Used to track board member giving separately.

**Is Mentor Donor** | `cIsMentorDonor` | bool | Optional | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Default: No. Flags a mentor who has also made a donation. Used
> to track mentor giving separately for stewardship reporting.

**Lifetime Giving** | `cLifetimeGiving` | currency | System-calculated | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Read-only. Total of all linked Donation records.

**Last Gift Date** | `cLastGiftDate` | date | System-calculated | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Read-only. Date of most recent linked Donation. Used for lapse
> monitoring.

**Last Gift Amount** | `cLastGiftAmount` | currency | System-calculated | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Read-only. Amount of most recent linked Donation.

**Donor Notes** | `cDonorNotes` | text | Optional | **[CUSTOM]**
> Source: FU-STEWARD-DAT-004
>
> Conditional visibility: shown when Is Donor = Yes. Admin-only.

---

### CD-ENT-003 — Engagement

**Entity Type:** Custom (Base) **Display Name (singular):** Engagement **Display Name (plural):** Engagements **Source Domain:** MN (Mentoring) **Description:** The active mentoring relationship between CBM and a client organization. Tracks lifecycle, mentor assignments, session activity, and satisfaction survey history. Records are retained permanently and never deleted or reopened after closure.

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

**Entity Type:** Custom (Base) **Display Name (singular):** Session **Display Name (plural):** Sessions **Source Domain:** MN (Mentoring) **Description:** Records each individual meeting between a mentor and client. Linked to an Engagement. Drives roll-up analytics, satisfaction survey triggers, and inactivity monitoring. At least one mentor attendee required before record can be saved.

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

**Entity Type:** Custom (Base) **Display Name (singular):** Survey Response **Display Name (plural):** Survey Responses **Source Domain:** MN (Mentoring) **Description:** Captures client satisfaction feedback at defined points in the engagement lifecycle. Triggered automatically after the 2nd session, every 5 sessions thereafter, and at engagement close. Delivered via integrated survey tool. Responses stored in the CRM linked to both the Engagement and triggering Session.

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

### CD-ENT-008 — Partner Agreement

**Entity Type:** Custom (Base) **Display Name (singular):** Partner Agreement **Display Name (plural):** Partner Agreements **Source Domain:** CR (Client Recruiting) **Description:** Records a formal written agreement between CBM and a partner organization. A partner may have more than one agreement on file. Agreement documents restricted to Partner Coordinator and Executive Member access.

#### Fields

---

**Partner Organization** | `partnerOrgId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-PARTNER-DAT-006

**Agreement Type** | `cAgreementType` | enum | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-006
>
> Values: Memorandum of Understanding (MOU), Partnership Agreement,
> Letter of Intent, Other

**Creation Date** | `cCreationDate` | date | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-006

**Expiration / Renewal Date** | `cExpirationDate` | date | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-006

**Agreement Document** | `cAgreementDocument` | file | Required | **[CUSTOM]** | Restricted
> Source: CR-PARTNER-DAT-006
>
> Restricted to Partner Coordinator and Executive Member access.

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-006

---

### CD-ENT-009 — Client-Partner Association

**Entity Type:** Custom (Base) **Display Name (singular):** Client-Partner Association **Display Name (plural):** Client-Partner Associations **Source Domain:** CR (Client Recruiting) **Description:** Links a Client Organization to a Partner Organization. Foundation for all partner analytics. A client may be associated with multiple partners simultaneously. Associations persist indefinitely.

#### Fields

---

**Client Organization** | `clientOrgId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-PARTNER-DAT-007

**Partner Organization** | `partnerOrgId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-PARTNER-DAT-007

**Association Type** | `cAssociationType` | enum | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-007
>
> Values: Referred By, Serves Same Population, Program Participant,
> Other

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-007

---

### CD-ENT-010 — Workshop

**Entity Type:** Custom (Event) **Display Name (singular):** Workshop **Display Name (plural):** Workshops **Source Domain:** MN (Mentoring), CR (Client Recruiting) **Description:** A structured event — clinic, workshop, office hours, or other programming — offered by CBM. Serves both as a client recruiting mechanism and as ongoing engagement for existing clients. May be virtual or in-person. May be co-sponsored by partner organizations.

#### Fields

---

**Title** | `cTitle` | varchar | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002

**Date/Time** | `cDateTime` | datetime | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002

**Format** | `cFormat` | enum | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002
>
> Values: Virtual, In-Person, Hybrid

**Topic / Category** | `cTopicCategory` | enum | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002
>
> Values: To be defined by CBM leadership — see Open Issue CR-ISS-001

**Presenter** | `cPresenterId` | belongsTo | Optional | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002
>
> Link to presenter Contact record where presenter is in the CRM.

**Presenter Name (External)** | `cPresenterNameExternal` | varchar | Optional | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002
>
> Free-text for presenters not in the CRM.

**Description** | `cDescription` | text | Optional | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002

**Maximum Capacity** | `cMaxCapacity` | int | Optional | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002

**Status** | `cStatus` | enum | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-002
>
> Values: Scheduled, In Progress, Completed, Cancelled

**Co-Sponsoring Partners** | `cCoSponsoringPartners` | hasMany | Optional | **[CUSTOM relationship]**
> Source: CR-EVENTS-DAT-002
>
> Many-to-many relationship to Partner Organization records.

---

### CD-ENT-011 — Workshop Registration

**Entity Type:** Custom (Base) **Display Name (singular):** Workshop Registration **Display Name (plural):** Workshop Registrations **Source Domain:** CR (Client Recruiting) **Description:** Links a Contact to a Workshop they registered for or attended. Tracks registration and attendance status per participant. Creates new Contact records for registrants not already in the CRM.

#### Fields

---

**Workshop** | `workshopId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-EVENTS-DAT-003

**Contact** | `contactId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-EVENTS-DAT-003
>
> A new Contact record is created if the registrant is not in the CRM.

**Registration Date** | `cRegistrationDate` | datetime | System-populated | **[CUSTOM]**
> Source: CR-EVENTS-DAT-003

**Attendance Status** | `cAttendanceStatus` | enum | Required | **[CUSTOM]**
> Source: CR-EVENTS-DAT-004
>
> Values: Registered, Attended, No-Show, Cancelled
>
> Default: Registered on creation.

**Source** | `cSource` | enum | Optional | **[CUSTOM]**
> Source: CR-EVENTS-DAT-003
>
> Values: Website Form, Manual Entry, Partner Referral, Other

---

### CD-ENT-012 — Partner Activity

**Entity Type:** Custom (Base) **Display Name (singular):** Partner Activity **Display Name (plural):** Partner Activities **Source Domain:** CR (Client Recruiting) **Description:** Records a joint event, collaborative program, co-developed content, or relationship management activity involving a partner organization.

#### Fields

---

**Activity Name** | `cActivityName` | varchar | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-008

**Activity Type** | `cActivityType` | enum | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-008
>
> Values: CBM-Hosted Event, Co-Hosted Event, Joint Workshop / Program,
> Co-Developed Content, Meeting / Coordination Call, Other

**Partner Organization** | `partnerOrgId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: CR-PARTNER-DAT-008

**Date** | `cDate` | date | Required | **[CUSTOM]**
> Source: CR-PARTNER-DAT-008

**Description** | `cDescription` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-008

**Attendees** | `cAttendees` | hasMany | Optional | **[CUSTOM relationship]**
> Source: CR-PARTNER-DAT-008
>
> Many-to-many relationship to Contact records.

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: CR-PARTNER-DAT-008

---

### CD-ENT-006 — Dues

**Entity Type:** Custom (Base) **Display Name (singular):** Dues **Display Name (plural):** Dues **Source Domain:** MR (Mentor Recruitment) **Description:** One annual dues record per mentor per billing year. Provides complete payment history independent of the Dues Status summary field on the mentor Contact record.

#### Fields

---

**Mentor Contact** | `contactId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: MR-MANAGE-DAT-004
>
> Link to the mentor Contact record this dues record belongs to.

**Billing Year** | `cBillingYear` | int | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004
>
> The calendar year this dues record applies to.

**Amount** | `cAmount` | currency | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004
>
> The dues amount invoiced for this billing year.

**Due Date** | `cDueDate` | date | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004

**Payment Status** | `cPaymentStatus` | enum | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004
>
> Values: Unpaid, Paid, Waived

**Payment Date** | `cPaymentDate` | date | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004
>
> Not applicable when Payment Status = Waived.

**Payment Method** | `cPaymentMethod` | enum | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004
>
> Values: Online Payment, Check, Waived

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-004

---

### CD-ENT-007 — SME Request

**Entity Type:** Custom (Base) **Display Name (singular):** SME Request **Display Name (plural):** SME Requests **Source Domain:** MN (Mentoring), MR (Mentor Recruitment) **Description:** Tracks a request by a Primary Mentor for subject matter expert involvement in an active engagement.

#### Fields

---

**Engagement** | `engagementId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: MR-MANAGE-DAT-002

**Requesting Mentor** | `cRequestingMentorId` | belongsTo | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

**Expertise Needed** | `cExpertiseNeeded` | text | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

**Status** | `cStatus` | enum | Required | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002
>
> Values: Requested, SME Identified, Pending Acceptance, Active,
> Completed, Declined

**Assigned SME** | `cAssignedSmeId` | belongsTo | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

**Request Date** | `cRequestDate` | date | System-populated | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

**Completion Date** | `cCompletionDate` | date | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: MR-MANAGE-DAT-002

---

### CD-ENT-013 — Donation

**Entity Type:** Custom (Base) **Display Name (singular):** Donation **Display Name (plural):** Donations **Source Domain:** FU (Fundraising) **Description:** Records a single completed gift from an individual or organization. Multiple donations from the same donor are tracked as separate records providing a complete giving history.

#### Fields

---

**Donor Contact** | `cDonorContactId` | belongsTo | Conditional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-002
>
> Required when donation is from an individual.

**Donor Organization** | `cDonorOrganizationId` | belongsTo | Conditional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-002
>
> Required when donation is from an organization.

**Amount** | `cAmount` | currency | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Gift Date** | `cGiftDate` | date | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Gift Type** | `cGiftType` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Values: Cash, Check, Online Payment, Credit Card, In-Kind, Other

**Designation** | `cDesignation` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Campaign** | `cCampaignId` | belongsTo | Optional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-002

**Pledge** | `cPledgeId` | belongsTo | Optional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-002
>
> Link to the Pledge record this donation fulfills, if applicable.

**Acknowledgment Sent** | `cAcknowledgmentSent` | bool | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Default: No.

**Acknowledgment Date** | `cAcknowledgmentDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Tax Receipt Required** | `cTaxReceiptRequired` | bool | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Default: Yes.

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

---

### CD-ENT-014 — Pledge

**Entity Type:** Custom (Base) **Display Name (singular):** Pledge **Display Name (plural):** Pledges **Source Domain:** FU (Fundraising) **Description:** Records a donor's commitment to give a specified amount over time. Individual payments are recorded as linked Donation records.

#### Fields

---

**Donor Contact** | `cDonorContactId` | belongsTo | Conditional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-003

**Donor Organization** | `cDonorOrganizationId` | belongsTo | Conditional | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-003

**Total Pledge Amount** | `cTotalPledgeAmount` | currency | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-003

**Pledge Date** | `cPledgeDate` | date | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-003

**Payment Schedule** | `cPaymentSchedule` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-003
>
> Values: One-Time, Monthly, Quarterly, Annual, Custom

**Start Date** | `cStartDate` | date | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-003

**End Date** | `cEndDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-003

**Fulfillment Status** | `cFulfillmentStatus` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-003
>
> Values: Active, Fulfilled, Lapsed, Cancelled

**Amount Fulfilled** | `cAmountFulfilled` | currency | System-calculated | **[CUSTOM]**
> Source: FU-RECORD-DAT-003
>
> Read-only. Total of all linked Donation records.

**Amount Remaining** | `cAmountRemaining` | currency | System-calculated | **[CUSTOM]**
> Source: FU-RECORD-DAT-003
>
> Read-only. Total Pledge Amount minus Amount Fulfilled.

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-003

---

### CD-ENT-015 — Grant

**Entity Type:** Custom (Base) **Display Name (singular):** Grant **Display Name (plural):** Grants **Source Domain:** FU (Fundraising) **Description:** Records a funding opportunity from a grant-making institution. Tracks the full lifecycle from application through award, reporting, and closure. Automated alerts notify the Coordinator before reporting deadlines.

#### Fields

---

**Funding Institution** | `cFundingInstitutionId` | belongsTo | Required | **[CUSTOM relationship]**
> Source: FU-RECORD-DAT-004

**Grant Name** | `cGrantName` | varchar | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Amount Requested** | `cAmountRequested` | currency | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Amount Awarded** | `cAmountAwarded` | currency | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004
>
> Populated when Status = Awarded.

**Status** | `cStatus` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-004
>
> Values: Prospect, Applied, Awarded, Reporting Due, Closed

**Application Deadline** | `cApplicationDeadline` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Submission Date** | `cSubmissionDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Award Date** | `cAwardDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Grant Period Start** | `cGrantPeriodStart` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Grant Period End** | `cGrantPeriodEnd` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Reporting Deadline** | `cReportingDeadline` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004
>
> System triggers alert to Coordinator before this date.

**Report Submitted** | `cReportSubmitted` | bool | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Report Submission Date** | `cReportSubmissionDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Renewal Date** | `cRenewalDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Purpose / Designation** | `cPurpose` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

**Notes** | `cNotes` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-004

---

### CD-ENT-016 — Fundraising Campaign

**Entity Type:** Custom (Base) **Display Name (singular):** Fundraising Campaign **Display Name (plural):** Fundraising Campaigns **Source Domain:** FU (Fundraising) **Description:** Groups related donations under a named fundraising effort. Tracks progress toward a goal and enables analysis of giving by campaign.

#### Fields

---

**Campaign Name** | `cCampaignName` | varchar | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Campaign Type** | `cCampaignType` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Values: Annual Fund, Program Appeal, Event, Grant-Funded,
> Corporate Sponsorship, Other

**Goal Amount** | `cGoalAmount` | currency | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Start Date** | `cStartDate` | date | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**End Date** | `cEndDate` | date | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

**Status** | `cStatus` | enum | Required | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Values: Planned, Active, Completed, Cancelled

**Total Raised** | `cTotalRaised` | currency | System-calculated | **[CUSTOM]**
> Source: FU-RECORD-DAT-002
>
> Read-only. Total of all linked Donation records.

**Description** | `cDescription` | text | Optional | **[CUSTOM]**
> Source: FU-RECORD-DAT-002

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
| CD-REL-011 | Contact (Mentor) | Dues | One-to-Many | MR-MANAGE |
| CD-REL-012 | Engagement | SME Request | One-to-Many | MR-MANAGE |
| CD-REL-013 | SME Request | Contact (Assigned SME) | Many-to-One | MR-MANAGE |
| CD-REL-014 | Organization (Partner) | Partner Agreement | One-to-Many | CR-PARTNER |
| CD-REL-015 | Organization (Client) | Client-Partner Association | One-to-Many | CR-PARTNER |
| CD-REL-016 | Organization (Partner) | Client-Partner Association | One-to-Many | CR-PARTNER |
| CD-REL-017 | Organization (Partner) | Partner Activity | One-to-Many | CR-PARTNER |
| CD-REL-018 | Workshop | Workshop Registration | One-to-Many | CR-EVENTS |
| CD-REL-019 | Contact | Workshop Registration | One-to-Many | CR-EVENTS |
| CD-REL-020 | Workshop | Organization (Partner Co-Sponsor) | Many-to-Many | CR-EVENTS |
| CD-REL-021 | Contact (Partner) | Organization (Partner) | Many-to-One | CR-PARTNER |
| CD-REL-022 | Partner Activity | Contact (Attendees) | Many-to-Many | CR-PARTNER |
| CD-REL-023 | Contact (Donor) | Donation | One-to-Many | FU-RECORD |
| CD-REL-024 | Organization (Funder) | Donation | One-to-Many | FU-RECORD |
| CD-REL-025 | Organization (Funder) | Grant | One-to-Many | FU-RECORD |
| CD-REL-026 | Contact (Donor) | Pledge | One-to-Many | FU-RECORD |
| CD-REL-027 | Organization (Funder) | Pledge | One-to-Many | FU-RECORD |
| CD-REL-028 | Pledge | Donation | One-to-Many | FU-RECORD |
| CD-REL-029 | Fundraising Campaign | Donation | One-to-Many | FU-RECORD |

---

## 4. Change History

| Change | Proposal | Date | Status |
|---|---|---|---|
| Initial Consolidated Design created from Mentoring Domain PRD v1.0 | N/A — initial creation | March 2026 | Applied |
| Updated with Mentor Recruitment Domain PRD v1.0 — added mentor-specific Contact fields, Dues and SME Request entities, resolved MN/MR Contact conflict | N/A — domain processing | March 2026 | Applied |
| Updated with Client Recruiting Domain PRD v1.0 — renamed Organization entity, resolved MN/CR Organization conflict, added partner fields to Organization and Contact, added 5 new entities (CD-ENT-008 through 012), added 9 new relationships | N/A — domain processing | March 2026 | Applied |
| Updated with Fundraising Domain PRD v1.0 — added funder fields to Organization and Contact, added 4 new entities (CD-ENT-013 through 016), added 7 new relationships. All four domains complete. | N/A — domain processing | March 2026 | Applied |

---

## Appendix A — Enum Values Pending Definition

The following enum fields have values that must be defined by CBM leadership before YAML can be generated for the affected entities. These are tracked as Open Issues in the Mentoring Domain PRD.

| Field | Entity | Issue ID |
|---|---|---|
| Mentoring Focus Areas | Client Organization | MN-ISS-001 |
| Revenue Range | Client Organization | MN-ISS-003 |
| Topics Covered | Session | MN-ISS-002 |
| Skills and Expertise Tags | Contact (Mentor) | MR-ISS-001 |
| Fluent Languages | Contact (Mentor) | MR-ISS-002 |
| How Did You Hear About CBM | Contact (Mentor) | MR-ISS-003 |
| Workshop Topic / Category | Workshop | CR-ISS-001 |
| Donor Giving Levels / Tiers | Contact (Donor) | FU-ISS-001 |

Industry Sector and Subsector values are defined by the federal NAICS classification system and do not require CBM input. Full value lists will be included in the YAML program files.
