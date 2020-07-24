'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryParent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Parent Category has man Children Categories
      CategoryParent.hasMany(models.CategoryChild, {
        foreignKey: "parentId"
      })
    }
  };
  CategoryParent.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    type: DataTypes.ENUM('expense', 'income')
  }, {
    sequelize,
    modelName: 'CategoryParent',
  });
  return CategoryParent;
};