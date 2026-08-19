from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    workspace_id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.team_id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
