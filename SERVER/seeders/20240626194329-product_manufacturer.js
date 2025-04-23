"use strict";

const sequelize = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("manufacturer", [
      {
        id: 1,
        label: "Asus",
      },
      {
        id: 2,
        label: "Gigabyte",
      },
      {
        id: 3,
        label: "MSI",
      },
      {
        id: 4,
        label: "AMD",
      },
      {
        id: 5,
        label: "Intel",
      },
      {
        id: 6,
        label: "Corsair",
      },
      {
        id: 7,
        label: "Crucial",
      },
      {
        id: 8,
        label: "G.Skill",
      },
      {
        id: 9,
        label: "Kingston",
      },
    ]);

    // Réinitialise l'auto-incrémentation de l'ID pour éviter les conflits
    await queryInterface.sequelize.query(
      'SELECT setval(\'"manufacturer_id_seq"\', (SELECT MAX(id) FROM "manufacturer"))'
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
