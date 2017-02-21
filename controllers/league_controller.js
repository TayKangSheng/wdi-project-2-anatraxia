let League = require('../models/league')
let Game = require('../models/game')

let leagueController = {
  list: (req, res) => {
    League.find({}, (err, leagues) => {
      if (err) throw err
      res.render('league/index', { leagues: leagues })
    })
  },

  new: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('league/new', {games: games})
    })
  },

  listOne: (req, res) => {
    League.findById(req.params.id, (err, leagueItem) => {
      if (err) throw err
      res.render('league/single_league', { leagueItem: leagueItem })
    })
  },

  show: (req, res) => {
    League.findById(req.params.id)
    .exec((err, leagueInfo) => {
      if (err) throw err
      res.render('league/show', { leagueInfo: leagueInfo })
    })
  },

  create: (req, res) => {
    var arrOfChosenIds = []
    for (var id in req.body.game) {
      arrOfChosenIds.push(id)
    }
    League.create({
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
      res.redirect('/league')
    })
  },
  edit: (req, res) => {
    League.findById(req.params.id, (err, leagueItem) => {
      if (err) throw err
      Game.find({}, (err, games) => {
        if (err) throw err
        res.render('league/edit', {games: games, leagueItem: leagueItem})
      })
    })
  },
  update: (req, res) => {
    var arrOfChosenIds = []
    for (var id in req.body.game) {
      arrOfChosenIds.push(id)
    }
    League.findOneAndUpdate({
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
    }, (err, leagueUpdated) => {
      if (err) throw err
      res.redirect('/league/' + leagueUpdated.id)
    })
  },

  delete: (req, res) => {
    League.findByIdAndRemove(req.params.id, (err, leagueRemoved) => {
      if (err) throw err
      res.redirect('/league')
    })
  }

}
module.exports = leagueController
