import React from 'react';

const Step4 = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
     
       
   
         
     <div>
        <label htmlFor="numero_collection" className="block text-lg font-medium text-gray-700 mb-2">Numéro de Collection (رقم المجموعة)</label>
        <input
          type="text"
          name="numero_collection"
          id="numero_collection"
          value={formData.numero_collection || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="mention_edition" className="block text-lg font-medium text-gray-700 mb-2">Mention d'Édition (ذكر الإصدار)</label>
        <input
          type="text"
          name="mention_edition"
          id="mention_edition"
          value={formData.mention_edition || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="lien" className="block text-lg font-medium text-gray-700 mb-2">Lien (الرابط)</label>
        <input
          type="text"
          name="lien"
          id="lien"
          value={formData.lien || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="numero_serie" className="block text-lg font-medium text-gray-700 mb-2">Numéro de Série (رقم السلسلة)</label>
        <input
          type="text"
          name="numero_serie"
          id="numero_serie"
          value={formData.numero_serie || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="tome" className="block text-lg font-medium text-gray-700 mb-2">Tome (المجلد)</label>
        <input
          type="number"
          name="tome"
          id="tome"
          value={formData.tome || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="volume" className="block text-lg font-medium text-gray-700 mb-2">Volume (الجزء)</label>
        <input
          type="text"
          name="volume"
          id="volume"
          value={formData.volume || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="cote" className="block text-lg font-medium text-gray-700 mb-2">La Cote (رمز الكتاب)</label>
        <input
          type="text"
          name="cote"
          id="cote"
          value={formData.cote || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="fonction" className="block text-lg font-medium text-gray-700 mb-2">Fonction de l'auteur (وظيفة)</label>
        <select
        name="fonction"
        id="fonction"
        value={formData.fonction_auteur1 || 'author'}
        onChange={handleChange}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
  >
        <option value="author">Author (مؤلف)</option>
        <option value="translator">Translator (مترجم)</option>
        <option value="investigator">Investigator (محقق)</option>
        <option value="presenter">Presenter (مقدم)</option>
    
  </select>
      </div>
    </div>
  );
};

export default Step4;
