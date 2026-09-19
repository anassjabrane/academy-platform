<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadApiController extends Controller
{
    public function index()
    {
        return response()->json(Lead::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'nullable|email',
            'telephone' => 'nullable|string|max:20',
            'source' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['admin_id'] = $request->user()->id;
        $validated['statut'] = 'nouveau';

        $lead = Lead::create($validated);

        return response()->json($lead, 201);
    }

    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'nullable|email',
            'telephone' => 'nullable|string|max:20',
            'source' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return response()->json($lead);
    }

    /**
     * Deplace un lead d'une colonne a l'autre (drag and drop).
     */
    public function updateStatut(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $request->validate([
            'statut' => 'required|in:nouveau,contacte,interesse,inscrit,perdu',
        ]);

        $lead->update(['statut' => $request->statut]);

        return response()->json($lead);
    }

    public function destroy($id)
    {
        Lead::findOrFail($id)->delete();

        return response()->json(['message' => 'Lead supprimé.']);
    }
}
