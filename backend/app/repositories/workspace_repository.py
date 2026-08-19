from sqlalchemy.orm import Session
from app.models.workspace import Workspace


def get_by_team(db: Session, team_id: int) -> Workspace | None:
    return db.query(Workspace).filter(Workspace.team_id == team_id).first()


def create(db: Session, team_id: int, name: str, description: str | None) -> Workspace:
    workspace = Workspace(team_id=team_id, name=name, description=description)
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace
