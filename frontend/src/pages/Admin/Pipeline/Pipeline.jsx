import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';

const COLONNES = [
  { statut: 'nouveau', title: 'Nouveau lead', color: '#64748b' },
  { statut: 'contacte', title: 'Contacté', color: '#3a6af0' },
  { statut: 'interesse', title: 'Intéressé', color: '#f59e0b' },
  { statut: 'inscrit', title: 'Inscrit ✓', color: '#22c55e' },
  { statut: 'perdu', title: 'Perdu', color: '#ef4444' },
];

/**
 * Page "Pipeline CRM" du dashboard admin.
 * Reproduit .pipeline-col / .pipeline-card de dashbord_administration.html,
 * connectee a /api/leads. Le "drag and drop" original est remplace par
 * un simple bouton "→" pour avancer le lead a l'etape suivante (plus
 * fiable sans librairie externe).
 */
export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', source: '', notes: '' });
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    apiClient.get('/leads').then(setLeads).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.post('/leads', form);
      setForm({ nom: '', email: '', telephone: '', source: '', notes: '' });
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function avancerLead(lead) {
    const idx = COLONNES.findIndex((c) => c.statut === lead.statut);
    if (idx >= COLONNES.length - 2) return; // déjà Inscrit ou Perdu
    const nouveauStatut = COLONNES[idx + 1].statut;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, statut: nouveauStatut } : l)));
    await apiClient.put(`/leads/${lead.id}/statut`, { statut: nouveauStatut });
  }

  async function marquerPerdu(lead) {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, statut: 'perdu' } : l)));
    await apiClient.put(`/leads/${lead.id}/statut`, { statut: 'perdu' });
  }

  const total = leads.length;
  const convertis = leads.filter((l) => l.statut === 'inscrit').length;
  const taux = total > 0 ? ((convertis / total) * 100).toFixed(1) : 0;

  if (loading) return <p>Chargement…</p>;

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Pipeline CRM</h1>
          <p>Gestion des prospects et conversions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Annuler' : '+ Nouveau lead'}
        </button>
      </div>

      <div className="kpi-row" style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="kpi-pill" style={pillStyle}>
          <span style={{ ...dotStyle, background: '#3a6af0' }} />
          Total leads : {total}
        </div>
        <div className="kpi-pill" style={pillStyle}>
          <span style={{ ...dotStyle, background: '#22c55e' }} />
          Convertis : {convertis}
        </div>
        <div className="kpi-pill" style={pillStyle}>
          <span style={{ ...dotStyle, background: '#f59e0b' }} />
          Taux : {taux}%
        </div>
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
              <label className="profile-label">Téléphone</label>
              <input
                className="profile-input"
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              />
            </div>
          </div>
          <div className="grid-2" style={{ marginBottom: 14 }}>
            <div>
              <label className="profile-label">Email</label>
              <input
                className="profile-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="profile-label">Source</label>
              <input
                className="profile-input"
                placeholder="Facebook, Site web, Bouche-à-oreille…"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-primary" disabled={saving} type="submit">
            {saving ? 'Ajout…' : 'Ajouter le lead'}
          </button>
        </form>
      )}

      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 10 }}>
        {COLONNES.map((col) => {
          const cardsInCol = leads.filter((l) => l.statut === col.statut);
          return (
            <div key={col.statut} className="pipeline-col" style={{ minWidth: 230 }}>
              <div className="pipeline-col-header">
                <div className="pipeline-col-title" style={{ color: col.color }}>
                  {col.title}
                </div>
                <div className="pipeline-count">{cardsInCol.length}</div>
              </div>
              {cardsInCol.map((lead) => (
                <div key={lead.id} className="pipeline-card">
                  <div className="pipeline-card-name">{lead.nom}</div>
                  {lead.telephone && <div className="pipeline-card-sub">{lead.telephone}</div>}
                  <div className="pipeline-card-meta">
                    {lead.source && (
                      <span className="badge gray" style={{ fontSize: 10 }}>
                        {lead.source}
                      </span>
                    )}
                  </div>
                  {col.statut !== 'inscrit' && col.statut !== 'perdu' && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <button
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '4px 8px', fontSize: 11 }}
                        onClick={() => avancerLead(lead)}
                      >
                        Avancer →
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: 11, color: '#ef4444' }}
                        onClick={() => marquerPerdu(lead)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

const pillStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: '#fff',
  border: '1px solid var(--gray-200)',
  borderRadius: 99,
  padding: '6px 14px',
  fontSize: 12,
  fontWeight: 600,
};
const dotStyle = { width: 8, height: 8, borderRadius: '50%', display: 'inline-block' };