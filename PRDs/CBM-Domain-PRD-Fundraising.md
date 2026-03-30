# Cleveland Business Mentors
# Domain PRD: Fundraising

**Version:** 1.0 **Status:** Draft **Last Updated:** 03-29-26 21:45 **Domain Code:** FU
**Depends On:** CBM-Master-PRD.md

---

## 1. Domain Overview

The Fundraising domain manages CBM's relationships with the donors, sponsors, and funding institutions that provide operational funding for the organization. It covers the full lifecycle of each funding relationship — from identifying prospective funders through securing commitments, recording contributions, stewarding active relationships, and reporting on program impact.

CBM's Year 1 fundraising profile is intentionally modest — a small number of individual donors, one or two foundation grants, and basic acknowledgment and stewardship. The data model is designed to support this starting point while being extensible as the organization grows its fundraising program.

Funders fall into two broad categories. Individual donors are people who give personal contributions — they may be board members, mentors, community supporters, or event attendees who choose to support CBM financially. Organizational funders are companies, foundations, government agencies, and other institutions that provide grants, sponsorships, or corporate contributions.

The CRM is the single source of truth for all donor and funder relationships. It tracks giving history, communication history, pledge fulfillment, grant deadlines, and reporting obligations in one place so that any authorized staff member can pick up a funder relationship without losing context.

---

## 2. Personas

**MST-PER-010 — Donor / Sponsor Coordinator**
Owns the Fundraising domain end to end. Manages the full funder lifecycle — prospecting, cultivation, solicitation, acknowledgment, stewardship, and reporting. Maintains all donor and funder records, records contributions, tracks grant obligations, and produces fundraising analytics for board and management review.

**MST-PER-002 — Executive Member**
Reviews fundraising dashboards, grant pipeline summaries, and donor analytics for board-level oversight. Has full read visibility into all fundraising records but does not manage day-to-day donor relationships.

---

## 3. Business Processes

### FU-PROSPECT — Donor and Sponsor Prospecting

**Process Purpose and Trigger**
The Prospecting process identifies and cultivates relationships with potential donors, sponsors, and funding institutions before a formal solicitation is made. It is triggered when CBM identifies a prospective funder — whether an individual, a corporation, or a grant-making foundation — worth pursuing.

**Personas Involved**
- MST-PER-010 Donor / Sponsor Coordinator — manages the pipeline
- MST-PER-002 Executive Member — may identify prospects through board and community networks

**Process Workflow**

1. The Donor / Sponsor Coordinator identifies a prospective funder and creates a Donor / Funder record with status Prospect.
2. The Coordinator records initial research — giving capacity, areas of interest, connection to CBM's mission, and any existing relationship with CBM board members or mentors.
3. Outreach and cultivation activities are logged against the record — emails, calls, meetings, and event invitations.
4. As the relationship progresses, the status is updated through the prospect lifecycle — Prospect, Contacted, In Discussion, Committed.
5. When a prospect makes a commitment, the record transitions to Active and a contribution record is created (see FU-RECORD).

**System Requirements**
- FU-PROSPECT-REQ-001: The system must support creation and management of donor and funder prospect records for both individuals and organizations
- FU-PROSPECT-REQ-002: The system must track prospect status through the full lifecycle — Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed
- FU-PROSPECT-REQ-003: The system must track all communications with prospects across all CBM personnel
- FU-PROSPECT-REQ-004: The system must support recording of prospecting notes and next steps on each record
- FU-PROSPECT-REQ-005: The system must support filtering and searching donors by type, status, giving level, campaign, and geography

**Process Data**
- FU-PROSPECT-DAT-001: Board member and mentor records — to identify existing relationships that can be leveraged for introductions

**Data Collected**
- FU-PROSPECT-DAT-002: Donor / Funder record — name, type, contact information, status, prospect notes
- FU-PROSPECT-DAT-003: Communication history — outreach activities linked to the donor record

---

### FU-RECORD — Contribution Recording

