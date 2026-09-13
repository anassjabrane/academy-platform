import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFormations } from '../../api/formations';
import FormationCard from '../../components/FormationCard/FormationCard';

/**
 * Page catalogue. Correspond a <div id="page-formations"> de index.html.
 * Remplace le filtrage JS sur le tableau COURSES par un filtrage
 * sur les donnees reelles recuperees via GET /api/formations.
 */
export default function Formations() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categorie = searchParams.get('cat') || '';

  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = formations.filter((f) => {
    const matchesQuery =
      !query ||
      f.titre.toLowerCase().includes(query.toLowerCase()) ||
      f.instructeur.toLowerCase().includes(query.toLowerCase()) ||
      (f.categorie?.nom || '').toLowerCase().includes(query.toLowerCase());

    const matchesCat = !categorie || f.categorie?.nom === categorie;

    return matchesQuery && matchesCat;
  });

  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">
            {query ? `Résultats pour "${query}"` : categorie || 'Toutes les formations'}
          </h2>
          {!loading && (
            <p className="section-sub">
              <strong>{filtered.length}</strong> formation(s) trouvée(s)
            </p>
          )}
        </div>

        {loading && <p className="fgrid-status">Chargement des formations…</p>}
        {error && <p className="fgrid-status fgrid-error">{error}</p>}

        {!loading && !error && (
          <div className="formations-grid">
            {filtered.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}