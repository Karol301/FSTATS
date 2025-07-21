from werkzeug.security import generate_password_hash, check_password_hash
from database.mongo import users_collection

def register_user(username, password):
    users = users_collection()  
    if users.find_one({'username': username}):
        return False, 'Nazwa użytkownika jest już zajęta.'

    hashed = generate_password_hash(password)
    users.insert_one({
        'username': username,
        'password': hashed
    })
    return True, 'Rejestracja zakończona sukcesem!'

def login_user(username, password):
    users = users_collection()  
    user = users.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        return True, 'Zalogowano pomyślnie!'
    return False, 'Błędna nazwa użytkownika lub hasło.'
