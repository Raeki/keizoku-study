/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('topics').del();
  await knex('topics').insert([
    { name: 'Code Chrysalis' },
    { name: 'CS50' },
    { name: 'Rust' },
  ]);
};
