# Update Prompt: Event Entity PRD v1.1 — Add Zoom Webinar Integration Fields

## Context

I'm working on the CBM CRM implementation. We have just committed a Zoom Integration Architecture PRD (`PRDs/product/zoom-integration-architecture.md` v1.0 in the `dbower44022/crmbuilder` repo, commit `57caeb7`) that defines bidirectional integration between Events in the CRM and Zoom Webinars.

The Zoom integration assumes new fields exist on the Event entity. This update adds those fields and updates two existing field descriptions to reflect the integration as the system that populates them. **No other changes** to the Event entity in this revision.

Before doing any work, please:

1. Read `CLAUDE.md` in the `dbower44022/crmbuilder` repo
2. Read `CLAUDE.md` in the `dbower44022/ClevelandBusinessMentoring` repo
3. Read `PRDs/product/zoom-integration-architecture.md` in the `crmbuilder` repo (for context on what the integration does and why these fields are needed)
4. Read the current generator at `PRDs/entities/generate-Event-Entity-PRD.js` in the `ClevelandBusinessMentoring` repo

## What to Change

Edit `PRDs/entities/generate-Event-Entity-PRD.js`. Then run it to regenerate `PRDs/entities/Event-Entity-PRD.docx`.

### 1. Document Metadata

- Change `version` from `"1.0"` to `"1.1"`
- Change `lastUpdated` to the actual current date and time at the moment of edit, in `MM-DD-YY HH:MM` format
- Change `sourceDocuments` to append: `, Zoom Integration Architecture v1.0`

### 2. Add Four New Custom Fields

Add a new custom field group, placed as Section 3.5 (after the existing 3.4 Attachments group), titled **"3.5 Zoom Integration"**. Use this exact intro text:

> The following fields support automated Zoom Webinar integration for Events with format = Virtual or Hybrid. All four fields are system-populated by the Zoom integration bridge service and are read-only in the CRM UI. Visibility of these fields is driven by format via dynamic logic (Section 5).

The four fields, in this order, with these exact descriptions:

#### `zoomWebinarId`

- Type: `varchar`
- Required: `No`
- Values: `—`
- Default: `—`
- ID: `CR-EVENTS-MANAGE-DAT-034`
- Description text:
  - "The Zoom-side Webinar ID, system-populated by the Zoom integration bridge service when the Event transitions Draft → Scheduled. Empty for Events with format = In-Person or for Events still in Draft. Read-only after population. "
  - **Visibility:** "format = Virtual or Hybrid AND status ≠ Draft. "
  - **Domains:** "CR. "
  - **Implementation:** "system-populated, readOnly. See Zoom Integration Architecture v1.0 §5.1."

#### `zoomHostEmail`

- Type: `varchar`
- Required: `No`
- Values: `—`
- Default: `—`
- ID: `CR-EVENTS-MANAGE-DAT-035`
- Description text:
  - "The Zoom user under whose account the Webinar was created, system-populated by the Zoom integration bridge service from connector configuration. All Webinars are hosted by a single configured Zoom user regardless of which CRM coordinator created the Event. Read-only. "
  - **Visibility:** "format = Virtual or Hybrid AND status ≠ Draft. "
  - **Domains:** "CR. "
  - **Implementation:** "system-populated, readOnly."

#### `attendanceCapturedAt`

- Type: `datetime`
- Required: `No`
- Values: `—`
- Default: `—`
- ID: `CR-EVENTS-MANAGE-DAT-036`
- Description text:
  - "Timestamp set by the Zoom integration bridge service when the post-Webinar attendance capture flow completes successfully. A non-null value indicates that EventRegistration.attendanceStatus has been written for all participants. Acts as the idempotency key — subsequent inbound triggers (Zoom webhook OR polling safety net) are no-ops once this field is set. Read-only. "
  - **Visibility:** "format = Virtual or Hybrid AND status = Completed. "
  - **Domains:** "CR. "
  - **Implementation:** "system-populated, readOnly. See Zoom Integration Architecture v1.0 §5.7."

#### `zoomLastSyncedAt`

- Type: `datetime`
- Required: `No`
- Values: `—`
- Default: `—`
- ID: `CR-EVENTS-MANAGE-DAT-037`
- Description text:
  - "Timestamp updated by the Zoom integration bridge service after every successful outbound sync of Event field changes (name, dateStart, duration, description, timezone) to the Zoom Webinar. Lets operators see when the Webinar was last reconciled with the CRM record. Read-only. "
  - **Visibility:** "format = Virtual or Hybrid AND status ≠ Draft. "
  - **Domains:** "CR. "
  - **Implementation:** "system-populated, readOnly. See Zoom Integration Architecture v1.0 §5.2."

