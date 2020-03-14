const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const readSchools = async() => {
  return (await client.query('SELECT * FROM schools')).rows;
};

const readStudents = async() => {
  return (await client.query('SELECT * FROM students')).rows;
};

module.exports = {
  schools: readSchools,
  students: readStudents
};