const knex = require('../db/knex');

async function allTopics(req, res) {
  try {
    const { user_id } = req.body;
    const category_id = req.params.category_id;
    console.log(user_id, category_id);
    const data = await knex('topics')
      .orderBy('name')
      .select({ id: 'id', name: 'name', goal: 'goal' })
      .where('user_id', user_id)
      .andWhere('category_id', category_id);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function newTopic(req, res) {
  try {
    const { user_id, name, goal, categoryID } = req.body;
    const data = await knex('topics').insert(
      {
        name,
        goal,
        user_id,
        category_id: categoryID,
      },
      ['id', 'name', 'goal']
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
    const { user_id, goal } = req.body;
    console.log(goal);
    const data = await knex('topics')
      .where('id', req.params.topicID)
      .andWhere('user_id', user_id)
      .update({ goal }, ['id', 'goal']);
    console.log(`topic_id: ${data[0].id} new goal: ${data[0].goal}`);
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
