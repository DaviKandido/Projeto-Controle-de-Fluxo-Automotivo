const router = require("express").Router();
const fluxosController = require("../controllers/fluxos.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

router.get("/", checkAuthMiddleware.checkAuth, fluxosController.index);

router.get("/:id", checkAuthMiddleware.checkAuth, fluxosController.show);

// router.post("/", fluxosController.save);

// router.put("/:id", fluxosController.update);

router.delete("/:id", checkAuthMiddleware.checkAuth, fluxosController.destroy);

module.exports = router;
