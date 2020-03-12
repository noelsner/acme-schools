import React, {useState} from 'react';

const SchoolsForm = ({ schools }) => {
  const [name, setName] = useState('');

  console.log('schools :', schools);
  return (
    <div>
      <h1>school form</h1>
    </div>
  );
};

export default SchoolsForm;