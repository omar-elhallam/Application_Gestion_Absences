// src/components/AbsenceMarking.js
import React, { useState } from 'react';

const AbsenceMarking = ({ onMarkAbsence, classes }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  // Gérer la sélection de classe et d'étudiant
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleMarkAbsence = () => {
    if (selectedClass && selectedStudent) {
      onMarkAbsence(selectedStudent, new Date().toISOString().split('T')[0]); // Marquer l'absence avec la date d'aujourd'hui
    }
  };

  return (
    <div>
      <h3>Marquer une absence</h3>
      <select onChange={handleClassChange} value={selectedClass}>
        <option value="">Choisir une classe</option>
        {classes.map((classItem, index) => (
          <option key={index} value={classItem.id}>{classItem.name}</option>
        ))}
      </select>

      <select onChange={handleStudentChange} value={selectedStudent}>
        <option value="">Choisir un étudiant</option>
        {selectedClass && classes.find(classItem => classItem.id === selectedClass)?.students.map((student, index) => (
          <option key={index} value={student.id}>{student.name}</option>
        ))}
      </select>

      <button onClick={handleMarkAbsence}>Marquer Absence</button>
    </div>
  );
};

export default AbsenceMarking;
