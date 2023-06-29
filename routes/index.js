const routes = require('express').Router();
const subjects = require('./subjects');
const students = require('./students');

routes.use('/subjects', subjects);

routes.use('/students', students);

routes.get('/', (req, res) => {
  res.json({ message: 'Connected!' });
});

module.exports = routes;
