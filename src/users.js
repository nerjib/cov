/* eslint-disable no-console */

// const dotenv = require('dotenv');

const moment = require('moment');
const db = require('./query.js');
const Helper = require('./helper');


// create user
/*
async function createUser(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Some values are missing' });
  }
  const hashPassword = Helper.hashPassword(req.body.password);
  console.log(hashPassword);
  const createQuery = `INSERT INTO
    users (fname, lname, username, pword, email, role, dept, address, created_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.username,
    hashPassword,
    req.body.email,
    req.body.role,
    req.body.dept,
    req.body.address,
    moment(new Date()),
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    // console.log(rows);
    const token1 = Helper.generateToken(rows[0].id);
    const data = {
      status: 'success',
      data: {
        message: 'User account successfully created',
        token: token1,
        userId: rows[0].id,
      },
    };
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}
*/

async function createUser(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ message: 'Please enter a valid email address' });
  }
  const hashPassword = Helper.hashPassword(req.body.password);
  const createQuery = `INSERT INTO
    users(fname, lname, username, pword, email, role, dept, address, created_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.username,
    hashPassword,
    req.body.email,
    req.body.role,
    req.body.dept,
    req.body.address,
    moment(new Date()),
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    // const token = Helper.generateToken(rows[0].id);
    // console.log(`this is the token ${token}`);
    return res.status(201).json(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that username already exist' });
    }
    return res.status(201).send(error);
  }
}

async function getAll(req, res) {
  const getAllQ = 'SELECT * FROM users';
  try {
  // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
}


// Login
async function login(req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ message: 'Please enter a valid email address' });
  }
  const text = 'SELECT * FROM users WHERE username = $1';
  try {
    const { rows } = await db.query(text, [req.body.username]);
    if (!rows[0]) {
      return res.status(400).send({ message: 'user not found, check the username' });
    }
    console.log(rows[0].pword);
    if (!Helper.comparePassword(rows[0].pword, req.body.password)) {
      return res.status(400).send({ message: 'The credentials you provided is incorrect' });
    }
    const k = JSON.parse(rows[0].id);
    const token = Helper.generateToken(k);
    const data = {
      status: 'success',
      data: {
        token,
        userId: k,
      },
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}
// view single member
async function getOne(req, res) {
  const text = 'SELECT * FROM users WHERE username = $1';
  console.log(req.params.id);
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// delete user
async function deleteUser(req, res) {
  const deleteQuery = 'DELETE FROM users WHERE username=$1 returning *';
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(204).send({ message: 'deleted' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  getAll,
  getOne,
  createUser,
  deleteUser,
  login,
};
