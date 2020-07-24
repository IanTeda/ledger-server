'use strict';
const faker = require('faker');

const parentCategories = [...Array(10)].map((parentCategory) => (
  {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    type: 'Expense',
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CategoryParent', parentCategories, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryParent', null, {});
  }
};
