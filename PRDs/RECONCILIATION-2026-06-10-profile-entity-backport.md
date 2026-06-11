# Reconciliation Back-Port — Profile-Entity Architecture

**Date:** 2026-06-10
**Source of truth:** live audit snapshot `programs/audit-20260610-023952/` (captured from `crm-test.clevelandbusinessmentors.org`, 2026-06-10T02:42Z)
**Compared against:** authored YAML in `programs/{CR,FU,MN,MR}/` (which the Entity/Domain PRDs were generated from)
**Purpose:** Ready-to-insert PRD content for structural changes that were made directly in the live instance and never recorded in the PRDs ("Bucket A" of the drift analysis). Buckets B (authored-but-undeployed) and C (entities not yet built) are decisions, not transcription, and are listed at the end as open items — not drafted here.

---

## 1. The headline structural change — Profile-entity model

The PRDs describe mentors, partners, sponsors, and clients as **role-typed Contact and Account records** with role fields on them, and wire Engagement / Session / Contribution / Event **directly to Contact and Account**.

The live system has moved to a **dedicated Profile-entity model**: `MentorProfile`, `PartnerProfile`, `SponsorProfile`, and `ClientProfile` are first-class entities, and the relationships that previously targeted Contact/Account now target the Profiles. `Account` and `Contact` carry **link fields** to their Profiles instead of role fields.

This was anticipated: `MN-Account.yaml`'s own header noted the partner/sponsor fields were "currently denormalized … rather than proper Account → PartnerProfile / SponsorProfile relationship links; converting to [links] is planned." The live instance executed that conversion. The PRDs must be updated to describe the Profile entities as the system of record for role attributes, with Account/Contact linking to them.

### Relationship re-wiring (live, not in PRDs)

| Live relationship | Replaces (authored) |
|---|---|
| `Engagement.mentorProfile → MentorProfile` (manyToOne) | `Engagement.assignedMentor → Contact` |
| `Engagement.requestedMentor → MentorProfile` (manyToOne) | `Engagement.requestedMentor → Contact` |
| `Engagement.additionalMentors → MentorProfile` (manyToMany) | `Engagement.additionalMentors → Contact` |
| `Engagement.referringPartner → PartnerProfile` (manyToOne) | `Engagement.referringPartner → Account` |
| `Session.sponsorProfile → SponsorProfile` (manyToOne) | *(Session attendees were `→ Contact`)* |
| `Contribution.sponsorProfile → SponsorProfile` (manyToOne) | `Contribution.donorAccount/donorContact → Account/Contact` |
| `Event.sponsorProfiles → SponsorProfile` (manyToMany) | `Event.coSponsoringPartners → Account` |
| `PartnerProfile.sessions → Session` (oneToMany) | *(new)* |
| `MentorProfile.sponsorsManaged → SponsorProfile` (oneToMany) | *(new)* |
| `ClientProfile.clientEngagements → Engagement` (oneToMany) | *(Engagement linked `→ Account` clientOrganization)* |

### Account / Contact → Profile link fields (live, not in PRDs)

| Entity | Link field | Type | Target |
|---|---|---|---|
| Account | `clientProfile` | link (manyToOne) | ClientProfile |
| Account | `sponsorProfile` | linkOne | SponsorProfile |
| Account | `companyPartnerProfile` | linkOne (oneToMany `cPartnerProfile`) | PartnerProfile |
| Account | `primaryContact` | linkOne | Contact |
| Account | `assignedLiaison` | link (manyToOne) | Contact |
| Account | `parentAccount` | link (manyToOne) | Account (self) |
| Contact | `clientContact` | linkOne | ClientProfile ("CBM Client Profile") |
| Contact | `mentorProfile` | linkOne | MentorProfile |
| Contact | `partnerProfile` | link (manyToOne) | PartnerProfile |
| Contact | `partnerProfiles` | linkMultiple | PartnerProfile |
| Contact | `sponsorProfile` | link (manyToOne) | SponsorProfile |
| Contact | `primaryCompany` | link | Account ("Client Company") |

> ⚠️ Both `Contact.partnerProfile` (single) and `Contact.partnerProfiles` (multiple) exist live — likely an in-progress duplication. Confirm which is intended before documenting.

---

## 2. Field additions by entity (live, not in PRDs)

All definitions below are transcribed verbatim from the 06-10 audit. Fields flagged **⚠ placeholder** appear unfinished and should be confirmed before being written into a PRD as final.

### Account — sponsorship & partnership block

