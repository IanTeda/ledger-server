import truncate from 'test/truncate';
import userFactory from 'test/factories/users.factory';
import { User } from 'server/models';
import { assert, expect } from 'chai';
import faker from 'faker';

/**
 * Test Payee Model
 * ================
 */
describe('User Model', () => {
  let user;

  beforeEach(async () => {
    await truncate();
    user = await userFactory();
  });

  it('should generate a payee from the factory', async () => {
    assert.isOk(user.id);
  });

  it('should truncate the payee table with each test', async () => {
    const count = await User.count();
    assert.equal(count, 1);
  });

  it('should authenticate when password is valid', async () => {
    let enteredPassword = 'password123'
    const authentic = user.authenticate(enteredPassword);
    expect(authentic).to.be.equal(true);
  });

  it('should not authenticate when password is invalid', async () => {
    let enteredPassword = 'invalid'
    const authentic = user.authenticate(enteredPassword);
    expect(authentic).to.be.equal(false);
  });

  it('should not allow null name', (done) => {

    User.create({
      name: null,
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Validation Error - Users name cannot be null.');
    }).then(done,done);
    
  });

  it('should not allow empty name', (done) => {

    User.create({
      name: "",
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - Users name cannot be empty.');
    }).then(done,done);
    
  });

  it('should not allow a users name <3 characters', (done) => {

    User.create({
      name: faker.random.alphaNumeric(2),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - Users name must between 3 and 72 characters.');
    }).then(done,done);
    
  });

  it('should not allow a users name >72 characters', (done) => {

    User.create({
      name: faker.random.alphaNumeric(159),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - Users name must between 3 and 72 characters.');
    }).then(done,done);
    
  });

  it('should not allow duplicate email', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: user.email,
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User email is already taken.');
    }).then(done,done);
    
  });

  it('should not allow badly formed email', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: 'this is not an email',
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User email format, use <foo@bar.com>.');
    }).then(done,done);
    
  });

  it('should not allow null email', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: null,
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User email cannot be null.');
    }).then(done,done);
    
  });

  it('should not allow empty email', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: "",
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User email cannot be empty.');
    }).then(done,done);
    
  });

  it('should not allow null password', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: faker.internet.email(),
      password: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User password cannot be null.');
    }).then(done,done);
    
  });

  it('should not allow empty password', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: faker.internet.email(),
      password: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User password cannot be empty.');
    }).then(done,done);
    
  });

  it('should not allow short <5 password', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: faker.internet.email(),
      password: "123",
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User password must between 5 and 72 characters.');
    }).then(done,done);
    
  });

  it('should not allow short >72 password', (done) => {

    User.create({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(102),
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch((error) => {
      expect(error.message).to.contain('Database Validation Error - User password must between 5 and 72 characters.');
    }).then(done,done);
    
  });

});

// https://stackoverflow.com/questions/39716569/nodejs-unhandledpromiserejectionwarning