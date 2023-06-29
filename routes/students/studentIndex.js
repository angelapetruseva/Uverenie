const students = require('../../src/data/students.json');

module.exports = (req, res) => {
  const studentIndex = req.params.index;
  const student = students.find(student => student.index == studentIndex);

  student !== undefined
    ? res.json(student)
    : res.status(404).send('404:Not found!');
};
