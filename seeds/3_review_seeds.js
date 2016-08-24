exports.seed = function(knex, Promise) {
  var reviewArr = [
    {
      creator_id: 1,
      route_id: 1,
      comment: 'work',
      rating: 1.5
    },
    {
      creator_id: 1,
      route_id: 2,
      comment: 'workedddd',
      rating: 5.5
    }
  ]

  return knex('reviews').del()
  .then(function () {
    return Promise.join(
      knex('reviews').del(),
      knex('reviews').insert(reviewArr)
    );
  });
};
