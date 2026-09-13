<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Formation;
use App\Models\Lecon;
use App\Models\User;
use Illuminate\Database\Seeder;

class FormationSeeder extends Seeder
{
    /**
     * Donnees extraites du tableau COURSES dans index.html.
     */
    private array $courses = [
        [
            'titre' => 'Social Media Management Pro',
            'cat' => 'Marketing & Créatif',
            'instructeur' => 'Meryem Senhaji',
            'niveau' => 'Débutant',
            'duree' => '32h',
            'prix' => 890,
            'description' => "Maîtrisez la gestion des réseaux sociaux professionnellement. De la stratégie de contenu à l'analyse des performances, devenez un expert Social Media.",
            'syllabus' => [
                'Introduction au Social Media Marketing', 'Stratégie de contenu & storytelling',
                'Maîtriser Instagram & Reels', 'LinkedIn pour les professionnels',
                'Facebook Ads & Meta Business Suite', 'TikTok : créer des vidéos virales',
                'Canva & création graphique', 'Analytics & reporting',
                'Automatisation & outils pro', 'Projet final : stratégie complète',
            ],
        ],
        [
            'titre' => 'JavaScript Moderne & ES6+',
            'cat' => 'Développement & Code',
            'instructeur' => 'Karim El Idrissi',
            'niveau' => 'Intermédiaire',
            'duree' => '48h',
            'prix' => 990,
            'description' => 'Le cours JavaScript le plus complet du Maroc. Partez de zéro et maîtrisez les dernières fonctionnalités ES6+ pour devenir développeur web professionnel.',
            'syllabus' => [
                'Variables, types et opérateurs', 'Fonctions et portée',
                'Tableaux et objets', 'ES6 : let, const, template literals',
                'Arrow functions et this', 'Destructuring & spread operator',
                'Modules ES6', 'Async JS : callbacks & promesses',
                'Async/Await', 'Fetch API & REST',
                'DOM manipulation avancée', 'Projet : Application web complète',
            ],
        ],
        [
            'titre' => 'Intelligence Artificielle — Les Bases',
            'cat' => 'Technologies Avancées',
            'instructeur' => 'Hamza Raji',
            'niveau' => 'Débutant',
            'duree' => '36h',
            'prix' => 1190,
            'description' => "Comprenez et utilisez l'IA dans votre métier. De ChatGPT au Machine Learning, cette formation vous donne les bases concrètes pour intégrer l'IA dans votre quotidien professionnel.",
            'syllabus' => [
                "Qu'est-ce que l'IA ? Histoire et enjeux", 'Types d\'IA : ML, DL, NLP',
                'ChatGPT : bases et utilisation', 'Prompt engineering — niveau 1',
                'Prompt engineering — niveau 2', 'Midjourney & génération d\'images',
                'Automatisations avec Make.com', 'IA pour le marketing',
                'IA pour les développeurs', 'Machine Learning : introduction',
                'Projet : Assistant IA personnalisé',
            ],
        ],
        [
            'titre' => 'React.js — Applications Complètes',
            'cat' => 'Développement & Code',
            'instructeur' => 'Karim El Idrissi',
            'niveau' => 'Intermédiaire',
            'duree' => '52h',
            'prix' => 1290,
            'description' => 'Construisez des applications React modernes de A à Z. Hooks, Context API, Redux, React Router — tout ce qu\'il faut pour devenir développeur React professionnel.',
            'syllabus' => [
                'Introduction à React & JSX', 'Composants & props',
                'useState et événements', 'useEffect et cycle de vie',
                'Formulaires contrôlés', 'React Router v6',
                'Context API', 'Redux Toolkit',
                'Fetching de données', 'Optimisation & performance',
                'Tests avec React Testing Library', 'Projet : Application complète',
            ],
        ],
        [
            'titre' => 'ChatGPT & Outils IA Avancés',
            'cat' => 'Technologies Avancées',
            'instructeur' => 'Hamza Raji',
            'niveau' => 'Débutant',
            'duree' => '24h',
            'prix' => 990,
            'description' => 'Devenez expert des outils IA : ChatGPT, Claude, Midjourney, Perplexity et plus encore. Apprenez à les intégrer dans votre workflow quotidien pour x5 votre productivité.',
            'syllabus' => [
                'Panorama des outils IA 2024', 'ChatGPT : maîtrise avancée',
                'Prompt engineering pro', 'Claude & Gemini',
                'Midjourney & DALL-E', 'Perplexity & recherche IA',
                'Notion AI & outils de productivité', 'Make.com + OpenAI',
                'Créer un GPT personnalisé', 'IA pour le marketing de contenu',
                'Projet final : workflow IA complet',
            ],
        ],
        [
            'titre' => 'Python pour les Données & IA',
            'cat' => 'Développement & Code',
            'instructeur' => 'Hamza Raji',
            'niveau' => 'Débutant',
            'duree' => '44h',
            'prix' => 1190,
            'description' => "Apprenez Python de zéro jusqu'à l'analyse de données et le Machine Learning. Pandas, NumPy, Matplotlib, Scikit-learn — devenez Data Analyst ou Data Scientist.",
            'syllabus' => [
                'Python : syntaxe de base', 'Structures de données',
                'Fonctions et modules', 'Pandas : DataFrames',
                'Nettoyage et préparation des données', 'Visualisation avec Matplotlib',
                'Seaborn & visualisations avancées', 'Introduction au ML',
                'Scikit-learn : régression', 'Scikit-learn : classification',
                'Clustering & unsupervised learning', 'Projet : Analyse de données complète',
            ],
        ],
        [
            'titre' => 'Facebook & Google Ads Expert',
            'cat' => 'Marketing & Créatif',
            'instructeur' => 'Meryem Senhaji',
            'niveau' => 'Intermédiaire',
            'duree' => '28h',
            'prix' => 890,
            'description' => 'Maîtrisez la publicité digitale payante. Créez, optimisez et scalez des campagnes Facebook Ads et Google Ads qui génèrent de vrais résultats pour vos clients ou votre business.',
            'syllabus' => [
                'Fondamentaux de la publicité digitale', 'Pixel Facebook : installation',
                'Campagnes Facebook : objectifs', 'Audiences personnalisées & lookalike',
                'Création de visuels pour les ads', 'A/B testing méthodologie',
                'Google Ads : Search', 'Google Ads : Display & YouTube',
                'Remarketing avancé', 'Optimisation et scaling',
                'Reporting client professionnel', 'Projet : Campagne complète',
            ],
        ],
        [
            'titre' => 'Blockchain & Web3 Introduction',
            'cat' => 'Technologies Avancées',
            'instructeur' => 'Hamza Raji',
            'niveau' => 'Débutant',
            'duree' => '20h',
            'prix' => 990,
            'description' => "Comprenez la blockchain et le Web3 sans avoir besoin d'être développeur. NFTs, DeFi, smart contracts, cryptomonnaies — maîtrisez les fondamentaux de cette révolution technologique.",
            'syllabus' => [
                "Qu'est-ce que la blockchain ?", 'Bitcoin : fonctionnement',
                'Ethereum & altcoins', 'Wallets crypto',
                'NFTs : histoire et création', 'Vendre ses NFTs sur OpenSea',
                'DeFi : protocoles principaux', 'Smart contracts avec Solidity',
                "Web3 et le futur d'Internet", 'Projet : créer et déployer un NFT',
            ],
        ],
        [
            'titre' => 'Photoshop & Design Graphique',
            'cat' => 'Marketing & Créatif',
            'instructeur' => 'Aicha Tahiri',
            'niveau' => 'Débutant',
            'duree' => '30h',
            'prix' => 890,
            'description' => 'Apprenez Photoshop de A à Z et créez des designs professionnels. Retouche photo, création graphique, supports de communication — devenez graphiste ou intégrateur web.',
            'syllabus' => [
                'Interface et navigation', 'Sélections et masques',
                'Calques et blend modes', 'Retouche beauté et portrait',
                'Color grading professionnel', 'Typographie créative',
                'Création de bannières web', 'Mockups et présentations',
                'Photomontage avancé', 'Filtres et effets créatifs',
                'Projet : identité visuelle complète',
            ],
        ],
    ];

    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        foreach ($this->courses as $data) {
            $categorie = Categorie::where('nom', $data['cat'])->first();

            $formation = Formation::create([
                'categorie_id' => $categorie->id,
                'admin_id' => $admin->id,
                'instructeur' => $data['instructeur'],
                'titre' => $data['titre'],
                'description' => $data['description'],
                'prix' => $data['prix'],
                'niveau' => $data['niveau'],
                'duree' => $data['duree'],
            ]);

            foreach ($data['syllabus'] as $index => $titreLecon) {
                Lecon::create([
                    'formation_id' => $formation->id,
                    'titre' => $titreLecon,
                    'duree' => 30,
                    'ordre' => $index + 1,
                ]);
            }
        }
    }
}
