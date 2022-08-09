import asyncio
import os
import requests
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.app.mail_handle import send_email
from backend.app.utils import encode_b64
from backend.app import crud, shemas
from backend.app.db_connector import users

router = APIRouter()


@router.post(
    "/refresh_token",
)
async def refresh_token(refresh_token: shemas.RefreshToken):

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
async def send_mail(user_email: shemas.UserEmail):
    """Send mail to user"""
    asyncio.gather(
        send_email(
            email=user_email.email,
            subject=user_email.subject,
            mail_text=user_email.text,
        )
    )
    return JSONResponse(
        status_code=200, content={"message": "email has been sent"}
    )


### Db routes
@router.get(
    "/users",
)
async def get_users():
    """Get all users by ..."""
    return crud.get_all_users(users)
    


@router.get(
    "/user",
)
async def get_user(user_id: str):
    """Get user by user_id"""
    return crud.get_user(users, user_id)


@router.post(
    "/new_user",
)
async def create_user(user: shemas.CreateUser) -> shemas.User:
    """Create new user"""
    if user := crud.create_user(users, user):
        return user
    return JSONResponse(
        status_code=400, content={"message": "User already exists"}
    )


@router.put(
    "/update_user",
)
async def update_user(user: shemas.UpdateUser):
    """Update user"""
    return crud.update_user(users, user)



@router.delete(
    "/delete_user",
)
async def delete_user(user_id: str):
    """Delete user by ..."""
    crud.delete_user(users, user_id)

    return JSONResponse(
        status_code=200, content={"message": "User deleted"}
    )
