const faker = require('faker');

// Create array of company faker data
let payees = [...Array(100)].map((payee) => (
  {
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    address: faker.address.streetAddress() + ', ' + faker.address.state() + ', ' + faker.address.country(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Payees', payees, {});
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Payees', null, {});
  }
};