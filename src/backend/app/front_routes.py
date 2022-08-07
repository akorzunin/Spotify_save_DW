from collections import OrderedDict
from datetime import datetime
import json
import os
from urllib.parse import urlencode
import spotipy

from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse
from fastapi import Request
from fastapi.templating import Jinja2Templates
import requests

from configs.scope import scope_str
### pydantic
from pydantic import BaseModel
class UserData(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    scope: str
###
REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URL', )
templates = Jinja2Templates(directory="src/frontend/templates")

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "home.html", 
        {
            "request": request, 
        }
    )
@router.get("/user/{user_id}", response_class=HTMLResponse)
async def user_page(request: Request, user_id: str):
    return RedirectResponse(f"/#/user/{user_id}")

@router.get("/login", response_class=HTMLResponse)
async def login_url():
    # scope = 'user-read-private user-read-email'
    r = requests.Request('GET', 'https://accounts.spotify.com/en/authorize?' +\
        urlencode(
            OrderedDict(
                response_type='code',
                client_id=os.getenv('SPOTIPY_CLIENT_ID'),
                scope=scope_str,
                redirect_uri=REDIRECT_URI,
                # state='HMBibZ2hl8VIH7AI',
                # show_dialog='true',
            )
        )
    )
    return RedirectResponse(r.prepare().url)

@router.get("/{region}/login", )
async def login_redirect(region: str, ):    
    return RedirectResponse('/login')

# move to api
@router.get("/get_token", )
async def get_tocken(code: str, ) -> RedirectResponse:   
    # wrap to a function
    r = requests.post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': os.getenv('SPOTIPY_CLIENT_ID'),
        'client_secret': os.getenv('SPOTIPY_CLIENT_SECRET'),
    }).json()
    temp_json = dict(r) | dict(get_time=str(datetime.now()))

    sp = spotipy.Spotify(
        auth=temp_json['access_token'],
    )
    res = RedirectResponse(f"/#/user/{sp.current_user()['id']}")
    for k, v in temp_json.items():
        res.set_cookie(k, v)

    return res

### dev
import contextlib
if DEBUG := os.getenv('DEBUG'):
    with contextlib.suppress(ModuleNotFoundError):
        import arel
        hot_reload = arel.HotReload(paths=[arel.Path(".")])
        router.add_websocket_route(path="/hot-reload", endpoint=hot_reload, name="hot-reload")
        router.add_event_handler("startup", hot_reload.startup)
        router.add_event_handler("shutdown", hot_reload.shutdown)
        templates.env.globals["DEBUG"] = True
        templates.env.globals["hot_reload"] = hot_reload
