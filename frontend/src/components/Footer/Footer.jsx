import { useNavigate } from 'react-router-dom';

/**
 * Footer du site. Reproduit <footer> de index.html.
 */
export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-box" style={{ width: 32, height: 32, fontSize: 15 }}>
                A
              </div>
              <div className="footer-logo-text">
                academy<span>.ma</span>
              </div>
            </div>
            <p className="footer-desc">
              École de formation professionnelle spécialisée dans le digital. Basée à
              Casablanca, Maroc.
            </p>
            <div className="footer-socials">
              <div className="social-btn" title="Twitter">𝕏</div>
              <div className="social-btn" title="LinkedIn">in</div>
              <div className="social-btn" title="Instagram">📷</div>
              <div className="social-btn" title="WhatsApp">💬</div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Formations</div>
            <div className="footer-links">
              <div className="footer-link" onClick={() => navigate('/formations?cat=Marketing & Créatif')}>
                Marketing Digital
              </div>
              <div className="footer-link" onClick={() => navigate('/formations?cat=Développement & Code')}>
                Développement Web
              </div>
              <div className="footer-link" onClick={() => navigate('/formations?cat=Technologies Avancées')}>
                Intelligence Artificielle
              </div>
              <div className="footer-link" onClick={() => navigate('/formations')}>
                Bureautique
              </div>
              <div className="footer-link" onClick={() => navigate('/formations?cat=Business & Carrière')}>
                Business & Carrière
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Académie</div>
            <div className="footer-links">
              <div className="footer-link">À propos</div>
              <div className="footer-link">Nos formateurs</div>
              <div className="footer-link">Blog & Ressources</div>
              <div className="footer-link" onClick={() => navigate('/formations')}>
                Certifications
              </div>
              <div className="footer-link">Partenariats</div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact">
              <div className="footer-contact-item"><span>📍</span><span>Casablanca, Maroc</span></div>
              <div className="footer-contact-item"><span>✉️</span><span>hello@academy.ma</span></div>
              <div className="footer-contact-item"><span>📞</span><span>+212 6 00 00 00 00</span></div>
              <div className="footer-contact-item"><span>💬</span><span>WhatsApp Support</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="footer-bottom container">
          <div className="footer-copyright">© 2026 The Academy MA · Tous droits réservés</div>
          <div className="footer-legal">
            <a>Confidentialité</a>
            <a>Conditions</a>
            <a>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}