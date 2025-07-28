/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transfers', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('email').nullable();                
    table.string('trx_ref').notNullable();
    table.string('merchant_ref').nullable(); 
    table.integer('amount').notNullable();
    table.string('bank').notNullable();
    table.string('bank_code').notNullable();
    table.string('account_number').notNullable();
    table.string('account_name').notNullable();
    table.string('narration').nullable();
    table.integer('fee').nullable();
    table.string('status').defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transfers');
};
