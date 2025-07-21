import os
import requests

API_KEY = os.getenv("API_FOOTBALL_KEY")  
API_URL = "https://v3.football.api-sports.io/teams"

headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
}

def get_team_logo(team_name):
    params = {"name": team_name}
    response = requests.get(API_URL, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["response"]:
            team = data["response"][0]["team"]
            return {
                "team_name": team["name"],
                "logo": team["logo"]
            }
    return None
