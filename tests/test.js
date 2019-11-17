/* eslint-disable no-undef */
// Import the dependencies for testing
const request = require('supertest');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { app } = require('../server');
const db = require('../src/query.js');
// Configure chai

beforeAll(async () => {
  await db.query('CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT)');
});

beforeEach(async () => {
  // seed with some data
  await db.query("INSERT INTO students (name) VALUES ('Elie'), ('Matt')");
});

afterEach(async () => {
  // await db.query('DELETE FROM students');
});

afterAll(async () => {
  // await db.query('DROP TABLE students');
  app.pool.end();
});

describe('GET / ', () => {
  test('It should respond with an array of students', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual('wellcome');
    expect(response.statusCode).toBe(200);
    console.log('ffff kfkfk fkkf kkfo '+ response.body);
  });
});

describe('POST /students', () => {
  test('It responds with the newly created student', async () => {
    const newStudent = await request(app)
      .post('/api/v1/auth/create-user')
      .send({
        username: 'New',
        password: 'pass',
        email: 'new@gmail.com',
        dept: 'it',
        fname: 'user',
      });

    // make sure we add it correctly
    // console.log('hhhhhhhhhhhhh trtrrb '+newStudent);
    expect(newStudent.body.data).toHaveProperty('token');
    expect(newStudent.body.data.username).toBe('New');
    expect(newStudent.statusCode).toBe(201);
    // make sure we have 3 students now
    // const response = await request(app).get('/students');
    // expect(response.body.data.length).toBe(3);
  });
});

describe('POST /user', () => {
  test('login user', async () => {
    const newStudent = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'New',
        password: 'pass',
        email: 'new@gmail.com',
        dept: 'it',
        fname: 'user',
      });

    // make sure we add it correctly
    // console.log('hhhhhhhhhhhhh trtrrb '+newStudent);
    expect(newStudent.body.data).toHaveProperty('token');
    // expect(newStudent.body.data.username).toBe('New');
    // expect(newStudent.body).toBe('body');
    expect(newStudent.statusCode).toBe(200);
    // make sure we have 3 students now
    // const response = await request(app).get('/students');
    // expect(response.body.data.length).toBe(3);
  });
});

/*
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

describe('Create table/', () => {
  it('table users', async (done) => {
    const text1 = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        fName VARCHAR(100) NOT NULL,
        lName VARCHAR(100) Null,
        username VARCHAR(100)  NOT NULL,
        pWord TEXT NOT NULL,
        email VARCHAR(100)  NOT NULL,
        role VARCHAR(100) Null,
        dept VARCHAR(100) NOT NULL,
        address VARCHAR(255) NULL,
        created_date TIMESTAMP
      )`;

    const text2 = `INSERT INTO users (fName, username, pword, email, dept)
       VALUES('me', 'me1', '11', 'nk@gmaisl.com','it')`;
    await db.query(text1);
    await db.query(text2);
    done();
  });
});

describe('Sign /', () => {
  it('sign users', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data)
      .end((err, res) => {
        // auth.token = res.body.data.token;
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
