# Mentor Application — Process PRD

| Field | Value |
|-------|-------|
| Version | 0.7 |
| Last Updated | 09-05-26 14:05 |
| Status | DISCUSSION DRAFT — render of process record PROC-001 (mission_critical, domain DOM-001) as of 09-05-26 after the field links (DEC-039), the application-conformance rulings (DEC-040 to DEC-044) the status-transition table (DEC-045), the field roles (DEC-046) and the fill policy (DEC-047) |
| Audience | Doug as Engagement Lead and CBM administrator-as-proxy; later the Mentor Administration Team |
| Governs | Nothing on its own. The process record PROC-001 and its links in the V2 database are the source; this file becomes a dated render of it after the write (DEC-1021) |

## Purpose

This draft renders what the Mentor Application interview of 2026-09-04 established (session SES-013, conversation CNV-012, planning item PI-011, requirement REQ-004, anchoring decision DEC-017) and what remains open. Every step cites the ruling it rests on (DEC-018 to DEC-037). The April 2026 document MR-APPLY v1.1 is the baseline; where a ruling changed it, the change is named. The process record was written to the V2 database on Doug's approval (DEC-038) on 09-04-26: PROC-001 patched in place; requirements REQ-005 to REQ-016 created and approved; the candidate Mentor Administration process PROC-002, the message template MSG-001, the view VEW-001 and the term TERM-056 created; the persona, entity, requirement, handoff and reference links written. The field links wait for the form field list (DEC-033). Section 13 lists the rulings.

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
| 2 | Capture the submission in the application's transaction database first, write a submission receipt in the CRM (status Received, raw form content), and hold a same-form same-email resubmission within 24 hours for staff review. The JSON file fallback is required, not yet built. | System | Always, including the conflict case | IntakeSubmission created | DEC-018, DEC-019, DEC-037, DEC-040 |
| 3 | Show the on-screen thank-you and, when the setting "Send mentor applicants confirmation email" is on, send the confirmation email from the template. The email is required, not yet built (PI-013). | System | Always | — | DEC-026, DEC-043 |
| 4 | Match the submitter email against existing Contacts and create the mentor records: (a) no match, create the Contact and MentorProfile with status Candidate; (b) match in Prospect, update it to Candidate; (c) match in Declined, return it to Candidate and note that this is a second application; (d) match in any other status, create no mentor records, show the submitter an error directing them to contact CBM, notify the Team of the conflict. | System | Always | Contact, MentorProfile created or updated; submission receipt linked to the Contact, set Completed. Paths (b), (c), (d) required, not yet built (PI-012) | DEC-019, DEC-029, DEC-040 |
| 5 | The Candidate record appears in the Mentor Administration App. No email to the Team. | System | After 4a–4c | — | DEC-020, DEC-026, DEC-030 |
| 6 | Preliminary review: legitimacy and basic requirements. Set Under Review, or Declined with a decline reason and an optional manual email. | Team | Each Candidate | MentorProfile status, decline reason, notes | DEC-020, DEC-024, DEC-026 |
| 7 | Thorough evaluation including in-person interviews; each member tries to take part and records their opinion as a note. | Team | Under Review | MentorProfile notes | DEC-020, DEC-022, DEC-024 |
| 8 | First team vote. Set Accepted-Provisional or Declined; one member records the decision summary: outcome, date, decline reason when declined; optional manual decline email. | Team | After 7 | MentorProfile status, notes, decline reason | DEC-023, DEC-024, DEC-026 |
| 9 | A member saves the record at Accepted-Provisional; the system creates or confirms the chapter mailbox, adds it to the members group, records the chapter email and sets Provisional (if the mailbox cannot be confirmed the status stays and the roster sweep names the person); the member arranges training and emails the candidate with the one-time password. Precondition: Google Workspace connection configured. | Team; System | Accepted-Provisional | MentorProfile status, chapter email | DEC-020, DEC-026, DEC-041 |
| 10 | Provisional period: the candidate completes full training; the Team records provisional items as they are collected (training completed and date, ethics agreement and timestamp, background check and date, mentor code acceptance) and reviews provisional progress. Nothing gates the next step but the Team's judgment. | Applicant; Team | Provisional | MentorProfile provisional fields | DEC-020, DEC-027 |
| 11 | Second team vote. Set Approved or Declined; decision summary recorded as in step 8. | Team | After 10 | MentorProfile status, notes, decline reason | DEC-023, DEC-024 |
| 12 | A member saves the record at Approved; the system creates the CRM login in the Mentor Team, assigns it to the mentor record and the Contact, and emails the welcome link to the chapter mailbox; the member sets Active by hand once the login and mailbox exist, and emails the new mentor. | Team; System | Approved | User created; MentorProfile status | DEC-042, DEC-026 |
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
- **Near-duplicate resubmission** (same form, same email, within 24 hours). Held before delivery for a staff member to approve or discard. *DEC-040.*
- **Undetected duplicate** (applied under a different email). Created as new at 4a; when found in review, consolidated by a manual contact merge. *DEC-019.*
- **Fill policy on an email match (4b, 4c).** The repeat submission fills only fields that are empty on the matched Contact and, after PI-012, on the matched profile, and never overwrites a stored value. Email address and contact type are never written. A changed contact detail stays in the submission payload for a team member to copy by hand. *DEC-047.*
- **Re-application after Declined.** The record returns to Candidate; notes say second application. *DEC-029.*
- **Unresponsive at any stage.** Set Dormant. No exit from Dormant is defined; reviving a dormant candidate is an open issue for the Mentor Administration Team. *DEC-029, DEC-036.*
- **Withdrawal.** Set Declined with a note and the decline reason Candidate Withdrew. *DEC-029, DEC-045.*
- **Decline with no notice.** Allowed at every decline point. *DEC-026.*
- **Approved before every provisional item is collected.** Allowed; the Team decides. Unfinished items pass to the Mentor Administration process. *DEC-027.*
- **CRM unreachable at submission.** The application captures the submission in its own transaction database and delivers it when the CRM is back; the JSON file fallback for when that database is unavailable is required by DEC-037 and not yet built.
- **Mailbox not confirmable at Accepted-Provisional.** The status stays; the roster sweep names the person until a later save completes it. *DEC-041.*
- **Decline reason not yet capturable** in the Mentor Administration tool until PI-014 ships. *DEC-044.*

