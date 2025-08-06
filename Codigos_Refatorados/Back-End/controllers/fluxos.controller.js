const models = require("../models");
const { Op } = require("sequelize");
const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/check-auth");

const FluxoService = require("../services/fluxo.service");
const fluxoService = new FluxoService();

router.get("/", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const fluxos = await fluxoService.findAll(req.query);

    if (!fluxos || fluxos.length == 0)
      return res.status(404).json({
        message: "Nenhum fluxo encontrado",
      });

    res.status(200).json(fluxos);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter os fluxos solicitados",
      error: err,
    });
  }
});

router.get("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const fluxo = await fluxoService.findByPk(req.params.id);

    if (!fluxo) {
      return res.status(404).json({
        message: "Fluxo não encontrado",
      });
    }

    res.status(200).json(fluxo);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter o fluxo solicitado",
      error: err.message,
    });
  }
});

router.get("/count/:id_equipamento", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const countFluxos = await fluxoService.cont(req.query, req.params.id_equipamento);

    if (typeof countFluxos === "number") {
      res.status(200).json(countFluxos);
    } else {
      res.status(404).json({
        message: "Fluxos por equipamento não encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter a contagem de fluxos por equipamento",
      error: err.message,
    });
  }
});

// Fluxo virão de um equipamento externo
// function save(req, res) { }
// async function update(req, res) { }

router.delete("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const fluxo = await models.Fluxo.findByPk(id);

    if (!fluxo) {
      return res.status(404).json({
        message: "Fluxo não encontrado",
      });
    }

    const deleted = await fluxo.destroy(req.params.id);

    deleted
      ? res.status(200).json({ message: "Fluxo removido com sucesso" })
      : res.status(500).json({ message: "Não foi possível remover o Fluxo" });
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível remover o Fluxo",
      error: err.message,
    });
  }
});

module.exports = router;
