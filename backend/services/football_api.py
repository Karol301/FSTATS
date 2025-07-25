import os
import requests

API_KEY = os.getenv("API_FOOTBALL_KEY")
BASE_URL = "https://v3.football.api-sports.io"

headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
}


def get_team_id_by_name(team_name):
    url = f"{BASE_URL}/teams"
    params = {"name": team_name}
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data["response"]:
            return data["response"][0]["team"]["id"]
    return None


def get_league_id_for_team(team_id, season):
    url = f"{BASE_URL}/fixtures"
    params = {
        "team": team_id,
        "season": season
    }
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data["response"]:
            return data["response"][0]["league"]["id"]
    return None


def get_team_logo(team_name):
    url = f"{BASE_URL}/teams"
    params = {"name": team_name}
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data["response"]:
            team = data["response"][0]["team"]
            return {
                "team_name": team["name"],
                "logo": team["logo"]
            }
    return None


def get_team_stats_by_name(team_name, season):
    team_id = get_team_id_by_name(team_name)
    if not team_id:
        return {"error": "Nie znaleziono drużyny."}

    league_id = get_league_id_for_team(team_id, season)
    if not league_id:
        return {"error": "Nie znaleziono ligi dla tej drużyny w podanym sezonie."}

    url = f"{BASE_URL}/teams/statistics"
    params = {
        "team": team_id,
        "season": season,
        "league": league_id
    }
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json().get("response", {})

        return {
            "team": data.get("team", {}).get("name"),
            "season": season,
            "league": data.get("league", {}).get("name"),
            "goals_scored": data.get("goals", {}).get("for", {}).get("total", {}).get("total"),
            "goals_conceded": data.get("goals", {}).get("against", {}).get("total", {}).get("total"),
            "wins": data.get("fixtures", {}).get("wins", {}).get("total"),
            "losses": data.get("fixtures", {}).get("loses", {}).get("total"),
            "draws": data.get("fixtures", {}).get("draws", {}).get("total")
        }

    return {"error": "Błąd pobierania danych statystycznych."}
