<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Log;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $findUser = User::where('email', $user->getEmail())->first();

        if ($findUser) {
            $findUser->is_online = true;
            $findUser->save();
            
            Log::create([
                'user_id' => $findUser->id,
                'action' => 'Login',
                'description' => "{$findUser->name} logged in using Google.",
            ]);
            Auth::login($findUser);
            return redirect()->intended($findUser->is_admin ? '/admin/dashboard' : '/user/user-dashboard/' . $findUser->id);
        } else {
            $newUser = User::create([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'google_id' => $user->getId(),
                'password' => Hash::make('dummy_password'),
                'is_online' => true,
            ]);

            Auth::login($newUser);
            return redirect()->intended($newUser->is_admin ? '/admin/dashboard' : '/user/user-dashboard/' . $newUser->id);
        }
    }
}
