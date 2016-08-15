const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const api = require('./routes/api')
const auth = require('./routes/auth')

const app = express()

app.use(cors())
// app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', api)
app.use('/auth', auth)


// There is a special routing method, app.all(), which is not derived from
// any HTTP method. This method is used for loading middleware functions at a path for all request methods.
app.all('*', (req,res,next) => {
  res.sendFile('index.html', { root: __dirname + '/public/' })
})

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})


module.exports = app
