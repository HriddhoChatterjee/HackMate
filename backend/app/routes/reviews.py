from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_user, CurrentUser
from app.schemas.review import ReviewCreate, ReviewResponse
from app.services import review_service

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.post("/", response_model=ReviewResponse, status_code=201)
def submit_review(
    payload: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    try:
        return review_service.submit_review(db, current_user["id"], payload)
    except review_service.SelfReviewError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except review_service.DuplicateReviewError as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/user/{user_id}", response_model=list[ReviewResponse])
def get_reviews_for_user(user_id: int, db: Session = Depends(get_db)):
    return review_service.get_reviews_for_user(db, user_id)