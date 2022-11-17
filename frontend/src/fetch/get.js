const API_URL = process.env.REACT_APP_API_URL;

async function getAllTopics() {
  try {
    const rawData = await fetch(`${API_URL}/topics`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function getAllSessions(topicID) {
  try {
    const rawData = await fetch(`${API_URL}/sessions/${topicID}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await rawData.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getAllTopics,
  getAllSessions,
};
