# Session Prompt: CBM Note Entity PRD (Phase 5 — first Cross-Domain Service Entity PRD)

## Context

The Cleveland Business Mentors CRM implementation has completed all four domains' Phase 5 Entity PRDs — Mentoring, Mentor Recruitment, Client Recruiting, and Fundraising — covering thirteen entities in total. The remaining Phase 5 work is on Cross-Domain Service entities: Note (owned by the Notes Service), Survey, and Survey Response (both owned by the Survey Service). Of these, only the Notes Service has a completed service process document at this time. This session produces the **Note Entity PRD** — the first Cross-Domain Service Entity PRD in this implementation.

The Note Entity PRD is required before the corresponding YAML program file can be generated. Phase 9 YAML Generation has been run for the four business domains, but no YAML has been produced for any Cross-Domain Service. The Note Entity PRD will lock down the Native versus Custom designation, the field set, the parent-record relationship structure, and the platform-versus-custom-construct mapping for each requirement so that the YAML can follow.

Per the Document Production Process Phase 5 ordering, Entity PRDs are produced after the service process document that defines them. The fields, parent entity scope, and requirements surfaced by the Notes Service process document at v1.0 are the input to this session.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with the administrator which CLAUDE.md to read first per the standard working-style preference.
3. Read the Entity PRD interview guide at `PRDs/process/interviews/interview-entity-prd.md` in the crmbuilder repo. Confirm the section structure used by the established Entity PRD pattern in this implementation (nine sections, no separate Change Log section — version baseline recorded as the first Decisions Made entry per the precedent set by all thirteen prior Entity PRDs).
4. Read the source service process document in the CBM repo:
   - `PRDs/services/NOTES/NOTES-MANAGE.docx` v1.0 — primary source. Section 6 (System Requirements) lists the seven NOTES-MANAGE-REQ items. Section 7 (Process Data) lists the six supported parent entity types. Section 8 (Data Collected) defines the six Note entity fields. Section 11 (Interview Transcript) records the design decisions reached during service definition.
5. Read the upstream Entity Inventory:
   - `PRDs/CBM-Entity-Inventory.docx` v1.6. Section 2 Entity Map records Note with Native/Custom marked TBD and Entity Type marked TBD. Section 7 (Notes for Phase 5) Item 6 confirms that Note Entity PRD is to be produced after service process definition establishes full requirements — that condition is now satisfied.
6. Read the adjacent Entity PRDs that establish parent-record convention precedents — at minimum Engagement, Session, Event, Contribution, and Fundraising Campaign — to confirm which entities have Activity Stream enabled and how each entity's Implementation Notes section currently references the Notes Service (several Entity PRDs already document expected coexistence with the Notes Service).
7. Read the CBM Master PRD v2.5 Section 4.1 (Cross-Domain Services) for any inventory-level constraints on the Notes Service.

## Source Field Inventory (NOTES-MANAGE v1.0 Section 8)

The Note entity has six fields. There is no discriminator and no type-specific visibility — every Note record carries every field.

| ID | Field | Type | Required | Notes |
|---|---|---|---|---|
| NOTES-MANAGE-DAT-007 | `subject` | varchar | No | Short text label displayed in the list panel on the parent record. Maps to the Custom Base entity's native `name` field — the `subject` field and the entity's `name` field are the same field, exposed under both labels. The Note entity must not carry a separate Name field alongside Subject. |
| NOTES-MANAGE-DAT-008 | `body` | wysiwyg | No | Rich text content with formatting. |
| NOTES-MANAGE-DAT-009 | `author` | relationship | System-calculated | The user who created the note. Captured automatically at creation. |
| NOTES-MANAGE-DAT-010 | `createdDate` | datetime | System-calculated | Timestamp of creation. Captured automatically. |
| NOTES-MANAGE-DAT-011 | `parentRecord` | relationship | Yes | The record the note is attached to. Supports six parent entity types per Section 7 (Contact, Account, Engagement, Session, Event, Fundraising Campaign). |
| NOTES-MANAGE-DAT-012 | `editHistory` | relationship (many) | System-calculated | A list of all edits to the note, each recording the editing user and edit timestamp. Per-edit content diff is desirable but conditional on platform capability. |

## Supported Parent Entity Types (NOTES-MANAGE v1.0 Section 7)

| ID | Entity |
|---|---|
| NOTES-MANAGE-DAT-001 | Contact |
| NOTES-MANAGE-DAT-002 | Account |
| NOTES-MANAGE-DAT-003 | Engagement |
| NOTES-MANAGE-DAT-004 | Session |
| NOTES-MANAGE-DAT-005 | Event |
| NOTES-MANAGE-DAT-006 | Fundraising Campaign |