**Process Purpose and Trigger**
The Contribution Recording process captures all incoming funding — donations, grants, sponsorships, and pledges — with accurate records for acknowledgment, tax receipt generation, financial reporting, and grant compliance. It is triggered when a contribution is received or a pledge is made.

**Personas Involved**
- MST-PER-010 Donor / Sponsor Coordinator — records all contributions

**Process Workflow**

*Individual Donations*
1. The Coordinator receives notification of a donation — via check, online payment, or direct communication.
2. A Donation record is created linked to the donor's Contact record, recording the amount, date, payment method, designation, and associated campaign if applicable.
3. A donor acknowledgment record is generated for tax receipt purposes.
4. The acknowledgment letter is sent to the donor via the organizational email system.

*Pledges*
5. When a donor makes a pledge commitment, a Pledge record is created with the total pledge amount, payment schedule, and start date.
6. As pledge payments are received, individual Donation records are created and linked to the Pledge record, tracking fulfillment progress against the total commitment.

*Grants*
7. When a grant application is submitted, a Grant record is created with the funding institution, amount requested, submission date, and application deadline.
8. The Grant record is updated as it progresses through the lifecycle — Applied, Awarded, Reporting Due, Closed.
9. When a grant is awarded, the award amount, award date, grant period, reporting requirements, and reporting deadlines are recorded.
10. The Coordinator receives automated reminders before reporting deadlines to ensure compliance obligations are met.

*Sponsorships*
11. When a corporate or organizational sponsorship is agreed upon, a Sponsorship record is created with the sponsor, amount, terms, associated program or event, and any recognition obligations.

**System Requirements**
- FU-RECORD-REQ-001: The system must record individual donations with donor, date, amount, payment method, designation, and campaign
- FU-RECORD-REQ-002: The system must generate donor acknowledgment records for tax receipt purposes
- FU-RECORD-REQ-003: The system must track pledge commitments with amount, payment schedule, and fulfillment status
- FU-RECORD-REQ-004: The system must record grants with funding institution, amount, application status, award date, reporting requirements, and renewal dates
- FU-RECORD-REQ-005: The system must alert the Coordinator before grant reporting deadlines
- FU-RECORD-REQ-006: The system must record sponsorship commitments with sponsor, amount, terms, and associated program or event
- FU-RECORD-REQ-007: The system must link contributions to fundraising campaigns where applicable
- FU-RECORD-REQ-008: The system must track recurring donations with frequency, amount, start date, and status
- FU-RECORD-REQ-009: The system must support storing donor documents — grant letters, agreements, and supporting materials

**Process Data**
- FU-RECORD-DAT-001: Donor / Funder records — to link contributions to the correct donor or funder

**Data Collected**
- FU-RECORD-DAT-002: Donation records — donor, date, amount, type, payment method, designation, campaign
- FU-RECORD-DAT-003: Pledge records — total amount, payment schedule, fulfillment status
- FU-RECORD-DAT-004: Grant records — funder, amount, status, dates, reporting requirements
- FU-RECORD-DAT-005: Sponsorship records — sponsor, amount, terms, associated program or event

---

### FU-STEWARD — Donor and Sponsor Stewardship

**Process Purpose and Trigger**
The Stewardship process maintains active, healthy relationships with committed donors and sponsors through regular communication, impact reporting, and recognition. It is ongoing for all Active donors and funders and is triggered after each contribution is received and at regular intervals throughout the year.

**Personas Involved**
- MST-PER-010 Donor / Sponsor Coordinator — manages stewardship communications and reporting
- MST-PER-002 Executive Member — may participate in high-value donor relationships and board-level funder communications

**Process Workflow**

1. The Coordinator maintains complete profiles for all active donors and funders — contact information, giving history, communication preferences, and lifetime value.
2. Acknowledgment communications are sent promptly after each contribution is received.
3. The Coordinator logs all stewardship communications — thank-you letters, impact reports, invitations, and personal outreach — against the donor record.
4. Board member and mentor giving is tracked separately within the system to support board stewardship reporting and recognize the dual role these individuals play.
5. For organizational donors and funders with multiple contacts, one contact is designated as the primary for each type of communication.
6. If a donor lapses — no giving for a defined period — the Coordinator receives an alert to conduct re-engagement outreach.

