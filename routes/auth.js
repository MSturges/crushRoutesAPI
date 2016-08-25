require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', function (req, res, next) {
  if ( req.body.user_name && req.body.password ) {
    var hash = bcrypt.hashSync(req.body.password, 8);
    knex('users')
    .insert({
      user_name: req.body.user_name,
      password: hash
    })
    .returning('*')
    .then(function(user){
      var userObj = {id: user[0].id, username: user[0].user_name};
      var token = jwt.sign({ id: user[0].id}, process.env.SECRET);
      res.status(200).json({token: token, user: userObj});
    })
    .catch(function(err){
      console.log('catching an error', err);
      res.status(200).json(err);
    })
  }
});

router.post('/login', function(req, res, next) {
  if (req.body.name && req.body.password) {
    knex('users')
    .where({user_name: req.body.name})
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
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

router.post('/checkTokenValidity', function(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, process.env.SECRET);
    if (decoded.id === JSON.parse(req.body.user).id) {
      knex('users')
      .where({
        id: decoded.id
      })
      .then(function(user){
        if (user.length > 0) {
          res.status(200).json({ success: decoded });
        } else {
          throw Error('Token doesn\'t match user');
        }
      })
    } else {
      throw Error('Token doesn\'t match user');
    }
  }
  catch(err) {
    res.status(200).json({ error: err.message });
  }
});

module.exports = router
