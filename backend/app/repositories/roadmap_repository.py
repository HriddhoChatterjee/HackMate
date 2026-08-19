"""Database access for the Roadmaps module."""
from sqlalchemy.orm import Session

from app.models.roadmap import Roadmap, UserRoadmapProgress


def list_roadmaps(db: Session, skip: int = 0, limit: int = 20, domain: str | None = None):
    query = db.query(Roadmap).filter(Roadmap.is_active.is_(True))
    if domain:
        query = query.filter(Roadmap.domain == domain)
    return query.order_by(Roadmap.domain.asc(), Roadmap.id.asc()).offset(skip).limit(limit).all()


def get_roadmap(db: Session, roadmap_id: int):
    return db.query(Roadmap).filter(Roadmap.id == roadmap_id, Roadmap.is_active.is_(True)).first()


def get_roadmap_by_slug(db: Session, slug: str):
    return db.query(Roadmap).filter(Roadmap.slug == slug, Roadmap.is_active.is_(True)).first()


def create_roadmap(db: Session, payload: dict):
    roadmap = Roadmap(**payload)
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)
    return roadmap


def get_progress(db: Session, user_id: int, roadmap_id: int):
    return (
        db.query(UserRoadmapProgress)
        .filter(
            UserRoadmapProgress.user_id == user_id,
            UserRoadmapProgress.roadmap_id == roadmap_id,
        )
        .first()
    )


def upsert_progress(db: Session, user_id: int, roadmap_id: int, completed_steps: list[str], status: str):
    progress = get_progress(db, user_id, roadmap_id)
    if progress is None:
        progress = UserRoadmapProgress(
            user_id=user_id,
            roadmap_id=roadmap_id,
            completed_steps=completed_steps,
            status=status,
        )
        db.add(progress)
    else:
        progress.completed_steps = completed_steps
        progress.status = status
    db.commit()
    db.refresh(progress)
    return progress
