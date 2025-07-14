"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orderdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orderdetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        targetKey: "order_id",
        as: "orders",
      });
      Orderdetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "product_id",
        as: "products",
      });
    }
  }
  Orderdetail.init(
    {
      order_detail_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      product_qty: DataTypes.INTEGER,
      product_price: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      order_id: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orderdetail",
    }
  );
  return Orderdetail;
};
