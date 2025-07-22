const { optional } = require("../app");
const models = require("../models");
const Validator = require("fastest-validator");

function index(req, res) {
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
}

function show(req, res) {
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
}

function save(req, res) {
  const usuario = {
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
  const validationResponse = v.validate(usuario, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.Usuario.create(usuario).then((result) => {
    res
      .status(201)
      .json({
        message: "Usuario criado com sucesso",
        usuario: {
          id: result.id,
          ...usuario
        },
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível criar o usuario",
          error: err,
        });
      });
  });
}

function update(req, res) {
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
}

function destroy(req, res) {
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
}

module.exports = {
  index: index,
  show: show,
  save: save,
  update: update,
  destroy: destroy,
};
