import React from 'react';
import './BreedCard.css';

export default function BreedCard({ breed }) {
  return (
    <div className="breed-card">
      {breed.image_url ? (
        <img
          src={breed.image_url}
          alt={breed.name}
          className="breed-image"
        />
      ) : (
        <div className="image-placeholder">
          <span>No Image Available</span>
        </div>
      )}
      <div className="breed-info">
        <h2>{breed.name}</h2>
        <p className="breed-group">{breed.breed_group || 'Unknown Group'}</p>
        <div className="breed-details">
          <p><strong>Temperament:</strong> {breed.temperament || 'Not specified'}</p>
          <p><strong>Life Span:</strong> {breed.life_span || 'Unknown'}</p>
        </div>
      </div>
    </div>
  );
}
