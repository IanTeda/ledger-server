import chai, { assert } from 'chai';
import truncate from '../../truncate';
import payeeFactory from '../../factories/payees.factory';
import { Payee } from '../../../server/models';


describe('Payee Model', () => {
  let payee;

  beforeEach(async () => {
    await truncate();

    payee = await payeeFactory();
  });

  it('should generate a payee from the factory', async () => {
    assert.isOk(payee.id);
  });

  it('should truncate the payee table with each test', async () => {
    const count = await Payee.count();
    assert.equal(count, 1);
  });

});