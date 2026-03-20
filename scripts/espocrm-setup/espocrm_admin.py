"""
EspoCRM Admin API client.

Uses Basic Auth (username/password) because API Users cannot have admin privileges.
Admin endpoints require a real admin user account.
"""

import json
import logging
import time

import requests

logger = logging.getLogger(__name__)


class EspoCrmAdmin:
    """HTTP client for EspoCRM administrative API endpoints."""

    def __init__(self, base_url: str, username: str, password: str):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.auth = (username, password)
        self.session.headers.update({"Content-Type": "application/json"})
        self.session.timeout = 30
        self._metadata_cache: dict | None = None

    # ------------------------------------------------------------------
    # Connectivity
    # ------------------------------------------------------------------

    def test_connection(self) -> bool:
        """Verify credentials and admin access."""
        resp = self.session.get(f"{self.base_url}/api/v1/App/user")
        resp.raise_for_status()
        user = resp.json()
        is_admin = user.get("user", {}).get("isAdmin", False)
        username = user.get("user", {}).get("userName", "unknown")
        if not is_admin:
            raise PermissionError(
                f"User '{username}' is not an admin. "
                "Admin access is required for entity/field management."
            )
        logger.info("Connected as admin user '%s'", username)
        return True

    # ------------------------------------------------------------------
    # Metadata (cached — one fetch per refresh cycle)
    # ------------------------------------------------------------------

    def get_metadata(self) -> dict:
        """Fetch full application metadata. Cached after first call."""
        if self._metadata_cache is None:
            logger.debug("Fetching metadata from server")
            resp = self.session.get(f"{self.base_url}/api/v1/Metadata")
            resp.raise_for_status()
            self._metadata_cache = resp.json()
        return self._metadata_cache

    def invalidate_metadata_cache(self) -> None:
        """Force a fresh metadata fetch on next access."""
        self._metadata_cache = None

    def get_scopes(self) -> dict:
        """Return the scopes (entity types) section of metadata."""
        return self.get_metadata().get("scopes", {})

    def entity_exists(self, entity_type: str) -> bool:
        """Check if an entity type is defined."""
        return entity_type in self.get_scopes()

    def get_entity_fields(self, entity_type: str) -> dict:
        """Fetch field definitions for an entity."""
        meta = self.get_metadata()
        return meta.get("entityDefs", {}).get(entity_type, {}).get("fields", {})

    def field_exists(self, entity_type: str, field_name: str) -> bool:
        """Check if a field exists on an entity."""
        return field_name in self.get_entity_fields(entity_type)

    # ------------------------------------------------------------------
    # Entity Manager
    # ------------------------------------------------------------------

    def create_entity(self, data: dict) -> dict:
        """Create a new custom entity type via Entity Manager."""
        name = data.get("name", "unknown")
        if self.entity_exists(name):
            logger.info("Entity '%s' already exists, skipping creation", name)
            return {"existed": True}

        resp = self.session.post(
            f"{self.base_url}/api/v1/EntityManager/action/createEntity",
            data=json.dumps(data),
        )
        resp.raise_for_status()
        self.invalidate_metadata_cache()
        logger.info("Created entity '%s'", name)
        return resp.json() if resp.text else {}

    def update_entity(self, data: dict) -> dict:
        """Update an existing entity type configuration."""
        resp = self.session.post(
            f"{self.base_url}/api/v1/EntityManager/action/updateEntity",
            data=json.dumps(data),
        )
        resp.raise_for_status()
        logger.info("Updated entity '%s'", data.get("name", "unknown"))
        return resp.json() if resp.text else {}

    # ------------------------------------------------------------------
    # Field Manager
    # ------------------------------------------------------------------

    def create_field(self, entity_type: str, field_data: dict) -> dict:
        """Create a custom field on an entity."""
        field_name = field_data.get("name", "unknown")
        if self.field_exists(entity_type, field_name):
            logger.info(
                "Field '%s.%s' already exists, skipping", entity_type, field_name
            )
            return {"existed": True}

        resp = self.session.post(
            f"{self.base_url}/api/v1/Admin/fieldManager/{entity_type}",
            data=json.dumps(field_data),
        )
        resp.raise_for_status()
        # Don't invalidate cache here — create_fields_batch does it once
        # after the full batch. For single-field calls, callers can
        # invalidate manually if needed.
        logger.info("Created field '%s.%s'", entity_type, field_name)
        return resp.json() if resp.text else {}

    def update_field(self, entity_type: str, field_name: str, field_data: dict) -> dict:
        """Update an existing field definition."""
        resp = self.session.put(
            f"{self.base_url}/api/v1/Admin/fieldManager/{entity_type}/{field_name}",
            data=json.dumps(field_data),
        )
        resp.raise_for_status()
        logger.info("Updated field '%s.%s'", entity_type, field_name)
        return resp.json() if resp.text else {}

    # ------------------------------------------------------------------
    # Relationships / Links
    # ------------------------------------------------------------------

    def create_link(self, data: dict) -> dict:
        """Create a relationship between two entity types."""
        resp = self.session.post(
            f"{self.base_url}/api/v1/EntityManager/action/createLink",
            data=json.dumps(data),
        )
        if resp.status_code == 409:
            logger.info(
                "Link '%s' <-> '%s' already exists, skipping",
                data.get("entity", "?"),
                data.get("entityForeign", "?"),
            )
            return {"existed": True}
        resp.raise_for_status()
        logger.info(
            "Created link: %s.%s <-> %s.%s",
            data.get("entity", "?"),
            data.get("link", "?"),
            data.get("entityForeign", "?"),
            data.get("linkForeign", "?"),
        )
        return resp.json() if resp.text else {}

    # ------------------------------------------------------------------
    # Layouts
    # ------------------------------------------------------------------

    def get_layout(self, entity_type: str, layout_name: str) -> list | dict:
        """Read a layout definition."""
        resp = self.session.get(
            f"{self.base_url}/api/v1/{entity_type}/layout/{layout_name}",
        )
        resp.raise_for_status()
        return resp.json()

    def update_layout(self, entity_type: str, layout_name: str, layout_data) -> dict:
        """Save a layout definition."""
        resp = self.session.put(
            f"{self.base_url}/api/v1/{entity_type}/layout/{layout_name}",
            data=json.dumps(layout_data),
        )
        resp.raise_for_status()
        logger.info("Updated layout '%s/%s'", entity_type, layout_name)
        return resp.json() if resp.text else {}

    # ------------------------------------------------------------------
    # Admin utilities
    # ------------------------------------------------------------------

    def rebuild(self) -> None:
        """Rebuild the application (regenerates metadata, DB schema, etc.)."""
        resp = self.session.post(f"{self.base_url}/api/v1/Admin/rebuild")
        resp.raise_for_status()
        logger.info("Application rebuild completed")

    def clear_cache(self) -> None:
        """Clear the application cache."""
        resp = self.session.post(f"{self.base_url}/api/v1/Admin/clearCache")
        resp.raise_for_status()
        logger.info("Cache cleared")

    # ------------------------------------------------------------------
    # Batch helpers
    # ------------------------------------------------------------------

    def create_fields_batch(self, entity_type: str, fields: list[dict]) -> None:
        """Create multiple fields on an entity, skipping any that already exist.

        Fetches metadata once up front and invalidates the cache after the
        batch so the next batch sees any newly created fields/entities.
        """
        # Pre-load cache so all field_exists checks in this batch hit it.
        self.get_metadata()
        created = 0
        for field_data in fields:
            result = self.create_field(entity_type, field_data)
            if not result.get("existed"):
                created += 1
            # Small delay to avoid overwhelming the server during batch operations.
            time.sleep(0.2)
        if created > 0:
            self.invalidate_metadata_cache()

    def create_links_batch(self, links: list[dict]) -> None:
        """Create multiple relationships, skipping any that already exist."""
        for link_data in links:
            self.create_link(link_data)
            time.sleep(0.2)
