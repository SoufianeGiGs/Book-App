import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import axios from 'axios';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    titre_propre: '',
    ISBN: '',
    titre_parallele: '',
    titre_auteur_different: '',
    complement_titre: '',
    annee_edition: '',
    nombre_pages: '',
    illustration: '',
    taille_de_page: '',
    note_generale: '',
    note_contenu: '',
    resume: '',
    indexation_decimale: '',
    mots_cles: '',
    date_de_parution: '',
    code_exemplaire: '',
    localisation: '',
    section: '',
    materiel_accompagnement: '',
    nom_auteur: '',
    fonction: '',
    code_edition: '',
    ville_edition: '',
    pays_edition: '',
    code_langue: '',
    collection: '',
    sous_collection: '',
    numero_collection: '',
    mention_edition: '',
    lien: '',
    numero_serie: '',
    tome: '',
    volume: '',
    cote: '',
    fonction_auteur_1: '',
    auteur_2: '',
    fonction_auteur_2: '',
    auteur_3: '',
    fonction_auteur_3: '',
    auteur_4: '',
    fonction_auteur_4: '',
    type_auteur: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      await axios.post('/user/book', formData);
      alert('Book added successfully!');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error('Error adding book:', error);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} errors={errors} />;
      case 5:
        return <Step5 formData={formData} handleChange={handleChange} errors={errors} />;
      case 6:
        return <Step6 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <img style={{ width: "100px", height: "100px" }} src="/images/book.webp" alt="" />
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-block bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Back
              </button>
            )}
            {step < 6 && (
              <button
                type="button"
                onClick={handleNext}
                className={`inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ${step === 1 ? 'ml-auto' : ''}`}
              >
                Next
              </button>
            )}
            {step === 6 && (
              <button
                type="submit"
                className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStep(i + 1)}
                  className={`w-3 h-3 rounded-full ${i + 1 === step ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
