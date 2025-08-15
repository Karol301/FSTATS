import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import SearchResultsPage from './components/SearchResultPage';
import TeamDetailsPage from './components/TeamDetailsPage';

const apiUrl = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm apiUrl={apiUrl} />} />
          <Route path="/register" element={<RegisterForm apiUrl={apiUrl} />} />
          <Route path="/home" element={<Home apiUrl={apiUrl} />} />
          <Route path="/search-results" element={<SearchResultsPage apiUrl={apiUrl} />} />
          <Route path="/teams/:teamName" element={<TeamDetailsPage apiUrl={apiUrl} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
