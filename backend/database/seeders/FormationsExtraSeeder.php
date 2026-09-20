<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Formation;
use App\Models\Instructeur;
use App\Models\Lecon;
use App\Models\User;
use Illuminate\Database\Seeder;

class FormationsExtraSeeder extends Seeder
{
    private array $instructeurs = [
        ['nom' => 'Nadia Squalli', 'specialite' => 'Business & Carrière'],
        ['nom' => 'Youssef Bennani', 'specialite' => 'Bureautique'],
    ];

    private array $courses = [
        [
            'titre' => 'Gestion de Projet Agile & Scrum',
            'cat' => 'Business & Carrière',
            'instructeur' => 'Nadia Squalli',
            'niveau' => 'Intermédiaire',
            'duree' => '26h',
            'prix' => 990,
            'prix_original' => 1590,
            'description' => "Maîtrisez les méthodologies Agile et Scrum pour piloter des projets efficacement. De la théorie à la certification, devenez Scrum Master ou Product Owner.",
            'objectifs' => [
                'Comprendre les principes Agile et le Manifeste Agile',
                'Maîtriser le framework Scrum (rôles, cérémonies, artefacts)',
                'Utiliser Jira et Trello pour piloter un sprint',
                'Animer une rétrospective et une planification de sprint',
                'Préparer la certification PSM I',
                'Adapter Agile à des contextes non-IT',
            ],
            'syllabus' => [
                'Introduction au Manifeste Agile', 'Les méthodologies Agile : Scrum, Kanban, XP',
                'Les rôles Scrum : PO, SM, équipe', 'Le Product Backlog et les User Stories',
                'Sprint Planning & estimation', 'Daily Scrum et suivi de sprint',
                'Sprint Review & Rétrospective', 'Outils : Jira, Trello, Confluence',
                'Scrum à l\'échelle (SAFe, LeSS)', 'Préparer la certification PSM I',
                'Projet : piloter un sprint complet',
            ],
        ],
        [
            'titre' => "Leadership & Management d'Équipe",
            'cat' => 'Business & Carrière',
            'instructeur' => 'Nadia Squalli',
            'niveau' => 'Débutant',
            'duree' => '22h',
            'prix' => 890,
            'prix_original' => 1390,
            'description' => "Développez vos compétences de leader. Communication, délégation, gestion des conflits — les outils essentiels pour manager une équipe avec impact.",
            'objectifs' => [
                'Identifier son style de leadership naturel',
                'Communiquer efficacement avec son équipe',
                'Déléguer et responsabiliser ses collaborateurs',
                'Gérer les conflits et les situations difficiles',
                'Mener un entretien de feedback constructif',
                'Motiver et engager une équipe à distance',
            ],
            'syllabus' => [
                "Les styles de leadership", 'Communication managériale',
                'Fixer des objectifs SMART', 'Déléguer efficacement',
                'Gérer les conflits en équipe', "L'entretien de feedback",
                'Motivation et engagement', 'Manager le télétravail',
                'Intelligence émotionnelle au travail', 'Projet : plan de développement managérial',
            ],
        ],
        [
            'titre' => 'Entrepreneuriat & Business Plan',
            'cat' => 'Business & Carrière',
            'instructeur' => 'Nadia Squalli',
            'niveau' => 'Débutant',
            'duree' => '24h',
            'prix' => 890,
            'prix_original' => 1390,
            'description' => "De l'idée au lancement : construisez un business plan solide, validez votre marché et trouvez vos premiers financements au Maroc.",
            'objectifs' => [
                'Valider une idée de business (étude de marché)',
                'Construire un Business Model Canvas',
                'Rédiger un business plan complet',
                'Comprendre les statuts juridiques au Maroc',
                'Trouver des financements (CCG, Maroc PME, business angels)',
                'Faire un pitch investisseur convaincant',
            ],
            'syllabus' => [
                "Valider son idée : étude de marché", 'Business Model Canvas',
                'Définir sa proposition de valeur', 'Prévisionnel financier simplifié',
                'Statuts juridiques au Maroc (SARL, auto-entrepreneur)', 'Financements et aides disponibles',
                'Rédiger son business plan', 'Construire son pitch deck',
                'Techniques de pitch investisseur', 'Projet : business plan complet',
            ],
        ],
        [
            'titre' => 'Excel Avancé & Tableaux de Bord',
            'cat' => 'Bureautique',
            'instructeur' => 'Youssef Bennani',
            'niveau' => 'Intermédiaire',
            'duree' => '20h',
            'prix' => 690,
            'prix_original' => 1090,
            'description' => "Passez d'utilisateur basique à expert Excel. Formules avancées, tableaux croisés dynamiques, dashboards professionnels pour l'analyse de données.",
            'objectifs' => [
                'Maîtriser les formules avancées (RECHERCHEX, INDEX/EQUIV)',
                'Créer des tableaux croisés dynamiques',
                'Construire des dashboards visuels et interactifs',
                'Automatiser des tâches avec les macros de base',
                'Nettoyer et structurer des données efficacement',
                'Utiliser Power Query pour importer des données',
            ],
            'syllabus' => [
                'Rappel des fondamentaux Excel', 'Formules avancées : RECHERCHEX, INDEX/EQUIV',
                'Fonctions conditionnelles imbriquées', 'Tableaux croisés dynamiques',
                'Graphiques et mise en forme conditionnelle', 'Construire un dashboard',
                'Introduction à Power Query', 'Introduction aux macros VBA',
                'Nettoyage et validation de données', 'Projet : dashboard de ventes complet',
            ],
        ],
        [
            'titre' => 'Pack Office Complet',
            'cat' => 'Bureautique',
            'instructeur' => 'Youssef Bennani',
            'niveau' => 'Débutant',
            'duree' => '18h',
            'prix' => 590,
            'prix_original' => 890,
            'description' => "Word, Excel et PowerPoint de A à Z. La formation bureautique complète pour être opérationnel au bureau dès le premier jour.",
            'objectifs' => [
                'Rédiger et mettre en forme des documents Word professionnels',
                'Créer des formules et tableaux Excel simples',
                'Concevoir des présentations PowerPoint efficaces',
                'Utiliser les styles et modèles pour gagner du temps',
                'Fusionner et publier des documents (publipostage)',
                "Collaborer avec Office 365 en ligne",
            ],
            'syllabus' => [
                'Word : mise en forme et styles', 'Word : tableaux et publipostage',
                'Excel : bases et formules simples', 'Excel : mise en forme et graphiques',
                'PowerPoint : structurer une présentation', 'PowerPoint : design et animations',
                'Office 365 et collaboration en ligne', 'Projet : dossier bureautique complet',
            ],
        ],
        [
            'titre' => 'PowerPoint Professionnel & Storytelling',
            'cat' => 'Bureautique',
            'instructeur' => 'Youssef Bennani',
            'niveau' => 'Débutant',
            'duree' => '14h',
            'prix' => 590,
            'prix_original' => 890,
            'description' => "Créez des présentations qui marquent. Storytelling, design percutant, techniques de présentation orale — captivez votre audience à chaque slide.",
            'objectifs' => [
                'Structurer une présentation avec le storytelling',
                'Appliquer les principes de design visuel',
                'Utiliser les animations et transitions avec parcimonie',
                'Créer des graphiques et infographies clairs',
                "Maîtriser l'art de la présentation orale",
                'Réutiliser des templates professionnels',
            ],
            'syllabus' => [
                'Storytelling : structurer son message', 'Principes de design visuel',
                'Typographie et palette de couleurs', 'Graphiques et data visualisation',
                'Animations et transitions efficaces', "Techniques de présentation orale",
                'Templates et gain de temps', 'Projet : pitch deck professionnel',
            ],
        ],
    ];

    public function run(): void
    {
        foreach ($this->instructeurs as $data) {
            Instructeur::firstOrCreate(['nom' => $data['nom']], $data);
        }

        $admin = User::where('role', 'admin')->first();

        foreach ($this->courses as $data) {
            $categorie = Categorie::where('nom', $data['cat'])->first();
            $instructeur = Instructeur::where('nom', $data['instructeur'])->first();

            $formation = Formation::firstOrCreate(
                ['titre' => $data['titre']],
                [
                    'categorie_id' => $categorie->id,
                    'admin_id' => $admin->id,
                    'instructeur' => $data['instructeur'],
                    'instructeur_id' => $instructeur->id,
                    'description' => $data['description'],
                    'objectifs' => $data['objectifs'],
                    'prix' => $data['prix'],
                    'prix_original' => $data['prix_original'],
                    'niveau' => $data['niveau'],
                    'duree' => $data['duree'],
                ]
            );

            if ($formation->lecons()->count() === 0) {
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
}
