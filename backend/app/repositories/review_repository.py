from sqlalchemy.orm import Session

from app.models.review import Review


def get_existing_review(db: Session, reviewer_id: int, reviewee_id: int, team_id: int) -> Review | None:
    return (
        db.query(Review)
        .filter(
            Review.reviewer_id == reviewer_id,
            Review.reviewee_id == reviewee_id,
            Review.team_id == team_id,
        )
        .first()
    )


def create_review(
    db: Session, reviewer_id: int, reviewee_id: int, team_id: int, rating: int, tags: list[str], comment: str | None
) -> Review:
    review = Review(
        reviewer_id=reviewer_id,
        reviewee_id=reviewee_id,
        team_id=team_id,
        rating=rating,
        tags=tags,
        comment=comment,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def list_reviews_for_user(db: Session, reviewee_id: int) -> list[Review]:
    return db.query(Review).filter(Review.reviewee_id == reviewee_id).all()


def get_all_ratings_for_user(db: Session, reviewee_id: int) -> list[int]:
    rows = db.query(Review.rating).filter(Review.reviewee_id == reviewee_id).all()
    return [r[0] for r in rows]