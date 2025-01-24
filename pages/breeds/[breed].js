import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';

    export default function BreedPage() {
      const router = useRouter();
      const { breed } = router.query;
      const [breedData, setBreedData] = useState(null);

      useEffect(() => {
        if (breed) {
          fetch(`/api/breeds/${breed}`)
            .then(res => res.json())
            .then(data => setBreedData(data[0]))
            .catch(console.error);
        }
      }, [breed]);

      if (!breedData) return <div>Loading...</div>;

      return (
        <div>
          <h1>{breedData.name}</h1>
          <p>{breedData.temperament}</p>
          <p>Life Span: {breedData.life_span}</p>
          <p>Weight: {breedData.weight.metric} kg</p>
          <p>Height: {breedData.height.metric} cm</p>
        </div>
      );
    }
