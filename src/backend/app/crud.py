from datetime import datetime, timezone
from tinydb import Query, where

from backend.app import shemas


def get_all_users(
    db,
) -> list[dict]:
    return db.search(where("user_id").exists())


def get_user(db, user_id: str):
    return db.get(where('user_id') == user_id)


def create_user(db, user: shemas.CreateUser) -> shemas.User:
    if not db.get(where("user_id") == user.user_id):
        new_user = user.dict() | {"created_at": datetime.now(timezone.utc)}
        parced_user = shemas.User(**new_user)
        db.insert(parced_user.dict())
        return parced_user


def update_user(db, user: shemas.UpdateUser): # TODO fix docs
    return db.update(user.dict(), where("user_id") == user.user_id)


def delete_user(db, user_id: str):
    return db.remove(where("user_id") == user_id)
