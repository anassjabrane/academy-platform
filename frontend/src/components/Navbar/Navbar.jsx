import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Barre de navigation principale.
 * Correspond a la <nav class="navbar"> de index.html.
 */
export default function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/formations?q=${encodeURIComponent(search)}`);
      setSearch('');
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="nav-logo-box">A</div>
          <div className="nav-logo-text">
            academy<span>.ma</span>
          </div>
        </div>

        <div className="nav-links">
          <div className="nav-link" onClick={() => navigate('/formations')}>
            Formations
          </div>
          <div className="nav-link" onClick={() => navigate('/formations?cat=Technologies Avancées')}>
            Tech & IA
          </div>
          <div className="nav-link" onClick={() => navigate('/formations?cat=Business & Carrière')}>
            Business
          </div>
        </div>

        <div className="nav-search">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Que souhaitez-vous apprendre ?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>

        <div className="nav-actions">
          <button className="btn-outline" onClick={() => navigate('/connexion')}>
            Connexion
          </button>
          <button className="btn-primary" onClick={() => navigate('/inscription')}>
            Inscrivez-vous
          </button>
        </div>
      </div>
    </nav>
  );
}