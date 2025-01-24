import { connectToDatabase } from '@/lib/database';

export default async function handler(req, res) {
  const { breed } = req.query;
  const { db } = await connectToDatabase();

  // Check cache first
  const cachedData = db.get(breed);
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${breed}`,
      {
        headers: {
          'x-api-key': process.env.DOG_API_KEY
        }
      }
    );
    const data = await response.json();

    // Cache the data
    db.set(breed, data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching breed data' });
  }
}
