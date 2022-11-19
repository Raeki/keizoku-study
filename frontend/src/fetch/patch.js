const API_URL = process.env.REACT_APP_API_URL;

export async function editGoal(goal, topicID) {
  try {
    const rawData = await fetch(`${API_URL}/topics/${topicID}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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

export async function editSession(newDate, minutes, sessionID) {
  try {
    console.log(newDate, minutes, sessionID);
    const rawData = await fetch(`${API_URL}/sessions/${sessionID}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
