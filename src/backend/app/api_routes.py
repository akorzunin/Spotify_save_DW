import asyncio

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasicCredentials

from backend.app import crud, shemas
from backend.app.auth import check_credentials, security
from backend.app.db_connector import users
from backend.app.mail_handle import render_notification_text, send_email
from backend.app.task_handler import (
    manage_user_tasks,
    send_notification,
)
from backend.app.utils import get_access_token

router = APIRouter()


@router.post(
    "/refresh_token",
    response_model=shemas.SpotifyToken,
    status_code=status.HTTP_202_ACCEPTED,
)
async def refresh_token(
    refresh_token: shemas.RefreshToken,
):
    return dict(get_access_token(refresh_token.refresh_token))


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


@router.post("/test_save_email")
async def test_save_email(user_email: shemas.UserEmail):
    """Test save email"""
    user = crud.get_user_by_email(users, user_email.email)
    # task = user_notify_task(user)
    send_notification(
        user_email.email,
        text=render_notification_text(
            user.dw_playlist_id,
            user.user_id,
        ),
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
async def get_users(
    credentials: HTTPBasicCredentials = Depends(security),
):
    """Get all users from database"""
    check_credentials(credentials)
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
    response_model=shemas.User,
    responses={status.HTTP_400_BAD_REQUEST: {"model": shemas.Message}},
)
async def create_user(user: shemas.CreateUser):
    """Create new user"""
    if created_user := crud.create_user(users, user):
        return created_user
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
async def update_user(user: shemas.UpdateUser, user_id: str):
    """Update user"""
    if updated_user := crud.update_user(users, user, user_id):
        if message := manage_user_tasks(updated_user):
            #  return different response if sth wrong w/ task management
            return JSONResponse(
                status_code=status.HTTP_412_PRECONDITION_FAILED,
                content=message,
            )
        return updated_user
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
async def delete_user(
    user_id: str,
    credentials: HTTPBasicCredentials = Depends(security),
):
    """Delete user by id"""
    check_credentials(credentials)
    if _ := crud.delete_user(users, user_id):
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "User deleted"},
        )
    return JSONResponse(
        status_code=status.HTTP_202_ACCEPTED,
        content={"message": "User does not exists"},
    )
