"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        targetKey: "customer_id",
        as: "customers",
      });
    }
  }
  Vote.init(
    {
      vote_id: DataTypes.INTEGER,
      customer_id: DataTypes.STRING,
      vote_content: DataTypes.STRING,
      vote_image: DataTypes.TEXT,
      vote_rate: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
