# Phase 9 YAML Generation — Multi-Domain Unattended Run Summary

**Run date:** 2026-05-04
**Run trigger:** Single Claude Code prompt, unattended
**Source prompt:**
`crmbuilder/PRDs/product/crmbuilder-automation-PRD/CLAUDE-CODE-PROMPT-multi-domain-yaml-generation-unattended.md`
**Schema reference:** `app-yaml-schema.md` v1.2.3
**Guide reference:** `guide-yaml-generation.md` v1.1
**Operator:** Claude Opus 4.7 (1M context)

---

## Domain results

| Domain | Action | Files | EXCEPTIONS | MANUAL-CONFIG | Commit |
|---|---|---|---|---|---|
| MN | Generated | 4 YAML + 2 docs (33 fields, 9 relationships, 6 saved views) | 6 | 45 | `f1bb674` |
| MR | Refreshed | 2 YAML + 2 docs (43+8 = 51 fields, 1 relationship, 7 saved views) | 6 new (5 retained) | 38 (24 RESOLVED-IN-YAML, 14 remaining) | `bdf4e78` |
| CR | Generated | 9 YAML + 2 docs (80 fields, 13 relationships) | 9 | 61 | `c566bdc` |
| FU | Verified | (no changes) | — | — | — |

Total YAML across the run: **15 YAML files** (4 MN + 2 MR + 9 CR),
**164 custom fields**, **23 relationships**, **13 saved views**,
**3 duplicateChecks rules**, **3 emailTemplates**, **4 workflows**,
**13 formula fields** across all domains.

---

## EXCEPTIONS deferral roll-up

The user should walk this list on return and either accept each
best-effort decision or request a targeted regenerate of the
affected entity.

### MN domain (6 entries)

| ID | Title | Best-effort decision | Reversal cost |
|---|---|---|---|
| MN-Y9-EXC-001 | Empty MN-Contact.yaml — no MN-only Contact custom fields | Generate documentation-only Contact entity block; no fields:. Primary Contact is on the Account-Contact relationship per CON-DEC-001. | Low |
| MN-Y9-EXC-002 | Engagement.mentoringFocusAreas value list source | Adopt MR-Contact's 42-value list verbatim per cross-entity alignment requirement. | Low |
| MN-Y9-EXC-003 | Engagement.closeReason value list completeness | Use 4 documented values; defer additional values per ENG-ISS-002. | Low |
| MN-Y9-EXC-004 | Session.topicsCovered value list deferred | Empty options list; pair with MANUAL-CONFIG MN-MC-OL-001. | Low |
| MN-Y9-EXC-005 | Account.industrySubsector value list deferred | Empty options list; pair with MANUAL-CONFIG MN-MC-OL-002 + dependent-filter MN-MC-DD-002. | Low |
| MN-Y9-EXC-006 | MN-Account.yaml generated despite not being on prompt's expected-outputs list | Generate the file with 5 MN-owned Client Organization fields per Account PRD v1.8 Section 3.3 attribution. | Low |

### MR domain (6 new entries)

| ID | Title | Best-effort decision | Reversal cost |
|---|---|---|---|
| MR-Y9-EXC-006 | Conditional field properties moved into YAML | applicationDeclineReason / departureReason / departureDate get requiredWhen+visibleWhen per Contact PRD v1.7. | Low |
| MR-Y9-EXC-007 | Several previously-required:true fields corrected to required:false | 7 compliance/system-populated fields aligned with Contact PRD v1.7 Required: No column. | Low |
| MR-Y9-EXC-008 | Roll-up fields expressed as v1.1 formulas | currentActiveClients, availableCapacity, totalLifetimeSessions, totalMentoringHours, totalSessionsLast30Days now declarative. | Low |
| MR-Y9-EXC-009 | duplicateChecks/savedViews/emailTemplates/workflows promoted to YAML | 1 dup check, 5 saved views, 3 email templates, 4 workflows. | Low |
| MR-Y9-EXC-010 | Email template body files deferred | 3 HTML files referenced but not authored. **MEDIUM reversal cost — would hard-reject at deploy validation if files don't exist.** Author files OR remove emailTemplates declarations before deploy. | Medium |
| MR-Y9-EXC-011 | duesRenewalDate added to MR-Contact | Field added to Contact per Contact PRD v1.7 / DUES-DEC-005. | Low |

