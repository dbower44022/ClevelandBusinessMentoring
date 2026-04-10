# Session Prompt: CR-MARKETING-CONTACTS Carry-Forward Updates

## Context

I'm working on the CBM CRM implementation. The CR-MARKETING-CONTACTS process document v1.0 has been committed. During the process definition interview, two carry-forward updates to prior documents were identified in Section 10 (Updates to Prior Documents). These need to be applied before starting CR-MARKETING-CAMPAIGNS.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the CR-MARKETING-CONTACTS process document at `PRDs/CR/MARKETING/CR-MARKETING-CONTACTS.docx` — specifically Section 8 (Data Collected, Entity: Segment) and Section 10 (Updates to Prior Documents)
3. Read the Entity Inventory at `PRDs/CBM-Entity-Inventory.docx`
4. Read the CR-MARKETING Sub-Domain Overview at `PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx`

## Carry-Forward Items

### 1. Entity Inventory v1.3 → v1.4

Add Segment as a new custom entity owned by CR.

**Specific changes:**

- **Section 4 Custom Entity Summary:** Add a new sub-section (Section 4.12 or the next available number) for Segment. Key attributes to document: Custom Base type; owned exclusively by CR (CR-MARKETING); two types (Dynamic and Static, distinguished by an immutable segmentType enum field); used by CR-MARKETING-CONTACTS for contact list management and by CR-MARKETING-CAMPAIGNS as campaign send lists; 8 custom fields (name, description, segmentType, filterCriteria, memberContactIds, owner, createdAt, modifiedAt) plus 1 forward-reference relationship (Campaign-to-Segment usage link). Source: CR-MARKETING-CONTACTS process document v1.0 Section 8, DAT-044 through DAT-052.

- **Section 5 Cross-Domain Entity Matrix:** Add a new row for Segment. Contributing domains: CR only (no cross-domain consumers — CR-MARKETING-CONTACTS creates and manages, CR-MARKETING-CAMPAIGNS reads as send list source).

- **Entity counts in the summary header or overview section:** Update from 16 (2 native, 11 custom, 3 TBD) to 17 (2 native, 12 custom, 3 TBD). The TBD count remains 3 (Event, Event Registration, Contribution — unchanged).

- **Header bumps:** Version 1.3 → 1.4, Last Updated → current timestamp in MM-DD-YY HH:MM format.

- **No new open issues** are expected from this update. The Segment entity's field-level detail is fully specified in the CR-MARKETING-CONTACTS process document.

### 2. CR-MARKETING Sub-Domain Overview v1.1 → v1.2

Add Segment to the deferred Phase 2b Entity PRDs list.

**Specific changes:**

- **In the section that lists the three deferred Phase 2b Entity PRDs** (currently: Marketing Campaign, Campaign Group, Campaign Engagement): add Segment as a fourth entity, noting it was surfaced by CR-MARKETING-CONTACTS v1.0 (the other three were surfaced by the Sub-Domain Overview itself).

- **If there is a count of "3 new custom entities surfaced"** in the narrative: update to 4.

- **Header bumps:** Version 1.1 → 1.2, Last Updated → current timestamp in MM-DD-YY HH:MM format.

- **Depends On list:** Update CR-MARKETING-CONTACTS reference if present, or add one if appropriate. The SDO currently depends on upstream documents only; it may be worth adding "CR-MARKETING-CONTACTS.docx v1.0" to the Depends On list since the process document is now the source for the Segment entity claim. Use your judgment — if the Depends On list has historically only included upstream inputs (not downstream process documents), preserve that convention.

## After Both Edits Are Committed

Update the CBM CLAUDE.md with the version bumps:

- Entity Inventory version table: v1.3 → v1.4
- CR-MARKETING SDO version table: v1.1 → v1.2
- Process status line: remove the "Two carry-forward updates pending" clause
- Next Steps: remove the carry-forward line item; the first bullet should become CR-MARKETING-CAMPAIGNS

Commit the CLAUDE.md update to the CBM repo.

## Working Style Reminders

- Ask for confirmation on the CLAUDE.md reads at the start of the session.
- Discuss one issue at a time; wait for explicit approval before moving to the next item.
- After completing any document or step, state the next required step and ask for confirmation before proceeding.
- Last Updated dates use MM-DD-YY HH:MM format.
- No product names in PRD documents.
- When editing existing .docx files, use the unpack → str_replace → pack pattern; validate before committing.
- Pull source documents from git rather than asking for uploads.
