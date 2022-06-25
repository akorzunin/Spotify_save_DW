from fastapi import APIRouter

router = APIRouter()

@router.get("/api_route/", )
def api_route():
    return '123'
