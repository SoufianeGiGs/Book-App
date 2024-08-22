import React from 'react';

const Step6 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      
  
        <div>
          <label htmlFor="section" className="block text-lg font-medium text-gray-700 mb-2">Section (القسم)</label>
          <select
              name="section"
              id="section"
              value={formData.section || ''}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
            >
              <option value="adulte">Adulte (بالغ)</option>
              <option value="jeunesse">Jeunesse (شباب)</option>
          </select>
        </div>
      <div>
        <label htmlFor="materiel_accompagnement" className="block text-lg font-medium text-gray-700 mb-2">Matériel d'Accompagnement (المواد المصاحبة)</label>
        <input
          type="text"
          name="materiel_accompagnement"
          id="materiel_accompagnement"
          value={formData.materiel_accompagnement || '' }
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 text-lg"
        />
      </div>


  
    </div>
  );
};

export default Step6;
