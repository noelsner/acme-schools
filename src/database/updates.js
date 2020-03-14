const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const updateSchool = async( school ) => {
  return (await client.query('UPDATE schools SET name=$1 WHERE id=$2 RETURNING *', [school.name, school.id])).rows[0];
};

const updateStudent = async( student ) => {
  return (await client.query('UPDATE students SET name=$1, "schoolId"=$2 WHERE id=$3 RETURNING *', [student.name, student.schoolId, student.id])).rows[0];
};

module.exports = {
  schools: updateSchool,
  students: updateStudent
};