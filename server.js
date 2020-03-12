const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/schools', (req, res, next) => {
  db.readSchool()
    .then(school => res.send(school))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  db.readStudent()
    .then(student => res.send(student))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  });