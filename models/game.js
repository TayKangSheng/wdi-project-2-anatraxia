var mongoose = require('mongoose')

var gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please fill up the game's name"]
  },
  type: {
    type: String,
    required: [ true, "Please fill up the game's type"]
  },
  publisher: {
    type: String,
    required: [ true, 'Please fill up the publisher']
  },
  gameCover: {
    type: String,
    required: [ true, 'Please fill up the Game Cover URL']
  }
})

var Game = mongoose.model('Game', gameSchema)

module.exports = Game
