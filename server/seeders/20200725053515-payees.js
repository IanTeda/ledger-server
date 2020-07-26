const faker = require('faker');

// Create array of company faker data
const payees = [...Array(100)].map((payee) => (
  {
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    address: faker.address.streetAddress() + ', ' + faker.address.state + ', ' + faker.address.country(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Payees', payees, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payees', null, {});
  }
};

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Payees', payees, {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Payees', null, {});
//   }
// };