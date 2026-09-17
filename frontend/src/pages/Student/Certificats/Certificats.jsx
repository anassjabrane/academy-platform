import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/client';

const VISUALS_BY_TITRE = {
  'JavaScript Moderne & ES6+': '⚡',
  'Intelligence Artificielle — Les Bases': '🤖',
  'Social Media Management Pro': '📱',
  'Facebook & Google Ads Expert': '📊',
  'React.js — Applications Complètes': '⚛️',
  'ChatGPT & Outils IA Avancés': '💬',
  'Python pour les Données & IA': '🐍',
  'Photoshop & Design Graphique': '🎭',
  'Blockchain & Web3 Introduction': '⛓️',
};

/**
 * Page "Mes certificats". Reproduit <div id="page-certificats"> de
 * dashboard_etudiant.html, connectee a GET /api/mes-formations
 * (les certificats sont inclus via la relation Inscription::certificat).
 *
 * Note : la generation automatique d'un Certificat a 100% de progression
 * n'est pas encore implementee cote backend (v2) — cette page affiche
 * seulement les certificats qui existent deja en base.
 */
export default function Certificats() {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get('/mes-formations')
      .then(setInscriptions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const avecCertificat = inscriptions.filter((i) => i.certificat);
  const enCours = inscriptions.filter((i) => i.statut !== 'terminee');

  function voirCertificat(inscription) {
    if (inscription.certificat?.url_fichier) {
      window.open(inscription.certificat.url_fichier, '_blank');
    } else {
      alert('Ce certificat est en cours de génération.');
    }
  }

  function copierLienLinkedIn(inscription) {
    const texte = `J'ai obtenu mon certificat "${inscription.formation.titre}" sur Academy.ma ! 🎓`;
    navigator.clipboard?.writeText(texte);
    alert('Texte copié, prêt à partager sur LinkedIn ! 🔗');
  }

  if (loading) return <p>Chargement…</p>;

  return (
    <>
      <div className="section-title-row mb-24">
        <div>
          <div className="section-title">Mes certificats</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>
            {avecCertificat.length} certificat(s) obtenu(s) · {enCours.length} en cours
          </div>
        </div>
      </div>

      {avecCertificat.length === 0 ? (
        <p style={{ color: 'var(--gray-500)', marginBottom: 28 }}>
          Aucun certificat obtenu pour le moment. Terminez une formation pour en débloquer un.
        </p>
      ) : (
        <div className="grid-2 mb-28">
          {avecCertificat.map((inscription) => (
            <div key={inscription.id} className="cert-card">
              <div className="cert-emoji">{VISUALS_BY_TITRE[inscription.formation.titre] || '📚'}</div>
              <div className="cert-title">{inscription.formation.titre}</div>
              <div className="cert-sub">Formation complétée · Tous les modules validés</div>
              <div className="cert-date">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Obtenu le {new Date(inscription.certificat.date_obtention).toLocaleDateString('fr-FR')}
              </div>
              <div className="cert-actions">
                <button className="cert-btn cert-btn-view" onClick={() => voirCertificat(inscription)}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Voir
                </button>
                <button className="cert-btn cert-btn-dl" onClick={() => voirCertificat(inscription)}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  PDF
                </button>
                <button className="cert-btn cert-btn-share" onClick={() => copierLienLinkedIn(inscription)}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="section-title mb-20"
        style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)' }}
      >
        Certifications en cours
      </div>

      {enCours.length === 0 ? (
        <p style={{ color: 'var(--gray-500)' }}>Aucune formation en cours.</p>
      ) : (
        <div className="grid-2">
          {enCours.map((inscription) => (
            <div key={inscription.id} className="card">
              <div
                className="card-body"
                style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <div style={{ fontSize: 32 }}>
                  {VISUALS_BY_TITRE[inscription.formation.titre] || '📚'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                    {inscription.formation.titre}
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${inscription.progression}%` }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--gray-500)', marginTop: 4 }}>
                    {inscription.progression}% complété
                  </div>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate(`/formations/${inscription.formation.id}`)}
                >
                  Continuer →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}