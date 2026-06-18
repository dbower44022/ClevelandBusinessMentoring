#!/usr/bin/env bash
# Automated backup for the CBM BookStack documentation site.
# Canonical copy of /opt/bookstack/backup.sh on the cbm-docs droplet.
# Dumps the database and archives uploaded files + stack config, with rotation.
# Runs nightly via root cron (30 3 * * *). See CBM-Documentation-Site.md for restore steps.
set -euo pipefail

STACK_DIR=/opt/bookstack
BACKUP_DIR="$STACK_DIR/backups"
RETENTION_DAYS=14

# Read the app DB user's password from .env (do NOT source it — values may contain spaces).
# The 'bookstack' user has full rights on the 'bookstack' database; root uses socket auth.
DB_PASSWORD=$(grep -E '^DB_PASSWORD=' "$STACK_DIR/.env" | head -1 | cut -d= -f2-)
if [ -z "$DB_PASSWORD" ]; then echo "ERROR: DB_PASSWORD not found in .env" >&2; exit 1; fi

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
TS=$(date +%F_%H%M%S)
LOG="$BACKUP_DIR/backup.log"

{
  echo "=== $(date '+%F %T')  backup $TS  start ==="
  # 1. database — consistent dump, no table locking
  docker exec bookstack_db mariadb-dump -ubookstack -p"$DB_PASSWORD" \
      --single-transaction bookstack \
      | gzip > "$BACKUP_DIR/db-$TS.sql.gz"
  # 2. uploaded files + stack config + .env (APP_KEY required for restore)
  tar czf "$BACKUP_DIR/files-$TS.tar.gz" -C "$STACK_DIR" bookstack .env compose.yaml Caddyfile
  # 3. rotation
  find "$BACKUP_DIR" -maxdepth 1 -name 'db-*.sql.gz'    -mtime +$RETENTION_DAYS -delete
  find "$BACKUP_DIR" -maxdepth 1 -name 'files-*.tar.gz' -mtime +$RETENTION_DAYS -delete
  db_sz=$(du -h "$BACKUP_DIR/db-$TS.sql.gz" | cut -f1)
  f_sz=$(du -h "$BACKUP_DIR/files-$TS.tar.gz" | cut -f1)
  sets=$(ls -1 "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | wc -l)
  echo "=== $(date '+%F %T')  backup $TS  OK  db=$db_sz files=$f_sz  ($sets sets retained) ==="
} >> "$LOG" 2>&1
