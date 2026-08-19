from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database.base import Base


class MockHackathon(Base):
    __tablename__ = "mock_challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    domain = Column(String(100), nullable=False, index=True)
    difficulty = Column(String(30), nullable=False, default="Intermediate")
    duration_minutes = Column(Integer, nullable=False, default=120)
    requirements = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
