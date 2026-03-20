#!/usr/bin/env python3
"""
CBM EspoCRM Setup Script

Provisions the complete client-domain CRM schema via the EspoCRM admin API:
  1. Creates custom entities (Engagement, Session, NPS Survey Response, etc.)
  2. Adds custom fields to Account (Company), Contact, and all custom entities
  3. Configures entity relationships
  4. Applies dynamic logic (conditional field visibility)
  5. Rebuilds the application

Usage:
    python setup_crm.py --url https://crm.example.com --user admin --password secret
    python setup_crm.py --dry-run   # Preview without making changes

Environment variables (alternative to CLI args):
    ESPOCRM_URL, ESPOCRM_ADMIN_USER, ESPOCRM_ADMIN_PASSWORD
"""

import argparse
import json
import logging
import os
import sys

from definitions import (
    ACCOUNT_FIELDS,
    CBM_SESSION_FIELDS,
    CONTACT_FIELDS,
    CUSTOM_ENTITIES,
    DYNAMIC_LOGIC,
    ENGAGEMENT_FIELDS,
    NPS_SURVEY_RESPONSE_FIELDS,
    RELATIONSHIPS,
    WORKSHOP_ATTENDANCE_FIELDS,
    WORKSHOP_FIELDS,
)
from espocrm_admin import EspoCrmAdmin

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)

# Map entity names to their field definitions.
ENTITY_FIELDS = {
    "Account": ACCOUNT_FIELDS,
    "Contact": CONTACT_FIELDS,
    "Engagement": ENGAGEMENT_FIELDS,
    "CbmSession": CBM_SESSION_FIELDS,
    "NpsSurveyResponse": NPS_SURVEY_RESPONSE_FIELDS,
    "Workshop": WORKSHOP_FIELDS,
    "WorkshopAttendance": WORKSHOP_ATTENDANCE_FIELDS,
}


def parse_args():
    parser = argparse.ArgumentParser(
        description="Provision CBM entities, fields, and relationships in EspoCRM."
    )
    parser.add_argument(
        "--url",
        default=os.getenv("ESPOCRM_URL", ""),
        help="EspoCRM base URL (or set ESPOCRM_URL env var)",
    )
    parser.add_argument(
        "--user",
        default=os.getenv("ESPOCRM_ADMIN_USER", ""),
        help="Admin username (or set ESPOCRM_ADMIN_USER env var)",
    )
    parser.add_argument(
        "--password",
        default=os.getenv("ESPOCRM_ADMIN_PASSWORD", ""),
        help="Admin password (or set ESPOCRM_ADMIN_PASSWORD env var)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be done without making API calls",
    )
    parser.add_argument(
        "--skip-rebuild",
        action="store_true",
        help="Skip the final application rebuild",
    )
    parser.add_argument(
        "--step",
        choices=["entities", "fields", "relationships", "dynamic-logic", "rebuild"],
        help="Run only a specific step",
    )
    return parser.parse_args()


def dry_run_preview():
    """Print a summary of what the script would create."""
    print("\n=== DRY RUN — No changes will be made ===\n")

    print("ENTITIES TO CREATE:")
    for entity in CUSTOM_ENTITIES:
        print(f"  + {entity['name']} ({entity['labelSingular']})")

    print("\nFIELDS TO CREATE:")
    for entity_name, fields in ENTITY_FIELDS.items():
        print(f"\n  {entity_name}:")
        for field in fields:
            req = " [required]" if field.get("required") else ""
            print(f"    + {field['name']} ({field['type']}){req}")

    print("\nRELATIONSHIPS TO CREATE:")
    for rel in RELATIONSHIPS:
        link_type = rel.get("linkType", "?")
        link_foreign_type = rel.get("linkForeignType", "?")
        print(
            f"  + {rel['entity']}.{rel['link']} ({link_type}) "
            f"<-> {rel['entityForeign']}.{rel['linkForeign']} ({link_foreign_type})"
        )

    print("\nDYNAMIC LOGIC RULES:")
    for entity_name, rules in DYNAMIC_LOGIC.items():
        for field_name in rules:
            print(f"  + {entity_name}.{field_name} — conditional visibility")

    # Summary counts
    total_fields = sum(len(f) for f in ENTITY_FIELDS.values())
    print(f"\nTOTALS: {len(CUSTOM_ENTITIES)} entities, {total_fields} fields, "
          f"{len(RELATIONSHIPS)} relationships, "
          f"{sum(len(r) for r in DYNAMIC_LOGIC.values())} dynamic logic rules")


def step_create_entities(client: EspoCrmAdmin):
    """Step 1: Create custom entities."""
    logger.info("=== Step 1: Creating custom entities ===")
    for entity_data in CUSTOM_ENTITIES:
        client.create_entity(entity_data)


def step_create_fields(client: EspoCrmAdmin):
    """Step 2: Create fields on all entities."""
    logger.info("=== Step 2: Creating fields ===")
    for entity_name, fields in ENTITY_FIELDS.items():
        logger.info("--- %s (%d fields) ---", entity_name, len(fields))
        client.create_fields_batch(entity_name, fields)


def step_create_relationships(client: EspoCrmAdmin):
    """Step 3: Create entity relationships."""
    logger.info("=== Step 3: Creating relationships ===")
    client.create_links_batch(RELATIONSHIPS)


def step_apply_dynamic_logic(client: EspoCrmAdmin):
    """Step 4: Apply dynamic logic (conditional field visibility)."""
    logger.info("=== Step 4: Applying dynamic logic ===")
    for entity_name, field_rules in DYNAMIC_LOGIC.items():
        for field_name, logic in field_rules.items():
            logger.info(
                "Setting dynamic logic on %s.%s", entity_name, field_name
            )
            client.update_field(entity_name, field_name, {"dynamicLogicVisible": logic.get("visible")})


def step_rebuild(client: EspoCrmAdmin):
    """Step 5: Rebuild the application."""
    logger.info("=== Step 5: Rebuilding application ===")
    client.rebuild()


def main():
    args = parse_args()

    if args.dry_run:
        dry_run_preview()
        return 0

    if not args.url or not args.user or not args.password:
        logger.error(
            "Missing required arguments. Provide --url, --user, --password "
            "or set ESPOCRM_URL, ESPOCRM_ADMIN_USER, ESPOCRM_ADMIN_PASSWORD "
            "environment variables."
        )
        return 1

    client = EspoCrmAdmin(args.url, args.user, args.password)

    # Verify connectivity and admin access.
    try:
        client.test_connection()
    except Exception as e:
        logger.error("Connection failed: %s", e)
        return 1

    steps = {
        "entities": step_create_entities,
        "fields": step_create_fields,
        "relationships": step_create_relationships,
        "dynamic-logic": step_apply_dynamic_logic,
        "rebuild": step_rebuild,
    }

    if args.step:
        # Run a single step.
        steps[args.step](client)
    else:
        # Run all steps in order.
        step_create_entities(client)
        step_create_fields(client)
        step_create_relationships(client)
        step_apply_dynamic_logic(client)
        if not args.skip_rebuild:
            step_rebuild(client)

    logger.info("=== Setup complete ===")
    return 0


if __name__ == "__main__":
    sys.exit(main())
