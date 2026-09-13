import { useNavigate } from 'react-router-dom';

const CATEGORY_EMOJI = {
  'Marketing & Créatif': '🎨',
  'Développement & Code': '⚡',
  'Technologies Avancées': '🤖',
};

/**
 * Carte d'une formation dans la grille.
 * Correspond au template .fcard genere par renderFormationsGrid() dans index.html,
 * sauf que `formation` vient maintenant de GET /api/formations (Laravel), pas d'un array COURSES.
 */
export default function FormationCard({ formation }) {
  const navigate = useNavigate();
  const emoji = CATEGORY_EMOJI[formation.categorie?.nom] || '📚';
  const noteMoyenne = formation.avis_avg_note ? Number(formation.avis_avg_note).toFixed(1) : '—';
  const avisCount = formation.avis_count ?? 0;

  return (
    <div className="fcard" onClick={() => navigate(`/formations/${formation.id}`)}>
      <div className="fcard-thumb">{emoji}</div>
      <div className="fcard-body">
        <div className="fcard-cat">{formation.categorie?.nom}</div>
        <div className="fcard-title">{formation.titre}</div>
        <div className="fcard-instructor">Par {formation.instructeur}</div>
        <div className="fcard-stats">
          <span className="fcard-rating">★ {noteMoyenne}</span>
          <span>({avisCount})</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          <span className="tag">{formation.duree}</span>
          <span className="tag">{formation.niveau}</span>
        </div>
        <div className="fcard-footer">
          <div className="fcard-price">{formation.prix} MAD</div>
          <button
            className="fcard-enroll"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/formations/${formation.id}`);
            }}
          >
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
}