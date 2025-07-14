"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      product_ratting: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.TEXT("long"),
      },
      product_image: {
        type: Sequelize.TEXT("long"),
      },
      product_sale: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      shop_id: {
        type: Sequelize.INTEGER,
      },
      proof_id: {
        type: Sequelize.INTEGER,
      },
      product_purchases: {
        type: Sequelize.INTEGER,
      },
      product_inventory: {
        type: Sequelize.INTEGER,
      },
      product_status: {
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
    await queryInterface.dropTable("Products");
  },
};
