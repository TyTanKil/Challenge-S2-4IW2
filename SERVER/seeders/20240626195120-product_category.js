'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categoriy', [
      {
        id:1,
        label:'Carte Graphique',
      },
      {
        id:2,
        label:'Processeur',
      },
      {
        id:3,
        label:'Mémoire PC',
      },
      {
        id:4,
        label:'Disque Dur',
      },
      {
        id:5,
        label:'SSD',
      },
      {
        id:6,
        label:'Alimentation PC',
      },
      {
        id:7,
        label:'Carte Mère',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
