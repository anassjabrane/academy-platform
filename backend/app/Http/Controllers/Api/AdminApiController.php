<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminApiController extends Controller
{
    /**
     * Correspond a la page "Étudiants" du dashboard admin.
     * Liste tous les utilisateurs role=etudiant avec leur derniere
     * inscription (formation principale + progression).
     */
    public function etudiants()
    {
        $etudiants = User::where('role', 'etudiant')
            ->with(['inscriptions' => function ($q) {
                $q->with('formation')->latest()->limit(1);
            }])
            ->get()
            ->map(function ($etudiant) {
                $derniereInscription = $etudiant->inscriptions->first();

                return [
                    'id' => $etudiant->id,
                    'name' => $etudiant->name,
                    'email' => $etudiant->email,
                    'created_at' => $etudiant->created_at,
                    'formation_principale' => $derniereInscription?->formation?->titre,
                    'progression' => $derniereInscription?->progression ?? 0,
                    'statut' => $derniereInscription?->statut ?? 'aucune_formation',
                ];
            });

        return response()->json($etudiants);
    }
}
