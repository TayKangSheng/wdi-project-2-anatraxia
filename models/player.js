var mongoose = require('mongoose')

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the player's name"]
  },
  address: {
    type: String,
    required: [ true, "Please fill up the player's address"]
  },
  dob: { type: Date, default: Date.now },
  gender: {
    type: String,
    required: [ true, "Please fill up the player's gender"]
  },
  position: String,
  email: {type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex},
  mobile: { type: Number, required: [ true, "Please fill up the player's mobile no."] },
  status: {
    type: String,
    enum: ['injured', 'fit'],
    default: 'fit'
  },
  isTeamCaptain: {type: String,
  enum: ['Yes', 'No'],
  default: 'No'},
  club: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }]
})

playerSchema.virtual('age').get(function () {
  var todayDate = new Date()
  var age = todayDate.getFullYear() - this.dob.getFullYear()
  return age
})

var Player = mongoose.model('Player', playerSchema)

module.exports = Player
