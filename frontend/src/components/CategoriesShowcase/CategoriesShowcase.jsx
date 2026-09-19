import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFormations } from '../../api/formations';

const THUMB_BY_TITRE = {
  'Social Media Management Pro': { emoji: '📱', bg: '#f0f4ff' },
  'Facebook & Google Ads Expert': { emoji: '📊', bg: '#fff7ed' },
  'Photoshop & Design Graphique': { emoji: '🎭', bg: '#fdf2f8' },
  'JavaScript Moderne & ES6+': { emoji: '⚡', bg: '#fef9c3' },
  'React.js — Applications Complètes': { emoji: '⚛️', bg: '#e0f2fe' },
  'Python pour les Données & IA': { emoji: '🐍', bg: '#dcfce7' },
  'Intelligence Artificielle — Les Bases': { emoji: '🤖', bg: '#ede9fe' },
  'ChatGPT & Outils IA Avancés': { emoji: '💬', bg: '#f0fdf4' },
  'Blockchain & Web3 Introduction': { emoji: '⛓️', bg: '#1a1a2e' },
};
const CATEGORIES = [
  { nom: 'Marketing & Créatif', emoji: '🎨' },
  { nom: 'Développement & Code', emoji: '⚡' },
  { nom: 'Technologies Avancées', emoji: '🤖' },
];

/**
 * Section "Les plus populaires par catégorie".
 * Reproduit .cat-grid de index.html, avec les vraies formations
 * (triées par note) au lieu des 9 cours codés en dur.
 */
export default function CategoriesShowcase() {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFormations().then(setFormations).catch(() => {});
  }, []);

  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">Catalogue</div>
          <h2 className="section-title">Les plus populaires par catégorie</h2>
          <p className="section-sub">
            Choisissez parmi nos formations les mieux notées et les plus demandées
          </p>
        </div>

        <div className="cat-grid">
          {CATEGORIES.map((cat) => {
            const top3 = formations
              .filter((f) => f.categorie?.nom === cat.nom)
              .sort((a, b) => (b.avis_avg_note || 0) - (a.avis_avg_note || 0))
              .slice(0, 3);

            return (
              <div
                key={cat.nom}
                className="cat-card"
                onClick={() => navigate(`/formations?cat=${encodeURIComponent(cat.nom)}`)}
              >
                <div className="cat-card-head">
                  <div className="cat-card-title">
                    {cat.emoji} {cat.nom}
                  </div>
                  <div className="cat-see-all">
                    Voir tout
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>

                {top3.map((formation) => {
                  const visual = THUMB_BY_TITRE[formation.titre] || { emoji: '📚', bg: '#f1f5f9' };
                  const note = formation.avis_avg_note ? Number(formation.avis_avg_note) : 0;
                  return (
                    <div
                      key={formation.id}
                      className="course-row"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/formations/${formation.id}`);
                      }}
                    >
                      <div className="course-thumb" style={{ background: visual.bg }}>
                        {visual.emoji}
                      </div>
                      <div className="course-info">
                        <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2 }}>
                          The Academy MA
                        </div>
                        <div className="course-name">{formation.titre}</div>
                        <div className="course-meta-row">
                          <span className={note >= 4.9 ? 'badge-bestseller' : 'badge-cert'}>
                            {note >= 4.9 ? '★ Bestseller' : 'Cert. Pro'}
                          </span>
                          <span className="rating">★ {note ? note.toFixed(1) : '—'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}