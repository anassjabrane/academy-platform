<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Formation;

class FormationApiController extends Controller
{
    /**
     * Correspond a renderFormationsGrid() dans index.html.
     */
    public function index()
    {
        $formations = Formation::with('categorie')
            ->withCount('avis')
            ->withAvg('avis', 'note')
            ->get();

        return response()->json($formations);
    }

    /**
     * Correspond a showCourse(id) dans index.html.
     */
    public function show($id)
    {
        $formation = Formation::with(['categorie', 'lecons', 'avis.etudiant'])
            ->findOrFail($id);

        return response()->json($formation);
    }

    public function categories()
    {
        return response()->json(Categorie::withCount('formations')->get());
    }
}
