/* eslint-disable no-undef */
// Import the dependencies for testing
const chaiHttp = require('chai-http');
const chai = require('chai');
const { app } = require('../server');
// Configure chai

const data = {
  fname: 'Najib',
  lname: 'Lere',
  username: 'me1',
  password: '11',
  email: 'nk@gmaisl.com',
  role: '',
  dept: 'IT',
  address: 'KD',
  title: 'I need help on Linting',
  article: 'Errors on new line',
  gifurl: 'gifcom',
  comment: 'im in for this ok.',
};
chai.use(chaiHttp);
chai.should();
let auth = {};

describe('Sign /', () => {
  it('sign users', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data)
      .end((err, res) => {
        auth.token = res.body.data.token;
        res.status.should.be.equal(200);

        done();
      });
  });
});

/*
describe('Post /', () => {

  it('trying to  add user that exist', (done) => {
    // console.log(auth);
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .send('token', auth)
      .send(data)
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
});
/*
describe('Students', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all users record', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(201);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});
*/
