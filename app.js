var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')

var map_routes = require('./routes/map_routes')
var auth = require('./routes/auth')
var profile = require('./routes/profile')

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', map_routes)
app.use('/auth', auth)
app.use('/profile', profile)

app.use(function(req, res, next) {
  var err = new Error('This is an API dumbass, its not for your enjoyment')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})


module.exports = app
