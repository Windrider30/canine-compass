import React from 'react';
import BreedCard from './BreedCard';
import './PopularBreeds.css';

export default function PopularBreeds({ breeds }) {
  return (
    <section className="popular-breeds">
      <h2>Popular Breeds</h2>
      <div className="breeds-grid">
        {breeds.map((breed) => (
          <BreedCard key={breed.name} breed={breed} />
        ))}
      </div>
    </section>
  );
}
