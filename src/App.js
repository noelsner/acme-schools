import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import SchoolsForm from './SchoolsForm';
import StudentsForm from './StudentsForm';
import SchoolList from './SchoolList';
import SchoolPage from './SchoolPage';
import StudentPage from './StudentPage';

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

  const deleteSchool = async(id) => {
    try {
      await axios.delete(`/api/schools/${id}`);
      setSchools(schools.filter(school => school.id !== id));
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const deleteStudent = async(id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const updateSchool = async(school) => {
    try {
      await axios.put(`/api/schools/${school.id}`, school).data;
      setSchools(schools.map((sch) => {
        if (sch.id === school.id ) {
          return school;
        } else {
          return sch;
        }
      }));
    } catch (e) {
      setError(e);
    }
  };

  const updateStudent = async(student) => {
    try {
      await axios.put(`/api/students/${student.id}`, student).data;
      setStudents(students.map((stu) => {
        if (stu.id === student.id ) {
          return student;
        } else {
          return stu;
        }
      }));
    } catch (e) {
      setError(e);
    }
  }

  return (
      <div>
        <div className="border mb-4 px-4">
          <h1 className="text-4xl font-bold text-gray-900 text-center"> <Link to="/">Acme Schools</Link> </h1>
          <div className="text-center">
            <span className="text-lg mr-3"> {schools.length} schools </span>|<span className="text-lg ml-3"> {students.length} students </span>
          </div>
        </div>
        {/* <Switch className="p-4"> */}
          <Route path="/" exact>
            <div className="border flex">
              <StudentsForm createStudent={createStudent} schools={schools} />
              <SchoolsForm createSchool={createSchool} />
            </div>
            <div>
              <SchoolList schools={schools} students={students} />
            </div>
          </Route>
          <Route path="/school/:schoolId" exact render={(props) => <SchoolPage school={schools.find(school => school.id === props.match.params.schoolId)} deleteSchool={deleteSchool} updateSchool={updateSchool} />} />
          <Route path="/student/:studentId" exact render={(props) => <StudentPage student={students.find(student => student.id === props.match.params.studentId)} deleteStudent={deleteStudent} schools={schools} updateStudent={updateStudent} />} />
        {/* </Switch> */}
      </div>
  );
};

export default App;