<?php
namespace App\Imports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BooksImport implements ToModel
{
    protected $rowCount = 0;
    protected $maxRows = 10; // Limit to the first 10 rows

    public function __construct()
    {
        ini_set('memory_limit', '512M'); // Adjust as needed
        ini_set('max_execution_time', '300'); // Adjust as needed
    }

    public function model(array $row)
    {
        $this->rowCount++;

        // Stop processing if the row count exceeds the maximum limit
        if ($this->rowCount > $this->maxRows) {
            Log::info('Reached maximum row limit of ' . $this->maxRows);
            exit(); // Stop processing further rows
        }

        // Cast all fields to string to ensure correct validation
        $row = array_map(function ($value) {
            return (string)$value;
        }, $row);

        $validator = Validator::make($row, [
            '0' => 'required|string',
            '1' => 'nullable|string',
            '2' => 'nullable|string',
            '3' => 'nullable|string',
            '4' => 'nullable|string',
            '5' => 'nullable|string',
            '6' => 'nullable|string',
            '7' => 'nullable|string',
            '8' => 'nullable|string',
            '9' => 'nullable|string',
            '10' => 'nullable|string',
            '11' => 'nullable|string',
            '12' => 'nullable|string',
            '13' => 'nullable|string',
            '14' => 'nullable|string',
            '15' => 'nullable|string',
            '16' => 'nullable|string',
            '17' => 'nullable|string',
            '18' => 'nullable|string',
            '19' => 'nullable|string',
            '20' => 'nullable|string',
            '21' => 'nullable|string',
            '22' => 'nullable|string',
            '23' => 'nullable|string',
            '24' => 'nullable|string',
            '25' => 'nullable|string',
            '26' => 'nullable|string',
            '27' => 'nullable|string',
            '28' => 'nullable|string',
            '29' => 'nullable|string',
            '30' => 'nullable|string',
            '31' => 'nullable|string',
            '32' => 'nullable|string',
            '33' => 'nullable|string',
            '34' => 'nullable|string',
            '35' => 'nullable|string',
            '36' => 'nullable|string',
            '37' => 'nullable|string',
            '38' => 'nullable|string',
            '39' => 'nullable|string',
            '40' => 'nullable|string',
            '41' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed for row ' . $this->rowCount . ': ' . json_encode($row, JSON_UNESCAPED_UNICODE) . ' - ' . json_encode($validator->errors()));
            return null;
        }

        try {
            Log::info('Processing row ' . $this->rowCount . ': ' . json_encode($row, JSON_UNESCAPED_UNICODE));

            $book = new Book([
                'titre_propre' => $row[0],
                'titre_parallele' => $row[1] ?? null,
                'titre_auteur_different' => $row[2] ?? null,
                'complement_titre' => $row[3] ?? null,
                'annee_edition' => $row[4] ?? null,
                'ISBN' => $row[5] ?? null,
                'nombre_pages' => $row[6] ?? null,
                'illustration' => $row[7] ?? null,
                'taille_de_page' => $row[8] ?? null,
                'note_generale' => $row[9] ?? null,
                'note_contenu' => $row[10] ?? null,
                'resume' => $row[11] ?? null,
                'indexation_decimale' => $row[12] ?? null,
                'mots_cles' => $row[13] ?? null,
                'date_de_parution' => $row[14] ?? null,
                'code_exemplaire' => $row[15] ?? null,
                'localisation' => $row[16] ?? null,
                'section' => $row[17] ?? null,
                'materiel_accompagnement' => $row[18] ?? null,
                'nom_auteur' => $row[19] ?? null,
                'editeur' => $row[20] ?? null,
                'code_editeur' => $row[21] ?? null,
                'ville_edition' => $row[22] ?? null,
                'pays_edition' => $row[23] ?? null,
                'code_langue' => $row[24] ?? null,
                'collection' => $row[25] ?? null,
                'sous_collection' => $row[26] ?? null,
                'numero_collection' => $row[27] ?? null,
                'mention_edition' => $row[28] ?? null,
                'lien' => $row[29] ?? null,
                'numero_serie' => $row[30] ?? null,
                'tome' => $row[31] ?? null,
                'volume' => $row[32] ?? null,
                'cote' => $row[33] ?? null,
                'fonction_auteur_1' => $row[34] ?? null,
                'auteur_2' => $row[35] ?? null,
                'fonction_auteur_2' => $row[36] ?? null,
                'auteur_3' => $row[37] ?? null,
                'fonction_auteur_3' => $row[38] ?? null,
                'auteur_4' => $row[39] ?? null,
                'fonction_auteur_4' => $row[40] ?? null,
                'type_auteur' => $row[41] ?? null,
                'user_id' => Auth::id(),
            ]);

            Log::info('Book created: ' . json_encode($book, JSON_UNESCAPED_UNICODE));
            $book->save();
            return $book;
        } catch (\Exception $e) {
            Log::error('Error importing row ' . $this->rowCount . ': ' . json_encode($row, JSON_UNESCAPED_UNICODE) . ' - ' . $e->getMessage());
            return null;
        }
    }
}
