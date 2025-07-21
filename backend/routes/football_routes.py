from flask import Blueprint, request, jsonify
from services.football_api import get_team_logo

football_bp = Blueprint('football', __name__, url_prefix='/api')

@football_bp.route('/teams', methods=['GET'])
def get_team():
    team_name = request.args.get('name')
    if not team_name:
        return jsonify({"error": "Missing team name"}), 400

    result = get_team_logo(team_name)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Team not found"}), 404
