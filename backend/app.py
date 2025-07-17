from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(basedir, '..', '.env')
load_dotenv(dotenv_path, override=True)

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

if not MONGO_URI or not MONGO_DB_NAME:
    print("BŁĄD: Brak konfiguracji MONGO_URI lub MONGO_DB_NAME w środowisku.")
    exit(1)

try:
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
    users_collection = db.users
    users_collection.create_index("username", unique=True)
    print(f"Pomyślnie połączono z bazą danych MongoDB: {MONGO_DB_NAME}")
except Exception as e:
    print(f"Błąd połączenia z bazą danych MongoDB: {e}")
    exit(1)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Nazwa użytkownika i hasło są wymagane.'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'Nazwa użytkownika jest już zajęta.'}), 409

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({
        'username': username,
        'password': hashed_password
    })

    return jsonify({'message': 'Rejestracja zakończona sukcesem!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Nazwa użytkownika i hasło są wymagane.'}), 400

    user = users_collection.find_one({'username': username})

    if user and check_password_hash(user['password'], password):
        return jsonify({'message': 'Zalogowano pomyślnie!', 'username': username}), 200
    else:
        return jsonify({'message': 'Błędna nazwa użytkownika lub hasło.'}), 401

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG') == '1', host='0.0.0.0', port=5000)
