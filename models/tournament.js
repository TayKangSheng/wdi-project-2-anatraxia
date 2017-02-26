var mongoose = require('mongoose')

var tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the Tournament's name"]
  },
  venue: {type: String,
    required: [ true, "Please fill up the Tournament's venue"]},
    time: {type: String, required: [ true, "Please fill up the Tournament's time"]},
  tournamentDate: {type: Date,
    required: [ true, "Please fill up the Tournament's date"]},
  prizeMoney: {type: Number,
    required: [ true, "Please fill up the Tournament's prize money"]},
  maxPlayers: {type: Number,
    required: [ true, "Please fill up the Tournament's max no. of players"]},
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  playerJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
})
tournamentSchema.virtual('totalPlayers').get(function () {
  return this.playerJoined.length
})

var Tournament = mongoose.model('Tournament', tournamentSchema)

module.exports = Tournament
