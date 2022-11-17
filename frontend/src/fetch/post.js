const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

async function postNewTopic(name, goal) {
  try {
    const rawData = await fetch(`${API_URL}/topics`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, goal }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function postNewSession(minutes, topicID) {
  try {
    const date = new Date();
    const rawData = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ date, minutes, topicID }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  postNewTopic,
  postNewSession,
};
