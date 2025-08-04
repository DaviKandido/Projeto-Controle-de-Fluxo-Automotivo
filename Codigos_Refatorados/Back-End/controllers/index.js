// 'use strict';
// const express = require('express');
// const authService = require('../../services/auth.service');
// const { logCrudOperations } = require('../../util/log-middleware');
// const router = express.Router();

// router.use('/info', require('./info.controller'));
// router.use('/auth', require('./auth.controller'));
// router.use('/usuario', authService.jwtAuthorize(), require('./usuarios.controller'));

// module.exports = router;

const express = require();
const router = express.router();
const checkAuthMiddleware = require("../middleware/check-auth");

router.use("/usuarios", checkAuthMiddleware.checkAuth, require("./usuarios.controller"));
router.use("/integradores", checkAuthMiddleware.checkAuth, require("./integradores.controller"));
router.use("/municipios", checkAuthMiddleware.checkAuth, require("./municipios.controller"));
router.use("/equipamentos", checkAuthMiddleware.checkAuth, require("./equipamentos.controller"));
router.use("/fluxos", checkAuthMiddleware.checkAuth, require("./fluxos.controller"));

module.exports = router;
