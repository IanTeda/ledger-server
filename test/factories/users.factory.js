import faker from 'faker';
import { User } from 'server/models';

let plainPassword = 'password123'
/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 * 
 * @param  {Object} props Properties to use for the user.
 * @return {Object}       An object to build the user from.
 */

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: plainPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 * 
 * @param  {Object} props Properties to use for the user.
 * @return {Object}       A user instance
 */
export default async (props = {}) => {
  return User.create(await data(props));
}

// https://medium.com/riipen-engineering/testing-with-sequelize-cc51dafdfcf4