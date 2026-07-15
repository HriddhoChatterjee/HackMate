"""
Pydantic schemas for the Task Board module.

Separate schemas are used for:
- Creating a task
- Updating a task
- Updating task status
- Returning task details
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# -----------------------------
# Create Task
# -----------------------------
class TaskCreate(BaseModel):
    team_id: int
    title: str
    description: Optional[str] = None
    assigned_to: Optional[int] = None
    priority: str = "Medium"
    due_date: Optional[datetime] = None


# -----------------------------
# Update Task
# -----------------------------
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    assigned_to: Optional[int] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None


# -----------------------------
# Update Status Only
# -----------------------------
class TaskStatusUpdate(BaseModel):
    status: str


# -----------------------------
# Response Model
# -----------------------------
class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    task_id: int
    team_id: int
    created_by: int
    assigned_to: Optional[int]

    title: str
    description: Optional[str]

    priority: str
    status: str

    due_date: Optional[datetime]

    created_at: datetime
    updated_at: datetime