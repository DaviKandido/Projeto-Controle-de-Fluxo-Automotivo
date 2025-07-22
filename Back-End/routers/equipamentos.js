const router = require("express").Router();
const equipamentosController = require("../controllers/equipamentos.controller");
const checkAuthMiddleware = require("../middleware/check-auth");


router.get("/", equipamentosController.index);

router.get("/:id", equipamentosController.show);

router.post("/", checkAuthMiddleware.checkAuth, equipamentosController.save);

router.put("/:id", checkAuthMiddleware.checkAuth, equipamentosController.update);

router.delete("/:id", checkAuthMiddleware.checkAuth, equipamentosController.destroy);

module.exports = router;
