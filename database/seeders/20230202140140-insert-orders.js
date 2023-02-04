'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('orders', [
      {
        user_id: 1,
        status: "Pending",
        total: 15000000
      },
      {
        user_id: 2,
        status: "Pending",
        total: 27000000
      },
      {
        user_id: 3,
        status: "Pending",
        total: 45000000
      },
      {
        user_id: 4,
        status: "Pending",
        total: 32000000
      },
      {
        user_id: 5,
        status: "Pending",
        total: 47000000
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('orders', null, {});
  }
};
