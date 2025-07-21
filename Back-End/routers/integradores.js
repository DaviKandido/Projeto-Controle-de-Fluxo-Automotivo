const router = require("express").Router();
const integradoresController = require("../controllers/integradores.Controller");

router.get("/", integradoresController.index);

router.get("/:id", integradoresController.show);

router.post("/", integradoresController.save);

router.put("/:id", integradoresController.update);

router.delete("/:id", integradoresController.destroy);

module.exports = router;
