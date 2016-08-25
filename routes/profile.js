require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
      picture: user.picture_url || 'n/a'
    });
  })
  .catch(function(err){
    res.status(500).json(err);
  })
})


module.exports = router
