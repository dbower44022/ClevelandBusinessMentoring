# Test → Production structural deployment — 2026-06-23

Deployed the CBM data structures from **test** (`crm-test.clevelandbusinessmentors.org`)
to **production** (`crm.clevelandbusinessmentors.org`, droplet `147.182.135.50`) to
begin production usage. **Schema only — no record data.**

Mechanism: fresh scoped audit of test (this `audit-20260623-130644/` set, 14
CBM-bearing entities) → sanitized to a deploy-safe set → V1 `deploy_pipeline`
(`skip_deletes=True`) against production in 4 passes (entities+fields →
relationships → entities re-run → security).

## Safety
- Production backup before any write: `/var/backups/espocrm/20260623-170434/`
  on the droplet (`espocrm-db.sql.gz` 15 MB / 167 tables, `espocrm-app.tar.gz` 29 MB).
- DEC-002 permission fix applied: `chown -R www-data:www-data /var/www/html/custom`
  + rebuild — confirmed working (all 12 custom entities created cleanly, no 500s).

## Result (verified by structural diff test vs prod)
- **Custom entities: 12 / 12 ✓**
- **Custom fields: 205 / 209 present.** 4 genuinely absent (see residue);
  `CPartnerProfile.cBMValueProvided` is present as `bMValueProvided` (leading-`c`
  artifact, not a miss).
- **Relationships: ~44 / 45 functionally present.** Many native-side custom links
  landed under engine-generated `cC*` names (e.g. test `cContributions` →
  prod `cCContributions`) — EspoCRM's documented native-side c-prefix behavior;
  the relationships exist and function. Lone genuine miss: the **Contact↔User**
  custom reciprocal (`cLinkedContact`) — test's custom `cAssignedUser` collided
  with EspoCRM's native `assignedUser`, so the engine matched the native link and
  skipped the custom reciprocal.
- **Teams: 7 / 7 ✓.  Roles: 10 / 10 ✓.**
- Deploy aggregate: 61 CREATED, 0 ERROR, 186 MATCH, 13 ALREADY, 30 SKIPPED.
- Site healthy post-deploy: HTTP→HTTPS 301, HTTPS 200, admin auth OK, final rebuild done.

## Manual follow-ups (fidelity gaps — configure in EspoCRM admin)
Attachment fields the V1 engine cannot create (no REST path for `file`/`image`):
- `CEvent.eventGraphic`, `CEvent.sponsorGraphic` (file)
- `CMentorProfile.profilePhoto` (image), `CMentorProfile.resumeUpload` (file)

Other:
- `CInformationRequest` deployed as **Base** (test is **BasePlus**) — change entity
  type in admin if the activities panel is needed.
- `CSession.topicsCovered` (multiEnum) — option list not captured; configure options.
- `Contact` and `CMentorProfile` **detail layouts** fell back to defaults (audit had
  duplicate unlabeled panels) — re-arrange in admin if desired.
- Contact↔User custom reciprocal (`cLinkedContact`) not created (native-link collision).
- 9 role scope entries for stock entities the validator doesn't recognize
  (Report, ReportCategory, KnowledgeBaseArticle, EmailTemplate, EmailTemplateCategory)
  were dropped — set those scope permissions in admin if test parity is required.
- Naming nuance: relationship panels in deployed layouts reference test's `c*` link
  names; prod's engine-named `cC*` links mean some relationship panels may not render
  on detail views until re-added in admin. The relationships themselves work.

No-loss items stripped automatically (recreated by the engine): 14 link-type fields
(created by relationships pass) and 2 currency companion fields (auto-created by the
parent currency field). See `deploy-ready/RESIDUE.md` in the session scratchpad.
