/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sessions', function (table) {
    table.increments('id');
    table.string('name');
    table.date('date');
    table.integer('topic_id');
    table.foreign('topic_id').references('id').inTable('topics');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sessions');
};
