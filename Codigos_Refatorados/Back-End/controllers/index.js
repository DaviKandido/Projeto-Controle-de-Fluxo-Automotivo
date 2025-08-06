
const express = require('express');
const router = express.Router();


router.use("/usuarios", require("./usuarios.controller"));
router.use("/integradores", require("./integradores.controller"));
router.use("/municipios", require("./municipios.controller"));
router.use("/equipamentos", require("./equipamentos.controller"));
router.use("/fluxos", require("./fluxos.controller"));

module.exports = router;
