import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const StudentPage = ({ student = {}, deleteStudent}) => {
  if (!student.id) {
    return <p> Loading... </p>;
  }
  const [name, setName] = useState(student.name);
  const history = useHistory();

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('update clicked');
    setName('');
  };

  const destroy = () => {
    deleteStudent(student.id)
      .then(history.push('/'));
  };

  return (
    <div className="border flex-1 mx-4">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 text-xl font-bold mb-2">Update Student</label>
          <input className="text-gray-800 shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline" placeholder="Student" value={name} onChange={ev => setName(ev.target.value)} />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4" type="submit" disabled={student && student.name === name}>Update</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={destroy}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default StudentPage;