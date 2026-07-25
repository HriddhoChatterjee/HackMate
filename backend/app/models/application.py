from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Application(Base):
    __tablename__ = "applications"

    application_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)

    team_id = Column(Integer,ForeignKey("teams.team_id"),nullable=False)

    status = Column(String(20),nullable=False,default="Pending")

    applied_at = Column(DateTime(timezone=True),server_default=func.now())

    applicant = relationship("User",back_populates="applications")

    team = relationship("Team",back_populates="applications")