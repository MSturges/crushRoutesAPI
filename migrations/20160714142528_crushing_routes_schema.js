
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('user_name').unique();
    table.string('password');
    table.string('email').unique();
    table.string('picture_url');
    table.string('about');
    table.string('home_town');
    table.float('lat');
    table.float('lng');
    table.bigInteger('created_at').notNullable().defaultTo(Date.now());
  }).createTable('routes', (table) => {
    table.increments();
    table.integer('creator_id').unsigned().references('users.id').onUpdate('CASCADE').index();
    table.string('climbing_area');
    table.string('route_name');
    table.string('picture_url');
    table.string('climb_type');
    table.string('climb_grade');
    table.string('description');
    table.float('lat');
    table.float('lng');
    table.float('rating');
    table.bigInteger('created_at').notNullable().defaultTo(Date.now());
  }).createTable('reviews', (table) => {
    table.increments();
    table.integer('creator_id').unsigned().references('users.id').onUpdate('CASCADE').index();
    table.integer('route_id').unsigned().references('routes.id').onUpdate('CASCADE').index();
    table.string('comment');
    table.float('rating');
    table.bigInteger('created_at').notNullable().defaultTo(Date.now());
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews').dropTable('routes').dropTable('users');
};
