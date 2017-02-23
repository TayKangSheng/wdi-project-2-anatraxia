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

  listOne: (req, res) => {
    Tournament.findById(req.params.id, (err, tournamentItem) => {
      if (err) throw err
      res.render('tournament/single_tournament', { tournamentItem: tournamentItem })
    })
  },

  show: (req, res) => {
    Tournament.findById(req.params.id)
    .exec((err, tournamentInfo) => {
      if (err) throw err
      res.render('tournament/show', { tournamentInfo: tournamentInfo })
    })
  },

  create: (req, res) => {
    var arrOfChosenIds = []
    for (var id in req.body.game) {
      arrOfChosenIds.push(id)
    }
    Tournament.create({
      name: req.body.name,
      venue: req.body.venue,
      time: req.body.time,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      prizeMoney: Number(req.body.prizeMoney),
      maxClub: Number(req.body.maxClub),
      game: arrOfChosenIds,
      organizer: req.body.organizer,
      organizerEmail: req.body.organizerEmail,
      organizerContact: req.body.organizerContact
    }, function (err, group) {
      if (err) throw err
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
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      prizeMoney: Number(req.body.prizeMoney),
      maxClub: Number(req.body.maxClub),
      game: arrOfChosenIds,
      organizer: req.body.organizer,
      organizerEmail: req.body.organizerEmail,
      organizerContact: req.body.organizerContact
    }, (err, tournamentUpdated) => {
      if (err) throw err
      res.redirect('/tournament/' + tournamentUpdated.id)
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
