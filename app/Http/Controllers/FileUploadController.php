<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use App\Models\Log as LogModel;

class FileUploadController extends Controller
{
    public function uploadFile(Request $request)
    {
        ini_set('max_execution_time', 300); // 300 seconds = 5 minutes
        ini_set('memory_limit', '1024M'); // Increase to 1GB
        
        // Validate the file
        $request->validate([
            'file' => 'required|mimes:xlsx,csv|max:2048',
        ]);

        $file = $request->file('file');
        try {
            $spreadsheet = Excel::toArray([], $file);
            $rows = $spreadsheet[0];

            $chunkSize = 100; // Process 100 rows at a time
            $chunks = array_chunk($rows, $chunkSize);
            $userId = Auth::id();

            $addedBooks = 0;
            $repeatedBooks = 0;
            $totalProcessed = 0;
            $skippedRows = 0;

            foreach ($chunks as $chunkIndex => $chunk) {
                try {
                    DB::transaction(function () use ($chunk, &$addedBooks, &$repeatedBooks, $userId, $totalProcessed, &$skippedRows) {
                        foreach ($chunk as $index => $row) {
                            // Skip the header row if it's in the first chunk
                            if ($totalProcessed === 0 && $index === 0) {
                                continue;
                            }

                            try {
                                // Log the current row being processed
                                Log::info('Processing row: ' . ($totalProcessed + 1) . ', Data: ' . json_encode($row));

                                $bookData = [
                                    'titre_propre' => $row[0] ?? null,
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
                                    'nom_auteur' => $row[16] ?? null,
                                    'editeur' => $row[17] ?? null,
                                    'code_editeur' => $row[18] ?? null,
                                    'ville_edition' => $row[19] ?? null,
                                    'pays_edition' => $row[20] ?? null,
                                    'code_langue' => $row[21] ?? null,
                                    'collection' => $row[22] ?? null,
                                    'sous_collection' => $row[23] ?? null,
                                    'numero_collection' => $row[24] ?? null,
                                    'mention_edition' => $row[25] ?? null,
                                    'lien' => $row[26] ?? null,
                                    'numero_serie' => $row[27] ?? null,
                                    'tome' => $row[28] ?? null,
                                    'volume' => $row[29] ?? null,
                                    'cote' => $row[30] ?? null,
                                    'fonction_auteur_1' => $row[31] ?? null,
                                    'auteur_2' => $row[32] ?? null,
                                    'fonction_auteur_2' => $row[33] ?? null,
                                    'auteur_3' => $row[34] ?? null,
                                    'fonction_auteur_3' => $row[35] ?? null,
                                    'auteur_4' => $row[36] ?? null,
                                    'fonction_auteur_4' => $row[37] ?? null,
                                    'type_auteur' => $row[38] ?? null,
                                    'localisation' => $row[39] ?? null,
                                    'section' => $row[40] ?? null,
                                    'materiel_accompagnement' => $row[41] ?? null,
                                    'user_id' => $userId,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                    'validated' => false,
                                ];

                                $exists = Book::where('titre_propre', $bookData['titre_propre'])
                                    ->orWhere('ISBN', $bookData['ISBN'])
                                    ->exists();

                                if (!$exists) {
                                    DB::table('books')->insert($bookData);
                                    Log::info('Inserted book at row: ' . ($totalProcessed + 1));
                                    $addedBooks++;
                                } else {
                                    $repeatedBooks++;
                                    Log::info('Book already exists at row: ' . ($totalProcessed + 1));
                                }

                                $totalProcessed++;

                            } catch (\Exception $e) {
                                Log::error('Error processing row ' . ($totalProcessed + 1) . ': ' . $e->getMessage(), ['stack_trace' => $e->getTraceAsString()]);
                                $skippedRows++;
                                continue; 
                            }
                        }
                    });

                    Log::info('Processed chunk ' . ($chunkIndex + 1));
                } catch (\Exception $e) {
                    Log::error('Error in chunk ' . ($chunkIndex + 1) . ': ' . $e->getMessage(), ['stack_trace' => $e->getTraceAsString()]);
                    break; 
                }
            }

            LogModel::create([
                'user_id' => $userId,
                'action' => 'Import Books',
                'description' => "{$addedBooks} books were added during the import process. {$repeatedBooks} books were already in the database. {$skippedRows} rows were skipped due to errors.",
            ]);

            return response()->json(['message' => 'File imported and data inserted successfully, with some rows skipped due to errors.'], 200);
        } catch (\Exception $e) {
            Log::error('Error processing file: ' . $e->getMessage(), ['stack_trace' => $e->getTraceAsString()]);
            return response()->json(['message' => 'File processing failed.'], 500);
        }
    }
}
