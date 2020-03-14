const express = require('express');
const path = require('path');
const db = require('./src/database/db');
const reads = require('./src/database/reads');
const creates = require('./src/database/creates');
const deletes = require('./src/database/deletes');
const updates = require('./src/database/updates');

const app = express();

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

['schools', 'students'].forEach(table => {

  app.get(`/api/${table}`, (req, res, next) => {
    reads[table]()
      .then(read => res.send(read))
      .catch(next);
  });

  app.post(`/api/${table}`, (req, res, next) => {
    creates[table](req.body)
      .then(created => res.send(created))
      .catch(next);
  });

  app.delete(`/api/${table}/:id`, (req, res, next) => {
    deletes[table](req.params.id)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  app.put(`/api/${table}/:id`, (req, res, next) => {
    updates[table](req.body)
      .then(updated => res.send(updated))
      .catch(next);
  });
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  });