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

