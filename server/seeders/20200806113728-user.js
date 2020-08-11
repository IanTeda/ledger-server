const encryptUtil = require('../util/encrypt.util');

let saltyNuts = encryptUtil.generateSalt();
let planPassword = 'password123';

/**
 * BulkInsert will not trigger the model hooks, so we have to create salt and encrypted password
 */
let aminUser = [
  {
    name: 'Administrator',
    email: 'admin@teda.id.au',
    password: encryptUtil.encryptPassword(planPassword, saltyNuts),
    salt: saltyNuts,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', aminUser, {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
