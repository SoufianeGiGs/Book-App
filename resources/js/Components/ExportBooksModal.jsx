import React, { useState } from 'react';
import axios from 'axios';

const ExportBooksModal = ({ books, onClose }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleSelectBook = (id) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(id)
        ? prevSelectedBooks.filter((bookId) => bookId !== id)
        : [...prevSelectedBooks, id]
    );
  };

  const handleSelectAll = () => {
    const allBookIds = books.map((book) => book.id);
    setSelectedBooks(allBookIds);
  };

  const handleDeselectAll = () => {
    setSelectedBooks([]);
  };

  const handleExport = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/books/export', { selectedBooks }, {
        responseType: 'blob', // Important
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'books.xlsx'); // or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting books:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl font-bold mb-4">Export Books</h2>
        <form onSubmit={handleExport}>
          <div className="flex justify-end space-x-4 mb-4">
            <button
              type="button"
              onClick={handleSelectAll}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleDeselectAll}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
            >
              Deselect All
            </button>
          </div>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4">Select</th>
                  <th className="py-3 px-4">Book Name</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date Added</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-100 border-b border-gray-200">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                      />
                    </td>
                    <td className="py-3 px-4">{book.titre_propre}</td>
                    <td className="py-3 px-4">{book.nom_auteur}</td>
                    <td className="py-3 px-4">{new Date(book.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg text-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg text-lg hover:bg-blue-700"
            >
              Export Selected Books
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportBooksModal;
