# Kickoff — Mentor Application: rule the Provisional question, then write the transition table and the field roles

Operating mode: ARCHITECTURE.
Engagement: Cleveland Business Mentors (select it with the engagement tool before any read or write; its code is the client engagement, not CRMBUILDER).
Repository: ClevelandBusinessMentoring. Read its CLAUDE.md first and confirm with me which CLAUDE.md you have read before doing any work.
Governance: record decisions and planning items in real time through the API as you go, in this engagement. No batched close-out.

## Why this session exists

On 09-05-26 the CRM Builder engagement compared the Mentor Application process definition against the running cbm-client-intake application and found that the definition describes the business process well but does not say enough for an application to be built from it twice the same way. The two most important gaps are that the status lifecycle is spread across the process steps and six decisions rather than stated once, and that the forty-eight linked fields do not say what role each plays (typed by the applicant, edited by the team, set by the system, or display only). CRM Builder will get record types for both (planning items PI-471 and PI-472 in the CRMBUILDER engagement), but they do not exist yet. This session writes the content those record types will hold, as tables in the process render, so the content is settled before the schema arrives and becomes the acceptance test for it.

Before either table can be written, one contradiction has to be ruled.

## Step 1 — Rule the Provisional question

Read the Mentor Application process record (PROC-001) and the decision that stated the mentor status lifecycle (DEC-020). Then put this decision to me using the consequential decision template, and stop:

The definition says that after the first vote, a team member adds the candidate to the chapter email system, sets up training, and then a person sets the status to Provisional and emails the candidate by hand. The running application does something different: when a team member saves the record at Accepted-Provisional, the application creates the chapter mailbox itself, adds it to the members group, and moves the status to Provisional on its own once the mailbox is confirmed to exist. Two later decisions (DEC-041 and DEC-042) adopted the application's mailbox and login provisioning; check whether they already settle who moves the status, and say so. If they do not, the options are: the person moves it (the definition as written), the application moves it once the mailbox is confirmed (the prototype), or the application creates the mailbox but a person still moves the status after training is arranged. Name the cost of each in terms of what the team experiences and what the application must do. Recommend one.

When I rule, record the decision in this engagement, update step 9 of the process record and its edge cases to match, and update the render at specifications/mentor-recruiting/mentor-application-process.md. Do not continue to step 2 until the ruling is recorded.

## Step 2 — Write the transition table

Add a section "Status transitions" to the process render and the same content to the process record's notes. One row per allowed move, with these columns: from status, to status, who makes the move (a named persona, or "system"), what must be recorded before the move is allowed (for example a decline reason on every move to Declined, a decision summary with outcome and date on each vote), what happens automatically after the move (which automation or message template, by name), and the decision that settled the row, written as a short phrase with the identifier in parentheses.

Build it from the process steps and these decisions: the status lifecycle (DEC-020), the votes and decision summary (DEC-023), the decline reason (DEC-024), which emails are automatic and which are manual (DEC-026), login creation at Approved (DEC-028), Declined and Dormant at any stage (DEC-029), and the step 1 ruling. Include Prospect to Candidate and Declined to Candidate (the repeat-application paths), the Dormant moves, and withdrawal. Where two sources disagree, stop and put the difference to me rather than choosing.

Then reply with the table inline for my review before writing it anywhere. On approval, write it and record a planning item in this engagement noting that the table is the content for CRM Builder's transition record type (PI-471 in the CRMBUILDER engagement) and should be migrated into records when that type exists.

## Step 3 — Write the field roles

Add a section "Field roles" to the render. One row per linked field (there are forty-eight, across Contact, MentorProfile and IntakeSubmission): entity, field, role, and for form fields the position and group on the Become a Mentor form. The roles are exactly four: collected by form, edited by team, set by system, display only. Take the form fields and their order from the built form in the cbm-client-intake repository (forms/volunteer: index.html, options.js, schemas.py), the team-edited fields from the Mentor Administration tool's editable set (mentoradmin/service.py), and the system-set fields from the volunteer orchestrator (forms/volunteer/orchestrator.py). A field that fits no role, or two, is a question for me, not a guess.

Reply with the table inline for my review before writing it. On approval, write it and record a planning item noting that it is the content for CRM Builder's field-role attribute (PI-472 in the CRMBUILDER engagement).

## Step 4 — Fill policy

Ask me one question: when a repeat applicant matches an existing Contact, which fields may the new submission fill and which may it never overwrite? The prototype fills only empty fields and never overwrites curated data. Record my answer as a decision and add it to the process record's edge cases.

## Close

Commit and push the render in the same turn as the last write. Reply with the review list: decisions recorded, planning items recorded, what changed in the process record, and the render commit. Then the next step: in the CRMBUILDER engagement, build the transition record type (PI-471) with this table as its acceptance test.
