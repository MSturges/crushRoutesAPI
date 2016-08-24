
exports.seed = function(knex, Promise) {
  var userArr = [
    {
      user_name: 'maxxxx',
      password: 'dickbutt'
    }
  ]

  return knex('users').del()
  .then(function () {
    return Promise.join(
      knex('users').del(),
      knex('users').insert(userArr)
    );
  });
};
