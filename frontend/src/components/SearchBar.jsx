import React from 'react';
import '../style/SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Szukaj klubu..."
        className="search-input"
        disabled 
      />
    </div>
  );
}

export default SearchBar;