## 8. System requirements (requirement records REQ-005 to REQ-016)

Each is a requirement record defined in CNV-012, in topic TOP-003, scoped to DOM-001, approved by DEC-038 and linked `requirement_realized_by_process` to PROC-001; R1 refines REQ-001. Existing REQ-001 (record every intake submission) and REQ-002 (link each submission to its Contact) are linked the same way.

| # | Requirement | From |
|---|---|---|
| R1 (REQ-005) | A Become a Mentor submission is recorded as a submission record of form type volunteer holding the exact form data, before any mentor record is created. Refines REQ-001. | DEC-018 |
| R2 (REQ-006) | From a volunteer submission the system creates or updates the mentor records by email match: create on no match; update a Prospect; return a Declined record to Candidate with a second-application note; any other match is a conflict. | DEC-019, DEC-029 |
| R3 (REQ-007) | On a conflict the system creates no mentor records, shows the submitter an error directing them to contact CBM, notifies the Mentor Administration Team, and keeps the submission record. | DEC-019 |
| R4 (REQ-008) | When the system setting "Send mentor applicants confirmation email" (SET-001) is on, a successful submission sends the applicant an automatic confirmation email from the template; when off, only the thank-you screen is shown. | DEC-026, DEC-043 |
| R5 (REQ-009) | A view of mentor records in Candidate status defines the team's application queue; the Mentor Administration App, the application under definition, presents it so a new Candidate is visible without an email. | DEC-020, DEC-031, DEC-034 |
| R6 (REQ-010) | A mentor record accepts notes from several Team members and a decision summary with outcome and date; a decline reason is required when the status is Declined. | DEC-024 |
| R7 (REQ-011) | Mentor status carries the thirteen live values and supports the process transitions: Candidate to Under Review or Declined; Under Review to Accepted-Provisional or Declined; Accepted-Provisional to Provisional; Provisional to Approved or Declined; Approved to Active; any pre-Active status to Dormant; Declined to Candidate on re-application. | DEC-020, DEC-023, DEC-029 |
| R8 (REQ-012) | Provisional items (training, ethics agreement, background check, mentor code) are recorded on the mentor record when collected and are not preconditions for Approved. | DEC-027 |
| R9 (REQ-013) | When a team member saves a mentor at Approved with no login, the system creates the CRM login in the Mentor Team, assigns it to the mentor record and the Contact, and emails the welcome link; a team member then sets Active by hand. | DEC-042 |
| R10 (REQ-014) | The Team can merge two Contact records to consolidate an undetected duplicate. Carried from April (MR-APPLY-REQ-009), supported by DEC-019. | DEC-019 |
| R11 (REQ-015) | Mentor records, their Contact and their submission records are retained permanently regardless of outcome: no deletion and no anonymisation for declined, dormant or withdrawn applicants. | DEC-035 |
| R12 (REQ-016) | Every website submission is written through a separate transaction database acting as a write-through cache; when it is unavailable the submission is queued as a JSON file and replayed until the database and the CRM accept it. | DEC-037 |

