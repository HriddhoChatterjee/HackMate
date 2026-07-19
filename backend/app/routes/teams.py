
from fastapi import APIRouter

router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)

@router.get("/")
def get_all_teams():
    return {"message": "Get all teams"}

@router.get("/{team_id}")
def get_team(team_id: int):
    return {"message": f"Get team {team_id}"}

@router.post("/")
def create_team():
    return {"message": "Create team"}

@router.put("/{team_id}")
def update_team(team_id: int):
    return {"message": f"Update team {team_id}"}

@router.delete("/{team_id}")
def delete_team(team_id: int):
    return {"message": f"Delete team {team_id}"}