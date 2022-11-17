const knex = require('../db/knex');

async function allSessions(req, res) {
  const topicID = req.params.topicID;
  const { user_id } = req.body;
  try {
    const data = await knex('sessions')
      .where('topic_id', topicID)
      .andWhere('user_id', user_id)
      .select({ id: 'id', date: 'date', time: 'time' });
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function newSession(req, res) {
  try {
    const { date, minutes, topicID, user_id } = req.body;
    const data = await knex('sessions').insert(
      {
        date,
        time: minutes,
        topic_id: topicID,
        user_id,
      },
      ['date', 'time', 'id']
    );
    res.status(201).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function editSession(req, res) {
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
}

async function deleteSession(req, res) {
  try {
    const session_id = req.params.sessionID;
    const { user_id } = req.body;

    const data = await knex('sessions')
      .where('id', session_id)
      .andWhere('user_id', user_id)
      .del(['id']);
    console.log(`session_id: ${data[0].id} deleted`);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

module.exports = {
  allSessions,
  newSession,
  editSession,
  deleteSession,
};
