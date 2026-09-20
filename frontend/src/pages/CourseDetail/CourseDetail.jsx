import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormation } from '../../api/formations';
import { inscrireFormation } from '../../api/inscriptions';
import { getStoredUser } from '../../api/auth';

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
 * Page de detail d'une formation. Reproduit fidelement
 * <div id="page-course-detail"> de index.html : badges, learn-grid,
 * instructor-card avec stats reelles, syllabus, enroll-card.
 * Connectee a GET /api/formations/{id}.
 */
export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    getFormation(id)
      .then(setFormation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleEnroll() {
    const user = getStoredUser();
    if (!user) {
      navigate('/connexion');
      return;
    }
    setEnrolling(true);
    setEnrollMsg('');
    try {
      await inscrireFormation(id);
      setEnrollMsg(`Inscription à "${formation.titre}" réussie ! 🎓`);
    } catch (err) {
      setEnrollMsg(err.message);
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) return <p style={{ padding: 40 }}>Chargement…</p>;
  if (error) return <p style={{ padding: 40, color: '#dc2626' }}>{error}</p>;
  if (!formation) return null;

  const visual = VISUALS_BY_TITRE[formation.titre] || DEFAULT_VISUAL;
  const note = formation.avis_avg_note ? Number(formation.avis_avg_note) : 0;
  const isBestseller = note >= 4.9;
  const instructeur = formation.instructeur_relation || formation.instructeurRelation;
  const initiales = formation.instructeur
    ?.split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div>
      <div className="page-hero" style={{ padding: '32px 24px' }}>
        <div className="page-hero-inner">
          <div className="back-btn" onClick={() => navigate('/formations')}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Retour aux formations
          </div>
        </div>
      </div>

      <div className="course-detail-layout">
        <div className="course-detail-main">
          <div className="course-hero-card">
            <div className="course-badge-row">
              {isBestseller && <span className="course-badge cb-bestseller">★ Bestseller</span>}
              <span className="course-badge cb-level">{formation.niveau}</span>
              <span className="course-badge cb-cert">✓ Certifiant</span>
            </div>
            <div className="course-detail-title">{formation.titre}</div>
            <div className="course-detail-sub">{formation.description}</div>
            <div className="course-detail-meta">
              <div className="course-detail-meta-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {note ? note.toFixed(1) : '—'} ({formation.avis_count ?? 0} avis)
              </div>
              <div className="course-detail-meta-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {(formation.inscriptions_count ?? 0).toLocaleString()} étudiants
              </div>
              <div className="course-detail-meta-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {formation.duree} de contenu
              </div>
              <div className="course-detail-meta-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
                {formation.lecons?.length || 0} leçons
              </div>
            </div>
          </div>

          {formation.objectifs?.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">Ce que vous allez apprendre</div>
              <div className="learn-grid">
                {formation.objectifs.map((obj, i) => (
                  <div className="learn-item" key={i}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <div className="detail-section-title">L'instructeur</div>
            <div className="instructor-card">
              <div className="instructor-avatar" style={{ background: '#22c55e' }}>
                {initiales}
              </div>
              <div className="instructor-info">
                <div className="instructor-name">{formation.instructeur}</div>
                <div className="instructor-title">
                  Expert {formation.categorie?.nom} · Academy.ma
                </div>
                <div className="instructor-stats">
                  <div className="instr-stat">
                    <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {note ? note.toFixed(1) : '—'} note moyenne
                  </div>
                  <div className="instr-stat">
                    <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    {(formation.inscriptions_count ?? 0).toLocaleString()} étudiants
                  </div>
                  {instructeur && (
                    <div className="instr-stat">
                      <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      </svg>
                      {instructeur.formations_count} formation(s)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">
              Programme du cours ({formation.lecons?.length || 0} leçons · {formation.duree})
            </div>
            <div className="syllabus-list">
              {formation.lecons?.map((lecon) => (
                <div key={lecon.id} className="syllabus-item">
                  <div className="syllabus-num">{lecon.ordre}</div>
                  <div className="syllabus-title">{lecon.titre}</div>
                  <div className="syllabus-dur">{lecon.duree} min</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="course-detail-sidebar">
          <div className="enroll-card">
            <div className="enroll-card-thumb" style={{ background: visual.bg }}>
              {visual.emoji}
            </div>
            <div className="enroll-card-body">
              <div className="enroll-price">{formation.prix} MAD</div>
              {formation.prix_original && (
                <div className="enroll-old-price">{formation.prix_original} MAD</div>
              )}
              <button className="btn-enroll" onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? 'Inscription…' : "S'inscrire à cette formation"}
              </button>
              <button className="btn-wishlist">♡ Ajouter à la liste de souhaits</button>
              {enrollMsg && <p className="enroll-msg">{enrollMsg}</p>}
              <div className="enroll-features">
                <div className="enroll-feat">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formation.duree} de contenu vidéo HD
                </div>
                <div className="enroll-feat">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  </svg>
                  {formation.lecons?.length || 0} leçons + projets pratiques
                </div>
                <div className="enroll-feat">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Accès à vie, sur tous les appareils
                </div>
                <div className="enroll-feat">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Certificat de complétion inclus
                </div>
                <div className="enroll-feat">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
                  </svg>
                  Support WhatsApp instructeur
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}