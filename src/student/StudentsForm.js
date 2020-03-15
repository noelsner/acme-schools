import React, { useState } from 'react';

const StudentsForm = ({ createStudent, schools }) => {
  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState(undefined);

  const onSubmit = ev => {
    ev.preventDefault();
    createStudent({ name, schoolId });
    setName('');
  };
  return (
    <div className="flex-1 mx-4">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-800 text-xl font-bold mb-2">
            Create Student
          </label>
          <input
            className="text-gray-800 shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
            placeholder="Student Name"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
        </div>
        <div className="inline-block relative w-full">
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
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pb-4 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px4 rounded w-full"
            type="submit"
            disabled={!name}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentsForm;
