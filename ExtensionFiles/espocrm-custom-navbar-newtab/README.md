# EspoCRM customization — open external navbar tabs in a new browser tab

Makes the **Documentation** navbar tab (and any navbar "URL" tab pointing at an
external `http(s)` address) open in a **new browser tab** instead of navigating
away from the CRM. Built for the BookStack docs site
(`https://docs.clevelandbusinessmentors.org`).

> Part of the CBM documentation site. For the full picture — the BookStack app,
> its hosting, and end-to-end deploy/maintenance — see
> [`../../infrastructure/CBM-Documentation-Site.md`](../../infrastructure/CBM-Documentation-Site.md).

EspoCRM 9.3.6 URL tabs have no built-in iframe/new-tab option, so this adds a
tiny custom navbar view that extends the core one and sets `target="_blank"` on
external links only. No core files are modified.

## Files (paths are relative to the EspoCRM web root, `/var/www/html`)

- `client/custom/src/views/site/navbar.js` — custom navbar view (extends
  `views/site/navbar`, adds `target="_blank"` to external URL-tab links in
  `afterRender`).
- `custom/Espo/Custom/Resources/metadata/clientDefs/App.json` — registers the
  view via the `navbarView` key (read by `views/site/header`).

## Important

Custom client code MUST use the AMD `define('custom:...', ['parent'], factory)`
form. Raw ES-module `import/export` is not consumed by EspoCRM's loader (it is
not auto-transpiled) and will crash the navbar to a blank page.

## Deploy (Docker install; app container `espocrm`)

```bash
# from a host that can reach the EspoCRM server, with the two files staged:
docker cp navbar.js espocrm:/var/www/html/client/custom/src/views/site/navbar.js
docker cp App.json  espocrm:/var/www/html/custom/Espo/Custom/Resources/metadata/clientDefs/App.json
docker exec espocrm chown -R www-data:www-data \
  /var/www/html/client/custom/src /var/www/html/custom/Espo/Custom/Resources/metadata/clientDefs
docker exec -u www-data espocrm php /var/www/html/command.php rebuild
# then hard-refresh the browser (Ctrl/Cmd+Shift+R)
```

The companion step is adding a Tab List **URL** item (label "Documentation",
the BookStack URL) via Administration → User Interface.

Deployed to sandbox (`crm-test.clevelandbusinessmentors.org`) 2026-06-17.
