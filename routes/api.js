const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');

router.get('/allmarkers', function(req, res, next) {
  knex('routes').then(function(markers){
    console.log(markers);
    res.status(200).json(markers);
  });
});

router.post('/addMarker', function(req, res, next) {
  console.log('this is the api req.body', req.body);
  if (req.body.group && req.body.lat && req.body.lng && req.body.message) {
    console.log('this is api req.body in the if', req.body);
    knex('routes')
    .insert(req.body)
    .then(function(){
      res.status(200).json({success: 'Success'});
    })
    .catch(function(err){
      res.status(500).json(err);
    })
  }
});

module.exports = router
