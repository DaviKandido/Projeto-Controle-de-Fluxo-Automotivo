const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Equipamento = sequelize.define('Equipamento', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    faixa: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('CEV','REV','CEM'),
      allowNull: false
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    local: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    velocidadeLimite: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    dataAfericao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    lacre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dataRegistroInmetro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    numeroInmetro: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    integradorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'integrador',
        key: 'id'
      }
    },
    municipioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'municipio',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Equipamento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_unique1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo" },
          { name: "faixa" },
        ]
      },
      {
        name: "fk_Equipamento_Integrador_idx",
        using: "BTREE",
        fields: [
          { name: "integradorId" },
        ]
      },
      {
        name: "fk_Equipamento_Municipio_idx",
        using: "BTREE",
        fields: [
          { name: "municipioId" },
        ]
      },
    ]
  });
  Equipamento.associate = function(models) {
    Equipamento.belongsTo(models.Integrador, { foreignKey: 'integradorId' });
    Equipamento.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
    Equipamento.hasMany(models.Fluxo, { foreignKey: 'equipamentoId' });
  };
  return Equipamento;
};
