const model = require("../models");
const { Op } = require("sequelize");

class Fluxo {
  constructor() {
    this.model = model.Fluxo;
    this.modelEquipamento = model.Equipamento;
  }

  CreateQueryEquipamento(query = {}) {
    const whereEquipamento = {};
    if (query.CodEquipamento !== undefined) whereEquipamento.codigo = query.CodEquipamento;
    if (query.faixaEquipamento !== undefined) whereEquipamento.faixa = query.faixaEquipamento;

    return whereEquipamento;
  }

  CreateQueryFluxos(query = {}) {
    const whereFluxos = {};
    if (query.placa !== undefined) whereFluxos.placa = query.placa;

    if (query.dataInicio !== undefined || query.dataFim !== undefined) {
      whereFluxos.data = {};
      if (query.dataInicio !== undefined) {
        whereFluxos.data[Op.gte] = query.dataInicio;
      }
      if (query.dataFim !== undefined) {
        whereFluxos.data[Op.lte] = query.dataFim;
      }
    }

    if (query.horaInicio !== undefined || query.horaFim !== undefined) {
      whereFluxos.hora = {};
      if (query.horaInicio !== undefined) {
        whereFluxos.hora[Op.gte] = query.horaInicio;
      }
      if (query.horaFim !== undefined) {
        whereFluxos.hora[Op.lte] = query.horaFim;
      }
    }

    return whereFluxos;
  }

  async findAll(query = { limit: 0 }) {
    const limit = query.limit ? parseInt(query.limit) : null;
    delete query.limit;

    const whereEquipamento = this.CreateQueryEquipamento(query);

    const whereFluxos = this.CreateQueryFluxos(query);

    return await this.model.findAll({
      limit: limit,
      order: [
        ["data", "DESC"],
        ["hora", "DESC"],
      ],
      where: { ...whereFluxos },
      include: [
        {
          model: this.modelEquipamento,
          where: whereEquipamento,
        },
      ],
    });
  }

  async findByPk(id) {
    return await this.model.findByPk(id);
  }

  async cont(query = {}, id_equipamento) {
    // Select count(f.id) from fluxo f
    // Join Equipamento E ON E.id = f.equipamentoId and f.data > '2025-01-01' and f.data < '2025-08-08'

    const whereFluxos = this.CreateQueryFluxos(query);

    return await this.model.count({
      where: { ...whereFluxos },
      include: [
        {
          model: this.modelEquipamento,
          where: { id: id_equipamento },
        },
      ],
    });
  }

  async delete(id) {
    return await this.model.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = Fluxo;