**System Requirements**
- FU-STEWARD-REQ-001: The system must store complete donor and funder profiles including contact information, giving history, communication history, and lifetime value
- FU-STEWARD-REQ-002: The system must track multiple contacts per organizational donor with one designated as primary
- FU-STEWARD-REQ-003: The system must track all communications with donors and funders across all CBM personnel
- FU-STEWARD-REQ-004: The system must track board member and mentor giving separately for internal stewardship reporting
- FU-STEWARD-REQ-005: The system must support administrator notes on individual donor and funder records
- FU-STEWARD-REQ-006: The system must alert the Coordinator when an active donor has lapsed beyond a configurable period without giving

**Process Data**
- FU-STEWARD-DAT-001: Donor giving history — to personalize stewardship communications and calculate lifetime value
- FU-STEWARD-DAT-002: Program impact data — engagement counts, session hours, client outcomes — to support impact reporting to funders

**Data Collected**
- FU-STEWARD-DAT-003: Stewardship communication records — linked to donor records
- FU-STEWARD-DAT-004: Updated donor profiles — preferences, relationship notes, lifetime value

---

### FU-REPORT — Fundraising Reporting

**Process Purpose and Trigger**
The Fundraising Reporting process produces accurate analytics for internal management and board oversight, as well as donor-facing impact reports and grant compliance reports. It is triggered on a regular cadence and on demand.

**Personas Involved**
- MST-PER-010 Donor / Sponsor Coordinator — generates and delivers reports
- MST-PER-002 Executive Member — reviews board-level fundraising summaries

**Process Workflow**

1. The Coordinator generates fundraising analytics from the CRM — giving history, campaign performance, donor count, total giving, grant pipeline value, and trends.
2. Monthly board reports are produced combining CRM fundraising data with program metrics for board review.
3. Grant compliance reports are produced at reporting deadlines, drawing on program impact data from the Mentoring domain — client outcomes, session hours, mentor contributions — to demonstrate program effectiveness to funders.
4. Individual donor giving summaries are produced annually for tax receipt and stewardship purposes.
5. The Coordinator monitors the grant pipeline for upcoming deadlines and reporting obligations.

**System Requirements**
- FU-REPORT-REQ-001: The system must produce donor and funding analytics — giving history, campaign performance, donor count, total giving, and lifetime value trends
- FU-REPORT-REQ-002: The system must track fundraising campaign progress against goals
- FU-REPORT-REQ-003: The system must provide filtering and reporting by donor type, campaign, date range, and designation
- FU-REPORT-REQ-004: The system must provide executive-level fundraising summaries for board oversight
- FU-REPORT-REQ-005: The system must produce individual donor giving summaries for annual tax receipt purposes
- FU-REPORT-REQ-006: The system must track the grant pipeline with status, amounts, and upcoming deadlines in a summary dashboard view

**Process Data**
- FU-REPORT-DAT-001: Engagement, session, and outcome data from the Mentoring domain — to support grant compliance and impact reports
- FU-REPORT-DAT-002: All donation, pledge, grant, and sponsorship records — to produce giving analytics

**Data Collected**
- FU-REPORT-DAT-003: No new data collected — reporting draws on existing records

---

## 4. Data Reference

This section defines all data collected and managed in the Fundraising domain. Individual donors are tracked as Contact records using the shared Contact entity. Organizational donors and funders are tracked as Organization records using the shared Organization entity — distinguished by an Organization Type field in the same pattern used for Client Organizations and Partner Organizations.

Relationships between entities are described in Section 4.6.

---

### 4.1 Donor Contact (Individual Donor Fields)

Individual donors are tracked as Contact records. They may also be CBM Mentors or board members. The Contact entity is shared across all domains — the fields below are specific to or relevant for the Fundraising domain.

