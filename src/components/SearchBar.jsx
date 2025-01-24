import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ breeds, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a breed..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
