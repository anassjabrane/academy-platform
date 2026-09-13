import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormation } from '../../api/formations';
import { inscrireFormation } from '../../api/inscriptions';
import { getStoredUser } from '../../api/auth';

/**
 * Page de detail d'une formation. Correspond a showCourse(id) dans index.html,
 * connectee a GET /api/formations/{id} (avec categorie, lecons, avis).
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

  if (loading) return <p className="fgrid-status">Chargement…</p>;
  if (error) return <p className="fgrid-status fgrid-error">{error}</p>;
  if (!formation) return null;

  return (
    <section className="course-detail">
      <div className="course-detail-main">
        <div className="course-hero-card">
          <div className="course-badge-row">
            <span className="course-badge cb-level">{formation.niveau}</span>
          </div>
          <div className="course-detail-title">{formation.titre}</div>
          <div className="course-detail-sub">{formation.description}</div>
          <div className="course-detail-meta">
            <div className="course-detail-meta-item">{formation.categorie?.nom}</div>
            <div className="course-detail-meta-item">{formation.duree} de contenu</div>
            <div className="course-detail-meta-item">{formation.lecons?.length || 0} leçons</div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">L'instructeur</div>
          <div className="instructor-card">
            <div className="instructor-avatar">
              {formation.instructeur
                ?.split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="instructor-info">
              <div className="instructor-name">{formation.instructeur}</div>
              <div className="instructor-title">Expert {formation.categorie?.nom} · Academy.ma</div>
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
          <div className="enroll-card-body">
            <div className="enroll-price">{formation.prix} MAD</div>
            <button className="btn-enroll" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? 'Inscription…' : "S'inscrire à cette formation"}
            </button>
            {enrollMsg && <p className="enroll-msg">{enrollMsg}</p>}
            <div className="enroll-features">
              <div className="enroll-feat">{formation.duree} de contenu vidéo HD</div>
              <div className="enroll-feat">{formation.lecons?.length || 0} leçons + projets pratiques</div>
              <div className="enroll-feat">Accès à vie, sur tous les appareils</div>
              <div className="enroll-feat">Certificat de complétion inclus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}