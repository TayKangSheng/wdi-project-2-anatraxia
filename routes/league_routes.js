const express = require('express')
const router = express.Router()
const leagueController = require('../controllers/league_controller')

router.get('/', leagueController.list)

router.get('/new', leagueController.new)

router.get('/:id', leagueController.listOne)

router.get('/:id/edit', leagueController.edit)

router.post('/', leagueController.create)

router.put('/:id', leagueController.update)

router.delete('/:id', leagueController.delete)

module.exports = router
