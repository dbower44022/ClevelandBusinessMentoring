# Update Prompt: Add Primary Engagement Contact Across All Mentoring Domain Process Documents

## Context

I'm working on the CBM CRM implementation. During Mentoring Domain Reconciliation, we discovered a structural gap: there is no concept of a Primary Engagement Contact on the Engagement entity. The Engagement has an Engagement Contacts relationship (many-to-many with Client Contacts), but no way to designate which contact is the primary point of contact for that specific engagement.

This is distinct from the organization-level Primary Contact field on Client Contact (MN-INTAKE-DAT-016), which identifies the primary contact for the Client Organization as a whole. A client may have multiple engagements where different individuals serve as the primary contact.

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read all five Mentoring domain process documents uploaded with this prompt

## The Change

Add a **Primary Engagement Contact** field to the Engagement entity and thread the concept through all five Mentoring domain process documents. This is a single structural change applied consistently across documents — not five separate changes.

### Field Definition

- **Field Name:** Primary Engagement Contact
- **Type:** relationship (one)
- **Required:** Yes
- **Default behavior:** Automatically set to the submitting contact from the intake form when the Engagement is created
- **Changeable by:** The mentor or Client Administrator at any time during the engagement
- **Purpose:** Identifies the single client contact who is the primary point of contact for this specific engagement. All system-generated communications are addressed TO this contact; other Engagement Contacts (if any) are CC'd.

### Communication Rule

All system-generated client-facing communications must follow this pattern:
- **TO:** Primary Engagement Contact
- **CC:** All other Engagement Contacts associated with the engagement (if any)

If no additional Engagement Contacts exist beyond the Primary Engagement Contact, the communication is sent TO the Primary Engagement Contact only with no CC.

This applies everywhere the system sends communications to client contacts, including but not limited to:
- Meeting requests (MN-ENGAGE)
- Session summary emails (MN-ENGAGE)
- Closed Engagement Survey (MN-CLOSE)
- Thank-you email recipient defaults (MN-CLOSE)
- Any future client-facing notifications

### Engagement Contacts Required Status

With Primary Engagement Contact as a separate required field, the existing Engagement Contacts relationship (many-to-many) becomes **optional**. Many engagements will have only the Primary Engagement Contact with no additional contacts. The Engagement Contacts field captures *additional* client contacts beyond the primary — it does not include the primary contact itself.

### Changes Required Per Document

**MN-INTAKE (v2.0)**
- Add Primary Engagement Contact field to Section 8 (Data Collected), Engagement entity
- Update MN-INTAKE-REQ-007 to include automatic assignment of the submitting contact as Primary Engagement Contact (in addition to adding them as an Engagement Contact)
- Update workflow step 2 to reflect both assignments
- Increment version

**MN-MATCH (v2.0)**
- Add Primary Engagement Contact to Section 7 (Process Data), Engagement entity — matching reads this field to include in the client summary sent to the nominated mentor
- Add Primary Engagement Contact to Section 8 (Data Collected), Engagement entity — the coordinator may update this during the matching/introduction phase
- Engagement Contacts remains Required=No (no change needed — MN-MATCH was correct)
- Increment version

**MN-ENGAGE (v2.2)**
- Add Primary Engagement Contact to Section 2 (Process Triggers / Required Data)
- Add Primary Engagement Contact to Section 8 (Data Collected), Engagement entity
- Change Engagement Contacts (MN-ENGAGE-DAT-003) from Required=Yes to Required=**No** — additional contacts beyond the primary are optional
- Update MN-ENGAGE-REQ-002 (meeting requests) to specify TO/CC pattern
- Update MN-ENGAGE-REQ-003 (session summary emails) to specify TO/CC pattern
- Update any workflow steps that reference sending communications to "all engagement participants" to clarify the TO/CC pattern (note: meeting requests still include all assigned mentors as attendees in addition to the client contacts)
- Increment version

**MN-INACTIVE (v1.1)**
- Add Primary Engagement Contact to Section 7 (Process Data), Engagement entity — included in notifications for context
- Update MN-INACTIVE-REQ-003 and MN-INACTIVE-REQ-004 (notification requirements) — these notify the mentor and Client Administrator, not the client, so no TO/CC change. However, Primary Engagement Contact name should be included in the notification content alongside Business Name for identification
- Increment version

**MN-CLOSE (v1.0)**
- Add Primary Engagement Contact to Section 7 (Process Data), Engagement entity
- Change Engagement Contacts (MN-CLOSE-DAT-004) from Required=Yes to Required=**No** — additional contacts beyond the primary are optional
- Update MN-CLOSE-REQ-005 (Closed Engagement Survey) to reference Primary Engagement Contact instead of "primary client contact" (which currently ambiguously references the organization-level field)
- Update MN-CLOSE-REQ-006 (thank-you email) to specify that the default TO recipient is the Primary Engagement Contact with other Engagement Contacts (if any) as CC, while preserving the mentor's ability to modify recipients at their discretion
- Increment version

### What NOT to Change

- The organization-level Primary Contact field on Client Contact (MN-INTAKE-DAT-016) remains unchanged. It still identifies the primary contact for the Client Organization.
- Do not add new requirements — update existing requirements to incorporate the concept. The only new data item is the Primary Engagement Contact field itself.
- Do not change process workflows beyond incorporating the communication pattern. No new workflow steps are needed.
- Do not modify Session entity fields or Session-related workflows.

## Documents to Upload

Upload the following five documents with this prompt:
1. MN-INTAKE.docx (from PRDs/MN/)
2. MN-MATCH.docx (from PRDs/MN/)
3. MN-ENGAGE.docx (from PRDs/MN/)
4. MN-INACTIVE.docx (from PRDs/MN/)
5. MN-CLOSE.docx (from PRDs/MN/)

## Output

Produce updated versions of all five documents and commit them to `PRDs/MN/` in the CBM repo, replacing the existing files. Each document should have its version incremented and Last Updated date set to the current session time.
