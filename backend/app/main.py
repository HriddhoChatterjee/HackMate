from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.base import Base
from app.database.session import SessionLocal, engine
from app.database.roadmap_migration import ensure_roadmap_schema
from app.models import (
    application,
    message,
    mock_hackathon,
    notification,
    reputation,
    review,
    roadmap,
    task,
    task_activity,
    task_comment,
    team,
    opportunity,
    user,
    workspace,
)
from app.routes import auth, mock_hackathons, notifications, roadmaps, tasks, users
from app.routes import reputation as reputation_routes
from app.routes import reviews, websocket, workspace as workspace_routes
from app.services.roadmap_seed_service import seed_curated_roadmaps

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
ensure_roadmap_schema()
with SessionLocal() as seed_db:
    seed_curated_roadmaps(seed_db)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(notifications.router)
app.include_router(roadmaps.router)
app.include_router(reviews.router)
app.include_router(reputation_routes.router)
app.include_router(tasks.router)
app.include_router(workspace_routes.router)
app.include_router(websocket.router)
app.include_router(mock_hackathons.router)


@app.get("/")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "env": settings.ENV}
