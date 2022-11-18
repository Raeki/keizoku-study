const API_URL = process.env.REACT_APP_API_URL;

export async function postNewCategory(name, goal) {
  try {
    const rawData = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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

export async function postNewTopic(name, goal) {
  try {
    const rawData = await fetch(`${API_URL}/topics`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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

export async function postNewSession(minutes, topicID) {
  try {
    const date = new Date();
    const rawData = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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

export async function postSignin(email, password) {
  try {
    const rawData = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function postSignup(email, password) {
  try {
    const rawData = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await rawData.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
