from sqlalchemy.orm import Session
from app.repositories import message_repository, workspace_repository
from app.services import task_service
from app.schemas.task import TaskCreate, TaskUpdate
from app.schemas.message import MessageCreate
from app.schemas.workspace import WorkspaceCreate


class WorkspaceAlreadyExistsError(Exception):
    pass


class WorkspaceNotFoundError(Exception):
    pass


def get_workspace(db: Session, team_id: int):
    workspace = workspace_repository.get_by_team(db, team_id)
    if workspace is None:
        raise WorkspaceNotFoundError(f"Workspace for team {team_id} not found")
    return workspace


def create_workspace(db: Session, payload: WorkspaceCreate):
    if workspace_repository.get_by_team(db, payload.team_id):
        raise WorkspaceAlreadyExistsError("A workspace already exists for this team.")
    return workspace_repository.create(db, payload.team_id, payload.name, payload.description)


def list_messages(db: Session, team_id: int, limit: int = 100):
    return message_repository.list_messages(db, team_id, limit)


def send_message(db: Session, user_id: int, payload: MessageCreate):
    return message_repository.create_message(db, payload.team_id, user_id, payload.content)


def create_task(db: Session, user_id: int, payload: TaskCreate):
    return task_service.create_task(db, payload, user_id)


def update_task(db: Session, task_id: int, payload: TaskUpdate):
    return task_service.update_task(db, task_id, payload)
