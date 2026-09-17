import { useState } from 'react';
import { apiClient } from '../../../api/client';
import { getStoredUser } from '../../../api/auth';

/**
 * Page "Mon profil". Reproduit <div id="page-profil"> de
 * dashboard_etudiant.html, connectee a PUT /api/me et
 * PUT /api/me/password.
 */
export default function Profil() {
  const storedUser = getStoredUser();
  const [nom, setNom] = useState(storedUser?.name || '');
  const [email, setEmail] = useState(storedUser?.email || '');
  const [telephone, setTelephone] = useState(storedUser?.telephone || '');
  const [ville, setVille] = useState(storedUser?.ville || '');
  const [bio, setBio] = useState(storedUser?.bio || '');
  const [linkedin, setLinkedin] = useState(storedUser?.linkedin_url || '');
  const [github, setGithub] = useState(storedUser?.github_url || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const initials = nom.slice(0, 2).toUpperCase() || 'ET';

  async function saveInfos() {
    setSaving(true);
    setMsg('');
    try {
      const { user } = await apiClient.put('/me', { name: nom, email, telephone, ville, bio });
      localStorage.setItem('user', JSON.stringify(user));
      setMsg('Profil sauvegardé ✓');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveSocial() {
    setSaving(true);
    setMsg('');
    try {
      const { user } = await apiClient.put('/me', { linkedin_url: linkedin, github_url: github });
      localStorage.setItem('user', JSON.stringify(user));
      setMsg('Liens sauvegardés ✓');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      setMsg('Les mots de passe ne correspondent pas.');
      return;
    }
    setSaving(true);
    setMsg('');
    try {
      await apiClient.put('/me/password', {
        current_password: currentPassword,
        password: newPassword,
      });
      setMsg('Mot de passe modifié ✓');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="profile-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-lg">{initials}</div>
          </div>
          <div className="profile-name-big">{nom}</div>
          <div className="profile-email">{email}</div>
          <div className="profile-badges-row">
            <div className="profile-badge">⭐ Niveau 1</div>
            {ville && <div className="profile-badge">📍 {ville}</div>}
          </div>
        </div>
      </div>

      {msg && <p style={{ margin: '0 0 16px', fontWeight: 600 }}>{msg}</p>}

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Informations personnelles</div>
            <button className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }} disabled={saving} onClick={saveInfos}>
              Enregistrer
            </button>
          </div>
          <div className="card-body">
            <div style={{ marginBottom: 14 }}>
              <label className="profile-label">Nom complet</label>
              <input className="profile-input" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="profile-label">Email</label>
              <input className="profile-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="profile-label">Téléphone</label>
              <input className="profile-input" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="profile-label">Ville</label>
              <input className="profile-input" value={ville} onChange={(e) => setVille(e.target.value)} />
            </div>
            <div>
              <label className="profile-label">Bio</label>
              <textarea
                className="profile-input"
                style={{ minHeight: 80, resize: 'vertical' }}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Sécurité</div>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: 14 }}>
                <label className="profile-label">Mot de passe actuel</label>
                <input
                  className="profile-input"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="profile-label">Nouveau mot de passe</label>
                <input
                  className="profile-input"
                  type="password"
                  placeholder="Min. 8 caractères"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="profile-label">Confirmer</label>
                <input
                  className="profile-input"
                  type="password"
                  placeholder="Répéter le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" disabled={saving} onClick={changePassword}>
                Changer le mot de passe
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Réseaux sociaux</div>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: 12 }}>
                <label className="profile-label">LinkedIn</label>
                <input
                  className="profile-input"
                  placeholder="linkedin.com/in/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="profile-label">GitHub</label>
                <input
                  className="profile-input"
                  placeholder="github.com/..."
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <button className="btn btn-secondary" disabled={saving} onClick={saveSocial}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}