(Original MR exceptions MR-Y9-EXC-001 through -005 from the
04-13-26 Phase 9 are retained verbatim in
`programs/MR/EXCEPTIONS.md` — they remain authoritative for the
five enum value list sourcing decisions made then.)

### CR domain (9 entries)

| ID | Title | Best-effort decision | Reversal cost |
|---|---|---|---|
| CR-Y9-EXC-001 | Contact.prospectStatus value list (CR-MARKETING-ISS-003) | Adopt 5-value straw-man (New Prospect, Engaged, Unresponsive, Converted, Opted Out). | Low |
| CR-Y9-EXC-002 | Account.clientStatus value list | Adopt 5-value working list (Prospect, Applicant, Active Client, Inactive Client, Former Client). | Low |
| CR-Y9-EXC-003 | Account.partnerOrganizationType / partnerType value lists | 7-value enum and 6-value multiEnum derived from CR-PARTNER process narrative. | Low |
| CR-Y9-EXC-004 | file / attachment-multiple field types not in YAML schema | Declare as varchar; document post-deployment EspoCRM admin reconfiguration. **Schema v1.3 candidate.** | Low |
| CR-Y9-EXC-005 | Event Registration bounce auto-suppression deferred | externallyPopulated:true; suppression rule TBD per CR-MARKETING-ISS-004. | Low |
| CR-Y9-EXC-006 | Event entity name vs Event entity type ambiguity | Use "Event" verbatim; verify at deploy time. | Medium (rename if conflict). |
| CR-Y9-EXC-007 | Event.status native field option override | No status field declared; document the 6-value override as MANUAL-CONFIG. | Low |
| CR-Y9-EXC-008 | MarketingCampaign aggregate `via:` resolution | Use `via: campaign` consistently; verify at deploy time. | Low |
| CR-Y9-EXC-009 | Contact.lastMarketingEngagement uses max-of-sentAt | Approximate the PRD's "max of send/open/click" with max-of-sentAt; perfect fidelity is post-deployment workflow MANUAL-CONFIG. | Low |

---

## MANUAL-CONFIG roll-up by category

Categories with significant cross-domain volume:

### Advanced Automation (37 items total)

- MN: 16 entries (MN-MC-AA-001 through MN-MC-AA-016) covering
  name auto-generation, status-transition workflows, cross-
  entity field copy, and the MN-INACTIVE inactivity scan.
- MR: 4 remaining out of 9 originally (5 RESOLVED-IN-YAML)
  including the deferred-to-v1.2 `onFirstTransition` trigger
  for isPrimaryMentor activation.
- CR: 16 entries (CR-MC-AA-001 through CR-MC-AA-016) including
  the heavy automation footprint of CR-EVENTS (registration
  confirmation, reminder dispatcher, post-event follow-up,
  conversion-push) and CR-MARKETING (web inquiry form Account
  precedence ladder, marketing platform sync).

**Schema v1.2 / v1.3 candidates**: cross-entity setField,
`onFirstTransition` trigger, `createRelatedRecord` action,
date-arithmetic in setField.value (currently only literals,
`now`, and arithmetic over the same record).

### Email Templates (18 items total)

- MN: 8 entries (introduction, dormant, inactive, intake
  notification, mentor nomination, acceptance window expiry,
  session summary, closure thank-you).
- MR: 3 entries — registered in YAML, body files deferred per
  MR-Y9-EXC-010.
- CR: 7 entries (event confirmation, three reminder windows,
  thank-you, we-missed-you, conversion-push family,
  reactivation family, agreement renewal reminders).

**Schema v1.3 candidate**: declarative HTML template fragments
with merge-field substitution, so body files can ship as part
of the program YAML rather than separately authored HTML.

### Field-Level Access Control / Role-Based Field Visibility (10 items total)

- MN: 3 entries (engagementNotes restriction, clientNotes
  restriction, referringPartner dual-write-path access).
