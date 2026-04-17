# Session Prompt: CR Phase 2b Entity PRDs

**Repo:** `dbower44022/ClevelandBusinessMentoring`
**Date:** 04-16-26
**Prerequisite:** Read `CLAUDE.md` in both `crmbuilder` and `ClevelandBusinessMentoring` repos.

---

## Context

Seven CR-domain entities were deferred to Phase 2b during CR process
definition. All seven now have complete field-level requirements
established by their respective process documents and compiled in the
CR Domain PRD v1.0 Section 4 (Data Reference). This session produces
Entity PRDs for all seven entities.

**Dependency:** The MR Phase 9 follow-up session
(`SESSION-PROMPT-MR-PHASE9-FOLLOWUP.md`) should be completed before
this session. That session bumps Contact Entity PRD to v1.6 and
Account Entity PRD to v1.6, which are referenced by these Entity
PRDs.

**This is a synthesis task, not an interview.** The field definitions
are already established in the process documents and the CR Domain
PRD. The Entity PRD formalizes them in the standard entity document
format with the nine sections defined in the Entity Definition Guide.
Ask the administrator only if a field definition is ambiguous or
contradictory across source documents.

---

## Before Starting

1. Read `CLAUDE.md` in both `dbower44022/crmbuilder` and
   `dbower44022/ClevelandBusinessMentoring`
2. Read the entity definition guide at
   `PRDs/process/interviews/guide-entity-definition.md` in the
   crmbuilder repo (Phase 2b sections)
3. Read the entity PRD generator template at
   `PRDs/process/templates/generate-entity-prd-template.js` in the
   crmbuilder repo for Word document formatting
4. Read the Contact Entity PRD (reference implementation for format)
5. Read the CR Domain PRD v1.0 Section 4 (Data Reference) for
   consolidated field definitions
6. Read the Entity Inventory v1.4 for entity type and ownership

---

## Entities to Produce (Recommended Order)

Produce one Entity PRD per entity. The recommended order follows
dependency: entities referenced by other entities come first.

| # | Entity | Type | Owning Sub-Domain | Depends On |
|---|--------|------|-------------------|------------|
| 1 | Event | Custom Event | CR-EVENTS | — |
| 2 | Event Registration | Custom Base | CR-EVENTS | Event |
| 3 | Partnership Agreement | Custom Base | CR-PARTNER | Account |
| 4 | Segment | Custom Base | CR-MARKETING | Contact |
| 5 | Campaign Group | Custom Base | CR-MARKETING | — |
| 6 | Marketing Campaign | Custom Base | CR-MARKETING | Segment, Campaign Group |
| 7 | Campaign Engagement | Custom Base | CR-MARKETING | Marketing Campaign, Contact |

**Note on entity count:** The Entity Definition Guide says "one
conversation per CRM entity." Given that some of these entities are
small (Campaign Group has 4 fields), the administrator may choose to
combine multiple small entities into a single session. The
recommended boundary is: produce each entity as a complete document
before moving to the next, even if multiple entities are handled in
one conversation.

---

## Source Documents Per Entity

### Entity 1: Event

**Primary sources:**
- CR-EVENTS-MANAGE v1.0 (creates and manages Event records, 15 fields)
- CR-EVENTS-CONVERT v1.0 (reads Event records for reporting)
- CR-EVENTS SDO v1.0 (Section 4.2 field landscape, Section 4.3 status lifecycle)
- CR Domain PRD v1.0 Section 4.4

**Key content:**
- 15 fields defined by CR-EVENTS-MANAGE (DAT-001 through DAT-015 approximately)
- 6-value status lifecycle: Draft, Scheduled, In Progress, Completed, Cancelled, Postponed
- 10-value topic enum
- 3 format values: In-Person, Virtual, Hybrid
- Dynamic logic: field visibility and requiredness based on format
- Draft requires only name, format, dateStart; Scheduled requires full field set
- presenters (link-multiple to Contact)
- coSponsoringPartners (link-multiple to Account)
- All status transitions manual
- Relationships: Event → Event Registration (one-to-many), Event → Contact as Presenter (many-to-many), Event → Account as Co-Sponsoring Partner (many-to-many)

