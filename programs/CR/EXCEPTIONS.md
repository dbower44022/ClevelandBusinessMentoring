# Client Recruiting Domain — Phase 9 Exception List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Client Recruiting (CR)
**Phase 9 conversation date:** 2026-05-04 (unattended multi-domain run)
**Files covered:** `CR-Contact.yaml`, `CR-Account.yaml`,
`CR-PartnershipAgreement.yaml`, `CR-Event.yaml`,
`CR-EventRegistration.yaml`, `CR-MarketingCampaign.yaml`,
`CR-CampaignGroup.yaml`, `CR-CampaignEngagement.yaml`,
`CR-Segment.yaml`

---

## CR-Y9-EXC-001 — Contact.prospectStatus value list straw-man pending CBM input

**Trigger.** CR-MARKETING-ISS-003 (open in CR Domain PRD v1.2):
the prospectStatus enum value list is "TBD pending CBM leadership
input." The CR Domain PRD provides a 5-value working straw-man:
New Prospect, Engaged, Unresponsive, Converted, Opted Out.

**Best-effort decision.** Adopt the 5-value straw-man verbatim
in CR-Contact.yaml.

**Rationale.** The straw-man is documented and the activity
design depends on Converted and Opted Out being terminal
states. Adopting it enables cross-entity references
(Segment.filterCriteria, Marketing Campaign deferral logic) to
be expressed concretely.

**Reversal cost.** Low — option list bump is content_version
PATCH.

**Open question for user.** What is CBM's authoritative
prospectStatus value list? Close CR-MARKETING-ISS-003 once
confirmed.

---

## CR-Y9-EXC-002 — Account.clientStatus value list straw-man

**Trigger.** No explicit value list declared in the Account
Entity PRD v1.8 Section 3.5 for clientStatus; the CR-MARKETING
SDO design and CR-EVENTS-CONVERT references imply 5 values
(Prospect, Applicant, Active Client, Inactive Client, Former
Client).

**Best-effort decision.** Adopt 5-value working list in
CR-Account.yaml: Prospect, Applicant, Active Client, Inactive
Client, Former Client.

**Rationale.** Mirrors the upstream design conventions and the
required transitions (Prospect → Applicant on MN-INTAKE; later
states drive CR-REACTIVATE candidacy).

**Reversal cost.** Low.

**Open question for user.** Confirm 5-value list. Add or rename
values per CBM's actual lifecycle taxonomy.

---

## CR-Y9-EXC-003 — Account.partnerOrganizationType and partnerType value lists

**Trigger.** Neither value list is enumerated in the Account
Entity PRD v1.8 Section 3.5.

**Best-effort decision.** partnerOrganizationType: 7-value list
(Community Organization, Nonprofit, Government Agency, Academic
Institution, Financial Institution, Corporation, Other).
partnerType: 6-value multiEnum (Client Referral, Mentor Source,
Co-Sponsor, Joint Marketing, Funder, Other).

**Rationale.** Drawn from CR-PARTNER-PROSPECT process narrative
(community organizations, nonprofits, government agencies,
academic institutions, financial institutions, corporations).
multiEnum chosen for partnerType because the PRD explicitly
states "a partner may hold more than one type simultaneously."

**Reversal cost.** Low.

**Open question for user.** Confirm both value lists with CBM
Partner Coordinator review.

---

## CR-Y9-EXC-004 — file / attachment-multiple field types not in YAML schema

**Trigger.** Two CR entities require file or attachment-multiple
fields:
- PartnershipAgreement.agreementDocument (file, single PDF
  upload, restricted access)
- Event.documents (attachment-multiple, staff-only event file
  storage)

The YAML schema v1.2.x supported types list (Section 6.2) does
not include `file` or `attachment-multiple`.

**Best-effort decision.** Declared both fields as `varchar`.
Pair each with MANUAL-CONFIG.md CR-MC-SC-001 noting that the
field must be reconfigured to the appropriate EspoCRM file /
attachment-multiple type via the admin UI post-deployment.

**Rationale.** Conservative declaration: a varchar declaration
will deploy without validation error and gives the operator a
named field to reconfigure. The alternative (omit the fields)
would lose the field name in the YAML record entirely and risk
the operator forgetting to add the field at all.

**Reversal cost.** Low — change field type post-deployment via
EspoCRM admin UI. No data migration risk if reconfigured before
records are created.

**Open question for user.** Should the CRM Builder schema add
`file` / `attachment-multiple` field types in a future v1.3 to
close this gap? Both types are used elsewhere in the CBM
implementation (Notes Service likely uses attachment-multiple).

---

## CR-Y9-EXC-005 — Event Registration bounce auto-suppression deferred

**Trigger.** CR-MARKETING-ISS-004 (open): Event Registration
lastCommunicationBouncedAt is system-populated by the bounce-
handling pathway but does not automatically suppress future
sends. The PRD acknowledges this gap and defers the suppression
rule to leadership input.