The Note entity attaches to every entity in the above list. Notes do not attach to Dues, Contribution, Partnership Agreement, Event Registration, Marketing Campaign, Campaign Group, Campaign Engagement, Segment, or Survey-related entities.

## Constraints From Source Documents

The following constraints are decided by the Notes Service process document and the Entity Inventory and must flow through to the Entity PRD as written:

* **Owning service.** Note is owned by the Notes Service per Master PRD v2.5 Section 4.1. The Owning Domain row in the Entity Overview table reads "Cross-Domain Service" rather than naming a single business domain.
* **Audit and edit history.** Per NOTES-MANAGE-REQ-005, edit history is required (recording the editing user and edit timestamp); per-edit content diff is desirable but conditional on platform capability. The Entity PRD must specify how edit history is captured and clarify the diff capture as conditional.
* **No deletion.** Per NOTES-MANAGE-REQ-006, Notes are permanent once created. The Entity PRD must record this as an Implementation Note and identify any platform configuration required to enforce it.
* **Permission inheritance.** Per NOTES-MANAGE-REQ-004, any user with access to the parent record may create, view, and edit Notes on that record. The Entity PRD must record this as inherited permission and specify whether any additional Note-level field restrictions are needed (none are anticipated).
* **Six parent types only.** Per NOTES-MANAGE-REQ-002, the supported parent entity list is closed at six. Any future expansion is a service revision, not an entity-level decision.
* **Author and createdDate are system-set.** Per NOTES-MANAGE-REQ-001, author and creation timestamp are captured automatically and are read-only to users.
* **No type discriminator.** The Note entity does not partition by type. Every Note carries the same field set regardless of parent.

## Open Issues to Resolve or Defer During the Session

The administrator may surface design questions during the session; below are the ones already known. Resolve or defer as appropriate per the working-style preference of one issue at a time.

* **Confirm Custom Base entity designation (the working position).** The Entity Inventory v1.6 marks Native/Custom and Entity Type as TBD for Note. The working position entering this session is that Note is a Custom Base entity. The rationale is that Custom matches NOTES-MANAGE-REQ-001 exactly including the Subject field, gives full control over the polymorphic parent relationship and the edit-history mechanism, and does not depend on the behavior of the platform's built-in Note record type. The alternative — using the platform's built-in Note record type that powers the activity stream — would satisfy most requirements out of the box but would lose the Subject field, which the Notes Service explicitly requires. The session should confirm the Custom designation and document the rationale in Section 9 Decisions Made. If the session decides to revert to the platform-native alternative, that decision and its rationale must be recorded as well.

* **Parent relationship cardinality and shape.** The Entity PRD must specify whether the Note to parent relationship is implemented as one polymorphic parent field across the six entity types or as six separate manyToOne fields with at most one populated per record. The polymorphic shape matches NOTES-MANAGE-DAT-011's single `parentRecord` field as written. The six-field shape is more conservative against schema-validation and reporting limitations and is the safer default if polymorphic-parent support in the YAML schema is uncertain. The session should resolve this as a deliberate choice with reasoning recorded.

* **Edit history — diff capture scope.** NOTES-MANAGE-REQ-005 requires capture of editing user and edit timestamp on every edit. Per-edit content diff is desirable but conditional. The Entity PRD must specify what is in scope for v1.0 (editing user and edit timestamp at minimum) and what is recorded as desirable-deferred (content diff). The session should identify whether platform capability for diff capture is known to be present, absent, or conditional, and document the answer.

* **No-deletion enforcement mechanism.** NOTES-MANAGE-REQ-006 requires that Notes are permanent. The Entity PRD must specify whether enforcement is via role-level permission removal (no role grants delete on Notes), a record-level rule, or a workflow-driven prevention. The chosen mechanism is recorded as a Manual Configuration item if it cannot be expressed declaratively in the YAML.

* **Display labels.** Singular: "Note"? Plural: "Notes"? Confirm with administrator (matches Entity Inventory v1.6 convention).

* **Activity Stream on Note records themselves.** Note records are typically not stream-bearing in their own right (the stream lives on the parent). Confirm Activity Stream is off on the Note entity itself, regardless of Path.

* **Implementation Notes scope across consuming Entity PRDs.** Several existing Entity PRDs already document expected coexistence with the Notes Service in their Implementation Notes sections (Contribution Entity PRD records the hybrid in-record-notes-plus-Notes-Service treatment; Fundraising Campaign Entity PRD records stream-only Notes Service participation). Confirm whether the Note Entity PRD should record the converse — a list of consuming entities and how each treats the Notes Service — or whether that direction is already adequately covered by the existing Implementation Notes on the consuming entities.

