// resources/js/Pages/AdminLogs.jsx
import React from 'react';

const AdminLogs = ({ logs }) => {
    return (
        <div>
            <h1>Application Logs</h1>
            <ul>
                {logs.data.map((log) => (
                    <li key={log.id}>
                        {log.user.name} performed {log.action} at {log.created_at}
                    </li>
                ))}
            </ul>
            {/* Add pagination controls if needed */}
        </div>
    );
};

export default AdminLogs;
