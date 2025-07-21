const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fluxo', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    velMed: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    tamVeic: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    classVeic: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    pesoBt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dataRecebimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    equipamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipamento',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'fluxo',
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
        name: "fk_Fluxo_Equipamento1_idx",
        using: "BTREE",
        fields: [
          { name: "equipamentoId" },
        ]
      },
    ]
  });
};
