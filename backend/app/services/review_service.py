from sqlalchemy.orm import Session

from app.repositories import review_repository
from app.schemas.review import ReviewCreate
from app.services import reputation_service


class SelfReviewError(Exception):
    pass


class DuplicateReviewError(Exception):
    pass


def submit_review(db: Session, reviewer_id: int, payload: ReviewCreate):
    if reviewer_id == payload.reviewee_id:
        raise SelfReviewError("You can't review yourself.")

    existing = review_repository.get_existing_review(
        db, reviewer_id, payload.reviewee_id, payload.team_id
    )
    if existing is not None:
        raise DuplicateReviewError("You've already reviewed this teammate for this team.")

    review = review_repository.create_review(
        db,
        reviewer_id=reviewer_id,
        reviewee_id=payload.reviewee_id,
        team_id=payload.team_id,
        rating=payload.rating,
        tags=payload.tags,
        comment=payload.comment,
    )

    # Feed into Reputation immediately so the score is always up to date.
    reputation_service.recalculate_score(db, payload.reviewee_id)

    return review


def get_reviews_for_user(db: Session, reviewee_id: int):
    return review_repository.list_reviews_for_user(db, reviewee_id)

def get_all_reviews(db: Session):
    return review_repository.list_all_reviews(db)
