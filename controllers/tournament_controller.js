let Tournament = require('../models/tournament')
let Game = require('../models/game')

let tournamentController = {
  list: (req, res) => {
    Tournament.find({}, (err, tournaments) => {
      if (err) throw err
      res.render('tournament/index', { tournaments: tournaments })
    })
  },

  new: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('tournament/new', {games: games})
    })
  },

  show: (req, res) => {
    Tournament.findById(req.params.id)
    .populate('organizer')
    .populate('playerJoined')
    .populate('game')
    .exec((err, tournamentItem) => {
      if (err) throw err
      res.render('tournament/single_tournament', { tournamentItem: tournamentItem })
    })
  },

  showOwn: (req, res) => {
    Tournament.find({}, (err, tournaments) => {
      if (err) throw err
      res.render('tournament/ownTournament', { tournaments: tournaments })
    })
  },

  create: (req, res) => {
    Tournament.create({
      name: req.body.name,
      venue: req.body.venue,
      time: req.body.time,
      tournamentDate: req.body.tournamentDate,
      prizeMoney: Number(req.body.prizeMoney),
      maxPlayers: Number(req.body.maxPlayers),
      game: req.body.game,
      organizer: req.body.organizerId
    }, function (err, group) {
      if (err) console.log(err)
      res.redirect('/tournament')
    })
  },
  edit: (req, res) => {
    Tournament.findById(req.params.id, (err, tournamentItem) => {
      if (err) throw err
      Game.find({}, (err, games) => {
        if (err) throw err
        res.render('tournament/edit', {games: games, tournamentItem: tournamentItem})
      })
    })
  },
  update: (req, res) => {
    var arrOfChosenIds = []
    for (var id in req.body.game) {
      arrOfChosenIds.push(id)
    }
    Tournament.findOneAndUpdate({
      id: req.params._id
    }, {
      name: req.body.name,
      venue: req.body.venue,
      time: req.body.time,
      tournamentDate: req.body.tournamentDate,
      prizeMoney: Number(req.body.prizeMoney),
      maxPlayers: Number(req.body.maxPlayers),
      game: req.body.game
    }, (err, tournamentUpdated) => {
      if (err) throw err
      res.redirect('/tournament/' + tournamentUpdated.id)
    })
  },
  addPlayer:(req, res) => {
    Tournament.findByIdAndUpdate(req.params.id, {
      $push: {
        playerJoined : req.body.playerID
      }
    },(err, tournamentItem) => {
    if (err) throw err
            res.redirect('/tournament/' + tournamentItem.id)
    })

  },
  removePlayer:(req, res) => {
    Tournament.findByIdAndUpdate(req.params.id, {
      $pull: {
        playerJoined : req.body.playerID
      }
    },(err, tournamentItem) => {
    if (err) throw err
            res.redirect('/tournament/' + tournamentItem.id)
    })

  },

  delete: (req, res) => {
    Tournament.findByIdAndRemove(req.params.id, (err, tournamentRemoved) => {
      if (err) throw err
      res.redirect('/tournament')
    })
  }

}
module.exports = tournamentController
