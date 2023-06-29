const studentsRouter = require('express').Router();

const students = require('./students');
const studentIndex = require('./studentIndex');
const studentSubjects = require('./studentSubjects');

studentsRouter.route('/').get(students)

studentsRouter
  .route('/:index')
  .get(studentIndex)

studentsRouter.route('/:index/subjects').get(studentSubjects);

module.exports = studentsRouter;
