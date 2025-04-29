'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE TYPE "enum_delivery_status" AS ENUM('En attente', 'Expédié', 'Livré', 'Annulé');`);

    await queryInterface.createTable('delivery_status', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
          values: ["En attente", "Expédié", "Livré", "Annulé"]
        })),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('delivery_status');
    await queryInterface.sequelize.query(`DROP TYPE "enum_delivery_status";`);
  }
};