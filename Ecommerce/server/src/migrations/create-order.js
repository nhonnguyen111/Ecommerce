"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.STRING,
      },
      order_status: {
        type: Sequelize.INTEGER,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      order_total: {
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.STRING,
      },
      shop_id: {
        type: Sequelize.INTEGER,
      },
      methodPay: {
        type: Sequelize.STRING,
      },
      delivery_id: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT("long"),
      },
      cancel: {
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
    await queryInterface.dropTable("Orders");
  },
};
