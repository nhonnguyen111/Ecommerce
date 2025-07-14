"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Delivery.hasOne(models.Order, {
        foreignKey: "delivery_id",
        as: "orders",
      });
    }
  }
  Delivery.init(
    {
      delivery_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      customer_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Delivery",
    }
  );
  return Delivery;
};
