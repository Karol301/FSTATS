from flask import Blueprint, request, jsonify
from services.football_api import (
    get_team_logo,
    get_team_stats_by_name
)

football_bp = Blueprint("football", __name__)

@football_bp.route("/team-logo", methods=["GET"])
def team_logo():
    team_name = request.args.get("team_name")
    if not team_name:
        return jsonify({"error": "Parametr 'team_name' jest wymagany."}), 400

    result = get_team_logo(team_name)
    if not result:
        return jsonify({"error": "Nie znaleziono drużyny."}), 404

    return jsonify(result), 200


@football_bp.route("/team-stats", methods=["GET"])
def team_stats():
    team_name = request.args.get("team_name")
    season = request.args.get("season")

    if not team_name or not season:
        return jsonify({"error": "Parametry 'team_name' i 'season' są wymagane."}), 400

    try:
        season = int(season)
    except ValueError:
        return jsonify({"error": "Parametr 'season' musi być liczbą całkowitą."}), 400

    stats = get_team_stats_by_name(team_name, season)
    if not stats or "error" in stats:
        return jsonify({"error": stats.get("error", "Błąd pobierania danych.")}), 404

    return jsonify(stats), 200
