// resources/js/app.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/app.css';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ManageUsers from './Pages/Admin/ManageUsers';
import Settings from './Pages/Admin/Settings';
import Reports from './Pages/Admin/Reports';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import UserDashboard from './Pages/User/UserDashboard';
import Profile from './Pages/User/Profile';
import UserSettings from './Pages/User/UserSettings';
import BookPage from './Pages/User/BookPage';
import ExportBooks from './Pages/Admin/ExportBooks';
<Route path="/more-stats" element={<MoreStatsPage />} />

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/books/export" element={<ExportBooks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/user-dashboard/:id" element={<UserDashboard />} />
      <Route path="/user/profile/:id" element={<Profile />} />
      <Route path="/user/settings/:id" element={<UserSettings />} />
      <Route path="/user/book" element={<BookPage />} /> 
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/more-stats" element={<MoreStatsPage />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainApp />);
