<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactMessageController;


Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [BookController::class, 'index'])->name('admin.dashboard');
        Route::delete('/books/{id}', [BookController::class, 'destroy'])->name('admin.books.destroy'); // Added route
        Route::get('/books/{id}', [BookController::class, 'show'])->name('admin.books.show'); // Added route
        Route::put('/books/validate/{id}', [BookController::class, 'validateBook'])->name('admin.books.validate'); // Added route
        Route::get('/books/export', [BookController::class, 'exportPage'])->name('admin.books.export');
        Route::get('/export-books', [BookController::class, 'exportPage'])->name('admin.books.export');

        Route::post('/books/export', [BookController::class, 'exportBooks'])->name('admin.books.exportBooks');
        Route::get('/manage-users', [UserController::class, 'index'])->name('admin.manage-users');
        Route::get('/users/create', [UserController::class, 'create'])->name('admin.users.create');
        Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::get('/settings', [AdminController::class, 'showSettings'])->name('admin.settings'); // Show the settings page
        Route::get('/contact-messages', [AdminController::class, 'viewContactMessages'])->name('admin.contact-messages');

        Route::get('/reports', function () {
                return Inertia::render('Reports');

        })->name('admin.reports');
    });
});

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['auth'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/user-dashboard/{id}', [UserController::class, 'showDashboard'])->name('user.dashboard');
        Route::get('/profile/{id}', [UserController::class, 'showProfile'])->name('user.profile');
        Route::get('/settings/{id}', [UserController::class, 'showSettings'])->name('user.settings');
        Route::get('/book', function () {
            return Inertia::render('User/BookPage');
        })->name('user.book');
        Route::post('/book', [BookController::class, 'store'])->name('user.book.store');
        Route::get('/contact', [UserController::class, 'showContactPage'])->name('user.contact');
        Route::post('/contact', [UserController::class, 'submitContactForm'])->name('user.contact.submit');
 
    });
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::post('/upload-file', [FileUploadController::class, 'uploadFile']);
Route::get('/api/books-added', [BookController::class, 'getBooksAdded']);
Route::get('/admin/logs', [LogController::class, 'showLogs'])->name('admin.logs');
Route::get('/admin/latest-logs', [LogController::class, 'getLatestLogs'])->name('admin.latest-logs');
Route::get('/admin/statistics', [StatisticsController::class, 'index'])->name('admin.statistics');
Route::get('/api/statistics', [StatisticsController::class, 'index']);
Route::get('/api/statistics/author', [StatisticsController::class, 'getBooksByAuthor']);
Route::get('/api/statistics/city', [StatisticsController::class, 'getBooksByCity']);
Route::get('/api/statistics/section', [StatisticsController::class, 'getBooksBySection']);
Route::get('/api/statistics/year', [StatisticsController::class, 'getBooksByYear']);
Route::post('/admin/settings', [AdminController::class, 'updateProfile'])->name('admin.settings.update');

Route::put('/user/settings/{id}', [UserController::class, 'update'])->name('user.settings.update');
