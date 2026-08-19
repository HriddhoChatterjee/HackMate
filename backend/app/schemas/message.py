from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class MessageCreate(BaseModel):
    team_id: int
    content: str = Field(min_length=1, max_length=2000)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    message_id: int
    team_id: int
    user_id: int
    content: str
    created_at: datetime
