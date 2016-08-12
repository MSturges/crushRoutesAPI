
exports.seed = function(knex, Promise) {
  var markerArr = [
    {
      climbing_area: 'Panorama Rock',
      route_name: 'Four + routes',
      picture_url: 'http://3.bp.blogspot.com/_QL882sTCXqc/S0_0IaRQdWI/AAAAAAAADiQ/EXPwp9rIEwY/s1600-h/PanoramaRockSouthwest-FINAL.JPG',
      climb_type: 'Rock',
      climb_grade: '5.12',
      description: '50-foot-tall, rock formation',
      lat: 40.015,
      lng: -105.27,
      rating: 5
    },
    {
      climbing_area: '',
      route_name: '',
      picture_url: '',
      climb_type: '',
      climb_grade: '',
      description: '',
      lat: 40.015,
      lng: -105.27,
      rating: 5
    },
    {
      climbing_area: '',
      route_name: '',
      picture_url: '',
      climb_type: '',
      climb_grade: '',
      description: '',
      lat: 40.015,
      lng: -105.27,
      rating: 5
    },
  ];

  return Promise.join(
    knex('routes').del(),
    knex('routes').insert(markerArr)
  );

};
