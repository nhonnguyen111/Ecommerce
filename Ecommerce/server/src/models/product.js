"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        targetKey: "category_id",
        as: "categories",
      });
      Product.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        targetKey: "shop_id",
        as: "shops",
      });
      Product.belongsTo(models.Proof, {
        foreignKey: "proof_id",
        targetKey: "proof_id",
        as: "proofs",
      });
    }
  }
  Product.init(
    {
      product_id: DataTypes.INTEGER,
      product_ratting: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_description: DataTypes.TEXT,
      product_image: DataTypes.TEXT,
      product_sale: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      shop_id: DataTypes.INTEGER,
      proof_id: DataTypes.INTEGER,
      product_purchases: DataTypes.INTEGER,
      product_inventory: DataTypes.INTEGER,
      product_status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
