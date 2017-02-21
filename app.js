// require('dotenv').config({ silent: true })
const express = require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const session = require('express-session')
// const passport = require('./config/ppConfig')
const flash = require('connect-flash')

mongoose.connect('mongodb://localhost/gamerKakis')

mongoose.Promise = global.Promise
// process.env.SESSION_SECRET = 'hahaha'

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }))
//
// app.use(passport.initialize())
// app.use(passport.session())
//
// app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(flash())

app.use(ejsLayouts)

// app.use(require('./middleware/setCurrentUser'))

app.set('view engine', 'ejs')

app.use('/club', require('./routes/club_routes'))
app.use('/league', require('./routes/league_routes'))
app.use('/game', require('./routes/game_routes'))
// app.use('/auth', require('./routes/user_router'))

// app.get('/', (req, res) => {
//   res.render('home')
// })

app.get('/', (req, res) => {
  res.render('homepage')
})

// app.use(require('./middleware/isLoggedIn'))

// app.get('/profile', (req, res) => {
//   res.render('user/profile')
// })
const port = 4000
app.listen(port, function () {
  console.log('Gamer Kakis App is running on ' + port)
})
