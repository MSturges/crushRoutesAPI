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
      user: user.user_name,
      home: user.home_town,
      about: user.about,
      email: user.email,
      picture: user.picture_url
    });
  })
  .catch(function(err){
    res.status(500).json(err);
  })
})


module.exports = router
