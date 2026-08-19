from sqlalchemy.orm import Session
from app.models.message import Message


def list_messages(db: Session, team_id: int, limit: int = 100) -> list[Message]:
    rows = (
        db.query(Message)
        .filter(Message.team_id == team_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
        .all()
    )
    return list(reversed(rows))


def create_message(db: Session, team_id: int, user_id: int, content: str) -> Message:
    message = Message(team_id=team_id, user_id=user_id, content=content.strip())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