- MR: 2 entries remaining (admin-only fields, mentor-editable
  vs read-only distinction).
- CR: 5 entries (partnerNotes restriction, agreementDocument
  restriction, Event documents staff-only, Contact opt-out
  field access, sourceAttributionDetails admin-only).

**Schema v1.2 candidate** — Category 6 of the gap analysis,
already deferred to v1.2 per `app-yaml-schema.md`.

### Native Field Customization (Schema Gap) (5 items total)

- MN: 1 entry (Session.status override on native Event-type field).
- MR: 0 entries.
- CR: 4 entries (file/attachment-multiple field types,
  Event.status override, Event entity-name conflict possibility,
  description field type customization).

**Schema v1.3 candidate** — first-class support for: (a) native
field option overrides; (b) `file` and `attachment-multiple`
field types; (c) entity-rename guard against type collisions.

### Cross-Entity Union Saved Views

Not surfaced as MANUAL-CONFIG in this run (no domain required
the FU-style cross-entity union view), but a category to track
for v1.3.

### Dependent / Cascading Enums (Schema Gap)

- MN: 2 entries (Contact-Account "Primary Contact"
  relationship-level bool, Account.industrySubsector
  cascading-enum filter).
- CR: 2 entries (Event presenters picker secondary filter on
  Contact.presenterTopics, Account precedence ladder).

**Schema v1.3 candidate** — declarative cascading-enum and
relationship-picker filters.

### Saved Views and List Filters

Per crmbuilder/CLAUDE.md "YAML Schema Rules," savedViews are
recognized at parse time but currently short-circuit to
NOT_SUPPORTED in the deploy pipeline.

- MN: 6 declared in YAML (will surface as NOT_SUPPORTED in
  deploy run log).
- MR: 7 declared in YAML (5 from RESOLVED-IN-YAML migration,
  plus 2 on Dues).
- CR: 12 entries listed in MANUAL-CONFIG only (not declared in
  YAML this cycle to avoid NOT_SUPPORTED noise; will be
  declared in YAML when the savedViews REST capability lands).

### Integrations

- MN: 4 (video conferencing, survey delivery, email transport,
  calendar).
- MR: 2 (LMS, email transport).
- CR: 5 (email transport, marketing platform two-way sync, web
  inquiry form, public Event registration form, virtual meeting
  platform).

### Conditional-Required (Workflow-Validated)

Beyond what `requiredWhen` already expresses in YAML:

- MN: 5 entries (Session attendee minimums, sessionType at
  Completed, etc.).
- MR: 1 entry remaining (background check fields conditional on
  out-of-band administrator decision).
- CR: 3 entries (Event Draft → Scheduled validation, Segment
  member-list-required-when-Static, EventRegistration
  cancellationReason).

---

## FU verification findings

The FU YAMLs are at content_version 1.0.0 (Account, Contact,
FundraisingCampaign) and 1.0.1 (Contribution). All four files
parse as valid YAML. Field counts match the FU Domain PRD v1.0
and the four FU Entity PRDs (Contribution v1.0, Fundraising
Campaign v1.0, Contact v1.7, Account v1.8). One non-trivial
drift finding:

### FU-VER-FINDING-001 — FU-Account.yaml has type:link field that would hard-reject under v1.2.1+ schema

`FU-Account.yaml` declares `assignedSponsorCoordinator` as a
field with `type: link`:

```yaml
- name: assignedSponsorCoordinator
  type: link
  label: "Assigned Sponsor Coordinator"
  ...
```

