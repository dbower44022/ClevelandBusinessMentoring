# Session Prompt: MR-APPLY — Mentor Application Process Document

## Context

I'm working on the CBM CRM implementation. The Mentor Recruitment (MR) domain is in Phase 3 (Process Definition). Five process documents are being produced in dependency order: MR-RECRUIT → MR-APPLY → MR-ONBOARD → MR-MANAGE → MR-DEPART.

MR-RECRUIT v1.0 is complete and committed to the repo. This session produces the second process document: **MR-APPLY (Mentor Application)**.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## What This Process Covers

MR-APPLY covers the end-to-end application process for prospective mentors:

| Process Code | Process Name | Description |
|---|---|---|
| MR-APPLY | Mentor Application | Application submission through the public website, Contact record creation or update, duplicate detection, Mentor Administrator review, and approval or decline disposition |

The process document must contain all 11 required sections per the Process Definition Interview Guide.

## Source Material

The legacy MR Domain PRD (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) defines MR-APPLY with an 8-step workflow, 7 system requirements, and field-level data. This is enrichment and conversion into the 11-section standard, not blank-slate discovery.

## Decisions Already Made (from MR-RECRUIT session)

The following decisions were made during the MR-RECRUIT session and must be carried forward:

### 1. Prospect-to-Submitted Transition

MR-RECRUIT creates prospect contacts with Contact Type = Mentor and Mentor Status = Prospect. When a prospect submits an application:

- If the applicant has an existing prospect record, MR-APPLY updates it — Mentor Status changes from Prospect to Submitted and all application fields are populated.
- If no prospect record exists, MR-APPLY creates a new Contact record directly with Contact Type = Mentor and Mentor Status = Submitted.

MR-APPLY must handle both paths.

### 2. Duplicate Detection and Contact Merge

MR-APPLY must include duplicate detection logic when processing incoming applications (the legacy document already references this as MR-APPLY-DAT-001). Additionally, a **contact merge function** is required for cases where automated duplicate detection fails. This was a decision from the MR-RECRUIT session — the merge capability is a system requirement that belongs in MR-APPLY.

### 3. applicationDeclineReason Field (New)

The legacy MR-APPLY-REQ-006 requires recording a decline reason, but no such field exists in the Contact Entity PRD. A new field was agreed upon:

- **Field name:** applicationDeclineReason
- **Type:** enum
- **Values:** Insufficient Experience, Incomplete Application, Failed Background Check, Conflict of Interest, Other
- **Condition:** Required when Mentor Status = Declined
- **Access:** Admin-only
- **Dynamic logic:** Visible only when Mentor Status = Declined (same pattern as departureReason/departureDate)

This field must be defined in MR-APPLY's Data Collected section and flagged as a **Contact Entity PRD update** in Section 10.

### 4. Identifier Alignment

Preserve legacy identifiers (MR-APPLY-REQ-001 through REQ-007, MR-APPLY-DAT-001 through DAT-002) where requirements carry forward unchanged. Assign new sequence numbers only for new or significantly modified requirements.

### 5. Entity Inventory Gap — Deferred

Dues and SME Request entities are not in the Entity Inventory. They are being defined inline in process documents (Option B) and will be added to the Entity Inventory after all MR process documents are complete. MR-APPLY does not reference either entity.

## Key Items for MR-APPLY

### Application Form Fields

The legacy document (MR-APPLY-DAT-002) lists the application fields at summary level: "identity, professional background, expertise, languages, why interested in mentoring, how heard about CBM, felony disclosure, and terms acceptance timestamp."

The Contact Entity PRD (Section 3.3) has all 31 Mentor-specific fields fully defined with implementation names, types, and values. MR-APPLY's Data Collected section must enumerate the specific fields populated at application submission, cross-referenced against the Contact Entity PRD. Fields that are NOT populated at application (e.g., cbmEmailAddress, duesStatus, currentActiveClients) should not appear in MR-APPLY's data.

### Fields Populated at Application Submission

Based on the Contact Entity PRD and the legacy document, the fields populated at MR-APPLY submission include (verify against Contact Entity PRD):

