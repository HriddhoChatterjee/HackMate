-- HackMate Roadmaps: PostgreSQL migration.
-- Safe to run more than once.
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS slug VARCHAR(120);
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS domain VARCHAR(120);
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS difficulty VARCHAR(30) NOT NULL DEFAULT 'beginner';
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS estimated_weeks INTEGER NOT NULL DEFAULT 8;
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS version INTEGER NOT NULL DEFAULT 1;
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Existing MVP rows may not have these fields. Give them stable generated values
-- before applying the uniqueness constraint.
UPDATE roadmaps
SET slug = COALESCE(NULLIF(slug, ''), 'legacy-roadmap-' || id::text),
    domain = COALESCE(NULLIF(domain, ''), 'General');

ALTER TABLE roadmaps ALTER COLUMN slug SET NOT NULL;
ALTER TABLE roadmaps ALTER COLUMN domain SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ix_roadmaps_slug ON roadmaps(slug);
CREATE INDEX IF NOT EXISTS ix_roadmaps_domain ON roadmaps(domain);
CREATE INDEX IF NOT EXISTS ix_roadmaps_is_active ON roadmaps(is_active);

ALTER TABLE user_roadmap_progress
    DROP CONSTRAINT IF EXISTS user_roadmap_progress_roadmap_id_fkey;
ALTER TABLE user_roadmap_progress
    ADD CONSTRAINT user_roadmap_progress_roadmap_id_fkey
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE;
