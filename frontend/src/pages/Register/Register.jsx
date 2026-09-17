import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { register } from '../../api/auth';

const DOMAINES = [
  'Développement & Code',
  'Marketing & Créatif',
  'Technologies Avancées',
  'Business & Carrière',
];

/**
 * Page inscription. Reproduit exactement le markup/CSS de
 * <div id="page-inscription"> dans index.html, connectee a POST /api/register.
 */
export default function Register() {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    domaineInteret: DOMAINES[0],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleRegister() {
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="nav-logo" style={{ marginBottom: 32, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div className="nav-logo-box">A</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>
              academy<span style={{ color: '#93c5fd' }}>.ma</span>
            </div>
          </div>
          <h2>Commencez votre parcours digital aujourd'hui 🚀</h2>
          <p>Rejoignez +2 000 professionnels formés et certifiés avec academy.ma. Inscription 100% gratuite.</p>
          <div className="auth-features">
            {[
              "Accès gratuit à des formations d'introduction",
              'Certificats professionnels reconnus',
              'Apprenez à votre rythme, 100% en ligne',
              'Support WhatsApp 7j/7',
            ].map((txt) => (
              <div className="auth-feat" key={txt}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-logo" onClick={() => navigate('/')}>
            <div className="nav-logo-box">A</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)' }}>
              academy<span style={{ color: 'var(--blue-light)' }}>.ma</span>
            </div>
          </div>

          <div className="auth-form-title">Créer un compte gratuit</div>
          <div className="auth-form-sub">C'est rapide, gratuit et sans engagement</div>

          {error && (
            <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input className="form-input" placeholder="Youssef" value={form.prenom} onChange={update('prenom')} />
            </div>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input className="form-input" placeholder="Alami" value={form.nom} onChange={update('nom')} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="votre@email.ma"
              value={form.email}
              onChange={update('email')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              className="form-input"
              placeholder="+212 6XX XXX XXX"
              value={form.telephone}
              onChange={update('telephone')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              className="form-input"
              type="password"
              placeholder="Minimum 8 caractères"
              value={form.password}
              onChange={update('password')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Domaine d'intérêt</label>
            <select className="form-input" value={form.domaineInteret} onChange={update('domaineInteret')}>
              {DOMAINES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button className="form-submit" onClick={handleRegister} disabled={loading}>
            {loading ? 'Création…' : 'Créer mon compte gratuit →'}
          </button>

          <div className="auth-divider">ou s'inscrire avec</div>
          <button className="btn-social" disabled title="Bientôt disponible">
            <FcGoogle size={20} /> Continuer avec Google
          </button>

          <div className="auth-footer-text">
            Déjà un compte ? <a onClick={() => navigate('/connexion')}>Se connecter</a>
          </div>
        </div>
      </div>
    </div>
  );
}