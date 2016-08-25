require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/listClimbing', function(req, res, next){
  knex('routes')
  .then(function(list_climbing){

    var listClimbingArr = [];

    var checkIfPresent = function(value){
      var listBoolean = false;
      for (var k = 0; k < listClimbingArr.length; k++) {
        if (value == listClimbingArr[k].climbing_area) {
          return listBoolean = true;
        }
      }
      return listBoolean;
    }

    for (var j = 0; j < list_climbing.length; j++) {
      if (checkIfPresent(list_climbing[j].climbing_area) == false) {

        var listMarkerObj = {
          climbing_area: list_climbing[j].climbing_area,
          type: list_climbing[j].climb_type,
          description: list_climbing[j].description,
          url: list_climbing[j].picture_url
        };

        listClimbingArr.push(listMarkerObj);
      } else if (checkIfPresent(list_climbing[j].climbing_area) == true) {
        for (var l = 0; l < listClimbingArr.length; l++) {
          if (listClimbingArr[l].climbing_area == list_climbing[j].climbing_area) {
            var splitTypeArr = listClimbingArr[l].type.split(', ');
            switch (list_climbing[j].climb_type) {
              case 'Rock':
              if (splitTypeArr.indexOf('Rock') < 0) {
                listClimbingArr[l].type += ', Rock';
              }
              break;
              case 'Ice':
              if (splitTypeArr.indexOf('Ice') < 0) {
                listClimbingArr[l].type += ', Ice';
              }
              break;
              case 'Boulder':
              if (splitTypeArr.indexOf('Boulder') < 0) {
                listClimbingArr[l].type += ', Boulder';
              }
              break;
            }
          }
        }
      }
    }
    res.status(200).json(listClimbingArr);
  })
  .catch(function(err){
    res.status(500).json(err);
  });
});

router.get('/allmarkers', function(req, res, next) {
  knex('routes')
  .then(function(markers){
    var customMarkerArr = [];
    for (var i = 0; i < markers.length; i++) {
      var markerObj = {
        lat: markers[i].lat,
        lng: markers[i].lng,
        group: markers[i].climbing_area,
        type: markers[i].climb_type,
        grade: markers[i].climb_grade,
        message: `
        <div class='markerContainer'>
        <div>
        <h4>Climing Area: ${markers[i].climbing_area}</h4>
        <h5>Route Name: ${markers[i].route_name}</h5>
        </div>
        <div class="imgDiv">
        <img src="${markers[i].picture_url}"/>
        </div>
        <div>
        <p>
        Climb Type: ${markers[i].climb_type} <br>
        Climb Grade: ${markers[i].climb_grade}
        </p>
        </div>
        <div>
        <p>Description: ${markers[i].description}</p>
        </div>
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

router.post('/grabRoutes', function(req, res, next){
  knex('routes')
  .where({climbing_area: req.body.climbing_area.toLowerCase()})
  .then(function(routes){
    res.status(200).json({routes: routes});
  })
  .catch(function(err){
    res.status(500).json(err);
  })
})

router.post('/addMarker', function(req, res, next) {
  if (req.body.markerObj.climbing_area && req.body.markerObj.lat && req.body.markerObj.lng && req.body.markerObj.description && req.body.user_id) {
    knex('routes')
    .insert({
      creator_id: req.body.user_id,
      climbing_area: req.body.markerObj.climbing_area.toLowerCase(),
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

router.post('/grabRouteReviews', function(req,res,next) {
  knex('routes')
  .innerJoin('reviews', 'routes.id', 'reviews.route_id')
  .where({ route_id: req.body.route.id })
  .then(function(joinedArr) {
    if (joinedArr.length > 0) {
      knex('users')
      .then(function(users) {
        var enhancedReviews = joinedArr.reduce(function(finalArr, currReview) {
          users.forEach(function(currUser) {
            if(currReview.creator_id === currUser.id){
              finalArr.push({
                username: currUser.user_name,
                user_photo: currUser.picture_url || 'http://www.engraversnetwork.com/files/placeholder.jpg',
                review: currReview.comment,
                created_at: currReview.created_at
              })
            }
          })
          return finalArr;
        }, []);

        res.status(200).json({
          reviews: enhancedReviews,
          route_id: req.body.route.id,
          route_name: req.body.route.route_name,
          picture_url: req.body.route.picture_url,
          climb_type: req.body.route.climb_type,
          climb_grade: req.body.route.climb_grade,
          rating: req.body.route.rating,
          description: req.body.route.description
        })
      })

    } else {
      res.status(200).json({route_name: req.body.route.route_name, message: 'No reviews have been submitted for this climb yet!'})
    }
  })
})

router.post('/submitReview', function(req, res, next){
  console.log('***************************');
  console.log('REQBODY', req.body);
  console.log('***************************');
  knex('reviews')
  .where({ id: req.body.routeId })
  .first()
  .insert({
    creator_id: req.body.user_id,
    route_id: req.body.routeId,
    comment: req.body.formData.content
  })
  .then(function(review){
    res.status(200).json({success: 'Success'});
  })
  .catch(function(err){
    res.status(500).json(err);
  })
})


module.exports = router
