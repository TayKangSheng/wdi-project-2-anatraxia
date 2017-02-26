const express = require('express')
const router = express.Router()
const gameController = require('../controllers/game_controller')
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

router.get('/', gameController.list)

router.get('/new', gameController.new)

router.post('/', upload.single('gameCover'), gameController.create)

module.exports = router
