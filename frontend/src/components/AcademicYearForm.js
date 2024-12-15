import React, { useState } from 'react';
import axios from 'axios';

const AcademicYearForm = ({ onAddYear }) => {
  const [yearName, setYearName] = useState('');
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/academic-years', {
        yearName,
        semesters: [semester1, semester2],
      });
      onAddYear(response.data); // Ajouter la nouvelle année académique à la liste
      setYearName('');
      setSemester1('');
      setSemester2('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'année académique', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une nouvelle année académique</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'année académique :</label>
          <input
            type="text"
            value={yearName}
            onChange={(e) => setYearName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Semestre 1 :</label>
          <input
            type="text"
            value={semester1}
            onChange={(e) => setSemester1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Semestre 2 :</label>
          <input
            type="text"
            value={semester2}
            onChange={(e) => setSemester2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AcademicYearForm;
