import json
import os


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

### dev
# if True:
if DEBUG := os.getenv('DEBUG'):
    import arel
    hot_reload = arel.HotReload(paths=[arel.Path(".")])
    router.add_websocket_route(path="/hot-reload", endpoint=hot_reload, name="hot-reload")
    router.add_event_handler("startup", hot_reload.startup)
    router.add_event_handler("shutdown", hot_reload.shutdown)
    templates.env.globals["DEBUG"] = True 
    templates.env.globals["hot_reload"] = hot_reload
