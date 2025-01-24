import BreedSearch from '../components/BreedSearch';
    import PopularBreeds from '../components/PopularBreeds';
    import styles from '../styles/Home.module.css';

    export default function Home() {
      return (
        <main className={styles.container}>
          <h1 className={styles.title}>Welcome to Canine Compass</h1>
          <BreedSearch />
          <PopularBreeds />
        </main>
      );
    }
