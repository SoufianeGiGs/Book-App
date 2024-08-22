import React from 'react';

const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 bg-${color}-500 text-white rounded-lg shadow-md flex items-center`}>
      <div className="flex-shrink-0">
        <i className={`fas fa-${icon} text-3xl`}></i>
      </div>
      <div className="ml-4">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
