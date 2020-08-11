import truncate from 'test/truncate';
import payeeFactory from 'test/factories/payees.factory';
import { Payee } from 'server/models';
import { assert } from 'chai';

/**
 * Test Payee Model
 * ================
 */
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