---

**Is Donor** | Boolean | Optional
> Default: No.
>
> Flags this contact as an individual donor. Drives conditional
> visibility of donor-specific fields and inclusion in donor reporting.

**Donor Status** | Enum | Optional
> Values: Prospect, Contacted, In Discussion, Committed, Active,
> Lapsed, Closed
>
> Conditional visibility: shown when Is Donor = Yes.
>
> The current stage of the donor relationship with CBM.

**Is Board Member** | Boolean | Optional
> Default: No.
>
> Flags this contact as a current CBM board member. Used to track
> board member giving separately for stewardship reporting.

**Is Mentor Donor** | Boolean | Optional
> Default: No.
>
> Flags this contact as a mentor who has also made a donation. Used
> to track mentor giving separately for stewardship reporting.

**Lifetime Giving** | Currency | System-calculated | Read-only
> Total of all linked Donation records for this contact.
> System-calculated.

**Last Gift Date** | Date | System-calculated | Read-only
> Date of the most recent linked Donation record.
> System-calculated. Used for lapse monitoring.

**Last Gift Amount** | Currency | System-calculated | Read-only
> Amount of the most recent linked Donation record.
> System-calculated.

**Donor Notes** | Rich Text | Optional
> Notes on the donor relationship, preferences, and context.
> Visible to Donor / Sponsor Coordinator only.

---

### 4.2 Funder Organization (Organizational Funder Fields)

Organizational donors, grant-making foundations, corporate sponsors, and government funders are tracked as Organization records. They use the same shared Organization entity as Client Organizations and Partner Organizations, distinguished by an Organization Type value of Funder Organization.

---

**Organization Type (includes Funder)** | Multi-select | Required
> Values include: Client Organization, Partner Organization,
> Funder Organization
>
> Adding Funder Organization to the Organization Type drives
> conditional visibility of fundraising-specific fields.

**Funder Type** | Enum | Optional
> Values: Corporation, Foundation, Government Agency,
> Community Foundation, Individual (Organization), Other
>
> Conditional visibility: shown when Organization Type includes
> Funder Organization.
>
> The category of funding organization.

**Funder Status** | Enum | Optional
> Values: Prospect, Contacted, In Discussion, Committed, Active,
> Lapsed, Closed
>
> Conditional visibility: shown when Organization Type includes
> Funder Organization.

**Primary Funder Contact** | Relationship | Optional
> Conditional visibility: shown when Organization Type includes
> Funder Organization.
>
> Link to the primary Contact at this funder organization for
> grant and donation communications.

**Funder Lifetime Giving** | Currency | System-calculated | Read-only
> Total of all linked Donation and Grant Award records.
> System-calculated.

**Funder Notes** | Rich Text | Optional
> Notes on the funder relationship, interests, and giving history
> context. Visible to Donor / Sponsor Coordinator only.

---

### 4.3 Donation

A Donation records a single completed gift from an individual or organization. Linked to the donor's Contact or Organization record. Multiple donations from the same donor are tracked as separate records providing a complete giving history.

---

**Donor Contact** | Relationship | Conditional
> Link to the individual donor Contact record.
> Required when donation is from an individual.

**Donor Organization** | Relationship | Conditional
> Link to the organizational donor or funder Organization record.
> Required when donation is from an organization.

**Amount** | Currency | Required
> The gift amount.

**Gift Date** | Date | Required
> The date the gift was received.

**Gift Type** | Enum | Required
> Values: Cash, Check, Online Payment, Credit Card, In-Kind, Other
>
> How the gift was made.

**Designation** | Text | Optional
> The fund or purpose to which the gift is designated — for example,
> General Operations, Program Support, or a specific campaign.

**Campaign** | Relationship | Optional
> Link to the Fundraising Campaign record this donation is associated
> with, if applicable.

**Pledge** | Relationship | Optional
> Link to the Pledge record this donation fulfills, if applicable.

