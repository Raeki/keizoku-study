const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

async function deleteSession(sessionID) {
  try {
    const rawData = await fetch(`${API_URL}/sessions/${sessionID}`, {
      method: 'DELETE',
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
  deleteSession,
};
