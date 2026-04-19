# Session Prompt: CR Domain Stakeholder Review (Phase 8)

**Repo:** `dbower44022/ClevelandBusinessMentoring`
**Date:** 04-18-26
**Prerequisite:** Read `CLAUDE.md` in both `crmbuilder` and `ClevelandBusinessMentoring` repos.

---

## Context

The Client Recruiting Domain PRD v1.0 is complete and ready for
stakeholder review (Phase 8 of the Document Production Process).
Phase 8 is primarily conducted outside Claude — stakeholders review
documents directly, provide feedback, and resolve open issues.

This session prepares the review package: a summary document that
accompanies the CR Domain PRD for stakeholder circulation, plus a
checklist of decisions and open issues that require stakeholder
input. If significant rework is needed after stakeholder feedback,
a follow-up Claude session can apply the changes.

**Dependency:** The MR Phase 9 follow-up session
(`PRDs/MR/SESSION-PROMPT-MR-PHASE9-FOLLOWUP.md`) should ideally be
completed before stakeholder review begins, because it changes the
howDidYouHearAboutCbm enum from 10 values to 8 values — a change
that affects the CR Domain PRD's channel rollup mapping (Section
4.1.1). However, the review can proceed with a note that the
8-value list supersedes the 10-value list documented in v1.0.

---

## Before Starting

1. Read `CLAUDE.md` in both `dbower44022/crmbuilder` and
   `dbower44022/ClevelandBusinessMentoring`
2. Read the CR Domain PRD v1.0 at
   `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx`
3. Read the Document Production Process Phase 8 description
   (Section 3.8) at
   `crmbuilder/PRDs/process/CRM-Builder-Document-Production-Process.docx`

---

## Documents for Stakeholder Circulation

The following documents should be shared with stakeholders for
review. The CR Domain PRD is the primary review document; the
supporting documents provide context.

### Primary Review Document

| Document | File | Version |
| --- | --- | --- |
| Client Recruiting Domain PRD | `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx` | v1.0 |

### Supporting Documents (for reference)

| Document | File | Version |
| --- | --- | --- |
| CR Domain Overview | `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx` | v1.2 |
| CR-PARTNER SDO | `PRDs/CR/PARTNER/CBM-SubDomain-Overview-Partner.docx` | v1.1 |
| CR-MARKETING SDO | `PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx` | v1.2 |
| CR-EVENTS SDO | `PRDs/CR/EVENTS/CBM-SubDomain-Overview-Events.docx` | v1.0 |
| CR-REACTIVATE SDO | `PRDs/CR/REACTIVATE/CBM-SubDomain-Overview-Reactivate.docx` | v1.0 |

Stakeholders do not need to review all seven process documents
unless they want to examine the detailed workflow for a specific
process. The Domain PRD synthesizes and reconciles all process-
level content.

---

## Open Issues Requiring Stakeholder Input

The CR Domain PRD consolidates 17 open issues. Four require direct
stakeholder or CBM leadership input and cannot proceed without it.
These are the priority items for the review.

### Priority 1: CBM Leadership Decisions Needed

**CR-MARKETING-ISS-003 — Contact.prospectStatus value list.**
What are the allowed values for the prospectStatus field on
Contact? This field tracks the marketing-funnel state of an
individual person (e.g., New Prospect, Engaged, Unresponsive,
Converted, Opted Out). The straw-man values listed in the CR
Domain PRD are placeholders pending CBM leadership input.

**CR-MARKETING-ISS-004 — Account.clientStatus value list.**
What are the allowed values for the clientStatus field on Account?
This field tracks the client-relationship state of a company
(e.g., Prospect, Applicant, Active Client, On Hold, Former
Client). The straw-man values are placeholders pending CBM
leadership input.

### Priority 2: Stakeholder Input Needed

**CR-MARKETING-ISS-001 — Geographic targeting model.** How should
geographic targeting work for marketing segmentation and event
reporting? Options include free-text address fields (current
fallback), structured geographic taxonomy (zip code, county,
region), or a hybrid approach. Affects CR-MARKETING-CONTACTS
(segmentation), CR-EVENTS-CONVERT (geography report), and
CR-REACTIVATE-OUTREACH (geographic filtering). Also affects
Account.geographicServiceArea format (ACT-ISS-004).

