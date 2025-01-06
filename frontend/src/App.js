import React, { useState } from 'react';
import './App.css';
import AcademicYearForm from './components/AcademicYearForm';
import AcademicYearList from './components/AcademicYearList';
import ClassForm from './components/ClassForm'; // Nouveau composant pour ajouter des classes
import ClassList from './components/ClassList'; // Nouveau composant pour afficher les classes
import AbsenceMarking from './components/AbsenceMarking'; // Nouveau composant pour marquer les absences
import Dashboard from './components/Dashboard'; // Nouveau composant pour le tableau de bord

const App = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]); // État pour les classes
  const [absences, setAbsences] = useState([]); // État pour les absences

  const addAcademicYear = (newYear) => {
    setAcademicYears([...academicYears, newYear]);
  };

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const markAbsence = (studentId, date) => {
    setAbsences([...absences, { studentId, date }]);
  };

  return (
    <div className="App">
      

      {/* Formulaire d'ajout d'une nouvelle année académique */}
      <AcademicYearForm onAddYear={addAcademicYear} />

      {/* Liste des années académiques */}
      <AcademicYearList academicYears={academicYears} />

      {/* Formulaire d'ajout d'une classe */}
      <ClassForm onAddClass={addClass} />

      {/* Liste des classes */}
      <ClassList classes={classes} />

      {/* Interface de marquage des absences */}
      <AbsenceMarking onMarkAbsence={markAbsence} classes={classes} />

      {/* Tableau de bord des absences */}
      <Dashboard absences={absences} classes={classes} />
    </div>
  );
};

export default App;
