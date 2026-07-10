"""
ReputationScore model — Track A.

One row per user (1:1). Recalculated by reputation_service whenever
a new review is inserted — see services/review_service.py, which
calls into reputation_service after every review submission.
"""
from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class ReputationScore(Base):
    __tablename__ = "reputation_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, unique=True, index=True)  # FK -> users.id (Track A)
    current_score = Column(Float, nullable=False, default=0.0)  # 0-100 scale
    tier = Column(String, nullable=False, default="Unranked")   # Unranked | Needs Improvement | Average | Good | Excellent
    review_count = Column(Integer, nullable=False, default=0)
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())