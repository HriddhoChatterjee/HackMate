"""Small bootstrap migration for the Roadmaps module.

The repository currently uses SQLAlchemy create_all rather than Alembic. This
migration keeps existing PostgreSQL databases compatible with the expanded
Roadmap model. For a larger production system, these statements should be
moved into the project's normal migration runner.
"""
from sqlalchemy import text

from app.database.session import engine


POSTGRES_STATEMENTS = [
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS slug VARCHAR(120)",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS domain VARCHAR(120)",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS difficulty VARCHAR(30) NOT NULL DEFAULT 'beginner'",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS estimated_weeks INTEGER NOT NULL DEFAULT 8",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS version INTEGER NOT NULL DEFAULT 1",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE",
    "ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
    "UPDATE roadmaps SET slug = COALESCE(NULLIF(slug, ''), 'legacy-roadmap-' || id::text), domain = COALESCE(NULLIF(domain, ''), 'General')",
    "ALTER TABLE roadmaps ALTER COLUMN slug SET NOT NULL",
    "ALTER TABLE roadmaps ALTER COLUMN domain SET NOT NULL",
    "CREATE UNIQUE INDEX IF NOT EXISTS ix_roadmaps_slug ON roadmaps(slug)",
    "CREATE INDEX IF NOT EXISTS ix_roadmaps_domain ON roadmaps(domain)",
    "CREATE INDEX IF NOT EXISTS ix_roadmaps_is_active ON roadmaps(is_active)",
    "ALTER TABLE user_roadmap_progress DROP CONSTRAINT IF EXISTS user_roadmap_progress_roadmap_id_fkey",
    "ALTER TABLE user_roadmap_progress ADD CONSTRAINT user_roadmap_progress_roadmap_id_fkey FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE",
]


def ensure_roadmap_schema() -> None:
    """Apply only the Roadmap bootstrap changes when the configured DB is PostgreSQL."""
    if not engine.dialect.name.startswith("postgresql"):
        return
    with engine.begin() as connection:
        for statement in POSTGRES_STATEMENTS:
            connection.execute(text(statement))
