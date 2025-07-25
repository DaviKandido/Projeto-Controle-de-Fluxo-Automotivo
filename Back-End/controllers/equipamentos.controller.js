const models = require("../models");
const Validator = require("fastest-validator");
const { Op } = require("sequelize");

function index(req, res) {
  // Extrai e converte o limit, se existir
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  delete req.query.limit;

  // Constrói dinamicamente os filtros definidos
  const whereEquipamento = {};
  if (req.query.codigo !== undefined)
    whereEquipamento.codigo = req.query.codigo;
  if (req.query.faixa !== undefined) whereEquipamento.faixa = req.query.faixa;
  if (req.query.ativo !== undefined)
    whereEquipamento.ativo = req.query.ativo === "true" ? 1 : 0;
  if (req.query.integrador !== undefined)
    whereEquipamento.integradorId = req.query.integrador;
  if (req.query.municipio !== undefined)
    whereEquipamento.municipioId = req.query.municipio;

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

  models.Equipamento.findAll({
    where: { ...whereEquipamento },
    include: [
      {
        model: models.Integrador,
      },
      {
        model: models.Municipio,
      },
      {
        model: models.Fluxo,
        limit: limit,
        where: {
          ...whereFluxos,
        },
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter os equipamentos",
        error: err,
      });
    });
}

function show(req, res) {
  const id = req.params.id;

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

  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  delete req.query.limit;

  models.Equipamento.findByPk(id, {
    include: [
      {
        model: models.Integrador,
      },
      {
        model: models.Municipio,
      },
      {
        model: models.Fluxo,
        limit: limit,
        where: {
          ...whereFluxos,
        },
      },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Equipamento não encontrado",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível obter o equipamento",
        error: err,
      });
    });
}

function save(req, res) {
  const equipamento = {
    codigo: req.body.codigo,
    faixa: req.body.faixa,
    tipo: req.body.tipo,
    ativo: req.body.ativo,
    local: req.body.local,
    marca: req.body.marca,
    modelo: req.body.modelo,
    velocidadeLimite: req.body.velocidadeLimite,
    dataAfericao: new Date(req.body.dataAfericao),
    lacre: req.body.lacre,
    dataRegistroInmetro: new Date(req.body.dataRegistroInmetro),
    numeroInmetro: req.body.numeroInmetro,
    integradorId: req.body.integradorId,
    municipioId: req.body.municipioId,
  };

  const schema = {
    codigo: { type: "string", optional: false, max: "11" },
    faixa: { type: "number", optional: false, min: 1, max: "127" },
    tipo: { type: "enum", values: ["CEV", "REV", "CEM"] },
    ativo: { type: "boolean", optional: false },
    local: { type: "string", optional: false, max: "80" },
    marca: { type: "string", optional: false, max: "40" },
    modelo: { type: "string", optional: false, max: "40" },
    velocidadeLimite: { type: "number", min: 0, optional: true },
    dataAfericao: { type: "date", optional: false },
    lacre: { type: "string", optional: false, max: "20" },
    dataRegistroInmetro: { type: "date", optional: true },
    numeroInmetro: { type: "string", optional: false, max: "30" },
    integradorId: { type: "number", optional: false },
    municipioId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(equipamento, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  models.Equipamento.create(equipamento).then((result) => {
    res
      .status(201)
      .json({
        message: "equipamento criado com sucesso",
        equipamento: {
          id: result.id,
          ...equipamento,
        },
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível incluir o equipamento",
          error: err,
        });
      });
  });
}

async function update(req, res) {
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
    dataAfericao: new Date(req.body.dataAfericao),
    lacre: req.body.lacre,
    dataRegistroInmetro: new Date(req.body.dataRegistroInmetro),
    numeroInmetro: req.body.numeroInmetro,
    integradorId: req.body.integradorId,
    municipioId: req.body.municipioId,
  };

  const schema = {
    codigo: { type: "string", optional: false, max: "11" },
    faixa: { type: "number", optional: false, min: 1, max: 127 },
    tipo: { type: "enum", values: ["CEV", "REV", "CEM"] },
    ativo: { type: "number", optional: false },
    local: { type: "string", optional: false, max: "80" },
    marca: { type: "string", optional: false, max: "40" },
    modelo: { type: "string", optional: false, max: "40" },
    velocidadeLimite: { type: "number", min: 0, optional: true },
    dataAfericao: { type: "date", optional: false },
    lacre: { type: "string", optional: false, max: "20" },
    dataRegistroInmetro: { type: "date", optional: true },
    numeroInmetro: { type: "string", max: "30", optional: true },
    integradorId: { type: "number", optional: false },
    municipioId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(equipamentoUpdate, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "falha na validação!",
      errors: validationResponse,
    });
  }

  try {
    const integrador = await models.Integrador.findByPk(
      equipamentoUpdate.integradorId
    );
    if (!integrador) {
      return res.status(404).json({ message: "Integrador não existente" });
    }

    const municipio = await models.Municipio.findByPk(
      equipamentoUpdate.municipioId
    );
    if (!municipio) {
      return res.status(404).json({ message: "Município não existente" });
    }

    const equipamento = await models.Equipamento.findByPk(id);
    if (!equipamento) {
      return res.status(404).json({ message: "Equipamento não encontrado" });
    }

    await models.Equipamento.update(equipamentoUpdate, { where: { id } });

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
}

function destroy(req, res) {
  const id = req.params.id;

  models.Equipamento.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Equipamento removido com sucesso",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Não foi possível remover o equipamento",
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
