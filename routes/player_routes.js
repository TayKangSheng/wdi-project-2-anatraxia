const express = require('express')
const router = express.Router()
const playerController = require('../controllers/player_controller')

router.get('/', playerController.list)

router.get('/new', playerController.new)

router.get('/:id', playerController.listOne)

router.get('/:id/edit', playerController.edit)

router.post('/', playerController.create)

router.put('/:id', playerController.update)

router.delete('/:id', playerController.delete)

module.exports = router
