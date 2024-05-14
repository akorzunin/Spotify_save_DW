import os
from collections import OrderedDict
from datetime import datetime
from random import randint
from typing import Literal
from urllib.parse import urlencode

import requests
import spotipy
import structlog  # type: ignore
from configs.scope import scope_str
from fastapi import APIRouter, Request, status
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates

### pydantic
from pydantic import BaseModel

logger = structlog.stdlib.get_logger(__name__)


class UserData(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    scope: str


###
REDIRECT_URI = os.getenv("SPOTIPY_REDIRECT_URL")
templates = Jinja2Templates(directory="src/frontend/templates")

router = APIRouter(tags=["Frontend"])


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


def new_state() -> str:
    """Generate state for auth code flow"""
    return "".join(chr(randint(33, 126)) for i in range(16))


@router.get(
    "/login",
    response_class=HTMLResponse,
    status_code=status.HTTP_300_MULTIPLE_CHOICES,
)
async def login_url(
    req: Request,
    state: str = new_state(),
    show_dialog: Literal["true", "false"] = "false",
):
    """Redirect to Spotify login page"""
    redirect_domain = req.headers.get("Referer")
    redirect_uri = (
        f"{redirect_domain.removesuffix('/')}/get_token"
        if redirect_domain
        else REDIRECT_URI
    )
    logger.info(f"Redirecting to login page from {redirect_uri}")
    r = requests.Request(
        "GET",
        "https://accounts.spotify.com/en/authorize?"
        + urlencode(
            dict(
                response_type="code",
                client_id=os.getenv("SPOTIPY_CLIENT_ID"),
                scope=scope_str,
                redirect_uri=redirect_uri,
                state=state,
                show_dialog=show_dialog,
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
async def get_token(code: str, redirect: bool = True):
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

    token_data = dict(r) | {"get_time": str(datetime.now())}
    sp = spotipy.Spotify(auth=token_data["access_token"])
    user_id = sp.current_user()["id"]
    if not redirect:
        # NOTE request w/o redirect only user for vite dev server
        token_data |= {"user_id": user_id}
        return token_data
    res = RedirectResponse(f"/app/user/{user_id}")
    for k, v in token_data.items():
        res.set_cookie(k, v)
    return token_data


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
