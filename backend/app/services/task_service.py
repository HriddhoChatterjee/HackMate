"""
Business logic for the Task Board module.
"""

from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate

class TaskNotFoundError(Exception):
    pass

def get_all_tasks(db: Session, team_id: int):
    return (
        db.query(Task)
        .filter(Task.team_id == team_id)
        .order_by(Task.created_at.desc())
        .all()
    )

def get_task_or_404(db: Session, task_id: int):

    task = (
        db.query(Task)
        .filter(Task.task_id == task_id)
        .first()
    )

    if not task:
        raise TaskNotFoundError("Task not found.")

    return task

def create_task(
    db: Session,
    payload: TaskCreate,
    current_user_id: int,
):

    task = Task(
        team_id=payload.team_id,
        created_by=current_user_id,
        assigned_to=payload.assigned_to,
        title=payload.title,
        description=payload.description,
        priority=payload.priority,
        due_date=payload.due_date,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def update_task(
    db: Session,
    task_id: int,
    payload: TaskUpdate,
):

    task = get_task_or_404(db, task_id)

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task

def update_status(
    db: Session,
    task_id: int,
    status: str,
):

    task = get_task_or_404(db, task_id)

    task.status = status

    db.commit()
    db.refresh(task)

    return task


def delete_task(
    db: Session,
    task_id: int,
):

    task = get_task_or_404(db, task_id)

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully."
    }