**Output:** `PRDs/entities/Event-Entity-PRD.docx`

---

### Entity 2: Event Registration

**Primary sources:**
- CR-EVENTS-MANAGE v1.0 (creates Event Registration records, 11 fields)
- CR-EVENTS-CONVERT v1.0 (adds postEventFollowUpSentAt, reads for conversion)
- CR-EVENTS SDO v1.0 (Section 4.4 field summary)
- CR Domain PRD v1.0 Section 4.5

**Key content:**
- 12 fields total (11 from MANAGE + 1 from CONVERT)
- Core fields: event (link), contact (link), registrationDate, registrationSource (Online/Walk-In), attendanceStatus (Registered/Attended/No-Show/Cancelled)
- Communication tracking: confirmationSentAt, remindersSent (multiEnum), lastCommunicationBouncedAt
- Cancellation: cancellationDate, cancellationReason
- Special: specialRequests
- Post-event: postEventFollowUpSentAt (from CR-EVENTS-CONVERT)
- Relationships: Event Registration → Event (many-to-one), Event Registration → Contact (many-to-one)

**Output:** `PRDs/entities/EventRegistration-Entity-PRD.docx`

---

### Entity 3: Partnership Agreement

**Primary sources:**
- CR-PARTNER-PROSPECT v1.0 (creates agreement records, 6 fields)
- CR-PARTNER-MANAGE v1.0 (creates renewal agreements, reads existing)
- CR-PARTNER SDO v1.0 (Section 4.4 anticipated fields)
- CR Domain PRD v1.0 Section 4.3

**Key content:**
- 6 fields: Partner Organization (link to Account, required), Agreement Type (enum: MOU, Partnership Agreement, Letter of Intent, Other), Creation Date, Expiration / Renewal Date, Agreement Document (file, restricted access), Notes
- Access restriction: Agreement Document visible to Partner Coordinator and Executive Member only
- Renewal creates a new Partnership Agreement record linked to the same Account
- Relationships: Partnership Agreement → Account (many-to-one)

**Output:** `PRDs/entities/PartnershipAgreement-Entity-PRD.docx`

---

### Entity 4: Segment

**Primary sources:**
- CR-MARKETING-CONTACTS v1.0 (creates and maintains Segments, Section 4.7)
- CR-MARKETING-CAMPAIGNS v1.0 (reads Segments, links Campaigns to Segments)
- CR Domain PRD v1.0 Section 4.9

**Key content:**
- 8 fields: name (varchar, required), description (text), segmentType (enum: Dynamic, Static), filterCriteria (json, required for Dynamic), memberContactIds (linkMultiple to Contact, required for Static), owner (link to User, system-set), createdAt, modifiedAt
- Two segment types with different field requirements
- Forward-reference relationship: Campaign-to-Segment link defined by CR-MARKETING-CAMPAIGNS
- Relationships: Segment → Contact (many-to-many, for Static), Segment → Campaign (one-to-many, reverse of Campaign.targetSegment)

**Output:** `PRDs/entities/Segment-Entity-PRD.docx`

---

### Entity 5: Campaign Group

**Primary sources:**
- CR-MARKETING-CAMPAIGNS v1.0 (creates Campaign Groups, Section 4.1)
- CR Domain PRD v1.0 Section 4.7

**Key content:**
- 4 fields: groupName (varchar, required), description (text), startDate (date), endDate (date)
- Lightweight organizational container
- No independent status (state derived from child Campaigns)
- Relationships: Campaign Group → Campaign (one-to-many)

**Output:** `PRDs/entities/CampaignGroup-Entity-PRD.docx`

---

### Entity 6: Marketing Campaign

