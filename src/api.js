import React, { useState } from "react";
import axios from "axios";
import {
  students,
  setStudents,
  schools,
  setSchools,
  error,
  setError
} from "./App";

const createSchool = async school => {
  try {
    const newSchool = (await axios.post("/api/schools", school)).data;
    setSchools([...schools, newSchool]);
  } catch (e) {
    console.log(e);
  }
};

const createStudent = async studentAndSchoolId => {
  try {
    const newStudent = (await axios.post("/api/students", studentAndSchoolId))
      .data;
    setStudents([...students, newStudent]);
  } catch (e) {
    console.log(e);
    setError(e);
  }
};

const deleteSchool = async id => {
  try {
    await axios.delete(`/api/schools/${id}`);
    setSchools(schools.filter(school => school.id !== id));
  } catch (e) {
    console.log(e);
    setError(e);
  }
};

const deleteStudent = async id => {
  try {
    await axios.delete(`/api/students/${id}`);
    setStudents(students.filter(student => student.id !== id));
  } catch (e) {
    // console.log(e.response.data);
    setError(e);
    console.log("error :", error);
  }
};

const updateSchool = async school => {
  try {
    await axios.put(`/api/schools/${school.id}`, school).data;
    setSchools(
      schools.map(sch => {
        if (sch.id === school.id) {
          return school;
        } else {
          return sch;
        }
      })
    );
  } catch (e) {
    setError(e);
  }
};

const updateStudent = async student => {
  try {
    await axios.put(`/api/students/${student.id}`, student).data;
    setStudents(
      students.map(stu => {
        if (stu.id === student.id) {
          return student;
        } else {
          return stu;
        }
      })
    );
  } catch (e) {
    setError(e);
  }
};

export {
  createSchool,
  createStudent,
  deleteSchool,
  deleteStudent,
  updateSchool,
  updateStudent
};
