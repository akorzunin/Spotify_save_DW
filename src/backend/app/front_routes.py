from collections import OrderedDict
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
REDIRECT_URI = 'http://127.0.0.1:8000/get_token'
templates = Jinja2Templates(directory="src/frontend/templates")

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def root(request: Request):
    with open('usr_data.json', 'r') as f:
        user_data = json.load(f)
    print(user_data)
    return templates.TemplateResponse(
        "home.html", 
        {
            "request": request, 
            'user_data': [*(user_data.keys())],
            **dict(user_data)
        }
    )

@router.get("/user/{user_id}", response_class=HTMLResponse)
async def user_page(request: Request, user_id: str):
    # with open('usr_data.json', 'r') as f:
    #     usr_data = json.load(f)
    # print(user_data)
    return templates.TemplateResponse(
        "user.html", 
        {
            "request": request, 
            'user_id': user_id,
        }
    )

@router.get("/login", response_class=HTMLResponse)
async def login_url():
    # print(region)
    # scope = 'user-read-private user-read-email'
    r = requests.Request('GET', 'https://accounts.spotify.com/en/authorize?' +\
        urlencode(
            OrderedDict(
                response_type='code',
                client_id=os.getenv('SPOTIPY_CLIENT_ID'),
                scope=scope_str,
                redirect_uri=REDIRECT_URI,
                # state='HMBibZ2hl8VIH7AI',
                show_dialog='true',
            )
        )
    )
    # return ''.join(r.text.split('\n'))
    return RedirectResponse(r.prepare().url)

@router.get("/{region}/login", )
async def login_redirect(region: str, ):    
    return RedirectResponse('/login')

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
    temp_json = dict(r)

    ### dev
    with open('usr_data.json', 'w+') as f:
        json.dump(temp_json, f)
    ### dev
    sp = spotipy.Spotify(
        auth=temp_json['access_token'],
    )
    res = RedirectResponse(f"/user/{sp.current_user()['id']}")
    for k, v in temp_json.items():
        res.set_cookie(k, v)

    return res

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