### 3. Update Existing Field Descriptions

Two existing fields in **Section 3.2 Venue and Access** need their descriptions updated to specify that the Zoom integration is the populating system. Do not change the field type, required, values, default, or ID — only update the description text.

#### `virtualMeetingUrl` (CR-EVENTS-MANAGE-DAT-028)

Replace the existing description with:

- "Meeting platform URL. For Events with format = Virtual or Hybrid, this field is system-populated by the Zoom integration bridge service when the Event transitions Draft → Scheduled — set to the Zoom Webinar's join URL. Visible via dynamic logic when format is Virtual or Hybrid. Required when format is Virtual or Hybrid and the Event is transitioning to Scheduled (the Zoom integration satisfies this requirement automatically; for non-Zoom virtual platforms, the field must be populated manually). "
- **Visibility:** "format = Virtual or Hybrid. "
- **Domains:** "CR. "
- **Implementation:** "system-populated by Zoom integration when configured; otherwise manually populated. See Zoom Integration Architecture v1.0 §5.1."

#### `registrationUrl` (CR-EVENTS-MANAGE-DAT-029)

Replace the existing description with:

- "Public-facing URL for the registration form. For Events with format = Virtual or Hybrid, this field is system-populated by the Zoom integration bridge service when the Event transitions Draft → Scheduled (the Zoom Webinar's public registration URL). For Events with format = In-Person, the field is system-populated by the CRM-native registration form mechanism on the same transition (EVT-DEC-008). Visible via dynamic logic when Event status is not Draft. "
- **Visibility:** "status ≠ Draft. "
- **Domains:** "CR. "
- **Implementation:** "system-populated, readOnly. Population source depends on format. See Zoom Integration Architecture v1.0 §5.1."

### 4. Update Dynamic Logic Section 5.1 (Format-Driven Field Visibility)

In `dynamicLogicSections`, find the section with heading `"5.1 Format-Driven Field Visibility"`. Update its bullets to add the four new Zoom fields to the Virtual and Hybrid cases. The bullets should become:

- `format = In-Person:` — "Show location. Hide virtualMeetingUrl, recordingUrl, zoomWebinarId, zoomHostEmail, attendanceCapturedAt, zoomLastSyncedAt."
- `format = Virtual:` — "Show virtualMeetingUrl, recordingUrl, zoomWebinarId, zoomHostEmail, attendanceCapturedAt, zoomLastSyncedAt. Hide location."
- `format = Hybrid:` — "Show location, virtualMeetingUrl, recordingUrl, zoomWebinarId, zoomHostEmail, attendanceCapturedAt, zoomLastSyncedAt."

(The Zoom fields also have additional `status ≠ Draft` or `status = Completed` visibility conditions documented in Section 3.5, but Section 5.1 only addresses format-driven visibility. The status-driven conditions layer on top of format-driven visibility.)

### 5. Add a New Dynamic Logic Subsection 5.4 — Zoom-Specific Status-Driven Visibility

Add a new section to `dynamicLogicSections` after the existing 5.3:

- Heading: `"5.4 Zoom Field Status-Driven Visibility"`
- Paragraphs:
  - "In addition to the format-driven visibility in 5.1, the Zoom integration fields have status-driven visibility that layers on top:"
- Bullets:
  - `zoomWebinarId, zoomHostEmail, zoomLastSyncedAt:` — "visible only when status ≠ Draft (these fields are populated at the Draft → Scheduled transition)."
  - `attendanceCapturedAt:` — "visible only when status = Completed (this field is populated only after the Webinar has ended and attendance has been captured)."

### 6. Update Layout Panels (Section 6)

In `layoutPanels`, find the panel `"Venue and Access Panel"`. Replace its `text` value with:

> "location (visible when In-Person or Hybrid), virtualMeetingUrl (visible when Virtual or Hybrid), registrationUrl (visible when status ≠ Draft), recordingUrl (visible when Virtual or Hybrid). Format-driven visibility."

(No actual change here — this is the existing text. Verify it matches exactly; do not modify.)

Add a new panel after "Documents Panel" and before "Registrations Panel":

