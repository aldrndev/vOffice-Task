"use strict";

/** @type {import('sequelize-cli').Migration} */

const user = require("../seed-data/user.json");
const { hashPassword } = require("../utils/bcrypt");

user.forEach((data) => {
  data.createdAt = data.updatedAt = new Date();
  data.password = hashPassword(data.password);
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", user, {});
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
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
