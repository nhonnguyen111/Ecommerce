"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        targetKey: "shop_id",
        as: "shops",
      });
      Customer.hasOne(models.Order, {
        foreignKey: "customer_id",
        as: "orders",
      });
      Customer.hasOne(models.Vote, {
        foreignKey: "customer_id",
        as: "votes",
      });
    }
  }
  Customer.init(
    {
      customer_id: DataTypes.STRING,
      customer_email: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      phone: DataTypes.STRING,
      customer_avt: DataTypes.STRING,
      shop_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
