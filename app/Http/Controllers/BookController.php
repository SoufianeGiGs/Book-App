<?php
 namespace App\Http\Controllers;

 use Illuminate\Http\Request;
 use App\Models\Book;
 use Illuminate\Support\Facades\Auth;
 use Inertia\Inertia;
 use App\Models\User;
 use Maatwebsite\Excel\Facades\Excel;
 use App\Exports\BooksExport;
use App\Imports\BooksImport;
use Illuminate\Support\Facades\Log; 
use App\Models\Log as LogModel; 

 
 class BookController extends Controller
 {
     public function index(Request $request)
     {
         // Fetch necessary data and apply filters
         $usersCount = User::count();
         $booksCount = Book::count();
         $unvalidatedBooksCount = Book::where('validated', false)->count();
 
         $query = Book::with('user')->orderBy('validated')->orderBy('created_at', 'desc');
 
         if ($request->has('section') && $request->section != '') {
             $query->where('section', $request->section);
         }
 
         if ($request->has('user') && $request->user != '') {
             $query->whereHas('user', function ($q) use ($request) {
                 $q->where('name', 'like', '%' . $request->user . '%');
             });
         }
 
         if ($request->has('validated') && $request->validated != '') {
             $query->where('validated', $request->validated);
         }
 
         if ($request->has('author') && $request->author != '') {
             $query->where('nom_auteur', $request->author);
         }
 
         if ($request->has('year') && $request->year != '') {
             $query->whereYear('annee_edition', $request->year);
         }
 
         if ($request->has('city') && $request->city != '') {
             $query->where('ville_edition', $request->city);
         }
 
         if ($request->has('language') && $request->language != '') {
             $query->where('code_langue', $request->language);
         }
 
         if ($request->has('date') && $request->date != '') {
             $query->whereDate('created_at', $request->date);
         }
 
         $books = $query->paginate(3);
         $sections = Book::select('section')->distinct()->get();
         $users = User::select('id', 'name')->get();
         $authors = Book::select('nom_auteur')->distinct()->get();
         $years = Book::selectRaw('YEAR(annee_edition) as year')->distinct()->get();
         $cities = Book::select('ville_edition')->distinct()->get();
         $languages = Book::select('code_langue')->distinct()->get();
 
         return Inertia::render('AdminDashboard', [
             'usersCount' => $usersCount,
             'booksCount' => $booksCount,
             'unvalidatedBooksCount' => $unvalidatedBooksCount,
             'books' => $books,
             'sections' => $sections,
             'users' => $users,
             'authors' => $authors,
             'years' => $years,
             'cities' => $cities,
             'languages' => $languages,
             'filters' => $request->only(['section', 'user', 'validated', 'author', 'year', 'city', 'language', 'date']),
         ]);
     }
 
     public function destroy($id)
     {
         $book = Book::findOrFail($id);
         $book->delete();
         return redirect()->route('admin.dashboard')->with('success', 'Book deleted successfully!');
     }
 
     public function show($id)
     {
         $book = Book::with('user')->findOrFail($id);
         return Inertia::render('BookDetail', ['book' => $book]);
     }
 
     public function exportBooks(Request $request)
     {
         $selectedBooks = $request->input('selectedBooks');
         return Excel::download(new BooksExport($selectedBooks), 'books.xlsx');
     }
 
     public function validateBook($id)
     {
         $book = Book::findOrFail($id);
         $book->validated = true;
         $book->save();
 
         return redirect()->route('admin.dashboard')->with('success', 'Book validated successfully!');
     }
 
     public function store(Request $request)
     {
         // Validate the incoming request data
         $validatedData = $request->validate([
             'titre_propre' => 'required|string|max:255|unique:books',
             'ISBN' => 'required|string|max:255|unique:books',
             'titre_parallele' => 'nullable|string|max:255',
             'titre_auteur_different' => 'nullable|string|max:255',
             'complement_titre' => 'nullable|string|max:255',
             'annee_edition' => 'nullable|string|max:255',
             'nombre_pages' => 'nullable|string|max:255',
             'illustration' => 'nullable|string|max:255',
             'taille_de_page' => 'nullable|string|max:255',
             'note_generale' => 'nullable|string',
             'note_contenu' => 'nullable|string',
             'resume' => 'nullable|string',
             'indexation_decimale' => 'nullable|string|max:255',
             'mots_cles' => 'nullable|string',
             'date_de_parution' => 'nullable|string|max:255',
             'code_exemplaire' => 'nullable|string|max:255',
             'localisation' => 'nullable|string|max:255',
             'section' => 'nullable|string|max:255',
             'materiel_accompagnement' => 'nullable|string|max:255',
             'nom_auteur' => 'nullable|string|max:255',
             'editeur' => 'nullable|string|max:255',
             'code_editeur' => 'nullable|string|max:255',
             'ville_edition' => 'nullable|string|max:255',
             'pays_edition' => 'nullable|string|max:255',
             'code_langue' => 'nullable|string|max:255',
             'collection' => 'nullable|string|max:255',
             'sous_collection' => 'nullable|string|max:255',
             'numero_collection' => 'nullable|string|max:255',
             'mention_edition' => 'nullable|string|max:255',
             'lien' => 'nullable|string|max:255',
             'numero_serie' => 'nullable|string|max:255',
             'tome' => 'nullable|string|max:255',
             'volume' => 'nullable|string|max:255',
             'cote' => 'nullable|string|max:255',
             'fonction_auteur_1' => 'nullable|string|max:255',
             'auteur_2' => 'nullable|string|max:255',
             'fonction_auteur_2' => 'nullable|string|max:255',
             'auteur_3' => 'nullable|string|max:255',
             'fonction_auteur_3' => 'nullable|string|max:255',
             'auteur_4' => 'nullable|string|max:255',
             'fonction_auteur_4' => 'nullable|string|max:255',
             'type_auteur' => 'nullable|string|max:255',
         ]);
 
         try {
             // Create a new book record
             $book = new Book($validatedData);
             $book->user_id = Auth::id(); // Assuming you have a user_id field in your books table
             $book->save();
               // Log the action
               LogModel::create([
                'user_id' => Auth::id(),
                'action' => 'Add Book',
                'description' => "Book titled '{$book->titre_propre}' was added.",
            ]);
 
             return response()->json(['message' => 'Book added successfully!', 'book' => $book], 201);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error adding book: ' . $e->getMessage()], 500);
         }
     }

     public function exportPage(Request $request)
{
    $query = Book::query();

    if ($request->has('section') && $request->section != '') {
        $query->where('section', $request->section);
    }

    if ($request->has('user') && $request->user != '') {
        $query->whereHas('user', function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->user . '%');
        });
    }

    if ($request->has('validated') && $request->validated != '') {
        $query->where('validated', $request->validated);
    }

    if ($request->has('author') && $request->author != '') {
        $query->where('nom_auteur', $request->author);
    }

    if ($request->has('year') && $request->year != '') {
        $query->whereYear('annee_edition', $request->year);
    }

    if ($request->has('city') && $request->city != '') {
        $query->where('ville_edition', $request->city);
    }

    if ($request->has('language') && $request->language != '') {
        $query->where('code_langue', $request->language);
    }

    if ($request->has('date') && $request->date != '') {
        $query->whereDate('created_at', $request->date);
    }

    $books = $query->get();

   $filtersApplied = $request->except('_token');

   $filtersJson = json_encode($filtersApplied, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

   LogModel::create([
       'user_id' => Auth::id(),
       'action' => 'Export Book',
       'description' => "User exported books with filters: {$filtersJson}",
   ]);

    return response()->json(['books' => $books]);
}

