let Game = require('../models/game')

let gameController = {
  list: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('game/index', { games: games })
    })
  },

  new: (req, res) => {
    res.render('game/new')
  },

  create: (req, res) => {
    Game.create({
      name: req.body.name,
      type: req.body.type,
      publisher: req.body.publisher,
      gameCover: req.body.gameCover
    }, function (err, group) {
      if (err) throw err
      res.redirect('/game')
    })
  }

}
module.exports = gameController
