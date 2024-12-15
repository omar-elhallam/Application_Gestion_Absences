import React, { useState } from 'react';
import './App.css';
import AcademicYearForm from './components/AcademicYearForm';
import AcademicYearList from './components/AcademicYearList';

const App = () => {
  const [academicYears, setAcademicYears] = useState([]);

  const addAcademicYear = (newYear) => {
    setAcademicYears([...academicYears, newYear]);
  };

  return (
    <div className="App">
      <AcademicYearForm onAddYear={addAcademicYear} />
      <AcademicYearList academicYears={academicYears} />
    </div>
  );
};

export default App;
