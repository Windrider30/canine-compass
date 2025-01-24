import { useState } from 'react'
    import styles from '../styles/SearchBar.module.css'

    export default function SearchBar({ onSearch }) {
      const [query, setQuery] = useState('')

      const handleSearch = (e) => {
        e.preventDefault()
        onSearch(query)
      }

      return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for breeds..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      )
    }
