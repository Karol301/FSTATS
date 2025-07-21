import React, { useEffect, useState } from "react";

function TeamLogo({ teamName }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teamName) return;

    setLoading(true);
    fetch(`http://localhost:5000/api/teams?name=${encodeURIComponent(teamName)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logo) {
          setLogoUrl(data.logo);
          setError(null);
        } else {
          setError(data.error || "Logo not found");
          setLogoUrl(null);
        }
      })
      .catch(() => {
        setError("Error fetching data");
        setLogoUrl(null);
      })
      .finally(() => setLoading(false));
  }, [teamName]);

  if (loading) return <p>Loading logo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {logoUrl ? (
        <img src={logoUrl} alt={`${teamName} logo`} style={{ maxWidth: 200 }} />
      ) : (
        <p>No logo available</p>
      )}
    </div>
  );
}

export default TeamLogo;
