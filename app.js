require('dotenv').config({ silent: true })
const express = require('express')
const app = express()
const path = require('path')
var logger = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
var session = require('express-session')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)
var passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
var multer = require('multer')
var upload = multer({ dest: './uploads/' })
var cloudinary = require('cloudinary')

// mongoose.connect('mongodb://localhost/gamerKakis')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise
app.use(express.static('public'))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))
// initialise passport in your application
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())

app.use(logger('dev'))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(ejsLayouts)

app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.authenticated)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}

app.get('/', (req, res) => {
  res.render('homepage')
})

app.use('/', require('./routes/user_routes'))
app.use('/clan', isAuthenticated ,require('./routes/clan_routes'))
app.use('/tournament', isAuthenticated ,require('./routes/tournament_routes'))
app.use('/player',require('./routes/player_routes'))
app.use('/game', require('./routes/game_routes'))

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.log(err.message)
    res.render('error')
  })
}

const port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('Gamer Kakis App is running on ' + port)
})
