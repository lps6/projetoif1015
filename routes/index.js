const router = require('express').Router();

router.use("/a", require("./UsuarioRoute"))

module.exports = router