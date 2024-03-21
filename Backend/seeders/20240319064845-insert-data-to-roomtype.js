"use strict";

/** @type {import('sequelize-cli').Migration} */
const roomType = require("../seed-data/roomType.json");

roomType.forEach((data) => {
  data.createdAt = data.updatedAt = new Date();
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RoomTypes", roomType, {});
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RoomTypes", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
