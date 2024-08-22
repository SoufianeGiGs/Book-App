import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import UserNavbar from '../../Components/UserNavbar'; // Assuming you have a UserNavbar component

const Contact = ({ userId }) => {
  const { flash } = usePage().props || {}; // Default to an empty object if flash is undefined
  const [formData, setFormData] = useState({
    email: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adding userId to the formData before submission
    Inertia.post('/user/contact', { ...formData, user_id: userId });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNavbar /> {/* Adding the navigation bar */}

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto border-t-4 border-red-500">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600">Contact Us</h1>

          {flash?.success && (
            <div className="mb-4 bg-green-100 text-green-800 p-4 rounded-md shadow-md text-center">
              {flash.success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-md shadow-md hover:from-red-700 hover:to-red-800 transition duration-200 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
