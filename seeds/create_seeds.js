
exports.seed = function(knex, Promise) {
  var markerArr = [
    {
      group: 'testOne',
      lat: 40.015,
      lng: -105.27,
      message: 'rowValue1'
    },
    {
      group: 'testOne',
      lat: 40.016,
      lng: -105.28,
      message: 'rowValue1'
    },
    {
      group: 'testOne',
      lat: 40.017,
      lng: -105.29,
      message: 'rowValue1'
    },
    {
      group: 'testOne',
      lat: 40.018,
      lng: -105.30,
      message: 'rowValue1'
    },
    {
      group: 'testOne',
      lat: 40.019,
      lng: -105.31,
      message: 'rowValue1'
    },
    {
      group: 'testTwo',
      lat: 40.020,
      lng: -105.31,
      message: 'rowValue1'
    },
    {
      group: 'testTwo',
      lat: 40.021,
      lng: -105.31,
      message: 'rowValue1'
    },
    {
      group: 'testTwo',
      lat: 40.022,
      lng: -105.31,
      message: 'rowValue1'
    }
  ];

  return Promise.join(
    knex('routes').del(),
    knex('routes').insert(markerArr)
  );

};
