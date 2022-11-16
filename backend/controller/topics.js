const knex = require('../db/knex');

async function allTopics(req, res) {
  try {
    const { user_id } = req.body;
    const data = await knex('topics')
      .orderBy('name')
      .select({ id: 'id', name: 'name', goal: 'goal' })
      .where('user_id', user_id);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function newTopic(req, res) {
  try {
    const { name } = req.body;
    const data = await knex('topics').insert(
      {
        name,
      },
      ['id', 'name']
    );
    console.log('new topic: ');
    console.log(data[0]);
    res.status(201).json(data[0]);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function editGoal(req, res) {
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
}

module.exports = {
  allTopics,
  newTopic,
  editGoal,
};
