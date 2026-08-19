from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class Message(Base):
    __tablename__ = "messages"

    message_id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.team_id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
