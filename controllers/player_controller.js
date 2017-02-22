let Player = require('../models/player')
let Game = require('../models/game')

const passport = require('passport')

let playerController = {

  list: (req, res) => {
    Player.find({}, (err, players) => {
      if (err) throw err
      res.render('player/index', { players: players })
    })
  },

  show: (req, res) => {
    Player.findById(req.params.id)
    .populate('club')
    .exec((err, playerInfo) => {
      if (err) throw err
      res.render('player/show', { playerInfo: playerInfo })
    })
  },
  renderSignup: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('player/signup', {games: games, flash: req.flash('flash')[0]})
    })
  },
  renderLogin: (req, res) => {
    res.render('player/login', {flash: req.flash('flash')[0]})
  },
  signup: (req, res, done) => {
    var playerSignupStrategy = passport.authenticate('local-playerSignup', {
      successRedirect: '/',
      failureRedirect: '/player/signup',
      failureFlash: false
    })
    return playerSignupStrategy(req, res, done)
  },
  login: (req, res, done) => {
    var playerLoginStrategy = passport.authenticate('local-playerLogin', {
      successRedirect: '/',
      failureRedirect: '/player/login',
      failureFlash: false
    })
    return playerLoginStrategy(req, res, done)
  },
  edit: (req, res) => {
    Player.findById(req.params.id, (err, playerEdit) => {
      if (err) throw err
      res.render('player/edit', { playerEdit: playerEdit })
    })
  },
  update: (req, res) => {
    Player.findOneAndUpdate({
      id: req.params._id
    }, {
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      position: req.body.position,
      email: req.body.email,
      mobile: req.body.mobile,
      status: req.body.status,
      club: req.body.club.id
    }, (err, playerUpdated) => {
      if (err) throw err
      res.redirect('/player/' + playerUpdated.id)
    })
  },

  delete: (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err, playerRemoved) => {
      if (err) throw err
      res.redirect('/player')
    })
  }

}
module.exports = playerController
