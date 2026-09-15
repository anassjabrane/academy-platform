import { useEffect, useState } from 'react';
import { getFormations } from '../../../api/formations';

/**
 * Page "Formations" du dashboard admin.
 * Connectee a GET /api/formations. Les actions Creer/Modifier/Supprimer
 * seront ajoutees dans une prochaine iteration (POST/PUT/DELETE
 * /api/formations cote backend, actuellement commentees dans routes/api.php).
 */
export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p style={{ color: '#dc2626' }}>{error}</p>;

  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Instructeur</th>
            <th>Niveau</th>
            <th>Prix</th>
            <th>Avis</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((f) => (
            <tr key={f.id}>
              <td>{f.titre}</td>
              <td>{f.categorie?.nom}</td>
              <td>{f.instructeur}</td>
              <td>{f.niveau}</td>
              <td>{f.prix} MAD</td>
              <td>
                ★ {f.avis_avg_note ? Number(f.avis_avg_note).toFixed(1) : '—'} ({f.avis_count ?? 0})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}