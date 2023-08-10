"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredients.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  Ingredients.init(
    {
      itemId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ingredient is required",
          },
          notEmpty: {
            msg: "ingredient is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Ingredients",
    }
  );
  return Ingredients;
};
