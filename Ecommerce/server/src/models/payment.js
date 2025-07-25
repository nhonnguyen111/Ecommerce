"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      orderId: DataTypes.STRING,
      customer_id: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      methodPay: DataTypes.STRING,
      urlPay: DataTypes.STRING,
      statusCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
