# Session Prompt: CR-PARTNER-MANAGE Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-PARTNER Sub-Domain Overview v1.0 is complete and the CR-PARTNER-PROSPECT process document v1.0 has been produced. This session produces the CR-PARTNER-MANAGE process document — the second and final process in the CR-PARTNER sub-domain.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## Process Being Defined

**CR-PARTNER-MANAGE — Partner Relationship Management**

Covers ongoing management of active partner relationships — liaison activities, communication tracking, referral tracking, co-sponsored event coordination, mentor affiliation tracking, analytics reporting, and partner status changes (Active to Lapsed or Inactive, and reactivation). The process is continuous for the life of the partnership. It begins when a partner reaches Active status (output of CR-PARTNER-PROSPECT) and continues indefinitely.

All historical data — referrals, activities, communications, agreements, and analytics — is retained permanently regardless of status changes. Partner analytics are delivered as formal quarterly reports supplemented by informal verbal summaries during regular liaison touchpoints.

## What CR-PARTNER-PROSPECT Established

CR-PARTNER-PROSPECT v1.0 defines the records and fields this process operates on. Key context:

**Account (Partner) — 11 fields created by CR-PARTNER-PROSPECT:**
- accountType (multiEnum, includes Partner)
- partnerOrganizationType (enum, 9 values: Chamber of Commerce, SBDC, Economic Development Agency, University/Academic Institution, Bank/Financial Institution, Nonprofit/Community Organization, Government Agency, Corporate Sponsor, Other)
- partnerType (multiEnum, 4 values: Referral Partner, Co-Delivery Partner, Funding/Sponsorship Partner, Resource Partner)
- partnerStatus (enum, 4 values: Prospect, Active, Lapsed, Inactive) — Prospect = actively being pursued; Active = partnership established; Inactive = decided not to proceed or deactivated; Lapsed is reserved for CR-PARTNER-MANAGE
- partnershipStartDate (date, set at activation)
- assignedLiaison (link to Contact, set at activation, required for Active partners)
- publicAnnouncementAllowed (bool, default No)
- geographicServiceArea (text, optional)
- targetPopulation (text, optional)
- partnerNotes (wysiwyg, restricted to Partner Coordinator and above, hidden from Mentors)

**Contact (Partner) — 6 fields, all native/shared:**
- contactType (multiEnum, includes Partner; dual roles like Partner+Mentor supported)
- firstName, lastName, emailAddress, phoneNumber, title

**Partnership Agreement — 6 fields:**
- Partner Organization (relationship to Account, required)
- Agreement Type (enum: MOU, Partnership Agreement, Letter of Intent, Other)
- Creation Date (date, required)
- Expiration / Renewal Date (date, optional)
- Agreement Document (file, required, restricted to Partner Coordinator and Executive Member)
- Notes (wysiwyg, optional)

**Key decisions from CR-PARTNER-PROSPECT:**
- Partner Coordinator is sole operator for prospecting; no approval gates
- Activation requires mutual agreement to work together — formal written agreement is optional (Partner Coordinator's judgment)
- No dedicated inactivation reason field — partnerNotes captures the reason
- Inactive can transition back to Prospect for revisiting
- No notifications sent at activation
- No supporting data from other entities referenced during prospecting

**9 system requirements (CR-PARTNER-PROSPECT-REQ-001 through REQ-009)** and **23 data items (CR-PARTNER-PROSPECT-DAT-001 through DAT-023)** — no open issues.

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-008 | Partner Coordinator | Primary operator. Manages ongoing relationships, tracks referrals, delivers analytics, manages status changes. |
| MST-PER-009 | Content and Event Administrator | Coordinates with the Partner Coordinator on co-sponsored events. Links partner organizations to event records. |
| MST-PER-007 | Client Recruiter | Coordinates with the Partner Coordinator on joint marketing initiatives leveraging partner channels. |
| MST-PER-006 | Mentor Recruiter | Coordinates with the Partner Coordinator on partner-channel mentor recruitment from partner professional networks. |

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Account | Native Company | v1.0 | Reads/updates Partner organization records. partnerStatus changes (Active → Lapsed → Inactive, reactivation). 10 Partner-specific fields defined in Entity PRD, all validated in CR-PARTNER-PROSPECT. |
| Contact | Native Person | v1.1 | Reads/updates Partner contact records. contactType = Partner. No Partner-specific custom fields. |
| Partnership Agreement | Custom Base | Deferred | Reads/creates agreement records. Renewal tracking for active agreements. 6 fields defined in CR-PARTNER-PROSPECT. |
| Engagement | Custom Base | v1.0 | Reads — referral attribution via referringPartner link (new field, not yet in Entity PRD). Basis for partner analytics. |

## Key Questions to Address

1. **Liaison cadence.** How often does the assigned liaison contact active partners? Is there a standard schedule (monthly, quarterly) or is it relationship-dependent? What triggers an unscheduled touchpoint?

2. **Communication tracking.** What communication activities are logged? Calls, emails, meetings, notes? Is this the Notes Service, native activity stream, or both?

3. **Referral tracking workflow.** When a partner refers a client, what is the operational workflow for tracking that referral? Who records it, when, and how does it connect to the referringPartner field on Engagement?

4. **Co-sponsored event coordination.** What does coordination look like operationally? Who initiates, what decisions are made jointly, how is partner involvement recorded on event records?

5. **Mentor affiliation tracking.** How does the Partner Coordinator track which mentors are affiliated with which partners? Is this just the Contact-to-Account relationship, or is there additional tracking?

6. **Partner analytics delivery.** The Sub-Domain Overview established quarterly formal reports with 7 metrics (referral count, active clients, new clients in last 30 days, total sessions, total hours, NPS scores, impact metrics). How are these reports produced — CRM-generated, manual compilation, or a combination? What format are they delivered in?

7. **Status change criteria.** What triggers a status change from Active to Lapsed? From Lapsed to Inactive? What are the reactivation criteria and workflow? Are there time-based rules (e.g., no activity in 6 months = Lapsed)?

8. **Agreement renewal.** How are agreement renewals tracked and managed? Is there a notification or task when an agreement approaches its expiration date?

9. **Partner record retention.** The Sub-Domain Overview states all data is retained permanently regardless of status. Are there any exceptions or data cleanup scenarios?

## Prior Process Documents

CR-PARTNER-PROSPECT v1.0 is the only prior process document in this sub-domain. It defines all the records and field values this process operates on. Upload it with this prompt.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Partner.docx** — the CR-PARTNER Sub-Domain Overview (from `PRDs/CR/PARTNER/` in CBM repo)
2. **CR-PARTNER-PROSPECT.docx** — the Partner Prospecting and Activation process document v1.0 (from `PRDs/CR/PARTNER/` in CBM repo)

## Output

Produce the CR-PARTNER-MANAGE process document as a Word document and commit to:
`PRDs/CR/PARTNER/CR-PARTNER-MANAGE.docx`

## After This Session

With CR-PARTNER-MANAGE complete:

* Both CR-PARTNER processes are finished
* The next step in the CR domain production order is the CR-MARKETING Sub-Domain Overview
* Before proceeding to CR-MARKETING, update the CLAUDE.md to reflect CR-PARTNER completion
* The Partnership Agreement Entity PRD can now be produced (depends on CR-PARTNER process documents)
* The Engagement Entity PRD should be updated to add the referringPartner field
* The Contact Entity PRD should be updated to close CON-ISS-002
