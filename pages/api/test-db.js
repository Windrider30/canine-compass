import { connectToDatabase } from '../../lib/mongodb';

    export default async function handler(req, res) {
      try {
        const { db } = await connectToDatabase();
        const collections = await db.listCollections().toArray();
        res.status(200).json({ 
          success: true, 
          collections: collections.map(c => c.name),
          message: 'Database connection successful!'
        });
      } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ 
          success: false, 
          error: error.message,
          message: 'Failed to connect to database'
        });
      }
    }
