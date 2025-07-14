"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Votereply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Votereply.init(
    {
      votereply_id: DataTypes.INTEGER,
      vote_id: DataTypes.INTEGER,
      customer_id: DataTypes.STRING,
      shop_id: DataTypes.INTEGER,
      votereply_content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Votereply",
    }
  );
  return Votereply;
};
