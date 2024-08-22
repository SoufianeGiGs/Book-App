import React, { useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar';

const ContactMessages = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleViewDescription = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseDescription = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="text-left py-3 px-4 text-gray-800">{message.email}</td>
                    <td className="text-left py-3 px-4 text-gray-800">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                    <td className="text-left py-3 px-4">
                      <button
                        onClick={() => handleViewDescription(message)}
                        className="text-blue-600 hover:text-blue-900 transition ease-in-out duration-150"
                        title="View Description"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3 px-4 text-gray-500">
                    No messages available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedMessage && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Message Description</h2>
              <p className="text-gray-700 mb-6">{selectedMessage.description}</p>
              <button
                onClick={handleCloseDescription}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ease-in-out duration-150"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
