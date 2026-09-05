# Mentor Application — Process PRD

| Field | Value |
|-------|-------|
| Version | 0.3 |
| Last Updated | 09-04-26 07:40 |
| Status | DISCUSSION DRAFT — render of process record PROC-001 (mission_critical, domain DOM-001) as of 09-04-26, written on Doug's approval (DEC-038); field links pending the form field list (DEC-033) |
| Audience | Doug as Engagement Lead and CBM administrator-as-proxy; later the Mentor Administration Team |
| Governs | Nothing on its own. The process record PROC-001 and its links in the V2 database are the source; this file becomes a dated render of it after the write (DEC-1021) |

## Purpose

This draft renders what the Mentor Application interview of 2026-09-04 established (session SES-013, conversation CNV-012, planning item PI-011, requirement REQ-004, anchoring decision DEC-017) and what remains open. Every step cites the ruling it rests on (DEC-018 to DEC-037). The April 2026 document MR-APPLY v1.1 is the baseline; where a ruling changed it, the change is named. The process record was written to the V2 database on Doug's approval (DEC-038) on 09-04-26: PROC-001 patched in place; requirements REQ-005 to REQ-016 created and approved; the candidate Mentor Administration process PROC-002, the message template MSG-001, the view VEW-001 and the term TERM-056 created; the persona, entity, requirement, handoff and reference links written. The field links wait for the form field list (DEC-033). Section 11 lists the rulings.

## 1. Process metadata

| Field | Value |
|---|---|
| Name | Mentor Application |
| Domain | DOM-001 Mentor Recruiting |
| Purpose (proposed) | Take a prospective mentor from the Become a Mentor form on the CBM website to an Active mentor with a CRM user account, or to Declined, through the Mentor Administration Team's two-stage review, two team votes and a provisional period with training. Every submission is preserved as a submission record; the mentor's Contact and MentorProfile are created or updated from it. |
| Owner persona | Mentor Administration Team (PER-009) |
| Performing personas | Mentor Administration Team (PER-009); Mentor (PER-010) as the applicant; the system for the automated steps |
| Classification | `mission_critical` (DEC-032): without this process no mentor enters the chapter, and every other Mentor Recruiting process depends on the mentors it produces |
| Frequency | About two applications a month |
| Duration | Set by the candidate's pace: training usually a week, the provisional period usually three to four weeks; the review stages depend on team availability, which the interview did not quantify |

## 2. Trigger

A prospective mentor presses the Become a Mentor link on the CBM website and submits the form it opens. No precondition: the person may have a Prospect record from recruiting, a Declined record from an earlier application, or no record at all. *DEC-018, DEC-029.*

## 3. Inputs

The submitted form (contact information, industry, area of expertise, why they want to mentor, terms acceptance; the exact field list is supplied by Doug before the field links are written, DEC-033); existing Contact and MentorProfile records, matched by email; the Mentor Administration Team's judgment at each review stage.

## 4. Steps

**Team** = a member of the Mentor Administration Team, whoever is available (DEC-022). **Applicant** = the Mentor persona at an early stage (DEC-025). **System** = the CRM and the website form together.

