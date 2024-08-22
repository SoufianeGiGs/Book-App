import React from 'react';
import AdminSidebar from '../Components/AdminSidebar';
const Reports = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p>Page Reports.</p>
      </div>
    </div>
  );
};

export default Reports;
