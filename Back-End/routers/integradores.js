const router = require("express").Router();
const integradoresController = require("../controllers/integradores.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

router.get("/", integradoresController.index);

router.get("/:id", integradoresController.show);

router.post("/", checkAuthMiddleware.checkAuth, integradoresController.save);

router.put("/:id", checkAuthMiddleware.checkAuth, integradoresController.update);

router.delete("/:id", checkAuthMiddleware.checkAuth, integradoresController.destroy);

module.exports = router;
