import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser } from '../../../api/auth';
import { apiClient } from '../../../api/client';

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

/**
 * Page "Tableau de bord" etudiant. Reproduit .dash-hero + .stat-card
 * + "Formations en cours" de dashboard_etudiant.html, avec de vraies
 * donnees issues de GET /api/mes-formations.
 */
export default function Dashboard() {
  const user = getStoredUser();
  const navigate = useNavigate();
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/mes-formations')
      .then(setInscriptions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const enCours = inscriptions.filter((i) => i.statut !== 'terminee');
  const terminees = inscriptions.filter((i) => i.statut === 'terminee');
  const certificatsObtenus = inscriptions.filter((i) => i.certificat).length;
  const prochaine = enCours[0];

  return (
    <>
      <div className="dash-hero">
        <div className="dash-hero-content">
          <div className="dash-hero-title">Bonjour, {user?.name?.split(' ')[0] || 'Étudiant'} 👋</div>
          <div className="dash-hero-sub">
            {prochaine
              ? <>Vous avez complété <strong>{prochaine.progression}%</strong> de votre formation {prochaine.formation.titre}. Continuez comme ça — vous êtes sur la bonne voie !</>
              : 'Explorez le catalogue et lancez votre première formation dès aujourd\'hui.'}
          </div>
          <button
            className="dash-hero-cta"
            onClick={() => navigate(prochaine ? '/dashboard/mes-formations' : '/dashboard/catalogue')}
          >
            {prochaine ? '▷ Reprendre la formation' : 'Explorer le catalogue'}
          </button>
        </div>
        <div className="dash-hero-emoji">🎯</div>
      </div>

      <div className="grid-4 mb-24">
        <div className="stat-card">
          <div className="stat-icon blue">📚</div>
          <div>
            <div className="stat-val">{inscriptions.length}</div>
            <div className="stat-lbl">Formations inscrites</div>
            <div className="stat-sub neutral">
              {enCours.length} en cours · {terminees.length} terminées
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🎓</div>
          <div>
            <div className="stat-val">{certificatsObtenus}</div>
            <div className="stat-lbl">Certificats obtenus</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">⏱️</div>
          <div>
            <div className="stat-val">
              {inscriptions.reduce((sum, i) => sum + (parseInt(i.formation?.duree) || 0) * (i.progression / 100), 0).toFixed(0)}h
            </div>
            <div className="stat-lbl">Heures d'apprentissage</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div>
            <div className="stat-val">{user?.name ? 0 : 0} XP</div>
            <div className="stat-lbl">Points XP gagnés</div>
          </div>
        </div>
      </div>

      <div className="section-title-row">
        <div className="section-title">Formations en cours</div>
        <div className="section-link" onClick={() => navigate('/dashboard/mes-formations')}>
          Voir tout →
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : enCours.length === 0 ? (
        <p style={{ color: 'var(--gray-500)' }}>
          Aucune formation en cours.{' '}
          <span
            style={{ color: 'var(--blue-light)', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/dashboard/catalogue')}
          >
            Découvrir le catalogue
          </span>
        </p>
      ) : (
        <div className="grid-3">
          {enCours.map((inscription) => {
            const visual = VISUALS_BY_TITRE[inscription.formation.titre] || DEFAULT_VISUAL;
            return (
              <div
                key={inscription.id}
                className="course-card"
                onClick={() => navigate(`/formations/${inscription.formation.id}`)}
              >
                <div className="course-thumb" style={{ background: visual.bg }}>
                  {visual.emoji}
                </div>
                <div className="course-card-body">
                  <div className="course-card-cat">{inscription.formation.categorie?.nom}</div>
                  <div className="course-card-title">{inscription.formation.titre}</div>
                  <div className="course-card-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${inscription.progression}%` }} />
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <span style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600 }}>
                      {inscription.progression}%
                    </span>
                    <button className="course-continue-btn">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Reprendre
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}