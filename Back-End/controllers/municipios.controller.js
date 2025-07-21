const models = require("../models");
const Validator = require("fastest-validator");

function index(req, res) {
  models.municipio
    .findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter os municipios",
        error: err,
      });
    });
}

function show(req, res) {
  const id = req.params.id;
  models.municipio
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Municipio não encontrado",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter o municipio",
        error: err,
      });
    });
}

function save(req, res) {
  const municipio = {
    codigo: req.body.codigo,
    descricao: req.body.descricao,
    uf: req.body.uf,
  };

  const schema = {
    codigo: { type: "number", options: false },
    descricao: { type: "string", options: false, max: "255" },
    uf: {
      type: "enum",
      values: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
      options: false,
    },
  };

  const v = new Validator();
  const validationResponse = v.validate(municipio, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.municipio.create(municipio).then((result) => {
    res
      .status(201)
      .json({
        message: "Municipio criado com sucesso",
        municipio: {
          id: result.id,
          ...municipio,
        },
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível incluir o municipio",
          error: err,
        });
      });
  });
}

function update(req, res) {
  const id = req.params.id;
   const municipioUpdate = {
     codigo: req.body.codigo,
     descricao: req.body.descricao,
     uf: req.body.uf,
   };

   const schema = {
     codigo: { type: "number", options: false },
     descricao: { type: "string", options: false, max: "255" },
     uf: {
       type: "enum",
       values: [
         "AC",
         "AL",
         "AP",
         "AM",
         "BA",
         "CE",
         "DF",
         "ES",
         "GO",
         "MA",
         "MT",
         "MS",
         "MG",
         "PA",
         "PB",
         "PR",
         "PE",
         "PI",
         "RJ",
         "RN",
         "RS",
         "RO",
         "RR",
         "SC",
         "SP",
         "SE",
         "TO",
       ],
       options: false,
     },
   };

   const v = new Validator();
   const validationResponse = v.validate(municipioUpdate, schema);

   if (validationResponse !== true) {
     return res.status(400).json({
       message: "falha na validação!",
       errors: validationResponse,
     });
   }

  models.municipio
    .update(municipioUpdate, {
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.status(200).json({
        message: "Municipio atualizado com sucesso",
        municipio: {
          id: id,
          ...municipioUpdate,
        },

      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível atualizar o municipio",
        error: err,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.municipio
    .destroy({
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.status(200).json({
        message: "Municipio removido com sucesso",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível remover o municipio",
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
