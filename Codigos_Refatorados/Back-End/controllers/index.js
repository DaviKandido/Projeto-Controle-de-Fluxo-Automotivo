// 'use strict';
// const express = require('express');
// const authService = require('../../services/auth.service');
// const { logCrudOperations } = require('../../util/log-middleware');
// const router = express.Router();

// router.use('/info', require('./info.controller'));
// router.use('/auth', require('./auth.controller'));
// router.use('/usuario', authService.jwtAuthorize(), require('./usuarios.controller'));

// module.exports = router;

const express = require('express');
const router = express.Router();


router.use("/usuarios", require("./usuarios.controller"));
router.use("/integradores", require("./integradores.controller"));
router.use("/municipios", require("./municipios.controller"));
router.use("/equipamentos", require("./equipamentos.controller"));
router.use("/fluxos", require("./fluxos.controller"));

module.exports = router;
