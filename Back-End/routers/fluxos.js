const router = require("express").Router();
const fluxosController = require("../controllers/fluxos.controller");

router.get("/", fluxosController.index);

router.get("/:id", fluxosController.show);

router.post("/", fluxosController.save);

router.put("/:id", fluxosController.update);

router.delete("/:id", fluxosController.destroy);

module.exports = router;
