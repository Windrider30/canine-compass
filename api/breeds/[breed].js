import { connectDB } from '../../../config/db'

export default async function handler(req, res) {
  const db = await connectDB()
  const { breed } = req.query

  try {
    const breedData = db.get(breed)
    if (!breedData) {
      return res.status(404).json({ error: 'Breed not found' })
    }
    res.status(200).json(breedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch breed data' })
  }
}
