// const expect = require('chai').expect
import { expect } from 'chai';
import {generateSalt, encryptPassword} from 'server/util/encrypt.util'

describe('Encrypt Utility', () => {
 
  it('expect generateSalt() to generate salt hash', () => {
    let salt = generateSalt();
    expect(salt).to.not.be.null;
  });

  it('expect encryptPassword() to equal hashed password', () => {
    let password = 'testing1234';
    let salt = generateSalt();
    let hashedPassword = encryptPassword(password, salt);

    expect(encryptPassword(password, salt)).to.equal(hashedPassword);
  });
 
});