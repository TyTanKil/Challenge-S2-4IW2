'use strict';

const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = '$2y$10$1CpElRFT7MJmYzMSaJXx3e/BJhwjUZVu553FR82LokT3NcCb.03JG';
    return queryInterface.bulkInsert('account', [
      {
        id:1,
        firstName:'Rafael',
        lastName:'Coppe',
        email:'rafael.coppe.jr@gmail.com',
        phone:'0627062255',
        login:'rcoppe',
        password:password,
        birth_date: new Date('2003-03-11'),
        createdAt: new Date(),
      },
      {
        id:2,
        firstName:'Hugo',
        lastName:'Andre',
        email:'hugo.andre1501@gmail.com',
        phone:'0344526455',
        login:'handre',
        password:password,
        birth_date: new Date('2000-05-10'),
        createdAt: new Date(),
      },
      {
        id:3,
        firstName:'Kylian',
        lastName:'Halimi',
        email:'halimikilyan@gmail.com',
        phone:'0344213226',
        login:'khalimi',
        password:password,
        birth_date: new Date('2001-02-05'),
        createdAt: new Date(),
      },
      {
        id:4,
        firstName:'Jean-Pierre',
        lastName:'Beguerisse',
        email:'jeanbeguerisse@gmail.com',
        phone:'0344556982',
        login:'jbeguerisse',
        password:password,
        birth_date: new Date('2002-03-25'),
        createdAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('account', null, {});
  },
};
