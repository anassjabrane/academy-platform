import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';

/**
 * Page "Instructeurs" du dashboard admin.
 * CRUD connecte a /api/instructeurs.
 */
export default function Instructeurs() {
  const [instructeurs, setInstructeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', specialite: '', bio: '' });
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    apiClient.get('/instructeurs').then(setInstructeurs).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.post('/instructeurs', form);
      setForm({ nom: '', email: '', specialite: '', bio: '' });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cet instructeur ?')) return;
    await apiClient.delete(`/instructeurs/${id}`);
    load();
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Instructeurs</h1>
          <p>{instructeurs.length} instructeur(s) sur la plateforme</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Annuler' : '+ Nouvel instructeur'}
        </button>
      </div>

      {showForm && (
        <form className="card" onSubmit={handleCreate} style={{ padding: 20, marginBottom: 20 }}>
          <div className="grid-2" style={{ marginBottom: 14 }}>
            <div>
              <label className="profile-label">Nom</label>
              <input
                className="profile-input"
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>
            <div>
              <label className="profile-label">Email</label>
              <input
                className="profile-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="profile-label">Spécialité</label>
            <input
              className="profile-input"
              value={form.specialite}
              onChange={(e) => setForm({ ...form, specialite: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="profile-label">Bio</label>
            <textarea
              className="profile-input"
              style={{ minHeight: 70 }}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" disabled={saving} type="submit">
            {saving ? 'Création…' : 'Créer'}
          </button>
        </form>
      )}

      <div className="card">
        <div className="table-wrap">
          {loading ? (
            <p style={{ padding: 20 }}>Chargement…</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Spécialité</th>
                  <th>Email</th>
                  <th>Formations</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {instructeurs.map((i) => (
                  <tr key={i.id}>
                    <td>{i.nom}</td>
                    <td>{i.specialite || '—'}</td>
                    <td>{i.email || '—'}</td>
                    <td>
                      <span className="badge blue">{i.formations_count}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => handleDelete(i.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}