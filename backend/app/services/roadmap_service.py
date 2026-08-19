"""Business rules for the rule-based Roadmaps module."""
from sqlalchemy.orm import Session

from app.repositories import roadmap_repository
from app.schemas.roadmap import RoadmapCreate


class RoadmapNotFoundError(Exception):
    pass


class InvalidRoadmapStepError(Exception):
    pass


class RoadmapPrerequisiteError(Exception):
    pass


def get_all_roadmaps(db: Session, skip: int = 0, limit: int = 20, domain: str | None = None):
    return roadmap_repository.list_roadmaps(db, skip, limit, domain)


def get_roadmap_or_404(db: Session, roadmap_id: int):
    roadmap = roadmap_repository.get_roadmap(db, roadmap_id)
    if roadmap is None:
        raise RoadmapNotFoundError(f"Roadmap {roadmap_id} not found")
    return roadmap


def get_roadmap_by_slug_or_404(db: Session, slug: str):
    roadmap = roadmap_repository.get_roadmap_by_slug(db, slug)
    if roadmap is None:
        raise RoadmapNotFoundError(f"Roadmap '{slug}' not found")
    return roadmap


def create_new_roadmap(db: Session, payload: RoadmapCreate):
    step_ids = {step.id for step in payload.steps}
    for step in payload.steps:
        missing = set(step.prerequisites) - step_ids
        if missing:
            raise InvalidRoadmapStepError(
                f"Step '{step.id}' references unknown prerequisites: {sorted(missing)}"
            )

    existing = roadmap_repository.get_roadmap_by_slug(db, payload.slug)
    if existing:
        raise InvalidRoadmapStepError(f"Roadmap slug '{payload.slug}' already exists")

    return roadmap_repository.create_roadmap(
        db,
        {
            "slug": payload.slug,
            "domain": payload.domain,
            "title": payload.title,
            "description": payload.description,
            "difficulty": payload.difficulty,
            "estimated_weeks": payload.estimated_weeks,
            "prerequisites": payload.prerequisites,
            "steps": [step.model_dump() for step in payload.steps],
            "version": 1,
            "is_active": True,
        },
    )


def _normalize_completed(roadmap, completed_steps):
    valid_ids = {step["id"] for step in roadmap.steps}
    normalized = {str(item) for item in (completed_steps or []) if str(item) in valid_ids}
    return normalized


def build_progress(db: Session, user_id: int, roadmap_id: int):
    roadmap = get_roadmap_or_404(db, roadmap_id)
    progress = roadmap_repository.get_progress(db, user_id, roadmap_id)
    completed = _normalize_completed(roadmap, progress.completed_steps if progress else [])

    progress_steps = []
    next_step_id = None
    for step in roadmap.steps:
        prerequisites = set(step.get("prerequisites", []))
        is_completed = step["id"] in completed
        locked = not prerequisites.issubset(completed)
        progress_steps.append(
            {
                "id": step["id"],
                "title": step["title"],
                "completed": is_completed,
                "locked": locked,
                "prerequisites": sorted(prerequisites),
            }
        )
        if next_step_id is None and not is_completed and not locked:
            next_step_id = step["id"]

    total = len(roadmap.steps)
    count = len(completed)
    percentage = round((count / total) * 100) if total else 0
    status = "completed" if total and count == total else "in_progress" if count else "not_started"

    return {
        "roadmap_id": roadmap.id,
        "completed_steps": sorted(completed),
        "status": status,
        "completed_count": count,
        "total_steps": total,
        "percentage": percentage,
        "next_step_id": next_step_id,
        "steps": progress_steps,
        "updated_at": progress.updated_at if progress else None,
    }


def update_progress(db: Session, user_id: int, roadmap_id: int, step_id: str | None, completed: bool, step_index: int | None = None):
    roadmap = get_roadmap_or_404(db, roadmap_id)
    steps = roadmap.steps or []

    if step_id is None and step_index is not None:
        if step_index >= len(steps):
            raise InvalidRoadmapStepError("Step index is outside this roadmap")
        step_id = steps[step_index]["id"]
    if step_id is None:
        raise InvalidRoadmapStepError("step_id is required")

    step_map = {step["id"]: step for step in steps}
    if step_id not in step_map:
        raise InvalidRoadmapStepError(f"Unknown roadmap step '{step_id}'")

    existing = roadmap_repository.get_progress(db, user_id, roadmap_id)
    completed_steps = _normalize_completed(roadmap, existing.completed_steps if existing else [])
    prerequisites = set(step_map[step_id].get("prerequisites", []))

    if completed and not prerequisites.issubset(completed_steps):
        missing = sorted(prerequisites - completed_steps)
        raise RoadmapPrerequisiteError(
            f"Complete prerequisite step(s) first: {', '.join(missing)}"
        )

    if completed:
        completed_steps.add(step_id)
    else:
        # A completed prerequisite cannot be removed while dependent steps remain complete.
        dependents = {
            step["id"]
            for step in steps
            if step_id in set(step.get("prerequisites", [])) and step["id"] in completed_steps
        }
        if dependents:
            raise RoadmapPrerequisiteError(
                f"Cannot uncomplete '{step_id}' while dependent step(s) remain complete: {', '.join(sorted(dependents))}"
            )
        completed_steps.discard(step_id)

    status = "completed" if steps and len(completed_steps) == len(steps) else "in_progress" if completed_steps else "not_started"
    roadmap_repository.upsert_progress(db, user_id, roadmap_id, sorted(completed_steps), status)
    return build_progress(db, user_id, roadmap_id)
