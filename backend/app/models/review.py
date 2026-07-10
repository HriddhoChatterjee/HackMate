"""
Review model — Track B.

A review is only valid in the context of a shared team (reviewer and
reviewee must have both been members of `team_id`). One reviewer can
review a given reviewee at most once per team — enforced by the
unique constraint below, plus a self-review check in the service layer.
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, UniqueConstraint, CheckConstraint
from sqlalchemy.sql import func

from app.database.base import Base


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        UniqueConstraint("reviewer_id", "reviewee_id", "team_id", name="uq_review_once_per_team"),
        CheckConstraint("rating >= 1 AND rating <= 5", name="ck_rating_range"),
    )

    id = Column(Integer, primary_key=True, index=True)
    reviewer_id = Column(Integer, nullable=False, index=True)  # FK -> users.id (Track A) once that table exists
    reviewee_id = Column(Integer, nullable=False, index=True)  # FK -> users.id (Track A)
    team_id = Column(Integer, nullable=False, index=True)      # FK -> teams.id (Track B) once that table exists
    rating = Column(Integer, nullable=False)  # 1-5
    tags = Column(JSON, nullable=False, default=list)  # e.g. ["communicative", "met_deadlines"]
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())