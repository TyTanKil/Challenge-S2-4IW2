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
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      order_status: {
        type: Sequelize.INTEGER,
      },
      expected_delivery_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date;
        },
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
