'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryChild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Child Category belongs to a single Parent Category
      CategoryChild.belongsTo(models.CategoryParent, {
        foreignKey: "parentId",
      })
    }
  };
  CategoryChild.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    type: DataTypes.ENUM('Expense', 'Income')
  }, {
    sequelize,
    modelName: 'CategoryChild',
  });
  return CategoryChild;
};