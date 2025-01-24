import { connectDB } from '../../config/db'
import { dogApi } from '../../utils/api'

export default async function handler(req, res) {
  const db = await connectDB()

  if (req.method === 'GET') {
    try {
      let breeds = db.getAll()
      
      if (breeds.length === 0) {
        const { data } = await dogApi.get('/breeds')
        breeds = data.map(breed => ({
          name: breed.name,
          description: breed.description || '',
          temperament: breed.temperament,
          life_span: breed.life_span,
          origin: breed.origin,
          weight: breed.weight,
          height: breed.height,
          bred_for: breed.bred_for,
          breed_group: breed.breed_group,
          image_url: breed.image?.url || '',
          wikipedia_url: breed.wikipedia_url
        }))
        
        db.insert(breeds)
      }

      res.status(200).json(breeds)
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch breeds',
        details: error.message
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
