import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../../api/auth';
import './student.css';

/* Icones SVG exactement identiques a dashboard_etudiant.html */
const Icons = {
  dashboard: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  mesFormations: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  catalogue: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  progression: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  certificats: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  agenda: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  achievements: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  notes: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  profil: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  parametres: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

const NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { to: '/dashboard', label: 'Tableau de bord', end: true, icon: Icons.dashboard },
      { to: '/dashboard/mes-formations', label: 'Mes formations', icon: Icons.mesFormations },
      { to: '/dashboard/catalogue', label: 'Catalogue', icon: Icons.catalogue },
      { to: '/dashboard/progression', label: 'Ma progression', icon: Icons.progression },
    ],
  },
  {
    label: 'Apprentissage',
    items: [
      { to: '/dashboard/certificats', label: 'Mes certificats', icon: Icons.certificats },
      { to: '/dashboard/agenda', label: 'Mon agenda', icon: Icons.agenda },
      { to: '/dashboard/achievements', label: 'Succès & XP', icon: Icons.achievements },
      { to: '/dashboard/notes', label: 'Mes notes', icon: Icons.notes },
    ],
  },
  {
    label: 'Compte',
    items: [
      { to: '/dashboard/profil', label: 'Mon profil', icon: Icons.profil },
      { to: '/dashboard/parametres', label: 'Paramètres', icon: Icons.parametres },
    ],
  },
];

/**
 * Layout partage par toutes les pages du dashboard etudiant.
 * Reproduit <nav class="sidebar"> + <div class="topbar"> de
 * dashboard_etudiant.html, icones SVG incluses.
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
                  {item.icon}
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