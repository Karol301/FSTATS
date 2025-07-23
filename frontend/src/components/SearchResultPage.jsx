import React from 'react';
import { useLocation } from 'react-router-dom';
import TeamLogo from './TeamLogo';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage({ apiUrl }) {
  const query = useQuery();
  const teamName = query.get('team');

  if (!teamName) {
    return <p>Nie podano nazwy drużyny.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>{teamName}</h2>
      <TeamLogo teamName={teamName} apiUrl={apiUrl} />
    </div>
  );
}

export default SearchResultsPage;
