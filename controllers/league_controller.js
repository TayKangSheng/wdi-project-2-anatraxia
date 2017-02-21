let League = require('../models/league')

let leagueController = {
  list: (req, res) => {
    League.find({}, (err, leagues) => {
      if (err) throw err
      res.render('league/index', { leagues: leagues })
    })
  },

  new: (req, res) => {
    res.render('league/new')
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
    League.create({
      name: req.body.name,
      day: req.body.day,
      time: req.body.time,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      organizer: req.body.organizer,
      organizerEmail: req.body.organizerEmail,
      organizerContact: req.body.organizerContact
    }, function (err, group) {
      if (err) throw err
      res.redirect('/league')
    })
  },
  edit: (req, res) => {
    League.findById(req.params.id, (err, leagueEdit) => {
      if (err) throw err
      res.render('league/edit', { leagueEdit: leagueEdit })
    })
  },
  update: (req, res) => {
    League.findOneAndUpdate({
      id: req.params._id
    }, {
      name: req.body.name,
      day: req.body.day,
      time: req.body.time,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
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
