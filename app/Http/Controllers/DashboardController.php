<?
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function show($id)
    {
        // Fetch the statistics data
        $booksCount = Book::count();
        $usersCount = User::count();
        $unvalidatedBooksCount = Book::where('validated', false)->count();

        // Group books by genre
        $booksByGenre = Book::selectRaw('genre, COUNT(*) as count')
            ->groupBy('genre')
            ->get();

        // Log the data for debugging
        Log::info('Books Count: ' . $booksCount);
        Log::info('Users Count: ' . $usersCount);
        Log::info('Unvalidated Books Count: ' . $unvalidatedBooksCount);
        Log::info('Books by Genre: ' . $booksByGenre);

        // Pass the data to the Inertia view
        return Inertia::render('UserDashboard', [
            'booksCount' => $booksCount,
            'usersCount' => $usersCount,
            'unvalidatedBooksCount' => $unvalidatedBooksCount,
            'booksByGenre' => $booksByGenre,
        ]);
    }
}
