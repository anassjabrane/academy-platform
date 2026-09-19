import { useNavigate } from 'react-router-dom';

/**
 * Bannière CTA. Reproduit .cta-banner de index.html.
 */
export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <div className="cta-banner">
      <div className="cta-inner">
        <h2 className="cta-title">Commencez votre parcours digital aujourd'hui</h2>
        <p className="cta-sub">Rejoignez +2 000 professionnels formés avec The Academy MA</p>
        <div className="cta-btns">
          <button className="btn-cta-white" onClick={() => navigate('/inscription')}>
            Créer mon compte gratuit
          </button>
          <button className="btn-cta-outline" onClick={() => navigate('/formations')}>
            Explorer les formations
          </button>
        </div>
      </div>
    </div>
  );
}