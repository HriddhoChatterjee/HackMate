"""Pydantic contracts for the production Roadmaps module."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator


class RoadmapResource(BaseModel):
    title: str = Field(min_length=2, max_length=160)
    url: str = Field(min_length=8, max_length=500)
    type: str = Field(default="documentation", max_length=40)


class RoadmapStep(BaseModel):
    id: str = Field(min_length=2, max_length=80)
    title: str = Field(min_length=2, max_length=200)
    description: str = Field(min_length=10, max_length=1000)
    estimated_hours: int = Field(default=6, ge=1, le=200)
    prerequisites: list[str] = Field(default_factory=list)
    resources: list[RoadmapResource] = Field(default_factory=list)
    project: str | None = Field(default=None, max_length=300)


class RoadmapCreate(BaseModel):
    slug: str = Field(min_length=2, max_length=120)
    domain: str = Field(min_length=2, max_length=120)
    title: str = Field(min_length=2, max_length=200)
    description: str | None = Field(default=None, max_length=2000)
    difficulty: str = Field(default="beginner", max_length=30)
    estimated_weeks: int = Field(default=8, ge=1, le=104)
    prerequisites: list[str] = Field(default_factory=list)
    steps: list[RoadmapStep] = Field(default_factory=list)


class RoadmapResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    domain: str
    title: str
    description: str | None
    difficulty: str
    estimated_weeks: int
    prerequisites: list[str]
    steps: list[RoadmapStep]
    version: int
    is_active: bool
    created_at: datetime
    updated_at: datetime | None = None


class RoadmapSummary(BaseModel):
    id: int
    slug: str
    domain: str
    title: str
    description: str | None
    difficulty: str
    estimated_weeks: int
    step_count: int
    version: int


class ProgressUpdate(BaseModel):
    step_id: str | None = Field(default=None, min_length=2, max_length=80)
    completed: bool = True
    # Backwards compatibility with the original MVP API.
    completed_step_index: int | None = Field(default=None, ge=0)

    @field_validator("step_id")
    @classmethod
    def normalize_step_id(cls, value):
        return value.strip() if value else value


class RoadmapStepProgress(BaseModel):
    id: str
    title: str
    completed: bool
    locked: bool
    prerequisites: list[str]


class ProgressResponse(BaseModel):
    roadmap_id: int
    completed_steps: list[str]
    status: str
    completed_count: int
    total_steps: int
    percentage: int
    next_step_id: str | None
    steps: list[RoadmapStepProgress]
    updated_at: datetime | None = None
