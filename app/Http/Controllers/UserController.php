<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContactMessage;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('is_admin', 0)->paginate(4); 
        $totalUsers = User::where('is_admin', 0)->count();
        $onlineUsers = User::where('is_admin', 0)->where('is_online', 1)->count(); 
        $totalAdmins = User::where('is_admin', 1)->count(); 
        $recentUsers = User::where('created_at', '>=', now()->subWeek())->count(); 
        return Inertia::render('Admin/ManageUsers', [
            'users' => $users,
            'totalUsers' => $totalUsers,
            'onlineUsers' => $onlineUsers,
            'totalAdmins' => $totalAdmins,
            'recentUsers' => $recentUsers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CreateUser');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('admin.manage-users')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/EditUser', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        \Log::info('User object before redirect', ['user' => $user]);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);
    
        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
        ];
    
        if ($request->filled('password')) {
            $updateData['password'] = bcrypt($request->password);
        }
    
        $user->update($updateData);
    
        \Log::info('User updated successfully', ['user_id' => $user->id]);
    
        return redirect()->route('user.settings', ['id' => $user->id])->with('success', 'Profile updated successfully.');
    }
    
    
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.manage-users')->with('success', 'User deleted successfully.');
    }

    public function showDashboard($id)
{
    $user = User::findOrFail($id);
    return Inertia::render('User/Dashboard', [
        'user' => $user
    ]);
}

public function showProfile($id)
{
    $user = User::findOrFail($id);
    return Inertia::render('User/Profile', [
        'user' => $user
    ]);
}

public function showSettings($id)
{
    $user = User::findOrFail($id);
    return Inertia::render('User/Settings', [
        'user' => $user
    ]);
}
public function showContactPage()
    {
        return Inertia::render('User/Contact');
    }

    public function submitContactForm(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'description' => 'required|string|max:2000',
        ]);
    
        // Save the contact message to the database
        ContactMessage::create([
            'email' => $request->email,
            'description' => $request->description,
        ]);
    
        // Redirect back to the contact form with a success message
        return redirect()->route('user.contact')->with('success', 'Your message has been sent successfully.');
    }
    
    

}
