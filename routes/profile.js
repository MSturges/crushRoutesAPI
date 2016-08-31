require('dotenv').config();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/grabUserProfile', function(req, res, next){
  knex('users')
  .where({user_name: req.body.user_name})
  .first()
  .then(function(user){
    res.status(200).json({
      user: user.user_name ,
      home: user.home_town || 'n/a',
      about: user.about || 'n/a',
      email: user.email || 'n/a',
      picture: user.picture_url || 'http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg'
    });
  })
  .catch(function(err){
    res.status(500).json(err);
  })
})

module.exports = router
