import { useState } from 'react';
    import { useRouter } from 'next/router';
    import styles from '../styles/Home.module.css';

    export default function BreedSearch() {
      const [query, setQuery] = useState('');
      const router = useRouter();

      const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
          router.push(`/breeds/${query}`);
        }
      };

      return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a breed..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      );
    }
