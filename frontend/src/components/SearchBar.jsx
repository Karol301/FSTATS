import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search-results?team=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Szukaj klubu..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
