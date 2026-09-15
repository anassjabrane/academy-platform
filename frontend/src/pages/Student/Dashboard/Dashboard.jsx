import { useNavigate } from 'react-router-dom';
import { getStoredUser } from '../../../api/auth';

/**
 * Page d'accueil du dashboard etudiant (/dashboard).
 * Version simplifiee - le hero-banner complet avec stats
 * sera ajoute dans une prochaine iteration.
 */
export default function Dashboard() {
  const user = getStoredUser();
  const navigate = useNavigate();

  return (
    <div className="hero-banner">
      <div>
        <div className="hero-title">Bienvenue, {user?.name || 'Étudiant'} 👋</div>
        <div className="hero-sub">Voici un résumé de votre activité</div>
      </div>
      <div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/mes-formations')}>
          Voir mes formations
        </button>
      </div>
    </div>
  );
}