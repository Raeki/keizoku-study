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
    const token = jwt.sign({ data }, process.env.TOKEN_KEY, {
      expiresIn: '7d',
    });

    // Assign token to user
    data = await knex('users')
      .where('id', data.id)
      .update({ token }, ['token']);

    // Send token to frontend
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function signin(req, res) {}

module.exports = {
  signup,
  signin,
};
