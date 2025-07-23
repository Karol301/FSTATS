import React from 'react';
import { useParams } from 'react-router-dom';

function TeamDetailsPage() {
  const { teamName } = useParams();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p>Strona drużyny: <strong>{decodeURIComponent(teamName)}</strong></p>
    </div>
  );
}

export default TeamDetailsPage;
