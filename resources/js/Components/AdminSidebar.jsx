import React from 'react';
import { FaChartBar, FaClipboardList, FaCogs, FaDoorOpen, FaUsers, FaTachometerAlt, FaFileAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col items-center py-8 shadow-lg">
      <div className="mb-20"> {/* Increased margin-bottom for more spacing */}
        <img src="/images/book.webp" alt="Admin Logo" className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
      </div>
      <ul className="w-full text-center space-y-8"> {/* Increased space-y for more spacing between elements */}
        <li className="mb-4">
          <a href="/admin/dashboard" className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/statistics" className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaChartBar className="mr-3" /> Statistics
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/logs" className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaClipboardList className="mr-3" /> Logs
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/manage-users" className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaUsers className="mr-3" /> Manage Users
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/settings" className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaCogs className="mr-3" /> Settings
          </a>
        </li>
        <li className="mb-4">
          <a href={route('admin.contact-messages')} className="flex items-center justify-center text-lg font-semibold hover:bg-gray-700 py-3 px-4 rounded transition-colors">
            <FaFileAlt className="mr-3" /> Reports
          </a>
        </li>
        
      </ul>
      <div className="mt-auto w-full">
        <a href="/login" className="flex items-center justify-center text-lg font-semibold bg-red-600 hover:bg-red-700 py-3 px-4 rounded transition-colors">
          <FaDoorOpen className="mr-3" /> Logout
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
