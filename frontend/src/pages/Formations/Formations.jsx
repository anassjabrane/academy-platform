import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFormations } from '../../api/formations';
import FormationCard from '../../components/FormationCard/FormationCard';

const TABS = [
  { label: 'Toutes', value: '', emoji: '' },
  { label: 'Marketing', value: 'Marketing & Créatif', emoji: '🎨' },
  { label: 'Dev & Code', value: 'Développement & Code', emoji: '⚡' },
  { label: 'Tech & IA', value: 'Technologies Avancées', emoji: '🤖' },
  { label: 'Business', value: 'Business & Carrière', emoji: '💼' },
];
const NIVEAUX = ['Débutant', 'Intermédiaire', 'Avancé'];
const PRIX_RANGES = [
  { label: 'Gratuit', test: (p) => p === 0 },
  { label: '500–1000 MAD', test: (p) => p >= 500 && p < 1000 },
  { label: '1000–1500 MAD', test: (p) => p >= 1000 && p < 1500 },
  { label: '1500+ MAD', test: (p) => p >= 1500 },
];
const NOTES_MIN = [4.5, 4.0, 3.5];

/**
 * Page catalogue complet. Reproduit fidelement <div id="page-formations">
 * de index.html : page-hero, sidebar de filtres, tabs, tri, grille fcard.
 * Connectee a GET /api/formations (donnees reelles).
 */
export default function Formations() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const catParam = searchParams.get('cat') || '';
  const navigate = useNavigate();

  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tab, setTab] = useState(catParam || '');
  const [catsFiltre, setCatsFiltre] = useState(new Set());
  const [niveauxFiltre, setNiveauxFiltre] = useState(new Set(NIVEAUX));
  const [prixFiltre, setPrixFiltre] = useState(new Set());
  const [noteMin, setNoteMin] = useState(0);
  const [tri, setTri] = useState('populaires');

  useEffect(() => {
    getFormations()
      .then((data) => {
        setFormations(data);
        const toutesCats = [...new Set(data.map((f) => f.categorie?.nom).filter(Boolean))];
        setCatsFiltre(new Set(toutesCats));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categoriesAvecCount = useMemo(() => {
    const counts = {};
    formations.forEach((f) => {
      const nom = f.categorie?.nom;
      if (nom) counts[nom] = (counts[nom] || 0) + 1;
    });
    return counts;
  }, [formations]);

  function toggleSet(setFn, value) {
    setFn((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  let visibles = formations.filter((f) => {
    const matchesQuery =
      !query ||
      f.titre.toLowerCase().includes(query.toLowerCase()) ||
      f.instructeur.toLowerCase().includes(query.toLowerCase()) ||
      (f.categorie?.nom || '').toLowerCase().includes(query.toLowerCase());
    const matchesTab = !tab || f.categorie?.nom === tab;
    const matchesCat = catsFiltre.has(f.categorie?.nom);
    const matchesNiveau = niveauxFiltre.has(f.niveau);
    const matchesPrix =
      prixFiltre.size === 0 || [...prixFiltre].some((label) =>
        PRIX_RANGES.find((r) => r.label === label)?.test(Number(f.prix))
      );
    const matchesNote = !noteMin || Number(f.avis_avg_note || 0) >= noteMin;

    return matchesQuery && matchesTab && matchesCat && matchesNiveau && matchesPrix && matchesNote;
  });

  visibles = [...visibles].sort((a, b) => {
    if (tri === 'notes') return (b.avis_avg_note || 0) - (a.avis_avg_note || 0);
    if (tri === 'prix') return Number(a.prix) - Number(b.prix);
    if (tri === 'recentes') return b.id - a.id;
    return (b.inscriptions_count || 0) - (a.inscriptions_count || 0); // populaires
  });

  const titre = query ? 'Résultats de recherche' : tab || 'Toutes les formations';
  const sousTitre = query
    ? `${visibles.length} résultat(s) pour "${query}"`
    : tab
    ? `Les meilleures formations en ${tab}`
    : `${formations.length} formations digitales certifiantes`;

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="back-btn" onClick={() => navigate('/')}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Accueil
          </div>
          <h1>{titre}</h1>
          <p>{sousTitre}</p>
        </div>
      </div>

      <div className="formations-layout">
        <aside className="filter-sidebar">
          <div className="filter-card">
            <div className="filter-title">Catégorie</div>
            {Object.entries(categoriesAvecCount).map(([nom, count]) => (
              <label className="filter-option" key={nom}>
                <input
                  type="checkbox"
                  checked={catsFiltre.has(nom)}
                  onChange={() => toggleSet(setCatsFiltre, nom)}
                />
                {nom} <span className="filter-count">{count}</span>
              </label>
            ))}
          </div>

          <div className="filter-card">
            <div className="filter-title">Niveau</div>
            {NIVEAUX.map((niv) => (
              <label className="filter-option" key={niv}>
                <input
                  type="checkbox"
                  checked={niveauxFiltre.has(niv)}
                  onChange={() => toggleSet(setNiveauxFiltre, niv)}
                />
                {niv}
              </label>
            ))}
          </div>

          <div className="filter-card">
            <div className="filter-title">Prix</div>
            {PRIX_RANGES.map((r) => (
              <label className="filter-option" key={r.label}>
                <input
                  type="checkbox"
                  checked={prixFiltre.has(r.label)}
                  onChange={() => toggleSet(setPrixFiltre, r.label)}
                />
                {r.label}
              </label>
            ))}
          </div>

          <div className="filter-card">
            <div className="filter-title">Note minimale</div>
            {NOTES_MIN.map((n) => (
              <label className="filter-option" key={n}>
                <input
                  type="checkbox"
                  checked={noteMin === n}
                  onChange={() => setNoteMin(noteMin === n ? 0 : n)}
                />
                ★ {n}+
              </label>
            ))}
          </div>
        </aside>

        <div className="formations-main">
          <div className="formations-tabs">
            {TABS.map((t) => (
              <div
                key={t.value}
                className={'ftab' + (tab === t.value ? ' active' : '')}
                onClick={() => setTab(t.value)}
              >
                {t.emoji ? `${t.emoji} ${t.label}` : `${t.label} (${formations.length})`}
              </div>
            ))}
          </div>

          <div className="formations-topbar">
            <div className="formations-count">
              Affichage de <strong>{visibles.length}</strong> formations
            </div>
            <div className="formations-sort">
              <label style={{ fontSize: 13, color: 'var(--gray-500)' }}>Trier par :</label>
              <select className="sort-select" value={tri} onChange={(e) => setTri(e.target.value)}>
                <option value="populaires">Les plus populaires</option>
                <option value="notes">Mieux notées</option>
                <option value="prix">Prix croissant</option>
                <option value="recentes">Plus récentes</option>
              </select>
            </div>
          </div>

          {loading && <p className="fgrid-status">Chargement des formations…</p>}
          {error && <p className="fgrid-status fgrid-error">{error}</p>}

          {!loading && !error && (
            <div className="formations-grid">
              {visibles.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}