| # | Step | Who | Condition | Records touched | Ruling |
|---|---|---|---|---|---|
| 1 | Press Become a Mentor, complete the form, accept the terms, submit. | Applicant | Always | — | DEC-018, DEC-025 |
| 2 | Create a submission record holding the exact form data, form type volunteer. | System | Always, including the conflict case | IntakeSubmission created | DEC-018, DEC-019 |
| 3 | Send the applicant the automatic thank-you / confirmation-received email. | System | Always | — | DEC-026 |
| 4 | Match the submitter email against existing Contacts and create the mentor records: (a) no match, create the Contact and MentorProfile with status Candidate; (b) match in Prospect, update it to Candidate; (c) match in Declined, return it to Candidate and note that this is a second application; (d) match in any other status, create no mentor records, show the submitter an error directing them to contact CBM, notify the Team of the conflict. | System | Always | Contact, MentorProfile created or updated; submission linked to the Contact | DEC-019, DEC-029 |
| 5 | The Candidate record appears in the Mentor Administration App. No email to the Team. | System | After 4a–4c | — | DEC-020, DEC-026, DEC-030 |
| 6 | Preliminary review: legitimacy and basic requirements. Set Under Review, or Declined with a decline reason and an optional manual email. | Team | Each Candidate | MentorProfile status, decline reason, notes | DEC-020, DEC-024, DEC-026 |
| 7 | Thorough evaluation including in-person interviews; each member tries to take part and records their opinion as a note. | Team | Under Review | MentorProfile notes | DEC-020, DEC-022, DEC-024 |
| 8 | First team vote. Set Accepted-Provisional or Declined; one member records the decision summary: outcome, date, decline reason when declined; optional manual decline email. | Team | After 7 | MentorProfile status, notes, decline reason | DEC-023, DEC-024, DEC-026 |
| 9 | Add the candidate to the chapter email system and set up training; then set Provisional and email the candidate by hand. | Team | Accepted-Provisional | MentorProfile status | DEC-020, DEC-026 |
| 10 | Provisional period: the candidate completes full training; the Team records provisional items as they are collected (training completed and date, ethics agreement and timestamp, background check and date, mentor code acceptance) and reviews provisional progress. Nothing gates the next step but the Team's judgment. | Applicant; Team | Provisional | MentorProfile provisional fields | DEC-020, DEC-027 |
| 11 | Second team vote. Set Approved or Declined; decision summary recorded as in step 8. | Team | After 10 | MentorProfile status, notes, decline reason | DEC-023, DEC-024 |
| 12 | Create the mentor's CRM user account, then set Active. A member emails the new mentor by hand. | System; Team for the email | Approved | User created; MentorProfile status | DEC-028, DEC-026 |
| 13 | Hand off to the Mentor Administration process. | — | Active | — | DEC-021 |

At any stage: a candidate who stops responding is set Dormant; a candidate who withdraws is set Declined with a note. *DEC-029.*

## 5. Outcomes

An Active mentor with a Contact, a MentorProfile, a CRM user account and the retained submission record; or a Declined record retained with its decline reason and notes, re-enterable by a new application; or a Dormant record for an unresponsive candidate. The confirmation email was sent at submission; the Mentor Administration process takes over from Active. *DEC-021, DEC-028, DEC-029.*

## 6. Entities and personas touched

| Record | Read | Created | Updated |
|---|---|---|---|
| IntakeSubmission ENT-021 (confirmed) | — | 2 | linked at 4 |
| Contact ENT-004 (confirmed) | 4 (email match) | 4a | 4b, 4c |
| MentorProfile ENT-022 (candidate) | 5–11 | 4a | 4b, 4c, 6–12 |
| User ENT-016 (candidate) | — | 12 | — |
| Mentor Administration Team PER-009 (candidate) | performs 6–12 | | |
| Mentor PER-010 (candidate) | performs 1, 10 | | |
| Mentor Administration process PROC-002 (candidate, DEC-034) | handoff at 13 | | |
| Message template "Mentor application confirmation" MSG-001 (candidate, DEC-034) | used at 3 | | |
| View "Mentor candidates" VEW-001 on MentorProfile, status Candidate (candidate, DEC-034) | used at 5 | | |

The audited pairs Mentor Administration Role PER-008 / Team PER-009 and Mentor Role PER-010 / Team PER-011 are not merged here; the edges go to PER-009 and PER-010 and the pairs are left for the persona pass.

## 7. Exception handling

- **Conflict on email match (4d).** No mentor records; submitter error; conflict notification to the Team; the submission record remains as the audit copy. *DEC-019, consequence of DEC-018.*
- **Undetected duplicate** (applied under a different email). Created as new at 4a; when found in review, consolidated by a manual contact merge. *DEC-019.*
- **Re-application after Declined.** The record returns to Candidate; notes say second application. *DEC-029.*
- **Unresponsive at any stage.** Set Dormant. No exit from Dormant is defined; reviving a dormant candidate is an open issue for the Mentor Administration Team. *DEC-029, DEC-036.*
- **Withdrawal.** Set Declined with a note. Which decline-reason value applies is settled with the field list (DEC-033). *DEC-029.*
- **Decline with no notice.** Allowed at every decline point. *DEC-026.*
- **Approved before every provisional item is collected.** Allowed; the Team decides. Unfinished items pass to the Mentor Administration process. *DEC-027.*
- **CRM unreachable at submission.** The website writes every submission through a separate transaction database acting as a write-through cache; if that is unavailable it writes a JSON file to a directory that a repeating process replays once the database and the CRM are available. No submission is lost or emailed for manual entry. *DEC-037.*

