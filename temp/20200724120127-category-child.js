'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CategoryChild', [
      {
        name: 'Electricity',
        description: 'Electical utilities bills',
        parentId: 1,
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gas',
        description: 'Gas utilities bills',
        parentId: 1,
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Water',
        description: 'Water utilities bills',
        parentId: 1,
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryChild', null, {});
  }
};
