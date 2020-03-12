import React from 'react';

const SchoolList = ({ schools, students }) => {

  return (
    <div className="border">
      <ul className="flex">
          {
            schools.map( school => {
              const filteredStudents = students.filter(student => student.schoolId === school.id);
              return (
                <li key={school.id} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 m-4">
                  {
                    <div>
                      <h2 className="text-2xl"> <a>{school.name}</a> </h2>
                      <ul>
                        {
                          filteredStudents.map(filteredStudent => {
                            return (
                              <li key={filteredStudent.id}> <a>{filteredStudent.name}</a> </li>
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