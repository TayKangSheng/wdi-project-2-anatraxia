var mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the player's name"]
  },
  dob: { type: Date, default: Date.now },
  gender: {
    type: String,
    required: [ true, "Please fill up the player's gender"]
  },
  gamePlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  local: {
    email: {type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: emailRegex},
    password: {
      type: String,
      required: [true, 'Please fill up the password']
    }
  },
  mobile: {
     type: Number,
     required: [ true, "Please fill up the player's mobile no."] },
  membership: {
    type: String,
    enum: ['member', 'elder'],
    default: 'member'
  },
  isTeamCaptain: {type: String,
  enum: ['Yes', 'No'],
  default: 'No'},
  club: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clan' }]
})

playerSchema.virtual('age').get(function () {
  var todayDate = new Date()
  var age = todayDate.getFullYear() - this.dob.getFullYear()
  return age
})

playerSchema.statics.encrypt = function (password) {
 return bcrypt.hashSync(password, 10)
}

playerSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword,this.local.password)
}

var Player = mongoose.model('Player', playerSchema)

module.exports = Player
