import React, { useState, useEffect } from 'react';
import BreedCard from './components/BreedCard';
import SearchBar from './components/SearchBar';
import PopularBreeds from './components/PopularBreeds';
import { fetchBreeds } from './api/breeds';
import './App.css';

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [popularBreeds, setPopularBreeds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
        const popular = data
          .filter((breed) => breed.image_url)
          .slice(0, 6);
        setPopularBreeds(popular);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setError('Failed to load breeds. Please try again later.');
      }
    };

    loadBreeds();
  }, []);

  const handleSearch = (query) => {
    const results = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="app">
      <header className="header">
        <img
          src="/compass-rose-left.png"
          alt="Compass Rose"
          className="compass-rose"
        />
        <h1>Canine Compass</h1>
        <img
          src="/compass-rose-right.png"
          alt="Compass Rose"
          className="compass-rose"
        />
      </header>
      <p className="welcome-text">Welcome to the dog breed explorer</p>
      <SearchBar breeds={breeds} onSearch={handleSearch} />
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <PopularBreeds breeds={searchResults.length > 0 ? searchResults : popularBreeds} />
      )}
    </div>
  );
}
