import asyncio
import time
from typing import Optional
from backend.app.task_handler import SavePlUser
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


async def filter_dw_songs(
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


async def save_playlist_to_user(
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


async def save_playlist_algorithm(
    sp,
    user: SavePlUser,
) -> Optional[list[Song]]:
    if user.filter_dislikes:
        # get devices
        devices = sp.devices()["devices"]
        device = get_device_id(
            # TODO use user.preferred_device to pick one
            devices,
        ) 
        if not device: raise TypeError("No device found")
        # use playback alg
        songs = await filter_dw_songs(sp, device)
        if len(songs) <= 30:
            if user.save_full_playlist:
                # save songs anyway
                return songs
            # don save songs, send mail probably
            return None
        # save songs
        return songs
    if user.save_full_playlist:
        # dot use playback alg
        songs = all_dw_songs(sp, user.dw_playlist_id)
        return songs


def get_device_id(
    devices: list[dict],
    preferred: DeviceId = None,
) -> Optional[DeviceId]:
    '''Return preferred device if it exists else first existing device or None'''
    if not preferred and devices:
        return DeviceId(devices[0]['id'])
    if preferred in [i['id'] for i in devices]:
        return preferred
    return None