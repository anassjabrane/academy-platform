<?php

namespace Database\Seeders;

use App\Models\Formation;
use App\Models\Instructeur;
use Illuminate\Database\Seeder;

class InstructeurSeeder extends Seeder
{
    public function run(): void
    {
        $instructeurs = [
            ['nom' => 'Meryem Senhaji', 'specialite' => 'Marketing & Créatif'],
            ['nom' => 'Karim El Idrissi', 'specialite' => 'Développement & Code'],
            ['nom' => 'Hamza Raji', 'specialite' => 'Technologies Avancées'],
            ['nom' => 'Aicha Tahiri', 'specialite' => 'Marketing & Créatif'],
        ];

        foreach ($instructeurs as $data) {
            $instructeur = Instructeur::firstOrCreate(['nom' => $data['nom']], $data);

            // Relie automatiquement toutes les formations qui portaient
            // deja ce nom en texte dans la colonne "instructeur".
            Formation::where('instructeur', $data['nom'])
                ->update(['instructeur_id' => $instructeur->id]);
        }
    }
}
