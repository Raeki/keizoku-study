require('dotenv').config({ path: '../.env' });
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function signup(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Encrypt user password
    const hash = await bcrypt.hash(password, saltRounds);

    // Create user in database
    let data = await knex('users').insert(
      {
        email,
        password_digest: hash,
      },
      ['id', 'email']
    );
    data = data[0];

    // Create login token
    const token = await makeToken(data.id, data.email);

    // Assign token to user
    data = await knex('users')
      .where('id', data.id)
      .update({ token }, ['token']);

    // Send token to frontend
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function signin(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Get user info from postgres
    let data = await knex('users')
      .select({ id: 'id', email: 'email', hash: 'password_digest' })
      .where('email', email);
    data = data[0];

    // Check the password
    const valid = await bcrypt.compare(password, data.hash);

    if (valid) {
      // Create a token
      const token = await makeToken(data.id, data.email);

      // Assign it to the user
      data = await knex('users')
        .where('id', data.id)
        .update({ token }, ['token']);

      // Send token to frontend
      res.status(200).json(data[0]);
    }
    // else the login fails
    else {
      res.status(401).send('invalid password');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function makeToken(id, email) {
  const token = jwt.sign({ id, email }, process.env.TOKEN_KEY, {
    expiresIn: '7d',
  });
  console.log(token);
  return token;
}
module.exports = {
  signup,
  signin,
};