## 8. System requirements (requirement records REQ-005 to REQ-016)

Each is a requirement record defined in CNV-012, in topic TOP-003, scoped to DOM-001, approved by DEC-038 and linked `requirement_realized_by_process` to PROC-001; R1 refines REQ-001. Existing REQ-001 (record every intake submission) and REQ-002 (link each submission to its Contact) are linked the same way.

| # | Requirement | From |
|---|---|---|
| R1 (REQ-005) | A Become a Mentor submission is recorded as a submission record of form type volunteer holding the exact form data, before any mentor record is created. Refines REQ-001. | DEC-018 |
| R2 (REQ-006) | From a volunteer submission the system creates or updates the mentor records by email match: create on no match; update a Prospect; return a Declined record to Candidate with a second-application note; any other match is a conflict. | DEC-019, DEC-029 |
| R3 (REQ-007) | On a conflict the system creates no mentor records, shows the submitter an error directing them to contact CBM, notifies the Mentor Administration Team, and keeps the submission record. | DEC-019 |
| R4 (REQ-008) | On a successful submission the system sends the applicant an automatic thank-you / confirmation-received email from a message template. | DEC-026 |
| R5 (REQ-009) | A view of mentor records in Candidate status defines the team's application queue; the Mentor Administration App, the application under definition, presents it so a new Candidate is visible without an email. | DEC-020, DEC-031, DEC-034 |
| R6 (REQ-010) | A mentor record accepts notes from several Team members and a decision summary with outcome and date; a decline reason is required when the status is Declined. | DEC-024 |
| R7 (REQ-011) | Mentor status carries the thirteen live values and supports the process transitions: Candidate to Under Review or Declined; Under Review to Accepted-Provisional or Declined; Accepted-Provisional to Provisional; Provisional to Approved or Declined; Approved to Active; any pre-Active status to Dormant; Declined to Candidate on re-application. | DEC-020, DEC-023, DEC-029 |
| R8 (REQ-012) | Provisional items (training, ethics agreement, background check, mentor code) are recorded on the mentor record when collected and are not preconditions for Approved. | DEC-027 |
| R9 (REQ-013) | When the status becomes Approved the system creates a CRM user account for the mentor and then sets the status to Active. | DEC-028 |
| R10 (REQ-014) | The Team can merge two Contact records to consolidate an undetected duplicate. Carried from April (MR-APPLY-REQ-009), supported by DEC-019. | DEC-019 |
| R11 (REQ-015) | Mentor records, their Contact and their submission records are retained permanently regardless of outcome: no deletion and no anonymisation for declined, dormant or withdrawn applicants. | DEC-035 |
| R12 (REQ-016) | Every website submission is written through a separate transaction database acting as a write-through cache; when it is unavailable the submission is queued as a JSON file and replayed until the database and the CRM accept it. | DEC-037 |

## 9. Data (proposed field links)

**Placeholder, not a source (DEC-033).** The field links are written from the current Become a Mentor form's exact field list, which Doug supplies; nothing below is linked until then. The list shows the live fields a name-based mapping of the April form would have picked, with the duplicate live fields named so the form list can settle them.

**IntakeSubmission (ENT-021):** form FLD-361, submitterEmail FLD-363, status FLD-364, source FLD-365, payload FLD-518, submissionNotes FLD-515.

**Contact (ENT-004):** firstName FLD-703, middleName FLD-725, lastName FLD-704, preferredName FLD-260, emailAddress FLD-708, phoneNumber FLD-709, address FLD-711, linkedInProfile FLD-261, employmentStatus FLD-450, contactType FLD-259.

**MentorProfile (ENT-022):** mentorStatus FLD-368; mentorStatusNotes FLD-411; declinedReason FLD-410 (duplicate rejectionReason FLD-440 not linked); industrySector FLD-370 (duplicate industryExperience FLD-447 not linked); areaOfExpertise FLD-407 (mentoringFocusAreas FLD-371 not linked; Doug named "area of expertise"); mentoringWhyInterested FLD-372; mentorProfessionalBio FLD-373; yearsOfExperience FLD-378; fluentLanguages FLD-385; howDidYouHearAboutCBM FLD-377 (Contact howDidYouHear FLD-448 not linked); felonyConfiction FLD-376 (live name misspelt; rename is a field matter, noted); termsAccepted FLD-406; personalEmail FLD-380; trainingCompleted FLD-386; trainingCompletionDate FLD-387; ethicsAgreementAccepted FLD-388; ethicsAgreementAcceptanceDateTime FLD-389; backgroundCheckCompleted FLD-390; backgroundCheckDate FLD-391; mentorCodeAccepted FLD-453 (codeAccepted FLD-459 not linked).

