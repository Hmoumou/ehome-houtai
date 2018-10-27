const createError = require('http-errors') 
const express = require('express') 
const path = require('path') 
const cookieParser = require('cookie-parser') 
const logger = require('morgan') 
const db = require('./model/config')
const indexRouter = require('./routes/index') 
const session = require('express-session')//权限认证
const MongoStore = require('connect-mongo')(session)


const app = express() 
app.use(session({
  secret: 'hu',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false ,maxAge:1000 * 60 * 60 *2},
  store:new MongoStore({mongooseConnection:db})
}))

// view engine setup
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(logger('dev')) 

app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser()) 
app.use(express.static(path.join(__dirname, 'public'))) 
app.use('/', indexRouter) 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)) 
}) 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message 
  res.locals.error = req.app.get('env') === 'development' ? err : {} 

  // render the error page
  res.status(err.status || 500) 
  res.render('error') 
}) 

module.exports = app 
