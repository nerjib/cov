
const { Pool } = require('pg');
const dotenv = require('dotenv');
const db = require('./query.js');
const moment = require ('moment');
const Helper = require('./helper');


dotenv.config();


//create user
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
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
};

    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object 
     */
 async function  getAll(req, res){
      const getAllQ = 'SELECT * FROM users';
      try {
        // const { rows } = qr.query(getAllQ);

        const { rows }  = await db.query(getAllQ);
        return res.status(201).send(rows);
      } catch(error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
        }
        return res.status(400).send(error+ " jsh");
      }
    };
 
  module.exports = {
      getAll,
      createUser
  };