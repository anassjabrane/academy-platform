import Hero from '../../components/Hero/Hero';
import StatsBar from '../../components/StatsBar/StatsBar';
import FormationsGrid from '../../components/FormationsGrid/FormationsGrid';

/**
 * Page d'accueil. Correspond a <div id="page-home"> de index.html.
 */
export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">Catalogue</div>
            <h2 className="section-title">Nos formations</h2>
            <p className="section-sub">
              Choisissez parmi nos formations les mieux notées et les plus demandées
            </p>
          </div>
          <FormationsGrid />
        </div>
      </section>
    </div>
  );
}