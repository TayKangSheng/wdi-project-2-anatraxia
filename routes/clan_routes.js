const express = require('express')
const router = express.Router()
const clanController = require('../controllers/clan_controller')

router.get('/', clanController.list)

router.get('/:id', clanController.show)

router.get('/:id/edit', clanController.edit)

router.get('/new', clanController.new)

router.post('/new', clanController.createClan)


router.put('/:id', clanController.update)

router.put('/AddMember/:id', clanController.addMember)

router.delete('/:id', clanController.delete)

module.exports = router
