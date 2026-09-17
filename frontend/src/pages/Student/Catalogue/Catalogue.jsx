import { useEffect, useState } from 'react';
import { getFormations } from '../../../api/formations';
import { inscrireFormation } from '../../../api/inscriptions';
import { apiClient } from '../../../api/client';

/**
 * Emoji + couleur de fond exacts extraits de ALL_COURSES dans
 * dashboard_etudiant.html, pour reproduire fidelement les course-thumb.
 */
const VISUALS_BY_TITRE = {
  'JavaScript Moderne & ES6+': { emoji: '⚡', bg: '#1e3a5f' },
  'Intelligence Artificielle — Les Bases': { emoji: '🤖', bg: '#1a1a2e' },
  'Social Media Management Pro': { emoji: '📱', bg: '#2d1b69' },
  'Facebook & Google Ads Expert': { emoji: '📊', bg: '#1e3a5f' },
  'React.js — Applications Complètes': { emoji: '⚛️', bg: '#1a3a4f' },
  'ChatGPT & Outils IA Avancés': { emoji: '💬', bg: '#1f2937' },
  'Python pour les Données & IA': { emoji: '🐍', bg: '#1a2e1a' },
  'Photoshop & Design Graphique': { emoji: '🎭', bg: '#2d1040' },
  'Blockchain & Web3 Introduction': { emoji: '⛓️', bg: '#0a0f2e' },
};
const DEFAULT_VISUAL = { emoji: '📚', bg: '#1e3a5f' };

const FILTRES = [
  { label: 'Tout', value: '' },
  { label: '⚡ Dev', value: 'Développement & Code' },
  { label: '🤖 IA', value: 'Technologies Avancées' },
  { label: '🎨 Créatif', value: 'Marketing & Créatif' },
  { label: '💼 Business', value: 'Business & Carrière' },
];

/**
 * Page "Catalogue" du dashboard etudiant.
 * Reproduit fidelement <div id="page-catalogue"> + renderCatalogue()
 * de dashboard_etudiant.html (classes course-card, course-thumb...),
 * connectee a GET /api/formations + GET /api/mes-formations +
 * POST /api/formations/{id}/inscrire.
 */
export default function Catalogue() {
  const [formations, setFormations] = useState([]);
  const [mesInscriptions, setMesInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtre, setFiltre] = useState('');
  const [inscrivant, setInscrivant] = useState(null);

  useEffect(() => {
    Promise.all([getFormations(), apiClient.get('/mes-formations')])
      .then(([allFormations, inscriptions]) => {
        setFormations(allFormations);
        setMesInscriptions(inscriptions);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const inscriptionsParFormation = new Map(
    mesInscriptions.map((i) => [i.formation.id, i])
  );

  const visibles = filtre ? formations.filter((f) => f.categorie?.nom === filtre) : formations;

  async function handleEnroll(formationId) {
    setInscrivant(formationId);
    try {
      const { inscription } = await inscrireFormation(formationId);
      setMesInscriptions((prev) => [
        ...prev,
        { ...inscription, formation: formations.find((f) => f.id === formationId) },
      ]);
    } catch (err) {
      alert(err.message);
    } finally {
      setInscrivant(null);
    }
  }

  if (loading) return <p style={{ padding: 24 }}>Chargement…</p>;
  if (error) return <p style={{ padding: 24, color: '#dc2626' }}>{error}</p>;

  return (
    <div className="page active" id="page-catalogue">
      <div className="section-title-row mb-24">
        <div>
          <div className="section-title">Catalogue des formations</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>
            {formations.length}+ formations digitales certifiantes
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FILTRES.map((f) => (
              <div
                key={f.value}
                className={'ftab' + (filtre === f.value ? ' active' : '')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: '1.5px solid ' + (filtre === f.value ? 'var(--blue-light)' : 'var(--gray-200)'),
                  background: filtre === f.value ? 'var(--blue-light)' : 'transparent',
                  color: filtre === f.value ? '#fff' : 'var(--gray-500)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => setFiltre(f.value)}
              >
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="catalogue-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {visibles.map((formation) => {
          const visual = VISUALS_BY_TITRE[formation.titre] || DEFAULT_VISUAL;
          const inscription = inscriptionsParFormation.get(formation.id);
          const enrolled = Boolean(inscription);
          const progress = inscription?.progression ?? 0;
          const note = formation.avis_avg_note ? Number(formation.avis_avg_note).toFixed(1) : '—';

          return (
            <div
              key={formation.id}
              className="course-card"
              onClick={() => !enrolled && handleEnroll(formation.id)}
            >
              <div className="course-thumb" style={{ background: visual.bg }}>
                {visual.emoji}
                {enrolled && <div className="course-thumb-badge">✓ Inscrit</div>}
              </div>
              <div className="course-card-body">
                <div className="course-card-cat">{formation.categorie?.nom}</div>
                <div className="course-card-title">{formation.titre}</div>
                <div className="course-card-meta">
                  Par {formation.instructeur} · ★ {note} · {formation.avis_count ?? 0} avis
                </div>

                {enrolled && (
                  <div className="course-card-progress">
                    <div className="progress-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Votre progression</span>
                      <span style={{ fontWeight: 700, color: 'var(--blue-light)' }}>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={'progress-fill' + (progress === 100 ? ' green' : '')}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="course-card-footer">
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      color: 'var(--navy)',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {formation.prix} MAD
                  </div>
                  <button
                    className="course-continue-btn"
                    style={{ background: enrolled ? 'var(--success)' : 'var(--blue-light)' }}
                    disabled={inscrivant === formation.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!enrolled) handleEnroll(formation.id);
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    {inscrivant === formation.id ? '…' : enrolled ? 'Reprendre' : "S'inscrire"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}