<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Marketing & Créatif', 'Développement & Code', 'Technologies Avancées'] as $nom) {
            Categorie::firstOrCreate(['nom' => $nom]);
        }
    }
}
