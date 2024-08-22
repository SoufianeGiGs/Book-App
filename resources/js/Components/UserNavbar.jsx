import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';
import axios from 'axios';

const UserNavbar = () => {
  const { auth } = usePage().props;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      await axios.post('/logout');
      window.location.href = '/login'; // Ensure the user is redirected to login
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md border-b-2 border-gray-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/images/book.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <InertiaLink href={`/user/user-dashboard/${auth.user.id}`} className="text-lg font-semibold text-gray-800 hover:text-red-600">Home</InertiaLink>
          <InertiaLink href="/user/contact" className="text-lg font-semibold text-gray-800 hover:text-red-600">Contact Us</InertiaLink>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-semibold text-gray-800 focus:outline-none"
            >
              <img src="/images/60995.png" alt="User Icon" className="w-5 h-5 mr-2" />
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                <div className="px-4 py-2 text-gray-800 border-b">{auth.user.name}</div>
                <InertiaLink href={`/user/settings/${auth.user.id}`} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</InertiaLink>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
