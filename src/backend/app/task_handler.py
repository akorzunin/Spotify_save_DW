import asyncio
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


async def task_tick():
    while 1:
        schedule.run_pending()
        await asyncio.sleep(1)


class NotifyUser(BaseModel):
    user_id: str
    email: EmailStr
    send_time: datetime


class SavePlUser(BaseModel):
    user_id: str
    email: EmailStr
    save_time: datetime
    dw_playlist_id: str
    refresh_token: str
    filter_dislikes: bool
    save_full_playlist: bool


format = "%(asctime)s [%(levelname)s]: %(message)s"
logger = logging.basicConfig(
    format=format,
    encoding="utf-8",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


def revive_user_tasks():
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
            text=render_notification_text(),
        )
        .tag(get_tag(user.user_id, "notify"))
    )


###
def send_notification(email: str, text: str):
    print(
        f"Sending notification to {email} at {datetime.now(timezone.utc)} w/ text: {text}"
    )
    ...


def render_notification_text():
    ...
    return "Special notification text for user"


def save_dw(user: SavePlUser):
    # if filter dislikes

    # if not filter dislikes
    # if not save_full_playlist???
    # if save_full_playlist???
    ...


def render_save_pl_text():
    ...
    return "Special text for saved playlist"


###


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


def parse_task_time(send_time: datetime) -> tuple[int, str]:
    # Convert given time to local
    server_send_time = send_time.astimezone(None)
    return (
        send_time.weekday(),
        f"{server_send_time.hour:0>2.0f}:{server_send_time.minute:0>2.0f}",
    )
