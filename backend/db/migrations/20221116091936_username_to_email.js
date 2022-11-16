/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('username');
    table.string('email');
    table.unique('email');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.string('username');
    table.dropColumn('email');
  });
};
