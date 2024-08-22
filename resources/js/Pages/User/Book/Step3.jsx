import React from 'react';

const Step3 = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
         <div>
        <label htmlFor="nom_auteur" className="block text-lg font-medium text-gray-700 mb-2">Nom de l'Auteur (اسم المؤلف)</label>
        <input
          type="text"
          name="nom_auteur"
          id="nom_auteur"
          value={formData.nom_auteur || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="editeur" className="block text-lg font-medium text-gray-700 mb-2">Editeur (الناشر)</label>
        <input
          type="text"
          name="editeur"
          id="editeur"
          value={formData.editeur || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="code_editeur" className="block text-lg font-medium text-gray-700 mb-2">Code d'Éditeur (رمز الناشر)</label>
        <input
          type="text"
          name="code_editeur"
          id="code_editeur"
          value={formData.code_editeur || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="ville_edition" className="block text-lg font-medium text-gray-700 mb-2">Ville d'Édition (مدينة النشر)</label>
        <input
          type="text"
          name="ville_edition"
          id="ville_edition"
          value={formData.ville_edition || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="pays_edition" className="block text-lg font-medium text-gray-700 mb-2">Pays d'Édition (بلد النشر)</label>
        <input
          type="text"
          name="pays_edition"
          id="pays_edition"
          value={formData.pays_edition || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="code_langue" className="block text-lg font-medium text-gray-700 mb-2">Code Langue (رمز اللغة)</label>
        <select
          name="code_langue"
          id="code_langue"
          value={formData.code_langue || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
          >
          <option value="arabic">Arabic (عربي)</option>
          <option value="english">English (إنجليزي)</option>
          <option value="french">French (فرنسي)</option>
          
    
  </select>
      </div>
      <div>
        <label htmlFor="collection" className="block text-lg font-medium text-gray-700 mb-2">Collection (مجموعة)</label>
        <input
          type="text"
          name="collection"
          id="collection"
          value={formData.collection || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="sous_collection" className="block text-lg font-medium text-gray-700 mb-2">Sous-Collection (مجموعة فرعية)</label>
        <input
          type="text"
          name="sous_collection"
          id="sous_collection"
          value={formData.sous_collection || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
    

     
   
  
    </div>
  );
};

export default Step3;
