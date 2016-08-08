
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('user_name');
    table.string('password');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  }).createTable('routes', (table) => {
    table.increments()
    table.string('group');
    table.float('lat');
    table.float('lng');
    table.string('message');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').dropTable('routes')
};
