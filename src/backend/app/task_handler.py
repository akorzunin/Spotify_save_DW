import asyncio
import spotipy
from copy import deepcopy, copy
from datetime import datetime, timedelta, timezone
import logging
from typing import Literal, Optional
from zoneinfo import ZoneInfo
import schedule
from pydantic import EmailStr, BaseModel
from tinydb import Query, where
from backend.app import shemas

from backend.app.db_connector import users
from backend.app.dw_save_algoritm import get_device_id, save_playlist_algorithm
from backend.app.logger import logger
from backend.app.mail_handle import (
    render_notification_text,
    render_save_pl_text,
    send_email,
)
from backend.app.utils import get_access_token


async def task_tick():
    while 1:
        schedule.run_pending()
        await asyncio.sleep(1)


class NotifyUser(BaseModel):
    user_id: str
    email: EmailStr
    send_time: datetime
    dw_playlist_id: str


class SavePlUser(BaseModel):
    user_id: str
    email: EmailStr
    save_time: datetime
    send_mail: bool
    dw_playlist_id: str
    refresh_token: str
    filter_dislikes: bool
    save_full_playlist: bool


def parse_task_time(send_time: datetime) -> tuple[int, str]:
    # Convert given time to local
    server_send_time = send_time.astimezone(None)
    return (
        send_time.weekday(),
        f"{server_send_time.hour:0>2.0f}:{server_send_time.minute:0>2.0f}",
    )


def user_save_task(user: SavePlUser):
    weekday, shedule_time = parse_task_time(user.save_time)
    return (
        get_weekday_task(weekday)
        .at(shedule_time)
        .do(
            save_dw,
            user=user,
        )
        .tag(get_tag(user.user_id, "save"))
    )


def revive_user_tasks():
    # create debug notify task
    debug_user = users.get(where("user_id") == "sltyljtam3wzcb28yeowsxcn4")
    debug_user["save_time"] = str(
        datetime.now().astimezone() + timedelta(minutes=1)
    )
    task = user_save_task(SavePlUser(**debug_user))
    logger.info(
        f"[DEBUG Task created] Next run: {str(task.next_run)} "
        f"User: {debug_user['user_id']}"
    )
    ###
    notify_users = users.search(where("send_mail") == True)
    for user in notify_users:
        task = user_notify_task(NotifyUser(**user))
        logger.info(
            f"[Notify Task created] Next run: {str(task.next_run)} "
            f"User: {user['user_id']}"
        )
    save_dw_users = users.search(where("save_dw_weekly") == True)
    for user in save_dw_users:
        task = user_save_task(SavePlUser(**user))
        logger.info(
            f"[Save Task created] Next run: {str(task.next_run)} "
            f"User: {user['user_id']}"
        )


def manage_user_tasks(user: shemas.User) -> Optional[shemas.Message]:
    """Create or cancel tasks for a user on given data"""
    if not validate_user_task_data(user):
        return {"message": "Failed to create tasks for user"}
    if not user.send_mail:
        # delete user notification task
        schedule.clear(get_tag(user.user_id, "notify"))
    if not user.save_dw_weekly:
        # delete user save task
        schedule.clear(get_tag(user.user_id, "save"))

    if user.send_mail and schedule.get_jobs(
        get_tag(user.user_id, "notify"),
    ):
        # create notify task if task is not exists
        task = user_notify_task(user)
        logger.info(
            f"[New Notify Task] Next run: {str(task.next_run)} "
            f"User: {user.user_id}"
        )
    if user.save_dw_weekly and schedule.get_jobs(
        get_tag(user.user_id, "save"),
    ):
        # create user save task if task is not exists
        task = user_save_task(user)
        logger.info(
            f"[New Save Task] Next run: {str(task.next_run)} "
            f"User: {user.user_id}"
        )


def get_tag(user_id: str, task_type: Literal["save", "notify"]):
    """Generate unique tag for each task"""
    return f"{user_id}_{task_type}"


def validate_user_task_data(user: shemas.User) -> bool:
    if not user.is_premium and user.filter_dislikes:
        # cant use playback alg on non premium users
        return False
    if not user.save_dw_weekly:
        #  Dont need to save any
        return True
    if not user.filter_dislikes and user.save_full_playlist:
        # don't use playback alg and save all 30 songs from pl anyway
        return True
    if user.filter_dislikes:
        if not user.save_full_playlist:
            # use playback alg but if it returns all 30 songs don't save
            return True
        if user.save_full_playlist:
            # use playback alg but if it returns all 30 songs save pl anyway
            return True
    # invalid state
    return False


def get_weekday_task(weekday: int):
    weekday_task = (
        schedule.every().monday,
        schedule.every().tuesday,
        schedule.every().wednesday,
        schedule.every().thursday,
        schedule.every().friday,
        schedule.every().saturday,
        schedule.every().sunday,
    )
    return copy(weekday_task[weekday])


def user_notify_task(user: NotifyUser) -> schedule.Job:
    weekday, shedule_time = parse_task_time(user.send_time)
    return (
        get_weekday_task(weekday)
        .at(shedule_time)
        .do(
            send_notification,
            email=user.email,
            text=render_notification_text(
                user.dw_playlist_id,
                user.user_id,
            ),
        )
        .tag(get_tag(user.user_id, "notify"))
    )


### ACTUAL TASKS ###


def send_notification(email: str, text: str):
    subject = "Save Discover Weekly Playlist"
    logger.info(
        f"Sending notification to {email} at {datetime.now(timezone.utc)}"
    )
    asyncio.gather(send_email(email, subject, text))


def save_dw(user: SavePlUser):
    #  get sp somehow
    user_data = get_access_token(user.refresh_token)
    token = user_data["access_token"]
    sp = spotipy.Spotify(auth=token)

    asyncio.gather(save_playlist_algorithm(sp, user))

    if user.send_mail:
        # TODO add separate filed to form and shema to send mails on pl save
        subject = "Discover Weekly Playlist Saved"
        text = render_save_pl_text(user.dw_playlist_id, user.user_id)
        logger.info(
            f"Sending save_dw mail to {user.email} at {datetime.now(timezone.utc)}"
        )
        asyncio.gather(send_email(user.email, subject, text))


###