- Name: `"Zoom Integration Panel"`
- Text: `"zoomWebinarId, zoomHostEmail, zoomLastSyncedAt (visible when format = Virtual or Hybrid AND status ≠ Draft), attendanceCapturedAt (visible when format = Virtual or Hybrid AND status = Completed). All fields read-only and system-populated by the Zoom integration bridge service."`

### 7. Add a New Implementation Note

Add a new entry to `implementationNotes` as item 11 (after the existing item 10):

- Label: `"11. Zoom integration field provisioning:"`
- Text: `" The four Zoom integration fields (zoomWebinarId, zoomHostEmail, attendanceCapturedAt, zoomLastSyncedAt) are provisioned by CRM Builder when the deployment YAML includes a zoomConfig block. For deployments without Zoom integration, these fields are not provisioned. The integration logic is documented in PRDs/product/zoom-integration-architecture.md v1.0 in the crmbuilder repo. Dependencies between these fields and the existing virtualMeetingUrl and registrationUrl fields are documented in §5.1 and §5.7 of that architecture."`

Renumber any subsequent items if any are added in the future. (Currently item 10 is the last existing item; the new note becomes item 11.)

### 8. Add Two New Decisions

Append these two entries to the `decisions` array:

- `["EVT-DEC-011", "Zoom integration fields are provisioned only for deployments with Zoom integration enabled. The four fields (zoomWebinarId, zoomHostEmail, attendanceCapturedAt, zoomLastSyncedAt) and the system-populated semantics on virtualMeetingUrl and registrationUrl are conditional on the deployment YAML including zoomConfig. For non-Zoom deployments, virtualMeetingUrl and registrationUrl remain manually populated as documented in v1.0 of this PRD."]`

- `["EVT-DEC-012", "registrationUrl population source depends on format. For Virtual/Hybrid Events with Zoom integration enabled, the Zoom Webinar's registration URL is the value. For In-Person Events (or Virtual/Hybrid without Zoom integration), the value is generated by the CRM-native registration mechanism. The field's read-only behavior and dynamic-logic visibility (status ≠ Draft) are unchanged from v1.0."]`

## What NOT to Change

- Native fields (Section 2)
- Existing custom fields in 3.1, 3.3, 3.4 — unchanged
- The existing entries in 3.2 (`venueCapacity`, `location`, `recordingUrl`) — unchanged
- Relationships (Section 4) — unchanged
- Dynamic logic Section 5.2 (`status ≠ Draft → show registrationUrl`) — unchanged
- Dynamic logic Section 5.3 (Draft-to-Scheduled transition requirements) — unchanged
- Layout panels other than the Venue and Access Panel verification and the new Zoom Integration Panel
- Open issues — unchanged
- Existing decisions EVT-DEC-001 through EVT-DEC-010 — unchanged

## Verification

After regenerating the docx:

1. Run the docx skill validator on the output
2. Run `pandoc PRDs/entities/Event-Entity-PRD.docx -t plain --wrap=none | head -300` and verify:
   - Document title page shows version 1.1 and the updated Last Updated timestamp
   - Section 3.5 "Zoom Integration" exists with the four new fields and their descriptions
   - The two updated field descriptions in Section 3.2 (`virtualMeetingUrl`, `registrationUrl`) reference the Zoom integration
   - Section 5.4 exists
   - The Zoom Integration Panel appears in Section 6
   - Implementation Note 11 exists
   - Decisions EVT-DEC-011 and EVT-DEC-012 exist

3. Diff against the v1.0 generator to confirm only the changes listed above are present (no incidental edits to native fields, relationships, or other unrelated content).

## Output Location

The regenerated file lands in `PRDs/entities/Event-Entity-PRD.docx`. Commit both the updated generator and the regenerated docx in a single commit. Suggested commit message:

```
Event Entity PRD v1.1 — add Zoom Webinar integration fields

Adds four system-populated fields supporting the Zoom Integration
Architecture (crmbuilder commit 57caeb7):
- zoomWebinarId
- zoomHostEmail
- attendanceCapturedAt
- zoomLastSyncedAt

Updates virtualMeetingUrl and registrationUrl descriptions to
specify the Zoom integration as the populating system for
Virtual/Hybrid Events. Adds Section 5.4 (Zoom-specific status
visibility), a Zoom Integration layout panel, Implementation
Note 11, and decisions EVT-DEC-011 and EVT-DEC-012.

No changes to native fields, relationships, or any
non-Zoom-related content.
```
