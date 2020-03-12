import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SchoolsForm from './SchoolsForm';
import SchoolList from './SchoolList';

const App = () => {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('/api/schools'),
      axios.get('/api/students')
    ]).then(responses => {
      setSchools(responses[0].data);
      setStudents(responses[1].data);
    });
  }, []);

  return (
    <div className="main">
      <div className="header">
        <h1> <a>Acme Schools</a> </h1>
        <h3> {schools.length} schools </h3>
        <h3> {students.length} stuents </h3>
      </div>
      <div>
        <SchoolsForm schools={schools} />
      </div>
      <div>
        <SchoolList schools={schools} students={students} />
      </div>

    </div>
  );
};

export default App;