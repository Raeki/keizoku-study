// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const knex = require('./db/knex');
const cors = require('cors');
const timeout = require('connect-timeout');
const PORT = process.env.PORT || 8080;

// Configurations
app.use(express.json());
app.use(timeout('5s'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Topics API calls

// GET all topics
app.get('/topics', async (req, res) => {
  try {
    const data = await knex.select({ id: 'id', name: 'name' }).from('topics');
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

// POST new topic
app.post('/topics', async (req, res) => {
  try {
    const { name } = req.body;
    const data = await knex('topics').returning(['id', 'name']).insert({
      name,
    });
    console.log('new topic: ');
    console.log(data[0]);
    res.status(201).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

// Session API calls

// GET all study sessions in a topic
app.get('/session/:topicID', async (req, res) => {
  const topicID = req.params.topicID;
  try {
    const data = await knex('sessions')
      .where('topic_id', topicID)
      .select({ id: 'id', date: 'date', time: 'time' });
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

// POST a new study session
app.post('/session', async (req, res) => {
  try {
    const { date, time, topicID } = req.body;
    const data = await knex('sessions').returning(['date', 'time']).insert({
      date,
      time,
      topic_id: topicID,
    });
    res.status(201).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

// DELETE an existing study session
app.delete('/session/:sessionID', async (req, res) => {
  try {
    const sessionID = req.params.sessionID;

    const data = await knex('sessions')
      .returning(['id'])
      .where('id', sessionID)
      .del();
    console.log(`session: ${sessionID} deleted`);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
