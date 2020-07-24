'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CategoryParent', [
      {
        name: 'Utilities',
        description: 'Housing and property expenses on owner occupied property including rates, taxes, levies, body corporate and strata fees, repairs and maintenance, other household items and utilities',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Information, Communications and Telecommunications',
        description: 'Telephone accounts (home and mobile), internet, pay TV and media streaming subscriptions (such as Netflix and Spotify)',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Groceries, Eating Out and Foot',
        description: 'Typical supermarket shop for groceries including food and toiletries',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Recreation and Entertainment',
        description: 'Alcohol, tobacco, gambling, restaurants, membership fees and subscriptions, pet care, holidays',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing and Personal Care',
        description: 'Clothing, footwear, cosmetics, personal care',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Medical, Health and Wellbeing',
        description: 'Including doctor, dental, optical and pharmaceutical etc. (excluding health insurance which is categorised under insurance)',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transportation',
        description: 'Public transport, motor vehicle running costs including fuel, servicing, registration, parking and tolls (excluding motor vehicle insurance which is categorised under insurance)',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Education',
        description: 'Public and private education fees and associated costs (preschool, primary, secondary and tertiary) including books and uniforms etc.',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Child Care',
        description: 'Including nannies',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Insurance',
        description: 'All insurance including health, home and contents, motor vehicle (CTP green slip and comprehensive), life, income protection',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Other',
        description: 'Unique items not covered in above categories',
        type: 'Expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salaries',
        description: '',
        type: 'Income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Other',
        description: '',
        type: 'Income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Interest',
        description: '',
        type: 'Income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bonuses & Gifts',
        description: '',
        type: 'Income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryParent', null, {});
  }
};
