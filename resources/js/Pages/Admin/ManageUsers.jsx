import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Pagination from '../../Components/Pagination';
import AdminSidebar from '../../Components/AdminSidebar';
import { FaUser, FaUsers, FaUserPlus, FaUserCheck } from 'react-icons/fa';

const ManageUsers = () => {
  const { users, totalUsers, onlineUsers, totalAdmins, recentUsers } = usePage().props;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete(`/admin/users/${id}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col items-center p-10 overflow-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Manage Users</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg w-48 h-48 text-white">
            <FaUsers className="text-4xl mb-2" />
            <div className="text-3xl font-bold">{totalUsers}</div>
            <div className="text-sm">Total Users</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg w-48 h-48 text-white">
            <FaUserCheck className="text-4xl mb-2" />
            <div className="text-3xl font-bold">{onlineUsers}</div>
            <div className="text-sm">Users Online</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg w-48 h-48 text-white">
            <FaUser className="text-4xl mb-2" />
            <div className="text-3xl font-bold">{totalAdmins}</div>
            <div className="text-sm">Total Admins</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg w-48 h-48 text-white">
            <FaUserPlus className="text-4xl mb-2" />
            <div className="text-3xl font-bold">{recentUsers}</div>
            <div className="text-sm">New Users</div>
          </div>
        </div>

        <div className="w-full max-w-7xl p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Users List</h2>
            <a href="/admin/users/create" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
              Create New User
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-4 px-6 uppercase font-semibold text-sm text-left">Avatar</th>
                  <th className="py-4 px-6 uppercase font-semibold text-sm text-left">Name</th>
                  <th className="py-4 px-6 uppercase font-semibold text-sm text-left">Email</th>
                  <th className="py-4 px-6 uppercase font-semibold text-sm text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.data.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 border-b border-gray-200">
                    <td className="py-4 px-6">
                      <img src="/images/user.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6 flex space-x-4">
                      <a href={`/admin/users/${user.id}/edit`} className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-700">
                        Edit
                      </a>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination links={users.links} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