**Acknowledgment Sent** | Boolean | Required
> Default: No. Updated when acknowledgment letter is sent.
>
> Whether a donor acknowledgment has been sent for this gift.

**Acknowledgment Date** | Date | Optional
> The date the acknowledgment letter was sent.

**Tax Receipt Required** | Boolean | Required
> Default: Yes for gifts over the IRS threshold.
>
> Whether a formal tax receipt is required for this gift.

**Notes** | Text | Optional
> Any additional notes about this donation.

---

### 4.4 Pledge

A Pledge records a donor's commitment to give a specified amount over time. Individual payments against the pledge are recorded as linked Donation records.

---

**Donor Contact** | Relationship | Conditional
> Link to the individual donor Contact record.
> Required when pledge is from an individual.

**Donor Organization** | Relationship | Conditional
> Link to the organizational donor Organization record.
> Required when pledge is from an organization.

**Total Pledge Amount** | Currency | Required
> The total amount committed.

**Pledge Date** | Date | Required
> The date the pledge commitment was made.

**Payment Schedule** | Enum | Required
> Values: One-Time, Monthly, Quarterly, Annual, Custom
>
> The expected payment frequency.

**Start Date** | Date | Required
> The date the first payment is expected.

**End Date** | Date | Optional
> The date the pledge period ends.

**Fulfillment Status** | Enum | Required
> Values: Active, Fulfilled, Lapsed, Cancelled
>
> The current status of the pledge commitment.

**Amount Fulfilled** | Currency | System-calculated | Read-only
> Total of all linked Donation records against this pledge.
> System-calculated.

**Amount Remaining** | Currency | System-calculated | Read-only
> Total Pledge Amount minus Amount Fulfilled.
> System-calculated.

**Notes** | Text | Optional

---

### 4.5 Grant

A Grant records a funding opportunity from a foundation, government agency, or other grant-making institution. Tracks the full grant lifecycle from application through award, reporting, and closure.

---

**Funding Institution** | Relationship | Required
> Link to the Funder Organization record.

**Grant Name** | Text | Required
> The name of the grant program or opportunity.

**Amount Requested** | Currency | Optional
> The amount requested in the application.

**Amount Awarded** | Currency | Optional
> The amount actually awarded. Populated when status = Awarded.

**Status** | Enum | Required
> Values: Prospect, Applied, Awarded, Reporting Due, Closed
>
> The current lifecycle stage of the grant.

**Application Deadline** | Date | Optional
> The submission deadline for the grant application.

**Submission Date** | Date | Optional
> The date the application was submitted.

**Award Date** | Date | Optional
> The date the grant was awarded.

**Grant Period Start** | Date | Optional
> The start date of the funded grant period.

**Grant Period End** | Date | Optional
> The end date of the funded grant period.

**Reporting Deadline** | Date | Optional
> The date by which a compliance or impact report must be submitted
> to the funder. The system alerts the Coordinator before this date.

**Report Submitted** | Boolean | Optional
> Whether the compliance report has been submitted.

**Report Submission Date** | Date | Optional
> The date the compliance report was submitted.

**Renewal Date** | Date | Optional
> The date this grant may be renewed or re-applied for.

**Purpose / Designation** | Text | Optional
> The specific purpose or program area this grant supports.

**Notes** | Rich Text | Optional
> Notes on the grant relationship, application history, and
> reporting context.

---

### 4.6 Fundraising Campaign

A Fundraising Campaign groups related donations under a named fundraising effort — for example, an annual fund drive, a specific program appeal, or a capital campaign. Campaigns allow CBM to track progress toward a fundraising goal and analyze giving by campaign.

---

**Campaign Name** | Text | Required
> The name of the fundraising campaign.

**Campaign Type** | Enum | Required
> Values: Annual Fund, Program Appeal, Event, Grant-Funded,
> Corporate Sponsorship, Other

**Goal Amount** | Currency | Optional
> The fundraising goal for this campaign.

**Start Date** | Date | Required
> The date the campaign begins.