## 9. Data (proposed field links)

**Written (DEC-039).** Forty-eight field links from the Become a Mentor form as built in the cbm-client-intake application and the fields the Mentor Administration tool edits, confirmed by Doug. The duplicate live fields are settled by what the form writes: industryExperience, areaOfExpertise, mentorCodeAccepted, and howDidYouHearAboutCBM on the profile beside howDidYouHear on the Contact.

**IntakeSubmission (ENT-021):** form FLD-361, submitterEmail FLD-363, source FLD-365, intakeStatus FLD-516, intakeMessage FLD-517, payload FLD-518, dispositionedBy FLD-520, dispositionedAt FLD-521, dispositionReason FLD-522.

**Contact (ENT-004):** firstName FLD-703, lastName FLD-704, middleName FLD-725, preferredName FLD-260, emailAddress FLD-708, addressStreet FLD-712, addressCity FLD-713, addressState FLD-714, addressPostalCode FLD-716, phoneNumber FLD-709, preferredContactMethod FLD-449, employmentStatus FLD-450, linkedInProfile FLD-261, howDidYouHear FLD-448, termsOfUseAccepted FLD-452, privacyPolicyAccepted FLD-451, codeOfConductAccepted FLD-458, contactType FLD-259.

**MentorProfile (ENT-022):** mentorStatus FLD-368, mentorType FLD-384, mentoringWhyInterested FLD-372, mentorProfessionalBio FLD-373, resumeUpload FLD-409, industryExperience FLD-447, areaOfExpertise FLD-407, fluentLanguages FLD-385, howDidYouHearAboutCBM FLD-377, felonyConfiction FLD-376 (live name misspelt, noted for rename), termsAccepted FLD-406, mentorCodeAccepted FLD-453, ethicsAgreementAccepted FLD-388, mentorStatusNotes FLD-411, trainingCompleted FLD-386, trainingCompletionDate FLD-387, backgroundCheckCompleted FLD-390, backgroundCheckDate FLD-391, cbmEmail FLD-369, recordStatus FLD-441, declinedReason FLD-410.

Not linked: rejectionReason FLD-440 (to be retired, DEC-044), industrySector FLD-370, mentoringFocusAreas FLD-371, codeAccepted FLD-459, the capacity and public-profile fields; phone type and the confirmation email copy are collected by the form and not stored.

## 10. Status transitions

One row per allowed move of `mentorStatus` (FLD-368) on MentorProfile within this process, approved by Doug 09-05-26. **Team** is a member of the Mentor Administration Team (PER-009). **System** is the CRM and the cbm-client-intake application together. The pre-Active statuses are Candidate, Under Review, Accepted-Provisional, Provisional and Approved. This table is the content for CRM Builder's transition record type (CRMBUILDER PI-471) and is migrated into records under PI-015 when that type exists. No automation records exist yet for mentor email provisioning, mentor login provisioning or the CRM welcome email; the "happens automatically" column names them by what the application does.

