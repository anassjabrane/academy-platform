<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Seeder;

class ObjectifsSeeder extends Seeder
{
    /**
     * Objectifs extraits du tableau COURSES (learn[]) de index.html.
     */
    private array $objectifsParTitre = [
        'Social Media Management Pro' => [
            'Créer une stratégie Social Media complète',
            'Maîtriser Instagram, LinkedIn, TikTok et Facebook',
            'Créer des visuels percutants avec Canva',
            'Analyser les KPIs et optimiser les campagnes',
            'Gérer une communauté et modérer les interactions',
            'Utiliser les outils de planification (Buffer, Hootsuite)',
        ],
        'JavaScript Moderne & ES6+' => [
            'Maîtriser les fondamentaux de JavaScript',
            'ES6+ : arrow functions, destructuring, spread',
            'Async/Await et gestion des promesses',
            'Manipulation du DOM et événements',
            "Fetch API et consommation d'APIs REST",
            'Introduction à Node.js et NPM',
        ],
        'Intelligence Artificielle — Les Bases' => [
            "Comprendre comment fonctionne l'IA",
            'Utiliser ChatGPT et les LLMs efficacement',
            'Prompt engineering avancé',
            'Notions de Machine Learning',
            'Outils IA pour la productivité',
            "Créer des automatisations avec l'IA",
        ],
        'React.js — Applications Complètes' => [
            'Composants fonctionnels et JSX',
            'Hooks : useState, useEffect, useContext',
            'React Router pour les SPA',
            "Context API et gestion d'état",
            'Redux Toolkit',
            'Déploiement avec Vercel',
        ],
        'ChatGPT & Outils IA Avancés' => [
            'Maîtriser ChatGPT 4 & Claude',
            'Prompt engineering expert',
            'Créer des visuels avec Midjourney',
            'Automatiser avec Make.com + IA',
            'IA pour la rédaction de contenu',
            'Construire ses propres GPTs',
        ],
        'Python pour les Données & IA' => [
            'Bases de Python depuis zéro',
            'Manipulation de données avec Pandas',
            'Visualisation avec Matplotlib & Seaborn',
            'Notions de Machine Learning',
            'Scikit-learn pour les modèles ML',
            'Projets data réels',
        ],
        'Facebook & Google Ads Expert' => [
            'Créer des campagnes Facebook Ads',
            'Google Ads Search & Display',
            "Ciblage d'audience avancé",
            'A/B testing et optimisation',
            'Pixel Facebook et tracking',
            'Reporting et analyse ROI',
        ],
        'Blockchain & Web3 Introduction' => [
            'Comprendre la technologie blockchain',
            'Bitcoin et Ethereum',
            'NFTs : créer et vendre',
            'DeFi : finance décentralisée',
            'Smart contracts : introduction',
            'Wallets et sécurité crypto',
        ],
        'Photoshop & Design Graphique' => [
            'Interface Photoshop et outils essentiels',
            'Retouche et correction photo',
            'Création de visuels pour les réseaux',
            'Typographie et mise en page',
            'Effets et filtres avancés',
            'Exportation pour web et print',
        ],
    ];

    public function run(): void
    {
        foreach ($this->objectifsParTitre as $titre => $objectifs) {
            Formation::where('titre', $titre)->update(['objectifs' => $objectifs]);
        }
    }
}
