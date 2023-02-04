'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('order-items', [
      {
        order_id: 1,
        product_id: 1,
        qty: 1,
        price: 5000000
      },
      {
        order_id: 1,
        product_id: 2,
        qty: 1,
        price: 10000000
      },
      {
        order_id: 2,
        product_id: 3,
        qty: 1,
        price: 12000000
      },
      {
        order_id: 2,
        product_id: 4,
        qty: 1,
        price: 15000000
      },
      {
        order_id: 3,
        product_id: 5,
        qty: 1,
        price: 20000000
      },
      {
        order_id: 3,
        product_id: 6,
        qty: 1,
        price: 25000000
      },
      {
        order_id: 4,
        product_id: 7,
        qty: 1,
        price: 15000000
      },
      {
        order_id: 4,
        product_id: 8,
        qty: 1,
        price: 17000000
      },
      {
        order_id: 5,
        product_id: 9,
        qty: 1,
        price: 22000000
      },
      {
        order_id: 5,
        product_id: 10,
        qty: 1,
        price: 25000000
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('order-items', null, {});
  }
};
