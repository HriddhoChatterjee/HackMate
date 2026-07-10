from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ReputationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    current_score: float
    tier: str
    review_count: int
    last_updated: datetime | None = None