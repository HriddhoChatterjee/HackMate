"""Roadmap persistence models for the rule-based learning module."""
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.sql import func

from app.database.base import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    domain = Column(String(120), index=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    difficulty = Column(String(30), nullable=False, default="beginner")
    estimated_weeks = Column(Integer, nullable=False, default=8)
    prerequisites = Column(JSON, nullable=False, default=list)
    # Ordered, rule-driven steps. Each step has an id and optional prerequisite ids.
    steps = Column(JSON, nullable=False, default=list)
    version = Column(Integer, nullable=False, default=1)
    is_active = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class UserRoadmapProgress(Base):
    __tablename__ = "user_roadmap_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False, index=True)
    # Step ids are stable strings from the roadmap catalog.
    completed_steps = Column(JSON, nullable=False, default=list)
    status = Column(String(30), nullable=False, default="not_started")
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
