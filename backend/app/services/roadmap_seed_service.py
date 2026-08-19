"""Idempotent seeding for the curated roadmap catalog."""
from sqlalchemy.orm import Session

from app.data.roadmap_catalog import CATALOG
from app.models.roadmap import Roadmap


def seed_curated_roadmaps(db: Session) -> int:
    """Insert missing catalog roadmaps and refresh only catalog-owned rows."""
    inserted = 0
    for item in CATALOG:
        existing = db.query(Roadmap).filter(Roadmap.slug == item["slug"]).first()
        if existing is None:
            db.add(Roadmap(**item, version=1, is_active=True))
            inserted += 1
        else:
            # Catalog is version-controlled application data. Updating an existing
            # slug keeps the learning path consistent after a deploy.
            existing.domain = item["domain"]
            existing.title = item["title"]
            existing.description = item["description"]
            existing.difficulty = item["difficulty"]
            existing.estimated_weeks = item["estimated_weeks"]
            existing.prerequisites = item["prerequisites"]
            existing.steps = item["steps"]
            existing.is_active = True
            existing.version = max(existing.version or 1, 1)
    db.commit()
    return inserted
