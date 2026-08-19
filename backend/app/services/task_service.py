from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskNotFoundError(Exception):
    pass


VALID_STATUSES = {"Todo", "In Progress", "Completed"}
VALID_PRIORITIES = {"Low", "Medium", "High"}


def get_all_tasks(db: Session, team_id: int):
    return db.query(Task).filter(Task.team_id == team_id).order_by(Task.created_at.asc()).all()


def get_task_or_404(db: Session, task_id: int):
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise TaskNotFoundError("Task not found.")
    return task


def create_task(db: Session, payload: TaskCreate, current_user_id: int):
    if payload.priority not in VALID_PRIORITIES:
        raise ValueError(f"priority must be one of: {', '.join(sorted(VALID_PRIORITIES))}")
    task = Task(
        team_id=payload.team_id,
        created_by=current_user_id,
        assigned_to=payload.assigned_to,
        title=payload.title.strip(),
        description=payload.description,
        priority=payload.priority,
        due_date=payload.due_date,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task_id: int, payload: TaskUpdate):
    task = get_task_or_404(db, task_id)
    update_data = payload.model_dump(exclude_unset=True)
    if "priority" in update_data and update_data["priority"] not in VALID_PRIORITIES:
        raise ValueError("Invalid task priority")
    for key, value in update_data.items():
        setattr(task, key, value.strip() if key == "title" and isinstance(value, str) else value)
    db.commit()
    db.refresh(task)
    return task


def update_status(db: Session, task_id: int, status: str):
    task = get_task_or_404(db, task_id)
    if status not in VALID_STATUSES:
        raise ValueError("status must be Todo, In Progress, or Completed")
    task.status = status
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int):
    task = get_task_or_404(db, task_id)
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully."}
