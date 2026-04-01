# Phase 6 Readiness Test — Gap Analysis

**Domain:** Mentoring (MN)
**Tested:** 04-01-26
**Source:** CBM-Domain-PRD-Mentoring.docx v1.0, Section 4 (Data Reference)
**Entity Tested:** Engagement

---

## Summary

The Domain PRD's Data Reference contains sufficient field-level detail for
YAML generation. All gaps identified are either implementation-level decisions
(appropriately deferred to YAML generation) or known open issues already
tracked. No PRD changes are required.

---

## Gaps by Category

### Implementation Decisions (Resolved During YAML Generation)

These items are not PRD-level requirements. They are implementation details
that the AI proposes and the administrator confirms during YAML generation.

| # | Gap | Resolution |
|---|-----|------------|
| 1 | **Enum style/color assignments** — The YAML schema requires `style` maps for enum fields (colored badges in the UI). The PRD does not specify colors. | AI proposes sensible defaults during YAML generation (green for positive, red for negative, orange for warning). Administrator adjusts. |
| 2 | **optionDescriptions** — Per-value plain-language descriptions for enum fields. Used for documentation only, not deployed. The PRD has transition rules scattered across process sections but not consolidated per-value. | AI synthesizes per-value descriptions from the process documents during YAML generation. |
| 3 | **UI category/panel grouping** — The YAML `category` property controls which tab/panel a field appears on. The PRD does not specify UI layout grouping. | AI proposes logical groupings during YAML generation. Administrator adjusts. |
| 4 | **readOnly** — System-calculated fields (Total Sessions, Last Session Date, etc.) need `readOnly: true`. The PRD descriptions say "System-calculated. Read-only." but `readOnly` is not a PRD field property. | AI derives `readOnly: true` from the description text during YAML generation. |
| 5 | **audited** — Whether changes to a field are tracked in the audit log. Not mentioned in the PRD for any field. | AI proposes audit settings during YAML generation based on field importance. |
| 6 | **min/max for numeric fields** — Minimum and maximum values for int and float fields. Not specified in the PRD. | AI proposes reasonable defaults (e.g., `min: 0` for counts and percentages). |

### YAML Schema Limitations (Implementation Tasks)

These requirements are documented in the PRD but cannot be expressed in the
YAML schema. They require platform-level configuration beyond YAML.

| # | Gap | PRD Reference | Implementation Note |
|---|-----|---------------|---------------------|
| 7 | **Conditional required fields** — Hold End Date is required only when status is On-Hold. Close Reason is required only when transitioning to Completed. The YAML `required` property is a simple boolean. | MN-ENGAGE-REQ-005, MN-CLOSE-REQ-002 | Requires workflow/validation rule configuration on the CRM platform. |
| 8 | **Field-level access restrictions** — Engagement Notes must be restricted to Client Administrator, Mentor Administrator, and assigned mentors. Never visible to clients. | MN-ENGAGE-REQ-011 | Requires role-based field visibility configuration on the CRM platform. |

### Legacy Data Decisions

| # | Gap | Resolution |
|---|-----|------------|
| 9 | **Old YAML has "Mentor Declined" status** — The existing Engagement YAML includes a "Mentor Declined" status value not in the Domain PRD. The PRD says the Engagement reverts to "Submitted" when a mentor declines. | Domain PRD governs. "Mentor Declined" is removed. YAML regenerated from PRD. |
| 10 | **Old YAML has undocumented fields** — `startDate` and `mentorAssignedDate` exist in the old YAML but are not defined in the Domain PRD. | Domain PRD governs. Legacy fields not preserved. If these are needed, they should be added to the PRD through the scope change protocol. |

### Known Open Issues (Already Tracked)

These are not new gaps — they are open issues already documented in the
Domain PRD Section 6.

| # | Issue ID | Gap |
|---|----------|-----|
| 11 | MN-INTAKE-ISS-001 | Mentoring Focus Areas — complete value list not defined. Cannot generate `options` list. |
| 12 | MN-CLOSE-ISS-001 | Close Reason — complete value list needs finalization. Four values defined, more may be needed. |

---

## Entity Test: Client Contact

Tested: 04-01-26

### Summary

The Client Contact test revealed structural gaps that the Engagement test
did not surface. These are not content gaps — the business requirements
are correct — but entity mapping gaps between PRD entities and CRM entities
that block YAML generation.

### Structural Gaps (Require Resolution Before YAML Generation)

| # | Gap | Description | Resolution |
|---|-----|-------------|------------|
| A | **Shared entity model not documented** | The PRD treats "Client Contact" as a separate entity, but the CRM uses a single Contact entity with a contactType field (Client, Mentor, Partner, Administrator). The PRD has no mention of this shared model. | Create an Entity Inventory document that maps PRD entity names to actual CRM entities. |
| B | **Native vs. custom fields not distinguished** | Contact is a Person-type entity with built-in fields (firstName, lastName, emailAddress, phoneNumber). The PRD lists these as if they need to be created. The YAML generator needs to know which fields already exist. | Entity PRDs must identify which fields are native and which are custom. |
| C | **Cross-domain field sharing not indicated** | Some "Client Contact" fields (e.g., LinkedIn Profile) already exist on the Contact entity for Mentor and Partner types. The PRD doesn't indicate whether a field is shared or type-specific. | Entity PRDs must consolidate fields across all domains that use the entity and mark shared vs. type-specific. |
| D | **Dynamic logic visibility not specified** | The existing CRM uses contactType to show/hide type-specific fields. The PRD doesn't document which fields should be shown only for Client-type contacts. | Entity PRDs must define dynamic logic visibility rules per contact type. |
| E | **contactType field not documented** | The mechanism by which a "Client Contact" is created (setting contactType = "Client") is not in the Mentoring Domain PRD. | Entity Inventory establishes the contactType pattern. Entity PRDs define the values. |
| F | **Zip Code vs. native address ambiguity** | The PRD defines Zip Code as a standalone varchar field, but the Person-type entity has built-in address components. Unclear whether this is a standalone field or should use the native address. | Entity PRD for Contact must clarify the relationship between Zip Code and the native address fields. |

### Resolution Approach

Create Entity Definition artifacts retroactively:

1. **Entity Inventory** — a single document mapping PRD entity names to
   actual CRM entities (native vs. custom, entity type, contactType values).

2. **Entity PRDs** — one per actual CRM entity, consolidating:
   - Native vs. custom field designation
   - Fields shared across types vs. type-specific
   - Dynamic logic visibility rules
   - PRD field name to implementation field name mapping
   - All domains that contribute fields to this entity

Estimated effort: one conversation per CRM entity (3-4 entities for the
Mentoring domain: Contact, Account, Engagement, Session).

The Domain PRD and process documents remain unchanged — they are the
business requirements view. The Entity PRDs become the implementation
mapping view that YAML generation reads from.

---

## Overall Conclusion

**Engagement entity:** Passes Phase 6 readiness. Domain PRD Data Reference
has sufficient detail. All gaps are implementation-level decisions or
known open issues.

**Client Contact entity:** Does NOT pass Phase 6 readiness. Structural gaps
in entity mapping prevent YAML generation. Entity Definition artifacts
(Phase 2) must be created before YAML generation can proceed for entities
that map to shared CRM entities (Contact, Account).

**Recommendation:** Complete Entity Definition (Phase 2) retroactively
before proceeding to YAML generation (Phase 6) for any domain. Custom
entities (Engagement, Session) can proceed to YAML generation from the
Domain PRD alone. Shared/native entities (Contact, Account) require
Entity PRDs as an additional input.
