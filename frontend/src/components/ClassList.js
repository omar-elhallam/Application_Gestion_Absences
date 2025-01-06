import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ClassList = ({ onEditClass, onDeleteClass }) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/classes');
        setClasses(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des classes.');
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="class-list">
      <h2>Liste des classes</h2>
      {error && <div className="error-message">{error}</div>}
      {classes.length === 0 ? (
        <p>Aucune classe disponible.</p>
      ) : (
        classes.map((classItem, index) => (
          <div key={index} className="class-card">
            <h3>{classItem.className}</h3>
            <ul>
              {classItem.students.map((student, i) => (
                <li key={i}>{student}</li>
              ))}
            </ul>
            <div className="class-actions">
              <button onClick={() => onEditClass(classItem)}>
                <FaEdit /> Modifier
              </button>
              <button onClick={() => onDeleteClass(classItem.id)}>
                <FaTrashAlt /> Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClassList;
