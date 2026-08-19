from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_user, CurrentUser
from app.schemas.message import MessageCreate, MessageResponse
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate, TaskStatusUpdate
from app.schemas.workspace import WorkspaceCreate, WorkspaceResponse
from app.services import task_service, workspace_service

router = APIRouter(tags=["Workspace"])


@router.get("/workspace/{team_id}", response_model=WorkspaceResponse)
def get_workspace(team_id: int, db: Session = Depends(get_db)):
    try:
        return workspace_service.get_workspace(db, team_id)
    except workspace_service.WorkspaceNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/workspace", response_model=WorkspaceResponse, status_code=201)
def create_workspace(payload: WorkspaceCreate, db: Session = Depends(get_db)):
    try:
        return workspace_service.create_workspace(db, payload)
    except workspace_service.WorkspaceAlreadyExistsError as exc:
        raise HTTPException(status_code=409, detail=str(exc))


@router.get("/teams/{team_id}/tasks", response_model=list[TaskResponse])
def get_team_tasks(team_id: int, db: Session = Depends(get_db)):
    return task_service.get_all_tasks(db, team_id)


@router.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    try:
        return workspace_service.create_task(db, current_user["id"], payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.patch("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    try:
        return workspace_service.update_task(db, task_id, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.patch("/tasks/{task_id}/status", response_model=TaskResponse)
def update_task_status(task_id: int, payload: TaskStatusUpdate, db: Session = Depends(get_db)):
    try:
        return task_service.update_status(db, task_id, payload.status)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        return task_service.delete_task(db, task_id)
    except task_service.TaskNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.get("/teams/{team_id}/messages", response_model=list[MessageResponse])
def get_messages(
    team_id: int,
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return workspace_service.list_messages(db, team_id, limit)


@router.post("/messages", response_model=MessageResponse, status_code=201)
def send_message(
    payload: MessageCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    return workspace_service.send_message(db, current_user["id"], payload)
