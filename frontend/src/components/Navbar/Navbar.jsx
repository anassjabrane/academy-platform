import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Barre de navigation principale, responsive.
 * Sur mobile : logo + hamburger seulement, menu deroulant en dessous.
 */
export default function Navbar() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function go(path) {
    setMenuOpen(false);
    navigate(path);
  }

  function handleSearchSubmit(e) {
    if (e.key === 'Enter' && search.trim()) {
      go(`/formations?q=${encodeURIComponent(search)}`);
      setSearch('');
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => go('/')}>
          <div className="nav-logo-box">A</div>
          <div className="nav-logo-text">
            academy<span>.ma</span>
          </div>
        </div>

        <div className="nav-links nav-links-desktop">
          <div className="nav-link" onClick={() => go('/formations')}>
            Formations
          </div>
          <div className="nav-link" onClick={() => go('/formations?cat=Technologies Avancées')}>
            Tech & IA
          </div>
          <div className="nav-link" onClick={() => go('/formations?cat=Business & Carrière')}>
            Business
          </div>
        </div>

        <div className="nav-search nav-search-desktop">
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

        <div className="nav-actions nav-actions-desktop">
          <button className="btn-outline" onClick={() => go('/connexion')}>
            Connexion
          </button>
          <button className="btn-primary" onClick={() => go('/inscription')}>
            Inscrivez-vous
          </button>
        </div>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
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
          <div className="nav-link" onClick={() => go('/formations')}>
            Formations
          </div>
          <div className="nav-link" onClick={() => go('/formations?cat=Technologies Avancées')}>
            Tech & IA
          </div>
          <div className="nav-link" onClick={() => go('/formations?cat=Business & Carrière')}>
            Business
          </div>
          <button className="btn-outline" onClick={() => go('/connexion')}>
            Connexion
          </button>
          <button className="btn-primary" onClick={() => go('/inscription')}>
            Inscrivez-vous
          </button>
        </div>
      )}
    </nav>
  );
}