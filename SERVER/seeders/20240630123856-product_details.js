'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('product_details', [
        {
          id_product: '39bda5ea-8e1c-4885-b038-90d27c184139',
          id_details: 1,
          value: 'NVIDIA GeForce RTX 3050'
        },
        {
          id_product: '39bda5ea-8e1c-4885-b038-90d27c184139',
          id_details: 2,
          value: 'NVIDIA'
        },
        {
          id_product: '39bda5ea-8e1c-4885-b038-90d27c184139',
          id_details: 4,
          value: 'ASUS DUAL GeForce RTX 3050 OC O6G'
        },
        {
          id_product: '39bda5ea-8e1c-4885-b038-90d27c184139',
          id_details: 5,
          value: 'ASUS'
        },
        {
          id_product: 'f1edd901-d0d9-4f42-a754-6c75b491af5d',
          id_details: 12,
          value: 'AMD Ryzen 3'
        },
        {
          id_product: 'f1edd901-d0d9-4f42-a754-6c75b491af5d',
          id_details: 13,
          value: 'AMD AM4'
        },
        {
          id_product: 'f1edd901-d0d9-4f42-a754-6c75b491af5d',
          id_details: 9,
          value: 'AMD Ryzen 3 3200G Wraith Stealth Edition (3.6 GHz / 4 GHz)'
        },
        {
          id_product: 'f1edd901-d0d9-4f42-a754-6c75b491af5d',
          id_details: 10,
          value: 'AMD'
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
