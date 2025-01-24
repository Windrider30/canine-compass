import axios from 'axios';
    import { connectToDatabase } from '../../lib/mongodb';

    export default async function handler(req, res) {
      const { breed } = req.query;
      const { db } = await connectToDatabase();

      // Check cache first
      const cachedData = await db.collection('breedCache').findOne({ breed });
      if (cachedData) {
        return res.status(200).json(cachedData.data);
      }

      try {
        const response = await axios.get(
          `https://api.thedogapi.com/v1/breeds/search?q=${breed}`,
          {
            headers: {
              'x-api-key': process.env.DOG_API_KEY
            }
          }
        );

        // Cache the data
        await db.collection('breedCache').updateOne(
          { breed },
          { $set: { data: response.data, timestamp: new Date() } },
          { upsert: true }
        );

        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching breed data' });
      }
    }
