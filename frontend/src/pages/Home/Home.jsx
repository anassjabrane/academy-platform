import Hero from '../../components/Hero/Hero';
import StatsBar from '../../components/StatsBar/StatsBar';
import CategoriesShowcase from '../../components/CategoriesShowcase/CategoriesShowcase';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTABanner from '../../components/CTABanner/CTABanner';
import Footer from '../../components/Footer/Footer';

/**
 * Page d'accueil. Reproduit fidelement <div id="page-home"> de index.html :
 * Hero -> StatsBar -> Categories -> How it works -> Testimonials -> CTA -> Footer.
 */
export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <CategoriesShowcase />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}