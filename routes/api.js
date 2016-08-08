require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      var userObj = {id: user[0].id, name: user[0].name};
      var token = jwt.sign({ id: user.id}, process.env.SECRET);
      res.status(200).json({token: token, user: userObj});
    })
    .catch(function(err){
      console.log('catching an error beyatch!!!', err);
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