**End Date** | Date | Optional
> The date the campaign closes.

**Status** | Enum | Required
> Values: Planned, Active, Completed, Cancelled

**Total Raised** | Currency | System-calculated | Read-only
> Total of all linked Donation records. System-calculated.

**Description** | Text | Optional
> Description of the campaign purpose and goals.

---

### 4.7 Entity Relationships

**Donor Contact → Donation**
An individual donor Contact may have one or more Donations over time. Each Donation belongs to one donor (individual or organizational).

**Funder Organization → Donation**
An organizational donor or funder Organization may have one or more Donations over time.

**Funder Organization → Grant**
A funding institution Organization may have one or more Grant records. Each Grant belongs to one funding institution.

**Donor Contact → Pledge**
A donor Contact may have one or more Pledges. Each Pledge belongs to one donor.

**Pledge → Donation**
A Pledge may have one or more Donations linked to it representing installment payments. Each installment Donation is linked back to the parent Pledge.

**Fundraising Campaign → Donation**
A Campaign may have one or more Donations linked to it. Each Donation may optionally be linked to one Campaign.

---

## 5. Decisions Made

| ID | Decision | Rationale | Date |
|---|---|---|---|
| FU-DEC-001 | Individual donors are tracked as Contact records on the shared Contact entity, not a separate Donor entity | Consistent with the pattern used throughout the system. An individual who is both a mentor and a donor has one Contact record serving both roles. | March 2026 |
| FU-DEC-002 | Organizational funders are tracked as Organization records with Funder Organization added to Organization Type | Consistent with the pattern used for Client Organizations and Partner Organizations. An organization can be a funder, a partner, and a client simultaneously without duplication. | March 2026 |
| FU-DEC-003 | Board member and mentor giving is flagged separately on Contact records rather than tracked in a separate entity | Allows stewardship reporting to filter these populations without creating duplicate records or complex join queries. | March 2026 |
| FU-DEC-004 | No dedicated fundraising platform in Year 1 — CRM handles all fundraising natively | CBM's Year 1 fundraising profile is simple enough to be managed within the CRM without adding platform complexity and cost. The data model is extensible if a dedicated platform is needed later. | March 2026 |
| FU-DEC-005 | Online donation capability via payment processor deferred to Phase 2 | Adds complexity and integration work not justified by Year 1 fundraising volume. A simple payment link can be added to the website when needed. | March 2026 |
| FU-DEC-006 | Donor giving levels or tiers are deferred — requires stakeholder input from fundraising team | Values and tier thresholds are not yet defined. The data model supports adding a Giving Level field to the donor Contact record when this is defined. | March 2026 |

---

## 6. Open Issues

| ID | Issue | Owner | Target |
|---|---|---|---|
| FU-ISS-001 | Donor giving levels or tiers (Bronze, Silver, Gold, etc.) — values and thresholds not yet defined | Fundraising Team | Before go-live |
| FU-ISS-002 | Whether in-kind and non-cash donations need structured tracking or notes-only recording has not been decided | Fundraising Team | Before go-live |
| FU-ISS-003 | Annual fund and fundraising calendar management requirements have not been defined | Fundraising Team | Before go-live |
| FU-ISS-004 | The lapse threshold for donor re-engagement alerts has not been defined | Fundraising Team | Before go-live |
| FU-ISS-005 | Sponsor recognition obligations and benefits tracking requirements have not been defined | Fundraising Team | Before go-live |

---

## 7. Interview Transcript

*This section will be populated with the verbatim Q&A record from requirements interview sessions conducted to produce this Domain PRD. The content of this version was derived from existing archived specification documents (CBM-PRD-Volunteer-Donor-Documents-Reporting- Security.docx Section 10 and CBM-PRD-CRM.docx Section 3.6) rather than a live interview session. The Fundraising domain is the least developed of the four domains in the existing documentation — a formal stakeholder interview session is recommended before implementation begins to ensure the requirements fully reflect CBM's fundraising program needs.*
