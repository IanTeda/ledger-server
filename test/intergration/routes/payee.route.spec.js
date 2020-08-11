import truncate from 'test/truncate';
import payeeFactory from 'test/factories/payees.factory';
import server from 'server/app';
import chaiHttp from 'chai-http';
import chai from 'chai';

const expect = require('chai').expect

chai.use(chaiHttp);

describe('Payee Endpoint', () => {
  // Payee database instance for reference during testing
  let payee;

  beforeEach(async () => {
    // Destroy payee's in database
    await truncate();

    // Create new payee in database
    payee = await payeeFactory();
  });

  it('Expect POST /api/payees to create a single payee', (done) => {
    chai.request(server)
      .post('/api/payees')
      .type('form')
      .send({
        'name': 'Single Payee',
        'description': 'Description of single payee',
        'address': '101 Address St, Suburb State 1111'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equals('Success - Created payee in database');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('links');
        done();
      })
  });

  it('Expect GET /api/payees to list ALL payees', (done) => {
    chai.request(server)
      .get('/api/payees')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals('Success - Retrieved payees');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('links');
        done();
      });
  });

  it('Expect GET /api/payees/<id> to get a payee <id>', (done) => {
    let id = payee.id;

    chai.request(server)
      .get(`/api/payees/${id}`) // Needs to be back tick for ${id}
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`Success - Retrieved payee with id=${id}`)
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('links');

        done();
      });
  });

  // Database id out of range
  it('Expect GET /api/payees/8687679876867 out of range to be bad response', (done) => {
    let id = 8687679876867; // If number is to big you get an out of range error, else it returns null

    chai.request(server)
      .get(`/api/payees/${id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').to.equals(`Bad Request - Payee id=${id} is out of range or does not exists`)
        // expect(res.body).to.have.property('links');
        done();
      });
  })

  // Database id does not exist
  it('Expect GET /api/payees/452345 to not exist and be bad response', (done) => {
    let id = 452345; // If number is to big you get an out of range error, else it returns null

    chai.request(server)
      .get(`/api/payees/${id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').to.equals(`Bad Request - Payee id=${id} is out of range or does not exists`)
        // expect(res.body).to.have.property('links');
        done();
      });
  })

  it('Expect PUT /api/payees/<id> to update a payee with <id>', (done) => {
    let id = payee.id;

    chai.request(server)
    .put(`/api/payees/${id}`)
    .type('form')
    .send({
      'name': 'Updated Payee',
      'description': 'Description of single payee updated',
      'address': '101 Updated St, Suburb State 1111'
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message').to.equals(`Success - Updated payee with id=${id}`);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('links');
      done();
    })
  });

  // Needs routing error
  it('Expect PUT /api/payees/ with no <id> to be a bad response');

  it('Expect DELETE /api/payees/<id> to delete payee with <id>', (done) => {
    let id = payee.id;

    chai.request(server)
      .delete(`/api/payees/${id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals(`Success - Deleted payee with id=${id}`);
        expect(res.body).to.have.property('links');
        done();
      });
  });

  it('Expect DELETE /api/payees/ to delete all payees', (done) => {
    chai.request(server)
      .delete(`/api/payees/`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals(`Success - Deleted all payees in the database`);
        done();
      });
  });


});