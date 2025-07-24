const models = require("../models");
const { Op } = require("sequelize");

function index(req, res) {
  // Extrai e converte o limit, se existir
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  delete req.query.limit;

  const whereEquipamento = {};
  if (req.query.CodEquipamento !== undefined)
    whereEquipamento.codigo = req.query.CodEquipamento;
  if (req.query.faixaEquipamento !== undefined)
    whereEquipamento.faixa = req.query.faixaEquipamento;

  const whereFluxos = {};
  if (req.query.placa !== undefined) whereFluxos.placa = req.query.placa;

  if (req.query.dataInicio !== undefined || req.query.dataFim !== undefined) {
    whereFluxos.data = {};
    if (req.query.dataInicio !== undefined) {
      whereFluxos.data[Op.gte] = req.query.dataInicio;
    }
    if (req.query.dataFim !== undefined) {
      whereFluxos.data[Op.lte] = req.query.dataFim;
    }
  }

  if (req.query.horaInicio !== undefined || req.query.horaFim !== undefined) {
    whereFluxos.hora = {};
    if (req.query.horaInicio !== undefined) {
      whereFluxos.hora[Op.gte] = req.query.horaInicio;
    }
    if (req.query.horaFim !== undefined) {
      whereFluxos.hora[Op.lte] = req.query.horaFim;
    }
  }

  models.Fluxo.findAll({
    limit: limit,
    order: [["data", "DESC"]],
    where: { ...whereFluxos },
    include: [
      {
        model: models.Equipamento,
        where: whereEquipamento,
      },
    ],
  })
    .then((result) => {

      if (!result) {
        res.status(404).json({
          message: "Fluxos não encontrados",
        });
      }

      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter os fluxos solicitados",
        error: err,
      });
    });
}

function show(req, res) {
  const id = req.params.id;
  models.Fluxo.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Fluxo não encontrado",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter o fluxo solicitado",
        error: err,
      });
    });
}

// Fluxo virão de um equipamento externo
// function save(req, res) { }
// async function update(req, res) { }

function destroy(req, res) {
  const id = req.params.id;

  models.Fluxo.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Fluxo removido com sucesso",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível remover o Fluxo",
        error: err,
      });
    });
}

module.exports = {
  index: index,
  show: show,
  // save: save,
  // update: update,
  destroy: destroy,
};
