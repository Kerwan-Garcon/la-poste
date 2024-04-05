const API_BASE_URL = "https://api-adresse.data.gouv.fr";

const fetchGouvernmentAddress = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/?q=${query}&limit=5`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default fetchGouvernmentAddress;
