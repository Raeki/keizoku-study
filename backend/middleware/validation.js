const knex = require('../db/knex');
const { REGEX } = require('../utils/constants');

async function validateEmail(req, res, next) {
  try {
    const { email } = req.body;

    // Check for a valid email address
    if (!email.match(REGEX.EMAIL)) {
      res.status(401).send('Invalid email');
    }

    // Check if the email already exists in the database
    const knexQuery = await knex
      .select('email')
      .from('users')
      .where('email', email);
    if (knexQuery[0]) {
      res.status(401).send('user exists');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }

  // Continue if there are no issues
  next();
}

async function validateLoginBody(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password || !email.match(REGEX.EMAIL)) {
      res.status(401).send('Invalid input');
    }

    // Check if user exists
    const knexQuery = await knex
      .select('email')
      .from('users')
      .where('email', email);
    if (!knexQuery[0]) {
      res.status(401).send('user does not exist');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }

  // Continue if there are no issues
  next();
}

module.exports = {
  validateEmail,
  validateLoginBody,
};
