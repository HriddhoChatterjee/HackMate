
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base

class Team(Base):
    __tablename__ = "teams"

    team_id = Column(Integer, primary_key=True, index=True)

    opportunity_id = Column(Integer,ForeignKey("opportunities.opportunity_id"),nullable=False)

    leader_id = Column(Integer,ForeignKey("users.user_id"),nullable=False)

    team_name = Column(String(100), nullable=False)

    max_members = Column(Integer, nullable=False)

    status = Column(String(20), default="Open")

    created_at = Column(DateTime(timezone=True),server_default=func.now())

    opportunity = relationship("Opportunity",back_populates="teams")

    leader = relationship("User",back_populates="teams")

    applications = relationship("Application",back_populates="team",cascade="all, delete-orphan")