import { useEffect, useState } from 'react'
    import BreedCard from '../components/BreedCard'
    import SearchBar from '../components/SearchBar'
    import styles from './index.module.css'

    export default function Home() {
      const [breeds, setBreeds] = useState([])
      const [filteredBreeds, setFilteredBreeds] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const [error, setError] = useState(null)

      useEffect(() => {
        const fetchBreeds = async () => {
          try {
            const response = await fetch('http://localhost:5173/api/breeds')
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setBreeds(data)
            // Set initial popular breeds (first 6 with images)
            const popular = data
              .filter(breed => breed.image_url)
              .slice(0, 6)
            setFilteredBreeds(popular)
          } catch (error) {
            console.error('Error fetching breeds:', error)
            setError(error.message)
          } finally {
            setIsLoading(false)
          }
        }

        fetchBreeds()
      }, [])

      const handleSearch = (query) => {
        if (!query) {
          // Reset to popular breeds when search is empty
          const popular = breeds
            .filter(breed => breed.image_url)
            .slice(0, 6)
          setFilteredBreeds(popular)
          return
        }
        
        const filtered = breeds.filter(breed =>
          breed.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredBreeds(filtered)
      }

      if (isLoading) {
        return (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading breeds...</p>
          </div>
        )
      }

      if (error) {
        return (
          <div className={styles.error}>
            <h2>Error loading breeds</h2>
            <p>{error}</p>
            <p>Please try refreshing the page.</p>
          </div>
        )
      }

      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Welcome to Canine Compass</h1>
            <p>Find the perfect dog breed for your family</p>
            <SearchBar onSearch={handleSearch} />
          </header>

          <section className={styles.popularBreeds}>
            <h2>{filteredBreeds.length ? 'Search Results' : 'Popular Breeds'}</h2>
            {filteredBreeds.length ? (
              <div className={styles.breedsGrid}>
                {filteredBreeds.map(breed => (
                  <BreedCard key={breed._id} breed={breed} />
                ))}
              </div>
            ) : (
              <p className={styles.noResults}>No breeds found matching your search</p>
            )}
          </section>
        </div>
      )
    }
