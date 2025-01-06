import React, { useState } from 'react';
import axios from 'axios';

const ClassForm = ({ onAddClass }) => {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddStudent = () => {
    setStudents([...students, '']);
  };

  const handleRemoveStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleStudentChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index] = value;
    setStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3001/classes', {
        className,
        students,
      });
      onAddClass(response.data);
      setClassName('');
      setStudents(['']);
    } catch (error) {
      setErrorMessage('Erreur lors de l\'ajout de la classe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une classe</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="className">Nom de la classe :</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <h3>Étudiants</h3>
        {students.map((student, index) => (
          <div key={index} className="student-input">
            <input
              type="text"
              placeholder={`Étudiant ${index + 1}`}
              value={student}
              onChange={(e) => handleStudentChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveStudent(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddStudent}>
          Ajouter un étudiant
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Ajouter la classe'}
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
