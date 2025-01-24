import { useRouter } from 'next/router'
    import { useEffect, useState } from 'react'
    import BreedCard from '../../components/BreedCard'

    export default function BreedPage() {
      const router = useRouter()
      const { breed } = router.query
      const [breedData, setBreedData] = useState(null)

      useEffect(() => {
        if (breed) {
          const fetchBreed = async () => {
            const response = await fetch(`/api/breeds/${breed}`)
            const data = await response.json()
            setBreedData(data)
          }
          fetchBreed()
        }
      }, [breed])

      if (!breedData) return <p>Loading...</p>

      return (
        <div className="container">
          <BreedCard breed={breedData} />
          <div className="additional-info">
            <h2>More About {breedData.name}</h2>
            <p>{breedData.description}</p>
          </div>
        </div>
      )
    }
