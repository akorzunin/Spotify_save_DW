from datetime import datetime, date
import json
import os
import requests
import base64
import time
from fastapi import APIRouter
import spotipy
from pydantic import BaseModel

class RefreshToken(BaseModel):
    refresh_token: str

from backend.app.utils import encode_b64

router = APIRouter()
    
@router.get("/api_route", )
def api_route():
    return 'dev_check'

@router.post("/refresh_token", )
def refresh_token(refresh_token: RefreshToken):

    client_creds_b64 = encode_b64(
        os.getenv('SPOTIPY_CLIENT_ID'),
        os.getenv('SPOTIPY_CLIENT_SECRET')
    )
    r = requests.post(
        url='https://accounts.spotify.com/api/token', 
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token.refresh_token,
        }, 
        headers={
            'Authorization': f'Basic {client_creds_b64}',
            'Content-Type': 'application/x-www-form-urlencoded', 
        }
    ).json()
    
    return dict(r)

# @router.get("/collect_dw_fast", )
# def collect_dw_fast():

#     token = usr_data['access_token']
#     sp = spotipy.Spotify(
#         auth=token,
#     )
#     # get full playlist from spotipy
#     pb = sp.current_playback()
#     pl_full = pb['context']['uri']
#     pi = sp.playlist_items(playlist_id=pl_full)
    
#     pl_ids = [i['track']['uri'] for i in pi['items']]
#     pl_set = set(pl_ids)
#     #while loop delay 1 sec 
#     # check if song id  in playlist ass it to set
#     pl_target_set = set()
#     for _ in range(100):
#         track_id = sp.current_playback()['item']['uri']
#         if track_id in pl_set and track_id not in pl_target_set:
#             print(track_id)
#             pl_target_set.add(track_id)
#         time.sleep(0.5)
#     # get time
#     d = datetime.now()
#     week = date(d.year, d.month, d.day).strftime("%V")
#     time_full = f'{d.day}-{d.month}-{d.year} {d.hour}:{d.minute:02}:{d.second:02}'
#     #save playlist w/ spotipy api
#     new_pl = sp.user_playlist_create(
#         user=sp.current_user()['id'],
#         name=f'{d.year}_{week}',
#         public=True,
#         description=f'Creation date: {time_full}. This playlist was created by a web service. Link to github repo /akorzunin/Spotify_save_DW',
#     )
#     sp.user_playlist_add_tracks(
#         user=sp.current_user()['id'], 
#         playlist_id=new_pl['uri'], 
#         tracks=pl_target_set, 
#         position=None
#     )
#     return pl_target_set