**CR-MARKETING-ISS-002 — Media and PR tracking model.** How does
CBM want to track media coverage and PR activities? This was
identified during the CR-MARKETING Sub-Domain Overview as a
potential future capability. Stakeholder input determines whether
it remains deferred or is brought into scope.

### Priority 3: Platform-Dependent (Deferred Until Implementation)

The following open issues depend on the selected marketing platform
or Survey Service and do not require stakeholder input during this
review:

- **CR-MARKETING-CONTACTS-ISS-004** — Hard-bounce threshold
  (depends on marketing platform bounce-tracking capability)
- **CR-PARTNER-MANAGE-ISS-001** — Partner satisfaction NPS scores
  (depends on Survey Service)
- **CR-PARTNER-MANAGE-ISS-003** — Partner feedback surveys
  (depends on Survey Service)
- **CR-EVENTS-ISS-001** — Event feedback surveys (depends on
  Survey Service)

### Priority 4: Operational (Low Urgency)

- **CR-PARTNER-MANAGE-ISS-002** — Engagement outcome impact
  metrics (CBM program leadership input needed)
- **CR-EVENTS-CONVERT-ISS-001** — Per-send engagement tracking
  for conversion-push (revisit 6+ months post-deployment)
- **CR-EVENTS-MANAGE-ISS-001** — Virtual attendance import tooling
  (revisit when a virtual meeting platform is standardized)

### Cross-Domain Issues (Pending FU Domain)

- **CON-ISS-004** — Contact field coverage incomplete; CR domain
  complete, FU domain fields still pending
- **ACT-ISS-002** — Account field coverage incomplete; CR domain
  complete, FU domain fields still pending

These will be resolved when the Fundraising domain process
documents are completed.

---

## Reconciliation Decisions for Stakeholder Awareness

Three reconciliation decisions were made during CR Domain
Reconciliation (Phase 5). Stakeholders should be aware of these
but they do not require re-decision unless stakeholders object:

**CR-RECON-DEC-001 — Unified Campaign status lifecycle.** All
Campaign channels (Email, SMS, Reactivation) use the same
five-value status lifecycle: Draft, Scheduled, Sent, Complete,
Cancelled. No channel-dependent status restrictions.

**CR-RECON-DEC-002 — Unified Campaign Engagement field set.**
All five event types (sent, opened, clicked, bounced,
unsubscribed) with paired timestamps exist for all channels.
Reactivation Campaigns simply do not populate the unsubscribed
fields.

**CR-RECON-DEC-003 — Reactivation saved-list criteria.** The
Reactivation Candidates saved-list query uses three factual
criteria owned by CR-EVENTS-CONVERT. The emailOptOut filter is
the consuming process's responsibility at send time, not a
saved-list criterion.

---

## Review Checklist for Stakeholders

Stakeholders should confirm the following during their review:

- [ ] The seven processes accurately reflect how CBM wants to
      operate across all four CR sub-domains
- [ ] The three reconciliation decisions are acceptable
- [ ] The 20 compiled decisions (Section 5) are acceptable
- [ ] The straw-man values for prospectStatus and clientStatus
      are reasonable starting points (or provide final values)
- [ ] Geographic targeting requirements are understood well
      enough to choose an approach (or confirm deferral)
- [ ] No cross-domain conflicts with the Mentoring or Mentor
      Recruitment domains are apparent
- [ ] No missing processes or capabilities are identified

---

## After Stakeholder Review

If feedback requires changes:

1. Collect all feedback into a single list organized by document
   section
2. Start a new Claude session with the CR Domain PRD and the
   feedback list as input
3. Apply changes, bump version to v1.1, and commit

If feedback is minor (typos, clarifications, no structural
changes), the administrator may apply changes directly to the
Word document without a Claude session.

Once approved, the CR Domain PRD is ready for YAML Generation
(Phase 9) when the CR domain's turn arrives. The MR domain pilot
is currently running Phases 9 through 13; the CR domain will
follow the same pattern after the pilot validates the methodology.

Update `CLAUDE.md` to reflect:
- CR Domain PRD stakeholder review status (approved, or approved
  with changes at version v1.1)
- Any open issues resolved by stakeholder input
- Any new issues surfaced during review
