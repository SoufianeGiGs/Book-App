import React from 'react';
import AdminSidebar from '../Components/AdminSidebar'; // Correct import path
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from '../Pages/AdminDashboard'; // Correct import path
import ManageUsers from '../Pages/ManageUsers'; // Correct import path
import Settings from '../Pages/Settings'; // Correct import path
import Reports from '../Pages/Reports'; // Correct import path

const AdminLayout = () => {
  console.log('AdminLayout is rendering'); // Debug statement

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
