import React from 'react';

const LogDetailsModal = ({ log, onClose }) => {
    if (!log) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Log Details</h2>
                <p><strong>Actor:</strong> {log.user.name}</p>
                <p><strong>Action:</strong> {log.action}</p>
                <p><strong>Description:</strong> {log.description}</p>
                <p><strong>Date:</strong> {new Date(log.created_at).toLocaleString()}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogDetailsModal;
