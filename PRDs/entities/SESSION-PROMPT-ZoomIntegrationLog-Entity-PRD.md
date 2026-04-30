# Session Prompt: ZoomIntegrationLog Entity PRD v1.0

## Context

I'm working on the CBM CRM implementation. We have just committed a Zoom Integration Architecture PRD (`PRDs/product/zoom-integration-architecture.md` v1.0 in the `dbower44022/crmbuilder` repo, commit `57caeb7`) that defines bidirectional integration between Events in the CRM and Zoom Webinars.

Section 2.3 of that architecture PRD specifies a new entity, **ZoomIntegrationLog**, which records bridge ↔ Zoom interactions where something went wrong. This entity is required by the integration's failure-visibility design (Section 6 of the architecture PRD).

This session produces the ZoomIntegrationLog Entity PRD — the implementation-ready specification for that entity.

Before doing any work, please:

1. Read `CLAUDE.md` in the `dbower44022/crmbuilder` repo
2. Read `CLAUDE.md` in the `dbower44022/ClevelandBusinessMentoring` repo
3. Read `PRDs/product/zoom-integration-architecture.md` in the `crmbuilder` repo (especially Section 2.3, Section 6, Section 7.4)
4. Read `PRDs/entities/generate-EventRegistration-Entity-PRD.js` in the `ClevelandBusinessMentoring` repo as the structural model — ZoomIntegrationLog is also a Custom Base entity with primarily system-populated fields and a similar shape

## What This Is

The ZoomIntegrationLog Entity PRD specifies a small, single-domain custom entity used exclusively by the Zoom integration bridge service to surface failed operations into the CRM UI. Operators (CBM staff with appropriate ACLs) view records of this entity to diagnose Zoom integration failures.

**Critical scoping facts:**

