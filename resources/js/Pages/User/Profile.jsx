import React from 'react';
import UserNavbar from '../../Components/UserNavbar';

const Profile = () => {
  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Profile Page</h1>
        <p className="text-gray-600">Manage your profile information here.</p>
      </div>
    </div>
  );
};

export default Profile;
