from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.base import Base
from app.database.session import engine
from app.models import roadmap  
from app.models import user, reputation, notification

# --- Import routers ---
from app.routes import roadmaps
from app.routes import auth, users, notifications  # Fixed: Imported from app.routes instead of app.dependencies
from app.models import review  
from app.models import reputation  

from app.routes import reviews
from app.routes import reputation as reputation_routes
app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)          # Add this
app.include_router(users.router)         # Add this   # Add this
app.include_router(notifications.router) # Add this
Base.metadata.create_all(bind=engine)

app.include_router(roadmaps.router)


app.include_router(reviews.router)
app.include_router(reputation_routes.router)


@app.get("/")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "env": settings.ENV}
