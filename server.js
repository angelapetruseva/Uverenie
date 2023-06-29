const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () =>
  console.log(`API on http://localhost:${port}`)
);
