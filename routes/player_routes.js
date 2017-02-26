const express = require('express')
const router = express.Router()
const playerController = require('../controllers/player_controller')

router.get('/', playerController.list)

router.get('/show/:id', playerController.show)

router.get('/:id/edit', playerController.edit)

router.put('/:id', playerController.update)

router.delete('/:id', playerController.delete)

router.get('/logout', playerController.logout)

module.exports = router
