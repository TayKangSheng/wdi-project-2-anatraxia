let Player = require('../models/player')
let Clan = require('../models/clan')
let Game = require('../models/game')

const passport = require('passport')

let playerController = {

  list: (req, res) => {
    Clan.find({}, (err, clans) => {
      if (err) throw err
      res.render('player/index', { clans: clans })
    })
  },

  show: (req, res) => {
    Player.findById(req.params.id)
    .populate('gamePlayed')
    .exec((err, playerInfo) => {
      if (err) throw err
      res.render('player/single_player', { playerInfo: playerInfo })
    })
  },

  passwordChange: (req, res) => {
    res.render('player/passwordChange')
  },

  renderSignup: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('auth/signup', {games: games, flash: req.flash('flash')[0]})
    })
  },
  renderLogin: (req, res) => {
    res.render('auth/login', {flash: req.flash('flash')[0]})
  },
  signup: (req, res, done) => {
    if (!req.body.email || !req.body.password) {
      req.flash('flash', {
        type: 'warning',
        message: 'Please fill in the email and password'
      })
      Game.find({}, (err, games) => {
        if (err) throw err
        res.render('auth/signup', {games: games, flash: req.flash('flash')[0]})
      })
    } else {
      var playerSignupStrategy = passport.authenticate('local-playerSignup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: false
      })
      return playerSignupStrategy(req, res, done)
    }
  },
  login: (req, res, done) => {
    if (!req.body.email || !req.body.password) {
      req.flash('flash', {
        type: 'warning',
        message: 'Please fill in the email and password'
      })
      res.render('auth/login', {flash: req.flash('flash')[0]})
    } else {
      var playerLoginStrategy = passport.authenticate('local-playerLogin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
      })
      return playerLoginStrategy(req, res, done)
    }
  },
  edit: (req, res) => {
    Player.findById(req.params.id, (err, playerItem) => {
      if (err) throw err
      Game.find({}, (err, games) => {
        if (err) throw err
        res.render('player/edit', { playerItem: playerItem, games: games})
      })
    })
  },

  update: (req, res) => {
    var arrOfgamePlayed = []
    for (var id in req.body.gamePlayed) {
      arrOfgamePlayed.push(id)
    }
    Player.findByIdAndUpdate(
      req.params.id, {
        local: {
          email: req.body.email,
          password: Player.encrypt(req.body.password, 10)
        },
        name: req.body.name,
        gamePlayed: arrOfgamePlayed,
        dob: req.body.dob,
        gender: req.body.gender,
        mobile: req.body.mobile
      }, {new: true}, (err, playerUpdated) => {
        if (err) throw err
        res.redirect('/')
      })
  },

  delete: (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err, playerRemoved) => {
      if (err) throw err
      res.redirect('/player')
    })
  },

  logout: (req, res) => {
    req.session.destroy(function (err) {
      if (err) throw err
      res.redirect('/')
    })
  }

}
module.exports = playerController
