import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/TeamDetails.css';

function TeamDetailsPage({ apiUrl }) {
  const { teamName } = useParams();
  const decodedTeamName = decodeURIComponent(teamName);
  const [stats, setStats] = useState(null);
  const [logo, setLogo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const season = 2023;

        const [statsRes, logoRes] = await Promise.all([
          fetch(`${apiUrl}/team-stats?team_name=${decodedTeamName}&season=${season}`),
          fetch(`${apiUrl}/team-logo?team_name=${decodedTeamName}`)
        ]);

        const statsData = await statsRes.json();
        const logoData = await logoRes.json();

        if (!statsRes.ok) throw new Error(statsData.error || 'Błąd statystyk');
        if (!logoRes.ok) throw new Error(logoData.error || 'Błąd logo');

        setStats(statsData);
        setLogo(logoData.logo);
      } catch (err) {
        setError(err.message || 'Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [decodedTeamName, apiUrl]);

  return (
    <div className="team-details-container">
      {loading && <div className="message loading">Ładowanie danych...</div>}
      {error && <div className="message error">{error}</div>}

      {stats && !error && (
        <div className="team-card">
          <h2>{stats.team}</h2>
          {logo && <img src={logo} alt={`${stats.team} logo`} className="team-logo" />}
          <p>Sezon: <strong>{stats.season}</strong></p>
          <p>Liga: <strong>{stats.league}</strong></p>
          <p>Gole strzelone: <strong>{stats.goals_scored}</strong></p>
          <p>Gole stracone: <strong>{stats.goals_conceded}</strong></p>
          <p>Wygrane: <strong>{stats.wins}</strong></p>
          <p>Remisy: <strong>{stats.draws}</strong></p>
          <p>Porażki: <strong>{stats.losses}</strong></p>
        </div>
      )}
    </div>
  );
}

export default TeamDetailsPage;
