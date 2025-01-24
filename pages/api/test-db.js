import { connectToDatabase } from '../../lib/database';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    res.status(200).json({ 
      success: true, 
      tables: tables.map(t => t.name),
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
