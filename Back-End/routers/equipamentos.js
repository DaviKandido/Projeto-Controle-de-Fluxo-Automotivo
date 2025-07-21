const router = require("express").Router();
const equipamentosController = require("../controllers/equipamentos.controller");

router.get("/", equipamentosController.index);

router.get("/:id", equipamentosController.show);

router.post("/", equipamentosController.save);

router.put("/:id", equipamentosController.update);

router.delete("/:id", equipamentosController.destroy);

module.exports = router;
