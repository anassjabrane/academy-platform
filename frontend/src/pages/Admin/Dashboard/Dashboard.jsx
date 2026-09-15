import { getStoredUser } from '../../../api/auth';

/**
 * Page d'accueil du dashboard admin (/admin).
 * Version simplifiee - stats-grid complet avec vraies metriques
 * sera ajoute dans une prochaine iteration (necessite un endpoint
 * /api/admin/stats cote backend).
 */
export default function Dashboard() {
  const user = getStoredUser();

  return (
    <div className="hero-banner">
      <div>
        <div className="hero-title">Bienvenue, {user?.name || 'Admin'} 👋</div>
        <div className="hero-sub">Voici un résumé de votre activité</div>
      </div>
      <div className="hero-emoji">👩‍💻</div>
    </div>
  );
}