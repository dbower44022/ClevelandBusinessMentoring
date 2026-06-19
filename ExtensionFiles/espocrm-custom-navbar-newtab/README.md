# EspoCRM customization — navbar enhancements (docs integration)

A single custom navbar view that extends the core one (no core files modified)
and adds two things for the BookStack docs site
(`https://docs.clevelandbusinessmentors.org`):

1. **External URL tabs open in a new browser tab.** The **Documentation** tab
   (and any navbar "URL" tab pointing at an external `http(s)` address) opens in
   a new tab instead of navigating away from the CRM. EspoCRM 9.3.x URL tabs have
   no built-in new-tab option, so this sets `target="_blank"` on external links
   in `afterRender`.
2. **A global "Help" button.** A fixed, bottom-right pill present on every screen.
   Clicking it opens **context-relevant** documentation in a separate, movable
   browser window (reused/refocused on subsequent clicks). Context is resolved
   from the current route's scope via a curated map, with a BookStack **search**
   fallback, then the docs home:
   - `Admin` → the EspoCRM System Guide
   - `CEngagement` / `CSession` → the Mentor Guide
   - anything else → `…/search?term=<scope label>`
   The map (`HELP_MAP` at the top of `navbar.js`) is meant to grow as docs are added.

   It's rendered as a **fixed** element (bottom-right, max z-index) rather than
   injected into the navbar markup on purpose: CBM runs the side-bar navbar mode,
   where the top-right container is relocated/hidden, so a navbar-injected button
   was invisible. Fixed positioning is reliable across layout modes.

> Part of the CBM documentation site. For the full picture — the BookStack app,
> its hosting, and end-to-end deploy/maintenance — see
> [`../../infrastructure/CBM-Documentation-Site.md`](../../infrastructure/CBM-Documentation-Site.md).

## Files (paths relative to the EspoCRM web root, `/var/www/html`)

- `client/custom/src/views/site/navbar.js` — the custom navbar view (both
  behaviors above).
- `custom/Espo/Custom/Resources/metadata/clientDefs/App.json` — registers the
  view via the `navbarView` key (read by `views/site/header`).

## Important

- Custom client code MUST use the AMD `define('custom:...', ['parent'], factory)`
  form. Raw ES-module `import/export` is not consumed by EspoCRM's loader (not
  auto-transpiled) and will crash the navbar to a blank page.
- After deploying, browsers may serve a **cached** copy of the module (EspoCRM is
  an SPA). A normal reload often isn't enough during iteration — use DevTools →
  Network → **Disable cache** → reload, or a fully fresh session. End users
  loading the CRM for the first time get the current version automatically.

## Deploy (Docker install; app container `espocrm`)

```bash
# with the two files staged on a host that can reach the EspoCRM server:
docker cp navbar.js espocrm:/var/www/html/client/custom/src/views/site/navbar.js
docker cp App.json  espocrm:/var/www/html/custom/Espo/Custom/Resources/metadata/clientDefs/App.json
docker exec espocrm chown -R www-data:www-data \
  /var/www/html/client/custom/src /var/www/html/custom/Espo/Custom/Resources/metadata/clientDefs
docker exec -u www-data espocrm php /var/www/html/command.php rebuild
# then load the CRM in a fresh/cache-disabled browser session
```

The companion step is adding a Tab List **URL** item (label "CBM Documentation",
the BookStack URL) via Administration → User Interface.

Deployed to sandbox (`crm-test.clevelandbusinessmentors.org`) and production
(`crm.clevelandbusinessmentors.org`). New-tab links 2026-06-17; Help button 2026-06-18.
