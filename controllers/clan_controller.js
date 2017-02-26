let Clan = require('../models/clan')
let Game = require('../models/game')
var cloudinary = require('cloudinary')

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
      res.render('clan/single_clan', { clanInfo: clanInfo })
    })
  },

  showOwn: (req, res) => {
    Clan.find({}, (err, clans) => {
      if (err) throw err
      res.render('clan/ownClan', { clans: clans })
    })
  },

  new: (req, res) => {
    Game.find({}, (err, games) => {
      if (err) throw err
      res.render('clan/new', { games: games, flash: req.flash('flash')[0]})
    })
  },

  createClan: (req, res) => {
    if (!req.body.name ) {
       req.flash('flash', {
        type: 'warning',
         message: 'Please fill in the clan name'
       })
       Game.find({}, (err, games) => {
         if (err) throw err
         res.render('clan/new', { games: games, flash: req.flash('flash')[0]})
       })
     } else {
      cloudinary.uploader.upload(req.file.path, function (result) {
        var arrOfMembersIds = []
        arrOfMembersIds.push(req.body.clanLeaderId)
        Clan.create({
          name: req.body.name,
          clanBanner: result.secure_url,
          clanLeaderId: req.body.clanLeaderId,
          gamePlayed: req.body.gamePlayed,
          clanMembers: arrOfMembersIds
        },
        function (err, output) {
          if (err) console.log(err)
          res.redirect('/clan')
        })
      })
     }
  },
  edit: (req, res) => {
    Clan.findById(req.params.id, (err, clanItem) => {
      if (err) throw err
      Game.find({}, (err, games) => {
        if (err) throw err
        res.render('clan/edit', { games: games, clanItem: clanItem})
      })
    })
  },
  update: (req, res) => {
    cloudinary.uploader.upload(req.file.path, function (result) {
      Clan.findOneAndUpdate({
        id: req.params._id
      }, {
        name: req.body.name,
        clanBanner: result.secure_url,
        gamePlayed: req.body.gamePlayed
      }, (err, clanUpdated) => {
        if (err) throw err
        res.redirect('/clan/' + clanUpdated.id)
      })
    })
  },
  addMember: (req, res) => {
    Clan.findByIdAndUpdate(req.params.id, {
      $push: {
        clanMembers: req.body.playerID
      }
    }, (err, clanItem) => {
      if (err) throw err
      res.redirect('/clan/' + clanItem.id)
    })
  },

  kickMember: (req, res) => {
    Clan.findByIdAndUpdate(req.params.id, {
      $pull: {
        clanMembers: req.body.playerID
      }
    }, (err, clanItem) => {
      if (err) throw err
      res.redirect('/clan/' + clanItem.id)
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
