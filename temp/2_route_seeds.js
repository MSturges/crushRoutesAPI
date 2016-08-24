
exports.seed = function(knex, Promise) {
  var routeArr = [
    {
      creator_id: 1,
      climbing_area: 'Panorama Rock',
      route_name: 'Panorama Climb',
      picture_url: 'http://www.engraversnetwork.com/files/placeholder.jpg',
      climb_type: 'Rock',
      climb_grade: '5.12',
      description: '50-foot-tall, rock formation',
      lat: 40.015,
      lng: -105.27,
      rating: 5
    },
    {
      creator_id: 1,
      climbing_area: 'Other Area',
      route_name: 'Other Climb',
      picture_url: 'http://www.engraversnetwork.com/files/placeholder.jpg',
      climb_type: 'Rock',
      climb_grade: '5.12',
      description: '50-foot-tall, rock formation',
      lat: 40.028,
      lng: -105.35,
      rating: 5
    }
  ]

  return knex('routes').del()
  .then(function () {
    return Promise.join(
      knex('routes').del(),
      knex('routes').insert(routeArr)
    );
  });
};
