import { useNavigate } from 'react-router-dom';

const VISUALS_BY_TITRE = {
  'Social Media Management Pro': { emoji: '📱', bg: '#2d1b69' },
  'JavaScript Moderne & ES6+': { emoji: '⚡', bg: '#1e3a5f' },
  'Intelligence Artificielle — Les Bases': { emoji: '🤖', bg: '#1a1a2e' },
  'React.js — Applications Complètes': { emoji: '⚛️', bg: '#1a3a4f' },
  'ChatGPT & Outils IA Avancés': { emoji: '💬', bg: '#1f2937' },
  'Python pour les Données & IA': { emoji: '🐍', bg: '#1a2e1a' },
  'Facebook & Google Ads Expert': { emoji: '📊', bg: '#1e3a5f' },
  'Blockchain & Web3 Introduction': { emoji: '⛓️', bg: '#0a0f2e' },
  'Photoshop & Design Graphique': { emoji: '🎭', bg: '#2d1040' },
};
const DEFAULT_VISUAL = { emoji: '📚', bg: '#1e3a5f' };

/**
 * Carte d'une formation. Reproduit fidelement .fcard de index.html
 * (badge, stats avec avis + etudiants reels, tags, prix + inscription).
 */
export default function FormationCard({ formation }) {
  const navigate = useNavigate();
  const visual = VISUALS_BY_TITRE[formation.titre] || DEFAULT_VISUAL;
  const note = formation.avis_avg_note ? Number(formation.avis_avg_note) : 0;
  const isBestseller = note >= 4.9;

  return (
    <div className="fcard" onClick={() => navigate(`/formations/${formation.id}`)}>
      <div className="fcard-thumb" style={{ background: visual.bg }}>
        {visual.emoji}
        <span className="fcard-cat-badge">{isBestseller ? '★ Bestseller' : 'Cert. Pro'}</span>
      </div>
      <div className="fcard-body">
        <div className="fcard-cat">{formation.categorie?.nom}</div>
        <div className="fcard-title">{formation.titre}</div>
        <div className="fcard-instructor">Par {formation.instructeur}</div>
        <div className="fcard-stats">
          <span className="fcard-rating">★ {note ? note.toFixed(1) : '—'}</span>
          <span>({formation.avis_count ?? 0})</span>
          <span>·</span>
          <span>{(formation.inscriptions_count ?? 0).toLocaleString()} étudiants</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          <span className="tag">{formation.duree}</span>
          <span className="tag">{formation.niveau}</span>
          <span className="tag green">✓ Certifiant</span>
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
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}