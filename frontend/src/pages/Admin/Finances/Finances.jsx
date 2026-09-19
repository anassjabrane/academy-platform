import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';

const STATUT_BADGE = {
  payee: { label: 'Payée', className: 'badge green' },
  en_attente: { label: 'En attente', className: 'badge orange' },
  en_retard: { label: 'En retard', className: 'badge red' },
};

/**
 * Page "Finances" du dashboard admin.
 * Connectee a GET /api/finances + PUT /api/factures/{id}.
 */
export default function Finances() {
  const [factures, setFactures] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    apiClient
      .get('/finances')
      .then((data) => {
        setFactures(data.factures);
        setStats(data.stats);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function changerStatut(id, statut) {
    await apiClient.put(`/factures/${id}`, { statut });
    load();
  }

  if (loading) return <p>Chargement…</p>;

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Finances & Facturation</h1>
          <p>{stats.nb_factures} facture(s) au total</p>
        </div>
      </div>

      <div className="grid-4 mb-24">
        <div className="stat-card">
          <div className="stat-icon green">💰</div>
          <div>
            <div className="stat-val">{Number(stats.total_revenu).toLocaleString()} MAD</div>
            <div className="stat-lbl">Revenu encaissé</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <div className="stat-val">{Number(stats.en_attente).toLocaleString()} MAD</div>
            <div className="stat-lbl">En attente</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div>
            <div className="stat-val">{Number(stats.en_retard).toLocaleString()} MAD</div>
            <div className="stat-lbl">En retard</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🧾</div>
          <div>
            <div className="stat-val">{stats.nb_factures}</div>
            <div className="stat-lbl">Factures totales</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Formation</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Émise le</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((f) => {
                const badge = STATUT_BADGE[f.statut];
                return (
                  <tr key={f.id}>
                    <td>{f.inscription.etudiant.name}</td>
                    <td>{f.inscription.formation.titre}</td>
                    <td>{Number(f.montant).toLocaleString()} MAD</td>
                    <td>
                      <span className={badge.className}>{badge.label}</span>
                    </td>
                    <td>{new Date(f.date_emission).toLocaleDateString('fr-FR')}</td>
                    <td>
                      {f.statut !== 'payee' && (
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => changerStatut(f.id, 'payee')}
                        >
                          Marquer payée
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}