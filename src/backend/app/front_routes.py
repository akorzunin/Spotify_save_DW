from fastapi import APIRouter

router = APIRouter()

@router.get("/front_route/", )
def front_route():
    return '321'
