const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');


/* GET home page. */
router.get('/signup', function(req, res, next) {
  // knex('users')
  // knex('routes')
  res.json('some_data_from_knex_within_the_then')
})



module.exports = router
