const STATS = [
  { value: '+2000', label: 'Professionnels formés' },
  { value: '45+', label: 'Formations certifiantes' },
  { value: '4.9/5', label: 'Note moyenne' },
  { value: '18', label: 'Instructeurs experts' },
  { value: '94%', label: 'Taux de satisfaction' },
];

/**
 * Barre de statistiques sous le hero.
 * Correspond a <div class="stats-bar"> de index.html.
 */
export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-bar-inner">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stat-group">
            <div className="stat-item">
              <div className="stat-num">{stat.value}</div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
            {i < STATS.length - 1 && <div className="stat-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}