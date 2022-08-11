from tinydb import TinyDB

db = TinyDB('./data/db.json')

users = db.table('users')