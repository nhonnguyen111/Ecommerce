"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.Orderdetail, {
        foreignKey: "order_id",
        as: "orderdetails",
      });

      Order.belongsTo(models.Delivery, {
        foreignKey: "delivery_id",
        targetKey: "delivery_id",
        as: "deliverys",
      });
      Order.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        targetKey: "shop_id",
        as: "shops",
      });
    }
  }
  Order.init(
    {
      order_id: DataTypes.STRING,
      order_status: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      order_total: DataTypes.INTEGER,
      customer_id: DataTypes.STRING,
      shop_id: DataTypes.INTEGER,
      methodPay: DataTypes.STRING,
      delivery_id: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      cancel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
