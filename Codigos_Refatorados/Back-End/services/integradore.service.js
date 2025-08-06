const model = require("../models");
const { Op } = require("sequelize");
const Validator = require("fastest-validator");

class Integrador {
  constructor() {
    this.model = model.Integrador;
    this.v = new Validator();
  }

  ValidaSchema(data) {
    const schema = {
      nome: { type: "string", optional: false, max: "255" },
    };
    return this.v.validate(data, schema);
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findByPk(id) {
    return await this.model.findByPk(id);
  }

  async create(data) {
    return await this.model.create(data);
  }
  async update(id, data) {
    return await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }

  async delete(id) {
    return await this.model.destroy({ where: { id: id } });
  }
}

module.exports = Integrador;
