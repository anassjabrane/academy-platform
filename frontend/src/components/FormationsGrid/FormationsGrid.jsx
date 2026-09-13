import { useEffect, useState } from 'react';
import { getFormations } from '../../api/formations';
import FormationCard from '../FormationCard/FormationCard';

/**
 * Grille de formations.
 * Remplace renderFormationsGrid(COURSES, containerId) de index.html :
 * les donnees viennent maintenant de GET /api/formations (Laravel + MySQL).
 */
export default function FormationsGrid({ categorieFiltre }) {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="fgrid-status">Chargement des formations…</p>;
  if (error) return <p className="fgrid-status fgrid-error">{error}</p>;

  const visibles = categorieFiltre
    ? formations.filter((f) => f.categorie?.nom === categorieFiltre)
    : formations;

  if (visibles.length === 0) {
    return <p className="fgrid-status">Aucune formation trouvée.</p>;
  }

  return (
    <div className="formations-grid">
      {visibles.map((formation) => (
        <FormationCard key={formation.id} formation={formation} />
      ))}
    </div>
  );
}