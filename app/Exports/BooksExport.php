<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BooksExport implements FromCollection, WithMapping, WithHeadings
{
    protected $selectedBooks;

    public function __construct(array $selectedBooks)
    {
        $this->selectedBooks = $selectedBooks;
    }

    public function collection()
    {
        return Book::whereIn('id', $this->selectedBooks)->get();
    }

    public function map($book): array
    {
        return [
            $book->id,
            $book->titre_propre,
            "'" . $book->ISBN,
            $book->titre_parallele,
            $book->titre_auteur_different,
            $book->complement_titre,
            $book->annee_edition,
            $book->nombre_pages,
            $book->illustration,
            $book->taille_de_page,
            $book->note_generale,
            $book->note_contenu,
            $book->resume,
            $book->indexation_decimale,
            $book->mots_cles,
            $book->date_de_parution,
            $book->code_exemplaire,
            $book->localisation,
            $book->section,
            $book->materiel_accompagnement,
            $book->nom_auteur,
            $book->editeur,
            $book->code_editeur,
            $book->ville_edition,
            $book->pays_edition,
            $book->code_langue,
            $book->collection,
            $book->sous_collection,
            $book->numero_collection,
            $book->mention_edition,
            $book->lien,
            $book->numero_serie,
            $book->tome,
            $book->volume,
            $book->cote,
            $book->fonction_auteur_1,
            $book->auteur_2,
            $book->fonction_auteur_2,
            $book->auteur_3,
            $book->fonction_auteur_3,
            $book->auteur_4,
            $book->fonction_auteur_4,
            $book->type_auteur,
            $book->created_at,
            $book->updated_at,
        ];
    }

    public function headings(): array
    {
        return [
            'ID',
            'Titre Propre',
            'ISB',
            'Titre Parallele',
            'Titre Auteur Different',
            'Complement Titre',
            'Annee Edition',
            'Nombre Pages',
            'Illustration',
            'Taille de Page',
            'Note Generale',
            'Note Contenu',
            'Resume',
            'Indexation Decimale',
            'Mots Cles',
            'Date de Parution',
            'Code Exemplaire',
            'Localisation',
            'Section',
            'Materiel Accompagnement',
            'Nom Auteur',
            'Editeur',
            'Code Editeur',
            'Ville Edition',
            'Pays Edition',
            'Code Langue',
            'Collection',
            'Sous Collection',
            'Numero Collection',
            'Mention Edition',
            'Lien',
            'Numero Serie',
            'Tome',
            'Volume',
            'Cote',
            'Fonction Auteur 1',
            'Auteur 2',
            'Fonction Auteur 2',
            'Auteur 3',
            'Fonction Auteur 3',
            'Auteur 4',
            'Fonction Auteur 4',
            'Type Auteur',
            'Created At',
            'Updated At',
        ];
    }
}
