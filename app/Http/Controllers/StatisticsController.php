<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use Inertia\Inertia;    

class StatisticsController extends Controller
{
    public function index()
    {
        // Example statistics
        $totalUsers = User::count();
        $totalBooks = Book::count();
        $totalAuthors = Book::distinct('nom_auteur')->count('nom_auteur'); // Assuming 'nom_auteur' is the column for authors
        $totalCities = Book::distinct('ville_edition')->count('ville_edition'); // Assuming 'ville_edition' is the column for cities

        $usersByMonth = User::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
                            ->groupBy('year', 'month')
                            ->get();
        
        $booksByMonth = Book::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
                            ->groupBy('year', 'month')
                            ->get();

        // Additional statistics
        $activeUsers = User::where('is_online', true)->count();
        $usersByYear = User::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
                           ->groupBy('year')
                           ->get();

        $booksByYear = Book::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
                           ->groupBy('year')
                           ->get();

        // Fetch books by ville_edition
        $booksByVilleEdition = Book::selectRaw('ville_edition, COUNT(*) as total')
                                   ->groupBy('ville_edition')
                                   ->get();

        // Fetch books by section
        $booksBySection = Book::selectRaw('section, COUNT(*) as total')
                              ->groupBy('section')
                              ->get();

        return Inertia::render('Statistics', [
            'total_users' => $totalUsers,
            'total_books' => $totalBooks,
            'total_authors' => $totalAuthors,
            'total_cities' => $totalCities,
            'users_by_month' => $usersByMonth,
            'books_by_month' => $booksByMonth,
            'active_users' => $activeUsers,
            'users_by_year' => $usersByYear,
            'books_by_year' => $booksByYear,
            'books_by_ville_edition' => $booksByVilleEdition,
            'books_by_section' => $booksBySection,
        ]);
    }
    public function getBooksByAuthor()
    {
        $booksByAuthor = Book::selectRaw('nom_auteur as author, COUNT(*) as total')
            ->groupBy('author')
            ->get();

        return response()->json($booksByAuthor);
    }

    // Method to get books by city
    public function getBooksByCity()
    {
        $booksByCity = Book::selectRaw('ville_edition as city, COUNT(*) as total')
            ->groupBy('city')
            ->get();

        return response()->json($booksByCity);
    }

    // Method to get books by section
    public function getBooksBySection()
    {
        $booksBySection = Book::selectRaw('section, COUNT(*) as total')
            ->groupBy('section')
            ->get();

        return response()->json($booksBySection);
    }

    // Method to get books by year
    public function getBooksByYear()
    {
        $booksByYear = Book::selectRaw('YEAR(created_at) as year, COUNT(*) as total')
            ->groupBy('year')
            ->get();

        return response()->json($booksByYear);
    }
}
