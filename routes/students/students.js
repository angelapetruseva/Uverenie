const fs = require('fs');
const path = require('path');

let students = require('../../src/data/students.json');

function updateStudentsData() {
  const filePath = path.resolve(__dirname, '../../src/data/students.json');
  delete require.cache[filePath];
  students = require(filePath);
}

// Watch the JSON file for changes
fs.watchFile(path.resolve(__dirname, '../../src/data/students.json'), () => {
  updateStudentsData();
});

module.exports = (req, res) => {
  res.json(students);
};
