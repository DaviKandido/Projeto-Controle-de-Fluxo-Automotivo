const router = require("express").Router();
const usuariosController = require("../controllers/usuarios.controller");

router.get("/", usuariosController.index);

router.get("/:id", usuariosController.show);

router.post("/", usuariosController.save);

router.put("/:id", usuariosController.update);

router.delete("/:id", usuariosController.destroy);

module.exports = router;
