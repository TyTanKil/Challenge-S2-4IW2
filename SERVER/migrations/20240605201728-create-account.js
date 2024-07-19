'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE TYPE "enum_account_roles" AS ENUM('ROLE_USER', 'ROLE_STORE_KEEPER', 'ROLE_ADMIN');`);
    await queryInterface.sequelize.query(`CREATE TYPE "enum_account_status" AS ENUM('a', 'd', 's', 'c');`);
    await queryInterface.sequelize.query(`CREATE TYPE "enum_account_gender" AS ENUM('m', 'f', 'a');`);

    await queryInterface.createTable('account', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM({
          values: ['m', 'f', 'a']
        }),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM({
          values: ['a', 'd', 's', 'c']
        }),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      login: {
        type: Sequelize.STRING,
        unique: true
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
      validate_hash: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account');

    await queryInterface.sequelize.query(`DROP TYPE "enum_account_roles";`);
    await queryInterface.sequelize.query(`DROP TYPE "enum_account_status";`);
    await queryInterface.sequelize.query(`DROP TYPE "enum_account_gender";`);
  }
};