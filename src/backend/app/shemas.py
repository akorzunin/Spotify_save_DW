from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, validator
from datetime import datetime

class RefreshToken(BaseModel):
    refresh_token: str

class SpotifyToken(BaseModel):
    access_token: str
    token_type: Literal['Bearer']
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
    email: Optional[EmailStr]
    send_time: Optional[str]
    is_premium: bool
    refresh_token: str
    save_time: Optional[str]
    @validator("send_time", "save_time", "created_at", pre=True)
    def parse_birthdate(cls, value):
        if value:
            if isinstance(value, str): return value
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

class UpdateUser(BaseUser):
    send_mail: Optional[bool]
    email: Optional[EmailStr]
    send_time: Optional[datetime]
    is_premium: Optional[bool]
    refresh_token: Optional[str]
    save_time: Optional[datetime]
    dw_playlist_id: Optional[str]
    save_dw_weekly: Optional[bool]
    save_full_playlist: Optional[bool]
    filter_dislikes: Optional[bool]
    @validator("send_time", "save_time", pre=False)
    def parse_birthdate(cls, value):
        # assert isinstance(value, datetime)
        return str(value)

class UserEmail(BaseModel):
    email: EmailStr
    subject: str
    text: str

class Message(BaseModel):
    message: str
