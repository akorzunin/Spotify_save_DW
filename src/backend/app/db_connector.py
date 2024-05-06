import os

from tinydb import TinyDB

if not os.path.exists("./data"):
    os.mkdir("./data")

db = TinyDB("./data/db.json")

users = db.table("users")
