const knex = require('../db/knex');

async function allCategories(req, res) {
  try {
    const { user_id } = req.body;
    const data = await knex('categories')
      .orderBy('name')
      .select({ id: 'id', name: 'name', goal: 'goal' })
      .where('user_id', user_id);
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

async function newCategory(req, res) {
  try {
    const { user_id, name, goal } = req.body;
    const data = await knex('categories').insert(
      {
        name,
        goal,
        user_id,
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

async function editCategoryGoal(req, res) {
  try {
    const { user_id, goal } = req.body;
    console.log(goal);
    const data = await knex('categories')
      .where('id', req.params.categoryID)
      .andWhere('user_id', user_id)
      .update({ goal }, ['id', 'goal']);
    console.log(`topic_id: ${data[0].id} new goal: ${data[0].goal}`);
    res.status(200).json(data[0]);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  allCategories,
  newCategory,
  editCategoryGoal,
};
