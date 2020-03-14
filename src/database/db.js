const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

client.connect();

const drop = async() => {
  await client.query(`
  DROP TABLE IF EXISTS students;
  DROP TABLE IF EXISTS schools;
  `);
}

const sync = async() => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

module.exports = {
  sync,
  client, 
  drop
};