public function uploadExcel(Request $request)
{
    try {
        $request->validate([
            'file' => 'required|mimes:xlsx'
        ]);

        Log::info('File received for upload.');

        $file = $request->file('file');
        
        // Log file details
        Log::info('File details:', ['originalName' => $file->getClientOriginalName(), 'mimeType' => $file->getMimeType(), 'size' => $file->getSize()]);

        Excel::import(new BooksImport, $file);

        Log::info('File imported successfully.');

        return back()->with('success', 'File uploaded and data imported successfully');
    } catch (\Exception $e) {
        Log::error('Error during file upload: ' . $e->getMessage());
        return back()->with('error', 'Error during file upload: ' . $e->getMessage());
    }
}
public function getBooksAdded(Request $request)
{
    $userId = Auth::id();
    $groupBy = $request->input('groupBy', 'day'); // default to 'day'

    switch ($groupBy) {
        case 'day':
            $books = Book::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                ->where('user_id', $userId)
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();
            break;

        case 'month':
            $books = Book::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
                ->where('user_id', $userId)
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->get();
            break;

        case 'year':
            $books = Book::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
                ->where('user_id', $userId)
                ->groupBy('year')
                ->orderBy('year', 'asc')
                ->get();
            break;
    }

    return response()->json($books);
}




 }
 