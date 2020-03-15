import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const StudentPage = ({ student = {}, deleteStudent, schools, updateStudent }) => {
  if (!student.id) {
    return <p> Loading... </p>;
  }

  const [name, setName] = useState(student.name);
  const [schoolId, setSchoolId] = useState(student.schoolId);
  const history = useHistory();

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateStudent({name, schoolId, id: student.id});
  };

  const destroy = () => {
    deleteStudent(student.id)
      .then(history.push('/'));
  };

  return (
    <div className="flex-1 mx-4">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 text-xl font-bold mb-2">Update Student</label>
          <input className="text-gray-800 shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline" placeholder="Student" value={name} onChange={ev => setName(ev.target.value)} />
        </div>

        <div>
          <select
            className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={schoolId}
            onChange={ev => {
              if (ev.target.value === '-- select a school --') {
                setSchoolId(undefined);
              } else {
                setSchoolId(ev.target.value);
              }
            }}
          >
            <option> -- select a school -- </option>
            {schools.map(school => {
              return (
                <option key={school.id} value={school.id}>
                  {" "}
                  {school.name}{" "}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4" type="submit">Update</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={destroy}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default StudentPage;