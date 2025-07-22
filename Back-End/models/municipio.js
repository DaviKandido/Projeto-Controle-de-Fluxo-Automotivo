const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Municipio', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    uf: {
      type: DataTypes.ENUM('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Municipio',
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
        name: "indx_codigo",
        using: "BTREE",
        fields: [
          { name: "codigo" },
        ]
      },
    ]
  });
};
