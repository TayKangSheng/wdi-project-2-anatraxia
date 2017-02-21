var mongoose = require('mongoose')
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the club's name"]
  },
  teamBadge: {type: String,
    required: [ true, "Please fill up the club's team badge"]},
  manager: {
    name: {type: String,required: [ true, "Please fill up the manager's name"]},
    email: {type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: emailRegex },
    mobile: { type: Number, required: [ true, "Please fill up the manager's mobile no."] }
  },
  leaguePlaying: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }]
})

var Club = mongoose.model('Club', clubSchema)

module.exports = Club
