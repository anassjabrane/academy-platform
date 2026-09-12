<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Verifie que l'utilisateur connecte a bien le role requis.
     * Usage dans les routes : ->middleware('role:admin')
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if (! $request->user() || $request->user()->role !== $role) {
            return response()->json([
                'message' => "Accès refusé. Cette action nécessite le rôle : {$role}.",
            ], 403);
        }

        return $next($request);
    }
}
