const ETAPES = [
  {
    num: 1,
    title: 'Créez votre compte',
    text: 'Inscription gratuite en moins de 2 minutes, sans carte bancaire.',
  },
  {
    num: 2,
    title: 'Choisissez votre formation',
    text: 'Parcourez +45 formations certifiantes dans votre domaine.',
  },
  {
    num: 3,
    title: 'Apprenez en ligne',
    text: 'Vidéos HD, projets pratiques, support en direct via WhatsApp.',
  },
  {
    num: 4,
    title: 'Obtenez votre certificat',
    text: 'Certificat professionnel reconnu, partageable sur LinkedIn.',
  },
];

/**
 * Section "Comment ça marche". Reproduit .how-grid de index.html.
 */
export default function HowItWorks() {
  return (
    <section className="section section-gray">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">Comment ça marche</div>
          <h2 className="section-title">Apprenez à votre rythme</h2>
        </div>
        <div className="how-grid">
          {ETAPES.map((etape) => (
            <div key={etape.num} className="how-card">
              <div className="how-num">{etape.num}</div>
              <div className="how-title">{etape.title}</div>
              <div className="how-text">{etape.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}