"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.UUID,
      },
      total_price: {
        type: Sequelize.FLOAT,
      },
      order_date: {
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      order_status: {
        type: Sequelize.INTEGER,
      },
      delivery_date: {
        type: Sequelize.DATE,
      },
      delivery_status: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order");
  },
};
