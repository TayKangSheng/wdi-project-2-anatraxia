let Player = require('../models/player')

let playerController = {
  list: (req, res) => {
    Player.find({}, (err, players) => {
      if (err) throw err
      res.render('player/index', { players: players })
    })
  },

  new: (req, res) => {
    Player.find({completed: false}, function (err, newPlayer) {
      if (err) throw err
      res.render('player/new', { newPlayer: newPlayer })
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

  create: (req, res) => {
    Player.create({
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      position: req.body.position,
      email: req.body.email,
      mobile: req.body.mobile,
      status: req.body.status,
      club: req.body.club.id
    }, function (err, group) {
      if (err) throw err
      res.redirect('/player')
    })
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
