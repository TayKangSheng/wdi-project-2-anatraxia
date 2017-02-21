const express = require('express')
const router = express.Router()
const gameController = require('../controllers/game_controller')

router.get('/', gameController.list)

router.get('/new', gameController.new)

router.post('/', gameController.create)

module.exports = router
