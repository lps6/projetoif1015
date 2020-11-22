const UsuarioController = require('../Controllers/UsuarioController');
const router = require('express').Router();
const {getLastPrice} = require("../client");



router.get('/', UsuarioController.get);
router.post('/trackers', UsuarioController.post)
router.get('/events', UsuarioController.eventHandler)

module.exports = router

