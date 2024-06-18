'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE TYPE "enum_account_roles" AS ENUM('ROLE_USER', 'ROLE_STORE_KEEPER', 'ROLE_ADMIN');`);

    await queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
          values: ['ROLE_USER', 'ROLE_STORE_KEEPER', 'ROLE_ADMIN']
        })),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account');

    await queryInterface.sequelize.query(`DROP TYPE "enum_account_roles";`);
  }
};