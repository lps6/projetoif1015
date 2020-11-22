const router = require("express").Router();

router.use("/stocks", require("./UsuarioRoute"))

module.exports = router;
