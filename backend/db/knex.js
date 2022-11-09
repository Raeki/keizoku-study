require('dotenv').config({ path: '../.env' });

const env = process.env.NODE_ENV || 'development';
console.log(env);

const config = require('./knexfile');
const knex = require('knex')(config[env]);

module.exports = knex;
