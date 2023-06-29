const subjectsRouter = require('express').Router();

const subjects = require('./subjects');

subjectsRouter.route('/').get(subjects);

module.exports = subjectsRouter;
