import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import { Inertia } from '@inertiajs/inertia';

const AdminSettings = ({ admin }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        username: admin.username,
        email: admin.email
      });
    }
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    Inertia.post('/admin/settings', formData);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
