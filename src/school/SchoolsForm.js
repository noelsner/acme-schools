import React, {useState} from 'react';

const SchoolsForm = ({ createSchool }) => {
  const [name, setName] = useState('');
  

  const onSubmit = (ev) => {
    ev.preventDefault();
    createSchool({name});
    setName('');
  };
  return (
    <div className="flex-1 mx-4">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 text-xl font-bold mb-2">Create School</label>
          <input className="text-gray-800 shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline" placeholder="School" value={name} onChange={ev => setName(ev.target.value)} />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px4 rounded w-full" type="submit" disabled={!name}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default SchoolsForm;