const express = require('express')
const router = express.Router()
const playerController = require('../controllers/player_controller')

router.get('/', playerController.list)

router.get('/:id/edit', playerController.edit)

router.get('/signup', playerController.renderSignup)

router.get('/login', playerController.renderLogin)

router.post('/signup', playerController.signup)

router.post('/login', playerController.login)

router.put('/:id', playerController.update)

router.delete('/:id', playerController.delete)

module.exports = router
