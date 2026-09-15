import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/client';

/**
 * Page "Mes formations" du dashboard etudiant.
 * Connectee a GET /api/mes-formations (InscriptionApiController::index).
 */
export default function MesFormations() {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get('/mes-formations')
      .then(setInscriptions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="fgrid-status">Chargement…</p>;
  if (error) return <p className="fgrid-status fgrid-error">{error}</p>;

  if (inscriptions.length === 0) {
    return (
      <div className="empty-state">
        <p>Vous n'êtes inscrit à aucune formation pour le moment.</p>
        <button className="btn-primary" onClick={() => navigate('/dashboard/catalogue')}>
          Explorer le catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="my-courses-grid">
      {inscriptions.map((inscription) => (
        <div key={inscription.id} className="my-course-card">
          <div className="my-course-title">{inscription.formation.titre}</div>
          <div className="my-course-cat">{inscription.formation.categorie?.nom}</div>

          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${inscription.progression}%` }}
            />
          </div>
          <div className="progress-label">{inscription.progression}% complété</div>

          <div className="my-course-status">
            {inscription.statut === 'terminee' ? '✅ Terminée' : '📚 En cours'}
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate(`/formations/${inscription.formation.id}`)}
          >
            Continuer
          </button>
        </div>
      ))}
    </div>
  );
}