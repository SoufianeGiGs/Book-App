<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;


class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Set the user as online
            $user = Auth::user();
            $user->is_online = true;
            $user->save();

            Log::create([
                'user_id' => $user->id,
                'action' => 'Login',
                'description' => "{$user->name} logged in.",
            ]);

            if ($user->is_admin) {
                return redirect()->intended('/admin/dashboard');
            } else {
                return redirect()->intended('/user/user-dashboard/' . $user->id);
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function destroy(Request $request)
    {
        // Set the user as offline
        $user = Auth::user();
        $user->is_online = false;
        $user->save();

        Log::create([
            'user_id' => $user->id,
            'action' => 'Logout',
            'description' => "{$user->name} logged out.",
        ]);

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}