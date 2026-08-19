from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class MockHackathonCreate(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    description: str = Field(min_length=1)
    domain: str = Field(min_length=1, max_length=100)
    difficulty: str = Field(default="Intermediate", max_length=30)
    duration_minutes: int = Field(default=120, ge=15, le=1440)
    requirements: str | None = None


class MockHackathonResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    domain: str
    difficulty: str
    duration_minutes: int
    requirements: str | None
    created_at: datetime
