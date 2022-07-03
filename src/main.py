'''Main app for Spotify DW saver web server'''
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from backend.metadata import tags_metadata

from backend.app.api_routes import router as api_routes
from backend.app.front_routes import router as front_routes

templates = Jinja2Templates(directory="src/frontend/templates")

routes = [
    Mount('/frontend/static', app=StaticFiles(directory='src/frontend/static',), name='static'),
]

app = FastAPI(
    openapi_tags=tags_metadata,
    routes=routes,
)

app.include_router(
    router=front_routes,
    tags=["Frontend"],
)
app.include_router(
    router=api_routes,
    prefix="/api",
    tags=["API"],
)

if __name__ == '__main__':
    import uvicorn
    from configs.uvicorn import uvicorn_conf
    uvicorn.run(
        **uvicorn_conf
    )