<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instructeur;
use Illuminate\Http\Request;

class InstructeurApiController extends Controller
{
    public function index()
    {
        return response()->json(
            Instructeur::withCount('formations')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'nullable|email',
            'specialite' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo_url' => 'nullable|string',
        ]);

        $instructeur = Instructeur::create($validated);

        return response()->json($instructeur, 201);
    }

    public function update(Request $request, $id)
    {
        $instructeur = Instructeur::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'nullable|email',
            'specialite' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo_url' => 'nullable|string',
        ]);

        $instructeur->update($validated);

        return response()->json($instructeur);
    }

    public function destroy($id)
    {
        Instructeur::findOrFail($id)->delete();

        return response()->json(['message' => 'Instructeur supprimé.']);
    }
}
