const fs = require('fs');
const path = require('path');

let subjects = require('../../src/data/subjects.json');

function updateSubjectsData() {
  const filePath = path.resolve(__dirname, '../../src/data/subjects.json');
  delete require.cache[filePath];
  subjects = require(filePath);
}

// Watch the JSON file for changes
fs.watchFile(path.resolve(__dirname, '../../src/data/subjects.json'), () => {
  updateSubjectsData();
});

module.exports = (req, res) => {
  const studentIndex = req.params.index;
  const predmeti = [];
  subjects.forEach((subject) => {
    if (Object.keys(subject).includes(studentIndex)) {
      const updatedObj = {
        krediti: subject.krediti,
        ime: subject.ime,
        ocenka: subject[studentIndex],
      };
      predmeti.push(updatedObj);
    }
  });

  predmeti.length !== 0 ? res.json(predmeti) : res.status(404).send('Error: Not found!');
};