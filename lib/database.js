// Simple in-memory cache implementation
const cache = new Map();

export async function connectToDatabase() {
  return {
    db: {
      get: (breed) => {
        const cached = cache.get(breed);
        if (cached && (Date.now() - cached.timestamp) < 24 * 60 * 60 * 1000) {
          return cached.data;
        }
        return null;
      },
      set: (breed, data) => {
        cache.set(breed, {
          data,
          timestamp: Date.now()
        });
      }
    }
  };
}
