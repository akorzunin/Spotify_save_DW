from datetime import datetime, date
import json
import os
import requests
import base64
import time
from fastapi import APIRouter
import spotipy
from pydantic import BaseModel, EmailStr


class RefreshToken(BaseModel):
    refresh_token: str


class UserEmail(BaseModel):
    email: EmailStr


from backend.app.utils import encode_b64

router = APIRouter()


@router.post(
    "/refresh_token",
)
async def refresh_token(refresh_token: RefreshToken):

    client_creds_b64 = encode_b64(
        os.getenv("SPOTIPY_CLIENT_ID"), os.getenv("SPOTIPY_CLIENT_SECRET")
    )
    r = requests.post(
        url="https://accounts.spotify.com/api/token",
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token.refresh_token,
        },
        headers={
            "Authorization": f"Basic {client_creds_b64}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    ).json()

    return dict(r)


### Mail routes
@router.post(
    "/send_mail",
)
async def send_mail(email: UserEmail):
    '''Send mail to user'''
    ...


### Db routes
@router.get(
    "/users",
)
async def get_users():
    '''Get all users by ...'''
    ...

@router.get(
    "/user",
)
async def get_user():
    '''Get user by ...'''
    ...

@router.post(
    "/new_user",
)
async def create_user():
    '''Create new user'''
    ...

@router.put(
    "/update_user",
)
async def update_user():
    '''Update user'''
    ...

@router.delete(
    "/delete_user",
)
async def delete_user():
    '''Delete user by ...'''
    ...
    