const knex = require('../db/knex');
const { REGEX } = require('../utils/constants');

async function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email.match(REGEX.EMAIL)) {
    res.status(401).send('Invalid email');
  }

  try {
    const knexQuery = await knex
      .select('email')
      .from('users')
      .where('email', email);

    if (knexQuery.length !== 0) {
      res.status(401).send('user exists');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
  next();
}

module.exports = {
  validateEmail,
};
