# Update Prompt: Add Cross-Domain Services Section to CBM Master PRD

## Context

I'm working on the CBM CRM implementation. The Document Production Process was updated to include Cross-Domain Services — shared platform capabilities (such as Notes, Email, Calendar, Surveys) that are not owned by any single domain but are consumed by multiple domains. Services are structurally parallel to domains: they can own entities, define processes, and produce their own reconciled Service PRD. But their purpose is to provide shared capabilities, not to fulfill a standalone business function.

The CBM Master PRD was created before Cross-Domain Services were added to the process. It currently has four sections: Organization Overview, Personas, Key Business Domains, and System Scope. It needs a new Section 4 (Cross-Domain Services) inserted between Key Business Domains and System Scope, with System Scope renumbered to Section 5.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the Master PRD Interview Guide at `PRDs/process/interviews/interview-master-prd.md` in the crmbuilder repo — specifically Topic 4 (Cross-Domain Services)
3. Read the CBM Master PRD uploaded with this prompt

## What This Session Does

This is an interview-style session. The goal is to identify all Cross-Domain Services that CBM needs, discuss each one, and then produce an updated Master PRD with the new section.

After reading the Master PRD, you will already have signals about potential services — capabilities that appear across multiple domains. Use those signals to lead the interview, but do not assume the list is complete. The interview should confirm, refine, and potentially expand on what's visible in the existing document.

### Interview Approach

Follow the guidance in Topic 4 of the Master PRD Interview Guide:

- Present capabilities you noticed appearing across multiple domains and ask whether each is a shared service or belongs within a single domain
- For each confirmed service, capture: service name, purpose, capabilities it provides to consuming domains, which domains consume it, and any entities it may own
- Apply the distinction test: a service is genuinely shared (used broadly, no natural single owner) rather than a capability primarily owned by one domain with occasional use by others
- Write service descriptions in sufficient detail that domain process documents can reference the service generically (e.g., "Use the Notes Service to add notes to a contact") without needing to know internal mechanics

### Discuss one service at a time. Wait for confirmation before moving to the next.

### Potential Service Candidates

The following capabilities appear across multiple domains in the current Master PRD and are worth exploring during the interview. This is a starting point, not a predetermined list — some may not be services, and others may emerge during discussion:

- **Notes** — administrator notes appear in MR-MANAGE, CR-PARTNER, and FU-STEWARD. Mentoring has Engagement Notes and Session Notes. Is there a shared Notes capability?
- **Email / Communications** — communication history tracking appears in nearly every domain and persona. Is system-generated email and communication logging a shared service?
- **Surveys** — MN-SURVEY covers client satisfaction surveys within the Mentoring domain. Could survey capability extend beyond Mentoring (e.g., mentor feedback, event feedback, partner satisfaction)?
- **Calendar / Scheduling** — session scheduling appears in Mentoring, event scheduling in Client Recruiting. Is scheduling a shared service or domain-specific?

## Documents to Upload

Upload the following document with this prompt:

1. **CBM-Master-PRD.docx** — the current Master PRD (from `PRDs/` root in the CBM repo)

## Output

Produce an updated CBM Master PRD with the following changes:

- New Section 4: Cross-Domain Services — one subsection per identified service with service name, purpose, capabilities, consuming domains, and entities owned (if any)
- Existing Section 4 (System Scope) renumbered to Section 5
- System Scope updated if service identification changes what is in scope, out of scope, or affects integration descriptions
- Version incremented and Last Updated date set to the current session time

Commit the updated document to `PRDs/CBM-Master-PRD.docx` in the CBM repo, replacing the existing file.

## After This Session

Once the Master PRD is updated with Cross-Domain Services, the next steps for each identified service follow the Document Production Process:

1. **Phase 2 (Entity Definition)** — if the service owns entities not already in the Entity Inventory, update the Entity Inventory and produce Entity PRDs
2. **Phase 3 (Service Overview)** — one conversation per service, assembling upstream context into a service-scoped reference document
3. **Phase 4 (Service Process Definition)** — one conversation per service process, following the same standards as domain process documents
4. **Phase 4 (Service Reconciliation)** — synthesize service process documents into a reconciled Service PRD

Services should be processed before the domains that reference them when practical, but domain process documents may reference services generically based on the Master PRD descriptions without requiring the service's full definition to be complete.