**From the application form (system-populated from form submission):**
- contactType = Mentor
- mentorStatus = Submitted (or updated from Prospect to Submitted)
- firstName, lastName (native fields)
- personalEmail
- phoneNumber (native)
- linkedInProfile
- currentEmployer
- currentlyEmployed
- yearsOfBusinessExperience
- professionalBio
- industrySectors
- mentoringFocusAreas
- skillsExpertiseTags (if values are defined)
- fluentLanguages (if values are defined)
- whyInterestedInMentoring
- howDidYouHearAboutCbm
- felonyConvictionDisclosure
- termsAndConditionsAccepted = Yes
- termsAndConditionsAcceptanceDateTime = submission timestamp

**NOT populated at application (populated later by other processes):**
- cbmEmailAddress (MR-ONBOARD)
- ethicsAgreementAccepted, ethicsAgreementAcceptanceDateTime (MR-ONBOARD)
- backgroundCheckCompleted, backgroundCheckDate (MR-ONBOARD)
- trainingCompleted, trainingCompletionDate (MR-ONBOARD)
- maximumClientCapacity, acceptingNewClients (MR-ONBOARD)
- currentActiveClients, availableCapacity (MR-MANAGE, system-calculated)
- isPrimaryMentor, isCoMentor, isSubjectMatterExpert (MR-MANAGE)
- duesStatus, duesPaymentDate (MR-MANAGE)
- departureReason, departureDate (MR-DEPART)
- boardPosition (MR-MANAGE)

### System Requirements to Address

Legacy requirements MR-APPLY-REQ-001 through REQ-007 carry forward with potential refinements:

- REQ-001: Contact record creation — needs to address the prospect update path (not just creation)
- REQ-002: Terms and conditions recording — carries forward
- REQ-003: Confirmation email to applicant — carries forward
- REQ-004: Mentor Administrator notification — carries forward
- REQ-005: Submitted Applications view — carries forward
- REQ-006: Decline reason recording — now references the new applicationDeclineReason field
- REQ-007: Permanent record retention — carries forward

**New requirements needed:**
- Duplicate detection at application submission (checking for existing Contact with same email)
- Contact merge function for when duplicate detection fails
- Prospect record update path (updating existing Prospect record vs. creating new record)

### Cross-Domain Touchpoints

- **MR-RECRUIT → MR-APPLY:** Prospect contacts created by MR-RECRUIT may already exist when the application arrives. MR-APPLY must detect and update these.
- **MR-APPLY → MR-ONBOARD:** Approved applications (Mentor Status = Provisional) are the trigger for MR-ONBOARD. The handoff must be clearly defined.

### Status Transitions in MR-APPLY

- Prospect → Submitted (when existing prospect submits application)
- [New contact] → Submitted (when application arrives with no prior record)
- Submitted → Provisional (when Mentor Administrator approves)
- Submitted → Declined (when Mentor Administrator declines)

The legacy document mentions "In Review" as a Mentor Status value but does not use it in MR-APPLY's workflow. Determine whether In Review is a step between Submitted and Provisional/Declined, or whether it belongs to a different process.

## Documents to Upload

Upload the following documents with this prompt:

1. **MR-RECRUIT.docx** — the just-completed MR-RECRUIT process document (from `PRDs/MR/`). Cross-reference for established data fields and the MR-RECRUIT → MR-APPLY handoff.
2. **CBM-Domain-PRD-MentorRecruitment.md** — the legacy MR Domain PRD (from `PRDs/` root). Primary source material for MR-APPLY content.
3. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/`). Cross-reference for Mentor field alignment and to identify any fields not yet in the Entity PRD.
4. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root). For entity reference.

## Output

Produce one Word document committed to `PRDs/MR/MR-APPLY.docx` in the CBM repo.

## After This Session

With MR-APPLY complete, the next process document is **MR-ONBOARD (Mentor Onboarding)**. MR-ONBOARD covers post-approval onboarding steps: training completion, ethics agreement, background check, email provisioning, capacity setting, and activation (Provisional → Active).
