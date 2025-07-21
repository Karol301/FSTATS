from pymongo import MongoClient
import os

client = None
db = None

def init_db(app):
    global client, db

    uri = os.getenv("MONGO_URI")
    db_name = os.getenv("MONGO_DB_NAME")

    if not uri or not db_name:
        print("Brak konfiguracji MONGO_URI lub MONGO_DB_NAME.")
        exit(1)

    try:
        client = MongoClient(uri)
        db = client[db_name]
        db.users.create_index("username", unique=True)
        print(f"Połączono z MongoDB: {db_name}")
    except Exception as e:
        print(f"Błąd połączenia z MongoDB: {e}")
        exit(1)

def users_collection():
    if db is not None:
        return db.users
    else:
        raise RuntimeError("Baza danych nie została zainicjalizowana.")
