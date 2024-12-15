import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AcademicYearForm = ({ onAddYear }) => {
  const [semesters, setSemesters] = useState([{ name: '', startDate: '', endDate: '' }]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation schema avec Yup
  const validationSchema = Yup.object().shape({
    yearName: Yup.string().required("Le nom de l'année académique est requis."),
    semesters: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Nom du semestre requis."),
        startDate: Yup.date().required("Date de début requise."),
        endDate: Yup.date()
          .required("Date de fin requise.")
          .min(Yup.ref("startDate"), "La date de fin doit être après la date de début."),
      })
    ).min(1, "Ajoutez au moins un semestre."),
  });

  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      yearName: '',
      semesters,
    },
  });

  // Ajouter un semestre
  const addSemester = () => {
    const newSemester = { name: '', startDate: '', endDate: '' };
    const updatedSemesters = [...semesters, newSemester];
    setSemesters(updatedSemesters);
    setValue("semesters", updatedSemesters); // Mettre à jour la valeur dans react-hook-form
  };

  // Supprimer un semestre
  const removeSemester = (index) => {
    const updatedSemesters = semesters.filter((_, i) => i !== index);
    setSemesters(updatedSemesters);
    setValue("semesters", updatedSemesters); // Mettre à jour la valeur dans react-hook-form
  };

  // Gestion de la soumission du formulaire
  const handleFormSubmit = async (data) => {
    if (!data.yearName || !data.semesters.every(semester => semester.name && semester.startDate && semester.endDate)) {
      setErrorMessage('Tous les champs doivent être remplis.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3001/academic-years', {
        yearName: data.yearName,
        semesters: data.semesters,
      });
      onAddYear(response.data);
      setSemesters([{ name: '', startDate: '', endDate: '' }]); // Réinitialiser les semestres après ajout
    } catch (error) {
      setErrorMessage('Erreur lors de l\'ajout de l\'année académique. Essayez à nouveau.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une nouvelle année académique</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label htmlFor="yearName">Nom de l'année académique :</label>
          <Controller
            name="yearName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="yearName"
                required
                aria-label="Nom de l'année académique"
              />
            )}
          />
          {errors.yearName && <p className="error">{errors.yearName.message}</p>}
        </div>

        {/* Semestres */}
        <div className="semesters-section">
          <h3>Semestres</h3>
          {semesters.map((semester, index) => (
            <div key={index} className="semester-fields">
              <Controller
                name={`semesters[${index}].name`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`Nom du semestre ${index + 1}`}
                    aria-label={`Nom du semestre ${index + 1}`}
                  />
                )}
              />
              {errors.semesters?.[index]?.name && (
                <p className="error">{errors.semesters[index].name.message}</p>
              )}
              <Controller
                name={`semesters[${index}].startDate`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    aria-label={`Date de début du semestre ${index + 1}`}
                  />
                )}
              />
              {errors.semesters?.[index]?.startDate && (
                <p className="error">{errors.semesters[index].startDate.message}</p>
              )}
              <Controller
                name={`semesters[${index}].endDate`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    aria-label={`Date de fin du semestre ${index + 1}`}
                  />
                )}
              />
              {errors.semesters?.[index]?.endDate && (
                <p className="error">{errors.semesters[index].endDate.message}</p>
              )}
              <button type="button" onClick={() => removeSemester(index)}>
                Supprimer
              </button>
            </div>
          ))}
          <button type="button" onClick={addSemester}>Ajouter un semestre</button>
        </div>

        <button type="submit" disabled={loading || semesters.length === 0}>
          {loading ? 'Chargement...' : 'Ajouter l\'année académique'}
        </button>
      </form>
    </div>
  );
};

export default AcademicYearForm;