| From | To | Who | Must be recorded before the move | Happens automatically after the move | Ruling |
|---|---|---|---|---|---|
| (no record) | Candidate | System | Submission receipt written (IntakeSubmission, intake status Received, raw form content); no Contact matches the submitter email | Contact and MentorProfile created with mentor type Mentor and contact type Mentor; receipt linked to the Contact and set Completed; the record appears in the Mentor candidates view (VEW-001). The confirmation email (MSG-001) was already sent at capture when the setting "Send mentor applicants confirmation email" (SET-001) is on | Submission record first (DEC-018); email-match rule (DEC-019); confirmation setting (DEC-043) |
| Prospect | Candidate | System | Submission receipt; the email matches a Contact whose profile is Prospect | Profile updated with the application answers; receipt linked and Completed; appears in VEW-001 | Prospect match updates (DEC-019); application must conform (DEC-040, PI-012) |
| Declined | Candidate | System | Submission receipt; the email matches a Declined profile; a second-application note appended to the status notes | Same as the row above | Re-application returns to Candidate (DEC-029); PI-012 |
| Candidate | Under Review | Team | Nothing; the preliminary review is judgment | None | Preliminary review (DEC-020) |
| Candidate | Declined | Team | Decline reason | None; a manual decline email is optional | Preliminary decline (DEC-020); reason required (DEC-024, DEC-044); manual or no email (DEC-026) |
| Under Review | Accepted-Provisional | Team, first vote | Each member's opinion as a note; the decision summary with outcome and date | Mentor email provisioning runs on the save: chapter mailbox created or confirmed, added to the members group, chapter email recorded on the profile; then the Accepted-Provisional to Provisional row | First vote (DEC-023); notes plus summary (DEC-024); provisioning on save (DEC-041) |
| Under Review | Declined | Team, first vote | Members' notes; the decision summary with outcome, date and decline reason | None; a manual decline email is optional | First vote (DEC-023); summary with reason (DEC-024); manual or no email (DEC-026) |
| Accepted-Provisional | Provisional | System | Chapter mailbox confirmed to exist and in the members group; chapter email recorded on the profile. If not confirmable the status stays and the roster sweep names the person | None automatic. A member arranges training and emails the candidate by hand with the one-time password | System sets Provisional (DEC-041); manual Provisional email (DEC-026); DEC-020 superseded in part |
| Provisional | Approved | Team, second vote | The decision summary with outcome and date; provisional items recorded as collected, none required | Mentor login provisioning runs on the save: CRM login created in the Mentor Team, assigned to the profile and the Contact; the CRM's welcome and set-password email sent to the chapter mailbox | Second vote (DEC-023); no checklist gate (DEC-027); login on save (DEC-042) |
| Provisional | Declined | Team, second vote | The decision summary with outcome, date and decline reason | None; a manual decline email is optional | Second vote (DEC-023); summary with reason (DEC-024); manual or no email (DEC-026) |
| Approved | Active | Team | Chapter email, CRM login and Contact assignment all present (completeness check) | None automatic. A member emails the new mentor by hand; hand-off to the Mentor Administration process (PROC-002) | Active by hand (DEC-042); manual email (DEC-026); process boundary (DEC-021) |
| Any pre-Active status | Dormant | Team | Nothing required by the rulings | None. No exit from Dormant is defined | Unresponsive is Dormant (DEC-029); no exit (DEC-036) |
| Any pre-Active status | Declined, by withdrawal | Team | A note that the candidate withdrew; decline reason Candidate Withdrew | None; a manual email is optional | Withdrawal is Declined with a note (DEC-029); reason value Candidate Withdrew (DEC-045) |

The conflict path (step 4d) and the 24-hour resubmission hold are not status moves and are not rows. Three annotations accompany the table: DEC-020 is superseded in part by DEC-041 on who sets Provisional; DEC-026 is superseded in part by DEC-042, since the CRM welcome email at Approved is a second automatic communication; and REQ-011 is to be reworded so that Declined is reachable from any pre-Active status on withdrawal (DEC-045).

## 11. Field roles

One row per linked field, forty-eight across IntakeSubmission, Contact and MentorProfile, approved by Doug 09-05-26 (DEC-046). A field role is two attributes. **Source** is where the value originates: collected by form (the applicant), entered by team (a member of the Mentor Administration Team), or set by system (the application). **Team may edit** is what this process lets the team do afterwards: no, yes, or yes if blank (supply a missing value, never replace one). "Display only" is not a role; it is another process's field with team-may-edit no, and no field here is in that position. No field here takes "yes if blank". The form positions and groups are from the Become a Mentor form as built (twenty-two positions in four groups: About You, Background, Expertise, Review and Submit); the team-editable set is the Mentor Administration tool's; the system writes are the volunteer orchestrator's, the receipt writer's and the provisioning routines'. This table is the content for CRM Builder's field-role attribute (CRMBUILDER PI-472) and is migrated under PI-016.

