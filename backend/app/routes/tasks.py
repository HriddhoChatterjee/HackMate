from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_user, CurrentUser
from app.schemas.task import TaskCreate, TaskUpdate, TaskStatusUpdate, TaskResponse
from app.services import task_service

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/team/{team_id}", response_model=list[TaskResponse])
def get_tasks(team_id: int, db: Session = Depends(get_db)):
    return task_service.get_all_tasks(db, team_id)


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    try:
        return task_service.get_task_or_404(db, task_id)
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    try:
        return task_service.create_task(db, payload, current_user["id"])
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    try:
        return task_service.update_task(db, task_id, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.patch("/{task_id}/status", response_model=TaskResponse)
def update_status(task_id: int, payload: TaskStatusUpdate, db: Session = Depends(get_db)):
    try:
        return task_service.update_status(db, task_id, payload.status)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        return task_service.delete_task(db, task_id)
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
