'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('municipio', [
      {
        id: 1,
        codigo: 1,
        descricao: 'Rio de Janeiro',
        uf: 'RJ'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('municipio', null, {});
  }
};
