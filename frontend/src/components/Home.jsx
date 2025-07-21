import React from 'react';
import '../style/index.css';
import TeamLogo from './TeamLogo';  

const apiUrl = 'http://localhost:5000';  

function Home() {
  const teamName = 'Real Madrid';  

  return (
    <div
      style={{
        color: '#fff',
        fontFamily: "'Minecraft', monospace, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center',
      }}
    >
      <h3>{teamName}</h3>
      <TeamLogo teamName={teamName} apiUrl={apiUrl} /> 
    </div>
  )
}

export default Home;
