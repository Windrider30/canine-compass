import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './SearchBar.css';

export default function SearchBar({ breeds }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/breeds/${query}`);
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