Not linked: cbmEmail FLD-369 (the chapter email system was not tied to this field), the capacity and public-profile fields (DEC-028 named none of them).

## 10. Acceptance criteria for the write (state as of 09-04-26)

1. Met. PROC-001 has purpose, triggers, steps, outcomes, edge cases, frequency, duration, classification and rationale populated; notes name the rulings and the render path.
2. Met (verified by read-back: 1 handoff, 2 persona, 4 entity and 23 reference links out; 14 realized-by and 23 is_about links in). Edges: `process_performed_by_persona` to PER-009 and PER-010; `process_touches_entity` to ENT-021, ENT-004, ENT-022, ENT-016; `process_touches_field` per §9 as ruled; `requirement_realized_by_process` from REQ-001, REQ-002 and R1–R12; `process_hands_off_to_process` to the Mentor Administration process; `references` to DEC-018..DEC-037, the message template and the view; `is_about` from each ruling already exists.
3. Met. REQ-005 to REQ-016 exist, confirmed by DEC-038, each within the readability limit.
4. Met. PROC-002, MSG-001 and VEW-001 exist and are linked; TERM-056 "Mentor Administration App" is a draft term.
4a. Open. The field links are written in a second step when the form list arrives (DEC-033); the record notes say so.
5. A dated render is committed in the CBM repository with a manifest row and a `Governed-By: trivial` trailer; PI-011 resolves after the push.
6. Every new term is approved or flagged; no malformed identifier.

## 11. Rulings applied

1. **DEC-031** (Q1, option B, against the recommendation): the term is **Mentor Administration App**; earlier references to "Mentor Review App" were updated.
2. **DEC-032** (Q2, option A): classification `mission_critical`.
3. **DEC-033** (Q3, option B, against the recommendation): the field links wait for the current form's exact field list, supplied by Doug; the section 8 mapping is a placeholder.
4. **DEC-034** (Q4, option C, against the recommendation): the batch creates three candidate records: the Mentor Administration process, the confirmation message template, and a CRM view of MentorProfile records in Candidate status.
5. **DEC-035** (Q5, option A): permanent retention carried forward as R11.
6. **DEC-036** (Q6, option A): no exit from Dormant; revival is an open issue for the team.
7. **DEC-037** (Q7, Doug's own design): submissions are written through a transaction database acting as a write-through cache, with a JSON file queue replayed until delivered; R12.

**Mechanical, decided unless you object:** the render goes to `/home/doug/Dropbox/Projects/ClevelandBusinessMentors/specifications/mentor-recruiting/mentor-application-process.md`, with a `specifications/README.md` manifest created in that repository on the crmbuilder pattern; the commit uses a pathspec and `Governed-By: trivial` with an exemption reason; PI-011 resolves after Doug's push.

**Terms:** "Mentor Administration App" approved (DEC-031), term record TERM-056. "Chapter email system" uses the existing term Chapter. "Transaction database" and "write-through cache" are defined in DEC-037 and used descriptively. "Store" was the agent's shorthand for the V2 database and is not used.

## Change log

| Version | Date | Change |
|---|---|---|
| 0.3 | 09-04-26 07:40 | First committed render. PROC-001 written on Doug's approval (DEC-038): twelve requirements REQ-005..016, candidate records PROC-002, MSG-001, VEW-001, term TERM-056, and the links. Field links pending (DEC-033). |
| 0.2 | 09-04-26 07:05 | Rulings DEC-031 to DEC-037 applied; "store" replaced by "V2 database"; R11 and R12 added; three candidate records in the batch; field links deferred to the form list. |
| 0.1 | 09-04-26 06:10 | Drafted from the interview of 09-04-26 (SES-013 / CNV-012, DEC-018..DEC-030) under PI-011 / REQ-004; seven open questions. |
