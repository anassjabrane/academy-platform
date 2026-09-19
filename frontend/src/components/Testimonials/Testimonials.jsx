const TEMOIGNAGES = [
  {
    texte:
      "Grâce à academy.ma, j'ai pu passer d'un emploi administratif à développeur freelance. La qualité du contenu est vraiment au niveau international.",
    nom: 'Youssef Alami',
    role: 'Développeur Freelance, Casablanca',
    avatar: 'YA',
    color: '#3a6af0',
  },
  {
    texte:
      "J'ai suivi la formation Social Media Pro et j'ai lancé mon agence dans la foulée. Je facture maintenant 3× mon ancien salaire.",
    nom: 'Sara Benali',
    role: "Fondatrice d'agence digitale, Rabat",
    avatar: 'SB',
    color: '#22c55e',
  },
  {
    texte:
      "La formation Python & IA était exactement ce qu'il me fallait. Contenu structuré, instructeurs accessibles. En 6 semaines, j'avais un portfolio et mes premiers clients.",
    nom: 'Mehdi Tazi',
    role: 'Data Analyst, Marrakech',
    avatar: 'MT',
    color: '#8b5cf6',
  },
];

/**
 * Section "Ce que disent nos étudiants". Reproduit .testi-grid de index.html.
 */
export default function Testimonials() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">Témoignages</div>
          <h2 className="section-title">Ce que disent nos étudiants</h2>
        </div>
        <div className="testi-grid">
          {TEMOIGNAGES.map((t) => (
            <div key={t.nom} className="testi-card">
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testi-text">"{t.texte}"</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="testi-name">{t.nom}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}