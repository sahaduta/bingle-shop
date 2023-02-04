'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('products', [
      {
        name: 'Samsung Galaxy A53',
        price: 5000000,
        stock: 99,
        sku: 'SM001',
        user_id: 1
      },
      {
        name: 'Samsung Galaxy S22',
        price: 10000000,
        stock: 99,
        sku: 'SM002',
        user_id: 2
      },
      {
        name: 'Samsung Galaxy S22+',
        price: 12000000,
        stock: 99,
        sku: 'SM003'
      },
      {
        name: 'Samsung Galaxy S22 Ultra',
        price: 15000000,
        stock: 99,
        sku: 'SM004'
      },
      {
        name: 'Samsung Galaxy Z Flip4',
        price: 20000000,
        stock: 99,
        sku: 'SM005'
      },
      {
        name: 'Samsung Galaxy Z Fold4',
        price: 25000000,
        stock: 99,
        sku: 'SM006'
      },
      {
        name: 'Iphone 13',
        price: 15000000,
        stock: 99,
        sku: 'IP001'
      },
      {
        name: 'Iphone 13 Pro Max',
        price: 17000000,
        stock: 99,
        sku: 'IP002'
      },
      {
        name: 'Iphone 14 Pro',
        price: 22000000,
        stock: 99,
        sku: 'IP003'
      },
      {
        name: 'Iphone 14 Pro Max',
        price: 25000000,
        stock: 99,
        sku: 'IP004'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('products', null, {});
  }
};