| Field | Type | Notes |
|---|---|---|
| `sponsorshipLevel` | enum | Title / Platinum / Gold / Silver / Bronze |
| `sponsorshipStartDate` | date | |
| `sponsorshipRenewalDate` | date | |
| `annualPledgeAmount` | currency | (+ `annualPledgeAmountConverted`, `annualPledgeAmountCurrency` system companions) |
| `partnershipAgreementDate` | date | |
| `partnerContactCadence` | enum | Monthly / Quarterly / Semi-Annually / Annually / As-Needed |
| `companyPartnerType` | foreign | mirror via `companyPartnerProfile` link |
| `clientNotes` | wysiwyg | ⚠ label is "Company Notes" — reconcile name vs label |
| `sponsorNotes` | wysiwyg | |

**Type change:** `Account.partnerType` is now **`multiEnum`** live vs **`enum`** in the PRD (an account can hold multiple partner types).

### Contact

| Field | Type | Notes |
|---|---|---|
| `birthday` | date | |
| `spouseName` | varchar(100) | |
| `suffix` | enum | Jr / Sr / PhD / MD / Esq / CPA |
| `personalProfile` | wysiwyg | |

### ClientProfile

| Field | Type | Notes |
|---|---|---|
| `clientContactEmail` | foreign | mirror ("Contact Email") |

### Engagement

| Field | Type | Notes |
|---|---|---|
| `engagementStartDate` | date | |

### Event — content/publishing block

| Field | Type | Notes |
|---|---|---|
| `eventType` | enum | Online Webinar / In Person Event / Online Course (default Online Webinar) |
| `eventOverview` | wysiwyg | |
| `eventSyllabus` | wysiwyg | |
| `eventReleaseDate` | datetime | |
| `eventGraphic` | file | |
| `sponsorGraphic` | file | |

### MentorProfile

| Field | Type | Notes |
|---|---|---|
| `profilePhoto` | image | |
| `resumeUpload` | file | |
| `aboutMentor` | wysiwyg | ⚠ label "AboutMentor" (formatting) |
| `areaOfExpertise` | multiEnum | ⚠ placeholder options "Area 1"/"Area 2" — needs real list |
| `termsAccepted` | bool | ⚠ label "TermsAccepted" (formatting) |
| `contactStreet` / `contactCity` / `postalCode` / `contactPhone` / `personalEmail` | foreign | address block mirrored from linked Contact — not standalone fields |

### PartnerProfile

| Field | Type | Notes |
|---|---|---|
| `partnershipStatus` | enum | Meetings Held / Proposal Sent / MOU/Contract Sent / MOU/Contract Signed / Inactive / Candidate |
| `partnershipValue` | multiEnum | stakeholder connection / speakers / co-hosted events / website link / facilities / funding / other / none |
| `bMValueProvided` | multiEnum | ⚠ "Speking Opportunities" typo in option list |
| `relationGoalsEst` | enum | Yes / No / In Progress |
| `partnerEmail` | foreign | mirror |

### SponsorProfile

| Field | Type | Notes |
|---|---|---|
| `lastContribution` | date | "Last Contribution Date" |
| `totalContribution` | currency | |

---

## 3. Open items (NOT drafted — decisions required)

**Bucket B — authored in PRDs, not deployed (decide: deploy, or prune from PRDs).**
- `Account`: ~98 business-profile intake fields (legalBusinessName, naicsCode, employee counts, insurance/certification/ownership blocks, capital-seeking block, etc.)
- `Contact`: ~55 fields (mentor status/capacity, donor, dues, marketing-engagement counters, ethics/terms acceptance, etc.)
- `SponsorProfile`: 5 authored fields (annualPledgeAmount, sponsorshipLevel/Start/RenewalDate, sponsorNotes) — note these now live on **Account**, not SponsorProfile; the PRD model may be misplaced.
- `Resource`: `description`

**Bucket C — entities authored, not yet built (confirm "not built yet").**
`CampaignEngagement`, `CampaignGroup`, `MarketingCampaign`, `Segment`, `PartnershipAgreement` (CR), `FundraisingCampaign` (FU), `Dues` (MR). Their authored relationships (e.g. `Contribution → FundraisingCampaign`, `MarketingCampaign → CampaignGroup/Segment`) are correspondingly absent live.

**Clean — no action.** `Contribution`, `Session`, `EventRegistration` field sets are identical between PRD and live.

---

## 4. Recommended PRD edits

1. **Account, Contact, ClientProfile, MentorProfile, PartnerProfile, SponsorProfile, Engagement, Session, Event Entity PRDs** — add §1's link/relationship model and §2's fields. The Profile entities likely need their own Entity PRDs if they don't have full ones yet (`*-TEST.yaml` suggests they were scaffolded, not formally specified).
2. **Engagement / Session / Contribution / Event PRDs** — rewrite the relationship sections to point at Profiles per §1's re-wiring table.
3. **Resolve the ⚠ items with CBM** before finalizing — they are live but unfinished.
4. **Do not hand-edit the generated `.docx`** — update the `generate-*.js` source (or the YAML feedstock) and re-render, so the PRDs stay reproducible.
