var LocalStrategy = require('passport-local').Strategy
//const Club = require('../models/club')
const Player = require('../models/player')
//const Player = require('../models/player')

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function (id, done) {
    Player.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-playerLogin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenPassword, done) {
    Player.findOne({'local.email': email}, function (err, foundPlayer) {
      if (err) return done(err)
        //
      if (!foundPlayer) {
        return done(null, false, req.flash('flash', {
          type: 'warning',
          message: 'No such player found by this email'
        }))
      }
      if (!foundPlayer.validPassword(givenPassword)) {
        return done(null, false, req.flash('flash', {
          type: 'danger',
          message: 'Access denied: Password is wrong'
        }))
      }
      return done(err, foundPlayer)
    })
  }))

  passport.use('local-playerSignup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {

   // Find Player with email as given from the callback
    Player.findOne({ 'local.email': email }, function (err, foundPlayer) {
     // if there's a user with the email
     // call next() middleware with no error arguments + update the flash data

      if (foundPlayer) {
        console.log('the same user with same email found')
        return done(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already used'
        }))
      } else {
        var arrOfChosenIds = []
        for (var id in req.body.gamePlayed) {
          arrOfChosenIds.push(id)
        }
        let newPlayer = new Player({
          local: {
            email: email,
            password: Player.encrypt(password)
          },
          name: req.body.name,
          gamePlayed: arrOfChosenIds,
          dob: req.body.dob,
          gender: req.body.gender,
          mobile: req.body.mobile
        })
        newPlayer.save(function (err, output) {
          return done(null, output, req.flash('flash', {
            type: 'success',
            message: 'Welcome to Gamer Kakis ' + newPlayer.name
          }))
        })
      }
    })
  }))
}
