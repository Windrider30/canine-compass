export const fetchBreeds = async () => {
  try {
    const response = await fetch('/api/breeds');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};
