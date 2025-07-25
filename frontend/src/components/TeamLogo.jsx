import React, { useEffect, useState } from 'react';

function TeamLogo({ teamName, apiUrl, onClick }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teamName) return;

    setLoading(true);
    fetch(`${apiUrl}/team-logo?team_name=${encodeURIComponent(teamName)}`)
      .then(res => res.json())
      .then(data => {
        if (data.logo) {
          setLogoUrl(data.logo);
          setError(null);
        } else {
          setError(data.error || 'Logo not found');
          setLogoUrl(null);
        }
      })
      .catch(() => {
        setError('Error fetching data');
        setLogoUrl(null);
      })
      .finally(() => setLoading(false));
  }, [teamName, apiUrl]);

  if (loading) return <p>Loading logo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {logoUrl ? (
        <button
          onClick={onClick}
          className="logo-button"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src={logoUrl} alt={`${teamName} logo`} className="team-logo" />
        </button>
      ) : (
        <p>No logo available</p>
      )}
    </div>
  );
}

export default TeamLogo;
