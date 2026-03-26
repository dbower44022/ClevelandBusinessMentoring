# Task List — Contact: Partner Contact
# Session A Date: March 2026
# Session B Date: March 2026

---

## TBD Items (Required Before Go-Live)

None.

---

## Manual Configuration Items (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Note logging on Partner Contact | Entity Manager → Contact → Stream | Ensure activity stream allows unlimited notes from mentors and admins |
| 2 | Field change audit logging | Entity Manager → Contact → Stream | Log changes to: Primary Organization (Account), Contact Type |
| 3 | Last Activity Date formula | Entity Manager → Contact → Formula | Calculate from most recent email, call, note, or meeting activity |
| 4 | Additional Organizations relationship | Entity Manager → Contact → Relationships | Configure many-to-many relationship to Account for secondary partner organization associations |

---

## Additional Fields Discovered in Session B

None.

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | No lifecycle status | Partner contacts have no onboarding or lifecycle stages |
| 2 | Engagements at organization level only | Partner referrals tracked on Account, not individual contact |
| 3 | Notes via activity stream | Supports unlimited notes over time rather than a single field |
| 4 | Records never deleted | Historical data retained regardless of partner relationship status |
| 5 | Multiple organization associations | A partner contact can be associated with more than one partner organization |
| 6 | No automated notifications | Manual relationship management — no triggers needed |