| Entity | Field | Source | Team may edit | Form position and group | Note |
|---|---|---|---|---|---|
| IntakeSubmission | form FLD-361 | set by system | no | — | audit copy (DEC-018, REQ-005) |
| IntakeSubmission | submitterEmail FLD-363 | set by system | no | — |  |
| IntakeSubmission | source FLD-365 | set by system | no | — | copied from how_did_you_hear |
| IntakeSubmission | intakeStatus FLD-516 | set by system | no | — |  |
| IntakeSubmission | intakeMessage FLD-517 | set by system | no | — |  |
| IntakeSubmission | payload FLD-518 | set by system | no | — | the exact form data |
| IntakeSubmission | dispositionedBy FLD-520 | set by system | no | — | the staff member who discarded, stamped by Submission Admin |
| IntakeSubmission | dispositionedAt FLD-521 | set by system | no | — |  |
| IntakeSubmission | dispositionReason FLD-522 | entered by team | no | — | reason and note typed in Submission Admin; a discard is final |
| Contact | firstName FLD-703 | collected by form | yes | 1, About You |  |
| Contact | middleName FLD-725 | collected by form | yes | 2, About You | middle initial |
| Contact | lastName FLD-704 | collected by form | yes | 3, About You |  |
| Contact | preferredName FLD-260 | collected by form | yes | 4, About You |  |
| Contact | emailAddress FLD-708 | collected by form | yes | 5, About You | confirmed at 6, not stored; the match key |
| Contact | addressStreet FLD-712 | collected by form | yes | 7, About You |  |
| Contact | addressPostalCode FLD-716 | collected by form | yes | 8, About You |  |
| Contact | phoneNumber FLD-709 | collected by form | yes | 9, About You | phone type at 10, not stored |
| Contact | preferredContactMethod FLD-449 | collected by form | yes | 11, About You |  |
| Contact | employmentStatus FLD-450 | collected by form | yes | 15, Background |  |
| Contact | linkedInProfile FLD-261 | collected by form | yes | 16, Background |  |
| Contact | howDidYouHear FLD-448 | collected by form | yes | 20, Review and Submit | same answer as the profile field |
| Contact | termsOfUseAccepted FLD-452 | collected by form | yes | 22, Review and Submit | one checkbox sets three Contact flags |
| Contact | privacyPolicyAccepted FLD-451 | collected by form | yes | 22, Review and Submit |  |
| Contact | codeOfConductAccepted FLD-458 | collected by form | yes | 22, Review and Submit |  |
| Contact | addressCity FLD-713 | entered by team | yes | — | not on the form |
| Contact | addressState FLD-714 | entered by team | yes | — | not on the form |
| Contact | contactType FLD-259 | set by system | yes | — | Mentor appended |
| MentorProfile | mentorStatus FLD-368 | set by system | yes | — | Candidate at creation; moves per section 10 |
| MentorProfile | mentorType FLD-384 | set by system | yes | — | Mentor by default |
| MentorProfile | mentoringWhyInterested FLD-372 | collected by form | yes | 12, Background |  |
| MentorProfile | mentorProfessionalBio FLD-373 | collected by form | yes | 13, Background | work experience |
| MentorProfile | resumeUpload FLD-409 | collected by form | yes | 14, Background |  |
| MentorProfile | industryExperience FLD-447 | collected by form | yes | 17, Expertise |  |
| MentorProfile | areaOfExpertise FLD-407 | collected by form | yes | 18, Expertise |  |
| MentorProfile | fluentLanguages FLD-385 | collected by form | yes | 19, Expertise |  |
| MentorProfile | howDidYouHearAboutCBM FLD-377 | collected by form | yes | 20, Review and Submit |  |
| MentorProfile | felonyConfiction FLD-376 | collected by form | **no** | 21, Review and Submit | legal declaration (DEC-046); PI-017 |
| MentorProfile | termsAccepted FLD-406 | collected by form | **no** | 22, Review and Submit | legal declaration (DEC-046); PI-017 |
| MentorProfile | mentorCodeAccepted FLD-453 | collected by form | **no** | 22, Review and Submit | set from the same checkbox; legal declaration (DEC-046) |
| MentorProfile | ethicsAgreementAccepted FLD-388 | collected by form | **no** | 22, Review and Submit | set from the same checkbox; legal declaration (DEC-046); PI-017 |
| MentorProfile | mentorStatusNotes FLD-411 | entered by team | yes | — |  |
| MentorProfile | trainingCompleted FLD-386 | entered by team | yes | — |  |
| MentorProfile | trainingCompletionDate FLD-387 | entered by team | yes | — |  |
| MentorProfile | backgroundCheckCompleted FLD-390 | entered by team | yes | — |  |
| MentorProfile | backgroundCheckDate FLD-391 | entered by team | yes | — |  |
| MentorProfile | cbmEmail FLD-369 | set by system | yes | — | written at provisioning (DEC-041) |
| MentorProfile | recordStatus FLD-441 | set by system | yes | — | completeness check; the value Duplicate is set by hand and never overwritten |
| MentorProfile | declinedReason FLD-410 | entered by team | yes | — | after PI-014 |

