from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, validator


class RefreshToken(BaseModel):
    refresh_token: str


class SpotifyToken(BaseModel):
    access_token: str
    token_type: Literal["Bearer"]
    expires_in: int


class BaseUser(BaseModel):
    dw_playlist_id: Optional[str]
    save_dw_weekly: bool = False
    save_full_playlist: bool = False
    filter_dislikes: bool = True


class User(BaseUser):
    user_id: str
    created_at: str
    send_mail: bool = False
    email: Optional[EmailStr | Literal[""]]
    send_time: Optional[str]
    is_premium: bool
    refresh_token: str
    save_time: Optional[str]

    @validator("send_time", "save_time", "created_at", pre=True)
    def parse_birthdate(cls, value):
        if value:
            if isinstance(value, str):
                return value
            assert isinstance(value, datetime)
            return str(value)


class CreateUser(BaseUser):
    user_id: str
    send_mail: bool = False
    email: Optional[EmailStr]
    send_time: Optional[datetime]
    is_premium: bool
    refresh_token: str
    save_time: Optional[datetime]


class UpdateUser(BaseModel):
    send_mail: Optional[bool]
    email: Optional[EmailStr | Literal[""]]
    send_time: Optional[datetime | Literal[""]]
    is_premium: Optional[bool]
    refresh_token: Optional[str]
    save_time: Optional[datetime | Literal[""]]
    dw_playlist_id: Optional[str]
    save_dw_weekly: Optional[bool]
    save_full_playlist: Optional[bool]
    filter_dislikes: Optional[bool]

    @validator("send_time", "save_time", pre=False)
    def parse_date(cls, value):
        if value:
            return str(value)
        return ""


class UserEmail(BaseModel):
    email: EmailStr
    subject: str
    text: str


class Message(BaseModel):
    message: str


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
