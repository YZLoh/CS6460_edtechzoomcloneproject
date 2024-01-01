// SearchBar.js
import React, { useState } from 'react';
import './searchBar.css'

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search.trim());
  };

  return (
    <div className="searchBar__container search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
