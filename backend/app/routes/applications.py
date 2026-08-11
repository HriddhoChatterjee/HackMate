
from fastapi import APIRouter

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)

@router.get("/")
def get_all_applications():
    return {"message": "Get all applications"}

@router.get("/{application_id}")
def get_application(application_id: int):
    return {"message": f"Get application {application_id}"}

@router.post("/")
def create_application():
    return {"message": "Create application"}

@router.put("/{application_id}")
def update_application(application_id: int):
    return {"message": f"Update application {application_id}"}

@router.delete("/{application_id}")
def delete_application(application_id: int):
    return {"message": f"Delete application {application_id}"}