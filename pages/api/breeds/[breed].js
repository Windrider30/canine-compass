import { connectToDatabase } from '@/lib/database';

export default async function handler(req, res) {
  const { breed } = req.query;
  const { db } = await connectToDatabase();

  // Check cache first
  const cachedData = db.exec('SELECT * FROM breedCache WHERE breed = ?', [breed]);
  if (cachedData.length > 0 && cachedData[0].values.length > 0) {
    const [data, timestamp] = cachedData[0].values[0];
    if (Date.now() - new Date(timestamp).getTime() < 24 * 60 * 60 * 1000) {
      return res.status(200).json(JSON.parse(data));
    }
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
    db.exec(`
      INSERT INTO breedCache (breed, data, timestamp)
      VALUES (?, ?, ?)
      ON CONFLICT(breed) DO UPDATE SET
        data = excluded.data,
        timestamp = excluded.timestamp
    `, [breed, JSON.stringify(data), new Date().toISOString()]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching breed data' });
  }
}
