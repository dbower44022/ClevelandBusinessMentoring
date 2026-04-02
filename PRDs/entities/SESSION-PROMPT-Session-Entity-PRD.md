# Session Prompt: CBM Session Entity PRD (Phase 2b)

## Context

I'm working on the CBM CRM implementation. Entity Discovery (Phase 2a) is complete — the Entity Inventory v1.0 establishes that Session is a custom Event-type entity owned by the Mentoring (MN) domain. The Contact Entity PRD v1.0, Account Entity PRD v1.0, and Engagement Entity PRD v1.0 are complete.

This session produces the Session Entity PRD — the implementation-ready specification for the Session entity.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Entity Definition guide at `PRDs/process/interviews/guide-entity-definition.md` in the crmbuilder repo (Phase 2b section)
3. Read the Entity PRD generator template at `PRDs/process/templates/generate-entity-prd-template.js` in the crmbuilder repo
4. Read all documents uploaded with this prompt

## What This Is

The Session Entity PRD consolidates everything needed for YAML generation for the Session entity:

* All fields from all process documents that contribute to this entity
* Native vs. custom designation per field (Event type has dateStart, dateEnd, duration, and status natively — these overlap with Session fields)
* Relationships to other entities (Engagement, Contact)
* Implementation notes for status transitions, conditional fields, and session summary automation

## Current State

Session is a single-domain custom entity — the child entity to Engagement in the MN domain. It represents individual mentoring meetings within an engagement. All Session fields are defined in a single process document (MN-ENGAGE), making this a simpler entity than Engagement.

**Key design decisions from prior Entity PRDs:**

* Engagement Entity PRD (ENG-DEC-003): Session roll-up fields on Engagement (totalSessions, totalSessionsLast30Days, lastSessionDate, totalSessionHours, nextSessionDateTime) are workflow-updated stored fields. The workflow fires on Session status changes — this means Session status transitions must trigger Engagement roll-up updates.
* Contact Entity PRD: Defines Mentor Attendees → Session (manyToMany) and Client Attendees → Session (manyToMany) relationships.
* Engagement Entity PRD: Defines Engagement → Sessions (oneToMany) relationship.

**Available field-level data:**

All Session fields come from **MN-ENGAGE** (the Engagement Management process), consolidated in the MN Domain PRD Section 4:
* **MN-ENGAGE-DAT-023:** Session Date/Time (datetime)
* **MN-ENGAGE-DAT-024:** Status (enum — Scheduled, Completed, Canceled by Client, Canceled by Mentor, Missed by Client, Rescheduled by Client, Rescheduled by Mentor)
* **MN-ENGAGE-DAT-025:** Duration (int, minutes — required when Completed)
* **MN-ENGAGE-DAT-026:** Session Type (enum — In-Person, Video Call, Phone Call — required when Completed)
* **MN-ENGAGE-DAT-027:** Meeting Location Type (enum — Organization Office, Client's Place of Business, Other — required when In-Person)
* **MN-ENGAGE-DAT-028:** Location Details (varchar — shown when Meeting Location Type = Other)
* **MN-ENGAGE-DAT-029:** Topics Covered (multiEnum — TBD values, see MN-ENGAGE-ISS-002)
* **MN-ENGAGE-DAT-030:** Session Notes (wysiwyg — mentor notes, may be shared with client in session summary)
* **MN-ENGAGE-DAT-031:** Next Steps (wysiwyg — follow-up items, may be included in session summary email)
* **MN-ENGAGE-DAT-033:** Next Session Date/Time (datetime — triggers calendar event, meeting request, and next Session creation when set on a Completed session)
* **MN-ENGAGE-DAT-034:** Mentor Attendees (relationship many — at least one required for Completed)
* **MN-ENGAGE-DAT-035:** Client Attendees (relationship many — at least one required for Completed)

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
2. **CBM-Domain-PRD-Mentoring.docx** — the MN Domain PRD (from `PRDs/MN/` in CBM repo)
3. **Engagement-Entity-PRD.docx** — the Engagement Entity PRD (from `PRDs/entities/` in CBM repo)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)

The Account Entity PRD is not required as a separate upload — Session has no direct relationship to Account. The Engagement-to-Account relationship is already defined in the Engagement Entity PRD.

## Efficiency Improvements

This session uses the same two improvements from prior Entity PRDs:

### 1. Batched Decisions

Session is a single-domain entity with no type discriminator and all fields from a single process (MN-ENGAGE). Compile the full field inventory and present in two buckets:

* **Straightforward** — fields where the name, type, and requirements are clear from the source documents (confirm as a group)
* **Needs discussion** — fields where there are design questions (native vs. custom field overlap, conditional requirements, automation triggers)

### 2. Generator Template

Use the Entity PRD generator template. Same workflow as prior Entity PRDs:
1. Copy the template to a working file
2. Replace the ENTITY object with Session-specific data
3. Run with Node.js to generate the .docx
4. Validate with the docx validation script
5. Commit to `PRDs/entities/Session-Entity-PRD.docx` in the CBM repo

## Key Questions to Resolve

1. **Native vs. custom field overlap (the big one).** The Event entity type provides native fields: dateStart, dateEnd, duration, and status. The MN Domain PRD defines Session Date/Time (DAT-023), Duration (DAT-025), and Status (DAT-024). Which PRD fields map to native Event fields, and which need custom implementations? Specifically:
   - Does Session Date/Time map to native dateStart?
   - Does Duration map to native duration (or is the native duration calculated from dateStart/dateEnd)?
   - Does the native Event status field support the 7 custom session status values, or does Session need a custom status enum?
2. **The native `name` field.** Event type inherits from Base, so it has a `name` field. What should Session's name contain? Auto-generated like Engagement?
3. **Next Session Date/Time (DAT-033) — is this on Session or Engagement?** The MN Domain PRD lists it under Session entity (DAT-033) AND under Engagement entity (DAT-022). Are these the same field duplicated, or two separate fields (one on the Session where it was entered, one propagated to the Engagement)?
4. **Session summary email automation.** MN-ENGAGE-REQ-003 requires a draft session summary email. Session Notes and Next Steps "may be shared/included" in the summary. Is there a field controlling whether these are included, or is it always included when populated?
5. **Rescheduling mechanics.** The Domain PRD states rescheduled sessions preserve the original record and create a new session. Is there a relationship between the original and rescheduled session (e.g., a "Rescheduled From" link)?

## Output

Produce the Session Entity PRD as a Word document using the generator template and commit to: `PRDs/entities/Session-Entity-PRD.docx` in the CBM repo.

## After This Session

The remaining Entity PRDs are for entities outside the MN domain: Partnership Agreement (CR), Event (CR), Event Registration (CR), Contribution (FU), and Fundraising Campaign (FU). These depend on their respective domain process documents, which have not yet been completed. The next major work item after Session is likely beginning the Mentor Recruitment (MR) domain process documents.
