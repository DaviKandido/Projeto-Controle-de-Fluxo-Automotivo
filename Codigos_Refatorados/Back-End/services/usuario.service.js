const model = require("../models");
const bcryptJS = require("bcryptjs");
const Validator = require("fastest-validator");

class Usuario {
  constructor() {
    this.model = model.Usuario;
    this.v = new Validator();
  }

  validaSchema(data){
    const schema = {
      nome: { type: "string", optional: false, max: "100" },
      login: { type: "string", optional: false, max: "30" },
      senha: { type: "string", optional: false, max: "100" },
      ativo: { type: "boolean", optional: false },
    };
    return this.v.validate(data, schema);
  }

  async findAll() {
    return await this.model.findAll();
  }
  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findOne(login = null) {
    return await this.model.findOne({
      where: {
        login: login,
      },
    });
  }
  async create(data) {
    return await this.model.create(data);
  }

  async update(idUser, data) {
    return await this.model.update(data, {
      where: {
        id: idUser,
      },
    });
  }
  async delete(idUser) {
    return await this.model.destroy({
      where: {
        id: idUser,
      },
    });
  }

  async compareSenha(ReqSenha, UsuarioSenha) {
    return bcryptJS.compareSync(ReqSenha, UsuarioSenha);
  }
}

module.exports = Usuario;