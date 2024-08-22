import React from 'react';

const Step2 = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
     
     <div>
        <label htmlFor="taille_de_page" className="block text-lg font-medium text-gray-700 mb-2">Taille de Page (حجم الصفحة)</label>
        <input
          type="text"
          name="taille_de_page"
          id="taille_de_page"
          value={formData.taille_de_page || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="note_generale" className="block text-lg font-medium text-gray-700 mb-2">Note Générale (ملاحظة عامة)</label>
        <textarea
          name="note_generale"
          id="note_generale"
          value={formData.note_generale || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        ></textarea>
      </div>
      <div>
        <label htmlFor="note_contenu" className="block text-lg font-medium text-gray-700 mb-2">Note de Contenu (ملاحظة المحتوى)</label>
        <textarea
          name="note_contenu"
          id="note_contenu"
          value={formData.note_contenu || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        ></textarea>
      </div>
      <div>
        <label htmlFor="resume" className="block text-lg font-medium text-gray-700 mb-2">Résumé (ملخص)</label>
        <textarea
          name="resume"
          id="resume"
          value={formData.resume || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        ></textarea>
      </div>
      <div>
        <label htmlFor="indexation_decimale" className="block text-lg font-medium text-gray-700 mb-2">Indexation Décimale (الفهرسة العشرية)</label>
        <input
          type="text"
          name="indexation_decimale"
          id="indexation_decimale"
          value={formData.indexation_decimale || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
      </div>
      <div>
        <label htmlFor="mots_cles" className="block text-lg font-medium text-gray-700 mb-2">Mots Clés (الكلمات المفتاحية)</label>
        <input
          type="text"
          placeholder='Separer par des virgules (mot,mot,...)'
          name="mots_cles"
          id="mots_cles"
          value={formData.mots_cles || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4"
        />
      </div>
      <div>
        <label htmlFor="date_de_parution" className="block text-lg font-medium text-gray-700 mb-2">Date de Parution (تاريخ النشر)</label>
        <input
          type="number"
          name="date_de_parution"
          id="date_de_parution"
          value={formData.date_de_parution || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="code_exemplaire" className="block text-lg font-medium text-gray-700 mb-2">Code Exemplaire (رمز النسخة)</label>
        <input
          type="text"
          name="code_exemplaire"
          id="code_exemplaire"
          value={formData.code_exemplaire || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>

  
    
 
    </div>
  );
};

export default Step2;
