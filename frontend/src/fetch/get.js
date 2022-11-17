const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

async function getAllTopics() {
  try {
    const rawData = await fetch(`${API_URL}/topics`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getAllTopics,
};
