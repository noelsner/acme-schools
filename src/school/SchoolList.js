import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SchoolList = ({ schools, students, updateStudent }) => {
  const history = useHistory();
  const unenrolledStudents = students.filter(student => !student.schoolId);

  const unenrollStudent = ev => {
    const name = students.find(student => student.id === ev.target.value).name;
    updateStudent({ name, schoolId: undefined, id: ev.target.value });
  };

  const enrollStudent = (ev, schoolId) => {
    const name = students.find(student => student.id === ev.target.value).name;
    updateStudent({ name, schoolId, id: ev.target.value });
  };

  return (
    <div>
      <ul className="flex flex-wrap">
        <li className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 m-4 text-center">
          <div className="mb-2 text-2xl underline">Unenrolled Students</div>
          <ul>
            {unenrolledStudents.map(unenrolledStudent => {
              return (
                <li key={unenrolledStudent.id}>
                  {" "}
                  <a
                    onClick={() =>
                      history.push(`/student/${unenrolledStudent.id}`)
                    }
                  >
                    {unenrolledStudent.name}
                  </a>{" "}
                </li>
              );
            })}
          </ul>
        </li>
        {schools.map(school => {
          const filteredStudents = students.filter(
            student => student.schoolId === school.id
          );
          return (
            <li
              key={school.id}
              className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 m-4 text-center"
            >
              {
                <div>
                  <button
                    type="button"
                    className="mb-2 text-2xl underline hover:text-blue-500"
                    onClick={() => history.push(`/school/${school.id}`)}
                  >
                    {" "}
                    {school.name}{" "}
                  </button>
                  <div className="inline-block relative w-full">
                    <select
                      className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 my-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      value="-- enroll a student --"
                      onChange={ev => enrollStudent(ev, school.id)}
                    >
                      <option> -- enroll a student -- </option>
                      {students.map(student => {
                        if (student.schoolId !== school.id) {
                          return (
                            <option key={student.id} value={student.id}>
                              {" "}
                              {student.name}{" "}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pb-4 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  <ul>
                    {filteredStudents.map(filteredStudent => {
                      return (
                        <li key={filteredStudent.id}>
                          <button
                            type="button"
                            onClick={() =>
                              history.push(`/student/${filteredStudent.id}`)
                            }
                            className="m-4 text-xl font-bold hover:text-blue-500"
                          >
                            {filteredStudent.name}
                          </button>
                          <button
                            type="button"
                            onClick={ev => unenrollStudent(ev)}
                            value={filteredStudent.id}
                            className="m-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          >
                            Unenroll
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SchoolList;
