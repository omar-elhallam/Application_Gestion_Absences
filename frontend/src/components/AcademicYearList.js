import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcademicYearList = () => {
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('http://localhost:3001/academic-years');
        setAcademicYears(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des années académiques', error);
      }
    };

    fetchAcademicYears();
  }, []);

  return (
    <div className="year-list">
      <h2>Années académiques</h2>
      <ul>
        {academicYears.map((year, index) => (
          <li key={index}>
            {year.yearName} - Semestre 1: {year.semesters[0]}, Semestre 2: {year.semesters[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicYearList;
