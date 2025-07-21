const router = require("express").Router();
const municipiosController = require("../controllers/municipios.controller");

router.get("/", municipiosController.index);

router.get("/:id", municipiosController.show);

router.post("/", municipiosController.save);

router.put("/:id", municipiosController.update);

router.delete("/:id", municipiosController.destroy);

module.exports = router;
