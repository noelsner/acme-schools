import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const SchoolList = ({ schools, students }) => {
  const history = useHistory();
  const unenrolledStudents = students.filter(student => student.schoolId === null);
  const [studentId, setStudentId] = useState('');

  const unenrollStudent = () => {
    console.log('updateStudent({schoolId: null})');
    setStudentId('');
  };

  return (
    <div className="border">
      <ul className="flex flex-wrap">
        <li className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 m-4 text-center">
          <div className="mb-2 text-2xl underline">Unenrolled Students</div>
          <ul>
            {
              unenrolledStudents.map(unenrolledStudent => {
                return (
                  <li key={unenrolledStudent.id}> <a onClick={() => history.push(`/student/${unenrolledStudent.id}`)}>{unenrolledStudent.name}</a> </li>
                );
              })
            }
          </ul>
        </li>
        {
          schools.map( school => {
            const filteredStudents = students.filter(student => student.schoolId === school.id);
            return (
              <li key={school.id} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 m-4 text-center">
                {
                  <div>
                    <button type="button" className="mb-2 text-2xl underline hover:text-blue-500" onClick={() => history.push(`/school/${school.id}`)}> {school.name} </button>
                    <div>
                      <select className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 my-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={studentId} onChange={ev => setStudentId(ev.target.value)}>
                        <option value={null}> -- enroll a student -- </option>
                        {
                          students.map(student => {
                            //should exclude students already enrolled at this school from the options
                            return (
                              <option key={student.id} value={student.id}> {student.name} </option>
                            );
                          })
                        }
                      </select>
                    </div>
                    <ul>
                      {
                        filteredStudents.map(filteredStudent => {
                          return (
                            <li key={filteredStudent.id}>
                              <button
                                type="button"
                                onClick={() => history.push(`/student/${filteredStudent.id}`)}
                                className="m-4 text-xl font-bold hover:text-blue-500">
                                {filteredStudent.name}
                              </button>
                              <button
                                type="button"
                                onClick={ unenrollStudent }
                                className="m-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Unenroll
                              </button>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default SchoolList;