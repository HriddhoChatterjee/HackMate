from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ReviewCreate(BaseModel):
    reviewee_id: int
    team_id: int
    rating: int = Field(ge=1, le=5)
    tags: list[str] = []
    comment: str | None = None


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    reviewer_id: int
    reviewee_id: int
    team_id: int
    rating: int
    tags: list[str]
    comment: str | None
    created_at: datetime