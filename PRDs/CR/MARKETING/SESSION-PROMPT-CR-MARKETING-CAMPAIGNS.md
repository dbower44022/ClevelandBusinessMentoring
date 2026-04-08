# Session Prompt: CR-MARKETING-CAMPAIGNS Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-MARKETING Sub-Domain Overview v1.0 is complete, and the CR-MARKETING-CONTACTS process document should also be complete before this session begins.

This session produces the CR-MARKETING-CAMPAIGNS process document — the second of two process documents in the CR-MARKETING sub-domain. Per the Document Production Process, process documents follow a structured interview producing a Word document with all required sections.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## Process Being Defined

**CR-MARKETING-CAMPAIGNS — Campaign Execution and Tracking**

Covers planning, executing, and measuring outreach campaigns. The Client Recruiter creates Campaign records in the CRM as lightweight placeholders specifying audience, channel, and planned send date, then authors content in the external marketing platform and triggers the actual send. Campaign engagement history (sends, opens, clicks, bounces) flows back from the marketing platform and is recorded against per-recipient Campaign Engagement records as well as aggregate roll-up fields on Contact and Campaign.

Application source attribution records how each new applicant heard about CBM, supporting channel effectiveness analysis across the four CR sub-domains. Geographic targeting directs campaigns toward specific service areas. Coordinated multi-touch efforts can be grouped via the optional Campaign Group entity for rollup reporting.

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-007 | Client Recruiter | Primary operator. Creates Campaign records, plans audience and timing, authors and sends content via the external marketing platform, monitors engagement, runs effectiveness reports, manages Campaign Groups for coordinated efforts. |
| MST-PER-008 | Partner Coordinator | Supporting persona. Coordinates with the Client Recruiter on joint marketing initiatives that leverage partner organizations' networks, mailing lists, and outreach channels. Does not directly operate Campaign records but provides input on partner-aligned audiences and timing. |

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Campaign | Custom Base | Deferred (Phase 2b) | Creates and updates campaign records. One record per outbound send. Holds metadata, planning, and aggregate metrics. Status lifecycle (Draft → Scheduled → Sent → Complete; possibly Cancelled). |
| Campaign Group | Custom Base | Deferred (Phase 2b) | Creates and links optional grouping records for coordinated multi-touch efforts. Aggregate metrics roll up from child Campaigns. |
| Campaign Engagement | Custom Base | Deferred (Phase 2b) | Creates per-recipient engagement records. One record per Contact per Campaign. Sent / opened / clicked / bounced flags and timestamps. |
| Contact | Native Person | v1.3 | Reads contact data for audience targeting; updates marketing engagement roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks); writes howDidYouHearAboutCbm at appropriate Points 1 and 3 per the layered authority policy; respects emailOptOut and smsOptOut flags. |
| Account | Native Company | v1.2 | Reads company-level segmentation fields (Account name, industry/NAICS) for audience filtering. |

## Key Decisions Inherited from Sub-Domain Overview

The Sub-Domain Overview locked in several decisions that this process document must respect — they are not open for re-litigation in this session, only for operationalization into specific system requirements:

- **Campaign granularity:** A Campaign represents a single outbound send. Coordinated multi-touch efforts use the optional Campaign Group entity for grouping.
- **Hybrid Pattern D origination:** The CRM owns campaign metadata, planning, and reporting. The marketing platform owns campaign content (subject, body, design, scheduling). The Client Recruiter creates a lightweight CRM placeholder first, then authors content in the marketing platform.
- **Strict one-way contact sync with three narrow exceptions.** Opt-outs (Section 4.5), per-recipient engagement history (Section 4.5), and Campaign aggregate metrics + status (Section 4.5) flow back from the marketing platform. Nothing else flows back.
- **Per-channel opt-out enforcement.** emailOptOut and smsOptOut are separate fields. SMS in scope brings TCPA compliance alongside CAN-SPAM.
- **Pattern B + C engagement history model.** Per-Contact-per-Campaign records (Campaign Engagement) hold per-recipient detail. Aggregate roll-up fields on Contact hold the prospect-level summary.
- **10-value howDidYouHearAboutCbm enum.** Final value list is locked. Sub-domain rollup mapping (Partner Referral → CR-PARTNER, etc.) drives channel effectiveness reporting.
- **Layered authority policy for source attribution writes.** Point 1 (system at creation) ≥ Point 2 (applicant self-report only if blank); Point 3 (Client Administrator override) wins over both. Audit trail in sourceAttributionDetails.

## Key Questions to Address

1. **Campaign creation workflow.** What does creating a Campaign in the CRM look like in practice? Required fields at placeholder creation, optional fields, target segment selection (linking to a saved search or list from CR-MARKETING-CONTACTS), planned send date, channel choice (email vs. SMS)?

2. **Campaign status lifecycle.** What are the exact status values, and what triggers each transition? Draft → Scheduled (when?), Scheduled → Sent (triggered by marketing platform send event?), Sent → Complete (when metrics stabilize?), Cancelled (manual?). What system rules vs. manual transitions?

3. **Campaign Group workflow.** When does the Client Recruiter create a Campaign Group? What does the user interaction look like — create the group first then add Campaigns to it, or create Campaigns and group them retroactively? What metrics roll up to the group level?

