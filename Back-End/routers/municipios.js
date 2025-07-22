const router = require("express").Router();
const municipiosController = require("../controllers/municipios.controller");
const checkAuthMiddleware = require("../middleware/check-auth");


router.get("/", municipiosController.index);

router.get("/:id", municipiosController.show);

router.post("/", checkAuthMiddleware.checkAuth,  municipiosController.save);

router.put("/:id", checkAuthMiddleware.checkAuth, municipiosController.update);

router.delete("/:id", checkAuthMiddleware.checkAuth, municipiosController.destroy);

module.exports = router;
