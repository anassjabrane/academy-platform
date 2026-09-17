import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';
import { login } from '../../api/auth';

/**
 * Page de connexion. Reproduit exactement le markup/CSS de
 * <div id="page-connexion"> dans index.html (classes auth-page,
 * auth-left, auth-right, form-group, form-input, form-submit...),
 * connectee a POST /api/login.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const { user } = await login({ email, password });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
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
          <h2>Bon retour parmi nous 👋</h2>
          <p>
            Connectez-vous pour accéder à vos formations, reprendre votre progression et
            obtenir vos certificats.
          </p>
          <div className="auth-features">
            {[
              'Accès à toutes vos formations',
              'Suivi de progression en temps réel',
              'Téléchargement de vos certificats',
              'Support instructeur disponible',
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

          <div className="auth-form-title">Connexion</div>
          <div className="auth-form-sub">Entrez vos identifiants pour accéder à votre compte</div>

          {error && (
            <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="votre@email.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <a style={{ fontSize: 12.5, color: 'var(--blue-light)', fontWeight: 600, cursor: 'pointer' }}>
              Mot de passe oublié ?
            </a>
          </div>

          <button className="form-submit" onClick={handleLogin} disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>

          <div className="auth-divider">ou continuer avec</div>
          <button className="btn-social" disabled title="Bientôt disponible">
            <FcGoogle size={20} /> Google
          </button>
          <button className="btn-social" disabled title="Bientôt disponible">
            <FaLinkedinIn size={20} color="#0A66C2" /> LinkedIn
          </button>

          <div className="auth-footer-text">
            Pas encore de compte ? <a onClick={() => navigate('/inscription')}>S'inscrire gratuitement</a>
          </div>
        </div>
      </div>
    </div>
  );
}