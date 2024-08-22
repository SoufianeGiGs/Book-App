<?php
namespace App\Imports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BooksImport implements ToModel
{
    protected $rowCount = 0;
    protected $maxRows = 4; // You can adjust this if needed

    public function __construct()
    {
        ini_set('memory_limit', '512M');
        ini_set('max_execution_time', '300');
    }

    public function model(array $row)
    {
        DB::beginTransaction();
        DB::enableQueryLog(); 
        Log::info('Model method triggered.');
        $this->rowCount++;

        // Stop processing if the row count exceeds the maximum limit
        if ($this->rowCount > $this->maxRows) {
            Log::info('Reached maximum row limit of ' . $this->maxRows);
            exit();
        }
        try {

            DB::beginTransaction();
            $id = DB::table('books')->insertGetId([
                'titre_propre' => 'Diagnostic Test',
                'ISBN' => '9876543210',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Log::info('Inserted record ID: ' . $id);
        
            DB::commit();
        } catch (\Exception $e) {
            Log::error('Error inserting test record: ' . $e->getMessage());
        }

        // Cast all fields to string to ensure correct validation
        $row = array_map(function ($value) {
            return (string)$value;
        }, $row);

        // Log the selected 42 attributes
        $selectedAttributes = [
            'titre_propre' => $row[0],
            'titre_parallele' => $row[1] ?? null,
            'titre_auteur_different' => $row[2] ?? null,
            'complement_titre' => $row[3] ?? null,
            'annee_edition' => $row[4] ?? null,
            'ISBN' => $row[5],
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
        ];

        // Log each of the 42 attributes
        foreach ($selectedAttributes as $key => $value) {
            Log::info("Row {$this->rowCount} - {$key}: {$value}");
        }

        // Validate the selected attributes
        $validator = Validator::make($selectedAttributes, [
            'titre_propre' => 'required|string|max:255|unique:books,titre_propre',
            'ISBN' => 'required|string|max:255|unique:books,ISBN',
            // Other validation rules if necessary...
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed for row ' . $this->rowCount . ': ' . json_encode($selectedAttributes, JSON_UNESCAPED_UNICODE) . ' - ' . json_encode($validator->errors()));
            return null;
        }

        try {
            Log::info('Processing row ' . $this->rowCount . ': ' . json_encode($selectedAttributes, JSON_UNESCAPED_UNICODE));

            // Insert the validated data into the database
            DB::table('books')->insert([
                'titre_propre' => $selectedAttributes['titre_propre'],
                'titre_parallele' => $selectedAttributes['titre_parallele'],
                'titre_auteur_different' => $selectedAttributes['titre_auteur_different'],
                'complement_titre' => $selectedAttributes['complement_titre'],
                'annee_edition' => $selectedAttributes['annee_edition'],
                'ISBN' => $selectedAttributes['ISBN'],
                'nombre_pages' => $selectedAttributes['nombre_pages'],
                'illustration' => $selectedAttributes['illustration'],
                'taille_de_page' => $selectedAttributes['taille_de_page'],
                'note_generale' => $selectedAttributes['note_generale'],
                'note_contenu' => $selectedAttributes['note_contenu'],
                'resume' => $selectedAttributes['resume'],
                'indexation_decimale' => $selectedAttributes['indexation_decimale'],
                'mots_cles' => $selectedAttributes['mots_cles'],
                'date_de_parution' => $selectedAttributes['date_de_parution'],
                'code_exemplaire' => $selectedAttributes['code_exemplaire'],
                'localisation' => $selectedAttributes['localisation'],
                'section' => $selectedAttributes['section'],
                'materiel_accompagnement' => $selectedAttributes['materiel_accompagnement'],
                'nom_auteur' => $selectedAttributes['nom_auteur'],
                'editeur' => $selectedAttributes['editeur'],
                'code_editeur' => $selectedAttributes['code_editeur'],
                'ville_edition' => $selectedAttributes['ville_edition'],
                'pays_edition' => $selectedAttributes['pays_edition'],
                'code_langue' => $selectedAttributes['code_langue'],
                'collection' => $selectedAttributes['collection'],
                'sous_collection' => $selectedAttributes['sous_collection'],
                'numero_collection' => $selectedAttributes['numero_collection'],
                'mention_edition' => $selectedAttributes['mention_edition'],
                'lien' => $selectedAttributes['lien'],
                'numero_serie' => $selectedAttributes['numero_serie'],
                'tome' => $selectedAttributes['tome'],
                'volume' => $selectedAttributes['volume'],
                'cote' => $selectedAttributes['cote'],
                'fonction_auteur_1' => $selectedAttributes['fonction_auteur_1'],
                'auteur_2' => $selectedAttributes['auteur_2'],
                'fonction_auteur_2' => $selectedAttributes['fonction_auteur_2'],
                'auteur_3' => $selectedAttributes['auteur_3'],
                'fonction_auteur_3' => $selectedAttributes['fonction_auteur_3'],
                'auteur_4' => $selectedAttributes['auteur_4'],
                'fonction_auteur_4' => $selectedAttributes['fonction_auteur_4'],
                'type_auteur' => $selectedAttributes['type_auteur'],
                'user_id' => Auth::id(),
                  'created_at' => now(),
                'updated_at' => now(),
                'validated' => false,
            ]);

            Log::info('Book inserted successfully into the database.');

        } catch (\Exception $e) {
            Log::error('Error importing row ' . $this->rowCount . ': ' . json_encode($selectedAttributes, JSON_UNESCAPED_UNICODE) . ' - ' . $e->getMessage());
            return null;
        }
        Log::info(DB::getQueryLog());
    }
}
