/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Users = require('./src/users');
const Articles = require('./src/Articles');
const Auth = require('./src/Auth');

dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function (req, res) {
  res.send('wecome');
});

// app.get('/api/v1/articles/me', Auth.verifyToken, Articles.getMyArticles);
app.post('/api/v1/articles', Auth.verifyToken, Articles.create);
app.get('/api/v1/feeds', Auth.verifyToken, Articles.getAll);
app.get('/api/v1/articles/:id', Auth.verifyToken, Articles.getOne);
app.post('/api/v1/articles/:id/comments', Auth.verifyToken, Articles.postComments);
app.delete('/api/v1/articles/:id', Auth.verifyToken, Articles.deleteArticle);
app.get('/api/v1/articles/:id/comments/', Auth.verifyToken, Articles.getOneComments);
app.put('/api/v1/articles/:id', Auth.verifyToken, Articles.updateArticles);
app.post('/api/v1/auth/signin', Users.login);

app.get('/api/v1/users', Auth.verifyToken, Users.getAll);
app.delete('/api/v1/users/me', Auth.verifyToken, Users.deleteUser);
app.post('/api/v1/auth/create-user', Users.createUser);


app.listen(PORT);
console.log(`connected ${PORT}`);

module.exports = {
  app,
};
