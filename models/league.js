var mongoose = require('mongoose')

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the league's name"]
  },
  day: {type: String,
    enum: ['weekday', 'weekend'],
    default: 'weekend'},
  time: {type: String,
    enum: ['morning', 'afternoon', 'night'],
    default: 'night'},
  startDate: {type: Date,
  required: [ true, "Please fill up the League's start date"]},
  endDate: {type: Date,
  required: [ true, "Please fill up the League's end date"]},
  organizer: {
    type: String,
    required: [ true, "Please fill up the Organizer's name"]
  },
  organizerEmail: {type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex},
  organizerContact: { type: Number, required: [ true, "Please fill up the organizer's contact no."] }

})

var League = mongoose.model('League', leagueSchema)

module.exports = League
