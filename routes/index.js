const router = require('express').Router();

router.use("/usuarios", require("./UsuarioRoute"))

module.exports = router