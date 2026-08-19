from sqlalchemy.orm import Session
from app.models.mock_hackathon import MockHackathon


def list_challenges(db: Session, domain: str | None = None, difficulty: str | None = None) -> list[MockHackathon]:
    query = db.query(MockHackathon)
    if domain:
        query = query.filter(MockHackathon.domain.ilike(f"%{domain}%"))
    if difficulty:
        query = query.filter(MockHackathon.difficulty == difficulty)
    return query.order_by(MockHackathon.created_at.desc()).all()


def get_challenge(db: Session, challenge_id: int) -> MockHackathon | None:
    return db.query(MockHackathon).filter(MockHackathon.id == challenge_id).first()


def create_challenge(db: Session, **data) -> MockHackathon:
    challenge = MockHackathon(**data)
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    return challenge
