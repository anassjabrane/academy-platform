<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionApiController extends Controller
{
    /**
     * Correspond a handleEnroll(id) dans index.html.
     * L'etudiant connecte s'inscrit a une formation.
     */
    public function store(Request $request, $formationId)
    {
        $formation = Formation::findOrFail($formationId);
        $etudiant = $request->user();

        $dejaInscrit = Inscription::where('etudiant_id', $etudiant->id)
            ->where('formation_id', $formation->id)
            ->exists();

        if ($dejaInscrit) {
            return response()->json([
                'message' => 'Vous êtes déjà inscrit à cette formation.',
            ], 409);
        }

        $inscription = Inscription::create([
            'etudiant_id' => $etudiant->id,
            'formation_id' => $formation->id,
            'date_inscription' => now(),
            'progression' => 0,
            'statut' => 'en_cours',
        ]);

        return response()->json([
            'message' => "Inscription à \"{$formation->titre}\" réussie ! 🎓",
            'inscription' => $inscription,
        ], 201);
    }

    /**
     * Correspond a la page "Mes formations" du dashboard etudiant.
     */
    public function index(Request $request)
    {
        $inscriptions = Inscription::with(['formation.categorie', 'certificat'])
            ->where('etudiant_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($inscriptions);
    }

    /**
     * Permet de mettre a jour la progression d'un etudiant sur une formation
     * (par exemple, quand il termine une leçon).
     */
    public function updateProgression(Request $request, $id)
    {
        $inscription = Inscription::where('etudiant_id', $request->user()->id)
            ->findOrFail($id);

        $request->validate([
            'progression' => 'required|numeric|min:0|max:100',
        ]);

        $inscription->update([
            'progression' => $request->progression,
            'statut' => $request->progression >= 100 ? 'terminee' : 'en_cours',
        ]);

        return response()->json($inscription);
    }
}
