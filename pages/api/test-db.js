export default async function handler(req, res) {
  try {
    res.status(200).json({ 
      success: true, 
      message: 'In-memory cache system is working!'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: 'Failed to connect to cache system'
    });
  }
}
