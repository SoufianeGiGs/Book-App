import React from 'react';

const Step1 = ({ formData, handleChange, errors }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="titre_propre" className="block text-lg font-medium text-gray-700 mb-2">
          Titre (العنوان) *
        </label>
        <input
          type="text"
          name="titre_propre"
          id="titre_propre"
          required
          value={formData.titre_propre || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.titre_propre && <p className="text-red-500 text-sm mt-1">{errors.titre_propre}</p>}
      </div>
      <div>
        <label htmlFor="titre_parallele" className="block text-lg font-medium text-gray-700 mb-2">
          Titre Parallele (العنوان الموازي)
        </label>
        <input
          type="text"
          name="titre_parallele"
          id="titre_parallele"
          value={formData.titre_parallele || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.titre_parallele && <p className="text-red-500 text-sm mt-1">{errors.titre_parallele}</p>}
      </div>
      <div>
        <label htmlFor="titre_auteur_different" className="block text-lg font-medium text-gray-700 mb-2">
          Titre Auteur Different (عنوان مختلف)
        </label>
        <input
          type="text"
          name="titre_auteur_different"
          id="titre_auteur_different"
          value={formData.titre_auteur_different || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.titre_auteur_different && <p className="text-red-500 text-sm mt-1">{errors.titre_auteur_different}</p>}
      </div>
      <div>
        <label htmlFor="complement_titre" className="block text-lg font-medium text-gray-700 mb-2">
          Complement du titre *
        </label>
        <input
          type="text"
          name="complement_titre"
          id="complement_titre"
          value={formData.complement_titre || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.complement_titre && <p className="text-red-500 text-sm mt-1">{errors.complement_titre}</p>}
      </div>
      <div>
        <label htmlFor="annee_edition" className="block text-lg font-medium text-gray-700 mb-2">
          Annee d'edition
        </label>
        <input
          type="number"
          name="annee_edition"
          id="annee_edition"
          value={formData.annee_edition || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.annee_edition && <p className="text-red-500 text-sm mt-1">{errors.annee_edition}</p>}
      </div>
      <div>
        <label htmlFor="ISBN" className="block text-lg font-medium text-gray-700 mb-2">
          ISBN *
        </label>
        <input
          type="text"
          name="ISBN"
          id="ISBN"
          required
          value={formData.ISBN || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.ISBN && <p className="text-red-500 text-sm mt-1">{errors.ISBN}</p>}
      </div>
      <div>
        <label htmlFor="nombre_pages" className="block text-lg font-medium text-gray-700 mb-2">
          Nombre de Pages (عدد الصفحات)
        </label>
        <input
          type="number"
          name="nombre_pages"
          id="nombre_pages"
          value={formData.nombre_pages || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
        {errors.nombre_pages && <p className="text-red-500 text-sm mt-1">{errors.nombre_pages}</p>}
      </div>
      <div>
        <label htmlFor="illustration" className="block text-lg font-medium text-gray-700 mb-2">
          Illustration (الرسوم التوضيحية)
        </label>
        <select
          name="illustration"
          id="illustration"
          value={formData.illustration || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {errors.illustration && <p className="text-red-500 text-sm mt-1">{errors.illustration}</p>}
      </div>
    </div>
  );
};

export default Step1;
