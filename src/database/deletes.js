const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const deleteSchool = async( id ) => {
  await client.query('DELETE FROM schools WHERE id=$1', [ id ]);
};

const deleteStudent = async( id ) => {
  await client.query('DELETE FROM students WHERE id=$1', [ id ]);
};

module.exports = {
  schools: deleteSchool,
  students: deleteStudent
};