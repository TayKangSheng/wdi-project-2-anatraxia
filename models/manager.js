var mongoose = require('mongoose')

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

var managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the manager's name"]
  },
  address: {
    type: String,
    required: [ true, "Please fill up the manager's address"]
  },
  dob: { type: Date, default: Date.now },
  gender: {
    type: String,
    required: [ true, "Please fill up the manager's gender"]
  },
  email: {type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex},
  mobile: { type: Number, required: [ true, "Please fill up the manager's mobile no."] },
  club: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }]
})

managerSchema.virtual('age').get(function () {
  var todayDate = new Date()
  var age = todayDate.getFullYear() - this.dob.getFullYear()
  return age
})

var Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager
