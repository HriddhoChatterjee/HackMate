from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Team and opportunity models use explicit back_populates relationships.
    teams = relationship("Team", back_populates="leader")
    opportunities = relationship("Opportunity", back_populates="creator")
    applications = relationship("Application", back_populates="applicant")

    created_tasks = relationship(
        "Task", foreign_keys="Task.created_by", back_populates="creator"
    )
    assigned_tasks = relationship(
        "Task", foreign_keys="Task.assigned_to", back_populates="assignee"
    )
