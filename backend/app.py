from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from database.mongo import init_db
from routes.auth_routes import auth_bp
from routes.football_routes import football_bp

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

init_db(app)  

app.register_blueprint(auth_bp)
app.register_blueprint(football_bp)

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG') == '1', host='0.0.0.0', port=5000)
