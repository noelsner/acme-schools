const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const createSchool = async({ name }) => {
  return (await client.query('INSERT INTO schools(name) VALUES($1) RETURNING *', [ name ])).rows[0];
};

const createStudent = async({ name, schoolId }) => {
  return (await client.query('INSERT INTO students(name, "schoolId") VALUES($1, $2) RETURNING *', [ name, schoolId ])).rows[0];
};

module.exports = {
  schools: createSchool,
  students: createStudent
};