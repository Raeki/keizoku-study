require('dotenv').config({ path: '.env.local' });
const express = require('express');
const app = express();
const knex = require('./db/knex');
const PORT = process.env.PORT || 8080;

// console.log(process.env.PORT);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/topics', (req, res) => {
  res.status(200).send('hello');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
