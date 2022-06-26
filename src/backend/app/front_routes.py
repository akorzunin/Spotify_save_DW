import json


from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse
from fastapi import Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="src/frontend/templates")

router = APIRouter()

@router.get("/front_route", )
def front_route():
    return '321'

@router.get("/", response_class=HTMLResponse)
async def root(request: Request):
    with open('usr_data.json', 'r') as f:
        usr_data = json.load(f)
    return templates.TemplateResponse("home.html", {"request": request, 'usr_data': usr_data})
