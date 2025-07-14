"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proof.hasOne(models.Product, {
        foreignKey: "proof_id",
        as: "proofs",
      });
      Proof.hasOne(models.Shop, {
        foreignKey: "proof_id",
        as: "shop",
      });
    }
  }
  Proof.init(
    {
      proof_id: DataTypes.INTEGER,
      proof_image: DataTypes.TEXT,
      proof_description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Proof",
    }
  );
  return Proof;
};
