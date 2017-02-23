let Clan = require('../models/clan')
let Tournament = require('../models/tournament')
let Game = require('../models/game')

let clanController = {
  list: (req, res) => {
    Clan.find({}, (err, clans) => {
      if (err) throw err
      res.render('clan/index', { clans: clans })
    })
  },

  show: (req, res) => {
    Clan.findById(req.params.id)
    .populate('clanLeaderId')
    .populate('gamePlayed')
    .populate('clanMembers')
    .exec((err, clanInfo) => {
      if (err) throw err
      console.log(clanInfo);
      res.render('clan/single_clan', { clanInfo: clanInfo })
    })
  },

  new: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('clan/new', { games : games})
    })
  },

  createClan: (req, res) => {
    var arrOfGamesIds = []
      for (var id in req.body.gamePlayed) {
        arrOfGamesIds.push(id)
      }
    var arrOfMembersIds = []
    arrOfMembersIds.push(req.body.clanLeaderId)
    Clan.create({
      name: req.body.name,
      clanBanner: req.body.clanBanner,
      clanLeaderId: req.body.clanLeaderId,
      gamePlayed: arrOfGamesIds,
      clanMembers: arrOfMembersIds
    }, function (err, output) {
      if (err) console.log(err)
      res.redirect('/clan')
    })
  },
  edit: (req, res) => {
    Clan.findById(req.params.id, (err, clanItem) => {
      if (err) throw err
      var currentDate = Date.now()
      Tournament.find({'endDate': {'$gte': currentDate}}, (err, leagues) => {
        if (err) throw err
        res.render('clan/edit', { leagues: leagues, clanItem: clanItem })
      })
    })
  },
  update: (req, res) => {
    var arrOfChosenIds = []
    for (var id in req.body.leaguePlaying) {
      arrOfChosenIds.push(id)
    }
    Clan.findOneAndUpdate({
      id: req.params._id
    }, {
      name: req.body.name,
      homeKitColor: req.body.homeKitColor,
      awayKitColor: req.body.awayKitColor,
      thirdKitColor: req.body.thirdKitColor,
      teamBadge: req.body.teamBadge,
      manager: {
        name: req.body.managerName,
        email: req.body.managerEmail,
        mobile: Number(req.body.managerMobile)
      },
      leaguePlaying: arrOfChosenIds
    }, (err, clanUpdated) => {
      if (err) throw err
      res.redirect('/clan/' + clanUpdated.id)
    })
  },
  addMember:(req, res) => {
    var arrOfClanMembersIds = []
    Clan.findById(req.params.id, (err, clanItem) => {
      if (err) throw err
      for (var id in clanItem.clanMembers) {
        arrOfClanMembersIds.push(id)
      }
    })
    arrOfClanMembersIds.push(req.body.playerID)
    Clan.findOneAndUpdate({
      id: req.params._id
    }, {clanMembers: arrOfClanMembersIds}, (err, clanUpdated) => {
      if (err) throw err
      res.redirect('/clan/' + clanUpdated.id)
    })
  },

  delete: (req, res) => {
    Clan.findByIdAndRemove(req.params.id, (err, clanRemoved) => {
      if (err) throw err
      res.redirect('/clan')
    })
  }

}
module.exports = clanController
