const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "Usuario",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: "idx_login_unique",
      },
      senha: {
        type: DataTypes.STRING(100),
        set (value) {
          this.setDataValue("senha", bcrypt.hashSync(value, salt));
        },
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Usuario",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "idx_login_unique",
          unique: true,
          using: "BTREE",
          fields: [{ name: "login" }],
        },
      ],
    }
  );
};