4. **Marketing platform integration mechanics.** What does the sync between the CRM Campaign placeholder and the marketing platform actually look like operationally? Does the placeholder push to the marketing platform on creation, on Schedule, or on Sent? How does the marketing platform know which Campaign in the CRM corresponds to which platform-side campaign?

5. **Engagement event ingestion.** When the marketing platform pushes back per-recipient send/open/click/bounce events, how are they mapped to existing Contacts? By email address? What happens if the Contact doesn't exist in the CRM (shouldn't happen given strict one-way contact sync, but error handling is needed)?

6. **Aggregate metric roll-ups.** What metrics are stored on Campaign records? Total recipients, total sent, total opened, total clicked, total bounced, total unsubscribed-as-result-of? When are they updated — real-time as engagement events arrive, or on a schedule?

7. **Contact roll-up updates.** The four roll-up fields on Contact (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) are workflow-updated from Campaign Engagement records. What's the update trigger and frequency?

8. **Channel effectiveness reporting.** What reports does the Client Recruiter need to compare CR sub-domain channels? Application count by source enum value (rolled up to sub-domain), conversion rate per channel (applications / contacts touched), trend reports over time, geographic breakdowns?

9. **Campaign-level reporting.** Beyond channel rollup, what per-Campaign reports are needed? Recipient list, open/click rates, unsubscribe count, conversion attribution (which Campaign produced which applicant)?

10. **Application source attribution writes from Point 1.** When a CR-MARKETING contact is created via a known source pathway (a Campaign click that brings them to a CRM-hosted form, an event registration, a partner-supplied list), this process document needs to specify what writes to howDidYouHearAboutCbm at Point 1. How is the source signal captured and persisted?

11. **Compliance enforcement at send time.** Before the marketing platform sends a campaign, the CRM should have the latest opt-out state. The Sub-Domain Overview specifies hybrid scheduled sync with manual on-demand override. This process document needs to specify how the Client Recruiter triggers the on-demand sync as part of the campaign launch workflow, and what compliance validation happens before send.

12. **Campaign cancellation and resend.** How are cancelled campaigns handled? Can a sent campaign be resent to a different segment? How does that interact with Campaign records and Campaign Engagement records?

## Items Deferred From This Session

The following items remain deferred to stakeholder input. They should be acknowledged but not pinned down without resolution:

- **CR-MARKETING-ISS-001 (Geographic targeting).** Geographic targeting requirements depend on whether CBM adopts a county-only model, a Service Area entity model, or something else. This process document should describe geographic targeting at the level of city/state/zip and note that finer granularity depends on ISS-001 resolution.
- **CR-MARKETING-ISS-002 (Media and PR tracking).** This process document should not include media/PR-specific requirements unless ISS-002 is resolved before this session. The "News or Media" value in howDidYouHearAboutCbm remains valid regardless; sourceAttributionDetails can hold free-text descriptions.
- **CR-MARKETING-ISS-003 and CR-MARKETING-ISS-004 (prospectStatus and clientStatus value lists).** These primarily affect CR-MARKETING-CONTACTS, but this process document references them indirectly via segmentation fields.

## Prior Process Documents

CR-MARKETING-CONTACTS is the upstream process within this sub-domain. Its requirements are prerequisites — Campaign records depend on the prospect contact lists, segmentation patterns, and lifecycle field handling established in CR-MARKETING-CONTACTS.

CR-PARTNER process documents (CR-PARTNER-PROSPECT v1.0 and CR-PARTNER-MANAGE v1.0) are complete in the parent CR domain. They establish the Partner Coordinator's workflow that this process intersects with via joint marketing initiatives.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Marketing.docx** — the CR-MARKETING Sub-Domain Overview (from `PRDs/CR/MARKETING/` in CBM repo) — primary input
2. **CR-MARKETING-CONTACTS.docx** — the CR-MARKETING-CONTACTS process document (from `PRDs/CR/MARKETING/` in CBM repo) — direct upstream dependency
3. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo) — for field reference, especially the four marketing engagement roll-up fields and the howDidYouHearAboutCbm enum

Note: The Sub-Domain Overview and the CR-MARKETING-CONTACTS process document are the primary inputs. The parent CR Domain Overview and Master PRD are not uploaded — relevant content has been incorporated into the Sub-Domain Overview.

## Output

Produce the CR-MARKETING-CAMPAIGNS process document as a Word document and commit to:
`PRDs/CR/MARKETING/CR-MARKETING-CAMPAIGNS.docx`

## After This Session

With CR-MARKETING-CAMPAIGNS complete:

* CR-MARKETING sub-domain process definition is finished
* The next CR sub-domain to define is CR-EVENTS (starting with CR-EVENTS Sub-Domain Overview)
* Three new Entity PRDs (Campaign, Campaign Group, Campaign Engagement) become eligible for Phase 2b production, all dependent on this process document
* CR-MARKETING Sub-Domain PRD reconciliation is deferred until all CR sub-domains complete process definition
* Any unresolved open issues (CR-MARKETING-ISS-001 through ISS-004) carry forward to the eventual CR Sub-Domain PRD reconciliation
