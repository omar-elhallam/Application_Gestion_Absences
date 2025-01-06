import React, { useState } from 'react';
import axios from 'axios';

const AttendanceForm = ({ classId, students, onMarkAttendance }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await axios.post(`http://localhost:3001/classes/${classId}/attendance`, {
        student: selectedStudent,
        date: new Date(),
      });
      onMarkAttendance(selectedStudent);
    } catch (error) {
      setErrorMessage('Erreur lors du marquage de l\'absence.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Marquer une absence</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="student">Étudiant :</label>
        <select
          id="student"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          required
        >
          <option value="">Sélectionnez un étudiant</option>
          {students.map((student, index) => (
            <option key={index} value={student}>
              {student}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Marquer comme absent'}
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
