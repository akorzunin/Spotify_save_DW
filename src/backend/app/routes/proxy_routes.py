from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from httpx import AsyncClient
from starlette.background import BackgroundTask

spotify_client = AsyncClient(base_url=f"https://api.spotify.com/")
router = APIRouter()


@router.api_route("/api/spotify/{path:path}", methods=["GET", "POST"])
async def spotify_request(path: str, request: Request):
    req = spotify_client.build_request(request.method, path)
    r = await spotify_client.send(req, stream=True)
    return StreamingResponse(
        r.aiter_raw(),
        background=BackgroundTask(r.aclose),
        headers=r.headers,
    )
