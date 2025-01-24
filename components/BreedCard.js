import Link from 'next/link'
    import styles from '../styles/BreedCard.module.css'

    export default function BreedCard({ breed }) {
      return (
        <Link href={`/breeds/${breed.name}`} className={styles.cardLink}>
          <div className={styles.breedCard}>
            {breed.image_url ? (
              <img 
                src={breed.image_url} 
                alt={breed.name}
                className={styles.breedImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>No Image Available</span>
              </div>
            )}
            <div className={styles.breedInfo}>
              <h2>{breed.name}</h2>
              <p className={styles.breedGroup}>{breed.breed_group || 'Unknown Group'}</p>
              <div className={styles.breedDetails}>
                <p><strong>Temperament:</strong> {breed.temperament || 'Not specified'}</p>
                <p><strong>Life Span:</strong> {breed.life_span || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    }
