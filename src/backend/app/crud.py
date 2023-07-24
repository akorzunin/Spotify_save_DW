from datetime import datetime, timezone
from tinydb import where

from backend.app import shemas


def get_all_users(
    db,
) -> list[dict]:
    return db.search(where("user_id").exists())


def get_user(db, user_id: str):
    return db.get(where("user_id") == user_id)


def get_user_by_email(db, email: str):
    return shemas.User(**db.get(where("email") == email))


def create_user(db, user: shemas.CreateUser) -> shemas.User:
    if not db.get(where("user_id") == user.user_id):
        new_user = user.dict() | {"created_at": datetime.now(timezone.utc)}
        parced_user = shemas.User(**new_user)
        db.insert(parced_user.dict())
        return parced_user


def update_user(
    db, user: shemas.UpdateUser, user_id: str
) -> shemas.User:  # TODO fix docs
    if user_upd := {k: v for k, v in user.dict().items() if v is not None}:
        db.update(user_upd, where("user_id") == user_id)
        return db.get(where("user_id") == user_id)


def delete_user(db, user_id: str):
    if db.get(where("user_id") == user_id):
        return db.remove(where("user_id") == user_id)
