const subjects = require('../../src/data/subjects.json');

module.exports = (req, res) => {
  res.json(subjects);
};
