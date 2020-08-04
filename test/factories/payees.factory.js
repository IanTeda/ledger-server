import faker from 'faker';
import { Payee } from '../../server/models';
/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 * 
 * @param  {Object} props Properties to use for the user.
 * 
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    address: faker.address.streetAddress() + ', ' + faker.address.state() + ', ' + faker.address.country(),
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
export default async (props = {}) =>
  Payee.create(await data(props));


// https://medium.com/riipen-engineering/testing-with-sequelize-cc51dafdfcf4