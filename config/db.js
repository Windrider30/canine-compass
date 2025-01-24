// In-memory database implementation
const breeds = new Map();

export const connectDB = async () => {
  console.log('Using in-memory database');
  return {
    get: (key) => breeds.get(key),
    set: (key, value) => breeds.set(key, value),
    getAll: () => Array.from(breeds.values()),
    insert: (data) => {
      data.forEach(breed => breeds.set(breed.name, breed));
    }
  };
};
