"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Shops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_id: {
        type: Sequelize.INTEGER,
      },
      shop_name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      shop_description: {
        type: Sequelize.STRING,
      },
      shop_image: {
        type: Sequelize.STRING,
      },
      shop_status: {
        type: Sequelize.INTEGER,
      },
      proof_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shops");
  },
};
