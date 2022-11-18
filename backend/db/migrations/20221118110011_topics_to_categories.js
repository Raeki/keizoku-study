/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('topics', function (table) {
    table.integer('category_id');
    table.foreign('category_id').references('id').inTable('categories');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('topics', function (table) {
    table.dropColumn('category_id');
  });
};
