'use strict';

/** @type {import('sequelize-cli').Migration} */

const roomUsage = require('../seed-data/roomUsage.json');

roomUsage.forEach(data => {
  data.createdAt = data.updatedAt = new Date()
  data.bookingDate = new Date()
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RoomUsages', roomUsage, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RoomUsages', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
