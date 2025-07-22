const { optional } = require("../app");
const models = require("../models");
const Validator = require("fastest-validator");

function index(req, res) {
  models.Integrador.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter os integradores",
        error: err,
      });
    });
}

function show(req, res) {
  const id = req.params.id;

  models.Integrador.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Integrador não encontrado",
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
  const integrador = {
    nome: req.body.nome,
  };
  console.log(integrador);

  const schema = {
    nome: { type: "string", optional: false, max: "255" },
  };

  const v = new Validator();
  const validationResponse = v.validate(integrador, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.Integrador.create(integrador).then((result) => {
    res
      .status(201)
      .json({
        message: "Integrador criado com sucesso",
        integrador: result,
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível criar o integrador",
          error: err,
        });
      });
  });
}

function update(req, res) {
  const id = req.params.id;
  const updatedIntegrador = {
    nome: req.body.nome,
  };

  const schema = {
    nome: { type: "string", optional: false, max: "255" },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedIntegrador, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.Integrador.update(updatedIntegrador, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Integrador atualizado com sucesso",
        integrador: {
          id: id,
          ...result,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível atualizar o integrador",
        error: err,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Integrador.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Integrador removido com sucesso",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível remover o integrador",
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
