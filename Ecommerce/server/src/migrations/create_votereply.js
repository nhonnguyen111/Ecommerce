"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Votereplies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      votereply_id: {
        type: Sequelize.INTEGER,
      },
      vote_id: {
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.STRING,
      },
      shop_id: {
        type: Sequelize.STRING,
      },
      votereply_content: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Votereplies");
  },
};
