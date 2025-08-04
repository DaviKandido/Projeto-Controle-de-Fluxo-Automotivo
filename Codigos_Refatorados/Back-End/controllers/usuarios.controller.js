const models = require("../models");
const Validator = require("fastest-validator");
const bcryptJS = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/", async (req, res) => {
  models.Usuario.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter os usuarios",
        error: err,
      });
    });
});

router.get("/:id", async (req, res) => {

  const id = req.params.id;

  models.Usuario.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Usuario não encontrado",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter o integrador",
        error: err,
      });
    });
});

router.post("/", async (req, res) => {

  // const usuarioExiste = await models.Usuario.findOne({where: {login: req.body.login}});
  // if (usuarioExiste) {
  //   return res.status(409).json({
  //     message: "Já existe um usuário com esse login",
  //   });
  // }

  models.Usuario.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "Já existe um usuário com esse login",
        });
      }

      bcryptJS.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({
            message: "Erro ao gerar o salt",
            error: err,
          });
        }

        bcryptJS.hash(req.body.senha, salt, (err, hash) => {
          const usuario = {
            login: req.body.login,
            senha: hash,
            nome: req.body.nome,
            ativo: req.body.ativo,
          };

          const schema = {
            nome: { type: "string", optional: false, max: "255" },
            login: { type: "string", optional: false, max: "255" },
            senha: { type: "string", optional: false, max: "255" },
            ativo: { type: "boolean", optional: false },
          };

          const v = new Validator();
          const validationResponse = v.validate(usuario, schema);

          if (validationResponse !== true) {
            return res.status(400).json({
              message: "falha na validação!",
              errors: validationResponse,
            });
          }

          models.Usuario.create(usuario)
            .then((result) => {
              res.status(201).json({
                message: "Usuario criado com sucesso",
                usuario: {
                  id: result.id,
                  ...usuario,
                },
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Não foi possível criar o usuario",
                error: err,
              });
            });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível criar o usuario",
        error: err,
      });
    });
});

router.post("/login", async (req, res) => {
  
  models.Usuario.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then((usuario) => {
      if (usuario == null) {
        res.status(401).json({
          message: "Credenciais inválidas",
        });
      } else {
        bcryptJS.compare(req.body.senha, usuario.senha, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                id: usuario.id,
                login: usuario.login,
              },
              process.env.JWT_KEY || "secret",
              (err, token) => {
                console.log(token);
                res.status(200).json({
                  message: "Autenticação realizada com sucesso",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Credenciais inválidas",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível autenticar o usuário",
        error: err,
      });
    });
});

router.put("/:id", async (req, res) => {
  
  const id = req.params.id;
  const usuarioUpdate = {
    login: req.body.login,
    senha: req.body.senha,
    nome: req.body.nome,
    ativo: req.body.ativo,
  };

  const schema = {
    nome: { type: "string", optional: false, max: "255" },
    login: { type: "string", optional: false, max: "255" },
    senha: { type: "string", optional: false, max: "255" },
    ativo: { type: "boolean", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(usuarioUpdate, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.Usuario.update(usuarioUpdate, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Usuario atualizado com sucesso",
        Usuario: {
          id: id,
          ...usuarioUpdate,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível atualizar o usuario",
        error: err,
      });
    });
});


router.delete("/:id", async (req, res) => {
  
  const id = req.params.id;

  models.Usuario.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Usuario removido com sucesso",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível remover o usuario",
        error: err,
      });
    });
});

module.exports = router;
