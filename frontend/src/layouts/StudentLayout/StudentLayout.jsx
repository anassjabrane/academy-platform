import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../../api/auth';
import './student.css';

const NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { to: '/dashboard', label: 'Tableau de bord', end: true },
      { to: '/dashboard/mes-formations', label: 'Mes formations' },
      { to: '/dashboard/catalogue', label: 'Catalogue' },
      { to: '/dashboard/progression', label: 'Ma progression' },
    ],
  },
  {
    label: 'Apprentissage',
    items: [
      { to: '/dashboard/certificats', label: 'Mes certificats' },
      { to: '/dashboard/agenda', label: 'Mon agenda' },
      { to: '/dashboard/achievements', label: 'Succès & XP' },
      { to: '/dashboard/notes', label: 'Mes notes' },
    ],
  },
  {
    label: 'Compte',
    items: [
      { to: '/dashboard/profil', label: 'Mon profil' },
      { to: '/dashboard/parametres', label: 'Paramètres' },
    ],
  },
];

/**
 * Layout partage par toutes les pages du dashboard etudiant.
 * Reproduit <nav class="sidebar"> + <div class="topbar"> de
 * dashboard_etudiant.html.
 */
export default function StudentLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = user?.name?.slice(0, 2).toUpperCase() || 'ET';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/connexion');
  }

  function handleNavClick() {
    setSidebarOpen(false);
  }

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <nav className={'sidebar' + (sidebarOpen ? ' sidebar-open' : '')}>
        <div className="sidebar-logo">
          <div className="sb-logo-box">A</div>
          <div>
            <div className="sb-logo-text">
              academy<span>.ma</span>
            </div>
            <span className="sb-logo-tag">Espace Étudiant</span>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sb-avatar">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sb-user-name">{user?.name || 'Étudiant'}</div>
            <div className="sb-user-level">⭐ Niveau 1 · 0 XP</div>
            <div className="sb-xp-bar">
              <div className="sb-xp-fill" />
            </div>
          </div>
        </div>

        <div className="sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="nav-section">{section.label}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={handleNavClick}
                  className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sb-logout" onClick={handleLogout}>
            Se déconnecter
          </div>
        </div>
      </nav>

      <div className="main-area">
        <div className="topbar">
          <button className="sidebar-burger" onClick={() => setSidebarOpen(true)}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="topbar-title">
            Tableau de <span>bord</span>
          </div>
          <div className="topbar-search">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Rechercher une formation…" />
          </div>
          <div className="topbar-actions">
            <div className="tb-avatar" onClick={() => navigate('/dashboard/profil')}>
              {initials}
            </div>
          </div>
        </div>

        <div className="page active">
          <Outlet />
        </div>
      </div>
    </>
  );
}