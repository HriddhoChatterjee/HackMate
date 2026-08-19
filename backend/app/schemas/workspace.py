from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class WorkspaceCreate(BaseModel):
    team_id: int
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None


class WorkspaceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    workspace_id: int
    team_id: int
    name: str
    description: str | None
    created_at: datetime
