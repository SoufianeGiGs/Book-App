import React from 'react';
import { usePage, Inertia } from '@inertiajs/inertia-react';
import AdminSidebar from '../Components/AdminSidebar';
import * as XLSX from 'xlsx';

const BookDetail = () => {
  const { book } = usePage().props;

  const saveAsJson = () => {
    const fileName = `${book.titre_propre}.json`;
    const json = JSON.stringify(book, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveAsExcel = () => {
    const bookDetails = [
      [
        'titre_propre', 'titre_parallele', 'titre_auteur_different', 'complement_titre', 'annee_edition', 'ISBN',
        'nombre_pages', 'illustration', 'taille_de_page', 'note_generale', 'note_contenu', 'resume', 'indexation_decimale',
        'mots_cles', 'date_de_parution', 'code_exemplaire', 'localisation', 'section', 'materiel_accompagnement',
        'nom_auteur', 'editeur', 'code_editeur', 'ville_edition', 'pays_edition', 'code_langue', 'collection',
        'sous_collection', 'numero_collection', 'mention_edition', 'lien', 'numero_serie', 'tome', 'volume', 'cote',
        'fonction_auteur_1', 'auteur_2', 'fonction_auteur_2', 'auteur_3', 'fonction_auteur_3', 'auteur_4', 'fonction_auteur_4',
        'type_auteur', 'created_at'
      ],
      [
        book.titre_propre, book.titre_parallele, book.titre_auteur_different, book.complement_titre, book.annee_edition, book.ISBN,
        book.nombre_pages, book.illustration, book.taille_de_page, book.note_generale, book.note_contenu, book.resume, book.indexation_decimale,
        book.mots_cles, book.date_de_parution, book.code_exemplaire, book.localisation, book.section, book.materiel_accompagnement,
        book.nom_auteur, book.editeur, book.code_editeur, book.ville_edition, book.pays_edition, book.code_langue, book.collection,
        book.sous_collection, book.numero_collection, book.mention_edition, book.lien, book.numero_serie, book.tome, book.volume, book.cote,
        book.fonction_auteur_1, book.auteur_2, book.fonction_auteur_2, book.auteur_3, book.fonction_auteur_3, book.auteur_4, book.fonction_auteur_4,
        book.type_auteur, new Date(book.created_at).toLocaleDateString()
      ]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(bookDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Book Details');

    XLSX.writeFile(workbook, `${book.titre_propre}.xlsx`);
  };

  const goBackToDashboard = () => {
    Inertia.get('/admin/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Book Details</h1>
        <p className="mb-6">Detailed information about the book.</p>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="pdf-content">
            <h2 className="text-2xl font-bold mb-4">{book.titre_propre}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Author:</strong> {book.nom_auteur}</p>
                <p><strong>ISBN:</strong> {book.ISBN}</p>
                <p><strong>Title Parallel:</strong> {book.titre_parallele}</p>
                <p><strong>Title Different Author:</strong> {book.titre_auteur_different}</p>
                <p><strong>Complement Title:</strong> {book.complement_titre}</p>
                <p><strong>Year Edition:</strong> {book.annee_edition}</p>
                <p><strong>Number of Pages:</strong> {book.nombre_pages}</p>
                <p><strong>Illustration:</strong> {book.illustration}</p>
                <p><strong>Page Size:</strong> {book.taille_de_page}</p>
                <p><strong>General Note:</strong> {book.note_generale}</p>
                <p><strong>Content Note:</strong> {book.note_contenu}</p>
                <p><strong>Summary:</strong> {book.resume}</p>
                <p><strong>Decimal Indexing:</strong> {book.indexation_decimale}</p>
                <p><strong>Keywords:</strong> {book.mots_cles}</p>
                <p><strong>Publication Date:</strong> {new Date(book.date_de_parution).toLocaleDateString()}</p>
                <p><strong>Copy Code:</strong> {book.code_exemplaire}</p>
                <p><strong>Location:</strong> {book.localisation}</p>
                <p><strong>Section:</strong> {book.section}</p>
                <p><strong>Accompanying Material:</strong> {book.materiel_accompagnement}</p>
                <p><strong>Publisher:</strong> {book.editeur}</p>
                <p><strong>Publisher Code:</strong> {book.code_editeur}</p>
              </div>
              <div>
                <p><strong>City of Edition:</strong> {book.ville_edition}</p>
                <p><strong>Country of Edition:</strong> {book.pays_edition}</p>
                <p><strong>Language Code:</strong> {book.code_langue}</p>
                <p><strong>Collection:</strong> {book.collection}</p>
                <p><strong>Sub Collection:</strong> {book.sous_collection}</p>
                <p><strong>Collection Number:</strong> {book.numero_collection}</p>
                <p><strong>Edition Mention:</strong> {book.mention_edition}</p>
                <p><strong>Link:</strong> <a href={book.lien} className="text-blue-500">{book.lien}</a></p>
                <p><strong>Series Number:</strong> {book.numero_serie}</p>
                <p><strong>Tome:</strong> {book.tome}</p>
                <p><strong>Volume:</strong> {book.volume}</p>
                <p><strong>Shelfmark:</strong> {book.cote}</p>
                <p><strong>Author 1 Function:</strong> {book.fonction_auteur_1}</p>
                <p><strong>Author 2:</strong> {book.auteur_2}</p>
                <p><strong>Author 2 Function:</strong> {book.fonction_auteur_2}</p>
                <p><strong>Author 3:</strong> {book.auteur_3}</p>
                <p><strong>Author 3 Function:</strong> {book.fonction_auteur_3}</p>
                <p><strong>Author 4:</strong> {book.auteur_4}</p>
                <p><strong>Author 4 Function:</strong> {book.fonction_auteur_4}</p>
                <p><strong>Author Type:</strong> {book.type_auteur}</p>
                <p><strong>Date Added:</strong> {new Date(book.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={saveAsJson}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            >
              Save as JSON
            </button>
            <button
              onClick={saveAsExcel}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
            >
              Save as Excel
            </button>
            <button
              onClick={goBackToDashboard}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
