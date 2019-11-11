/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./src/users');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function (req, res) {
  res.send('wecome');
});
app.get('/user', User.getAll);
app.post('/user', User.createUser);

app.listen(3000);
console.log('connected 3000');

module.exports = {
  app,
};
