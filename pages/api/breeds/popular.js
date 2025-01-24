import { connectToDatabase } from '../../lib/database';

export default async function handler(req, res) {
  try {
    // Fetch popular breeds from the API
    const response = await fetch('https://api.thedogapi.com/v1/breeds?limit=6', {
      headers: {
        'x-api-key': process.env.DOG_API_KEY
      }
    });
    const data = await response.json();
    
    // Fetch images for each breed
    const breedsWithImages = await Promise.all(data.map(async (breed) => {
      const imageResponse = await fetch(
        `https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}&limit=1`,
        {
          headers: {
            'x-api-key': process.env.DOG_API_KEY
          }
        }
      );
      const [imageData] = await imageResponse.json();
      return {
        ...breed,
        image: imageData
      };
    }));

    res.status(200).json(breedsWithImages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching popular breeds' });
  }
}
