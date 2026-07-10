from sqlalchemy.orm import Session

from app.models.reputation import ReputationScore


def get_score(db: Session, user_id: int) -> ReputationScore | None:
    return db.query(ReputationScore).filter(ReputationScore.user_id == user_id).first()


def upsert_score(db: Session, user_id: int, current_score: float, tier: str, review_count: int) -> ReputationScore:
    score = get_score(db, user_id)
    if score is None:
        score = ReputationScore(
            user_id=user_id, current_score=current_score, tier=tier, review_count=review_count
        )
        db.add(score)
    else:
        score.current_score = current_score
        score.tier = tier
        score.review_count = review_count
    db.commit()
    db.refresh(score)
    return score