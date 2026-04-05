# Session Prompt: CR-PARTNER-PROSPECT Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-PARTNER Sub-Domain Overview v1.0 is complete, establishing the partner sub-domain's purpose, personas, two-process inventory, dependency ordering, data reference, and cross-sub-domain touchpoints.

This session produces the CR-PARTNER-PROSPECT process document — the first of two process documents in the CR-PARTNER sub-domain. Per the Document Production Process, process documents follow a structured interview producing a Word document with all required sections.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## Process Being Defined

**CR-PARTNER-PROSPECT — Partner Prospecting and Activation**

Covers identifying prospective partner organizations, initiating outreach, qualifying the partnership opportunity, establishing formal agreements, and converting the partner from Prospect to Active status. The process begins when the Partner Coordinator identifies a prospective partner and ends when the partnership is formally activated with an assigned liaison and recorded agreement (where applicable).

This process creates the partner organization record (Account with accountType Partner), initial partner contacts (Contact with contactType Partner), and the partnership agreement record (where a formal agreement is required). The partner organization record is created at partnerStatus Prospect and transitions to Active upon successful activation.

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-008 | Partner Coordinator | Sole operator. Identifies prospects, manages outreach, qualifies opportunities, establishes agreements, activates partnerships. |

No supporting personas participate in CR-PARTNER-PROSPECT.

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Account | Native Company | v1.0 | Creates Partner organization records. 10 Partner-specific fields defined in Entity PRD Section 3.3. partnerStatus transitions from Prospect to Active. |
| Contact | Native Person | v1.1 | Creates Partner contact records. contactType = Partner. No Partner-specific custom fields — native and shared fields are sufficient. |
| Partnership Agreement | Custom Base | Deferred | Creates agreement records where formal agreements are required. 6 anticipated fields identified in Sub-Domain Overview Section 4.4. |

## Key Questions to Address

1. **Partner identification sources.** Where does the Partner Coordinator find prospective partners? Internal referrals, existing network, research, inbound inquiries, board recommendations?

2. **Qualification criteria.** What makes a prospective partner worth pursuing? What disqualifies a prospect? Is there a formal qualification checklist or is it judgment-based?

3. **Outreach workflow.** What does the outreach sequence look like? Initial contact method, follow-up cadence, escalation if no response?

4. **Agreement workflow.** When is a formal agreement required vs. optional? Who approves agreements? What is the review and signature process?

5. **Activation criteria.** What specific conditions must be met before a partner transitions from Prospect to Active? Is there a checklist or is it the Partner Coordinator's judgment?

6. **Initial data capture.** What information is captured when a prospect is first created? What additional information is gathered during qualification? What is captured at activation?

7. **Timeframe expectations.** How long does the typical prospecting-to-activation cycle take? Are there timeout or stale-prospect rules?

8. **Declined/withdrawn prospects.** What happens when a prospect declines or the Partner Coordinator decides not to pursue? Is there a status for this, or is it just Inactive?

## Prior Process Documents

This is the first process document in the CR-PARTNER sub-domain. No prior process documents exist within this sub-domain.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Partner.docx** — the CR-PARTNER Sub-Domain Overview (from `PRDs/CR/PARTNER/` in CBM repo)

Note: The Sub-Domain Overview is the primary input for this process session. The parent Domain Overview is not uploaded — its content relevant to CR-PARTNER has been incorporated into the Sub-Domain Overview.

## Output

Produce the CR-PARTNER-PROSPECT process document as a Word document and commit to:
`PRDs/CR/PARTNER/CR-PARTNER-PROSPECT.docx`

## After This Session

With CR-PARTNER-PROSPECT complete:

* The next process to define is CR-PARTNER-MANAGE
* For that conversation, upload the Sub-Domain Overview plus the CR-PARTNER-PROSPECT process document we just completed
* CR-PARTNER-MANAGE operates on records created by CR-PARTNER-PROSPECT — the field definitions, status values, and entity patterns established here are prerequisites
