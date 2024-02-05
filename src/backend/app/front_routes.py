import os
from collections import OrderedDict
from datetime import datetime
from urllib.parse import urlencode

import requests
import spotipy
from configs.scope import scope_str
from fastapi import APIRouter, Request, status
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates

### pydantic
from pydantic import BaseModel


class UserData(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    scope: str


###
REDIRECT_URI = os.getenv(
    "SPOTIPY_REDIRECT_URL",
)
templates = Jinja2Templates(directory="src/frontend/templates")

router = APIRouter()


@router.get(
    "/",
    response_class=HTMLResponse,
)
async def root():
    """Redirect to react hash router main page"""
    return FileResponse("./src/frontend/dist/index.html")


@router.get(
    "/user/{user_id}",
    response_class=HTMLResponse,
    status_code=status.HTTP_300_MULTIPLE_CHOICES,
)
async def user_page(request: Request, user_id: str):
    """Redirect to react hash router user page"""
    return RedirectResponse(f"/#/user/{user_id}")


@router.get(
    "/login",
    response_class=HTMLResponse,
    status_code=status.HTTP_300_MULTIPLE_CHOICES,
)
async def login_url():
    """Redirect to Spotify login page"""
    # scope = 'user-read-private user-read-email'
    r = requests.Request(
        "GET",
        "https://accounts.spotify.com/en/authorize?"
        + urlencode(
            OrderedDict(
                response_type="code",
                client_id=os.getenv("SPOTIPY_CLIENT_ID"),
                scope=scope_str,
                redirect_uri=REDIRECT_URI,
                # state='HMBibZ2hl8VIH7AI',
                # show_dialog='true',
            )
        ),
    )
    return RedirectResponse(r.prepare().url)


@router.get(
    "/{region}/login",
    status_code=status.HTTP_300_MULTIPLE_CHOICES,
)
async def login_redirect(
    region: str,
):
    return RedirectResponse("/login")


@router.get(
    "/get_token",
    status_code=status.HTTP_300_MULTIPLE_CHOICES,
)
async def get_token(code: str) -> RedirectResponse:
    r = requests.post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "client_id": os.getenv("SPOTIPY_CLIENT_ID"),
            "client_secret": os.getenv("SPOTIPY_CLIENT_SECRET"),
        },
    ).json()

    temp_json = dict(r) | {"get_time": str(datetime.now())}
    sp = spotipy.Spotify(auth=temp_json["access_token"])
    res = RedirectResponse(f"/#/user/{sp.current_user()['id']}")
    for k, v in temp_json.items():
        res.set_cookie(k, v)
    return res


### dev

if DEBUG := bool(eval(os.getenv("DEBUG", "False"))):
    import contextlib

    with contextlib.suppress(ModuleNotFoundError):
        import arel

        hot_reload = arel.HotReload(paths=[arel.Path(".")])
        router.add_websocket_route(
            path="/hot-reload", endpoint=hot_reload, name="hot-reload"
        )
        router.add_event_handler("startup", hot_reload.startup)
        router.add_event_handler("shutdown", hot_reload.shutdown)
        templates.env.globals["DEBUG"] = True
        templates.env.globals["hot_reload"] = hot_reload