- This entity is **system-only**. No CRM user creates, edits, or deletes records directly. All records are created by the Zoom integration bridge service via API
- Records exist **only for failed operations**. Successful Zoom operations leave no trace in this entity (they live in the bridge's structured logs only)
- This entity is **single-domain** — owned by the CR domain (which owns the Event entity that the integration operates on). No multi-domain considerations apply
- This entity has **no type discriminator**, no dynamic logic visibility rules, and no lifecycle workflow — fields are static once written by the bridge

## Unlike Other Entity PRD Sessions

Most entity PRD sessions are interactive design sessions where decisions get made through discussion. **This session is not that.** Every design decision for ZoomIntegrationLog is already settled in Section 2.3 of the Zoom integration architecture PRD. Your job is to translate that fully-specified design into a generator file matching the established CBM entity PRD format. There is nothing to design, just to render.

If during the work you encounter a question that the architecture PRD does not answer, raise it before writing — do not invent.

## Deliverables

1. **New generator file:** `PRDs/entities/generate-ZoomIntegrationLog-Entity-PRD.js` in the `ClevelandBusinessMentoring` repo
2. **Generated docx:** `PRDs/entities/ZoomIntegrationLog-Entity-PRD.docx` in the same directory

Both committed in a single commit at the end.

## Generator File Structure

Model the file structure on `generate-EventRegistration-Entity-PRD.js`. Specifically:

- The same `ENTITY = { ... }` data block at the top
- The same rendering engine at the bottom (copied unchanged)
- The same field tuple format `[name, type, required, values, default, id, descriptionRuns]`
- The same overview/notes/decisions array shapes

## Specific Entity Content

### Document Metadata

- `orgName: "Cleveland Business Mentors"`
- `entityName: "Zoom Integration Log"`
- `version: "1.0"`
- `status: "Draft"`
- `lastUpdated:` the actual current date and time at the moment of generation, in `MM-DD-YY HH:MM` format
- `sourceDocuments: "Zoom Integration Architecture v1.0"`
- `outputFile: "/home/claude/cbm/PRDs/entities/ZoomIntegrationLog-Entity-PRD.docx"`

### Entity Overview (Section 1)

- `crmEntityName: "Zoom Integration Log"`
- `nativeOrCustom: "Custom"`
- `entityType: "Base"`
- `labelSingular: "Zoom Integration Log"`
- `labelPlural: "Zoom Integration Logs"`
- `activityStream: "No"`
- `primaryDomain: "Client Recruiting (CR)"`
- `contributingDomains: "Client Recruiting (CR)"`
- `discriminatorField: null`
- `discriminatorValues: null`

**Overview text** (four paragraphs):

1. "The Zoom Integration Log entity records failed operations from the Zoom integration bridge service. It exists exclusively to surface bridge ↔ Zoom failures into the CRM UI for operator diagnosis. It is a single-domain custom entity owned exclusively by the Client Recruiting (CR) domain, supporting the CR-EVENTS sub-domain's Zoom Webinar integration."

2. "Zoom Integration Log uses the Base entity type because it is a system-managed log record with no person, organization, calendar, or transactional semantics. Records are created by the Zoom integration bridge service via API; no CRM user creates, edits, or deletes records directly. The entity exists for read-only operator visibility through saved views and detail pages."

3. "Records exist only for failed operations. Successful Zoom operations (Webinar creation, registrant push, attendance capture, etc.) leave no trace in this entity — those are recorded in the bridge service's structured logs, which operators access separately when forensic detail is required. This design decision keeps the entity small (typical volume: a handful of records per month for a healthy integration) and the CRM signal-to-noise high."

4. "Zoom Integration Log records are never deleted by the system. Operators may delete records manually after a failure has been investigated and resolved, but the system does not auto-delete or auto-archive."

**Overview notes** (one note):

- `{ label: "Polymorphic parent:", text: " The parent field is a polymorphic belongsToParent relationship that links each log record to either an Event (for Webinar-level operations like createWebinar, updateWebinar, deleteWebinar, getAttendanceReport) or an Event Registration (for registrant-level operations like addRegistrant, cancelRegistrant, updateRegistrant). The bridge service determines which parent type is appropriate based on the operation that failed." }`

### Native Fields (Section 2)

Use the standard Custom Base entity native field set, identical to Event Registration:

- `name` (varchar) — auto-generated by the bridge service. See Implementation Note for the auto-generation pattern
- `createdAt` (datetime) — System
- `modifiedAt` (datetime) — System
- `assignedUser` (link) — System

`nativeFieldsIntro:` "The following fields already exist on the Zoom Integration Log entity because of its Base entity type. Custom Base entities have minimal native fields. These fields are not created by YAML."

`nativeFieldNotes:` one note explaining the auto-generated `name` pattern: `{ Operation } — { Parent Name } — { Last Attempt Timestamp }`. Examples:
- `"Push Registrant — John Smith — Q2 Workshop — 2026-04-30 14:30"`
- `"Get Attendance Report — Q2 Workshop — 2026-05-15 16:45"`

The bridge service composes the name; staff cannot edit it.

### Custom Fields (Section 3)

One field group, no sub-groupings.

**Heading:** `"3.1 Operation Tracking Fields"`
**Intro:** `"All custom fields are system-populated by the Zoom integration bridge service when a failure occurs or escalates. No field is editable by CRM users."`

**Fields** (in this order):

1. `operation` (enum, Required: Yes, Values: `createWebinar, updateWebinar, deleteWebinar, addRegistrant, cancelRegistrant, updateRegistrant, getAttendanceReport`, Default: —, ID: ZIL-DAT-001)
   - Description: "The Zoom API operation that failed. Maps to the seven operation types defined in the Zoom Integration Architecture PRD §6.1. Set when the log record is first created and never updated."
   - Domains: CR
   - Implementation: system-populated, readOnly

2. `status` (enum, Required: Yes, Values: `failedTransient, failedPermanent`, Default: —, ID: ZIL-DAT-002)
   - Description: "The current failure state. Set to `failedTransient` when the bridge service is still retrying the operation per the exponential-backoff retry policy (§6.1 of the Zoom Integration Architecture). Updated to `failedPermanent` when the retry budget is exhausted, at which point the failure-alert email is dispatched. The entity contains no `pending` or `success` records — successful operations are not persisted here."
   - Domains: CR
   - Implementation: system-populated; bridge service updates from `failedTransient` to `failedPermanent` on retry exhaustion

3. `parentType` (varchar, Required: Yes, Values: —, Default: —, ID: ZIL-DAT-003)
   - Description: "Entity type of the linked record — either `Event` or `Event Registration`. Set at creation. The bridge service determines the correct value based on the failed operation: Webinar-level operations link to Event; registrant-level operations link to Event Registration. Implemented as the discriminator side of a polymorphic belongsToParent relationship."
   - Domains: CR
   - Implementation: system-populated, readOnly

4. `parentId` (varchar, Required: Yes, Values: —, Default: —, ID: ZIL-DAT-004)
   - Description: "Record ID of the linked Event or Event Registration. Set at creation. Together with parentType, identifies the specific record the failed operation was acting on."
   - Domains: CR
   - Implementation: system-populated, readOnly

5. `attemptCount` (int, Required: Yes, Values: —, Default: 1, ID: ZIL-DAT-005)
   - Description: "Number of attempts the bridge service has made for this operation. Set to 1 when the record is first created (after the first failure). Incremented on each subsequent retry. The final value reflects the total attempts made before the operation either succeeded (in which case the record was deleted by the bridge service — see Implementation Note 2) or escalated to `failedPermanent`."
   - Domains: CR
   - Implementation: system-populated. Updated on each retry by the bridge service

6. `lastAttemptAt` (datetime, Required: Yes, Values: —, Default: —, ID: ZIL-DAT-006)
   - Description: "Timestamp of the most recent attempt. Updated on every retry. Used by the standard saved view (`Zoom — failures in last 7 days`) to filter recent failures."
   - Domains: CR
   - Implementation: system-populated. Updated on each retry

7. `failureReason` (text, Required: Yes, Values: —, Default: —, ID: ZIL-DAT-007)
   - Description: "Human-readable failure message extracted from the Zoom API response or the bridge service's exception handler. Sensitive data (credentials, access tokens, registrant emails, registrant full names) is redacted by the bridge service's log filter before this field is written. Updated on each retry to reflect the most recent failure cause (which may differ across retries — e.g., first attempt fails with timeout, second with rate limit)."
   - Domains: CR
   - Implementation: system-populated. Updated on each retry. PII redacted by bridge filter

8. `zoomRequestId` (varchar, Required: No, Values: —, Default: —, ID: ZIL-DAT-008)
   - Description: "Zoom's `x-zm-trackingid` response header value when the failure response included one. Useful for correlating with Zoom support tickets when a permanent failure requires escalation to Zoom. Empty for failures where no Zoom response was received (e.g., network timeout, signature verification failure on inbound webhook)."
   - Domains: CR
   - Implementation: system-populated

### Relationships (Section 4)

`relationshipsIntro:` "All relationships involving the Zoom Integration Log entity. The polymorphic parent relationship is the single relationship; it links each log record to either Event or Event Registration depending on the operation that failed."

**Relationships:**

- `["Zoom Integration Log → Event", "Event", "belongsToParent (polymorphic)", "ZIL-DAT-003 / ZIL-DAT-004", "CR"]`
- `["Zoom Integration Log → Event Registration", "Event Registration", "belongsToParent (polymorphic)", "ZIL-DAT-003 / ZIL-DAT-004", "CR"]`

**Relationship notes** (one note):

- `{ label: "Polymorphic parent semantics:", text: " The parent relationship uses the platform's belongsToParent / hasChildren polymorphic pattern. parentType discriminates the target entity; parentId references the specific record. Both Event and Event Registration entities will have a hasChildren relationship to Zoom Integration Log on their respective detail views (related records panel) so operators can see all failed operations linked to a specific Event or registration." }`

### Dynamic Logic Rules (Section 5)

`dynamicLogicIntro:` "Zoom Integration Log has no type discriminator and no conditional fields. All fields are always visible. There are no dynamic logic visibility rules."

`dynamicLogicSections:` empty array `[]`

### Layout Guidance (Section 6)

`layoutIntro:` "The following panel grouping is a recommendation for the Zoom Integration Log detail view. Final layout is determined during YAML generation. All fields are read-only on the detail view; the Edit action should be disabled or hidden."

**Layout panels:**

1. `"Overview Panel"` — `"name (read-only, auto-generated), operation, status, lastAttemptAt, attemptCount."`
2. `"Failed Record Panel"` — `"parent (polymorphic link to Event or Event Registration), parentType, parentId. Click-through to the linked record for context."`
3. `"Failure Detail Panel"` — `"failureReason (full-width display), zoomRequestId."`

### Implementation Notes (Section 7)

**Notes:**

1. **Name auto-generation:** "The `name` field is composed by the bridge service when the record is created using the pattern `{ Operation Display Label } — { Parent Display Name } — { lastAttemptAt formatted as YYYY-MM-DD HH:MM }`. Operation display labels are: createWebinar → 'Create Webinar', updateWebinar → 'Update Webinar', deleteWebinar → 'Delete Webinar', addRegistrant → 'Push Registrant', cancelRegistrant → 'Cancel Registrant', updateRegistrant → 'Update Registrant', getAttendanceReport → 'Get Attendance Report'. Parent display name comes from Event.name or a composed `{Contact.name} — {Event.name}` for Event Registration parents."

2. **Record lifecycle:** "Records are created by the bridge service after the first failure of an operation. On each retry, the existing record is updated (attemptCount, lastAttemptAt, failureReason, status). If a subsequent retry succeeds, the bridge service deletes the record (the failure was transient and ultimately resolved). If retries are exhausted, status escalates to `failedPermanent` and the record persists for operator review. Operators may delete records manually after investigation; the system does not auto-archive."

3. **PII and credential redaction:** "The bridge service applies a redaction filter before writing to the failureReason field. The filter strips: any 32-byte hex token (heuristic for Zoom access tokens), substring matches against known credential environment variable values (ZOOM_CLIENT_SECRET, ZOOM_WEBHOOK_SECRET_TOKEN, ESPOCRM_API_KEY, ESPOCRM_WEBHOOK_SECRET), Authorization header values, and PII fields (registrant email, full name, phone) when they appear in error payloads. See Zoom Integration Architecture §9.5."

4. **ACL configuration:** "Read access to Zoom Integration Log records should be restricted to staff users with operational responsibility for the Zoom integration (typically the Content and Event Administrator role). Other staff roles should not have read access — failure messages may reference Event or registrant context that is not relevant to their day-to-day work. Edit and Delete on Zoom Integration Log records should be granted only to admin-level users; the integration bridge service holds Create and Edit permissions via its dedicated API user (zoom-bridge)."

5. **Saved views:** "CRM Builder provisions two saved views during deployment per Section 7.4 of the Zoom Integration Architecture: `Zoom — failures in last 7 days` (filter: `lastAttemptAt >= today-7d`, since the entity contains failures only) and `Zoom — permanent failures (open)` (filter: `status = failedPermanent`). Both views are visible to operators with the appropriate ACL."

6. **Email alerting:** "When a record's status escalates from `failedTransient` to `failedPermanent`, the bridge service sends an email alert to the address configured in `bridgeService.alertEmail` (CBM uses `events-admin@cbm.org`). The email includes the operation, parent record summary, failure reason, and a deep link to the Zoom Integration Log record in the CRM. Operators triage from the email and act on the record in the CRM UI. Alert dispatch is the bridge service's responsibility, not the CRM's — the CRM does not need to configure or run any email automation for this."

7. **Retention:** "No automatic retention policy is enforced in v1.0. Records persist until manually deleted by an operator. If retention becomes a concern, a future revision could add a `resolvedAt` timestamp and a workflow that auto-archives records older than 90 days from `resolvedAt`. Out of scope for v1.0."

8. **Product name restriction:** "This document is a Level 2 Entity PRD. The platform name 'Zoom' appears throughout because Zoom is a fundamental design constraint of this entity (the entity exists to log Zoom-specific failures and has no abstract reusable form). Other product names (CRM platform, email platform, recording platform) do not appear and use generic terminology."

### Open Issues (Section 8)

None. All decisions are settled in the Zoom Integration Architecture PRD.

```javascript
openIssues: []
```

### Decisions Made (Section 9)

1. `["ZIL-DEC-001", "Failure-only persistence. Successful Zoom operations are not recorded in this entity (they live in the bridge service's structured logs only). This decision keeps the entity small and CRM signal-to-noise high. The trade-off accepted: a complete audit trail of every Zoom operation is not visible in the CRM, only failures. Forensic detail for successful operations requires accessing the bridge structured logs separately."]`

2. `["ZIL-DEC-002", "Base entity type chosen over Event or other types. The entity is a system-managed log record with no person, organization, calendar, or transactional semantics. Base provides the minimal native field set appropriate for this use."]`

3. `["ZIL-DEC-003", "Polymorphic parent relationship to support both Webinar-level and registrant-level operations. parentType discriminates between Event and Event Registration. The bridge service sets the correct parent type based on the operation that failed. Both parent entities show a hasChildren related records panel for operator visibility."]`

4. `["ZIL-DEC-004", "No activity stream. The entity is system-populated and never user-edited; activity stream adds overhead without value."]`

5. `["ZIL-DEC-005", "System-only ACL posture. The integration bridge service is the only writer. CRM users (operators) have read access only; manual delete restricted to admin-level users. Edit is not granted to anyone — fields are immutable once written by the bridge except for the bridge's own retry-driven updates."]`

6. `["ZIL-DEC-006", "Two-state status enum (failedTransient, failedPermanent). The architecture's full operation lifecycle includes pending and success states, but those are bridge-internal — they never produce a record in this entity. failedTransient indicates a record currently in retry; failedPermanent indicates retry exhaustion. This avoids creating records that exist only briefly during normal retry windows."]`

7. `["ZIL-DEC-007", "Operator email alerts on permanent failures only. Transient failures that resolve via retry produce no email noise; only failures requiring human action trigger alerts. The bridge service's alertOnFailureClass YAML setting (defaulted to [failedPermanent]) controls this and could be widened for high-stakes deployments without entity changes."]`

## Verification

After generating the docx:

1. Run the docx skill validator on the output
2. Run `pandoc PRDs/entities/ZoomIntegrationLog-Entity-PRD.docx -t plain --wrap=none | head -200` and verify:
   - Document title page shows version 1.0 and a current Last Updated timestamp
   - All eight custom fields are present with the correct IDs (ZIL-DAT-001 through ZIL-DAT-008)
   - Both polymorphic relationship rows are present
   - Section 5 contains the "no dynamic logic" intro and an empty section list
   - Three layout panels are present
   - Eight implementation notes are present
   - Open Issues section is empty (or shows "None")
   - Seven decisions are present (ZIL-DEC-001 through ZIL-DEC-007)

3. Diff the new generator against `generate-EventRegistration-Entity-PRD.js` to confirm the rendering engine at the bottom is byte-identical (only the ENTITY object differs).

## Output Location

Both files commit to `PRDs/entities/` in the `dbower44022/ClevelandBusinessMentoring` repo:

- `PRDs/entities/generate-ZoomIntegrationLog-Entity-PRD.js`
- `PRDs/entities/ZoomIntegrationLog-Entity-PRD.docx`

Suggested commit message:

```
Add ZoomIntegrationLog Entity PRD v1.0

New entity required by the Zoom Integration Architecture
(crmbuilder commit 57caeb7) for failure visibility. Records
failed Zoom API operations (createWebinar, addRegistrant,
getAttendanceReport, etc.) so operators can diagnose and act
on integration failures from within the CRM.

Single-domain (CR), Custom Base entity, system-only-populated.
Eight custom fields capture the operation, status (transient or
permanent failure), polymorphic parent (Event or Event
Registration), retry count, attempt timestamp, redacted failure
message, and Zoom request ID for support correlation.

Records exist only for failed operations; successful Zoom
operations leave no trace in this entity (structured logs only).
This is the third and final downstream task from Section 10.1
of the Zoom Integration Architecture PRD.

Companions:
- UPDATE-PROMPT-Event-Entity-v1.1.md (commit 3b6c42d)
- UPDATE-PROMPT-EventRegistration-Entity-v1.1.md (commit f828a87)

When all three downstream tasks are executed (this prompt plus
the two UPDATE-PROMPTs), the CBM data model will be fully
prepared for Zoom integration deployment.
```

## After This Session

When the docx is committed, **all three downstream tasks from the Zoom Integration Architecture PRD's Section 10.1 will be complete** (in prompt form, ready for execution). Doug then runs the three prompts via Claude Code at his discretion to produce the actual updated/new docx files. Once those land, the CBM data model is fully prepared for Zoom integration deployment.
