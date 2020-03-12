import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SchoolsForm from './SchoolsForm';
import StudentsForm from './StudentsForm';
import SchoolList from './SchoolList';

const App = () => {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get('/api/schools'),
      axios.get('/api/students')
    ]).then(responses => {
      setSchools(responses[0].data);
      setStudents(responses[1].data);
    });
  }, []);

  const createSchool = async(school) => {
    try {
      const newSchool = (await axios.post('/api/schools', school)).data;
      setSchools([...schools, newSchool]);
    } catch (e) {
      console.log(e);
    }
  };

  const createStudent = async(studentAndSchoolId) => {
    try {
      const newStudent = (await axios.post('/api/students', studentAndSchoolId)).data;
      setStudents([...students, newStudent]);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  return (
    <div className="p-4">
      <div className="border mb-4 px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center"> <a>Acme Schools</a> </h1>
        <div className="text-center">
          <span className="text-lg mr-3"> {schools.length} schools </span>|<span className="text-lg ml-3"> {students.length} students </span>
        </div>
      </div>
      <div className="border flex">
        <StudentsForm createStudent={createStudent} schools={schools} />
        <SchoolsForm createSchool={createSchool} />
      </div>
      <div>
        <SchoolList schools={schools} students={students} />
      </div>

    </div>
  );
};

export default App;