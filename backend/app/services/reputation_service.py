"""
Business logic for Reputation — Track A.

Score formula (simple, rule-based, no AI — same philosophy as team matching):
    current_score = average(all ratings received) scaled from 1-5 up to 0-100

Tier thresholds are on the 0-100 scale:
    >= 90  -> Excellent
    >= 75  -> Good
    >= 50  -> Average
    >  0   -> Needs Improvement
    no reviews yet -> Unranked

This is intentionally simple for launch. Documented future upgrades:
    - Weight recent reviews more heavily than old ones (recency decay)
    - Weight reviews from higher-reputation reviewers more heavily
    - Factor in hackathon completion rate, not just review ratings
"""
from sqlalchemy.orm import Session

from app.repositories import review_repository, reputation_repository


def _rating_avg_to_tier(score_0_to_100: float, review_count: int) -> str:
    if review_count == 0:
        return "Unranked"
    if score_0_to_100 >= 90:
        return "Excellent"
    if score_0_to_100 >= 75:
        return "Good"
    if score_0_to_100 >= 50:
        return "Average"
    return "Needs Improvement"


def recalculate_score(db: Session, user_id: int):
    ratings = review_repository.get_all_ratings_for_user(db, user_id)
    review_count = len(ratings)

    if review_count == 0:
        avg_score_0_to_100 = 0.0
    else:
        avg_rating_1_to_5 = sum(ratings) / review_count
        avg_score_0_to_100 = round((avg_rating_1_to_5 / 5) * 100, 1)

    tier = _rating_avg_to_tier(avg_score_0_to_100, review_count)

    return reputation_repository.upsert_score(db, user_id, avg_score_0_to_100, tier, review_count)


def get_user_reputation(db: Session, user_id: int):
    score = reputation_repository.get_score(db, user_id)
    if score is None:
        # No reviews yet — return a default Unranked record without writing to DB
        return {
            "user_id": user_id,
            "current_score": 0.0,
            "tier": "Unranked",
            "review_count": 0,
            "last_updated": None,
        }
    return score