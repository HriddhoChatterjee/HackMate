from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.reputation import ReputationResponse
from app.services import reputation_service

router = APIRouter(prefix="/reputation", tags=["reputation"])


@router.get("/{user_id}", response_model=ReputationResponse)
def get_reputation(user_id: int, db: Session = Depends(get_db)):
    return reputation_service.get_user_reputation(db, user_id)