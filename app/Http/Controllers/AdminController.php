<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\ContactMessage;

class AdminController extends Controller
{
    public function dashboard()
    {
        $books = Book::with('user')->get();
        return Inertia::render('AdminDashboard', [
            'books' => $books,
        ]);
    }

    public function showSettings()
    {
        $admin = Auth::user(); 
        return Inertia::render('Admin/Settings', [
            'admin' => $admin
        ]);
    }

    public function updateProfile(Request $request)
    {
        $admin = Auth::user();
    
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);
    
        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $admin->password,
        ]);
    
        return redirect()->route('admin.settings')->with('success', 'Profile updated successfully.');
    }
    
    public function viewContactMessages()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->take(12)->get();
     
        return Inertia::render('Admin/ContactMessages', [
            'messages' => $messages,
        ]);
    }
}
