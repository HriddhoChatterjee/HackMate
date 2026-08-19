from sqlalchemy.orm import Session
from app.repositories import mock_hackathon_repository
from app.schemas.mock_hackathon import MockHackathonCreate


class MockHackathonNotFoundError(Exception):
    pass


def list_challenges(db: Session, domain: str | None = None, difficulty: str | None = None):
    return mock_hackathon_repository.list_challenges(db, domain, difficulty)


def get_challenge(db: Session, challenge_id: int):
    challenge = mock_hackathon_repository.get_challenge(db, challenge_id)
    if challenge is None:
        raise MockHackathonNotFoundError(f"Mock challenge {challenge_id} not found")
    return challenge


def create_challenge(db: Session, payload: MockHackathonCreate):
    return mock_hackathon_repository.create_challenge(db, **payload.model_dump())
