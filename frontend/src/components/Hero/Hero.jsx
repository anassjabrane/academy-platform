import { useNavigate } from 'react-router-dom';

/**
 * Section hero de la page d'accueil.
 * Correspond a <section class="hero"> de index.html.
 */
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-circles">
        <div className="hero-circle hero-c1" />
        <div className="hero-circle hero-c2" />
        <div className="hero-circle hero-c3" />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">Plateforme N°1 de formation digitale au Maroc</div>
          <h1>
            Commencer, changer
            <br />
            ou faire évoluer
            <br />
            sa carrière
          </h1>
          <p>
            Développez vos compétences avec +45 formations digitales professionnelles,
            certifiantes et accessibles à tous.
          </p>
          <div className="hero-btns">
            <button className="btn-hero-primary" onClick={() => navigate('/inscription')}>
              S'inscrire gratuitement →
            </button>
            <button className="btn-hero-secondary" onClick={() => navigate('/formations')}>
              Explorer les formations
            </button>
          </div>
        </div>
        <div className="hero-emoji-wrap">👩‍💻</div>
      </div>
    </section>
  );
}