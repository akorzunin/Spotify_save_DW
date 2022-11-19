"""Main app for Spotify DW saver web server"""
import os
import asyncio
import logging
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from backend.app.task_handler import revive_user_tasks, task_tick
from backend.metadata import tags_metadata
from backend.app.api_routes import router as api_routes
from backend.app.front_routes import router as front_routes
from backend.app.logger import format as log_format

templates = Jinja2Templates(directory="src/frontend/templates")

routes = [
    Mount(
        "/frontend/static",
        app=StaticFiles(
            directory="src/frontend/static",
        ),
        name="static",
    ),
]
app = FastAPI(
    openapi_tags=tags_metadata,
    routes=routes,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

if DEBUG := bool(eval(os.getenv("DEBUG", "False"))):

    @app.get("/docs")
    async def get_documentation():
        return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

    @app.get("/openapi.json")
    async def get_open_api_endpoint():
        return JSONResponse(
            get_openapi(title="FastAPI", version=1, routes=app.routes)
        )


@app.on_event("startup")
async def startup_event():
    logger = logging.getLogger("uvicorn.access")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(log_format))
    # add logs to stdout
    logger.removeHandler(logger.handlers[0])
    logger.addHandler(handler)


app.include_router(
    router=front_routes,
    tags=["Frontend"],
)
app.include_router(
    router=api_routes,
    prefix="/api",
    tags=["API"],
)

if __name__ == "__main__":
    import uvicorn
    from configs.uvicorn import uvicorn_conf

    loop = asyncio.get_event_loop()
    config = uvicorn.Config(**uvicorn_conf, loop=loop)
    server = uvicorn.Server(config)
    loop.create_task(server.serve())

    # Launch tasks
    scheduler = AsyncIOScheduler(event_loop=loop)
    scheduler.add_job(
        task_tick,
        trigger="interval",
        seconds=3600,
        name="task_tick",
    )
    revive_user_tasks()
    scheduler.start()

    loop.run_forever()
