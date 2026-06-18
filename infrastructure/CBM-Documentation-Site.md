# CBM Documentation Site — Deployment & Maintenance

The CBM user documentation / training site runs on **BookStack** at
**https://docs.clevelandbusinessmentors.org**. It is a standalone web app,
shared by **both** the sandbox and production EspoCRM instances (each links to
it from a "CBM Documentation" sidebar tab). Documentation is **publicly
readable** (no login).

Deployed 2026-06-17.

---

## 1. Architecture at a glance

| Piece | Detail |
|---|---|
| App | [BookStack](https://www.bookstackapp.com/) (LinuxServer image), currently v26.05.x |
| Host | DigitalOcean droplet **`cbm-docs`** — `192.34.63.167`, region nyc1, `s-1vcpu-1gb` + 2 GB swap, Ubuntu 24.04 |
| Stack | Docker Compose: `bookstack` (app) + `bookstack_db` (MariaDB) + `caddy` (reverse proxy / TLS) |
| URL / DNS | `docs.clevelandbusinessmentors.org` → A record to the droplet IP in **Cloudflare, DNS-only (grey cloud)** |
| TLS | Let's Encrypt, obtained & auto-renewed by Caddy (no manual cert work) |
| Compose dir | `/opt/bookstack/` on the droplet |

**Why its own droplet?** It is deliberately *not* on either EspoCRM droplet, so
that resetting/redeploying a CRM never takes documentation down, and so one
shared docs site serves both CRMs. Conversely, because production depends on it,
treat `cbm-docs` as a production host (don't casually destroy it).

### Files on the droplet (`/opt/bookstack/`)

```
/opt/bookstack/
├── compose.yaml        # the 3-service stack
├── Caddyfile           # reverse proxy + auto-TLS for the domain
├── .env                # SECRETS: DB passwords, APP_KEY, APP_NAME (chmod 600, not in git)
├── db/                 # MariaDB data volume
├── bookstack/          # BookStack /config — uploaded images, attachments, app state
├── caddy_data/         # Caddy state incl. issued certificates
└── caddy_config/
```

> **Secrets** live only in `/opt/bookstack/.env` on the droplet (never committed).
> Caddy auto-redirects HTTP→HTTPS; `ufw` allows only 22/80/443.

---

## 2. Access

```bash
ssh -i ~/.ssh/id_ed25519 root@192.34.63.167
```

(The matching public key is registered with DigitalOcean as `doug-local`.)

BookStack admin: log in at `/login`. The initial default was
`admin@admin.com` / `password` and was changed on first launch — current admin
credentials are held by the administrator, not stored here.

---

## 3. Deploying from scratch (rebuild / new environment)

If the droplet is ever lost or you need to stand up a fresh copy:

1. **Provision** an Ubuntu droplet, add swap, install Docker, open the firewall:
   ```bash
   fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
   echo '/swapfile none swap sw 0 0' >> /etc/fstab
   curl -fsSL https://get.docker.com | sh
   ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable
   ```
2. **DNS**: in Cloudflare, point `docs` (A record) at the droplet IP, **DNS-only
   (grey cloud)** — required, or Caddy's ACME challenge and TLS will fail.
3. **Stack files**: recreate `/opt/bookstack/compose.yaml` and `Caddyfile` (see
   §7), and an `.env` with fresh secrets:
   ```bash
   cd /opt/bookstack
   cat > .env <<ENV
   DOMAIN=docs.clevelandbusinessmentors.org
   TZ=America/New_York
   DB_ROOT_PASSWORD=$(openssl rand -hex 16)
   DB_PASSWORD=$(openssl rand -hex 16)
   APP_KEY=base64:$(openssl rand -base64 32)
   APP_NAME=CBM Documentation
   ENV
   chmod 600 .env
   ```
   (If restoring data, see §6 and reuse the **same** `APP_KEY` from the backup, or
   previously-encrypted values won't decrypt.)
4. **Launch**: `docker compose up -d` — Caddy obtains the cert automatically once
   DNS resolves and ports 80/443 are reachable.
5. **Branding & access settings** (see §5): set the displayed app name, enable
   public viewing, and set the homepage to the shelves view.
6. **EspoCRM integration**: deploy the new-tab extension and add the sidebar tab
   on each CRM (see §4).

---

## 4. EspoCRM integration (the "CBM Documentation" tab)

Each EspoCRM instance links to the docs site via a navbar **URL tab**, made to
open in a **new browser tab** by a small custom client extension.

- **Extension** (open-external-tabs-in-new-tab): files + deploy steps live in
  [`../ExtensionFiles/espocrm-custom-navbar-newtab/`](../ExtensionFiles/espocrm-custom-navbar-newtab/README.md).
  Deploy = `docker cp` the two files into the `espocrm` container, `chown
  www-data`, `php command.php rebuild`, hard-refresh. Persists across restarts
  and EspoCRM upgrades (the `custom/` dir is on a host bind mount).
- **Tab**: Administration → User Interface → Tab List → **Add URL** → label
  `CBM Documentation`, URL `https://docs.clevelandbusinessmentors.org`, icon
  `fas fa-book-open` → drag to position → Apply → Save → hard-refresh.

> **Tab-list footgun (if scripting it):** EspoCRM's global `tabList` lives in the
> `espocrm` container's `data/config.php`. An empty/absent `tabList` means "use
> the default tabs", so always **read-then-append** — blindly writing a list with
> only the doc tab would wipe every default tab. The supported scripted path is
> EspoCRM's `ConfigWriter` (`$container->get('injectableFactory')->create(\Espo\Core\Utils\Config\ConfigWriter::class)`
> → `set('tabList', …)` → `save()`), followed by `php command.php clear-cache`.
> Easiest is just the admin UI.

Deployed on both instances: sandbox (`crm-test.clevelandbusinessmentors.org`,
EspoCRM 9.3.6) and production (`crm.clevelandbusinessmentors.org`, 9.3.8).

---

## 5. Settings (set via the BookStack console)

BookStack's *displayed* settings are stored in its database, not the `.env`, so
they are changed with `artisan tinker` (or in the admin UI under Settings):

```bash
# displayed application name
docker exec bookstack php /app/www/artisan tinker --execute="setting()->put('app-name','CBM Documentation');"
# allow public (no-login) reading
docker exec bookstack php /app/www/artisan tinker --execute="setting()->put('app-public', true);"
# land visitors on the Bookshelves view
docker exec bookstack php /app/www/artisan tinker --execute="setting()->put('app-homepage-type','bookshelves');"
```

Public reading works because BookStack's built-in "Public" role ships with
view-all content permissions; enabling `app-public` is sufficient.

> **LinuxServer image note:** this image does **not** copy Compose env vars into
> BookStack's `/config/www/.env` (that file stays a placeholder template). It
> works anyway because the live container environment overrides it at runtime —
> so manage config through Compose env + the settings above, not by editing that
> `.env`.

---

## 6. Maintenance

All commands run from `/opt/bookstack` on the droplet.

### Status / logs / restart
```bash
docker compose ps
docker compose logs -f --tail=100          # all services
docker compose logs -f caddy               # TLS / proxy issues
docker compose restart                     # restart in place
docker compose up -d                       # apply compose/.env changes
```

### Update BookStack (and MariaDB / Caddy)
LinuxServer images track `latest`. To update:
```bash
cd /opt/bookstack
docker compose pull
docker compose up -d
docker image prune -f
```
BookStack runs DB migrations automatically on start. **Take a backup first**
(below). Review the [BookStack release notes](https://github.com/BookStackApp/BookStack/releases)
before major version jumps.

### Backups  ⚠️ not yet automated
Two things must be captured: the **database** and the **uploaded files**
(`bookstack/` = images/attachments). The `APP_KEY` in `.env` is also required to
decrypt restored data — keep it with the backup.

```bash
cd /opt/bookstack
set -a; . ./.env; set +a
# database (consistent dump; preferred over copying db/ live)
docker exec bookstack_db mariadb-dump -uroot -p"$DB_ROOT_PASSWORD" bookstack \
  | gzip > "backup-db-$(date +%F).sql.gz"
# uploaded files + app state
tar czf "backup-files-$(date +%F).tar.gz" -C /opt/bookstack bookstack
```
Copy both artifacts (and a copy of `.env`) off the droplet. **Recommended:** add a
cron job and ship to off-host storage (DO Spaces / elsewhere) — currently a
manual step.

### Restore
```bash
cd /opt/bookstack
# ensure .env uses the SAME APP_KEY as the backup, then:
docker compose up -d bookstack_db
set -a; . ./.env; set +a
zcat backup-db-YYYY-MM-DD.sql.gz | docker exec -i bookstack_db mariadb -uroot -p"$DB_ROOT_PASSWORD" bookstack
tar xzf backup-files-YYYY-MM-DD.tar.gz -C /opt/bookstack
docker compose up -d
```

### TLS
Fully automatic via Caddy (renews ~30 days before expiry). Nothing to do as long
as the DNS A record stays correct and **DNS-only** in Cloudflare, and ports
80/443 stay open. To check: `docker compose logs caddy | grep -i certificate`.

### Disk / resources
1 GB droplet — watch with `df -h` and `free -h`. BookStack is light; if it grows,
resize the droplet in the DO console (one command, brief reboot).

---

## 7. Reference: stack files

**`/opt/bookstack/Caddyfile`**
```
docs.clevelandbusinessmentors.org {
    reverse_proxy bookstack:80
}
```

**`/opt/bookstack/compose.yaml`** — three services: `bookstack_db`
(`lscr.io/linuxserver/mariadb`), `bookstack` (`lscr.io/linuxserver/bookstack`,
env `APP_URL=https://${DOMAIN}`, `APP_KEY`, `DB_*` pointing at `bookstack_db`),
and `caddy` (`caddy:2`, publishing 80/443, mounting `Caddyfile` + `caddy_data` +
`caddy_config`). All `restart: unless-stopped`. The authoritative copy lives on
the droplet; reconstruct from §3 + this summary if rebuilding.

---

## 8. Quick troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Cert won't issue / HTTPS fails | DNS not resolving, or Cloudflare proxy (orange cloud) is on → set **DNS-only**; check `docker compose logs caddy` |
| BookStack 502 in Caddy logs | App still starting (first-boot migrations) — wait ~30 s; otherwise `docker compose logs bookstack` |
| Docs prompt for login | `app-public` not set → re-run the §5 public-viewing command |
| CRM "Documentation" tab navigates in same window | The new-tab extension isn't loaded — redeploy per §4 and hard-refresh (Ctrl/Cmd+Shift+R) |
| Tab opens BookStack home instead of shelves | Set `app-homepage-type=bookshelves` (§5) |
