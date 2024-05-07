from fastapi import APIRouter, Request, Response
from fastapi.responses import StreamingResponse
from httpx import AsyncClient
from starlette.background import BackgroundTask

spotify_client = AsyncClient(base_url=f"https://api.spotify.com")

router = APIRouter(tags=["proxy API"])


@router.api_route("/api/spotify/{path:path}", methods=["GET", "POST"])
async def spotify_request(path: str, request: Request, response: Response):
    req = spotify_client.build_request(
        request.method,
        path,
        headers=request.headers,
    )
    res = await spotify_client.send(req)

    response.body = res.content
    response.status_code = res.status_code

    return response
