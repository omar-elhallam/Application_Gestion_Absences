import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icônes pour modifier et supprimer

const AcademicYearList = ({ onEditYear, onDeleteYear, onEditSemester, onDeleteSemester }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [error, setError] = useState('');

  // Récupérer les années académiques depuis l'API
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('http://localhost:3001/academic-years');
        // Assurer que les données sont uniques et sans doublon
        setAcademicYears(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des années académiques');
        console.error(error);
      }
    };

    fetchAcademicYears();
  }, []); // Le tableau vide [] permet de ne récupérer les données qu'une seule fois au chargement du composant

  // Affichage des années académiques avec les semestres et actions
  return (
    <div className="year-list">
      <h2>Années académiques</h2>
      {error && <div className="error-message">{error}</div>}
      {academicYears.length === 0 ? (
        <p>Aucune année académique disponible.</p>
      ) : (
        academicYears.map((year, index) => (
          <div key={index} className="year-card">
            <h3>{year.yearName}</h3>
            <ul>
              {year.semesters && year.semesters.length > 0 ? (
                year.semesters.map((semester, i) => (
                  <li key={i}>
                    <strong>{semester.name}</strong> {/* Affichage du nom du semestre */}
                    <div className="semester-actions">
                      <button className="edit-button" onClick={() => onEditSemester(year, i)}>
                        <FaEdit /> Modifier
                      </button>
                      <button className="delete-button" onClick={() => onDeleteSemester(year, i)}>
                        <FaTrashAlt /> Supprimer
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>Aucun semestre disponible pour cette année.</p>
              )}
            </ul>
            <div className="year-actions">
              <button className="edit-button" onClick={() => onEditYear(year)}>
                <FaEdit /> Modifier l'année
              </button>
              <button className="delete-button" onClick={() => onDeleteYear(year)}>
                <FaTrashAlt /> Supprimer l'année
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcademicYearList;
