import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const apiUrl = 'http://localhost:5000'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm apiUrl={apiUrl} />} />
        <Route path="/register" element={<RegisterForm apiUrl={apiUrl} />} />
      </Routes>
    </Router>
  );
}

export default App;
