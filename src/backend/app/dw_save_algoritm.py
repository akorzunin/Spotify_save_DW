import asyncio
import time
from backend.app.types import DeviceId, Song


def all_dw_songs(
    sp,
    dw_id: str,
) -> list[Song]:
    dw_items = sp.playlist_items(dw_id)
    return [
        dict(
            name=i["track"]["name"],
            uri=i["track"]["uri"],
            id=i["track"]["id"],
        )
        for i in dw_items["items"]
    ]


async def filtered_dw_songs(
    sp,
    device: DeviceId,
    dw_id: str,
) -> list[Song]:
    # play dw playlist
    sp.start_playback(device, context_uri=dw_id)
    # skip 30 songs
    songs = []
    for i in range(30):
        sp.start_playback(device, context_uri=dw_id, offset={"position": i})
        await asyncio.sleep(1)
        song = sp.current_playback()
        # print(song)song
        if song["is_playing"]:
            songs.append(
                dict(
                    id=song["item"]["id"],
                    uri=song["item"]["uri"],
                    name=song["item"]["name"],
                )
            )
    sp.pause_playback(device)
    return songs


async def save_playlist(
    sp,
    songs: list[Song],
    user_id: str,
) -> None:
    # save new playlist
    new_pl = sp.user_playlist_create(
        user=user_id,
        name=get_pl_name(user_id),
        public=True,
        description=get_pl_description(user_id),
    )
    await asyncio.sleep(0.5)
    # add songs from data to it
    sp.user_playlist_add_tracks(
        user=user_id,
        playlist_id=new_pl["id"],
        tracks=[i["id"] for i in songs],
        position=None,
    )


def get_pl_name(user_id):
    """Generate user defined playlist name or default"""
    return "Base pl name"


def get_pl_description(user_id):
    """Generate user defined description or default"""
    return "Base pl description"
