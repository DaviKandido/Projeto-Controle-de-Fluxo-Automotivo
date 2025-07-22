const router = require("express").Router();
const usuariosController = require("../controllers/usuarios.controller");
const checkAuthMiddleware = require("../middleware/check-auth");


router.get("/", checkAuthMiddleware.checkAuth, usuariosController.index);

router.get("/:id", checkAuthMiddleware.checkAuth, usuariosController.show);

router.post("/sign-up", usuariosController.singUp);

router.post("/login", usuariosController.login);

router.put("/:id", checkAuthMiddleware.checkAuth, usuariosController.update);

router.delete("/:id", checkAuthMiddleware.checkAuth, usuariosController.destroy);

module.exports = router;
