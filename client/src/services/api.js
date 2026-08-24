const API_URL = 'http://localhost:3001/api';

const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);

  console.log(`${endpoint} status:`, response.status);

  if (!response.ok) {
    const errorText = await response.text();

    console.error(`${endpoint} error:`, errorText);

    throw new Error(
      `${endpoint} failed with status ${response.status}`
    );
  }

  return response.json();
};

export const getProducts = () => fetchData('/products');

export const getCategories = () => fetchData('/categories');

export const getTags = () => fetchData('/tags');