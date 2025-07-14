"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.hasOne(models.Product, {
        foreignKey: "shop_id",
        as: "shops",
      });
      Shop.hasOne(models.Customer, {
        foreignKey: "shop_id",
        as: "customers",
      });
      Shop.hasOne(models.Order, {
        foreignKey: "shop_id",
        as: "orders",
      });
      Shop.belongsTo(models.Proof, {
        foreignKey: "proof_id",
        targetKey: "proof_id",
        as: "proofs",
      });
    }
  }
  Shop.init(
    {
      shop_id: DataTypes.INTEGER,
      shop_name: DataTypes.STRING,
      address: DataTypes.STRING,
      shop_description: DataTypes.STRING,
      shop_image: DataTypes.STRING,
      shop_status: DataTypes.INTEGER,
      proof_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
