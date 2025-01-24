export const fetchBreeds = async () => {
  try {
    const response = await fetch('/api/breeds');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: expected JSON');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};
