from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_tasks = relationship(
    "Task",
    foreign_keys="Task.created_by",
)

assigned_tasks = relationship(
    "Task",
    foreign_keys="Task.assigned_to",
)