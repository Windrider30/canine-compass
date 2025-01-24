import Image from 'next/image';
    import Link from 'next/link';
    import styles from '../styles/Home.module.css';

    export default function BreedCard({ breed }) {
      return (
        <div className={styles.breedCard}>
          <Link href={`/breeds/${breed.id}`}>
            <div className={styles.imageContainer}>
              <Image
                src={breed.image?.url || '/default-dog.jpg'}
                alt={breed.name}
                width={300}
                height={200}
                className={styles.breedImage}
              />
            </div>
            <h3 className={styles.breedName}>{breed.name}</h3>
            <p className={styles.breedTemperament}>{breed.temperament}</p>
          </Link>
        </div>
      );
    }
