const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    res.status(200).send('okay');
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
