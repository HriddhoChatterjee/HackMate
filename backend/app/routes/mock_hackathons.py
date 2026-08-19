from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.mock_hackathon import MockHackathonCreate, MockHackathonResponse
from app.services import mock_hackathon_service

router = APIRouter(prefix="/mock-hackathons", tags=["Mock Hackathons"])


@router.get("/", response_model=list[MockHackathonResponse])
def list_mock_hackathons(domain: str | None = None, difficulty: str | None = None, db: Session = Depends(get_db)):
    return mock_hackathon_service.list_challenges(db, domain, difficulty)


@router.get("/{challenge_id}", response_model=MockHackathonResponse)
def get_mock_hackathon(challenge_id: int, db: Session = Depends(get_db)):
    try:
        return mock_hackathon_service.get_challenge(db, challenge_id)
    except mock_hackathon_service.MockHackathonNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/", response_model=MockHackathonResponse, status_code=201)
def create_mock_hackathon(payload: MockHackathonCreate, db: Session = Depends(get_db)):
    return mock_hackathon_service.create_challenge(db, payload)
