const models = require("../models");
const moment = require("moment");
const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/check-auth");
const EquipamentoService = require("../services/equipamento.service");
const equipamentoService = new EquipamentoService();

router.get("/", async (req, res) => {
  try {
    const equipamentos = await equipamentoService.findAll(req.query);

    if (!equipamentos || equipamentos.length == 0)
      return res.status(404).json({
        message: "Nenhum equipamento encontrado",
      });

    return res.status(200).json(equipamentos);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter os equipamentos",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const equipamento = await equipamentoService.findById(id, req.query);

    if (!equipamento) {
      return res.status(404).json({
        message: "Equipamento não encontrado",
      });
    }

    return res.status(200).json(equipamento);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter o equipamento",
      error: err.message,
    });
  }
});

router.post("/", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const equipamentoExiste = await equipamentoService.findOne(req.body.codigo);

    if (equipamentoExiste) {
      return res.status(409).json({
        message: "Já existe um equipamento com esse código, tente outro",
      });
    }

    const equipamento = {
      codigo: req.body.codigo,
      faixa: req.body.faixa,
      tipo: req.body.tipo,
      ativo: req.body.ativo,
      local: req.body.local,
      marca: req.body.marca,
      modelo: req.body.modelo,
      velocidadeLimite: req.body.velocidadeLimite,
      dataAfericao: moment.tz(req.body.dataAfericao, "America/Sao_Paulo").toDate(),
      lacre: req.body.lacre,
      dataRegistroInmetro: req.body.dataRegistroInmetro
        ? moment.tz(req.body.dataRegistroInmetro, "America/Sao_Paulo").toDate()
        : null,
      numeroInmetro: req.body.numeroInmetro,
      integradorId: req.body.integradorId,
      municipioId: req.body.municipioId,
    };

    const validationResponse = equipamentoService.validaSchema(equipamento);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

    const equipamentoCriado = await equipamentoService.create(equipamento);
    if (!equipamentoCriado) {
      return res.status(500).json({
        message: "Não foi possível criar o equipamento",
      });
    }

    return res.status(201).json({
      message: "equipamento criado com sucesso",
      equipamento: {
        id: equipamentoCriado.id,
        ...equipamento,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível incluir o equipamento",
      error: err,
    });
  }
});

router.put("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const equipamentoUpdate = {
      codigo: req.body.codigo,
      faixa: req.body.faixa,
      tipo: req.body.tipo,
      ativo: req.body.ativo,
      local: req.body.local,
      marca: req.body.marca,
      modelo: req.body.modelo,
      velocidadeLimite: req.body.velocidadeLimite,
      dataAfericao: moment.tz(req.body.dataAfericao, "America/Sao_Paulo").toDate(),
      lacre: req.body.lacre,
      dataRegistroInmetro: req.body.dataRegistroInmetro
        ? moment.tz(req.body.dataRegistroInmetro, "America/Sao_Paulo").toDate()
        : null,
      numeroInmetro: req.body.numeroInmetro,
      integradorId: req.body.integradorId,
      municipioId: req.body.municipioId,
    };

    const validationResponse = equipamentoService.validaSchema(equipamento);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

    const integrador = await models.Integrador.findByPk(equipamentoUpdate.integradorId);
    if (!integrador) {
      return res.status(404).json({ message: "Integrador não existente" });
    }

    const municipio = await models.Municipio.findByPk(equipamentoUpdate.municipioId);
    if (!municipio) {
      return res.status(404).json({ message: "Município não existente" });
    }

    const equipamento = await models.Equipamento.findByPk(id);
    if (!equipamento) {
      return res.status(404).json({ message: "Equipamento não encontrado" });
    }

    await equipamentoService.update(id, equipamentoUpdate);

    return res.status(200).json({
      message: "Equipamento atualizado com sucesso",
      equipamento: { id, ...equipamentoUpdate },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Não foi possível atualizar o equipamento",
      error: err,
    });
  }
});

router.delete("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const equipamentoExiste = await equipamentoService.findById(id);

    if (!equipamentoExiste) {
      return res.status(404).json({
        message: "Equipamento não encontrado",
      });
    }
    await equipamentoService.delete(id);

  } catch (err) {
    res.status(500).json({
      message: "Não foi possível remover o equipamento",
      error: err.message,
    });
  }
});

module.exports = router;
