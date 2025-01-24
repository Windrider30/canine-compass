import React, { useState, useEffect } from 'react';
import BreedCard from './components/BreedCard';
import SearchBar from './components/SearchBar';
import PopularBreeds from './components/PopularBreeds';
import './App.css';

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [popularBreeds, setPopularBreeds] = useState([]);

  useEffect(() => {
    // Fetch all breeds
    fetch('/api/breeds')
      .then((response) => response.json())
      .then((data) => {
        setBreeds(data);
        // Set popular breeds (first 6 with images)
        const popular = data
          .filter((breed) => breed.image_url)
          .slice(0, 6);
        setPopularBreeds(popular);
      });
  }, []);

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
      <SearchBar breeds={breeds} />
      <PopularBreeds breeds={popularBreeds} />
    </div>
  );
}