Twenty-eight fields are collected by form, eight entered by team, twelve set by system. The four legal declarations are team-may-edit no on Doug's ruling: an edited declaration is no longer the applicant's and is legally invalid; the Mentor Administration tool must stop editing them (PI-017). The nine IntakeSubmission rows are no on the agent's proposal, because the submission record is the audit copy (DEC-018, REQ-005); Doug has not objected. Observation: the form sets ethicsAgreementAccepted and mentorCodeAccepted from the single consent checkbox at submission, so the "ethics agreement" provisional item of step 10 is already true before the first review and cannot be changed by the team.

## 12. Acceptance criteria for the write (state as of 09-04-26)

1. Met. PROC-001 has purpose, triggers, steps, outcomes, edge cases, frequency, duration, classification and rationale populated; notes name the rulings and the render path.
2. Met (verified by read-back: 1 handoff, 2 persona, 4 entity and 23 reference links out; 14 realized-by and 23 is_about links in). Edges: `process_performed_by_persona` to PER-009 and PER-010; `process_touches_entity` to ENT-021, ENT-004, ENT-022, ENT-016; `process_touches_field` per §9 as ruled; `requirement_realized_by_process` from REQ-001, REQ-002 and R1–R12; `process_hands_off_to_process` to the Mentor Administration process; `references` to DEC-018..DEC-037, the message template and the view; `is_about` from each ruling already exists.
3. Met. REQ-005 to REQ-016 exist, confirmed by DEC-038, each within the readability limit.
4. Met. PROC-002, MSG-001 and VEW-001 exist and are linked; TERM-056 "Mentor Administration App" is a draft term.
4a. Met. Forty-eight field links written from the form as built (DEC-039).
5. A dated render is committed in the CBM repository with a manifest row and a `Governed-By: trivial` trailer; PI-011 resolves after the push.
6. Every new term is approved or flagged; no malformed identifier.

## 13. Rulings applied

