const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

async function editGoal(goal, topicID) {
  try {
    const rawData = await fetch(`${API_URL}/topics/${topicID}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ goal }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function editSession(newDate, minutes, sessionID) {
  try {
    const rawData = await fetch(`${API_URL}/sessions/${sessionID}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ date: newDate, time: minutes }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  editGoal,
  editSession,
};
