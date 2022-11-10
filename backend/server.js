// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const knex = require('./db/knex');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

// Configurations
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/topics', async (req, res) => {
  try {
    const data = await knex.select({ id: 'id', name: 'name' }).from('topics');
    console.log('all topics: ' + data);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
