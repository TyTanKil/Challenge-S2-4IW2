'use strict';

const sequelize = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('manufacturers', [
      {
        id:1,
        label:'Asus',
      },
      {
        id:2,
        label:'Gigabyte',
      },
      {
        id:3,
        label:'MSI',
      },
      {
        id:4,
        label:'AMD',
      },
      {
        id:5,
        label:'Intel',
      },
      {
        id:6,
        label:'Corsair',
      },
      {
        id:7,
        label:'Crucial',
      },
      {
        id:8,
        label:'G.Skill',
      },
      {
        id:9,
        label:'Kingston',
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
