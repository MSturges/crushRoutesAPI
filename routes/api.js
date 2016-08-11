require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/checkTokenValidity', function(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, process.env.SECRET);
    if (decoded.id === JSON.parse(req.body.user).id) {
      res.status(200).json({ success: decoded });
    } else {
      throw Error('Token doesn\'t match user');
    }
  }
  catch(err) {
    res.status(200).json({ error: err.message });
  }
});

router.get('/allmarkers', function(req, res, next) {
  knex('routes')
  .then(function(markers){
    var customMarkerArr = [];
    for (var i = 0; i < markers.length; i++) {
      var markerObj = {
        lat: markers[i].lat,
        lng: markers[i].lng,
        name: markers[i].route_name,
        group: markers[i].climbing_area,
        type: markers[i].climb_type,
        grade: markers[i].climb_grade,
        message: `
        <div>
        <p>Climing Area: ${markers[i].climbing_area}</p>
        </div>
        <div>
        <p>Description: ${markers[i].description}</p>
        </div>
        `,
        focus: false,
        draggable: false
      }
      switch (markers[i].climb_type) {
        case 'Rock':
        markerObj.icon = {
          iconUrl: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Marker-Outside-Chartreuse.png',
          iconSize: [55, 55], // size of the icon
        }
        break;
        case 'Boulder':
        markerObj.icon = {
          iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-128.png',
          iconSize: [55, 55], // size of the icon
        }
        break;
        case 'Ice':
        markerObj.icon = {
          iconUrl: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Marker-Outside-Azure.png',
          iconSize:     [55, 55], // size of the icon
        }
        break;
      }
      customMarkerArr.push(markerObj);
    }
    res.status(200).json(customMarkerArr);
  });
});

router.post('/addMarker', function(req, res, next) {
  if (req.body.markerObj.climbing_area && req.body.markerObj.lat && req.body.markerObj.lng && req.body.markerObj.description && req.body.user_id) {
    console.log('this is api req.body in the if', req.body);
    knex('routes')
    .insert({
      creator_id: req.body.user_id,
      climbing_area: req.body.markerObj.climbing_area,
      route_name: req.body.markerObj.route_name,
      picture_url: req.body.markerObj.picture_url || 'http://www.engraversnetwork.com/files/placeholder.jpg',
      climb_type: req.body.markerObj.climb_type,
      climb_grade: req.body.markerObj.climb_grade,
      description: req.body.markerObj.description,
      lat: req.body.markerObj.lat,
      lng: req.body.markerObj.lng,
      rating: req.body.markerObj.rating || 5.0,
    })
    .then(function(){
      res.status(200).json({success: 'Success'});
    })
    .catch(function(err){
      res.status(500).json(err);
    })
  }
});

router.post('/signup', function (req, res, next) {
  if ( req.body.user_name && req.body.password ) {
    var hash = bcrypt.hashSync(process.env.SECRET + req.body.password, 8);
    knex('users')
    .insert({
      user_name: req.body.user_name,
      password: hash
    })
    .returning('*')
    .then(function(user){
      var userObj = {id: user[0].id, name: user[0].user_name};
      var token = jwt.sign({ id: user[0].id}, process.env.SECRET);
      res.status(200).json({token: token, user: userObj});
    })
    .catch(function(err){
      console.log('catching an error', err);
      res.status(500).json(err);
    })
  }
});

router.post('/login', function(req, res, next) {
  if (req.body.name && req.body.password) {
    knex('users')
    .where({user_name: req.body.name})
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(process.env.SECRET + req.body.password, user.password)) {
        var user_obj = {id: user.id, username: user.user_name};
        var token = jwt.sign({ id: user.id }, process.env.SECRET);
        res.status(200).json({token: token, user: user_obj});
      } else {
        console.log('invalid login');
        res.status(200).json({error: 'Invalid User Name, or Password'});
      }
    })
    .catch(function(err) {
      console.log('error in login', err);
    })
  } else {
    res.status(200).json({error: 'Please completely fill out the login form'});
  }
});

module.exports = router
