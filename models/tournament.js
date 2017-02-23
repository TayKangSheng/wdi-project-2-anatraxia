var mongoose = require('mongoose')

var tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the Tournament's name"]
  },
  venue: {type: String,
    required: [ true, "Please fill up the Tournament's venue"]},
  time: {type: String, required: [ true, "Please fill up the Tournament's time"]},
  startDate: {type: Date,
    required: [ true, "Please fill up the Tournament's start date"]},
  endDate: {type: Date,
    required: [ true, "Please fill up the Tournament's end date"]},
  prizeMoney: {type: Number,
    required: [ true, "Please fill up the Tournament's prize money"]},
  maxClan: {type: Number,
    required: [ true, "Please fill up the Tournament's max no. of clan"]},
  game: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  organizerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
})

var Tournament = mongoose.model('Tournament', tournamentSchema)

module.exports = Tournament
