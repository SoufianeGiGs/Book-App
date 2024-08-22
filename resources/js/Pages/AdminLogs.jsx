import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../Components/AdminSidebar';
import LogDetailsModal from './LogDetailsModal';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLogs = () => {
        axios.get('/admin/latest-logs', { params: { search: searchTerm } })
            .then(response => {
                setLogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching logs:', error);
            });
    };

    useEffect(() => {
        fetchLogs();

        const interval = setInterval(() => {
            fetchLogs();
        }, 5000);

        return () => clearInterval(interval);
    }, [searchTerm]); // Re-fetch logs when searchTerm changes

    const handleDetailsClick = (log) => {
        setSelectedLog(log);
    };

    const handleCloseModal = () => {
        setSelectedLog(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">Application Logs</h1>
                <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg shadow">
                    <input
                        type="text"
                        placeholder="Search name, email or action"
                        className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="flex items-center space-x-4">
                        <button className="bg-gray-200 px-4 py-2 border rounded-lg shadow hover:bg-gray-300 transition duration-200 ease-in-out">
                            Filters
                        </button>
                        <div className="flex items-center space-x-1 text-gray-700">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-semibold">Live</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: log.user.is_online ? 'green' : 'gray' }}
                                        ></div>
                                        <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{log.action}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{new Date(log.created_at).toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDetailsClick(log)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedLog && (
                <LogDetailsModal log={selectedLog} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AdminLogs;
