<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use Inertia\Inertia;

class LogController extends Controller
{
    public function showLogs(Request $request)
    {
        $logs = Log::with(['user:id,name,is_online']) // Using is_online directly
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
        
        return Inertia::render('AdminLogs', [
            'logs' => $logs,
        ]);
    }
    
    public function getLatestLogs(Request $request)
    {
        $query = Log::with(['user' => function($query) {
            $query->select('id', 'name', 'is_online');
        }]);
    
        if ($search = $request->input('search')) {
            $query->whereHas('user', function($userQuery) use ($search) {
                $userQuery->where('name', 'like', "%$search%")
                          ->orWhere('email', 'like', "%$search%");
            })->orWhere('action', 'like', "%$search%");
        }
    
        $logs = $query->orderBy('created_at', 'desc')->take(10)->get();
        return response()->json($logs);
    }
    
    
}
