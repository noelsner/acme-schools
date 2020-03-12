import React from 'react';

const SchoolList = ({ schools, students }) => {

  return (
    <div className="school-list">
      <ul>
          {
            schools.map( school => {
              const filteredStudents = students.filter(student => student.schoolId === school.id);
              return (
                <li key={school.id} className="school-container">
                  {
                    <div>
                      <h2> <a>{school.name}</a> </h2>
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