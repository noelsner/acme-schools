const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const sync = async() => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS schools;

    CREATE TABLE schools(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) UNIQUE NOT NULL,
      CHECK (char_length(name) > 0)
    );
    
    CREATE TABLE students(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      "schoolId" UUID REFERENCES schools(id),
      CHECK (char_length(name) > 0)
    );
  `;
  await client.query(SQL);

  // const [calPoly, stanford] = await Promise.all([
  //   createSchool({name: 'Cal Poly'}),
  //   createSchool({name: 'Stanford'})
  // ]);

  // const [nick, katherine] = await Promise.all([
  //   createStudent({name: 'Nick', schoolId: stanford.id}),
  //   createStudent({name: 'Katherine', schoolId: calPoly.id})
  // ]);

};

const createSchool = async({ name }) => {
  return (await client.query('INSERT INTO schools(name) VALUES($1) RETURNING *', [ name ])).rows[0];
};

const createStudent = async({ name, schoolId }) => {
  return (await client.query('INSERT INTO students(name, "schoolId") VALUES($1, $2) RETURNING *', [ name, schoolId ])).rows[0];
};

const readSchool = async() => {
  return (await client.query('SELECT * FROM schools')).rows;
};

const readStudent = async() => {
  return (await client.query('SELECT * FROM students')).rows;
};

const deleteSchool = async( id ) => {
  await client.query('DELETE FROM schools WHERE id=$1', [ id ]);
};

const deleteStudent = async( id ) => {
  await client.query('DELETE FROM students WHERE id=$1', [ id ]);
};

module.exports = {
  sync,
  createSchool,
  createStudent,
  readSchool,
  readStudent,
  deleteSchool,
  deleteStudent
};