import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import AdminSidebar from '../Components/AdminSidebar';
import Pagination from '../Components/Pagination';
import ExportBooksModal from '../Components/ExportBooksModal';
import axios from 'axios';
import { FaUser, FaBook, FaCheck, FaTimes, FaDownload } from 'react-icons/fa';


const AdminDashboard = () => {
  const { usersCount, booksCount, unvalidatedBooksCount, books, sections, users, authors, years, cities, languages, filters } = usePage().props;
  const [section, setSection] = useState(filters.section || '');
  const [user, setUser] = useState(filters.user || '');
  const [validated, setValidated] = useState(filters.validated || '');
  const [author, setAuthor] = useState(filters.author || '');
  const [year, setYear] = useState(filters.year || '');
  const [city, setCity] = useState(filters.city || '');
  const [language, setLanguage] = useState(filters.language || '');
  const [date, setDate] = useState(filters.date || '');
  const [showExportModal, setShowExportModal] = useState(false);
  const [allMatchingBooks, setAllMatchingBooks] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    Inertia.get('/admin/dashboard', { section, user, validated, author, year, city, language, date }, { preserveState: true });
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('/admin/export-books', {
        params: { section, user, validated, author, year, city, language, date }
      });
      setAllMatchingBooks(response.data.books);
      setShowExportModal(true);
    } catch (error) {
      console.error('Error fetching books for export:', error);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
      Inertia.delete(`/admin/books/${id}`, {
        onSuccess: () => {
          // Optionally, you can refresh the page or update the state to reflect the changes
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    }
  };

  const handleValidate = (id) => {
    Inertia.put(`/admin/books/validate/${id}`, {}, {
      onSuccess: () => {
        // Optionally, you can refresh the page or update the state to reflect the changes
      },
      onError: (errors) => {
        console.error(errors);
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg">Welcome to the admin dashboard. Manage users, books, and track validation status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
    <FaUser className="text-blue-500 text-4xl mb-4" />
    <div className="text-2xl font-bold">{usersCount}</div>
    <div className="text-sm">Number of Users</div>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
    <FaBook className="text-green-500 text-4xl mb-4" />
    <div className="text-2xl font-bold">{booksCount}</div>
    <div className="text-sm">Number of Books</div>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
    <FaCheck className="text-red-500 text-4xl mb-4" />
    <div className="text-2xl font-bold">{unvalidatedBooksCount}</div>
    <div className="text-sm">Number of Unvalidated Books</div>
  </div>
</div>

        <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec.section} value={sec.section}>{sec.section}</option>
            ))}
          </select>
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select User</option>
            {users.map((usr) => (
              <option key={usr.id} value={usr.name}>{usr.name}</option>
            ))}
          </select>
          <select
            value={validated}
            onChange={(e) => setValidated(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Validation</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Author</option>
            {authors.map((auth) => (
              <option key={auth.nom_auteur} value={auth.nom_auteur}>{auth.nom_auteur}</option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Year</option>
            {years.map((yr) => (
              <option key={yr.year} value={yr.year}>{yr.year}</option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select City</option>
            {cities.map((cty) => (
              <option key={cty.ville_edition} value={cty.ville_edition}>{cty.ville_edition}</option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang.code_langue} value={lang.code_langue}>{lang.code_langue}</option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">User Name</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Book Name</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Date Added</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Section</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Validated</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {books.data.map((book) => (
              <tr key={book.id} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="py-3 px-4">{book.user.name}</td>
                <td className="py-3 px-4">{book.titre_propre}</td>
                <td className="py-3 px-4">{new Date(book.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4">{book.section}</td>
                <td className="py-3 px-4">{book.validated ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <a href={`/admin/books/${book.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
                    View
                  </a>
                  <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-700">
                    Delete
                  </button>
                  {!book.validated && (
                    <button onClick={() => handleValidate(book.id)} className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-700">
                      Validate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination links={books.links} filters={{ section, user, validated, author, year, city, language, date }} />

        <div className="mt-6">
          <button
            onClick={handleExport}
            className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 flex items-center justify-center space-x-2"
          >
            <FaDownload />
            <span>Export Books</span>
          </button>
        </div>

        {showExportModal && (
          <ExportBooksModal books={allMatchingBooks} onClose={() => setShowExportModal(false)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