1. **DEC-031** (Q1, option B, against the recommendation): the term is **Mentor Administration App**; earlier references to "Mentor Review App" were updated.
2. **DEC-032** (Q2, option A): classification `mission_critical`.
3. **DEC-033** (Q3, option B, against the recommendation): the field links wait for the current form's exact field list, supplied by Doug; the section 8 mapping is a placeholder.
4. **DEC-034** (Q4, option C, against the recommendation): the batch creates three candidate records: the Mentor Administration process, the confirmation message template, and a CRM view of MentorProfile records in Candidate status.
5. **DEC-035** (Q5, option A): permanent retention carried forward as R11.
6. **DEC-036** (Q6, option A): no exit from Dormant; revival is an open issue for the team.
7. **DEC-037** (Q7, Doug's own design): submissions are written through a transaction database acting as a write-through cache, with a JSON file queue replayed until delivered; R12.
8. **DEC-039**: the Become a Mentor form as built in cbm-client-intake, plus the Mentor Administration tool's editable fields, is the source of the field links; forty-eight links written.
9. **DEC-040** (difference 1, option A): the four-path duplicate rule stands; the application must conform (PI-012); the 24-hour duplicate hold is kept as an extra safeguard.
10. **DEC-041** (difference 2, option A): at Accepted-Provisional the system creates the chapter mailbox and sets Provisional on a member's save; training and the candidate email stay manual.
11. **DEC-042** (difference 2, second half, option B): at Approved the system creates the CRM login on save; a member sets Active by hand. Supersedes DEC-028; REQ-013 reworded.
12. **DEC-043** (difference 3, option A with Doug's change): the confirmation email stands, governed by the system setting "Send mentor applicants confirmation email" (SET-001); the application must send it (PI-013); REQ-008 reworded.
13. **DEC-044** (difference 3, last part, option A): the decline reason stands; the Mentor Administration tool must capture it and the duplicate CRM field is retired (PI-014).
14. **DEC-045** (status-transition table, 09-05-26): a withdrawal is Declined with the reason Candidate Withdrew; Unresponsive is not used, since Dormant covers that case. DEC-041 confirmed as the ruling on who sets Provisional; DEC-020 and DEC-026 annotated as superseded in part.
15. **DEC-046** (field roles, 09-05-26, Doug's own framing): a field role is two attributes, source and team-may-edit; all fields team-editable except the four legal declarations (FLD-376, FLD-406, FLD-453, FLD-388), which are no; PI-017 filed for the Mentor Administration tool.
16. **DEC-047** (fill policy, 09-05-26, option A): a repeat submission fills only empty fields on the matched Contact and profile and never overwrites a stored value; email and contact type never written; PI-012 applies the same rule to the profile.

**Mechanical, decided unless you object:** the render goes to `/home/doug/Dropbox/Projects/ClevelandBusinessMentors/specifications/mentor-recruiting/mentor-application-process.md`, with a `specifications/README.md` manifest created in that repository on the crmbuilder pattern; the commit uses a pathspec and `Governed-By: trivial` with an exemption reason; PI-011 resolves after Doug's push.

**Terms:** "Mentor Administration App" approved (DEC-031), term record TERM-056; it is the existing Mentor Administration tool at /mentoradmin/ in the cbm-client-intake application. "Chapter email system" uses the existing term Chapter. "Transaction database" and "write-through cache" are defined in DEC-037 and used descriptively. "Store" was the agent's shorthand for the V2 database and is not used.

## Change log

| Version | Date | Change |
|---|---|---|
| 0.7 | 09-05-26 14:05 | Fill policy on an email match added to section 7 (DEC-047); rulings list extended. |
| 0.6 | 09-05-26 13:10 | Section 11 Field roles added (forty-eight rows, two attributes per field, DEC-046); sections 11 and 12 renumbered 12 and 13. PI-016 (migration into CRMBUILDER PI-472) and PI-017 (four legal declarations read-only in the Mentor Administration tool) filed. |
| 0.5 | 09-05-26 12:30 | Section 10 Status transitions added (thirteen rows, approved by Doug); sections 10 and 11 renumbered 11 and 12. DEC-041 confirmed as the ruling on who sets Provisional (DEC-020 annotated). DEC-045 (withdrawal reason Candidate Withdrew) recorded; DEC-026 annotated for the CRM welcome email; withdrawal edge case updated. PI-015 filed for migration into CRMBUILDER PI-471 transition records. |
| 0.4 | 09-04-26 09:10 | Field links written from the form as built (DEC-039). The built application reconciled with the rulings: DEC-040 to DEC-044; steps 2, 3, 4, 9 and 12, the edge cases and R4/R9 updated; planning items PI-012, PI-013, PI-014 filed for the application changes; system setting SET-001. |
| 0.3 | 09-04-26 07:40 | First committed render. PROC-001 written on Doug's approval (DEC-038): twelve requirements REQ-005..016, candidate records PROC-002, MSG-001, VEW-001, term TERM-056, and the links. Field links pending (DEC-033). |
| 0.2 | 09-04-26 07:05 | Rulings DEC-031 to DEC-037 applied; "store" replaced by "V2 database"; R11 and R12 added; three candidate records in the batch; field links deferred to the form list. |
| 0.1 | 09-04-26 06:10 | Drafted from the interview of 09-04-26 (SES-013 / CNV-012, DEC-018..DEC-030) under PI-011 / REQ-004; seven open questions. |
