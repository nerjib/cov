/* eslint-disable no-undef */

// import app from '../server';

const chaiHttp = require('chai-http');
const chai = require('chai');
const { app } = require('../server');
// const should = chai.should();
afterAll(() => setTimeout(() => process.exit(), 1000));

chai.use(chaiHttp);
chai.should();

const data = {
  fname: 'Najib',
  lname: 'Lere',
  username: 'me367',
  password: '11',
  email: 'nk@gmaisl.com',
  role: 'admin',
  dept: 'IT',
  address: 'KD',
  title: 'I need help on Linting',
  article: 'Errors on new line',
  gifurl: 'gifcom',
  comment: 'im in for this ok.',
};

describe('Users', () => {
  describe('get /', () => {
    it('should get all users', async (done) => {
      chai.request(app)
        .get('/user')
        .end((err, res) => {
          // res.should.have.status(200);
          res.status.should.be.equal(201);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Post /', () => {
    it('trying to  add user that exist', (done) => {
      chai.request(app)
        .post('/user')
        .send(data)
        .end((err, res) => {
          res.status.should.be.equal(400);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});
