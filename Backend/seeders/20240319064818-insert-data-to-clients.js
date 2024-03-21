"use strict";

/** @type {import('sequelize-cli').Migration} */

const client = require("../seed-data/clients.json");
const { hashPassword } = require("../utils/bcrypt");
client.forEach((data) => {
  data.createdAt = data.updatedAt = new Date();
  data.password = hashPassword(data.password);
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Clients", client, {});
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
    await queryInterface.bulkDelete("Clients", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
