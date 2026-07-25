
from fastapi import APIRouter

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"]
)

@router.get("/")
def get_all_opportunities():
    return {"message": "Get all opportunities"}

@router.get("/{opportunity_id}")
def get_opportunity(opportunity_id: int):
    return {"message": f"Get opportunity {opportunity_id}"}

@router.post("/")
def create_opportunity():
    return {"message": "Create opportunity"}

@router.put("/{opportunity_id}")
def update_opportunity(opportunity_id: int):
    return {"message": f"Update opportunity {opportunity_id}"}

@router.delete("/{opportunity_id}")
def delete_opportunity(opportunity_id: int):
    return {"message": f"Delete opportunity {opportunity_id}"}