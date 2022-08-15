from typing import Optional
from pydantic import BaseModel, EmailStr, validator
from datetime import datetime

class RefreshToken(BaseModel):
    refresh_token: str

class User(BaseModel):
    user_id: str
    created_at: str
    send_mail: bool = False
    email: EmailStr
    send_time: str
    is_premium: bool
    refresh_token: str
    save_dw_weekly: bool = False
    save_time: str
    dw_playlist_id: str
    @validator("send_time", "save_time", "created_at", pre=True)
    def parse_birthdate(cls, value):
        assert isinstance(value, datetime)
        return str(value)


class CreateUser(BaseModel):
    user_id: str
    send_mail: bool = False
    email: EmailStr
    send_time: datetime
    is_premium: bool
    refresh_token: str
    save_dw_weekly: bool = False
    save_time: datetime
    dw_playlist_id: str

class UpdateUser(BaseModel):
    send_mail: Optional[bool]
    email: Optional[EmailStr]
    send_time: Optional[datetime]
    is_premium: Optional[bool]
    refresh_token: Optional[str]
    save_dw_weekly: Optional[bool]
    save_time: Optional[datetime]
    @validator("send_time", "save_time", pre=False)
    def parse_birthdate(cls, value):
        # assert isinstance(value, datetime)
        return str(value)

class UserEmail(BaseModel):
    email: EmailStr
    subject: str
    text: str