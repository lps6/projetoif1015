const UsuarioController = require('../Controllers/UsuarioController');
const router = require('express').Router();
const {getLastPrice} = require("../client");



router.get('/', UsuarioController.get);


module.exports = router

