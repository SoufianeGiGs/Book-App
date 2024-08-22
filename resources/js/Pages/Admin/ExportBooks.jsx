import React from 'react';
import ExportBooksModal from '../Components/ExportBooksModal'; // Adjust the import path as needed

const ExportBooks = ({ books }) => {
  console.log('ExportBooks component rendered');
  return (
    <div>
      <h1>Export Books Page</h1>
      <ExportBooksModal books={books} selectedBooks={[]} setSelectedBooks={() => {}} onClose={() => {}} />
    </div>
  );
};

export default ExportBooks;
