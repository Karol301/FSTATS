import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm({ apiUrl }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(data.message || 'Błąd logowania');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Błąd połączenia z serwerem');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Logowanie</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Hasło:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
<button type="submit" className="btn-primary login">Zaloguj</button>
      </form>
      <p>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </p>
    </div>
  );
}

export default LoginForm;
