import React from 'react';
import '../style/index.css';
import TeamLogo from './TeamLogo';
import SearchBar from './SearchBar'; // <-- tutaj

const apiUrl = 'http://localhost:5000';

function Home() {
  const topTeams = [
    'Real Madrid',
    'Manchester City',
    'Bayern München',
    'Barcelona',
    'Liverpool',
    'Paris Saint Germain',
    'Arsenal',
    'Inter',
    'Juventus',
    'Chelsea'
  ];

  return (
    <div className="home-container">
      <SearchBar />
      <h2 className="home-title">Top 10 Football Clubs</h2>
      <div className="teams-grid">
        {topTeams.map((team) => (
          <div key={team} className="team-card">
            <h3 className="team-name">{team}</h3>
            <TeamLogo teamName={team} apiUrl={apiUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
