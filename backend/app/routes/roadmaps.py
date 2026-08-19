"""HTTP endpoints for curated, rule-based learning roadmaps."""
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import CurrentUser, get_current_user
from app.schemas.roadmap import (
    ProgressResponse,
    ProgressUpdate,
    RoadmapCreate,
    RoadmapResponse,
    RoadmapSummary,
)
from app.services import roadmap_service

router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])


@router.get("/", response_model=list[RoadmapSummary])
def list_roadmaps(
    domain: str | None = Query(default=None, min_length=2, max_length=120),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    roadmaps = roadmap_service.get_all_roadmaps(db, skip, limit, domain.strip() if domain else None)
    return [
        RoadmapSummary(
            id=r.id,
            slug=r.slug,
            domain=r.domain,
            title=r.title,
            description=r.description,
            difficulty=r.difficulty,
            estimated_weeks=r.estimated_weeks,
            step_count=len(r.steps or []),
            version=r.version,
        )
        for r in roadmaps
    ]


@router.get("/domains", response_model=list[str])
def list_domains(db: Session = Depends(get_db)):
    roadmaps = roadmap_service.get_all_roadmaps(db, limit=100)
    return sorted({roadmap.domain for roadmap in roadmaps})


@router.get("/{roadmap_id}", response_model=RoadmapResponse)
def get_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    try:
        return roadmap_service.get_roadmap_or_404(db, roadmap_id)
    except roadmap_service.RoadmapNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/slug/{slug}", response_model=RoadmapResponse)
def get_roadmap_by_slug(slug: str, db: Session = Depends(get_db)):
    try:
        return roadmap_service.get_roadmap_by_slug_or_404(db, slug)
    except roadmap_service.RoadmapNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/", response_model=RoadmapResponse, status_code=status.HTTP_201_CREATED)
def create_roadmap(payload: RoadmapCreate, db: Session = Depends(get_db)):
    try:
        return roadmap_service.create_new_roadmap(db, payload)
    except roadmap_service.InvalidRoadmapStepError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/{roadmap_id}/progress", response_model=ProgressResponse)
def get_progress(
    roadmap_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    try:
        return roadmap_service.build_progress(db, current_user["id"], roadmap_id)
    except roadmap_service.RoadmapNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.put("/{roadmap_id}/progress", response_model=ProgressResponse)
def update_progress(
    roadmap_id: int,
    payload: ProgressUpdate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    try:
        return roadmap_service.update_progress(
            db,
            current_user["id"],
            roadmap_id,
            payload.step_id,
            payload.completed,
            payload.completed_step_index,
        )
    except roadmap_service.RoadmapNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except roadmap_service.RoadmapPrerequisiteError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except roadmap_service.InvalidRoadmapStepError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/{roadmap_id}/progress", response_model=ProgressResponse)
def update_progress_legacy(
    roadmap_id: int,
    payload: ProgressUpdate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    return update_progress(roadmap_id, payload, db, current_user)
