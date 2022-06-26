import json
import time
from fastapi import APIRouter
import spotipy
router = APIRouter()

@router.get("/api_route", )
def api_route():
    return 'dev_check'

@router.get("/collect_dw_fast", )
def collect_dw_fast():
    with open('usr_data.json', 'r') as f:
        usr_data = json.load(f)

    token = usr_data['access_token']
    sp = spotipy.Spotify(
        auth=token,
    )
    # get full playlist from spotipy
    pb = sp.current_playback()
    pl_full = pb['context']['uri']
    pi = sp.playlist_items(playlist_id=pl_full)
    
    pl_ids = [i['track']['uri'] for i in pi['items']]
    pl_set = set(pl_ids)
    #while loop delay 1 sec 
    # check if song id  in playlist ass it to set
    pl_target_set = set()
    for _ in range(100):
        track_id = sp.current_playback()['item']['uri']
        if track_id in pl_set and track_id not in pl_target_set:
            print(track_id)
            pl_target_set.add(track_id)
        time.sleep(0.5)
    
    #set to list
    #save playlist w/ spotipy api
    new_pl = sp.user_playlist_create(
        user=sp.current_user()['id'], # TODO no hardcode
        name='test_mate',
        public=True,
        description='pepe',
    )
    sp.user_playlist_add_tracks(
        user=sp.current_user()['id'], 
        playlist_id=new_pl['uri'], 
        tracks=pl_target_set, 
        position=None
    )
    return pl_target_set