**Primary sources:**
- CR-MARKETING-CAMPAIGNS v1.0 (creates and manages Campaigns)
- CR-REACTIVATE-OUTREACH v1.0 (creates Reactivation Campaigns)
- CR-REACTIVATE SDO v1.0 (channel enum expansion)
- CR Domain PRD v1.0 Section 4.6

**Key content:**
- Shared between CR-MARKETING-CAMPAIGNS and CR-REACTIVATE-OUTREACH
- Fields: campaignName, channel (enum: Email, SMS, Reactivation), targetSegment (link to Segment), plannedSendDate, actualSendDate, status (enum: Draft, Scheduled, Sent, Complete, Cancelled — unified five-value lifecycle per CR-RECON-DEC-001), externalCampaignId, campaignGroup (link to Campaign Group), campaignNotes, population (enum: Former Client, Event Attendee, Inactive Prospect — applicable when channel = Reactivation), sendDate
- Aggregate metrics: totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed
- Valid transitions: Draft → Scheduled, Scheduled → Sent, Sent → Complete, Draft → Cancelled, Scheduled → Cancelled
- Campaign Engagement records provide per-recipient detail
- Relationships: Campaign → Segment (many-to-one), Campaign → Campaign Group (many-to-one), Campaign → Campaign Engagement (one-to-many)

**Reconciliation decisions to incorporate:**
- CR-RECON-DEC-001: Unified five-value status lifecycle for all channels
- CR-RECON-DEC-002: Full five-event-type Campaign Engagement field set for all channels

**Output:** `PRDs/entities/MarketingCampaign-Entity-PRD.docx`

---

### Entity 7: Campaign Engagement

**Primary sources:**
- CR-MARKETING-CAMPAIGNS v1.0 (creates per-recipient engagement records)
- CR-REACTIVATE-OUTREACH v1.0 (creates per-recipient engagement records)
- CR Domain PRD v1.0 Section 4.8

**Key content:**
- One record per Contact per Campaign
- 5 event types with paired bool/datetime fields (CR-RECON-DEC-002): sent/sentAt (required), opened/openedAt, clicked/clickedAt, bounced/bouncedAt, unsubscribed/unsubscribedAt
- First occurrence only for each event type
- Updates Contact marketing roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) via workflow
- Matching to existing Contacts by email address
- Unmatched emails logged but do not create new Contacts
- Relationships: Campaign Engagement → Campaign (many-to-one), Campaign Engagement → Contact (many-to-one)

**Output:** `PRDs/entities/CampaignEngagement-Entity-PRD.docx`

---

## Entity PRD Format

Each Entity PRD follows the nine-section structure defined in the
Entity Definition Guide (Section "Phase 2b: Entity PRDs"). Use the
Contact Entity PRD as the reference implementation for format.

The nine sections are:

| # | Section |
|---|---------|
| 1 | Entity Overview (type, primary domain, contributing domains, description) |
| 2 | Native Fields (if any — custom entities typically have none) |
| 3 | Custom Fields (organized by functional group) |
| 4 | Relationships |
| 5 | Dynamic Logic Rules (field visibility and requiredness) |
| 6 | Layout Guidance (recommended panel organization) |
| 7 | Implementation Notes |
| 8 | Open Issues |
| 9 | Decisions Made |
| 10 | Interview Transcript (condensed Q&A if decisions were needed) |

**Formatting:** Follow the generator template conventions — Arial
font, same color scheme and table formats as the process documents.
Heading 1 paragraphs have page break before.

---

## Entity Inventory Updates

After producing the Entity PRDs, update the Entity Inventory v1.4
to reflect the new Entity PRDs:

- Each of the seven entities should have its Entity PRD version
  updated from "Deferred" to "v1.0"
- No structural changes to the Entity Inventory are needed — all
  seven entities already have rows

**Output:** `PRDs/CBM-Entity-Inventory.docx` bumped to v1.5

---

## After This Session

Update `CLAUDE.md` to reflect:
- Seven new Entity PRDs at v1.0
- Entity Inventory bumped to v1.5
- Phase 2b Entity PRDs complete for all CR entities
- Next steps updated
