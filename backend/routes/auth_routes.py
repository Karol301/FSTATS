from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    success, message = register_user(data.get('username'), data.get('password'))

    return jsonify({'message': message}), 201 if success else 409

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    success, message = login_user(data.get('username'), data.get('password'))

    return jsonify({'message': message, 'username': data.get('username')}), 200 if success else 401
