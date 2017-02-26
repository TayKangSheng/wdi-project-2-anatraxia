const express = require('express')
const router = express.Router()
const playerController = require('../controllers/player_controller')

router.get('/signup', playerController.renderSignup)

router.get('/login', playerController.renderLogin)

router.post('/signup', playerController.signup)

router.post('/login', playerController.login)

module.exports = router
