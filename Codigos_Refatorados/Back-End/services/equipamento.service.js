const { where } = require("sequelize");
const model = require("../models");
const bcryptJS = require("bcryptjs");
const Validator = require("fastest-validator");

class Equipamento {
  constructor() {
    this.model = model.Equipamento;
    this.modelIntegrador = model.Integrador;
    this.modelFluxo = model.Fluxo;
    this.modelMunicipio = model.Municipio;
    this.v = new Validator();
  }

  validaSchema(data) {
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
      numeroInmetro: { type: "string", optional: true, max: "30" },
      integradorId: { type: "number", optional: false },
      municipioId: { type: "number", optional: false },
    };
    return this.v.validate(data, schema);
  }

  async createQueryEquipamento(query) {
    let whereEquipamento = {};
    if (query.codigo !== undefined) whereEquipamento.codigo = query.codigo;
    if (query.faixa !== undefined) whereEquipamento.faixa = query.faixa;
    if (query.ativo !== undefined) whereEquipamento.ativo = query.ativo === "true" ? 1 : 0;
    if (query.integrador !== undefined) whereEquipamento.integradorId = query.integrador;
    if (query.municipio !== undefined) whereEquipamento.municipioId = query.municipio;

    return whereEquipamento;
  }

  async createQueryFluxo(query) {
    let whereFluxos = {};
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

  async findAll(query) {
    // Extrai e converte o limit, se existir
    const limit = query.limit ? parseInt(query.limit) : null;
    delete query.limit;

    // Constrói dinamicamente os filtros definidos
    const whereEquipamento = this.createQueryEquipamento(query);

    const whereFluxos = this.createQueryFluxo(query);

    const include = [{ model: this.modelIntegrador }, { model: this.modelMunicipio }];

    if (limit && limit > 0) {
      include.push({
        model: this.modelFluxo,
        limit: limit,
        where: {
          ...whereFluxos,
        },
      });
    }

    return await this.model.findAll({
      where: { ...whereEquipamento },
      include: include,
    });
  }

  async findById(id, query = {limit: 0}) {
    const limit = query.limit ? parseInt(query.limit) : null;
    delete query.limit;

    // Constrói dinamicamente os filtros definidos
    const whereFluxos = this.createQueryFluxo(query);

    const include = [{ model: this.modelIntegrador }, { model: this.modelMunicipio }];

    if (limit && limit > 0) {
      include.push({
        model: this.modelFluxo,
        limit: limit,
        where: {
          ...whereFluxos,
        },
      });
    }

    return await this.model.findByPk(id, {
      include: include,
    });
  }

  async findOne(codigo) {
    return await this.model.findOne({
        where: {
          codigo: codigo,
        },
    });
  }
  async delete(id) {
    return await this.model.destroy({
      where: {
        id: id,
      },
    });
  }

  async update(id, data) {
    return await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }

  async create(equipamento){
    return await this.model.create(equipamento);
  }
}

module.exports = Equipamento;
