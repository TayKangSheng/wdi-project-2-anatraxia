const express = require('express')
const router = express.Router()
const tournamentController = require('../controllers/tournament_controller')

router.get('/', tournamentController.list)

router.get('/new', tournamentController.new)

router.get('/:id', tournamentController.listOne)

router.get('/:id/edit', tournamentController.edit)

router.post('/', tournamentController.create)

router.put('/:id', tournamentController.update)

router.delete('/:id', tournamentController.delete)

module.exports = router
