const jwt = require("jsonwebtoken");
const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/check-auth");
const UsuarioService = require("../services/usuario.service");

const usuarioService = new UsuarioService();

router.get("/", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const usuarios = await usuarioService.findAll();

    if (!usuarios || usuarios.length == 0)
      return res.status(404).json({
        message: "Nenhum usuario encontrado",
      });

    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter os usuarios",
      error: err.message,
    });
  }
});

router.get("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const usuario = await usuarioService.findById(id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario não encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter o usuario",
      error: err.message,
    });
  }
});

router.post("/sign-up", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const usuarioExiste = await usuarioService.findOne(req.body.login);

    if (usuarioExiste) {
      return res.status(409).json({
        message: "Já existe um usuário com esse login, tente outro",
      });
    }

    const usuario = {
      login: req.body.login,
      senha: req.body.senha,
      nome: req.body.nome,
      ativo: req.body.ativo,
    };

    if (usuarioService.validaSchema(usuario) !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }
    const UsuarioCriado = await usuarioService.create(usuario);

    if (!UsuarioCriado) {
      return res.status(500).json({
        message: "Não foi possível criar o usuário",
      });
    }

    res.status(201).json(UsuarioCriado);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível criar o usuário",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const usuario = await usuarioService.findOne(req.body.login);

    if (!usuario) {
      return res.status(401).json({
        message: "Credenciais inválidas",
      });
    }

    const senhaCorreta = await usuarioService.compareSenha(req.body.senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        message: "Credenciais inválidas",
      });
    }

    jwt.sign(
      {
        id: usuario.id,
        login: usuario.login,
      },
      process.env.JWT_KEY || "secret",
      (err, token) => {
        res.status(200).json({
          message: "Autenticação realizada com sucesso",
          token: token,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível autenticar o usuário",
      error: err.message,
    });
  }
});

router.put("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try{ 
    const id = req.params.id;

      const usuarioUpdate = {
        login: req.body.login,
        senha: req.body.senha,
        nome: req.body.nome,
        ativo: req.body.ativo,
      };


    if (usuarioService.validaSchema(usuarioUpdate) !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

      const usuario = await usuarioService.findOne(req.body.login);

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }

      const senhaCorreta = await usuarioService.compareSenha(req.body.senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({
          message: "Credenciais inválidas",
          
        });
      }

      const usuarioAtualizado = await usuarioService.update(id, usuarioUpdate);

      if(usuarioAtualizado){
        res.status(200).json({
          message: "Usuário atualizado com sucesso",
          usuario: usuarioUpdate,
        });
      }

  } catch (err) {
    res.status(500).json({
      message: "Não foi possível atualizar o usuario",
      error: err.message,
    });

  }
});

router.delete("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try{
    const id = req.params.id;
    
    const usuario = await usuarioService.findById(id);
    
    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    
    const usuarioDeletado = await usuarioService.delete(id);  
    
    if (usuarioDeletado){
      res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    }

  }catch (err) {
    res.status(500).json({
      message: "Não foi possível remover o usuario",
      error: err.message,
    });
  }
});

module.exports = router;
