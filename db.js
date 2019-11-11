const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// const connectionString = 'postgressql://me1:pass@127.0.0.1:5432/teamwork';
// const pool = new Pool({
//  connectionString: connectionString
// });

pool.connect();

pool.query('SELECT * FROM users', (err, res) => {
  console.log(err, res);
  pool.end();
});
