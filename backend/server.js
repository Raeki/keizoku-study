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
    const data = await knex
      .select({ id: 'id', name: 'name', goal: 'goal' })
      .from('topics');
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

// PATCH goal
app.patch('/topics/:topicID', async (req, res) => {
  try {
    const { goal } = req.body;
    console.log(goal);
    const data = await knex('topics')
      .where('id', req.params.topicID)
      .update({ goal }, ['goal']);
    console.log(`topic_id: ${req.params.topicID} new goal: ${goal}`);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
  }
});

// Session API calls

// GET all study sessions in a topic
app.get('/sessions/:topicID', async (req, res) => {
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
app.post('/sessions', async (req, res) => {
  try {
    const { date, time, topicID } = req.body;
    const data = await knex('sessions')
      .returning(['date', 'time', 'id'])
      .insert({
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
app.delete('/sessions/:sessionID', async (req, res) => {
  try {
    const session_id = req.params.sessionID;

    const data = await knex('sessions')
      .returning(['id'])
      .where('id', session_id)
      .del();
    console.log(`session: ${session_id} deleted`);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

// PATCH an existing study session
app.patch('/sessions/:sessionID', async (req, res) => {
  try {
    const { date, time } = req.body;
    const session_id = req.params.sessionID;

    const data = await knex('sessions').where('id', session_id).update(
      {
        date,
        time,
      },
      ['id', 'date', 'time']
    );
    console.log(`session: ${session_id} updated to:`);
    console.log(data);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
