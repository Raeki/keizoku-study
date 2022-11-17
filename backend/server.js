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
const { validateEmail, validateLoginBody } = require('./middleware/validation');
const { verifyToken } = require('./middleware/auth');

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
app.get('/topics', verifyToken, topics.allTopics);

// POST new topic
app.post('/topics', verifyToken, topics.newTopic);

// PATCH topic goal
app.patch('/topics/:topicID', verifyToken, topics.editGoal);

/* Sessions API calls */

// GET all study sessions in a topic
app.get('/sessions/:topicID', verifyToken, sessions.allSessions);

// POST a new study session
app.post('/sessions', verifyToken, sessions.newSession);

// PATCH an existing study session
app.patch('/sessions/:sessionID', sessions.editSession);

// DELETE an existing study session
app.delete('/sessions/:sessionID', sessions.deleteSession);

/* Users API calls */

// POST a new user
app.post('/signup', validateEmail, users.signup);
// POST a login request
app.post('/signin', validateLoginBody, users.signin);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
