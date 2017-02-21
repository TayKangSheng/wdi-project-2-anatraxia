let Club = require('../models/club')

let clubController = {
  list: (req, res) => {
    Club.find({}, (err, clubs) => {
      if (err) throw err
      res.render('club/index', { clubs: clubs })
    })
  },

  new: (req, res) => {
    res.render('club/new')
  },
  listOne: (req, res) => {
    Club.findById(req.params.id, (err, clubItem) => {
      if (err) throw err
      res.render('club/single_club', { clubItem: clubItem })
    })
  },

  show: (req, res) => {
    Club.findById(req.params.id)
    .populate('league')
    .exec((err, clubInfo) => {
      if (err) throw err
      res.render('club/show', { clubInfo: clubInfo })
    })
  },

  create: (req, res) => {
    Club.create({
      name: req.body.name,
      homeKitColor: req.body.homeKitColor,
      awayKitColor: req.body.awayKitColor,
      thirdKitColor: req.body.thirdKitColor,
      teamBadge: req.body.teamBadge,
      manager: {
        name: req.body.managerName,
        email: req.body.managerEmail,
        mobile: Number(req.body.managerMobile)
      }
    }, function (err, group) {
      if (err) console.log(err)
      res.redirect('/club')
    })
  },
  edit: (req, res) => {
    Club.findById(req.params.id, (err, clubEdit) => {
      if (err) throw err
      res.render('club/edit', { clubEdit: clubEdit })
    })
  },
  update: (req, res) => {
    Club.findOneAndUpdate({
      id: req.params._id
    }, {
      name: req.body.club.name,
      homeKitColor: req.body.club.homeKitColor,
      awayKitColor: req.body.club.awayKitColor,
      thirdKitColor: req.body.club.thirdKitColor,
      teamBadge: req.body.club.teamBadge,
      teamCaptain: req.body.club.player.id,
      teamManager: req.body.club.manager.id,
      leaguePlaying: req.body.club.league.id
    }, (err, clubUpdated) => {
      if (err) throw err
      res.redirect('/club/' + clubUpdated.id)
    })
  },

  delete: (req, res) => {
    Club.findByIdAndRemove(req.params.id, (err, clubRemoved) => {
      if (err) throw err
      res.redirect('/club')
    })
  }

}
module.exports = clubController
