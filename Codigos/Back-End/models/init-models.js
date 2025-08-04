var DataTypes = require("sequelize").DataTypes;
var _equipamento = require("./equipamento");
var _fluxo = require("./fluxo");
var _integrador = require("./integrador");
var _municipio = require("./municipio");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var equipamento = _equipamento(sequelize, DataTypes);
  var fluxo = _fluxo(sequelize, DataTypes);
  var integrador = _integrador(sequelize, DataTypes);
  var municipio = _municipio(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  fluxo.belongsTo(equipamento, { as: "equipamento", foreignKey: "equipamentoId"});
  equipamento.hasMany(fluxo, { as: "fluxos", foreignKey: "equipamentoId"});
  equipamento.belongsTo(integrador, { as: "integrador", foreignKey: "integradorId"});
  integrador.hasMany(equipamento, { as: "equipamentos", foreignKey: "integradorId"});
  equipamento.belongsTo(municipio, { as: "municipio", foreignKey: "municipioId"});
  municipio.hasMany(equipamento, { as: "equipamentos", foreignKey: "municipioId"});

  return {
    equipamento,
    fluxo,
    integrador,
    municipio,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
