import { dogApi } from '../../utils/api'
    import Breed from '../../models/Breed'
    import connectDB from '../../config/db'

    export default async function handler(req, res) {
      try {
        await connectDB()
        console.log('Connected to database')

        if (req.method === 'GET') {
          console.log('Fetching breeds...')
          
          // First check if we have breeds in database
          let breeds = await Breed.find({})
          console.log(`Found ${breeds.length} breeds in database`)
          
          // If no breeds in database, fetch from API
          if (breeds.length === 0) {
            console.log('Fetching breeds from external API...')
            const { data } = await dogApi.get('/breeds')
            console.log(`Received ${data.length} breeds from API`)
            
            // Transform and save breeds
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
            
            // Save to database
            await Breed.insertMany(breeds)
            console.log('Saved breeds to database')
          }

          res.status(200).json(breeds)
        } else {
          res.setHeader('Allow', ['GET'])
          res.status(405).end(`Method ${req.method} Not Allowed`)
        }
      } catch (error) {
        console.error('Error in breeds API:', error)
        res.status(500).json({ 
          error: 'Failed to fetch breeds',
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
      }
    }
