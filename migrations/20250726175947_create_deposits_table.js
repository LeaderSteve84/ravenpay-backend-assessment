/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('deposits', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('account_number').notNullable();
    table.decimal('amount', 14, 2).notNullable();
    table.string('reference').notNullable().unique();
    table.string('narration').nullable();
    table.string('bank').nullable();
    table.string('bank_code').nullable();
    table.string('sender_account').nullable();
    table.timestamp('deposited_at').defaultTo(knex.fn.now());
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('deposits');
};
