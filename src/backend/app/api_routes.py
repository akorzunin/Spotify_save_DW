import asyncio
import os
import requests
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from backend.app.mail_handle import send_email
from backend.app.task_handler import manage_user_tasks
from backend.app.utils import encode_b64, get_access_token
from backend.app import crud, shemas
from backend.app.db_connector import users

router = APIRouter()


@router.post(
    "/refresh_token",
    response_model=shemas.SpotifyToken,
    status_code=status.HTTP_202_ACCEPTED,
)
async def refresh_token(
    refresh_token: shemas.RefreshToken,
):
    return dict(get_access_token(refresh_token))


### Mail routes
@router.post(
    "/send_mail",
    status_code=status.HTTP_200_OK,
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
        status_code=status.HTTP_200_OK,
        content={"message": "email has been sent"},
    )


### Db routes
@router.get(
    "/users",
    response_model=list[shemas.User],
)
async def get_users():
    """Get all users from database"""
    return crud.get_all_users(users)


@router.get(
    "/user",
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": shemas.Message}},
)
async def get_user(user_id: str):
    """Get user by user_id"""
    if user := crud.get_user(users, user_id):
        return user
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "User not found"},
    )


@router.post(
    "/new_user",
    responses={status.HTTP_400_BAD_REQUEST: {"model": shemas.Message}},
)
async def create_user(user: shemas.CreateUser) -> shemas.User:
    """Create new user"""
    if user := crud.create_user(users, user):
        return user
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": "User already exists"},
    )


@router.put(
    "/update_user",
    response_model=shemas.User,
    responses={
        status.HTTP_404_NOT_FOUND: {"model": shemas.Message},
        status.HTTP_412_PRECONDITION_FAILED: {"model": shemas.Message},
    },
)
async def update_user(user: shemas.UpdateUser, user_id: str) -> shemas.User:
    """Update user"""
    if user := crud.update_user(users, user, user_id):
        if message := manage_user_tasks(user):
            #  return different response if sth wrong w/ task management
            return JSONResponse(
                status_code=status.HTTP_412_PRECONDITION_FAILED,
                content=message,
            )
        return user
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "User not found"},
    )


@router.delete(
    "/delete_user",
    responses={
        status.HTTP_200_OK: {"model": shemas.Message},
        status.HTTP_202_ACCEPTED: {"model": shemas.Message},
    },
)
async def delete_user(user_id: str):
    """Delete user by id"""
    if user := crud.delete_user(users, user_id):
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "User deleted"},
        )
    return JSONResponse(
        status_code=status.HTTP_202_ACCEPTED,
        content={"message": "User does not exists"},
    )
