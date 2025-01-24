import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { breed } = req.query;
  const { db } = await connectToDatabase();

  // Check cache first
  const cachedData = db.prepare('SELECT * FROM breedCache WHERE breed = ?').get(breed);
  if (cachedData && (Date.now() - new Date(cachedData.timestamp).getTime()) < 24 * 60 * 60 * 1000) {
    return res.status(200).json(JSON.parse(cachedData.data));
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
    db.prepare(`
      INSERT INTO breedCache (breed, data, timestamp)
      VALUES (?, ?, ?)
      ON CONFLICT(breed) DO UPDATE SET
        data = excluded.data,
        timestamp = excluded.timestamp
    `).run(breed, JSON.stringify(data), new Date().toISOString());

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching breed data' });
  }
}
