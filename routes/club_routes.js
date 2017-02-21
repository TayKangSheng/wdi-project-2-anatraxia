const express = require('express')
const router = express.Router()
const clubController = require('../controllers/club_controller')

router.get('/', clubController.list)

router.get('/new', clubController.new)

router.get('/:id', clubController.listOne)

router.get('/:id/edit', clubController.edit)

router.post('/', clubController.create)

router.put('/:id', clubController.update)

router.delete('/:id', clubController.delete)

module.exports = router
