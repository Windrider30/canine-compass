import { useEffect, useState } from 'react';
    import BreedCard from './BreedCard';
    import styles from '../styles/Home.module.css';

    export default function PopularBreeds() {
      const [popularBreeds, setPopularBreeds] = useState([]);

      useEffect(() => {
        const fetchPopularBreeds = async () => {
          try {
            const response = await fetch('/api/breeds/popular');
            const data = await response.json();
            setPopularBreeds(data);
          } catch (error) {
            console.error('Error fetching popular breeds:', error);
          }
        };

        fetchPopularBreeds();
      }, []);

      return (
        <section>
          <h2 className={styles.sectionTitle}>Popular Breeds</h2>
          <div className={styles.breedsGrid}>
            {popularBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </section>
      );
    }
