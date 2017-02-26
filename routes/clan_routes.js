const express = require('express')
const router = express.Router()
const clanController = require('../controllers/clan_controller')
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

router.get('/', clanController.list)

router.get('/new', clanController.new)

router.get('/ownClan', clanController.showOwn)

router.get('/:id', clanController.show)

router.get('/:id/edit', clanController.edit)

router.post('/new', upload.single('clanBanner'), clanController.createClan)

router.put('/:id', upload.single('clanBanner'), clanController.update)

router.put('/AddMember/:id', clanController.addMember)

router.put('/KickMember/:id', clanController.kickMember)

router.delete('/:id', clanController.delete)

module.exports = router