## Output

Produce the **Note Entity PRD** as a Word document with the standard nine sections matching the established Entity PRD pattern in this implementation (no separate Change Log section per the precedent set by all thirteen prior Entity PRDs). The working position is that Note is a Custom Base entity:

1. Entity Overview (record Owning Service rather than Owning Domain in the metadata table; record Custom Base as the Native/Custom and Entity Type designation)
2. Native Fields (the Base entity's name, createdAt, modifiedAt, assignedUser, plus createdBy and modifiedBy as relevant. The native `name` field is mapped to `subject` per administrator directive — the Note entity must not carry both a Name and a Subject field, which would be redundant; `subject` and `name` are the same field exposed under both labels, following the precedent set by Marketing Campaign and Fundraising Campaign Entity PRDs. Confirm during the session whether `createdBy` maps to the author requirement at NOTES-MANAGE-DAT-009 and whether `createdAt` covers the createdDate requirement at NOTES-MANAGE-DAT-010 — using native fields wherever they cover a Notes Service requirement is preferred over adding parallel custom fields)
3. Custom Fields (the source-document fields not covered by native Base fields — at minimum body, parentRecord, and editHistory. Subject is not a separate custom field; it is the native name field surfaced under the subject label per Section 2 above)
4. Relationships (the Note to parent-record polymorphic relationship across the six supported parent entity types; specify the polymorphic-versus-six-field shape per the Open Issues section)
5. Dynamic Logic Rules (likely empty — Note has no type-specific visibility)
6. Layout Guidance (panel structure for the Note detail view; list-panel column structure on the parent record's Notes panel per NOTES-MANAGE-REQ-003)
7. Implementation Notes (no-deletion enforcement, edit-history capture, permission inheritance from parent, Activity Stream off on Note itself, polymorphic-parent implementation notes if applicable)
8. Open Issues (any that survive the session)
9. Decisions Made (Version 1.0 baseline as the first entry, the Custom Base designation as a tracked decision with rationale, and any other design decisions reached during the session)

Commit to `PRDs/entities/Note-Entity-PRD.docx` in the CBM repo. Commit the generator script alongside at `PRDs/entities/generate-Note-Entity-PRD.js`. Update CLAUDE.md to reflect the new Entity PRD.

Draft a carry-forward request for the Entity Inventory v1.6 to v1.7 update to fill in the Note row's Native/Custom (Custom) and Entity Type (Base) cells, following the standard two-gate carry-forward pattern. Commit the carry-forward request alongside the Entity PRD. If the session reverts the working position to Native, the carry-forward request reflects that designation instead.

## Output Standards Reminder

* Standard metadata table at the top with Document Type, Entity, Implementation, Version, Status, Last Updated (MM-DD-YY HH:MM format), and Source Documents rows.
* Decisions Made entries in Section 9 documenting key design decisions made during the session, with version-tagged baseline entry as the first row.
* No product names anywhere in the document — Level 2 Entity PRD per the standard. Platform mechanics are described in capability-neutral terms.
* Discuss design issues one at a time and wait for explicit approval before moving to the next item per the standard working-style preference. Once the design is fully approved, generate the document without further confirmation per the same preference.

## After This Session

After the Note Entity PRD is committed:

* **Phase 9 YAML Generation for the Notes Service** becomes eligible. The YAML is a full custom-entity Phase 9 output following the established four-domain pattern, declaring the Note Custom Base entity, its custom fields, its parent relationship across the six supported parent entity types, and its stream and audit settings. The YAML lives at `programs/services/NOTES-Note.yaml` (the service-scoped programs subdirectory does not yet exist and will be created by the YAML Generation session).
* The remaining two Cross-Domain Service entities — Survey and Survey Response — are still pending. Their service process document has not yet been written. Phase 6 Survey Service Definition is the predecessor task before any Survey or Survey Response Entity PRD can begin.
* The Entity Inventory carry-forward to v1.7 closes out the inventory-level TBD entries for Note.

## Documents to Upload

The administrator does not need to upload any documents for this session — all required source documents are accessible from the repository clones. If the administrator chooses to upload anything for convenience, the most useful uploads are NOTES-MANAGE.docx v1.0 (the primary source for all six fields and seven requirements) and the Entity Inventory v1.6 (for the Native/Custom and Entity Type cells that this session resolves).
