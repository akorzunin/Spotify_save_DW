'''Main app for Spotify DW saver web server'''
import asyncio
import logging
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from backend.app.task_handler import revive_user_tasks, task_tick
from backend.metadata import tags_metadata

from backend.app.api_routes import router as api_routes
from backend.app.front_routes import router as front_routes
from backend.app.logger import format as log_format

templates = Jinja2Templates(directory="src/frontend/templates")

routes = [
    Mount('/frontend/static', app=StaticFiles(directory='src/frontend/static',), name='static'),
]
app = FastAPI(
    openapi_tags=tags_metadata,
    routes=routes,
)

@app.on_event("startup")
async def startup_event():
    logger = logging.getLogger("uvicorn.access")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(log_format))
    # add logs to stdout
    logger.removeHandler(logger.handlers[0])
    logger.addHandler(handler)
    # collect pending tasks from db
    revive_user_tasks()
    # add task handler to event loop
    loop = asyncio.get_event_loop()
    loop.create_task(
        coro=task_tick(),
        name="task_tick",
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

    loop = asyncio.get_event_loop()
    config = uvicorn.Config(**uvicorn_conf, loop=loop)
    server = uvicorn.Server(config)
    loop.create_task(server.serve())

    loop.run_forever()