**Best-effort decision.** Field declared as
externallyPopulated:true in CR-EventRegistration.yaml.
Suppression behavior remains MANUAL-CONFIG (would land in
MANUAL-CONFIG.md as CR-MC-AA-X) once defined.

**Rationale.** No PRD-locked suppression rule exists yet to
implement.

**Reversal cost.** Low — when the rule is defined, it becomes a
workflow.

**Open question for user.** Define the bounce-suppression rule
(e.g., "after first hard bounce, set lastCommunicationBouncedAt
and suppress for 30 days; after second, suppress permanently").

---

## CR-Y9-EXC-006 — Event entity name vs Event entity type ambiguity

**Trigger.** EVT-ISS-001: the entity name "Event" matches the
entity type name "Event" used in `type: Event`. Some platforms
may treat this as a naming conflict.

**Best-effort decision.** Use entity name "Event" verbatim from
the PRD. Document the potential conflict in MANUAL-CONFIG.md
CR-MC-SC-003. If the deploy engine surfaces an error, change
the entity name to "CBMEvent" or similar via a content_version
MAJOR bump.

**Rationale.** Schema does not pre-emptively block the name and
the PRD uses "Event"; deferring the conflict to deploy-time
verification is the conservative choice.

**Reversal cost.** Medium — entity rename is a destructive
change requiring delete_and_create on a fresh deploy or
admin-side rename in EspoCRM.

**Open question for user.** Confirm at deployment whether the
Event name causes a conflict.

---

## CR-Y9-EXC-007 — Event status native field option override

**Trigger.** Event uses type Event; the native Event status
field has platform-default values that must be replaced with
the CBM-specific 6-value list (Draft, Scheduled, In Progress,
Completed, Cancelled, Postponed). The YAML schema does not
expose a way to override option values on a native field.

**Best-effort decision.** No explicit declaration of status in
CR-Event.yaml fields list. Document the override requirement in
MANUAL-CONFIG.md CR-MC-SC-002. The Event Entity PRD's six
status values must be configured manually in EspoCRM admin
(Entity Manager → Event → status field → edit options) after
deployment.

**Rationale.** Same shape as MN-Y9-EXC-equivalent for
Session.status (different list, same pattern).

**Reversal cost.** Low — manual EspoCRM admin step.

**Open question for user.** None — the override is a known
schema gap.

---

## CR-Y9-EXC-008 — MarketingCampaign reverse engagement aggregation depends on autocreated formula references

**Trigger.** MarketingCampaign declares 6 aggregate formulas
counting CampaignEngagement records via the campaign link
(declared in CR-CampaignEngagement.yaml as
campaignEngagementCampaign with link: campaign on the
CampaignEngagement side, linkForeign: engagements on the
MarketingCampaign side). The YAML schema's aggregate `via:`
clause expects the link name on the relatedEntity side, which
is `campaign`. This is the consistent pattern (FU-Account uses
the same shape for funderLifetimeGiving). At deploy time, the
formulas may need adjustment if the deploy engine resolves
`via:` differently than expected.

**Best-effort decision.** Use `via: campaign` consistently
across all 6 formulas. If deploy fails, the run log will
identify the specific resolution issue.

**Rationale.** The pattern is established in working FU
deploys; deviating without evidence would be premature.

**Reversal cost.** Low — adjust `via:` values per deploy log.

**Open question for user.** None pre-deploy; verify at deploy
time.

---

## CR-Y9-EXC-009 — Contact.lastMarketingEngagement uses max-of-sentAt rather than max-across-three-events

**Trigger.** PRD describes lastMarketingEngagement as "timestamp
of the most recent send, open, or click event" — a max across
three datetime fields on CampaignEngagement. The YAML schema's
aggregate formula expresses `function: max` on a single `field:`,
not a max across multiple fields.

**Best-effort decision.** Declare formula as max of `sentAt`
(the most populous of the three event timestamps). Pair with
MANUAL-CONFIG.md CR-MC-AA-001 noting that perfect max-across-
three-events fidelity requires post-deployment workflow
augmentation. Marked externallyPopulated:true so the workflow
can override the formula's value.

**Rationale.** sentAt approximates the intent (a Campaign send
to this Contact establishes "marketing engagement happened on
this date") even when an open or click happens later. The
post-deployment workflow can refine the value if needed.

**Reversal cost.** Low — formula edit is content_version PATCH.

**Open question for user.** Is max-of-sentAt sufficient for the
PRD's "stale prospect" detection use case, or is the
sub-day-precision max-of-three-events strictly required?

---

## Summary

Nine exceptions raised. Six are PRD value-list deferrals or
schema-shape decisions that the user should review on return.
Three (CR-Y9-EXC-004, -006, -007) are schema gaps in the YAML
program file schema itself that may be candidates for the
v1.3 schema cycle.

**Last Updated:** 2026-05-04
