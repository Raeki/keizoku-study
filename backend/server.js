// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const timeout = require('connect-timeout');

// controllers
const users = require('./controller/users');
const topics = require('./controller/topics');
const sessions = require('./controller/sessions');

// middleware
const { validateEmail } = require('./middleware/validation');

// Configurations
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(timeout('5s'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Topics API calls */

// GET all topics
app.get('/topics', topics.allTopics);

// POST new topic
app.post('/topics', topics.newTopic);

// PATCH topic goal
app.patch('/topics/:topicID', topics.editGoal);

/* Sessions API calls */

// GET all study sessions in a topic
app.get('/sessions/:topicID', sessions.allSessions);

// POST a new study session
app.post('/sessions', sessions.newSession);

// PATCH an existing study session
app.patch('/sessions/:sessionID', sessions.editSession);

// DELETE an existing study session
app.delete('/sessions/:sessionID', sessions.deleteSession);

/* Users API calls */

// POST a new user
app.post('/signup', validateEmail, users.signup);
// POST a login request
app.post('/signin', users.signin);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
