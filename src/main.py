import requests

from starlette.applications import Starlette
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from urllib.parse import urlencode # python3
from collections import OrderedDict
import os
import json
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from configs.scope import scope_dict
# from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.metadata import tags_metadata

from backend.app.api_routes import router as api_routes
from backend.app.front_routes import router as front_routes

# app = FastAPI()

scope_str = ' '.join([k for k, v in scope_dict.items() if v])
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(
    
))
temp_json = {}

# app = Starlette(routes=routes)
templates = Jinja2Templates(directory="src/frontend/templates")

routes = [
            Mount('/frontend/static', app=StaticFiles(directory='src/frontend/static',), name='static'),
]

app = FastAPI(
    openapi_tags=tags_metadata,
    routes=routes,
)


# app.mount("/frontend/static", StaticFiles(directory="src/frontend/static"), name="static")
app.include_router(
    router=front_routes,
    tags=["frontend"],
)
app.include_router(
    router=api_routes,
    prefix="/api",
    tags=["API"],
)




# move to frontend
@app.get("/login", response_class=HTMLResponse)
async def login_url():
    # print(region)
    # scope = 'user-read-private user-read-email'
    r = requests.Request('GET', 'https://accounts.spotify.com/en/authorize?' +\
        urlencode(
            OrderedDict(
                response_type='code',
                client_id=os.getenv('SPOTIPY_CLIENT_ID'),
                scope=scope_str,
                redirect_uri='http://127.0.0.1:8000/get_token',
                # state='HMBibZ2hl8VIH7AI',
                show_dialog='true',
            )
        )
    )
    # return ''.join(r.text.split('\n'))
    print(r.prepare().url)
    return RedirectResponse(r.prepare().url)

@app.get("/{region}/login", )
async def login_redirect(region: str, ):    
    return RedirectResponse('/login')

@app.get("/get_token", )
async def get_tocken(code: str, ):   
    r = requests.post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://127.0.0.1:8000/get_token',
        'client_id': os.getenv('SPOTIPY_CLIENT_ID'),
        'client_secret': os.getenv('SPOTIPY_CLIENT_SECRET')
    }).json()
    temp_json = dict(r)
    with open('usr_data.json', 'w+') as f:
        json.dump(temp_json, f)
    # return r
    return RedirectResponse("/api/collect_dw_fast")

### dev
import arel
if DEBUG := os.getenv('DEBUG'):
    hot_reload = arel.HotReload(paths=[arel.Path(".")])
    app.add_websocket_route("/hot-reload", route=hot_reload, name="hot-reload")
    app.add_event_handler("startup", hot_reload.startup)
    app.add_event_handler("shutdown", hot_reload.shutdown)
    templates.env.globals["DEBUG"] = DEBUG 
    templates.env.globals["hot_reload"] = hot_reload



### del later


@app.get("/debug", response_class=HTMLResponse)
async def debug():
    breakpoint()
    return '1'

@app.post("/login/password", response_class=HTMLResponse)
async def pepe():
    # print(data)
    return """
    <html>
        <head>
            <title>Some HTML in here</title>
        </head>
        <body>
            <h1>Look ma! HTML!</h1>
        </body>
    </html>
    """

@app.get("/test", response_class=HTMLResponse)
async def pog():
    # print(data)
    return """
    <html>
        <head>
            <title>Some HTML in here</title>
        </head>
        <body>
            <h1>RedirectUri! HTML!</h1>
        </body>
    </html>
    """

if __name__ == '__main__':
    import uvicorn
    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
    uvicorn.run(
        'main:app',
        host='0.0.0.0',
        port=8000,
        log_level='debug',
        log_config=log_config,
        # loop='asyncio'
        reload=True,
        # debug=True,
        # backlog=1,
    )