This would hard-reject under the v1.2.1 schema rule documented
in `app-yaml-schema.md` Section 6.2 ("`link` is not a valid
field type. Link relationships between entities are declared
exclusively in the top-level `relationships:` block"). The same
pattern was the root cause of FU-Contribution.yaml's
HTTP 409 conflict that produced `1.0.1` (the prior
type-link-removal fix on three Contribution relationships).

The `assignedSponsorCoordinatorLink` relationship IS already
declared in `FU-Account.yaml`'s `relationships:` block, so the
fix is to delete the field-level declaration (lines 150–169)
and bump `content_version` to `1.0.2`. The field-level
metadata (`description`, `category`, `requiredWhen`,
`visibleWhen`) does not propagate to link records via the
deploy pipeline — operator should configure post-deployment
via the EspoCRM admin UI if needed.

This finding is reported here per the prompt's verify-only
constraint; the run did not modify FU-Account.yaml. The user
should bump `FU-Account.yaml` to `1.0.2` removing the
`type: link` field declaration before the next FU deploy.

### FU YAML structural integrity (clean)

- FU-Contact.yaml: 4 fields ✓ (matches Contact PRD v1.7
  Section 3.8 Donor-Specific Fields)
- FU-Account.yaml: 7 fields ✓ (6 Donor/Sponsor + 1
  geographicServiceArea per ACT-DEC-014)
- FU-Contribution.yaml: 15 fields ✓ (matches Contribution PRD
  v1.0)
- FU-FundraisingCampaign.yaml: 9 fields ✓ (matches Fundraising
  Campaign PRD v1.0)

All four FU YAMLs use v1.1+ constructs correctly: settings:
block, savedViews on Contribution, formula:aggregate on
donorLifetimeGiving / funderLifetimeGiving / totalRaised,
visibleWhen on conditional fields, externallyPopulated where
appropriate.

---

## Schema v1.2 / v1.3 candidates

Items surfaced as MANUAL-CONFIG in two or more domains during
this run, suggesting they would benefit from being added to the
schema in a future revision:

1. **`file` / `attachment-multiple` field types** — surfaced in
   CR (PartnershipAgreement.agreementDocument,
   Event.documents). Likely also relevant to Notes Service.
2. **Native field option override** — surfaced in MN (Session.
   status, custom Event-type values) and CR (Event.status,
   custom Event-type values). Same shape; v1.3 candidate.
3. **`onFirstTransition` workflow trigger** — surfaced in MR
   (isPrimaryMentor activation) and CR (Account.applicantSinceTimestamp
   first-time-only set). Already deferred to v1.2 per
   `app-yaml-schema.md` Section 5.8.
4. **`createRelatedRecord` workflow action** — surfaced in MN
   (next Session creation on completed Session) and CR
   (Event-side and EventRegistration-side automations). Already
   deferred to v1.2 per `app-yaml-schema.md` Section 5.8.
5. **Cross-entity setField** — surfaced in MN (next-session
   chaining), MR (none in this refresh), CR (multiple — Account.applicantSinceTimestamp
   from MN-INTAKE, Contact roll-up updates from CampaignEngagement).
   v1.3 candidate.
6. **Role-based field visibility (Category 6)** — surfaced in
   all three active domains. Already deferred to v1.2 per
   `app-yaml-schema.md`.
7. **Dependent / cascading enums** — surfaced in MN (industry
   subsector cascade) and CR (presenter picker secondary filter).
   v1.3 candidate.
8. **Relationship-level fields** — surfaced in MN (Account-Contact
   "Primary Contact" bool on the relationship) and likely
   relevant to many other use cases. v1.3 candidate.
9. **Date arithmetic in `setField.value`** — surfaced in MR
   (Dues renewal date roll-forward) and CR (renewal reminder
   scheduling). v1.3 candidate.
10. **Saved view / duplicate check / workflow REST CRUD** — all
    three v1.1 features currently short-circuit to NOT_SUPPORTED
    in the deploy pipeline. The reimplementation work is
    referenced in `crmbuilder/CLAUDE.md` "YAML Schema Rules"
    section. Not a schema change but a deploy-pipeline work
    item.

---

## Next steps for the user

### Reset the EspoCRM test instance to a clean state

1. Open the CRM Builder application.
2. Navigate to the **Deployment** tab.
3. Click the **Recovery & Reset** button to open the modal dialog.
4. In the **Full Database Reset** section, type `DELETE ALL DATA`
   in the confirmation field exactly (it is case-sensitive).
5. Click **Run Full Reset** and wait for the operation to finish.
   This tears down all containers, wipes all volumes, and re-runs
   the EspoCRM installer from scratch. The instance will be
   restored to a fresh out-of-the-box state.

### Deploy and validate, one YAML at a time

For each domain in dependency order — MN → MR → CR → FU —
deploy each YAML in the domain's `programs/{DOMAIN}/` folder
through the **Deployment → Configure** entry. After each
deployment:

1. Read the run log for warnings, errors, and unexpected
   `NOT_SUPPORTED` lines. NOT_SUPPORTED is expected for every
   `savedViews:`, `duplicateChecks:`, and `workflows:` entry
   per crmbuilder/CLAUDE.md — these are platform constraints
   not deployment errors.
2. Open EspoCRM and exercise each entity touched by the YAML —
   create a record, edit it, view list and detail.
3. Capture findings (engine bugs vs. YAML-shape bugs vs.
   schema/PRD divergences) in a per-deployment notes file.

When everything passes, the deployment-engine validation pass
is complete.

**Note on deploy order:** the prompt's Section 8 specifies MN →
MR → CR → FU, but this run made MN-Account.yaml depend on
accountType being declared (which CR-Account.yaml declares).
Two equally valid options:

- **Option A (prompt order, MN-Account fix-up):** Deploy MN
  first; expect MN-Account.yaml to fail or warn on accountType.
  Deploy CR-Account.yaml next, then re-deploy MN-Account.yaml.
- **Option B (CR-Account first):** Deploy CR-Account.yaml
  before any MN file; then proceed with MN → MR → CR (skipping
  CR-Account.yaml the second time) → FU.

Option B is cleaner. The prompt did not anticipate the
multi-file accountType dependency because it assumed MN-Account.yaml
would not be generated; see EXCEPTIONS.md MN-Y9-EXC-006.

### Address the FU drift before redeploying FU

Before re-deploying FU YAMLs, edit `programs/FU/FU-Account.yaml`:

1. Delete the `assignedSponsorCoordinator` field declaration
   (it currently has `type: link` which is rejected by
   `validate_program()` in v1.2.1+).
2. Bump `content_version` from `1.0.0` to `1.0.2` (a v1.0.1 was
   not used, but FU-Contribution went 1.0.0 → 1.0.1 for the
   parallel fix; FU-Account jumps direct to 1.0.2).
3. The `assignedSponsorCoordinatorLink` relationship in the
   relationships: block remains as-is.
4. Field-level metadata that lived on the removed declaration
   (description, category, requiredWhen, visibleWhen) does not
   propagate to link records via the deploy pipeline — configure
   post-deployment via the EspoCRM admin UI if needed.

See FU-VER-FINDING-001 above.

### Review EXCEPTIONS

For each domain's `EXCEPTIONS.md`, walk the entries and either
accept the best-effort decision or request a targeted regenerate
of the affected entity.

The two EXCEPTIONS most important to verify before deploy:

- **MR-Y9-EXC-010** (email template body files): three HTML
  files are referenced but not authored — would hard-reject
  validation. Either author the files at
  `programs/MR/templates/*.html` or remove the emailTemplates
  declarations before deploy.
- **CR-Y9-EXC-006** (Event entity name): if the EspoCRM deploy
  surfaces a name conflict between custom entity "Event" and
  the Event entity type, rename the entity to "CBMEvent" or
  similar.

### Review MANUAL-CONFIG

Each domain's `MANUAL-CONFIG.md` lists items the operator must
configure post-deployment in the EspoCRM admin UI. Work through
these after each domain's YAML deploys cleanly. Pay particular
attention to the Native Field Customization (Schema Gap) entries
since they require admin-side reconfiguration of fields the YAML
declared with placeholder types.

---

## Run-completion verification

- ✓ All YAML files parse as valid YAML (`yaml.safe_load`
  succeeded for all 15 files written and all 4 verified-only).
- ✓ Each domain has a commit on `main` and was pushed
  (MN: `f1bb674`, MR: `bdf4e78`, CR: `c566bdc`).
- ✓ `programs/PHASE-9-RUN-SUMMARY.md` (this file) exists and
  lists every domain.
- ✓ FU was verified without modification, per prompt
  Section 5.4.
- The summary commit will follow this file's creation.

**Last Updated:** 2026-05-04
