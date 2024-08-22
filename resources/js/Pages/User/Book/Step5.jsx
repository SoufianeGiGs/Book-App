import React from 'react';

const Step5 = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
 
  
 <div>
        <label htmlFor="auteur_2" className="block text-lg font-medium text-gray-700 mb-2">Auteur 2 (المؤلف 2)</label>
        <input
          type="text"
          name="auteur_2"
          id="auteur_2"
          value={formData.auteur_2 || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>

      <div>
        <label htmlFor="fonction_auteur_2" className="block text-lg font-medium text-gray-700 mb-2">Fonction Auteur 2 (وظيفة المؤلف 2)</label>
    
          <select

        name="fonction_auteur_2"
        id="fonction_auteur_2"
        value={formData.fonction_auteur_2 || ''}
        onChange={handleChange}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
  >
    
        <option value="translator">Translator (مترجم)</option>
        <option value="author">Author (مؤلف)</option>
        <option value="investigator">Investigator (محقق)</option>
        <option value="presenter">Presenter (مقدم)</option>
    
  </select>
      </div>
      <div>
        <label htmlFor="auteur_3" className="block text-lg font-medium text-gray-700 mb-2">Auteur 3 (المؤلف 3)</label>
        <input
          type="text"
          name="auteur_3"
          id="auteur_3"
          value={formData.auteur_3 || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="fonction_auteur_3" className="block text-lg font-medium text-gray-700 mb-2">Fonction Auteur 3 (وظيفة المؤلف 3)</label>
        <select
            name="fonction_auteur_3"
            id="fonction_auteur_3"
            value={formData.fonction_auteur_3 || ''}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
>
            <option value="investigator">Investigator (محقق)</option>
            <option value="author">Author (مؤلف)</option>
            <option value="translator">Translator (مترجم)</option>
            <option value="presenter">Presenter (مقدم)</option>

    </select>
      </div>  
        <div>
        <label htmlFor="auteur_4" className="block text-lg font-medium text-gray-700 mb-2">Auteur 4 (المؤلف 4)</label>
        <input
          type="text"
          name="auteur_4"
          id="auteur_4"
          value={formData.auteur_4 || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="fonction_auteur_4" className="block text-lg font-medium text-gray-700 mb-2">Fonction Auteur 4 (وظيفة المؤلف 4)</label>
        <select

        name="fonction_auteur_4"
        id="fonction_auteur_4"
        value={formData.fonction_auteur_4 || ''}
        onChange={handleChange}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
  >     
        
        <option value="presenter">Presenter (مقدم)</option>
        <option value="author">Author (مؤلف)</option>
        <option value="translator">Translator (مترجم)</option>
        <option value="investigator">Investigator (محقق)</option>
    
  </select>
      </div>
      <div>
        <label htmlFor="type_auteur" className="block text-lg font-medium text-gray-700 mb-2">Type Auteur (نوع المؤلف)</label>
        <input
          type="text"
          name="type_auteur"
          id="type_auteur"
          value={formData.type_auteur || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
      <div>
        <label htmlFor="localisation" className="block text-lg font-medium text-gray-700 mb-2">Localisation (الموقع)</label>
        <input
          type="text"
          name="localisation"
          id="localisation"
          value={formData.localisation || ''}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>
   
    
    </div>
  );
};

export default Step5;

