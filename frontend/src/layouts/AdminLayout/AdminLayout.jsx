import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../../api/auth';
import './admin.css';

const NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { to: '/admin', label: 'Tableau de bord', end: true },
      { to: '/admin/etudiants', label: 'Étudiants' },
      { to: '/admin/formations', label: 'Formations' },
      { to: '/admin/pipeline', label: 'Pipeline CRM' },
    ],
  },
  {
    label: 'Gestion',
    items: [
      { to: '/admin/finances', label: 'Finances & Facturation' },
      { to: '/admin/instructeurs', label: 'Instructeurs' },
      { to: '/admin/calendrier', label: 'Calendrier' },
      { to: '/admin/rapports', label: 'Rapports & Analyses' },
    ],
  },
  {
    label: 'Paramètres',
    items: [{ to: '/admin/parametres', label: 'Paramètres' }],
  },
];

/**
 * Layout partage par toutes les pages du dashboard admin.
 * Reproduit <nav class="sidebar"> + <div class="topbar"> de
 * index_dashboard_administration.html.
 */
export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();
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
          <div className="logo-box">A</div>
          <div>
            <div className="logo-text">
              The Academy<span>.ma</span>
            </div>
            <span className="logo-sub">CRM / ERP Suite</span>
          </div>
        </div>

        <div className="sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="nav-section-label">{section.label}</div>
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
          <div className="avatar">{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Administrateur'}</div>
            <div className="user-role">Super Administrateur</div>
          </div>
          <svg
            style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={handleLogout}
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
      </nav>

      <div className="main">
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
          <div className="search-bar">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Rechercher…" />
          </div>
          <div className="topbar-actions">
            <div className="avatar" style={{ cursor: 'pointer' }}>
              {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
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