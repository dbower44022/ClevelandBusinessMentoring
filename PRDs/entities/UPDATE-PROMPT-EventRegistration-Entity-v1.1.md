# Update Prompt: Event Registration Entity PRD v1.1 — Zoom Webinar Integration Changes

## Context

I'm working on the CBM CRM implementation. We have just committed a Zoom Integration Architecture PRD (`PRDs/product/zoom-integration-architecture.md` v1.0 in the `dbower44022/crmbuilder` repo, commit `57caeb7`) that defines bidirectional integration between Events in the CRM and Zoom Webinars.

The Zoom integration assumes one new field exists on the Event Registration entity (`zoomRegistrantId`) and updates the semantics of two existing fields (`attendanceStatus`, `registrationSource`) to document Zoom-driven writebacks. **No other changes** to the Event Registration entity in this revision.

This update is a companion to `UPDATE-PROMPT-Event-Entity-v1.1.md` (committed in the same repo) which adds the corresponding fields on the Event entity.

Before doing any work, please:

1. Read `CLAUDE.md` in the `dbower44022/crmbuilder` repo
2. Read `CLAUDE.md` in the `dbower44022/ClevelandBusinessMentoring` repo
3. Read `PRDs/product/zoom-integration-architecture.md` in the `crmbuilder` repo (for context on what the integration does and why these changes are needed)
4. Read the current generator at `PRDs/entities/generate-EventRegistration-Entity-PRD.js` in the `ClevelandBusinessMentoring` repo

## What to Change

Edit `PRDs/entities/generate-EventRegistration-Entity-PRD.js`. Then run it to regenerate `PRDs/entities/EventRegistration-Entity-PRD.docx`.

### 1. Document Metadata

- Change `version` from `"1.0"` to `"1.1"`
- Change `lastUpdated` to the actual current date and time at the moment of edit, in `MM-DD-YY HH:MM` format
- Change `sourceDocuments` to append: `, Zoom Integration Architecture v1.0`

### 2. Add One New Custom Field

Add a new custom field group, placed as Section 3.5 (after the existing 3.4 Cancellation group), titled **"3.5 Zoom Integration"**. Use this exact intro text:

> The following field supports automated Zoom Webinar integration for Event Registrations whose parent Event has format = Virtual or Hybrid. The field is system-populated by the Zoom integration bridge service and is read-only in the CRM UI.

The single new field:

#### `zoomRegistrantId`

- Type: `varchar`
- Required: `No`
- Values: `—`
- Default: `—`
- ID: `CR-EVENTS-MANAGE-DAT-045`
- Description text:
  - "The Zoom-side registrant ID, system-populated by the Zoom integration bridge service after the registration is successfully pushed to the Zoom Webinar. Empty for Event Registrations whose parent Event has format = In-Person, for Event Registrations created against an Event whose Webinar has not yet been provisioned (queued in the bridge backlog and populated when the Webinar is created), and for Walk-In registrations created from the post-Webinar attendance reconciliation flow (those registrations have no corresponding Zoom registrant). Read-only after population. "
  - **Domains:** "CR. "
  - **Implementation:** "system-populated, readOnly. See Zoom Integration Architecture v1.0 §5.3 (registrant push) and §5.5 (registration cancellation)."

### 3. Update Existing `attendanceStatus` Field Description

In Section 3.1 Core Registration Fields, find the field `attendanceStatus` (CR-EVENTS-MANAGE-DAT-038). Replace its existing description with:

- "The attendance state of this registration. Defaults to Registered for Online registrations and to Attended for Walk-In registrations. Updated by one of three pathways: (1) the Content and Event Administrator via bulk-update actions during or after the event (Mark Selected as Attended, Mark Remaining as No-Show); (2) staff-initiated cancellations setting this to Cancelled (EVREG-DEC-001); or (3) for parent Events with format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service writing Attended or No-Show automatically after the Webinar ends (write-once: the bridge service does not overwrite a value already set by staff). Setting attendanceStatus to Cancelled on a registration that has been pushed to Zoom additionally triggers the bridge service to cancel the registrant in Zoom (Zoom sends the cancellation email automatically). "
- **Domains:** "CR. "
- **Implementation:** "default varies by creation pathway. Bulk-action and Zoom-driven writes are write-once — neither overwrites a value already set by the other or by staff."

### 4. Update Existing `registrationSource` Field Description

In Section 3.1 Core Registration Fields, find the field `registrationSource` (CR-EVENTS-MANAGE-DAT-037). Replace its existing description with:

- "The pathway through which the registration was created. Online is set by the public registration form; Walk-In is set by the Add Walk-In action on the Event detail view. For Events with format = Virtual or Hybrid and Zoom integration enabled, Walk-In is also set by the Zoom integration bridge service when the post-Webinar attendance reconciliation finds a Zoom participant whose email matches an existing Contact but who has no corresponding Event Registration — the bridge service creates the Event Registration with registrationSource = Walk-In and attendanceStatus = Attended. Walk-In registrations (regardless of source) do not trigger a confirmation email and have no zoomRegistrantId (they are created after the Webinar has already ended). "
- **Domains:** "CR. "
- **Implementation:** "system-set at creation based on creation pathway, readOnly thereafter."

### 5. Update Overview Notes (Section 1)

In `overviewNotes`, replace the existing single note with two notes (the existing one plus a new one for the Zoom-driven creation pathway):

