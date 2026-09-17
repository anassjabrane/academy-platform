import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';

const STATUT_BADGE = {
  en_cours: { label: 'En cours', className: 'badge blue' },
  terminee: { label: 'Terminée', className: 'badge green' },
  abandonnee: { label: 'Abandonnée', className: 'badge gray' },
  aucune_formation: { label: 'Aucune formation', className: 'badge gray' },
};

/**
 * Page "Étudiants" du dashboard admin.
 * Reproduit <div id="page-etudiants"> de dashboard_administration.html,
 * connectee a GET /api/etudiants (AdminApiController::etudiants).
 */
export default function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    apiClient
      .get('/etudiants')
      .then(setEtudiants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visibles = etudiants.filter(
    (e) =>
      e.name.toLowerCase().includes(filtre.toLowerCase()) ||
      e.email.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Étudiants</h1>
          <p>{etudiants.length} étudiant(s) inscrit(s) sur la plateforme</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge blue">Tous ({etudiants.length})</span>
          </div>
          <div className="search-bar" style={{ width: 220 }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Filtrer…"
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          {loading && <p style={{ padding: 20 }}>Chargement…</p>}
          {error && <p style={{ padding: 20, color: '#dc2626' }}>{error}</p>}

          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Email</th>
                  <th>Formation principale</th>
                  <th>Progression</th>
                  <th>Statut</th>
                  <th>Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((e) => {
                  const badge = STATUT_BADGE[e.statut] || STATUT_BADGE.aucune_formation;
                  return (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.formation_principale || '—'}</td>
                      <td>{e.progression}%</td>
                      <td>
                        <span className={badge.className}>{badge.label}</span>
                      </td>
                      <td>{new Date(e.created_at).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}