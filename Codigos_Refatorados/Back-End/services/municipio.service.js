const model = require("../models");
const Validator = require("fastest-validator");
const enumUFs = require("../utils/ufUnumType");
class Municipio {
  constructor() {
    this.model = model.Municipio;
    this.v = new Validator();
  }

  validaSchema(data) {
    const schema = {
      codigo: { type: "number", optional: false },
      descricao: { type: "string", optional: false, max: "255" },
      uf: {
        type: "enum",
        values: enumUFs,
        optional: false,
      },
    };
    return this.v.validate(data, schema);
  }

  async findOne(municipio){
    return await this.model.findOne({where: {codigo: municipio.codigo}});
  }

  async findAll(query = {}) {
    let whereMunicipios = {};
    if (query.uf) whereMunicipios.uf = query.uf.toUpperCase();
    if (query.descricao) whereMunicipios.descricao = query.descricao.toUpperCase();

    return await this.model.findAll({
      where: { ...whereMunicipios },
      order: [["descricao", "ASC"]],
    });
  }

  async findByPK(id) {
    return await this.model.findByPk(id);
  }

  async create(data){
    return await this.model.create(data);
  }

  async update(id, data){
    return await this.model.update(data, {where: {id: id}});
  }

  async delete(id){
    return await this.model.destroy({where: {id: id}})
  }
}

module.exports = Municipio;