```javascript
overviewNotes: [
  { label: "Creation pathways:", text: " Event Registrations are created through three pathways: (1) the public online registration form (registrationSource = Online, attendanceStatus defaults to Registered), (2) the Add Walk-In action on the Event detail view (registrationSource = Walk-In, attendanceStatus defaults to Attended), and (3) for Events with format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service auto-creating Walk-In registrations from post-Webinar attendance reports for Zoom participants whose email matches an existing Contact but who had no pre-existing Event Registration (registrationSource = Walk-In, attendanceStatus = Attended). All three pathways create or match a Contact record and link it to the Event." },
  { label: "Zoom integration writes:", text: " For Event Registrations whose parent Event has format = Virtual or Hybrid and Zoom integration enabled, the Zoom integration bridge service writes to three fields automatically: zoomRegistrantId is populated when the registration is pushed to the Zoom Webinar (Section 3.5); attendanceStatus is set to Attended or No-Show after the Webinar ends, write-once and only on Event Registrations not already in a terminal status (Cancelled, Attended, or No-Show); and the integration cancels the Zoom-side registrant when attendanceStatus is set to Cancelled by staff (Zoom sends the cancellation email)." },
],
```

### 6. Update Layout Panels (Section 6)

In `layoutPanels`, append a new panel after the existing "Cancellation Panel":

- Name: `"Zoom Integration Panel"`
- Text: `"zoomRegistrantId (read-only). Visible only when the parent Event has format = Virtual or Hybrid. Field is empty until the registration is pushed to the Zoom Webinar by the bridge service."`

### 7. Add a New Implementation Note

Add a new entry to `implementationNotes` as item 10 (after the existing item 9):

- Label: `"10. Zoom integration field provisioning:"`
- Text: `" The zoomRegistrantId field is provisioned by CRM Builder when the deployment YAML includes a zoomConfig block. For deployments without Zoom integration, this field is not provisioned. The integration logic governing when the field is populated, when attendanceStatus is written by the bridge, and when Walk-In registrations are auto-created is documented in PRDs/product/zoom-integration-architecture.md v1.0 in the crmbuilder repo, sections 5.3, 5.5, and 5.7 respectively."`

### 8. Add Two New Decisions

Append these two entries to the `decisions` array:

- `["EVREG-DEC-007", "Zoom integration writes are write-once for attendanceStatus. The Zoom integration bridge service writes Attended or No-Show only when attendanceStatus is not already in a terminal state (Cancelled, Attended, or No-Show set by staff). This protects staff judgment from being overwritten by automated reconciliation. Conversely, staff cancellations set Cancelled regardless of any prior bridge-driven write."]`

- `["EVREG-DEC-008", "Zoom-driven Walk-In creation is restricted to existing Contacts. The Zoom integration bridge service creates Walk-In registrations only for post-Webinar attendees whose email matches an existing Contact record. Attendees with no matching Contact are ignored — no placeholder Contact records are created. This avoids polluting the Contact database with one-off attendees, typos, or shared email addresses (per Issue 10 of the Zoom Integration Architecture design)."]`

## What NOT to Change

- Native fields (Section 2) — unchanged
- The `event`, `contact`, `registrationDate` fields in Section 3.1 — unchanged
- Section 3.2 Registrant Details (`specialRequests`) — unchanged
- Section 3.3 Communication Tracking (all four fields) — unchanged
- Section 3.4 Cancellation (`cancellationDate`, `cancellationReason`) — unchanged
- Relationships (Section 4) — unchanged
- Dynamic logic Section 5 — unchanged (Event Registration has no format-driven or Zoom-driven dynamic logic; the new field is always visible when present, governed by the layout panel visibility rule only)
- Open issues — unchanged
- Existing decisions EVREG-DEC-001 through EVREG-DEC-006 — unchanged
- Existing implementation notes 1 through 9 — unchanged

## Verification

After regenerating the docx:

1. Run the docx skill validator on the output
2. Run `pandoc PRDs/entities/EventRegistration-Entity-PRD.docx -t plain --wrap=none | head -300` and verify:
   - Document title page shows version 1.1 and the updated Last Updated timestamp
   - Section 3.5 "Zoom Integration" exists with the `zoomRegistrantId` field
   - The updated `attendanceStatus` description references all three update pathways including the Zoom integration writeback
   - The updated `registrationSource` description references the Zoom-driven Walk-In creation pathway
   - Overview notes show two notes (Creation pathways with three pathways listed; Zoom integration writes)
   - Zoom Integration Panel appears in Section 6
   - Implementation Note 10 exists
   - Decisions EVREG-DEC-007 and EVREG-DEC-008 exist

3. Diff against the v1.0 generator to confirm only the changes listed above are present (no incidental edits to native fields, relationships, communication tracking fields, or other unrelated content).

## Output Location

The regenerated file lands in `PRDs/entities/EventRegistration-Entity-PRD.docx`. Commit both the updated generator and the regenerated docx in a single commit. Suggested commit message:

```
Event Registration Entity PRD v1.1 — Zoom Webinar integration changes

Adds zoomRegistrantId field (system-populated by the Zoom integration
bridge service when a registration is pushed to a Zoom Webinar).

Updates attendanceStatus description to document the Zoom-driven
writeback pathway (Attended/No-Show set automatically after the
Webinar ends, write-once) and the cancellation behavior (Cancelled
triggers Zoom registrant cancellation).

Updates registrationSource description to document the Zoom-driven
Walk-In creation pathway (post-Webinar attendance reconciliation
auto-creates Event Registrations for matched Contacts who attended
without registering).

Adds Zoom Integration layout panel, Implementation Note 10, and
decisions EVREG-DEC-007 (write-once protection on attendanceStatus)
and EVREG-DEC-008 (Walk-In creation restricted to existing Contacts).

Companion to UPDATE-PROMPT-Event-Entity-v1.1.md. Both updates are
required by the Zoom Integration Architecture (crmbuilder commit
57caeb7).

No changes to native fields, relationships, communication tracking
fields, cancellation fields, or any non-Zoom-related content.
```
