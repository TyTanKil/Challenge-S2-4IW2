"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("category", [
      {
        id: 1,
        label: "Carte Graphique",
      },
      {
        id: 2,
        label: "Processeur",
      },
      {
        id: 3,
        label: "Mémoire PC",
      },
      {
        id: 4,
        label: "Disque Dur",
      },
      {
        id: 5,
        label: "SSD",
      },
      {
        id: 6,
        label: "Alimentation PC",
      },
      {
        id: 7,
        label: "Carte Mère",
      },
    ]);

    // Réinitialise l'auto-incrémentation de l'ID pour éviter les conflits
    await queryInterface.sequelize.query(
      'SELECT setval(\'"category_id_seq"\', (SELECT MAX(id) FROM "category"))'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("category", null, {});
  },
};
