/* eslint-disable no-undef */
// Import the dependencies for testing
const chaiHttp = require('chai-http');
const chai = require('chai');
const { app } = require('../server');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe('Students', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all users record', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
